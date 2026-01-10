import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { Shield, Globe, FileText, Building2 } from "lucide-react";
import itbidLogo from "@/assets/itbid-logo.png";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

const federationDiagram = `
graph LR
    subgraph EU["Estrategia Digital UE"]
        direction TB
        SEDIA["SEDIA"]
        GAIAX["Gaia-X"]
    end
    
    subgraph PROCUREDATA["PROCUREDATA - Ecosistema Madre"]
        direction TB
        CORE["Trust Framework"]
        ODRL["Politicas ODRL"]
        EDC["Conectores EDC"]
    end
    
    subgraph ITBIDX["itbid-x - Espacio Asociado"]
        direction TB
        GOV["Gobernanza Propia"]
        RULES["Reglas de Negocio"]
        CLIENTS["Clientes itbid"]
    end
    
    subgraph PROVIDERS["Proveedores Federados"]
        direction TB
        P1["Proveedor A"]
        P2["Proveedor B"]
        P3["Proveedor C"]
    end
    
    EU --> PROCUREDATA
    PROCUREDATA --> ITBIDX
    ITBIDX <--> PROVIDERS
    
    style EU fill:#1e40af,stroke:#3b82f6,color:#fff
    style PROCUREDATA fill:#059669,stroke:#10b981,color:#fff
    style ITBIDX fill:#0891b2,stroke:#06b6d4,color:#fff
    style PROVIDERS fill:#7c3aed,stroke:#8b5cf6,color:#fff
`;

const contextCards = [
  {
    icon: Globe,
    title: "Mercado Único Digital",
    description: "Infraestructura alineada con la estrategia europea de espacios de datos federados",
  },
  {
    icon: Shield,
    title: "Soberanía del Dato",
    description: "Los datos fluyen de forma segura sin ser secuestrados por monopolios centralizados",
  },
  {
    icon: Building2,
    title: "SEDIA & Gaia-X",
    description: "Alineados con la Secretaría de Estado de Digitalización e Inteligencia Artificial",
  },
  {
    icon: FileText,
    title: "Estándares Abiertos",
    description: "Interoperabilidad garantizada mediante protocolos IDS y Eclipse Dataspace",
  },
];

export const DocTecnicoHero = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[hsl(var(--itbid-cyan)/0.1)] via-background to-[hsl(var(--itbid-magenta)/0.1)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--itbid-cyan)) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, hsl(var(--itbid-magenta)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            {/* Dual Branding */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <ProcuredataLogo size="lg" />
              <span className="text-3xl text-muted-foreground">×</span>
              <img src={itbidLogo} alt="itbid" className="h-10 md:h-12 object-contain" />
            </div>

            <Badge className="mb-6 bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] border-[hsl(var(--itbid-cyan)/0.3)]">
              <FileText className="h-3 w-3 mr-1" />
              Documento Técnico v1.0
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Creando el Estándar de{" "}
              <span className="bg-gradient-to-r from-[hsl(var(--itbid-cyan))] via-[hsl(var(--itbid-magenta))] to-[hsl(var(--itbid-lime))] bg-clip-text text-transparent">
                Compras Federadas
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              ITBID como <strong>Espacio de Datos Asociado</strong> dentro del ecosistema PROCUREDATA: 
              gobernanza propia, soberanía garantizada, interoperabilidad europea.
            </p>

            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Documento de respuesta técnica y estratégica para la Dirección de ITBID
            </p>
          </div>
        </FadeIn>

        {/* Context Cards */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contextCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border rounded-xl p-5 text-center hover:border-[hsl(var(--itbid-cyan)/0.5)] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--itbid-cyan)/0.1)] flex items-center justify-center mx-auto mb-3">
                  <card.icon className="h-6 w-6 text-[hsl(var(--itbid-cyan))]" />
                </div>
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

      </div>

      {/* Federation Diagram - Full Width */}
      <FadeIn delay={0.3}>
        <div className="w-full px-4 md:px-8 lg:px-12 relative z-10">
          <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-semibold text-center mb-6">
              Arquitectura de Federación de Ecosistemas
            </h3>
            <div className="flex justify-center w-full overflow-x-auto">
              <MermaidDiagram chart={federationDiagram} scale={1.1} className="w-full" />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              itbid-x opera como un nodo autónomo dentro de la red federada PROCUREDATA
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};
