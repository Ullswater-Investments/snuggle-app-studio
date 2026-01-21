import React from 'react';
import { Network, Database, ArrowLeftRight, CheckCircle, Server, Plug, RefreshCw, Shield } from 'lucide-react';
import { NodeFeatureLayout } from './NodeFeatureLayout';

const ConectoresERPPage = () => {
  const VisualDiagram = () => (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-5xl">
        <div className="flex flex-col gap-4">
          {[{ name: 'SAP S/4HANA', color: 'from-blue-500 to-blue-600' }, { name: 'Microsoft D365', color: 'from-green-500 to-green-600' }, { name: 'Oracle NetSuite', color: 'from-red-500 to-red-600' }].map((erp, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${erp.color} flex items-center justify-center`}>
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium">{erp.name}</span>
            </div>
          ))}
        </div>
        <ArrowLeftRight className="w-8 h-8 text-orange-500" />
        <div className="w-52 h-52 rounded-3xl bg-slate-800 border-2 border-orange-500 flex flex-col items-center justify-center shadow-xl">
          <Network className="w-14 h-14 text-orange-400 mb-3" />
          <p className="text-white text-sm font-bold">ProcureData Bridge</p>
        </div>
        <ArrowLeftRight className="w-8 h-8 text-orange-500" />
        <div className="flex flex-col gap-4">
          {['Catálogo Gaia-X', 'Contratos ODRL', 'Marketplace'].map((output, i) => (
            <div key={i} className="px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-sm font-medium">{output}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {['REST API', 'GraphQL', 'OData', 'Webhook'].map((proto, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 rounded-full border shadow-sm">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span className="text-xs font-medium">{proto}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <NodeFeatureLayout
      title="Conectores ERP"
      subtitle="Integración plug-and-play con tu sistema de gestión. SAP, Microsoft, Oracle, Odoo..."
      icon={<Network className="w-10 h-10" />}
      visualComponent={<VisualDiagram />}
      benefits={[
        { title: "Zero Code Integration", desc: "Conecta tu ERP en minutos con nuestra interfaz visual." },
        { title: "Sincronización Bidireccional", desc: "Los datos fluyen en ambas direcciones automáticamente." },
        { title: "Mapeo Inteligente", desc: "Nuestro sistema detecta la estructura de tus datos y sugiere el mapeo óptimo." }
      ]}
    />
  );
};

export default ConectoresERPPage;
