import { GreenProcurementCase } from "@/data/greenProcurementCases";
import { Leaf, ShieldCheck } from "lucide-react";

interface GPHeroSceneProps {
  caseData: GreenProcurementCase;
  caseNumber: number;
}

export function GPHeroScene({ caseData, caseNumber }: GPHeroSceneProps) {
  const Icon = caseData.sectorIcon;
  
  return (
    <div 
      className="w-[1920px] h-[1080px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-16 flex flex-col justify-between"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-full bg-emerald-500/20 text-emerald-400 text-2xl font-bold flex items-center gap-3">
            <Leaf className="w-8 h-8" />
            GREEN PROCUREMENT
          </div>
          <span className="text-slate-400 text-xl font-mono">CASO {String(caseNumber).padStart(2, '0')}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <span className="font-mono text-lg">{caseData.blockchainProof}</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-between gap-16">
        {/* Left - Company Info */}
        <div className="flex-1 space-y-8">
          <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-2xl text-2xl font-semibold ${caseData.bgColor} ${caseData.textColor}`}>
            <Icon className="w-8 h-8" />
            {caseData.sector}
          </div>
          
          <div>
            <p className="text-slate-400 text-3xl mb-4">{caseData.country}</p>
            <h1 className="text-8xl font-black text-white leading-tight">
              {caseData.company}
            </h1>
            <h2 className="text-4xl font-semibold text-slate-300 mt-6">
              {caseData.program}
            </h2>
          </div>
          
          <p className="text-2xl text-slate-400 max-w-3xl leading-relaxed">
            {caseData.description}
          </p>
        </div>
        
        {/* Right - Metric */}
        <div className="flex-shrink-0">
          <div className={`w-96 h-96 rounded-3xl bg-gradient-to-br ${caseData.color} p-8 flex flex-col items-center justify-center shadow-2xl`}>
            <p className="text-white/80 text-2xl font-medium uppercase tracking-wider mb-4">
              {caseData.metricLabel}
            </p>
            <p className="text-white text-9xl font-black">
              {caseData.metric}
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-700">
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-xl">Contexto Regulatorio:</span>
          <span className="text-slate-300 text-xl font-medium">{caseData.regulatoryContext}</span>
        </div>
        <div className="text-emerald-400 text-2xl font-bold">
          PROCUREDATA.EU
        </div>
      </div>
    </div>
  );
}
