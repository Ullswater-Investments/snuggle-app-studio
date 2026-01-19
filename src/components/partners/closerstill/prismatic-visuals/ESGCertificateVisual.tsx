import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Leaf, FileCheck, Scan, ArrowRight } from 'lucide-react';

const ESGCertificateVisual = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Gray Footprint - Before */}
      <motion.div
        className="absolute left-8 flex flex-col items-center"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Footprints className="w-10 h-10 text-slate-500" />
        <span className="text-[9px] text-slate-500 mt-1">CO₂</span>
      </motion.div>

      {/* Scanner Bar */}
      <motion.div
        className="absolute left-20 h-16 w-1 bg-gradient-to-b from-transparent via-green-400 to-transparent"
        animate={{ 
          x: [0, 40, 0],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Scanning Frame */}
      <motion.div
        className="absolute left-16 w-20 h-16 border border-green-400/30 rounded"
        animate={{ 
          borderColor: [
            "rgba(74, 222, 128, 0.3)",
            "rgba(74, 222, 128, 0.6)",
            "rgba(74, 222, 128, 0.3)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Scan className="absolute top-1 right-1 w-3 h-3 text-green-400/50" />
      </motion.div>

      {/* Green Footprint - After */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative">
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 10px rgba(74, 222, 128, 0.2)",
                "0 0 20px rgba(74, 222, 128, 0.4)",
                "0 0 10px rgba(74, 222, 128, 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Footprints className="w-10 h-10 text-green-400" />
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Leaf className="w-5 h-5 text-green-300" />
          </motion.div>
        </div>
        <span className="text-[9px] text-green-400 mt-1">Neutro</span>
      </motion.div>

      {/* Arrow */}
      <motion.div
        className="absolute right-20"
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowRight className="w-5 h-5 text-green-400/50" />
      </motion.div>

      {/* Certificate */}
      <motion.div
        className="absolute right-4 flex flex-col items-center"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="relative p-2 bg-green-400/10 rounded-lg border border-green-400/30"
          animate={{ 
            borderColor: [
              "rgba(74, 222, 128, 0.3)",
              "rgba(74, 222, 128, 0.6)",
              "rgba(74, 222, 128, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FileCheck className="w-8 h-8 text-green-400" />
        </motion.div>
        <span className="text-[9px] text-slate-500 mt-1">ESG Report</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="absolute bottom-2 text-[10px] text-green-400 font-medium"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Compliance ESG para corporativos
      </motion.div>
    </div>
  );
};

export default ESGCertificateVisual;
