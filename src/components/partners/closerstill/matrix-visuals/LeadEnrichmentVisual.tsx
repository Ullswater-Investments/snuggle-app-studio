import React from 'react';
import { motion } from 'framer-motion';
import { User, Database, Shield } from 'lucide-react';

const LeadEnrichmentVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-between px-4">
      {/* User icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <User className="w-8 h-8 text-rose-400" />
      </motion.div>

      {/* Data flow line */}
      <motion.div
        className="absolute left-12 right-12 h-0.5 top-1/2 -translate-y-1/2"
        style={{ background: 'linear-gradient(90deg, transparent, #f43f5e, #6366f1, transparent)' }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Data particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-rose-400"
          style={{ top: '50%', translateY: '-50%' }}
          animate={{ 
            left: ['20%', '80%'],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: i * 0.4,
            ease: "linear"
          }}
        />
      ))}

      {/* Database */}
      <motion.div
        className="relative z-10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Database className="w-8 h-8 text-blue-400" />
        {/* Shield overlay */}
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ 
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Shield className="w-4 h-4 text-emerald-400" />
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-rose-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Datos Verificados
      </motion.span>
    </div>
  );
};

export default LeadEnrichmentVisual;
