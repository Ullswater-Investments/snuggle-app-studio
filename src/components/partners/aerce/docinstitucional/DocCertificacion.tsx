import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { 
  Award, CheckCircle2, TrendingUp, Shield,
  FileCheck, Building2, ArrowRight, Users
} from "lucide-react";

const certificationBenefits = [
  {
    icon: TrendingUp,
    title: "Mejora de Resultados",
    description: "Las empresas certificadas reportan mejoras del 15-25% en indicadores clave de compras.",
  },
  {
    icon: Shield,
    title: "Reconocimiento Europeo",
    description: "La Norma UNE 15896 es el estándar de referencia en toda Europa.",
  },
  {
    icon: Users,
    title: "Cultura de Excelencia",
    description: "Impulsa una cultura de mejora continua en toda la organización.",
  },
  {
    icon: Building2,
    title: "Ventaja Competitiva",
    description: "Diferenciación en licitaciones y relaciones con proveedores.",
  },
];

const certificationProcess = [
  { step: 1, title: "Diagnóstico", description: "Evaluación inicial del departamento" },
  { step: 2, title: "Plan de Mejora", description: "Identificación de gaps" },
  { step: 3, title: "Implementación", description: "Ejecución con soporte AERCE" },
  { step: 4, title: "Auditoría", description: "Verificación por AENOR" },
  { step: 5, title: "Certificación", description: "Obtención del sello UNE" },
];

export const DocCertificacion = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/30">
              <Award className="h-3 w-3 mr-1" />
              Sección 6
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Certificación UNE 15896
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              El único estándar europeo que certifica la excelencia de los departamentos de Compras, 
              impulsado por AERCE y auditado por AENOR.
            </p>
          </div>
        </FadeIn>

        {/* Benefits Grid */}
        <FadeIn delay={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {certificationBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow hover:border-amber-500/50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                      <benefit.icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Process */}
        <FadeIn delay={0.2}>
          <Card className="bg-gradient-to-br from-amber-500/5 to-amber-600/5 border-amber-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Proceso de Certificación</CardTitle>
                  <p className="text-muted-foreground">5 pasos hacia la excelencia</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {certificationProcess.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative text-center"
                  >
                    <div className="bg-card rounded-xl p-4 border h-full">
                      <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold mx-auto mb-3">
                        {step.step}
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.3}>
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { value: "+100", label: "Empresas Certificadas" },
              { value: "15-25%", label: "Mejora Media" },
              { value: "AENOR", label: "Entidad Auditora" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
              >
                <p className="text-xl font-bold text-amber-600">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
