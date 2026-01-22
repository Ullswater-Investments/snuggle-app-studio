import React, { useState, useMemo, useEffect } from 'react';
import { Settings, Sparkles, Download, Recycle, TrendingDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

interface EcoOrchestratorSimulatorProps {
  onValuesChange?: (values: { recyclabilityScore: number; marketVolume: number; savings: number }) => void;
}

export const EcoOrchestratorSimulator = ({ onValuesChange }: EcoOrchestratorSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [recyclabilityScore, setRecyclabilityScore] = useState(75);
  const [marketVolume, setMarketVolume] = useState(25000);

  const calculations = useMemo(() => {
    const baseEcotax = marketVolume * 0.35;
    const discount = recyclabilityScore >= 80 ? 0.15 : recyclabilityScore >= 60 ? 0.08 : 0;
    const finalEcotax = baseEcotax * (1 - discount);
    const savings = baseEcotax - finalEcotax;
    const ecoEfficiency = Math.min(100, recyclabilityScore * 1.1);
    const discountPercent = Math.round(discount * 100);
    
    return { baseEcotax, discount, discountPercent, finalEcotax, savings, ecoEfficiency };
  }, [recyclabilityScore, marketVolume]);

  const radarData = useMemo(() => [
    { subject: t('ecoOrchestrator.radar.monoMaterial'), score: recyclabilityScore >= 80 ? 95 : recyclabilityScore, fullMark: 100 },
    { subject: t('ecoOrchestrator.radar.disassembly'), score: Math.min(100, recyclabilityScore * 0.9), fullMark: 100 },
    { subject: t('ecoOrchestrator.radar.reuse'), score: Math.min(100, recyclabilityScore * 0.85), fullMark: 100 },
    { subject: t('ecoOrchestrator.radar.recyclability'), score: recyclabilityScore, fullMark: 100 },
    { subject: t('ecoOrchestrator.radar.materials'), score: Math.min(100, recyclabilityScore * 1.05), fullMark: 100 },
    { subject: t('ecoOrchestrator.radar.traceability'), score: 95, fullMark: 100 },
  ], [recyclabilityScore, t]);

  const pontusHash = useMemo(() => {
    const base = Math.floor(recyclabilityScore * marketVolume * 0.47);
    return `0x${base.toString(16).padStart(8, '0')}...${(base % 9999).toString(16)}`;
  }, [recyclabilityScore, marketVolume]);

  useEffect(() => {
    onValuesChange?.({ recyclabilityScore, marketVolume, savings: calculations.savings });
  }, [recyclabilityScore, marketVolume, calculations.savings, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Interactive Simulator */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-lime-950/40 to-green-950/30 border-lime-500/20 shadow-2xl overflow-hidden h-full">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-lime-500/20 rounded-lg">
                  <Settings className="w-6 h-6 text-lime-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('ecoOrchestrator.title')}</h3>
                  <p className="text-xs text-slate-400">{t('ecoOrchestrator.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-lime-500/20 text-lime-300 border-lime-500/30 font-mono text-xs">
                {pontusHash}
              </Badge>
            </div>

            {/* Radar Chart */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-lime-900/30">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('ecoOrchestrator.chartTitle')}</p>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 8 }} />
                  <Radar
                    name={t('ecoOrchestrator.score')}
                    dataKey="score"
                    stroke="#84CC16"
                    fill="#84CC16"
                    fillOpacity={0.4}
                    strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Sliders */}
            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-lime-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('ecoOrchestrator.sliders.recyclabilityScore')}</span>
                  <span className="font-bold text-lime-400">{recyclabilityScore}/100</span>
                </div>
                <Slider
                  value={[recyclabilityScore]}
                  onValueChange={(v) => setRecyclabilityScore(v[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="[&>span]:bg-lime-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('ecoOrchestrator.sliders.marketVolume')}</span>
                  <span className="font-bold text-green-400">{marketVolume.toLocaleString()} kg</span>
                </div>
                <Slider
                  value={[marketVolume]}
                  onValueChange={(v) => setMarketVolume(v[0])}
                  min={1000}
                  max={100000}
                  step={1000}
                  className="[&>span]:bg-green-600"
                />
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{t('ecoOrchestrator.kpis.baseEcotax')}</p>
                <p className="text-xl font-black text-white">€{(calculations.baseEcotax / 1000).toFixed(1)}k</p>
                <p className="text-[10px] text-slate-400">{t('ecoOrchestrator.quarterly')}</p>
              </div>
              <div className="bg-lime-950/40 p-3 rounded-xl border border-lime-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-lime-400 mb-1">{t('ecoOrchestrator.kpis.bonus')}</p>
                <p className="text-xl font-black text-white">{calculations.discountPercent}%</p>
                <p className="text-[10px] text-slate-400">{t('ecoOrchestrator.discount')}</p>
              </div>
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">{t('ecoOrchestrator.kpis.savings')}</p>
                <p className="text-xl font-black text-white">€{(calculations.savings / 1000).toFixed(1)}k</p>
                <p className="text-[10px] text-slate-400">{t('ecoOrchestrator.quarterly')}</p>
              </div>
            </div>

            {/* Final Ecotax */}
            <div className="bg-gradient-to-r from-lime-900/50 to-green-900/50 p-5 rounded-2xl border border-lime-500/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black text-lime-300 mb-2">{t('ecoOrchestrator.finalEcotax')}</p>
                  <p className="text-3xl font-black text-white">€{calculations.finalEcotax.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-lime-500/20 text-lime-300">SCRAP</Badge>
                  <Badge className="bg-green-500/20 text-green-300">-{calculations.discountPercent}%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-lime-500/20 shadow-2xl h-full">
          <CardContent className="p-6 space-y-5">
            {/* ARIA Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-lime-500/25">
                A
              </div>
              <div>
                <p className="text-white font-semibold">{t('aria.name')}</p>
                <p className="text-xs text-lime-400">{t('ecoOrchestrator.aria.role')}</p>
              </div>
            </div>

            {/* Dynamic Insights */}
            <div className="space-y-4">
              <div className="bg-lime-950/30 rounded-xl p-4 border border-lime-800/30">
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('ecoOrchestrator.aria.bonusTitle')}</p>
                    <p className="text-xs text-slate-400">
                      {calculations.discountPercent > 0 ? (
                        <span dangerouslySetInnerHTML={{
                          __html: t('ecoOrchestrator.aria.bonusDesc', {
                            type: recyclabilityScore >= 80 ? t('ecoOrchestrator.aria.monoMaterial') : t('ecoOrchestrator.aria.optimized'),
                            discount: calculations.discountPercent
                          })
                        }} />
                      ) : (
                        t('ecoOrchestrator.aria.noBonus')
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-950/30 rounded-xl p-4 border border-green-800/30">
                <div className="flex items-start gap-3">
                  <Recycle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('ecoOrchestrator.aria.designTitle')}</p>
                    <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                      __html: t('ecoOrchestrator.aria.designDesc', {
                        recyclability: recyclabilityScore,
                        efficiency: Math.round(calculations.ecoEfficiency)
                      })
                    }} />
                  </div>
                </div>
              </div>

              {recyclabilityScore >= 80 && (
                <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium mb-1">{t('ecoOrchestrator.aria.excellenceTitle')}</p>
                      <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                        __html: t('ecoOrchestrator.aria.excellenceDesc', { score: recyclabilityScore })
                      }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quote ARIA */}
            <div className="bg-gradient-to-r from-lime-900/30 to-green-900/30 rounded-xl p-4 border border-lime-500/20">
              <p className="text-sm text-slate-300 italic leading-relaxed" dangerouslySetInnerHTML={{
                __html: t('ecoOrchestrator.aria.quote', {
                  volume: marketVolume.toLocaleString(),
                  recyclability: recyclabilityScore,
                  savings: calculations.savings.toLocaleString()
                })
              }} />
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500">{t('common.pontusVerified')}</p>
                <Badge variant="outline" className="text-[10px] border-lime-500/30 text-lime-400 font-mono">
                  {pontusHash}
                </Badge>
              </div>
              <Button className="w-full bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-500 hover:to-green-500 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('ecoOrchestrator.downloadReport')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
