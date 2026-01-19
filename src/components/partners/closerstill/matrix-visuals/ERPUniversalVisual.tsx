import React from 'react';
import { motion } from 'framer-motion';
import { Package, Server, ArrowRight, Check, Plug } from 'lucide-react';

const ERPUniversalVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center gap-2">
      {/* Package/Catalog */}
      <motion.div
        className="relative"
        animate={{ 
          x: [0, 10],
          opacity: [1, 1, 0.5]
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <Package className="w-8 h-8 text-amber-400" />
      </motion.div>

      {/* Data flow animation */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
          style={{ top: '50%', translateY: '-50%' }}
          animate={{ 
            left: ['30%', '65%'],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            delay: i * 0.25,
            ease: "linear"
          }}
        />
      ))}

      {/* Plug connector */}
      <motion.div
        animate={{ 
          rotate: [0, 10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Plug className="w-5 h-5 text-blue-400" />
      </motion.div>

      {/* Server/ERP */}
      <motion.div
        className="relative"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <Server className="w-9 h-9 text-blue-400" />
        {/* Success indicator */}
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
        >
          <Check className="w-4 h-4 text-emerald-400" />
        </motion.div>
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-blue-500/20 blur-md"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* ERP Labels */}
      <motion.div
        className="absolute bottom-6 flex gap-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[8px] text-blue-300 font-mono">SAP</span>
        <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[8px] text-amber-300 font-mono">Oracle</span>
      </motion.div>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-amber-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Cero Picado Manual
      </motion.span>
    </div>
  );
};

export default ERPUniversalVisual;
