import React, { useState, useMemo } from 'react';
import { Droplet, Waves, Download, Sparkles, CheckCircle2, Leaf, BrainCircuit } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { useTranslation } from 'react-i18next';

interface BerryWaterSimulatorProps {
  onValuesChange?: (values: { probesPerHa: number; waterTarget: number; waterEfficiency: number; waterSaved: number }) => void;
}

export const BerryWaterSimulator = ({ onValuesChange }: BerryWaterSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [probesPerHa, setProbesPerHa] = useState(12);
  const [waterTarget, setWaterTarget] = useState(30);

  const calculations = useMemo(() => {
    const waterEfficiency = Math.min(100, 70 + (probesPerHa * 1.5) + (waterTarget * 0.2));
    const baseConsumption = 5200;
    const waterSaved = Math.floor(baseConsumption * (waterTarget / 100) * (probesPerHa / 10));
    const auditEliminated = waterEfficiency >= 98;
    const globalGapPassed = waterEfficiency >= 90;
    const costSaved = waterSaved * 0.45;
    return { waterEfficiency, waterSaved, auditEliminated, globalGapPassed, costSaved };
  }, [probesPerHa, waterTarget]);

  const moistureData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = i * 2;
      const realMoisture = 45 + Math.sin(i * 0.8) * 20 + (probesPerHa * 0.5);
      const scheduled = 60;
      return { hour: `${hour}h`, real: Math.min(95, realMoisture), scheduled };
    });
  }, [probesPerHa]);

  const pontusHash = useMemo(() => {
    return `0x${(probesPerHa * waterTarget * 100).toString(16).slice(0, 8)}...${(calculations.waterEfficiency * 100).toString(16).slice(0, 4)}`;
  }, [probesPerHa, waterTarget, calculations.waterEfficiency]);

  React.useEffect(() => {
    onValuesChange?.({
      probesPerHa,
      waterTarget,
      waterEfficiency: calculations.waterEfficiency,
      waterSaved: calculations.waterSaved
    });
  }, [probesPerHa, waterTarget, calculations, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-5">
        <Card className="bg-gradient-to-br from-blue-950/40 to-emerald-950/30 border-blue-500/20 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-900/50 flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider">{t('berryWater.title')}</h3>
                  <p className="text-xs text-slate-400">{t('berryWater.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-blue-900/50 text-blue-300 font-mono text-[10px]">{pontusHash}</Badge>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-900/20">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('berryWater.chartTitle')}</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moistureData}>
                    <defs>
                      <linearGradient id="moistureBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="hour" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <ReferenceLine y={60} stroke="#10b981" strokeDasharray="5 5" label={{ value: t('berryWater.chart.optimal'), fill: '#10b981', fontSize: 10 }} />
                    <Area type="monotone" dataKey="real" name={t('berryWater.chart.realMoisture')} stroke="#3b82f6" strokeWidth={2} fill="url(#moistureBlue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between mt-2 text-[10px]">
                <span className="text-amber-400">🔸 {t('berryWater.chart.dry')}</span>
                <span className="text-emerald-400">🔹 {t('berryWater.chart.optimalRange')}</span>
                <span className="text-blue-400">🔵 {t('berryWater.chart.saturated')}</span>
              </div>
            </div>

            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-blue-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('berryWater.sliderProbes')}</span>
                  <span className="font-bold text-blue-400">{probesPerHa} {t('berryWater.probes')}</span>
                </div>
                <Slider
                  value={[probesPerHa]}
                  onValueChange={(v) => setProbesPerHa(v[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="[&>span]:bg-blue-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('berryWater.sliderTarget')}</span>
                  <span className="font-bold text-emerald-400">{waterTarget}%</span>
                </div>
                <Slider
                  value={[waterTarget]}
                  onValueChange={(v) => setWaterTarget(v[0])}
                  min={10}
                  max={50}
                  step={5}
                  className="[&>span]:bg-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-800/30 text-center">
                <Waves className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-blue-400 mb-1">{t('berryWater.kpiEfficiency')}</p>
                <p className="text-3xl font-black text-white">{calculations.waterEfficiency.toFixed(0)}%</p>
              </div>
              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30 text-center">
                <Droplet className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">{t('berryWater.kpiWaterSaved')}</p>
                <p className="text-3xl font-black text-white">{calculations.waterSaved.toLocaleString()}</p>
                <p className="text-xs text-slate-400">{t('berryWater.m3Year')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-blue-900/30 h-full">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t('aria.name')}</p>
                <p className="text-xs text-slate-400">{t('berryWater.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{ 
                  __html: t('berryWater.aria.insight1', { efficiency: calculations.waterEfficiency.toFixed(0), probes: probesPerHa }) 
                }} />
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Droplet className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{ 
                  __html: t('berryWater.aria.insight2', { water: calculations.waterSaved.toLocaleString(), cost: calculations.costSaved.toLocaleString() }) 
                }} />
              </div>

              {calculations.auditEliminated ? (
                <div className="flex items-start gap-3 p-3 bg-emerald-950/30 rounded-lg border border-emerald-800/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-emerald-300" dangerouslySetInnerHTML={{ __html: t('berryWater.aria.auditEliminated') }} />
                </div>
              ) : (
                <div className="flex items-start gap-3 p-3 bg-blue-950/30 rounded-lg border border-blue-800/30">
                  <Leaf className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-300">{t('berryWater.aria.increaseProbes')}</p>
                </div>
              )}
            </div>

            {calculations.globalGapPassed && (
              <div className="bg-gradient-to-r from-blue-900/30 to-emerald-900/30 p-4 rounded-xl border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300 uppercase">{t('berryWater.aria.globalGapPassed')}</span>
                </div>
                <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{ __html: t('berryWater.aria.globalGapDesc') }} />
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Pontus-X Hash</span>
                <span className="font-mono text-blue-400">{pontusHash}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('berryWater.downloadReport')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
