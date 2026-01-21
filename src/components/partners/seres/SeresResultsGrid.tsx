import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Result {
  icon: LucideIcon;
  title: string;
  description: string;
  metric?: string;
}

interface SeresResultsGridProps {
  results: Result[];
  title?: string;
}

const SeresResultsGrid = ({ results, title = "Resultados Obtenidos" }: SeresResultsGridProps) => {
  return (
    <div className="py-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-white mb-8 text-center"
      >
        {title}
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 h-full hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all duration-300 text-center">
              {/* Icon - SERES outline style */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <result.icon className="h-8 w-8 text-emerald-400" strokeWidth={1.5} />
              </div>
              
              {result.metric && (
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {result.metric}
                </div>
              )}
              
              <h3 className="text-lg font-semibold text-white mb-2">
                {result.title}
              </h3>
              
              <p className="text-sm text-slate-400">
                {result.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SeresResultsGrid;
