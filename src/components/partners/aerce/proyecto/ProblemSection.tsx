import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { AlertTriangle, BookOpen, TrendingDown, Users2, Target } from "lucide-react";

const problems = [
  {
    icon: BookOpen,
    title: "Formación Dispersa",
    description: "Programas formativos fragmentados sin reconocimiento profesional estandarizado a nivel europeo.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-l-amber-500/50",
  },
  {
    icon: TrendingDown,
    title: "Falta de Reconocimiento",
    description: "La función de Compras infravalorada en las organizaciones, sin voz en comités de dirección.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-l-rose-500/50",
  },
  {
    icon: Users2,
    title: "Aislamiento Profesional",
    description: "Profesionales trabajando en silos sin acceso a redes de conocimiento y mejores prácticas.",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    borderColor: "border-l-blue-600/50",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Los Retos del Profesional</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
              El Desafío de las Compras
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Los profesionales de Compras enfrentan barreras estructurales que limitan 
              su desarrollo y el reconocimiento de su aportación estratégica.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <StaggerItem key={problem.title}>
              <Card className={`h-full border-l-4 ${problem.borderColor} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl ${problem.bgColor} flex items-center justify-center mb-4`}>
                    <problem.icon className={`h-7 w-7 ${problem.color}`} />
                  </div>
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Card className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-600/10 to-blue-500/10 border-blue-600/30">
              <Target className="h-8 w-8 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold">¿La solución?</p>
                <p className="text-sm text-muted-foreground">Una asociación profesional que impulse la excelencia</p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
