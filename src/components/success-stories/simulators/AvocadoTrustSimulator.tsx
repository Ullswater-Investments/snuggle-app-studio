import React, { useState, useMemo } from 'react';
import { BugOff, Satellite, Download, Sparkles, ShieldCheck, AlertTriangle, BrainCircuit } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ZAxis } from 'recharts';
import { useTranslation } from 'react-i18next';

interface AvocadoTrustSimulatorProps {
  onValuesChange?: (values: { sensorDensity: number; surveillanceDays: number; pestRisk: number; inspectionSavings: number }) => void;
}

export const AvocadoTrustSimulator = ({ onValuesChange }: AvocadoTrustSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [sensorDensity, setSensorDensity] = useState(6);
  const [surveillanceDays, setSurveillanceDays] = useState(45);

  const calculations = useMemo(() => {
    const pestRisk = Math.max(0.01, 3.5 * (1 - sensorDensity / 10) * (1 - surveillanceDays / 90));
    const capturesDetected = Math.floor(sensorDensity * surveillanceDays * 0.15);
    const inspectionSavings = Math.floor(sensorDensity * 850 + surveillanceDays * 25);
    const dossierReady = pestRisk < 0.5;
    const usdaCompliant = pestRisk < 0.1;
    const dispatchTime = usdaCompliant ? 4 : 48;
    return { pestRisk, capturesDetected, inspectionSavings, dossierReady, usdaCompliant, dispatchTime };
  }, [sensorDensity, surveillanceDays]);

  const scatterData = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const day = i * (surveillanceDays / 20);
      const captures = Math.floor(Math.random() * 3 * (1 - sensorDensity / 12));
      const risk = captures > 1 ? 'high' : captures > 0 ? 'medium' : 'low';
      return { day, captures, risk, size: 80 + captures * 40 };
    });
  }, [sensorDensity, surveillanceDays]);

  const pontusHash = useMemo(() => {
    return `0x${(sensorDensity * surveillanceDays * 100).toString(16).slice(0, 8)}...${(calculations.pestRisk * 10000).toString(16).slice(0, 4)}`;
  }, [sensorDensity, surveillanceDays, calculations.pestRisk]);

  React.useEffect(() => {
    onValuesChange?.({
      sensorDensity,
      surveillanceDays,
      pestRisk: calculations.pestRisk,
      inspectionSavings: calculations.inspectionSavings
    });
  }, [sensorDensity, surveillanceDays, calculations, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-5">
        <Card className="bg-gradient-to-br from-emerald-950/40 to-lime-950/30 border-emerald-500/20 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/50 flex items-center justify-center">
                  <Satellite className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{t('avocado.title')}</h3>
                  <p className="text-xs text-slate-400">{t('avocado.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-emerald-900/50 text-emerald-300 font-mono text-[10px]">{pontusHash}</Badge>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/20">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('avocado.chartTitle')}</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <XAxis 
                      type="number" 
                      dataKey="day" 
                      name={t('avocado.chart.day')} 
                      tick={{ fill: '#94a3b8', fontSize: 10 }} 
                      axisLine={false}
                      tickLine={false}
                      domain={[0, surveillanceDays]}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="captures" 
                      name={t('avocado.chart.captures')} 
                      tick={{ fill: '#94a3b8', fontSize: 10 }} 
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 5]}
                    />
                    <ZAxis type="number" dataKey="size" range={[50, 200]} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      formatter={(value: number, name: string) => [value, name === 'captures' ? t('avocado.chart.captures') : t('avocado.chart.day')]}
                    />
                    <ReferenceLine y={2} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: t('avocado.chart.threshold'), fill: '#f59e0b', fontSize: 10 }} />
                    <Scatter 
                      data={scatterData} 
                      fill="#10b981"
                      shape={(props: any) => {
                        const color = props.payload.captures > 1 ? '#ef4444' : props.payload.captures > 0 ? '#f59e0b' : '#10b981';
                        return <circle cx={props.cx} cy={props.cy} r={6} fill={color} fillOpacity={0.7} stroke={color} />;
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('avocado.sliderSensors')}</span>
                  <span className="font-bold text-emerald-400">{sensorDensity} {t('avocado.sensors')}</span>
                </div>
                <Slider
                  value={[sensorDensity]}
                  onValueChange={(v) => setSensorDensity(v[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="[&>span]:bg-emerald-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('avocado.sliderDays')}</span>
                  <span className="font-bold text-lime-400">{surveillanceDays} {t('avocado.days')}</span>
                </div>
                <Slider
                  value={[surveillanceDays]}
                  onValueChange={(v) => setSurveillanceDays(v[0])}
                  min={7}
                  max={90}
                  step={7}
                  className="[&>span]:bg-lime-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30 text-center">
                <BugOff className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">{t('avocado.kpiPestRisk')}</p>
                <p className="text-3xl font-black text-white">{calculations.pestRisk.toFixed(2)}%</p>
              </div>
              <div className="bg-lime-950/40 p-4 rounded-xl border border-lime-800/30 text-center">
                <ShieldCheck className="w-5 h-5 text-lime-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-lime-400 mb-1">{t('avocado.kpiSavings')}</p>
                <p className="text-3xl font-black text-white">{calculations.inspectionSavings.toLocaleString()}</p>
                <p className="text-xs text-slate-400">EUROe</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-emerald-900/30 h-full">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t('aria.name')}</p>
                <p className="text-xs text-slate-400">{t('avocado.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{ 
                  __html: t('avocado.aria.insight1', { risk: calculations.pestRisk.toFixed(2), captures: calculations.capturesDetected, days: surveillanceDays }) 
                }} />
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Satellite className="w-4 h-4 text-lime-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{ 
                  __html: t('avocado.aria.insight2', { savings: calculations.inspectionSavings.toLocaleString() }) 
                }} />
              </div>

              {calculations.usdaCompliant ? (
                <div className="flex items-start gap-3 p-3 bg-emerald-950/30 rounded-lg border border-emerald-800/30">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-emerald-300" dangerouslySetInnerHTML={{ 
                    __html: t('avocado.aria.usdaCompliant', { hours: calculations.dispatchTime }) 
                  }} />
                </div>
              ) : (
                <div className="flex items-start gap-3 p-3 bg-amber-950/30 rounded-lg border border-amber-800/30">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-300">{t('avocado.aria.increaseUSDA')}</p>
                </div>
              )}
            </div>

            {calculations.dossierReady && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-lime-900/30 p-4 rounded-xl border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300 uppercase">{t('avocado.aria.dossierReady')}</span>
                </div>
                <p className="text-xs text-slate-400">{t('avocado.aria.dossierDesc')}</p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Pontus-X Hash</span>
                <span className="font-mono text-emerald-400">{pontusHash}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('avocado.downloadDossier')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
