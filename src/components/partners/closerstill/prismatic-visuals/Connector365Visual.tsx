import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Cloud, Calendar, Plug, Building, Users } from 'lucide-react';

const Connector365Visual = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* IFEMA Pavilion - Physical */}
      <motion.div
        className="absolute left-4 flex flex-col items-center"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="relative"
        >
          <Building2 className="w-10 h-10 text-indigo-400" />
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-indigo-400/20 rounded px-1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Calendar className="w-3 h-3 text-indigo-300" />
            <span className="text-[7px] text-indigo-300 font-bold">MAY</span>
          </motion.div>
        </motion.div>
        <span className="text-[9px] text-slate-500 mt-2">IFEMA</span>
      </motion.div>

      {/* Light Bridge - The Connection */}
      <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2">
        {/* Base Bridge */}
        <motion.div
          className="h-1 bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-400 rounded-full"
          animate={{ 
            boxShadow: [
              "0 0 10px rgba(129, 140, 248, 0.3)",
              "0 0 25px rgba(129, 140, 248, 0.6)",
              "0 0 10px rgba(129, 140, 248, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Traveling Pulse */}
        <motion.div
          className="absolute top-0 w-4 h-1 bg-white rounded-full"
          animate={{ 
            x: ["0%", "100%", "0%"],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Connection Icons */}
        <motion.div
          className="absolute top-3 left-1/4"
          animate={{ 
            opacity: [0.3, 1, 0.3],
            y: [0, -2, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Plug className="w-4 h-4 text-indigo-300" />
        </motion.div>

        <motion.div
          className="absolute top-3 left-1/2 -translate-x-1/2"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            y: [0, -2, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          <Users className="w-4 h-4 text-indigo-300" />
        </motion.div>

        <motion.div
          className="absolute top-3 right-1/4"
          animate={{ 
            opacity: [0.3, 1, 0.3],
            y: [0, -2, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        >
          <Building className="w-4 h-4 text-indigo-300" />
        </motion.div>
      </div>

      {/* Digital Cloud - 365 */}
      <motion.div
        className="absolute right-4 flex flex-col items-center"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <motion.div
          className="relative"
          animate={{ 
            boxShadow: [
              "0 0 15px rgba(129, 140, 248, 0.2)",
              "0 0 30px rgba(129, 140, 248, 0.5)",
              "0 0 15px rgba(129, 140, 248, 0.2)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Cloud className="w-12 h-12 text-indigo-400" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-[10px] text-indigo-200 font-bold">365</span>
          </motion.div>
        </motion.div>
        <span className="text-[9px] text-slate-500 mt-1">Todo el año</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="absolute bottom-2 text-[10px] text-indigo-400 font-medium"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tu stand sigue vendiendo cuando se apagan las luces
      </motion.div>
    </div>
  );
};

export default Connector365Visual;
