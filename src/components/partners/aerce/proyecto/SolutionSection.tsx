import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { GraduationCap, Award, Users, CheckCircle2, Globe, Building2 } from "lucide-react";

const pillars = [
  {
    icon: GraduationCap,
    title: "Formación de Excelencia",
    description: "Programas formativos diseñados por profesionales para profesionales, con reconocimiento nacional e internacional.",
    features: ["Masters especializados", "Formación in-company", "Certificaciones"],
  },
  {
    icon: Award,
    title: "Certificación Profesional",
    description: "Norma UNE 15896 de Compras de Valor Añadido, el estándar europeo de excelencia en la función de Compras.",
    features: ["Norma UNE 15896", "Auditorías AENOR", "Reconocimiento europeo"],
  },
  {
    icon: Users,
    title: "Comunidad Profesional",
    description: "La mayor red de directores de compras de España: eventos, foros y espacios de networking estratégico.",
    features: ["Foro CPO", "Networking", "Benchmarking"],
  },
];

export const SolutionSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 mb-4">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">La Solución AERCE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
              Ecosistema de Excelencia Profesional
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AERCE proporciona las herramientas, el conocimiento y la red necesarios para 
              elevar la función de Compras al nivel estratégico que merece.
            </p>
          </div>
        </FadeIn>

        {/* Comparison */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {/* Without AERCE */}
            <Card className="border-rose-500/30 bg-rose-500/5">
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-rose-500">Sin AERCE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-rose-500">✗</span>
                  <span>Formación genérica sin especialización</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-rose-500">✗</span>
                  <span>Sin certificación reconocida</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-rose-500">✗</span>
                  <span>Aislamiento profesional</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-rose-500">✗</span>
                  <span>Sin voz en el sector</span>
                </div>
              </CardContent>
            </Card>

            {/* With AERCE */}
            <Card className="border-blue-600/30 bg-blue-600/5">
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-blue-600">Con AERCE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-blue-600">✓</span>
                  <span>Masters y programas expertos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-blue-600">✓</span>
                  <span>Certificación UNE 15896</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-blue-600">✓</span>
                  <span>Red de +2.000 profesionales</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-blue-600">✓</span>
                  <span>Representación institucional</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>

        {/* Pillars */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <Card className="h-full hover:shadow-lg hover:shadow-blue-600/10 transition-all duration-300 hover:border-blue-600/50 group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                    <pillar.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{pillar.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* IFPSM Badge */}
        <FadeIn delay={0.5}>
          <div className="flex justify-center mt-12">
            <Card className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-600/10 to-blue-500/10 border-blue-600/30">
              <Globe className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-semibold">Miembro IFPSM</p>
                <p className="text-sm text-muted-foreground">Federación Internacional de Gestión de Compras</p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
