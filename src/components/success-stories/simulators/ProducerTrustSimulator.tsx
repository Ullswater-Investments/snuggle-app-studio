import React, { useState, useMemo, useEffect } from 'react';
import { FileCheck, Sparkles, Download, Clock, ShieldCheck } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useTranslation } from 'react-i18next';

interface ProducerTrustSimulatorProps {
  onValuesChange?: (values: { numManagers: number; annualSKUs: number; hoursSaved: number }) => void;
}

export const ProducerTrustSimulator = ({ onValuesChange }: ProducerTrustSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [numManagers, setNumManagers] = useState(8);
  const [annualSKUs, setAnnualSKUs] = useState(1200);

  const calculations = useMemo(() => {
    const manualHours = numManagers * annualSKUs * 0.02;
    const digitalHours = numManagers * 0.5 + annualSKUs * 0.001;
    const hoursSaved = Math.max(0, manualHours - digitalHours);
    const complianceRisk = digitalHours < manualHours * 0.1 ? 0 : 15;
    const sanctionAvoided = hoursSaved * 25;
    const efficiencyGain = manualHours > 0 ? Math.round((1 - digitalHours / manualHours) * 100) : 0;
    
    return { manualHours, digitalHours, hoursSaved, complianceRisk, sanctionAvoided, efficiencyGain };
  }, [numManagers, annualSKUs]);

  const chartData = useMemo(() => {
    const points = [];
    for (let i = 1; i <= 20; i += 2) {
      const manual = i * annualSKUs * 0.02;
      const digital = i * 0.5 + annualSKUs * 0.001;
      points.push({
        gestores: i,
        [t('producerTrust.chart.manualAudit')]: Math.round(manual),
        [t('producerTrust.chart.digitalProcure')]: Math.round(digital),
      });
    }
    return points;
  }, [annualSKUs, t]);

  const pontusHash = useMemo(() => {
    const base = Math.floor(numManagers * annualSKUs * 1.23);
    return `0x${base.toString(16).padStart(8, '0')}...${(base % 9999).toString(16)}`;
  }, [numManagers, annualSKUs]);

  useEffect(() => {
    onValuesChange?.({ numManagers, annualSKUs, hoursSaved: calculations.hoursSaved });
  }, [numManagers, annualSKUs, calculations.hoursSaved, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Interactive Simulator */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-indigo-950/40 to-violet-950/30 border-indigo-500/20 shadow-2xl overflow-hidden h-full">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <FileCheck className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('producerTrust.title')}</h3>
                  <p className="text-xs text-slate-400">{t('producerTrust.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-mono text-xs">
                {pontusHash}
              </Badge>
            </div>

            {/* Time Chart */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-indigo-900/30">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('producerTrust.chartTitle')}</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="gestores" 
                    tick={{ fill: '#94a3b8', fontSize: 10 }} 
                    label={{ value: t('producerTrust.chart.numManagers'), position: 'bottom', fill: '#64748b', fontSize: 10 }}
                  />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toLocaleString()} ${t('producerTrust.hours')}`, '']}
                  />
                  <ReferenceLine y={calculations.manualHours} stroke="#EF4444" strokeDasharray="3 3" label={{ value: `Manual: ${Math.round(calculations.manualHours)}h`, fill: '#EF4444', fontSize: 10 }} />
                  <Line type="monotone" dataKey={t('producerTrust.chart.manualAudit')} stroke="#EF4444" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey={t('producerTrust.chart.digitalProcure')} stroke="#6366F1" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sliders */}
            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-indigo-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('producerTrust.sliders.numManagers')}</span>
                  <span className="font-bold text-indigo-400">{numManagers}</span>
                </div>
                <Slider
                  value={[numManagers]}
                  onValueChange={(v) => setNumManagers(v[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="[&>span]:bg-indigo-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('producerTrust.sliders.annualSKUs')}</span>
                  <span className="font-bold text-violet-400">{annualSKUs.toLocaleString()}</span>
                </div>
                <Slider
                  value={[annualSKUs]}
                  onValueChange={(v) => setAnnualSKUs(v[0])}
                  min={10}
                  max={5000}
                  step={50}
                  className="[&>span]:bg-violet-600"
                />
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-950/40 p-3 rounded-xl border border-red-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-red-400 mb-1">{t('producerTrust.kpis.manualTime')}</p>
                <p className="text-xl font-black text-white">{Math.round(calculations.manualHours)}</p>
                <p className="text-[10px] text-slate-400">{t('producerTrust.hoursYear')}</p>
              </div>
              <div className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-indigo-400 mb-1">{t('producerTrust.kpis.digitalTime')}</p>
                <p className="text-xl font-black text-white">{Math.round(calculations.digitalHours)}</p>
                <p className="text-[10px] text-slate-400">{t('producerTrust.hoursYear')}</p>
              </div>
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">{t('producerTrust.kpis.efficiency')}</p>
                <p className="text-xl font-black text-white">{calculations.efficiencyGain}%</p>
                <p className="text-[10px] text-slate-400">{t('producerTrust.kpis.timeSaved')}</p>
              </div>
            </div>

            {/* Sanction Avoided */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-violet-900/50 p-5 rounded-2xl border border-indigo-500/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black text-indigo-300 mb-2">{t('producerTrust.sanctionMitigated')}</p>
                  <p className="text-3xl font-black text-white">{calculations.sanctionAvoided.toLocaleString()} <span className="text-lg text-indigo-400">EUROe</span></p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-indigo-500/20 text-indigo-300">RAP</Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-300">{t('producerTrust.zeroRisk')}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-indigo-500/20 shadow-2xl h-full">
          <CardContent className="p-6 space-y-5">
            {/* ARIA Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/25">
                A
              </div>
              <div>
                <p className="text-white font-semibold">{t('aria.name')}</p>
                <p className="text-xs text-indigo-400">{t('producerTrust.aria.role')}</p>
              </div>
            </div>

            {/* Dynamic Insights */}
            <div className="space-y-4">
              <div className="bg-indigo-950/30 rounded-xl p-4 border border-indigo-800/30">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('producerTrust.aria.instantReportTitle')}</p>
                    <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                      __html: t('producerTrust.aria.instantReportDesc', {
                        manual: Math.round(calculations.manualHours),
                        digital: Math.round(calculations.digitalHours)
                      })
                    }} />
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('producerTrust.aria.riskMitigationTitle')}</p>
                    <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                      __html: t('producerTrust.aria.riskMitigationDesc', {
                        sanction: calculations.sanctionAvoided.toLocaleString()
                      })
                    }} />
                  </div>
                </div>
              </div>

              {calculations.hoursSaved > 100 && (
                <div className="bg-violet-950/30 rounded-xl p-4 border border-violet-800/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium mb-1">{t('producerTrust.aria.exceptionalTitle')}</p>
                      <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                        __html: t('producerTrust.aria.exceptionalDesc', {
                          hours: Math.round(calculations.hoursSaved),
                          months: Math.round(calculations.hoursSaved / 1800 * 12)
                        })
                      }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quote ARIA */}
            <div className="bg-gradient-to-r from-indigo-900/30 to-violet-900/30 rounded-xl p-4 border border-indigo-500/20">
              <p className="text-sm text-slate-300 italic leading-relaxed" dangerouslySetInnerHTML={{
                __html: t('producerTrust.aria.quote', {
                  managers: numManagers,
                  skus: annualSKUs.toLocaleString(),
                  efficiency: calculations.efficiencyGain
                })
              }} />
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500">{t('common.pontusVerified')}</p>
                <Badge variant="outline" className="text-[10px] border-indigo-500/30 text-indigo-400 font-mono">
                  {pontusHash}
                </Badge>
              </div>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('producerTrust.downloadReport')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
