import React, { useState, useMemo } from 'react';
import { Landmark, TrendingDown, Download, Sparkles, Clock, Percent } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, ReferenceLine } from 'recharts';
import { useTranslation } from 'react-i18next';

interface GreenFinanceESGSimulatorProps {
  onValuesChange?: (values: { loanAmount: number; dataFreshness: number; finalSpread: number; loanCostSaved: number }) => void;
}

export const GreenFinanceESGSimulator = ({ onValuesChange }: GreenFinanceESGSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [loanAmount, setLoanAmount] = useState(15);
  const [dataFreshness, setDataFreshness] = useState(3);

  const calculations = useMemo(() => {
    const baseSpread = 150;
    const freshnessDiscount = Math.max(0, 30 - (dataFreshness * 1.5));
    const finalSpread = baseSpread - freshnessDiscount;
    const loanCostSaved = loanAmount * 1000000 * (freshnessDiscount / 10000);
    const trustCurve = Math.max(50, 100 - (dataFreshness * 2.5));
    const approvalDays = Math.max(3, dataFreshness + 2);
    const greenBondEligible = dataFreshness <= 7 && freshnessDiscount >= 20;
    return { freshnessDiscount, finalSpread, loanCostSaved, trustCurve, approvalDays, greenBondEligible };
  }, [loanAmount, dataFreshness]);

  const chartData = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const days = i * 6;
      const trust = Math.max(50, 100 - (days * 2.5));
      const spread = 150 - Math.max(0, 30 - (days * 1.5));
      return { days: `D${days}`, trust, spread };
    });
  }, []);

  const pontusHash = useMemo(() => {
    return `0x${(loanAmount * dataFreshness * 1000).toString(16).slice(0, 8)}...${(calculations.finalSpread).toString(16).slice(0, 4)}`;
  }, [loanAmount, dataFreshness, calculations.finalSpread]);

  React.useEffect(() => {
    onValuesChange?.({
      loanAmount,
      dataFreshness,
      finalSpread: calculations.finalSpread,
      loanCostSaved: calculations.loanCostSaved
    });
  }, [loanAmount, dataFreshness, calculations, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-5">
        <Card className="bg-gradient-to-br from-emerald-950/40 to-slate-950/30 border-emerald-500/20 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/50 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{t('greenFinance.title')}</h3>
                  <p className="text-xs text-slate-400">{t('greenFinance.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-emerald-900/50 text-emerald-300 font-mono text-[10px]">{pontusHash}</Badge>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/20">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('greenFinance.chart.trustVsSpread')}</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="days" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 160]} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <ReferenceLine yAxisId="left" y={calculations.finalSpread} stroke="#f59e0b" strokeDasharray="5 5" />
                    <Line yAxisId="right" type="monotone" dataKey="trust" name={t('greenFinance.chart.trust')} stroke="#10b981" strokeWidth={2} dot={false} />
                    <Line yAxisId="left" type="monotone" dataKey="spread" name={t('greenFinance.chart.spread')} stroke="#64748b" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded"></span> {t('greenFinance.chart.trust')}</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-500 rounded"></span> {t('greenFinance.chart.spread')}</span>
                <span className="flex items-center gap-1"><span className="w-3 h-1 bg-amber-500"></span> {t('greenFinance.chart.yourPosition')}</span>
              </div>
            </div>

            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('greenFinance.sliders.loanAmount')}</span>
                  <span className="font-bold text-emerald-400">{loanAmount} M€</span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={(v) => setLoanAmount(v[0])}
                  min={1}
                  max={50}
                  step={1}
                  className="[&>span]:bg-emerald-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('greenFinance.sliders.dataFreshness')}</span>
                  <span className="font-bold text-slate-400">{dataFreshness} {t('greenFinance.units.days')}</span>
                </div>
                <Slider
                  value={[dataFreshness]}
                  onValueChange={(v) => setDataFreshness(v[0])}
                  min={1}
                  max={30}
                  step={1}
                  className="[&>span]:bg-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30 text-center">
                <TrendingDown className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">{t('greenFinance.kpis.spreadReduction')}</p>
                <p className="text-3xl font-black text-white">-{calculations.freshnessDiscount.toFixed(0)}</p>
                <p className="text-xs text-slate-400">{t('greenFinance.units.bps')}</p>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30 text-center">
                <Percent className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-slate-400 mb-1">{t('greenFinance.kpis.interestSavings')}</p>
                <p className="text-3xl font-black text-white">{calculations.loanCostSaved.toLocaleString()}</p>
                <p className="text-xs text-slate-400">{t('greenFinance.units.eurYear')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-emerald-900/30 h-full">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-slate-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t('aria.name')}</p>
                <p className="text-xs text-slate-400">{t('greenFinance.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                  __html: t('greenFinance.aria.freshnessDesc', {
                    days: dataFreshness,
                    reduction: calculations.freshnessDiscount.toFixed(0)
                  })
                }} />
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                  __html: t('greenFinance.aria.spreadDesc', {
                    spread: calculations.finalSpread,
                    savings: calculations.loanCostSaved.toLocaleString()
                  })
                }} />
              </div>

              {calculations.greenBondEligible ? (
                <div className="flex items-start gap-3 p-3 bg-emerald-950/30 rounded-lg border border-emerald-800/30">
                  <Landmark className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-emerald-300" dangerouslySetInnerHTML={{
                    __html: t('greenFinance.aria.greenBondEligible')
                  }} />
                </div>
              ) : (
                <div className="flex items-start gap-3 p-3 bg-amber-950/30 rounded-lg border border-amber-800/30">
                  <Clock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-300">
                    {t('greenFinance.aria.updateRecommendation')}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-emerald-900/30 to-slate-900/30 p-4 rounded-xl border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300 uppercase">{t('greenFinance.aria.approvalTime')}</span>
              </div>
              <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                __html: t('greenFinance.aria.approvalTimeDesc', {
                  estimated: calculations.approvalDays
                })
              }} />
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{t('common.pontusX')}</span>
                <span className="font-mono text-emerald-400">{pontusHash}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-slate-600 hover:from-emerald-700 hover:to-slate-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('greenFinance.downloadReport')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
