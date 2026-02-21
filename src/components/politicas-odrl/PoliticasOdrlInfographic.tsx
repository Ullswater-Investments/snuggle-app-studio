import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Ban, Receipt, Clock, ChevronDown, ArrowDown, Eye, BarChart3, FileSearch, XCircle, ShoppingCart, Globe, Coins, FileBarChart, Bell, Timer, MapPin, Layers, Database } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LayerData {
  id: string;
  icon: typeof CheckCircle2;
  nodes: { icon: typeof CheckCircle2; label: string }[];
  details: string[];
}

const layers: LayerData[] = [
  {
    id: "permissions",
    icon: CheckCircle2,
    nodes: [
      { icon: Eye, label: "Lectura" },
      { icon: BarChart3, label: "Análisis" },
      { icon: FileSearch, label: "Homologación" },
    ],
    details: [
      "Acciones autorizadas: read, analyze, aggregate — granularidad por campo de datos",
      "Duración de acceso configurable: P90D, P180D, P365D según acuerdo",
      "Propósito obligatorio: ESG reporting, homologación de proveedores, benchmarking sectorial",
      "Cada permiso se codifica en JSON-LD siguiendo el vocabulario ODRL 2.0 del W3C",
    ],
  },
  {
    id: "prohibitions",
    icon: Ban,
    nodes: [
      { icon: XCircle, label: "Redistribución" },
      { icon: ShoppingCart, label: "Reventa" },
      { icon: Globe, label: "Uso Externo" },
    ],
    details: [
      "Prohibición de distribuir datos a terceros no autorizados en el contrato digital",
      "Reventa de datos derivados vetada: los insights generados heredan las restricciones",
      "Uso fuera del ámbito acordado detectado automáticamente por el Smart Contract",
      "Violaciones registradas en blockchain Pontus-X con sello de tiempo inmutable",
    ],
  },
  {
    id: "duties",
    icon: Receipt,
    nodes: [
      { icon: Coins, label: "Pago EUROe" },
      { icon: FileBarChart, label: "Reporte Uso" },
      { icon: Bell, label: "Auditoría" },
    ],
    details: [
      "Pago automático vía Smart Contract: 1 EUROe pay-per-use o 300 EUROe/mes suscripción",
      "Generación obligatoria de reportes de uso con frecuencia mensual o por acceso",
      "Notificación automática al proveedor en cada acceso a sus datos",
      "Auditoría continua con trazabilidad completa en el ledger de Pontus-X",
    ],
  },
  {
    id: "constraints",
    icon: Clock,
    nodes: [
      { icon: Timer, label: "Duración 90d" },
      { icon: MapPin, label: "Solo UE" },
      { icon: Layers, label: "Sector Específico" },
    ],
    details: [
      "Validez temporal configurable: P90D (trimestral), P365D (anual), custom periods",
      "Restricción geográfica: procesamiento exclusivo en territorio de la Unión Europea",
      "Sector permitido: automotive, aerospace, chemical, energy — según Self-Description",
      "Volumen máximo de consultas por período para prevenir extracción masiva",
    ],
  },
];

const LAYER_COLORS = [
  { bg: "from-emerald-500/10 to-green-500/10", border: "border-emerald-500/30", accent: "text-emerald-500", pulse: "bg-emerald-500" },
  { bg: "from-red-500/10 to-rose-500/10", border: "border-red-500/30", accent: "text-red-500", pulse: "bg-red-500" },
  { bg: "from-amber-500/10 to-orange-500/10", border: "border-amber-500/30", accent: "text-amber-500", pulse: "bg-amber-500" },
  { bg: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/30", accent: "text-blue-500", pulse: "bg-blue-500" },
];

export const PoliticasOdrlInfographic = () => {
  const { t } = useTranslation("politicasOdrl");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Animated connection arrows between layers */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <line x1="50%" y1={`${25 * (i + 1)}%`} x2="50%" y2={`${25 * (i + 1) + 2}%`} stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 4" opacity="0.3" />
            <motion.circle cx="50%" r="4" fill="hsl(var(--primary))" animate={{ cy: [`${25 * (i + 1) - 2}%`, `${25 * (i + 1) + 4}%`] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.4 }} opacity={0.6} />
          </g>
        ))}
      </svg>

      <div className="relative z-10 space-y-6">
        {layers.map((layer, idx) => {
          const colors = LAYER_COLORS[idx];
          const Icon = layer.icon;
          const isOpen = expanded === layer.id;

          return (
            <motion.div key={layer.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}>
              <button
                onClick={() => setExpanded(isOpen ? null : layer.id)}
                className={`w-full text-left rounded-2xl border ${colors.border} bg-gradient-to-r ${colors.bg} p-5 transition-shadow hover:shadow-lg group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-background/80 flex items-center justify-center ${colors.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        {t(`layers.${layer.id}.label`)}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">{t(`layers.${layer.id}.title`)}</h3>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  {layer.nodes.map((node, ni) => {
                    const NodeIcon = node.icon;
                    return (
                      <div key={ni} className="flex items-center gap-3">
                        <motion.div
                          className={`relative w-14 h-14 rounded-xl bg-background/90 border ${colors.border} flex flex-col items-center justify-center gap-1`}
                          animate={{ scale: [1, 1.04, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: ni * 0.3 }}
                        >
                          <motion.div
                            className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${colors.pulse}`}
                            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: ni * 0.4 }}
                          />
                          <NodeIcon className={`w-4 h-4 ${colors.accent}`} />
                          <span className="text-[9px] font-medium text-muted-foreground leading-none">{node.label}</span>
                        </motion.div>
                        {ni < layer.nodes.length - 1 && (
                          <motion.div className="flex items-center gap-0.5">
                            {[0, 1, 2].map((di) => (
                              <motion.div key={di} className={`w-1.5 h-1.5 rounded-full ${colors.pulse}`} animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: di * 0.2 + ni * 0.3 }} />
                            ))}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </button>

              {idx < layers.length - 1 && (
                <div className="flex justify-center py-2">
                  <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowDown className="w-5 h-5 text-primary/50" />
                  </motion.div>
                </div>
              )}

              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className={`mt-2 rounded-xl border ${colors.border} bg-card p-4 space-y-2`}>
                      {layer.details.map((detail, di) => (
                        <motion.div key={di} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: di * 0.08 }} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Database className={`w-3 h-3 mt-0.5 flex-shrink-0 ${colors.accent}`} />
                          <span>{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
