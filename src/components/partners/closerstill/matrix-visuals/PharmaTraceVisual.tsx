import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Thermometer, Check, ShieldCheck } from 'lucide-react';

const PharmaTraceVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-between px-4">
      {/* Pill moving */}
      <motion.div
        animate={{ 
          x: [0, 20, 40],
          opacity: [1, 1, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Pill className="w-8 h-8 text-emerald-400" />
      </motion.div>

      {/* Thermometer check */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Thermometer className="w-8 h-8 text-blue-400" />
        {/* Temperature indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      {/* Verification check */}
      <motion.div
        className="relative"
        animate={{ 
          scale: [0, 1, 1],
          opacity: [0, 1, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        <ShieldCheck className="w-10 h-10 text-emerald-400" />
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* Chain visualization */}
      <motion.div
        className="absolute left-12 right-12 h-0.5 top-1/2 -translate-y-1/2 -z-10"
        style={{ background: 'linear-gradient(90deg, #10b981, #3b82f6, #10b981)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* GDP Label */}
      <motion.span
        className="absolute bottom-6 bg-emerald-900/50 px-2 py-0.5 rounded text-[9px] text-emerald-300 font-mono border border-emerald-500/30"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        GDP ✓
      </motion.span>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-emerald-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Cadena de Frío Verificada
      </motion.span>
    </div>
  );
};

export default PharmaTraceVisual;
