import React from 'react';
import { Layers, Database, ShieldCheck, CheckCircle2, FileWarning, ArrowRight, Sparkles } from 'lucide-react';
import { NodeFeatureLayout } from './NodeFeatureLayout';

const MarketplaceDiagram = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
    {/* Left: Chaotic Data */}
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium text-slate-500 mb-4">Datos Externos</div>
      <div className="relative w-48 h-48 bg-slate-200/50 rounded-2xl p-4 border-2 border-dashed border-slate-300">
        {/* Scattered icons */}
        <Database className="absolute top-4 left-4 h-8 w-8 text-slate-400 rotate-12" />
        <FileWarning className="absolute top-6 right-6 h-7 w-7 text-red-400 -rotate-6" />
        <Database className="absolute bottom-8 left-8 h-6 w-6 text-slate-400 rotate-[-20deg]" />
        <FileWarning className="absolute bottom-4 right-4 h-8 w-8 text-amber-400 rotate-12" />
        <Database className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-7 text-slate-400" />
      </div>
      <div className="text-xs text-slate-500 mt-2">Sin verificar</div>
    </div>

    {/* Arrow */}
    <div className="flex items-center justify-center w-16">
      <ArrowRight className="h-8 w-8 text-orange-500 hidden md:block" />
      <div className="h-8 w-px bg-orange-500 md:hidden" />
    </div>

    {/* Center: Gatekeeper */}
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium text-orange-600 mb-4">Tu Gobernanza</div>
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
          <ShieldCheck className="h-16 w-16 text-white" />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border border-orange-200">
          <span className="text-xs font-semibold text-orange-600">TU CLUSTER</span>
        </div>
      </div>
      <div className="text-xs text-slate-500 mt-6">Filtrado y Curación</div>
    </div>

    {/* Arrow */}
    <div className="flex items-center justify-center w-16">
      <ArrowRight className="h-8 w-8 text-orange-500 hidden md:block" />
      <div className="h-8 w-px bg-orange-500 md:hidden" />
    </div>

    {/* Right: Curated Catalog */}
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium text-emerald-600 mb-4">Catálogo Premium</div>
      <div className="w-48 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-2 bg-emerald-50 rounded-lg border border-emerald-100">
            <Database className="h-5 w-5 text-emerald-600" />
            <div className="flex-1">
              <div className="h-2 bg-emerald-200 rounded w-16" />
            </div>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-2">
        <Sparkles className="h-3 w-3 text-emerald-500" />
        <span className="text-xs text-emerald-600 font-medium">Verificado</span>
      </div>
    </div>
  </div>
);

const MarketplacePage = () => {
  return (
    <NodeFeatureLayout
      title="Marketplace Propio"
      subtitle="Tú decides qué entra. Filtra por calidad, origen o temática sectorial. No es un vertedero de datos, es una biblioteca premium."
      icon={<Layers className="h-10 w-10" />}
      visualComponent={<MarketplaceDiagram />}
      benefits={[
        {
          title: "Curación de Contenidos",
          desc: "Define criterios de admisión estrictos. Cada dataset pasa por tu proceso de homologación antes de aparecer en el catálogo."
        },
        {
          title: "Catálogo Sectorial",
          desc: "Organiza los datos por categorías relevantes para tu industria. Crea colecciones temáticas y destaca los datasets más valiosos."
        },
        {
          title: "Control de Calidad",
          desc: "Implementa sistemas de puntuación, reseñas y badges de verificación. Tus socios sabrán qué datos son de confianza."
        }
      ]}
    />
  );
};

export default MarketplacePage;
