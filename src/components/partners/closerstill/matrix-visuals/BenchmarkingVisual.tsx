import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';

const BenchmarkingVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      {/* Bar chart base */}
      <div className="flex items-end gap-2 h-16">
        {/* Bar 1 - static low */}
        <motion.div 
          className="w-4 bg-slate-600 rounded-t"
          animate={{ height: [20, 24, 20] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Bar 2 - growing to exceed average */}
        <motion.div 
          className="w-4 bg-blue-400 rounded-t"
          animate={{ height: [24, 48, 24] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Bar 3 - static medium */}
        <motion.div 
          className="w-4 bg-slate-600 rounded-t"
          animate={{ height: [28, 32, 28] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
      </div>

      {/* Average line */}
      <motion.div
        className="absolute left-6 right-6 h-0.5 bg-amber-400/60 top-8"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.span 
        className="absolute right-4 top-6 text-[8px] text-amber-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        MEDIA
      </motion.span>

      {/* Trending up indicator */}
      <motion.div
        className="absolute right-2 bottom-6"
        animate={{ 
          y: [-2, -8, -2],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <TrendingUp className="w-5 h-5 text-emerald-400" />
      </motion.div>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-blue-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Comparativa Sector
      </motion.span>
    </div>
  );
};

export default BenchmarkingVisual;
