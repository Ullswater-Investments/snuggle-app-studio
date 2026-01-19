import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ArrowRight, Leaf, Package } from 'lucide-react';

const GreenLastMileVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      {/* Small trucks converging */}
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              x: [0, 15 - i * 5],
              opacity: [1, 0.5, 0],
              scale: [1, 0.8, 0.6]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.2 
            }}
          >
            <Truck className="w-5 h-5 text-amber-400/70" />
          </motion.div>
        ))}
      </div>

      {/* Merge arrow */}
      <motion.div
        className="mx-2"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowRight className="w-4 h-4 text-amber-500" />
      </motion.div>

      {/* Big consolidated truck */}
      <motion.div
        className="relative"
        animate={{ 
          scale: [0.8, 1, 0.8],
          x: [0, 5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <Truck className="w-10 h-10 text-amber-400" />
        {/* Full indicator */}
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        >
          <Package className="w-4 h-4 text-emerald-400" />
        </motion.div>
        {/* Green glow */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-emerald-500/20 blur-md"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Leaf for eco */}
      <motion.div
        className="absolute top-2 right-4"
        animate={{ 
          rotate: [-10, 10, -10],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Leaf className="w-5 h-5 text-emerald-400" />
      </motion.div>

      {/* CO2 reduction label */}
      <motion.span
        className="absolute bottom-6 bg-emerald-900/50 px-2 py-0.5 rounded text-[9px] text-emerald-300 font-mono border border-emerald-500/30"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        -40% CO₂
      </motion.span>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-amber-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Consolidación Verde
      </motion.span>
    </div>
  );
};

export default GreenLastMileVisual;
