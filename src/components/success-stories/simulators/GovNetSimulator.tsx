import React, { useState, useMemo } from 'react';
import { Building2, ShieldCheck, Download, Sparkles, Users, Scale, BrainCircuit } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

interface GovNetSimulatorProps {
  onValuesChange?: (values: { tenderComplexity: number; numBidders: number; transparencyScore: number; impugnationRisk: number }) => void;
}

export const GovNetSimulator = ({ onValuesChange }: GovNetSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [tenderComplexity, setTenderComplexity] = useState(6);
  const [numBidders, setNumBidders] = useState(15);

  const calculations = useMemo(() => {
    const baseCollusionRisk = 25;
    const didVerification = numBidders * 5;
    const complexityFactor = tenderComplexity * 2;
    const finalRisk = Math.max(0, baseCollusionRisk - didVerification + complexityFactor);
    const transparencyScore = Math.min(100, 100 - finalRisk);
    const impugnationRisk = finalRisk < 5 ? 0 : finalRisk;
    const ethicalAward = transparencyScore >= 95;
    const collusionMitigated = Math.min(100, didVerification * 2);
    return { finalRisk, transparencyScore, impugnationRisk, ethicalAward, collusionMitigated };
  }, [tenderComplexity, numBidders]);

  const pieData = useMemo(() => [
    { name: t('govnet.chart.transparency'), value: calculations.transparencyScore, fill: '#8b5cf6' },
    { name: t('govnet.chart.risk'), value: 100 - calculations.transparencyScore, fill: '#334155' }
  ], [calculations.transparencyScore, t]);

  const pontusHash = useMemo(() => {
    return `0x${(tenderComplexity * numBidders * 100).toString(16).slice(0, 8)}...${(calculations.transparencyScore).toString(16).slice(0, 4)}`;
  }, [tenderComplexity, numBidders, calculations.transparencyScore]);

  React.useEffect(() => {
    onValuesChange?.({
      tenderComplexity,
      numBidders,
      transparencyScore: calculations.transparencyScore,
      impugnationRisk: calculations.impugnationRisk
    });
  }, [tenderComplexity, numBidders, calculations, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-5">
        <Card className="bg-gradient-to-br from-violet-950/40 to-indigo-950/30 border-violet-500/20 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-900/50 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-violet-300 uppercase tracking-wider">{t('govnet.title')}</h3>
                  <p className="text-xs text-slate-400">{t('govnet.subtitle')}</p>
                </div>
              </div>
              <Badge className="bg-violet-900/50 text-violet-300 font-mono text-[10px]">{pontusHash}</Badge>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-violet-900/20">
              <p className="text-xs text-slate-400 mb-3 uppercase font-bold">{t('govnet.chartTitle')}</p>
              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center">
                  <p className="text-3xl font-black text-white">{calculations.transparencyScore.toFixed(0)}%</p>
                  <p className="text-[10px] text-violet-400 uppercase">{t('govnet.transparency')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-violet-900/20">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('govnet.sliderComplexity')}</span>
                  <span className="font-bold text-violet-400">{tenderComplexity}/10</span>
                </div>
                <Slider
                  value={[tenderComplexity]}
                  onValueChange={(v) => setTenderComplexity(v[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="[&>span]:bg-violet-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{t('govnet.sliderBidders')}</span>
                  <span className="font-bold text-indigo-400">{numBidders} {t('govnet.bids')}</span>
                </div>
                <Slider
                  value={[numBidders]}
                  onValueChange={(v) => setNumBidders(v[0])}
                  min={3}
                  max={30}
                  step={1}
                  className="[&>span]:bg-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-violet-950/40 p-4 rounded-xl border border-violet-800/30 text-center">
                <Scale className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-violet-400 mb-1">{t('govnet.kpiCollusion')}</p>
                <p className="text-3xl font-black text-white">{calculations.collusionMitigated.toFixed(0)}%</p>
              </div>
              <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/30 text-center">
                <Users className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                <p className="text-[10px] uppercase font-black text-indigo-400 mb-1">{t('govnet.kpiImpugnation')}</p>
                <p className="text-3xl font-black text-white">{calculations.impugnationRisk.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-violet-900/30 h-full">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{t('aria.name')}</p>
                <p className="text-xs text-slate-400">{t('govnet.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Sparkles className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{ 
                  __html: t('govnet.aria.insight1', { bidders: numBidders, collusion: calculations.collusionMitigated.toFixed(0) }) 
                }} />
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <Scale className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300" dangerouslySetInnerHTML={{ 
                  __html: t('govnet.aria.insight2', { transparency: calculations.transparencyScore.toFixed(0), impugnation: calculations.impugnationRisk.toFixed(0) }) 
                }} />
              </div>

              {calculations.ethicalAward ? (
                <div className="flex items-start gap-3 p-3 bg-violet-950/30 rounded-lg border border-violet-800/30">
                  <ShieldCheck className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-violet-300" dangerouslySetInnerHTML={{ __html: t('govnet.aria.ethicalCertified') }} />
                </div>
              ) : (
                <div className="flex items-start gap-3 p-3 bg-amber-950/30 rounded-lg border border-amber-800/30">
                  <Building2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-300">{t('govnet.aria.increaseOffers')}</p>
                </div>
              )}
            </div>

            {calculations.ethicalAward && (
              <div className="bg-gradient-to-r from-violet-900/30 to-indigo-900/30 p-4 rounded-xl border border-violet-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-violet-400" />
                  <span className="text-xs font-bold text-violet-300 uppercase">{t('govnet.aria.ethicalBadge')}</span>
                </div>
                <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{ 
                  __html: t('govnet.aria.ethicalStatus', { impugnation: calculations.impugnationRisk.toFixed(0), bidders: numBidders }) 
                }} />
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Pontus-X Hash</span>
                <span className="font-mono text-violet-400">{pontusHash}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                {t('govnet.downloadReport')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
