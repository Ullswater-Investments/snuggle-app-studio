import React, { useState, useMemo, useEffect } from 'react';
import { Gem, Sparkles, Download, ShieldCheck, TrendingUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { useTranslation } from 'react-i18next';

interface UrbanMiningSimulatorProps {
  onValuesChange?: (values: { oreWeight: number; refiningEfficiency: number; totalValue: number }) => void;
}

export const UrbanMiningSimulator = ({ onValuesChange }: UrbanMiningSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [oreWeight, setOreWeight] = useState(120);
  const [refiningEfficiency, setRefiningEfficiency] = useState(92);

  const calculations = useMemo(() => {
    const goldExtracted = oreWeight * 0.0015 * (refiningEfficiency / 100);
    const palladiumExtracted = oreWeight * 0.0008 * (refiningEfficiency / 100);
    const goldValue = goldExtracted * 1000 * 62;
    const palladiumValue = palladiumExtracted * 1000 * 35;
    const totalValue = goldValue + palladiumValue;
    const oecdCertified = refiningEfficiency >= 95;
    const blockNumber = Math.floor(20000 + oreWeight * refiningEfficiency * 0.17);
    
    return { goldExtracted, palladiumExtracted, goldValue, palladiumValue, totalValue, oecdCertified, blockNumber };
  }, [oreWeight, refiningEfficiency]);

  const scatterData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 15; i++) {
      data.push({
        purity: 70 + Math.random() * 30,
        traceability: 60 + Math.random() * 40,
        value: Math.random() * calculations.totalValue * 0.2,
        certified: Math.random() > 0.3,
      });
    }
    data.push({
      purity: refiningEfficiency,
      traceability: 95,
      value: calculations.totalValue * 0.3,
      certified: true,
      current: true,
    });
    return data;
  }, [refiningEfficiency, calculations.totalValue]);

  const pontusHash = useMemo(() => {
    const base = Math.floor(oreWeight * refiningEfficiency * 4.56);
    return `0x${base.toString(16).padStart(8, '0')}...${(base % 9999).toString(16)}`;
  }, [oreWeight, refiningEfficiency]);

  useEffect(() => {
    onValuesChange?.({ oreWeight, refiningEfficiency, totalValue: calculations.totalValue });
  }, [oreWeight, refiningEfficiency, calculations.totalValue, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Interactive Simulator */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-yellow-950/40 to-slate-900/50 border-yellow-500/20 shadow-2xl overflow-hidden h-full">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Gem className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('urbanMining.title')}</h3>
                  <p className="text-xs text-slate-400">{t('urbanMining.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 font-mono text-xs">
                {pontusHash}
              </Badge>
            </div>

            {/* Scatter Chart */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-yellow-900/30">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('urbanMining.chartTitle')}</p>
              <ResponsiveContainer width="100%" height={200}>
                <ScatterChart>
                  <XAxis 
                    type="number" 
                    dataKey="purity" 
                    name={t('urbanMining.chart.purity')}
                    domain={[60, 100]}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    label={{ value: t('urbanMining.chart.purityLabel'), position: 'bottom', fill: '#64748b', fontSize: 10 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="traceability" 
                    name={t('urbanMining.chart.traceability')}
                    domain={[50, 100]}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    label={{ value: t('urbanMining.chart.traceability'), angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }}
                  />
                  <ZAxis type="number" dataKey="value" range={[50, 400]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number, name: string) => [
                      name === 'purity' ? `${value.toFixed(1)}%` : 
                      name === 'traceability' ? `${value.toFixed(0)}%` : 
                      `€${value.toLocaleString()}`,
                      name === 'purity' ? t('urbanMining.chart.purity') : name === 'traceability' ? t('urbanMining.chart.traceability') : t('urbanMining.chart.value')
                    ]}
                  />
                  <Scatter name={t('urbanMining.chart.batches')} data={scatterData}>
                    {scatterData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={(entry as any).current ? '#EAB308' : entry.certified ? '#10B981' : '#64748B'} 
                        stroke={(entry as any).current ? '#FDE047' : 'none'}
                        strokeWidth={(entry as any).current ? 3 : 0}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Sliders */}
            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-yellow-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('urbanMining.sliders.wasteWeight')}</span>
                  <span className="font-bold text-yellow-400">{oreWeight} {t('urbanMining.tons')}</span>
                </div>
                <Slider
                  value={[oreWeight]}
                  onValueChange={(v) => setOreWeight(v[0])}
                  min={10}
                  max={500}
                  step={10}
                  className="[&>span]:bg-yellow-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('urbanMining.sliders.refiningEfficiency')}</span>
                  <span className="font-bold text-slate-400">{refiningEfficiency}%</span>
                </div>
                <Slider
                  value={[refiningEfficiency]}
                  onValueChange={(v) => setRefiningEfficiency(v[0])}
                  min={70}
                  max={99}
                  step={1}
                  className="[&>span]:bg-slate-600"
                />
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-950/40 p-4 rounded-xl border border-yellow-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-yellow-400 mb-1">{t('urbanMining.kpis.goldExtracted')}</p>
                <p className="text-2xl font-black text-white">{(calculations.goldExtracted * 1000).toFixed(0)}</p>
                <p className="text-xs text-slate-400">{t('urbanMining.grams')}</p>
                <p className="text-sm font-bold text-yellow-400 mt-1">€{calculations.goldValue.toLocaleString()}</p>
              </div>
              <div className="bg-violet-950/40 p-4 rounded-xl border border-violet-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-violet-400 mb-1">{t('urbanMining.kpis.palladiumExtracted')}</p>
                <p className="text-2xl font-black text-white">{(calculations.palladiumExtracted * 1000).toFixed(0)}</p>
                <p className="text-xs text-slate-400">{t('urbanMining.grams')}</p>
                <p className="text-sm font-bold text-violet-400 mt-1">€{calculations.palladiumValue.toLocaleString()}</p>
              </div>
            </div>

            {/* Total Value */}
            <div className="bg-gradient-to-r from-yellow-900/50 to-slate-800/50 p-5 rounded-2xl border border-yellow-500/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black text-yellow-300 mb-2">{t('urbanMining.totalRecovered')}</p>
                  <p className="text-3xl font-black text-white">€{calculations.totalValue.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={`${calculations.oecdCertified ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {calculations.oecdCertified ? t('urbanMining.oecdCertified') : t('urbanMining.oecdPending')}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-yellow-500/20 shadow-2xl h-full">
          <CardContent className="p-6 space-y-5">
            {/* ARIA Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-slate-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-yellow-500/25">
                A
              </div>
              <div>
                <p className="text-white font-semibold">{t('aria.name')}</p>
                <p className="text-xs text-yellow-400">{t('urbanMining.aria.role')}</p>
              </div>
            </div>

            {/* Dynamic Insights */}
            <div className="space-y-4">
              <div className="bg-yellow-950/30 rounded-xl p-4 border border-yellow-800/30">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('urbanMining.aria.certificationTitle')}</p>
                    <p className="text-xs text-slate-400">
                      {calculations.oecdCertified ? (
                        <span dangerouslySetInnerHTML={{
                          __html: t('urbanMining.aria.certifiedDesc', {
                            gold: (calculations.goldExtracted * 1000).toFixed(0),
                            block: calculations.blockNumber
                          })
                        }} />
                      ) : (
                        t('urbanMining.aria.pendingDesc')
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('urbanMining.aria.dueDiligenceTitle')}</p>
                    <p className="text-xs text-slate-400">{t('urbanMining.aria.dueDiligenceDesc')}</p>
                  </div>
                </div>
              </div>

              {refiningEfficiency >= 95 && (
                <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium mb-1">{t('urbanMining.aria.excellenceTitle')}</p>
                      <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                        __html: t('urbanMining.aria.excellenceDesc', { efficiency: refiningEfficiency })
                      }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quote ARIA */}
            <div className="bg-gradient-to-r from-yellow-900/30 to-slate-800/30 rounded-xl p-4 border border-yellow-500/20">
              <p className="text-sm text-slate-300 italic leading-relaxed" dangerouslySetInnerHTML={{
                __html: t('urbanMining.aria.quote', {
                  weight: oreWeight,
                  gold: (calculations.goldExtracted * 1000).toFixed(0),
                  palladium: (calculations.palladiumExtracted * 1000).toFixed(0),
                  total: calculations.totalValue.toLocaleString()
                })
              }} />
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500">{t('common.pontusVerified')}</p>
                <Badge variant="outline" className="text-[10px] border-yellow-500/30 text-yellow-400 font-mono">
                  {pontusHash}
                </Badge>
              </div>
              <Button className="w-full bg-gradient-to-r from-yellow-600 to-slate-600 hover:from-yellow-500 hover:to-slate-500 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('urbanMining.downloadCert')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
