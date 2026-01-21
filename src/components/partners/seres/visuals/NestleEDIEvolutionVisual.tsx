import { motion } from "framer-motion";
import { ArrowRight, FileSignature, Database, Share2, Server, Users } from "lucide-react";

const NestleEDIEvolutionVisual = () => {
  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-white mb-8 text-center">Evolución: De EDI Lineal a Nodo Federado</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Traditional EDI - Linear */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
        >
          <div className="text-sm text-slate-400 mb-4 text-center">Modelo Actual</div>
          
          <div className="flex items-center justify-center gap-4">
            {/* Supplier */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-xl bg-slate-700/50 border border-slate-600 flex items-center justify-center">
                <FileSignature className="h-8 w-8 text-slate-400" />
              </div>
              <span className="text-xs text-slate-500 mt-2">Proveedor</span>
            </motion.div>
            
            {/* Arrow */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center"
            >
              <div className="w-12 h-0.5 bg-slate-600" />
              <ArrowRight className="h-4 w-4 text-slate-600" />
            </motion.div>
            
            {/* SERES */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center">
                <Server className="h-8 w-8 text-blue-400" />
              </div>
              <span className="text-xs text-blue-400 mt-2">SERES</span>
            </motion.div>
            
            {/* Arrow */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex items-center"
            >
              <div className="w-12 h-0.5 bg-slate-600" />
              <ArrowRight className="h-4 w-4 text-slate-600" />
            </motion.div>
            
            {/* Nestlé */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-xl bg-slate-700/50 border border-slate-600 flex items-center justify-center">
                <Database className="h-8 w-8 text-slate-400" />
              </div>
              <span className="text-xs text-slate-500 mt-2">Nestlé</span>
            </motion.div>
          </div>
          
          <div className="mt-6 text-center">
            <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full">
              Valor limitado a transmisión
            </span>
          </div>
        </motion.div>
        
        {/* Federated Node - Mesh */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6"
        >
          <div className="text-sm text-blue-400 mb-4 text-center">Modelo PROCUREDATA</div>
          
          <div className="relative h-48">
            {/* Central SERES Node */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Server className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            
            {/* Orbiting nodes */}
            {[
              { icon: FileSignature, label: "Proveedor A", angle: 0 },
              { icon: Database, label: "Nestlé", angle: 60 },
              { icon: Users, label: "Bancos", angle: 120 },
              { icon: Share2, label: "Auditor", angle: 180 },
              { icon: FileSignature, label: "Proveedor B", angle: 240 },
              { icon: Database, label: "ESG", angle: 300 },
            ].map((node, index) => {
              const radius = 70;
              const x = Math.cos((node.angle * Math.PI) / 180) * radius;
              const y = Math.sin((node.angle * Math.PI) / 180) * radius;
              
              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-blue-500/30 flex items-center justify-center">
                    <node.icon className="h-5 w-5 text-blue-400" />
                  </div>
                </motion.div>
              );
            })}
            
            {/* Connection lines - simplified */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const radius = 70;
                const x = 50 + (Math.cos((angle * Math.PI) / 180) * radius) / 2;
                const y = 50 + (Math.sin((angle * Math.PI) / 180) * radius) / 2;
                return (
                  <motion.line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                  />
                );
              })}
            </svg>
          </div>
          
          <div className="mt-6 text-center">
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
              Múltiples flujos de valor
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NestleEDIEvolutionVisual;
