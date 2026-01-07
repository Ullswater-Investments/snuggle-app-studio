import React, { useState, useMemo } from 'react';
import { Users, TrendingUp, Heart, Award, Building2, FileText, Sparkles, HandHeart } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

interface SocialHubSimulatorProps {
  onValuesChange?: (values: { ethicalSpend: number; insertionRate: number; socialValue: number }) => void;
}

export const SocialHubSimulator = ({ onValuesChange }: SocialHubSimulatorProps) => {
  const [ethicalSpend, setEthicalSpend] = useState(150000);
  const [insertionRate, setInsertionRate] = useState(20);

  const calculations = useMemo(() => {
    const sroiMultiplier = 3.8;
    const socialValue = ethicalSpend * sroiMultiplier;
    const publicSaving = ethicalSpend * 0.45;
    const jobsCreated = Math.floor(ethicalSpend / 15000);
    const bidIncrease = Math.min(200, 150 + (insertionRate * 2.5));
    return { sroiMultiplier, socialValue, publicSaving, jobsCreated, bidIncrease };
  }, [ethicalSpend, insertionRate]);

  const chartData = useMemo(() => [
    { name: 'Gasto Directo', value: ethicalSpend, fill: '#8b5cf6' },
    { name: 'Valor Social', value: calculations.socialValue, fill: '#a855f7' },
  ], [ethicalSpend, calculations.socialValue]);

  const pontusHash = useMemo(() => {
    const base = (ethicalSpend / 100 + insertionRate * 500).toString(16);
    return `0x${base.padStart(8, '0')}...sroi_cert`;
  }, [ethicalSpend, insertionRate]);

  React.useEffect(() => {
    onValuesChange?.({ ethicalSpend, insertionRate, socialValue: calculations.socialValue });
  }, [ethicalSpend, insertionRate, calculations.socialValue, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Simulation Panel */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-violet-950/40 to-purple-950/30 border-violet-500/20 shadow-2xl overflow-hidden p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-500/20">
                <Heart className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-violet-400 font-bold text-sm">SROI IMPACT CALCULATOR</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className="bg-violet-500/20 text-violet-400">Valor Social Certificado</Badge>
          </div>

          {/* SROI Visual Header */}
          <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-2xl p-5 border border-violet-500/20 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-8 h-8 text-violet-400" />
              <span className="text-xl font-black text-white uppercase tracking-wider">Multiplicador de Impacto SROI</span>
            </div>
            
            <div className="flex items-center justify-center gap-6 py-4">
              <div className="text-center">
                <p className="text-4xl font-black text-white">1</p>
                <p className="text-xs text-violet-300">€ Invertido</p>
              </div>
              <TrendingUp className="w-8 h-8 text-violet-400 animate-pulse" />
              <div className="text-center">
                <p className="text-4xl font-black text-violet-400">{calculations.sroiMultiplier}</p>
                <p className="text-xs text-violet-300">€ Valor Social</p>
              </div>
            </div>
          </div>

          {/* Impact Chart */}
          <div className="bg-slate-900/60 rounded-xl p-4 border border-violet-900/20 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-400 uppercase font-bold">Comparativa Inversión vs Retorno Social</span>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} width={90} />
                  <Tooltip 
                    contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toLocaleString()} €`, '']}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-violet-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Inversión Ética Anual</span>
                <span className="font-bold text-violet-400">{ethicalSpend.toLocaleString()} €</span>
              </div>
              <Slider value={[ethicalSpend]} onValueChange={(v) => setEthicalSpend(v[0])} min={10000} max={1000000} step={10000} className="[&>span]:bg-violet-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Tasa de Inserción Laboral</span>
                <span className="font-bold text-purple-400">{insertionRate}%</span>
              </div>
              <Slider value={[insertionRate]} onValueChange={(v) => setInsertionRate(v[0])} min={1} max={50} step={1} className="[&>span]:bg-purple-600" />
            </div>
          </div>

          {/* KPIs Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-violet-950/40 p-4 rounded-xl border border-violet-800/30 text-center">
              <Users className="w-6 h-6 text-violet-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">{calculations.jobsCreated}</p>
              <p className="text-[10px] text-violet-300 uppercase">Empleos Inclusivos</p>
            </div>
            <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-800/30 text-center">
              <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">1:{calculations.sroiMultiplier}</p>
              <p className="text-[10px] text-purple-300 uppercase">Ratio SROI</p>
            </div>
            <div className="bg-fuchsia-950/40 p-4 rounded-xl border border-fuchsia-800/30 text-center">
              <Building2 className="w-6 h-6 text-fuchsia-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">+{calculations.bidIncrease.toFixed(0)}%</p>
              <p className="text-[10px] text-fuchsia-300 uppercase">Licitaciones</p>
            </div>
          </div>

          {/* Total Social Value */}
          <div className="bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50 p-5 rounded-2xl border border-violet-500/30">
            <p className="text-[10px] uppercase font-black text-violet-300 mb-2">Valor Social Total Generado</p>
            <p className="text-4xl font-black text-white">{calculations.socialValue.toLocaleString()} <span className="text-lg text-violet-400">EUROe</span></p>
            <Badge className="mt-2 bg-green-500/20 text-green-300">Certificado Blockchain</Badge>
          </div>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-violet-500/20 shadow-2xl h-full p-6">
          {/* ARIA Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">Asesora de Impacto Social</p>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-violet-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-violet-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Impacto Multiplicado</p>
                  <p className="text-xs text-slate-400">
                    Tu inversión genera un impacto de <span className="text-violet-400 font-bold">1:{calculations.sroiMultiplier}</span>. Por cada euro gastado, devuelves <span className="text-white font-bold">{calculations.sroiMultiplier} €</span> a la sociedad en forma de empleo inclusivo.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3">
                <HandHeart className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Ahorro Público Generado</p>
                  <p className="text-xs text-slate-400">
                    Cada persona insertada laboralmente ahorra <span className="text-emerald-400 font-bold">{calculations.publicSaving.toLocaleString()} €</span> en subsidios y ayudas públicas, liberando recursos para otros programas sociales.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-purple-900/30">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Ventaja en Licitaciones</p>
                  <p className="text-xs text-slate-400">
                    Tu certificación SROI blockchain aumenta las adjudicaciones en <span className="text-purple-400 font-bold">+{calculations.bidIncrease.toFixed(0)}%</span>, ya que muchas administraciones priorizan proveedores con impacto social verificado.
                  </p>
                </div>
              </div>
            </div>

            {insertionRate >= 25 && (
              <div className="bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 rounded-xl p-4 border border-violet-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-fuchsia-400" />
                  <span className="text-sm font-bold text-fuchsia-300">Centro Especial de Empleo</span>
                </div>
                <p className="text-xs text-slate-300">
                  Con una tasa de inserción del {insertionRate}%, cumples los requisitos para calificación como Centro Especial de Empleo, accediendo a beneficios fiscales adicionales.
                </p>
              </div>
            )}

            {calculations.jobsCreated >= 10 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">Impacto Comunitario Verificado</span>
                </div>
                <p className="text-xs text-slate-300">
                  Has generado {calculations.jobsCreated} empleos inclusivos. Este nivel de impacto te posiciona como empresa de referencia en economía social y solidaria.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[10px] font-mono text-slate-500 mb-3">{pontusHash}</p>
            <Button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Certificado SROI
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
