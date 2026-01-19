import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import * as MatrixVisuals from './matrix-visuals';

type Cluster = "commercial" | "monetization" | "trust" | "operations";
type Stakeholder = "expositor" | "visitante" | "organizador";

interface UseCase20 {
  id: number;
  title: string;
  cluster: Cluster;
  description: string;
  VisualComponent: React.ComponentType;
  stakeholder: Stakeholder;
}

const useCases: UseCase20[] = [
  // COMMERCIAL (Rose) - Sales Acceleration
  { id: 1, title: "Instant Deal", cluster: "commercial", description: "Smart Contracts firmados con un toque de badges. El acuerdo legal existe antes de dejar la feria.", VisualComponent: MatrixVisuals.InstantDealVisual, stakeholder: "expositor" },
  { id: 2, title: "Lead Enrichment", cluster: "commercial", description: "Acceso al Data Wallet del visitante: facturación, stack tecnológico y decisores verificados.", VisualComponent: MatrixVisuals.LeadEnrichmentVisual, stakeholder: "expositor" },
  { id: 3, title: "Event Factoring", cluster: "commercial", description: "Financiación instantánea en EUROe para PYMEs basada en transacciones validadas en el nodo.", VisualComponent: MatrixVisuals.EventFactoringVisual, stakeholder: "expositor" },
  { id: 4, title: "RFP Automatizado", cluster: "commercial", description: "Compradores lanzan peticiones; expositores cualificados reciben alertas y ofertan con un clic.", VisualComponent: MatrixVisuals.RFPAutoVisual, stakeholder: "visitante" },
  { id: 5, title: "VIP Fast-Track", cluster: "commercial", description: "Compradores VIP reconocidos automáticamente como solventes y verificados. Sin papeleo.", VisualComponent: MatrixVisuals.VIPFastTrackVisual, stakeholder: "visitante" },
  
  // MONETIZATION (Blue) - New Revenue
  { id: 6, title: "Benchmarking Retail", cluster: "monetization", description: "Retailers comparten datos anonimizados y reciben informes comparativos del sector.", VisualComponent: MatrixVisuals.BenchmarkingVisual, stakeholder: "organizador" },
  { id: 7, title: "Sindicación Audiencias", cluster: "monetization", description: "Expositores cruzan bases de datos sin verlas. Descubren clientes comunes para campañas conjuntas.", VisualComponent: MatrixVisuals.CrossMarketingVisual, stakeholder: "expositor" },
  { id: 8, title: "Mercado IA Training", cluster: "monetization", description: "Datasets brutos disponibles para startups de IA. CloserStill comisiona cada transacción.", VisualComponent: MatrixVisuals.AITrainingMarketVisual, stakeholder: "organizador" },
  { id: 9, title: "Leads Post-Evento", cluster: "monetization", description: "Visitantes autorizan vender su perfil de navegación a expositores relevantes vía micropagos.", VisualComponent: MatrixVisuals.LeadSaleVisual, stakeholder: "visitante" },
  { id: 10, title: "Content Tokenizado", cluster: "monetization", description: "Ponencias premium como NFTs de acceso. Ponentes reciben royalties automáticos.", VisualComponent: MatrixVisuals.ContentTokenVisual, stakeholder: "organizador" },
  
  // TRUST (Emerald) - Compliance
  { id: 11, title: "Pharma Traceability", cluster: "trust", description: "Laboratorios verifican certificaciones de cadena de frío de distribuidores en tiempo real.", VisualComponent: MatrixVisuals.PharmaTraceVisual, stakeholder: "visitante" },
  { id: 12, title: "Escudo Ciberamenazas", cluster: "trust", description: "Empresas comparten firmas de malware. Si atacan a uno, todos quedan protegidos.", VisualComponent: MatrixVisuals.CyberShieldVisual, stakeholder: "organizador" },
  { id: 13, title: "CV Verificado", cluster: "trust", description: "Títulos y experiencia laboral en Blockchain. Adiós a los CVs falsos.", VisualComponent: MatrixVisuals.VerifiedTalentVisual, stakeholder: "visitante" },
  { id: 14, title: "Green Badge", cluster: "trust", description: "Huella de Carbono auditada. Filtro 'Solo proveedores Carbono Neutro' para visitantes.", VisualComponent: MatrixVisuals.GreenBadgeVisual, stakeholder: "expositor" },
  { id: 15, title: "Buró de Fraude", cluster: "trust", description: "Lista negra colaborativa con hashes de estafadores. Cumple GDPR sin compartir datos personales.", VisualComponent: MatrixVisuals.FraudBureauVisual, stakeholder: "organizador" },
  
  // OPERATIONS (Amber) - Smart Operations
  { id: 16, title: "Green Last Mile", cluster: "operations", description: "Operadores logísticos comparten capacidad ociosa. Camiones entran llenos en las ciudades.", VisualComponent: MatrixVisuals.GreenLastMileVisual, stakeholder: "expositor" },
  { id: 17, title: "ERP Universal", cluster: "operations", description: "Catálogo del expositor volcado directamente al ERP del comprador (SAP/Oracle). Cero picado manual.", VisualComponent: MatrixVisuals.ERPUniversalVisual, stakeholder: "visitante" },
  { id: 18, title: "Stock Ferial", cluster: "operations", description: "Trazabilidad de activos físicos en IFEMA. Control aduanero automático para internacionales.", VisualComponent: MatrixVisuals.StockFerialVisual, stakeholder: "organizador" },
  { id: 19, title: "Due Diligence VC", cluster: "operations", description: "Inversores acceden a métricas reales (Stripe, Analytics) validadas por el nodo. Decisiones en horas.", VisualComponent: MatrixVisuals.VCDueDiligenceVisual, stakeholder: "visitante" },
  { id: 20, title: "Gestión Kit Ayudas", cluster: "operations", description: "CloserStill automatiza solicitudes de subvenciones para expositores con datos del sistema.", VisualComponent: MatrixVisuals.KitAyudasVisual, stakeholder: "organizador" },
];

