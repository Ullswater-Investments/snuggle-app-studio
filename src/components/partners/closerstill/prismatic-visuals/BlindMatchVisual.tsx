import React from 'react';
import { motion } from 'framer-motion';
import { User, BrainCircuit, CheckCircle2, HelpCircle } from 'lucide-react';

const BlindMatchVisual = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Left Silhouette with ? */}
      <motion.div
        className="absolute left-8 flex flex-col items-center"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HelpCircle className="w-4 h-4 text-blue-400 mb-1" />
        </motion.div>
        <User className="w-10 h-10 text-blue-400/60" />
        <span className="text-[9px] text-slate-500 mt-1">Buyer</span>
      </motion.div>

      {/* Central Brain - Algorithm */}
      <motion.div
        className="relative z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/20"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <BrainCircuit className="w-10 h-10 text-blue-400" />
      </motion.div>

      {/* Connection Lines */}
      <motion.div
        className="absolute left-20 w-8 h-0.5 bg-gradient-to-r from-blue-400/30 to-blue-400"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-20 w-8 h-0.5 bg-gradient-to-l from-blue-400/30 to-blue-400"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Right Silhouette with ? */}
      <motion.div
        className="absolute right-8 flex flex-col items-center"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <motion.div
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          <HelpCircle className="w-4 h-4 text-blue-400 mb-1" />
        </motion.div>
        <User className="w-10 h-10 text-blue-400/60" />
        <span className="text-[9px] text-slate-500 mt-1">Seller</span>
      </motion.div>

      {/* Match Result */}
      <motion.div
        className="absolute bottom-4 flex items-center gap-1"
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span className="text-[10px] text-emerald-400 font-medium">Match Seguro</span>
      </motion.div>
    </div>
  );
};

export default BlindMatchVisual;
