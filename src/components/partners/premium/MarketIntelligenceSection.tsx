import { motion } from "framer-motion";
import { Lightbulb, CheckCircle2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DataAnalysis } from "@/data/premiumPartnersData";

interface MarketIntelligenceSectionProps {
  dataAnalysis: DataAnalysis;
  partnerName: string;
}

export const MarketIntelligenceSection = ({ dataAnalysis, partnerName }: MarketIntelligenceSectionProps) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Análisis de{" "}
            <span className="text-primary">Impacto Sectorial</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Entendiendo el valor único de los datos agregados de {partnerName}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Unique Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 h-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 relative overflow-hidden">
              {/* Decorative sparkle */}
              <div className="absolute top-4 right-4">
                <Sparkles className="w-6 h-6 text-primary/30" />
              </div>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    ¿Por qué los datos de {partnerName} son únicos?
                  </h3>
                </div>
              </div>
              
              <blockquote className="text-lg leading-relaxed text-foreground/90 italic border-l-4 border-primary/30 pl-4">
                "{dataAnalysis.uniqueValue}"
              </blockquote>
            </Card>
          </motion.div>

          {/* Data Summary & Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8 h-full bg-card/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">
                Capacidades de Agregación
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {dataAnalysis.summary}
              </p>
              
              <ul className="space-y-3">
                {dataAnalysis.capabilities.map((capability, index) => (
                  <motion.li
                    key={capability}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{capability}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
