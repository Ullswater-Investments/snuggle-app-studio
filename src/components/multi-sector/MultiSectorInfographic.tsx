import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, ChevronDown, ArrowDown, Factory, HeartPulse, ShoppingBag, Zap, Users, Wheat, Shield, Settings, Globe, Scale, Database, GitBranch } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LayerData {
  id: string;
  icon: typeof Network;
  nodes: { icon: typeof Network; label: string }[];
  details: string[];
}

const layers: LayerData[] = [
  {
    id: "nodes",
    icon: Network,
    nodes: [
      { icon: Factory, label: "Industrial" },
      { icon: ShoppingBag, label: "Comercio" },
      { icon: Wheat, label: "Agro" },
    ],
    details: [
      "Nodos sectoriales independientes: cada sector opera su propio nodo con reglas, catálogo y gobernanza específicos",
      "6 sectores prioritarios: Industrial (51%), Comercio (15%), Agroalimentario (12%), Movilidad (10%), Salud (7%), Economía Social (5%)",
      "Marca blanca configurable: cada nodo puede personalizar interfaz, logotipos, colores y dominio propio",
      "Catálogo sectorial especializado: data products específicos con esquemas JSON-LD adaptados a cada industria",
      "Onboarding sectorial: flujo de alta adaptado con campos y validaciones específicas del sector",
    ],
  },
  {
    id: "governance",
    icon: Scale,
    nodes: [
      { icon: Shield, label: "IDSA Rulebook" },
      { icon: Scale, label: "Políticas ODRL" },
      { icon: GitBranch, label: "Multi-Tenant" },
    ],
    details: [
      "Gobernanza descentralizada: cada nodo define sus propias reglas de acceso, precios y participación",
      "IDSA Rulebook: marco de gobernanza basado en International Data Spaces para interoperabilidad entre nodos",
      "Políticas ODRL sectoriales: contratos digitales con cláusulas específicas por industria (CBAM, MDR, Sedex)",
      "Multi-Tenant con RLS: aislamiento total de datos entre organizaciones y sectores mediante Row Level Security",
      "Comité de gobernanza: estructura de toma de decisiones con representantes de cada nodo sectorial",
    ],
  },
  {
    id: "federation",
    icon: Globe,
    nodes: [
      { icon: Database, label: "Catálogo Federado" },
      { icon: Globe, label: "Cross-Sector" },
      { icon: Network, label: "Interoperabilidad" },
    ],
    details: [
      "Federación de catálogos: descubrimiento de datos entre nodos sin centralizar la información",
      "Transacciones cross-sector: un fabricante industrial puede solicitar datos agroalimentarios de su cadena de suministro",
      "Interoperabilidad semántica: vocabularios compartidos (DCAT-AP, JSON-LD) para entender datos entre sectores",
      "Smart Contracts inter-nodo: contratos inteligentes que gestionan pagos y accesos entre diferentes sectores",
      "Red Gaia-X: cada nodo sectorial se registra como participante verificado en el ecosistema europeo",
    ],
  },
  {
    id: "monetization",
    icon: Settings,
    nodes: [
      { icon: Zap, label: "Marketplace" },
      { icon: HeartPulse, label: "Value Services" },
      { icon: Users, label: "Ecosistema" },
    ],
    details: [
      "Marketplace sectorial: cada nodo opera su propio marketplace con productos de datos especializados",
      "Monetización por nodo: modelo de ingresos adaptado (suscripción, pay-per-use, freemium) según el sector",
      "Value-Added Services: servicios premium como scoring ESG, benchmarking anónimo y analytics predictivo",
      "Ecosistema de partners: asociaciones sectoriales (GAIA, FEIQUE, FNSEA, ANFIA, etc.) operan sus propios nodos",
      "Token EUROe: sistema de pagos unificado con stablecoin europeo para transacciones entre nodos",
    ],
  },
];

const LAYER_COLORS = [
  { bg: "from-violet-500/10 to-purple-500/10", border: "border-violet-500/30", accent: "text-violet-500", pulse: "bg-violet-500" },
  { bg: "from-amber-500/10 to-orange-500/10", border: "border-amber-500/30", accent: "text-amber-500", pulse: "bg-amber-500" },
  { bg: "from-cyan-500/10 to-blue-500/10", border: "border-cyan-500/30", accent: "text-cyan-500", pulse: "bg-cyan-500" },
  { bg: "from-emerald-500/10 to-teal-500/10", border: "border-emerald-500/30", accent: "text-emerald-500", pulse: "bg-emerald-500" },
];

export const MultiSectorInfographic = () => {
  const { t } = useTranslation("multiSector");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="relative max-w-3xl mx-auto">
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
