import { motion } from "framer-motion";
import { 
  User, Shield, Lock, FileText, Brain, AlertTriangle, 
  Link, CheckCircle, Database, RefreshCw, Leaf, FileCheck,
  Building2, BarChart3, Bell, CreditCard, Hash
} from "lucide-react";

interface ServiceFlowDiagramProps {
  category: string;
  serviceName?: string;
  className?: string;
}

type FlowNode = {
  icon: React.ElementType;
  label: string;
  color: string;
};

type FlowConfig = {
  nodes: FlowNode[];
  lineColor: string;
};

const flowConfigs: Record<string, FlowConfig> = {
  "Privacidad": {
    nodes: [
      { icon: User, label: "Dato", color: "text-rose-500" },
      { icon: Shield, label: "Filtro", color: "text-amber-500" },
      { icon: Lock, label: "Seguro", color: "text-emerald-500" },
    ],
    lineColor: "from-rose-500 via-amber-500 to-emerald-500",
  },
  "Sostenibilidad": {
    nodes: [
      { icon: Database, label: "Datos", color: "text-blue-500" },
      { icon: Leaf, label: "Cálculo", color: "text-emerald-500" },
      { icon: FileCheck, label: "ISO", color: "text-green-600" },
    ],
    lineColor: "from-blue-500 via-emerald-500 to-green-600",
  },
  "IA & Analytics": {
    nodes: [
      { icon: FileText, label: "Input", color: "text-indigo-500" },
      { icon: Brain, label: "IA", color: "text-purple-500" },
      { icon: AlertTriangle, label: "Alertas", color: "text-amber-500" },
    ],
    lineColor: "from-indigo-500 via-purple-500 to-amber-500",
  },
  "Blockchain": {
    nodes: [
      { icon: Hash, label: "Hash", color: "text-orange-500" },
      { icon: Link, label: "Chain", color: "text-amber-600" },
      { icon: CheckCircle, label: "Cert.", color: "text-emerald-500" },
    ],
    lineColor: "from-orange-500 via-amber-600 to-emerald-500",
  },
  "Compliance": {
    nodes: [
      { icon: FileText, label: "Contrato", color: "text-violet-500" },
      { icon: Shield, label: "Validar", color: "text-blue-500" },
      { icon: CheckCircle, label: "Cumple", color: "text-emerald-500" },
    ],
    lineColor: "from-violet-500 via-blue-500 to-emerald-500",
  },
  "Data Ops": {
    nodes: [
      { icon: FileText, label: "CSV", color: "text-cyan-500" },
      { icon: RefreshCw, label: "Proceso", color: "text-blue-500" },
      { icon: Database, label: "JSON-LD", color: "text-emerald-500" },
    ],
    lineColor: "from-cyan-500 via-blue-500 to-emerald-500",
  },
  "Integración": {
    nodes: [
      { icon: Building2, label: "ERP", color: "text-blue-500" },
      { icon: RefreshCw, label: "Sync", color: "text-purple-500" },
      { icon: Database, label: "Data", color: "text-emerald-500" },
    ],
    lineColor: "from-blue-500 via-purple-500 to-emerald-500",
  },
  "Finanzas": {
    nodes: [
      { icon: BarChart3, label: "Historial", color: "text-blue-500" },
      { icon: CreditCard, label: "Scoring", color: "text-amber-500" },
      { icon: CheckCircle, label: "Aprobado", color: "text-emerald-500" },
    ],
    lineColor: "from-blue-500 via-amber-500 to-emerald-500",
  },
  "Inteligencia": {
    nodes: [
      { icon: Database, label: "Monitor", color: "text-indigo-500" },
      { icon: Bell, label: "Detectar", color: "text-amber-500" },
      { icon: AlertTriangle, label: "Alerta", color: "text-rose-500" },
    ],
    lineColor: "from-indigo-500 via-amber-500 to-rose-500",
  },
};

// Default flow for unknown categories
const defaultFlow: FlowConfig = {
  nodes: [
    { icon: Database, label: "Input", color: "text-muted-foreground" },
    { icon: RefreshCw, label: "Proceso", color: "text-primary" },
    { icon: CheckCircle, label: "Output", color: "text-emerald-500" },
  ],
  lineColor: "from-muted-foreground via-primary to-emerald-500",
};

export const ServiceFlowDiagram = ({ category, className }: ServiceFlowDiagramProps) => {
  const config = flowConfigs[category] || defaultFlow;
  const { nodes, lineColor } = config;

  return (
    <div className={`relative py-4 px-2 ${className}`}>
      {/* Flow container */}
      <div className="flex items-center justify-between relative">
        {/* Animated line connecting nodes */}
        <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 -translate-y-1/2">
          <div className={`h-full bg-gradient-to-r ${lineColor} opacity-30 rounded-full`} />
          <motion.div
            className={`absolute top-0 left-0 h-full w-8 bg-gradient-to-r ${lineColor} rounded-full blur-sm`}
            animate={{
              left: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15, duration: 0.3 }}
          >
            <motion.div
              className="p-2 rounded-full bg-background border-2 border-muted shadow-sm"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <node.icon className={`h-4 w-4 ${node.color}`} />
            </motion.div>
            <span className="text-[10px] text-muted-foreground mt-1 font-medium">
              {node.label}
            </span>
          </motion.div>
        ))}

        {/* Arrows between nodes */}
        <div className="absolute top-1/2 left-[30%] -translate-y-1/2 text-muted-foreground/50">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
        <div className="absolute top-1/2 right-[30%] -translate-y-1/2 text-muted-foreground/50">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            →
          </motion.span>
        </div>
      </div>
    </div>
  );
};
