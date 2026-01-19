import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Banknote, FileCheck, ArrowRight } from 'lucide-react';

const KitAyudasVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center gap-2">
      {/* Government building */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Landmark className="w-9 h-9 text-amber-400" />
        {/* Document emanating */}
        <motion.div
          className="absolute -right-1 -top-1"
          animate={{ 
            x: [0, 5],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FileCheck className="w-4 h-4 text-emerald-400" />
        </motion.div>
      </motion.div>

      {/* Flow arrow */}
      <motion.div
        animate={{ 
          x: [-3, 3, -3],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowRight className="w-5 h-5 text-amber-500" />
      </motion.div>

      {/* Money bag / Banknotes */}
      <motion.div
        className="relative"
        animate={{ 
          scale: [0.9, 1.1, 0.9],
          y: [2, -2, 2]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Banknote className="w-10 h-10 text-emerald-400" />
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-emerald-500/30 blur-md"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Flying money particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-1 rounded-sm bg-emerald-400"
          style={{ left: '45%', top: `${35 + i * 12}%` }}
          animate={{ 
            x: [0, 25],
            opacity: [0, 1, 0],
            rotate: [0, 20]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: i * 0.3
          }}
        />
      ))}

      {/* Subsidy label */}
      <motion.span
        className="absolute bottom-6 bg-amber-900/50 px-2 py-0.5 rounded text-[9px] text-amber-300 font-mono border border-amber-500/30"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Kit Digital
      </motion.span>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-amber-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Subvención Automatizada
      </motion.span>
    </div>
  );
};

export default KitAyudasVisual;
