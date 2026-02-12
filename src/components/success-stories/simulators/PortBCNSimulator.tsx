import React, { useState, useMemo } from 'react';
import { Ship, Clock, Container, Anchor, FileText, BrainCircuit, DollarSign } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

interface PortBCNSimulatorProps {
  onValuesChange?: (values: { teuVolume: number; digitalEfficiency: number; savings: number }) => void;
}

export const PortBCNSimulator = ({ onValuesChange }: PortBCNSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [teuVolume, setTeuVolume] = useState(2000);
  const [digitalEfficiency, setDigitalEfficiency] = useState(85);

  const calculations = useMemo(() => {
    const costPerTEU = 450;
    const costSaved = teuVolume * costPerTEU * (digitalEfficiency / 100);
    const traditionalHours = 72;
    const pdHours = 6;
    const hoursSaved = traditionalHours - pdHours;
    const capitalLiberado = teuVolume * 450 * (digitalEfficiency / 100);
    const documentosDigitales = Math.round(teuVolume * 3.5 * (digitalEfficiency / 100));
    return { costSaved, traditionalHours, pdHours, hoursSaved, capitalLiberado, documentosDigitales };
  }, [teuVolume, digitalEfficiency]);

  const timeData = useMemo(() => [
    { name: t('portBCN.chart.traditional'), hours: calculations.traditionalHours, fill: '#64748b' },
    { name: t('portBCN.chart.procureData'), hours: calculations.pdHours, fill: '#22d3ee' },
  ], [calculations, t]);

  const pontusHash = useMemo(() => {
    const base = (teuVolume + digitalEfficiency * 100).toString(16);
    return `0x${base.padStart(8, '0')}...port_clear`;
  }, [teuVolume, digitalEfficiency]);

  React.useEffect(() => {
    onValuesChange?.({ teuVolume, digitalEfficiency, savings: calculations.costSaved });
  }, [teuVolume, digitalEfficiency, calculations.costSaved, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-slate-900 to-cyan-950/40 border-cyan-500/20 shadow-2xl overflow-hidden p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Ship className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-cyan-400 font-bold text-sm">{t('portBCN.title')}</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-400">{t('portBCN.badge')}</Badge>
          </div>

          <div className="relative bg-slate-900/80 rounded-2xl p-6 border border-cyan-900/30 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-cyan-900/50 flex items-center justify-center border-2 border-cyan-500">
                  <Anchor className="text-cyan-400 w-8 h-8" />
                </div>
                <span className="text-xs text-cyan-300 font-bold">{t('portBCN.visual.portBCN')}</span>
              </div>
              
              <div className="flex-1 mx-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Container className="w-4 h-4 text-slate-500" />
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${digitalEfficiency}%` }}
                    />
                  </div>
                </div>
                <p className="text-center text-xs text-slate-400">{t('portBCN.visual.digitalEfficiency')}: <span className="text-cyan-400 font-bold">{digitalEfficiency}%</span></p>
              </div>
              
              <div className="text-center">
                <p className="text-3xl font-black text-white">{teuVolume.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 uppercase">{t('portBCN.visual.teuMonth')}</p>
              </div>
            </div>

            <div className="flex justify-between bg-black/40 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-green-400">IDS_CHANNEL: ACTIVE</span>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div 
                    key={i} 
                    className={`w-2 h-4 rounded-sm transition-all ${i <= Math.floor(digitalEfficiency/20) ? 'bg-cyan-500' : 'bg-slate-700'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-900/20 mb-6">
            <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('portBCN.chart.dispatchTime')}</p>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData} layout="vertical">
                  <XAxis type="number" domain={[0, 80]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} width={80} />
                  <Tooltip 
                    contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value} ${t('common.hours')}`, '']}
                  />
                  <Bar dataKey="hours" radius={[0, 8, 8, 0]}>
                    {timeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Badge className="mt-3 bg-cyan-500/20 text-cyan-400">-{((1 - calculations.pdHours/calculations.traditionalHours) * 100).toFixed(0)}% {t('portBCN.chart.dispatchReduction')}</Badge>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-cyan-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{t('portBCN.sliders.teuVolume')}</span>
                <span className="font-bold text-cyan-400">{teuVolume.toLocaleString()}</span>
              </div>
              <Slider value={[teuVolume]} onValueChange={(v) => setTeuVolume(v[0])} min={100} max={5000} step={100} className="[&>span]:bg-cyan-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{t('portBCN.sliders.digitalEfficiency')}</span>
                <span className="font-bold text-blue-400">{digitalEfficiency}%</span>
              </div>
              <Slider value={[digitalEfficiency]} onValueChange={(v) => setDigitalEfficiency(v[0])} min={0} max={100} step={5} className="[&>span]:bg-blue-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-5 rounded-2xl border border-cyan-500/30">
            <p className="text-[10px] uppercase font-black text-cyan-300 mb-2">{t('portBCN.kpis.portFeeSavings')}</p>
            <p className="text-4xl font-black text-white">{calculations.costSaved.toLocaleString()} <span className="text-lg text-cyan-400">EUROe</span></p>
            <p className="text-xs text-slate-400 mt-1">{t('portBCN.kpis.clearanceTime')}: {calculations.pdHours}h</p>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-cyan-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"><BrainCircuit className="w-5 h-5 text-white" /></div>
            <div>
              <h4 className="text-white font-bold">{t('aria.name')}</h4>
              <p className="text-[10px] text-slate-400">{t('portBCN.aria.role')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">{t('portBCN.aria.capitalLiberated')}</p>
                  <p className="text-xs text-slate-400">
                    {t('portBCN.aria.capitalDesc', { efficiency: digitalEfficiency, capital: calculations.capitalLiberado.toLocaleString() })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">{t('portBCN.aria.timeReduction')}</p>
                  <p className="text-xs text-slate-400">
                    {t('portBCN.aria.timeReductionDesc', { traditional: calculations.traditionalHours, pd: calculations.pdHours, saved: calculations.hoursSaved })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-900/30">
              <div className="flex items-start gap-3">
                <Container className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">{t('portBCN.aria.digitalDocumentation')}</p>
                  <p className="text-xs text-slate-400">
                    {t('portBCN.aria.digitalDocDesc', { docs: calculations.documentosDigitales.toLocaleString() })}
                  </p>
                </div>
              </div>
            </div>

            {digitalEfficiency >= 90 && (
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Ship className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold text-cyan-300">{t('portBCN.aria.aeoCertified')}</span>
                </div>
                <p className="text-xs text-slate-300">{t('portBCN.aria.aeoCertifiedDesc')}</p>
              </div>
            )}

            {teuVolume >= 3000 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">{t('portBCN.aria.volumeDiscount')}</span>
                </div>
                <p className="text-xs text-slate-300">{t('portBCN.aria.volumeDiscountDesc', { teu: teuVolume.toLocaleString() })}</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[10px] font-mono text-slate-500 mb-3">{pontusHash}</p>
            <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              {t('portBCN.aria.downloadCustoms')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
