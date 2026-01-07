import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Truck, Leaf, Banknote, BarChart3, FileText, Zap, Shield } from 'lucide-react';

export const UrbanDeliverSimulator = () => {
  const [fleetSize, setFleetSize] = useState(85);
  const [electricRatio, setElectricRatio] = useState(65);

  const calculations = useMemo(() => {
    const baseEmissionsPerVehicle = 12.5;
    const totalBaseEmissions = fleetSize * baseEmissionsPerVehicle;
    const electricReduction = (electricRatio / 100) * 0.85;
    const currentEmissions = totalBaseEmissions * (1 - electricReduction);
    const emissionsSaved = totalBaseEmissions - currentEmissions;
    const financialSaving = emissionsSaved * 85;
    const csrdScore = Math.min(100, Math.round(electricRatio * 0.95 + (fleetSize > 100 ? 5 : 0)));
    const greenLoanEligibility = electricRatio >= 50 ? 'Elegible' : 'No elegible';
    const interestReduction = electricRatio >= 70 ? 1.5 : electricRatio >= 50 ? 0.75 : 0;
    
    return {
      totalBaseEmissions: Math.round(totalBaseEmissions),
      currentEmissions: Math.round(currentEmissions),
      emissionsSaved: Math.round(emissionsSaved),
      financialSaving: Math.round(financialSaving),
      csrdScore,
      greenLoanEligibility,
      interestReduction
    };
  }, [fleetSize, electricRatio]);

  const chartData = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const year = 2024 + i;
      const projectedRatio = Math.min(100, electricRatio + i * 8);
      const emissions = calculations.totalBaseEmissions * (1 - (projectedRatio / 100) * 0.85);
      return {
        year: year.toString(),
        emissions: Math.round(emissions),
        baseline: calculations.totalBaseEmissions
      };
    });
  }, [electricRatio, calculations.totalBaseEmissions]);

  const pontusHash = useMemo(() => {
    const base = `0x9B3C${fleetSize.toString(16).toUpperCase()}${electricRatio.toString(16).toUpperCase()}`;
    return `${base}...F5E7`;
  }, [fleetSize, electricRatio]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Panel Izquierdo - Simulación */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-teal-500/30 bg-gradient-to-br from-teal-950/20 to-background">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-500/20">
                  <Truck className="h-6 w-6 text-teal-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Simulador de Financiación Verde</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">UrbanDeliver BCN - CSRD Automatizado</p>
                </div>
              </div>
              <Badge variant="outline" className="border-teal-500/50 text-teal-400">
                Movilidad
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
                  <span className="text-muted-foreground">Tamaño de flota</span>
                  <span className="font-semibold text-teal-400">{fleetSize} vehículos</span>
                </div>
                <Slider
                  value={[fleetSize]}
                  onValueChange={(v) => setFleetSize(v[0])}
                  min={10}
                  max={500}
                  step={5}
                  className="[&_[role=slider]]:bg-teal-500"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ratio vehículos eléctricos</span>
                  <span className="font-semibold text-teal-400">{electricRatio}%</span>
                </div>
                <Slider
                  value={[electricRatio]}
                  onValueChange={(v) => setElectricRatio(v[0])}
                  min={10}
                  max={100}
                  step={5}
                  className="[&_[role=slider]]:bg-teal-500"
                />
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20">
                <div className="flex items-center gap-2 text-teal-400 mb-2">
                  <Leaf className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">CO₂ Evitado</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{calculations.emissionsSaved}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  toneladas/año
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20">
                <div className="flex items-center gap-2 text-teal-400 mb-2">
                  <Banknote className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">Ahorro Financiero</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{(calculations.financialSaving / 1000).toFixed(1)}K€</p>
                <p className="text-xs text-muted-foreground mt-1">
                  En préstamos verdes
                </p>
              </div>
            </div>

            {/* Gráfico */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${v}t`} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `${value} tonCO₂`, 
                      name === 'emissions' ? 'Emisiones Actuales' : 'Baseline'
                    ]}
                    contentStyle={{ backgroundColor: '#1e1e2e', border: '1px solid #14b8a6' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="baseline" 
                    stroke="#64748b" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    fill="none"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#14b8a6" 
                    strokeWidth={2}
                    fill="url(#emissionsGradient)" 
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
        <Card className="h-full bg-[#020617] border-teal-500/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Análisis ARIA</CardTitle>
                <p className="text-xs text-slate-400">Green Finance Report</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-teal-400 font-semibold">Impacto Ambiental:</span> Tu flota de{' '}
                <span className="text-teal-400 font-bold">{fleetSize} vehículos</span> con un{' '}
                <span className="text-teal-400 font-bold">{electricRatio}%</span> eléctrico evita{' '}
                <span className="text-teal-400 font-bold">{calculations.emissionsSaved} toneladas</span> de 
                CO₂ anuales frente a una flota 100% diésel.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-teal-400 font-semibold">Ventaja Financiera:</span> Esta reducción 
                de emisiones se traduce en <span className="text-teal-400 font-bold">{(calculations.financialSaving / 1000).toFixed(1)}K€</span> de 
                ahorro anual en acceso a préstamos verdes con tipos reducidos.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-teal-400 font-semibold">Score CSRD:</span> Tu puntuación de{' '}
                <span className="text-teal-400 font-bold">{calculations.csrdScore}/100</span> en 
                el indicador de movilidad sostenible te posiciona como{' '}
                {calculations.csrdScore >= 80 ? 'líder del sector' : calculations.csrdScore >= 60 ? 'referente emergente' : 'en transición'}.
              </p>
            </div>

            {calculations.interestReduction > 0 && (
              <div className="p-4 rounded-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/40">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-teal-500 text-white">
                    🏦 Green Loan Certified
                  </Badge>
                </div>
                <p className="text-sm text-slate-300">
                  Tu flota califica para una reducción de <strong className="text-teal-400">-{calculations.interestReduction}%</strong> en 
                  tipos de interés con el <strong className="text-teal-400">European Green Finance Bank</strong>.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-700">
              <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
                <FileText className="h-4 w-4 mr-2" />
                Descargar Reporte CSRD
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
