import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { ScoreRing } from "@/components/gamification/ScoreRing";
import { AlertTriangle, Copy, Eye, ShieldAlert } from "lucide-react";

const problems = [
  {
    icon: Copy,
    title: "Fricción",
    description: "El proveedor debe duplicar datos en múltiples portales de cada cliente.",
    color: "text-[hsl(var(--itbid-magenta))]",
    bgColor: "bg-[hsl(var(--itbid-magenta)/0.1)]",
    borderColor: "border-l-[hsl(var(--itbid-magenta)/0.5)]",
  },
  {
    icon: Eye,
    title: "Opacidad",
    description: "No hay visibilidad más allá del Tier-1 (proveedor directo).",
    color: "text-[hsl(var(--itbid-purple))]",
    bgColor: "bg-[hsl(var(--itbid-purple)/0.1)]",
    borderColor: "border-l-[hsl(var(--itbid-purple)/0.5)]",
  },
  {
    icon: ShieldAlert,
    title: "Riesgo",
    description: "Información sensible replicada, aumentando la superficie de ataque.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-l-destructive/50",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--itbid-magenta)/0.1)] text-[hsl(var(--itbid-magenta))] mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium itbid-font">El Problema Actual</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4 itbid-gradient-gray">Los Silos de Datos</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              La gestión de proveedores se basa en modelos centralizados donde el cliente exige al proveedor 
              que suba sus datos a la nube del cliente.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Problems Cards */}
          <StaggerContainer className="space-y-4">
            {problems.map((problem) => (
              <StaggerItem key={problem.title}>
                <Card className={`border-l-4 ${problem.borderColor} hover:shadow-md transition-shadow`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-3 text-lg itbid-font">
                      <div className={`p-2 rounded-lg ${problem.bgColor} ${problem.color}`}>
                        <problem.icon className="h-5 w-5" />
                      </div>
                      {problem.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{problem.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Visualization */}
          <FadeIn delay={0.3} className="flex flex-col items-center">
            <div className="relative">
              {/* Animated Silos */}
              <div className="flex gap-4 mb-8">
                {[
                  { color: "from-[hsl(var(--itbid-cyan)/0.3)]", border: "border-[hsl(var(--itbid-cyan)/0.3)]" },
                  { color: "from-[hsl(var(--itbid-magenta)/0.3)]", border: "border-[hsl(var(--itbid-magenta)/0.3)]" },
                  { color: "from-[hsl(var(--itbid-purple)/0.3)]", border: "border-[hsl(var(--itbid-purple)/0.3)]" },
                ].map((silo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className={`w-20 h-32 bg-gradient-to-t ${silo.color} to-muted/50 rounded-t-lg border-2 border-dashed ${silo.border} flex items-end justify-center pb-2`}
                  >
                    <span className="text-xs text-muted-foreground">Silo {i + 1}</span>
                  </motion.div>
                ))}
              </div>

              {/* Connection Lines (broken) */}
              <div className="absolute top-1/2 left-0 right-0 flex justify-center">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  className="h-0.5 w-full bg-gradient-to-r from-[hsl(var(--itbid-magenta)/0.5)] via-[hsl(var(--itbid-magenta)/0.2)] to-[hsl(var(--itbid-magenta)/0.5)]"
                  style={{ backgroundSize: "10px 2px", backgroundImage: "repeating-linear-gradient(90deg, hsl(var(--itbid-magenta)) 0, hsl(var(--itbid-magenta)) 5px, transparent 5px, transparent 10px)" }}
                />
              </div>
            </div>

            {/* Efficiency Score */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm mt-8 border-[hsl(var(--itbid-magenta)/0.2)]">
              <div className="flex items-center gap-6">
                <ScoreRing 
                  score={35} 
                  size={100} 
                  strokeWidth={8}
                  label="Eficiencia"
                  glowOnHigh={false}
                />
                <div>
                  <p className="text-lg font-semibold text-[hsl(var(--itbid-magenta))] itbid-font">Modelo Actual</p>
                  <p className="text-sm text-muted-foreground">
                    Solo el 35% de eficiencia en intercambio de datos
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
