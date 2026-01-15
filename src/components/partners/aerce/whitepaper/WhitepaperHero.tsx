import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Award, Users, GraduationCap } from "lucide-react";
import aerceLogo from "@/assets/aerce-logo.png";

export const WhitepaperHero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-24 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-background to-blue-800/5" />
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
          <img src={aerceLogo} alt="AERCE" className="h-12 object-contain" />
        </div>

        {/* Version Badge */}
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <Badge variant="outline" className="gap-1.5 px-3 py-1">
            <FileText className="h-3.5 w-3.5" />
            Whitepaper Estratégico v1.0
          </Badge>
          <Badge variant="outline" className="gap-1.5 px-3 py-1">
            <Calendar className="h-3.5 w-3.5" />
            Enero 2026
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent font-semibold">
            AERCE Connect
          </span>
          <br />
          <span className="text-foreground/80">El Futuro de la</span>
          <br />
          <span className="text-foreground/80">Función de Compras</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transformación Digital, Certificación Profesional y Desarrollo de Talento 
          para el CPO del Siglo XXI
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">UNE 15896</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
            <GraduationCap className="h-4 w-4" />
            <span className="text-sm font-medium">IFPSM Certified</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 text-purple-600 dark:text-purple-400">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">+2.000 CPOs</span>
          </div>
        </div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/10 via-transparent to-blue-800/10 blur-3xl"
        />
      </motion.div>
    </div>
  );
};
