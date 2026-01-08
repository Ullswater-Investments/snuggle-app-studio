import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Clock } from "lucide-react";
import itbidLogo from "@/assets/itbid-logo.png";

const metrics = [
  { value: "-85%", label: "Fricción en intercambio", icon: Zap, color: "text-[hsl(var(--itbid-cyan))]" },
  { value: "100%", label: "Soberanía de datos", icon: Shield, color: "text-[hsl(var(--itbid-magenta))]" },
  { value: "10x", label: "Velocidad validación", icon: Clock, color: "text-[hsl(var(--itbid-purple))]" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-[hsl(var(--itbid-cyan)/0.05)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(var(--itbid-cyan)/0.2)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(var(--itbid-purple)/0.15)] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[hsl(var(--itbid-magenta)/0.1)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Dual Logos */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          <span className="text-2xl font-bold procuredata-gradient">PROCUREDATA</span>
          <span className="text-3xl text-muted-foreground">×</span>
          <img src={itbidLogo} alt="ITBID" className="h-10 object-contain" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Badge variant="outline" className="px-4 py-2 text-sm bg-[hsl(var(--itbid-cyan)/0.1)] border-[hsl(var(--itbid-cyan)/0.3)] itbid-font">
            🚀 Proyecto Estratégico 2026
          </Badge>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            <span className="itbid-gradient-gray">itbid-x</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light max-w-4xl mx-auto itbid-font">
            Hacia la Cadena de Suministro Soberana
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Implementación de un Espacio de Datos Federado compatible con Gaia-X
          </p>
        </motion.div>


        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-[hsl(var(--itbid-cyan)/0.5)] rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-[hsl(var(--itbid-cyan))] rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
