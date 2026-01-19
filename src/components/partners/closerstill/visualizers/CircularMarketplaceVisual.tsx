import { motion } from "framer-motion";
import { Armchair, RefreshCw, Leaf, Coins, Award } from "lucide-react";

const CircularMarketplaceVisual = () => {
  return (
    <div className="relative h-32 bg-slate-900/80 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden">
      {/* Background organic pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(132, 204, 22, 0.2) 0%, transparent 50%)',
        }} />
      </div>

      <div className="relative flex items-center justify-center">
        {/* Rotating cycle ring */}
        <motion.div
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        >
          <RefreshCw className="w-24 h-24 text-slate-700/50" strokeWidth={1} />
        </motion.div>

        {/* Inner rotating ring (opposite direction) */}
        <motion.div
          className="absolute"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        >
          <div className="w-16 h-16 border border-dashed border-lime-500/30 rounded-full" />
        </motion.div>

        {/* Central asset transformation */}
        <div className="relative z-10">
          {/* Chair fading out */}
          <motion.div
            animate={{ 
              opacity: [1, 0.3, 1],
              scale: [1, 0.8, 1],
              rotateY: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Armchair className="w-10 h-10 text-slate-400" />
          </motion.div>
        </div>

        {/* Orbiting outputs */}
        {/* Token/Euro output */}
        <motion.div
          className="absolute"
          animate={{ 
            rotate: 360,
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        >
          <motion.div 
            className="absolute -top-10"
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="bg-amber-500/20 p-1.5 rounded-full border border-amber-500/50">
              <Coins className="w-4 h-4 text-amber-400" />
            </div>
          </motion.div>
        </motion.div>

        {/* Leaf output */}
        <motion.div
          className="absolute"
          animate={{ 
            rotate: -360,
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <motion.div 
            className="absolute -bottom-10"
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <div className="bg-lime-500/20 p-1.5 rounded-full border border-lime-500/50">
              <Leaf className="w-4 h-4 text-lime-400" />
            </div>
          </motion.div>
        </motion.div>

        {/* Certificate output */}
        <motion.div
          className="absolute"
          animate={{ 
            rotate: 360,
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
        >
          <motion.div 
            className="absolute -left-12"
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <div className="bg-emerald-500/20 p-1.5 rounded-full border border-emerald-500/50">
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Flow arrows */}
      <motion.div
        className="absolute top-6 right-6"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-lime-400 text-lg">♻️</span>
      </motion.div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-lime-500/5 to-transparent" />

      {/* Tagline */}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span className="text-[10px] text-slate-500 italic">Nada se pierde, todo se transforma</span>
      </div>
    </div>
  );
};

export default CircularMarketplaceVisual;
