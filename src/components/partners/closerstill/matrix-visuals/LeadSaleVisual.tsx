import React from 'react';
import { motion } from 'framer-motion';
import { User, Coins, ArrowRight } from 'lucide-react';

const LeadSaleVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center gap-2">
      {/* User profile */}
      <motion.div
        className="relative"
        animate={{ 
          scale: [1, 0.8, 0],
          opacity: [1, 0.8, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <User className="w-10 h-10 text-blue-400" />
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md" />
      </motion.div>

      {/* Transformation arrow */}
      <motion.div
        animate={{ 
          x: [-5, 5, -5],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowRight className="w-5 h-5 text-slate-500" />
      </motion.div>

      {/* Coins appearing */}
      <motion.div
        className="relative"
        animate={{ 
          scale: [0, 1, 1],
          opacity: [0, 1, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      >
        <Coins className="w-10 h-10 text-amber-400" />
        <motion.div
          className="absolute inset-0 rounded-full bg-amber-500/30 blur-md"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* Micropay indicator */}
      <motion.div
        className="absolute bottom-6 bg-slate-800 px-2 py-0.5 rounded text-[10px] text-emerald-300 font-mono"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        +0.50€
      </motion.div>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-blue-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Micropago por Lead
      </motion.span>
    </div>
  );
};

export default LeadSaleVisual;
