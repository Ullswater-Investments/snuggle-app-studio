import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Radio, 
  FileSignature, 
  CheckCircle2, 
  Building2, 
  Zap, 
  TrendingUp,
  Shield,
  CreditCard,
  UserCheck
} from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import SeresHeroSection from "@/components/partners/seres/SeresHeroSection";
import SeresObjectivesGrid from "@/components/partners/seres/SeresObjectivesGrid";
import SeresQuoteBox from "@/components/partners/seres/SeresQuoteBox";
import SeresSolutionSection from "@/components/partners/seres/SeresSolutionSection";
import SeresResultsGrid from "@/components/partners/seres/SeresResultsGrid";
import BTPublicSectorVisual from "@/components/partners/seres/visuals/BTPublicSectorVisual";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const SeresBT = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  const objectives = [
    { icon: FileSignature, title: "Cumplir obligatoriedad", description: "Facturación electrónica a AAPP" },
    { icon: Building2, title: "Evaluar opciones", description: "Desarrollo propio vs proveedor especializado" },
    { icon: Shield, title: "Garantizar compliance", description: "Normativa española y europea" },
    { icon: CheckCircle2, title: "Cercanía AAPP", description: "Relación directa con la Administración" }
  ];

  const results = [
    { icon: Zap, title: "Implementación", description: "Tiempo de puesta en marcha", metric: "Rápida" },
    { icon: TrendingUp, title: "Compliance", description: "Cumplimiento normativo", metric: "100%" },
    { icon: Building2, title: "Cobertura", description: "AAPP conectadas", metric: "Total" },
    { icon: CheckCircle2, title: "Satisfacción", description: "Nivel de servicio", metric: "Alto" }
  ];

  const mermaidDiagram = `
graph TB
    subgraph "Identidad Soberana B2G"
        BT[BT España] -->|Presenta| WALLET[EUDI Wallet]
        WALLET -->|VC| CRED[Credenciales Empresariales]
        
        CRED -->|NIF| V1[NIF Verificado]
        CRED -->|Pagos| V2[Al Corriente AEAT]
        CRED -->|Proveedor| V3[Homologación AAPP]
    end
    
    subgraph "Verificación Gaia-X"
        CRED -->|Valida| GAIA[Trustee Gaia-X]
        GAIA -->|Certifica| BADGE[Trust Badge]
    end
    
    subgraph "Facturación B2G"
        BADGE -->|Autoriza| SERES[Nodo SERES]
        SERES -->|e-Factura| AAPP[Administración Pública]
        AAPP -->|Pago| BT
    end
    
    style WALLET fill:#6366f1,stroke:#4f46e5,color:#fff
    style SERES fill:#3b82f6,stroke:#1d4ed8,color:#fff
    style GAIA fill:#10b981,stroke:#059669,color:#fff
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/partners/seres/miembros/casos-uso")}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-600 flex items-center justify-center">
                <Radio className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Caso de Éxito: BT Telecom</h1>
                <p className="text-xs text-slate-400">Telecomunicaciones · B2G</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <SeresHeroSection
          title="BT Telecom"
          sector="Telecomunicaciones · B2G"
          years="Cliente Activo"
          icon={Radio}
          color="from-slate-500 to-zinc-600"
          stats={[
            { value: "B2G", label: "Especializado" },
            { value: "100%", label: "Compliance" },
            { value: "AAPP", label: "Conectadas" },
            { value: "eIDAS", label: "Certificado" }
          ]}
        />

        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Objectives */}
          <SeresObjectivesGrid objectives={objectives} />

          {/* Quote */}
          <SeresQuoteBox
            quote="Lo que más valoramos de SERES es su cercanía con la Administración. Nos garantiza estar siempre al día con los cambios normativos y nos ofrece un servicio especializado en facturación B2G."
            author="Ricardo Luengo"
            role="Responsable de Facturación"
            company="BT Global Services España"
          />

          {/* Traditional Solution */}
          <SeresSolutionSection
            title="Solución SERES Tradicional"
            description="Transición exitosa a la emisión de factura electrónica para Administraciones Públicas, cumpliendo con la normativa española."
            features={[
              { text: "Facturación electrónica a AAPP" },
              { text: "Cumplimiento Ley 25/2013" },
              { text: "Integración con FACe" },
              { text: "Soporte especializado B2G" }
            ]}
          />

          {/* Results */}
          <SeresResultsGrid results={results} />

          {/* PROCUREDATA Evolution */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                Evolución PROCUREDATA: Identidad Soberana B2G
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Intro */}
              <div className="bg-gradient-to-br from-indigo-900/30 to-violet-900/20 border border-indigo-500/30 rounded-xl p-6">
                <p className="text-lg text-slate-200">
                  BT presenta automáticamente sus <span className="text-indigo-400 font-semibold">Credenciales Empresariales Verificables</span> desde 
                  su <span className="text-purple-400 font-semibold">EUDI Wallet</span> al emitir facturas a la Administración Pública, 
                  eliminando verificaciones manuales y acelerando los pagos.
                </p>
              </div>

              {/* B2G Visual */}
              <BTPublicSectorVisual />

              {/* Mermaid Diagram */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Arquitectura de Identidad Soberana</h4>
                <MermaidDiagram chart={mermaidDiagram} />
              </div>

              {/* Credentials */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Credenciales Verificables Presentadas</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "NIF Verificado", desc: "Identidad fiscal criptográficamente firmada", icon: UserCheck },
                    { title: "Al Corriente de Pagos", desc: "Certificado AEAT en tiempo real", icon: CheckCircle2 },
                    { title: "Proveedor Homologado", desc: "Acreditación como proveedor AAPP", icon: Shield },
                    { title: "Firma eIDAS Cualificada", desc: "Firma electrónica con certificado cualificado", icon: FileSignature }
                  ].map((cred, i) => (
                    <motion.div
                      key={cred.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4"
                    >
                      <cred.icon className="h-6 w-6 text-indigo-400 mt-1" />
                      <div>
                        <h5 className="font-semibold text-white">{cred.title}</h5>
                        <p className="text-sm text-slate-400">{cred.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Licitaciones */}
              <div className="bg-gradient-to-br from-slate-800/50 to-zinc-800/30 border border-slate-600/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Aplicación en Licitaciones Públicas</h4>
                <p className="text-slate-300 mb-4">
                  Las mismas credenciales pueden presentarse automáticamente en procesos de licitación pública, 
                  reduciendo drásticamente el tiempo de preparación de ofertas.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    "Presentación de credenciales en segundos",
                    "Validación instantánea de requisitos",
                    "Trazabilidad completa del proceso"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Beneficios de la Identidad Soberana</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      title: "KYC/KYB Instantáneo",
                      desc: "Verificación de identidad empresarial sin documentos",
                      icon: UserCheck
                    },
                    { 
                      title: "Pagos Acelerados",
                      desc: "La AAPP valida automáticamente y autoriza el pago",
                      icon: Zap
                    },
                    { 
                      title: "Compliance Europeo",
                      desc: "Preparado para eIDAS 2.0 y EUDI Wallet",
                      icon: Shield
                    }
                  ].map((cap, i) => (
                    <motion.div
                      key={cap.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-indigo-900/30 to-violet-900/20 border border-indigo-500/30 rounded-xl p-4"
                    >
                      <cap.icon className="h-8 w-8 text-indigo-400 mb-3" />
                      <h5 className="font-semibold text-white mb-2">{cap.title}</h5>
                      <p className="text-sm text-slate-400">{cap.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Button
              variant="outline"
              onClick={() => navigate("/partners/seres/miembros/casos-uso/amadeus")}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior: Amadeus
            </Button>
            <Button
              onClick={() => navigate("/partners/seres/miembros/casos-uso")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Volver a Casos de Uso
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeresBT;
