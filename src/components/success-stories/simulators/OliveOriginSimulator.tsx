import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { MapPin, Shield, TrendingUp, FileText, CheckCircle, Award, AlertTriangle, Droplet } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

interface OliveOriginSimulatorProps {
  onValuesChange?: (values: {
    litersProduced: number;
    collectionRadius: number;
    purityIndex: number;
    brandEquity: number;
  }) => void;
}

export const OliveOriginSimulator: React.FC<OliveOriginSimulatorProps> = ({ onValuesChange }) => {
  const { t } = useTranslation('simulators');
  const [litersProduced, setLitersProduced] = useState(35000);
  const [collectionRadius, setCollectionRadius] = useState(15);

  const basePricePerLiter = 8.50;
  const purityIndex = Math.max(0, 100 - (collectionRadius * 2));
  const premiumFactor = purityIndex >= 95 ? 0.18 : purityIndex >= 80 ? 0.12 : 0.05;
  const finalPrice = basePricePerLiter * (1 + premiumFactor);
  const brandEquity = litersProduced * (finalPrice - basePricePerLiter);
  const mixAttemptBlocked = collectionRadius > 25;
  const originProtected = purityIndex >= 90;

  const pontusHash = `0x${((litersProduced * collectionRadius) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((purityIndex * 100) % 0xFFFF).toString(16).padStart(4, '0')}`;

  const purityData = [
    { name: t('oliveOrigin.chart.geoPurity'), value: purityIndex, fill: purityIndex >= 90 ? '#166534' : purityIndex >= 70 ? '#D97706' : '#EF4444' },
  ];

  useEffect(() => {
    onValuesChange?.({
      litersProduced,
      collectionRadius,
      purityIndex,
      brandEquity,
    });
  }, [litersProduced, collectionRadius, purityIndex, brandEquity, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-green-700/30 bg-gradient-to-br from-green-950/40 via-background to-amber-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-700/20">
                  <Droplet className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t('oliveOrigin.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('oliveOrigin.subtitle')}</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-green-700/50 text-green-400">
                {pontusHash}
              </Badge>
            </div>

            <div className="h-64 mb-6 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="60%" 
                  outerRadius="100%" 
                  data={purityData} 
                  startAngle={90} 
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={15}
                    fill={purityData[0].fill}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value}%`, t('oliveOrigin.chart.purity')]}
                  />
                  <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="fill-green-600 text-3xl font-bold">
                    {purityIndex}%
                  </text>
                  <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-xs">
                    {t('oliveOrigin.chart.doPurity')}
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            {mixAttemptBlocked && (
              <div className="bg-amber-500/10 rounded-xl p-4 mb-6 border border-amber-500/30 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <span className="text-sm text-amber-300">{t('oliveOrigin.mixBlocked')}</span>
              </div>
            )}

            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-green-600" />
                    {t('oliveOrigin.slider.production')}
                  </label>
                  <span className="text-sm font-bold text-green-600">{litersProduced.toLocaleString()} {t('oliveOrigin.slider.liters')}</span>
                </div>
                <Slider
                  value={[litersProduced]}
                  onValueChange={(v) => setLitersProduced(v[0])}
                  min={1000}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1.000 {t('oliveOrigin.slider.liters')}</span>
                  <span>100.000 {t('oliveOrigin.slider.liters')}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-500" />
                    {t('oliveOrigin.slider.radius')}
                  </label>
                  <span className="text-sm font-bold text-amber-500">{collectionRadius} km</span>
                </div>
                <Slider
                  value={[collectionRadius]}
                  onValueChange={(v) => setCollectionRadius(v[0])}
                  min={5}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t('oliveOrigin.slider.radiusMin')}</span>
                  <span>{t('oliveOrigin.slider.radiusMax')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-700/10 rounded-xl p-4 border border-green-700/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">{t('oliveOrigin.kpi.finalPrice')}</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{finalPrice.toFixed(2)} €/L</p>
                <p className="text-xs text-muted-foreground">+{(premiumFactor * 100).toFixed(0)}% {t('oliveOrigin.kpi.vsAverage')}</p>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="text-xs text-muted-foreground">{t('oliveOrigin.kpi.brandValue')}</span>
                </div>
                <p className="text-2xl font-bold text-amber-500">{brandEquity.toLocaleString()} €</p>
                <p className="text-xs text-muted-foreground">{t('oliveOrigin.kpi.equityGenerated')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-green-700/30">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-amber-600 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">{t('aria.name')}</h4>
                <p className="text-xs text-slate-400">{t('oliveOrigin.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${originProtected ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'} border`}>
                <div className="flex items-start gap-3">
                  {originProtected ? (
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm text-slate-200">
                      {originProtected 
                        ? t('oliveOrigin.aria.insight1Protected', { premium: (premiumFactor * 100).toFixed(0) })
                        : t('oliveOrigin.aria.insight1Pending', { radius: collectionRadius })
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-700/10 border border-green-700/20">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200">
                      {t('oliveOrigin.aria.insight2Desc', { purity: purityIndex, liters: litersProduced.toLocaleString() })}
                    </p>
                  </div>
                </div>
              </div>

              {originProtected && (
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200">
                        {t('oliveOrigin.aria.doProtected')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="h-3 w-3" />
                  <span>Pontus-X: {pontusHash}</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-green-600 hover:text-green-500 transition-colors">
                  <FileText className="h-3 w-3" />
                  {t('oliveOrigin.exportDO')}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};