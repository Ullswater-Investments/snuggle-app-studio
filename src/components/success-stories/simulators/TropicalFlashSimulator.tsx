import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Timer, Truck, TrendingUp, Shield, FileText, CheckCircle, Package, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

interface TropicalFlashSimulatorProps {
  onValuesChange?: (values: {
    preClearanceLevel: number;
    transitDays: number;
    finalShelfLife: number;
    marginBoost: number;
  }) => void;
}

export const TropicalFlashSimulator: React.FC<TropicalFlashSimulatorProps> = ({ onValuesChange }) => {
  const { t } = useTranslation('simulators');
  const [preClearanceLevel, setPreClearanceLevel] = useState(80);
  const [transitDays, setTransitDays] = useState(6);

  const baseShelfLife = 14;
  const transitLoss = transitDays * 0.8;
  const clearanceGain = (preClearanceLevel / 100) * 3;
  const finalShelfLife = Math.max(1, baseShelfLife - transitLoss + clearanceGain);
  const marginBoost = clearanceGain >= 2 ? 8 : clearanceGain >= 1 ? 4 : 0;
  const wastageReduction = Math.round(clearanceGain * 12);
  const expressEnabled = preClearanceLevel >= 70;

  const pontusHash = `0x${((preClearanceLevel * transitDays * 1000) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((finalShelfLife * 100) % 0xFFFF).toString(16).padStart(4, '0')}`;

  const comparisonData = [
    { 
      method: t('tropicalFlash.chart.traditional'), 
      shelfLife: Math.max(1, baseShelfLife - transitLoss), 
      color: '#F97316' 
    },
    { 
      method: t('tropicalFlash.chart.procureData'), 
      shelfLife: finalShelfLife, 
      color: '#22C55E' 
    },
  ];

  useEffect(() => {
    onValuesChange?.({
      preClearanceLevel,
      transitDays,
      finalShelfLife,
      marginBoost,
    });
  }, [preClearanceLevel, transitDays, finalShelfLife, marginBoost, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-orange-500/30 bg-gradient-to-br from-orange-950/40 via-background to-yellow-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Timer className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t('tropicalFlash.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('tropicalFlash.subtitle')}</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-orange-500/50 text-orange-300">
                {pontusHash}
              </Badge>
            </div>

            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" domain={[0, 16]} stroke="#9CA3AF" fontSize={12} label={{ value: t('tropicalFlash.chart.freshnessDays'), position: 'bottom', fill: '#9CA3AF' }} />
                  <YAxis type="category" dataKey="method" stroke="#9CA3AF" fontSize={12} width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toFixed(1)} ${t('tropicalFlash.units.days')}`, t('tropicalFlash.chart.shelfLife')]}
                  />
                  <Bar dataKey="shelfLife" radius={[0, 8, 8, 0]} barSize={40}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-green-500/10 rounded-xl p-4 mb-6 border border-orange-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-400" />
                  <span className="text-sm font-medium">{t('tropicalFlash.freshnessGained')}:</span>
                </div>
                <span className="text-2xl font-bold text-green-400">+{clearanceGain.toFixed(1)} {t('tropicalFlash.units.days')}</span>
              </div>
            </div>

            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Package className="h-4 w-4 text-orange-400" />
                    {t('tropicalFlash.sliders.preValidation')}
                  </label>
                  <span className="text-sm font-bold text-orange-400">{preClearanceLevel}%</span>
                </div>
                <Slider
                  value={[preClearanceLevel]}
                  onValueChange={(v) => setPreClearanceLevel(v[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t('tropicalFlash.sliders.noPreValidation')}</span>
                  <span>{t('tropicalFlash.sliders.fullIds')}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Truck className="h-4 w-4 text-yellow-400" />
                    {t('tropicalFlash.sliders.transitDays')}
                  </label>
                  <span className="text-sm font-bold text-yellow-400">{transitDays} {t('tropicalFlash.units.days')}</span>
                </div>
                <Slider
                  value={[transitDays]}
                  onValueChange={(v) => setTransitDays(v[0])}
                  min={3}
                  max={12}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t('tropicalFlash.sliders.airDays')}</span>
                  <span>{t('tropicalFlash.sliders.seaDays')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="h-4 w-4 text-orange-400" />
                  <span className="text-xs text-muted-foreground">{t('tropicalFlash.kpis.finalShelfLife')}</span>
                </div>
                <p className="text-2xl font-bold text-orange-400">{finalShelfLife.toFixed(1)} {t('tropicalFlash.units.days')}</p>
                <p className="text-xs text-muted-foreground">{t('tropicalFlash.kpis.inShelf')}</p>
              </div>
              <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{t('tropicalFlash.kpis.marginBoost')}</span>
                </div>
                <p className="text-2xl font-bold text-yellow-400">+{marginBoost}%</p>
                <p className="text-xs text-muted-foreground">{t('tropicalFlash.kpis.wastageReduction')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-orange-500/30">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">{t('aria.name')}</h4>
                <p className="text-xs text-slate-400">{t('tropicalFlash.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${expressEnabled ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-orange-500/10 border-orange-500/20'} border`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${expressEnabled ? 'text-emerald-400' : 'text-orange-400'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-slate-200" dangerouslySetInnerHTML={{ __html: t('tropicalFlash.aria.preDossierDesc', { days: clearanceGain.toFixed(1), margin: marginBoost }) }} />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200" dangerouslySetInnerHTML={{ 
                      __html: t('tropicalFlash.aria.transitDesc', { 
                        transit: transitDays, 
                        wastage: wastageReduction,
                        recommendation: transitDays <= 5 ? t('tropicalFlash.aria.optimalRoute') : t('tropicalFlash.aria.considerAir')
                      })
                    }} />
                  </div>
                </div>
              </div>

              {marginBoost >= 8 && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200" dangerouslySetInnerHTML={{ __html: t('tropicalFlash.aria.expressMode', { days: clearanceGain.toFixed(0) }) }} />
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
                <button className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 transition-colors">
                  <FileText className="h-3 w-3" />
                  {t('tropicalFlash.exportDossier')}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
