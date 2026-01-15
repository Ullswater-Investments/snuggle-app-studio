import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { Calendar, Flag, Award, Users, Globe, Building2 } from "lucide-react";

const timelineEvents = [
  {
    year: "1992",
    title: "Fundación de AERCE",
    description: "Un grupo de profesionales visionarios funda la asociación para dignificar la función de Compras.",
    icon: Flag,
    color: "bg-blue-600",
  },
  {
    year: "2000",
    title: "Primer Congreso Nacional",
    description: "Se celebra el primer gran evento que reúne a profesionales de Compras de toda España.",
    icon: Users,
    color: "bg-emerald-600",
  },
  {
    year: "2007",
    title: "Norma UNE 15896",
    description: "AERCE impulsa la creación del primer estándar europeo de Compras de Valor Añadido.",
    icon: Award,
    color: "bg-amber-500",
  },
  {
    year: "2012",
    title: "Foro CPO",
    description: "Se crea el espacio exclusivo para directores de compras de grandes organizaciones.",
    icon: Building2,
    color: "bg-purple-600",
  },
  {
    year: "2018",
    title: "Integración IFPSM",
    description: "AERCE se convierte en miembro activo de la Federación Internacional de Gestión de Compras.",
    icon: Globe,
    color: "bg-cyan-600",
  },
  {
    year: "2024",
    title: "Alianza PROCUREDATA",
    description: "Colaboración estratégica para impulsar la digitalización y soberanía del dato en Compras.",
    icon: Building2,
    color: "bg-rose-500",
  },
];

export const DocHistoria = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600/10 text-blue-600 border-blue-600/30">
              <Calendar className="h-3 w-3 mr-1" />
              Sección 2
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              +30 Años de Historia
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Desde 1992, AERCE ha liderado la transformación de la función de Compras en España, 
              marcando hitos que han definido la profesión.
            </p>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2" />

            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-6 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"} pl-16 md:pl-0`}>
                  <Card className="inline-block text-left hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${event.color}/10 mb-3`}>
                        <span className={`text-sm font-bold ${event.color.replace('bg-', 'text-')}`}>
                          {event.year}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Node */}
                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full ${event.color} flex items-center justify-center z-10 shadow-lg`}>
                  <event.icon className="h-5 w-5 text-white" />
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <Card className="inline-flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-blue-600/10 to-blue-500/10 border-blue-600/30">
              <div className="text-left">
                <p className="font-semibold text-lg">Mirando al Futuro</p>
                <p className="text-sm text-muted-foreground">
                  AERCE continúa evolucionando para afrontar los retos de la digitalización, 
                  la sostenibilidad y la transformación de la cadena de suministro.
                </p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
