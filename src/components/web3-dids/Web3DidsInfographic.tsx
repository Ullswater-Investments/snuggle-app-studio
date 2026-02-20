import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, ShieldCheck, Box, Coins, ChevronDown, ArrowDown, Key, Wallet, UserCheck, Award, Send, CheckCircle2, Hexagon, FileCode, Zap, CreditCard, RefreshCw, Receipt, Database } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LayerData {
  id: string;
  icon: typeof Fingerprint;
  nodes: { icon: typeof Fingerprint; label: string }[];
  details: string[];
}

const layers: LayerData[] = [
  {
    id: "ssi",
    icon: Fingerprint,
    nodes: [
      { icon: Key, label: "DID did:ethr" },
      { icon: Wallet, label: "Wallet Corp." },
      { icon: UserCheck, label: "KYB" },
    ],
    details: [
      "DID (Decentralized Identifier): formato did:ethr:0x7ecc:0x... — identidad única y verificable on-chain",
      "Wallet corporativa: MetaMask o Rabby con clave privada custodiada por la organización",
      "KYB (Know Your Business): verificación de identidad empresarial vía DeltaDAO y Self-Description Gaia-X",
      "Identidad auto-gestionada (SSI): sin intermediarios centrales, soberanía total sobre los datos de identidad",
    ],
  },
  {
    id: "credentials",
    icon: ShieldCheck,
    nodes: [
      { icon: Award, label: "Emisión" },
      { icon: Send, label: "Presentación" },
      { icon: CheckCircle2, label: "Verificación" },
    ],
    details: [
      "Emisión de VCs por organizaciones verificadas en el Trust Framework de Gaia-X",
      "Presentación selectiva (zero-knowledge): compartir solo los atributos necesarios sin revelar datos sensibles",
      "Verificación on-chain: comprobación criptográfica instantánea de autenticidad y vigencia",
      "W3C Verifiable Credentials Data Model: estándar internacional para credenciales digitales interoperables",
    ],
  },
  {
    id: "blockchain",
    icon: Box,
    nodes: [
      { icon: Hexagon, label: "Data NFTs" },
      { icon: FileCode, label: "DDOs" },
      { icon: Zap, label: "Smart Contracts" },
    ],
    details: [
      "Data NFTs (ERC-721): cada activo de datos es un token único que garantiza propiedad soberana",
      "DDOs (Decentralized Data Objects): metadata DCAT-AP indexada por Aquarius para descubrimiento",
      "Smart Contracts: ejecución automática de políticas ODRL y Fixed Rate Exchange en Pontus-X",
      "Blockchain Pontus-X (Chain ID 32460): infraestructura Gaia-X basada en Ocean Protocol",
    ],
  },
  {
    id: "euroe",
    icon: Coins,
    nodes: [
      { icon: CreditCard, label: "Pay-per-use" },
      { icon: RefreshCw, label: "Suscripción" },
      { icon: Receipt, label: "Liquidación" },
    ],
    details: [
      "Pay-per-use: 1 EUROe por transacción — micropago automático vía Smart Contract",
      "Suscripción mensual: 300 EUROe/mes con acceso ilimitado a activos del mismo proveedor",
      "Liquidación automática: Smart Contract ejecuta pago al momento del acceso sin intermediarios",
      "Trazabilidad completa: cada pago registrado en blockchain con sello de tiempo inmutable",
    ],
  },
];

const LAYER_COLORS = [
  { bg: "from-violet-500/10 to-purple-500/10", border: "border-violet-500/30", accent: "text-violet-500", pulse: "bg-violet-500" },
  { bg: "from-teal-500/10 to-cyan-500/10", border: "border-teal-500/30", accent: "text-teal-500", pulse: "bg-teal-500" },
  { bg: "from-orange-500/10 to-amber-500/10", border: "border-orange-500/30", accent: "text-orange-500", pulse: "bg-orange-500" },
  { bg: "from-emerald-500/10 to-green-500/10", border: "border-emerald-500/30", accent: "text-emerald-500", pulse: "bg-emerald-500" },
];

export const Web3DidsInfographic = () => {
  const { t } = useTranslation("web3Dids");
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
