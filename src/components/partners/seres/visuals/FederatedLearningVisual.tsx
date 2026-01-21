import { motion } from "framer-motion";
import { Building2, Server, ArrowUp, ArrowDown, Brain, Shield, Lock } from "lucide-react";

export const FederatedLearningVisual = () => {
  const localNodes = [
    { id: 1, name: "Cliente A", color: "bg-emerald-500" },
    { id: 2, name: "Cliente B", color: "bg-blue-500" },
    { id: 3, name: "Cliente C", color: "bg-purple-500" },
    { id: 4, name: "Cliente D", color: "bg-amber-500" }
  ];

  return (
    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
      <div className="space-y-8">
        {/* Central Aggregator */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="relative"
          >
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex flex-col items-center justify-center shadow-xl shadow-blue-500/30">
              <Brain className="h-10 w-10 text-white mb-1" />
              <span className="text-xs text-white/80 font-medium">Modelo Global</span>
            </div>
            
            {/* SERES Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                <Server className="h-3 w-3 text-blue-400" />
                <span className="text-xs text-white font-medium">SERES Coordinator</span>
              </div>
            </motion.div>

            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl border-2 border-blue-400"
            />
          </motion.div>
        </div>

        {/* Gradient Flow Arrows */}
        <div className="flex justify-center gap-8">
          {/* Gradients Up */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-1"
          >
            <ArrowUp className="h-6 w-6 text-emerald-400" />
            <span className="text-[10px] text-emerald-400">Gradientes</span>
          </motion.div>
          
          {/* Model Down */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-1"
          >
            <ArrowDown className="h-6 w-6 text-blue-400" />
            <span className="text-[10px] text-blue-400">Modelo actualizado</span>
          </motion.div>
        </div>

        {/* Local Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {localNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="relative"
            >
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
                <div className={`w-12 h-12 rounded-xl ${node.color} mx-auto flex items-center justify-center mb-2`}>
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-medium text-white">{node.name}</div>
                <div className="text-xs text-slate-500 mt-1">Datos locales</div>
                
                {/* Data stays local indicator */}
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-red-400">
                  <Lock className="h-3 w-3" />
                  <span>Privado</span>
                </div>
              </div>

              {/* Connection line to center */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-t from-slate-600 to-transparent origin-bottom"
              />
            </motion.div>
          ))}
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="grid md:grid-cols-3 gap-4 pt-4"
        >
          <div className="flex items-center gap-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Shield className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-emerald-300">Privacidad Absoluta</div>
              <div className="text-xs text-slate-500">Datos nunca salen del origen</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Brain className="h-5 w-5 text-blue-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-blue-300">IA Colaborativa</div>
              <div className="text-xs text-slate-500">Modelo aprende de todos</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <Lock className="h-5 w-5 text-purple-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-purple-300">Privacidad Diferencial</div>
              <div className="text-xs text-slate-500">Imposible reconstruir datos</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FederatedLearningVisual;
