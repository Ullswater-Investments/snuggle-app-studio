import React, { useState, useMemo, useEffect } from 'react';
import { Battery, Sparkles, Download, ThermometerSun, Zap, BrainCircuit } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, Cell } from 'recharts';

interface BatteryLifeSimulatorProps {
  onValuesChange?: (values: { chargeCycles: number; avgTemp: number; soh: number }) => void;
}

export const BatteryLifeSimulator = ({ onValuesChange }: BatteryLifeSimulatorProps) => {
  const [chargeCycles, setChargeCycles] = useState(1200);
  const [avgTemp, setAvgTemp] = useState(28);

  const calculations = useMemo(() => {
    const degradation = Math.min(0.0003 * chargeCycles + avgTemp * 0.002, 0.5); // Max 50% degradación
    const soh = Math.round((1 - degradation) * 100); // State of Health %
    const residualValue = soh > 70 ? 4500 : soh > 50 ? 2200 : 800; // EUR por pack
    const extendedLifeYears = soh > 80 ? 7 : soh > 60 ? 4 : 2;
    const suitableFor = soh > 75 ? 'Almacenamiento Solar' : soh > 50 ? 'Backup Industrial' : 'Reciclaje';
    const sohColor = soh > 75 ? '#10B981' : soh > 50 ? '#F59E0B' : '#EF4444';
    
    return { soh, residualValue, extendedLifeYears, suitableFor, sohColor, degradation };
  }, [chargeCycles, avgTemp]);

  const radialData = useMemo(() => [
    { name: 'SoH', value: calculations.soh, fill: calculations.sohColor },
  ], [calculations.soh, calculations.sohColor]);

  const pontusHash = useMemo(() => {
    const base = Math.floor(chargeCycles * avgTemp * 2.18);
    return `0x${base.toString(16).padStart(8, '0')}...${(base % 9999).toString(16)}`;
  }, [chargeCycles, avgTemp]);

  useEffect(() => {
    onValuesChange?.({ chargeCycles, avgTemp, soh: calculations.soh });
  }, [chargeCycles, avgTemp, calculations.soh, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Columna Izquierda - Simulador Interactivo */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-violet-950/40 to-purple-950/30 border-violet-500/20 shadow-2xl overflow-hidden h-full">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-500/20 rounded-lg">
                  <Battery className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">BATTERY-LIFE</h3>
                  <p className="text-xs text-slate-400">Segunda Vida EV - Diagnóstico SoH</p>
                </div>
              </div>
              <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-mono text-xs">
                {pontusHash}
              </Badge>
            </div>

            {/* Radial Chart SoH */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-violet-900/30">
              <p className="text-xs text-slate-400 mb-2 uppercase font-bold text-center">State of Health (SoH)</p>
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="100%"
                  startAngle={180}
                  endAngle={0}
                  data={radialData}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    background={{ fill: '#1e293b' }}
                  >
                    {radialData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="text-center -mt-16">
                <p className="text-5xl font-black text-white">{calculations.soh}%</p>
                <p className="text-sm text-slate-400">Salud de Batería</p>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-violet-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Ciclos de Carga Acumulados</span>
                  <span className="font-bold text-violet-400">{chargeCycles.toLocaleString()}</span>
                </div>
                <Slider
                  value={[chargeCycles]}
                  onValueChange={(v) => setChargeCycles(v[0])}
                  min={100}
                  max={5000}
                  step={100}
                  className="[&>span]:bg-violet-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Temperatura Media de Operación</span>
                  <span className="font-bold text-orange-400">{avgTemp}°C</span>
                </div>
                <Slider
                  value={[avgTemp]}
                  onValueChange={(v) => setAvgTemp(v[0])}
                  min={15}
                  max={45}
                  step={1}
                  className="[&>span]:bg-orange-600"
                />
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-violet-950/40 p-3 rounded-xl border border-violet-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-violet-400 mb-1">Uso Óptimo</p>
                <p className="text-sm font-bold text-white">{calculations.suitableFor}</p>
              </div>
              <div className="bg-purple-950/40 p-3 rounded-xl border border-purple-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-purple-400 mb-1">Vida Extendida</p>
                <p className="text-xl font-black text-white">{calculations.extendedLifeYears}</p>
                <p className="text-[10px] text-slate-400">años más</p>
              </div>
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Valor Residual</p>
                <p className="text-xl font-black text-white">€{calculations.residualValue.toLocaleString()}</p>
              </div>
            </div>

            {/* Aplicación Recomendada */}
            <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 p-5 rounded-2xl border border-violet-500/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black text-violet-300 mb-2">Aplicación Segunda Vida</p>
                  <p className="text-2xl font-black text-white">{calculations.suitableFor}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={`${calculations.soh > 70 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {calculations.soh > 70 ? 'Premium' : 'Standard'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna Derecha - Panel ARIA */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-violet-500/20 shadow-2xl h-full">
          <CardContent className="p-6 space-y-5">
            {/* ARIA Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">AI Advisor</p>
                <p className="text-xs text-violet-400">Asesora de Segunda Vida EV</p>
              </div>
            </div>

            {/* Insights Dinámicos */}
            <div className="space-y-4">
              <div className="bg-violet-950/30 rounded-xl p-4 border border-violet-800/30">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">Diagnóstico de Salud</p>
                    <p className="text-xs text-slate-400">
                      Esta batería mantiene un <span className="font-bold" style={{ color: calculations.sohColor }}>{calculations.soh}%</span> de 
                      salud. Es óptima para <span className="text-violet-400 font-bold">'{calculations.suitableFor}'</span>, 
                      extendiendo su valor económico {calculations.extendedLifeYears} años más.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-950/30 rounded-xl p-4 border border-orange-800/30">
                <div className="flex items-start gap-3">
                  <ThermometerSun className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">Impacto Térmico</p>
                    <p className="text-xs text-slate-400">
                      Operación a <span className="text-orange-400 font-bold">{avgTemp}°C</span> de media. 
                      {avgTemp > 35 ? ' El calor acelera la degradación. Considera sistemas de refrigeración.' : 
                       ' Temperatura dentro del rango óptimo para longevidad.'}
                    </p>
                  </div>
                </div>
              </div>

              {calculations.soh > 80 && (
                <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium mb-1">¡Batería Premium!</p>
                      <p className="text-xs text-slate-400">
                        Con un SoH del {calculations.soh}%, esta batería califica para el <span className="text-emerald-400 font-bold">Mercado Premium de Segunda Vida</span>, 
                        con un valor de <span className="text-white font-bold">€{calculations.residualValue.toLocaleString()}</span>.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quote ARIA */}
            <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 rounded-xl p-4 border border-violet-500/20">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "Tras <span className="text-violet-400 font-semibold">{chargeCycles.toLocaleString()} ciclos</span> a 
                <span className="text-orange-400 font-semibold"> {avgTemp}°C</span>, el pasaporte digital de esta batería 
                certifica un valor residual de <span className="text-white font-bold">€{calculations.residualValue.toLocaleString()}</span> para 
                aplicaciones de {calculations.suitableFor.toLowerCase()}."
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500">Verificado en Pontus-X</p>
                <Badge variant="outline" className="text-[10px] border-violet-500/30 text-violet-400 font-mono">
                  {pontusHash}
                </Badge>
              </div>
              <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white">
                <Download className="w-4 h-4 mr-2" />
                Descargar Pasaporte Digital
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
