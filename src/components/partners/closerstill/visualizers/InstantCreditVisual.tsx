import { motion } from "framer-motion";
import { FileText, Banknote, Zap, Clock } from "lucide-react";

const InstantCreditVisual = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden p-4">
      {/* Timeline */}
      <div className="relative h-full flex flex-col justify-center">
        {/* Invoice */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-700 rounded">
          <FileText className="h-5 w-5 text-slate-400" />
        </div>

        {/* Slow path (bottom) */}
        <div className="absolute left-16 right-16 bottom-8">
          <div className="relative h-8">
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-slate-700 border-dashed" style={{ borderStyle: 'dashed' }} />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              initial={{ left: "0%" }}
              animate={{ left: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Banknote className="h-4 w-4 text-slate-500" />
            </motion.div>
            <div className="absolute right-0 top-full text-[10px] text-slate-500 flex items-center gap-1">
              <Clock className="h-3 w-3" /> 90 días
            </div>
          </div>
        </div>

        {/* Fast path (top arc) */}
        <div className="absolute left-16 right-16 top-8">
          <div className="relative h-8">
            {/* Arc path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path
                d="M 0 30 Q 50 -10 100 30"
                fill="none"
                stroke="#22c55e"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            </svg>
            {/* Fast money icon */}
            <motion.div
              className="absolute -translate-y-1/2"
              initial={{ left: "0%", top: "100%" }}
              animate={{
                left: ["0%", "50%", "100%", "0%"],
                top: ["100%", "-50%", "100%", "100%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="relative">
                <Banknote className="h-5 w-5 text-green-400" />
                <motion.div
                  className="absolute -right-1 -top-1"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
            <div className="absolute right-0 -top-2 text-[10px] text-green-400 font-bold flex items-center gap-1">
              <Zap className="h-3 w-3" /> HOY
            </div>
          </div>
        </div>

        {/* End point */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <motion.div
            className="p-2 bg-green-600 rounded"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Banknote className="h-5 w-5 text-white" />
          </motion.div>
        </div>

        {/* ProcureData Label */}
        <motion.div
          className="absolute left-1/2 top-4 -translate-x-1/2 px-2 py-0.5 bg-blue-600/20 border border-blue-500/30 rounded text-[10px] text-blue-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ProcureData Fast-Track
        </motion.div>
      </div>

      {/* Label */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        Financiación Embebida en Feria
      </div>
    </div>
  );
};

export default InstantCreditVisual;
