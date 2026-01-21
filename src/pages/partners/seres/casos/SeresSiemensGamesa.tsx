import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Wind, 
  FileSignature, 
  Leaf, 
  Globe, 
  Zap, 
  TrendingUp,
  Link,
  Factory,
  AlertTriangle
} from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import SeresHeroSection from "@/components/partners/seres/SeresHeroSection";
import SeresObjectivesGrid from "@/components/partners/seres/SeresObjectivesGrid";
import SeresQuoteBox from "@/components/partners/seres/SeresQuoteBox";
import SeresSolutionSection from "@/components/partners/seres/SeresSolutionSection";
import SeresResultsGrid from "@/components/partners/seres/SeresResultsGrid";
import Scope3Visual from "@/components/partners/seres/visuals/Scope3Visual";
import SiemensGamesaDPPVisual from "@/components/partners/seres/visuals/SiemensGamesaDPPVisual";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const SeresSiemensGamesa = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  const objectives = [
    { icon: FileSignature, title: "Facturación automatizada", description: "Sistema avanzado de e-factura" },
    { icon: Factory, title: "Integración ERP", description: "Conexión directa con SAP" },
    { icon: Globe, title: "Operación global", description: "Presencia en +75 países" },
    { icon: Leaf, title: "Sostenibilidad", description: "Liderazgo en energía renovable" }
  ];

  const results = [
    { icon: Zap, title: "Eficiencia", description: "Reducción duplicidad facturas", metric: "-90%" },
    { icon: Globe, title: "Cobertura", description: "Países operativos", metric: "75+" },
    { icon: TrendingUp, title: "Productividad", description: "Mejora en procesamiento", metric: "+85%" },
    { icon: FileSignature, title: "Automatización", description: "Facturas procesadas auto", metric: "95%" }
  ];

  const mermaidDiagram = `
graph TB
    subgraph "Pasaporte Digital del Producto"
        FAC[Línea Factura] -->|UNSPSC| MAP[Mapeo Semántico]
        MAP -->|Consulta| CAT[Base Catena-X]
        CAT -->|Factor| PCF[Product Carbon Footprint]
    end
    
    subgraph "Credencial de Sostenibilidad"
        PCF -->|Genera| VC[Verifiable Credential]
        VC -->|Firma| SERES[Nodo SERES]
        SERES -->|Emite| DPP[Digital Product Passport]
    end
    
    subgraph "Interoperabilidad"
        DPP -->|EDC| CATX[Catena-X Network]
        DPP -->|Pontus-X| GAIA[Gaia-X Federation]
        DPP -->|Cliente| ESG[Reporting ESG]
    end
    
    style SERES fill:#3b82f6,stroke:#1d4ed8,color:#fff
    style VC fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style DPP fill:#10b981,stroke:#059669,color:#fff
    style CATX fill:#f97316,stroke:#ea580c,color:#fff
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Wind className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Caso de Éxito: Siemens Gamesa</h1>
                <p className="text-xs text-slate-400">Energía/Industria · +75 países</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <SeresHeroSection
          title="Siemens Gamesa"
          sector="Energía Renovable · Industria"
          years="Cliente Activo"
          icon={Wind}
          color="from-amber-500 to-orange-600"
          stats={[
            { value: "75+", label: "Países" },
            { value: "#1", label: "Eólica Mundial" },
            { value: "99%", label: "Alcance 3" },
            { value: "DPP", label: "Ready" }
          ]}
        />

        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Scope 3 Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-500/30 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">El Desafío del Alcance 3</h3>
                <p className="text-slate-300">
                  El <span className="text-red-400 font-semibold">99% de las emisiones</span> de Siemens Gamesa 
                  provienen de su cadena de suministro (Scope 3). Los métodos tradicionales de recopilación 
                  de datos son lentos, costosos y propensos a errores.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Objectives */}
          <SeresObjectivesGrid objectives={objectives} />

          {/* Quote */}
          <SeresQuoteBox
            quote="La eliminación de facturas duplicadas y la automatización del proceso nos ha permitido reducir drásticamente los errores y el tiempo de gestión en nuestra operación global."
            author="Edurne Hualde"
            role="Process Controller"
            company="Siemens Gamesa"
          />

          {/* Traditional Solution */}
          <SeresSolutionSection
            title="Solución SERES Tradicional"
            description="Facturación electrónica a medida e impulso de digitalización a proveedores globales."
            features={[
              { text: "Integración directa con SAP" },
              { text: "Eliminación de facturas duplicadas" },
              { text: "Onboarding de proveedores globales" },
              { text: "Soporte multi-país y multi-formato" }
            ]}
          />

          {/* Results */}
          <SeresResultsGrid results={results} />

          {/* PROCUREDATA Evolution */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                Evolución PROCUREDATA: Alcance 3 Automatizado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Scope 3 Visual */}
              <Scope3Visual />

              {/* DPP Visual */}
              <SiemensGamesaDPPVisual />

              {/* Mermaid Diagram */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Arquitectura del Pasaporte Digital</h4>
                <MermaidDiagram chart={mermaidDiagram} />
              </div>

              {/* Catena-X Integration */}
              <div className="bg-gradient-to-br from-orange-900/30 to-amber-900/20 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-600/30 flex items-center justify-center">
                    <Link className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Interoperabilidad Catena-X</h4>
                    <p className="text-sm text-slate-400">Data Space Automotriz y Energético Europeo</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-4">
                  SERES actúa como puente entre el ecosistema Pontus-X y Catena-X, permitiendo a Siemens Gamesa 
                  intercambiar datos de sostenibilidad con su cadena de suministro automotriz de forma soberana.
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    "EDC Connector certificado",
                    "Semantic Hub compartido",
                    "PCF Exchange integrado"
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-800/50 rounded-lg px-4 py-2 text-center text-sm text-orange-200">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Impacto en Reporting ESG</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      title: "PCF Automático",
                      desc: "Huella de carbono calculada desde cada línea de factura",
                      icon: Leaf
                    },
                    { 
                      title: "Trazabilidad Total",
                      desc: "Origen de cada componente verificable on-chain",
                      icon: Link
                    },
                    { 
                      title: "Cumplimiento EU",
                      desc: "Battery Passport 2027 ready",
                      icon: TrendingUp
                    }
                  ].map((cap, i) => (
                    <motion.div
                      key={cap.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-500/30 rounded-xl p-4"
                    >
                      <cap.icon className="h-8 w-8 text-amber-400 mb-3" />
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
              onClick={() => navigate("/partners/seres/miembros/casos-uso/ilunion")}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior: Ilunion
            </Button>
            <Button
              onClick={() => navigate("/partners/seres/miembros/casos-uso/amadeus")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Siguiente: Amadeus
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeresSiemensGamesa;
