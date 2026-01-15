import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { 
  GraduationCap, BookOpen, Building2, Monitor,
  Award, Clock, Users, CheckCircle2
} from "lucide-react";

const programs = [
  {
    icon: GraduationCap,
    title: "Master en Dirección de Compras",
    description: "Programa executive de 9 meses para profesionales que quieren dar el salto a posiciones de dirección.",
    duration: "9 meses",
    format: "Presencial/Híbrido",
    level: "Executive",
    color: "bg-blue-600",
  },
  {
    icon: BookOpen,
    title: "Curso Experto en Negociación",
    description: "Formación intensiva en técnicas avanzadas de negociación para compradores profesionales.",
    duration: "3 meses",
    format: "Presencial",
    level: "Avanzado",
    color: "bg-amber-500",
  },
  {
    icon: Building2,
    title: "Formación In-Company",
    description: "Programas a medida diseñados para las necesidades específicas de cada organización.",
    duration: "A medida",
    format: "In-house",
    level: "Todos",
    color: "bg-emerald-600",
  },
  {
    icon: Monitor,
    title: "e-Learning AERCE",
    description: "Plataforma de formación online con cursos especializados y recursos de aprendizaje.",
    duration: "Flexible",
    format: "100% Online",
    level: "Todos",
    color: "bg-purple-600",
  },
];

const trainingStats = [
  { value: "+5.000", label: "Profesionales Formados" },
  { value: "+200", label: "Cursos Impartidos" },
  { value: "4.8/5", label: "Valoración Media" },
  { value: "+50", label: "Docentes Expertos" },
];

export const DocFormacion = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600/10 text-blue-600 border-blue-600/30">
              <GraduationCap className="h-3 w-3 mr-1" />
              Sección 5
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Programas de Formación
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Formación diseñada por profesionales de Compras para profesionales de Compras: 
              práctica, actualizada y orientada a resultados.
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {trainingStats.map((stat, index) => (
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

        {/* Programs Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {programs.map((program) => (
            <StaggerItem key={program.title}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className={`h-1 ${program.color}`} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl ${program.color}/10 flex items-center justify-center`}>
                      <program.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <Badge variant="outline">{program.level}</Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{program.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {program.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Monitor className="h-4 w-4" />
                      {program.format}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Certification Badge */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <Card className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-600/10 to-blue-500/10 border-blue-600/30">
              <Award className="h-8 w-8 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold">Certificación AERCE</p>
                <p className="text-sm text-muted-foreground">
                  Todos los programas incluyen certificado oficial de aprovechamiento
                </p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
