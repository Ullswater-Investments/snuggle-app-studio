import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  ResponsiveContainer, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, 
  PolarAngleAxis, Radar, ScatterChart, Scatter, ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, Thermometer, 
  TrendingUp, Zap, Leaf, Lock, Brain, Ship
} from "lucide-react";

// SkyAero - ISO Compliance Radar
const skyAeroData = [
  { subject: 'EN9100', A: 98, fullMark: 100 },
  { subject: 'ISO 9001', A: 100, fullMark: 100 },
  { subject: 'AS9120', A: 92, fullMark: 100 },
  { subject: 'NADCAP', A: 88, fullMark: 100 },
  { subject: 'ISO 14001', A: 95, fullMark: 100 },
  { subject: 'ISO 45001', A: 90, fullMark: 100 },
];

// VinosD.O. - Traceability Timeline
const vinosData = [
  { stage: 'Cosecha', value: 100, verified: true },
  { stage: 'Bodega', value: 100, verified: true },
  { stage: 'Embotellado', value: 100, verified: true },
  { stage: 'Notarización', value: 100, verified: true },
  { stage: 'Export', value: 100, verified: true },
  { stage: 'Destino', value: 100, verified: true },
];

// PharmaCold - Temperature Log
const pharmaData = [
  { time: '00:00', temp: 4.2 },
  { time: '04:00', temp: 4.5 },
  { time: '08:00', temp: 5.1 },
  { time: '12:00', temp: 5.8 },
  { time: '16:00', temp: 4.9 },
  { time: '20:00', temp: 4.3 },
  { time: '24:00', temp: 4.1 },
];

// PortBCN - Customs Comparison
const portData = [
  { name: 'Tradicional', hours: 72, color: '#6b7280' },
  { name: 'ProcureData', hours: 4, color: '#06b6d4' },
];

// Ayuntamiento - SROI Distribution
const govData = [
  { name: 'Ahorro Público', value: 42, color: '#8b5cf6' },
  { name: 'Valor Social', value: 38, color: '#a78bfa' },
  { name: 'Empleo Inclusivo', value: 20, color: '#c4b5fd' },
];

// PureLithium - Supply Chain Tiers
const miningData = [
  { tier: 'Tier 1', suppliers: 12, verified: 12 },
  { tier: 'Tier 2', suppliers: 34, verified: 31 },
  { tier: 'Tier 3', suppliers: 89, verified: 82 },
];

// FastFashion - Material Composition
const fashionData = [
  { name: 'Reciclado', value: 70, color: '#22c55e' },
  { name: 'Orgánico', value: 20, color: '#84cc16' },
  { name: 'Virgen', value: 10, color: '#d1d5db' },
];

// InvoiceTrust - Credit Score History
const financeData = [
  { month: 'Ene', score: 720 },
  { month: 'Feb', score: 745 },
  { month: 'Mar', score: 768 },
  { month: 'Abr', score: 790 },
  { month: 'May', score: 820 },
  { month: 'Jun', score: 850 },
];

// GridFlow - Energy Sync
const gridData = [
  { time: '06:00', kwh: 120, euros: 24 },
  { time: '08:00', kwh: 280, euros: 56 },
  { time: '10:00', kwh: 450, euros: 90 },
  { time: '12:00', kwh: 520, euros: 104 },
  { time: '14:00', kwh: 380, euros: 76 },
  { time: '16:00', kwh: 290, euros: 58 },
  { time: '18:00', kwh: 180, euros: 36 },
];

// AI-Labs - Synthetic vs Original
const aiData = [
  { x: 12, y: 45, z: 100 },
  { x: 23, y: 67, z: 80 },
  { x: 34, y: 34, z: 120 },
  { x: 45, y: 78, z: 90 },
  { x: 56, y: 23, z: 110 },
  { x: 67, y: 89, z: 85 },
  { x: 78, y: 56, z: 95 },
];

const syntheticData = [
  { x: 14, y: 47, z: 98 },
  { x: 25, y: 65, z: 82 },
  { x: 32, y: 36, z: 118 },
  { x: 47, y: 76, z: 92 },
  { x: 54, y: 25, z: 108 },
  { x: 69, y: 87, z: 87 },
  { x: 76, y: 58, z: 93 },
];

interface Props {
  caseId: string;
}

