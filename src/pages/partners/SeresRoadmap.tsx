import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Map, CheckCircle2, Clock, Rocket } from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import MermaidDiagram from "@/components/MermaidDiagram";

const SeresRoadmap = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  const ganttDiagram = `
gantt
    title Hoja de Ruta PROCUREDATA
    dateFormat YYYY-MM
    section Fase 1: Identidad
    Verificación GXDCH           :2026-01, 3M
    Despliegue Provider/Aquarius :2026-02, 3M
    Políticas ODRL               :2026-03, 3M
    section Fase 2: Piloto ESG
    Selección Cliente (Ilunion/SG):2026-04, 2M
    Scripts C2D Sostenibilidad   :2026-05, 3M
    Primeras VCs emitidas        :2026-07, 2M
    section Fase 3: Mercado Financiero
    Integración DeFi (EURAU)     :2026-08, 3M
    Factoring en 1 click         :2026-09, 3M
    Conexión Catena-X            :2026-10, 3M
`;

  const phases = [
    { id: 1, title: "Fase 1: Identidad y Fundamentos", period: "Q1 2026", status: "upcoming", icon: CheckCircle2, color: "from-blue-500 to-cyan-600", tasks: ["Verificación en GXDCH", "Despliegue Ocean Provider + Aquarius", "Configuración políticas ODRL"] },
    { id: 2, title: "Fase 2: Piloto ESG", period: "Q2-Q3 2026", status: "planned", icon: Clock, color: "from-purple-500 to-violet-600", tasks: ["Selección cliente piloto (Ilunion/Siemens Gamesa)", "Desarrollo scripts C2D para sostenibilidad", "Emisión primeras VCs de impacto"] },
    { id: 3, title: "Fase 3: Mercado Financiero", period: "Q4 2026", status: "planned", icon: Rocket, color: "from-emerald-500 to-teal-600", tasks: ["Integración DeFi con EURAU", "Factoring tokenizado en 1 click", "Conexión con ecosistema Catena-X"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/partners/seres/miembros")} className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-600 flex items-center justify-center">
                <Map className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Hoja de Ruta</h1>
                <p className="text-xs text-slate-400">Plan de implementación PROCUREDATA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Diagrama Gantt de Implementación</CardTitle>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={ganttDiagram} />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <motion.div key={phase.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
              <Card className="bg-slate-800/50 border-slate-700/50 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
                      <phase.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-slate-400 border-slate-600">{phase.period}</Badge>
                  </div>
                  <CardTitle className="text-lg text-white">{phase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SeresRoadmap;
