import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, X, Send, Sparkles, ThumbsUp, ThumbsDown, ExternalLink, Calculator, Gauge, Activity, FileCheck, Minimize2, Maximize2, GripVertical, Heart, HeartPulse, ShoppingBag, Zap, Plane, Wine, Thermometer, Ship, Building2, Mountain, Shirt, Receipt, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
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

  // Health/Hospital detection
  if (lowerContent.includes("hospital") || lowerContent.includes("equipo médico") || 
      lowerContent.includes("resonancia") || lowerContent.includes("mantenimiento predictivo") ||
      lowerContent.includes("salud") || lowerContent.includes("gdpr")) {
    widgets.push({ 
      label: "Ver Caso BioMed Hospital", 
      path: "/success-stories/biomed-hospital", 
      icon: <HeartPulse className="h-3 w-3" /> 
    });
  }

  // Retail/Ethics detection
  if (lowerContent.includes("retail") || lowerContent.includes("textil") || 
      lowerContent.includes("sa8000") || lowerContent.includes("trabajo justo") ||
      lowerContent.includes("ética") || lowerContent.includes("csddd")) {
    widgets.push({ 
      label: "Ver Caso GlobalRetail Prime", 
      path: "/success-stories/globalretail-prime", 
      icon: <ShoppingBag className="h-3 w-3" /> 
    });
  }

  // Energy/Renewable detection
  if (lowerContent.includes("energía renovable") || lowerContent.includes("gdo") || 
      lowerContent.includes("certificado de origen") || lowerContent.includes("carbon neutral") ||
      lowerContent.includes("smart contract") || lowerContent.includes("euroe")) {
    widgets.push({ 
      label: "Ver Caso EcoVolt Manufacturing", 
      path: "/success-stories/ecovolt-manufacturing", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // ===== NEW 10 SECTORS =====
  
  // Aeronáutica (EN9100, Aviación)
  if (lowerContent.includes("en9100") || lowerContent.includes("aeronáutica") || 
      lowerContent.includes("aviación") || lowerContent.includes("aeroespacial") ||
      lowerContent.includes("piezas críticas")) {
    widgets.push({ 
      label: "Ver SkyAero Systems", 
      path: "/success-stories/sky-aero-systems", 
      icon: <Plane className="h-3 w-3" /> 
    });
  }

  // Vinos/D.O.
  if (lowerContent.includes("vino") || lowerContent.includes("denominación de origen") || 
      lowerContent.includes("bodega") || lowerContent.includes("exportación asia") ||
      lowerContent.includes("falsificación etiqueta")) {
    widgets.push({ 
      label: "Ver VinosD.O. Elite", 
      path: "/success-stories/vinosdoe-elite", 
      icon: <Wine className="h-3 w-3" /> 
    });
  }

  // Pharma/Cadena Frío
  if (lowerContent.includes("vacuna") || lowerContent.includes("cadena de frío") || 
      lowerContent.includes("termolábil") || lowerContent.includes("pharma") ||
      lowerContent.includes("viales") || lowerContent.includes("temperatura")) {
    widgets.push({ 
      label: "Ver PharmaCold Logistix", 
      path: "/success-stories/pharmacold-logistix", 
      icon: <Thermometer className="h-3 w-3" /> 
    });
  }

  // Aduanas/Puerto
  if (lowerContent.includes("aduana") || lowerContent.includes("puerto") || 
      lowerContent.includes("despacho") || lowerContent.includes("kyb") ||
      lowerContent.includes("contenedor") || lowerContent.includes("comercio internacional")) {
    widgets.push({ 
      label: "Ver PortBCN Smart-Trade", 
      path: "/success-stories/portbcn-smart-trade", 
      icon: <Ship className="h-3 w-3" /> 
    });
  }

  // Licitación Pública/Gobierno
  if (lowerContent.includes("licitación") || lowerContent.includes("contratación pública") || 
      lowerContent.includes("cuota discapacidad") || lowerContent.includes("ayuntamiento") ||
      lowerContent.includes("transparencia pública")) {
    widgets.push({ 
      label: "Ver Ayuntamiento Ético", 
      path: "/success-stories/ayuntamiento-etico", 
      icon: <Building2 className="h-3 w-3" /> 
    });
  }

  // Minería/B-Corp
  if (lowerContent.includes("litio") || lowerContent.includes("baterías") || 
      lowerContent.includes("minerales") || lowerContent.includes("conflicto") ||
      lowerContent.includes("b-corp") || lowerContent.includes("tier 3")) {
    widgets.push({ 
      label: "Ver PureLithium Sourcing", 
      path: "/success-stories/purelithium-sourcing", 
      icon: <Mountain className="h-3 w-3" /> 
    });
  }

  // Moda Circular
  if (lowerContent.includes("moda circular") || lowerContent.includes("fibra reciclada") || 
      lowerContent.includes("greenwashing") || lowerContent.includes("etiquetado textil")) {
    widgets.push({ 
      label: "Ver FastFashion Trace", 
      path: "/success-stories/fastfashion-trace", 
      icon: <Shirt className="h-3 w-3" /> 
    });
  }

  // Factoring/Finanzas B2B
  if (lowerContent.includes("factoring") || lowerContent.includes("liquidez pyme") || 
      lowerContent.includes("adelanto factura") || lowerContent.includes("score crediticio") ||
      lowerContent.includes("trade finance")) {
    widgets.push({ 
      label: "Ver InvoiceTrust", 
      path: "/success-stories/invoicetrust-b2b", 
      icon: <Receipt className="h-3 w-3" /> 
    });
  }

  // Comunidades Energéticas
  if (lowerContent.includes("comunidad energética") || lowerContent.includes("excedentes") || 
      lowerContent.includes("autoconsumo") || lowerContent.includes("micro-pago") ||
      lowerContent.includes("polígono industrial")) {
    widgets.push({ 
      label: "Ver GridFlow Energy", 
      path: "/success-stories/gridflow-energy", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // IA/Datos Sintéticos
  if (lowerContent.includes("datos sintéticos") || lowerContent.includes("entrenar ia") || 
      lowerContent.includes("dataset") || lowerContent.includes("machine learning") ||
      lowerContent.includes("privacidad ia") || lowerContent.includes("fidelidad estadística")) {
    widgets.push({ 
      label: "Ver AI-Labs Research", 
      path: "/success-stories/ailabs-research", 
      icon: <Cpu className="h-3 w-3" /> 
    });
  }

  // ===== 10 NEW ENERGY SECTORS =====

  // Solar/Fotovoltaica
  if (lowerContent.includes("solar") || lowerContent.includes("fotovoltaica") || 
      lowerContent.includes("paneles") || lowerContent.includes("helios") ||
      lowerContent.includes("parque solar") || lowerContent.includes("inversores")) {
    widgets.push({ 
      label: "Ver Helios Fields", 
      path: "/success-stories/helios-fields", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // Eólica/PPA
  if (lowerContent.includes("eólica") || lowerContent.includes("aerogenerador") || 
      lowerContent.includes("ppa") || lowerContent.includes("aeolus") ||
      lowerContent.includes("parque eólico") || lowerContent.includes("viento")) {
    widgets.push({ 
      label: "Ver Aeolus Wind", 
      path: "/success-stories/aeolus-wind", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // Hidrógeno Verde
  if (lowerContent.includes("hidrógeno") || lowerContent.includes("h2 verde") || 
      lowerContent.includes("electrólisis") || lowerContent.includes("h2-pure") ||
      lowerContent.includes("subvención h2")) {
    widgets.push({ 
      label: "Ver H2-Pure", 
      path: "/success-stories/h2-pure", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // Comunidades Energéticas
  if (lowerContent.includes("polígono eco") || lowerContent.includes("autoconsumo colectivo") || 
      lowerContent.includes("marketplace energía") || lowerContent.includes("vecinos industriales")) {
    widgets.push({ 
      label: "Ver Polígono Eco-Link", 
      path: "/success-stories/poligono-eco-link", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // Smart Grid/Flexibilidad
  if (lowerContent.includes("smart grid") || lowerContent.includes("flexibilidad") || 
      lowerContent.includes("gridflex") || lowerContent.includes("sobrecarga red") ||
      lowerContent.includes("certificado flexibilidad")) {
    widgets.push({ 
      label: "Ver GridFlex Demand", 
      path: "/success-stories/gridflex-demand", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // Baterías/Almacenamiento
  if (lowerContent.includes("batería") || lowerContent.includes("almacenamiento") || 
      lowerContent.includes("arbitraje") || lowerContent.includes("bess") ||
      lowerContent.includes("bateria-hub")) {
    widgets.push({ 
      label: "Ver Batería-Hub", 
      path: "/success-stories/bateria-hub", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // Biomasa
  if (lowerContent.includes("biomasa") || lowerContent.includes("district heating") || 
      lowerContent.includes("bioheat") || lowerContent.includes("red ii") ||
      lowerContent.includes("residuos forestales")) {
    widgets.push({ 
      label: "Ver BioHeat District", 
      path: "/success-stories/bioheat-district", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // Aerogeneradores/Scope 3
  if (lowerContent.includes("turbine-chain") || lowerContent.includes("acero verde") || 
      lowerContent.includes("fabricación aerogenerador") || lowerContent.includes("scope 3 csrd")) {
    widgets.push({ 
      label: "Ver Turbine-Chain", 
      path: "/success-stories/turbine-chain", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // Hidráulica
  if (lowerContent.includes("hidráulica") || lowerContent.includes("embalse") || 
      lowerContent.includes("aquapower") || lowerContent.includes("nexo agua") ||
      lowerContent.includes("confederación hidrográfica")) {
    widgets.push({ 
      label: "Ver AquaPower Nexus", 
      path: "/success-stories/aquapower-nexus", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  // EV Charging
  if (lowerContent.includes("carga ev") || lowerContent.includes("punto de carga") || 
      lowerContent.includes("smartcharge") || lowerContent.includes("movilidad eléctrica verde") ||
      lowerContent.includes("garantía origen ev")) {
    widgets.push({ 
      label: "Ver Smart-Charge EV", 
      path: "/success-stories/smartcharge-ev", 
      icon: <Zap className="h-3 w-3" /> 
    });
  }

  return widgets;
}

export function AIConcierge() {
  const { t } = useTranslation("chat");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatSize, setChatSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: t("concierge.welcome"),
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
      // Detect if user is on a product page and extract DID
      const productMatch = location.pathname.match(/\/product\/(.+)/);
      const currentDid = productMatch ? `did:op:${productMatch[1]}` : undefined;

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
            did: currentDid, // Pass DID if on product page
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
        description: error instanceof Error ? error.message : t("concierge.errorConnect"),
        variant: "destructive",
      });
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: t("concierge.errorGeneric"),
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
        title: t("concierge.feedbackThanks"),
        description: t("concierge.feedbackThanksDescription"),
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
        title: t("concierge.feedbackSent"),
        description: t("concierge.feedbackSentDescription"),
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
                      <CardTitle className="text-base">{t("concierge.title")}</CardTitle>
                      <CardDescription className="text-xs">
                        {isMinimized ? t("concierge.clickToExpand") : t("concierge.subtitle")}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} 
                      className="h-8 w-8 p-0"
                      title={isMinimized ? t("concierge.maximize") : t("concierge.minimize")}
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => { e.stopPropagation(); handleMaximize(); }} 
                      className="h-8 w-8 p-0"
                      title={t("concierge.maximize")}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
                      className="h-8 w-8 p-0"
                      title={t("concierge.close")}
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
                                            {message.feedbackGiven === "positive" ? t("concierge.feedbackPositive") : t("concierge.feedbackNegative")}
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
                            placeholder={t("concierge.placeholder")}
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
                  <p className="text-sm font-medium mb-2">{t("concierge.feedbackQuestion")}</p>
                  <Textarea
                    placeholder={t("concierge.feedbackPlaceholder")}
                    value={correctionText}
                    onChange={(e) => setCorrectionText(e.target.value)}
                    className="mb-2"
                    rows={3}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={() => { setShowCorrectionModal(null); setCorrectionText(""); }}>
                      {t("concierge.cancel")}
                    </Button>
                    <Button size="sm" onClick={submitCorrection}>
                      {t("concierge.submitFeedback")}
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
