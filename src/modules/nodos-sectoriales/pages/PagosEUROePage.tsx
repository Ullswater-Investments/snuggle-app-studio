import React from 'react';
import { Wallet, Euro, Building2, Zap, Shield, Clock, CheckCircle, ArrowDown, ArrowRight } from 'lucide-react';
import { NodeFeatureLayout } from './NodeFeatureLayout';

const PagosEUROePage = () => {
  const VisualDiagram = () => (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-2xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center shadow-lg">
            <Building2 className="w-10 h-10 text-blue-600" />
          </div>
          <span className="text-sm font-semibold">Comprador</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="px-4 py-2 bg-orange-500 text-white rounded-full font-bold flex items-center gap-2">
            <Euro className="w-4 h-4" /><span>7,000 EUROe</span>
          </div>
        </div>
        <div className="w-40 h-40 rounded-2xl bg-slate-800 border-2 border-orange-500 flex flex-col items-center justify-center shadow-xl">
          <Zap className="w-8 h-8 text-orange-400 mb-2" />
          <p className="text-white text-xs font-medium">Revenue Splitter</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-green-50 rounded-xl border-2 border-green-400">
            <div className="text-lg font-bold text-green-700">5,600 €</div>
            <span className="text-sm">Proveedor (80%)</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 rounded-xl border-2 border-orange-400">
            <div className="text-lg font-bold text-orange-700">1,400 €</div>
            <span className="text-sm">Promotor (20%)</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {[{ icon: Zap, label: 'Liquidación < 3 seg' }, { icon: Shield, label: 'Regulado BCE' }, { icon: Clock, label: '24/7' }, { icon: CheckCircle, label: 'Sin comisiones' }].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border">
            <item.icon className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <NodeFeatureLayout
      title="Pagos EUROe"
      subtitle="Liquidación instantánea con stablecoin regulado. Sin SWIFT, sin bancos intermediarios, sin esperas."
      icon={<Wallet className="w-10 h-10" />}
      visualComponent={<VisualDiagram />}
      benefits={[
        { title: "Liquidación en 3 Segundos", desc: "Olvídate de esperar 2-3 días hábiles para transferencias SEPA." },
        { title: "Revenue Split Automático", desc: "El Smart Contract divide automáticamente el pago entre Promotor y Proveedor." },
        { title: "Cero Comisiones Bancarias", desc: "Sin SWIFT fees, sin intermediarios. Token EUROe respaldado 1:1 por euros." }
      ]}
    />
  );
};

export default PagosEUROePage;
