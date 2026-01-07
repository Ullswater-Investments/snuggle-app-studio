import React, { useState, useMemo } from 'react';
import { Factory, Recycle, Shield, FileText, Sparkles } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip } from 'recharts';

interface TurbineChainSimulatorProps {
  onValuesChange?: (values: { numTurbines: number; recycledSteelRatio: number; emissions: number }) => void;
}

export const TurbineChainSimulator = ({ onValuesChange }: TurbineChainSimulatorProps) => {
  const [numTurbines, setNumTurbines] = useState(20);
  const [recycledSteelRatio, setRecycledSteelRatio] = useState(65);

  const calculations = useMemo(() => {
    const baseEmissions = numTurbines * 85;
    const reduction = (recycledSteelRatio / 100) * 0.75;
    const finalEmissions = baseEmissions * (1 - reduction);
    const csrdPrecision = Math.min(99.9, 85 + (recycledSteelRatio * 0.149));
    const suppliersAudited = Math.min(25, Math.ceil(numTurbines * 0.8));
    return { baseEmissions, finalEmissions, csrdPrecision, suppliersAudited };
  }, [numTurbines, recycledSteelRatio]);

  const funnelData = useMemo(() => [
    { name: 'Tier 1 (Acero)', value: calculations.baseEmissions * 0.5, fill: '#64748b' },
    { name: 'Tier 2 (Componentes)', value: calculations.baseEmissions * 0.3, fill: '#475569' },
    { name: 'Tier 3 (Materias)', value: calculations.baseEmissions * 0.2, fill: '#334155' },
  ], [calculations.baseEmissions]);

  const pontusHash = useMemo(() => `0x${(numTurbines * 100 + recycledSteelRatio).toString(16).padStart(8, '0')}...scope3`, [numTurbines, recycledSteelRatio]);

  React.useEffect(() => {
    onValuesChange?.({ numTurbines, recycledSteelRatio, emissions: calculations.finalEmissions });
  }, [numTurbines, recycledSteelRatio, calculations.finalEmissions, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-slate-900 to-gray-900 border-slate-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-500/20"><Factory className="w-6 h-6 text-slate-400" /></div>
              <div><h3 className="text-slate-300 font-bold text-sm">SCOPE 3 - ACERO VERDE</h3><p className="text-[10px] text-slate-500 font-mono">{pontusHash}</p></div>
            </div>
            <Badge className="bg-slate-500/20 text-slate-300">CSRD: {calculations.csrdPrecision.toFixed(1)}%</Badge>
          </div>

          <div className="bg-black/40 rounded-2xl p-4 border border-slate-700 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3">Acumulación de Emisiones por Tier</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                  <Funnel dataKey="value" data={funnelData} isAnimationActive>
                    <LabelList position="center" fill="#fff" stroke="none" fontSize={10} dataKey="name" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-800/50 p-4 rounded-xl text-center">
              <p className="text-[10px] text-slate-400 uppercase">Emisiones Base</p>
              <p className="text-2xl font-black text-slate-400">{calculations.baseEmissions.toLocaleString()}</p>
              <p className="text-xs text-slate-500">tonCO2</p>
            </div>
            <div className="bg-emerald-950/30 p-4 rounded-xl text-center border border-emerald-500/20">
              <p className="text-[10px] text-emerald-400 uppercase">Emisiones Finales</p>
              <p className="text-2xl font-black text-white">{calculations.finalEmissions.toLocaleString()}</p>
              <p className="text-xs text-emerald-400">tonCO2</p>
            </div>
          </div>

          <div className="space-y-5 bg-slate-800/40 p-4 rounded-xl border border-slate-700 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">Turbinas a Fabricar</span><span className="font-bold text-slate-300">{numTurbines}</span></div>
              <Slider value={[numTurbines]} onValueChange={(v) => setNumTurbines(v[0])} min={1} max={50} step={1} className="[&>span]:bg-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">Ratio Acero Reciclado</span><span className="font-bold text-emerald-400">{recycledSteelRatio}%</span></div>
              <Slider value={[recycledSteelRatio]} onValueChange={(v) => setRecycledSteelRatio(v[0])} min={0} max={100} step={5} className="[&>span]:bg-emerald-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800 to-gray-800 p-5 rounded-2xl border border-slate-600">
            <p className="text-[10px] uppercase font-black text-slate-400 mb-2">Reducción de Emisiones Scope 3</p>
            <p className="text-4xl font-black text-white">-{((1 - calculations.finalEmissions / calculations.baseEmissions) * 100).toFixed(0)}%</p>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-slate-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div><h4 className="text-white font-bold">ARIA</h4><p className="text-[10px] text-slate-400">Asesora de Descarbonización</p></div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
              <div className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-slate-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">Auditoría de Proveedores</p>
                  <p className="text-xs text-slate-400">He auditado a tus <span className="text-white font-bold">{calculations.suppliersAudited}</span> proveedores de acero. Tu reporte CSRD de Scope 3 tiene una precisión del <span className="text-emerald-400 font-bold">{calculations.csrdPrecision.toFixed(1)}%</span>.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3"><Recycle className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">Acero Circular</p>
                  <p className="text-xs text-slate-400">Con {recycledSteelRatio}% de acero reciclado, reduces las emisiones en <span className="text-emerald-400 font-bold">{(calculations.baseEmissions - calculations.finalEmissions).toLocaleString()} tonCO2</span>.</p>
                </div>
              </div>
            </div>
            {calculations.csrdPrecision >= 95 && (
              <div className="bg-gradient-to-r from-slate-800 to-gray-800 rounded-xl p-4 border border-slate-600">
                <div className="flex items-center gap-2 mb-2"><Shield className="w-5 h-5 text-slate-300" /><span className="text-sm font-bold text-slate-200">CSRD Ready</span></div>
                <p className="text-xs text-slate-400">Tu reporte es válido para licitaciones internacionales y cumple los requisitos de la directiva CSRD europea.</p>
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-slate-600 to-gray-600"><FileText className="w-4 h-4 mr-2" />Descargar Reporte Scope 3</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
