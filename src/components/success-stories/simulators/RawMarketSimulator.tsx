import React, { useState, useMemo } from 'react';
import { ShoppingCart, Recycle, Package, TrendingUp, FileText, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface RawMarketSimulatorProps {
  onValuesChange?: (values: { wasteVolume: number; purityLevel: number; income: number }) => void;
}

export const RawMarketSimulator = ({ onValuesChange }: RawMarketSimulatorProps) => {
  const [wasteVolume, setWasteVolume] = useState(2000);
  const [purityLevel, setPurityLevel] = useState(95);
  
  const results = useMemo(() => {
    const basePrice = 1.2; // €/kg
    const income = wasteVolume * (basePrice * (purityLevel / 100));
    const landfillSavings = wasteVolume * 0.15;
    const premiumPercent = Math.round((purityLevel - 80) * 1.1);
    const cycleDays = Math.max(1, Math.round(15 - (purityLevel - 80) * 0.65));
    const buyersInterested = Math.min(25, Math.round(8 + (purityLevel - 80) * 0.85));
    
    return { income, landfillSavings, premiumPercent, cycleDays, buyersInterested };
  }, [wasteVolume, purityLevel]);

  const chartData = [
    { name: 'Tradicional', value: 15, fill: '#64748b' },
    { name: 'ProcureData', value: results.cycleDays, fill: '#10b981' }
  ];

  React.useEffect(() => {
    onValuesChange?.({ wasteVolume, purityLevel, income: results.income });
  }, [wasteVolume, purityLevel, results.income, onValuesChange]);

  const txHash = useMemo(() => 
    `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`, 
    [wasteVolume, purityLevel]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Columna Izquierda: Simulación (8/12) */}
      <Card className="lg:col-span-7 bg-gradient-to-br from-emerald-950/40 to-slate-950/50 border-emerald-500/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] rounded-3xl overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <Recycle className="w-3 h-3 mr-1" />
                Economía Circular
              </Badge>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono text-emerald-400 border-emerald-500/30">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Pontus-X: {txHash}
            </Badge>
          </div>
          <CardTitle className="text-emerald-400 flex items-center gap-2 text-lg font-bold mt-3">
            <ShoppingCart className="w-5 h-5" />
            SECONDARY RAW MATERIAL EXCHANGE
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sliders */}
          <div className="space-y-5 bg-slate-900/40 p-5 rounded-2xl border border-emerald-900/20">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">Volumen de Merma</span>
                <span className="font-bold text-emerald-400 text-lg">{wasteVolume.toLocaleString()} kg</span>
              </div>
              <Slider
                value={[wasteVolume]}
                onValueChange={(v) => setWasteVolume(v[0])}
                min={100}
                max={10000}
                step={100}
                className="[&>span]:bg-emerald-600"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">Pureza del Material</span>
                <span className="font-bold text-blue-400 text-lg">{purityLevel}%</span>
              </div>
              <Slider
                value={[purityLevel]}
                onValueChange={(v) => setPurityLevel(v[0])}
                min={80}
                max={100}
                step={1}
                className="[&>span]:bg-blue-600"
              />
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 p-5 rounded-2xl border border-emerald-500/20">
              <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">Valoración Marketplace</p>
              <p className="text-3xl font-black text-white">{results.income.toLocaleString()}</p>
              <p className="text-sm text-emerald-400">EUROe</p>
            </div>
            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
              <p className="text-[10px] uppercase font-black text-blue-400 mb-1">Premium vs Chatarra</p>
              <p className="text-3xl font-black text-white">+{results.premiumPercent}%</p>
              <p className="text-sm text-slate-400">sobre precio base</p>
            </div>
          </div>

          {/* Chart: Ciclo de Venta Comparativo */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50">
            <p className="text-[10px] uppercase font-black text-slate-400 mb-3">Días para Cierre de Venta</p>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" barSize={20}>
                  <XAxis type="number" domain={[0, 20]} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} width={85} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value} días`, 'Tiempo']}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Columna Derecha: Panel ARIA (5/12) */}
      <Card className="lg:col-span-5 bg-[#020617] border-emerald-500/20 shadow-xl rounded-3xl overflow-hidden">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Header ARIA */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/30">
              A
            </div>
            <div>
              <p className="font-bold text-white">ARIA</p>
              <p className="text-xs text-emerald-400">Experta en Economía Circular</p>
            </div>
          </div>

          {/* Insights Dinámicos */}
          <div className="space-y-4 flex-1">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300">
                  Con <strong className="text-emerald-400">{wasteVolume.toLocaleString()} kg</strong> de merma certificada 
                  al <strong className="text-blue-400">{purityLevel}%</strong> de pureza, tu lote genera 
                  <strong className="text-white"> {results.income.toLocaleString()} EUROe</strong> de ingresos directos.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-start gap-3">
                <Recycle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300">
                  Evitas <strong className="text-teal-400">{results.landfillSavings.toLocaleString()} EUROe</strong> en 
                  tasas de vertedero. Tu material ya no es residuo; es <strong className="text-white">materia prima secundaria certificada</strong>.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300">
                  Ciclo de venta reducido de <strong className="text-slate-400">15 días</strong> a solo 
                  <strong className="text-emerald-400"> {results.cycleDays} días</strong>. 
                  Hay <strong className="text-white">{results.buyersInterested} compradores</strong> interesados en tu lote.
                </p>
              </div>
            </div>

            {results.premiumPercent > 10 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-emerald-300 italic">
                    "El nivel de pureza del <strong className="text-white">{purityLevel}%</strong> te califica para 
                    el sello <strong className="text-emerald-400">Quality Assured</strong>. Recomiendo publicar en el 
                    marketplace premium."
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer con estado y CTA */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[10px] font-mono text-slate-500 mb-4">
              ● Datos verificados vía Edge Functions - Hash: {txHash}
            </p>
            <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Reporte PDF
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
