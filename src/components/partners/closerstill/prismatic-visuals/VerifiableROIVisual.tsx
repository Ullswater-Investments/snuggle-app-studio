import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Square, CheckCircle2, TrendingUp, BarChart3, Target } from 'lucide-react';

const VerifiableROIVisual = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Sponsor Logo/Target */}
      <motion.div
        className="absolute left-6 flex flex-col items-center"
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="relative bg-orange-400/10 rounded-lg p-2 border border-orange-400/30"
        >
          <Target className="w-8 h-8 text-orange-400" />
        </motion.div>
        <span className="text-[9px] text-slate-500 mt-1">Sponsor</span>
      </motion.div>

      {/* Eyes Looking */}
      <div className="absolute left-20 flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex items-center gap-1"
            animate={{ 
              x: [0, 3, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <Eye className="w-4 h-4 text-orange-400" />
            {/* Laser beam */}
            <motion.div
              className="w-8 h-0.5 bg-gradient-to-r from-orange-400 to-orange-400/30"
              animate={{ 
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Data Blocks Counter */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col gap-1">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex gap-1">
              {[0, 1, 2].map((col) => (
                <motion.div
                  key={`${row}-${col}`}
                  className="relative"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scale: [0.9, 1, 0.9]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: (row * 3 + col) * 0.1 
                  }}
                >
                  <Square className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                  <CheckCircle2 className="absolute -top-0.5 -right-0.5 w-2 h-2 text-emerald-300" />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Growing Chart */}
      <motion.div
        className="absolute right-4 flex flex-col items-center"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="relative"
          animate={{ 
            boxShadow: [
              "0 0 10px rgba(249, 115, 22, 0.2)",
              "0 0 20px rgba(249, 115, 22, 0.4)",
              "0 0 10px rgba(249, 115, 22, 0.2)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <BarChart3 className="w-10 h-10 text-orange-400" />
          <motion.div
            className="absolute -top-2 -right-1"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </motion.div>
        </motion.div>
        <span className="text-[9px] text-slate-500 mt-1">ROI</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="absolute bottom-2 text-[10px] text-orange-400 font-medium"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Engagement auditado, no impresiones
      </motion.div>
    </div>
  );
};

export default VerifiableROIVisual;
