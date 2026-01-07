import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Shirt, ShieldCheck, TrendingUp, AlertTriangle, FileText, Zap } from 'lucide-react';

export const FastFashionSimulator = () => {
  const [transparencyLevel, setTransparencyLevel] = useState(85);
  const [annualVolume, setAnnualVolume] = useState(15);

  const calculations = useMemo(() => {
    const baseConversion = 0.032;
    const transparencyBoost = (transparencyLevel - 50) * 0.0012;
    const newConversion = baseConversion + transparencyBoost;
    const baseRevenue = annualVolume * 1000000;
    const salesUplift = baseRevenue * (newConversion - baseConversion) / baseConversion;
    const riskReduction = Math.min(99, Math.round((transparencyLevel - 50) * 1.98));
    const tierCoverage = Math.min(100, Math.round(transparencyLevel * 1.1));
    
    return {
      baseConversion: (baseConversion * 100).toFixed(1),
      newConversion: (newConversion * 100).toFixed(1),
      salesUplift,
      riskReduction,
      tierCoverage,
      conversionIncrease: ((newConversion - baseConversion) / baseConversion * 100).toFixed(1)
    };
  }, [transparencyLevel, annualVolume]);

  const chartData = [
    { name: 'Sin Sello', conversion: parseFloat(calculations.baseConversion), fill: '#64748b' },
    { name: 'Con Blockchain', conversion: parseFloat(calculations.newConversion), fill: '#d946ef' }
  ];

  const pontusHash = useMemo(() => {
    const base = `0x5C4D${transparencyLevel.toString(16).toUpperCase()}${annualVolume.toString(16).toUpperCase()}`;
    return `${base}...A9F3`;
  }, [transparencyLevel, annualVolume]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Panel Izquierdo - Simulación */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-950/20 to-background">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-fuchsia-500/20">
                  <Shirt className="h-6 w-6 text-fuchsia-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Simulador de Confianza Retail</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">FastFashion - Trazabilidad Ética</p>
                </div>
              </div>
              <Badge variant="outline" className="border-fuchsia-500/50 text-fuchsia-400">
                Retail Moda
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground font-mono">
              <ShieldCheck className="h-3 w-3" />
              <span>Pontus-X: {pontusHash}</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Sliders */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nivel de transparencia cadena</span>
                  <span className="font-semibold text-fuchsia-400">{transparencyLevel}%</span>
                </div>
                <Slider
                  value={[transparencyLevel]}
                  onValueChange={(v) => setTransparencyLevel(v[0])}
                  min={50}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-fuchsia-500"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Volumen anual de ventas</span>
                  <span className="font-semibold text-fuchsia-400">{annualVolume} M€</span>
                </div>
                <Slider
                  value={[annualVolume]}
                  onValueChange={(v) => setAnnualVolume(v[0])}
                  min={1}
                  max={50}
                  step={1}
                  className="[&_[role=slider]]:bg-fuchsia-500"
                />
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
                <div className="flex items-center gap-2 text-fuchsia-400 mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">Sales Uplift</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  +{(calculations.salesUplift / 1000).toFixed(0)}K€
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  +{calculations.conversionIncrease}% conversión
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
                <div className="flex items-center gap-2 text-fuchsia-400 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">Riesgo Reducido</span>
                </div>
                <p className="text-3xl font-bold text-foreground">-{calculations.riskReduction}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Incidencias Tier 3
                </p>
              </div>
            </div>

            {/* Gráfico */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 8]} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Tasa Conversión']}
                    contentStyle={{ backgroundColor: '#1e1e2e', border: '1px solid #d946ef' }}
                  />
                  <Bar dataKey="conversion" radius={[4, 4, 0, 0]} animationDuration={800}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel Derecho - ARIA */}
      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-fuchsia-500/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Análisis ARIA</CardTitle>
                <p className="text-xs text-slate-400">Ethical Supply Chain</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-fuchsia-400 font-semibold">Confianza del Consumidor:</span> Un nivel de 
                transparencia del <span className="text-fuchsia-400 font-bold">{transparencyLevel}%</span> incrementa 
                la conversión en <span className="text-fuchsia-400 font-bold">+{calculations.conversionIncrease}%</span>, 
                generando ventas adicionales por valor de{' '}
                <span className="text-fuchsia-400 font-bold">{(calculations.salesUplift / 1000).toFixed(0)}K€</span>.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-fuchsia-400 font-semibold">Protección Reputacional:</span> La trazabilidad 
                blockchain reduce un <span className="text-fuchsia-400 font-bold">{calculations.riskReduction}%</span> el 
                riesgo de escándalos en proveedores Tier 3, protegiendo el valor de marca ante activismo social.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-fuchsia-400 font-semibold">Cobertura de Cadena:</span> Tu sistema de 
                verificación cubre el <span className="text-fuchsia-400 font-bold">{calculations.tierCoverage}%</span> de 
                los proveedores hasta el origen del algodón y los tintes.
              </p>
            </div>

            {transparencyLevel >= 90 && (
              <div className="p-4 rounded-lg bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border border-fuchsia-500/40">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-fuchsia-500 text-white">
                    ✨ Ethical Supply Verified
                  </Badge>
                </div>
                <p className="text-sm text-slate-300">
                  Con +90% de transparencia, accedes al sello <strong className="text-fuchsia-400">Fair Fashion Alliance</strong> y 
                  a campañas de marketing de impacto social verificado.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-700">
              <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600">
                <FileText className="h-4 w-4 mr-2" />
                Descargar Reporte Ético
              </Button>
              <p className="text-xs text-slate-500 text-center mt-2 font-mono">
                Hash: {pontusHash}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
