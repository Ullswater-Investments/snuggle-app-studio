import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Mail, MailOpen } from 'lucide-react';

const RFPAutoVisual = () => {
  return (
    <div className="relative w-full h-24 flex items-center justify-between px-3">
      {/* Megaphone */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Megaphone className="w-8 h-8 text-rose-400" />
      </motion.div>

      {/* Sound waves */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-10 w-3 h-3 border-r-2 border-rose-400/50 rounded-full"
          animate={{
            scale: [1, 2, 3],
            opacity: [0.8, 0.4, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Mails */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: i === 1 ? [0, -5, 0] : [0, 2, 0],
              scale: i === 1 ? [1, 1.2, 1] : 1
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.8 + i * 0.2
            }}
          >
            {i === 1 ? (
              <MailOpen className="w-6 h-6 text-emerald-400" />
            ) : (
              <Mail className="w-5 h-5 text-slate-500" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Tagline */}
      <motion.span
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-rose-300/70 font-medium whitespace-nowrap"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        RFP Automatizado
      </motion.span>
    </div>
  );
};

export default RFPAutoVisual;
