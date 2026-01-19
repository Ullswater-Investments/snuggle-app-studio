import React from 'react';
import { Palette, Globe, Monitor, Sparkles } from 'lucide-react';
import { NodeFeatureLayout } from './NodeFeatureLayout';

const MarcaBlancaDiagram = () => (
  <div className="flex flex-col items-center py-8">
    {/* Browser Mockup */}
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      {/* Browser Chrome */}
      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        {/* URL Bar - Customizable */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative bg-white rounded-lg px-4 py-1.5 border-2 border-orange-400 shadow-sm">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-slate-700">datos.<span className="text-orange-600 font-bold">tucluster</span>.com</span>
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                PERSONALIZABLE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-6">
        {/* Header - Logo Area */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="relative">
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-dashed border-orange-400 rounded-lg px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-orange-600">TU LOGO AQUÍ</span>
              </div>
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                PERSONALIZABLE
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-slate-100 rounded-lg" />
            <div className="h-8 w-16 bg-slate-100 rounded-lg" />
          </div>
        </div>

        {/* Hero Section Mockup */}
        <div className="bg-slate-50 rounded-xl p-6 mb-6">
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
          <div className="h-3 bg-slate-100 rounded w-1/2 mb-4" />
          <div className="flex gap-3">
            {/* Primary Button - Customizable */}
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg px-6 py-2 text-white text-sm font-medium border-2 border-orange-400">
                Acción Principal
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  TU COLOR
                </div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg px-6 py-2 text-slate-600 text-sm">
              Secundario
            </div>
          </div>
        </div>

        {/* Grid Mockup */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-50 rounded-lg p-3">
              <div className="h-16 bg-slate-100 rounded mb-2" />
              <div className="h-2 bg-slate-200 rounded w-3/4" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Powered by</span>
            <span className="font-semibold text-slate-500">ProcureData</span>
          </div>
        </div>
      </div>
    </div>

    {/* Trust Badge */}
    <div className="mt-6 flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
      <Monitor className="h-4 w-4 text-slate-500" />
      <span className="text-sm text-slate-600">Tecnología certificada <span className="font-semibold">Gaia-X</span> bajo tu marca</span>
    </div>
  </div>
);

const MarcaBlancaPage = () => {
  return (
    <NodeFeatureLayout
      title="Marca Blanca"
      subtitle="Tu identidad, nuestra tecnología. 'Powered by ProcureData' queda en segundo plano. Tus socios interactúan con TU plataforma."
      icon={<Palette className="h-10 w-10" />}
      visualComponent={<MarcaBlancaDiagram />}
      benefits={[
        {
          title: "Identidad Corporativa Completa",
          desc: "Tu logo, tus colores, tus tipografías. Cada pixel refleja la identidad visual de tu Cluster o Asociación. Sin rastro de marca genérica."
        },
        {
          title: "Dominio Propio",
          desc: "Despliega tu nodo en 'datos.tucluster.com' o el dominio que prefieras. Certificados SSL incluidos. Tus socios nunca sabrán que hay otra tecnología detrás."
        },
        {
          title: "Confianza del Ecosistema",
          desc: "Tus miembros confían en TU marca. Nosotros aportamos la tecnología certificada Gaia-X, tú aportas la confianza y el conocimiento sectorial."
        }
      ]}
    />
  );
};

export default MarcaBlancaPage;
