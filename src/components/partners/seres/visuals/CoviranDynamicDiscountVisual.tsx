import { motion } from "framer-motion";
import { FileSignature, CheckCircle2, Coins, Zap, ArrowRight, Clock, Percent } from "lucide-react";

const CoviranDynamicDiscountVisual = () => {
  const steps = [
    {
      icon: FileSignature,
      title: "Factura Aprobada",
      description: "Factura verificada y aprobada por Covirán",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Percent,
      title: "Smart Contract",
      description: "Ofrece descuento dinámico basado en rating",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Clock,
      title: "Proveedor Acepta",
      description: "Cobra antes a cambio de descuento",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Coins,
      title: "Pago EURAU",
      description: "Liquidación instantánea en stablecoin",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-white mb-2 text-center">Descuento Dinámico Soberano</h3>
      <p className="text-sm text-slate-400 mb-8 text-center">
        Smart contracts que automatizan el pronto pago entre cooperativistas
      </p>
      
      {/* Flow Steps */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="flex items-center"
          >
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
              >
                <step.icon className="h-8 w-8 text-white" />
              </motion.div>
              <div className="mt-3 text-center max-w-[120px]">
                <div className="text-sm font-semibold text-white">{step.title}</div>
                <div className="text-xs text-slate-400 mt-1">{step.description}</div>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3 }}
                className="hidden md:flex items-center mx-4"
              >
                <div className="w-8 h-0.5 bg-slate-600" />
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Zap, title: "Liquidez Inmediata", desc: "Proveedores cobran en 24h vs 60-90 días" },
          { icon: Percent, title: "Descuento Justo", desc: "Tasa calculada por algoritmo basado en historial" },
          { icon: CheckCircle2, title: "Sin Intermediarios", desc: "Contratos ejecutados automáticamente en blockchain" }
        ].map((benefit, i) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center"
          >
            <benefit.icon className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">{benefit.title}</div>
            <div className="text-xs text-slate-400 mt-1">{benefit.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoviranDynamicDiscountVisual;
