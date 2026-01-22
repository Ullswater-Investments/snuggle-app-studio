import React, { useState, useMemo } from 'react';
import { Droplets, Zap, AlertTriangle, FileText, Sparkles, Shield } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ComposedChart, Area, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

interface AquaPowerNexusSimulatorProps {
  onValuesChange?: (values: { waterFlow: number; irrigationDemand: number; generation: number }) => void;
}

export const AquaPowerNexusSimulator = ({ onValuesChange }: AquaPowerNexusSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [waterFlow, setWaterFlow] = useState(50);
  const [irrigationDemand, setIrrigationDemand] = useState(5);

  const calculations = useMemo(() => {
    const ecologicalFlow = Math.max(10, irrigationDemand * 3);
    const allowedGeneration = Math.max(0, (waterFlow - ecologicalFlow) * 0.8);
    const sanctionAvoided = waterFlow < ecologicalFlow ? 25000 : 0;
    const annualMwh = allowedGeneration * 24 * 365;
    return { ecologicalFlow, allowedGeneration, sanctionAvoided, annualMwh };
  }, [waterFlow, irrigationDemand]);

  const chartData = useMemo(() => [
    { month: t('aquaPowerNexus.months.jan'), nivel: 85, gen: calculations.allowedGeneration * 0.9 },
    { month: t('aquaPowerNexus.months.mar'), nivel: 75, gen: calculations.allowedGeneration * 0.8 },
    { month: t('aquaPowerNexus.months.may'), nivel: 60, gen: calculations.allowedGeneration * 0.6 },
    { month: t('aquaPowerNexus.months.jul'), nivel: 45, gen: calculations.allowedGeneration * 0.4 },
    { month: t('aquaPowerNexus.months.sep'), nivel: 55, gen: calculations.allowedGeneration * 0.5 },
    { month: t('aquaPowerNexus.months.nov'), nivel: 80, gen: calculations.allowedGeneration * 0.85 },
  ], [calculations.allowedGeneration, t]);

  const pontusHash = useMemo(() => `0x${(waterFlow * 10 + irrigationDemand).toString(16).padStart(8, '0')}...hydro`, [waterFlow, irrigationDemand]);

  React.useEffect(() => {
    onValuesChange?.({ waterFlow, irrigationDemand, generation: calculations.allowedGeneration });
  }, [waterFlow, irrigationDemand, calculations.allowedGeneration, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-blue-950/40 to-cyan-950/30 border-blue-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20"><Droplets className="w-6 h-6 text-blue-400" /></div>
              <div><h3 className="text-blue-400 font-bold text-sm">{t('aquaPowerNexus.title')}</h3><p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p></div>
            </div>
            <Badge className={calculations.sanctionAvoided === 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
              {calculations.sanctionAvoided === 0 ? t('aquaPowerNexus.flowOk') : t('aquaPowerNexus.flowAlert')}
            </Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-blue-900/30 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3">{t('aquaPowerNexus.chart.title')}</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                  <Area type="monotone" dataKey="nivel" fill="#3b82f6" fillOpacity={0.3} stroke="#3b82f6" />
                  <Line type="monotone" dataKey="gen" stroke="#22d3ee" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-950/40 p-4 rounded-xl text-center">
              <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">{waterFlow}</p>
              <p className="text-xs text-blue-300">{t('aquaPowerNexus.kpis.flowInput')}</p>
            </div>
            <div className="bg-cyan-950/40 p-4 rounded-xl text-center">
              <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">{calculations.allowedGeneration.toFixed(1)}</p>
              <p className="text-xs text-cyan-300">{t('aquaPowerNexus.kpis.allowedMW')}</p>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-blue-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">{t('aquaPowerNexus.sliders.waterFlow')}</span><span className="font-bold text-blue-400">{waterFlow}</span></div>
              <Slider value={[waterFlow]} onValueChange={(v) => setWaterFlow(v[0])} min={5} max={100} step={5} className="[&>span]:bg-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">{t('aquaPowerNexus.sliders.irrigationPriority')}</span><span className="font-bold text-cyan-400">{irrigationDemand}/10</span></div>
              <Slider value={[irrigationDemand]} onValueChange={(v) => setIrrigationDemand(v[0])} min={1} max={10} step={1} className="[&>span]:bg-cyan-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-5 rounded-2xl border border-blue-500/30">
            <p className="text-[10px] uppercase font-black text-blue-300 mb-2">{t('aquaPowerNexus.annualGeneration')}</p>
            <p className="text-4xl font-black text-white">{(calculations.annualMwh / 1000).toFixed(1)} <span className="text-lg text-blue-400">GWh</span></p>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-blue-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div><h4 className="text-white font-bold">{t('aria.name')}</h4><p className="text-[10px] text-slate-400">{t('aquaPowerNexus.aria.role')}</p></div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-900/30">
              <div className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">{t('aquaPowerNexus.aria.odrlPolicy')}</p>
                  <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{ __html: t('aquaPowerNexus.aria.odrlDesc', { flow: calculations.ecologicalFlow }) }} />
                </div>
              </div>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-900/30">
              <div className="flex items-start gap-3"><Shield className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">{t('aquaPowerNexus.aria.envProtection')}</p>
                  <p className="text-xs text-slate-400">{calculations.sanctionAvoided === 0 ? t('aquaPowerNexus.aria.noSanctionRisk') : t('aquaPowerNexus.aria.sanctionAvoided', { amount: calculations.sanctionAvoided.toLocaleString() })}</p>
                </div>
              </div>
            </div>
            {waterFlow >= 60 && (
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2"><Zap className="w-5 h-5 text-cyan-400" /><span className="text-sm font-bold text-cyan-300">{t('aquaPowerNexus.aria.highPerformance')}</span></div>
                <p className="text-xs text-slate-300">{t('aquaPowerNexus.aria.highPerformanceDesc')}</p>
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"><FileText className="w-4 h-4 mr-2" />{t('aquaPowerNexus.downloadReport')}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
