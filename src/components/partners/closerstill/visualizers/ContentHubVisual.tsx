import { motion } from "framer-motion";
import { Video, Lock, Coins, User } from "lucide-react";

const ContentHubVisual = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden p-4">
      {/* Video player mockup */}
      <div className="relative w-full h-24 bg-slate-700 rounded-lg overflow-hidden">
        {/* Video thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
          <Video className="h-8 w-8 text-slate-500" />
        </div>

        {/* Lock overlay */}
        <motion.div
          className="absolute inset-0 bg-slate-900/80 flex items-center justify-center"
          animate={{ opacity: [1, 1, 0, 0, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <motion.div
            animate={{ scale: [1, 0.8, 0.8] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Lock className="h-8 w-8 text-slate-500" />
          </motion.div>
        </motion.div>

        {/* Play indicator */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-8 border-l-white border-y-4 border-y-transparent ml-1" />
          </div>
        </motion.div>
      </div>

      {/* Token payment animation */}
      <div className="mt-4 flex items-center justify-between">
        {/* Token insertion */}
        <motion.div
          className="flex items-center gap-2"
          animate={{ x: [0, 30, 30, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <motion.div
            animate={{ opacity: [1, 0, 0, 1], scale: [1, 0.5, 0.5, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Coins className="h-5 w-5 text-yellow-400" />
          </motion.div>
          <span className="text-[10px] text-slate-500">Token</span>
        </motion.div>

        {/* Arrow */}
        <motion.span
          className="text-slate-600"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          →
        </motion.span>

        {/* Royalty to speaker */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="p-1 bg-slate-700 rounded">
            <User className="h-4 w-4 text-slate-400" />
          </div>
          <motion.div
            animate={{ x: [-20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 2.5, repeat: Infinity, repeatDelay: 4.5 }}
          >
            <Coins className="h-4 w-4 text-green-400" />
          </motion.div>
          <span className="text-[10px] text-green-400">Royalty</span>
        </motion.div>
      </div>

      {/* Label */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        Micropagos con Smart Contracts
      </div>
    </div>
  );
};

export default ContentHubVisual;
