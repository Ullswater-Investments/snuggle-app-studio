import React from 'react';
import { motion } from 'framer-motion';
import { Database, Brain, Sparkles } from 'lucide-react';

const AITrainingMarketVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-between px-4">
      {/* Database */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Database className="w-8 h-8 text-blue-400" />
      </motion.div>

      {/* Data particles flowing to brain */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            background: `hsl(${200 + i * 20}, 70%, 60%)`,
            top: `${35 + (i % 3) * 10}%`
          }}
          animate={{ 
            left: ['25%', '70%'],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: i * 0.25,
            ease: "linear"
          }}
        />
      ))}

      {/* Brain */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <Brain className="w-10 h-10 text-violet-400" />
        {/* Neural glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-violet-500/30 blur-md"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        {/* Sparkle */}
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ 
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-blue-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Datos para IA
      </motion.span>
    </div>
  );
};

export default AITrainingMarketVisual;
