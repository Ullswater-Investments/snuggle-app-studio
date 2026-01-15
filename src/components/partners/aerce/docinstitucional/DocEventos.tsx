import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  Calendar, Trophy, Coffee, Mic, 
  Users, MapPin, Star
} from "lucide-react";

const events = [
  {
    icon: Trophy,
    title: "Congreso Nacional AERCE",
    description: "El evento anual más importante del sector, reuniendo a cientos de profesionales de Compras de toda España.",
    frequency: "Anual",
    attendees: "+500",
    color: "bg-blue-600",
  },
  {
    icon: Mic,
    title: "Foro CPO",
    description: "Encuentros exclusivos para directores de compras de grandes organizaciones con intercambio de experiencias.",
    frequency: "Mensual",
    attendees: "+50",
    color: "bg-purple-600",
  },
  {
    icon: Star,
    title: "La Noche de las Compras",
    description: "Gala anual de premios que reconoce la excelencia y los logros de los profesionales del sector.",
    frequency: "Anual",
    attendees: "+300",
    color: "bg-amber-500",
  },
  {
    icon: Coffee,
    title: "Desayunos de Trabajo",
    description: "Sesiones matinales con ponentes expertos sobre temas de actualidad en Compras.",
    frequency: "Bimensual",
    attendees: "+30",
    color: "bg-emerald-600",
  },
];

const eventStats = [
  { value: "+50", label: "Eventos al Año" },
  { value: "+3.000", label: "Asistentes Anuales" },
  { value: "8", label: "Ciudades" },
  { value: "4.9/5", label: "Valoración" },
];

export const DocEventos = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600/10 text-blue-600 border-blue-600/30">
              <Calendar className="h-3 w-3 mr-1" />
              Sección 7
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Eventos y Networking
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Una agenda repleta de oportunidades para aprender, conectar y crecer profesionalmente.
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {eventStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card border"
              >
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Events Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <StaggerItem key={event.title}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className={`h-1 ${event.color}`} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl ${event.color}/10 flex items-center justify-center`}>
                      <event.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{event.frequency}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-4">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {event.attendees} asistentes
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Networking Note */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <Card className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-600/10 to-blue-500/10 border-blue-600/30">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold">Presencia Nacional</p>
                <p className="text-sm text-muted-foreground">
                  Eventos en Madrid, Barcelona, Valencia, Bilbao, Sevilla y más ciudades
                </p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
