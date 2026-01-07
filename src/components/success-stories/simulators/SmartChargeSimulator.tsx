import React, { useState, useMemo } from 'react';
import { Plug, Zap, Users, FileText, Sparkles, Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SmartChargeSimulatorProps {
  onValuesChange?: (values: { numCharges: number; roamingFee: number; revenue: number }) => void;
}

export const SmartChargeSimulator = ({ onValuesChange }: SmartChargeSimulatorProps) => {
  const [numCharges, setNumCharges] = useState(3000);
  const [roamingFee, setRoamingFee] = useState(1.5);

  const calculations = useMemo(() => {
    const totalRevenue = numCharges * 12.5;
    const roamingCost = numCharges * roamingFee;
    const netRevenue = totalRevenue - roamingCost;
    const operatorsReconciled = Math.min(15, Math.ceil(numCharges / 800));
    const timeSaved = 45; // días vs tradicional
    return { totalRevenue, roamingCost, netRevenue, operatorsReconciled, timeSaved };
  }, [numCharges, roamingFee]);

  const pieData = useMemo(() => {
    const operators = calculations.operatorsReconciled;
    return Array.from({ length: Math.min(5, operators) }, (_, i) => ({
      name: `Operador ${i + 1}`,
      value: Math.floor(calculations.netRevenue / operators),
      color: ['#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a'][i],
    }));
  }, [calculations]);

  const pontusHash = useMemo(() => `0x${(numCharges + roamingFee * 1000).toString(16).padStart(8, '0')}...ev_roam`, [numCharges, roamingFee]);

  React.useEffect(() => {
    onValuesChange?.({ numCharges, roamingFee, revenue: calculations.netRevenue });
  }, [numCharges, roamingFee, calculations.netRevenue, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-teal-950/40 to-cyan-950/30 border-teal-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-500/20"><Plug className="w-6 h-6 text-teal-400" /></div>
              <div><h3 className="text-teal-400 font-bold text-sm">EV ROAMING - LIQUIDACIÓN INSTANTÁNEA</h3><p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p></div>
            </div>
            <Badge className="bg-teal-500/20 text-teal-400">{calculations.operatorsReconciled} CPOs</Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-teal-900/30 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3 text-center">Distribución de Ingresos por Operador</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ name }) => name}>
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()} €`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-teal-950/40 p-4 rounded-xl text-center">
              <Zap className="w-6 h-6 text-teal-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">{numCharges.toLocaleString()}</p>
              <p className="text-xs text-teal-300">Sesiones/mes</p>
            </div>
            <div className="bg-cyan-950/40 p-4 rounded-xl text-center">
              <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">{calculations.operatorsReconciled}</p>
              <p className="text-xs text-cyan-300">CPOs Conectados</p>
            </div>
            <div className="bg-emerald-950/40 p-4 rounded-xl text-center">
              <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">-{calculations.timeSaved}</p>
              <p className="text-xs text-emerald-300">Días Espera</p>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-teal-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">Sesiones de Carga/mes</span><span className="font-bold text-teal-400">{numCharges.toLocaleString()}</span></div>
              <Slider value={[numCharges]} onValueChange={(v) => setNumCharges(v[0])} min={100} max={10000} step={100} className="[&>span]:bg-teal-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">Fee de Roaming (€/sesión)</span><span className="font-bold text-cyan-400">{roamingFee.toFixed(1)} €</span></div>
              <Slider value={[roamingFee * 10]} onValueChange={(v) => setRoamingFee(v[0] / 10)} min={5} max={30} step={1} className="[&>span]:bg-cyan-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/50 p-5 rounded-2xl border border-teal-500/30">
            <p className="text-[10px] uppercase font-black text-teal-300 mb-2">Ingresos Netos Mensuales</p>
            <p className="text-4xl font-black text-white">{calculations.netRevenue.toLocaleString()} <span className="text-lg text-teal-400">EUROe</span></p>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-teal-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div><h4 className="text-white font-bold">ARIA</h4><p className="text-[10px] text-slate-400">Asesora de Movilidad EV</p></div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-teal-900/30">
              <div className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-teal-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">Conciliación Instantánea</p>
                  <p className="text-xs text-slate-400">He conciliado <span className="text-teal-400 font-bold">{numCharges.toLocaleString()}</span> sesiones de <span className="text-white font-bold">{calculations.operatorsReconciled}</span> operadores distintos. La liquidación en EUROe ha eliminado los 45 días de espera.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-900/30">
              <div className="flex items-start gap-3"><Zap className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">Ingresos por Sesión</p>
                  <p className="text-xs text-slate-400">Media de <span className="text-cyan-400 font-bold">12.50 €</span> por sesión, con coste de roaming de <span className="text-orange-400">{roamingFee.toFixed(1)} €</span>. Margen neto: <span className="text-white font-bold">{(12.5 - roamingFee).toFixed(1)} €</span>.</p>
                </div>
              </div>
            </div>
            {calculations.operatorsReconciled >= 10 && (
              <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-xl p-4 border border-teal-500/30">
                <div className="flex items-center gap-2 mb-2"><Plug className="w-5 h-5 text-teal-400" /><span className="text-sm font-bold text-teal-300">Hub de Roaming</span></div>
                <p className="text-xs text-slate-300">Con {calculations.operatorsReconciled} CPOs conectados, tu red es un hub de referencia para electromovilidad interoperable.</p>
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600"><FileText className="w-4 h-4 mr-2" />Descargar Reporte Roaming</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
