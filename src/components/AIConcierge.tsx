import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, X, Send, Sparkles, ThumbsUp, ThumbsDown, ExternalLink, Calculator, Gauge, Activity, FileCheck, Minimize2, Maximize2, GripVertical, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrgSector } from "@/hooks/useOrgSector";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  feedbackGiven?: "positive" | "negative" | null;
}

interface WidgetAction {
  label: string;
  path: string;
  icon: React.ReactNode;
}

// Size constraints
const MIN_WIDTH = 400;
const MAX_WIDTH = 800;
const MIN_HEIGHT = 300;
const MAX_HEIGHT = 600;
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 450;

// Detect widget triggers in AI response
function detectWidgets(content: string): WidgetAction[] {
  const widgets: WidgetAction[] = [];
  const lowerContent = content.toLowerCase();

  if (lowerContent.includes("calculadora roi") || lowerContent.includes("[widget_roi]") || lowerContent.includes("simulador de roi")) {
    widgets.push({ label: "Abrir Calculadora ROI", path: "/services", icon: <Calculator className="h-3 w-3" /> });
  }
  if (lowerContent.includes("gauge esg") || lowerContent.includes("[impactgauge]") || lowerContent.includes("impact gauge") || lowerContent.includes("sostenibilidad")) {
    widgets.push({ label: "Ver Gauge ESG", path: "/services", icon: <Gauge className="h-3 w-3" /> });
  }
  if (lowerContent.includes("radar de madurez") || lowerContent.includes("[widget_radar]") || lowerContent.includes("innovation lab")) {
    widgets.push({ label: "Ver Radar Madurez", path: "/innovation", icon: <Activity className="h-3 w-3" /> });
  }
  if (lowerContent.includes("smart contract") || lowerContent.includes("[widget_contract]") || lowerContent.includes("contrato inteligente")) {
    widgets.push({ label: "Simular Contrato", path: "/innovation", icon: <FileCheck className="h-3 w-3" /> });
  }
  if (lowerContent.includes("/services") && !widgets.some(w => w.path === "/services")) {
    widgets.push({ label: "Ir a Servicios", path: "/services", icon: <ExternalLink className="h-3 w-3" /> });
  }
  if (lowerContent.includes("/innovation") && !widgets.some(w => w.path === "/innovation")) {
    widgets.push({ label: "Ir a Innovation Lab", path: "/innovation", icon: <ExternalLink className="h-3 w-3" /> });
  }
  if (lowerContent.includes("/sustainability") || lowerContent.includes("/sostenibilidad")) {
    widgets.push({ label: "Ver Sostenibilidad", path: "/sustainability", icon: <Gauge className="h-3 w-3" /> });
  }
  
  // Social Economy detection
  if (lowerContent.includes("social") || lowerContent.includes("sroi") || 
      lowerContent.includes("inclusión") || lowerContent.includes("lgd") ||
      lowerContent.includes("ético") || lowerContent.includes("inserción") ||
      lowerContent.includes("discapacidad") || lowerContent.includes("economía social")) {
    widgets.push({ 
      label: "Ver Dashboard Impacto Social", 
      path: "/success-stories/alianza-social-hub", 
      icon: <Heart className="h-3 w-3" /> 
    });
  }

  return widgets;
}

