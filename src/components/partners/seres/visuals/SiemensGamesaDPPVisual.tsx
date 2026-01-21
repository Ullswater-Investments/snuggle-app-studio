import { motion } from "framer-motion";
import { FileSignature, ArrowRight, Layers, Leaf, Shield, Link } from "lucide-react";

const SiemensGamesaDPPVisual = () => {
  return (
    <div className="py-8">
      <h3 className="text-xl font-bold text-white mb-2 text-center">Pasaporte Digital del Producto (DPP)</h3>
      <p className="text-sm text-slate-400 mb-8 text-center">
        De línea de factura a huella de carbono certificada
      </p>
      
      {/* Main Flow */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Invoice Line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-3">
              <FileSignature className="h-8 w-8 text-blue-400" />
            </div>
            <div className="text-sm font-semibold text-white">Línea de Factura</div>
            <div className="text-xs text-slate-400 mt-1">
              Componente: "Generador 5MW"<br/>
              Proveedor: Siemens Energy
            </div>
          </motion.div>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center"
          >
            <ArrowRight className="h-6 w-6 text-slate-500" />
          </motion.div>
          
          {/* Semantic Mapping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex-1 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-3">
              <Layers className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-sm font-semibold text-white">Mapeo Semántico</div>
            <div className="text-xs text-slate-400 mt-1">
              UNSPSC → Factor Emisión<br/>
              Base de datos Catena-X
            </div>
          </motion.div>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center"
          >
            <ArrowRight className="h-6 w-6 text-slate-500" />
          </motion.div>
          
          {/* Carbon Footprint */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex-1 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center mb-3">
              <Leaf className="h-8 w-8 text-emerald-400" />
            </div>
            <div className="text-sm font-semibold text-white">PCF Certificado</div>
            <div className="text-xs text-slate-400 mt-1">
              Huella: 2.4 tCO2e<br/>
              Credencial Verificable
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Catena-X Interoperability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-orange-900/30 to-amber-900/20 border border-orange-500/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-orange-600/30 flex items-center justify-center">
            <Link className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">Interoperabilidad Catena-X</div>
            <div className="text-sm text-slate-400">Integración con el Data Space Automotriz Europeo</div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "EDC Connector", desc: "Protocolo estándar de intercambio" },
            { title: "Semantic Hub", desc: "Modelos de datos compartidos" },
            { title: "Digital Twin", desc: "Gemelo digital de cada componente" }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-3 text-center"
            >
              <div className="text-sm font-semibold text-orange-300">{item.title}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Compliance Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9 }}
        className="mt-6 flex justify-center"
      >
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm">
          <Shield className="h-4 w-4" />
          Cumple con regulación EU Battery Passport 2027
        </div>
      </motion.div>
    </div>
  );
};

export default SiemensGamesaDPPVisual;
