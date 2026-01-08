import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Shield } from "lucide-react";
import itbidLogo from "@/assets/itbid-logo.png";

export const WhitepaperHero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-24 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--itbid-cyan)/0.05)] via-background to-[hsl(var(--itbid-purple)/0.05)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center max-w-3xl mx-auto"
      >
        {/* Logos */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <span className="text-2xl font-bold procuredata-gradient">PROCUREDATA</span>
          <span className="text-3xl text-muted-foreground">×</span>
          <img src={itbidLogo} alt="ITBID" className="h-10 object-contain" />
        </div>

        {/* Version Badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Badge variant="outline" className="gap-1.5 px-3 py-1">
            <FileText className="h-3.5 w-3.5" />
            Whitepaper Técnico v1.0
          </Badge>
          <Badge variant="outline" className="gap-1.5 px-3 py-1">
            <Calendar className="h-3.5 w-3.5" />
            Enero 2026
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
          <span className="itbid-gradient font-semibold">ITBID-X</span>
          <br />
          <span className="itbid-gradient-gray">Hacia la Cadena de</span>
          <br />
          <span className="itbid-gradient-gray">Suministro Soberana</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Implementación de un Espacio de Datos Federado Gaia-X para la 
          Interoperabilidad Industrial Europea
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--itbid-lime)/0.1)] text-[hsl(var(--itbid-lime))]">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Gaia-X Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))]">
            <span className="text-sm font-medium">IDSA Standard</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--itbid-purple)/0.1)] text-[hsl(var(--itbid-purple))]">
            <span className="text-sm font-medium">Web3 Enabled</span>
          </div>
        </div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.1)] via-transparent to-[hsl(var(--itbid-purple)/0.1)] blur-3xl"
        />
      </motion.div>
    </div>
  );
};
