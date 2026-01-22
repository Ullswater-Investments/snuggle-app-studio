import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Shirt, ShieldCheck, TrendingUp, AlertTriangle, FileText, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FastFashionSimulator = () => {
  const { t } = useTranslation('simulators');
  const [transparencyLevel, setTransparencyLevel] = useState(85);
  const [annualVolume, setAnnualVolume] = useState(15);

  const calculations = useMemo(() => {
    const baseConversion = 0.032;
    const transparencyBoost = (transparencyLevel - 50) * 0.0012;
    const newConversion = baseConversion + transparencyBoost;
    const baseRevenue = annualVolume * 1000000;
    const salesUplift = baseRevenue * (newConversion - baseConversion) / baseConversion;
    const riskReduction = Math.min(99, Math.round((transparencyLevel - 50) * 1.98));
    const tierCoverage = Math.min(100, Math.round(transparencyLevel * 1.1));
    
    return {
      baseConversion: (baseConversion * 100).toFixed(1),
      newConversion: (newConversion * 100).toFixed(1),
      salesUplift,
      riskReduction,
      tierCoverage,
      conversionIncrease: ((newConversion - baseConversion) / baseConversion * 100).toFixed(1)
    };
  }, [transparencyLevel, annualVolume]);

  const chartData = [
    { name: t('fastFashion.chart.noSeal'), conversion: parseFloat(calculations.baseConversion), fill: '#64748b' },
    { name: t('fastFashion.chart.withBlockchain'), conversion: parseFloat(calculations.newConversion), fill: '#d946ef' }
  ];

  const pontusHash = useMemo(() => {
    const base = `0x5C4D${transparencyLevel.toString(16).toUpperCase()}${annualVolume.toString(16).toUpperCase()}`;
    return `${base}...A9F3`;
  }, [transparencyLevel, annualVolume]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-950/20 to-background">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-fuchsia-500/20">
                  <Shirt className="h-6 w-6 text-fuchsia-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">{t('fastFashion.title')}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{t('fastFashion.subtitle')}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-fuchsia-500/50 text-fuchsia-400">
                {t('fastFashion.badge')}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground font-mono">
              <ShieldCheck className="h-3 w-3" />
              <span>Pontus-X: {pontusHash}</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('fastFashion.slider.transparency')}</span>
                  <span className="font-semibold text-fuchsia-400">{transparencyLevel}%</span>
                </div>
                <Slider
                  value={[transparencyLevel]}
                  onValueChange={(v) => setTransparencyLevel(v[0])}
                  min={50}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-fuchsia-500"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('fastFashion.slider.volume')}</span>
                  <span className="font-semibold text-fuchsia-400">{annualVolume} M€</span>
                </div>
                <Slider
                  value={[annualVolume]}
                  onValueChange={(v) => setAnnualVolume(v[0])}
                  min={1}
                  max={50}
                  step={1}
                  className="[&_[role=slider]]:bg-fuchsia-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
                <div className="flex items-center gap-2 text-fuchsia-400 mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">{t('fastFashion.kpi.salesUplift')}</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  +{(calculations.salesUplift / 1000).toFixed(0)}K€
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  +{calculations.conversionIncrease}% {t('fastFashion.kpi.conversion')}
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
                <div className="flex items-center gap-2 text-fuchsia-400 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">{t('fastFashion.kpi.riskReduced')}</span>
                </div>
                <p className="text-3xl font-bold text-foreground">-{calculations.riskReduction}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('fastFashion.kpi.tier3Incidents')}
                </p>
              </div>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 8]} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(1)}%`, t('fastFashion.chart.conversionRate')]}
                    contentStyle={{ backgroundColor: '#1e1e2e', border: '1px solid #d946ef' }}
                  />
                  <Bar dataKey="conversion" radius={[4, 4, 0, 0]} animationDuration={800}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-fuchsia-500/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">{t('fastFashion.aria.title')}</CardTitle>
                <p className="text-xs text-slate-400">{t('fastFashion.aria.subtitle')}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                __html: t('fastFashion.aria.consumerTrustDesc', {
                  transparency: transparencyLevel,
                  conversionIncrease: calculations.conversionIncrease,
                  salesUplift: (calculations.salesUplift / 1000).toFixed(0)
                })
              }} />
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                __html: t('fastFashion.aria.reputationDesc', { riskReduction: calculations.riskReduction })
              }} />
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                __html: t('fastFashion.aria.chainCoverageDesc', { tierCoverage: calculations.tierCoverage })
              }} />
            </div>

            {transparencyLevel >= 90 && (
              <div className="p-4 rounded-lg bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border border-fuchsia-500/40">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-fuchsia-500 text-white">
                    ✨ {t('fastFashion.aria.ethicalVerified')}
                  </Badge>
                </div>
                <p className="text-sm text-slate-300">
                  {t('fastFashion.aria.ethicalVerifiedDesc')}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-700">
              <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600">
                <FileText className="h-4 w-4 mr-2" />
                {t('fastFashion.downloadReport')}
              </Button>
              <p className="text-xs text-slate-500 text-center mt-2 font-mono">
                Hash: {pontusHash}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};