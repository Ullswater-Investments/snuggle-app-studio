import React from 'react';
import { motion } from 'framer-motion';
import { Crown, DoorOpen, Sparkles } from 'lucide-react';

const VIPFastTrackVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center px-4">
      {/* Door */}
      <motion.div
        className="absolute right-6"
        animate={{ rotate: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <DoorOpen className="w-10 h-10 text-emerald-400" />
      </motion.div>

      {/* Crown moving through */}
      <motion.div
        className="absolute"
        animate={{ 
          x: [-30, 30],
          scale: [0.8, 1, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Crown className="w-8 h-8 text-amber-400" />
        {/* Sparkle trail */}
        <motion.div
          className="absolute -left-2 top-1/2"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
        </motion.div>
      </motion.div>

      {/* Barrier lines */}
      <motion.div
        className="absolute left-8 top-1/2 w-8 h-0.5 bg-slate-600"
        animate={{ scaleX: [1, 0.3, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* VIP Glow */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-amber-500/10 blur-lg"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-rose-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Acceso VIP Soberano
      </motion.span>
    </div>
  );
};

export default VIPFastTrackVisual;