export function SuccessVisualRenderer({ caseId }: Props) {
  switch (caseId) {
    case 'sky-aero-systems':
      return (
        <Card className="bg-slate-900/50 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4" />
              ISO COMPLIANCE SCANNER - 120 Proveedores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <RadarChart data={skyAeroData}>
                  <PolarGrid stroke="#1e3a5f" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 10}} />
                  <Radar name="Compliance" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-green-500/20 text-green-400">98% Compliance Rate</Badge>
              <Badge className="bg-blue-500/20 text-blue-400">-90% Tiempo Verificación</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'vinosdoe-elite':
      return (
        <Card className="bg-gradient-to-br from-rose-950/30 to-amber-950/30 border-amber-500/20">
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4" />
              TRAZABILIDAD GEOGRÁFICA - Origen a Destino
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={vinosData}>
                  <defs>
                    <linearGradient id="colorVino" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7f1d1d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7f1d1d" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="stage" tick={{fill: '#d4a574', fontSize: 10}} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="stepAfter" dataKey="value" stroke="#fbbf24" fill="url(#colorVino)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 mt-4 font-mono text-xs text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
              Hash verificado: 0x7a8b...3c9d | Bloque #42901
            </div>
          </CardContent>
        </Card>
      );

    case 'pharmacold-logistix':
      return (
        <Card className="bg-white dark:bg-slate-950 border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2 text-sm">
              <Thermometer className="w-4 h-4" />
              THERMAL INTEGRITY GUARD - Cadena de Frío
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <ResponsiveContainer>
                <LineChart data={pharmaData}>
                  <defs>
                    <linearGradient id="safeZone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2}/>
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis domain={[0, 10]} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip />
                  <ReferenceLine y={2} stroke="#22c55e" strokeDasharray="3 3" label={{ value: '2°C', fill: '#22c55e', fontSize: 10 }} />
                  <ReferenceLine y={8} stroke="#ef4444" strokeDasharray="3 3" label={{ value: '8°C', fill: '#ef4444', fontSize: 10 }} />
                  <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-green-500/20 text-green-500">
                <Lock className="w-3 h-3 mr-1" />
                Smart Contract: UNLOCKED
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-500">0% Pérdida Térmica</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'portbcn-smart-trade':
      return (
        <Card className="bg-gradient-to-br from-slate-900 to-cyan-950/30 border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2 text-sm">
              <Ship className="w-4 h-4" />
              CUSTOMS CLEARANCE SPEEDOMETER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={portData} layout="vertical">
                  <XAxis type="number" domain={[0, 80]} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis dataKey="name" type="category" tick={{fill: '#94a3b8', fontSize: 10}} width={80} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#06b6d4" radius={[0, 8, 8, 0]}>
                    {portData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-cyan-500/20 text-cyan-400">-94% Tiempo de Despacho</Badge>
              <Badge className="bg-emerald-500/20 text-emerald-400">450€ ahorro/container</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'ayuntamiento-etico':
      return (
        <Card className="bg-gradient-to-br from-violet-950/30 to-purple-950/30 border-violet-500/20">
          <CardHeader>
            <CardTitle className="text-violet-400 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              PUBLIC ETHICS MULTIPLIER - SROI 1:4.2
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={govData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {govData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-violet-500/20 text-violet-400">99% Transparencia Ética</Badge>
              <Badge className="bg-green-500/20 text-green-400">100% LGD Compliant</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'purelithium-sourcing':
      return (
        <Card className="bg-gradient-to-br from-stone-900 to-emerald-950/30 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4" />
              CONFLICT-FREE SUPPLY TREE - Tier 1-2-3
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={miningData}>
                  <XAxis dataKey="tier" tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip />
                  <Bar dataKey="suppliers" fill="#57534e" radius={[4, 4, 0, 0]} name="Total" />
                  <Bar dataKey="verified" fill="#22c55e" radius={[4, 4, 0, 0]} name="Verified" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-emerald-500/20 text-emerald-400">92% Cadena Verificada</Badge>
              <Badge className="bg-green-500/20 text-green-400">B-Corp Certified</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'fastfashion-trace':
      return (
        <Card className="bg-gradient-to-br from-pink-950/30 to-green-950/30 border-pink-500/20">
          <CardHeader>
            <CardTitle className="text-pink-400 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4" />
              CIRCULAR ECONOMY DONUT - 1M Prendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={fashionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    {fashionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-green-500/20 text-green-400">70% Fibra Reciclada</Badge>
              <Badge className="bg-pink-500/20 text-pink-400">Greenwashing Risk: 0%</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'invoicetrust-b2b':
      return (
        <Card className="bg-gradient-to-br from-emerald-950/30 to-slate-900 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              CREDIT-TRUST METER - Score 850/1000
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={financeData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis domain={[600, 900]} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#10b981" fill="url(#colorScore)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-emerald-500/20 text-emerald-400">2M€ Liquidez Desbloqueada</Badge>
              <Badge className="bg-blue-500/20 text-blue-400">Factoring Habilitado</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'gridflow-energy':
      return (
        <Card className="bg-gradient-to-br from-yellow-950/30 to-slate-900 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              ENERGY-CASH SYNC - kWh ↔ EUROe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={gridData}>
                  <defs>
                    <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#facc15" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#facc15" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorEuro" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis yAxisId="left" tick={{fill: '#facc15', fontSize: 10}} />
                  <YAxis yAxisId="right" orientation="right" tick={{fill: '#22c55e', fontSize: 10}} />
                  <Tooltip />
                  <Area yAxisId="left" type="monotone" dataKey="kwh" stroke="#facc15" fill="url(#colorKwh)" name="kWh" />
                  <Area yAxisId="right" type="monotone" dataKey="euros" stroke="#22c55e" fill="url(#colorEuro)" name="EUROe" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-yellow-500/20 text-yellow-400">50 Naves Conectadas</Badge>
              <Badge className="bg-green-500/20 text-green-400">Liquidación Diaria Auto</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'ailabs-research':
      return (
        <Card className="bg-gradient-to-br from-purple-950/30 to-orange-950/30 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2 text-sm">
              <Brain className="w-4 h-4" />
              SYNTHETIC FIDELITY MATRIX - Privacidad 100%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <ScatterChart>
                  <XAxis type="number" dataKey="x" name="Latencia" tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis type="number" dataKey="y" name="Accuracy" tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Original" data={aiData} fill="#a855f7" />
                  <Scatter name="Sintético" data={syntheticData} fill="#f97316" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-purple-500/20 text-purple-400">-40% Tiempo Entrenamiento</Badge>
              <Badge className="bg-green-500/20 text-green-400">Privacy Score: 100%</Badge>
            </div>
          </CardContent>
        </Card>
      );

    // ========== 10 NEW ENERGY CASES ==========

    case 'helios-fields':
      return (
        <Card className="bg-gradient-to-br from-yellow-950/30 to-orange-950/30 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              SOLAR EFFICIENCY MONITOR - Mantenimiento Predictivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={[
                  { panel: 'A1', efficiency: 98 },
                  { panel: 'A2', efficiency: 95 },
                  { panel: 'A3', efficiency: 72 },
                  { panel: 'B1', efficiency: 99 },
                  { panel: 'B2', efficiency: 88 },
                  { panel: 'B3', efficiency: 96 },
                ]}>
                  <XAxis dataKey="panel" tick={{fill: '#facc15', fontSize: 10}} />
                  <YAxis domain={[60, 100]} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip />
                  <Bar dataKey="efficiency" radius={[4, 4, 0, 0]}>
                    {[98, 95, 72, 99, 88, 96].map((val, i) => (
                      <Cell key={i} fill={val < 80 ? '#ef4444' : val < 90 ? '#facc15' : '#22c55e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-yellow-500/20 text-yellow-400">+5% Generación Anual</Badge>
              <Badge className="bg-green-500/20 text-green-400">-25% Costes Reparación</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'aeolus-wind':
      return (
        <Card className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              PPA INSTANT SETTLEMENT - Viento → Liquidez
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={[
                  { hora: '06:00', mwh: 12, euros: 480 },
                  { hora: '09:00', mwh: 45, euros: 1800 },
                  { hora: '12:00', mwh: 78, euros: 3120 },
                  { hora: '15:00', mwh: 65, euros: 2600 },
                  { hora: '18:00', mwh: 32, euros: 1280 },
                  { hora: '21:00', mwh: 18, euros: 720 },
                ]}>
                  <defs>
                    <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hora" tick={{fill: '#22d3ee', fontSize: 10}} />
                  <YAxis yAxisId="left" tick={{fill: '#22d3ee', fontSize: 10}} />
                  <YAxis yAxisId="right" orientation="right" tick={{fill: '#22c55e', fontSize: 10}} />
                  <Tooltip />
                  <Area yAxisId="left" type="monotone" dataKey="mwh" stroke="#22d3ee" fill="url(#colorWind)" name="MWh" />
                  <Line yAxisId="right" type="monotone" dataKey="euros" stroke="#22c55e" strokeWidth={2} name="EUROe" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-cyan-500/20 text-cyan-400">Conciliación: 2 segundos</Badge>
              <Badge className="bg-green-500/20 text-green-400">4.200 EUROe Hoy</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'h2-pure':
      return (
        <Card className="bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4" />
              H2 GREEN CERTIFICATION - Origen 100% Renovable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Eólico', value: 65, color: '#22d3ee' },
                      { name: 'Solar', value: 30, color: '#facc15' },
                      { name: 'Otros', value: 5, color: '#10b981' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    <Cell fill="#22d3ee" />
                    <Cell fill="#facc15" />
                    <Cell fill="#10b981" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-emerald-500/20 text-emerald-400">+20% Valor Venta</Badge>
              <Badge className="bg-green-500/20 text-green-400">Subvención UE: Elegible</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'poligono-eco-link':
      return (
        <Card className="bg-gradient-to-br from-blue-950/30 to-indigo-950/30 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              COMMUNITY ENERGY NETWORK - Polígono Industrial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <RadarChart data={[
                  { metric: 'Independencia', value: 78 },
                  { metric: 'Ahorro', value: 85 },
                  { metric: 'Cobertura', value: 92 },
                  { metric: 'Eficiencia', value: 88 },
                  { metric: 'Participación', value: 95 },
                ]}>
                  <PolarGrid stroke="#1e3a8a" />
                  <PolarAngleAxis dataKey="metric" tick={{fill: '#3b82f6', fontSize: 10}} />
                  <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-blue-500/20 text-blue-400">-15% Factura Eléctrica</Badge>
              <Badge className="bg-green-500/20 text-green-400">12 Empresas Conectadas</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'gridflex-demand':
      return (
        <Card className="bg-gradient-to-br from-purple-950/30 to-fuchsia-950/30 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              DEMAND FLEXIBILITY CONTROLLER - Smart Grid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={[
                  { hora: '08:00', carga: 450, flexibilidad: 50 },
                  { hora: '10:00', carga: 680, flexibilidad: 120 },
                  { hora: '12:00', carga: 890, flexibilidad: 200 },
                  { hora: '14:00', carga: 720, flexibilidad: 150 },
                  { hora: '16:00', carga: 850, flexibilidad: 180 },
                  { hora: '18:00', carga: 950, flexibilidad: 220 },
                ]}>
                  <XAxis dataKey="hora" tick={{fill: '#a855f7', fontSize: 10}} />
                  <YAxis tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip />
                  <ReferenceLine y={800} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Límite Red', fill: '#ef4444', fontSize: 10 }} />
                  <Area type="monotone" dataKey="carga" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} name="Carga kW" />
                  <Area type="monotone" dataKey="flexibilidad" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} name="Flex kW" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-purple-500/20 text-purple-400">0 Apagones/12 meses</Badge>
              <Badge className="bg-green-500/20 text-green-400">150 EUROe Incentivos</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'bateria-hub':
      return (
        <Card className="bg-gradient-to-br from-indigo-950/30 to-violet-950/30 border-indigo-500/20">
          <CardHeader>
            <CardTitle className="text-indigo-400 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              BATTERY ARBITRAGE ENGINE - Compra/Venta Automática
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={[
                  { dia: 'Lun', margen: 340 },
                  { dia: 'Mar', margen: 520 },
                  { dia: 'Mié', margen: 280 },
                  { dia: 'Jue', margen: 610 },
                  { dia: 'Vie', margen: 450 },
                  { dia: 'Sáb', margen: 380 },
                  { dia: 'Dom', margen: 290 },
                ]}>
                  <XAxis dataKey="dia" tick={{fill: '#818cf8', fontSize: 10}} />
                  <YAxis tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip />
                  <Bar dataKey="margen" fill="#818cf8" radius={[4, 4, 0, 0]} name="Margen €" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-indigo-500/20 text-indigo-400">ROI: 5 años (vs 8)</Badge>
              <Badge className="bg-green-500/20 text-green-400">2.870€ Margen Semanal</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'bioheat-district':
      return (
        <Card className="bg-gradient-to-br from-amber-950/30 to-stone-950/30 border-amber-700/20">
          <CardHeader>
            <CardTitle className="text-amber-600 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4" />
              BIOMASS TRACEABILITY - Forest to Boiler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <ScatterChart>
                  <XAxis type="number" dataKey="km" name="Km Transporte" domain={[0, 100]} tick={{fill: '#b45309', fontSize: 10}} />
                  <YAxis type="number" dataKey="score" name="Score Sostenibilidad" domain={[0, 100]} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip />
                  <Scatter name="Lotes Biomasa" data={[
                    { km: 15, score: 98, tons: 12 },
                    { km: 28, score: 95, tons: 18 },
                    { km: 42, score: 88, tons: 15 },
                    { km: 55, score: 82, tons: 20 },
                    { km: 35, score: 92, tons: 22 },
                  ]} fill="#b45309" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-amber-600/20 text-amber-600">99% Cumplimiento RED II</Badge>
              <Badge className="bg-green-500/20 text-green-400">Huella Neta: 0.0</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'turbine-chain':
      return (
        <Card className="bg-gradient-to-br from-orange-950/30 to-red-950/30 border-orange-500/20">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              SCOPE 3 CONSOLIDATOR - Aerogeneradores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={[
                  { tier: 'Tier 1', emisiones: 1200 },
                  { tier: 'Tier 2', emisiones: 3400 },
                  { tier: 'Tier 3', emisiones: 5800 },
                  { tier: 'Total', emisiones: 10400 },
                ]}>
                  <defs>
                    <linearGradient id="colorScope3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="tier" tick={{fill: '#f97316', fontSize: 10}} />
                  <YAxis tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="emisiones" stroke="#f97316" fill="url(#colorScope3)" name="tCO2e" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-orange-500/20 text-orange-400">50M€ Contrato Ganado</Badge>
              <Badge className="bg-green-500/20 text-green-400">99% Precisión CSRD</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'aquapower-nexus':
      return (
        <Card className="bg-gradient-to-br from-blue-950/50 to-indigo-950/50 border-blue-600/20">
          <CardHeader>
            <CardTitle className="text-blue-500 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              WATER-ENERGY NEXUS - Gestión Hídrica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={[
                  { hora: '06:00', agua: 45, energia: 120 },
                  { hora: '09:00', agua: 78, energia: 85 },
                  { hora: '12:00', agua: 92, energia: 45 },
                  { hora: '15:00', agua: 65, energia: 95 },
                  { hora: '18:00', agua: 38, energia: 140 },
                  { hora: '21:00', agua: 25, energia: 110 },
                ]}>
                  <XAxis dataKey="hora" tick={{fill: '#3b82f6', fontSize: 10}} />
                  <YAxis yAxisId="left" tick={{fill: '#3b82f6', fontSize: 10}} />
                  <YAxis yAxisId="right" orientation="right" tick={{fill: '#facc15', fontSize: 10}} />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="agua" stroke="#3b82f6" strokeWidth={2} name="Riego m³" dot />
                  <Line yAxisId="right" type="monotone" dataKey="energia" stroke="#facc15" strokeWidth={2} name="Gen MWh" dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-blue-500/20 text-blue-400">+12% Eficiencia Hídrica</Badge>
              <Badge className="bg-green-500/20 text-green-400">Conflictos Resueltos: 100%</Badge>
            </div>
          </CardContent>
        </Card>
      );

    case 'smartcharge-ev':
      return (
        <Card className="bg-gradient-to-br from-lime-950/30 to-green-950/30 border-lime-500/20">
          <CardHeader>
            <CardTitle className="text-lime-400 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              EV GREEN GUARANTEE - Origen Certificado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Solar', value: 55, color: '#facc15' },
                      { name: 'Eólica', value: 35, color: '#22d3ee' },
                      { name: 'Hidráulica', value: 10, color: '#3b82f6' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    <Cell fill="#facc15" />
                    <Cell fill="#22d3ee" />
                    <Cell fill="#3b82f6" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <Badge className="bg-lime-500/20 text-lime-400">100% Renovable Certificado</Badge>
              <Badge className="bg-green-500/20 text-green-400">+40% Fidelización</Badge>
            </div>
          </CardContent>
        </Card>
      );

    default:
      return (
        <Card className="p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Visualizador no disponible para este caso</p>
        </Card>
      );
  }
}
