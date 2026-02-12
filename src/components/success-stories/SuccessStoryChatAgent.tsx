import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThinkingPanel } from "@/components/landing/ThinkingPanel";
import { AgentAvatar } from "@/components/ai/AgentAvatar";
import { SourceCitation, parseSourceMarkers } from "@/components/ai/SourceCitation";
import { FollowUpSuggestions, parseFollowUpMarkers } from "@/components/ai/FollowUpSuggestions";
import { LiveMetricsBar } from "@/components/ai/LiveMetricsBar";
import { TokenWalletBadge } from "@/components/ai/TokenWalletBadge";
import { useTokenWallet } from "@/contexts/TokenWalletContext";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

type Msg = { role: "user" | "assistant"; content: string; tokens?: number };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/success-story-agent`;

interface CaseContext {
  company: string;
  sector: string;
  title: string;
  challenge: string;
  solution: string;
  services: string[];
  ariaQuote: string;
  metric: string;
  metricLabel: string;
}

interface Props {
  caseContext: CaseContext;
  onStreamingTextChange?: (text: string) => void;
}

export const SuccessStoryChatAgent = ({ caseContext, onStreamingTextChange }: Props) => {
  const { t } = useTranslation("chat");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const [lastQuestion, setLastQuestion] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { recordOperation } = useTokenWallet();

  const suggestedQuestions = [
    t("successStory.q1", { company: caseContext.company }),
    t("successStory.q2"),
    t("successStory.q3"),
    t("successStory.q4"),
  ];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleThinkingComplete = useCallback(() => {
    setIsThinking(false);
  }, []);

  const lastAssistantMsg = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return messages[i].content;
    }
    return "";
  }, [messages]);

  const { sources, followUps } = useMemo(() => {
    const s = parseSourceMarkers(lastAssistantMsg);
    const f = parseFollowUpMarkers(s.cleanText);
    return { sources: s.sources, followUps: f.followUps };
  }, [lastAssistantMsg]);

  useEffect(() => {
    onStreamingTextChange?.(lastAssistantMsg);
  }, [lastAssistantMsg, onStreamingTextChange]);
  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setIsThinking(true);
    setTokenCount(0);
    setLastQuestion(text.trim().slice(0, 80));

    await new Promise((r) => setTimeout(r, 4000));

    let assistantSoFar = "";
    let localTokenCount = 0;
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      localTokenCount += chunk.split(/\s+/).length;
      setTokenCount(localTokenCount);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg], caseContext }),
      });

      if (!resp.ok || !resp.body) {
      if (resp.status === 429) {
          upsertAssistant(t("successStory.errorRateLimit"));
        } else if (resp.status === 402) {
          upsertAssistant(t("successStory.errorCredits"));
        } else {
          upsertAssistant(t("successStory.errorGeneric"));
        }
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch {
      upsertAssistant(t("successStory.errorConnection"));
    }

    setIsLoading(false);

    // Record in wallet
    if (localTokenCount > 0) {
      recordOperation({
        agent: "success-story",
        caseLabel: caseContext.company,
        question: lastQuestion,
        tokensConsumed: localTokenCount,
      });
      setMessages((prev) =>
        prev.map((m, i) => (i === prev.length - 1 && m.role === "assistant" ? { ...m, tokens: localTokenCount } : m))
      );
    }
  };

  const renderAssistantContent = (content: string) => {
    const s = parseSourceMarkers(content);
    const f = parseFollowUpMarkers(s.cleanText);
    return <ReactMarkdown>{f.cleanText}</ReactMarkdown>;
  };

  return (
    <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-6">
      <div className="flex flex-col h-full max-h-[520px]">
        <div className="flex items-center justify-between gap-2">
          <LiveMetricsBar isStreaming={isLoading && !isThinking} tokenCount={tokenCount} />
          <TokenWalletBadge />
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0 mt-1">
          {messages.length === 0 && (
            <div className="text-center py-6 space-y-4">
              <div className="flex justify-center">
                <AgentAvatar state="idle" size={40} />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-xs font-medium text-primary">
                <Sparkles className="w-3 h-3" />
                Agente IA — {caseContext.company}
              </div>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {t("successStory.description", { company: caseContext.company })}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full border bg-card hover:bg-accent transition-colors text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <AgentAvatar
                  state={isLoading && i === messages.length - 1 ? "speaking" : "idle"}
                  size={28}
                />
              )}
              <div className="flex flex-col max-w-[80%]">
                <div
                  className={`rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground prose prose-sm max-w-none"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <>
                      {renderAssistantContent(msg.content)}
                      {isLoading && i === messages.length - 1 && (
                        <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                      )}
                    </>
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === "assistant" && i === messages.length - 1 && !isLoading && sources.length > 0 && (
                  <SourceCitation sources={sources} />
                )}
                {msg.role === "assistant" && msg.tokens && !isLoading && (
                  <span className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                    ⚡ {msg.tokens.toLocaleString("es-ES")} tokens
                  </span>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <ThinkingPanel
              isVisible={isThinking}
              onComplete={handleThinkingComplete}
              context="case"
              company={caseContext.company}
            />
          )}

          {!isLoading && followUps.length > 0 && (
            <FollowUpSuggestions suggestions={followUps} onSelect={send} isVisible={true} />
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-3 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("successStory.placeholder", { company: caseContext.company })}
            className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="rounded-xl shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
