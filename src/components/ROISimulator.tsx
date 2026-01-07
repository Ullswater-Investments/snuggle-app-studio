import React, { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Landmark, Sparkles, Users, FileText, ArrowRight } from 'lucide-react';

export const ROISimulator = () => {
  const [numSuppliers, setNumSuppliers] = useState([50]);
  
  // Parámetros basados en casos de éxito reales de ProcureData
  const hourlyRate = 45; // EUROe/hora
  const manualHours = 20; // horas por proveedor (proceso manual)
  const pdHours = 2; // horas por proveedor (con ProcureData)
  const pdFee = 1; // tasa de transacción EUROe

  const results = useMemo(() => {
    const manualCost = numSuppliers[0] * manualHours * hourlyRate;
    const pdCost = (numSuppliers[0] * pdHours * hourlyRate) + (numSuppliers[0] * pdFee);
    const savings = manualCost - pdCost;
    const timeSaved = numSuppliers[0] * (manualHours - pdHours);
    const efficiency = ((manualCost - pdCost) / manualCost) * 100;
    const fteEquivalent = Math.floor(timeSaved / 1800); // 1800 horas = 1 FTE/año

    return { manualCost, pdCost, savings, timeSaved, efficiency, fteEquivalent };
  }, [numSuppliers]);

  return (
    <div className="grid lg:grid-cols-2 gap-8 w-full">
      {/* Panel de Control */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-xl">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            Simulador de Impacto Económico
          </CardTitle>
          <p className="text-muted-foreground">
            Ajusta el volumen de altas de proveedores anuales para ver tu ahorro potencial.
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Slider Control */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Nº de Proveedores a Homologar
              </span>
              <span className="text-3xl font-bold text-primary">{numSuppliers[0]}</span>
            </div>
            <Slider
              value={numSuppliers}
              onValueChange={setNumSuppliers}
              min={10}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10</span>
              <span>250</span>
              <span>500</span>
            </div>
          </div>

          {/* Métricas Principales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold mb-2">
                Ahorro Anual Estimado
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {results.savings.toLocaleString('es-ES')} <span className="text-lg">EUROe</span>
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                Eficiencia Operativa
              </p>
              <p className="text-3xl font-bold text-primary">
                +{results.efficiency.toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Comparativa Visual */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Comparativa de Costes
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-24 text-xs text-muted-foreground">Manual</div>
                <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                  <div 
                    className="bg-red-500/70 h-full flex items-center justify-end px-3 text-xs font-bold text-white"
                    style={{ width: '100%' }}
                  >
                    {results.manualCost.toLocaleString('es-ES')} €
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 text-xs text-muted-foreground">ProcureData</div>
                <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                  <div 
                    className="bg-green-500 h-full flex items-center justify-end px-3 text-xs font-bold text-white"
                    style={{ width: `${(results.pdCost / results.manualCost) * 100}%` }}
                  >
                    {results.pdCost.toLocaleString('es-ES')} €
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Panel de ARIA - Informe Estratégico */}
      <Card className="bg-slate-900 dark:bg-slate-950 border-slate-800 text-white overflow-hidden relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-orange-500/10 pointer-events-none" />
        
        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-orange-500 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">ARIA</CardTitle>
              <p className="text-xs text-slate-400">Informe Estratégico Personalizado</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6">
          <p className="text-sm text-slate-300 leading-relaxed">
            He analizado tu volumen de <span className="text-primary font-bold">{numSuppliers[0]} proveedores</span>. 
            Al migrar al modelo de datos soberanos de ProcureData, tu organización experimentará los siguientes cambios:
          </p>
          
          {/* Insights */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-300">
                Liberarás <span className="text-white font-bold">{results.timeSaved.toLocaleString('es-ES')} horas hombre</span> al año, 
                permitiendo que tu equipo de compras se enfoque en negociación estratégica en lugar de burocracia documental.
              </p>
            </div>
            
            <div className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <Landmark className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-300">
                Reducirás el ciclo de alta de <span className="text-white font-bold">22 días a 48 horas</span>, 
                igualando el éxito de GigaFactory North.
              </p>
            </div>
          </div>

          {/* FTE Highlight */}
          {results.fteEquivalent > 0 && (
            <div className="bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-xl p-5 border border-primary/30">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Users className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Equivalencia FTE</span>
              </div>
              <p className="text-sm text-slate-300 italic">
                "Este ahorro equivale al salario anual de <span className="text-white font-bold">{results.fteEquivalent} empleado(s) FTE</span> dedicado(s) 
                exclusivamente a tareas administrativas que ProcureData automatiza mediante Blockchain."
              </p>
            </div>
          )}
          
          {/* CTA */}
          <Button className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white border-0">
            <FileText className="mr-2 h-4 w-4" />
            Descargar Informe PDF Completo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROISimulator;
