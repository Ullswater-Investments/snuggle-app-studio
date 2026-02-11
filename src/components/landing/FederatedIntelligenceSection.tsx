import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmbeddedAgentChat } from "./EmbeddedAgentChat";
import { DataVisualizer } from "./DataVisualizer";

export const FederatedIntelligenceSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-4">
            <Brain className="h-3 w-3 mr-1" />
            Centro de Inteligencia Federada
            <Sparkles className="h-3 w-3 ml-1" />
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            IA + Datos en Tiempo Real
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactúa con nuestro agente IA especializado y explora las métricas del ecosistema federado en vivo.
          </p>
        </motion.div>

        {/* Two-panel layout */}
        <motion.div
          className="grid lg:grid-cols-2 gap-6 items-stretch"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ minHeight: "520px" }}
        >
          {/* Left: Chat */}
          <div className="order-2 lg:order-1 h-[520px]">
            <EmbeddedAgentChat />
          </div>

          {/* Right: Data Visualizer */}
          <div className="order-1 lg:order-2 h-[520px]">
            <DataVisualizer />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
