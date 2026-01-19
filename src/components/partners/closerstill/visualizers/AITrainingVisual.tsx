import { motion } from "framer-motion";
import { Brain, Database, Lock } from "lucide-react";

const AITrainingVisual = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Data Silos */}
      {[
        { x: -70, y: -30, delay: 0 },
        { x: -70, y: 30, delay: 0.3 },
        { x: 70, y: -30, delay: 0.6 },
        { x: 70, y: 30, delay: 0.9 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute flex flex-col items-center"
          style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)` }}
        >
          <div className="relative p-2 bg-slate-700 rounded">
            <Database className="h-4 w-4 text-slate-400" />
            <Lock className="absolute -bottom-1 -right-1 h-2 w-2 text-green-400" />
          </div>
          {/* Data flow line */}
          <motion.div
            className="absolute w-8 h-0.5"
            style={{
              left: pos.x < 0 ? "100%" : "auto",
              right: pos.x > 0 ? "100%" : "auto",
              background: "linear-gradient(90deg, transparent, #60a5fa, transparent)",
            }}
            animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
            transition={{ duration: 2, delay: pos.delay, repeat: Infinity }}
          />
        </motion.div>
      ))}

      {/* Central AI Chip */}
      <motion.div
        className="relative z-10 p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl"
        animate={{
          boxShadow: [
            "0 0 20px rgba(139, 92, 246, 0.3)",
            "0 0 40px rgba(139, 92, 246, 0.6)",
            "0 0 20px rgba(139, 92, 246, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Brain className="h-8 w-8 text-white" />
      </motion.div>

      {/* Precision Meter */}
      <div className="absolute right-4 top-4 flex flex-col items-end">
        <span className="text-[10px] text-slate-500 mb-1">Precisión</span>
        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
            initial={{ width: "30%" }}
            animate={{ width: ["30%", "95%", "95%", "30%"] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
        <motion.span
          className="text-xs text-green-400 font-bold mt-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          +65%
        </motion.span>
      </div>

      {/* Label */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        Entrenamiento Federado Seguro
      </div>
    </div>
  );
};

export default AITrainingVisual;
