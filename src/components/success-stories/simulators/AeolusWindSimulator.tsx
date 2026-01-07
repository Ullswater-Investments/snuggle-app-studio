import React, { useState, useMemo } from 'react';
import { Wind, Coins, ArrowRight, Zap, Clock, FileText, Sparkles, TrendingUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

interface AeolusWindSimulatorProps {
  onValuesChange?: (values: { windSpeed: number; fixedPrice: number; payout: number }) => void;
}

export const AeolusWindSimulator = ({ onValuesChange }: AeolusWindSimulatorProps) => {
  const [windSpeed, setWindSpeed] = useState(14);
  const [fixedPrice, setFixedPrice] = useState(60);

  const calculations = useMemo(() => {
    const generation = windSpeed * 1.5;
    const instantPayout = generation * fixedPrice;
    const cashFlowBoost = instantPayout * 0.15;
    const traditionalDays = 45;
    const blockchainSeconds = 2;
    const annualGeneration = generation * 24 * 365;
    const annualRevenue = annualGeneration * fixedPrice;
    return { generation, instantPayout, cashFlowBoost, traditionalDays, blockchainSeconds, annualGeneration, annualRevenue };
  }, [windSpeed, fixedPrice]);

  const settlementData = useMemo(() => [
    { name: 'Tradicional', days: calculations.traditionalDays, fill: '#64748b' },
    { name: 'Smart Contract', days: 0.00002, fill: '#22d3ee' },
  ], [calculations]);

  const pontusHash = useMemo(() => {
    const base = (windSpeed * 100 + fixedPrice).toString(16);
    return `0x${base.padStart(8, '0')}...wind_ppa`;
  }, [windSpeed, fixedPrice]);

  const rotationDuration = Math.max(0.5, 5 - (windSpeed / 5));

  React.useEffect(() => {
    onValuesChange?.({ windSpeed, fixedPrice, payout: calculations.instantPayout });
  }, [windSpeed, fixedPrice, calculations.instantPayout, onValuesChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Simulation Panel */}
      <div className="lg:col-span-7">
        <Card className="bg-gradient-to-br from-cyan-950/40 to-blue-950/30 border-cyan-500/20 shadow-2xl overflow-hidden p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Wind className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-cyan-400 font-bold text-sm">PPA INSTANT SETTLEMENT</h3>
                <p className="text-[10px] text-slate-400 font-mono">{pontusHash}</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400">Smart Contract Activo</Badge>
          </div>

          {/* Turbine Visual */}
          <div className="bg-gradient-to-b from-slate-900 to-cyan-950/50 rounded-2xl p-8 border border-cyan-900/30 relative overflow-hidden mb-6">
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: '-100%',
                    width: '200%',
                    animation: `slideRight ${2 + i * 0.3}s linear infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <Wind 
                  className="w-24 h-24 text-cyan-400" 
                  style={{ animation: `spin ${rotationDuration}s linear infinite` }}
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-cyan-900/80 px-3 py-1 rounded-full">
                  <span className="text-lg font-black text-white">{windSpeed} <span className="text-xs text-cyan-300">m/s</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Instant Settlement Panel */}
          <div className="bg-slate-900/80 rounded-xl p-5 border border-emerald-500/30 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Coins className="w-6 h-6 text-emerald-400" />
              <span className="text-sm font-bold text-white uppercase">Liquidación Instantánea</span>
            </div>
            
            <div className="flex items-center justify-between bg-emerald-950/50 rounded-lg p-4">
              <div className="text-center">
                <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                <p className="text-xs text-slate-400">Generación</p>
                <p className="text-lg font-bold text-white">{calculations.generation.toFixed(1)} MWh</p>
              </div>
              <ArrowRight className="w-6 h-6 text-emerald-400 animate-pulse" />
              <div className="text-center">
                <Coins className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                <p className="text-xs text-slate-400">Pago en Bloque</p>
                <p className="text-lg font-bold text-emerald-400">{calculations.instantPayout.toFixed(0)} EUROe</p>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono text-emerald-400">
              <Clock className="w-3 h-3" />
              <span>TX_HASH: {pontusHash} | Bloque #19,234,567</span>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-5 bg-slate-900/40 p-4 rounded-xl border border-cyan-900/20 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Velocidad del Viento</span>
                <span className="font-bold text-cyan-400">{windSpeed} m/s</span>
              </div>
              <Slider value={[windSpeed]} onValueChange={(v) => setWindSpeed(v[0])} min={3} max={25} step={1} className="[&>span]:bg-cyan-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Precio PPA Pactado</span>
                <span className="font-bold text-emerald-400">{fixedPrice} €/MWh</span>
              </div>
              <Slider value={[fixedPrice]} onValueChange={(v) => setFixedPrice(v[0])} min={30} max={90} step={5} className="[&>span]:bg-emerald-600" />
            </div>
          </div>

          {/* Cash Flow Boost */}
          <div className="bg-gradient-to-r from-cyan-900/50 to-emerald-900/50 p-5 rounded-2xl border border-cyan-500/30">
            <p className="text-[10px] uppercase font-black text-cyan-300 mb-2">Mejora Flujo de Caja</p>
            <p className="text-4xl font-black text-white">+{calculations.cashFlowBoost.toFixed(0)} <span className="text-lg text-cyan-400">EUROe</span></p>
            <Badge className="mt-2 bg-emerald-500/20 text-emerald-300">-12% Coste Financiero</Badge>
          </div>
        </Card>
      </div>

      {/* Right Column - ARIA Panel */}
      <div className="lg:col-span-5">
        <Card className="bg-[#020617] border-cyan-500/20 shadow-2xl h-full p-6">
          {/* ARIA Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
              <h4 className="text-white font-bold">ARIA</h4>
              <p className="text-[10px] text-slate-400">Asesora de Energía Eólica</p>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-900/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Liquidación Instantánea</p>
                  <p className="text-xs text-slate-400">
                    Con viento a <span className="text-cyan-400 font-bold">{windSpeed} m/s</span> y precio PPA de <span className="text-emerald-400 font-bold">{fixedPrice}€/MWh</span>, tu liquidación instantánea genera <span className="text-white font-bold">{calculations.instantPayout.toFixed(0)} EUROe</span> en el bloque actual.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-900/30">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Eliminación de Espera</p>
                  <p className="text-xs text-slate-400">
                    El pago tradicional tarda <span className="text-slate-500">{calculations.traditionalDays} días</span>. Con Smart Contract, recibes el pago en <span className="text-emerald-400 font-bold">{calculations.blockchainSeconds} segundos</span>, liberando capital instantáneamente.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-900/30">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium mb-1">Proyección Anual</p>
                  <p className="text-xs text-slate-400">
                    Generación estimada: <span className="text-blue-400 font-bold">{(calculations.annualGeneration / 1000).toFixed(1)} GWh/año</span> con ingresos de <span className="text-white font-bold">{(calculations.annualRevenue / 1000000).toFixed(2)} M€</span>.
                  </p>
                </div>
              </div>
            </div>

            {windSpeed >= 12 && (
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold text-cyan-300">Viento Óptimo</span>
                </div>
                <p className="text-xs text-slate-300">
                  La velocidad actual está en el rango óptimo de la curva de potencia. El factor de capacidad supera el 35%, maximizando la rentabilidad del PPA.
                </p>
              </div>
            )}

            {fixedPrice >= 70 && (
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">PPA Premium</span>
                </div>
                <p className="text-xs text-slate-300">
                  Tu precio PPA de {fixedPrice}€/MWh está por encima del mercado. La certificación blockchain garantiza la trazabilidad de origen renovable, justificando el premium.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[10px] font-mono text-slate-500 mb-3">{pontusHash}</p>
            <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Descargar Certificado PPA
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
