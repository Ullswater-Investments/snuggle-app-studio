import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Battery, 
  Banknote, 
  Leaf, 
  Shield, 
  FileCheck,
  ArrowRight,
  Sparkles,
  Trophy,
  TrendingUp,
  CheckCircle2,
  UserPlus,
  BadgeCheck,
  Layers,
  Brain,
  Handshake,
  Rocket
} from "lucide-react";

// Original operational cases
const operationalCases = [
  {
    id: "eco-battery",
    icon: Battery,
    title: "ECO-BATTERY TRACK",
    sector: "Automoción",
    color: "hsl(var(--itbid-lime))",
    bgColor: "hsl(var(--itbid-lime) / 0.1)",
    challenge: "Cumplir con el Pasaporte Digital de Baterías de la UE sin que el proveedor revele su cadena de suministro.",
    solution: "Túnel de datos federado con Token de Cumplimiento validado criptográficamente.",
    metrics: [
      { label: "Cumplimiento UE", value: "100%" },
      { label: "Reducción auditoría", value: "-40%" },
      { label: "Fugas de datos", value: "0" }
    ]
  },
  {
    id: "sme-liquidity",
    icon: Banknote,
    title: "SME LIQUIDITY FLOW",
    sector: "Financiero / Construcción",
    color: "hsl(var(--itbid-cyan))",
    bgColor: "hsl(var(--itbid-cyan) / 0.1)",
    challenge: "Las PYMEs sufren tensiones de tesorería. Los bancos tardan semanas en aprobar factoring.",
    solution: "Smart Factoring: el banco consulta la Reputación de Cumplimiento en ITBID y libera financiación automática.",
    metrics: [
      { label: "Tasa de interés", value: "-2.5%" },
      { label: "Quiebras evitadas", value: "-15%" },
      { label: "Tiempo aprobación", value: "<24h" }
    ]
  },
  {
    id: "carbon-truth",
    icon: Leaf,
    title: "CARBON TRUTH",
    sector: "Energía / Químico",
    color: "hsl(var(--itbid-lime))",
    bgColor: "hsl(var(--itbid-lime) / 0.1)",
    challenge: "El reporte de emisiones Alcance 3 se basa en estimaciones imprecisas y PDFs obsoletos.",
    solution: "Conectores IoT seguros leen el consumo energético real del lote fabricado bajo políticas estrictas.",
    metrics: [
      { label: "Precisión huella CO₂", value: "+35%" },
      { label: "Green Premium", value: "✓" },
      { label: "Datos en tiempo real", value: "✓" }
    ]
  },
  {
    id: "resilience-shield",
    icon: Shield,
    title: "RESILIENCE SHIELD",
    sector: "Logística / Retail",
    color: "hsl(var(--itbid-magenta))",
    bgColor: "hsl(var(--itbid-magenta) / 0.1)",
    challenge: "Las disrupciones logísticas afectan a múltiples empresas que se enteran tarde y por separado.",
    solution: "Inteligencia de Enjambre: alertas federadas anónimas generan avisos tempranos para toda la red.",
    metrics: [
      { label: "Ventaja competitiva", value: "72h" },
      { label: "Ahorro en fletes", value: "Millones €" },
      { label: "Reacción proactiva", value: "✓" }
    ]
  },
  {
    id: "certify-once",
    icon: FileCheck,
    title: "CERTIFY ONCE",
    sector: "Administración Pública",
    color: "hsl(var(--itbid-purple))",
    bgColor: "hsl(var(--itbid-purple) / 0.1)",
    challenge: "Un proveedor debe subir los mismos documentos a 20 portales diferentes cada mes.",
    solution: "Wallet de Identidad Digital Soberana: los documentos se verifican automáticamente sin subidas repetidas.",
    metrics: [
      { label: "Carga admin.", value: "-90%" },
      { label: "Time-to-Contract", value: "Días" },
      { label: "Validación manual", value: "0" }
    ]
  }
];

