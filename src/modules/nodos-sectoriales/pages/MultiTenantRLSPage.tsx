import React from 'react';
import { Server, Shield, Lock, Eye, EyeOff, Database, CheckCircle, Building2 } from 'lucide-react';
import { NodeFeatureLayout } from './NodeFeatureLayout';

const MultiTenantRLSPage = () => {
  const VisualDiagram = () => (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="w-full max-w-4xl">
        <div className="bg-slate-700 rounded-t-2xl p-4 flex items-center gap-3">
          <Database className="w-6 h-6 text-orange-400" />
          <span className="text-white font-bold">Base de Datos Compartida</span>
          <div className="ml-auto flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">RLS Activo</span>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 border-x-2 border-b-2 border-slate-200 dark:border-slate-700 rounded-b-2xl p-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-200 dark:bg-slate-800">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Dato</th>
                <th className="px-4 py-3 text-left">org_id</th>
                <th className="px-4 py-3 text-left">Visibilidad</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-50 dark:bg-green-900/20 border-b">
                <td className="px-4 py-3">001</td>
                <td className="px-4 py-3">Telemetría...</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 rounded text-xs">org_a</span></td>
                <td className="px-4 py-3"><Eye className="w-4 h-4 text-green-600 inline" /> Visible</td>
              </tr>
              <tr className="bg-red-50 dark:bg-red-900/20 opacity-50">
                <td className="px-4 py-3">003</td>
                <td className="px-4 py-3">█████████</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-slate-200 rounded text-xs">org_b</span></td>
                <td className="px-4 py-3"><EyeOff className="w-4 h-4 text-red-500 inline" /> Oculto</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {[{ icon: Shield, label: 'Aislamiento DB' }, { icon: Lock, label: 'Zero Trust' }, { icon: CheckCircle, label: 'GDPR' }, { icon: Server, label: 'Escalable' }].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border shadow-sm">
            <item.icon className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <NodeFeatureLayout
      title="Multi-Tenant RLS"
      subtitle="Aislamiento de datos a nivel de base de datos. Cada organización solo ve sus propios datos."
      icon={<Server className="w-10 h-10" />}
      visualComponent={<VisualDiagram />}
      benefits={[
        { title: "Aislamiento Total", desc: "Las políticas RLS se aplican a nivel de PostgreSQL. Físicamente imposible acceder a datos de otra organización." },
        { title: "Eficiencia de Costes", desc: "Un solo despliegue sirve a múltiples organizaciones reduciendo costes." },
        { title: "Escalabilidad Lineal", desc: "Añadir nuevos tenants es instantáneo." }
      ]}
    />
  );
};

export default MultiTenantRLSPage;
