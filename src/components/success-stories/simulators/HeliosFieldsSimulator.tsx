import React, { useState, useMemo } from 'react';
import { Sun, AlertTriangle, Zap, Thermometer, FileText, Sparkles, Wrench } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface HeliosFieldsSimulatorProps {
  onValuesChange?: (values: { numPanels: number; dirtyDays: number; mwhRecovered: number }) => void;
}

export const HeliosFieldsSimulator = ({ onValuesChange }: HeliosFieldsSimulatorProps) => {
  const [numPanels, setNumPanels] = useState(15000);
  const [dirtyDays, setDirtyDays] = useState(20);

  const calculations = useMemo(() => {
    const efficiencyLoss = dirtyDays * 0.002;
    const mwhRecovered = numPanels * 0.015 * (1 - efficiencyLoss);
    const revenueGain = mwhRecovered * 52;
    const cleaningCost = numPanels * 0.08;
    const netGain = revenueGain - cleaningCost;
    const annualMwh = mwhRecovered * 365;
    return { efficiencyLoss, mwhRecovered, revenueGain, cleaningCost, netGain, annualMwh };
  }, [numPanels, dirtyDays]);

  const productionData = useMemo(() => [
    { hour: '06:00', mwh: 0 },
    { hour: '09:00', mwh: calculations.mwhRecovered * 0.4 },
    { hour: '12:00', mwh: calculations.mwhRecovered },
    { hour: '15:00', mwh: calculations.mwhRecovered * 0.8 },
    { hour: '18:00', mwh: calculations.mwhRecovered * 0.3 },
    { hour: '21:00', mwh: 0 },
  ], [calculations.mwhRecovered]);

  const pontusHash = useMemo(() => {
    const base = (numPanels + dirtyDays * 1000).toString(16);
    return `0x${base.padStart(8, '0')}...solar_iot`;
  }, [numPanels, dirtyDays]);

  React.useEffect(() => {
    onValuesChange?.({ numPanels, dirtyDays, mwhRecovered: calculations.mwhRecovered });
  }, [numPanels, dirtyDays, calculations.mwhRecovered, onValuesChange]);

  const dirtLevel = Math.min(dirtyDays / 60, 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Simulation Panel */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-yellow-950/40 to-orange-950/30 border-yellow-500/20 shadow-2xl overflow-hidden p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Sun className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-yellow-400 font-bold text-sm">SOLAR FIELD OPTIMIZER</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className={dirtyDays > 30 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}>
              {dirtyDays > 30 ? 'Limpieza Urgente' : 'IoT Activo'}
            </Badge>
          </div>

          {/* Panel Grid Visual */}
          <div className="bg-slate-900/80 rounded-2xl p-4 border border-yellow-900/30 mb-6">
            <div className="grid grid-cols-10 gap-1 mb-4">
              {Array.from({ length: 40 }).map((_, i) => {
                const isDirty = Math.random() < dirtLevel;
                return (
                  <div 
                    key={i}
                    className={`aspect-square rounded transition-all ${
                      isDirty 
                        ? 'bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border border-orange-600/50' 
                        : 'bg-gradient-to-br from-yellow-500/30 to-amber-500/30 border border-yellow-500/50'
                    }`}
                  >
                    {!isDirty && <div className="w-full h-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
                    </div>}
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center bg-black/40 rounded-lg p-2">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-400" />
                <span className="text-[10px] text-slate-300">Suciedad: <span className={`font-bold ${dirtyDays > 30 ? 'text-red-400' : 'text-yellow-400'}`}>{dirtyDays} días</span></span>
              </div>
              {dirtyDays > 30 && (
                <Badge className="bg-red-500/20 text-red-400 text-[10px]">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Urgente
                </Badge>
              )}
            </div>
          </div>

          {/* Production Chart */}
          <div className="bg-slate-900/60 rounded-xl p-4 border border-yellow-900/20 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-400 uppercase font-bold">Generación Real-Time</span>
              <span className="text-lg font-black text-yellow-400">{calculations.mwhRecovered.toFixed(1)} MWh</span>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productionData}>
                  <defs>
                    <linearGradient id="solarGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#facc15" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#facc15" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="mwh" stroke="#facc15" strokeWidth={2} fill="url(#solarGradient2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-yellow-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Número de Paneles</span>
                <span className="font-bold text-yellow-400">{numPanels.toLocaleString()}</span>
              </div>
              <Slider value={[numPanels]} onValueChange={(v) => setNumPanels(v[0])} min={1000} max={50000} step={1000} className="[&>span]:bg-yellow-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Días sin Limpieza</span>
                <span className={`font-bold ${dirtyDays > 30 ? 'text-red-400' : 'text-orange-400'}`}>{dirtyDays}</span>
              </div>
              <Slider value={[dirtyDays]} onValueChange={(v) => setDirtyDays(v[0])} min={1} max={60} step={1} className="[&>span]:bg-orange-600" />
            </div>
          </div>

          {/* Revenue Impact */}
          <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 p-5 rounded-2xl border border-yellow-500/30">
            <p className="text-[10px] uppercase font-black text-yellow-300 mb-2">Ingresos por Generación Optimizada</p>
            <p className="text-4xl font-black text-white">{calculations.revenueGain.toLocaleString()} <span className="text-lg text-yellow-400">EUROe/día</span></p>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-yellow-500/20 text-yellow-300">+5% Eficiencia</Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300">IoT Activo</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-yellow-500/20 shadow-2xl h-full p-6">
          {/* ARIA Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">Asesora de Mantenimiento Solar</p>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-yellow-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Recuperación de Energía</p>
                  <p className="text-xs text-slate-400">
                    Al reducir la suciedad a <span className="text-yellow-400 font-bold">{dirtyDays} días</span>, recuperas <span className="text-white font-bold">{calculations.mwhRecovered.toFixed(1)} MWh</span> diarios, generando <span className="text-emerald-400">{calculations.revenueGain.toLocaleString()} €</span> adicionales.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Producción Anual Estimada</p>
                  <p className="text-xs text-slate-400">
                    Con {numPanels.toLocaleString()} paneles optimizados, tu producción anual alcanza <span className="text-emerald-400 font-bold">{calculations.annualMwh.toLocaleString()} MWh</span>, suficiente para alimentar {Math.floor(calculations.annualMwh / 4.5).toLocaleString()} hogares.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-orange-900/30">
              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Coste de Mantenimiento</p>
                  <p className="text-xs text-slate-400">
                    El coste de limpieza es de <span className="text-orange-400">{calculations.cleaningCost.toLocaleString()} €</span>, con un beneficio neto de <span className="text-white font-bold">{calculations.netGain.toLocaleString()} €/día</span>.
                  </p>
                </div>
              </div>
            </div>

            {dirtyDays > 30 && (
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-4 border border-red-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-bold text-red-300">Alerta de Mantenimiento</span>
                </div>
                <p className="text-xs text-slate-300">
                  La suciedad acumulada está causando una pérdida del {(calculations.efficiencyLoss * 100).toFixed(1)}% de eficiencia. Recomiendo programar limpieza inmediata para maximizar ingresos.
                </p>
              </div>
            )}

            {dirtyDays <= 15 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-bold text-emerald-300">Rendimiento Óptimo</span>
                </div>
                <p className="text-xs text-slate-300">
                  Tu campo solar opera en condiciones óptimas. El IoT predictivo mantiene la eficiencia máxima con mínimas intervenciones.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[10px] font-mono text-slate-500 mb-3">{pontusHash}</p>
            <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Reporte IoT
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
