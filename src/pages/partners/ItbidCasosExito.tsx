import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Battery, 
  Banknote, 
  Leaf, 
  Shield, 
  FileCheck,
  Trophy,
  TrendingUp,
  Calculator,
  Zap,
  ShieldCheck,
  TreePine,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Users,
  Building2,
  Euro,
  Clock
} from "lucide-react";

// Success cases data
const successCases = [
  {
    id: "eco-battery",
    icon: Battery,
    title: "ECO-BATTERY TRACK",
    sector: "Automoción",
    color: "hsl(var(--itbid-lime))",
    bgColor: "hsl(var(--itbid-lime) / 0.1)",
    challenge: "Un fabricante de componentes debe cumplir con el Pasaporte Digital de Baterías de la UE. ITBID gestiona la compra al proveedor directo (Tier 1), pero el proveedor se niega a enviar el Excel con el origen del Litio (Tier 3) por secreto comercial.",
    solution: "Se establece un túnel de datos federado. El proveedor Tier 1 conecta su sistema a ITBID-X y permite una consulta de 'Verificación de Origen' sin revelar su cadena de suministro completa. ITBID-X recibe un 'Token de Cumplimiento' validado criptográficamente.",
    metrics: [
      { label: "Cumplimiento normativa UE", value: "100%", icon: CheckCircle2 },
      { label: "Fugas de información", value: "0", icon: ShieldCheck },
      { label: "Reducción costes auditoría", value: "-40%", icon: TrendingUp }
    ],
    quote: "Soberanía de datos garantizada: el proveedor mantiene el control total de su cadena de suministro."
  },
  {
    id: "sme-liquidity",
    icon: Banknote,
    title: "SME LIQUIDITY FLOW",
    sector: "Financiero / Construcción",
    color: "hsl(var(--itbid-cyan))",
    bgColor: "hsl(var(--itbid-cyan) / 0.1)",
    challenge: "Los proveedores PYME sufren tensiones de tesorería. Los bancos tradicionales tardan semanas en aprobar líneas de factoring porque no tienen datos fiables en tiempo real.",
    solution: "ITBID, como plataforma de compras, tiene el historial de pedidos y recepciones correctas. A través del espacio de datos, el proveedor autoriza a un Banco Federado a consultar su 'Reputación de Cumplimiento' en ITBID. El banco libera financiación automática ('Smart Factoring') al ver que la factura está aprobada en ITBID.",
    metrics: [
      { label: "Reducción tasa de interés", value: "-2.5%", icon: Euro },
      { label: "Reducción quiebras proveedores", value: "-15%", icon: Shield },
      { label: "Tiempo aprobación", value: "<24h", icon: Clock }
    ],
    quote: "De 3 semanas a menos de 24 horas: financiación automática basada en datos reales de cumplimiento."
  },
  {
    id: "carbon-truth",
    icon: Leaf,
    title: "CARBON TRUTH",
    sector: "Energía / Químico",
    color: "hsl(var(--itbid-lime))",
    bgColor: "hsl(var(--itbid-lime) / 0.1)",
    challenge: "El reporte de emisiones de Alcance 3 (cadena de suministro) se basa en estimaciones teóricas imprecisas. Los proveedores envían PDFs con datos obsoletos.",
    solution: "Conectores IoT seguros. ITBID-X se conecta directamente al 'Pod de Datos' de la planta del proveedor para leer el consumo energético real del lote fabricado, bajo una política de uso estricta (solo lectura, sin guardar histórico).",
    metrics: [
      { label: "Mejora precisión huella CO₂", value: "+35%", icon: TreePine },
      { label: "Green Premium justificable", value: "✓", icon: Sparkles },
      { label: "Datos tiempo real", value: "✓", icon: Zap }
    ],
    quote: "Dato real vs. estimación: trazabilidad certificada que justifica un precio premium."
  },
  {
    id: "resilience-shield",
    icon: Shield,
    title: "RESILIENCE SHIELD",
    sector: "Logística / Retail",
    color: "hsl(var(--itbid-magenta))",
    bgColor: "hsl(var(--itbid-magenta) / 0.1)",
    challenge: "Una interrupción en un puerto asiático afecta a múltiples empresas, pero cada una se entera tarde y por separado.",
    solution: "'Inteligencia de Enjambre'. Varios clientes de ITBID comparten de forma anónima y federada alertas de disrupción logística. Si 50 pedidos en la red ITBID sufren retraso en el puerto de Ningbo, el sistema genera una alerta temprana para todos los usuarios de ITBID-X, incluso antes de que sus propios proveedores les avisen.",
    metrics: [
      { label: "Ventaja tiempo de reacción", value: "72h", icon: Clock },
      { label: "Ahorro en fletes urgentes", value: "Millones €", icon: Euro },
      { label: "Evitar spot rates", value: "✓", icon: TrendingUp }
    ],
    quote: "72 horas de ventaja frente a la competencia para reservar transporte alternativo."
  },
  {
    id: "certify-once",
    icon: FileCheck,
    title: "CERTIFY ONCE",
    sector: "Administración Pública / Servicios",
    color: "hsl(var(--itbid-purple))",
    bgColor: "hsl(var(--itbid-purple) / 0.1)",
    challenge: "Un proveedor de servicios debe subir los mismos documentos (Seguridad Social, Hacienda, ISOs) a 20 portales de clientes diferentes cada mes.",
    solution: "Identidad Digital Soberana. El proveedor mantiene sus documentos en su 'Wallet'. Al licitar en ITBID, la plataforma 'pregunta' a la Wallet si los documentos están al día. La Wallet responde 'SÍ/NO' validado.",
    metrics: [
      { label: "Reducción carga administrativa", value: "-90%", icon: Clock },
      { label: "Time-to-Contract", value: "Días", icon: Zap },
      { label: "Validación manual eliminada", value: "0", icon: CheckCircle2 }
    ],
    quote: "La adjudicación se reduce de semanas a días al eliminar la validación manual de papeles."
  }
];

