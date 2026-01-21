import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ShoppingCart, 
  FileSignature, 
  BarChart3, 
  Users, 
  Zap, 
  TrendingUp,
  Brain,
  Coins,
  Store
} from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import SeresHeroSection from "@/components/partners/seres/SeresHeroSection";
import SeresObjectivesGrid from "@/components/partners/seres/SeresObjectivesGrid";
import SeresQuoteBox from "@/components/partners/seres/SeresQuoteBox";
import SeresSolutionSection from "@/components/partners/seres/SeresSolutionSection";
import SeresResultsGrid from "@/components/partners/seres/SeresResultsGrid";
import FederatedLearningVisual from "@/components/partners/seres/visuals/FederatedLearningVisual";
import CoviranDynamicDiscountVisual from "@/components/partners/seres/visuals/CoviranDynamicDiscountVisual";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const SeresCovirán = () => {
  const navigate = useNavigate();
  const { session } = usePartnerAuth("seres");

  const objectives = [
    { icon: FileSignature, title: "Impulso EDI", description: "Gestión electrónica de documentos con proveedores" },
    { icon: BarChart3, title: "Digitalizar facturas", description: "Automatizar recepción y procesamiento" },
    { icon: Store, title: "Gestión SII", description: "Cumplimiento con Agencia Tributaria" },
    { icon: Users, title: "Conectar cooperativistas", description: "Red unificada de 2.876 supermercados" }
  ];

  const results = [
    { icon: Zap, title: "Automatización", description: "Procesamiento automático de facturas", metric: "95%" },
    { icon: TrendingUp, title: "Eficiencia", description: "Reducción tiempo de gestión", metric: "-60%" },
    { icon: Users, title: "Cobertura", description: "Supermercados conectados", metric: "2.876" },
    { icon: Store, title: "Empleados", description: "Beneficiados por la digitalización", metric: "15.560" }
  ];

  const mermaidDiagram = `
graph TB
    subgraph "Aprendizaje Federado Covirán"
        C1[Cooperativista A] -->|Gradientes| AGG[Agregador SERES]
        C2[Cooperativista B] -->|Gradientes| AGG
        C3[Cooperativista C] -->|Gradientes| AGG
        
        AGG -->|Modelo Global| C1
        AGG -->|Modelo Global| C2
        AGG -->|Modelo Global| C3
    end
    
    subgraph "Predicción de Demanda"
        AGG --> PRED[Modelo Predictivo]
        PRED -->|Pronóstico| INV[Optimización Inventario]
        PRED -->|Tendencias| PROV[Negociación Proveedores]
    end
    
    style AGG fill:#3b82f6,stroke:#1d4ed8,color:#fff
    style PRED fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style INV fill:#10b981,stroke:#059669,color:#fff
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Caso de Éxito: Covirán</h1>
                <p className="text-xs text-slate-400">Retail Cooperativo · 2.876 supermercados</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <SeresHeroSection
          title="Covirán"
          sector="Retail Cooperativo"
          years="Cliente Activo"
          icon={ShoppingCart}
          color="from-emerald-500 to-teal-600"
          stats={[
            { value: "2.876", label: "Supermercados" },
            { value: "15.560", label: "Empleados" },
            { value: "4", label: "Países" },
            { value: "95%", label: "Automatización" }
          ]}
        />

        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Objectives */}
          <SeresObjectivesGrid objectives={objectives} />

          {/* Quote */}
          <SeresQuoteBox
            quote="La digitalización de nuestros procesos de facturación nos ha permitido optimizar la gestión de nuestra red de cooperativistas, mejorando la eficiencia operativa en toda la cadena."
            author="Director de Sistemas"
            role="Tecnología"
            company="Covirán"
          />

          {/* Traditional Solution */}
          <SeresSolutionSection
            title="Solución SERES Tradicional"
            description="Plataforma integral para la recepción de e-factura y envío de pedidos EDI a proveedores de la cooperativa."
            features={[
              { text: "Recepción centralizada de facturas electrónicas" },
              { text: "Gestión automatizada del SII" },
              { text: "Envío de pedidos a proveedores" },
              { text: "Integración con sistemas cooperativos" }
            ]}
          />

          {/* Results */}
          <SeresResultsGrid results={results} />

          {/* PROCUREDATA Evolution */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                Evolución PROCUREDATA: IA Federada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Federated Learning Visual */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Predicción de Demanda Federada</h4>
                <p className="text-slate-400 mb-6">
                  Los cooperativistas entrenan modelos de IA compartiendo solo gradientes, nunca datos de ventas. 
                  Cada supermercado mejora su predicción sin exponer información competitiva.
                </p>
                <FederatedLearningVisual />
              </div>

              {/* Mermaid Diagram */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Arquitectura de Aprendizaje Federado</h4>
                <MermaidDiagram chart={mermaidDiagram} />
              </div>

              {/* Dynamic Discount */}
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-3">
                    <Coins className="h-6 w-6 text-amber-400" />
                    Descuento Dinámico Soberano
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CoviranDynamicDiscountVisual />
                </CardContent>
              </Card>

              {/* New Capabilities */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Beneficios para la Cooperativa</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      title: "Predicción Colaborativa",
                      desc: "IA que aprende de todos sin compartir datos sensibles",
                      icon: Brain
                    },
                    { 
                      title: "Liquidez Inmediata",
                      desc: "Proveedores acceden a pronto pago vía smart contracts",
                      icon: Coins
                    },
                    { 
                      title: "Optimización de Stock",
                      desc: "Reducción de mermas y roturas de stock",
                      icon: BarChart3
                    }
                  ].map((cap, i) => (
                    <motion.div
                      key={cap.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/30 rounded-xl p-4"
                    >
                      <cap.icon className="h-8 w-8 text-emerald-400 mb-3" />
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
              onClick={() => navigate("/partners/seres/miembros/casos-uso/nestle")}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior: Nestlé
            </Button>
            <Button
              onClick={() => navigate("/partners/seres/miembros/casos-uso/ilunion")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Siguiente: Ilunion
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeresCovirán;
