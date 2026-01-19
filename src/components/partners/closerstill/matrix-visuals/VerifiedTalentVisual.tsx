import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Link, Medal, CheckCircle } from 'lucide-react';

const VerifiedTalentVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center gap-2">
      {/* Document */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FileText className="w-8 h-8 text-slate-400" />
        {/* Chain link overlay */}
        <motion.div
          className="absolute -bottom-1 -right-1"
          animate={{ 
            rotate: [0, 10, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Link className="w-4 h-4 text-blue-400" />
        </motion.div>
      </motion.div>

      {/* Transformation particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-emerald-400"
          animate={{ 
            x: [0, 30],
            y: [(i - 1) * 5, (i - 1) * 5],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            delay: 1 + i * 0.2
          }}
        />
      ))}

      {/* Medal result */}
      <motion.div
        className="relative"
        animate={{ 
          scale: [0.8, 1, 0.8],
          y: [5, -5, 5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Medal className="w-10 h-10 text-amber-400" />
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        >
          <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
        </motion.div>
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-amber-500/30 blur-md"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Blockchain badge */}
      <motion.span
        className="absolute bottom-6 bg-slate-800 px-2 py-0.5 rounded text-[9px] text-blue-300 font-mono"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        On-Chain ✓
      </motion.span>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-emerald-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        CV Inmutable
      </motion.span>
    </div>
  );
};

export default VerifiedTalentVisual;
