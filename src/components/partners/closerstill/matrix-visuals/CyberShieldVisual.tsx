import React from 'react';
import { motion } from 'framer-motion';
import { Radar, Shield, AlertTriangle } from 'lucide-react';

const CyberShieldVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      {/* Radar with sweep */}
      <div className="relative">
        <Radar className="w-12 h-12 text-emerald-500/50" />
        
        {/* Radar sweep line */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-6 h-0.5 origin-left"
          style={{ background: 'linear-gradient(90deg, #10b981, transparent)' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Threat dot */}
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Shield raising */}
      <motion.div
        className="absolute"
        animate={{ 
          y: [20, 0],
          opacity: [0, 1],
          scale: [0.8, 1]
        }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
      >
        <Shield className="w-16 h-16 text-emerald-400/80" />
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* Alert indicator */}
      <motion.div
        className="absolute top-2 right-4"
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <AlertTriangle className="w-4 h-4 text-amber-400" />
      </motion.div>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-emerald-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Inteligencia Colectiva
      </motion.span>
    </div>
  );
};

export default CyberShieldVisual;
