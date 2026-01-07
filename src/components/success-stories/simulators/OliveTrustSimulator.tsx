import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { Leaf, MapPin, Euro, Shield, FileText, Zap } from 'lucide-react';

export const OliveTrustSimulator = () => {
  const [litersProduced, setLitersProduced] = useState(25000);
  const [collectionRadius, setCollectionRadius] = useState(12);

  const calculations = useMemo(() => {
    const basePrice = 8.50;
    const purityIndex = Math.max(0, Math.min(100, 100 - (collectionRadius - 5) * 2.5));
    const premiumFactor = purityIndex >= 95 ? 0.22 : purityIndex >= 80 ? 0.15 : purityIndex >= 60 ? 0.08 : 0.03;
    const premiumPrice = basePrice * (1 + premiumFactor);
    const totalRevenue = litersProduced * premiumPrice;
    const baseRevenue = litersProduced * basePrice;
    const brandEquity = totalRevenue - baseRevenue;
    const fraudProtection = purityIndex >= 80 ? 'Máxima' : purityIndex >= 60 ? 'Alta' : 'Moderada';
    
    return {
      purityIndex: Math.round(purityIndex),
      premiumPrice: premiumPrice.toFixed(2),
      premiumPercent: (premiumFactor * 100).toFixed(0),
      brandEquity,
      totalRevenue,
      fraudProtection
    };
  }, [litersProduced, collectionRadius]);

  const chartData = [
    { name: 'Pureza', value: calculations.purityIndex, fill: '#166534' }
  ];

  const pontusHash = useMemo(() => {
    const base = `0x3A7E${litersProduced.toString(16).toUpperCase().slice(-4)}${collectionRadius.toString(16).toUpperCase()}`;
    return `${base}...D2B8`;
  }, [litersProduced, collectionRadius]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Panel Izquierdo - Simulación */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-green-700/30 bg-gradient-to-br from-green-950/20 to-background">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-700/20">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Simulador Green Premium</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">OliveTrust Coop - D.O. Jaén Verificada</p>
                </div>
              </div>
              <Badge variant="outline" className="border-green-700/50 text-green-600">
                Agroalimentario
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
                  <span className="text-muted-foreground">Producción anual</span>
                  <span className="font-semibold text-green-600">{litersProduced.toLocaleString()} litros</span>
                </div>
                <Slider
                  value={[litersProduced]}
                  onValueChange={(v) => setLitersProduced(v[0])}
                  min={1000}
                  max={100000}
                  step={1000}
                  className="[&_[role=slider]]:bg-green-700"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Radio de recolección</span>
                  <span className="font-semibold text-green-600">{collectionRadius} km</span>
                </div>
                <Slider
                  value={[collectionRadius]}
                  onValueChange={(v) => setCollectionRadius(v[0])}
                  min={5}
                  max={50}
                  step={1}
                  className="[&_[role=slider]]:bg-green-700"
                />
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-green-700/10 border border-green-700/20">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <Euro className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">Premium Obtenido</span>
                </div>
                <p className="text-3xl font-bold text-foreground">+{calculations.premiumPercent}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {calculations.premiumPrice}€/litro
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-green-700/10 border border-green-700/20">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">Índice Pureza</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{calculations.purityIndex}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Origen 100% Jaén
                </p>
              </div>
            </div>

            {/* Gráfico Radial */}
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="60%" 
                  outerRadius="90%" 
                  data={chartData}
                  startAngle={180}
                  endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar 
                    dataKey="value" 
                    cornerRadius={10} 
                    fill="#166534"
                    background={{ fill: '#1e1e2e' }}
                  />
                  <text x="50%" y="45%" textAnchor="middle" className="fill-foreground text-2xl font-bold">
                    {calculations.purityIndex}%
                  </text>
                  <text x="50%" y="60%" textAnchor="middle" className="fill-muted-foreground text-xs">
                    Pureza Geográfica
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel Derecho - ARIA */}
      <div className="lg:col-span-5">
        <Card className="h-full bg-[#020617] border-green-700/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Análisis ARIA</CardTitle>
                <p className="text-xs text-slate-400">Pasaporte Digital D.O.</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-green-500 font-semibold">Valor de Marca:</span> Con un índice de pureza 
                del <span className="text-green-500 font-bold">{calculations.purityIndex}%</span>, tu aceite 
                obtiene un sobreprecio de <span className="text-green-500 font-bold">+{calculations.premiumPercent}%</span>, 
                generando <span className="text-green-500 font-bold">{calculations.brandEquity.toLocaleString()}€</span> adicionales 
                en valor de marca anual.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-green-500 font-semibold">Protección Anti-Fraude:</span> El registro GPS 
                de cada oliva en blockchain proporciona protección <span className="text-green-500 font-bold">{calculations.fraudProtection}</span> contra 
                el fraude de mezcla con aceites de menor calidad.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-green-500 font-semibold">Mercado Premium:</span> Un radio de 
                recolección de <span className="text-green-500 font-bold">{collectionRadius} km</span> te 
                posiciona en el segmento {collectionRadius <= 15 ? 'ultra-premium' : collectionRadius <= 30 ? 'premium' : 'estándar'} del 
                mercado de aceites de oliva virgen extra.
              </p>
            </div>

            {calculations.purityIndex >= 90 && (
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-600/40">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-600 text-white">
                    🫒 D.O. Jaén Certificada
                  </Badge>
                </div>
                <p className="text-sm text-slate-300">
                  Tu cooperativa cumple los requisitos para el sello <strong className="text-green-500">Origen Protegido Blockchain</strong>, 
                  accediendo a distribuidores gourmet internacionales.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-700">
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <FileText className="h-4 w-4 mr-2" />
                Descargar Pasaporte Digital
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
