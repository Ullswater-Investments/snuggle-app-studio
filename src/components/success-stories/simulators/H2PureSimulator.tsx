import React, { useState, useMemo } from 'react';
import { Leaf, Award, Zap, FileText, Sparkles, DollarSign } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface H2PureSimulatorProps {
  onValuesChange?: (values: { tonsProduced: number; renewableMix: number; subsidyAmount: number }) => void;
}

export const H2PureSimulator = ({ onValuesChange }: H2PureSimulatorProps) => {
  const [tonsProduced, setTonsProduced] = useState(150);
  const [renewableMix, setRenewableMix] = useState(92);

  const calculations = useMemo(() => {
    const greenPurity = renewableMix >= 95 ? 100 : renewableMix;
    const subsidyAmount = (tonsProduced * 2500) * (greenPurity / 100);
    const certifHyStatus = renewableMix >= 95 ? 'EMITIDO' : 'PENDIENTE';
    const co2Avoided = tonsProduced * 9.3;
    return { greenPurity, subsidyAmount, certifHyStatus, co2Avoided };
  }, [tonsProduced, renewableMix]);

  const pieData = useMemo(() => [
    { name: 'Renovable', value: renewableMix, color: '#10b981' },
    { name: 'No Renovable', value: 100 - renewableMix, color: '#64748b' },
  ], [renewableMix]);

  const pontusHash = useMemo(() => {
    const base = (tonsProduced * 10 + renewableMix).toString(16);
    return `0x${base.padStart(8, '0')}...h2_cert`;
  }, [tonsProduced, renewableMix]);

  React.useEffect(() => {
    onValuesChange?.({ tonsProduced, renewableMix, subsidyAmount: calculations.subsidyAmount });
  }, [tonsProduced, renewableMix, calculations.subsidyAmount, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-emerald-950/40 to-teal-950/30 border-emerald-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20"><Leaf className="w-6 h-6 text-emerald-400" /></div>
              <div>
                <h3 className="text-emerald-400 font-bold text-sm">H2 VERDE - CERTIFHY</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className={calculations.certifHyStatus === 'EMITIDO' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
              Pasaporte {calculations.certifHyStatus}
            </Badge>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-emerald-900/30 mb-6">
            <p className="text-xs text-slate-400 uppercase font-bold mb-3 text-center">Pureza de Origen Renovable</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-emerald-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">Producción Anual (toneladas)</span><span className="font-bold text-emerald-400">{tonsProduced}</span></div>
              <Slider value={[tonsProduced]} onValueChange={(v) => setTonsProduced(v[0])} min={10} max={1000} step={10} className="[&>span]:bg-emerald-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-300">Mix Renovable</span><span className={`font-bold ${renewableMix >= 95 ? 'text-emerald-400' : 'text-yellow-400'}`}>{renewableMix}%</span></div>
              <Slider value={[renewableMix]} onValueChange={(v) => setRenewableMix(v[0])} min={0} max={100} step={1} className="[&>span]:bg-teal-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 p-5 rounded-2xl border border-emerald-500/30">
            <p className="text-[10px] uppercase font-black text-emerald-300 mb-2">Subvención UE Desbloqueada</p>
            <p className="text-4xl font-black text-white">{calculations.subsidyAmount.toLocaleString()} <span className="text-lg text-emerald-400">EUROe</span></p>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-emerald-500/20 shadow-2xl h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div><h4 className="text-white font-bold">ARIA</h4><p className="text-[10px] text-slate-400">Asesora de Hidrógeno Verde</p></div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">Certificación CertifHy</p>
                  <p className="text-xs text-slate-400">{renewableMix >= 95 ? `Al superar el 95% de mix renovable, he emitido el Pasaporte Digital de Hidrógeno, desbloqueando ${calculations.subsidyAmount.toLocaleString()} € en fondos europeos.` : 'Aumenta el mix renovable al 95% para obtener la certificación CertifHy completa.'}</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-teal-900/30">
              <div className="flex items-start gap-3"><Zap className="w-5 h-5 text-teal-400 mt-0.5" />
                <div><p className="text-sm text-white font-medium mb-1">Impacto Climático</p>
                  <p className="text-xs text-slate-400">Tu producción de H2 verde evita <span className="text-teal-400 font-bold">{calculations.co2Avoided.toFixed(0)} tonCO2</span> anuales.</p>
                </div>
              </div>
            </div>
            {renewableMix >= 95 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2"><Award className="w-5 h-5 text-emerald-400" /><span className="text-sm font-bold text-emerald-300">H2 Verde Certificado</span></div>
                <p className="text-xs text-slate-300">Elegible para proyectos IPCEI y fondos NextGenerationEU.</p>
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800">
            <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600"><FileText className="w-4 h-4 mr-2" />Descargar Pasaporte H2</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
