import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { 
  Swords, Building, Network, Lock, RefreshCw, 
  Globe, FileCheck, Zap, CheckCircle2, XCircle, AlertTriangle 
} from "lucide-react";

const comparisonData = [
  {
    feature: "Modelo de Datos",
    traditional: "Silos centralizados - Recopilar, guardar, revender",
    federated: "Red federada - Conectar datos sin almacenarlos",
    icon: Building,
  },
  {
    feature: "Control del Dato",
    traditional: "En manos de la plataforma",
    federated: "Siempre en manos del propietario",
    icon: Lock,
  },
  {
    feature: "Trazabilidad",
    traditional: "Informes manuales bajo demanda",
    federated: "Blockchain inmutable en tiempo real",
    icon: FileCheck,
  },
  {
    feature: "Revocación de Acceso",
    traditional: "Proceso de semanas, no garantizado",
    federated: "Instantánea, garantizada por smart contract",
    icon: RefreshCw,
  },
  {
    feature: "Interoperabilidad",
    traditional: "APIs propietarias, lock-in",
    federated: "Estándares Gaia-X / IDS abiertos",
    icon: Globe,
  },
  {
    feature: "Verificación",
    traditional: "Periódica (anual/semestral)",
    federated: "Continua y en tiempo real",
    icon: Zap,
  },
  {
    feature: "Cumplimiento Normativo",
    traditional: "Manual, propenso a gaps",
    federated: "Automático via políticas ODRL",
    icon: FileCheck,
  },
];

const strategicAdvantages = [
  {
    title: "Preferencia del Proveedor",
    description: "Un proveedor prefiere ITBID-X porque mantiene su soberanía. No entrega sus datos, los comparte bajo sus condiciones.",
    icon: CheckCircle2,
  },
  {
    title: "Coopetencia Posible",
    description: "Achilles o Informa podrían acabar siendo proveedores de datos dentro del espacio ITBID-X, conectándose como nodos más.",
    icon: Network,
  },
  {
    title: "De Herramienta a Infraestructura",
    description: "ITBID pasa de ser una herramienta de compras a ser LA INFRAESTRUCTURA del mercado de proveedores verificados.",
    icon: Building,
  },
];

export const DocDiferenciacion = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-lime)/0.1)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
              <Swords className="h-3 w-3 mr-1" />
              Sección 10
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Diferenciación Competitiva
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              La pregunta clave: <strong>¿Cómo compite ITBID-X con Achilles, Informa u otros?</strong>
              La respuesta es que no competimos de la misma manera. Cambiamos las reglas del juego.
            </p>
          </div>
        </FadeIn>

        {/* Comparison Table */}
        <FadeIn delay={0.1}>
          <Card className="mb-12 overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-2">
                <Swords className="h-5 w-5 text-[hsl(var(--itbid-magenta))]" />
                Comparativa: Modelo Web 2.0 vs. Web 3.0 (Gaia-X)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-4 font-semibold w-1/4">Característica</th>
                      <th className="text-left p-4 font-semibold w-[37.5%]">
                        <div className="flex items-center gap-2 text-destructive">
                          <XCircle className="h-4 w-4" />
                          Achilles / Informa (Tradicional)
                        </div>
                      </th>
                      <th className="text-left p-4 font-semibold w-[37.5%]">
                        <div className="flex items-center gap-2 text-[hsl(var(--itbid-lime))]">
                          <CheckCircle2 className="h-4 w-4" />
                          ITBID-X (Federado)
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? "bg-muted/10" : ""}>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <row.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{row.feature}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{row.traditional}</td>
                        <td className="p-4 text-muted-foreground">{row.federated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Key Difference Highlight */}
        <FadeIn delay={0.15}>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  Modelo Tradicional (Web 2.0)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium mb-4">"Son un MURO"</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-1" />
                    Recopilan datos de proveedores en su base de datos central
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-1" />
                    Los guardan y crean dependencia (vendor lock-in)
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-1" />
                    Los revenden a múltiples compradores sin control del proveedor
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-1" />
                    El proveedor pierde soberanía sobre su información
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[hsl(var(--itbid-lime)/0.3)] bg-[hsl(var(--itbid-lime)/0.05)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[hsl(var(--itbid-lime))]">
                  <CheckCircle2 className="h-5 w-5" />
                  Modelo ITBID-X (Web 3.0 / Gaia-X)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium mb-4">"Somos una RED"</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[hsl(var(--itbid-lime))] shrink-0 mt-1" />
                    Conectamos datos que permanecen en origen
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[hsl(var(--itbid-lime))] shrink-0 mt-1" />
                    No hay lock-in: estándares abiertos y portabilidad
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[hsl(var(--itbid-lime))] shrink-0 mt-1" />
                    El proveedor controla quién ve qué y bajo qué condiciones
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[hsl(var(--itbid-lime))] shrink-0 mt-1" />
                    Soberanía garantizada por smart contracts inmutables
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </FadeIn>

        {/* Strategic Advantages */}
        <FadeIn delay={0.2}>
          <Card className="bg-gradient-to-br from-[hsl(var(--itbid-cyan)/0.05)] via-background to-[hsl(var(--itbid-magenta)/0.05)]">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Ventajas Estratégicas para ITBID</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {strategicAdvantages.map((advantage) => (
                  <div key={advantage.title} className="text-center p-6 rounded-xl bg-card border">
                    <advantage.icon className="h-10 w-10 mx-auto mb-4 text-[hsl(var(--itbid-cyan))]" />
                    <h4 className="font-semibold text-lg mb-2">{advantage.title}</h4>
                    <p className="text-sm text-muted-foreground">{advantage.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

      </div>
    </section>
  );
};
