import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Coins, Shield, FileCheck, Activity, Cpu, Network, 
  Home, ArrowRight, Calculator, Sparkles, TrendingUp, GitBranch, Lock,
  Check, X, Zap, Crown, Building2, HelpCircle, CreditCard, Plug, Users,
  CheckCircle, History
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const MODELS = [
  {
    id: "marketplace",
    title: "Marketplace Fee",
    description: "Comisión automática vía contrato inteligente en cada transacción. Cobro garantizado sin perseguir facturas ni gestionar impagos.",
    icon: Coins,
    iconBg: "bg-yellow-500/15",
    iconColor: "text-yellow-600",
    borderColor: "border-yellow-500/30",
    badges: ["Smart Contract", "EUROe", "2-5% Fee"],
    metrics: [
      { icon: Zap, label: "Liquidación 2s" },
      { icon: Shield, label: "0% impagos" },
      { icon: CheckCircle, label: "Cobro atómico" },
    ],
    path: "/motor/pagos-euroe",
  },
  {
    id: "saas",
    title: "Soberanía SaaS",
    description: "Suscripción por herramientas de control de privacidad y acceso a datos con políticas granulares. Modelo recurrente mensual.",
    icon: Shield,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-600",
    borderColor: "border-blue-500/30",
    badges: ["Kill-Switch", "ODRL", "Enterprise"],
    metrics: [
      { icon: Lock, label: "Control 100%" },
      { icon: Zap, label: "Revocación instantánea" },
      { icon: Users, label: "Multi-tenant" },
    ],
    path: "/motor/gobernanza-odrl",
  },
  {
    id: "audit",
    title: "Auditoría Blockchain",
    description: "Cobro por certificaciones on-chain y acceso API para validación histórica. Trazabilidad inmutable verificable por terceros.",
    icon: FileCheck,
    iconBg: "bg-green-500/15",
    iconColor: "text-green-600",
    borderColor: "border-green-500/30",
    badges: ["Inmutable", "Pontus-X", "DID"],
    metrics: [
      { icon: History, label: "Trazabilidad total" },
      { icon: CheckCircle, label: "Verificable" },
      { icon: Shield, label: "Sin manipulación" },
    ],
    path: "/motor/audit-logs",
  },
  {
    id: "iot",
    title: "IoT Data Streams",
    description: "Monetización por volumen de datos IoT notarizados en blockchain. €0.01 por cada 1,000 lecturas de sensores.",
    icon: Activity,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-600",
    borderColor: "border-purple-500/30",
    badges: ["Pay-as-you-go", "Sensores", "Edge"],
    metrics: [
      { icon: Coins, label: "€0.01/1K lecturas" },
      { icon: Zap, label: "Gas optimizado" },
      { icon: Activity, label: "Real-time" },
    ],
    path: "/motor/edge-functions",
  },
  {
    id: "compute",
    title: "Compute-to-Data",
    description: "Alquiler de entornos donde algoritmos aprenden sin acceder a datos crudos. Soberanía matemáticamente garantizada.",
    icon: Cpu,
    iconBg: "bg-red-500/15",
    iconColor: "text-red-600",
    borderColor: "border-red-500/30",
    badges: ["IA Segura", "Sandbox", "Privacy-first"],
    metrics: [
      { icon: Lock, label: "Datos nunca salen" },
      { icon: Cpu, label: "ML federado" },
      { icon: Shield, label: "Zero-trust" },
    ],
    path: "/motor/modelo-idsa",
  },
  {
    id: "network",
    title: "Network Builder",
    description: "Tarifa empresarial para subsidiar acceso de toda tu cadena de suministro. Digitalización masiva de proveedores.",
    icon: Network,
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-500/30",
    badges: ["Corporativo", "5K+ proveedores", "Onboarding"],
    metrics: [
      { icon: Coins, label: "50K€/año" },
      { icon: Crown, label: "Acceso Pro" },
      { icon: Users, label: "Digitalización masiva" },
    ],
    path: "/motor/conectores-erp",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5 }
  },
};

