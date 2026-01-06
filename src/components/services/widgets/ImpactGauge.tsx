import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  red: '#ef4444',
  amber: '#f59e0b',
  green: '#22c55e',
};

const getColor = (value: number) => {
  if (value < 40) return COLORS.red;
  if (value < 70) return COLORS.amber;
  return COLORS.green;
};

export const ImpactGauge = () => {
  const [value, setValue] = useState(30);
  const [showConfetti, setShowConfetti] = useState(false);

  const data = [
    { name: 'Progress', value: value },
    { name: 'Remaining', value: 100 - value },
  ];

  const improve = () => {
    setValue(85);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const activeColor = getColor(value);

  return (
    <div className="p-4 rounded-lg bg-muted/30 relative overflow-hidden">
      {/* Floating Leaves Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-500"
                initial={{
                  opacity: 0,
                  x: 50 + Math.random() * 100,
                  y: 100,
                  rotate: 0,
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: -50,
                  x: 50 + Math.random() * 100,
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
              >
                <Leaf className="h-4 w-4" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Gauge Chart */}
      <div className="relative h-24">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={0}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={activeColor} />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <motion.span
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold"
            style={{ color: activeColor }}
          >
            {value}%
          </motion.span>
          <span className="text-[10px] text-muted-foreground">Eficiencia ESG</span>
        </div>
      </div>

      {/* Action Area */}
      <div className="mt-2 text-center">
        {value < 80 ? (
          <Button size="sm" variant="outline" onClick={improve} className="gap-1">
            <Leaf className="h-3 w-3" />
            Optimizar Huella
            <ArrowRight className="h-3 w-3" />
          </Button>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Badge className="bg-green-500/20 text-green-600 border-green-500/30 py-1 px-3">
              🏅 ¡Eco-Hero Badge!
            </Badge>
          </motion.div>
        )}
      </div>
    </div>
  );
};
