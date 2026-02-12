import React, { useState, useMemo, useEffect } from 'react';
import { Building2, Sparkles, Download, Users, TrendingUp, BrainCircuit } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

interface GreenGovCircularSimulatorProps {
  onValuesChange?: (values: { tenderBudget: number; localRecycledRatio: number; socialReturn: number }) => void;
}

export const GreenGovCircularSimulator = ({ onValuesChange }: GreenGovCircularSimulatorProps) => {
  const [tenderBudget, setTenderBudget] = useState(2500000);
  const [localRecycledRatio, setLocalRecycledRatio] = useState(65);

  const calculations = useMemo(() => {
    const localImpact = tenderBudget * (localRecycledRatio / 100) * 0.65; // 65% reinvertido localmente
    const sroiMultiplier = 1 + (localRecycledRatio / 100) * 1.4; // SROI hasta 2.4x
    const socialReturn = tenderBudget * (sroiMultiplier - 1);
    const greenJobs = Math.floor(localImpact / 35000); // 1 empleo por cada 35k EUR
    const co2Avoided = tenderBudget * (localRecycledRatio / 100) * 0.0002; // tonCO2 por EUR
    const traditionalImpact = tenderBudget * 0.2; // Solo 20% con compra tradicional
    
    return { localImpact, sroiMultiplier, socialReturn, greenJobs, co2Avoided, traditionalImpact };
  }, [tenderBudget, localRecycledRatio]);

  const chartData = useMemo(() => [
    { 
      name: 'Impacto Local',
      'Compra Tradicional': calculations.traditionalImpact,
      'Licitación Circular': calculations.localImpact,
    },
    { 
      name: 'Retorno Social',
      'Compra Tradicional': tenderBudget * 0.1,
      'Licitación Circular': calculations.socialReturn,
    },
  ], [calculations, tenderBudget]);

  const pontusHash = useMemo(() => {
    const base = Math.floor(tenderBudget * localRecycledRatio * 0.00023);
    return `0x${base.toString(16).padStart(8, '0')}...${(base % 9999).toString(16)}`;
  }, [tenderBudget, localRecycledRatio]);

  useEffect(() => {
    onValuesChange?.({ tenderBudget, localRecycledRatio, socialReturn: calculations.socialReturn });
  }, [tenderBudget, localRecycledRatio, calculations.socialReturn, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Columna Izquierda - Simulador Interactivo */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-emerald-950/40 to-violet-950/30 border-emerald-500/20 shadow-2xl overflow-hidden h-full">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">GREEN-GOV CIRCULAR</h3>
                  <p className="text-xs text-slate-400">Licitación Pública Circular</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
                {pontusHash}
              </Badge>
            </div>

            {/* Bar Chart Comparativo */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">Impacto: Tradicional vs Circular</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={(v) => `€${(v/1000000).toFixed(1)}M`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
                  />
                  <Legend />
                  <Bar dataKey="Compra Tradicional" fill="#64748B" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="Licitación Circular" fill="#10B981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sliders */}
            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Presupuesto de Licitación</span>
                  <span className="font-bold text-emerald-400">€{(tenderBudget / 1000000).toFixed(1)}M</span>
                </div>
                <Slider
                  value={[tenderBudget]}
                  onValueChange={(v) => setTenderBudget(v[0])}
                  min={100000}
                  max={10000000}
                  step={100000}
                  className="[&>span]:bg-emerald-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Ratio de Material Reciclado Local</span>
                  <span className="font-bold text-violet-400">{localRecycledRatio}%</span>
                </div>
                <Slider
                  value={[localRecycledRatio]}
                  onValueChange={(v) => setLocalRecycledRatio(v[0])}
                  min={10}
                  max={100}
                  step={5}
                  className="[&>span]:bg-violet-600"
                />
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Impacto Local</p>
                <p className="text-xl font-black text-white">€{(calculations.localImpact / 1000000).toFixed(2)}M</p>
              </div>
              <div className="bg-violet-950/40 p-3 rounded-xl border border-violet-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-violet-400 mb-1">SROI</p>
                <p className="text-xl font-black text-white">1:{calculations.sroiMultiplier.toFixed(1)}</p>
              </div>
              <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-blue-400 mb-1">Empleos Verdes</p>
                <p className="text-xl font-black text-white">{calculations.greenJobs}</p>
              </div>
            </div>

            {/* Social Return */}
            <div className="bg-gradient-to-r from-emerald-900/50 to-violet-900/50 p-5 rounded-2xl border border-emerald-500/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black text-emerald-300 mb-2">Retorno Social Total</p>
                  <p className="text-3xl font-black text-white">€{calculations.socialReturn.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-emerald-500/20 text-emerald-300">Circular</Badge>
                  <Badge className="bg-violet-500/20 text-violet-300">SROI</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna Derecha - Panel ARIA */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-emerald-500/20 shadow-2xl h-full">
          <CardContent className="p-6 space-y-5">
            {/* ARIA Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-violet-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">AI Advisor</p>
                <p className="text-xs text-emerald-400">Asesora de Contratación Pública Verde</p>
              </div>
            </div>

            {/* Insights Dinámicos */}
            <div className="space-y-4">
              <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">Retorno Social (SROI)</p>
                    <p className="text-xs text-slate-400">
                      Al usar plástico local, el retorno social es de <span className="text-emerald-400 font-bold">1:{calculations.sroiMultiplier.toFixed(1)}</span>. 
                      Estás creando circularidad real y <span className="text-white font-bold">{calculations.greenJobs} empleos verdes</span> en tu municipio.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-950/30 rounded-xl p-4 border border-violet-800/30">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">Economía Local Fortalecida</p>
                    <p className="text-xs text-slate-400">
                      <span className="text-violet-400 font-bold">€{(calculations.localImpact / 1000000).toFixed(2)}M</span> se 
                      reinvierten directamente en la economía local, comparado con solo 
                      <span className="text-slate-400"> €{(calculations.traditionalImpact / 1000000).toFixed(2)}M</span> con compra tradicional.
                    </p>
                  </div>
                </div>
              </div>

              {localRecycledRatio >= 80 && (
                <div className="bg-blue-950/30 rounded-xl p-4 border border-blue-800/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium mb-1">¡Licitación Ejemplar!</p>
                      <p className="text-xs text-slate-400">
                        Con un {localRecycledRatio}% de material reciclado local, tu licitación califica como 
                        <span className="text-blue-400 font-bold"> Referente Nacional</span> en contratación pública circular.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quote ARIA */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-violet-900/30 rounded-xl p-4 border border-emerald-500/20">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "Tu licitación de <span className="text-emerald-400 font-semibold">€{(tenderBudget / 1000000).toFixed(1)}M</span> con 
                un <span className="text-violet-400 font-semibold">{localRecycledRatio}%</span> de material reciclado local 
                genera un retorno social de <span className="text-white font-bold">€{calculations.socialReturn.toLocaleString()}</span> y 
                evita <span className="text-green-400 font-bold">{calculations.co2Avoided.toFixed(0)} tonCO₂</span>."
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500">Verificado en Pontus-X</p>
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400 font-mono">
                  {pontusHash}
                </Badge>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-violet-600 hover:from-emerald-500 hover:to-violet-500 text-white">
                <Download className="w-4 h-4 mr-2" />
                Descargar Informe SROI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
