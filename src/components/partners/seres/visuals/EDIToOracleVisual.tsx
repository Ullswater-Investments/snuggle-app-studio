import { motion } from "framer-motion";
import { FileSignature, ArrowRight, Database, Server, Cpu, Users, Building2, Shield } from "lucide-react";

export const EDIToOracleVisual = () => {
  return (
    <div className="relative bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Traditional EDI Model */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Modelo Tradicional: Tubería EDI</h4>
          <div className="relative">
            {/* Linear Flow */}
            <div className="flex items-center justify-between gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-700/50 flex items-center justify-center border border-slate-600">
                  <Building2 className="h-8 w-8 text-slate-400" />
                </div>
                <span className="text-xs text-slate-500">Proveedor</span>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex-1 h-1 bg-gradient-to-r from-slate-600 to-slate-500 rounded"
              />

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-700/80 flex items-center justify-center border-2 border-slate-500">
                  <FileSignature className="h-10 w-10 text-slate-300" />
                </div>
                <span className="text-xs text-slate-400 font-medium">SERES</span>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex-1 h-1 bg-gradient-to-r from-slate-500 to-slate-600 rounded"
              />

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-700/50 flex items-center justify-center border border-slate-600">
                  <Users className="h-8 w-8 text-slate-400" />
                </div>
                <span className="text-xs text-slate-500">Cliente</span>
              </motion.div>
            </div>

            {/* Label */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <span className="text-xs text-red-400/80 bg-red-500/10 px-3 py-1 rounded-full">
                Valor limitado a transmisión
              </span>
            </motion.div>
          </div>
        </div>

        {/* Center Arrow */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-500/30"
          >
            <ArrowRight className="h-8 w-8 text-white" />
          </motion.div>
        </div>

        {/* Right: Pontus-X Model */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Futuro: Nodo Federado Pontus-X</h4>
          <div className="relative">
            {/* Central Node with Orbiting Elements */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Central SERES Node */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8, type: "spring" }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center shadow-xl shadow-blue-500/30 relative z-10"
                >
                  <div className="text-center">
                    <Server className="h-8 w-8 text-white mx-auto mb-1" />
                    <span className="text-xs text-white/80 font-medium">SERES</span>
                  </div>
                </motion.div>

                {/* Orbiting Elements */}
                {[
                  { icon: Building2, label: "Bancos", angle: 0, color: "bg-emerald-500" },
                  { icon: Shield, label: "Auditores", angle: 72, color: "bg-purple-500" },
                  { icon: Cpu, label: "C2D", angle: 144, color: "bg-amber-500" },
                  { icon: Users, label: "Socios", angle: 216, color: "bg-pink-500" },
                  { icon: Database, label: "ESG", angle: 288, color: "bg-cyan-500" }
                ].map((item, index) => {
                  const radius = 80;
                  const angleRad = (item.angle * Math.PI) / 180;
                  const x = Math.cos(angleRad) * radius;
                  const y = Math.sin(angleRad) * radius;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2 + index * 0.15 }}
                      className="absolute flex flex-col items-center"
                      style={{ 
                        left: `calc(50% + ${x}px - 20px)`,
                        top: `calc(50% + ${y}px - 20px)`
                      }}
                    >
                      <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center shadow-lg`}>
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">{item.label}</span>
                    </motion.div>
                  );
                })}

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ left: -40, top: -40, width: 200, height: 200 }}>
                  {[0, 72, 144, 216, 288].map((angle, index) => {
                    const radius = 80;
                    const angleRad = (angle * Math.PI) / 180;
                    const x2 = 100 + Math.cos(angleRad) * radius;
                    const y2 = 100 + Math.sin(angleRad) * radius;
                    
                    return (
                      <motion.line
                        key={angle}
                        x1="100"
                        y1="100"
                        x2={x2}
                        y2={y2}
                        stroke="url(#blueGradient)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ delay: 2.5 + index * 0.1, duration: 0.5 }}
                      />
                    );
                  })}
                  <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Label */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <span className="text-xs text-emerald-400/80 bg-emerald-500/10 px-3 py-1 rounded-full">
                Múltiples flujos de valor
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default EDIToOracleVisual;
