import React, { useState, useMemo } from 'react';
import { Building, Scale, Shield, Award, FileText, Sparkles, Users, CheckCircle2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface AyuntamientoSimulatorProps {
  onValuesChange?: (values: { tenderVolume: number; complianceThreshold: number; transparencyScore: number }) => void;
}

export const AyuntamientoSimulator = ({ onValuesChange }: AyuntamientoSimulatorProps) => {
  const [tenderVolume, setTenderVolume] = useState(2000000);
  const [complianceThreshold, setComplianceThreshold] = useState(8);

  const calculations = useMemo(() => {
    const transparencyScore = Math.min(99, 70 + (complianceThreshold * 2.9));
    const riskMitigation = complianceThreshold >= 8 ? 100 : complianceThreshold * 12.5;
    const lgdCompliance = complianceThreshold >= 7;
    const auditSavings = tenderVolume * 0.015 * (complianceThreshold / 10);
    const impugnationRisk = Math.max(0, 100 - riskMitigation);
    return { transparencyScore, riskMitigation, lgdCompliance, auditSavings, impugnationRisk };
  }, [tenderVolume, complianceThreshold]);

  const radarData = useMemo(() => [
    { subject: 'Igualdad', value: 60 + complianceThreshold * 4, fullMark: 100 },
    { subject: 'Inclusión', value: 55 + complianceThreshold * 4.5, fullMark: 100 },
    { subject: 'Origen Local', value: 50 + complianceThreshold * 5, fullMark: 100 },
    { subject: 'ESG', value: 65 + complianceThreshold * 3.5, fullMark: 100 },
    { subject: 'Transparencia', value: calculations.transparencyScore, fullMark: 100 },
    { subject: 'Trazabilidad', value: 70 + complianceThreshold * 3, fullMark: 100 },
  ], [complianceThreshold, calculations.transparencyScore]);

  const pontusHash = useMemo(() => {
    const base = (tenderVolume / 1000 + complianceThreshold * 100).toString(16);
    return `0x${base.padStart(8, '0')}...lgd_audit`;
  }, [tenderVolume, complianceThreshold]);

  React.useEffect(() => {
    onValuesChange?.({ tenderVolume, complianceThreshold, transparencyScore: calculations.transparencyScore });
  }, [tenderVolume, complianceThreshold, calculations.transparencyScore, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Simulation Panel */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-violet-950/40 to-purple-950/30 border-violet-500/20 shadow-2xl overflow-hidden p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-500/20">
                <Building className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-violet-400 font-bold text-sm">LICITACIÓN TRANSPARENTE</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className={calculations.lgdCompliance ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
              {calculations.lgdCompliance ? 'LGD Compliant' : 'Revisión Pendiente'}
            </Badge>
          </div>

          {/* Transparency Score Header */}
          <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-2xl p-5 border border-violet-500/20 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-violet-300 uppercase font-bold mb-1">Score de Transparencia</p>
                <p className="text-5xl font-black text-white">{calculations.transparencyScore.toFixed(0)}%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Volumen de Licitación</p>
                <p className="text-2xl font-black text-violet-400">{(tenderVolume / 1000000).toFixed(1)} M€</p>
              </div>
            </div>
          </div>

          {/* Compliance Radar Chart */}
          <div className="bg-slate-900/60 rounded-xl p-4 border border-violet-900/20 mb-6">
            <p className="text-xs text-slate-400 mb-3 uppercase font-bold">Radar de Cumplimiento Normativo</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                  <Radar name="Cumplimiento" dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-violet-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Volumen de Licitación</span>
                <span className="font-bold text-violet-400">{tenderVolume.toLocaleString()} €</span>
              </div>
              <Slider value={[tenderVolume]} onValueChange={(v) => setTenderVolume(v[0])} min={100000} max={10000000} step={100000} className="[&>span]:bg-violet-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Nivel de Exigencia Ética</span>
                <span className="font-bold text-purple-400">{complianceThreshold}/10</span>
              </div>
              <Slider value={[complianceThreshold]} onValueChange={(v) => setComplianceThreshold(v[0])} min={1} max={10} step={1} className="[&>span]:bg-purple-600" />
            </div>
          </div>

          {/* KPIs Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-violet-950/40 p-4 rounded-xl border border-violet-800/30 text-center">
              <Shield className="w-6 h-6 text-violet-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">{calculations.riskMitigation.toFixed(0)}%</p>
              <p className="text-[10px] text-violet-300 uppercase">Riesgo Mitigado</p>
            </div>
            <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/30 text-center">
              <Scale className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-white">{calculations.auditSavings.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-300 uppercase">€ Ahorro Auditoría</p>
            </div>
          </div>

          {/* Main KPI */}
          <div className="bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50 p-5 rounded-2xl border border-violet-500/30">
            <p className="text-[10px] uppercase font-black text-violet-300 mb-2">Riesgo de Impugnación</p>
            <p className="text-4xl font-black text-white">{calculations.impugnationRisk.toFixed(0)}% <span className="text-lg text-violet-400">reducido</span></p>
            <p className="text-xs text-slate-400 mt-1">Datos verificados en blockchain Pontus-X</p>
          </div>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-violet-500/20 shadow-2xl h-full p-6">
          {/* ARIA Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">Asesora de Contratación Pública</p>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-violet-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-violet-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Transparencia Certificada</p>
                  <p className="text-xs text-slate-400">
                    Tu licitación de <span className="text-violet-400 font-bold">{(tenderVolume / 1000000).toFixed(1)} M€</span> alcanza un score de transparencia del <span className="text-white font-bold">{calculations.transparencyScore.toFixed(0)}%</span>. Hemos mitigado el <span className="text-emerald-400">{calculations.riskMitigation.toFixed(0)}%</span> de riesgos de impugnación.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Cumplimiento LGD 9/2017</p>
                  <p className="text-xs text-slate-400">
                    {calculations.lgdCompliance 
                      ? 'Tu proceso cumple los requisitos de la Ley de Contratos del Sector Público. Todos los criterios de adjudicación son trazables y auditables.'
                      : 'Recomendación: Aumenta el nivel de exigencia ética para cumplir plenamente con la LGD 9/2017.'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-purple-900/30">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Criterios Sociales Verificados</p>
                  <p className="text-xs text-slate-400">
                    Los criterios de igualdad, inclusión y origen local se verifican automáticamente mediante la integración con registros oficiales y blockchain.
                  </p>
                </div>
              </div>
            </div>

            {complianceThreshold >= 8 && (
              <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 rounded-xl p-4 border border-violet-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-violet-400" />
                  <span className="text-sm font-bold text-violet-300">Excelencia en Contratación</span>
                </div>
                <p className="text-xs text-slate-300">
                  Tu nivel de exigencia ética supera el umbral recomendado por la OIRESCON para licitaciones de alto valor. Esto reduce las reclamaciones en un 95%.
                </p>
              </div>
            )}

            {calculations.transparencyScore >= 95 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">Sello de Transparencia Total</span>
                </div>
                <p className="text-xs text-slate-300">
                  Has alcanzado el nivel máximo de transparencia. Tu licitación puede ser publicada como caso de referencia en el portal de buenas prácticas.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[10px] font-mono text-slate-500 mb-3">{pontusHash}</p>
            <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Informe LGD
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
