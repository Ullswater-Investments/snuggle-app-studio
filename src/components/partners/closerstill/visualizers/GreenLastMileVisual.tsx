import { motion } from "framer-motion";
import { Truck, Leaf } from "lucide-react";

const GreenLastMileVisual = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden p-4">
      {/* Before/After Labels */}
      <div className="flex justify-between text-xs text-slate-500 mb-2">
        <span>Antes</span>
        <span>Después</span>
      </div>

      <div className="flex items-center justify-between h-32">
        {/* Before: 3 trucks at 30% */}
        <div className="flex flex-col gap-2 flex-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-slate-500" />
              <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: "30%" }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                />
              </div>
              <span className="text-[10px] text-slate-500">30%</span>
            </div>
          ))}
          {/* Emission cloud */}
          <motion.div
            className="text-slate-600 text-xs mt-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💨 CO₂ ×3
          </motion.div>
        </div>

        {/* Arrow */}
        <motion.div
          className="mx-4 text-2xl text-green-500"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          →
        </motion.div>

        {/* After: 1 truck at 90% */}
        <div className="flex flex-col gap-2 flex-1 items-end">
          <div className="flex items-center gap-2 w-full">
            <Truck className="h-6 w-6 text-green-400" />
            <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: "90%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
            <span className="text-xs text-green-400 font-bold">90%</span>
          </div>
          {/* Green leaf */}
          <motion.div
            className="flex items-center gap-1 text-green-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Leaf className="h-4 w-4" />
            <span className="text-xs">-60% CO₂</span>
          </motion.div>
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        Consolidación Inteligente ZBE
      </div>
    </div>
  );
};

export default GreenLastMileVisual;
