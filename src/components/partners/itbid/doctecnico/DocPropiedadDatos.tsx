import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { Lock, KeyRound, Eye, RefreshCcw, Database } from "lucide-react";

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

      </div>
    </section>
  );
};
