import { motion } from "framer-motion";
import { Building2, Server, Container, Database, FileCheck, Trash2, ArrowRight, Shield } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Envío de Algoritmo",
    description: "El banco envía su algoritmo de scoring empaquetado en Docker",
    icon: Building2,
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 2,
    title: "Validación",
    description: "Ocean Provider valida credenciales y permisos en blockchain",
    icon: Shield,
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: 3,
    title: "Entorno Efímero",
    description: "Se lanza un pod Kubernetes aislado para la ejecución",
    icon: Container,
    color: "from-purple-500 to-violet-600"
  },
  {
    id: 4,
    title: "Ejecución Segura",
    description: "El algoritmo accede a datos inyectados y ejecuta el scoring",
    icon: Database,
    color: "from-amber-500 to-orange-600"
  },
  {
    id: 5,
    title: "Resultado y Destrucción",
    description: "Solo se devuelven resultados agregados; el entorno se autodestruye",
    icon: FileCheck,
    color: "from-pink-500 to-rose-600"
  }
];

export const ComputeToDataVisual = () => {
  return (
    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
      <div className="space-y-8">
        {/* Flow Diagram */}
        <div className="relative">
          <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center flex-1 min-w-[120px]"
              >
                {/* Step Number */}
                <div className="text-xs text-slate-500 font-mono mb-2">PASO {step.id}</div>
                
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-3 relative`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                  
                  {/* Pulse animation for active step */}
                  {step.id === 4 && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl bg-amber-500/30"
                    />
                  )}
                </motion.div>

                {/* Title */}
                <h4 className="text-sm font-semibold text-white text-center mb-1">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-400 text-center max-w-[140px]">
                  {step.description}
                </p>

                {/* Arrow (except last) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.1 }}
                    className="hidden md:block absolute top-14"
                    style={{ left: `calc(${(index + 1) * 20}% - 10px)` }}
                  >
                    <ArrowRight className="h-5 w-5 text-slate-600" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Flow Illustration */}
        <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Data Never Leaves */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                <Database className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Datos Sensibles</div>
                <div className="text-xs text-red-400">Nunca salen de SERES</div>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4 }}
            >
              <ArrowRight className="h-6 w-6 text-slate-600" />
            </motion.div>

            {/* Algorithm Visits */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Container className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Algoritmo Visitante</div>
                <div className="text-xs text-blue-400">Viene al dato, no al revés</div>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.8 }}
            >
              <ArrowRight className="h-6 w-6 text-slate-600" />
            </motion.div>

            {/* Only Results */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <FileCheck className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Solo Resultados</div>
                <div className="text-xs text-emerald-400">Score, predicción, semáforo</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="flex items-center justify-center gap-2 text-xs text-slate-500"
        >
          <Trash2 className="h-3 w-3" />
          <span>El entorno de computación se destruye automáticamente tras la ejecución</span>
        </motion.div>
      </div>
    </div>
  );
};

export default ComputeToDataVisual;
