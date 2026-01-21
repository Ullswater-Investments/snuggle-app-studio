import { motion } from "framer-motion";
import { FileSignature, ArrowRight, Hexagon, Coins, Banknote, CheckCircle2, Zap } from "lucide-react";

export const TokenizationVisual = () => {
  const steps = [
    {
      id: 1,
      title: "Validación",
      description: "Factura validada por SERES",
      icon: FileSignature,
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 2,
      title: "Tokenización",
      description: "Acuñación de NFT con derecho de cobro",
      icon: Hexagon,
      color: "from-purple-500 to-violet-600"
    },
    {
      id: 3,
      title: "Pool de Liquidez",
      description: "NFT depositado como colateral",
      icon: Coins,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 4,
      title: "Liquidación EURAU",
      description: "Pago instantáneo al proveedor",
      icon: Banknote,
      color: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
      <div className="space-y-8">
        {/* Main Flow */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex-1 min-w-[120px]"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-3 relative`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                  
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{step.id}</span>
                  </div>
                </motion.div>

                <h4 className="text-sm font-semibold text-white text-center mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 text-center max-w-[130px]">
                  {step.description}
                </p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.1 }}
                  className="hidden md:block absolute top-8"
                  style={{ left: `calc(${(index + 1) * 25}% - 10px)` }}
                >
                  <ArrowRight className="h-5 w-5 text-slate-600" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Benefits Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid md:grid-cols-3 gap-4"
        >
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-300">Liquidación Atómica</span>
            </div>
            <p className="text-xs text-slate-400">
              Pago instantáneo sin T+2 de bancos tradicionales
            </p>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">Zero-Knowledge</span>
            </div>
            <p className="text-xs text-slate-400">
              Detalles comerciales ocultos con ZK-Proofs
            </p>
          </div>

          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300">Acceso Global</span>
            </div>
            <p className="text-xs text-slate-400">
              Pools DeFi, fondos institucionales, tesorerías
            </p>
          </div>
        </motion.div>

        {/* EURAU Integration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/20"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">€AU</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Stablecoin EURAU</div>
                <div className="text-xs text-slate-400">AllUnity · Entidad e-money regulada EU</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Integrado en Pontus-X</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TokenizationVisual;
