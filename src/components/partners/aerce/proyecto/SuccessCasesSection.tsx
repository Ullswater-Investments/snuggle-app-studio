import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { Quote, Star, Building2, Award, Users } from "lucide-react";

const testimonials = [
  {
    quote: "La certificación UNE 15896 transformó nuestro departamento. Pasamos de ser un centro de costes a convertirnos en un socio estratégico del negocio.",
    author: "María García",
    role: "Directora de Compras",
    company: "Empresa Industrial S.A.",
    sector: "Industria",
    highlight: "+20% ahorro anual",
  },
  {
    quote: "El Foro CPO de AERCE nos ha permitido aprender de las mejores prácticas del sector y establecer relaciones profesionales que han sido clave para nuestro crecimiento.",
    author: "Carlos Martínez",
    role: "Chief Procurement Officer",
    company: "Grupo Distribución",
    sector: "Retail",
    highlight: "Red de contactos",
  },
  {
    quote: "El Master de AERCE cambió mi carrera. Los conocimientos adquiridos y la red de contactos me abrieron las puertas a mi actual posición como CPO.",
    author: "Laura Sánchez",
    role: "CPO",
    company: "Tech Solutions",
    sector: "Tecnología",
    highlight: "Promoción profesional",
  },
];

const impactMetrics = [
  { icon: Building2, value: "+100", label: "Empresas Certificadas UNE" },
  { icon: Users, value: "+5.000", label: "Profesionales Formados" },
  { icon: Award, value: "30+", label: "Años de Excelencia" },
  { icon: Star, value: "4.8/5", label: "Satisfacción Media" },
];

export const SuccessCasesSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/10 text-emerald-600 mb-4">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Casos de Éxito</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
              Profesionales que Transforman
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre cómo los miembros de AERCE han impulsado su carrera 
              y transformado sus organizaciones.
            </p>
          </div>
        </FadeIn>

        {/* Testimonials */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <Card className="h-full hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-4 right-4 text-blue-600/10">
                  <Quote className="h-16 w-16" />
                </div>
                <CardContent className="pt-6 relative z-10">
                  <Badge className="mb-4 bg-emerald-600/10 text-emerald-600 border-emerald-600/30">
                    {testimonial.highlight}
                  </Badge>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-4 text-xs">
                    {testimonial.sector}
                  </Badge>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Impact Metrics */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card border hover:border-blue-600/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mx-auto mb-3">
                  <metric.icon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
