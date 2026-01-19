import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Search, CheckCircle, BarChart3 } from 'lucide-react';

const VCDueDiligenceVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      {/* Chart with magnifying glass */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <TrendingUp className="w-12 h-12 text-amber-400" />
        
        {/* Growing line effect */}
        <motion.div
          className="absolute bottom-2 left-2 right-2 h-0.5 bg-emerald-400 origin-left"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Magnifying glass moving */}
      <motion.div
        className="absolute"
        animate={{ 
          x: [-15, 15, -15],
          y: [-5, 5, -5],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Search className="w-8 h-8 text-blue-400" />
      </motion.div>

      {/* Data points being analyzed */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
          style={{ 
            left: `${30 + i * 15}%`,
            top: `${40 - i * 5}%`
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: i * 0.4
          }}
        />
      ))}

      {/* Verified badge */}
      <motion.div
        className="absolute right-3 top-2"
        animate={{ 
          scale: [0, 1, 1],
          opacity: [0, 1, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      >
        <CheckCircle className="w-5 h-5 text-emerald-400" />
      </motion.div>

      {/* Metrics snippet */}
      <motion.div
        className="absolute bottom-6 flex gap-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[8px] text-emerald-300 font-mono">MRR ✓</span>
        <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[8px] text-blue-300 font-mono">ARR ✓</span>
      </motion.div>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-amber-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Due Diligence en Horas
      </motion.span>
    </div>
  );
};

export default VCDueDiligenceVisual;
