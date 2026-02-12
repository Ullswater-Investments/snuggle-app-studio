import { GreenProcurementCase, InterventionType } from "@/data/greenProcurementCases";
import { BarChart3, Leaf, TrendingUp, Target, Zap, Globe } from "lucide-react";

interface GPMetricsSceneProps {
  caseData: GreenProcurementCase;
  caseNumber: number;
}

// Generate mock KPIs based on the case
function generateKPIs(caseData: GreenProcurementCase): Array<{ label: string; value: string; icon: typeof TrendingUp }> {
  const kpis = [
    { label: caseData.metricLabel, value: caseData.metric, icon: Target },
  ];
  
  // Add intervention-specific KPIs
  switch (caseData.interventionType) {
    case "co-inversion":
      kpis.push(
        { label: "Inversión I+D", value: "€50M+", icon: TrendingUp },
        { label: "Partners", value: "3+", icon: Globe }
      );
      break;
    case "trazabilidad-forense":
      kpis.push(
        { label: "Puntos de Control", value: "500+", icon: BarChart3 },
        { label: "Tiempo Real", value: "24/7", icon: Zap }
      );
      break;
    case "educacion-proveedores":
      kpis.push(
        { label: "Proveedores Formados", value: "1000+", icon: Globe },
        { label: "Países", value: "25+", icon: TrendingUp }
      );
      break;
  }
  
  return kpis;
}

export function GPMetricsScene({ caseData, caseNumber }: GPMetricsSceneProps) {
  const kpis = generateKPIs(caseData);
  const Icon = caseData.sectorIcon;
  
  return (
    <div 
      className="w-[1920px] h-[1080px] bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 p-16 flex flex-col justify-between"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="px-6 py-3 rounded-full bg-emerald-500/20 text-emerald-400 text-2xl font-bold flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            MÉTRICAS DE IMPACTO
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
        {/* Left - Main Metric */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center ${caseData.bgColor}`}>
              <Icon className={`w-12 h-12 ${caseData.textColor}`} />
            </div>
            <div>
              <p className="text-slate-400 text-2xl">{caseData.sector}</p>
              <h1 className="text-6xl font-black text-white">{caseData.company}</h1>
            </div>
          </div>
          
          {/* Main Metric Card */}
          <div className={`p-12 rounded-3xl bg-gradient-to-br ${caseData.color} shadow-2xl`}>
            <p className="text-white/80 text-3xl font-medium uppercase tracking-wider mb-4">
              {caseData.metricLabel}
            </p>
            <p className="text-white text-[10rem] font-black leading-none">
              {caseData.metric}
            </p>
          </div>
          
          <p className="text-2xl text-slate-300">
            {caseData.impact}
          </p>
        </div>
        
        {/* Right - KPI Cards */}
        <div className="flex-shrink-0 w-[600px] space-y-6">
          {kpis.map((kpi, index) => {
            const KpiIcon = kpi.icon;
            return (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center gap-6"
              >
                <div className="w-20 h-20 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <KpiIcon className="w-10 h-10 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-xl mb-1">{kpi.label}</p>
                  <p className="text-white text-5xl font-bold">{kpi.value}</p>
                </div>
              </div>
            );
          })}
          
          {/* Regulatory Context */}
          <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
            <p className="text-slate-500 text-lg mb-2">Contexto Regulatorio</p>
            <p className="text-slate-300 text-xl">{caseData.regulatoryContext}</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-700">
        <div className="text-slate-500 text-xl">
          {caseData.country} • {caseData.program}
        </div>
        <div className="text-emerald-400 text-2xl font-bold">
          PROCUREDATA.EU
        </div>
      </div>
    </div>
  );
}