const ItbidCasosExito = () => {
  // Simulator state
  const [volumenCompras, setVolumenCompras] = useState(50); // Millones €
  const [numProveedores, setNumProveedores] = useState(500);
  const [personasEquipo, setPersonasEquipo] = useState(10);
  const [costeParada, setCosteParada] = useState(20000); // €/día

  // Calculations based on the business logic
  const results = useMemo(() => {
    const costeHora = 45; // €/hora coste medio empleado
    const horasPorProveedorAnio = 2; // horas de gestión documental
    const probabilidadRotura = 0.05; // 5%
    const reduccionImpacto = 0.30; // 30% por alerta temprana
    const auditoriaPorProveedores = 50; // 1 auditoría cada 50 proveedores
    const costeAuditoria = 5000; // € por auditoría
    const diasParadaEvitados = 2; // días promedio evitados

    // Ahorro en gestión documental
    const ahorroDocumental = numProveedores * horasPorProveedorAnio * costeHora;
    
    // Mitigación de riesgo (coste evitado)
    const costeRoturaPotencial = costeParada * diasParadaEvitados;
    const mitigacionRiesgo = costeRoturaPotencial * probabilidadRotura * numProveedores * reduccionImpacto / 100;
    
    // Eficiencia ESG (eliminación auditorías físicas)
    const numAuditorias = Math.floor(numProveedores / auditoriaPorProveedores);
    const ahorroAuditorias = numAuditorias * costeAuditoria;
    
    // Horas liberadas del equipo
    const horasLiberadas = numProveedores * horasPorProveedorAnio;

    // Total
    const totalAhorro = ahorroDocumental + mitigacionRiesgo + ahorroAuditorias;

    return {
      ahorroDocumental: Math.round(ahorroDocumental),
      mitigacionRiesgo: Math.round(mitigacionRiesgo),
      ahorroAuditorias: Math.round(ahorroAuditorias),
      horasLiberadas: Math.round(horasLiberadas),
      totalAhorro: Math.round(totalAhorro)
    };
  }, [volumenCompras, numProveedores, personasEquipo, costeParada]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0 
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Back Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/partners/itbid/proyecto" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a ITBID-X
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--itbid-cyan)/0.05)] via-background to-[hsl(var(--itbid-magenta)/0.05)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-[hsl(var(--itbid-lime)/0.1)] text-[hsl(var(--itbid-lime))] border-[hsl(var(--itbid-lime)/0.3)]">
              <Trophy className="h-3 w-3 mr-1" />
              Casos de Uso y Éxito
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold itbid-font mb-6">
              Más allá de la plataforma:
              <br />
              <span className="itbid-gradient">El valor de la Inteligencia Federada</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              La plataforma ITBID optimiza tu gestión interna. <span className="itbid-gradient font-semibold">itbid-x</span> conecta 
              tu empresa con la inteligencia de la industria europea. Descubre cómo la federación de datos 
              desbloquea valor que ninguna empresa puede generar por sí sola.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12 container mx-auto px-4">
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="cases" className="gap-2">
              <Trophy className="h-4 w-4" />
              Casos de Éxito
            </TabsTrigger>
            <TabsTrigger value="simulator" className="gap-2">
              <Calculator className="h-4 w-4" />
              Simulador ROI
            </TabsTrigger>
          </TabsList>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-8">
            {successCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-2 hover:border-[hsl(var(--itbid-cyan)/0.5)] transition-colors">
                  <div className="md:flex">
                    {/* Left sidebar */}
                    <div 
                      className="md:w-64 p-6 flex flex-col items-center justify-center text-center"
                      style={{ backgroundColor: caseItem.bgColor }}
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${caseItem.color}30` }}
                      >
                        <caseItem.icon className="h-8 w-8" style={{ color: caseItem.color }} />
                      </div>
                      <h3 className="text-xl font-bold itbid-font mb-2" style={{ color: caseItem.color }}>
                        {caseItem.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {caseItem.sector}
                      </Badge>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="space-y-6">
                        {/* Challenge */}
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            🎯 El Desafío
                          </h4>
                          <p className="text-foreground">{caseItem.challenge}</p>
                        </div>

                        {/* Solution */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: caseItem.color }}>
                            ✨ La Solución ITBID-X
                          </h4>
                          <p className="text-muted-foreground">{caseItem.solution}</p>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                          {caseItem.metrics.map((metric, idx) => (
                            <div key={idx} className="text-center p-3 rounded-lg bg-muted/50">
                              <metric.icon className="h-5 w-5 mx-auto mb-2" style={{ color: caseItem.color }} />
                              <div className="text-xl font-bold" style={{ color: caseItem.color }}>
                                {metric.value}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote 
                          className="border-l-4 pl-4 italic text-muted-foreground"
                          style={{ borderColor: caseItem.color }}
                        >
                          "{caseItem.quote}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Simulator Tab */}
          <TabsContent value="simulator">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Simulator Header */}
                <Card className="mb-8 border-2 border-[hsl(var(--itbid-cyan)/0.3)] bg-gradient-to-br from-[hsl(var(--itbid-cyan)/0.05)] to-[hsl(var(--itbid-magenta)/0.05)]">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                      <span className="text-sm font-medium text-[hsl(var(--itbid-lime))]">
                        Simulador Interactivo Gamificado
                      </span>
                    </div>
                    <CardTitle className="text-3xl itbid-font">
                      Calculadora de Valor de Ecosistema
                    </CardTitle>
                    <CardDescription className="text-lg">
                      ¿Cuánto le cuesta a su empresa <span className="font-semibold text-[hsl(var(--itbid-magenta))]">NO estar federada</span>?
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Inputs */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                        Variables de Entrada
                      </CardTitle>
                      <CardDescription>
                        Introduzca los datos de su organización
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Volumen de compras */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Euro className="h-4 w-4 text-[hsl(var(--itbid-cyan))]" />
                            <label className="font-medium">Volumen de Compras Anual</label>
                          </div>
                          <span className="text-lg font-bold text-[hsl(var(--itbid-cyan))]">
                            {volumenCompras}M€
                          </span>
                        </div>
                        <Slider
                          value={[volumenCompras]}
                          onValueChange={(v) => setVolumenCompras(v[0])}
                          min={1}
                          max={500}
                          step={1}
                          className="[&_[role=slider]]:bg-[hsl(var(--itbid-cyan))]"
                        />
                      </div>

                      {/* Número de proveedores */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-[hsl(var(--itbid-lime))]" />
                            <label className="font-medium">Número de Proveedores Activos</label>
                          </div>
                          <span className="text-lg font-bold text-[hsl(var(--itbid-lime))]">
                            {numProveedores}
                          </span>
                        </div>
                        <Slider
                          value={[numProveedores]}
                          onValueChange={(v) => setNumProveedores(v[0])}
                          min={10}
                          max={5000}
                          step={10}
                          className="[&_[role=slider]]:bg-[hsl(var(--itbid-lime))]"
                        />
                      </div>

                      {/* Personas en equipo */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-[hsl(var(--itbid-magenta))]" />
                            <label className="font-medium">Personas en Dpto. Compras/Calidad</label>
                          </div>
                          <span className="text-lg font-bold text-[hsl(var(--itbid-magenta))]">
                            {personasEquipo}
                          </span>
                        </div>
                        <Slider
                          value={[personasEquipo]}
                          onValueChange={(v) => setPersonasEquipo(v[0])}
                          min={1}
                          max={100}
                          step={1}
                          className="[&_[role=slider]]:bg-[hsl(var(--itbid-magenta))]"
                        />
                      </div>

                      {/* Coste parada */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-[hsl(var(--itbid-purple))]" />
                            <label className="font-medium">Coste Parada de Línea (€/día)</label>
                          </div>
                          <span className="text-lg font-bold text-[hsl(var(--itbid-purple))]">
                            {formatCurrency(costeParada)}
                          </span>
                        </div>
                        <Slider
                          value={[costeParada]}
                          onValueChange={(v) => setCosteParada(v[0])}
                          min={1000}
                          max={500000}
                          step={1000}
                          className="[&_[role=slider]]:bg-[hsl(var(--itbid-purple))]"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Results */}
                  <div className="space-y-6">
                    {/* Total */}
                    <Card className="border-2 border-[hsl(var(--itbid-lime)/0.5)] bg-gradient-to-br from-[hsl(var(--itbid-lime)/0.1)] to-background overflow-hidden">
                      <CardContent className="p-6 text-center relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--itbid-lime)/0.2)] rounded-full blur-3xl" />
                        <Trophy className="h-10 w-10 text-[hsl(var(--itbid-lime))] mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                          Valor Total Anual Desbloqueado
                        </p>
                        <motion.p 
                          key={results.totalAhorro}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-5xl font-bold text-[hsl(var(--itbid-lime))]"
                        >
                          {formatCurrency(results.totalAhorro)}
                        </motion.p>
                        <p className="text-sm text-muted-foreground mt-2">
                          /año
                        </p>
                      </CardContent>
                    </Card>

                    {/* Breakdown */}
                    <div className="grid gap-4">
                      <Card className="border-l-4 border-l-[hsl(var(--itbid-cyan))]">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[hsl(var(--itbid-cyan)/0.1)]">
                              <Euro className="h-5 w-5 text-[hsl(var(--itbid-cyan))]" />
                            </div>
                            <div>
                              <p className="font-medium">Ahorro Operativo Directo</p>
                              <p className="text-xs text-muted-foreground">
                                Eliminación de validación manual y gestión de emails
                              </p>
                            </div>
                          </div>
                          <span className="text-xl font-bold text-[hsl(var(--itbid-cyan))]">
                            {formatCurrency(results.ahorroDocumental)}
                          </span>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-[hsl(var(--itbid-magenta))]">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[hsl(var(--itbid-magenta)/0.1)]">
                              <Shield className="h-5 w-5 text-[hsl(var(--itbid-magenta))]" />
                            </div>
                            <div>
                              <p className="font-medium">Mitigación de Riesgo</p>
                              <p className="text-xs text-muted-foreground">
                                Prevención de paradas mediante alertas federadas
                              </p>
                            </div>
                          </div>
                          <span className="text-xl font-bold text-[hsl(var(--itbid-magenta))]">
                            {formatCurrency(results.mitigacionRiesgo)}
                          </span>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-[hsl(var(--itbid-lime))]">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[hsl(var(--itbid-lime)/0.1)]">
                              <TreePine className="h-5 w-5 text-[hsl(var(--itbid-lime))]" />
                            </div>
                            <div>
                              <p className="font-medium">Eficiencia ESG</p>
                              <p className="text-xs text-muted-foreground">
                                Eliminación de auditorías físicas
                              </p>
                            </div>
                          </div>
                          <span className="text-xl font-bold text-[hsl(var(--itbid-lime))]">
                            {formatCurrency(results.ahorroAuditorias)}
                          </span>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-[hsl(var(--itbid-purple))]">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[hsl(var(--itbid-purple)/0.1)]">
                              <Clock className="h-5 w-5 text-[hsl(var(--itbid-purple))]" />
                            </div>
                            <div>
                              <p className="font-medium">Horas Liberadas</p>
                              <p className="text-xs text-muted-foreground">
                                Tiempo del equipo para tareas de valor
                              </p>
                            </div>
                          </div>
                          <span className="text-xl font-bold text-[hsl(var(--itbid-purple))]">
                            {results.horasLiberadas}h
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Card className="mt-12 border-2 border-[hsl(var(--itbid-cyan)/0.3)] bg-gradient-to-r from-[hsl(var(--itbid-navy)/0.05)] to-[hsl(var(--itbid-navy)/0.1)]">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold itbid-font mb-4">
                      Estos resultados solo son posibles conectando su plataforma ITBID al ecosistema Gaia-X
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      ¿Hablamos? Solicite una demo personalizada con su caso de uso específico.
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-[hsl(var(--itbid-cyan))] to-[hsl(var(--itbid-magenta))] hover:opacity-90 text-white shadow-lg"
                    >
                      Solicitar Demo Personalizada
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <Badge variant="outline" className="text-sm py-2 px-4">
              Gaia-X Member
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">
              IDSA Certified
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">
              EU Data Act Compliant
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">
              ISO 27001
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItbidCasosExito;
