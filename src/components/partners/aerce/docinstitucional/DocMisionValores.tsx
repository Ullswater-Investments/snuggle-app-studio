import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  Target, Heart, Lightbulb, Scale, 
  Users, Shield, TrendingUp, Sparkles 
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Excelencia",
    description: "Buscamos la mejora continua en todo lo que hacemos, promoviendo los más altos estándares profesionales.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Scale,
    title: "Ética",
    description: "Actuamos con integridad, transparencia y respeto en todas nuestras relaciones profesionales.",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    icon: Sparkles,
    title: "Innovación",
    description: "Impulsamos la transformación digital y las nuevas metodologías en la función de Compras.",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Fomentamos el trabajo en red, el intercambio de conocimiento y las alianzas estratégicas.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
  },
];

const missionVision = {
  mission: {
    title: "Nuestra Misión",
    content: "Maximizar el valor de la función de Compras en las organizaciones, elevando el reconocimiento profesional de los compradores y proporcionando las herramientas, conocimiento y red necesarios para su desarrollo.",
    icon: Target,
  },
  vision: {
    title: "Nuestra Visión",
    content: "Ser la referencia indiscutible en la profesionalización de las Compras en España, posicionando a los profesionales como actores estratégicos clave en la transformación de las organizaciones.",
    icon: TrendingUp,
  },
};

export const DocMisionValores = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600/10 text-blue-600 border-blue-600/30">
              <Heart className="h-3 w-3 mr-1" />
              Sección 3
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Misión y Valores
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Los principios que guían nuestra actuación y definen nuestra identidad como asociación.
            </p>
          </div>
        </FadeIn>

        {/* Mission & Vision Cards */}
        <FadeIn delay={0.1}>
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="border-t-4 border-t-blue-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-4">
                  <missionVision.mission.icon className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{missionVision.mission.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{missionVision.mission.content}</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-amber-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <missionVision.vision.icon className="h-7 w-7 text-amber-500" />
                </div>
                <CardTitle className="text-xl">{missionVision.vision.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{missionVision.vision.content}</p>
              </CardContent>
            </Card>
          </div>
        </FadeIn>

        {/* Values Grid */}
        <FadeIn delay={0.2}>
          <h3 className="text-2xl font-semibold text-center mb-8">Nuestros Valores</h3>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow group">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 rounded-2xl ${value.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Code of Ethics */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <Card className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-600/10 to-blue-500/10 border-blue-600/30">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold">Código Ético AERCE</p>
                <p className="text-sm text-muted-foreground">
                  Todos los asociados suscriben nuestro código ético de conducta profesional
                </p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
