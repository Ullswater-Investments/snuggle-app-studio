import React, { useState, useMemo } from 'react';
import { Zap, TrendingDown, Coins, Gauge, Activity, FileText, BrainCircuit, Shield } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

interface GridFlexSimulatorProps {
  onValuesChange?: (values: { reductionCapacity: number; incentivePrice: number; earnings: number }) => void;
}

export const GridFlexSimulator = ({ onValuesChange }: GridFlexSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [reductionCapacity, setReductionCapacity] = useState(1500);
  const [incentivePrice, setIncentivePrice] = useState(300);

  const calculations = useMemo(() => {
    const monthlyIncentive = (reductionCapacity / 1000) * incentivePrice * 4;
    const annualIncentive = monthlyIncentive * 12;
    const gridReliability = Math.min(100, 85 + (reductionCapacity / 500));
    const eventsPerMonth = Math.min(8, Math.ceil(reductionCapacity / 500));
    const co2Avoided = (reductionCapacity * 0.4) / 1000;
    return { monthlyIncentive, annualIncentive, gridReliability, eventsPerMonth, co2Avoided };
  }, [reductionCapacity, incentivePrice]);

  const loadData = useMemo(() => [
    { name: t('gridFlex.baseLoad'), load: 100 },
    { name: t('gridFlex.activeReduction'), load: 100 - (reductionCapacity / 50) }
  ], [reductionCapacity, t]);

  const pontusHash = useMemo(() => {
    const base = (reductionCapacity + incentivePrice * 10).toString(16);
    return `0x${base.padStart(8, '0')}...flex_grid`;
  }, [reductionCapacity, incentivePrice]);

  React.useEffect(() => {
    onValuesChange?.({ reductionCapacity, incentivePrice, earnings: calculations.monthlyIncentive });
  }, [reductionCapacity, incentivePrice, calculations.monthlyIncentive, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Simulation Panel */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-purple-950/40 to-indigo-950/30 border-purple-500/20 shadow-2xl overflow-hidden p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-purple-400 font-bold text-sm">{t('gridflex.title')}</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className={calculations.gridReliability > 95 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
              {t('gridflex.stability')}: {calculations.gridReliability.toFixed(0)}%
            </Badge>
          </div>

          {/* Load Status Header */}
          <div className="bg-slate-900/80 rounded-2xl p-4 border border-purple-900/30 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-purple-400" />
                <span className="text-sm font-bold text-white uppercase">{t('gridflex.loadStatus')}</span>
              </div>
            </div>
            
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={loadData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} width={100} />
                  <Bar dataKey="load" radius={[0, 8, 8, 0]}>
                    {loadData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#6b7280' : '#a855f7'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* KPIs Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-800/30 text-center">
              <TrendingDown className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">{reductionCapacity.toLocaleString()}</p>
              <p className="text-[10px] text-purple-300 uppercase">{t('gridflex.kwReduction')}</p>
            </div>
            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/30 text-center">
              <Gauge className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">{incentivePrice}</p>
              <p className="text-[10px] text-indigo-300 uppercase">{t('gridflex.incentivePrice')}</p>
            </div>
            <div className="bg-fuchsia-950/40 p-4 rounded-xl border border-fuchsia-800/30 text-center">
              <Activity className="w-6 h-6 text-fuchsia-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">{calculations.eventsPerMonth}</p>
              <p className="text-[10px] text-fuchsia-300 uppercase">{t('gridflex.eventsMonth')}</p>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-purple-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{t('gridflex.reductionCapacity')}</span>
                <span className="font-bold text-purple-400">{reductionCapacity.toLocaleString()} kW</span>
              </div>
              <Slider value={[reductionCapacity]} onValueChange={(v) => setReductionCapacity(v[0])} min={50} max={5000} step={50} className="[&>span]:bg-purple-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{t('gridflex.priceIncentive')}</span>
                <span className="font-bold text-indigo-400">{incentivePrice} €/MWh</span>
              </div>
              <Slider value={[incentivePrice]} onValueChange={(v) => setIncentivePrice(v[0])} min={100} max={500} step={25} className="[&>span]:bg-indigo-600" />
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-5 rounded-2xl border border-purple-500/30">
            <p className="text-[10px] uppercase font-black text-purple-300 mb-2">{t('gridflex.monthlyIncentives')}</p>
            <p className="text-4xl font-black text-white">{calculations.monthlyIncentive.toLocaleString()} <span className="text-lg text-purple-400">EUROe</span></p>
            <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              BALANCE_STABILITY: OPTIMAL
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-purple-500/20 shadow-2xl h-full p-6">
          {/* ARIA Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">{t('gridflex.aria.role')}</p>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-purple-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">{t('gridflex.aria.monetizationTitle')}</p>
                  <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                    __html: t('gridflex.aria.monetizationDesc', {
                      kw: reductionCapacity.toLocaleString(),
                      earnings: calculations.monthlyIncentive.toLocaleString()
                    })
                  }} />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">{t('gridflex.aria.impactTitle')}</p>
                  <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                    __html: t('gridflex.aria.impactDesc', {
                      co2: calculations.co2Avoided.toFixed(1),
                      trees: Math.floor(calculations.co2Avoided * 50)
                    })
                  }} />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-indigo-900/30">
              <div className="flex items-start gap-3">
                <Coins className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">{t('gridflex.aria.projectionTitle')}</p>
                  <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                    __html: t('gridflex.aria.projectionDesc', {
                      annual: calculations.annualIncentive.toLocaleString()
                    })
                  }} />
                </div>
              </div>
            </div>

            {calculations.gridReliability >= 95 && (
              <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-bold text-purple-300">{t('gridflex.aria.premiumTitle')}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {t('gridflex.aria.premiumDesc', { reliability: calculations.gridReliability.toFixed(0) })}
                </p>
              </div>
            )}

            {reductionCapacity >= 3000 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">{t('gridflex.aria.largeConsumerTitle')}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {t('gridflex.aria.largeConsumerDesc', { mw: (reductionCapacity / 1000).toFixed(1) })}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[10px] font-mono text-slate-500 mb-3">{pontusHash}</p>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <FileText className="w-4 h-4 mr-2" />
              {t('gridflex.downloadCert')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
