import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Heart, 
  FileSignature, 
  CheckCircle2, 
  Users, 
  Zap, 
  TrendingUp,
  Shield,
  Leaf,
  Award
} from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import SeresHeroSection from "@/components/partners/seres/SeresHeroSection";
import SeresObjectivesGrid from "@/components/partners/seres/SeresObjectivesGrid";
import SeresQuoteBox from "@/components/partners/seres/SeresQuoteBox";
import SeresSolutionSection from "@/components/partners/seres/SeresSolutionSection";
import SeresResultsGrid from "@/components/partners/seres/SeresResultsGrid";
import CredentialFlowVisual from "@/components/partners/seres/visuals/CredentialFlowVisual";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const SeresIlunion = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  const objectives = [
    { icon: FileSignature, title: "Centralizar facturas", description: "Punto único de recepción de facturas" },
    { icon: Zap, title: "Digitalizar gestión", description: "Automatizar proceso completo" },
    { icon: TrendingUp, title: "Agilizar aprobación", description: "Flujos de aprobación optimizados" },
    { icon: Leaf, title: "Eliminar papel", description: "Compromiso 100% digital" }
  ];

  const results = [
    { icon: Zap, title: "Automatización", description: "Procesos digitalizados", metric: "100%" },
    { icon: TrendingUp, title: "Ahorro tiempo", description: "Reducción en gestión", metric: "-75%" },
    { icon: Leaf, title: "Papel eliminado", description: "Facturas en papel", metric: "0" },
    { icon: Users, title: "Satisfacción", description: "Empleados beneficiados", metric: "Alto" }
  ];

  const mermaidDiagram = `
graph TB
    subgraph "Emisión VC de Impacto"
        FAC[Factura Ilunion] -->|Procesa| SERES[Nodo SERES]
        SERES -->|Genera| VC[Credencial Verificable]
        
        VC -->|Incluye| A1[Centro Especial Empleo]
        VC -->|Incluye| A2[>70% Plantilla Discapacidad]
        VC -->|Incluye| A3[Huella Carbono Certificada]
    end
    
    subgraph "Consumo por Cliente"
        VC -->|Presenta| CLI[Cliente Receptor]
        CLI -->|Importa| ERP[ERP Cliente]
        ERP -->|Genera| ESG[Dashboard ESG]
        ESG -->|Cumple| CSRD[Directiva CSRD]
    end
    
    style SERES fill:#3b82f6,stroke:#1d4ed8,color:#fff
    style VC fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style ESG fill:#10b981,stroke:#059669,color:#fff
    style CSRD fill:#f59e0b,stroke:#d97706,color:#fff
  `;

  const certifiedAttributes = [
    { label: "Centro Especial de Empleo", verified: true },
    { label: ">70% plantilla con discapacidad", verified: true },
    { label: "Huella de carbono certificada", verified: true },
    { label: "Certificación EFQM", verified: true },
    { label: "ISO 14001 Medio Ambiente", verified: true },
    { label: "Economía Social certificada", verified: true }
  ];

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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Caso de Éxito: Ilunion</h1>
                <p className="text-xs text-slate-400">Impacto Social · Grupo ONCE</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <SeresHeroSection
          title="Ilunion"
          sector="Impacto Social · Grupo ONCE"
          years="Cliente Activo"
          icon={Heart}
          color="from-purple-500 to-violet-600"
          stats={[
            { value: "100%", label: "Digital" },
            { value: "0", label: "Papel" },
            { value: "EFQM", label: "Certificado" },
            { value: "ESG", label: "Líder" }
          ]}
        />

        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Objectives */}
          <SeresObjectivesGrid objectives={objectives} />

          {/* Quote */}
          <SeresQuoteBox
            quote="La digitalización es nuestra aliada en el proceso de cambio. SERES nos ha permitido eliminar completamente el papel en la gestión de facturas, alineándonos con nuestro compromiso de sostenibilidad."
            author="Responsable de Administración"
            role="Finanzas"
            company="Ilunion"
          />

          {/* Traditional Solution */}
          <SeresSolutionSection
            title="Solución SERES Tradicional"
            description="Centralización y automatización completa de la recepción y aprobación de facturas, eliminando el uso del papel."
            features={[
              { text: "Punto único de recepción de facturas" },
              { text: "Flujos de aprobación digitales" },
              { text: "Integración con ERP" },
              { text: "Archivo digital certificado" }
            ]}
          />

          {/* Results */}
          <SeresResultsGrid results={results} />

          {/* PROCUREDATA Evolution */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                Evolución PROCUREDATA: Credenciales de Impacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Intro */}
              <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/20 border border-purple-500/30 rounded-xl p-6">
                <p className="text-lg text-slate-200">
                  Cada factura emitida por Ilunion incluye automáticamente una <span className="text-purple-400 font-semibold">Credencial Verificable de Impacto Social</span>, 
                  permitiendo a los clientes cumplir con la <span className="text-amber-400 font-semibold">Directiva CSRD</span> sin auditorías manuales.
                </p>
              </div>

              {/* Credential Flow Visual */}
              <CredentialFlowVisual />

              {/* Mermaid Diagram */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Flujo de Credenciales Verificables</h4>
                <MermaidDiagram chart={mermaidDiagram} />
              </div>

              {/* Certified Attributes */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Atributos Certificados en cada Factura</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {certifiedAttributes.map((attr, i) => (
                    <motion.div
                      key={attr.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-200">{attr.label}</span>
                      <Shield className="h-4 w-4 text-purple-400 ml-auto" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Beneficios para Clientes de Ilunion</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      title: "Cumplimiento CSRD Automático",
                      desc: "Datos ESG verificados importados directamente al ERP",
                      icon: Shield
                    },
                    { 
                      title: "Sin Auditorías Manuales",
                      desc: "Credenciales verificables criptográficamente",
                      icon: CheckCircle2
                    },
                    { 
                      title: "Impacto Medible",
                      desc: "Dashboard en tiempo real de impacto social",
                      icon: TrendingUp
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
              onClick={() => navigate("/partners/seres/miembros/casos-uso/coviran")}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior: Covirán
            </Button>
            <Button
              onClick={() => navigate("/partners/seres/miembros/casos-uso/siemens-gamesa")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Siguiente: Siemens Gamesa
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeresIlunion;
