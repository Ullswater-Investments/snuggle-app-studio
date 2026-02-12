import React, { useState, useMemo } from 'react';
import { HeartPulse, ShieldAlert, Activity, Stethoscope, Lock, FileText, BrainCircuit } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

interface BioMedSimulatorProps {
  onValuesChange?: (values: { numDevices: number; predictivePower: number; savings: number }) => void;
}

export const BioMedSimulator = ({ onValuesChange }: BioMedSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [numDevices, setNumDevices] = useState(35);
  const [predictivePower, setPredictivePower] = useState(85);

  const calculations = useMemo(() => {
    const costPerDay = 15000;
    const savedAmount = numDevices * costPerDay * (predictivePower / 100) * 0.4;
    const humanHoursSaved = numDevices * 120;
    const fteEquivalent = parseFloat((humanHoursSaved / 1760).toFixed(1));
    const cirugiasRecuperadas = Math.floor(numDevices * (predictivePower / 100) * 0.8);
    const mdrCompliance = predictivePower >= 80 ? 100 : Math.round(predictivePower * 1.2);
    return { savedAmount, humanHoursSaved, fteEquivalent, cirugiasRecuperadas, mdrCompliance };
  }, [numDevices, predictivePower]);

  const uptimeData = useMemo(() => [
    { month: t('bioMed.months.jan'), uptime: 92 + (predictivePower * 0.06) },
    { month: t('bioMed.months.feb'), uptime: 93 + (predictivePower * 0.05) },
    { month: t('bioMed.months.mar'), uptime: 94 + (predictivePower * 0.04) },
    { month: t('bioMed.months.apr'), uptime: 95 + (predictivePower * 0.03) },
    { month: t('bioMed.months.may'), uptime: 96 + (predictivePower * 0.02) },
    { month: t('bioMed.months.jun'), uptime: 97 + (predictivePower * 0.01) },
  ], [predictivePower, t]);

  const pontusHash = useMemo(() => {
    const base = (numDevices * 1000 + predictivePower * 100).toString(16);
    return `0x${base.padStart(8, '0')}...mdr_cert`;
  }, [numDevices, predictivePower]);

  React.useEffect(() => {
    onValuesChange?.({ numDevices, predictivePower, savings: calculations.savedAmount });
  }, [numDevices, predictivePower, calculations.savedAmount, onValuesChange]);

  const heartbeatPath = "M 0,50 L 20,50 L 25,30 L 30,70 L 35,50 L 55,50 L 60,20 L 65,80 L 70,50 L 90,50 L 95,40 L 100,50";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-slate-900 to-rose-950/30 border-rose-500/20 shadow-2xl overflow-hidden p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-500/20">
                <Stethoscope className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h3 className="text-rose-400 font-bold text-sm">{t('bioMed.title')}</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-400">{t('bioMed.badge')}</Badge>
          </div>

          <div className="relative bg-slate-950 rounded-2xl p-6 border border-rose-900/30 overflow-hidden mb-6">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={heartbeatPath} fill="none" stroke="url(#heartGradient)" strokeWidth="2" className="animate-pulse" />
              </svg>
            </div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <HeartPulse className="w-16 h-16 text-rose-500 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Lock className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{numDevices}</p>
                  <p className="text-xs text-slate-400">{t('bioMed.visual.mriUnits')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-green-950/50 px-4 py-2 rounded-lg border border-green-500/30">
                <Activity className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-[10px] font-mono text-green-400">MDR_STATUS</p>
                  <p className="text-sm font-bold text-green-300">FULLY_COMPLIANT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4 border border-rose-900/20 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-400 uppercase font-bold">{t('bioMed.visual.availability')}</span>
              <span className="text-lg font-black text-rose-400">{(97 + predictivePower * 0.02).toFixed(1)}%</span>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uptimeData}>
                  <defs>
                    <linearGradient id="roseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} />
                  <YAxis domain={[90, 100]} hide />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="uptime" stroke="#f43f5e" strokeWidth={2} fill="url(#roseGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-rose-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{t('bioMed.sliders.mriUnits')}</span>
                <span className="font-bold text-rose-400">{numDevices}</span>
              </div>
              <Slider value={[numDevices]} onValueChange={(v) => setNumDevices(v[0])} min={5} max={100} step={5} className="[&>span]:bg-rose-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{t('bioMed.sliders.avgAge')}</span>
                <span className="font-bold text-emerald-400">{predictivePower}%</span>
              </div>
              <Slider value={[predictivePower]} onValueChange={(v) => setPredictivePower(v[0])} min={0} max={100} step={5} className="[&>span]:bg-emerald-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-800/30 text-center">
              <p className="text-[10px] uppercase font-black text-rose-400 mb-1">{t('bioMed.kpis.criticalFailures')}</p>
              <p className="text-3xl font-black text-white">{calculations.cirugiasRecuperadas}</p>
              <p className="text-[10px] text-slate-400">{t('bioMed.kpis.prediction')}</p>
            </div>
            <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30 text-center">
              <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">{t('gigaFactory.kpis.ftesLiberated')}</p>
              <p className="text-3xl font-black text-white">{calculations.fteEquivalent}</p>
              <p className="text-[10px] text-slate-400">{t('gigaFactory.kpis.strategicTasks')}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-900/50 to-pink-900/50 p-5 rounded-2xl border border-rose-500/30">
            <p className="text-[10px] uppercase font-black text-rose-300 mb-2">{t('bioMed.kpis.downtimeSaving')}</p>
            <p className="text-4xl font-black text-white">{calculations.savedAmount.toLocaleString()} <span className="text-lg text-rose-400">EUROe</span></p>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-rose-500/20 text-rose-300">-30% {t('bioMed.kpis.criticalFailures')}</Badge>
              <Badge className="bg-green-500/20 text-green-300">100% GDPR</Badge>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-rose-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">{t('aria.name')}</h4>
              <p className="text-[10px] text-slate-400">{t('bioMed.aria.role')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-rose-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-rose-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">{t('bioMed.aria.predictiveMaintenance')}</p>
                  <p className="text-xs text-slate-400">
                    {t('bioMed.aria.predictiveDesc', { unit: 'RM-07', saving: calculations.savedAmount.toLocaleString() })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">{t('bioMed.aria.patientPrivacy')}</p>
                  <p className="text-xs text-slate-400">{t('bioMed.aria.privacyDesc')}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-900/30">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">{t('bioMed.aria.uptime')}</p>
                  <p className="text-xs text-slate-400">
                    {t('bioMed.aria.uptimeDesc', { uptime: (97 + predictivePower * 0.02).toFixed(1) })}
                  </p>
                </div>
              </div>
            </div>

            {predictivePower >= 80 && (
              <div className="bg-gradient-to-r from-rose-900/30 to-pink-900/30 rounded-xl p-4 border border-rose-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <HeartPulse className="w-5 h-5 text-rose-400" />
                  <span className="text-sm font-bold text-rose-300">{t('bioMed.aria.clinicalExcellence')}</span>
                </div>
                <p className="text-xs text-slate-300">{t('bioMed.aria.clinicalExcellenceDesc')}</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[10px] font-mono text-slate-500 mb-3">{pontusHash}</p>
            <Button className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700">
              <FileText className="w-4 h-4 mr-2" />
              {t('bioMed.aria.downloadMaintenance')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
