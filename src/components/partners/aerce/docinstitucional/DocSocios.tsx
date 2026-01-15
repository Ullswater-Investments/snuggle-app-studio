import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { 
  Building2, Factory, ShoppingCart, Zap, 
  HeartPulse, Plane, Building, Users
} from "lucide-react";

const sectors = [
  { icon: Factory, name: "Industria", count: "+120" },
  { icon: ShoppingCart, name: "Retail", count: "+80" },
  { icon: Zap, name: "Energía", count: "+45" },
  { icon: HeartPulse, name: "Salud", count: "+60" },
  { icon: Plane, name: "Transporte", count: "+35" },
  { icon: Building, name: "Servicios", count: "+160" },
];

const membershipTypes = [
  {
    title: "Socio Individual",
    description: "Profesionales de Compras que quieren desarrollar su carrera y ampliar su red.",
    benefits: ["Acceso a formación", "Eventos networking", "Recursos digitales", "Certificación"],
  },
  {
    title: "Socio Corporativo",
    description: "Empresas que apuestan por la excelencia en su función de Compras.",
    benefits: ["Múltiples usuarios", "Formación in-company", "Certificación UNE", "Visibilidad marca"],
  },
];

export const DocSocios = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600/10 text-blue-600 border-blue-600/30">
              <Users className="h-3 w-3 mr-1" />
              Sección 9
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Empresas y Profesionales Asociados
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Más de 500 empresas y 2.000 profesionales de todos los sectores confían en AERCE 
              para impulsar su función de Compras.
            </p>
          </div>
        </FadeIn>

        {/* Sectors Grid */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="text-center p-4 rounded-xl bg-card border hover:border-blue-600/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center mx-auto mb-2">
                  <sector.icon className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-lg font-bold text-blue-600">{sector.count}</p>
                <p className="text-xs text-muted-foreground">{sector.name}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Membership Types */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {membershipTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <p className="text-muted-foreground">{type.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Key Stats */}
        <FadeIn delay={0.3}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "+500", label: "Empresas" },
              { value: "+2.000", label: "Profesionales" },
              { value: "IBEX 35", label: "Presencia" },
              { value: "30+", label: "Años Juntos" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-xl bg-card border"
              >
                <p className="text-xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
