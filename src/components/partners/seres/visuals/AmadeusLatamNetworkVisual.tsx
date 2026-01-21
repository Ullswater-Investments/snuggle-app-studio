import { motion } from "framer-motion";
import { Globe, Server, Shield, FileSignature, ArrowRight, CheckCircle2 } from "lucide-react";

const AmadeusLatamNetworkVisual = () => {
  const countries = [
    { code: "MX", name: "México", x: 15, y: 30, color: "from-green-500 to-emerald-600" },
    { code: "CO", name: "Colombia", x: 25, y: 55, color: "from-yellow-500 to-amber-600" },
    { code: "EC", name: "Ecuador", x: 20, y: 65, color: "from-blue-500 to-cyan-600" },
    { code: "AR", name: "Argentina", x: 30, y: 85, color: "from-sky-400 to-blue-500" },
    { code: "ES", name: "España", x: 70, y: 35, color: "from-red-500 to-orange-500" },
  ];

  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-white mb-2 text-center">Red Federada LATAM-Europa</h3>
      <p className="text-sm text-slate-400 mb-8 text-center">
        Orquestación centralizada de facturación electrónica multi-jurisdicción
      </p>
      
      {/* Map Visualization */}
      <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 h-80 overflow-hidden">
        {/* Central Hub - Spain */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: 0.3 }}
          className="absolute"
          style={{ left: "70%", top: "35%", transform: "translate(-50%, -50%)" }}
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-500/20 rounded-full"
              style={{ width: "80px", height: "80px", transform: "translate(-15px, -15px)" }}
            />
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 z-10 relative">
              <Server className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-blue-400 whitespace-nowrap font-semibold">
              Hub Central
            </div>
          </div>
        </motion.div>
        
        {/* Country Nodes */}
        {countries.filter(c => c.code !== "ES").map((country, index) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.15 }}
            className="absolute"
            style={{ left: `${country.x}%`, top: `${country.y}%`, transform: "translate(-50%, -50%)" }}
          >
            {/* Connection line to hub */}
            <svg
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: "300px",
                height: "200px",
                transform: "translate(-50%, -50%)",
                overflow: "visible"
              }}
            >
              <motion.line
                x1="0"
                y1="0"
                x2={`${(70 - country.x) * 3}px`}
                y2={`${(35 - country.y) * 2}px`}
                stroke="url(#gradient)"
                strokeWidth="1"
                strokeDasharray="4,4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                  <stop offset="100%" stopColor="rgba(34, 211, 238, 0.5)" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${country.color} flex items-center justify-center shadow-md text-white text-xs font-bold`}>
              {country.code}
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap">
              {country.name}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* ODRL Policies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <h4 className="text-lg font-semibold text-white mb-4 text-center">Políticas ODRL por Jurisdicción</h4>
        
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { country: "México", policy: "CFDI 4.0", icon: FileSignature },
            { country: "Colombia", policy: "DIAN e-Factura", icon: Shield },
            { country: "Ecuador", policy: "SRI", icon: FileSignature },
            { country: "España", policy: "FacturaE + SII", icon: CheckCircle2 }
          ].map((item, i) => (
            <motion.div
              key={item.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-4 text-center"
            >
              <item.icon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">{item.country}</div>
              <div className="text-xs text-slate-400 mt-1">{item.policy}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Benefits Row */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {[
          "Compliance Automatizado",
          "Un Solo Punto de Integración",
          "Escalable a +20 países"
        ].map((benefit, i) => (
          <motion.span
            key={benefit}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 + i * 0.1 }}
            className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            {benefit}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default AmadeusLatamNetworkVisual;