// Precios alineados con Memoria Técnica oficial
// - Alta de Proveedor: ~1.00 EUROe/transacción
// - Membresía Base: ~100 EUROe/año
const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    icon: Zap,
    color: "slate",
    description: "Para proveedores que comienzan",
    cta: "Empezar Gratis",
    ctaVariant: "outline" as const,
    transactionFee: "1.00 EUROe/alta", // Precio oficial
    features: [
      { name: "Recepción de solicitudes", included: true },
      { name: "Perfil DID básico", included: true },
      { name: "Dashboard básico", included: true },
      { name: "1 conector ERP", included: true },
      { name: "Trazabilidad básica", included: true },
      { name: "Creación contratos ODRL", included: false },
      { name: "Dashboard analítica avanzada", included: false },
      { name: "Kill-Switch revocación", included: false },
      { name: "SLAs dedicados", included: false },
    ],
    users: "1 usuario",
    support: "Comunidad",
  },
  {
    id: "pro",
    name: "Pro",
    price: 100, // Cambiado de 99 a 100 según Memoria Técnica
    annualPrice: 100, // Membresía base anual oficial
    icon: Crown,
    color: "blue",
    description: "Membresía base al Data Space",
    cta: "Probar Pro 14 días",
    ctaVariant: "default" as const,
    featured: true,
    transactionFee: "0.50 EUROe/alta", // Descuento por membresía
    features: [
      { name: "Recepción de solicitudes", included: true },
      { name: "Perfil DID verificado", included: true },
      { name: "Dashboard completo", included: true },
      { name: "5 conectores ERP", included: true },
      { name: "Trazabilidad blockchain completa", included: true },
      { name: "Creación contratos ODRL", included: true },
      { name: "Dashboard analítica avanzada", included: true },
      { name: "Kill-Switch limitado", included: true },
      { name: "SLAs dedicados", included: false },
    ],
    users: "5 usuarios",
    support: "Email 24h",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    icon: Building2,
    color: "violet",
    description: "Para data holders y corporaciones",
    cta: "Contactar Ventas",
    ctaVariant: "secondary" as const,
    transactionFee: "Negociable", // Volumen personalizado
    features: [
      { name: "Recepción de solicitudes", included: true },
      { name: "Perfil DID premium", included: true },
      { name: "Dashboard white-label", included: true },
      { name: "Conectores ERP ilimitados", included: true },
      { name: "Trazabilidad + API dedicada", included: true },
      { name: "Creación contratos ODRL", included: true },
      { name: "Dashboard analítica avanzada", included: true },
      { name: "Kill-Switch ilimitado", included: true },
      { name: "SLAs dedicados", included: true },
    ],
    users: "Ilimitados",
    support: "Dedicado 24/7",
  },
];

