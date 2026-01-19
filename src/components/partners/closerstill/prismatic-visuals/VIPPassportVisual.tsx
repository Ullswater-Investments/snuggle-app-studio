import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Crown, Lock, Unlock, Sofa, Zap, Star } from 'lucide-react';

const VIPPassportVisual = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Phone with Crown */}
      <motion.div
        className="absolute left-6 flex flex-col items-center"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="relative"
          animate={{ 
            boxShadow: [
              "0 0 10px rgba(168, 85, 247, 0.3)",
              "0 0 25px rgba(168, 85, 247, 0.6)",
              "0 0 10px rgba(168, 85, 247, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Smartphone className="w-10 h-10 text-purple-400" />
          <Crown className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 text-yellow-400" />
        </motion.div>
      </motion.div>

      {/* Radio Waves */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-16 w-8 h-8 border border-purple-400/40 rounded-full"
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ 
            scale: [0.5, 1.5, 2],
            opacity: [0.8, 0.4, 0],
            x: [0, 20, 40]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: i * 0.4 
          }}
        />
      ))}

      {/* Unlocking Locks */}
      <div className="absolute right-6 flex flex-col gap-3">
        {/* VIP Lounge */}
        <motion.div
          className="flex items-center gap-2"
          animate={{ x: [5, 0, 5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: [0, -15, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          >
            <Unlock className="w-4 h-4 text-emerald-400" />
          </motion.div>
          <Sofa className="w-5 h-5 text-purple-300" />
          <span className="text-[8px] text-slate-500">VIP</span>
        </motion.div>

        {/* Fast Lane */}
        <motion.div
          className="flex items-center gap-2"
          animate={{ x: [5, 0, 5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          <motion.div
            animate={{ rotate: [0, -15, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          >
            <Unlock className="w-4 h-4 text-emerald-400" />
          </motion.div>
          <Zap className="w-5 h-5 text-purple-300" />
          <span className="text-[8px] text-slate-500">Fast</span>
        </motion.div>

        {/* Reserved Seat */}
        <motion.div
          className="flex items-center gap-2"
          animate={{ x: [5, 0, 5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        >
          <motion.div
            animate={{ rotate: [0, -15, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
          >
            <Unlock className="w-4 h-4 text-emerald-400" />
          </motion.div>
          <Star className="w-5 h-5 text-purple-300" />
          <span className="text-[8px] text-slate-500">Reserva</span>
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.div
        className="absolute bottom-2 text-[10px] text-purple-400 font-medium"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tu reputación te abre puertas
      </motion.div>
    </div>
  );
};

export default VIPPassportVisual;
