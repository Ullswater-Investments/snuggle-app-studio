import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Shirt, Layers, Clock, Shield, FileText, CheckCircle, Award, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

interface BioCottonTraceSimulatorProps {
  onValuesChange?: (values: {
    tonsCotton: number;
    auditLevel: number;
    timeSaved: number;
    balesWithDID: number;
  }) => void;
}

export const BioCottonTraceSimulator: React.FC<BioCottonTraceSimulatorProps> = ({ onValuesChange }) => {
  const { t } = useTranslation('simulators');
  const [tonsCotton, setTonsCotton] = useState(250);
  const [auditLevel, setAuditLevel] = useState(2);

  const baseAuditDays = 5;
  const digitalAuditHours = 2 + (auditLevel * 0.5);
  const timeSaved = (baseAuditDays * 24) - digitalAuditHours;
  const balesWithDID = Math.floor(tonsCotton * 4.5);
  const chainVisibility = auditLevel >= 3 ? 100 : auditLevel * 33;
  const gotsCertified = auditLevel >= 2 && tonsCotton >= 100;

  const pontusHash = `0x${((tonsCotton * auditLevel * 1000) % 0xFFFFFF).toString(16).padStart(6, '0')}...${((balesWithDID) % 0xFFFF).toString(16).padStart(4, '0')}`;

  const custodyChainData = [
    { stage: t('bioCotton.chain.seed'), verified: auditLevel >= 1 ? 100 : 0, label: t('bioCotton.chain.organicOrigin') },
    { stage: t('bioCotton.chain.ginning'), verified: auditLevel >= 1 ? 95 : 0, label: t('bioCotton.chain.processing') },
    { stage: t('bioCotton.chain.spinning'), verified: auditLevel >= 2 ? 90 : 0, label: t('bioCotton.chain.transformation') },
    { stage: t('bioCotton.chain.bale'), verified: auditLevel >= 3 ? 100 : 0, label: t('bioCotton.chain.finalProduct') },
  ];

  const tierLabels = [t('bioCotton.tier1'), t('bioCotton.tier2'), t('bioCotton.tier3')];

  useEffect(() => {
    onValuesChange?.({
      tonsCotton,
      auditLevel,
      timeSaved,
      balesWithDID,
    });
  }, [tonsCotton, auditLevel, timeSaved, balesWithDID, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <Card className="overflow-hidden border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-background to-violet-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Shirt className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t('bioCotton.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('bioCotton.subtitle')}</p>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-emerald-500/50 text-emerald-300">
                {pontusHash}
              </Badge>
            </div>

            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={custodyChainData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" fontSize={12} />
                  <YAxis type="category" dataKey="stage" stroke="#9CA3AF" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number, name: string, props: any) => [`${value}%`, props.payload.label]}
                  />
                  <Bar dataKey="verified" radius={[0, 4, 4, 0]}>
                    {custodyChainData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.verified > 0 ? '#10B981' : '#374151'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Package className="h-4 w-4 text-emerald-400" />
                    {t('bioCotton.slider.production')}
                  </label>
                  <span className="text-sm font-bold text-emerald-400">{tonsCotton} {t('bioCotton.slider.tons')}</span>
                </div>
                <Slider
                  value={[tonsCotton]}
                  onValueChange={(v) => setTonsCotton(v[0])}
                  min={10}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10 {t('bioCotton.slider.tons')}</span>
                  <span>1.000 {t('bioCotton.slider.tons')}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Layers className="h-4 w-4 text-violet-400" />
                    {t('bioCotton.slider.auditLevel')}
                  </label>
                  <span className="text-sm font-bold text-violet-400">{tierLabels[auditLevel - 1]}</span>
                </div>
                <Slider
                  value={[auditLevel]}
                  onValueChange={(v) => setAuditLevel(v[0])}
                  min={1}
                  max={3}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Tier 1</span>
                  <span>Tier 3</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-muted-foreground">{t('bioCotton.kpi.balesWithDID')}</span>
                </div>
                <p className="text-2xl font-bold text-emerald-400">{balesWithDID.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{t('bioCotton.kpi.uniqueIdentity')}</p>
              </div>
              <div className="bg-violet-500/10 rounded-xl p-4 border border-violet-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-violet-400" />
                  <span className="text-xs text-muted-foreground">{t('bioCotton.kpi.timeSaved')}</span>
                </div>
                <p className="text-2xl font-bold text-violet-400">{timeSaved.toFixed(0)}h</p>
                <p className="text-xs text-muted-foreground">{t('bioCotton.kpi.vsTraditional')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-emerald-500/30">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <h4 className="font-semibold text-white">{t('aria.name')}</h4>
                <p className="text-xs text-slate-400">{t('bioCotton.aria.role')}</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-lg ${gotsCertified ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-violet-500/10 border-violet-500/20'} border`}>
                <div className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${gotsCertified ? 'text-emerald-400' : 'text-violet-400'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-slate-200">
                      {t('bioCotton.aria.insight1Desc', { hours: digitalAuditHours.toFixed(1) })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <Layers className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-200">
                      {t('bioCotton.aria.insight2Desc', { visibility: chainVisibility })}
                      {auditLevel >= 3 
                        ? ` ${t('bioCotton.aria.fullTraceability')}` 
                        : ` ${t('bioCotton.aria.upgradeTier3')}`
                      }
                    </p>
                  </div>
                </div>
              </div>

              {gotsCertified && (
                <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-200">
                        {t('bioCotton.aria.gotsCertified')}
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
                <button className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                  <FileText className="h-3 w-3" />
                  {t('bioCotton.exportGOTS')}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};