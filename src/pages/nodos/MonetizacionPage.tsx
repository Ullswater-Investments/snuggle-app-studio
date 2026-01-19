import React from 'react';
import { Wallet, Coins, ArrowDown, Building2, Users, Zap } from 'lucide-react';
import { NodeFeatureLayout } from './NodeFeatureLayout';

const MonetizacionDiagram = () => (
  <div className="flex flex-col items-center py-8">
    {/* Transaction Input */}
    <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
        <Zap className="h-6 w-6 text-white" />
      </div>
      <div>
        <div className="font-semibold text-slate-800">Transacción de Datos</div>
        <div className="text-sm text-slate-500">Intercambio completado</div>
      </div>
    </div>

    <ArrowDown className="h-6 w-6 text-slate-400 mb-4" />

    {/* Total Amount */}
    <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl px-8 py-4 shadow-lg shadow-amber-500/20 mb-6">
      <div className="flex items-center gap-3">
        <Coins className="h-8 w-8 text-white" />
        <div>
          <div className="text-xs text-amber-100 font-medium">Valor de la Transacción</div>
          <div className="text-2xl font-bold text-white">7.000 EUROe</div>
        </div>
      </div>
    </div>

    {/* Split Arrows */}
    <div className="flex items-center gap-20 mb-4">
      <div className="flex flex-col items-center">
        <ArrowDown className="h-6 w-6 text-emerald-500" />
        <div className="text-xs font-semibold text-emerald-600 mt-1">80%</div>
      </div>
      <div className="flex flex-col items-center">
        <ArrowDown className="h-6 w-6 text-orange-500" />
        <div className="text-xs font-semibold text-orange-600 mt-1">20%</div>
      </div>
    </div>

    {/* Recipients */}
    <div className="flex flex-col md:flex-row gap-8">
      {/* Provider */}
      <div className="flex flex-col items-center">
        <div className="bg-emerald-100 rounded-2xl p-6 border border-emerald-200 min-w-[200px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="font-semibold text-emerald-800">Proveedor</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-700">5.600€</div>
            <div className="text-xs text-emerald-600 mt-1">Transferencia automática</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500">Empresa que aporta los datos</div>
      </div>

      {/* Node Promoter */}
      <div className="flex flex-col items-center">
        <div className="bg-orange-100 rounded-2xl p-6 border border-orange-200 min-w-[200px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="font-semibold text-orange-800">Promotor Nodo</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-700">1.400€</div>
            <div className="text-xs text-orange-600 mt-1">Comisión automática</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500">Tu Cluster o Asociación</div>
      </div>
    </div>

    {/* Token Badge */}
    <div className="mt-8 flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">
      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
        <span className="text-[10px] font-bold text-white">€</span>
      </div>
      <span className="text-sm text-slate-200">Liquidación instantánea vía <span className="font-semibold text-white">EUROe Stablecoin</span></span>
    </div>
  </div>
);

const MonetizacionPage = () => {
  return (
    <NodeFeatureLayout
      title="Modelo de Monetización"
      subtitle="Sostenibilidad Económica. Configura comisiones automáticas por cada transacción realizada en tu nodo. Crea nuevos flujos de ingresos para tu Asociación."
      icon={<Wallet className="h-10 w-10" />}
      visualComponent={<MonetizacionDiagram />}
      benefits={[
        {
          title: "Comisiones Configurables",
          desc: "Define el porcentaje de comisión que retendrá tu nodo por cada transacción. Puede variar por tipo de dato, volumen o tipo de consumidor."
        },
        {
          title: "Liquidación Instantánea",
          desc: "Los pagos se ejecutan automáticamente mediante Smart Contracts. Sin facturas manuales, sin demoras, sin impagos. Todo en EUROe."
        },
        {
          title: "Nuevos Ingresos Recurrentes",
          desc: "Transforma tu asociación en una infraestructura productiva. Cada intercambio de datos genera ingresos pasivos para sostener el ecosistema."
        }
      ]}
    />
  );
};

export default MonetizacionPage;
