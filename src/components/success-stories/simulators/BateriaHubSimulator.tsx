import React, { useState, useMemo } from 'react';
import { Battery, TrendingUp, Zap, FileText, Sparkles, Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface BateriaHubSimulatorProps {
  onValuesChange?: (values: { storageCapacity: number; priceSpread: number; profit: number }) => void;
}

export const BateriaHubSimulator = ({ onValuesChange }: BateriaHubSimulatorProps) => {
  const [storageCapacity, setStorageCapacity] = useState(30);
  const [priceSpread, setPriceSpread] = useState(70);

  const calculations = useMemo(() => {
    const dailyProfit = storageCapacity * priceSpread * 0.85;
    const yearlyProfit = dailyProfit * 365;
    const capex = storageCapacity * 150000;
    const roiYears = capex / yearlyProfit;
    return { dailyProfit, yearlyProfit, roiYears: Math.max(1, roiYears) };
  }, [storageCapacity, priceSpread]);

  const cycleData = useMemo(() => [
    { hour: '00:00', price: 40, charge: storageCapacity * 0.8 },
    { hour: '06:00', price: 50, charge: storageCapacity },
    { hour: '12:00', price: 90, charge: storageCapacity * 0.3 },
    { hour: '18:00', price: 40 + priceSpread, charge: 0 },
    { hour: '24:00', price: 45, charge: storageCapacity * 0.5 },
  ], [storageCapacity, priceSpread]);

  const pontusHash = useMemo(() => `0x${(storageCapacity * 100 + priceSpread).toString(16).padStart(8, '0')}...batt_arb`, [storageCapacity, priceSpread]);

  React.useEffect(() => {
    onValuesChange?.({ storageCapacity, priceSpread, profit: calculations.dailyProfit });
  }, [storageCapacity, priceSpread, calculations.dailyProfit, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-indigo-950/40 to-violet-950/30 border-indigo-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/20"><Battery className="w-6 h-6 text-indigo-400" /></div>
              <div><h3 className="text-indigo-400 font-bold text-sm">ARBITRAJE ENERGÉTICO</h3><p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p></div>
            </div>
            <Badge className="bg-indigo-500/20 text-indigo-400">ROI: {calculations.roiYears.toFixed(1)} años</Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-indigo-900/30 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3">Ciclo de Carga/Descarga</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cycleData}>
                  <defs>
                    <linearGradient id="battGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                  <Area type="monotone" dataKey="charge" stroke="#6366f1" fill="url(#battGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-indigo-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">Capacidad de Almacenamiento (MWh)</span><span className="font-bold text-indigo-400">{storageCapacity}</span></div>
              <Slider value={[storageCapacity]} onValueChange={(v) => setStorageCapacity(v[0])} min={1} max={100} step={1} className="[&>span]:bg-indigo-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">Spread Valle-Punta (€/MWh)</span><span className="font-bold text-violet-400">{priceSpread}</span></div>
              <Slider value={[priceSpread]} onValueChange={(v) => setPriceSpread(v[0])} min={20} max={150} step={5} className="[&>span]:bg-violet-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-900/50 to-violet-900/50 p-5 rounded-2xl border border-indigo-500/30">
            <p className="text-[10px] uppercase font-black text-indigo-300 mb-2">Beneficio Diario por Arbitraje</p>
            <p className="text-4xl font-black text-white">{calculations.dailyProfit.toLocaleString()} <span className="text-lg text-indigo-400">EUROe</span></p>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-indigo-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div><h4 className="text-white font-bold">ARIA</h4><p className="text-[10px] text-slate-400">Asesora de Almacenamiento</p></div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-indigo-900/30">
              <div className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">Optimización de Ciclos</p>
                  <p className="text-xs text-slate-400">He optimizado tus ciclos de carga. Basado en el spread de <span className="text-indigo-400 font-bold">{priceSpread}€</span>, el ROI de tu sistema se reduce a <span className="text-white font-bold">{calculations.roiYears.toFixed(1)} años</span>.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-violet-900/30">
              <div className="flex items-start gap-3"><TrendingUp className="w-5 h-5 text-violet-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">Proyección Anual</p>
                  <p className="text-xs text-slate-400">Beneficio anual estimado: <span className="text-violet-400 font-bold">{calculations.yearlyProfit.toLocaleString()} €</span>.</p>
                </div>
              </div>
            </div>
            {calculations.roiYears <= 5 && (
              <div className="bg-gradient-to-r from-indigo-900/30 to-violet-900/30 rounded-xl p-4 border border-indigo-500/30">
                <div className="flex items-center gap-2 mb-2"><Clock className="w-5 h-5 text-indigo-400" /><span className="text-sm font-bold text-indigo-300">ROI Acelerado</span></div>
                <p className="text-xs text-slate-300">Tu inversión se recupera en menos de 5 años, superando el benchmark del sector.</p>
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600"><FileText className="w-4 h-4 mr-2" />Descargar Análisis ROI</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
