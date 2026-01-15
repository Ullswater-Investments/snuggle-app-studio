import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  Award, CheckCircle2, FileCheck, Building2, 
  TrendingUp, Shield, Users, ArrowRight 
} from "lucide-react";

const certificationBenefits = [
  {
    icon: TrendingUp,
    title: "Mejora de Resultados",
    description: "Las empresas certificadas reportan un 15-25% de mejora en indicadores clave de compras.",
  },
  {
    icon: Shield,
    title: "Reconocimiento Europeo",
    description: "La Norma UNE 15896 es el estándar de referencia en toda Europa para la función de Compras.",
  },
  {
    icon: Users,
    title: "Cultura de Excelencia",
    description: "Impulsa una cultura de mejora continua y profesionalización en toda la organización.",
  },
  {
    icon: Building2,
    title: "Ventaja Competitiva",
    description: "Diferenciación en licitaciones y relaciones con proveedores estratégicos.",
  },
];

const certificationProcess = [
  { step: 1, title: "Diagnóstico Inicial", description: "Evaluación del estado actual del departamento" },
  { step: 2, title: "Plan de Mejora", description: "Identificación de gaps y acciones correctivas" },
  { step: 3, title: "Implementación", description: "Ejecución del plan con soporte AERCE" },
  { step: 4, title: "Auditoría AENOR", description: "Verificación independiente del cumplimiento" },
  { step: 5, title: "Certificación", description: "Obtención del sello UNE 15896" },
];

export const CertificationSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 mb-4">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">Norma UNE 15896</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
              Certificación de Excelencia
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              La certificación UNE 15896 de Compras de Valor Añadido es el estándar europeo 
              que acredita la excelencia de los departamentos de Compras.
            </p>
          </div>
        </FadeIn>

        {/* Benefits */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certificationBenefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow hover:border-amber-500/50">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                    <benefit.icon className="h-7 w-7 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Process */}
        <FadeIn delay={0.2}>
          <Card className="bg-gradient-to-br from-amber-500/5 to-amber-600/5 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Proceso de Certificación</CardTitle>
                  <p className="text-muted-foreground">5 pasos hacia la excelencia</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                {certificationProcess.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-card rounded-xl p-4 border h-full">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm mb-3">
                        {step.step}
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                    {index < certificationProcess.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 h-5 w-5 text-amber-500/50" />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* AENOR Badge */}
        <FadeIn delay={0.4}>
          <div className="flex justify-center mt-12">
            <Card className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/30">
              <Shield className="h-8 w-8 text-amber-600" />
              <div>
                <p className="font-semibold">Auditorías AENOR</p>
                <p className="text-sm text-muted-foreground">Entidad certificadora de referencia en España</p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
