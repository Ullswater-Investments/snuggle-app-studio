import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Leaf, MousePointer2 } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-teal-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-teal-100/20 to-transparent rounded-full blur-3xl" />
        
        {/* Abstract geometric shapes */}
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 border border-emerald-200/50 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-32 left-20 w-24 h-24 border border-teal-200/50 rounded-lg rotate-45"
          animate={{ rotate: 405 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {/* Dual Logos */}
        <motion.div 
          className="flex items-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-lg font-semibold text-slate-700">ProcureData</span>
          </div>
          <span className="text-slate-300 text-2xl font-light">×</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-700">TeleNatura EBT</span>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 px-4 py-1.5 text-sm font-medium shadow-sm">
            🌱 Agricultura 4.0
          </Badge>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 bg-clip-text text-transparent">
            TeleNatura
          </span>
          <br />
          <span className="text-slate-800">Connect</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-600 mb-6 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Digitalización Sostenible del Sector Primario
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-lg md:text-xl text-slate-400 max-w-3xl font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Integración de IoT y Teledetección para la gestión eficiente de recursos naturales. 
          Empresa de Base Tecnológica especializada en agricultura de precisión.
        </motion.p>

        {/* Key metrics */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {[
            { value: "+15", label: "Años experiencia" },
            { value: "EBT", label: "Base Tecnológica" },
            { value: "IoT", label: "Sensores conectados" },
            { value: "Gaia-X", label: "Compatible" },
          ].map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">{metric.value}</div>
              <div className="text-sm text-slate-500">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-400 uppercase tracking-widest">Explorar</span>
          <MousePointer2 className="w-5 h-5 text-emerald-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
