import { motion } from "framer-motion";
import { CheckCircle2, LucideIcon } from "lucide-react";

interface SeresSolutionSectionProps {
  title?: string;
  description: string;
  features: { icon?: LucideIcon; text: string }[];
  variant?: "blue" | "gradient";
}

const SeresSolutionSection = ({ 
  title = "Solución SERES", 
  description, 
  features,
  variant = "blue"
}: SeresSolutionSectionProps) => {
  const bgClass = variant === "blue" 
    ? "bg-blue-600" 
    : "bg-gradient-to-br from-blue-600 to-cyan-600";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${bgClass} rounded-2xl p-8 md:p-10 my-12`}
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-white mb-4"
      >
        {title}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-blue-100 mb-8"
      >
        {description}
      </motion.p>
      
      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon || CheckCircle2;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3"
            >
              <Icon className="h-5 w-5 text-white flex-shrink-0" />
              <span className="text-white">{feature.text}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SeresSolutionSection;
