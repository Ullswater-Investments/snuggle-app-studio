import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Award, 
  Factory, 
  Wheat, 
  Truck, 
  Heart, 
  Stethoscope,
  ShoppingBag,
  Zap,
  ShieldCheck,
  ArrowRight,
  Search,
  TrendingUp,
  Plane,
  Wine,
  Thermometer,
  Ship,
  Building2,
  Mountain,
  Shirt,
  Receipt,
  Cpu
} from "lucide-react";
import { SuccessStoryNavigator } from "@/components/success-stories/SuccessStoryNavigator";
import { SuccessStoriesFilter } from "@/components/success-stories/SuccessStoriesFilter";
import { motion, AnimatePresence } from "framer-motion";

const successCases = [
  // Original 7 cases
  {
    id: "gigafactory-north",
    title: "Automatización de Homologación Industrial",
    company: "GigaFactory North",
    sector: "Industrial",
    sectorCategory: "industrial",
    sectorIcon: Factory,
    metric: "-85%",
    metricLabel: "Tiempo de Alta",
    description: "De 22 días a 48 horas en el proceso de homologación de proveedores Tier 2.",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    textColor: "text-orange-600 dark:text-orange-400",
    blockchainProof: "0x8f3c...b2e1"
  },
  {
    id: "olivetrust-coop",
    title: "Trazabilidad ESG para Exportación",
    company: "OliveTrust Coop",
    sector: "Agroalimentario",
    sectorCategory: "agroalimentario",
    sectorIcon: Wheat,
    metric: "+12%",
    metricLabel: "Valor Exportación",
    description: "Certificación de huella hídrica para acceder al mercado alemán con precio premium.",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0x3a1b...f9d4"
  },
  {
    id: "urbandeliver-bcn",
    title: "Reporting Scope 3 Instantáneo",
    company: "UrbanDeliver BCN",
    sector: "Movilidad Sostenible",
    sectorCategory: "movilidad",
    sectorIcon: Truck,
    metric: "1h",
    metricLabel: "Auditoría CSRD",
    description: "Generación de informe de emisiones Scope 3 para acceso a crédito verde bancario.",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
    textColor: "text-teal-600 dark:text-teal-400",
    blockchainProof: "0x5d41...7c59"
  },
  {
    id: "alianza-social-hub",
    title: "Medición de Impacto Social",
    company: "Alianza Social Hub",
    sector: "Economía Social",
    sectorCategory: "social",
    sectorIcon: Heart,
    metric: "1:3.8",
    metricLabel: "Ratio SROI",
    description: "Demostración verificada del retorno social de inversión en proveedores éticos.",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-600 dark:text-violet-400",
    blockchainProof: "0x7e2f...a3c8"
  },
  {
    id: "biomed-hospital",
    title: "Continuidad Asistencial Garantizada",
    company: "BioMed Hospital",
    sector: "Salud",
    sectorCategory: "salud",
    sectorIcon: Stethoscope,
    metric: "-30%",
    metricLabel: "Fallos Críticos",
    description: "Mantenimiento predictivo de equipos RM con telemetría anonimizada GDPR-compliant.",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    textColor: "text-rose-600 dark:text-rose-400",
    blockchainProof: "0x9b4d...c1e7"
  },
  {
    id: "globalretail-prime",
    title: "Auditoría Ética de Cadena de Suministro",
    company: "GlobalRetail Prime",
    sector: "Comercio",
    sectorCategory: "comercio",
    sectorIcon: ShoppingBag,
    metric: "0",
    metricLabel: "Incidencias Éticas",
    description: "Verificación de cumplimiento SA8000 en 200 proveedores textiles asiáticos.",
    color: "from-blue-500 to-sky-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    blockchainProof: "0x4a2c...d8f3"
  },
  {
    id: "ecovolt-manufacturing",
    title: "Compra de Energía Renovable Automatizada",
    company: "EcoVolt Manufacturing",
    sector: "Energía Industrial",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "100%",
    metricLabel: "Energía Renovable",
    description: "Liquidación instantánea de certificados GdO mediante Smart Contracts y EUROe.",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    blockchainProof: "0x6b3d...e9a1"
  },
  // NEW 10 cases
  {
    id: "sky-aero-systems",
    title: "Certificación Aeronáutica EN9100",
    company: "SkyAero Systems",
    sector: "Industrial Aeroespacial",
    sectorCategory: "industrial",
    sectorIcon: Plane,
    metric: "-90%",
    metricLabel: "Tiempo Verificación",
    description: "Validación automática de certificados EN9100 de 120 proveedores globales de piezas críticas.",
    color: "from-blue-600 to-indigo-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    blockchainProof: "0x4d5e...1a2b"
  },
  {
    id: "vinosdoe-elite",
    title: "Fraude Cero en Exportación D.O.",
    company: "VinosD.O. Elite",
    sector: "Agroalimentario",
    sectorCategory: "agroalimentario",
    sectorIcon: Wine,
    metric: "+35%",
    metricLabel: "Confianza Consumidor",
    description: "Notarización de lotes y D.O. con QR dinámico vinculado a DID de geolocalización.",
    color: "from-rose-800 to-amber-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    textColor: "text-rose-700 dark:text-rose-400",
    blockchainProof: "0x7a8b...3c9d"
  },
  {
    id: "pharmacold-logistix",
    title: "Integridad de Cadena de Frío",
    company: "PharmaCold Logistix",
    sector: "Salud",
    sectorCategory: "salud",
    sectorIcon: Thermometer,
    metric: "0%",
    metricLabel: "Pérdida Térmica",
    description: "Smart Contracts bloquean pago si sensores detectan temperatura >8°C durante +10min.",
    color: "from-red-500 to-rose-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    textColor: "text-red-600 dark:text-red-400",
    blockchainProof: "0x1b2c...8e9f"
  },
  {
    id: "portbcn-smart-trade",
    title: "Aduana Digital Instantánea",
    company: "PortBCN Smart-Trade",
    sector: "Movilidad",
    sectorCategory: "movilidad",
    sectorIcon: Ship,
    metric: "450€",
    metricLabel: "Ahorro/Container",
    description: "Conexión Webhooks con sistemas portuarios para validación KYB instantánea.",
    color: "from-cyan-600 to-blue-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    blockchainProof: "0x9d8e...7f6a"
  },
  {
    id: "ayuntamiento-etico",
    title: "Licitación Pública Transparente",
    company: "Ayuntamiento Ético",
    sector: "Economía Social",
    sectorCategory: "social",
    sectorIcon: Building2,
    metric: "99%",
    metricLabel: "Transparencia Ética",
    description: "Dashboard SROI para verificar cuota de discapacidad de licitadores en tiempo real.",
    color: "from-violet-600 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-600 dark:text-violet-400",
    blockchainProof: "0x5f4e...2d1c"
  },
  {
    id: "purelithium-sourcing",
    title: "Minerales Sin Conflicto CSRD",
    company: "PureLithium Sourcing",
    sector: "Industrial Minería",
    sectorCategory: "industrial",
    sectorIcon: Mountain,
    metric: "B-Corp",
    metricLabel: "Certificación",
    description: "Trazabilidad Tier 3 de litio con firma ODRL de políticas de uso ético.",
    color: "from-stone-600 to-emerald-500",
    bgColor: "bg-stone-50 dark:bg-stone-950/30",
    textColor: "text-stone-600 dark:text-stone-400",
    blockchainProof: "0x2a3b...9c8d"
  },
  {
    id: "fastfashion-trace",
    title: "Moda Circular Sin Greenwashing",
    company: "FastFashion Trace",
    sector: "Comercio",
    sectorCategory: "comercio",
    sectorIcon: Shirt,
    metric: "100%",
    metricLabel: "Etiquetado Preciso",
    description: "Sincronización PLM con certificados de composición textil para 1M de prendas.",
    color: "from-pink-500 to-green-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
    textColor: "text-pink-600 dark:text-pink-400",
    blockchainProof: "0x8c7b...4a5e"
  },
  {
    id: "invoicetrust-b2b",
    title: "Factoring con Score Blockchain",
    company: "InvoiceTrust",
    sector: "Finanzas B2B",
    sectorCategory: "finanzas",
    sectorIcon: Receipt,
    metric: "2M€",
    metricLabel: "Liquidez Pymes",
    description: "Score de solvencia inmutable basado en cumplimiento histórico de contratos ODRL.",
    color: "from-emerald-600 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0x3d2e...1f0a"
  },
  {
    id: "gridflow-energy",
    title: "Gestión de Excedentes Energéticos",
    company: "GridFlow",
    sector: "Energía",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "50",
    metricLabel: "Naves Conectadas",
    description: "Liquidación diaria de micro-pagos de energía entre comunidades industriales.",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    blockchainProof: "0x6a5f...4d3c"
  },
  {
    id: "ailabs-research",
    title: "Entrenamiento IA con Datos Sintéticos",
    company: "AI-Labs Research",
    sector: "Tecnología",
    sectorCategory: "tecnologia",
    sectorIcon: Cpu,
    metric: "-40%",
    metricLabel: "Tiempo Training",
    description: "Datasets sintéticos con alta fidelidad estadística sin fugas de datos reales.",
    color: "from-purple-600 to-orange-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    textColor: "text-purple-600 dark:text-purple-400",
    blockchainProof: "0x0e1f...9a8b"
  }
];

