import { GreenProcurementCase, InterventionType } from "@/data/greenProcurementCases";
import { Coins, Satellite, BookOpen, Lightbulb, ArrowRight, Leaf } from "lucide-react";

interface GPStrategySceneProps {
  caseData: GreenProcurementCase;
  caseNumber: number;
}

const interventionConfig: Record<InterventionType, { icon: typeof Coins; label: string; color: string; bgColor: string }> = {
  "co-inversion": {
    icon: Coins,
    label: "Co-inversión",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20"
  },
  "trazabilidad-forense": {
    icon: Satellite,
    label: "Trazabilidad Forense",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20"
  },
  "educacion-proveedores": {
    icon: BookOpen,
    label: "Educación Proveedores",
    color: "text-violet-400",
    bgColor: "bg-violet-500/20"
  }
};

export function GPStrategyScene({ caseData, caseNumber }: GPStrategySceneProps) {
  const intervention = interventionConfig[caseData.interventionType];
  const InterventionIcon = intervention.icon;
  
  return (
    <div 
      className="w-[1920px] h-[1080px] bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950 p-16 flex flex-col justify-between"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="px-6 py-3 rounded-full bg-blue-500/20 text-blue-400 text-2xl font-bold flex items-center gap-3">
            <Lightbulb className="w-8 h-8" />
            LA ESTRATEGIA
          </div>
          <span className="text-slate-400 text-xl">
            {caseData.company} • Caso {String(caseNumber).padStart(2, '0')}
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400">
          <Leaf className="w-5 h-5" />
          <span className="text-lg">Green Procurement</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center gap-16">
        {/* Left - Strategy Text */}
        <div className="flex-1 space-y-10">
          {/* Intervention Type Badge */}
          <div className={`inline-flex items-center gap-4 px-8 py-4 rounded-2xl text-2xl font-bold ${intervention.bgColor} ${intervention.color}`}>
            <InterventionIcon className="w-10 h-10" />
            {intervention.label}
          </div>
          
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-white">
              La Solución
            </h2>
            <p className="text-3xl text-slate-200 leading-relaxed">
              {caseData.strategy}
            </p>
          </div>
        </div>
        
        {/* Right - Visual Flow */}
        <div className="flex-shrink-0 w-[500px]">
          <div className="space-y-6">
            {/* Problem Box */}
            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30">
              <p className="text-red-400 text-lg font-semibold mb-2">PROBLEMA</p>
              <p className="text-slate-300 text-xl">
                {caseData.challenge.slice(0, 80)}...
              </p>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-12 h-12 text-blue-400 rotate-90" />
            </div>
            
            {/* Intervention Box */}
            <div className={`p-6 rounded-2xl ${intervention.bgColor} border border-current/30`}>
              <p className={`${intervention.color} text-lg font-semibold mb-2 flex items-center gap-2`}>
                <InterventionIcon className="w-5 h-5" />
                {intervention.label.toUpperCase()}
              </p>
              <p className="text-slate-300 text-xl">
                {caseData.program}
              </p>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-12 h-12 text-emerald-400 rotate-90" />
            </div>
            
            {/* Result Box */}
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <p className="text-emerald-400 text-lg font-semibold mb-2">RESULTADO</p>
              <p className="text-white text-4xl font-bold">
                {caseData.metric} <span className="text-xl font-normal text-slate-400">{caseData.metricLabel}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-700">
        <div className="text-slate-500 text-xl">
          {caseData.sector} • {caseData.country}
        </div>
        <div className="text-blue-400 text-2xl font-bold">
          PROCUREDATA.EU
        </div>
      </div>
    </div>
  );
}
