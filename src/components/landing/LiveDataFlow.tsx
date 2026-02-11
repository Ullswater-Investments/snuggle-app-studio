import { motion } from "framer-motion";
import { Database, Shield, Users, ArrowRight } from "lucide-react";

const nodes = [
  { id: "consumer", label: "Consumer", icon: Users, x: 10, y: 20, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/30" },
  { id: "holder", label: "Holder", icon: Shield, x: 50, y: 50, color: "text-green-500", bg: "bg-green-500/10 border-green-500/30" },
  { id: "subject", label: "Subject", icon: Database, x: 90, y: 20, color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/30" },
];

const flows = [
  { from: 0, to: 1, label: "Solicitud", delay: 0 },
  { from: 1, to: 2, label: "Validación", delay: 2 },
  { from: 2, to: 1, label: "Datos", delay: 4 },
  { from: 1, to: 0, label: "Respuesta", delay: 6 },
];

export const LiveDataFlow = () => {
  return (
    <div className="h-full flex flex-col">
      <p className="text-xs font-medium text-muted-foreground mb-3">Flujo de Datos en Tiempo Real — Modelo IDSA</p>

      {/* Nodes */}
      <div className="relative flex-1 min-h-[280px]">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className={`absolute flex flex-col items-center gap-1.5 p-3 rounded-xl border ${node.bg}`}
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
          >
            <node.icon className={`w-6 h-6 ${node.color}`} />
            <span className="text-[11px] font-semibold text-foreground">{node.label}</span>
          </motion.div>
        ))}

        {/* Animated flow particles */}
        {flows.map((flow, i) => {
          const from = nodes[flow.from];
          const to = nodes[flow.to];
          return (
            <motion.div
              key={i}
              className="absolute flex items-center gap-1"
              initial={{ left: `${from.x}%`, top: `${from.y + 8}%`, opacity: 0 }}
              animate={{
                left: [`${from.x}%`, `${to.x}%`],
                top: [`${from.y + 8}%`, `${to.y + 8}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: flow.delay,
                repeat: Infinity,
                repeatDelay: 6,
                ease: "easeInOut",
              }}
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium">
                {flow.label}
              </span>
              <ArrowRight className="w-3 h-3 text-primary" />
            </motion.div>
          );
        })}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="10" y1="20" x2="50" y2="50" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="2 2" />
          <line x1="50" y1="50" x2="90" y2="20" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="2 2" />
          <line x1="10" y1="20" x2="90" y2="20" stroke="hsl(var(--border))" strokeWidth="0.2" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[
          { label: "Solicitudes/min", value: "24" },
          { label: "Latencia media", value: "45ms" },
          { label: "Contratos activos", value: "892" },
        ].map((stat) => (
          <div key={stat.label} className="text-center bg-muted/50 rounded-lg p-2 border">
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
