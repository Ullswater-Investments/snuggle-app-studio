import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { Scale, FileCheck, PenTool, Shield, ScrollText, AlertTriangle, CheckCircle2 } from "lucide-react";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const legalFlowDiagram = `
sequenceDiagram
    participant P as Proveedor
    participant W as Wallet Digital
    participant SC as Smart Contract
    participant I as ITBID-X
    participant C as Cliente
    
    P->>W: 1. Firma digital del consentimiento
    W->>SC: 2. Registro en blockchain
    Note over SC: Inmutable y auditable
    SC->>I: 3. Política ODRL activa
    I->>C: 4. Acceso según política
    Note over P,C: Trazabilidad legal completa
`;

const legalFramework = [
  {
    icon: Shield,
    title: "Marco Gaia-X Trust Framework",
    description: "Conjunto de reglas técnicas y legales que garantizan la interoperabilidad y confianza entre participantes del espacio de datos europeo.",
    details: [
      "Self-Description obligatoria para cada participante",
      "Verificación de identidad mediante credenciales verificables",
      "Cumplimiento de estándares de seguridad y privacidad",
    ],
  },
  {
    icon: FileCheck,
    title: "Cumplimiento GDPR",
    description: "El modelo federado facilita el cumplimiento del Reglamento General de Protección de Datos al mantener los datos en origen.",
    details: [
      "Derecho al olvido implementable instantáneamente",
      "Minimización de datos: solo se accede a lo necesario",
      "Consentimiento granular y revocable",
    ],
  },
  {
    icon: PenTool,
    title: "Firma Electrónica eIDAS",
    description: "Todas las autorizaciones se realizan mediante firma electrónica cualificada conforme al Reglamento eIDAS europeo.",
    details: [
      "Validez legal equivalente a firma manuscrita",
      "Identificación inequívoca del firmante",
      "Sello de tiempo certificado",
    ],
  },
];

const responsibilityMatrix = [
  {
    actor: "Proveedor (Subject)",
    responsibilities: [
      "Veracidad del contenido del dato",
      "Definición de políticas de acceso",
      "Firma de autorizaciones",
    ],
    color: "hsl(var(--itbid-magenta))",
  },
  {
    actor: "ITBID (Orquestador)",
    responsibilities: [
      "Verificación de identidades (KYB)",
      "Ejecución de políticas ODRL",
      "Trazabilidad de intercambios",
    ],
    color: "hsl(var(--itbid-cyan))",
  },
  {
    actor: "Cliente (Consumer)",
    responsibilities: [
      "Uso conforme a la política autorizada",
      "No redistribución sin permiso",
      "Cumplimiento de duties (ej. pago)",
    ],
    color: "hsl(var(--itbid-lime))",
  },
];

export const DocResponsabilidadLegal = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-lime)/0.1)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
              <Scale className="h-3 w-3 mr-1" />
              Sección 6
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Responsabilidad Legal y Permisos
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              La transferencia de datos se rige por <strong>contratos digitales</strong> asociados a cada dato. 
              El proveedor firma digitalmente (vía Wallet) qué se puede hacer con su información.
            </p>
          </div>
        </FadeIn>

        {/* Legal Flow Diagram */}
        <FadeIn delay={0.1}>
          <Card className="mb-12 border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <ScrollText className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                Flujo de Consentimiento y Trazabilidad Legal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <MermaidDiagram chart={legalFlowDiagram} scale={1.12} className="w-full min-w-full [&_svg]:w-full [&_svg]:max-w-full [&_svg]:min-h-[400px]" />
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Legal Framework Cards */}
        <FadeIn delay={0.15}>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {legalFramework.map((framework) => (
              <Card key={framework.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--itbid-cyan)/0.1)] flex items-center justify-center mb-4">
                    <framework.icon className="h-6 w-6 text-[hsl(var(--itbid-cyan))]" />
                  </div>
                  <CardTitle className="text-lg">{framework.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{framework.description}</p>
                  <ul className="space-y-2">
                    {framework.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[hsl(var(--itbid-lime))] shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* Responsibility Matrix */}
        <FadeIn delay={0.2}>
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[hsl(var(--itbid-magenta))]" />
                Matriz de Responsabilidades por Actor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {responsibilityMatrix.map((actor) => (
                  <div 
                    key={actor.actor}
                    className="p-5 rounded-xl border-2"
                    style={{ borderColor: `${actor.color}50`, backgroundColor: `${actor.color}05` }}
                  >
                    <h4 
                      className="font-semibold text-lg mb-4"
                      style={{ color: actor.color }}
                    >
                      {actor.actor}
                    </h4>
                    <ul className="space-y-3">
                      {actor.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div 
                            className="w-2 h-2 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: actor.color }}
                          />
                          <span className="text-muted-foreground">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Key Legal Message */}
        <FadeIn delay={0.3}>
          <Card className="bg-gradient-to-r from-[hsl(var(--itbid-lime)/0.1)] to-[hsl(var(--itbid-cyan)/0.1)] border-[hsl(var(--itbid-lime)/0.3)]">
            <CardContent className="py-8">
              <div className="flex items-start gap-4 max-w-3xl mx-auto">
                <Scale className="h-10 w-10 text-[hsl(var(--itbid-lime))] shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Clarificación Legal para ITBID</h3>
                  <p className="text-muted-foreground">
                    ITBID actúa como el <strong>orquestador del intercambio</strong>, pero la responsabilidad 
                    legal del contenido del dato recae en el emisor (Source), garantizado por su firma electrónica 
                    cualificada. Cada intercambio queda registrado con validez probatoria completa.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
