import { GreenProcurementCase } from "@/data/greenProcurementCases";
import { AlertTriangle, Leaf } from "lucide-react";

interface GPChallengeSceneProps {
  caseData: GreenProcurementCase;
  caseNumber: number;
}

export function GPChallengeScene({ caseData, caseNumber }: GPChallengeSceneProps) {
  return (
    <div 
      className="w-[1920px] h-[1080px] bg-gradient-to-br from-red-950 via-slate-900 to-slate-900 p-16 flex flex-col justify-between"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="px-6 py-3 rounded-full bg-red-500/20 text-red-400 text-2xl font-bold flex items-center gap-3">
            <AlertTriangle className="w-8 h-8" />
            EL RETO
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
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-5xl text-center space-y-12">
          {/* Problem Icon */}
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 flex items-center justify-center border-4 border-red-500/50">
              <AlertTriangle className="w-20 h-20 text-red-400" />
            </div>
          </div>
          
          {/* Challenge Text */}
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-white">
              El Problema
            </h2>
            <p className="text-4xl text-slate-200 leading-relaxed font-light">
              "{caseData.challenge}"
            </p>
          </div>
          
          {/* Sector Tag */}
          <div className="flex justify-center gap-4">
            <div className={`px-8 py-4 rounded-xl text-xl font-semibold ${caseData.bgColor} ${caseData.textColor}`}>
              {caseData.sector}
            </div>
            <div className="px-8 py-4 rounded-xl text-xl font-semibold bg-slate-700 text-slate-300">
              {caseData.country}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-700">
        <div className="text-slate-500 text-xl">
          Contexto: {caseData.regulatoryContext}
        </div>
        <div className="text-red-400 text-2xl font-bold">
          ¿CÓMO LO SOLUCIONARON?
        </div>
      </div>
    </div>
  );
}
