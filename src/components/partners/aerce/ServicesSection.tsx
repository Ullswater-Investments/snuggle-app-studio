import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Users, BookOpen, Trophy, Network } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Formación Especializada",
    description: "Masters, cursos expertos y formación in-company líderes en el mercado para potenciar tu carrera profesional.",
    features: ["Master en Gestión de Compras", "Cursos Especializados", "Formación In-Company"],
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Award,
    title: "Certificación UNE 15896",
    description: "Certificación europea de Compras de Valor Añadido para departamentos que buscan la excelencia operativa.",
    features: ["Estándar Europeo", "Auditoría Profesional", "Mejora Continua"],
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: Users,
    title: "Comunidad y Networking",
    description: "Acceso a congresos, desayunos de trabajo y la mayor red de directores de compras de España.",
    features: ["Foro CPO", "Noche de las Compras", "Grupos de Trabajo"],
    color: "bg-green-50 text-green-600 border-green-100",
  },
  {
    icon: BookOpen,
    title: "Publicaciones y Recursos",
    description: "Acceso exclusivo a estudios, informes y benchmarks del sector de compras y aprovisionamientos.",
    features: ["Estudios de Mercado", "Benchmarks Salariales", "Mejores Prácticas"],
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: Trophy,
    title: "Premios y Reconocimientos",
    description: "Programa de premios que reconoce la excelencia y la innovación en la función de compras.",
    features: ["Premios AERCE", "Casos de Éxito", "Reconocimiento Sectorial"],
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    icon: Network,
    title: "Red Internacional",
    description: "Conexión con asociaciones europeas e internacionales de compras para ampliar tu horizonte profesional.",
    features: ["IFPSM", "Networking Global", "Best Practices EU"],
    color: "bg-cyan-50 text-cyan-600 border-cyan-100",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Qué aporta AERCE?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Servicios diseñados para potenciar la función de compras en tu organización
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${service.color}`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
