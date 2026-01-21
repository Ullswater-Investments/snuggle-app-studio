import React from 'react';
import { ShieldCheck, Globe, CheckCircle, Lock, Award, FileText, Building2, ArrowRight } from 'lucide-react';
import { NodeFeatureLayout } from './NodeFeatureLayout';

const GobernanzaIDSAPage = () => {
  const VisualDiagram = () => (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="w-full max-w-4xl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Globe className="w-6 h-6 text-white" />
            <span className="text-white font-bold text-lg">Ecosistema Gaia-X / IDSA</span>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 border-x-2 border-b-2 border-slate-200 dark:border-slate-700 rounded-b-2xl p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[{ icon: Lock, title: 'IDS Connector', color: 'blue' }, { icon: Award, title: 'DAPS (Identity)', color: 'green' }, { icon: FileText, title: 'Metadata Broker', color: 'orange' }].map((pillar, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-5 border shadow-sm">
                <div className={`w-12 h-12 rounded-xl bg-${pillar.color}-500 flex items-center justify-center mb-4`}>
                  <pillar.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-foreground">{pillar.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {['IDSA Certified', 'Gaia-X Compliant', 'ISO 27001', 'GDPR Ready'].map((cert, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border shadow-sm">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span className="text-xs font-medium">{cert}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <NodeFeatureLayout
      title="Gobernanza IDSA"
      subtitle="Arquitectura de referencia certificada por la International Data Spaces Association."
      icon={<ShieldCheck className="w-10 h-10" />}
      visualComponent={<VisualDiagram />}
      benefits={[
        { title: "Certificación Oficial", desc: "ProcureData cumple con Gaia-X Trust Framework." },
        { title: "Interoperabilidad Garantizada", desc: "Tu nodo puede conectarse con cualquier otro Espacio de Datos certificado." },
        { title: "Soberanía por Diseño", desc: "Los datos nunca salen sin tu consentimiento explícito." }
      ]}
    />
  );
};

export default GobernanzaIDSAPage;