export function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatSize, setChatSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "¡Hola! 👋 Soy **ARIA**, tu asistente de ProcureData. Puedo ayudarte con información sobre servicios, precios, sostenibilidad y tecnología blockchain. ¿En qué puedo ayudarte?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState<string | null>(null);
  const [correctionText, setCorrectionText] = useState("");
  
  // Typewriter effect state
  const [displayedContent, setDisplayedContent] = useState<Record<string, string>>({});
  const typewriterRefs = useRef<Record<string, number>>({});
  
  // Resize state
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const sector = useOrgSector();

  // Typewriter effect for assistant messages
  useEffect(() => {
    messages.forEach(msg => {
      if (msg.role === "assistant" && msg.content) {
        const currentDisplayed = displayedContent[msg.id] || "";
        
        // If content is fully displayed, skip
        if (currentDisplayed === msg.content) return;
        
        // If we're already animating this message, let it continue
        if (typewriterRefs.current[msg.id]) return;
        
        // Start typewriter effect
        let currentIndex = currentDisplayed.length;
        
        const animate = () => {
          if (currentIndex < msg.content.length) {
            currentIndex++;
            setDisplayedContent(prev => ({
              ...prev,
              [msg.id]: msg.content.slice(0, currentIndex)
            }));
            typewriterRefs.current[msg.id] = window.setTimeout(animate, 15);
          } else {
            delete typewriterRefs.current[msg.id];
          }
        };
        
        typewriterRefs.current[msg.id] = window.setTimeout(animate, 15);
      }
    });
    
    // Cleanup on unmount
    return () => {
      Object.values(typewriterRefs.current).forEach(timeout => clearTimeout(timeout));
    };
  }, [messages]);

  // Auto-scroll when new messages arrive or content updates
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, displayedContent, isTyping]);

  // Resize handlers
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: chatSize.width,
      height: chatSize.height
    };
  }, [chatSize]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeStartRef.current) return;
      
      const deltaX = resizeStartRef.current.x - e.clientX;
      const deltaY = e.clientY - resizeStartRef.current.y;
      
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, resizeStartRef.current.width + deltaX));
      const newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, resizeStartRef.current.height + deltaY));
      
      setChatSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeStartRef.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue.trim();
    setInputValue("");
    setIsTyping(true);

    // Prepare history for API (exclude welcome message)
    const history = messages
      .filter(m => m.id !== "welcome")
      .map(m => ({ role: m.role, content: m.content }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            message: currentInput,
            history,
            context: {
              currentPage: location.pathname,
              userSector: sector || undefined,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      // Process streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";
      const assistantMessageId = `assistant-${Date.now()}`;

      // Add empty assistant message
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);

      let streamDone = false;
      while (!streamDone) {
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
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch {
            // Incomplete JSON, put back and wait
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch { /* ignore */ }
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al conectar con ARIA",
        variant: "destructive",
      });
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo. 😔",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeedback = async (messageId: string, isPositive: boolean) => {
    const message = messages.find(m => m.id === messageId);
    if (!message || message.role !== "assistant") return;

    // Find the user question that preceded this response
    const messageIndex = messages.findIndex(m => m.id === messageId);
    const userQuestion = messages
      .slice(0, messageIndex)
      .reverse()
      .find(m => m.role === "user")?.content || "";

    // Mark feedback given
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, feedbackGiven: isPositive ? "positive" : "negative" } : m
      )
    );

    if (!isPositive) {
      setShowCorrectionModal(messageId);
      return;
    }

    // Save positive feedback
    try {
      await supabase.from("ai_feedback").insert({
        user_question: userQuestion,
        bot_response: message.content,
        is_positive: true,
        current_page: location.pathname,
        user_sector: sector || null,
      });
      toast({
        title: "¡Gracias!",
        description: "Tu feedback nos ayuda a mejorar ARIA 🚀",
      });
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  };

  const submitCorrection = async () => {
    if (!showCorrectionModal) return;

    const message = messages.find(m => m.id === showCorrectionModal);
    if (!message) return;

    const messageIndex = messages.findIndex(m => m.id === showCorrectionModal);
    const userQuestion = messages
      .slice(0, messageIndex)
      .reverse()
      .find(m => m.role === "user")?.content || "";

    try {
      await supabase.from("ai_feedback").insert({
        user_question: userQuestion,
        bot_response: message.content,
        is_positive: false,
        user_correction: correctionText || null,
        current_page: location.pathname,
        user_sector: sector || null,
      });
      toast({
        title: "Feedback enviado",
        description: "Revisaremos esta respuesta para mejorar ARIA 📝",
      });
    } catch (error) {
      console.error("Error saving correction:", error);
    }

    setShowCorrectionModal(null);
    setCorrectionText("");
  };

  const handleWidgetClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleMaximize = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setChatSize({ width: MAX_WIDTH, height: MAX_HEIGHT });
    }
  };

  const getDisplayedText = (message: Message): string => {
    if (message.role === "user") return message.content;
    return displayedContent[message.id] || "";
  };

  const isTypingMessage = (message: Message): boolean => {
    if (message.role === "user") return false;
    const displayed = displayedContent[message.id] || "";
    return displayed.length < message.content.length;
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40"
            style={{ 
              width: isMinimized ? 300 : chatSize.width,
              maxWidth: 'calc(100vw - 3rem)'
            }}
          >
            <Card className="shadow-2xl border-t-4 border-t-primary relative overflow-hidden">
              {/* Resize handle (bottom-left corner) */}
              {!isMinimized && (
                <div
                  className="absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity z-10"
                  onMouseDown={handleResizeStart}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground rotate-45" />
                </div>
              )}
              
              <CardHeader 
                className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10 cursor-pointer"
                onClick={() => isMinimized && setIsMinimized(false)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-primary/80">
                      <AvatarFallback className="bg-transparent text-primary-foreground">
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">ARIA</CardTitle>
                      <CardDescription className="text-xs">
                        {isMinimized ? "Click para expandir" : "Asistente ProcureData"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} 
                      className="h-8 w-8 p-0"
                      title={isMinimized ? "Restaurar" : "Minimizar"}
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => { e.stopPropagation(); handleMaximize(); }} 
                      className="h-8 w-8 p-0"
                      title="Maximizar"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
                      className="h-8 w-8 p-0"
                      title="Cerrar"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardContent className="p-0">
                      {/* Messages */}
                      <ScrollArea 
                        ref={scrollAreaRef} 
                        className="p-4"
                        style={{ height: chatSize.height - 140 }}
                      >
                        <div className="space-y-4">
                          {messages.map((message) => {
                            const widgets = message.role === "assistant" ? detectWidgets(message.content) : [];
                            const displayText = getDisplayedText(message);
                            const isCurrentlyTyping = isTypingMessage(message);
                            
                            return (
                              <div key={message.id}>
                                <div className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                  {message.role === "assistant" && (
                                    <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-primary/80 shrink-0">
                                      <AvatarFallback className="bg-transparent text-primary-foreground">
                                        <Bot className="h-4 w-4" />
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                  <div className="flex flex-col gap-1 max-w-[80%]">
                                    <div
                                      className={`rounded-lg px-3 py-2 ${
                                        message.role === "user"
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted text-foreground"
                                      }`}
                                    >
                                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {displayText}
                                        {isCurrentlyTyping && (
                                          <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
                                        )}
                                      </p>
                                      <span className="text-[10px] opacity-60 mt-1 block">
                                        {message.timestamp.toLocaleTimeString("es-ES", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                    </div>

                                    {/* Feedback buttons for assistant messages */}
                                    {message.role === "assistant" && message.id !== "welcome" && !isCurrentlyTyping && (
                                      <div className="flex items-center gap-1 ml-1">
                                        {message.feedbackGiven ? (
                                          <span className="text-xs text-muted-foreground">
                                            {message.feedbackGiven === "positive" ? "👍 ¡Gracias!" : "📝 Feedback enviado"}
                                          </span>
                                        ) : (
                                          <>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 w-6 p-0 hover:bg-green-100 dark:hover:bg-green-900/30"
                                              onClick={() => handleFeedback(message.id, true)}
                                            >
                                              <ThumbsUp className="h-3 w-3 text-muted-foreground hover:text-green-600" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
                                              onClick={() => handleFeedback(message.id, false)}
                                            >
                                              <ThumbsDown className="h-3 w-3 text-muted-foreground hover:text-red-600" />
                                            </Button>
                                          </>
                                        )}
                                      </div>
                                    )}

                                    {/* Widget action buttons */}
                                    {widgets.length > 0 && !isCurrentlyTyping && (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {widgets.map((widget, idx) => (
                                          <Button
                                            key={idx}
                                            variant="outline"
                                            size="sm"
                                            className="h-6 text-xs gap-1"
                                            onClick={() => handleWidgetClick(widget.path)}
                                          >
                                            {widget.icon}
                                            {widget.label}
                                          </Button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  {message.role === "user" && (
                                    <Avatar className="h-8 w-8 bg-primary shrink-0">
                                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                                        TÚ
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                </div>
                              </div>
                            );
                          })}

                          {/* Typing indicator */}
                          {isTyping && (
                            <div className="flex gap-2 justify-start">
                              <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-primary/80 shrink-0">
                                <AvatarFallback className="bg-transparent text-primary-foreground">
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="bg-muted rounded-lg px-3 py-2">
                                <div className="flex gap-1">
                                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                  <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>

                      {/* Input */}
                      <div className="border-t p-4 bg-background">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Pregunta a ARIA..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isTyping}
                            className="flex-1"
                          />
                          <Button onClick={handleSendMessage} disabled={isTyping || !inputValue.trim()} size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Correction Modal */}
            <AnimatePresence>
              {showCorrectionModal && !isMinimized && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-2 left-0 right-0 bg-background border rounded-lg shadow-xl p-4"
                >
                  <p className="text-sm font-medium mb-2">¿Cómo debería haber respondido ARIA?</p>
                  <Textarea
                    placeholder="Describe la respuesta correcta (opcional)"
                    value={correctionText}
                    onChange={(e) => setCorrectionText(e.target.value)}
                    className="mb-2"
                    rows={3}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={() => { setShowCorrectionModal(null); setCorrectionText(""); }}>
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={submitCorrection}>
                      Enviar Feedback
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
