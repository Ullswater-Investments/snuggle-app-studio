import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lightbulb, TrendingUp, Shield, Database, Server, FileSignature } from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import MermaidDiagram from "@/components/MermaidDiagram";
import EDIToOracleVisual from "@/components/partners/seres/visuals/EDIToOracleVisual";

const SeresExploracion = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  const evolutionDiagram = `
graph LR
    subgraph TRADICIONAL["Modelo Tradicional"]
        A[Proveedor] -->|Documentos| B[SERES EDI]
        B -->|Transmisión| C[Cliente]
    end
    subgraph FUTURO["Modelo Pontus-X"]
        D[Proveedor] <-->|Datos| E[Nodo SERES]
        E <-->|C2D| F[Bancos]
        E <-->|VCs| G[Auditores]
        E <-->|DeFi| H[Inversores]
    end
    TRADICIONAL -->|Evolución| FUTURO
    style E fill:#3b82f6,stroke:#1e40af,color:#fff
`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/partners/seres/miembros")} className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Exploración Estratégica</h1>
                <p className="text-xs text-slate-400">De Tubería EDI a Oráculo de Datos</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <Badge className="w-fit bg-amber-500/20 text-amber-300 border-amber-500/30 mb-2">Transformación Estratégica</Badge>
              <CardTitle className="text-2xl text-white">La Metamorfosis del Intercambio Electrónico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>La arquitectura global que sustenta el intercambio de información comercial atraviesa su transformación más profunda en tres décadas. El valor económico se desplaza desde la mera "tubería" de transmisión hacia la <span className="text-blue-400 font-semibold">inteligencia computacional soberana</span> y los servicios financieros programables.</p>
              <p>Este cambio responde a una confluencia de fuerzas regulatorias (Data Act, ViDA, AI Act) y tecnológicas (Gaia-X, Ocean Protocol/Pontus-X) que permiten extraer valor de los datos sin comprometer privacidad ni propiedad.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Evolución del Modelo de Negocio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EDIToOracleVisual />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Diagrama de Arquitectura Evolutiva</CardTitle>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={evolutionDiagram} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                Propuesta de Valor PROCUREDATA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Database, title: "Oráculo de Datos Industriales", desc: "Capitalizar metadatos de millones de transacciones para servicios de alto valor" },
                  { icon: Shield, title: "Arquitectura Federada", desc: "Custodia física de datos sensibles con interfaces seguras para terceros" },
                  { icon: Server, title: "Habilitador de Liquidez", desc: "Transformar centro de costes en habilitador de competitividad" },
                  { icon: FileSignature, title: "Gaia-X Ready", desc: "Compatibilidad automática con GXDCH para verificación de identidades" }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                    <item.icon className="h-8 w-8 text-blue-400 mb-3" />
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default SeresExploracion;
