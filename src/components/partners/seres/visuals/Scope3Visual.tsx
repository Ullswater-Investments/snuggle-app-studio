import { motion } from "framer-motion";
import { Wind, Factory, Truck, Building2, Leaf, AlertTriangle } from "lucide-react";

export const Scope3Visual = () => {
  const scopes = [
    {
      id: 1,
      name: "Alcance 1",
      description: "Emisiones directas",
      percentage: 0.5,
      color: "bg-blue-500",
      icon: Factory
    },
    {
      id: 2,
      name: "Alcance 2",
      description: "Electricidad comprada",
      percentage: 0.5,
      color: "bg-purple-500",
      icon: Building2
    },
    {
      id: 3,
      name: "Alcance 3",
      description: "Cadena de valor",
      percentage: 99,
      color: "bg-amber-500",
      icon: Truck
    }
  ];

  return (
    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Wind className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Siemens Gamesa</h4>
              <p className="text-xs text-slate-400">Distribución de Emisiones GEI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/30">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-xs text-amber-400 font-medium">99% en Alcance 3</span>
          </div>
        </div>

        {/* Visual Bar */}
        <div className="space-y-4">
          <div className="h-16 rounded-xl overflow-hidden flex">
            {scopes.map((scope, index) => (
              <motion.div
                key={scope.id}
                initial={{ width: 0 }}
                animate={{ width: `${scope.percentage}%` }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                className={`${scope.color} flex items-center justify-center relative overflow-hidden`}
                style={{ minWidth: scope.percentage > 5 ? 'auto' : '40px' }}
              >
                {scope.percentage > 10 && (
                  <div className="text-center">
                    <scope.icon className="h-6 w-6 text-white/80 mx-auto mb-1" />
                    <span className="text-xs text-white font-bold">{scope.percentage}%</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="grid md:grid-cols-3 gap-4">
            {scopes.map((scope, index) => (
              <motion.div
                key={scope.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.15 }}
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
              >
                <div className={`w-4 h-4 rounded ${scope.color}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{scope.name}</div>
                  <div className="text-xs text-slate-500">{scope.description}</div>
                </div>
                <div className="text-sm font-bold text-white">{scope.percentage}%</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-4 pt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="p-4 bg-red-500/10 rounded-xl border border-red-500/20"
          >
            <h5 className="text-sm font-semibold text-red-300 mb-2">El Desafío</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Datos fragmentados en miles de proveedores</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Encuestas manuales y estimaciones imprecisas</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Riesgo reputacional de greenwashing</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 }}
            className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20"
          >
            <h5 className="text-sm font-semibold text-emerald-300 mb-2">Solución PROCUREDATA</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Leaf className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Pasaporte Digital del Producto (DPP)</span>
              </li>
              <li className="flex items-start gap-2">
                <Leaf className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Interoperabilidad con Catena-X</span>
              </li>
              <li className="flex items-start gap-2">
                <Leaf className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>PCF automático desde línea de factura</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Scope3Visual;