const clusterConfig: Record<Cluster, { label: string; color: string; bgColor: string; borderColor: string }> = {
  commercial: { label: "Aceleración Comercial", color: "text-rose-400", bgColor: "bg-rose-500/20", borderColor: "border-rose-500/50" },
  monetization: { label: "Monetización de Datos", color: "text-blue-400", bgColor: "bg-blue-500/20", borderColor: "border-blue-500/50" },
  trust: { label: "Confianza & Compliance", color: "text-emerald-400", bgColor: "bg-emerald-500/20", borderColor: "border-emerald-500/50" },
  operations: { label: "Eficiencia Operativa", color: "text-amber-400", bgColor: "bg-amber-500/20", borderColor: "border-amber-500/50" },
};

const stakeholderLabels: Record<Stakeholder, string> = {
  expositor: "Expositor",
  visitante: "Visitante",
  organizador: "Organizador",
};

const StrategicMatrix20 = () => {
  const [activeCluster, setActiveCluster] = useState<Cluster | "all">("all");
  const [activeStakeholder, setActiveStakeholder] = useState<Stakeholder | "all">("all");

  const filteredCases = useCases.filter(uc => {
    const clusterMatch = activeCluster === "all" || uc.cluster === activeCluster;
    const stakeholderMatch = activeStakeholder === "all" || uc.stakeholder === activeStakeholder;
    return clusterMatch && stakeholderMatch;
  });

  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-violet-500/20 text-violet-300 border-violet-500/30">
            Strategic Analysis
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            20 Casos de Uso para <span className="text-blue-400">CloserStill Media</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Mapa completo de oportunidades cruzando el ecosistema CloserStill con las capacidades del Motor ProcureData.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCluster === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCluster("all")}
              className="border-slate-600 text-slate-300"
            >
              Todos
            </Button>
            {(Object.keys(clusterConfig) as Cluster[]).map((cluster) => (
              <Button
                key={cluster}
                variant={activeCluster === cluster ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCluster(cluster)}
                className={`border-slate-600 ${activeCluster === cluster ? clusterConfig[cluster].bgColor : ''}`}
              >
                <span className={activeCluster !== cluster ? clusterConfig[cluster].color : ''}>
                  {clusterConfig[cluster].label}
                </span>
              </Button>
            ))}
          </div>
          <div className="w-px bg-slate-700 mx-2 hidden md:block" />
          <div className="flex gap-2">
            <Button
              variant={activeStakeholder === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveStakeholder("all")}
              className="border-slate-600 text-slate-300"
            >
              Todos
            </Button>
            {(Object.keys(stakeholderLabels) as Stakeholder[]).map((sh) => (
              <Button
                key={sh}
                variant={activeStakeholder === sh ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveStakeholder(sh)}
                className="border-slate-600 text-slate-300"
              >
                {stakeholderLabels[sh]}
              </Button>
            ))}
          </div>
        </div>

        {/* Matrix Grid with Idiographic Visuals */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredCases.map((uc) => {
              const config = clusterConfig[uc.cluster];
              const VisualComponent = uc.VisualComponent;
              
              return (
                <motion.div
                  key={uc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative rounded-xl border ${config.borderColor} bg-slate-900/80 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 overflow-hidden`}
                >
                  {/* Visual Animation Canvas */}
                  <div className="h-28 flex items-center justify-center bg-slate-950/50 border-b border-slate-800/50">
                    <VisualComponent />
                  </div>

                  {/* Title & ID */}
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-semibold text-white leading-tight">{uc.title}</h3>
                    <span className="text-xs text-slate-500">#{uc.id}</span>
                  </div>

                  {/* Hover Overlay with Description */}
                  <div className={`absolute inset-0 p-4 ${config.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center backdrop-blur-sm`}>
                    <h3 className="text-sm font-bold text-white mb-2">{uc.title}</h3>
                    <p className="text-xs text-white/90 leading-relaxed">{uc.description}</p>
                    <Badge variant="outline" className="mt-3 w-fit text-xs border-white/30 text-white/80">
                      {stakeholderLabels[uc.stakeholder]}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {(Object.entries(clusterConfig) as [Cluster, typeof clusterConfig[Cluster]][]).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${config.bgColor} border ${config.borderColor}`} />
              <span className={`text-sm ${config.color}`}>{config.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicMatrix20;
