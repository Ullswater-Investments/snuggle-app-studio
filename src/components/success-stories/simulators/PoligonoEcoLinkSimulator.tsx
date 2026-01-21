import React, { useState, useMemo } from 'react';
import { Sun, Users, Zap, FileText, Sparkles, Home } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

interface PoligonoEcoLinkSimulatorProps {
  onValuesChange?: (values: { solarSurplus: number; numCompanies: number; savings: number }) => void;
}

export const PoligonoEcoLinkSimulator = ({ onValuesChange }: PoligonoEcoLinkSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [solarSurplus, setSolarSurplus] = useState(600);
  const [numCompanies, setNumCompanies] = useState(30);

  const calculations = useMemo(() => {
    const independence = Math.min(100, (solarSurplus / numCompanies) * 0.5 + 40);
    const ahorroEuro = solarSurplus * 0.12 * numCompanies;
    const co2Avoided = solarSurplus * 0.4 * 365 / 1000;
    return { independence, ahorroEuro, co2Avoided };
  }, [solarSurplus, numCompanies]);

  const radarData = useMemo(() => [
    { subject: t('poligonoEcoLink.radarAutoconsumo'), value: calculations.independence },
    { subject: t('poligonoEcoLink.radarP2P'), value: 60 + numCompanies * 0.8 },
    { subject: t('poligonoEcoLink.radarStorage'), value: 50 + solarSurplus * 0.05 },
    { subject: t('poligonoEcoLink.radarAI'), value: 75 },
    { subject: t('poligonoEcoLink.radarResilience'), value: calculations.independence * 0.9 },
  ], [calculations.independence, numCompanies, solarSurplus, t]);

  const pontusHash = useMemo(() => `0x${(solarSurplus + numCompanies * 100).toString(16).padStart(8, '0')}...eco_link`, [solarSurplus, numCompanies]);

  React.useEffect(() => {
    onValuesChange?.({ solarSurplus, numCompanies, savings: calculations.ahorroEuro });
  }, [solarSurplus, numCompanies, calculations.ahorroEuro, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-lime-950/40 to-green-950/30 border-lime-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-lime-500/20"><Sun className="w-6 h-6 text-lime-400" /></div>
              <div><h3 className="text-lime-400 font-bold text-sm">{t('poligonoEcoLink.title')}</h3><p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p></div>
            </div>
            <Badge className="bg-lime-500/20 text-lime-400">{t('poligonoEcoLink.kpiIndependence')}: {calculations.independence.toFixed(0)}%</Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-lime-900/30 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3 text-center">{t('poligonoEcoLink.radarTitle')}</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar dataKey="value" stroke="#84cc16" fill="#84cc16" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-lime-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">{t('poligonoEcoLink.sliderSurplus')}</span><span className="font-bold text-lime-400">{solarSurplus}</span></div>
              <Slider value={[solarSurplus]} onValueChange={(v) => setSolarSurplus(v[0])} min={10} max={2000} step={10} className="[&>span]:bg-lime-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">{t('poligonoEcoLink.sliderCompanies')}</span><span className="font-bold text-green-400">{numCompanies}</span></div>
              <Slider value={[numCompanies]} onValueChange={(v) => setNumCompanies(v[0])} min={5} max={100} step={1} className="[&>span]:bg-green-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-lime-900/50 to-green-900/50 p-5 rounded-2xl border border-lime-500/30">
            <p className="text-[10px] uppercase font-black text-lime-300 mb-2">{t('poligonoEcoLink.collectiveSavings')}</p>
            <p className="text-4xl font-black text-white">{calculations.ahorroEuro.toLocaleString()} <span className="text-lg text-lime-400">EUROe</span></p>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-lime-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div><h4 className="text-white font-bold">{t('aria.name')}</h4><p className="text-[10px] text-slate-400">{t('poligonoEcoLink.ariaRole')}</p></div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-lime-900/30">
              <div className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-lime-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">{t('poligonoEcoLink.ariaInsight1Title')}</p>
                  <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{ __html: t('poligonoEcoLink.ariaInsight1Desc', { percent: calculations.independence.toFixed(0), savings: (calculations.ahorroEuro / numCompanies).toFixed(0) }) }} />
                </div>
              </div>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-green-900/30">
              <div className="flex items-start gap-3"><Users className="w-5 h-5 text-green-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">{t('poligonoEcoLink.ariaInsight2Title')}</p>
                  <p className="text-xs text-slate-400">{t('poligonoEcoLink.ariaInsight2Desc', { companies: numCompanies })}</p>
                </div>
              </div>
            </div>
            {calculations.independence >= 70 && (
              <div className="bg-gradient-to-r from-lime-900/30 to-green-900/30 rounded-xl p-4 border border-lime-500/30">
                <div className="flex items-center gap-2 mb-2"><Home className="w-5 h-5 text-lime-400" /><span className="text-sm font-bold text-lime-300">{t('poligonoEcoLink.ariaBadgeTitle')}</span></div>
                <p className="text-xs text-slate-300">{t('poligonoEcoLink.ariaBadgeDesc')}</p>
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-lime-600 to-green-600"><FileText className="w-4 h-4 mr-2" />{t('poligonoEcoLink.downloadReport')}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
