import React, { useState, useMemo } from 'react';
import { Wine, Grape, Leaf, Download, Sparkles, Award } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

interface VinosDOSimulatorProps {
  onValuesChange?: (values: { bioInvestment: number; transitionMonths: number; soilHealth: number; premiumMargin: number }) => void;
}

export const VinosDOSimulator = ({ onValuesChange }: VinosDOSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [bioInvestment, setBioInvestment] = useState(45000);
  const [transitionMonths, setTransitionMonths] = useState(30);

  const calculations = useMemo(() => {
    const soilHealth = Math.min(100, 40 + (transitionMonths * 1.5) + (bioInvestment / 5000));
    const chemicalReduction = Math.min(100, transitionMonths * 2.5);
    const premiumMargin = soilHealth >= 85 ? 54 : soilHealth >= 70 ? 35 : 25;
    const zeroResidueAchieved = soilHealth >= 85 && chemicalReduction >= 90;
    const scandinavianAccess = zeroResidueAchieved;
    const projectedRevenue = bioInvestment * (1 + premiumMargin / 100) * 2.5;
    return { soilHealth, chemicalReduction, premiumMargin, zeroResidueAchieved, scandinavianAccess, projectedRevenue };
  }, [bioInvestment, transitionMonths]);

  const chartData = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const month = i * 6;
      const chemicals = Math.max(0, 100 - (month * 2.5));
      const soil = Math.min(100, 40 + (month * 1.5));
      return { name: `M${month}`, chemicals, soil };
    });
  }, []);

  const pontusHash = useMemo(() => {
    return `0x${(bioInvestment * transitionMonths).toString(16).slice(0, 8)}...${(calculations.soilHealth * 1000).toString(16).slice(0, 4)}`;
  }, [bioInvestment, transitionMonths, calculations.soilHealth]);

  React.useEffect(() => {
    onValuesChange?.({
      bioInvestment,
      transitionMonths,
      soilHealth: calculations.soilHealth,
      premiumMargin: calculations.premiumMargin
    });
  }, [bioInvestment, transitionMonths, calculations, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-5">
        <Card className="bg-gradient-to-br from-rose-950/40 to-amber-950/20 border-rose-800/30 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-900/50 flex items-center justify-center">
                  <Wine className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">{t('vinosDO.title')}</h3>
                  <p className="text-xs text-slate-400">{t('vinosDO.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-rose-900/50 text-rose-300 font-mono text-[10px]">{pontusHash}</Badge>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-rose-900/20">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('vinosDO.chart.organicTransition')}</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="chemGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#84cc16" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#84cc16" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis hide domain={[0, 110]} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Area type="monotone" dataKey="chemicals" name={t('vinosDO.chart.chemicals')} stroke="#f43f5e" strokeWidth={2} fill="url(#chemGrad)" />
                    <Area type="monotone" dataKey="soil" name={t('vinosDO.chart.soilHealth')} stroke="#84cc16" strokeWidth={2} fill="url(#soilGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-rose-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('vinosDO.sliders.bioInvestment')}</span>
                  <span className="font-bold text-amber-400">{bioInvestment.toLocaleString()} €</span>
                </div>
                <Slider
                  value={[bioInvestment]}
                  onValueChange={(v) => setBioInvestment(v[0])}
                  min={5000}
                  max={100000}
                  step={5000}
                  className="[&>span]:bg-amber-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('vinosDO.sliders.transitionMonths')}</span>
                  <span className="font-bold text-rose-400">{transitionMonths} {t('vinosDO.units.months')}</span>
                </div>
                <Slider
                  value={[transitionMonths]}
                  onValueChange={(v) => setTransitionMonths(v[0])}
                  min={12}
                  max={48}
                  step={3}
                  className="[&>span]:bg-rose-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-lime-950/40 p-4 rounded-xl border border-lime-800/30 text-center">
                <Leaf className="w-5 h-5 text-lime-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-lime-400 mb-1">{t('vinosDO.kpis.soilHealth')}</p>
                <p className="text-3xl font-black text-white">{calculations.soilHealth.toFixed(0)}%</p>
              </div>
              <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-800/30 text-center">
                <Grape className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-amber-400 mb-1">{t('vinosDO.kpis.marketPremium')}</p>
                <p className="text-3xl font-black text-white">+{calculations.premiumMargin}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-rose-900/30 h-full">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t('aria.name')}</p>
                <p className="text-xs text-slate-400">{t('vinosDO.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                  __html: t('vinosDO.aria.transitionDesc', {
                    months: transitionMonths,
                    soilHealth: calculations.soilHealth.toFixed(0),
                    chemicalReduction: calculations.chemicalReduction.toFixed(0)
                  })
                }} />
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Wine className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                  __html: t('vinosDO.aria.premiumDesc', { premium: calculations.premiumMargin })
                }} />
              </div>

              {calculations.zeroResidueAchieved && (
                <div className="flex items-start gap-3 p-3 bg-lime-950/30 rounded-lg border border-lime-800/30">
                  <Award className="w-4 h-4 text-lime-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-lime-300" dangerouslySetInnerHTML={{
                    __html: t('vinosDO.aria.zeroResidue')
                  }} />
                </div>
              )}
            </div>

            {calculations.scandinavianAccess && (
              <div className="bg-gradient-to-r from-rose-900/30 to-amber-900/30 p-4 rounded-xl border border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300 uppercase">{t('vinosDO.aria.nordicMarket')}</span>
                </div>
                <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                  __html: t('vinosDO.aria.projectedRevenue', { revenue: calculations.projectedRevenue.toLocaleString() })
                }} />
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{t('common.pontusX')}</span>
                <span className="font-mono text-rose-400">{pontusHash}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('vinosDO.downloadReport')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
