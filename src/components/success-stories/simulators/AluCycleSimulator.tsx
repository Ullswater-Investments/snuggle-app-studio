import React, { useState, useMemo, useEffect } from 'react';
import { Recycle, Sparkles, Download, Zap, Leaf, BrainCircuit } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AluCycleSimulatorProps {
  onValuesChange?: (values: { recycledMix: number; totalProduction: number; energySavings: number }) => void;
}

export const AluCycleSimulator = ({ onValuesChange }: AluCycleSimulatorProps) => {
  const [recycledMix, setRecycledMix] = useState(75);
  const [totalProduction, setTotalProduction] = useState(800);

  const calculations = useMemo(() => {
    const energySavings = totalProduction * 14 * (recycledMix / 100); // 14 MWh/ton ahorrados
    const co2Reduction = totalProduction * 8.5 * (recycledMix / 100); // 8.5 tonCO2/ton evitadas
    const caeCredits = Math.floor(energySavings / 10); // 1 CAE por cada 10 MWh
    const scope3Reduction = Math.round(recycledMix * 0.95);
    const virginCO2 = totalProduction * 8.5; // Huella con aluminio 100% virgen
    const alucycleCO2 = virginCO2 * (1 - recycledMix / 100);
    
    return { energySavings, co2Reduction, caeCredits, scope3Reduction, virginCO2, alucycleCO2 };
  }, [recycledMix, totalProduction]);

  const chartData = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 100; i += 10) {
      const virgin = totalProduction * 8.5;
      const recycled = virgin * (1 - i / 100);
      points.push({
        mix: `${i}%`,
        'Aluminio Virgen': virgin,
        'Alu-Cycle': recycled,
      });
    }
    return points;
  }, [totalProduction]);

  const pontusHash = useMemo(() => {
    const base = Math.floor(recycledMix * totalProduction * 2.71);
    return `0x${base.toString(16).padStart(8, '0')}...${(base % 9999).toString(16)}`;
  }, [recycledMix, totalProduction]);

  useEffect(() => {
    onValuesChange?.({ recycledMix, totalProduction, energySavings: calculations.energySavings });
  }, [recycledMix, totalProduction, calculations.energySavings, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Columna Izquierda - Simulador Interactivo */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-slate-900/60 to-emerald-950/30 border-slate-500/20 shadow-2xl overflow-hidden h-full">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-500/20 rounded-lg">
                  <Recycle className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">ALU-CYCLE</h3>
                  <p className="text-xs text-slate-400">Aluminio Infinito - Circularidad Total</p>
                </div>
              </div>
              <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30 font-mono text-xs">
                {pontusHash}
              </Badge>
            </div>

            {/* Gráfico de Huella CO2 */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">Huella CO₂: Aluminio Virgen vs Alu-Cycle</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVirgin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorRecycled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="mix" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toLocaleString()} tonCO₂`, '']}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="Aluminio Virgen" stroke="#EF4444" fill="url(#colorVirgin)" />
                  <Area type="monotone" dataKey="Alu-Cycle" stroke="#10B981" fill="url(#colorRecycled)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Sliders */}
            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-slate-700/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Mix de Aluminio Reciclado</span>
                  <span className="font-bold text-emerald-400">{recycledMix}%</span>
                </div>
                <Slider
                  value={[recycledMix]}
                  onValueChange={(v) => setRecycledMix(v[0])}
                  min={10}
                  max={100}
                  step={5}
                  className="[&>span]:bg-emerald-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Producción Total</span>
                  <span className="font-bold text-slate-400">{totalProduction.toLocaleString()} t</span>
                </div>
                <Slider
                  value={[totalProduction]}
                  onValueChange={(v) => setTotalProduction(v[0])}
                  min={100}
                  max={5000}
                  step={100}
                  className="[&>span]:bg-slate-600"
                />
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Energía Ahorrada</p>
                <p className="text-xl font-black text-white">{calculations.energySavings.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">MWh</p>
              </div>
              <div className="bg-red-950/40 p-3 rounded-xl border border-red-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-red-400 mb-1">CO₂ Evitado</p>
                <p className="text-xl font-black text-white">{calculations.co2Reduction.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">toneladas</p>
              </div>
              <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-blue-400 mb-1">CAEs Emitidos</p>
                <p className="text-xl font-black text-white">{calculations.caeCredits}</p>
                <p className="text-[10px] text-slate-400">certificados</p>
              </div>
            </div>

            {/* Scope 3 */}
            <div className="bg-gradient-to-r from-slate-800/50 to-emerald-900/50 p-5 rounded-2xl border border-emerald-500/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black text-emerald-300 mb-2">Reducción Scope 3</p>
                  <p className="text-3xl font-black text-white">{calculations.scope3Reduction}%</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-emerald-500/20 text-emerald-300">CSRD</Badge>
                  <Badge className="bg-slate-500/20 text-slate-300">CAE</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna Derecha - Panel ARIA */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-slate-500/20 shadow-2xl h-full">
          <CardContent className="p-6 space-y-5">
            {/* ARIA Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-slate-500/25">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">AI Advisor</p>
                <p className="text-xs text-slate-400">Asesora de Descarbonización Industrial</p>
              </div>
            </div>

            {/* Insights Dinámicos */}
            <div className="space-y-4">
              <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">Ahorro Energético Verificado</p>
                    <p className="text-xs text-slate-400">
                      Has ahorrado <span className="text-emerald-400 font-bold">{calculations.energySavings.toLocaleString()} MWh</span> de 
                      energía. Esto te permite emitir <span className="text-blue-400 font-bold">{calculations.caeCredits} CAEs</span> verificados en Pontus-X.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">Aluminio: 95% Menos Energía</p>
                    <p className="text-xs text-slate-400">
                      El reciclaje de aluminio consume solo el <span className="text-slate-300 font-bold">5%</span> de la energía 
                      necesaria para producir aluminio primario. Cada tonelada reciclada evita 8.5 tonCO₂.
                    </p>
                  </div>
                </div>
              </div>

              {recycledMix >= 90 && (
                <div className="bg-blue-950/30 rounded-xl p-4 border border-blue-800/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium mb-1">¡Circularidad Excepcional!</p>
                      <p className="text-xs text-slate-400">
                        Con un {recycledMix}% de aluminio reciclado, calificas para el <span className="text-blue-400 font-bold">Sello Platinum</span> de 
                        la Aluminium Stewardship Initiative (ASI).
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quote ARIA */}
            <div className="bg-gradient-to-r from-slate-800/30 to-emerald-900/30 rounded-xl p-4 border border-slate-500/20">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "Al producir <span className="text-slate-300 font-semibold">{totalProduction.toLocaleString()} toneladas</span> con 
                un mix reciclado del <span className="text-emerald-400 font-semibold">{recycledMix}%</span>, has evitado 
                <span className="text-red-400 font-bold"> {calculations.co2Reduction.toLocaleString()} tonCO₂</span> y 
                generado <span className="text-white font-bold">{calculations.caeCredits} CAEs</span> comercializables."
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500">Verificado en Pontus-X</p>
                <Badge variant="outline" className="text-[10px] border-slate-500/30 text-slate-400 font-mono">
                  {pontusHash}
                </Badge>
              </div>
              <Button className="w-full bg-gradient-to-r from-slate-600 to-emerald-600 hover:from-slate-500 hover:to-emerald-500 text-white">
                <Download className="w-4 h-4 mr-2" />
                Descargar Certificados CAE
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
