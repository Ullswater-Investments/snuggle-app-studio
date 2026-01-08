import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, Target, TrendingUp } from "lucide-react";

const summaryPoints = [
  {
    icon: AlertTriangle,
    title: "El Problema",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    content: "Las cadenas de suministro actuales operan con silos de datos fragmentados. Cada empresa gestiona su información de proveedores de forma aislada, generando duplicación de esfuerzos, falta de trazabilidad y dependencia de plataformas cerradas que no respetan la soberanía del dato."
  },
  {
    icon: Lightbulb,
    title: "La Solución",
    color: "text-[hsl(var(--itbid-cyan))]",
    bgColor: "bg-[hsl(var(--itbid-cyan)/0.1)]",
    content: "ITBID-X implementa un Espacio de Datos Federado basado en los estándares Gaia-X e IDSA. Esto permite a las organizaciones compartir datos de forma selectiva, manteniendo control absoluto sobre quién accede, bajo qué condiciones y durante cuánto tiempo."
  },
  {
    icon: Target,
    title: "Propuesta de Valor",
    color: "text-[hsl(var(--itbid-lime))]",
    bgColor: "bg-[hsl(var(--itbid-lime)/0.1)]",
    content: "Una infraestructura de confianza que permite validar proveedores, compartir certificaciones ESG y colaborar con socios comerciales sin ceder el control de la información. Todo ello con trazabilidad inmutable en blockchain y cumplimiento normativo europeo."
  },
  {
    icon: TrendingUp,
    title: "Impacto Esperado",
    color: "text-[hsl(var(--itbid-purple))]",
    bgColor: "bg-[hsl(var(--itbid-purple)/0.1)]",
    content: "Reducción del 40% en tiempos de validación de proveedores, eliminación de auditorías redundantes, y preparación para la regulación CSRD de reporting de sostenibilidad. ITBID-X posiciona a sus clientes como líderes de la transformación digital industrial europea."
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
          <span className="text-sm font-medium text-[hsl(var(--itbid-cyan))] uppercase tracking-wider">
            01 — Resumen Ejecutivo
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 itbid-gradient-gray">
            De la Digitalización a la Federación
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
            { value: "28", label: "Tablas RLS" },
            { value: "100%", label: "Trazabilidad" },
            { value: "GDPR", label: "Compliant" },
            { value: "Web3", label: "Enabled" },
          ].map((metric, i) => (
            <div
              key={metric.label}
              className="text-center p-4 rounded-xl bg-muted/50"
            >
              <p className="text-2xl font-bold itbid-gradient">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
