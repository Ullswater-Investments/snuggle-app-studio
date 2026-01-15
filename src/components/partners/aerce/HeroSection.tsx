import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Users } from "lucide-react";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

const metrics = [
  { value: "+30", label: "Años de Excelencia", icon: Award, color: "text-blue-600" },
  { value: "2.000+", label: "Profesionales CPO", icon: Users, color: "text-blue-500" },
  { value: "UNE 15896", label: "Certificación Europea", icon: GraduationCap, color: "text-blue-700" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-100 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Dual Logos */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          <ProcuredataLogo size="md" />
          <span className="text-3xl text-muted-foreground">×</span>
          <span className="text-2xl font-bold text-blue-800 tracking-tight">AERCE</span>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Badge variant="outline" className="px-4 py-2 text-sm bg-blue-50 border-blue-200 text-blue-700">
            🎓 Excelencia en Compras
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
            <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              AERCE Connect
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light max-w-4xl mx-auto">
            Impulsando la Excelencia en la Función de Compras
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La referencia institucional para los profesionales de Compras, Contratación y Aprovisionamientos en España
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
              <p className="text-3xl font-bold text-blue-800">{metric.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
            </motion.div>
          ))}
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
            className="w-6 h-10 border-2 border-blue-300 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
