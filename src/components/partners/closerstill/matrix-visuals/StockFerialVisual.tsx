import React from 'react';
import { motion } from 'framer-motion';
import { Scan, MapPin, Package, Check } from 'lucide-react';

const StockFerialVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-between px-4">
      {/* Barcode scanner */}
      <motion.div
        className="relative"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Scan className="w-8 h-8 text-amber-400" />
        {/* Scan line */}
        <motion.div
          className="absolute left-1/2 top-0 w-0.5 h-full bg-red-400"
          animate={{ 
            opacity: [0, 1, 0],
            scaleY: [0.5, 1, 0.5]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Scanning particles */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-amber-400"
          style={{ top: `${40 + i * 15}%` }}
          animate={{ 
            left: ['25%', '70%'],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            delay: i * 0.3,
            ease: "linear"
          }}
        />
      ))}

      {/* Package with location */}
      <motion.div
        className="relative"
        animate={{ 
          y: [2, -2, 2]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Package className="w-8 h-8 text-slate-400" />
        {/* Map pin overlay */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <MapPin className="w-5 h-5 text-emerald-400" />
        </motion.div>
      </motion.div>

      {/* Check indicator */}
      <motion.div
        className="absolute right-3 top-2"
        animate={{ 
          scale: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <Check className="w-5 h-5 text-emerald-400" />
      </motion.div>

      {/* Location label */}
      <motion.span
        className="absolute bottom-6 bg-slate-800 px-2 py-0.5 rounded text-[9px] text-amber-300 font-mono"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Hall 7 - A42
      </motion.span>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-amber-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Trazabilidad Total
      </motion.span>
    </div>
  );
};

export default StockFerialVisual;
