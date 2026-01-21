import { motion } from "framer-motion";
import { Building2, FileSignature, Shield, CheckCircle2, ArrowRight, FileCheck, BarChart3 } from "lucide-react";

export const CredentialFlowVisual = () => {
  const steps = [
    {
      id: 1,
      title: "Emisión de Factura",
      description: "Ilunion emite factura con servicio prestado",
      icon: Building2,
      color: "from-purple-500 to-violet-600"
    },
    {
      id: 2,
      title: "Verificación SERES",
      description: "Nodo verifica datos y acuña VC de Impacto Social",
      icon: FileSignature,
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      title: "Transferencia Segura",
      description: "Factura + VC viajan con firma criptográfica",
      icon: Shield,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 4,
      title: "Validación Cliente",
      description: "ERP del cliente valida firma automáticamente",
      icon: CheckCircle2,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 5,
      title: "Informe ESG",
      description: "Datos inyectados en dashboard CSRD sin auditoría manual",
      icon: BarChart3,
      color: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
      <div className="space-y-8">
        {/* Flow Steps */}
        <div className="relative">
          <div className="flex flex-wrap md:flex-nowrap items-start gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex-1 min-w-[140px]"
              >
                <div className="flex flex-col items-center">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-3`}
                  >
                    <step.icon className="h-7 w-7 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-sm font-semibold text-white text-center mb-1">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-slate-400 text-center">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.1 }}
                    className="hidden md:flex absolute top-6"
                    style={{ left: `calc(${(index + 1) * 20}% - 8px)` }}
                  >
                    <ArrowRight className="h-5 w-5 text-slate-600" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Credential Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileCheck className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold text-white">Credencial Verificable de Impacto Social</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Credential Attributes */}
            <div className="space-y-2">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Atributos Certificados</div>
              {[
                "Centro especial de empleo",
                ">70% plantilla con discapacidad",
                "Huella de carbono del servicio",
                "Certificación ONCE"
              ].map((attr, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-slate-300">{attr}</span>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Beneficios</div>
              {[
                { text: "Sin auditorías manuales", color: "text-emerald-400" },
                { text: "Cumplimiento CSRD automático", color: "text-blue-400" },
                { text: "Trazabilidad inmutable", color: "text-purple-400" },
                { text: "Verificación instantánea", color: "text-amber-400" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className={`h-3 w-3 ${benefit.color}`} />
                  <span className="text-xs text-slate-300">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex items-center justify-center gap-3 text-xs text-slate-500"
        >
          <Shield className="h-4 w-4 text-blue-400" />
          <span>Firmado criptográficamente por SERES · Co-firmado por certificadores externos</span>
        </motion.div>
      </div>
    </div>
  );
};

export default CredentialFlowVisual;
