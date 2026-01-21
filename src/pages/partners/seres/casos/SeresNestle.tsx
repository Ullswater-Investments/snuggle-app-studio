import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Cloud, 
  FileSignature, 
  Globe, 
  Users, 
  Zap, 
  TrendingUp,
  Shield,
  Database,
  CheckCircle2
} from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import SeresHeroSection from "@/components/partners/seres/SeresHeroSection";
import SeresObjectivesGrid from "@/components/partners/seres/SeresObjectivesGrid";
import SeresQuoteBox from "@/components/partners/seres/SeresQuoteBox";
import SeresSolutionSection from "@/components/partners/seres/SeresSolutionSection";
import SeresResultsGrid from "@/components/partners/seres/SeresResultsGrid";
import NestleEDIEvolutionVisual from "@/components/partners/seres/visuals/NestleEDIEvolutionVisual";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const SeresNestle = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  const objectives = [
    { icon: Cloud, title: "Integrar gestión en la nube", description: "Sistema unificado de documentos electrónicos" },
    { icon: FileSignature, title: "Formato único", description: "Recepción y emisión estandarizada" },
    { icon: Globe, title: "Conectar con socios", description: "Adaptarse a la tecnología de cada proveedor" },
    { icon: Users, title: "Máxima adopción EDI", description: "Incorporar el mayor número de socios al proyecto" },
    { icon: Shield, title: "Seguridad certificada", description: "Cumplimiento normativo global" },
    { icon: Database, title: "Trazabilidad completa", description: "Auditoría de todos los intercambios" }
  ];

  const results = [
    { icon: Zap, title: "Agilización", description: "Procesos acelerados con gestión digital", metric: "-70%" },
    { icon: TrendingUp, title: "Transparencia", description: "Visibilidad completa de la cadena", metric: "100%" },
    { icon: Globe, title: "Conexión Global", description: "Proveedores en +100 países", metric: "+100" },
    { icon: Users, title: "Digitalización", description: "Impulso digital a proveedores", metric: "+500" }
  ];

  const mermaidDiagram = `
graph TB
    subgraph "Modelo Tradicional"
        P1[Proveedor] -->|Factura| S1[SERES]
        S1 -->|Transmisión| N1[Nestlé]
    end
    
    subgraph "Modelo PROCUREDATA"
        P2[Proveedor] -->|Factura + Metadatos| S2[Nodo SERES]
        S2 -->|C2D| AI[IA Federada]
        AI -->|Insights| N2[Nestlé]
        S2 -->|VCs ESG| B[Bancos/Auditores]
        S2 -->|Scoring| F[Factoring]
    end
    
    style S2 fill:#3b82f6,stroke:#1d4ed8,color:#fff
    style AI fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style B fill:#10b981,stroke:#059669,color:#fff
    style F fill:#f59e0b,stroke:#d97706,color:#fff
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Caso de Éxito: Nestlé</h1>
                <p className="text-xs text-slate-400">Gran Consumo · +25 años</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <SeresHeroSection
          title="Nestlé"
          sector="Gran Consumo"
          years="+25 años de relación"
          icon={ShoppingCart}
          color="from-blue-500 to-cyan-600"
          stats={[
            { value: "+25", label: "Años colaborando" },
            { value: "100+", label: "Países conectados" },
            { value: "500+", label: "Proveedores EDI" },
            { value: "99.9%", label: "Disponibilidad" }
          ]}
        />

        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Objectives */}
          <SeresObjectivesGrid objectives={objectives} />

          {/* Quote */}
          <SeresQuoteBox
            quote="SERES ha sido nuestro partner estratégico durante más de 25 años, permitiéndonos escalar nuestra operación EDI globalmente mientras mantenemos los más altos estándares de seguridad y compliance."
            author="Director de Operaciones"
            role="Supply Chain"
            company="Nestlé España"
          />

          {/* Traditional Solution */}
          <SeresSolutionSection
            title="Solución SERES Tradicional"
            description="Plataforma EDI empresarial para el intercambio masivo de documentos comerciales con proveedores globales."
            features={[
              { text: "Integración con SAP y sistemas ERP" },
              { text: "Soporte multi-formato (EDIFACT, XML, JSON)" },
              { text: "Conexión con +500 proveedores" },
              { text: "SLA 99.9% de disponibilidad" },
              { text: "Cumplimiento normativo global" },
              { text: "Soporte 24/7 multiidioma" }
            ]}
          />

          {/* Results */}
          <SeresResultsGrid results={results} />

          {/* PROCUREDATA Evolution */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                Evolución PROCUREDATA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Visual Evolution */}
              <NestleEDIEvolutionVisual />

              {/* Mermaid Diagram */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Arquitectura del Nodo Federado</h4>
                <MermaidDiagram chart={mermaidDiagram} />
              </div>

              {/* New Capabilities */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Nuevas Capacidades con Pontus-X</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      title: "Detección de Fraude IVA",
                      desc: "IA federada analiza patrones sin exponer datos sensibles de proveedores",
                      icon: Shield
                    },
                    { 
                      title: "Scoring ESG Automático",
                      desc: "Credenciales verificables de sostenibilidad para cada proveedor",
                      icon: CheckCircle2
                    },
                    { 
                      title: "Factoring Soberano",
                      desc: "Tokenización de facturas para acceso a liquidez descentralizada",
                      icon: Database
                    }
                  ].map((cap, i) => (
                    <motion.div
                      key={cap.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-purple-900/30 to-violet-900/20 border border-purple-500/30 rounded-xl p-4"
                    >
                      <cap.icon className="h-8 w-8 text-purple-400 mb-3" />
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
              onClick={() => navigate("/partners/seres/miembros/casos-uso")}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Casos de Uso
            </Button>
            <Button
              onClick={() => navigate("/partners/seres/miembros/casos-uso/coviran")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Siguiente: Covirán
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeresNestle;
