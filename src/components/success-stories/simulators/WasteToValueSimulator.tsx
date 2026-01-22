import React, { useState, useMemo, useEffect } from 'react';
import { Trash2, Sparkles, Download, Flame, Leaf } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

interface WasteToValueSimulatorProps {
  onValuesChange?: (values: { totalWaste: number; recoveryRate: number; cdrValue: number }) => void;
}

export const WasteToValueSimulator = ({ onValuesChange }: WasteToValueSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [totalWaste, setTotalWaste] = useState(3500);
  const [recoveryRate, setRecoveryRate] = useState(96);

  const calculations = useMemo(() => {
    const recovered = totalWaste * (recoveryRate / 100);
    const landfillDiverted = recovered;
    const cdrProduced = recovered * 0.4;
    const materialRecycled = recovered * 0.45;
    const compost = recovered * 0.15;
    const cdrValue = cdrProduced * 45;
    const recycledValue = materialRecycled * 120;
    const totalValue = cdrValue + recycledValue;
    const zeroWasteScore = recoveryRate >= 99.9 ? t('wasteToValue.scores.excellence') : recoveryRate >= 95 ? t('wasteToValue.scores.advanced') : t('wasteToValue.scores.inProgress');
    const landfillPercent = 100 - recoveryRate;
    
    return { 
      recovered, landfillDiverted, cdrProduced, materialRecycled, compost,
      cdrValue, recycledValue, totalValue, zeroWasteScore, landfillPercent 
    };
  }, [totalWaste, recoveryRate, t]);

  const funnelData = useMemo(() => [
    { name: t('wasteToValue.funnel.generation'), value: totalWaste, fill: '#64748B' },
    { name: t('wasteToValue.funnel.sorting'), value: totalWaste * 0.98, fill: '#F97316' },
    { name: t('wasteToValue.funnel.valorization'), value: calculations.recovered, fill: '#22C55E' },
    { name: t('wasteToValue.funnel.cdrRecycling'), value: calculations.cdrProduced + calculations.materialRecycled, fill: '#10B981' },
  ], [totalWaste, calculations, t]);

  const pontusHash = useMemo(() => {
    const base = Math.floor(totalWaste * recoveryRate * 1.89);
    return `0x${base.toString(16).padStart(8, '0')}...${(base % 9999).toString(16)}`;
  }, [totalWaste, recoveryRate]);

  useEffect(() => {
    onValuesChange?.({ totalWaste, recoveryRate, cdrValue: calculations.cdrValue });
  }, [totalWaste, recoveryRate, calculations.cdrValue, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Interactive Simulator */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-orange-950/40 to-green-950/30 border-orange-500/20 shadow-2xl overflow-hidden h-full">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Trash2 className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('wasteToValue.title')}</h3>
                  <p className="text-xs text-slate-400">{t('wasteToValue.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-mono text-xs">
                {pontusHash}
              </Badge>
            </div>

            {/* Funnel Chart */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-orange-900/30">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('wasteToValue.funnelTitle')}</p>
              <ResponsiveContainer width="100%" height={200}>
                <FunnelChart>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toLocaleString()} t`, '']}
                  />
                  <Funnel
                    dataKey="value"
                    data={funnelData}
                    isAnimationActive
                  >
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <LabelList 
                      position="right" 
                      fill="#fff" 
                      stroke="none" 
                      dataKey="name"
                      fontSize={11}
                    />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>

            {/* Sliders */}
            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-orange-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('wasteToValue.sliders.totalWaste')}</span>
                  <span className="font-bold text-orange-400">{totalWaste.toLocaleString()} t</span>
                </div>
                <Slider
                  value={[totalWaste]}
                  onValueChange={(v) => setTotalWaste(v[0])}
                  min={100}
                  max={10000}
                  step={100}
                  className="[&>span]:bg-orange-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('wasteToValue.sliders.recoveryRate')}</span>
                  <span className="font-bold text-green-400">{recoveryRate}%</span>
                </div>
                <Slider
                  value={[recoveryRate]}
                  onValueChange={(v) => setRecoveryRate(v[0])}
                  min={50}
                  max={99.9}
                  step={0.1}
                  className="[&>span]:bg-green-600"
                />
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-orange-950/40 p-3 rounded-xl border border-orange-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-orange-400 mb-1">{t('wasteToValue.kpis.cdr')}</p>
                <p className="text-lg font-black text-white">{calculations.cdrProduced.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">{t('wasteToValue.tons')}</p>
              </div>
              <div className="bg-green-950/40 p-3 rounded-xl border border-green-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-green-400 mb-1">{t('wasteToValue.kpis.recycled')}</p>
                <p className="text-lg font-black text-white">{calculations.materialRecycled.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">{t('wasteToValue.tons')}</p>
              </div>
              <div className="bg-lime-950/40 p-3 rounded-xl border border-lime-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-lime-400 mb-1">{t('wasteToValue.kpis.compost')}</p>
                <p className="text-lg font-black text-white">{calculations.compost.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">{t('wasteToValue.tons')}</p>
              </div>
              <div className="bg-red-950/40 p-3 rounded-xl border border-red-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-red-400 mb-1">{t('wasteToValue.kpis.landfill')}</p>
                <p className="text-lg font-black text-white">{calculations.landfillPercent.toFixed(1)}%</p>
                <p className="text-[10px] text-slate-400">{t('wasteToValue.minimum')}</p>
              </div>
            </div>

            {/* Total Value */}
            <div className="bg-gradient-to-r from-orange-900/50 to-green-900/50 p-5 rounded-2xl border border-green-500/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black text-green-300 mb-2">{t('wasteToValue.totalValue')}</p>
                  <p className="text-3xl font-black text-white">€{calculations.totalValue.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={`${
                    calculations.zeroWasteScore === t('wasteToValue.scores.excellence') ? 'bg-emerald-500/20 text-emerald-300' :
                    calculations.zeroWasteScore === t('wasteToValue.scores.advanced') ? 'bg-green-500/20 text-green-300' :
                    'bg-amber-500/20 text-amber-300'
                  }`}>
                    {calculations.zeroWasteScore}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-orange-500/20 shadow-2xl h-full">
          <CardContent className="p-6 space-y-5">
            {/* ARIA Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/25">
                A
              </div>
              <div>
                <p className="text-white font-semibold">{t('aria.name')}</p>
                <p className="text-xs text-orange-400">{t('wasteToValue.aria.role')}</p>
              </div>
            </div>

            {/* Dynamic Insights */}
            <div className="space-y-4">
              <div className="bg-green-950/30 rounded-xl p-4 border border-green-800/30">
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('wasteToValue.aria.zeroWasteTitle')}</p>
                    <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                      __html: t('wasteToValue.aria.zeroWasteDesc', {
                        rate: recoveryRate,
                        score: calculations.zeroWasteScore
                      })
                    }} />
                  </div>
                </div>
              </div>

              <div className="bg-orange-950/30 rounded-xl p-4 border border-orange-800/30">
                <div className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('wasteToValue.aria.cdrTitle')}</p>
                    <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                      __html: t('wasteToValue.aria.cdrDesc', {
                        cdr: calculations.cdrProduced.toLocaleString(),
                        value: calculations.cdrValue.toLocaleString()
                      })
                    }} />
                  </div>
                </div>
              </div>

              {recoveryRate >= 99 && (
                <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium mb-1">{t('wasteToValue.aria.excellenceTitle')}</p>
                      <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                        __html: t('wasteToValue.aria.excellenceDesc', { rate: recoveryRate })
                      }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quote ARIA */}
            <div className="bg-gradient-to-r from-orange-900/30 to-green-900/30 rounded-xl p-4 border border-orange-500/20">
              <p className="text-sm text-slate-300 italic leading-relaxed" dangerouslySetInnerHTML={{
                __html: t('wasteToValue.aria.quote', {
                  waste: totalWaste.toLocaleString(),
                  diverted: calculations.landfillDiverted.toLocaleString(),
                  value: calculations.totalValue.toLocaleString(),
                  co2: Math.round(calculations.recovered * 0.5)
                })
              }} />
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500">{t('common.pontusVerified')}</p>
                <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-400 font-mono">
                  {pontusHash}
                </Badge>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-500 hover:to-green-500 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('wasteToValue.downloadCert')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
