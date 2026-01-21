import { motion } from "framer-motion";
import { Building2, FileSignature, Shield, CheckCircle2, CreditCard, ArrowRight, UserCheck } from "lucide-react";

const BTPublicSectorVisual = () => {
  const steps = [
    {
      icon: CreditCard,
      title: "EUDI Wallet",
      description: "Credenciales de identidad empresarial",
      color: "from-indigo-500 to-violet-600"
    },
    {
      icon: Shield,
      title: "Verificación Gaia-X",
      description: "Cumplimiento normativo certificado",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FileSignature,
      title: "e-Factura B2G",
      description: "Factura electrónica a AAPP",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Building2,
      title: "Administración",
      description: "Recepción automatizada",
      color: "from-slate-500 to-zinc-600"
    }
  ];

  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-white mb-2 text-center">Flujo B2G con Identidad Soberana</h3>
      <p className="text-sm text-slate-400 mb-8 text-center">
        Facturación a Administraciones Públicas con verificación automatizada
      </p>
      
      {/* Main Flow */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="flex items-center"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </motion.div>
                <div className="mt-3 max-w-[120px]">
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
      </div>
      
      {/* EUDI Wallet Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-500/30 rounded-xl p-6 mb-8"
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-indigo-600/30 flex items-center justify-center flex-shrink-0">
            <UserCheck className="h-7 w-7 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">European Digital Identity Wallet</h4>
            <p className="text-sm text-slate-300 mb-4">
              BT presenta automáticamente sus credenciales empresariales verificables al emitir facturas a la Administración Pública.
            </p>
            
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "NIF verificado criptográficamente",
                "Certificado de estar al corriente de pagos",
                "Acreditación como proveedor homologado",
                "Firma electrónica cualificada eIDAS"
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-indigo-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Licitaciones Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Automatización KYC/KYB</h4>
          <ul className="space-y-3">
            {[
              "Verificación de identidad sin papeles",
              "Actualización automática de datos",
              "Historial de transacciones inmutable"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Licitaciones Públicas</h4>
          <ul className="space-y-3">
            {[
              "Presentación de credenciales en segundos",
              "Validación instantánea de requisitos",
              "Trazabilidad completa del proceso"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default BTPublicSectorVisual;
