import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Server, Database, Cpu, Shield, Lock, Cloud } from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import ComputeToDataVisual from "@/components/partners/seres/visuals/ComputeToDataVisual";

const SeresArquitectura = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  const c2dSequence = `
sequenceDiagram
    participant Banco as 🏦 Entidad Financiera
    participant Provider as 🔐 Ocean Provider SERES
    participant Pod as 📦 Kubernetes Pod
    participant DB as 💾 Datos SERES

    Banco->>Provider: 1. Envía algoritmo (Docker)
    Provider->>Provider: 2. Valida credenciales blockchain
    Provider->>Pod: 3. Lanza entorno efímero
    Pod->>DB: 4. Accede datos inyectados
    Pod->>Pod: 5. Ejecuta scoring
    Pod->>Banco: 6. Devuelve resultados agregados
    Pod->>Pod: 7. Autodestrucción ❌
`;

  const architectureDiagram = `
graph TB
    subgraph CLIENTES["Clientes SERES"]
        C1[ERP Cliente A]
        C2[ERP Cliente B]
    end
    subgraph NODO["NODO SERES PONTUS-X"]
        P[Ocean Provider]
        A[Aquarius Metadatos]
        C2D[Compute-to-Data]
        DB[(Datos Sensibles)]
    end
    subgraph ECOSISTEMA["Ecosistema PONTUS-X"]
        BK[Bancos]
        AU[Auditores ESG]
        INV[Inversores DeFi]
    end
    C1 & C2 --> DB
    P --> A
    P --> C2D
    C2D --> DB
    BK & AU & INV -->|Solicitud C2D| P
    P -->|Solo resultados| BK & AU & INV
    style NODO fill:#1e3a5f,stroke:#3b82f6
    style P fill:#3b82f6,stroke:#1e40af,color:#fff
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Server className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Arquitectura Técnica</h1>
                <p className="text-xs text-slate-400">Componentes del Nodo PROCUREDATA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Arquitectura del Nodo en Pontus-X</CardTitle>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={architectureDiagram} />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-slate-800/50 border-slate-700/50 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">Ocean Provider</CardTitle>
                    <Badge variant="outline" className="text-blue-400 border-blue-400/30">Controlador de Acceso</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-slate-300 text-sm space-y-2">
                <p>Actúa como compuerta lógica que verifica permisos en blockchain antes de ejecutar acciones.</p>
                <p>Las bases de datos permanecen aisladas tras firewalls, exponiendo solo esta interfaz controlada.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-slate-800/50 border-slate-700/50 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Database className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">Aquarius</CardTitle>
                    <Badge variant="outline" className="text-purple-400 border-purple-400/30">Indexador de Metadatos</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-slate-300 text-sm space-y-2">
                <p>Almacena Self-Descriptions de activos para que sean descubiertos en catálogos federados Gaia-X.</p>
                <p>Separación total entre metadatos (públicos) y datos (privados/cifrados).</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Cpu className="h-5 w-5 text-amber-400" />
                Compute-to-Data (C2D): Flujo Detallado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ComputeToDataVisual />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-white">Diagrama de Secuencia C2D</CardTitle>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={c2dSequence} />
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default SeresArquitectura;
