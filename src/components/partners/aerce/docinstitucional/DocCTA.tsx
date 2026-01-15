import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/AnimatedSection";
import { 
  ArrowRight, Users, GraduationCap, Award, 
  Calendar, ExternalLink, FileText
} from "lucide-react";

const nextSteps = [
  {
    icon: Users,
    title: "Hazte Socio",
    description: "Únete a la comunidad de profesionales de Compras más grande de España.",
    action: "Solicitar información",
    href: "https://www.aerce.org",
    external: true,
  },
  {
    icon: GraduationCap,
    title: "Formación",
    description: "Consulta nuestro catálogo de programas formativos y encuentra el tuyo.",
    action: "Ver programas",
    href: "https://www.aerce.org",
    external: true,
  },
  {
    icon: Award,
    title: "Certificación",
    description: "Inicia el proceso de certificación UNE 15896 para tu departamento.",
    action: "Más información",
    href: "https://www.aerce.org",
    external: true,
  },
  {
    icon: Calendar,
    title: "Eventos",
    description: "Descubre los próximos eventos y reserva tu plaza.",
    action: "Ver agenda",
    href: "https://www.aerce.org",
    external: true,
  },
];

export const DocCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600/10 via-background to-blue-500/5">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre cómo AERCE puede ayudarte a impulsar tu carrera y la función de Compras de tu organización.
            </p>
          </div>
        </FadeIn>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {nextSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all hover:border-blue-600/50 group">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                    <step.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  <a 
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                  >
                    {step.action}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <FadeIn delay={0.3}>
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white max-w-3xl mx-auto">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Únete a AERCE hoy
              </h3>
              <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                Más de 30 años impulsando la excelencia en la función de Compras. 
                Forma parte de la comunidad profesional de referencia en España.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="https://www.aerce.org" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Web Oficial AERCE
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
                <Link to="/partners/aerce/login">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 gap-2">
                    Acceso Miembros
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Document Navigation */}
        <FadeIn delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link to="/partners/aerce/proyecto">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Doc Proyecto
              </Button>
            </Link>
            <Button variant="secondary" size="sm" disabled className="gap-2">
              <FileText className="h-4 w-4" />
              Doc Institucional
            </Button>
            <Link to="/partners/aerce/whitepaper">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                White Paper
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
