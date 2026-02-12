import { GreenProcurementCase } from "@/data/greenProcurementCases";
import { ShieldCheck, Leaf, Lock, CheckCircle2, Clock, Hash, Fingerprint } from "lucide-react";

interface GPProofSceneProps {
  caseData: GreenProcurementCase;
  caseNumber: number;
}

export function GPProofScene({ caseData, caseNumber }: GPProofSceneProps) {
  const Icon = caseData.sectorIcon;
  const currentDate = new Date().toISOString();
  const blockNumber = Math.floor(Math.random() * 9000000) + 1000000;
  
  return (
    <div 
      className="w-[1920px] h-[1080px] bg-gradient-to-br from-violet-950 via-slate-900 to-slate-900 p-16 flex flex-col justify-between"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="px-6 py-3 rounded-full bg-violet-500/20 text-violet-400 text-2xl font-bold flex items-center gap-3">
            <ShieldCheck className="w-8 h-8" />
            PRUEBA BLOCKCHAIN
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
        {/* Left - Blockchain Certificate */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center ${caseData.bgColor}`}>
              <Icon className={`w-12 h-12 ${caseData.textColor}`} />
            </div>
            <div>
              <p className="text-slate-400 text-2xl">{caseData.company}</p>
              <h1 className="text-5xl font-bold text-white">{caseData.program}</h1>
            </div>
          </div>
          
          {/* Certificate Card */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-violet-500/30 shadow-2xl space-y-8">
            {/* Hash */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-violet-400">
                <Hash className="w-6 h-6" />
                <span className="text-xl font-semibold">Transaction Hash</span>
              </div>
              <p className="text-3xl font-mono text-white bg-slate-900/50 px-6 py-4 rounded-xl">
                {caseData.blockchainProof}
              </p>
            </div>
            
            {/* Block Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-slate-900/50">
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                  <Clock className="w-5 h-5" />
                  <span>Timestamp</span>
                </div>
                <p className="text-xl text-white font-mono">{currentDate}</p>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/50">
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                  <Fingerprint className="w-5 h-5" />
                  <span>Block Number</span>
                </div>
                <p className="text-xl text-white font-mono">#{blockNumber}</p>
              </div>
            </div>
            
            {/* Status */}
            <div className="flex items-center gap-4 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              <div>
                <p className="text-emerald-400 text-xl font-bold">Verificado en Blockchain</p>
                <p className="text-slate-400">Red: Pontus-X (Gaia-X Federation)</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right - Verification Details */}
        <div className="flex-shrink-0 w-[500px] space-y-6">
          {/* Result Summary */}
          <div className={`p-8 rounded-2xl bg-gradient-to-br ${caseData.color}`}>
            <p className="text-white/80 text-xl mb-2">Resultado Verificado</p>
            <p className="text-white text-6xl font-black">{caseData.metric}</p>
            <p className="text-white/80 text-xl mt-2">{caseData.metricLabel}</p>
          </div>
          
          {/* Verification Badges */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center gap-4">
              <Lock className="w-8 h-8 text-violet-400" />
              <div>
                <p className="text-white text-lg font-semibold">Inmutable</p>
                <p className="text-slate-400">No puede ser alterado</p>
              </div>
            </div>
            
            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-white text-lg font-semibold">Auditable</p>
                <p className="text-slate-400">Trazabilidad completa</p>
              </div>
            </div>
            
            <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-white text-lg font-semibold">Certificado</p>
                <p className="text-slate-400">{caseData.regulatoryContext}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-700">
        <div className="text-slate-500 text-xl">
          {caseData.sector} • {caseData.country}
        </div>
        <div className="text-violet-400 text-2xl font-bold">
          PROCUREDATA.EU • PONTUS-X
        </div>
      </div>
    </div>
  );
}
