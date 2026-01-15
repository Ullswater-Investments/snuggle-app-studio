import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  Globe, Building2, Handshake, Flag,
  Network, Award
} from "lucide-react";

const internationalPartners = [
  {
    name: "IFPSM",
    fullName: "International Federation of Purchasing and Supply Management",
    description: "Federación mundial que agrupa a las asociaciones de Compras de más de 40 países.",
    region: "Global",
  },
  {
    name: "BME",
    fullName: "Bundesverband Materialwirtschaft, Einkauf und Logistik",
    description: "Asociación alemana de Compras y Logística, referente europeo en la profesión.",
    region: "Alemania",
  },
  {
    name: "CIPS",
    fullName: "Chartered Institute of Procurement & Supply",
    description: "Instituto británico de Compras y Aprovisionamiento con presencia internacional.",
    region: "Reino Unido",
  },
];

const internationalActivities = [
  {
    icon: Network,
    title: "Benchmarking Global",
    description: "Comparativa de prácticas y resultados con organizaciones de todo el mundo.",
  },
  {
    icon: Handshake,
    title: "Intercambios Profesionales",
    description: "Programas de visitas e intercambio con asociaciones homólogas.",
  },
  {
    icon: Award,
    title: "Certificaciones Internacionales",
    description: "Reconocimiento mutuo de certificaciones con otras asociaciones.",
  },
];

export const DocInternacional = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600/10 text-blue-600 border-blue-600/30">
              <Globe className="h-3 w-3 mr-1" />
              Sección 8
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Presencia Internacional
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              AERCE conecta a los profesionales españoles con la comunidad global de Compras, 
              aportando visión internacional y mejores prácticas mundiales.
            </p>
          </div>
        </FadeIn>

        {/* International Partners */}
        <FadeIn delay={0.1}>
          <h3 className="text-xl font-semibold text-center mb-6">Alianzas Estratégicas</h3>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12">
          {internationalPartners.map((partner) => (
            <StaggerItem key={partner.name}>
              <Card className="h-full hover:shadow-lg transition-shadow hover:border-blue-600/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{partner.region}</Badge>
                    <Flag className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-2xl mt-4">{partner.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{partner.fullName}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{partner.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* International Activities */}
        <FadeIn delay={0.2}>
          <Card className="bg-gradient-to-br from-blue-600/5 to-blue-500/5 border-blue-600/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Actividades Internacionales</CardTitle>
                  <p className="text-muted-foreground">Conectando con el mundo</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {internationalActivities.map((activity, index) => (
                  <motion.div
                    key={activity.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mx-auto mb-3">
                      <activity.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Global Stats */}
        <FadeIn delay={0.3}>
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { value: "40+", label: "Países IFPSM" },
              { value: "5", label: "Continentes" },
              { value: "1M+", label: "Profesionales Red" },
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
