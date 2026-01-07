import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Factory, Clock, Users, Zap, FileText, Shield } from 'lucide-react';

export const GigaFactorySimulator = () => {
  const [numSuppliers, setNumSuppliers] = useState(120);
  const [hourlyRate, setHourlyRate] = useState(55);

  const calculations = useMemo(() => {
    const manualDays = 22;
    const pdDays = 1;
    const manualHours = numSuppliers * manualDays * 8;
    const pdHours = numSuppliers * pdDays * 4;
    const hoursSaved = manualHours - pdHours;
    const costSaved = hoursSaved * hourlyRate;
    const ftesLiberated = Math.round((hoursSaved / 2080) * 10) / 10;
    const timeReduction = Math.round(((manualDays - pdDays) / manualDays) * 100);
    
    return {
      manualDays,
      pdDays,
      hoursSaved,
      costSaved,
      ftesLiberated,
      timeReduction
    };
  }, [numSuppliers, hourlyRate]);

  const chartData = [
    { name: 'Manual', days: calculations.manualDays, fill: '#94a3b8' },
    { name: 'ProcureData', days: calculations.pdDays, fill: '#f97316' }
  ];

  const pontusHash = useMemo(() => {
    const base = `0x7F3A${numSuppliers.toString(16).toUpperCase()}${hourlyRate.toString(16).toUpperCase()}`;
    return `${base}...E4B2`;
  }, [numSuppliers, hourlyRate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Panel Izquierdo - Simulación */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-950/20 to-background">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Factory className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Simulador de Onboarding Industrial</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">GigaFactory North - Homologación Acelerada</p>
                </div>
              </div>
              <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                Industrial
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
                  <span className="text-muted-foreground">Proveedores a homologar</span>
                  <span className="font-semibold text-orange-400">{numSuppliers}</span>
                </div>
                <Slider
                  value={[numSuppliers]}
                  onValueChange={(v) => setNumSuppliers(v[0])}
                  min={10}
                  max={500}
                  step={10}
                  className="[&_[role=slider]]:bg-orange-500"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Coste hora administrativo</span>
                  <span className="font-semibold text-orange-400">{hourlyRate} EUROe/h</span>
                </div>
                <Slider
                  value={[hourlyRate]}
                  onValueChange={(v) => setHourlyRate(v[0])}
                  min={30}
                  max={90}
                  step={5}
                  className="[&_[role=slider]]:bg-orange-500"
                />
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-center gap-2 text-orange-400 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">Ahorro Tiempo</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{calculations.timeReduction}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {calculations.hoursSaved.toLocaleString()} horas/año
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-center gap-2 text-orange-400 mb-2">
                  <Users className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">FTEs Liberados</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{calculations.ftesLiberated}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Para tareas estratégicas
                </p>
              </div>
            </div>

            {/* Gráfico */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <XAxis type="number" domain={[0, 25]} tickFormatter={(v) => `${v}d`} />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip 
                    formatter={(value: number) => [`${value} días`, 'Tiempo']}
                    contentStyle={{ backgroundColor: '#1e1e2e', border: '1px solid #f97316' }}
                  />
                  <Bar dataKey="days" radius={[0, 4, 4, 0]} animationDuration={800}>
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
        <Card className="h-full bg-[#020617] border-orange-500/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Análisis ARIA</CardTitle>
                <p className="text-xs text-slate-400">Consultoría en tiempo real</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-orange-400 font-semibold">Impacto Operativo:</span> Con {numSuppliers} proveedores 
                homologados vía ProcureData, tu equipo ahorra{' '}
                <span className="text-orange-400 font-bold">{calculations.costSaved.toLocaleString()} EUROe</span> anuales 
                en costes administrativos directos.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-orange-400 font-semibold">Capacidad Liberada:</span> Equivale a{' '}
                <span className="text-orange-400 font-bold">{calculations.ftesLiberated} empleados</span> a tiempo completo 
                que pueden dedicarse a negociación estratégica y desarrollo de proveedores Tier-1.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-orange-400 font-semibold">Ventaja Competitiva:</span> Reducir el onboarding de 
                22 días a 24 horas te posiciona como cliente preferente ante proveedores de componentes críticos.
              </p>
            </div>

            {calculations.ftesLiberated >= 5 && (
              <div className="p-4 rounded-lg bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-orange-500 text-white">
                    🏆 Homologación Flash
                  </Badge>
                </div>
                <p className="text-sm text-slate-300">
                  Con más de 5 FTEs liberados, calificas para el programa <strong className="text-orange-400">Premium Supplier Network</strong> con 
                  acceso prioritario a nuevos proveedores verificados.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-700">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                <FileText className="h-4 w-4 mr-2" />
                Descargar Reporte PDF
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
