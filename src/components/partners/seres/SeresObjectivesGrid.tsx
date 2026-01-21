import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Objective {
  icon: LucideIcon;
  title: string;
  description?: string;
}

interface SeresObjectivesGridProps {
  objectives: Objective[];
  title?: string;
}

const SeresObjectivesGrid = ({ objectives, title = "Objetivos del Proyecto" }: SeresObjectivesGridProps) => {
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {objectives.map((objective, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 h-full hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                {/* Icon with SERES style - outline blue */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <objective.icon className="h-7 w-7 text-blue-400" strokeWidth={1.5} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {objective.title}
                  </h3>
                  {objective.description && (
                    <p className="text-sm text-slate-400">
                      {objective.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SeresObjectivesGrid;
