import React, { useState, useMemo } from 'react';
import { Cloud, ShieldCheck, Download, Sparkles, Clock, Users } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

interface DataCloudSecureSimulatorProps {
  onValuesChange?: (values: { numAuditControls: number; teamSize: number; digitalAuditDays: number; hoursReduced: number }) => void;
}

export const DataCloudSecureSimulator = ({ onValuesChange }: DataCloudSecureSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [numAuditControls, setNumAuditControls] = useState(85);
  const [teamSize, setTeamSize] = useState(5);

  const calculations = useMemo(() => {
    const baseAuditWeeks = 3;
    const automatedEvidence = Math.min(100, numAuditControls * 0.8);
    const manualEffort = teamSize * 40 * baseAuditWeeks;
    const digitalAuditDays = Math.max(2, Math.floor((baseAuditWeeks * 7) * (1 - automatedEvidence / 100)));
    const hoursReduced = Math.floor(manualEffort * (automatedEvidence / 100));
    const soc2Passed = automatedEvidence >= 80;
    const regionsAudited = 5;
    const costSaved = hoursReduced * 75;
    return { automatedEvidence, digitalAuditDays, hoursReduced, soc2Passed, regionsAudited, costSaved };
  }, [numAuditControls, teamSize]);

  const chartData = useMemo(() => {
    return [
      { name: t('dataCloudSecure.chart.manual'), hours: teamSize * 40 * 3, fill: '#64748b' },
      { name: t('dataCloudSecure.chart.procureData'), hours: Math.max(teamSize * 8, (teamSize * 40 * 3) - calculations.hoursReduced), fill: '#6366f1' }
    ];
  }, [teamSize, calculations.hoursReduced, t]);

  const pontusHash = useMemo(() => {
    return `0x${(numAuditControls * teamSize * 100).toString(16).slice(0, 8)}...${(calculations.automatedEvidence * 100).toString(16).slice(0, 4)}`;
  }, [numAuditControls, teamSize, calculations.automatedEvidence]);

  React.useEffect(() => {
    onValuesChange?.({
      numAuditControls,
      teamSize,
      digitalAuditDays: calculations.digitalAuditDays,
      hoursReduced: calculations.hoursReduced
    });
  }, [numAuditControls, teamSize, calculations, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-5">
        <Card className="bg-gradient-to-br from-indigo-950/40 to-cyan-950/30 border-indigo-500/20 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-900/50 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">{t('dataCloudSecure.title')}</h3>
                  <p className="text-xs text-slate-400">{t('dataCloudSecure.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-indigo-900/50 text-indigo-300 font-mono text-[10px]">{pontusHash}</Badge>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-indigo-900/20">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('dataCloudSecure.chart.title')}</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      formatter={(value: number) => [`${value} ${t('dataCloudSecure.chart.hours')}`, t('dataCloudSecure.chart.effort')]}
                    />
                    <Bar dataKey="hours" radius={[0, 8, 8, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-500 rounded"></span> {t('dataCloudSecure.chart.manual')}</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded"></span> {t('dataCloudSecure.chart.procureData')}</span>
              </div>
            </div>

            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-indigo-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('dataCloudSecure.sliders.auditControls')}</span>
                  <span className="font-bold text-indigo-400">{numAuditControls} {t('dataCloudSecure.sliders.controls')}</span>
                </div>
                <Slider
                  value={[numAuditControls]}
                  onValueChange={(v) => setNumAuditControls(v[0])}
                  min={10}
                  max={150}
                  step={5}
                  className="[&>span]:bg-indigo-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('dataCloudSecure.sliders.teamSize')}</span>
                  <span className="font-bold text-cyan-400">{teamSize} FTEs</span>
                </div>
                <Slider
                  value={[teamSize]}
                  onValueChange={(v) => setTeamSize(v[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="[&>span]:bg-cyan-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/30 text-center">
                <Clock className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-indigo-400 mb-1">{t('dataCloudSecure.kpis.auditDays')}</p>
                <p className="text-3xl font-black text-white">{calculations.digitalAuditDays}</p>
                <p className="text-xs text-slate-400">{t('dataCloudSecure.kpis.vsTraditional')}</p>
              </div>
              <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-800/30 text-center">
                <Users className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-cyan-400 mb-1">{t('dataCloudSecure.kpis.hoursSaved')}</p>
                <p className="text-3xl font-black text-white">{calculations.hoursReduced}</p>
                <p className="text-xs text-slate-400">= {calculations.costSaved.toLocaleString()} €</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-indigo-900/30 h-full">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t('aria.name')}</p>
                <p className="text-xs text-slate-400">{t('dataCloudSecure.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{ __html: t('dataCloudSecure.aria.regionsDesc', { regions: calculations.regionsAudited, evidence: calculations.automatedEvidence.toFixed(0) }) }} />
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Clock className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{ __html: t('dataCloudSecure.aria.auditTimeDesc', { days: calculations.digitalAuditDays }) }} />
              </div>

              {calculations.soc2Passed ? (
                <div className="flex items-start gap-3 p-3 bg-indigo-950/30 rounded-lg border border-indigo-800/30">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-indigo-300" dangerouslySetInnerHTML={{ __html: t('dataCloudSecure.aria.soc2Ready') }} />
                </div>
              ) : (
                <div className="flex items-start gap-3 p-3 bg-amber-950/30 rounded-lg border border-amber-800/30">
                  <Cloud className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-300">{t('dataCloudSecure.aria.soc2Pending')}</p>
                </div>
              )}
            </div>

            {calculations.soc2Passed && (
              <div className="bg-gradient-to-r from-indigo-900/30 to-cyan-900/30 p-4 rounded-xl border border-indigo-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-300 uppercase">{t('dataCloudSecure.aria.complianceReady')}</span>
                </div>
                <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{ __html: t('dataCloudSecure.aria.totalSavings', { savings: calculations.costSaved.toLocaleString() }) }} />
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{t('common.pontusX')} Hash</span>
                <span className="font-mono text-indigo-400">{pontusHash}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('dataCloudSecure.downloadReport')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
