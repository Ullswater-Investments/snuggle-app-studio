import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Leaf, ArrowRight, Award } from 'lucide-react';

const GreenBadgeVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center gap-3">
      {/* Factory - fading out */}
      <motion.div
        animate={{ 
          opacity: [1, 0.3, 0],
          scale: [1, 0.9, 0.8],
          x: [0, -5, -10]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Factory className="w-8 h-8 text-slate-500" />
        {/* Smoke particles fading */}
        <motion.div
          className="absolute -top-2 left-1/2 w-1.5 h-1.5 rounded-full bg-slate-600"
          animate={{ 
            y: [-5, -15],
            opacity: [0.5, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Transformation arrow */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowRight className="w-4 h-4 text-emerald-400" />
      </motion.div>

      {/* Leaf appearing */}
      <motion.div
        className="relative"
        animate={{ 
          opacity: [0, 1, 1],
          scale: [0.5, 1.1, 1],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      >
        <Leaf className="w-10 h-10 text-emerald-400" />
        {/* Green glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-500/30 blur-lg"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Award badge */}
      <motion.div
        className="absolute right-4 top-3"
        animate={{ 
          scale: [0, 1, 1],
          rotate: [-20, 0, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        <Award className="w-5 h-5 text-amber-400" />
      </motion.div>

      {/* Carbon neutral label */}
      <motion.span
        className="absolute bottom-6 bg-emerald-900/50 px-2 py-0.5 rounded text-[9px] text-emerald-300 font-mono border border-emerald-500/30"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        CO₂ Neutro
      </motion.span>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-emerald-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Huella Auditada
      </motion.span>
    </div>
  );
};

export default GreenBadgeVisual;
