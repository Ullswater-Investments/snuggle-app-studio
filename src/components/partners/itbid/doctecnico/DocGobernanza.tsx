import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { Scale, FileCode, Cpu, Settings, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const governanceFlowDiagram = `
sequenceDiagram
    participant C as Consumer (Cliente ITBID)
    participant I as ITBID-X Gateway
    participant S as Subject (Proveedor)
    participant SC as Smart Contract
    
    C->>I: 1. Solicita datos del Proveedor X
    I->>SC: 2. Verifica política ODRL
    SC-->>I: 3. Política: Permitido con restricciones
    I->>S: 4. Solicita consentimiento
    S-->>I: 5. Firma digital autorización
    I->>C: 6. Entrega datos según política
    Note over SC: Todo queda registrado en blockchain
`;

const odrlExample = `{
  "@context": "http://www.w3.org/ns/odrl.jsonld",
  "@type": "Agreement",
  "uid": "policy:itbid-x:proveedor-abc:2024",
  "profile": "https://procuredata.es/odrl/profile",
  
  "permission": [{
    "target": "asset:certificado-iso-9001",
    "action": "read",
    "constraint": [{
      "leftOperand": "purpose",
      "operator": "eq", 
      "rightOperand": "homologacion"
    }, {
      "leftOperand": "dateTime",
      "operator": "lt",
      "rightOperand": "2025-12-31T23:59:59Z"
    }],
    "duty": [{
      "action": "compensate",
      "target": "party:proveedor-abc"
    }]
  }],
  
  "prohibition": [{
    "target": "asset:certificado-iso-9001",
    "action": "distribute"
  }]
}`;

const governanceLayers = [
  {
    level: "Trust Framework",
    owner: "PROCUREDATA",
    description: "Establece las reglas técnicas base: identidad, seguridad, protocolos de comunicación",
    color: "hsl(var(--itbid-cyan))",
  },
  {
    level: "Gobernanza ITBID-X",
    owner: "ITBID",
    description: "Define reglas de negocio propias: quién puede ver qué, qué coste tiene, condiciones de uso",
    color: "hsl(var(--itbid-magenta))",
  },
  {
    level: "Políticas por Dato",
    owner: "Proveedor",
    description: "Cada proveedor define restricciones específicas sobre sus propios datos",
    color: "hsl(var(--itbid-lime))",
  },
];

const odrlComponents = [
  { icon: CheckCircle2, name: "Permissions", description: "Acciones permitidas sobre el dato", color: "text-green-500" },
  { icon: XCircle, name: "Prohibitions", description: "Acciones explícitamente prohibidas", color: "text-red-500" },
  { icon: AlertTriangle, name: "Duties", description: "Obligaciones (ej. pago, atribución)", color: "text-yellow-500" },
  { icon: Settings, name: "Constraints", description: "Condiciones (tiempo, propósito, geografía)", color: "text-blue-500" },
];

export const DocGobernanza = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-lime)/0.1)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
              <Scale className="h-3 w-3 mr-1" />
              Sección 3
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Modelo de Gobernanza (ODRL 2.0)
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              La gobernanza no es un acuerdo de caballeros. Es <strong>código que permite o deniega 
              el acceso automáticamente</strong> según las reglas definidas mediante Smart Contracts y políticas ODRL.
            </p>
          </div>
        </FadeIn>

        {/* Governance Layers */}
        <FadeIn delay={0.1}>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {governanceLayers.map((layer, index) => (
              <Card 
                key={layer.level} 
                className="border-t-4 hover:shadow-lg transition-shadow"
                style={{ borderTopColor: layer.color }}
              >
                <CardHeader>
                  <Badge 
                    variant="outline" 
                    className="w-fit mb-2"
                    style={{ 
                      backgroundColor: `${layer.color}20`,
                      color: layer.color,
                      borderColor: `${layer.color}50`
                    }}
                  >
                    Nivel {index + 1}
                  </Badge>
                  <CardTitle className="text-lg">{layer.level}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Propietario:</strong> {layer.owner}
                  </p>
                  <p className="text-muted-foreground">{layer.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* ODRL Components */}
        <FadeIn delay={0.15}>
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                Componentes de una Política ODRL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {odrlComponents.map((component) => (
                  <div key={component.name} className="p-4 rounded-lg bg-muted/50 text-center">
                    <component.icon className={`h-8 w-8 mx-auto mb-2 ${component.color}`} />
                    <p className="font-semibold">{component.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{component.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Flow Diagram */}
        <FadeIn delay={0.2}>
          <Card className="mb-12 border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardHeader>
              <CardTitle className="text-center">
                <Cpu className="inline-block h-5 w-5 mr-2 text-[hsl(var(--itbid-magenta))]" />
                Flujo de Negociación Automática
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <MermaidDiagram chart={governanceFlowDiagram} scale={1.12} className="w-full min-w-full [&_svg]:w-full [&_svg]:max-w-full [&_svg]:min-h-[400px]" />
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* ODRL Example */}
        <FadeIn delay={0.3}>
          <Card className="bg-slate-950 text-slate-50 border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardHeader>
              <CardTitle className="text-slate-50 flex items-center gap-2">
                <FileCode className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                Ejemplo de Política ODRL en JSON-LD
              </CardTitle>
              <p className="text-slate-400 text-sm">
                Política real que define: lectura permitida para homologación, hasta fin de 2025, con compensación obligatoria, prohibida la redistribución.
              </p>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto text-sm leading-relaxed">
                <code className="text-green-400">{odrlExample}</code>
              </pre>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
