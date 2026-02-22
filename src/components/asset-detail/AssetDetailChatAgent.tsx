import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, AlertTriangle, Sparkles } from "lucide-react";
import { AgentAvatar } from "@/components/ai/AgentAvatar";
import { FollowUpSuggestions, parseFollowUpMarkers } from "@/components/ai/FollowUpSuggestions";
import { SourceCitation, parseSourceMarkers } from "@/components/ai/SourceCitation";
import { TokenWalletBadge } from "@/components/ai/TokenWalletBadge";
import { useTokenWallet } from "@/contexts/TokenWalletContext";
import { checkMessage, getWarningKey, isBlocked } from "@/utils/chatGuard";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/asset-detail-agent`;

interface AssetDetailChatAgentProps {
  product: {
    asset_id: string;
    asset_name: string;
    asset_description?: string;
    category: string;
    version?: string;
    schema_definition?: Record<string, any> | null;
    custom_metadata?: Record<string, any> | null;
  };
  schemaColumns: any[];
}

/**
 * Extracts ONLY safe, public context from the asset.
 * NEVER includes: api_url, api_headers, allowed_wallets, denied_wallets, provider_id, user IDs.
 */
function getAriaContext(product: AssetDetailChatAgentProps["product"], schemaColumns: any[]): string {
  const lines: string[] = [];

  lines.push(`Nombre: ${product.asset_name}`);
  if (product.asset_description) lines.push(`Descripción: ${product.asset_description}`);
  lines.push(`Categoría: ${product.category}`);
  if (product.version) lines.push(`Versión: ${product.version}`);

  if (schemaColumns.length > 0) {
    lines.push(`\nEsquema de datos (${schemaColumns.length} campos):`);
    schemaColumns.forEach((col: any) => {
      const name = col.name || col.field || "campo";
      const desc = col.description || col.type || "";
      lines.push(`- ${name}${desc ? `: ${desc}` : ""}`);
    });
  }

  const meta = product.custom_metadata;
  if (meta) {
    if (meta.use_cases && Array.isArray(meta.use_cases)) {
      lines.push(`\nCasos de uso: ${meta.use_cases.join(", ")}`);
    }
    if (meta.quality_metrics && typeof meta.quality_metrics === "object") {
      lines.push(`\nMétricas de calidad: ${JSON.stringify(meta.quality_metrics)}`);
    }
  }

  return lines.join("\n");
}

export const AssetDetailChatAgent = ({ product, schemaColumns }: AssetDetailChatAgentProps) => {
  const { recordOperation } = useTokenWallet();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [guardWarning, setGuardWarning] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const assetContext = useMemo(() => getAriaContext(product, schemaColumns), [product, schemaColumns]);

  const truncatedDid = useMemo(() => {
    const aid = product.asset_id || "";
    return aid.length > 12 ? `did:...${aid.slice(-4)}` : aid;
  }, [product.asset_id]);

  const suggestedQuestions = [
    "¿Qué datos contiene este dataset?",
    "¿Para qué casos de uso puedo utilizarlo?",
    "¿Cuáles son sus campos principales?",
    "¿Cómo se integra con mi sistema actual?",
  ];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || isBlocked()) return;

    const guard = checkMessage(text);
    if (!guard.allowed) {
      const key = getWarningKey(guard);
      setGuardWarning(key ? getGuardText(key) : null);
      return;
    }
    setGuardWarning(null);

    const userMsg: Msg = { role: "user", content: text };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
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
        body: JSON.stringify({ messages: allMessages, assetContext }),
      });

      if (resp.status === 429) { upsert("⚠️ Demasiadas solicitudes. Por favor, espera un momento."); setIsLoading(false); return; }
      if (resp.status === 402) { upsert("⚠️ Créditos insuficientes."); setIsLoading(false); return; }
      if (!resp.ok || !resp.body) { upsert("⚠️ Error al conectar con el asistente. Intenta de nuevo."); setIsLoading(false); return; }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;

      while (!done) {
        const { done: rd, value } = await reader.read();
        if (rd) break;
        buf += decoder.decode(value, { stream: true });
        let ni: number;
        while ((ni = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, ni);
          buf = buf.slice(ni + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) upsert(c);
          } catch { buf = line + "\n" + buf; break; }
        }
      }

      const tokensUsed = Math.max(50, Math.round(assistantSoFar.length * 1.3));
      recordOperation({ agent: "federated", caseLabel: "Asset Detail", question: text, tokensConsumed: tokensUsed });
    } catch {
      upsert("⚠️ Error de conexión. Comprueba tu conexión a internet.");
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, recordOperation, assetContext]);

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <AgentAvatar state={isLoading ? "thinking" : "idle"} size={32} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary" /> Pregunta al Asistente IA
              </span>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-mono">
                {truncatedDid}
              </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground">Experto en el activo {product.asset_name}</p>
          </div>
        </div>
        <TokenWalletBadge />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-[380px] overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <AgentAvatar state="idle" size={28} />
              <div className="max-w-[85%] px-3 py-2 rounded-xl bg-muted/50 text-xs">
                <p>¡Hola! 👋 Soy tu <strong>Asistente IA</strong> experto en el ecosistema PROCUREDATA. Estoy analizando el activo <strong>{product.asset_name}</strong> para responder tus preguntas con precisión.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {suggestedQuestions.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} className="text-[11px] px-3 py-1.5 rounded-full border bg-background hover:bg-accent transition-colors text-foreground">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.role === "user") {
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                <div className="max-w-[80%] px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs">{msg.content}</div>
              </motion.div>
            );
          }
          const { cleanText, sources } = parseSourceMarkers(msg.content);
          const { cleanText: finalText, followUps: fups } = parseFollowUpMarkers(cleanText);
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
              <AgentAvatar state={isLoading && i === messages.length - 1 ? "speaking" : "idle"} size={28} />
              <div className="max-w-[85%] space-y-1">
                <div className="px-3 py-2 rounded-xl bg-muted/50 text-xs prose prose-xs dark:prose-invert max-w-none">
                  <ReactMarkdown>{finalText}</ReactMarkdown>
                </div>
                <SourceCitation sources={sources} />
                {i === messages.length - 1 && (
                  <FollowUpSuggestions suggestions={fups} onSelect={sendMessage} isVisible={!isLoading} />
                )}
              </div>
            </motion.div>
          );
        })}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-2">
            <AgentAvatar state="thinking" size={28} />
            <div className="px-3 py-2 rounded-xl bg-muted/50">
              <motion.div className="flex gap-1" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }}>
                {[0, 1, 2].map((d) => (<div key={d} className="w-1.5 h-1.5 rounded-full bg-primary" />))}
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Guard warning */}
      <AnimatePresence>
        {guardWarning && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 py-2 bg-destructive/10 border-t border-destructive/20">
            <p className="text-[11px] text-destructive flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" /> {guardWarning}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-2 px-4 py-3 border-t">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pregunta sobre este dataset..." className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground" disabled={isLoading || isBlocked()} />
        <button type="submit" disabled={!input.trim() || isLoading || isBlocked()} className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-opacity">
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

function getGuardText(key: string): string {
  const map: Record<string, string> = {
    "guard.warning1": "⚠️ Advertencia 1/3: Contenido no permitido detectado.",
    "guard.warning2": "⚠️ Advertencia 2/3: Último aviso antes del bloqueo.",
    "guard.blocked": "🚫 Chat bloqueado por uso inadecuado.",
    "guard.tooLong": "El mensaje es demasiado largo. Máximo 2000 caracteres.",
    "guard.invalidContent": "Contenido no válido.",
  };
  return map[key] || "Contenido no permitido.";
}
