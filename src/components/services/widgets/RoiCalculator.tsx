import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { Euro, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const COST_MODEL = {
  manualCostPerUnit: 15,
  autoCostPerUnit: 2,
};

export const RoiCalculator = () => {
  const [volume, setVolume] = useState(500);
  const [displaySavings, setDisplaySavings] = useState(0);

  const currentCost = volume * COST_MODEL.manualCostPerUnit;
  const newCost = volume * COST_MODEL.autoCostPerUnit;
  const savings = currentCost - newCost;
  const savingsPercentage = currentCost > 0 ? Math.round((savings / currentCost) * 100) : 0;

  // Animated counter effect
  useEffect(() => {
    const duration = 500;
    const steps = 20;
    const increment = (savings - displaySavings) / steps;
    let current = displaySavings;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      setDisplaySavings(Math.round(current));
      if (step >= steps) {
        clearInterval(timer);
        setDisplaySavings(savings);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [savings]);

  const data = [
    { name: 'Actual', coste: currentCost, fill: 'hsl(var(--muted-foreground))' },
    { name: 'Con ProcureData', coste: newCost, fill: 'hsl(var(--primary))' },
  ];

  return (
    <div className="p-4 rounded-lg bg-muted/30 space-y-4">
      {/* Savings Display */}
      <div className="text-center">
        <motion.div
          key={displaySavings}
          initial={{ scale: 1.1, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-center gap-2"
        >
          <Euro className="h-6 w-6 text-primary" />
          <span className="text-3xl font-bold text-primary">
            {displaySavings.toLocaleString('es-ES')} €
          </span>
        </motion.div>
        <p className="text-xs text-muted-foreground mt-1">Ahorro estimado/mes</p>
        
        <AnimatePresence>
          {savings > 5000 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                High Saver -{savingsPercentage}%
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chart */}
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barSize={16}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 10 }} />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString('es-ES')} €`, 'Coste']}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="coste" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Volumen: {volume} ops/mes</span>
          <span className="text-primary font-medium">Simular escala →</span>
        </div>
        <Slider
          value={[volume]}
          onValueChange={(v) => setVolume(v[0])}
          min={100}
          max={2000}
          step={100}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
