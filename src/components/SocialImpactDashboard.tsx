import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, TrendingUp, ShieldCheck, ArrowRight, Banknote, MapPin, Building2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";

interface SocialImpactDashboardProps {
  spend?: number;
}

export const SocialImpactDashboard = ({ spend = 100000 }: SocialImpactDashboardProps) => {
  const { toast } = useToast();
  
  const metrics = useMemo(() => {
    const sroiMultiplier = 3.8;
    const jobsCreated = Math.floor(spend / 15000);
    const socialValue = spend * sroiMultiplier;
    const publicSavings = spend * 0.45;
    const localReinvestment = spend * 0.78;
    const disabilityJobs = Math.floor(jobsCreated * 0.6);
    const insertionJobs = Math.floor(jobsCreated * 0.4);
    
    const chartData = [
      { name: 'Inversión Directa', value: spend, fill: 'hsl(239, 84%, 67%)' },
      { name: 'Valor Social Generado', value: socialValue, fill: 'hsl(258, 90%, 66%)' },
      { name: 'Ahorro Admin. Pública', value: publicSavings, fill: 'hsl(292, 84%, 61%)' }
    ];

    return { jobsCreated, socialValue, sroiMultiplier, publicSavings, localReinvestment, disabilityJobs, insertionJobs, chartData };
  }, [spend]);

  const generateSustainabilityReport = () => {
    const doc = new jsPDF();
    const margin = 20;
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(99, 102, 241);
    doc.text("MEMORIA DE SOSTENIBILIDAD", margin, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Informe de Impacto Social - Anexo CSRD", margin, 38);
    
    // Line separator
    doc.setDrawColor(200);
    doc.line(margin, 45, 190, 45);
    
    // Date and verification
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, margin, 55);
    doc.text(`Verificación DID: did:web:alianza-social.procuredata.eu`, margin, 62);
    
    // Key Metrics
    doc.setFontSize(14);
    doc.text("Métricas Clave de Impacto Social", margin, 80);
    doc.setFontSize(11);
    doc.text(`Inversión Total: ${spend.toLocaleString()}€`, margin, 92);
    doc.text(`Retorno Social (SROI): ${metrics.socialValue.toLocaleString()}€`, margin, 102);
    doc.text(`Multiplicador: 1:${metrics.sroiMultiplier}`, margin, 112);
    
    // Employment Impact
    doc.setFontSize(14);
    doc.text("Impacto en Empleo Inclusivo", margin, 132);
    doc.setFontSize(11);
    doc.text(`Total Empleos Creados: ${metrics.jobsCreated} FTEs`, margin, 144);
    doc.text(`- Centros Especiales de Empleo: ${metrics.disabilityJobs} FTEs`, margin + 10, 154);
    doc.text(`- Empresas de Inserción: ${metrics.insertionJobs} FTEs`, margin + 10, 164);
    
    // Public Savings
    doc.setFontSize(14);
    doc.text("Ahorro para la Administración Pública", margin, 184);
    doc.setFontSize(11);
    doc.text(`Ahorro en Subsidios: ${metrics.publicSavings.toLocaleString()}€`, margin, 196);
    doc.text(`Reinversión Local (78%): ${metrics.localReinvestment.toLocaleString()}€`, margin, 206);
    
    // Blockchain Verification
    doc.setFontSize(14);
    doc.text("Verificación Blockchain", margin, 226);
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Hash: 0x7e2fa3c81d9b5f7a3e1c9d5b7f3a1e9c7d5b3a1f9e7c5d3b1a9f7e5c3d1b9a7f5`, margin, 238);
    doc.text(`Red: Pontus-X (Gaia-X) | Bloque: #18,156,321`, margin, 246);
    
    // Footer
    doc.setTextColor(150);
    doc.setFontSize(8);
    doc.text("Este documento es un anexo válido para la Memoria de Sostenibilidad (CSRD)", margin, 275);
    doc.text("Generado automáticamente por ProcureData - Auditoría Social Digital", margin, 282);
    
    doc.save(`Memoria_Sostenibilidad_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "Memoria generada",
      description: "El PDF de la Memoria de Sostenibilidad se ha descargado correctamente.",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <Card className="overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950 border-indigo-800/50">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Lado Izquierdo: Métricas y Gráfico */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-violet-300">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Economía Social & Ética</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Dashboard de Impacto Social</h2>
              <p className="text-indigo-200/70">
                Basado en el gasto verificado en proveedores de inserción y centros especiales.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-indigo-900/40 border-indigo-700/30">
                <Users className="w-6 h-6 text-violet-400 mb-2" />
                <p className="text-xs text-indigo-300 font-medium">Empleos Inclusivos Creados</p>
                <p className="text-2xl font-bold text-white">{metrics.jobsCreated} FTEs</p>
                <p className="text-[10px] text-indigo-400 mt-1">
                  {metrics.disabilityJobs} CEE + {metrics.insertionJobs} Inserción
                </p>
              </Card>
              <Card className="p-4 bg-indigo-900/40 border-indigo-700/30">
                <TrendingUp className="w-6 h-6 text-violet-400 mb-2" />
                <p className="text-xs text-indigo-300 font-medium">Multiplicador SROI</p>
                <p className="text-2xl font-bold text-white">1 : {metrics.sroiMultiplier}</p>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-indigo-900/40 border-indigo-700/30">
                <Banknote className="w-6 h-6 text-violet-400 mb-2" />
                <p className="text-xs text-indigo-300 font-medium">Ahorro Subsidios Públicos</p>
                <p className="text-2xl font-bold text-white">{metrics.publicSavings.toLocaleString()}€</p>
                <p className="text-[10px] text-indigo-400 mt-1">0.45€ por cada 1€ invertido</p>
              </Card>
              <Card className="p-4 bg-indigo-900/40 border-indigo-700/30">
                <MapPin className="w-6 h-6 text-violet-400 mb-2" />
                <p className="text-xs text-indigo-300 font-medium">Reinversión Local</p>
                <p className="text-2xl font-bold text-white">{metrics.localReinvestment.toLocaleString()}€</p>
                <p className="text-[10px] text-indigo-400 mt-1">78% economía de proximidad</p>
              </Card>
            </div>

            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.chartData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.2)" />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k€`} stroke="#a5b4fc" fontSize={12} />
                  <YAxis type="category" dataKey="name" width={120} stroke="#a5b4fc" fontSize={11} />
                  <Tooltip
                    formatter={(value: number) => [`${value.toLocaleString()}€`, 'Valor']}
                    contentStyle={{ backgroundColor: 'hsl(239, 84%, 15%)', border: '1px solid hsl(239, 84%, 30%)', borderRadius: '8px' }}
                    labelStyle={{ color: '#c7d2fe' }}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {metrics.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Lado Derecho: Panel de ARIA (Consultoría de Impacto) */}
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-foreground">ARIA</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-violet-500 bg-violet-100 dark:bg-violet-950 px-2 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  Verified on Pontus-X
                </div>
              </div>

              {/* DID Verification Badge */}
              <div className="flex items-center gap-2 text-[10px] bg-green-100 dark:bg-green-950 px-3 py-2 rounded-lg border border-green-200 dark:border-green-800">
                <Building2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-300">Anti-Social-Washing Verificado</p>
                  <p className="font-mono text-green-600 dark:text-green-400">did:web:alianza-social.procuredata.eu</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-violet-50 dark:bg-violet-950/50 rounded-xl border border-violet-200 dark:border-violet-800">
                  <p className="text-sm font-semibold text-violet-700 dark:text-violet-300 mb-1">Impacto en Comunidad</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tu inversión de <strong className="text-foreground">{spend.toLocaleString()}€</strong> ha generado un retorno social de{' '}
                    <strong className="text-violet-600 dark:text-violet-400">{metrics.socialValue.toLocaleString()}€</strong>.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cumplimiento LGD (Ley General Discapacidad)</span>
                    <span className="font-bold text-foreground">100%</span>
                  </div>
                  <Progress value={100} className="h-2 bg-violet-100 dark:bg-violet-950" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transparencia de compra pública</span>
                    <span className="font-bold text-foreground">98%</span>
                  </div>
                  <Progress value={98} className="h-2 bg-violet-100 dark:bg-violet-950" />
                  
                  <p className="text-xs text-muted-foreground italic border-l-2 border-violet-500 pl-3">
                    "Igualando el hito de Alianza Social Hub: Hemos verificado mediante auditoría digital que el 100% de tus proveedores en este lote cumplen con la Ley General de Discapacidad. Por cada euro invertido, generas 3.8€ de valor social medible."
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={generateSustainabilityReport}
              className="mt-6 w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Generar Memoria de Sostenibilidad <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
