import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { Cpu, Server, Wallet, Shield, Plug, Code2, Database, Lock } from "lucide-react";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const architectureDiagram = `
graph TB
    subgraph ITBID["Infraestructura ITBID"]
        FRONTEND["Frontend Web"]
        BACKEND["Backend API"]
        DB["Base de Datos"]
    end
    
    subgraph CONNECTOR["Kit Espacio de Datos"]
        EDC["Eclipse Dataspace<br/>Connector (EDC)"]
        WALLET["Wallet Digital<br/>(Identity)"]
        POLICY["Motor de<br/>Políticas ODRL"]
    end
    
    subgraph PROCURE["PROCUREDATA Core"]
        REGISTRY["Registry de<br/>Participantes"]
        CATALOG["Catálogo<br/>Federado"]
        TRUST["Trust<br/>Framework"]
    end
    
    FRONTEND --> BACKEND
    BACKEND --> DB
    BACKEND <--> EDC
    EDC <--> WALLET
    EDC <--> POLICY
    EDC <--> REGISTRY
    EDC <--> CATALOG
    WALLET <--> TRUST
    
    style ITBID fill:#0891b2,stroke:#06b6d4,color:#fff
    style CONNECTOR fill:#d946ef,stroke:#e879f9,color:#fff
    style PROCURE fill:#84cc16,stroke:#a3e635,color:#000
`;

const technicalComponents = [
  {
    icon: Plug,
    name: "Conector EDC",
    description: "Eclipse Dataspace Components - El componente software que habilita la interoperabilidad con otros espacios de datos Gaia-X.",
    specs: ["Java/Kotlin runtime", "REST API + JSON-LD", "Extensible via plugins"],
    effort: "Facilitado por Kit Espacio de Datos",
  },
  {
    icon: Wallet,
    name: "Wallet Digital",
    description: "Cartera de identidad digital para firmar transacciones y gestionar credenciales verificables.",
    specs: ["eIDAS compatible", "DID:web support", "Verifiable Credentials"],
    effort: "Integración estándar",
  },
  {
    icon: Shield,
    name: "Motor de Políticas",
    description: "Interpreta y ejecuta políticas ODRL 2.0 para controlar el acceso a los datos.",
    specs: ["ODRL 2.0", "Evaluación en tiempo real", "Logging inmutable"],
    effort: "Incluido en EDC",
  },
  {
    icon: Database,
    name: "Catálogo Federado",
    description: "Registro distribuido de los activos de datos disponibles en el espacio ITBID-X.",
    specs: ["DCAT-AP compliant", "Search federado", "Metadata enriquecida"],
    effort: "Sincronización automática",
  },
];

const securityRequirements = [
  { requirement: "TLS 1.3", description: "Cifrado en tránsito obligatorio" },
  { requirement: "AES-256", description: "Cifrado en reposo de datos sensibles" },
  { requirement: "OAuth 2.0 / OIDC", description: "Autenticación de usuarios y sistemas" },
  { requirement: "JWT firmados", description: "Tokens de acceso con firma digital" },
  { requirement: "Audit logs", description: "Registro inmutable de todas las operaciones" },
  { requirement: "Rate limiting", description: "Protección contra abuso de API" },
];

const integrationAPIs = [
  { name: "Management API", description: "Gestión del conector EDC", method: "REST" },
  { name: "Catalog API", description: "Publicación y consulta de assets", method: "DCAT-AP" },
  { name: "Contract API", description: "Negociación de contratos de datos", method: "IDS Protocol" },
  { name: "Transfer API", description: "Ejecución de transferencias de datos", method: "HTTP/S3" },
];

export const DocRequisitosTecnicos = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-magenta)/0.1)] text-[hsl(var(--itbid-magenta))] border-[hsl(var(--itbid-magenta)/0.3)]">
              <Cpu className="h-3 w-3 mr-1" />
              Sección 8
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Requisitos Técnicos
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              PROCUREDATA facilita el <strong>Kit Espacio de Datos</strong> que incluye los componentes técnicos 
              necesarios para que ITBID se conecte a la red federada con mínimo esfuerzo de desarrollo.
            </p>
          </div>
        </FadeIn>

        {/* Architecture Diagram */}
        <FadeIn delay={0.1}>
          <Card className="mb-12 border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Server className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                Arquitectura de Integración
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center overflow-x-auto">
                <MermaidDiagram chart={architectureDiagram} scale={1.12} />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                El Kit Espacio de Datos se despliega junto a la infraestructura existente de ITBID
              </p>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Technical Components */}
        <FadeIn delay={0.15}>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {technicalComponents.map((component) => (
              <Card key={component.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--itbid-cyan)/0.1)] flex items-center justify-center">
                      <component.icon className="h-6 w-6 text-[hsl(var(--itbid-cyan))]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1 bg-[hsl(var(--itbid-lime)/0.1)] text-[hsl(var(--itbid-lime))]">
                        {component.effort}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{component.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {component.specs.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* Security & APIs Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Security Requirements */}
          <FadeIn delay={0.2}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[hsl(var(--itbid-magenta))]" />
                  Requisitos de Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityRequirements.map((req) => (
                    <div key={req.requirement} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <code className="text-sm font-mono text-[hsl(var(--itbid-cyan))]">{req.requirement}</code>
                      <span className="text-sm text-muted-foreground">{req.description}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Integration APIs */}
          <FadeIn delay={0.25}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                  APIs de Integración
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {integrationAPIs.map((api) => (
                    <div key={api.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{api.name}</p>
                        <p className="text-sm text-muted-foreground">{api.description}</p>
                      </div>
                      <Badge variant="outline">{api.method}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};
