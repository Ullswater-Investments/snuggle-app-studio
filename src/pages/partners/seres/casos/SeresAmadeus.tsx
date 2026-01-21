import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Globe, 
  FileSignature, 
  CheckCircle2, 
  Users, 
  Zap, 
  TrendingUp,
  Shield,
  Leaf,
  Server
} from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import SeresHeroSection from "@/components/partners/seres/SeresHeroSection";
import SeresObjectivesGrid from "@/components/partners/seres/SeresObjectivesGrid";
import SeresQuoteBox from "@/components/partners/seres/SeresQuoteBox";
import SeresSolutionSection from "@/components/partners/seres/SeresSolutionSection";
import SeresResultsGrid from "@/components/partners/seres/SeresResultsGrid";
import AmadeusLatamNetworkVisual from "@/components/partners/seres/visuals/AmadeusLatamNetworkVisual";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const SeresAmadeus = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  const objectives = [
    { icon: Globe, title: "Partner de confianza", description: "Transformación digital global" },
    { icon: FileSignature, title: "e-Factura global", description: "Solución para todos los países LATAM" },
    { icon: Server, title: "Unificar facturación", description: "Integración con sistemas centrales" },
    { icon: Leaf, title: "Medio ambiente", description: "Contribución a la sostenibilidad" },
    { icon: Shield, title: "Anticiparse", description: "Cumplir obligaciones LATAM" },
    { icon: CheckCircle2, title: "Centralizar", description: "Proceso único de emisión" }
  ];

  const results = [
    { icon: Users, title: "Alcance", description: "Personas procesadas por año", metric: "1.500M" },
    { icon: Globe, title: "Cobertura", description: "Países conectados", metric: "190+" },
    { icon: TrendingUp, title: "Eficiencia", description: "Mejora en procesos", metric: "+80%" },
    { icon: Zap, title: "Tiempo", description: "Reducción tiempo emisión", metric: "-65%" }
  ];

  const mermaidDiagram = `
graph TB
    subgraph "Orquestación LATAM"
        AM[Amadeus Central] -->|Factura| SERES[Hub SERES España]
        
        SERES -->|CFDI 4.0| MX[México SAT]
        SERES -->|DIAN| CO[Colombia]
        SERES -->|SRI| EC[Ecuador]
        SERES -->|AFIP| AR[Argentina]
    end
    
    subgraph "Políticas ODRL por País"
        SERES -->|Define| POL[Policy Engine]
        POL -->|MX| P1[Retención < 30 días]
        POL -->|CO| P2[Validación previa DIAN]
        POL -->|EC| P3[Firma electrónica SRI]
    end
    
    subgraph "Verificación Gaia-X"
        POL -->|Certifica| GAIA[Trustee Gaia-X]
        GAIA -->|Compliance| BADGE[Badge de Cumplimiento]
    end
    
    style SERES fill:#3b82f6,stroke:#1d4ed8,color:#fff
    style POL fill:#8b5cf6,stroke:#6d28d9,color:#fff
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Caso de Éxito: Amadeus</h1>
                <p className="text-xs text-slate-400">LATAM Multipaís · 1.500M personas/año</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <SeresHeroSection
          title="Amadeus"
          sector="LATAM Multipaís · Turismo"
          years="Cliente Activo"
          icon={Globe}
          color="from-pink-500 to-rose-600"
          stats={[
            { value: "1.500M", label: "Personas/año" },
            { value: "190+", label: "Países" },
            { value: "4", label: "Países LATAM" },
            { value: "1", label: "Hub Central" }
          ]}
        />

        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Objectives */}
          <SeresObjectivesGrid objectives={objectives} />

          {/* Quotes */}
          <div className="grid md:grid-cols-2 gap-6">
            <SeresQuoteBox
              quote="SERES se ha convertido en nuestro partner de confianza para la transformación digital en Latinoamérica, anticipándose siempre a las obligaciones normativas de cada país."
              author="Sebastián de Martino"
              role="Senior Manager"
              company="Amadeus LATAM"
            />
            <SeresQuoteBox
              quote="La centralización del proceso de facturación nos ha permitido escalar nuestra operación manteniendo el cumplimiento en cada jurisdicción."
              author="Alfredo Arce"
              role="Revenue Management Coordinator"
              company="Amadeus"
            />
          </div>

          {/* Traditional Solution */}
          <SeresSolutionSection
            title="Solución SERES Tradicional"
            description="Centralización de facturación electrónica en Latinoamérica cumpliendo las normativas específicas de cada país."
            features={[
              { text: "Hub central de facturación en España" },
              { text: "Cumplimiento CFDI 4.0 México" },
              { text: "Integración DIAN Colombia" },
              { text: "Certificación SRI Ecuador" },
              { text: "Adaptación AFIP Argentina" },
              { text: "Soporte multiidioma" }
            ]}
          />

          {/* Results */}
          <SeresResultsGrid results={results} />

          {/* PROCUREDATA Evolution */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <Server className="h-5 w-5 text-white" />
                </div>
                Evolución PROCUREDATA: Orquestación Multi-Jurisdicción
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Intro */}
              <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/20 border border-pink-500/30 rounded-xl p-6">
                <p className="text-lg text-slate-200">
                  SERES evoluciona de un hub de facturación a un <span className="text-pink-400 font-semibold">Orquestador de Políticas ODRL</span>, 
                  gestionando automáticamente los requisitos de cada país mediante contratos inteligentes.
                </p>
              </div>

              {/* LATAM Network Visual */}
              <AmadeusLatamNetworkVisual />

              {/* Mermaid Diagram */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Arquitectura de Orquestación</h4>
                <MermaidDiagram chart={mermaidDiagram} />
              </div>

              {/* ODRL Policies */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Políticas ODRL por Jurisdicción</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { 
                      country: "México (CFDI 4.0)",
                      policies: ["Retención máxima 30 días", "Timbrado obligatorio SAT", "Complemento de pagos"]
                    },
                    { 
                      country: "Colombia (DIAN)",
                      policies: ["Validación previa DIAN", "Nota crédito electrónica", "Eventos de recepción"]
                    },
                    { 
                      country: "Ecuador (SRI)",
                      policies: ["Firma electrónica SRI", "Ambiente de pruebas", "Autorización previa"]
                    },
                    { 
                      country: "Argentina (AFIP)",
                      policies: ["CAE/CAEA requerido", "Factura de crédito", "Régimen especial"]
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={item.country}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4"
                    >
                      <h5 className="font-semibold text-white mb-3">{item.country}</h5>
                      <ul className="space-y-2">
                        {item.policies.map((policy, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle2 className="h-4 w-4 text-pink-400" />
                            {policy}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Beneficios de la Orquestación PROCUREDATA</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      title: "Compliance Automático",
                      desc: "Políticas ODRL actualizadas automáticamente con cambios normativos",
                      icon: Shield
                    },
                    { 
                      title: "Un Solo Punto",
                      desc: "Integración única desde Amadeus Central a todos los países",
                      icon: Server
                    },
                    { 
                      title: "Escalable a +20 países",
                      desc: "Arquitectura preparada para expansión LATAM",
                      icon: Globe
                    }
                  ].map((cap, i) => (
                    <motion.div
                      key={cap.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-pink-900/30 to-rose-900/20 border border-pink-500/30 rounded-xl p-4"
                    >
                      <cap.icon className="h-8 w-8 text-pink-400 mb-3" />
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
              onClick={() => navigate("/partners/seres/miembros/casos-uso/siemens-gamesa")}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior: Siemens Gamesa
            </Button>
            <Button
              onClick={() => navigate("/partners/seres/miembros/casos-uso/bt")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Siguiente: BT Telecom
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeresAmadeus;
