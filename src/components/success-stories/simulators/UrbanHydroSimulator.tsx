import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Building2, Sun, Leaf, Shield, FileText, CheckCircle, Award, MapPin } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

interface UrbanHydroSimulatorProps {
  onValuesChange?: (values: {
    distanceToConsumer: number;
    renewableRatio: number;
    premiumPrice: number;
    circularScore: number;
  }) => void;
}

export const UrbanHydroSimulator: React.FC<UrbanHydroSimulatorProps> = ({ onValuesChange }) => {
  const { t } = useTranslation('simulators');
  const [distanceToConsumer, setDistanceToConsumer] = useState(3);
  const [renewableRatio, setRenewableRatio] = useState(95);

  const km0Certified = distanceToConsumer <= 5;
  const logisticFootprint = distanceToConsumer * 0.05;
  const renewableBonus = renewableRatio >= 100 ? 60 : renewableRatio * 0.5;
  const premiumPrice = km0Certified && renewableRatio >= 95 ? renewableBonus : renewableRatio * 0.3;
  const circularScore = Math.min(100, (100 - distanceToConsumer) * 0.3 + renewableRatio * 0.7);
  const solarLinked = renewableRatio >= 95;

  const pontusHash = `0x${((distanceToConsumer * renewableRatio * 1000) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((circularScore * 100) % 0xFFFF).toString(16).padStart(4, '0')}`;

  const circularData = [
    { name: t('urbanHydro.chart.proximity'), value: Math.max(0, 100 - distanceToConsumer * 2), fill: '#84CC16' },
    { name: t('urbanHydro.chart.renewable'), value: renewableRatio, fill: '#22D3EE' },
    { name: t('urbanHydro.chart.circular'), value: circularScore, fill: '#10B981' },
  ];

  useEffect(() => {
    onValuesChange?.({
      distanceToConsumer,
      renewableRatio,
      premiumPrice,
      circularScore,
    });
  }, [distanceToConsumer, renewableRatio, premiumPrice, circularScore, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-lime-500/30 bg-gradient-to-br from-lime-950/40 via-background to-cyan-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-lime-500/20">
                  <Building2 className="h-6 w-6 text-lime-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t('urbanHydro.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('urbanHydro.subtitle')}</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-lime-500/50 text-lime-300">
                {pontusHash}
              </Badge>
            </div>

            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="20%" 
                  outerRadius="90%" 
                  data={circularData} 
                  startAngle={180} 
                  endAngle={0}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toFixed(0)}%`, '']}
                  />
                  <Legend 
                    iconSize={10} 
                    layout="horizontal" 
                    verticalAlign="bottom"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            {km0Certified && (
              <div className="bg-gradient-to-r from-lime-500/20 to-cyan-500/20 rounded-xl p-4 mb-6 border border-lime-500/30 flex items-center justify-center gap-3">
                <MapPin className="h-6 w-6 text-lime-400" />
                <span className="text-lg font-bold text-lime-400">{t('urbanHydro.km0Certified')}</span>
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
            )}

            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-lime-400" />
                    {t('urbanHydro.sliderDistance')}
                  </label>
                  <span className="text-sm font-bold text-lime-400">{distanceToConsumer} km</span>
                </div>
                <Slider
                  value={[distanceToConsumer]}
                  onValueChange={(v) => setDistanceToConsumer(v[0])}
                  min={0}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t('urbanHydro.sliderDistanceMin')}</span>
                  <span>50 km</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Sun className="h-4 w-4 text-cyan-400" />
                    {t('urbanHydro.sliderRenewable')}
                  </label>
                  <span className="text-sm font-bold text-cyan-400">{renewableRatio}%</span>
                </div>
                <Slider
                  value={[renewableRatio]}
                  onValueChange={(v) => setRenewableRatio(v[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t('urbanHydro.sliderRenewableMin')}</span>
                  <span>{t('urbanHydro.sliderRenewableMax')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-lime-500/10 rounded-xl p-4 border border-lime-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="h-4 w-4 text-lime-400" />
                  <span className="text-xs text-muted-foreground">{t('urbanHydro.kpiCircular')}</span>
                </div>
                <p className="text-2xl font-bold text-lime-400">{circularScore.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">{t('urbanHydro.kpiCircularDesc')}</p>
              </div>
              <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs text-muted-foreground">{t('urbanHydro.kpiPremium')}</span>
                </div>
                <p className="text-2xl font-bold text-cyan-400">+{premiumPrice.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">{t('urbanHydro.kpiPremiumDesc')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-lime-500/30">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-cyan-500 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">{t('aria.name')}</h4>
                <p className="text-xs text-slate-400">{t('urbanHydro.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${km0Certified ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-lime-500/10 border-lime-500/20'} border`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${km0Certified ? 'text-emerald-400' : 'text-lime-400'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-slate-200" dangerouslySetInnerHTML={{ 
                      __html: km0Certified 
                        ? t('urbanHydro.aria.km0Desc', { premium: premiumPrice.toFixed(0) })
                        : t('urbanHydro.aria.km0Pending', { distance: distanceToConsumer })
                    }} />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <div className="flex items-start gap-3">
                  <Sun className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200" dangerouslySetInnerHTML={{ 
                      __html: t('urbanHydro.aria.energyDesc', { renewable: renewableRatio, footprint: logisticFootprint.toFixed(2), solarVerified: solarLinked ? t('urbanHydro.aria.solarVerified') : '' })
                    }} />
                  </div>
                </div>
              </div>

              {km0Certified && solarLinked && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200" dangerouslySetInnerHTML={{ __html: t('urbanHydro.aria.tripleCert') }} />
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
                <button className="flex items-center gap-1 text-xs text-lime-400 hover:text-lime-300 transition-colors">
                  <FileText className="h-3 w-3" />
                  {t('urbanHydro.exportCert')}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
