import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { Shield, Globe, FileText, Building2, GraduationCap, Users } from "lucide-react";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

const contextCards = [
  {
    icon: GraduationCap,
    title: "Formación Profesional",
    description: "Programas formativos de excelencia para todos los niveles profesionales",
  },
  {
    icon: Shield,
    title: "Certificación UNE",
    description: "Estándar europeo de Compras de Valor Añadido con auditoría AENOR",
  },
  {
    icon: Users,
    title: "Comunidad +2.000",
    description: "La mayor red de profesionales de Compras de España",
  },
  {
    icon: Globe,
    title: "Presencia Internacional",
    description: "Miembro de IFPSM, la federación mundial de asociaciones de Compras",
  },
];

export const DocHero = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-600/10 via-background to-blue-500/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(220 80% 45%) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, hsl(220 60% 55%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            {/* Dual Branding */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <ProcuredataLogo size="lg" />
              <span className="text-3xl text-muted-foreground">×</span>
              <span className="text-2xl font-bold text-blue-600">AERCE</span>
            </div>

            <Badge className="mb-6 bg-blue-600/10 text-blue-600 border-blue-600/30">
              <FileText className="h-3 w-3 mr-1" />
              Documento Institucional v1.0
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              AERCE:{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                La Voz de las Compras
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              La Asociación Española de Profesionales de Compras, Contratación y Aprovisionamientos: 
              <strong> más de 30 años impulsando la excelencia en la función de Compras.</strong>
            </p>

            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Documento de presentación institucional para dirección y socios potenciales
            </p>
          </div>
        </FadeIn>

        {/* Context Cards */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contextCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border rounded-xl p-5 text-center hover:border-blue-600/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mx-auto mb-3">
                  <card.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
