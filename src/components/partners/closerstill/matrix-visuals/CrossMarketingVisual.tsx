import React from 'react';
import { motion } from 'framer-motion';
import { Circle, Heart, Lock } from 'lucide-react';

const CrossMarketingVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      {/* Circle A */}
      <motion.div
        className="absolute"
        animate={{ x: [-8, 0, -8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-14 h-14 rounded-full border-2 border-blue-400/50 bg-blue-500/10" />
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] text-blue-400">A</span>
      </motion.div>

      {/* Circle B */}
      <motion.div
        className="absolute"
        animate={{ x: [8, 0, 8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-14 h-14 rounded-full border-2 border-violet-400/50 bg-violet-500/10" />
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] text-violet-400">B</span>
      </motion.div>

      {/* Intersection - Heart appears */}
      <motion.div
        className="absolute z-10"
        animate={{ 
          scale: [0.5, 1, 0.5],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="w-6 h-6 text-rose-400 fill-rose-400/50" />
      </motion.div>

      {/* Lock indicator for privacy */}
      <motion.div
        className="absolute bottom-4 right-4"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Lock className="w-4 h-4 text-emerald-400" />
      </motion.div>

      {/* Percentage indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-0.5 rounded text-[10px] text-blue-300 font-mono"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        34% Match
      </motion.div>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-blue-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Audiencias Cruzadas
      </motion.span>
    </div>
  );
};

export default CrossMarketingVisual;
