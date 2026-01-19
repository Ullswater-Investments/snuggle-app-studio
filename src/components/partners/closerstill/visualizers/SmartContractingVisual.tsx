import { motion } from "framer-motion";
import { FileText, CreditCard, Stamp, Check } from "lucide-react";

const SmartContractingVisual = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden p-4">
      {/* Contract document */}
      <div className="relative bg-slate-100 rounded-lg p-3 h-32 overflow-hidden">
        {/* Header */}
        <div className="text-[10px] font-bold text-slate-700 mb-2">CONTRATO NDA</div>
        
        {/* Form fields that auto-fill */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-slate-500 w-12">Empresa:</span>
            <motion.div
              className="flex-1 h-3 bg-slate-300 rounded relative overflow-hidden"
              initial={{ opacity: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-blue-200 flex items-center px-1"
                initial={{ width: 0 }}
                animate={{ width: ["0%", "100%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-[8px] text-blue-800">TechCorp S.L.</span>
              </motion.div>
            </motion.div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-slate-500 w-12">CIF:</span>
            <motion.div
              className="flex-1 h-3 bg-slate-300 rounded relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-blue-200 flex items-center px-1"
                initial={{ width: 0 }}
                animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}
              >
                <span className="text-[8px] text-blue-800">B12345678</span>
              </motion.div>
            </motion.div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-slate-500 w-12">Rep. Legal:</span>
            <motion.div
              className="flex-1 h-3 bg-slate-300 rounded relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-blue-200 flex items-center px-1"
                initial={{ width: 0 }}
                animate={{ width: ["0%", "0%", "0%", "100%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.6 }}
              >
                <span className="text-[8px] text-blue-800">María García</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Signature stamp */}
        <motion.div
          className="absolute bottom-2 right-2"
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={{ 
            opacity: [0, 0, 0, 1, 1, 0],
            scale: [0, 0, 0, 1.2, 1, 0],
            rotate: [-15, -15, -15, 0, 0, -15]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="p-1 bg-green-500 rounded flex items-center gap-1">
            <Stamp className="h-3 w-3 text-white" />
            <Check className="h-3 w-3 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Badge approaching */}
      <motion.div
        className="absolute left-2 top-1/2 -translate-y-1/2"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: [-50, 0, 0, -50], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
        <span className="text-[8px] text-blue-400 mt-1 block text-center">Badge</span>
      </motion.div>

      {/* Label */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        Autocompletado con Identidad Digital
      </div>
    </div>
  );
};

export default SmartContractingVisual;
