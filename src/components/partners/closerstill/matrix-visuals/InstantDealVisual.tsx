import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, FileSignature, Zap } from 'lucide-react';

const InstantDealVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      {/* Handshake - pulsing */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <Handshake className="w-10 h-10 text-rose-400" />
      </motion.div>

      {/* Contract appearing */}
      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2"
        animate={{ 
          x: [20, 0],
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      >
        <FileSignature className="w-7 h-7 text-white/80" />
      </motion.div>

      {/* Zap effect */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2"
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0.5, 1.2, 0.5],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="w-6 h-6 text-yellow-400" />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-rose-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Acuerdo Instantáneo
      </motion.span>
    </div>
  );
};

export default InstantDealVisual;
