import { motion } from "framer-motion";
import { User, GraduationCap, Briefcase, CheckCircle, Link } from "lucide-react";

const TalentPoolVisual = () => {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden p-4">
      {/* Profile Card */}
      <div className="flex items-start gap-3">
        <div className="p-2 bg-slate-700 rounded-lg">
          <User className="h-6 w-6 text-slate-300" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 bg-slate-700 rounded" />
          <div className="h-2 w-16 bg-slate-700/50 rounded" />
        </div>
      </div>

      {/* Verification Items */}
      <div className="mt-4 space-y-3">
        {/* University Degree */}
        <div className="flex items-center gap-3">
          <GraduationCap className="h-4 w-4 text-slate-500" />
          <div className="flex-1 h-2 bg-slate-700 rounded" />
          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: [0, 1, 1], x: [10, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <motion.div
              className="w-4 h-4 rounded-full border-2 border-slate-600"
              animate={{
                borderColor: ["#475569", "#22c55e", "#22c55e"],
                backgroundColor: ["transparent", "#22c55e", "#22c55e"],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <CheckCircle className="h-4 w-4 text-green-500" />
            <Link className="h-3 w-3 text-blue-400" />
          </motion.div>
        </div>

        {/* Work Experience */}
        <div className="flex items-center gap-3">
          <Briefcase className="h-4 w-4 text-slate-500" />
          <div className="flex-1 h-2 bg-slate-700 rounded" />
          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: [0, 0, 1, 1], x: [10, 10, 0, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
          >
            <motion.div
              className="w-4 h-4 rounded-full border-2 border-slate-600"
              animate={{
                borderColor: ["#475569", "#475569", "#22c55e", "#22c55e"],
                backgroundColor: ["transparent", "transparent", "#22c55e", "#22c55e"],
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <CheckCircle className="h-4 w-4 text-green-500" />
            <Link className="h-3 w-3 text-blue-400" />
          </motion.div>
        </div>
      </div>

      {/* Blockchain Badge */}
      <motion.div
        className="absolute bottom-4 right-4 px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded text-xs text-white font-medium"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Blockchain Verified
      </motion.div>

      {/* Label */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400">
        CV Criptográfico Inmutable
      </div>
    </div>
  );
};

export default TalentPoolVisual;
