import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  GraduationCap, Award, Users, Calendar, 
  Mic, BookOpen, Globe, Building2, Trophy
} from "lucide-react";

const ecosystemElements = [
  {
    icon: GraduationCap,
    title: "Programas Formativos",
    description: "Masters, cursos expertos y formación in-company para todos los niveles profesionales.",
    items: ["Master en Dirección de Compras", "Curso Experto en Negociación", "Formación a Medida"],
    color: "bg-blue-600",
  },
  {
    icon: Award,
    title: "Certificación UNE",
    description: "El único estándar europeo que certifica la excelencia de departamentos de Compras.",
    items: ["Auditoría AENOR", "Mejora Continua", "Reconocimiento Internacional"],
    color: "bg-amber-500",
  },
  {
    icon: Mic,
    title: "Foro CPO",
    description: "El espacio exclusivo para directores de compras con intercambio de experiencias.",
    items: ["Sesiones Mensuales", "Casos Prácticos", "Networking Ejecutivo"],
    color: "bg-emerald-600",
  },
  {
    icon: Trophy,
    title: "La Noche de las Compras",
    description: "El evento anual que reconoce la excelencia y reúne a toda la comunidad.",
    items: ["Premios Anuales", "Gala de Networking", "Reconocimiento Público"],
    color: "bg-purple-600",
  },
  {
    icon: Calendar,
    title: "Eventos y Congresos",
    description: "Agenda de eventos durante todo el año para mantenerte actualizado.",
    items: ["Congreso Nacional", "Desayunos de Trabajo", "Jornadas Sectoriales"],
    color: "bg-rose-500",
  },
  {
    icon: Globe,
    title: "Red Internacional",
    description: "Conexión con asociaciones homólogas de todo el mundo a través de IFPSM.",
    items: ["Benchmarking Global", "Estándares Internacionales", "Intercambios"],
    color: "bg-cyan-600",
  },
];

export const EcosystemSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 mb-4">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">Ecosistema AERCE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
              Un Universo de Oportunidades
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre todos los elementos que conforman el ecosistema AERCE: 
              formación, certificación, networking y reconocimiento profesional.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystemElements.map((element) => (
            <StaggerItem key={element.title}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
                <div className={`h-1 ${element.color}`} />
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${element.color}/10 flex items-center justify-center mb-3`}>
                    <element.icon className={`h-6 w-6 text-foreground`} />
                  </div>
                  <CardTitle className="text-lg">{element.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{element.description}</p>
                  <div className="space-y-2">
                    {element.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full ${element.color}`} />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats */}
        <FadeIn delay={0.4}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "+30", label: "Años de Historia" },
              { value: "+2.000", label: "Profesionales" },
              { value: "+500", label: "Empresas Asociadas" },
              { value: "+50", label: "Eventos al Año" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-center p-6 rounded-xl bg-card border"
              >
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