const SuccessStories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSector, setActiveSector] = useState("all");

  // Calculate sector counts
  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    successCases.forEach(c => {
      counts[c.sectorCategory] = (counts[c.sectorCategory] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredCases = successCases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = activeSector === "all" || c.sectorCategory === activeSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Award className="w-4 h-4" />
              17 Casos de Éxito Verificados
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Transformación Digital en{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Compras Empresariales
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre cómo empresas líderes han reducido costes, acelerado procesos y 
              demostrado su impacto ESG con la plataforma ProcureData.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative w-full md:w-80 mx-auto md:mx-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por empresa o título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Sector Filter */}
      <div className="container mx-auto px-4">
        <SuccessStoriesFilter 
          activeSector={activeSector}
          onSectorChange={setActiveSector}
          sectorCounts={sectorCounts}
        />
      </div>

      {/* Navigator */}
      <div className="container mx-auto px-4 pb-8">
        <SuccessStoryNavigator />
      </div>

      {/* Cases Grid */}
      <div className="container mx-auto px-4 pb-16">
        <AnimatePresence mode="popLayout">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/success-stories/${caseItem.id}`}>
                  <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                    {/* Header with gradient */}
                    <div className={`h-2 bg-gradient-to-r ${caseItem.color}`} />
                    
                    <CardContent className="p-6 space-y-4">
                      {/* Sector Badge */}
                      <div className="flex items-center justify-between">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${caseItem.bgColor} ${caseItem.textColor}`}>
                          <caseItem.sectorIcon className="w-3 h-3" />
                          {caseItem.sector}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                          <ShieldCheck className="w-3 h-3 text-green-500" />
                          {caseItem.blockchainProof}
                        </div>
                      </div>

                      {/* Company & Title */}
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">{caseItem.company}</p>
                        <h3 className="text-lg font-bold mt-1 group-hover:text-primary transition-colors line-clamp-2">
                          {caseItem.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {caseItem.description}
                      </p>

                      {/* Metric Highlight */}
                      <div className="pt-4 border-t flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                            {caseItem.metricLabel}
                          </p>
                          <p className={`text-2xl font-bold bg-gradient-to-r ${caseItem.color} bg-clip-text text-transparent`}>
                            {caseItem.metric}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCases.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Todavía estamos escribiendo historias aquí</h3>
            <p className="text-muted-foreground">¿Quieres ser el primero en tu sector?</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;
