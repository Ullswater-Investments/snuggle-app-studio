import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface SeresHeroSectionProps {
  title: string;
  sector: string;
  years?: string;
  icon: LucideIcon;
  color: string;
  stats?: { label: string; value: string }[];
}

const SeresHeroSection = ({ title, sector, years, icon: Icon, color, stats }: SeresHeroSectionProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16">
      {/* Decorative Circle - SERES style */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500"
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-2 border-blue-400"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          {/* Icon */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-2xl`}
          >
            <Icon className="h-12 w-12 text-white" />
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-sm">
                {sector}
              </Badge>
              {years && (
                <Badge variant="outline" className="text-slate-400 border-slate-600">
                  {years}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
          </div>
        </motion.div>
        
        {/* Stats Grid */}
        {stats && stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SeresHeroSection;
