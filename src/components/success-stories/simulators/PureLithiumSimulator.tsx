import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Gem, TrendingUp, Shield, Award, FileText, Zap } from 'lucide-react';

export const PureLithiumSimulator = () => {
  const [esgImprovement, setEsgImprovement] = useState(22);
  const [projectScale, setProjectScale] = useState(25);

  const calculations = useMemo(() => {
    const baseInvestment = projectScale * 1000000;
    const esgMultiplier = 1 + (esgImprovement * 0.025);
    const attractedCapital = baseInvestment * esgMultiplier;
    const greenPremium = attractedCapital - baseInvestment;
    const confidenceLevel = esgImprovement >= 30 ? 'AAA' : esgImprovement >= 25 ? 'AA+' : esgImprovement >= 15 ? 'A' : 'BBB';
    const investorAccess = esgImprovement >= 20 ? 'Institucional' : 'Retail';
    
    return {
      baseInvestment,
      attractedCapital,
      greenPremium,
      confidenceLevel,
      investorAccess,
      multiplier: esgMultiplier
    };
  }, [esgImprovement, projectScale]);

  const chartData = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const year = 2024 + i;
      const growth = Math.pow(calculations.multiplier, i * 0.5);
      return {
        year: year.toString(),
        capital: Math.round((projectScale * growth) * 10) / 10
      };
    });
  }, [projectScale, calculations.multiplier]);

  const pontusHash = useMemo(() => {
    const base = `0x8E2B${esgImprovement.toString(16).toUpperCase()}${projectScale.toString(16).toUpperCase()}`;
    return `${base}...C7D1`;
  }, [esgImprovement, projectScale]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Panel Izquierdo - Simulación */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-background">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <Gem className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Simulador de Capital ESG</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">PureLithium - Inversión Verde Certificada</p>
                </div>
              </div>
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                Minería ESG
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground font-mono">
              <Shield className="h-3 w-3" />
              <span>Pontus-X: {pontusHash}</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Sliders */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mejora Score ESG</span>
                  <span className="font-semibold text-emerald-400">+{esgImprovement} puntos</span>
                </div>
                <Slider
                  value={[esgImprovement]}
                  onValueChange={(v) => setEsgImprovement(v[0])}
                  min={5}
                  max={40}
                  step={1}
                  className="[&_[role=slider]]:bg-emerald-500"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Escala del proyecto</span>
                  <span className="font-semibold text-emerald-400">{projectScale} M€</span>
                </div>
                <Slider
                  value={[projectScale]}
                  onValueChange={(v) => setProjectScale(v[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-emerald-500"
                />
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">Capital Atraído</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {(calculations.attractedCapital / 1000000).toFixed(1)}M€
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  +{(calculations.greenPremium / 1000000).toFixed(2)}M€ premium verde
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <Award className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">Rating ESG</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{calculations.confidenceLevel}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Acceso {calculations.investorAccess}
                </p>
              </div>
            </div>

            {/* Gráfico */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="capitalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${v}M`} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(1)} M€`, 'Capital']}
                    contentStyle={{ backgroundColor: '#1e1e2e', border: '1px solid #10b981' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="capital" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fill="url(#capitalGradient)" 
                    animationDuration={800}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel Derecho - ARIA */}
      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-emerald-500/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Análisis ARIA</CardTitle>
                <p className="text-xs text-slate-400">Due Diligence Minerals</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-emerald-400 font-semibold">Atracción de Capital:</span> Una mejora de{' '}
                <span className="text-emerald-400 font-bold">+{esgImprovement} puntos</span> en tu score ESG 
                genera un multiplicador de {calculations.multiplier.toFixed(2)}x sobre la inversión base.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-emerald-400 font-semibold">Premium Verde:</span> El mercado valora tu 
                certificación blockchain en{' '}
                <span className="text-emerald-400 font-bold">
                  +{(calculations.greenPremium / 1000000).toFixed(2)} M€
                </span>{' '}
                adicionales sobre proyectos sin trazabilidad verificada.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-emerald-400 font-semibold">Acceso a Fondos:</span> Con rating{' '}
                <span className="text-emerald-400 font-bold">{calculations.confidenceLevel}</span>, 
                accedes al segmento <strong>{calculations.investorAccess}</strong> de fondos de inversión 
                especializados en transición energética.
              </p>
            </div>

            {calculations.confidenceLevel === 'AA+' || calculations.confidenceLevel === 'AAA' ? (
              <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-emerald-500 text-white">
                    🌿 Conflict-Free Certified
                  </Badge>
                </div>
                <p className="text-sm text-slate-300">
                  Tu proyecto cumple con los estándares <strong className="text-emerald-400">EU Critical Raw Materials Act</strong> y 
                  es elegible para financiación del European Investment Bank.
                </p>
              </div>
            ) : null}

            <div className="pt-4 border-t border-slate-700">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                <FileText className="h-4 w-4 mr-2" />
                Descargar Reporte ESG
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
