import React, { useState, useMemo } from 'react';
import { TreePine, Leaf, MapPin, FileText, Sparkles } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface BioHeatDistrictSimulatorProps {
  onValuesChange?: (values: { tonsPellets: number; transportDistance: number; revenue: number }) => void;
}

export const BioHeatDistrictSimulator = ({ onValuesChange }: BioHeatDistrictSimulatorProps) => {
  const { t } = useTranslation('simulators');
  const [tonsPellets, setTonsPellets] = useState(3000);
  const [transportDistance, setTransportDistance] = useState(80);

  const calculations = useMemo(() => {
    const carbonNeutral = transportDistance < 100;
    const premiumPrice = carbonNeutral ? 1.12 : 1.0;
    const annualRevenue = tonsPellets * 180 * premiumPrice;
    const co2Saved = tonsPellets * 1.8;
    return { carbonNeutral, premiumPrice, annualRevenue, co2Saved };
  }, [tonsPellets, transportDistance]);

  const pontusHash = useMemo(() => `0x${(tonsPellets + transportDistance * 10).toString(16).padStart(8, '0')}...bio_heat`, [tonsPellets, transportDistance]);

  React.useEffect(() => {
    onValuesChange?.({ tonsPellets, transportDistance, revenue: calculations.annualRevenue });
  }, [tonsPellets, transportDistance, calculations.annualRevenue, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-amber-950/40 to-orange-950/30 border-amber-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20"><TreePine className="w-6 h-6 text-amber-400" /></div>
              <div><h3 className="text-amber-400 font-bold text-sm">{t('bioheat.title')}</h3><p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p></div>
            </div>
            <Badge className={calculations.carbonNeutral ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
              {calculations.carbonNeutral ? t('bioheat.carbonNeutral') : t('bioheat.verifyOrigin')}
            </Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-6 border border-amber-900/30 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <TreePine className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                <p className="text-2xl font-black text-white">{tonsPellets.toLocaleString()}</p>
                <p className="text-xs text-slate-400">{t('bioheat.tonsYear')}</p>
              </div>
              <div className="flex-1 mx-6">
                <div className="h-2 bg-slate-700 rounded-full">
                  <div className={`h-full rounded-full transition-all ${calculations.carbonNeutral ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(100, 100 - transportDistance)}%` }} />
                </div>
                <p className="text-center text-xs text-slate-400 mt-2">{transportDistance} {t('bioheat.distance')}</p>
              </div>
              <div className="text-center">
                <MapPin className="w-12 h-12 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-black text-white">+{((calculations.premiumPrice - 1) * 100).toFixed(0)}%</p>
                <p className="text-xs text-slate-400">{t('bioheat.premium')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-amber-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">{t('bioheat.annualProduction')}</span><span className="font-bold text-amber-400">{tonsPellets.toLocaleString()}</span></div>
              <Slider value={[tonsPellets]} onValueChange={(v) => setTonsPellets(v[0])} min={100} max={10000} step={100} className="[&>span]:bg-amber-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">{t('bioheat.transportDistance')}</span><span className={`font-bold ${transportDistance < 100 ? 'text-green-400' : 'text-orange-400'}`}>{transportDistance}</span></div>
              <Slider value={[transportDistance]} onValueChange={(v) => setTransportDistance(v[0])} min={10} max={500} step={10} className="[&>span]:bg-orange-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 p-5 rounded-2xl border border-amber-500/30">
            <p className="text-[10px] uppercase font-black text-amber-300 mb-2">{t('bioheat.annualRevenue')}</p>
            <p className="text-4xl font-black text-white">{calculations.annualRevenue.toLocaleString()} <span className="text-lg text-amber-400">EUROe</span></p>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-amber-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div><h4 className="text-white font-bold">{t('aria.name')}</h4><p className="text-[10px] text-slate-400">{t('bioheat.aria.role')}</p></div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-amber-900/30">
              <div className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-amber-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">{t('bioheat.aria.traceabilityTitle')}</p>
                  <p className="text-xs text-slate-400">{calculations.carbonNeutral ? t('bioheat.aria.traceabilityNeutral') : t('bioheat.aria.traceabilityPending')}</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-green-900/30">
              <div className="flex items-start gap-3"><Leaf className="w-5 h-5 text-green-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">{t('bioheat.aria.climateTitle')}</p>
                  <p className="text-xs text-slate-400" dangerouslySetInnerHTML={{
                    __html: t('bioheat.aria.climateDesc', { tons: calculations.co2Saved.toLocaleString() })
                  }} />
                </div>
              </div>
            </div>
            {calculations.carbonNeutral && (
              <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-2"><TreePine className="w-5 h-5 text-amber-400" /><span className="text-sm font-bold text-amber-300">{t('bioheat.aria.verifiedTitle')}</span></div>
                <p className="text-xs text-slate-300">{t('bioheat.aria.verifiedDesc')}</p>
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600"><FileText className="w-4 h-4 mr-2" />{t('bioheat.downloadCert')}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
