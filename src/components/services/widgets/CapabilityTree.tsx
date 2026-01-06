import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, BrainCircuit, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const CapabilityTree = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="p-4 rounded-lg bg-muted/30 relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
        animate={{
          x: hovered ? ['0%', '100%'] : '0%',
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      {/* Tree Container */}
      <div className="relative flex items-center justify-between h-16">
        {/* Animated Lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* Line 1: Node 1 to Node 2 */}
          <motion.line
            x1="15%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{
              pathLength: hovered ? 1 : 0.3,
              opacity: hovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.5 }}
          />
          {/* Line 2: Node 2 to Node 3 */}
          <motion.line
            x1="50%"
            y1="50%"
            x2="85%"
            y2="50%"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{
              pathLength: hovered ? 1 : 0.3,
              opacity: hovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.5, delay: hovered ? 0.3 : 0 }}
          />
        </svg>

        {/* Node 1: Raw Data */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="p-2 rounded-full bg-muted"
            animate={{
              backgroundColor: hovered ? 'hsl(var(--primary) / 0.2)' : 'hsl(var(--muted))',
            }}
          >
            <Database className="h-5 w-5 text-muted-foreground" />
          </motion.div>
          <span className="text-[10px] text-muted-foreground mt-1">Raw Data</span>
        </motion.div>

        {/* Node 2: AI Engine (The Service - Glowing) */}
        <motion.div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="p-3 rounded-full bg-primary/20"
            animate={{
              boxShadow: hovered
                ? [
                    '0 0 0px hsl(var(--primary) / 0)',
                    '0 0 20px hsl(var(--primary) / 0.4)',
                    '0 0 0px hsl(var(--primary) / 0)',
                  ]
                : '0 0 0px hsl(var(--primary) / 0)',
            }}
            transition={{
              repeat: hovered ? Infinity : 0,
              duration: 1.5,
            }}
          >
            <BrainCircuit className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="text-[10px] text-primary font-medium mt-1">AI Engine</span>
        </motion.div>

        {/* Node 3: Insight (Locked until hover) */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          animate={{
            opacity: hovered ? 1 : 0.4,
            scale: hovered ? 1 : 0.95,
          }}
          transition={{ delay: hovered ? 0.5 : 0 }}
        >
          <motion.div
            className="p-2 rounded-full"
            animate={{
              backgroundColor: hovered
                ? 'hsl(48 96% 53% / 0.2)'
                : 'hsl(var(--muted))',
            }}
          >
            <Lightbulb
              className={`h-5 w-5 ${hovered ? 'text-yellow-500' : 'text-muted-foreground'}`}
            />
          </motion.div>
          <span className="text-[10px] text-muted-foreground mt-1">Insight</span>
        </motion.div>
      </div>

      {/* Unlock Badge */}
      <motion.div
        className="mt-3 text-center"
        initial={{ opacity: 0, y: 5 }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 5,
        }}
        transition={{ delay: 0.6 }}
      >
        <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
          ✨ Capacidad desbloqueada
        </Badge>
      </motion.div>
    </div>
  );
};
