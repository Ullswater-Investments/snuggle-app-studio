import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { Users, Package, ShoppingCart, Award, Building, Landmark } from "lucide-react";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const networkDiagram = `
graph TB
    subgraph ITBIDX["ITBID-X Espacio de Datos"]
        GW["Gateway ITBID-X"]
    end
    
    subgraph PROVIDERS["Proveedores"]
        P1["🏭 Fabricante A"]
        P2["🔧 Proveedor B"]
        P3["📦 Distribuidor C"]
    end
    
    subgraph CONSUMERS["Clientes Compradores"]
        C1["🏢 Empresa 1"]
        C2["🏢 Empresa 2"]
        C3["🏢 Empresa 3"]
    end
    
    subgraph TRUSTED["Terceros de Confianza"]
        T1["🏆 SGS / AENOR"]
        T2["🏦 Bancos"]
        T3["📊 Rating Agencies"]
        T4["🏛️ Admin. Pública"]
    end
    
    PROVIDERS <--> GW
    GW <--> CONSUMERS
    TRUSTED --> GW
    
    style ITBIDX fill:#0891b2,stroke:#06b6d4,color:#fff
    style PROVIDERS fill:#d946ef,stroke:#e879f9,color:#fff
    style CONSUMERS fill:#84cc16,stroke:#a3e635,color:#000
    style TRUSTED fill:#f59e0b,stroke:#fbbf24,color:#000
`;

const participants = [
  {
    icon: Package,
    role: "Proveedores",
    description: "Empresas que aportan datos sobre sus productos, stock, capacidad, certificaciones y métricas ESG.",
    dataTypes: ["Datos de producto", "Stock y capacidad", "Certificaciones ISO", "Huella de carbono"],
    color: "hsl(var(--itbid-magenta))",
  },
  {
    icon: ShoppingCart,
    role: "Clientes (Compradores)",
    description: "Empresas que buscan proveedores verificados. Aportan datos de reputación, historial de pagos y pedidos.",
    dataTypes: ["Historial de compras", "Reputación como pagador", "Valoraciones", "Pedidos recurrentes"],
    color: "hsl(var(--itbid-cyan))",
  },
  {
    icon: Award,
    role: "Certificadoras",
    description: "Entidades como SGS, AENOR, Bureau Veritas que validan certificaciones y estándares de calidad.",
    dataTypes: ["Certificados ISO", "Auditorías", "Sellos de calidad", "Validaciones ESG"],
    color: "hsl(var(--itbid-lime))",
  },
  {
    icon: Building,
    role: "Entidades Financieras",
    description: "Bancos y agencias de rating que aportan scoring crediticio e información de riesgo financiero.",
    dataTypes: ["Scoring crediticio", "Límites de crédito", "Historial financiero", "Rating de solvencia"],
    color: "hsl(218, 80%, 60%)",
  },
  {
    icon: Landmark,
    role: "Administración Pública",
    description: "Organismos que validan datos fiscales, registros mercantiles y certificados oficiales.",
    dataTypes: ["Datos fiscales (CIF)", "Registro mercantil", "Estar al corriente", "Licencias oficiales"],
    color: "hsl(280, 70%, 50%)",
  },
];

export const DocParticipantes = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-magenta)/0.1)] text-[hsl(var(--itbid-magenta))] border-[hsl(var(--itbid-magenta)/0.3)]">
              <Users className="h-3 w-3 mr-1" />
              Sección 5
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Participantes del Ecosistema
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              El ecosistema ITBID-X es <strong>multipolar</strong>: múltiples actores aportan diferentes tipos de datos, 
              creando una red de confianza distribuida donde nadie tiene el monopolio de la información.
            </p>
          </div>
        </FadeIn>

        {/* Network Diagram */}
        <FadeIn delay={0.1}>
          <Card className="mb-12 border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardHeader>
              <CardTitle className="text-center">
                Red Multipolar de Participantes ITBID-X
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <MermaidDiagram chart={networkDiagram} scale={1.12} />
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Participant Cards */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {participants.map((participant) => (
              <Card 
                key={participant.role} 
                className="hover:shadow-lg transition-shadow border-t-4"
                style={{ borderTopColor: participant.color }}
              >
                <CardHeader>
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${participant.color}20` }}
                  >
                    <participant.icon 
                      className="h-7 w-7" 
                      style={{ color: participant.color }} 
                    />
                  </div>
                  <CardTitle className="text-xl">{participant.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{participant.description}</p>
                  <div>
                    <p className="text-sm font-medium mb-2">Datos que aportan:</p>
                    <div className="flex flex-wrap gap-2">
                      {participant.dataTypes.map((dataType) => (
                        <Badge 
                          key={dataType} 
                          variant="outline"
                          className="text-xs"
                          style={{ 
                            backgroundColor: `${participant.color}10`,
                            borderColor: `${participant.color}30`
                          }}
                        >
                          {dataType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* Key Message */}
        <FadeIn delay={0.3}>
          <Card className="mt-12 bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.1)] to-[hsl(var(--itbid-magenta)/0.1)]">
            <CardContent className="py-8 text-center">
              <Users className="h-10 w-10 mx-auto mb-4 text-[hsl(var(--itbid-cyan))]" />
              <h3 className="text-xl font-bold mb-2">Valor para ITBID</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cada participante adicional en la red aumenta exponencialmente el valor del ecosistema ITBID-X. 
                Un proveedor conectado una vez puede servir a todos los clientes de ITBID. 
                Una certificadora conectada valida automáticamente miles de proveedores.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
