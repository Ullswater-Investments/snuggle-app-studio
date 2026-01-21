import React from 'react';
import { Fingerprint, User, Shield, Lock, CheckCircle, Globe, ArrowRight } from 'lucide-react';
import { NodeFeatureLayout } from './NodeFeatureLayout';

const IdentidadDIDPage = () => {
  const VisualDiagram = () => (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Main Flow */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Organization */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300 flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-orange-600" />
          </div>
          <span className="text-sm font-semibold text-foreground">Organización</span>
          <span className="text-xs text-muted-foreground">Tu empresa</span>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center">
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500" />
          <ArrowRight className="w-5 h-5 text-orange-500 -ml-1" />
        </div>
        <div className="md:hidden">
          <ArrowRight className="w-5 h-5 text-orange-500 rotate-90" />
        </div>

        {/* DID Generation Engine */}
        <div className="relative">
          <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-orange-500 flex flex-col items-center justify-center shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 rounded-full">
              <span className="text-xs font-bold text-white">MOTOR DID</span>
            </div>
            <Fingerprint className="w-14 h-14 text-orange-400 mb-2" />
            <div className="text-center px-4">
              <p className="text-white text-sm font-medium">Identidad</p>
              <p className="text-white text-sm font-medium">Descentralizada</p>
            </div>
            <div className="mt-3 px-3 py-1 bg-orange-500/20 rounded-lg border border-orange-500/40">
              <code className="text-[10px] text-orange-300">did:web:procuredata.es</code>
            </div>
          </div>
          {/* Orbiting elements */}
          <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center animate-pulse shadow-lg">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
            <Lock className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center">
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500" />
          <ArrowRight className="w-5 h-5 text-orange-500 -ml-1" />
        </div>
        <div className="md:hidden">
          <ArrowRight className="w-5 h-5 text-orange-500 rotate-90" />
        </div>

        {/* Verified Identity Card */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-40 h-28 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 flex flex-col items-center justify-center shadow-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-xs font-bold text-green-700">VERIFICADO</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">ACME Corp S.L.</p>
              <p className="text-[10px] text-muted-foreground">B12345678</p>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Globe className="w-3 h-3 text-green-600" />
              <span className="text-[9px] text-green-600">Gaia-X Compliant</span>
            </div>
          </div>
          <span className="text-sm font-semibold text-foreground">Credencial Verificable</span>
        </div>
      </div>

      {/* Bottom Trust Network */}
      <div className="mt-8 w-full max-w-2xl">
        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-center text-sm font-semibold text-muted-foreground mb-4">Red de Confianza Federada</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {['Gaia-X', 'IDSA', 'eIDAS 2.0', 'W3C DID'].map((trust, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium">{trust}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <NodeFeatureLayout
      title="Identidad Soberana (DID)"
      subtitle="Tu organización posee y controla su identidad digital. Sin intermediarios, con credenciales verificables compatibles con Gaia-X y eIDAS 2.0."
      icon={<Fingerprint className="w-10 h-10" />}
      visualComponent={<VisualDiagram />}
      benefits={[
        {
          title: "Auto-Soberanía Total",
          desc: "Tu empresa es dueña de su identidad digital. No dependes de ningún proveedor centralizado. Puedes portar tu DID a cualquier ecosistema compatible."
        },
        {
          title: "Verificación Instantánea",
          desc: "Las credenciales verificables (VCs) permiten demostrar certificaciones, KYB y compliance en milisegundos sin revelar datos innecesarios."
        },
        {
          title: "Interoperabilidad Europea",
          desc: "Compatible con eIDAS 2.0, Gaia-X Trust Framework e IDSA. Tu identidad es reconocida en todo el ecosistema de Espacios de Datos."
        }
      ]}
    />
  );
};

export default IdentidadDIDPage;
