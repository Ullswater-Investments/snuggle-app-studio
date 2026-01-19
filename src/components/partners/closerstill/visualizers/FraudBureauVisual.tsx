import { motion } from "framer-motion";
import { Shield, Store, Lock } from "lucide-react";

const FraudBureauVisual = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Central Shield Node */}
      <motion.div
        className="absolute z-20 p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Shield className="h-8 w-8 text-white" />
      </motion.div>

      {/* Store Nodes */}
      {[
        { x: -70, y: -50, delay: 0 },
        { x: 70, y: -50, delay: 0.5 },
        { x: -70, y: 50, delay: 1 },
        { x: 70, y: 50, delay: 1.5 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute p-2 bg-slate-700 rounded-lg"
          style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)` }}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, delay: pos.delay, repeat: Infinity }}
        >
          <Store className="h-5 w-5 text-slate-300" />
          <motion.div
            className="absolute -top-1 -right-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 2, delay: pos.delay + 0.3, repeat: Infinity }}
          >
            <Lock className="h-3 w-3 text-green-400" />
          </motion.div>
        </motion.div>
      ))}

      {/* Attack Animation */}
      <motion.div
        className="absolute w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
        initial={{ x: -100, y: -80, opacity: 0 }}
        animate={{
          x: [-100, -20, -100],
          y: [-80, 0, -80],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Shield Pulse Effect */}
      <motion.div
        className="absolute w-20 h-20 border-2 border-blue-400/30 rounded-full"
        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Label */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        Inmunidad de Rebaño Digital
      </div>
    </div>
  );
};

export default FraudBureauVisual;
