import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Sparkles, Globe } from "lucide-react";

const highlights = [
  {
    icon: Building2,
    title: "Más de 30 años de historia",
    description: "Fundada en 1988, AERCE ha sido testigo y protagonista de la evolución de la función de compras en España.",
  },
  {
    icon: Target,
    title: "Misión clara",
    description: "Maximizar el valor de la función de Compras en las organizaciones mediante formación, certificación y networking.",
  },
  {
    icon: Sparkles,
    title: "Innovación continua",
    description: "Liderando la transformación digital de la función de compras con herramientas y metodologías de vanguardia.",
  },
  {
    icon: Globe,
    title: "Alcance internacional",
    description: "Miembro de IFPSM, conectando a profesionales españoles con las mejores prácticas globales.",
  },
];

export const AboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              La referencia institucional en Compras
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              AERCE (Asociación Española de Profesionales de Compras, Contratación y Aprovisionamientos) 
              es la voz de los profesionales de compras en España. Con más de tres décadas de experiencia, 
              hemos acompañado a miles de profesionales en su desarrollo profesional.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nuestra misión es elevar el estándar de la profesión, proporcionando las herramientas, 
              conocimientos y conexiones que los profesionales de compras necesitan para generar valor 
              en sus organizaciones.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                #Compras
              </span>
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                #Aprovisionamiento
              </span>
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                #SupplyChain
              </span>
              <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                #ForoCPO
              </span>
            </div>
          </motion.div>

          {/* Right Content - Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-0 shadow-sm bg-gradient-to-br from-white to-blue-50/50">
                  <CardContent className="p-5">
                    <item.icon className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
