import React, { useState, useMemo, useEffect } from 'react';
import { Cpu, Sparkles, Download, Gem, TrendingUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

interface RareEarthRecoverSimulatorProps {
  onValuesChange?: (values: { kgPlates: number; extractionYield: number; totalValue: number }) => void;
}

export const RareEarthRecoverSimulator = ({ onValuesChange }: RareEarthRecoverSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [kgPlates, setKgPlates] = useState(2500);
  const [extractionYield, setExtractionYield] = useState(88);

  const calculations = useMemo(() => {
    const goldGrams = kgPlates * 0.35 * (extractionYield / 100);
    const neodymiumGrams = kgPlates * 2.1 * (extractionYield / 100);
    const palladiumGrams = kgPlates * 0.12 * (extractionYield / 100);
    const copperKg = kgPlates * 0.15 * (extractionYield / 100);
    
    const goldValue = goldGrams * 62;
    const neodymiumValue = neodymiumGrams * 0.12;
    const palladiumValue = palladiumGrams * 35;
    const copperValue = copperKg * 8.5;
    
    const totalValue = goldValue + neodymiumValue + palladiumValue + copperValue;
    const premiumIncrease = extractionYield > 90 ? 45 : Math.round((extractionYield - 70) * 1.5);
    
    return { 
      goldGrams, neodymiumGrams, palladiumGrams, copperKg,
      goldValue, neodymiumValue, palladiumValue, copperValue,
      totalValue, premiumIncrease 
    };
  }, [kgPlates, extractionYield]);

  const chartData = useMemo(() => [
    { name: t('rareEarth.chart.gold'), value: calculations.goldValue, color: '#EAB308' },
    { name: t('rareEarth.chart.palladium'), value: calculations.palladiumValue, color: '#A855F7' },
    { name: t('rareEarth.chart.neodymium'), value: calculations.neodymiumValue, color: '#10B981' },
    { name: t('rareEarth.chart.copper'), value: calculations.copperValue, color: '#F97316' },
  ], [calculations, t]);

  const pontusHash = useMemo(() => {
    const base = Math.floor(kgPlates * extractionYield * 3.14);
    return `0x${base.toString(16).padStart(8, '0')}...${(base % 9999).toString(16)}`;
  }, [kgPlates, extractionYield]);

  useEffect(() => {
    onValuesChange?.({ kgPlates, extractionYield, totalValue: calculations.totalValue });
  }, [kgPlates, extractionYield, calculations.totalValue, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Interactive Simulator */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-amber-950/40 to-emerald-950/30 border-amber-500/20 shadow-2xl overflow-hidden h-full">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Cpu className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('rareEarth.title')}</h3>
                  <p className="text-xs text-slate-400">{t('rareEarth.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-mono text-xs">
                {pontusHash}
              </Badge>
            </div>

            {/* Treemap/Pie Chart */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-amber-900/30">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('rareEarth.chartTitle')}</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-slate-300 text-xs">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Sliders */}
            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-amber-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('rareEarth.sliders.platesProcessed')}</span>
                  <span className="font-bold text-amber-400">{kgPlates.toLocaleString()} kg</span>
                </div>
                <Slider
                  value={[kgPlates]}
                  onValueChange={(v) => setKgPlates(v[0])}
                  min={100}
                  max={10000}
                  step={100}
                  className="[&>span]:bg-amber-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('rareEarth.sliders.extractionYield')}</span>
                  <span className="font-bold text-emerald-400">{extractionYield}%</span>
                </div>
                <Slider
                  value={[extractionYield]}
                  onValueChange={(v) => setExtractionYield(v[0])}
                  min={70}
                  max={99}
                  step={1}
                  className="[&>span]:bg-emerald-600"
                />
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-yellow-950/40 p-3 rounded-xl border border-yellow-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-yellow-400 mb-1">{t('rareEarth.kpis.gold')}</p>
                <p className="text-lg font-black text-white">{calculations.goldGrams.toFixed(1)}</p>
                <p className="text-[10px] text-slate-400">{t('rareEarth.grams')}</p>
              </div>
              <div className="bg-violet-950/40 p-3 rounded-xl border border-violet-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-violet-400 mb-1">{t('rareEarth.kpis.palladium')}</p>
                <p className="text-lg font-black text-white">{calculations.palladiumGrams.toFixed(1)}</p>
                <p className="text-[10px] text-slate-400">{t('rareEarth.grams')}</p>
              </div>
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">{t('rareEarth.kpis.neodymium')}</p>
                <p className="text-lg font-black text-white">{calculations.neodymiumGrams.toFixed(0)}</p>
                <p className="text-[10px] text-slate-400">{t('rareEarth.grams')}</p>
              </div>
              <div className="bg-orange-950/40 p-3 rounded-xl border border-orange-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-orange-400 mb-1">{t('rareEarth.kpis.copper')}</p>
                <p className="text-lg font-black text-white">{calculations.copperKg.toFixed(0)}</p>
                <p className="text-[10px] text-slate-400">kg</p>
              </div>
            </div>

            {/* Total Value */}
            <div className="bg-gradient-to-r from-amber-900/50 to-emerald-900/50 p-5 rounded-2xl border border-amber-500/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black text-amber-300 mb-2">{t('rareEarth.totalRecovered')}</p>
                  <p className="text-3xl font-black text-white">€{calculations.totalValue.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-amber-500/20 text-amber-300">RAEE</Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-300">+{calculations.premiumIncrease}%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-amber-500/20 shadow-2xl h-full">
          <CardContent className="p-6 space-y-5">
            {/* ARIA Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/25">
                A
              </div>
              <div>
                <p className="text-white font-semibold">{t('aria.name')}</p>
                <p className="text-xs text-amber-400">{t('rareEarth.aria.role')}</p>
              </div>
            </div>

            {/* Dynamic Insights */}
            <div className="space-y-4">
              <div className="bg-amber-950/30 rounded-xl p-4 border border-amber-800/30">
                <div className="flex items-start gap-3">
                  <Gem className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('rareEarth.aria.purityTitle')}</p>
                    <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                      __html: t('rareEarth.aria.purityDesc', { premium: calculations.premiumIncrease })
                    }} />
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('rareEarth.aria.weeeTitle')}</p>
                    <p className="text-xs text-slate-400">{t('rareEarth.aria.weeeDesc')}</p>
                  </div>
                </div>
              </div>

              {extractionYield >= 95 && (
                <div className="bg-violet-950/30 rounded-xl p-4 border border-violet-800/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium mb-1">{t('rareEarth.aria.exceptionalTitle')}</p>
                      <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                        __html: t('rareEarth.aria.exceptionalDesc', { yield: extractionYield })
                      }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quote ARIA */}
            <div className="bg-gradient-to-r from-amber-900/30 to-emerald-900/30 rounded-xl p-4 border border-amber-500/20">
              <p className="text-sm text-slate-300 italic leading-relaxed" dangerouslySetInnerHTML={{
                __html: t('rareEarth.aria.quote', {
                  kg: kgPlates.toLocaleString(),
                  gold: calculations.goldGrams.toFixed(1),
                  total: calculations.totalValue.toLocaleString()
                })
              }} />
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500">{t('common.pontusVerified')}</p>
                <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-400 font-mono">
                  {pontusHash}
                </Badge>
              </div>
              <Button className="w-full bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('rareEarth.downloadCert')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
