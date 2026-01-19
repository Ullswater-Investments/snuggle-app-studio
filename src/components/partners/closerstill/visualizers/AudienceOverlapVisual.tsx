import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useState, useEffect } from "react";

const AudienceOverlapVisual = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(0);
      const timer = setTimeout(() => {
        let current = 0;
        const countUp = setInterval(() => {
          current += 2;
          if (current >= 40) {
            clearInterval(countUp);
            setPercentage(40);
          } else {
            setPercentage(current);
          }
        }, 50);
      }, 1500);
      return () => clearTimeout(timer);
    }, 5000);

    // Initial animation
    setTimeout(() => {
      let current = 0;
      const countUp = setInterval(() => {
        current += 2;
        if (current >= 40) {
          clearInterval(countUp);
          setPercentage(40);
        } else {
          setPercentage(current);
        }
      }, 50);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Circle A */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-rose-500/30 border-2 border-rose-400"
        style={{ mixBlendMode: "screen" }}
        initial={{ x: -60 }}
        animate={{ x: [-60, -30, -30, -60] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <span className="absolute top-1/2 left-2 -translate-y-1/2 text-xs text-rose-300 font-medium">
          Marca A
        </span>
      </motion.div>

      {/* Circle B */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-blue-500/30 border-2 border-blue-400"
        style={{ mixBlendMode: "screen" }}
        initial={{ x: 60 }}
        animate={{ x: [60, 30, 30, 60] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-xs text-blue-300 font-medium">
          Marca B
        </span>
      </motion.div>

      {/* Overlap indicator */}
      <motion.div
        className="absolute z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.3, 0.4, 0.9, 1] }}
      >
        <span className="text-2xl font-bold text-white">{percentage}%</span>
        <span className="text-xs text-slate-400">Match</span>
        <div className="mt-1 p-1 bg-green-500/20 rounded">
          <Lock className="h-3 w-3 text-green-400" />
        </div>
      </motion.div>

      {/* Label */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        Compute-to-Data: Datos Protegidos
      </div>
    </div>
  );
};

export default AudienceOverlapVisual;
