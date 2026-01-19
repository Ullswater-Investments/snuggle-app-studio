import { motion } from "framer-motion";
import { Radar, Shield, AlertTriangle } from "lucide-react";

const CyberThreatVisual = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Radar base */}
      <div className="relative w-32 h-32">
        {/* Concentric circles */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 border border-slate-700/50 rounded-full"
            style={{ transform: `scale(${i * 0.33})` }}
          />
        ))}

        {/* Radar sweep */}
        <motion.div
          className="absolute inset-0 origin-center"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.3) 30deg, transparent 60deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-2 bg-blue-600 rounded-full">
            <Radar className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Threat detection */}
        <motion.div
          className="absolute"
          style={{ top: "20%", right: "20%" }}
          animate={{
            opacity: [0, 0, 1, 1, 0],
            scale: [0.5, 0.5, 1, 1, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </motion.div>

        {/* Protection wave */}
        <motion.div
          className="absolute inset-0 border-2 border-blue-400/50 rounded-full"
          initial={{ scale: 0.3, opacity: 1 }}
          animate={{
            scale: [0.3, 1.5, 1.5, 0.3],
            opacity: [0, 0.8, 0, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Protected nodes around */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 70}px)`,
            top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 60}px)`,
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
        >
          <Shield className="h-4 w-4 text-green-400" />
        </motion.div>
      ))}

      {/* Label */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        Alerta Temprana Colectiva
      </div>
    </div>
  );
};

export default CyberThreatVisual;