export default function BusinessModels() {
  const [volume, setVolume] = useState([50000]);
  const [suppliers, setSuppliers] = useState([100]);
  const [isAnnual, setIsAnnual] = useState(false);

  // Cálculos gamificados
  const feeRevenue = volume[0] * 0.03; // 3% fee promedio
  const networkSavings = suppliers[0] * 150; // €150 ahorro por proveedor
  const saasRevenue = suppliers[0] * 0.3 * 99; // 30% conversión a Pro €99/mes

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="procuredata-gradient font-bold text-xl">PROCUREDATA</span>
          </Link>
          <Badge variant="outline" className="text-xs">v3.1</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            <Sparkles className="h-3 w-3 mr-1" />
            Economía Híbrida Web2/Web3
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Ecosistema de Valor PROCUREDATA
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seis modelos de monetización que combinan la estabilidad del SaaS Enterprise 
            con el potencial exponencial de la economía de tokens.
          </p>
        </motion.div>

        {/* Grid de Modelos de Negocio - Diseño Estático */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {MODELS.map((model) => {
            const Icon = model.icon;
            
            return (
              <motion.div
                key={model.id}
                variants={cardVariants}
                className="relative"
              >
                <Link to={model.path} className="block h-full">
                  <Card className={`h-full border-2 ${model.borderColor} bg-card shadow-sm`}>
                    <CardHeader className="pb-3">
                      {/* Icono y título */}
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-3 rounded-xl ${model.iconBg}`}>
                          <Icon className={`h-7 w-7 ${model.iconColor}`} />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-xl">{model.title}</CardTitle>
                      
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {model.badges.map((badge, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary" 
                            className="text-xs font-medium"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Descripción */}
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {model.description}
                      </p>
                      
                      {/* Métricas */}
                      <div className="flex flex-wrap gap-3 pt-3 border-t border-border">
                        {model.metrics.map((metric, i) => {
                          const MetricIcon = metric.icon;
                          return (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MetricIcon className="h-3.5 w-3.5 text-primary" />
                              <span>{metric.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Diagrama de Flujo - Marketplace Fee */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <GitBranch className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Flujo de Valor: Marketplace Fee</h2>
              <p className="text-muted-foreground text-sm">
                Visualización del flujo de pagos atómicos vía Smart Contract
              </p>
            </div>
          </div>
          
          <MermaidDiagram
            scale={1.12}
            chart={`
sequenceDiagram
    participant C as 🏢 Consumer<br/>(Comprador de Datos)
    participant P as ⚡ PROCUREDATA<br/>(Smart Contract)
    participant B as 🔗 Pontus-X<br/>(Blockchain)
    participant S as 🏭 Provider<br/>(Proveedor de Datos)
    
    Note over C,S: Transacción de 1,000 EUROe por Dataset ESG
    
    C->>P: 1. Solicita acceso al dataset
    P->>C: 2. Genera contrato ODRL + precio
    C->>P: 3. Paga 1,000 EUROe
    
    rect rgb(255, 245, 200)
        Note over P: Split automático (3% fee)
        P->>P: Retiene 30 EUROe (Platform Fee)
        P->>B: 4. Registra transacción on-chain
        B-->>P: 5. Confirma hash inmutable
    end
    
    P->>S: 6. Transfiere 970 EUROe
    P->>C: 7. Libera acceso al dataset
    
    Note over C,S: ✅ Pago y acceso atómicos - Sin facturas pendientes
            `}
            className="border-2 border-yellow-500/20 bg-gradient-to-br from-yellow-50/50 to-orange-50/30 dark:from-yellow-950/20 dark:to-orange-950/10"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-4 w-4 text-yellow-600" />
                  <span className="font-semibold text-sm">Fee Automático</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  2-5% retenido por Smart Contract antes de la transferencia. Sin intervención manual.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-sm">Trazabilidad Total</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Cada transacción queda registrada en Pontus-X con hash inmutable y timestamp.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-sm">Pago Atómico</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Liberación de acceso simultánea al pago. Imposible cobrar sin entregar.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Diagrama de Flujo - Network Builder */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Network className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Flujo de Valor: Network Builder</h2>
              <p className="text-muted-foreground text-sm">
                Cómo una corporación patrocina la digitalización de su cadena de suministro
              </p>
            </div>
          </div>
          
          <MermaidDiagram
            scale={1.12}
            chart={`
sequenceDiagram
    participant Corp as 🏛️ Corporation<br/>(Sponsor)
    participant PD as ⚡ PROCUREDATA<br/>(Network Builder)
    participant S1 as 🏭 Tier 1<br/>(500 Proveedores)
    participant S2 as 📦 Tier 2-N<br/>(4,500 Proveedores)
    participant DID as 🔐 DID Registry<br/>(Gaia-X)
    
    Note over Corp,DID: Programa Network Builder - 50,000€/año
    
    Corp->>PD: 1. Contrata programa anual
    PD->>PD: Activa licencias Pro (5,000 slots)
    
    rect rgb(230, 230, 250)
        Note over PD,S2: Onboarding masivo automatizado
        PD->>S1: 2. Invitación + Tour Guiado
        PD->>S2: 2. Invitación + Tour Guiado
        S1->>DID: 3. Registro DID soberano
        S2->>DID: 3. Registro DID soberano
        DID-->>PD: 4. Credenciales verificadas
    end
    
    PD->>S1: 5. Acceso Pro activado (gratis)
    PD->>S2: 5. Acceso Pro activado (gratis)
    
    S1->>PD: 6. Datos ESG estandarizados
    S2->>PD: 6. Datos ESG estandarizados
    
    PD->>Corp: 7. Dashboard consolidado de cadena
    
    Note over Corp,DID: ✅ 5,000 proveedores digitalizados = 10€/proveedor
            `}
            className="border-2 border-indigo-500/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 dark:from-indigo-950/20 dark:to-purple-950/10"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-indigo-500/5 border-indigo-500/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Network className="h-4 w-4 text-indigo-600" />
                  <span className="font-semibold text-sm">Escala Masiva</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Una sola tarifa cubre miles de proveedores. Coste unitario de ~10€ vs ~500€ tradicional.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-sm">Identidad Soberana</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Cada proveedor obtiene su DID verificado en Gaia-X. Credenciales portables y reutilizables.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-sm">Win-Win-Win</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Corporation: compliance CSRD. Proveedor: digitalización gratis. Plataforma: efecto red.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Diagrama de Flujo - Compute-to-Data */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Cpu className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Flujo de Valor: Compute-to-Data</h2>
              <p className="text-muted-foreground text-sm">
                Cómo los algoritmos de IA procesan datos sensibles sin exponerlos
              </p>
            </div>
          </div>
          
          <MermaidDiagram
            scale={1.12}
            chart={`
sequenceDiagram
    participant DO as 🏭 Data Owner<br/>(Datos Sensibles)
    participant SB as 🔒 PROCUREDATA<br/>(Sandbox Seguro)
    participant AI as 🤖 Algorithm<br/>(Proveedor IA)
    participant OUT as 📊 Output<br/>(Solo Modelo)
    
    Note over DO,OUT: Compute-to-Data: Los datos NUNCA salen del sandbox
    
    DO->>SB: 1. Upload datos encriptados
    Note right of DO: Fórmulas, pacientes,<br/>secretos industriales
    
    AI->>SB: 2. Envía algoritmo ML
    Note left of AI: TensorFlow, PyTorch,<br/>código auditado
    
    rect rgb(255, 230, 230)
        Note over SB: 🔐 ZONA SEGURA - Ejecución Aislada
        SB->>SB: 3. Desencripta datos temporalmente
        SB->>SB: 4. Ejecuta algoritmo sobre datos
        SB->>SB: 5. Genera modelo entrenado
        SB->>SB: 6. Destruye datos crudos
    end
    
    SB-->>AI: 7. Entrega modelo entrenado
    SB-->>DO: 8. Pago por uso de datos
    
    Note over DO,OUT: ✅ Data Owner: Monetiza sin exponer<br/>✅ AI Provider: Obtiene modelo valioso<br/>✅ PROCUREDATA: Cobra por orquestación
            `}
            className="border-2 border-red-500/20 bg-gradient-to-br from-red-50/50 to-orange-50/30 dark:from-red-950/20 dark:to-orange-950/10"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="h-4 w-4 text-red-600" />
                  <span className="font-semibold text-sm">Soberanía Matemática</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Los datos nunca abandonan el sandbox. Prueba criptográfica de que solo el modelo salió.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-orange-500/5 border-orange-500/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-orange-600" />
                  <span className="font-semibold text-sm">Zero-Knowledge</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  El proveedor de IA nunca ve los datos crudos. Solo recibe el aprendizaje consolidado.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-sm">Monetización Pasiva</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  El Data Owner cobra por cada ejecución sin gestionar nada. Ingreso recurrente de activos dormidos.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Pricing Table Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Planes flexibles
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Soberanía de Datos para Cada Etapa
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Desde proveedores que comienzan hasta corporaciones globales. 
              Paga solo por lo que necesitas.
            </p>
            
            {/* Toggle Mensual/Anual */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Mensual
              </span>
              <Switch 
                checked={isAnnual} 
                onCheckedChange={setIsAnnual}
              />
              <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Anual
              </span>
              {isAnnual && (
                <Badge variant="default" className="bg-green-500 text-white">
                  Ahorra 20%
                </Badge>
              )}
            </div>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {PRICING_TIERS.map((tier, index) => {
              const Icon = tier.icon;
              const displayPrice = tier.price === null 
                ? null 
                : isAnnual && tier.annualPrice 
                  ? tier.annualPrice 
                  : tier.price;
              
              return (
                <motion.div
                  key={tier.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className={`relative h-full flex flex-col ${
                    tier.featured 
                      ? 'border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  }`}>
                    {tier.featured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground shadow-lg">
                          <Crown className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className={`mx-auto p-3 rounded-xl mb-3 ${
                        tier.color === 'slate' ? 'bg-slate-500/10' :
                        tier.color === 'blue' ? 'bg-blue-500/10' :
                        'bg-violet-500/10'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          tier.color === 'slate' ? 'text-slate-600' :
                          tier.color === 'blue' ? 'text-blue-600' :
                          'text-violet-600'
                        }`} />
                      </div>
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                      
                      <div className="mt-4">
                        {displayPrice !== null ? (
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold">€{displayPrice}</span>
                            <span className="text-muted-foreground">/mes</span>
                          </div>
                        ) : (
                          <div className="text-2xl font-bold text-muted-foreground">
                            Personalizado
                          </div>
                        )}
                        {isAnnual && tier.annualPrice && (
                          <p className="text-xs text-green-600 mt-1">
                            Ahorras €{(tier.price! - tier.annualPrice) * 12}/año
                          </p>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col">
                      <ul className="space-y-3 mb-6 flex-1">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            {feature.included ? (
                              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                            )}
                            <span className={feature.included ? '' : 'text-muted-foreground/50'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Usuarios</span>
                          <span className="font-medium">{tier.users}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Soporte</span>
                          <span className="font-medium">{tier.support}</span>
                        </div>
                        
                        <Button 
                          variant={tier.ctaVariant} 
                          className={`w-full mt-4 ${tier.featured ? 'shadow-lg' : ''}`}
                        >
                          {tier.cta}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
          
          <p className="text-center text-xs text-muted-foreground mt-6">
            Todos los planes incluyen certificación Gaia-X y cumplimiento GDPR. 
            Precios sin IVA.
          </p>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
              <Badge variant="outline">FAQ</Badge>
            </div>
            <h2 className="text-3xl font-bold mb-2">Preguntas Frecuentes</h2>
            <p className="text-muted-foreground">
              Resuelve tus dudas sobre planes, seguridad, integración y proveedores
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Facturación y Planes */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <CreditCard className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold">Facturación y Planes</h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="billing">
                  <AccordionTrigger className="text-left">
                    ¿Cómo funciona la facturación?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Facturación mensual o anual según tu preferencia. Aceptamos pago con tarjeta, 
                    transferencia SEPA o EUROe (stablecoin). Todas las facturas se generan 
                    automáticamente con IVA desglosado y están disponibles en tu panel de control.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="change-plan">
                  <AccordionTrigger className="text-left">
                    ¿Puedo cambiar de plan en cualquier momento?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sí, puedes hacer upgrade al instante y solo pagarás la diferencia prorrateada. 
                    Si decides bajar de plan, el cambio se aplica al inicio del siguiente ciclo de 
                    facturación, manteniendo todas tus funcionalidades hasta entonces.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="commitment">
                  <AccordionTrigger className="text-left">
                    ¿Hay permanencia o compromiso mínimo?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No hay ningún compromiso de permanencia. Puedes cancelar tu suscripción cuando 
                    quieras. Tus datos permanecen accesibles durante 30 días tras la cancelación 
                    para que puedas exportarlos.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="data-cancel">
                  <AccordionTrigger className="text-left">
                    ¿Qué pasa con mis datos si cancelo?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Tienes 30 días para exportar todos tus datos en formato estándar. Después de 
                    ese período, los datos se eliminan de nuestros servidores. Sin embargo, tus 
                    certificados blockchain permanecen inmutables y verificables para siempre.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="support">
                  <AccordionTrigger className="text-left">
                    ¿Qué nivel de soporte incluye cada plan?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Free:</strong> acceso a documentación y comunidad. 
                    <strong className="ml-2">Pro:</strong> soporte por email con respuesta garantizada en 24h laborables. 
                    <strong className="ml-2">Enterprise:</strong> gestor de cuenta dedicado, SLA garantizado y 
                    soporte telefónico prioritario.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Seguridad y Soberanía de Datos */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Seguridad y Soberanía de Datos</h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="security">
                  <AccordionTrigger className="text-left">
                    ¿Dónde se almacenan mis datos?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Toda la infraestructura está alojada en centros de datos europeos certificados 
                    bajo el sello Gaia-X. Cumplimiento total con GDPR. El plan Enterprise ofrece 
                    opción de nube privada o despliegue on-premise para máxima soberanía.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="data-control">
                  <AccordionTrigger className="text-left">
                    ¿Quién controla mis datos en la plataforma?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Siempre tú. A diferencia de otras plataformas, en ProcureData mantienes la 
                    soberanía total sobre tus datos. Defines políticas ODRL que determinan quién 
                    puede acceder, por cuánto tiempo y para qué propósito. Puedes revocar accesos 
                    instantáneamente con nuestro Kill-Switch.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="compute-to-data">
                  <AccordionTrigger className="text-left">
                    ¿Cómo funciona el modelo "Compute-to-Data"?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    En lugar de enviar tus datos a terceros, los algoritmos viajan a tu entorno 
                    seguro. Los análisis se ejecutan en sandboxes aislados y solo salen los 
                    resultados agregados, nunca los datos crudos. Es privacidad matemáticamente 
                    garantizada.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="gaia-x">
                  <AccordionTrigger className="text-left">
                    ¿Qué es Gaia-X y por qué es importante?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Gaia-X es la iniciativa europea para crear un ecosistema de datos federado, 
                    seguro e interoperable. Nuestra certificación Gaia-X garantiza que cumplimos 
                    los más altos estándares de soberanía, transparencia y protección de datos 
                    según normativa europea.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="data-sharing">
                  <AccordionTrigger className="text-left">
                    ¿Mis datos se comparten con terceros?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Solo según tus políticas explícitas. Cada acceso queda registrado en blockchain 
                    con trazabilidad completa: quién accedió, cuándo y para qué. Nosotros nunca 
                    monetizamos tus datos ni los compartimos sin tu consentimiento expreso.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Integración Técnica */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Plug className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">Integración Técnica</h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="migration">
                  <AccordionTrigger className="text-left">
                    ¿Puedo migrar datos desde otro sistema?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sí. Ofrecemos conectores nativos para SAP, Oracle, Microsoft Dynamics y APIs 
                    REST genéricas. El plan Pro incluye soporte de migración asistida. Para Enterprise, 
                    asignamos un equipo dedicado para garantizar una transición sin interrupciones.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="erp-support">
                  <AccordionTrigger className="text-left">
                    ¿Qué ERPs y sistemas soportan integración nativa?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Conectores nativos para <strong>SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics 365, 
                    Odoo</strong> y <strong>Sage</strong>. También ofrecemos APIs REST y webhooks para 
                    cualquier sistema que soporte integraciones estándar. El plan Enterprise incluye 
                    desarrollo de conectores personalizados.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="integration-time">
                  <AccordionTrigger className="text-left">
                    ¿Cuánto tiempo toma una integración típica?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Starter/Free:</strong> self-service en horas con nuestros wizards guiados.
                    <strong className="ml-2">Pro:</strong> 1-2 semanas con soporte técnico incluido.
                    <strong className="ml-2">Enterprise:</strong> proyecto dedicado de 4-8 semanas con 
                    testing completo y rollout por fases.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="blockchain-knowledge">
                  <AccordionTrigger className="text-left">
                    ¿Necesito conocimientos de blockchain para usar la plataforma?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. Toda la complejidad blockchain está abstraída. Tú trabajas con interfaces 
                    familiares y nosotros nos encargamos de la certificación, los smart contracts y 
                    la trazabilidad. Solo verás los beneficios (inmutabilidad, auditoría) sin la 
                    complejidad técnica.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Proveedores y Red */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold">Proveedores y Red</h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="suppliers-payment">
                  <AccordionTrigger className="text-left">
                    ¿Mis proveedores necesitan pagar para conectarse?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No necesariamente. Tus proveedores pueden usar el tier Free para recibir 
                    solicitudes de datos y participar en tu cadena. Con el modelo Network Builder, 
                    puedes subsidiar su acceso Pro como parte de tu inversión en digitalización.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="supplier-onboarding">
                  <AccordionTrigger className="text-left">
                    ¿Cuánto tarda un proveedor en darse de alta?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Registro básico:</strong> 5 minutos con email y datos de empresa.
                    <strong className="ml-2">Onboarding completo:</strong> 1 día hábil incluyendo 
                    verificación KYB y configuración de permisos. Enviamos invitaciones automáticas 
                    y guías paso a paso para facilitar la adopción.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="esg-requests">
                  <AccordionTrigger className="text-left">
                    ¿Cómo solicito datos ESG a mis proveedores?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Usa nuestras plantillas predefinidas (huella de carbono, certificaciones, 
                    condiciones laborales) o crea formularios personalizados. El sistema envía 
                    recordatorios automáticos y tienes un dashboard de seguimiento con tasas de 
                    respuesta y alertas de incumplimiento.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="competitive-diff">
                  <AccordionTrigger className="text-left">
                    ¿En qué se diferencia de plataformas como Achilles o Informa D&B?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Tres diferencias clave: <strong>1) Soberanía:</strong> tú controlas tus datos, 
                    no un intermediario que los monetiza. <strong>2) Modelo federado:</strong> los 
                    datos no se centralizan, viajan solo cuando es necesario. <strong>3) Certificación 
                    Gaia-X:</strong> cumplimiento europeo garantizado y trazabilidad blockchain para 
                    auditorías inmutables.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </motion.section>

        {/* Simulador ROI Gamificado */}
      </main>

      {/* Footer simple */}
      <footer className="bg-slate-950 text-white py-8 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="procuredata-gradient font-bold">PROCUREDATA</span>
            <span className="text-gray-500 text-sm">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/whitepaper" className="hover:text-white transition-colors">Whitepaper</Link>
            <Link to="/architecture" className="hover:text-white transition-colors">Arquitectura</Link>
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
