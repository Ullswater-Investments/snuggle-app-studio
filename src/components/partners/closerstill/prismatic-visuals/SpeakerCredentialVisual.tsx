import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Award, Linkedin, Sparkles, ArrowRight } from 'lucide-react';

const SpeakerCredentialVisual = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Microphone on Stage */}
      <motion.div
        className="absolute left-8 flex flex-col items-center"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative">
          <Mic className="w-10 h-10 text-pink-400" />
          {/* Stage light effect */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-pink-400/40 to-transparent"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}
          />
        </div>
        <span className="text-[9px] text-slate-500 mt-1">Speaker</span>
      </motion.div>

      {/* Light Beam Transformation */}
      <motion.div
        className="absolute left-24 flex items-center"
        animate={{ 
          opacity: [0.3, 1, 0.3],
          scaleX: [0.8, 1, 0.8]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-16 h-1 bg-gradient-to-r from-pink-400 to-pink-300"
          animate={{ 
            boxShadow: [
              "0 0 5px rgba(236, 72, 153, 0.5)",
              "0 0 15px rgba(236, 72, 153, 0.8)",
              "0 0 5px rgba(236, 72, 153, 0.5)"
            ]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <Sparkles className="w-4 h-4 text-pink-300 ml-1" />
      </motion.div>

      {/* Award Badge - Hexagonal */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ 
          scale: [0.95, 1.05, 0.95],
          rotate: [0, 3, -3, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          className="relative"
          animate={{ 
            boxShadow: [
              "0 0 10px rgba(236, 72, 153, 0.3)",
              "0 0 25px rgba(236, 72, 153, 0.6)",
              "0 0 10px rgba(236, 72, 153, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Award className="w-12 h-12 text-pink-400" />
        </motion.div>
        <span className="text-[8px] text-pink-300 mt-1">Verified 2026</span>
      </motion.div>

      {/* Arrow to LinkedIn */}
      <motion.div
        className="absolute right-16"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowRight className="w-5 h-5 text-pink-400/50" />
      </motion.div>

      {/* LinkedIn Profile */}
      <motion.div
        className="absolute right-4 flex flex-col items-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative p-2 bg-slate-800/50 rounded-lg border border-pink-400/20">
          <Linkedin className="w-6 h-6 text-blue-400" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
        <span className="text-[9px] text-slate-500 mt-1">Profile</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="absolute bottom-2 text-[10px] text-pink-400 font-medium"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Prestigio inmutable
      </motion.div>
    </div>
  );
};

export default SpeakerCredentialVisual;