// New joint value proposition cases: ITBID + ProcureData
const jointValueCases = [
  {
    id: "onboarding-universal",
    icon: UserPlus,
    title: "ONBOARDING INSTANTÁNEO",
    sector: "Portal de Proveedores",
    color: "hsl(var(--itbid-cyan))",
    bgColor: "hsl(var(--itbid-cyan) / 0.1)",
    complementsModule: "Portal de Proveedores",
    challenge: "Cada proveedor rellena formularios en 20+ portales diferentes. Datos duplicados y desactualizados.",
    solution: "Wallet Corporativa Gaia-X: el proveedor conecta su identidad y ITBID verifica automáticamente existencia, solvencia y certificados.",
    metrics: [
      { label: "Soporte onboarding", value: "-90%" },
      { label: "Ecosistema EU", value: "✓" },
      { label: "Formularios", value: "0" }
    ]
  },
  {
    id: "esg-realtime",
    icon: BadgeCheck,
    title: "AUDITORÍA ESG REAL-TIME",
    sector: "Compliance ESG / CS3D",
    color: "hsl(var(--itbid-lime))",
    bgColor: "hsl(var(--itbid-lime) / 0.1)",
    complementsModule: "Módulo ESG y CS3D",
    challenge: "El módulo ESG depende de PDFs subidos por proveedores. Riesgo de Greenwashing y documentos falsos.",
    solution: "Credenciales Verificables: ITBID consulta directamente al nodo de la certificadora (AENOR, SGS). Validación criptográfica.",
    metrics: [
      { label: "Verificación", value: "Real-time" },
      { label: "Greenwashing", value: "0%" },
      { label: "CS3D Seguro", value: "✓" }
    ]
  },
  {
    id: "tier-n-visibility",
    icon: Layers,
    title: "VISIBILIDAD TIER-N",
    sector: "Cadena de Suministro",
    color: "hsl(var(--itbid-magenta))",
    bgColor: "hsl(var(--itbid-magenta) / 0.1)",
    complementsModule: "Gestión de Riesgos",
    challenge: "ITBID gestiona Tier 1, pero los problemas graves ocurren en Tier 2/3. El Tier 1 no revela su cadena.",
    solution: "Consultas Federadas Ciegas: las preguntas viajan a Tier N y vuelven con respuestas verificadas sin revelar identidades.",
    metrics: [
      { label: "Visibilidad", value: "Tier 2-3-N" },
      { label: "Secreto comercial", value: "Protegido" },
      { label: "Grandes cuentas", value: "✓" }
    ]
  },
  {
    id: "avi-a-industrial",
    icon: Brain,
    title: "AVI-A INDUSTRIAL",
    sector: "Inteligencia Artificial",
    color: "hsl(var(--itbid-purple))",
    bgColor: "hsl(var(--itbid-purple) / 0.1)",
    complementsModule: "AVI-A (Asistente IA)",
    challenge: "AVI-A solo aprende de datos propios. Clientes grandes (Bancos, Gobierno) no comparten contratos.",
    solution: "Federated Learning (Compute-to-Data): el algoritmo viaja al servidor del cliente, aprende y vuelve sin leer contratos.",
    metrics: [
      { label: "Datos leídos", value: "0" },
      { label: "Aprendizaje colectivo", value: "✓" },
      { label: "Sectores críticos", value: "Banca+Gov" }
    ]
  }
];

