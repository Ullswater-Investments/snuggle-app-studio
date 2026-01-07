import React, { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, Landmark, TrendingDown, Leaf, ShieldCheck, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AriaDynamicReport, InsightItem } from './AriaDynamicReport';
import { cn } from "@/lib/utils";

interface SliderConfig {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
}

interface SimulatorResults {
  savings: number;
  timeSaved: number;
  efficiency: number;
  fteEquivalent: number;
  manualCost: number;
  pdCost: number;
  [key: string]: number;
}

interface ImpactSimulatorProps {
  caseId: string;
  title?: string;
  description?: string;
  sliders: SliderConfig[];
  calculateResults: (values: Record<string, number>) => SimulatorResults;
  generateInsights: (results: SimulatorResults, values: Record<string, number>) => InsightItem[];
  sectorColor?: string;
  comparisonLabels?: { manual: string; automated: string };
}

export const ImpactSimulator = ({
  caseId,
  title = "Simulador de Impacto Económico",
  description = "Ajusta los parámetros para ver tu ahorro potencial.",
  sliders,
  calculateResults,
  generateInsights,
  sectorColor = "orange",
  comparisonLabels = { manual: "Manual", automated: "ProcureData" }
}: ImpactSimulatorProps) => {
  // Initialize slider values
  const [values, setValues] = useState<Record<string, number[]>>(() => {
    const initial: Record<string, number[]> = {};
    sliders.forEach(slider => {
      initial[slider.id] = [slider.defaultValue];
    });
    return initial;
  });

  // Get flat values for calculations
  const flatValues = useMemo(() => {
    const flat: Record<string, number> = {};
    Object.entries(values).forEach(([key, val]) => {
      flat[key] = val[0];
    });
    return flat;
  }, [values]);

  // Calculate results
  const results = useMemo(() => calculateResults(flatValues), [flatValues, calculateResults]);

  // Generate insights
  const insights = useMemo(() => generateInsights(results, flatValues), [results, flatValues, generateInsights]);

  // Comparison chart data
  const comparisonData = [
    { name: comparisonLabels.manual, value: results.manualCost, color: '#6b7280' },
    { name: comparisonLabels.automated, value: results.pdCost, color: '#22c55e' },
  ];

  // Color mapping
  const colorMap: Record<string, { primary: string; gradient: string }> = {
    orange: { primary: "text-orange-500", gradient: "from-orange-500 to-amber-500" },
    emerald: { primary: "text-emerald-500", gradient: "from-emerald-500 to-green-500" },
    teal: { primary: "text-teal-500", gradient: "from-teal-500 to-cyan-500" },
    violet: { primary: "text-violet-500", gradient: "from-violet-500 to-purple-500" },
    rose: { primary: "text-rose-500", gradient: "from-rose-500 to-pink-500" },
    blue: { primary: "text-blue-500", gradient: "from-blue-500 to-sky-500" },
    yellow: { primary: "text-yellow-500", gradient: "from-yellow-500 to-amber-500" },
    green: { primary: "text-green-500", gradient: "from-green-500 to-emerald-500" },
    lime: { primary: "text-lime-500", gradient: "from-lime-500 to-green-500" },
  };

  const colors = colorMap[sectorColor] || colorMap.orange;

  return (
    <div className="grid lg:grid-cols-5 gap-8 w-full">
      {/* Panel de Control - 3 columns */}
      <Card className="lg:col-span-3 bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className={cn("p-2 rounded-xl bg-gradient-to-br", colors.gradient)}>
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            {title}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            {description}
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Sliders */}
          <div className="space-y-6">
            {sliders.map(slider => (
              <div key={slider.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    {slider.label}
                  </span>
                  <span className={cn("text-2xl font-bold", colors.primary)}>
                    {values[slider.id][0].toLocaleString('es-ES')}
                    {slider.unit && <span className="text-sm ml-1">{slider.unit}</span>}
                  </span>
                </div>
                <Slider
                  value={values[slider.id]}
                  onValueChange={(val) => setValues(prev => ({ ...prev, [slider.id]: val }))}
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{slider.min.toLocaleString('es-ES')}{slider.unit}</span>
                  <span>{((slider.min + slider.max) / 2).toLocaleString('es-ES')}{slider.unit}</span>
                  <span>{slider.max.toLocaleString('es-ES')}{slider.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold mb-2">
                Ahorro Anual Estimado
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {results.savings.toLocaleString('es-ES')} <span className="text-sm">EUROe</span>
              </p>
            </div>
            <div className={cn("border rounded-2xl p-5 text-center", `bg-${sectorColor}-500/10 border-${sectorColor}-500/20`)}>
              <p className={cn("text-xs uppercase tracking-widest font-bold mb-2", colors.primary)}>
                Eficiencia Operativa
              </p>
              <p className={cn("text-2xl font-bold", colors.primary)}>
                +{results.efficiency.toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Comparativa de Costes
            </h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
                    width={90}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString('es-ES')} €`, 'Coste']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ARIA Panel - 2 columns */}
      <div className="lg:col-span-2">
        <AriaDynamicReport
          insights={insights}
          fteEquivalent={results.fteEquivalent}
          className="h-full"
        />
      </div>
    </div>
  );
};

export default ImpactSimulator;
