import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Badge, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const FastTrackVisual = () => {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Old Way - Slow Queue */}
      <div className="absolute left-4 flex flex-col items-center gap-1">
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FileText className="w-5 h-5 text-slate-500" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <FileText className="w-5 h-5 text-slate-500" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            <Clock className="w-5 h-5 text-red-400" />
          </motion.div>
        </div>
        <span className="text-[10px] text-slate-500">3 meses</span>
      </div>

      {/* VS Divider */}
      <div className="absolute left-1/4 text-slate-600 text-xs font-bold">vs</div>

      {/* New Way - Fast Track */}
      <div className="absolute right-8 flex items-center gap-2">
        {/* Badge traveling through scanner */}
        <motion.div
          className="relative"
          animate={{ x: [0, 60, 60] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Badge className="w-6 h-6 text-emerald-400" />
        </motion.div>

        {/* Scanner Arc */}
        <motion.div
          className="absolute left-12 w-12 h-16 border-2 border-blue-400/50 rounded-full"
          animate={{ 
            boxShadow: [
              "0 0 10px rgba(59, 130, 246, 0.3)",
              "0 0 25px rgba(59, 130, 246, 0.6)",
              "0 0 10px rgba(59, 130, 246, 0.3)"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Result - Verified Contract */}
        <motion.div
          className="absolute right-0 flex items-center gap-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FileText className="w-5 h-5 text-emerald-400" />
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.div
        className="absolute bottom-2 text-[10px] text-emerald-400 font-medium"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        De 3 meses a 3 minutos
      </motion.div>
    </div>
  );
};

export default FastTrackVisual;
