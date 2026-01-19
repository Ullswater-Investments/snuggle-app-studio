import { motion } from "framer-motion";
import { TreePine, Hammer, Trash2, FileCheck } from "lucide-react";

const CircularEventsVisual = () => {
  const steps = [
    { icon: TreePine, label: "Material", color: "text-green-400" },
    { icon: Hammer, label: "Stand", color: "text-blue-400" },
    { icon: Trash2, label: "Residuo", color: "text-orange-400" },
    { icon: FileCheck, label: "Certificado", color: "text-emerald-400" },
  ];

  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Circular path */}
      <div className="relative w-32 h-32">
        {/* Circle outline */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
          />
          {/* Animated progress */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: [251.2, 0, 0, 251.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Step icons */}
        {steps.map((step, i) => {
          const angle = (i * 90 - 90) * (Math.PI / 180);
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          const Icon = step.icon;

          return (
            <motion.div
              key={i}
              className="absolute flex flex-col items-center"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, delay: i * 1, repeat: Infinity }}
            >
              <div className="p-1.5 bg-slate-700 rounded-lg">
                <Icon className={`h-4 w-4 ${step.color}`} />
              </div>
              <span className="text-[8px] text-slate-500 mt-0.5">{step.label}</span>
            </motion.div>
          );
        })}

        {/* Center icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            ♻️
          </motion.div>
        </motion.div>
      </div>

      {/* Certificate output */}
      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: [0, 0, 1, 1, 0], x: [10, 10, 0, 0, 10] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="p-2 bg-green-600 rounded">
          <FileCheck className="h-4 w-4 text-white" />
        </div>
        <span className="text-[8px] text-green-400">ESG Ready</span>
      </motion.div>

      {/* Label */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        Pasaporte de Sostenibilidad
      </div>
    </div>
  );
};

export default CircularEventsVisual;