export const SuccessCasesSection = () => {
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--itbid-navy)/0.02)] to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(var(--itbid-cyan)/0.05)] rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(var(--itbid-magenta)/0.05)] rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[hsl(var(--itbid-lime)/0.1)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
            <Trophy className="h-3 w-3 mr-1" />
            Casos de Éxito
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light itbid-gradient-gray mb-4">
            Más allá de la plataforma:
            <br />
            El valor de la Inteligencia Federada
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            La plataforma ITBID optimiza tu gestión interna. <span className="itbid-gradient font-semibold">itbid-x</span> conecta 
            tu empresa con la inteligencia de la industria europea. Descubre cómo la federación de datos 
            desbloquea valor que ninguna empresa puede generar por sí sola.
          </p>
        </motion.div>

        {/* Operational Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {operationalCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCase(caseItem.id)}
              onMouseLeave={() => setHoveredCase(null)}
            >
              <Card 
                className="h-full border-2 transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
                style={{ 
                  borderColor: hoveredCase === caseItem.id ? caseItem.color : 'hsl(var(--border))',
                  background: hoveredCase === caseItem.id ? caseItem.bgColor : undefined
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle at 50% 0%, ${caseItem.color}15 0%, transparent 70%)`
                  }}
                />

                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: caseItem.bgColor }}
                    >
                      <caseItem.icon className="h-6 w-6" style={{ color: caseItem.color }} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {caseItem.sector}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg itbid-font" style={{ color: caseItem.color }}>
                    {caseItem.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 relative">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">El Desafío:</p>
                    <p className="text-sm">{caseItem.challenge}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: caseItem.color }}>
                      La Solución ITBID-X:
                    </p>
                    <p className="text-sm text-muted-foreground">{caseItem.solution}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                    {caseItem.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div 
                          className="text-lg font-bold"
                          style={{ color: caseItem.color }}
                        >
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-muted-foreground uppercase">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Separator - Joint Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative">
            <Separator className="my-8" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background px-6 py-2 rounded-full border-2 border-dashed border-[hsl(var(--itbid-cyan)/0.5)]">
                <div className="flex items-center gap-2">
                  <Handshake className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                  <span className="text-sm font-semibold itbid-gradient">ITBID + ProcureData</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Badge className="mb-4 bg-gradient-to-r from-[hsl(var(--itbid-cyan)/0.1)] to-[hsl(var(--itbid-magenta)/0.1)] text-[hsl(var(--itbid-cyan))] border-[hsl(var(--itbid-cyan)/0.3)]">
              <Rocket className="h-3 w-3 mr-1" />
              Propuesta de Valor Conjunta
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold itbid-font mb-3">
              Cómo convertir ITBID en el Primer 
              <span className="itbid-gradient"> Hub de Compras Federado</span> de Europa
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              El objetivo no es cambiar la plataforma ITBID, sino <span className="font-semibold">conectarla al mundo</span>. 
              ProcureData aporta la infraestructura de Espacio de Datos (Connectors, Wallets, Identidad SSI) 
              e ITBID aporta el negocio (Clientes, Proveedores, Lógica de Compras).
            </p>
          </div>
        </motion.div>

        {/* Joint Value Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {jointValueCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCase(caseItem.id)}
              onMouseLeave={() => setHoveredCase(null)}
            >
              <Card 
                className="h-full border-2 transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
                style={{ 
                  borderColor: hoveredCase === caseItem.id ? caseItem.color : 'hsl(var(--border))',
                  background: hoveredCase === caseItem.id ? caseItem.bgColor : undefined
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle at 50% 0%, ${caseItem.color}15 0%, transparent 70%)`
                  }}
                />

                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: caseItem.bgColor }}
                    >
                      <caseItem.icon className="h-6 w-6" style={{ color: caseItem.color }} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="text-xs">
                        {caseItem.sector}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] bg-[hsl(var(--itbid-navy)/0.1)]">
                        Complementa: {caseItem.complementsModule}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg itbid-font" style={{ color: caseItem.color }}>
                    {caseItem.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 relative">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">El Desafío:</p>
                    <p className="text-sm">{caseItem.challenge}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: caseItem.color }}>
                      La Mejora con ProcureData (Gaia-X):
                    </p>
                    <p className="text-sm text-muted-foreground">{caseItem.solution}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                    {caseItem.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div 
                          className="text-lg font-bold"
                          style={{ color: caseItem.color }}
                        >
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-muted-foreground uppercase">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="border-2 border-[hsl(var(--itbid-cyan)/0.3)] bg-gradient-to-br from-[hsl(var(--itbid-cyan)/0.05)] via-background to-[hsl(var(--itbid-magenta)/0.05)] overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Left content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                    <span className="text-sm font-medium text-[hsl(var(--itbid-lime))]">
                      Simulador Interactivo
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold itbid-font mb-4">
                    Calculadora de Valor de Ecosistema
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    ¿Cuánto le cuesta a su empresa <span className="font-semibold text-[hsl(var(--itbid-magenta))]">NO estar federada</span>? 
                    Descubra el ROI potencial de unirse al espacio de datos Gaia-X con nuestro simulador gamificado.
                  </p>
                  
                  {/* Quick stats preview */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--itbid-cyan))]" />
                      <span>Ahorro operativo</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--itbid-lime))]" />
                      <span>Mitigación de riesgo</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--itbid-magenta))]" />
                      <span>Eficiencia ESG</span>
                    </div>
                  </div>
                </div>

                {/* Right CTA */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--itbid-cyan))] to-[hsl(var(--itbid-magenta))] rounded-2xl blur-xl opacity-30 animate-pulse" />
                    <div className="relative bg-gradient-to-br from-[hsl(var(--itbid-navy)/0.8)] to-[hsl(var(--itbid-navy))] p-8 rounded-2xl border border-[hsl(var(--itbid-cyan)/0.3)]">
                      <TrendingUp className="h-12 w-12 text-[hsl(var(--itbid-cyan))] mx-auto mb-4" />
                      <div className="text-center">
                        <p className="text-3xl font-bold text-white mb-1">+825K€</p>
                        <p className="text-xs text-white/60 uppercase">Valor anual medio desbloqueado</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    asChild
                    className="bg-gradient-to-r from-[hsl(var(--itbid-cyan))] to-[hsl(var(--itbid-magenta))] hover:opacity-90 text-white shadow-lg shadow-[hsl(var(--itbid-magenta)/0.3)] group"
                  >
                    <Link to="/partners/itbid/casos-exito">
                      Explorar casos y simulador
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Incluye simulador de ROI personalizado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
