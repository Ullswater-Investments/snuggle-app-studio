import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Calendar, Award, MessageCircle, 
  Crown, Sparkles, Star, ArrowRight 
} from "lucide-react";

const eventosAerce = [
  {
    nombre: "Foro CPO",
    descripcion: "Encuentro exclusivo para directores de Compras con agenda de alto nivel y networking premium.",
    frecuencia: "Anual",
    asistentes: "200+",
    formato: "Presencial",
    destacado: true
  },
  {
    nombre: "La Noche de las Compras",
    descripcion: "Gala de reconocimiento a los mejores profesionales y equipos de Compras de España.",
    frecuencia: "Anual",
    asistentes: "300+",
    formato: "Presencial",
    destacado: true
  },
  {
    nombre: "Desayunos CPO",
    descripcion: "Sesiones temáticas en pequeño formato para debate e intercambio de experiencias.",
    frecuencia: "Mensual",
    asistentes: "30-50",
    formato: "Híbrido",
    destacado: false
  },
  {
    nombre: "Webinars AERCE",
    descripcion: "Sesiones online sobre tendencias, normativa y mejores prácticas en Compras.",
    frecuencia: "Quincenal",
    asistentes: "100+",
    formato: "Online",
    destacado: false
  }
];

const beneficiosRed = [
  {
    icon: MessageCircle,
    titulo: "Intercambio de Experiencias",
    descripcion: "Aprende de los retos y soluciones de otros CPOs en sesiones confidenciales."
  },
  {
    icon: Users,
    titulo: "Directorio de Contactos",
    descripcion: "Acceso a la red de +2.000 profesionales de Compras verificados."
  },
  {
    icon: Award,
    titulo: "Reconocimiento Profesional",
    descripcion: "Visibilidad en premios, publicaciones y eventos del sector."
  },
  {
    icon: Sparkles,
    titulo: "Oportunidades de Carrera",
    descripcion: "Acceso prioritario a posiciones de dirección en empresas asociadas."
  }
];

export const NetworkingCPO = () => {
  return (
    <div className="py-16 px-4 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-purple-600 uppercase tracking-wider">
            08 — Networking y Comunidad
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            La Red de CPOs Más Potente de España
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            El networking de calidad es fundamental para el desarrollo profesional. 
            AERCE ofrece espacios exclusivos para conectar con peers de alto nivel.
          </p>
        </motion.div>

        {/* Featured Events */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {eventosAerce.filter(e => e.destacado).map((evento, index) => (
            <motion.div
              key={evento.nombre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-amber-200/50 bg-gradient-to-br from-amber-500/5 to-transparent">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Crown className="h-6 w-6 text-amber-500" />
                      <CardTitle>{evento.nombre}</CardTitle>
                    </div>
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{evento.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{evento.frecuencia}</Badge>
                    <Badge variant="outline">{evento.asistentes} asistentes</Badge>
                    <Badge variant="secondary">{evento.formato}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Regular Events */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {eventosAerce.filter(e => !e.destacado).map((evento, index) => (
            <motion.div
              key={evento.nombre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-base">{evento.nombre}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{evento.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">{evento.frecuencia}</Badge>
                    <Badge variant="secondary" className="text-xs">{evento.formato}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Network Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-600" />
                <CardTitle>Beneficios de la Red AERCE</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                {beneficiosRed.map((beneficio, index) => (
                  <motion.div
                    key={beneficio.titulo}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 p-2 h-fit rounded-lg bg-blue-600/10">
                      <beneficio.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{beneficio.titulo}</h4>
                      <p className="text-sm text-muted-foreground">{beneficio.descripcion}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
