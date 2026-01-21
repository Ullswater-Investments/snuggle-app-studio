import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface SeresQuoteBoxProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

const SeresQuoteBox = ({ quote, author, role, company }: SeresQuoteBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative my-12"
    >
      <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-8 md:p-10">
        {/* Quote icon */}
        <div className="absolute -top-4 left-8">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <Quote className="h-5 w-5 text-white" />
          </div>
        </div>
        
        {/* Quote text */}
        <blockquote className="text-xl md:text-2xl text-slate-200 italic leading-relaxed mb-6 pt-4">
          "{quote}"
        </blockquote>
        
        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
            {author.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="text-white font-semibold">{author}</div>
            <div className="text-sm text-slate-400">
              {role}{company && ` · ${company}`}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SeresQuoteBox;
