import React, { useState, useMemo } from 'react';
import { GraduationCap, ShieldCheck, Download, Sparkles, Brain, Database } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

interface UniSynthSimulatorProps {
  onValuesChange?: (values: { trainingEpochs: number; syntheticVolume: number; finalFidelity: number; dataLeakRisk: number }) => void;
}

export const UniSynthSimulator = ({ onValuesChange }: UniSynthSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [trainingEpochs, setTrainingEpochs] = useState(150);
  const [syntheticVolume, setSyntheticVolume] = useState(5);

  const calculations = useMemo(() => {
    const baseFidelity = 85;
    const volumeBonus = Math.min(10, syntheticVolume * 1.5);
    const epochBonus = Math.min(5, trainingEpochs * 0.05);
    const finalFidelity = Math.min(99.9, baseFidelity + volumeBonus + epochBonus);
    const dataLeakRisk = 0;
    const accelerationFactor = syntheticVolume / 2;
    const modelsTrainable = Math.floor(syntheticVolume * 3);
    const privacyScore = 100;
    return { finalFidelity, dataLeakRisk, accelerationFactor, modelsTrainable, privacyScore };
  }, [trainingEpochs, syntheticVolume]);

  const chartData = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const epoch = i * (trainingEpochs / 5);
      const precision = Math.min(99, 70 + (epoch / trainingEpochs) * 25 + (syntheticVolume * 0.5));
      const leakRisk = 0;
      return { epoch: `E${Math.round(epoch)}`, precision: precision.toFixed(1), leakRisk };
    });
  }, [trainingEpochs, syntheticVolume]);

  const pontusHash = useMemo(() => {
    return `0x${(trainingEpochs * syntheticVolume * 100).toString(16).slice(0, 8)}...${(calculations.finalFidelity * 100).toString(16).slice(0, 4)}`;
  }, [trainingEpochs, syntheticVolume, calculations.finalFidelity]);

  React.useEffect(() => {
    onValuesChange?.({
      trainingEpochs,
      syntheticVolume,
      finalFidelity: calculations.finalFidelity,
      dataLeakRisk: calculations.dataLeakRisk
    });
  }, [trainingEpochs, syntheticVolume, calculations, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-5">
        <Card className="bg-gradient-to-br from-cyan-950/40 to-violet-950/30 border-cyan-500/20 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-900/50 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">{t('uniSynth.title')}</h3>
                  <p className="text-xs text-slate-400">{t('uniSynth.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-cyan-900/50 text-cyan-300 font-mono text-[10px]">{pontusHash}</Badge>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-900/20">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('uniSynth.chart.precisionVsRisk')}</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData}>
                    <XAxis dataKey="epoch" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar yAxisId="right" dataKey="leakRisk" name={t('uniSynth.chart.leakRisk')} fill="#334155" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="left" type="monotone" dataKey="precision" name={t('uniSynth.chart.precision')} stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2 bg-emerald-950/30 rounded-lg py-2 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-emerald-400">{t('uniSynth.leakRiskZero')}</span>
              </div>
            </div>

            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-cyan-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('uniSynth.sliders.trainingEpochs')}</span>
                  <span className="font-bold text-cyan-400">{trainingEpochs}</span>
                </div>
                <Slider
                  value={[trainingEpochs]}
                  onValueChange={(v) => setTrainingEpochs(v[0])}
                  min={10}
                  max={500}
                  step={10}
                  className="[&>span]:bg-cyan-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('uniSynth.sliders.syntheticVolume')}</span>
                  <span className="font-bold text-violet-400">{syntheticVolume} TB</span>
                </div>
                <Slider
                  value={[syntheticVolume]}
                  onValueChange={(v) => setSyntheticVolume(v[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="[&>span]:bg-violet-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-800/30 text-center">
                <Brain className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-cyan-400 mb-1">{t('uniSynth.kpis.statisticalFidelity')}</p>
                <p className="text-3xl font-black text-white">{calculations.finalFidelity.toFixed(1)}%</p>
              </div>
              <div className="bg-violet-950/40 p-4 rounded-xl border border-violet-800/30 text-center">
                <Database className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-violet-400 mb-1">{t('uniSynth.kpis.trainableModels')}</p>
                <p className="text-3xl font-black text-white">{calculations.modelsTrainable}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-cyan-900/30 h-full">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t('aria.name')}</p>
                <p className="text-xs text-slate-400">{t('uniSynth.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                  __html: t('uniSynth.aria.fidelityDesc', {
                    volume: syntheticVolume,
                    fidelity: calculations.finalFidelity.toFixed(1)
                  })
                }} />
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                  __html: t('uniSynth.aria.noExposure')
                }} />
              </div>

              {calculations.finalFidelity >= 95 && (
                <div className="flex items-start gap-3 p-3 bg-cyan-950/30 rounded-lg border border-cyan-800/30">
                  <Brain className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-cyan-300" dangerouslySetInnerHTML={{
                    __html: t('uniSynth.aria.highFidelity')
                  }} />
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-cyan-900/30 to-violet-900/30 p-4 rounded-xl border border-cyan-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-300 uppercase">{t('uniSynth.privacyScore')}</span>
                <span className="text-xs font-bold text-white">{calculations.privacyScore}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                  style={{ width: `${calculations.privacyScore}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-2" dangerouslySetInnerHTML={{
                __html: t('uniSynth.accelerationFactor', { factor: calculations.accelerationFactor.toFixed(1) })
              }} />
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{t('common.pontusX')}</span>
                <span className="font-mono text-cyan-400">{pontusHash}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('uniSynth.downloadCert')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
