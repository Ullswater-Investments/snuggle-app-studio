import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, Shield, Map, Activity, 
  TrendingUp, Zap, CheckCircle2, XCircle 
} from "lucide-react";

const tiposRiesgo = [
  {
    categoria: "Riesgo Operativo",
    icon: Activity,
    ejemplos: ["Disrupción de suministro", "Fallas de calidad", "Retrasos logísticos"],
    impacto: "Alto",
    probabilidad: "Media",
    color: "amber"
  },
  {
    categoria: "Riesgo Financiero",
    icon: TrendingUp,
    ejemplos: ["Insolvencia de proveedores", "Volatilidad de precios", "Fluctuaciones cambiarias"],
    impacto: "Alto",
    probabilidad: "Media",
    color: "red"
  },
  {
    categoria: "Riesgo Geopolítico",
    icon: Map,
    ejemplos: ["Conflictos comerciales", "Sanciones", "Inestabilidad regional"],
    impacto: "Muy Alto",
    probabilidad: "Baja",
    color: "purple"
  },
  {
    categoria: "Riesgo Reputacional",
    icon: Shield,
    ejemplos: ["Violaciones ESG", "Trabajo infantil", "Corrupción en cadena"],
    impacto: "Muy Alto",
    probabilidad: "Baja",
    color: "blue"
  }
];

const estrategiasMitigacion = [
  { estrategia: "Diversificación de proveedores", efectividad: 90 },
  { estrategia: "Monitorización en tiempo real", efectividad: 85 },
  { estrategia: "Stock estratégico de seguridad", efectividad: 80 },
  { estrategia: "Contratos con cláusulas de protección", efectividad: 75 },
  { estrategia: "Auditorías preventivas periódicas", efectividad: 70 },
  { estrategia: "Planes de contingencia actualizados", efectividad: 85 }
];

export const GestionRiesgos = () => {
  return (
    <div className="py-16 px-4 bg-muted/30 border-b">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-red-600 uppercase tracking-wider">
            07 — Gestión de Riesgos
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-2 text-foreground/80">
            Resiliencia en la Cadena de Suministro
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl">
            Las disrupciones de 2020-2024 demostraron la vulnerabilidad de las cadenas globales. 
            El CPO moderno debe dominar la identificación, evaluación y mitigación de riesgos.
          </p>
        </motion.div>

        {/* Risk Types Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {tiposRiesgo.map((riesgo, index) => (
            <motion.div
              key={riesgo.categoria}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full border-${riesgo.color}-200/50`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${riesgo.color}-500/10`}>
                        <riesgo.icon className={`h-5 w-5 text-${riesgo.color}-600`} />
                      </div>
                      <CardTitle className="text-base">{riesgo.categoria}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {riesgo.ejemplos.map((ejemplo) => (
                      <li key={ejemplo} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        {ejemplo}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3 pt-2">
                    <Badge variant={riesgo.impacto === "Muy Alto" ? "destructive" : "outline"}>
                      Impacto: {riesgo.impacto}
                    </Badge>
                    <Badge variant="secondary">
                      Prob: {riesgo.probabilidad}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Risk Matrix Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Map className="h-6 w-6 text-purple-600" />
                <CardTitle>Matriz de Riesgos en Cadena de Suministro</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                <div className="col-span-1" />
                <div className="text-center text-xs text-muted-foreground pb-2">Bajo</div>
                <div className="text-center text-xs text-muted-foreground pb-2">Medio</div>
                <div className="text-center text-xs text-muted-foreground pb-2">Alto</div>
                
                <div className="text-xs text-muted-foreground text-right pr-2 flex items-center justify-end">Alto</div>
                <div className="h-12 rounded bg-amber-300/50 flex items-center justify-center text-xs">Medio</div>
                <div className="h-12 rounded bg-red-400/50 flex items-center justify-center text-xs">Alto</div>
                <div className="h-12 rounded bg-red-600/50 flex items-center justify-center text-xs text-white">Crítico</div>
                
                <div className="text-xs text-muted-foreground text-right pr-2 flex items-center justify-end">Medio</div>
                <div className="h-12 rounded bg-green-300/50 flex items-center justify-center text-xs">Bajo</div>
                <div className="h-12 rounded bg-amber-300/50 flex items-center justify-center text-xs">Medio</div>
                <div className="h-12 rounded bg-red-400/50 flex items-center justify-center text-xs">Alto</div>
                
                <div className="text-xs text-muted-foreground text-right pr-2 flex items-center justify-end">Bajo</div>
                <div className="h-12 rounded bg-green-200/50 flex items-center justify-center text-xs">Mínimo</div>
                <div className="h-12 rounded bg-green-300/50 flex items-center justify-center text-xs">Bajo</div>
                <div className="h-12 rounded bg-amber-300/50 flex items-center justify-center text-xs">Medio</div>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-4">
                Probabilidad → | ↑ Impacto
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mitigation Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-blue-600/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <CardTitle>Estrategias de Mitigación</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {estrategiasMitigacion.map((item, index) => (
                  <motion.div
                    key={item.estrategia}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.estrategia}</span>
                      <span className="text-sm text-emerald-600">{item.efectividad}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.efectividad}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.08 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                      />
                    </div>
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
