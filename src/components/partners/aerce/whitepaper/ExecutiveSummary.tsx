import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, Target, TrendingUp } from "lucide-react";

const summaryPoints = [
  {
    icon: AlertTriangle,
    title: "El Desafío",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    content: "La función de Compras enfrenta una transformación sin precedentes. La digitalización, la sostenibilidad, las disrupciones en la cadena de suministro y la escasez de talento cualificado exigen un nuevo perfil de profesional: el CPO estratégico."
  },
  {
    icon: Lightbulb,
    title: "La Visión AERCE",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    content: "AERCE lidera la profesionalización de las Compras en España desde hace 30 años. Nuestra visión es convertir la función de Compras en un motor estratégico de creación de valor, desarrollando profesionales certificados capaces de liderar esta transformación."
  },
  {
    icon: Target,
    title: "Propuesta de Valor",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    content: "Un ecosistema integral de desarrollo profesional: certificación UNE 15896 reconocida internacionalmente, formación de primer nivel con EADA y ESIC, networking exclusivo en el Foro CPO, y acceso a investigación y benchmarking salarial."
  },
  {
    icon: TrendingUp,
    title: "Impacto Transformador",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    content: "Los profesionales certificados AERCE generan un 25% más de ahorro, reducen un 40% los riesgos de suministro y posicionan a sus organizaciones como líderes en sostenibilidad y compliance. La certificación UNE 15896 es la única norma europea en Compras."
  }
];

export const ExecutiveSummary = () => {
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
            01 — Resumen Ejecutivo
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            La Nueva Era del CPO Estratégico
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {summaryPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className={`shrink-0 p-3 rounded-xl ${point.bgColor}`}>
                      <point.icon className={`h-6 w-6 ${point.color}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg mb-2 ${point.color}`}>
                        {point.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {point.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "+30", label: "Años de Historia" },
            { value: "2.000+", label: "Profesionales" },
            { value: "UNE", label: "Certificación" },
            { value: "IFPSM", label: "Internacional" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="text-center p-4 rounded-xl bg-muted/50"
            >
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
