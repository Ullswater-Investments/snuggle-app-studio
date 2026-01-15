import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  Building2, Users, UserCheck, MapPin, 
  Crown, Briefcase, Scale
} from "lucide-react";

const governanceOrgans = [
  {
    icon: Crown,
    title: "Junta Directiva",
    description: "Órgano de gobierno máximo, formado por profesionales de reconocido prestigio que marcan la estrategia de la asociación.",
    members: "12 miembros",
  },
  {
    icon: Briefcase,
    title: "Comités de Trabajo",
    description: "Grupos especializados en formación, certificación, eventos, comunicación e internacionalización.",
    members: "6 comités activos",
  },
  {
    icon: MapPin,
    title: "Delegaciones Territoriales",
    description: "Presencia en las principales comunidades autónomas para garantizar cercanía y representación local.",
    members: "8 delegaciones",
  },
];

const boardStats = [
  { value: "12", label: "Miembros Junta" },
  { value: "6", label: "Comités de Trabajo" },
  { value: "8", label: "Delegaciones" },
  { value: "100%", label: "Voluntariado" },
];

export const DocGobernanza = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600/10 text-blue-600 border-blue-600/30">
              <Building2 className="h-3 w-3 mr-1" />
              Sección 4
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Órganos de Gobierno
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Una estructura democrática y participativa que garantiza la representación 
              de todos los asociados y la gestión eficiente de la asociación.
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            {boardStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-xl bg-card border"
              >
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Governance Organs */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12">
          {governanceOrgans.map((organ) => (
            <StaggerItem key={organ.title}>
              <Card className="h-full hover:shadow-lg transition-shadow hover:border-blue-600/50">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4">
                    <organ.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{organ.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">{organ.members}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{organ.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Participation Note */}
        <FadeIn delay={0.3}>
          <Card className="bg-gradient-to-br from-blue-600/5 to-blue-500/5 border-blue-600/30 max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Participación Abierta</h4>
                  <p className="text-muted-foreground">
                    Todos los órganos de gobierno de AERCE están formados por profesionales en activo 
                    que dedican su tiempo de forma voluntaria. Cualquier asociado puede participar 
                    en comités de trabajo y presentar su candidatura a la Junta Directiva.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Transparency */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <Card className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-emerald-600/10 to-emerald-500/10 border-emerald-600/30">
              <Scale className="h-8 w-8 text-emerald-600" />
              <div className="text-left">
                <p className="font-semibold">Transparencia Institucional</p>
                <p className="text-sm text-muted-foreground">
                  Memorias anuales, cuentas auditadas y actas disponibles para asociados
                </p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
