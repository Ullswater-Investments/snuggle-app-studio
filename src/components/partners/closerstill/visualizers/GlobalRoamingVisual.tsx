import { motion } from "framer-motion";
import { Map, Plane, BadgeCheck } from "lucide-react";

const GlobalRoamingVisual = () => {
  return (
    <div className="relative h-32 bg-slate-900/80 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.3) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Flight path */}
      <div className="flex items-center justify-between w-full px-8 relative">
        {/* Origin - Madrid */}
        <div className="flex flex-col items-center z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <Map className="w-8 h-8 text-emerald-400" />
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
          <span className="text-xs text-emerald-400 font-bold mt-1">MAD</span>
        </div>

        {/* Path line */}
        <svg className="absolute inset-x-12 h-16 top-1/2 -translate-y-1/2" preserveAspectRatio="none">
          <motion.path
            d="M 0,32 Q 100,0 200,32"
            fill="none"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>

        {/* Flying Badge/Plane */}
        <motion.div
          className="absolute z-20"
          animate={{ 
            left: ["15%", "75%"],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 3, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="relative">
            <Plane className="w-6 h-6 text-sky-400 rotate-45" />
            <motion.div
              className="absolute -bottom-1 -right-1"
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Destination - London */}
        <div className="flex flex-col items-center z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="relative"
          >
            <Map className="w-8 h-8 text-sky-400" />
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-sky-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
          <span className="text-xs text-sky-400 font-bold mt-1">LON</span>
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-emerald-500/20 rounded-full blur-xl" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-sky-500/20 rounded-full blur-xl" />

      {/* Tagline */}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span className="text-[10px] text-slate-500 italic">Tu reputación viaja sin aduanas</span>
      </div>
    </div>
  );
};

export default GlobalRoamingVisual;
