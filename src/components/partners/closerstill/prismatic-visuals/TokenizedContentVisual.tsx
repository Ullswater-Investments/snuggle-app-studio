import React from 'react';
import { motion } from 'framer-motion';
import { Video, Lock, Unlock, Coins, Wallet, CircleDollarSign } from 'lucide-react';

const TokenizedContentVisual = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Video with Lock */}
      <motion.div
        className="absolute left-6 flex flex-col items-center"
      >
        <div className="relative">
          <motion.div
            className="bg-slate-800 rounded-lg p-2 border border-red-400/30"
            animate={{ 
              borderColor: [
                "rgba(248, 113, 113, 0.3)",
                "rgba(248, 113, 113, 0.6)",
                "rgba(248, 113, 113, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Video className="w-8 h-8 text-red-400" />
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ 
              opacity: [1, 0, 1],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lock className="w-4 h-4 text-red-400" />
          </motion.div>
        </div>
        <span className="text-[9px] text-slate-500 mt-1">Premium</span>
      </motion.div>

      {/* Token Insertion */}
      <motion.div
        className="absolute left-24"
        animate={{ 
          x: [0, 15, 15],
          y: [0, 0, 5],
          opacity: [1, 1, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <CircleDollarSign className="w-6 h-6 text-yellow-400" />
        </motion.div>
      </motion.div>

      {/* Unlocked State */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ 
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="bg-slate-800 rounded-lg p-2 border border-emerald-400/50"
          animate={{ 
            boxShadow: [
              "0 0 10px rgba(52, 211, 153, 0.2)",
              "0 0 25px rgba(52, 211, 153, 0.5)",
              "0 0 10px rgba(52, 211, 153, 0.2)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Video className="w-8 h-8 text-emerald-400" />
          <Unlock className="absolute -top-2 -right-2 w-4 h-4 text-emerald-400" />
        </motion.div>
      </motion.div>

      {/* Royalty Flow */}
      <motion.div
        className="absolute right-16 flex items-center gap-1"
        animate={{ 
          x: [0, 10, 10],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <Coins className="w-4 h-4 text-yellow-400" />
        <Coins className="w-3 h-3 text-yellow-300" />
      </motion.div>

      {/* Speaker Wallet */}
      <motion.div
        className="absolute right-4 flex flex-col items-center"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="relative p-2 bg-red-400/10 rounded-lg border border-red-400/30"
        >
          <Wallet className="w-7 h-7 text-red-400" />
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="text-[8px] text-slate-900 font-bold">€</span>
          </motion.div>
        </motion.div>
        <span className="text-[9px] text-slate-500 mt-1">Speaker</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="absolute bottom-2 text-[10px] text-red-400 font-medium"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Netflix B2B con royalties automáticos
      </motion.div>
    </div>
  );
};

export default TokenizedContentVisual;
