import React from 'react';
import { motion } from 'framer-motion';
import { CircleSlash, ShieldAlert, Lock, UserX } from 'lucide-react';

const FraudBureauVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      {/* Fraudster silhouette */}
      <motion.div
        className="relative"
        animate={{ 
          x: [-20, 0],
          opacity: [0, 1]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <UserX className="w-8 h-8 text-red-400/70" />
      </motion.div>

      {/* Block/Ban overlay */}
      <motion.div
        className="absolute"
        animate={{ 
          scale: [0.5, 1.2, 1],
          opacity: [0, 1, 1]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <CircleSlash className="w-14 h-14 text-red-500" strokeWidth={3} />
      </motion.div>

      {/* Shield alert */}
      <motion.div
        className="absolute right-4 top-3"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <ShieldAlert className="w-6 h-6 text-amber-400" />
      </motion.div>

      {/* GDPR Lock */}
      <motion.div
        className="absolute left-4 bottom-4"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Lock className="w-4 h-4 text-emerald-400" />
      </motion.div>

      {/* Hash representation */}
      <motion.span
        className="absolute bottom-6 right-6 text-[8px] text-slate-500 font-mono"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        #a7f3...
      </motion.span>

      {/* Alert pulse */}
      <motion.div
        className="absolute inset-0 rounded-full bg-red-500/10 blur-xl"
        animate={{ 
          opacity: [0, 0.4, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-emerald-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Lista Negra Anónima
      </motion.span>
    </div>
  );
};

export default FraudBureauVisual;
