import React, { useState, useMemo, useEffect } from 'react';
import { Recycle, Sparkles, Download, Leaf, ShieldCheck } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

interface FiberLoopSimulatorProps {
  onValuesChange?: (values: { tonsCollected: number; shreddingEfficiency: number; netFiber: number }) => void;
}

export const FiberLoopSimulator = ({ onValuesChange }: FiberLoopSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [tonsCollected, setTonsCollected] = useState(1000);
  const [shreddingEfficiency, setShreddingEfficiency] = useState(85);
  
  const calculations = useMemo(() => {
    const netFiber = tonsCollected * (shreddingEfficiency / 100);
    const wastedFiber = tonsCollected - netFiber;
    const taxSaving = tonsCollected * 0.45 * 1000;
    const revenueBoost = netFiber * 1.75 * 1000;
    const circularityIndex = shreddingEfficiency >= 90 ? 'A+' : shreddingEfficiency >= 75 ? 'A' : 'B';
    
    return { netFiber, wastedFiber, taxSaving, revenueBoost, circularityIndex };
  }, [tonsCollected, shreddingEfficiency]);

  const chartData = useMemo(() => [
    { name: t('fiberLoop.chart.recycledFiber'), value: calculations.netFiber, color: '#10B981' },
    { name: t('fiberLoop.chart.virginAvoided'), value: calculations.netFiber * 0.92, color: '#8B5CF6' },
    { name: t('fiberLoop.chart.nonRecoverable'), value: calculations.wastedFiber, color: '#64748B' },
  ], [calculations, t]);

  const pontusHash = useMemo(() => {
    const base = Math.floor(tonsCollected * shreddingEfficiency * 7.23);
    return `0x${base.toString(16).padStart(8, '0')}...${(base % 9999).toString(16)}`;
  }, [tonsCollected, shreddingEfficiency]);

  useEffect(() => {
    onValuesChange?.({ 
      tonsCollected, 
      shreddingEfficiency, 
      netFiber: calculations.netFiber 
    });
  }, [tonsCollected, shreddingEfficiency, calculations.netFiber, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-emerald-950/40 to-violet-950/30 border-emerald-500/20 shadow-2xl overflow-hidden h-full">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Recycle className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('fiberLoop.title')}</h3>
                  <p className="text-xs text-slate-400">{t('fiberLoop.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
                {pontusHash}
              </Badge>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('fiberLoop.chart.composition')}</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} width={120} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                    formatter={(value: number) => [`${value.toLocaleString()} t`, '']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('fiberLoop.sliders.tonsCollected')}</span>
                  <span className="font-bold text-emerald-400">{tonsCollected.toLocaleString()} t</span>
                </div>
                <Slider
                  value={[tonsCollected]}
                  onValueChange={(v) => setTonsCollected(v[0])}
                  min={10}
                  max={5000}
                  step={50}
                  className="[&>span]:bg-emerald-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('fiberLoop.sliders.shreddingEfficiency')}</span>
                  <span className="font-bold text-violet-400">{shreddingEfficiency}%</span>
                </div>
                <Slider
                  value={[shreddingEfficiency]}
                  onValueChange={(v) => setShreddingEfficiency(v[0])}
                  min={50}
                  max={98}
                  step={1}
                  className="[&>span]:bg-violet-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">{t('fiberLoop.kpis.netFiber')}</p>
                <p className="text-xl font-black text-white">{calculations.netFiber.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">{t('fiberLoop.kpis.tons')}</p>
              </div>
              <div className="bg-violet-950/40 p-3 rounded-xl border border-violet-800/30 text-center">
                <p className="text-[10px] uppercase font-bold text-violet-400 mb-1">{t('fiberLoop.kpis.circularIndex')}</p>
                <p className="text-xl font-black text-white">{calculations.circularityIndex}</p>
                <p className="text-[10px] text-slate-400">{t('fiberLoop.kpis.dppCertified')}</p>
              </div>
              <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{t('fiberLoop.kpis.premium')}</p>
                <p className="text-xl font-black text-emerald-400">+75%</p>
                <p className="text-[10px] text-slate-400">{t('fiberLoop.kpis.vsVirgin')}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-900/50 to-violet-900/50 p-5 rounded-2xl border border-emerald-500/30">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black text-emerald-300 mb-2">{t('fiberLoop.kpis.certifiedValue')}</p>
                  <p className="text-3xl font-black text-white">{calculations.revenueBoost.toLocaleString()} <span className="text-lg text-emerald-400">EUROe</span></p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-emerald-500/20 text-emerald-300">RAP</Badge>
                  <Badge className="bg-violet-500/20 text-violet-300">Blockchain</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-emerald-500/20 shadow-2xl h-full">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/25">
                A
              </div>
              <div>
                <p className="text-white font-semibold">{t('aria.name')}</p>
                <p className="text-xs text-emerald-400">{t('fiberLoop.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('fiberLoop.aria.taxAvoided')}</p>
                    <p className="text-xs text-slate-400">
                      {t('fiberLoop.aria.taxAvoidedDesc', { amount: calculations.taxSaving.toLocaleString() })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-950/30 rounded-xl p-4 border border-violet-800/30">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{t('fiberLoop.aria.premiumCertification')}</p>
                    <p className="text-xs text-slate-400">{t('fiberLoop.aria.premiumCertificationDesc')}</p>
                  </div>
                </div>
              </div>

              {shreddingEfficiency >= 90 && (
                <div className="bg-amber-950/30 rounded-xl p-4 border border-amber-800/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium mb-1">{t('fiberLoop.aria.exceptionalEfficiency')}</p>
                      <p className="text-xs text-slate-400">
                        {t('fiberLoop.aria.exceptionalEfficiencyDesc', { efficiency: shreddingEfficiency })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-emerald-900/30 to-violet-900/30 rounded-xl p-4 border border-emerald-500/20">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                {t('fiberLoop.aria.quote', { tons: tonsCollected.toLocaleString(), efficiency: shreddingEfficiency, value: calculations.revenueBoost.toLocaleString() })}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500">{t('common.pontusX')}</p>
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400 font-mono">
                  {pontusHash}
                </Badge>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-violet-600 hover:from-emerald-500 hover:to-violet-500 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('fiberLoop.aria.downloadCertificate')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
