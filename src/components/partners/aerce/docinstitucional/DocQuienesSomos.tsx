import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  Target, Building2, Users, TrendingUp, 
  Award, Zap 
} from "lucide-react";

const keyPoints = [
  {
    icon: Building2,
    title: "Representación Institucional",
    description: "AERCE es la voz oficial de los profesionales de Compras ante instituciones, administraciones públicas y organismos internacionales.",
    color: "hsl(220 80% 45%)",
  },
  {
    icon: Users,
    title: "Comunidad Profesional",
    description: "Más de 2.000 profesionales y 500 empresas forman parte de la comunidad AERCE, compartiendo conocimiento y mejores prácticas.",
    color: "hsl(220 60% 55%)",
  },
  {
    icon: Award,
    title: "Excelencia Certificada",
    description: "Impulsores de la Norma UNE 15896, el único estándar europeo que certifica la excelencia de los departamentos de Compras.",
    color: "hsl(45 80% 55%)",
  },
];

const proposalBenefits = [
  "Acceso a formación especializada de primer nivel",
  "Red de contactos con los principales CPOs de España",
  "Certificación de excelencia para departamentos de Compras",
  "Representación institucional ante organismos públicos",
  "Benchmarking y mejores prácticas del sector",
];

export const DocQuienesSomos = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600/10 text-blue-600 border-blue-600/30">
              <Target className="h-3 w-3 mr-1" />
              Sección 1
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Quiénes Somos?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              AERCE es la Asociación Española de Profesionales de Compras, Contratación y Aprovisionamientos, 
              referente institucional desde 1992 para los profesionales de la función de Compras en España.
            </p>
          </div>
        </FadeIn>

        {/* Key Points */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12">
          {keyPoints.map((point) => (
            <StaggerItem key={point.title}>
              <Card className="h-full border-t-4 hover:shadow-lg transition-shadow" style={{ borderTopColor: point.color }}>
                <CardHeader>
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${point.color}20` }}
                  >
                    <point.icon className="h-7 w-7" style={{ color: point.color }} />
                  </div>
                  <CardTitle className="text-xl">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Value Proposition */}
        <FadeIn delay={0.2}>
          <Card className="bg-gradient-to-br from-blue-600/5 to-blue-500/5 border-blue-600/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">¿Por qué AERCE?</CardTitle>
                  <p className="text-muted-foreground">La propuesta de valor para profesionales y empresas</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Beneficios clave
                  </h4>
                  <ul className="space-y-3">
                    {proposalBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card/50 rounded-xl p-6 border">
                  <h4 className="font-semibold mb-4">Nuestra Misión</h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-600/10 border border-blue-600/20">
                      <p className="text-sm font-medium text-blue-600">🎯 Objetivo Principal</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Maximizar el valor de la función de Compras en las organizaciones.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <p className="text-sm font-medium text-amber-600">✓ Compromiso</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Elevar el reconocimiento profesional de los compradores al nivel estratégico que merecen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
