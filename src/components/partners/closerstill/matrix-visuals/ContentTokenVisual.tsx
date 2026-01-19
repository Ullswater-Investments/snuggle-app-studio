import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Unlock, Coins } from 'lucide-react';

const ContentTokenVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      {/* Video player frame */}
      <div className="relative w-16 h-12 rounded-lg border-2 border-blue-500/50 bg-slate-800 flex items-center justify-center overflow-hidden">
        {/* Play button */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Play className="w-6 h-6 text-blue-400 fill-blue-400/30" />
        </motion.div>

        {/* Lock overlay - fades out */}
        <motion.div
          className="absolute inset-0 bg-slate-900/80 flex items-center justify-center"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Lock className="w-5 h-5 text-slate-400" />
        </motion.div>
      </div>

      {/* Coin payment animation */}
      <motion.div
        className="absolute left-4"
        animate={{ 
          x: [0, 30],
          opacity: [1, 0],
          scale: [1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <Coins className="w-6 h-6 text-amber-400" />
      </motion.div>

      {/* Unlock indicator */}
      <motion.div
        className="absolute right-4"
        animate={{ 
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      >
        <Unlock className="w-5 h-5 text-emerald-400" />
      </motion.div>

      {/* Royalty flow */}
      <motion.span
        className="absolute bottom-6 bg-slate-800 px-2 py-0.5 rounded text-[9px] text-violet-300 font-mono"
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        Royalty → Speaker
      </motion.span>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-blue-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Contenido Premium
      </motion.span>
    </div>
  );
};

export default ContentTokenVisual;
