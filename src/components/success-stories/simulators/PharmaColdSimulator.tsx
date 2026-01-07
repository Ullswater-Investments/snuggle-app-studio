import React, { useState, useMemo } from 'react';
import { Thermometer, Shield, AlertTriangle, Lock, Snowflake, FileText, Sparkles } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

interface PharmaColdSimulatorProps {
  onValuesChange?: (values: { batchValue: number; tempSensitivity: number; protectedValue: number }) => void;
}

export const PharmaColdSimulator = ({ onValuesChange }: PharmaColdSimulatorProps) => {
  const [batchValue, setBatchValue] = useState(120000);
  const [tempSensitivity, setTempSensitivity] = useState(5);

  const calculations = useMemo(() => {
    const tempRisk = tempSensitivity * 0.08;
    const protectedValue = batchValue * (1 - tempRisk);
    const escrowStatus = tempSensitivity > 7 ? 'LOCKED' : 'RELEASED';
    const chainBreakRisk = tempSensitivity > 8;
    const maxTempAllowed = 8 - (tempSensitivity * 0.3);
    const insuranceSavings = batchValue * 0.035;
    return { protectedValue, escrowStatus, chainBreakRisk, maxTempAllowed, tempRisk, insuranceSavings };
  }, [batchValue, tempSensitivity]);

  const tempData = useMemo(() => {
    const baseTemp = 2 + (tempSensitivity * 0.5);
    return [
      { time: '00:00', temp: baseTemp, threshold: 8 },
      { time: '04:00', temp: baseTemp + 0.5, threshold: 8 },
      { time: '08:00', temp: baseTemp + 1.2, threshold: 8 },
      { time: '12:00', temp: baseTemp + (tempSensitivity > 6 ? 3 : 1.5), threshold: 8 },
      { time: '16:00', temp: baseTemp + (tempSensitivity > 7 ? 4.5 : 0.8), threshold: 8 },
      { time: '20:00', temp: baseTemp + (tempSensitivity > 8 ? 5.5 : 0.3), threshold: 8 },
      { time: '24:00', temp: baseTemp, threshold: 8 },
    ];
  }, [tempSensitivity]);

  const pontusHash = useMemo(() => {
    const base = (batchValue / 100 + tempSensitivity * 1000).toString(16);
    return `0x${base.padStart(8, '0')}...cold_guard`;
  }, [batchValue, tempSensitivity]);

  React.useEffect(() => {
    onValuesChange?.({ batchValue, tempSensitivity, protectedValue: calculations.protectedValue });
  }, [batchValue, tempSensitivity, calculations.protectedValue, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Simulation Panel */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-slate-900 to-red-950/30 border-red-500/20 shadow-2xl overflow-hidden p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <Thermometer className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-red-400 font-bold text-sm">COLD CHAIN GUARDIAN</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className={calculations.escrowStatus === 'LOCKED' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}>
              {calculations.escrowStatus === 'LOCKED' ? 'Escrow Bloqueado' : 'Pago Liberado'}
            </Badge>
          </div>

          {/* Temperature Visual */}
          <div className="relative bg-slate-950 rounded-2xl p-6 border border-blue-900/30 overflow-hidden mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Snowflake className={`w-10 h-10 ${tempSensitivity > 7 ? 'text-red-400' : 'text-blue-400'} ${tempSensitivity > 7 ? '' : 'animate-pulse'}`} />
                <div>
                  <p className="text-xs text-slate-400">Temperatura Crítica</p>
                  <p className={`text-2xl font-black ${tempSensitivity > 7 ? 'text-red-400' : 'text-blue-300'}`}>
                    {(2 + tempSensitivity * 0.8).toFixed(1)}°C
                  </p>
                </div>
              </div>
              
              <div className={`px-4 py-2 rounded-lg border ${tempSensitivity > 7 ? 'bg-red-950/50 border-red-500/30' : 'bg-blue-950/50 border-blue-500/30'}`}>
                <p className="text-[10px] font-mono text-slate-400">BATCH_VALUE</p>
                <p className="text-lg font-bold text-white">{batchValue.toLocaleString()} €</p>
              </div>
            </div>

            {/* Risk Indicator */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${tempSensitivity > 8 ? 'bg-red-500' : tempSensitivity > 5 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                  style={{ width: `${tempSensitivity * 10}%` }}
                />
              </div>
              <span className="text-xs text-slate-400">Riesgo: {tempSensitivity}/10</span>
            </div>
          </div>

          {/* Temperature Chart */}
          <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-900/20 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-400 uppercase font-bold">Monitorización Térmica 24h</span>
              {calculations.chainBreakRisk && (
                <Badge className="bg-red-500/20 text-red-400">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Cold Break Detectado
                </Badge>
              )}
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tempData}>
                  <defs>
                    <linearGradient id="coldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={tempSensitivity > 7 ? '#ef4444' : '#3b82f6'} stopOpacity={0.6}/>
                      <stop offset="95%" stopColor={tempSensitivity > 7 ? '#ef4444' : '#3b82f6'} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} />
                  <YAxis domain={[0, 12]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <ReferenceLine y={8} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Max 8°C', fill: '#ef4444', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="temp" stroke={tempSensitivity > 7 ? '#ef4444' : '#3b82f6'} strokeWidth={2} fill="url(#coldGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-blue-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Valor del Lote de Vacunas</span>
                <span className="font-bold text-blue-400">{batchValue.toLocaleString()} €</span>
              </div>
              <Slider value={[batchValue]} onValueChange={(v) => setBatchValue(v[0])} min={10000} max={500000} step={10000} className="[&>span]:bg-blue-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Sensibilidad Térmica del Producto</span>
                <span className={`font-bold ${tempSensitivity > 7 ? 'text-red-400' : 'text-cyan-400'}`}>{tempSensitivity}/10</span>
              </div>
              <Slider value={[tempSensitivity]} onValueChange={(v) => setTempSensitivity(v[0])} min={1} max={10} step={1} className="[&>span]:bg-cyan-600" />
            </div>
          </div>

          {/* Protection Status */}
          <div className={`p-5 rounded-2xl border ${calculations.escrowStatus === 'LOCKED' ? 'bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-500/30' : 'bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-500/30'}`}>
            <div className="flex items-center gap-2 mb-2">
              {calculations.escrowStatus === 'LOCKED' ? <Lock className="w-5 h-5 text-red-400" /> : <Shield className="w-5 h-5 text-blue-400" />}
              <p className="text-[10px] uppercase font-black text-slate-300">Valor Protegido en Escrow</p>
            </div>
            <p className="text-4xl font-black text-white">{calculations.protectedValue.toLocaleString()} <span className="text-lg text-blue-400">EUROe</span></p>
            <p className="text-xs text-slate-400 mt-1">Smart Contract activo en Pontus-X</p>
          </div>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-red-500/20 shadow-2xl h-full p-6">
          {/* ARIA Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">Guardiana de Cadena de Frío</p>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Cold Chain Guardian Activado</p>
                  <p className="text-xs text-slate-400">
                    He activado el Cold Chain Guardian. Si la temperatura sube de <span className="text-red-400 font-bold">8°C</span>, tus <span className="text-blue-400 font-bold">{batchValue.toLocaleString()} EUROe</span> quedan protegidos automáticamente en la red Pontus-X.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Cumplimiento GDP Pharma</p>
                  <p className="text-xs text-slate-400">
                    Tu sistema de trazabilidad cumple las directrices <span className="text-emerald-400">EU GDP 2013/C 343/01</span> para distribución farmacéutica. El registro inmutable garantiza la integridad ante auditorías de la AEMPS.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-900/30">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Ahorro en Seguros</p>
                  <p className="text-xs text-slate-400">
                    La protección blockchain reduce la prima de seguro farmacéutico en un <span className="text-cyan-400 font-bold">3.5%</span>, ahorrando <span className="text-white font-bold">{calculations.insuranceSavings.toLocaleString()} €</span> anuales.
                  </p>
                </div>
              </div>
            </div>

            {calculations.chainBreakRisk && (
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-4 border border-red-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-bold text-red-300">Alerta de Rotura de Cadena</span>
                </div>
                <p className="text-xs text-slate-300">
                  Se ha detectado un riesgo elevado de rotura térmica. El Smart Contract ha bloqueado automáticamente el pago al transportista hasta verificar la integridad del lote.
                </p>
              </div>
            )}

            {!calculations.chainBreakRisk && tempSensitivity <= 5 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Snowflake className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold text-cyan-300">Cadena de Frío Óptima</span>
                </div>
                <p className="text-xs text-slate-300">
                  Tu nivel de riesgo es bajo. El pago se libera automáticamente al transportista tras confirmación de entrega con temperatura validada.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[10px] font-mono text-slate-500 mb-3">{pontusHash}</p>
            <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Reporte GDP
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
