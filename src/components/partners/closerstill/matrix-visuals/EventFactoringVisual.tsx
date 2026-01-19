import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Coins } from 'lucide-react';

const EventFactoringVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center">
      {/* Handshake */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <Handshake className="w-10 h-10 text-rose-400" />
      </motion.div>

      {/* Falling coins */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${30 + i * 12}%` }}
          animate={{
            y: [0, 30],
            opacity: [0, 1, 0],
            rotate: [0, 180]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeIn"
          }}
        >
          <Coins className="w-4 h-4 text-amber-400" />
        </motion.div>
      ))}

      {/* Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-amber-500/20 blur-xl"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 text-[10px] text-rose-300/70 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Liquidez Instantánea
      </motion.span>
    </div>
  );
};

export default EventFactoringVisual;
