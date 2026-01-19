import React from 'react';
import { FileKey, Lock, UserCheck, Ban, ArrowRight, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';
import { NodeFeatureLayout } from './NodeFeatureLayout';

const OdrlDiagram = () => (
  <div className="flex flex-col items-center py-8">
    {/* Step 1: Input */}
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm">
        <Lock className="h-6 w-6 text-slate-600" />
        <div>
          <div className="font-medium text-slate-800">Dataset Sensible</div>
          <div className="text-xs text-slate-500">"Patentes_2024.pdf"</div>
        </div>
      </div>
    </div>

    <ArrowDown className="h-6 w-6 text-slate-400 mb-4" />

    {/* Step 2: Smart Contract Engine */}
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg shadow-orange-500/20 mb-6">
      <div className="text-center text-white mb-4">
        <div className="text-sm font-medium opacity-80">Motor de Reglas</div>
        <div className="text-lg font-bold">Smart Contract ODRL</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
          <span className="text-orange-200 font-mono text-sm">IF</span>
          <span className="text-white text-sm">Usuario == Socio del Cluster</span>
        </div>
        <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
          <span className="text-orange-200 font-mono text-sm">AND</span>
          <span className="text-white text-sm">Pago ≥ 50€</span>
        </div>
        <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
          <span className="text-orange-200 font-mono text-sm">AND</span>
          <span className="text-white text-sm">Sector != Competencia</span>
        </div>
      </div>
    </div>

    {/* Branching Arrows */}
    <div className="flex items-center gap-16 mb-6">
      <ArrowDown className="h-6 w-6 text-emerald-500 rotate-[-30deg]" />
      <ArrowDown className="h-6 w-6 text-red-500 rotate-[30deg]" />
    </div>

    {/* Step 3: Outputs */}
    <div className="flex flex-col md:flex-row gap-8">
      {/* Success Case */}
      <div className="flex flex-col items-center">
        <div className="bg-emerald-100 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-emerald-800">Acceso Permitido</div>
              <div className="text-xs text-emerald-600">Hash de verificación generado</div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-emerald-600 font-medium">CONDICIONES CUMPLIDAS</div>
      </div>

      {/* Fail Case */}
      <div className="flex flex-col items-center">
        <div className="bg-red-100 rounded-2xl p-6 border border-red-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <XCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-red-800">Acceso Bloqueado</div>
              <div className="text-xs text-red-600">Dato permanece encriptado</div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-red-600 font-medium">CONDICIÓN FALLIDA</div>
      </div>
    </div>
  </div>
);

const OdrlPage = () => {
  return (
    <NodeFeatureLayout
      title="Políticas ODRL"
      subtitle="Soberanía Programable. Tus datos viajan con sus reglas pegadas. Si las condiciones no se cumplen, el dato permanece encriptado."
      icon={<FileKey className="h-10 w-10" />}
      visualComponent={<OdrlDiagram />}
      benefits={[
        {
          title: "Granularidad Extrema",
          desc: "No es solo 'público o privado'. Define reglas como: 'Visible solo para socios certificados en ISO 27001' o 'Acceso gratuito hasta 100 llamadas API'."
        },
        {
          title: "Soberanía Real",
          desc: "El dato nunca abandona tu servidor hasta que el contrato inteligente verifica que se cumplen todas las condiciones del acuerdo ODRL."
        },
        {
          title: "Auditoría Automática",
          desc: "Cada intento de acceso, exitoso o fallido, queda registrado en la Blockchain, creando una traza de auditoría legal inmutable."
        }
      ]}
    />
  );
};

export default OdrlPage;
