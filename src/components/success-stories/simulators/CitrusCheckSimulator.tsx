import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Citrus, CloudRain, TrendingDown, Shield, FileText, CheckCircle, Globe } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

interface CitrusCheckSimulatorProps {
  onValuesChange?: (values: {
    daysSinceApp: number;
    rainfallMm: number;
    currentLevel: number;
    babyFoodReady: boolean;
  }) => void;
}

export const CitrusCheckSimulator: React.FC<CitrusCheckSimulatorProps> = ({ onValuesChange }) => {
  const { t } = useTranslation('simulators');
  const [daysSinceApp, setDaysSinceApp] = useState(45);
  const [rainfallMm, setRainfallMm] = useState(60);

  const baseResidueLevel = 0.5;
  const degradation = daysSinceApp * 0.008 + rainfallMm * 0.001;
  const currentLevel = Math.max(0.005, baseResidueLevel - degradation);
  const euCompliant = currentLevel < 0.01;
  const usaCompliant = currentLevel < 0.02;
  const chinaCompliant = currentLevel < 0.05;
  const ukCompliant = currentLevel < 0.015;
  const babyFoodReady = currentLevel < 0.01;
  const profitBoost = babyFoodReady ? 30 : usaCompliant ? 15 : 0;

  const pontusHash = `0x${((daysSinceApp * rainfallMm * 1000) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((currentLevel * 100000) % 0xFFFF).toString(16).padStart(4, '0')}`;

  const complianceData = [
    { market: t('citrusCheck.markets.eu'), compliance: euCompliant ? 100 : Math.round((0.01 / currentLevel) * 100), limit: 0.01 },
    { market: t('citrusCheck.markets.usa'), compliance: usaCompliant ? 100 : Math.round((0.02 / currentLevel) * 100), limit: 0.02 },
    { market: t('citrusCheck.markets.uk'), compliance: ukCompliant ? 100 : Math.round((0.015 / currentLevel) * 100), limit: 0.015 },
    { market: t('citrusCheck.markets.china'), compliance: chinaCompliant ? 100 : Math.round((0.05 / currentLevel) * 100), limit: 0.05 },
    { market: t('citrusCheck.markets.babyFood'), compliance: babyFoodReady ? 100 : Math.round((0.01 / currentLevel) * 100), limit: 0.01 },
  ];

  useEffect(() => {
    onValuesChange?.({
      daysSinceApp,
      rainfallMm,
      currentLevel,
      babyFoodReady,
    });
  }, [daysSinceApp, rainfallMm, currentLevel, babyFoodReady, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-yellow-500/30 bg-gradient-to-br from-yellow-950/40 via-background to-orange-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Citrus className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t('citrusCheck.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('citrusCheck.subtitle')}</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-yellow-500/50 text-yellow-300">
                {pontusHash}
              </Badge>
            </div>

            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={complianceData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="market" stroke="#9CA3AF" fontSize={12} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#F3F4F6' }}
                    formatter={(value: number) => [`${value}%`, t('citrusCheck.compliance')]}
                  />
                  <Radar
                    name={t('citrusCheck.lmrCompliance')}
                    dataKey="compliance"
                    stroke="#EAB308"
                    fill="#EAB308"
                    fillOpacity={0.5}
                    strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-yellow-400" />
                    {t('citrusCheck.sliders.daysSinceApp')}
                  </label>
                  <span className="text-sm font-bold text-yellow-400">{daysSinceApp} {t('citrusCheck.units.days')}</span>
                </div>
                <Slider
                  value={[daysSinceApp]}
                  onValueChange={(v) => setDaysSinceApp(v[0])}
                  min={0}
                  max={90}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t('citrusCheck.sliders.recentDays')}</span>
                  <span>{t('citrusCheck.sliders.maxDays')}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-orange-400" />
                    {t('citrusCheck.sliders.rainfall')}
                  </label>
                  <span className="text-sm font-bold text-orange-400">{rainfallMm} mm</span>
                </div>
                <Slider
                  value={[rainfallMm]}
                  onValueChange={(v) => setRainfallMm(v[0])}
                  min={0}
                  max={200}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t('citrusCheck.sliders.dryMm')}</span>
                  <span>{t('citrusCheck.sliders.maxMm')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Citrus className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{t('citrusCheck.kpis.residueLevel')}</span>
                </div>
                <p className={`text-2xl font-bold ${babyFoodReady ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {currentLevel.toFixed(3)} mg/kg
                </p>
                <p className="text-xs text-muted-foreground">{babyFoodReady ? t('citrusCheck.kpis.babyFoodReady') : t('citrusCheck.kpis.verifyMarket')}</p>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="h-4 w-4 text-orange-400" />
                  <span className="text-xs text-muted-foreground">{t('citrusCheck.kpis.profitBoost')}</span>
                </div>
                <p className="text-2xl font-bold text-orange-400">+{profitBoost}%</p>
                <p className="text-xs text-muted-foreground">{t('citrusCheck.kpis.perCertifiedBatch')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-yellow-500/30">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">{t('aria.name')}</h4>
                <p className="text-xs text-slate-400">{t('citrusCheck.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${babyFoodReady ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-yellow-500/10 border-yellow-500/20'} border`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${babyFoodReady ? 'text-emerald-400' : 'text-yellow-400'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-slate-200" dangerouslySetInnerHTML={{ 
                      __html: babyFoodReady 
                        ? t('citrusCheck.aria.babyFoodReadyDesc', { level: currentLevel.toFixed(3), boost: profitBoost })
                        : t('citrusCheck.aria.waitForBabyFood', { days: Math.max(0, Math.ceil((0.01 - currentLevel) / 0.008)) })
                    }} />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200" dangerouslySetInnerHTML={{ 
                      __html: t('citrusCheck.aria.marketsEnabled', { 
                        markets: [euCompliant && t('citrusCheck.markets.eu'), usaCompliant && t('citrusCheck.markets.usa'), ukCompliant && t('citrusCheck.markets.uk'), chinaCompliant && t('citrusCheck.markets.china')].filter(Boolean).join(', ') || t('citrusCheck.aria.noMarkets'),
                        increaseMessage: !euCompliant ? t('citrusCheck.aria.increaseWaitingDays') : ''
                      })
                    }} />
                  </div>
                </div>
              </div>

              {babyFoodReady && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200">{t('citrusCheck.aria.babyFoodCertified')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="h-3 w-3" />
                  <span>{t('common.pontusX')}: {pontusHash}</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                  <FileText className="h-3 w-3" />
                  {t('citrusCheck.exportPassport')}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
