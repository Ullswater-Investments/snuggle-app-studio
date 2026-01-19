import React from 'react';
import { motion } from 'framer-motion';
import { Binary, Filter, Shield, Newspaper, BarChart3, ArrowRight } from 'lucide-react';

const TrustedDataFeedVisual = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Raw Binary Data */}
      <motion.div
        className="absolute left-4 flex flex-col items-center"
      >
        <div className="flex flex-col gap-0.5 text-[8px] font-mono text-cyan-400/50">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            01101
          </motion.span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
          >
            10010
          </motion.span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
          >
            11001
          </motion.span>
        </div>
        <span className="text-[9px] text-slate-500 mt-1">Raw</span>
      </motion.div>

      {/* Data Flow */}
      <motion.div
        className="absolute left-14 flex items-center gap-1"
        animate={{ 
          opacity: [0.3, 1, 0.3],
          x: [0, 5, 0]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>

      {/* Filter/Funnel with Shield */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="relative"
          animate={{ 
            boxShadow: [
              "0 0 10px rgba(34, 211, 238, 0.2)",
              "0 0 25px rgba(34, 211, 238, 0.5)",
              "0 0 10px rgba(34, 211, 238, 0.2)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Filter className="w-10 h-10 text-cyan-400" />
          <Shield className="absolute -bottom-1 -right-1 w-5 h-5 text-cyan-300" />
        </motion.div>
        <span className="text-[8px] text-cyan-400/70 mt-1">Nodo</span>
      </motion.div>

      {/* Arrow */}
      <motion.div
        className="absolute right-24"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowRight className="w-5 h-5 text-cyan-400/50" />
      </motion.div>

      {/* Newspaper Output */}
      <motion.div
        className="absolute right-4 flex flex-col items-center"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="relative bg-slate-800 rounded-lg p-2 border border-cyan-400/30"
          animate={{ 
            borderColor: [
              "rgba(34, 211, 238, 0.3)",
              "rgba(34, 211, 238, 0.6)",
              "rgba(34, 211, 238, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Newspaper className="w-8 h-8 text-cyan-400" />
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <BarChart3 className="w-4 h-4 text-cyan-300" />
          </motion.div>
        </motion.div>
        <span className="text-[9px] text-slate-500 mt-1">Titular</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="absolute bottom-2 text-[10px] text-cyan-400 font-medium"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Primicias basadas en datos
      </motion.div>
    </div>
  );
};

export default TrustedDataFeedVisual;
