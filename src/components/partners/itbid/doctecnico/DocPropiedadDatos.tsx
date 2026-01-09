import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { Lock, KeyRound, Eye, RefreshCcw, Shield, Database } from "lucide-react";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const triangleDiagram = `
graph TB
    subgraph TRIANGLE["Triángulo de Confianza"]
        CONSUMER["🏢 Consumer<br/>(Comprador - ITBID Client)"]
        SUBJECT["📦 Subject<br/>(Proveedor - Propietario del Dato)"]
        HOLDER["🔐 Data Holder<br/>(Custodio Técnico)"]
    end
    
    CONSUMER -->|"1. Solicita Acceso"| SUBJECT
    SUBJECT -->|"2. Autoriza"| HOLDER
    HOLDER -->|"3. Entrega Controlada"| CONSUMER
    
    style CONSUMER fill:#0891b2,stroke:#06b6d4,color:#fff
    style SUBJECT fill:#d946ef,stroke:#e879f9,color:#fff
    style HOLDER fill:#84cc16,stroke:#a3e635,color:#000
`;

const sovereigntyPrinciples = [
  {
    icon: Database,
    title: "Soberanía Absoluta",
    description: "El dato NUNCA sale de casa del propietario para ser almacenado en un servidor central de ITBID o PROCUREDATA.",
    highlight: "El dato permanece en origen",
  },
  {
    icon: Eye,
    title: "Acceso vs. Posesión",
    description: "El propietario otorga 'permiso de acceso' (visitar el dato), NO 'entrega el dato'. Es una diferencia fundamental.",
    highlight: "Visitar ≠ Poseer",
  },
  {
    icon: KeyRound,
    title: "Control Criptográfico",
    description: "El proveedor mantiene las llaves criptográficas. Nadie más puede acceder sin su autorización explícita firmada.",
    highlight: "Las llaves en manos del dueño",
  },
  {
    icon: RefreshCcw,
    title: "Revocación Instantánea",
    description: "Si el proveedor decide revocar el acceso, ITBID deja de ver el dato instantáneamente. Nadie 'se queda' con la información.",
    highlight: "Control total en todo momento",
  },
];

export const DocPropiedadDatos = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-magenta)/0.1)] text-[hsl(var(--itbid-magenta))] border-[hsl(var(--itbid-magenta)/0.3)]">
              <Lock className="h-3 w-3 mr-1" />
              Sección 2
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Propiedad y Control de los Datos
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              En un espacio federado, la soberanía del dato es el principio fundamental. 
              El propietario mantiene el control absoluto en todo momento.
            </p>
          </div>
        </FadeIn>

        {/* Triangle of Trust Diagram */}
        <FadeIn delay={0.1}>
          <Card className="mb-12 border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                <Shield className="inline-block h-5 w-5 mr-2 text-[hsl(var(--itbid-cyan))]" />
                El Triángulo de Confianza
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Modelo tripartito donde cada actor tiene un rol definido y ninguno concentra todo el poder
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6 w-full overflow-x-auto min-h-[400px]">
                <MermaidDiagram chart={triangleDiagram} scale={1.28} className="w-full min-w-[600px]" />
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-[hsl(var(--itbid-cyan)/0.1)]">
                  <p className="font-semibold text-[hsl(var(--itbid-cyan))]">Consumer</p>
                  <p className="text-sm text-muted-foreground">Cliente de ITBID que necesita datos de proveedores</p>
                </div>
                <div className="p-4 rounded-lg bg-[hsl(var(--itbid-magenta)/0.1)]">
                  <p className="font-semibold text-[hsl(var(--itbid-magenta))]">Subject</p>
                  <p className="text-sm text-muted-foreground">Proveedor propietario legal del dato</p>
                </div>
                <div className="p-4 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)]">
                  <p className="font-semibold text-[hsl(var(--itbid-lime))]">Holder</p>
                  <p className="text-sm text-muted-foreground">Custodio técnico (puede ser el propio Subject)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Sovereignty Principles */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 gap-6">
            {sovereigntyPrinciples.map((principle, index) => (
              <Card key={principle.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--itbid-cyan)/0.1)] flex items-center justify-center shrink-0">
                      <principle.icon className="h-6 w-6 text-[hsl(var(--itbid-cyan))]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{principle.title}</h3>
                      <p className="text-muted-foreground mb-3">{principle.description}</p>
                      <Badge variant="outline" className="bg-[hsl(var(--itbid-lime)/0.1)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
                        {principle.highlight}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>

        {/* Key Message */}
        <FadeIn delay={0.3}>
          <Card className="mt-12 bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.1)] to-[hsl(var(--itbid-magenta)/0.1)] border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardContent className="py-8 text-center">
              <Lock className="h-12 w-12 mx-auto mb-4 text-[hsl(var(--itbid-cyan))]" />
              <h3 className="text-xl font-bold mb-2">Mensaje Clave para la Dirección</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                "ITBID no almacena datos de proveedores. ITBID <strong>orquesta el acceso</strong> a datos 
                que permanecen bajo el control exclusivo de sus propietarios."
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
