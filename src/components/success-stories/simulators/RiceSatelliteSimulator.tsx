import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Satellite, Scan, Shield, FileText, CheckCircle, Award, MapPin } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

interface RiceSatelliteSimulatorProps {
  onValuesChange?: (values: {
    satResolution: number;
    passFrequency: number;
    confidenceLevel: number;
    varietyVerified: string;
  }) => void;
}

export const RiceSatelliteSimulator: React.FC<RiceSatelliteSimulatorProps> = ({ onValuesChange }) => {
  const { t } = useTranslation('simulators');
  const [satResolution, setSatResolution] = useState(10);
  const [passFrequency, setPassFrequency] = useState(5);

  const ndviAccuracy = 100 - (satResolution * 2) - (passFrequency * 0.5);
  const confidenceLevel = Math.min(99, Math.max(75, ndviAccuracy));
  const fraudPrevented = confidenceLevel > 95;
  const varietyVerified = confidenceLevel > 90 ? 'Bomba' : confidenceLevel > 80 ? 'Calasparra' : t('riceSatellite.varietyUndetermined');
  const doConfidence = confidenceLevel > 95 ? t('riceSatellite.confidenceMax') : confidenceLevel > 85 ? t('riceSatellite.confidenceHigh') : t('riceSatellite.confidenceMedium');

  const pontusHash = `0x${((satResolution * passFrequency * 10000) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((confidenceLevel * 100) % 0xFFFF).toString(16).padStart(4, '0')}`;

  const confidenceData = [
    { name: t('riceSatellite.chart.satVeracity'), value: confidenceLevel, color: '#84CC16' },
    { name: t('riceSatellite.chart.errorMargin'), value: 100 - confidenceLevel, color: '#374151' },
  ];

  const COLORS = ['#84CC16', '#374151'];

  useEffect(() => {
    onValuesChange?.({
      satResolution,
      passFrequency,
      confidenceLevel,
      varietyVerified,
    });
  }, [satResolution, passFrequency, confidenceLevel, varietyVerified, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-lime-500/30 bg-gradient-to-br from-lime-950/40 via-background to-sky-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-lime-500/20">
                  <Satellite className="h-6 w-6 text-lime-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t('riceSatellite.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('riceSatellite.subtitle')}</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-lime-500/50 text-lime-300">
                {pontusHash}
              </Badge>
            </div>

            <div className="h-64 mb-6 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={confidenceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {confidenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
                  />
                  <Legend />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-lime-400 text-2xl font-bold">
                    {confidenceLevel.toFixed(0)}%
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Scan className="h-4 w-4 text-lime-400" />
                    {t('riceSatellite.slider.resolution')}
                  </label>
                  <span className="text-sm font-bold text-lime-400">{satResolution}m</span>
                </div>
                <Slider
                  value={[satResolution]}
                  onValueChange={(v) => setSatResolution(v[0])}
                  min={5}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t('riceSatellite.slider.resolutionMin')}</span>
                  <span>{t('riceSatellite.slider.resolutionMax')}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Satellite className="h-4 w-4 text-sky-400" />
                    {t('riceSatellite.slider.frequency')}
                  </label>
                  <span className="text-sm font-bold text-sky-400">{t('riceSatellite.slider.frequencyValue', { days: passFrequency })}</span>
                </div>
                <Slider
                  value={[passFrequency]}
                  onValueChange={(v) => setPassFrequency(v[0])}
                  min={3}
                  max={15}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{t('riceSatellite.slider.frequencyMin')}</span>
                  <span>{t('riceSatellite.slider.frequencyMax')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-lime-500/10 rounded-xl p-4 border border-lime-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-lime-400" />
                  <span className="text-xs text-muted-foreground">{t('riceSatellite.kpi.varietyDetected')}</span>
                </div>
                <p className="text-2xl font-bold text-lime-400">{varietyVerified}</p>
                <p className="text-xs text-muted-foreground">{t('riceSatellite.kpi.ndviSignature')}</p>
              </div>
              <div className="bg-sky-500/10 rounded-xl p-4 border border-sky-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-sky-400" />
                  <span className="text-xs text-muted-foreground">{t('riceSatellite.kpi.doConfidence')}</span>
                </div>
                <p className="text-2xl font-bold text-sky-400">{doConfidence}</p>
                <p className="text-xs text-muted-foreground">{confidenceLevel.toFixed(0)}% {t('riceSatellite.kpi.verification')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-lime-500/30">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-sky-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">{t('aria.name')}</h4>
                <p className="text-xs text-slate-400">{t('riceSatellite.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${fraudPrevented ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-lime-500/10 border-lime-500/20'} border`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${fraudPrevented ? 'text-emerald-400' : 'text-lime-400'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-slate-200">
                      {t('riceSatellite.aria.insight1Desc', { variety: varietyVerified, confidence: confidenceLevel.toFixed(0) })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-sky-500/10 border border-sky-500/20">
                <div className="flex items-start gap-3">
                  <Satellite className="h-5 w-5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200">
                      {t('riceSatellite.aria.insight2Desc', { resolution: satResolution, frequency: passFrequency })}
                      {satResolution <= 10 
                        ? ` ${t('riceSatellite.aria.resolutionOptimal')}` 
                        : ` ${t('riceSatellite.aria.resolutionImprove')}`
                      }
                    </p>
                  </div>
                </div>
              </div>

              {fraudPrevented && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200">
                        {t('riceSatellite.aria.fraudProtection')}
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
                <button className="flex items-center gap-1 text-xs text-lime-400 hover:text-lime-300 transition-colors">
                  <FileText className="h-3 w-3" />
                  {t('riceSatellite.exportCert')}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};