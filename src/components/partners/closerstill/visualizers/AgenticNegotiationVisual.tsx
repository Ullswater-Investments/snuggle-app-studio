import { motion } from "framer-motion";
import { Bot, MessageSquareCode, Coffee, Zap } from "lucide-react";

const AgenticNegotiationVisual = () => {
  return (
    <div className="relative h-32 bg-slate-900/80 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(217, 70, 239, 0.2) 1px, transparent 1px), linear-gradient(rgba(217, 70, 239, 0.2) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="flex items-center gap-6 relative">
        {/* Bot A - Buyer */}
        <motion.div
          className="relative"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Bot className="w-10 h-10 text-fuchsia-400" />
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-fuchsia-500/30 flex items-center justify-center"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-[8px] text-fuchsia-300">B</span>
          </motion.div>
        </motion.div>

        {/* Communication channel */}
        <div className="flex flex-col items-center gap-1 w-24">
          {/* Message burst from left */}
          <motion.div 
            className="flex items-center gap-1"
            animate={{ x: [0, 30], opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }}
          >
            <div className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"
                  animate={{ scale: [1, 0.5, 1] }}
                  transition={{ duration: 0.3, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>

          {/* Central processor */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <MessageSquareCode className="w-5 h-5 text-slate-500" />
          </motion.div>

          {/* Message burst from right */}
          <motion.div 
            className="flex items-center gap-1"
            animate={{ x: [0, -30], opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5, delay: 0.4 }}
          >
            <div className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  animate={{ scale: [1, 0.5, 1] }}
                  transition={{ duration: 0.3, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bot B - Seller */}
        <motion.div
          className="relative"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <Bot className="w-10 h-10 text-blue-400" />
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-500/30 flex items-center justify-center"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <span className="text-[8px] text-blue-300">S</span>
          </motion.div>
        </motion.div>

        {/* Result: Coffee meeting */}
        <motion.div
          className="absolute -right-4 -bottom-2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1]
          }}
          transition={{ 
            duration: 0.5, 
            repeat: Infinity, 
            repeatDelay: 3,
            times: [0, 0.5, 1]
          }}
        >
          <div className="bg-slate-800 p-2 rounded-full border border-amber-500/50 shadow-lg shadow-amber-500/20">
            <Coffee className="w-5 h-5 text-amber-400" />
          </div>
        </motion.div>
      </div>

      {/* Spark effects */}
      <motion.div
        className="absolute top-4 right-12"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap className="w-4 h-4 text-yellow-400" />
      </motion.div>

      {/* Glow effects */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-20 h-20 bg-fuchsia-500/10 rounded-full blur-2xl" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />

      {/* Tagline */}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span className="text-[10px] text-slate-500 italic">Tus bots negocian; tú cierras el trato</span>
      </div>
    </div>
  );
};

export default AgenticNegotiationVisual;
