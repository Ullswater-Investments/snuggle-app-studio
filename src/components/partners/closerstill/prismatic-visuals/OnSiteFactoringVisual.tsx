import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Building2, Coins, Zap, ArrowRight } from 'lucide-react';

const OnSiteFactoringVisual = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Handshake - Deal Origin */}
      <motion.div
        className="absolute left-6 flex flex-col items-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Handshake className="w-8 h-8 text-amber-400" />
        <span className="text-[9px] text-slate-500 mt-1">Acuerdo</span>
      </motion.div>

      {/* Data Flow to Bank */}
      <motion.div
        className="absolute left-16 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0, x: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          x: [0, 30, 30, 30]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="w-2 h-2 rounded-full bg-amber-400/70" />
          <div className="w-2 h-2 rounded-full bg-amber-400/40" />
        </div>
      </motion.div>

      {/* Bank */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ 
          boxShadow: [
            "0 0 10px rgba(251, 191, 36, 0.2)",
            "0 0 20px rgba(251, 191, 36, 0.4)",
            "0 0 10px rgba(251, 191, 36, 0.2)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Building2 className="w-10 h-10 text-amber-400" />
        <span className="text-[9px] text-slate-500 mt-1">Banco</span>
      </motion.div>

      {/* Lightning - Instant Credit */}
      <motion.div
        className="absolute right-20"
        animate={{ 
          opacity: [0, 1, 1, 0],
          x: [0, 20, 20, 20]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <Zap className="w-6 h-6 text-yellow-400" />
      </motion.div>

      {/* Coins Result */}
      <motion.div
        className="absolute right-4 flex flex-col items-center"
        animate={{ 
          y: [0, -5, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="relative">
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
          >
            <Coins className="w-5 h-5 text-amber-400" />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -right-1"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
          >
            <Coins className="w-4 h-4 text-amber-300" />
          </motion.div>
        </div>
        <span className="text-[9px] text-slate-500 mt-2">Liquidez</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="absolute bottom-2 text-[10px] text-amber-400 font-medium"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Cierra y cobra en el stand
      </motion.div>
    </div>
  );
};

export default OnSiteFactoringVisual;
