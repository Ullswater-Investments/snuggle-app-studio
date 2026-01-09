import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/AnimatedSection";
import { 
  Rocket, 
  Settings, 
  TrendingUp, 
  Target, 
  Users, 
  Wallet, 
  CheckCircle2,
  Zap,
  Brain,
  Link2,
  Banknote,
  ArrowRight,
  Euro,
  Database,
  Shield,
  Globe,
  BadgeCheck,
  Sparkles,
  Network
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import kitLogo from "@/assets/kit-espacios-datos-logo.png";

const phases = [
  {
    phase: 1,
    title: "La Campaña de Adhesión",
    period: "Meses 1-2",
    icon: Rocket,
    color: "itbid-cyan",
    objective: "Captar fondos ('Funding') y asegurar la masa crítica inicial.",
    description: "No desarrollamos nada complejo todavía; nos centramos en asegurar las subvenciones.",
    actions: [
      {
        title: "Acción Comercial",
        content: "ITBID y PROCUREDATA lanzan una campaña conjunta a la base instalada de clientes de ITBID."
      },
      {
        title: "La Oferta Irresistible",
        content: "\"Te regalamos la conexión al futuro. Solicita tu bono de 15.000€ (o 30.000€) y nosotros gestionamos todo para conectarte al Espacio de Datos Europeo.\""
      }
    ],
    segmentation: [
      { group: "Grupo A (Core)", count: "10-15 Clientes Corporativos", bonus: "15.000€", type: "Conexión Estándar" },
      { group: "Grupo B (Innovadores)", count: "2-3 Clientes estratégicos", bonus: "30.000€", type: "Casos de Uso Avanzados" }
    ],
    result: "Si captamos 20 empresas x 15k = 300.000 € de Presupuesto Inicial para financiar la integración técnica."
  },
  {
    phase: 2,
    title: "Despliegue de Infraestructura",
    period: "Mes 2",
    icon: Settings,
    color: "itbid-magenta",
    objective: "Construir los cimientos con el dinero captado.",
    description: "Utilizamos los fondos de la Fase 1 para pagar a PROCUREDATA la implementación del 'Core' en ITBID.",
    integrations: [
      { name: "Conectores EDC", desc: "Eclipse Dataspace Components en la nube de ITBID" },
      { name: "Nodo ITBID-X", desc: "Creación del punto de conexión al espacio de datos" },
      { name: "Wallets Digitales", desc: "Implementación de identidad digital para clientes subvencionados" }
    ],
    quickWin: {
      title: "Caso de Uso 1 - 'Quick Win'",
      content: "Validación Documental Automática: Configuramos el sistema para que ITBID pueda validar certificados (Hacienda/SS o ISO) automáticamente contra el nodo de PROCUREDATA.",
      value: "Los clientes ya están conectados y validados. Cumplen el requisito de la subvención."
    }
  },
  {
    phase: 3,
    title: "Capas de Valor y Expansión",
    period: "Meses 7-12",
    icon: TrendingUp,
    color: "itbid-lime",
    objective: "Re-inversión de excedentes y escalado de servicios.",
    description: "Con la infraestructura pagada y operativa, utilizamos el remanente del presupuesto para desarrollar servicios premium.",
    services: [
      {
        icon: Brain,
        name: "Servicio A: Inteligencia Artificial Federada (AVI-A 2.0)",
        desc: "Entrenamiento de modelos distribuidos usando los datos de los 20 clientes iniciales (sin mover sus datos)."
      },
      {
        icon: Link2,
        name: "Servicio B: Visibilidad Tier-N",
        desc: "Habilitar las consultas en cadena para clientes del sector industrial."
      },
      {
        icon: Banknote,
        name: "Servicio C: Módulo Financiero",
        desc: "Conectar con un banco partner para ofrecer factoring a los proveedores de estos clientes."
      }
    ],
    expansion: "Abrir ITBID-X a proveedores externos y otros ecosistemas (Catena-X)."
  }
];

const simulatorData = [
  { 
    scenario: "Conservador", 
    companies: 10, 
    funds: "150.000 €", 
    cost: "80.000 €", 
    budget: "+ 70.000 €",
    highlight: false
  },
  { 
    scenario: "Realista", 
    companies: 25, 
    funds: "375.000 €", 
    cost: "120.000 € (Economía de escala)", 
    budget: "+ 255.000 €",
    highlight: true
  },
  { 
    scenario: "Éxito", 
    companies: 50, 
    funds: "750.000 €", 
    cost: "200.000 €", 
    budget: "+ 550.000 €",
    highlight: false
  }
];

export const DocHojaDeRuta = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] border-[hsl(var(--itbid-cyan)/0.3)]">
              <Target className="h-3 w-3 mr-1" />
              Sección 9 - Estrategia de Despliegue
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hoja de Ruta: Despliegue Financiado de ITBID-X
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Estrategia de <strong>Co-Inversión</strong> basada en Volumen de Adhesión
            </p>
          </div>
        </FadeIn>

        {/* Kit Espacio de Datos Hero */}
        <FadeIn delay={0.1}>
          <Card className="mb-8 bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.1)] via-[hsl(var(--itbid-magenta)/0.05)] to-[hsl(var(--itbid-lime)/0.1)] border-[hsl(var(--itbid-cyan)/0.3)] overflow-hidden">
            <CardContent className="py-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="shrink-0">
                  <img 
                    src={kitLogo} 
                    alt="Kit Espacio de Datos" 
                    className="h-24 w-auto object-contain"
                  />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <Badge className="mb-4 bg-[hsl(var(--itbid-lime)/0.2)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
                    <Euro className="h-3 w-3 mr-1" />
                    SUBVENCIÓN KIT ESPACIO DE DATOS
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Subvención de hasta <span className="text-[hsl(var(--itbid-lime))]">30.000€</span> para adherirse a Espacios de Datos Federados
                  </h3>
                  <p className="text-muted-foreground">
                    Fondos europeos a través de <strong>Red.es</strong> para impulsar la soberanía digital y la economía del dato en España
                  </p>
                </div>
              </div>

              {/* 4 Pillars */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { icon: Database, label: "Datos Fiables", color: "itbid-cyan" },
                  { icon: Brain, label: "IA de Calidad", color: "itbid-magenta" },
                  { icon: Shield, label: "Confianza", color: "itbid-lime" },
                  { icon: Zap, label: "Velocidad", color: "itbid-cyan" }
                ].map((pillar) => (
                  <div 
                    key={pillar.label}
                    className={`flex flex-col items-center p-4 rounded-xl bg-[hsl(var(--${pillar.color})/0.1)] border border-[hsl(var(--${pillar.color})/0.3)]`}
                  >
                    <pillar.icon className={`h-8 w-8 text-[hsl(var(--${pillar.color}))] mb-2`} />
                    <span className="font-semibold text-sm text-center">{pillar.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Pricing Options */}
        <FadeIn delay={0.15}>
          <div className="mb-12">
            <div className="text-center mb-6">
              <Badge variant="outline" className="bg-[hsl(var(--itbid-lime)/0.1)] border-[hsl(var(--itbid-lime)/0.3)] text-[hsl(var(--itbid-lime))]">
                <Globe className="h-3 w-3 mr-1" />
                Fondos Públicos Red.es — 100% a fondo perdido
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Option A - 15.000€ */}
              <Card className="border-[hsl(var(--itbid-cyan)/0.3)] relative">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-[hsl(var(--itbid-cyan)/0.2)] text-[hsl(var(--itbid-cyan))] border-[hsl(var(--itbid-cyan)/0.3)]">
                      Opción A
                    </Badge>
                    <span className="text-3xl font-bold text-[hsl(var(--itbid-cyan))]">15.000€</span>
                  </div>
                  <CardTitle className="text-xl">Adhesión Espacio de datos PROCUREDATA</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {[
                      { icon: Network, text: "Conector IDS/Gaia-X certificado" },
                      { icon: Shield, text: "Wallet de Identidad Soberana" },
                      { icon: Users, text: "Asociación y Formación especializada" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[hsl(var(--itbid-cyan)/0.1)] flex items-center justify-center shrink-0">
                          <item.icon className="h-4 w-4 text-[hsl(var(--itbid-cyan))]" />
                        </div>
                        <span className="text-sm">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground">Coste inicial cliente</p>
                    <p className="text-2xl font-bold">2.000€</p>
                    <p className="text-xs text-muted-foreground">(recuperables con la subvención)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Option B - 30.000€ */}
              <Card className="border-2 border-[hsl(var(--itbid-lime)/0.5)] relative bg-gradient-to-b from-[hsl(var(--itbid-lime)/0.05)] to-transparent">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[hsl(var(--itbid-lime))] text-white">
                    <Sparkles className="h-3 w-3 mr-1" />
                    RECOMENDADO
                  </Badge>
                </div>
                <CardHeader className="pt-8">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-[hsl(var(--itbid-lime)/0.2)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
                      Opción B
                    </Badge>
                    <span className="text-3xl font-bold text-[hsl(var(--itbid-lime))]">30.000€</span>
                  </div>
                  <CardTitle className="text-xl">Adhesión + Caso de uso</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {[
                      { icon: CheckCircle2, text: "Todo incluido de la Opción A", highlight: true },
                      { icon: BadgeCheck, text: "Consultoría personalizada de Caso de Uso" },
                      { icon: Settings, text: "Desarrollo a Medida (API/IoT)" },
                      { icon: TrendingUp, text: "Visibilidad como Pionero del ecosistema" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${item.highlight ? 'bg-[hsl(var(--itbid-cyan)/0.1)]' : 'bg-[hsl(var(--itbid-lime)/0.1)]'} flex items-center justify-center shrink-0`}>
                          <item.icon className={`h-4 w-4 ${item.highlight ? 'text-[hsl(var(--itbid-cyan))]' : 'text-[hsl(var(--itbid-lime))]'}`} />
                        </div>
                        <span className={`text-sm ${item.highlight ? 'text-muted-foreground' : ''}`}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)] border border-[hsl(var(--itbid-lime)/0.3)] text-center">
                    <p className="text-sm text-muted-foreground">Coste inicial cliente</p>
                    <p className="text-2xl font-bold text-[hsl(var(--itbid-lime))]">5.000€</p>
                    <p className="text-xs text-muted-foreground">(recuperables con la subvención)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </FadeIn>

        {/* 3 Phases Timeline */}
        <div className="space-y-8 mb-12">
          {phases.map((phase, idx) => (
            <FadeIn key={phase.phase} delay={0.15 + idx * 0.1}>
              <Card className={`border-l-4 border-l-[hsl(var(--${phase.color}))]`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-[hsl(var(--${phase.color})/0.1)] flex items-center justify-center shrink-0`}>
                      <phase.icon className={`h-7 w-7 text-[hsl(var(--${phase.color}))]`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`bg-[hsl(var(--${phase.color})/0.2)] text-[hsl(var(--${phase.color}))] border-[hsl(var(--${phase.color})/0.3)]`}>
                          Fase {phase.phase}
                        </Badge>
                        <Badge variant="outline">{phase.period}</Badge>
                      </div>
                      <CardTitle className="text-xl md:text-2xl">{phase.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Objetivo:</strong> {phase.objective}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{phase.description}</p>

                  {/* Phase 1 specific content */}
                  {phase.actions && (
                    <div className="space-y-4 mb-4">
                      {phase.actions.map((action, i) => (
                        <div key={i} className="p-4 rounded-lg bg-muted/50">
                          <p className="font-semibold text-[hsl(var(--itbid-cyan))]">{action.title}</p>
                          <p className="text-muted-foreground">{action.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {phase.segmentation && (
                    <div className="mb-4">
                      <p className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Segmentación:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {phase.segmentation.map((seg) => (
                          <div key={seg.group} className="p-3 rounded-lg border bg-card">
                            <p className="font-medium">{seg.group}</p>
                            <p className="text-sm text-muted-foreground">{seg.count}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-[hsl(var(--itbid-lime)/0.2)] text-[hsl(var(--itbid-lime))]">
                                {seg.bonus}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{seg.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.result && (
                    <div className="p-4 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)] border border-[hsl(var(--itbid-lime)/0.3)]">
                      <p className="font-semibold flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-[hsl(var(--itbid-lime))]" />
                        Resultado Financiero Esperado:
                      </p>
                      <p className="text-muted-foreground">{phase.result}</p>
                    </div>
                  )}

                  {/* Phase 2 specific content */}
                  {phase.integrations && (
                    <div className="mb-4">
                      <p className="font-semibold mb-3">Integración Tecnológica (El "Enchufe"):</p>
                      <div className="grid md:grid-cols-3 gap-3">
                        {phase.integrations.map((int) => (
                          <div key={int.name} className="p-3 rounded-lg border bg-card text-center">
                            <p className="font-medium text-[hsl(var(--itbid-magenta))]">{int.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{int.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.quickWin && (
                    <div className="p-4 rounded-lg bg-[hsl(var(--itbid-magenta)/0.1)] border border-[hsl(var(--itbid-magenta)/0.3)]">
                      <p className="font-semibold text-[hsl(var(--itbid-magenta))]">{phase.quickWin.title}</p>
                      <p className="text-muted-foreground text-sm mt-1">{phase.quickWin.content}</p>
                      <p className="text-sm mt-2">
                        <strong>Valor para el Cliente:</strong> {phase.quickWin.value}
                      </p>
                    </div>
                  )}

                  {/* Phase 3 specific content */}
                  {phase.services && (
                    <div className="mb-4">
                      <p className="font-semibold mb-3">Servicios Premium:</p>
                      <div className="space-y-3">
                        {phase.services.map((service) => (
                          <div key={service.name} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)] flex items-center justify-center shrink-0">
                              <service.icon className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                            </div>
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-sm text-muted-foreground">{service.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.expansion && (
                    <div className="p-4 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)] border border-[hsl(var(--itbid-lime)/0.3)]">
                      <p className="font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-[hsl(var(--itbid-lime))]" />
                        Escalado:
                      </p>
                      <p className="text-muted-foreground">{phase.expansion}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Financial Simulator */}
        <FadeIn delay={0.5}>
          <Card className="border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                Simulador de Impacto Financiero
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Análisis de escenarios para la toma de decisiones
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Escenario</TableHead>
                      <TableHead className="text-center">Empresas Adheridas</TableHead>
                      <TableHead className="text-right">Fondos Movilizados</TableHead>
                      <TableHead className="text-right">Coste Infraestructura</TableHead>
                      <TableHead className="text-right">Presupuesto I+D+i</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {simulatorData.map((row) => (
                      <TableRow 
                        key={row.scenario} 
                        className={row.highlight ? "bg-[hsl(var(--itbid-cyan)/0.05)]" : ""}
                      >
                        <TableCell className="font-medium">
                          {row.highlight && (
                            <Badge className="mr-2 bg-[hsl(var(--itbid-cyan))]">Recomendado</Badge>
                          )}
                          {row.scenario}
                        </TableCell>
                        <TableCell className="text-center font-mono">{row.companies}</TableCell>
                        <TableCell className="text-right font-mono text-[hsl(var(--itbid-lime))]">{row.funds}</TableCell>
                        <TableCell className="text-right font-mono text-muted-foreground">{row.cost}</TableCell>
                        <TableCell className="text-right font-mono font-bold text-[hsl(var(--itbid-cyan))]">{row.budget}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Key Message */}
        <FadeIn delay={0.6}>
          <Card className="mt-8 bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.15)] via-[hsl(var(--itbid-magenta)/0.1)] to-[hsl(var(--itbid-lime)/0.15)] border-2 border-[hsl(var(--itbid-cyan)/0.3)]">
            <CardContent className="py-8">
              <div className="text-center max-w-3xl mx-auto">
                <Zap className="h-12 w-12 text-[hsl(var(--itbid-cyan))] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">La Decisión Obvia ("No-Brainer")</h3>
                <p className="text-lg text-muted-foreground">
                  Con solo <strong className="text-[hsl(var(--itbid-lime))]">25 clientes</strong> (una fracción pequeña de la cartera de ITBID), 
                  generamos <strong className="text-[hsl(var(--itbid-cyan))]">un cuarto de millón de euros</strong> de "Free Cash Flow" 
                  para desarrollar tecnología punta, <strong>sin que ITBID toque su caja</strong> y <strong>sin coste para el cliente</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};
