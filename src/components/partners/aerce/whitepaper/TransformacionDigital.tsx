import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, Cloud, Database, LineChart, 
  Smartphone, Zap, ArrowRight, CheckCircle2 
} from "lucide-react";

const digitalTrends = [
  {
    icon: Bot,
    title: "IA y Automatización",
    description: "Análisis predictivo de demanda, automatización de procesos repetitivos y asistentes virtuales para negociación.",
    adoption: "78%",
    impact: "40% reducción tiempo operativo"
  },
  {
    icon: Cloud,
    title: "Cloud Procurement",
    description: "Plataformas SaaS que permiten gestión end-to-end desde cualquier ubicación con visibilidad en tiempo real.",
    adoption: "85%",
    impact: "60% mejora en colaboración"
  },
  {
    icon: Database,
    title: "Data-Driven Sourcing",
    description: "Decisiones basadas en datos de mercado, análisis de riesgo y benchmarking competitivo automatizado.",
    adoption: "72%",
    impact: "25% mejora en negociación"
  },
  {
    icon: LineChart,
    title: "Analytics Avanzado",
    description: "Dashboards en tiempo real, KPIs automatizados y reporting predictivo para la toma de decisiones.",
    adoption: "68%",
    impact: "35% más visibilidad"
  }
];

const competenciasDigitales = [
  "Gestión de plataformas e-Procurement",
  "Análisis de datos y Business Intelligence",
  "Automatización de procesos (RPA)",
  "Evaluación de tecnologías emergentes",
  "Gestión del cambio digital",
  "Ciberseguridad en la cadena de suministro"
];

export const TransformacionDigital = () => {
  return (
    <div className="py-16 px-4 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
            02 — Transformación Digital
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            El CPO en la Era Digital
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            La tecnología está redefiniendo la función de Compras. Los CPOs que dominen 
            las herramientas digitales liderarán la transformación de sus organizaciones.
          </p>
        </motion.div>

        {/* Digital Trends Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {digitalTrends.map((trend, index) => (
            <motion.div
              key={trend.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-blue-200/50 hover:border-blue-400 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-600/10">
                        <trend.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-base">{trend.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-blue-600 border-blue-600/30">
                      {trend.adoption} adopción
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{trend.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                    <Zap className="h-4 w-4" />
                    {trend.impact}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Digital Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-blue-600/5 to-transparent border-blue-200/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Smartphone className="h-6 w-6 text-blue-600" />
                <CardTitle>Competencias Digitales del CPO Moderno</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Las habilidades que AERCE desarrolla en sus programas formativos
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {competenciasDigitales.map((competencia, index) => (
                  <motion.div
                    key={competencia}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{competencia}</span>
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
