import React, { useState, useMemo } from 'react';
import { Globe2, Link2, Download, Sparkles, Clock, Coins } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Tooltip, ZAxis } from 'recharts';
import { useTranslation } from 'react-i18next';

interface GlobalBridgeSimulatorProps {
  onValuesChange?: (values: { exportVolume: number; marketDiversity: number; savedCost: number; weeksEliminated: number }) => void;
}

export const GlobalBridgeSimulator = ({ onValuesChange }: GlobalBridgeSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [exportVolume, setExportVolume] = useState(25);
  const [marketDiversity, setMarketDiversity] = useState(5);

  const calculations = useMemo(() => {
    const baseHomologationWeeks = 12;
    const connectedNodes = marketDiversity * 3;
    const costPerMarket = 45000;
    const digitalCost = 8000;
    const savedCost = (costPerMarket - digitalCost) * marketDiversity;
    const weeksEliminated = baseHomologationWeeks;
    const activeHubs = marketDiversity >= 5 ? ['EU', 'LatAm', 'Asia'] : marketDiversity >= 3 ? ['EU', 'LatAm'] : ['EU'];
    const revenueUnlocked = exportVolume * 0.15;
    return { connectedNodes, savedCost, weeksEliminated, activeHubs, revenueUnlocked };
  }, [exportVolume, marketDiversity]);

  const scatterData = useMemo(() => {
    const hubs = [
      { name: 'Madrid', x: 40, y: 60, cost: 8000, size: 200 },
      { name: 'Bogotá', x: 25, y: 45, cost: 12000, size: marketDiversity >= 3 ? 180 : 100 },
      { name: 'Singapore', x: 75, y: 50, cost: 15000, size: marketDiversity >= 5 ? 160 : 80 },
      { name: 'São Paulo', x: 30, y: 30, cost: 11000, size: marketDiversity >= 4 ? 150 : 70 },
      { name: 'Dubai', x: 60, y: 55, cost: 10000, size: marketDiversity >= 6 ? 140 : 60 }
    ];
    return hubs.slice(0, Math.min(5, marketDiversity));
  }, [marketDiversity]);

  const pontusHash = useMemo(() => {
    return `0x${(exportVolume * marketDiversity * 100).toString(16).slice(0, 8)}...${(calculations.savedCost).toString(16).slice(0, 4)}`;
  }, [exportVolume, marketDiversity, calculations.savedCost]);

  React.useEffect(() => {
    onValuesChange?.({
      exportVolume,
      marketDiversity,
      savedCost: calculations.savedCost,
      weeksEliminated: calculations.weeksEliminated
    });
  }, [exportVolume, marketDiversity, calculations, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Simulator */}
      <div className="lg:col-span-7 space-y-5">
        <Card className="bg-gradient-to-br from-emerald-950/40 to-indigo-950/30 border-emerald-500/20 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/50 flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{t('globalBridge.title')}</h3>
                  <p className="text-xs text-slate-400">{t('globalBridge.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-emerald-900/50 text-emerald-300 font-mono text-[10px]">{pontusHash}</Badge>
            </div>

            {/* Scatter Chart - Global Nodes */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/20">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('globalBridge.chartTitle')}</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name={t('globalBridge.chart.longitude')}
                      tick={{ fill: '#94a3b8', fontSize: 10 }} 
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      hide
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name={t('globalBridge.chart.latitude')}
                      tick={{ fill: '#94a3b8', fontSize: 10 }} 
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      hide
                    />
                    <ZAxis type="number" dataKey="size" range={[50, 200]} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      formatter={(value: any, name: string) => {
                        if (name === 'cost') return [`${value.toLocaleString()} €`, t('globalBridge.chart.cost')];
                        return [value, name];
                      }}
                      labelFormatter={(label: any, payload: any) => payload[0]?.payload?.name || ''}
                    />
                    <Scatter 
                      data={scatterData} 
                      fill="#10b981"
                      shape={(props: any) => {
                        const isActive = props.payload.size > 100;
                        return (
                          <g>
                            <circle 
                              cx={props.cx} 
                              cy={props.cy} 
                              r={props.payload.size / 20} 
                              fill={isActive ? '#10b981' : '#334155'} 
                              fillOpacity={0.6}
                              stroke={isActive ? '#10b981' : '#475569'}
                              strokeWidth={2}
                            />
                            <text x={props.cx} y={props.cy + 25} textAnchor="middle" fill="#94a3b8" fontSize={9}>
                              {props.payload.name}
                            </text>
                          </g>
                        );
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2 text-[10px]">
                {calculations.activeHubs.map((hub) => (
                  <Badge key={hub} className="bg-emerald-900/50 text-emerald-300">
                    <Link2 className="w-3 h-3 mr-1" /> {hub}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('globalBridge.sliders.exportVolume')}</span>
                  <span className="font-bold text-emerald-400">{exportVolume} M€</span>
                </div>
                <Slider
                  value={[exportVolume]}
                  onValueChange={(v) => setExportVolume(v[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="[&>span]:bg-emerald-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('globalBridge.sliders.marketDiversity')}</span>
                  <span className="font-bold text-indigo-400">{marketDiversity} {t('globalBridge.countries')}</span>
                </div>
                <Slider
                  value={[marketDiversity]}
                  onValueChange={(v) => setMarketDiversity(v[0])}
                  min={1}
                  max={15}
                  step={1}
                  className="[&>span]:bg-indigo-600"
                />
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30 text-center">
                <Coins className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-emerald-400 mb-1">{t('globalBridge.kpis.homologationSaving')}</p>
                <p className="text-3xl font-black text-white">{calculations.savedCost.toLocaleString()}</p>
                <p className="text-xs text-slate-400">€</p>
              </div>
              <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/30 text-center">
                <Clock className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-indigo-400 mb-1">{t('globalBridge.kpis.weeksEliminated')}</p>
                <p className="text-3xl font-black text-white">{calculations.weeksEliminated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-emerald-900/30 h-full">
          <CardContent className="p-6 space-y-5">
            {/* ARIA Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t('aria.name')}</p>
                <p className="text-xs text-slate-400">{t('globalBridge.aria.role')}</p>
              </div>
            </div>

            {/* Insights */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                  __html: t('globalBridge.aria.connectorDesc', {
                    nodes: calculations.connectedNodes,
                    hubs: calculations.activeHubs.join(', ')
                  })
                }} />
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Clock className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{
                  __html: t('globalBridge.aria.weeksDesc', {
                    weeks: calculations.weeksEliminated,
                    savings: calculations.savedCost.toLocaleString()
                  })
                }} />
              </div>

              {calculations.activeHubs.length >= 3 && (
                <div className="flex items-start gap-3 p-3 bg-emerald-950/30 rounded-lg border border-emerald-800/30">
                  <Globe2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-emerald-300" dangerouslySetInnerHTML={{
                    __html: t('globalBridge.aria.tripleHub', { revenue: calculations.revenueUnlocked.toFixed(1) })
                  }} />
                </div>
              )}
            </div>

            {/* Connected Hubs */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-indigo-900/30 p-4 rounded-xl border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300 uppercase">{t('globalBridge.activeHubs')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {calculations.activeHubs.map((hub) => (
                  <Badge key={hub} className="bg-emerald-500/20 text-emerald-300">
                    {hub}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{t('common.pontusHash')}</span>
                <span className="font-mono text-emerald-400">{pontusHash}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('globalBridge.downloadMap')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
