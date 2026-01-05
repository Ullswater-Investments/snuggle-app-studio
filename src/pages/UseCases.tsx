import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Leaf, 
  Coins, 
  LockKeyhole, 
  Package, 
  Cpu, 
  AlertTriangle, 
  Landmark, 
  Thermometer, 
  FileSignature,
  Quote,
  ArrowRight,
  ArrowUp,
  ArrowLeft,
  LucideIcon,
  Car,
  Zap,
  Pill,
  ShoppingBag,
  HardHat,
  TrendingUp,
  Truck,
  Wheat,
  Rocket,
  Monitor,
  Filter,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { useState, useEffect } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface Industry {
  id: string;
  name: string;
  icon: LucideIcon;
}

const INDUSTRIES: Industry[] = [
  { id: "all", name: "Todas", icon: Filter },
  { id: "Automotive", name: "Automoción", icon: Car },
  { id: "Energy", name: "Energía", icon: Zap },
  { id: "Pharma", name: "Farmacéutica", icon: Pill },
  { id: "Retail", name: "Retail", icon: ShoppingBag },
  { id: "Construction", name: "Construcción", icon: HardHat },
  { id: "Finance", name: "Finanzas", icon: TrendingUp },
  { id: "Logistics", name: "Logística", icon: Truck },
  { id: "AgriFood", name: "Agroalimentario", icon: Wheat },
  { id: "Aerospace", name: "Aeroespacial", icon: Rocket },
  { id: "Tech", name: "Tecnología", icon: Monitor }
];

interface UseCase {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: LucideIcon;
  badge: string;
  color: string;
  bgColor: string;
  actor: string;
  problem: string;
  solution: string;
  mermaidChart: string;
  testimonial: Testimonial;
  industries: string[];
}

const USE_CASES: UseCase[] = [
  {
    id: "kyb-onboarding",
    title: "Onboarding KYB",
    shortDesc: "Verificación instantánea de proveedores mediante identidad soberana (DID).",
    fullDesc: "Automatiza el proceso de verificación de nuevos proveedores utilizando Identidad Descentralizada (DID). En lugar de semanas de intercambio de documentos y verificaciones manuales, el proveedor conecta su wallet, firma una autorización, y PROCUREDATA verifica automáticamente su registro corporativo contra fuentes oficiales. El resultado es un perfil verificado en minutos, no semanas.",
    icon: ShieldCheck,
    badge: "Identity",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    actor: "Director de Compras",
    problem: "El onboarding tradicional de proveedores toma 2-4 semanas, requiere intercambio manual de documentos PDF, y genera silos de información desactualizada. Cada departamento mantiene su propia lista de proveedores, generando inconsistencias y riesgos de fraude por suplantación.",
    solution: "PROCUREDATA genera un DID (did:ethr) único para cada proveedor al conectar su wallet. Este DID se verifica contra registros corporativos oficiales a través de Pontus-X. Una vez verificado, cualquier empresa del ecosistema puede confiar en ese proveedor sin repetir la verificación, creando una red de confianza descentralizada.",
    mermaidChart: `sequenceDiagram
    participant P as Proveedor
    participant W as Wallet MetaMask
    participant PD as PROCUREDATA
    participant PX as Pontus-X
    
    P->>W: Conectar Wallet
    W->>PD: Firma Autorización
    PD->>PD: Generar DID (did:ethr)
    PD->>PX: Verificar Registro Corporativo
    PX-->>PD: Credencial Validada
    PD-->>P: Perfil Creado ✓`,
    testimonial: {
      quote: "Redujimos el onboarding de proveedores de 3 semanas a 15 minutos. El DID verificado nos da confianza total en cada nuevo partner.",
      author: "María García",
      role: "Directora de Compras",
      company: "Inditex Supply"
    },
    industries: ["Automotive", "Energy", "Pharma", "Retail", "Construction", "Finance", "Logistics", "AgriFood", "Aerospace", "Tech"]
  },
  {
    id: "huella-carbono",
    title: "Huella de Carbono (Scope 3)",
    shortDesc: "Reportes ESG inmutables y auditables para cumplir con normativas CSRD.",
    fullDesc: "La normativa CSRD europea exige a las grandes empresas reportar emisiones Scope 3 (cadena de suministro). PROCUREDATA permite solicitar y agregar reportes ESG de todos tus proveedores de forma estructurada, con cada dato firmado digitalmente y almacenado en blockchain. Los auditores pueden verificar la autenticidad sin acceder a los datos originales.",
    icon: Leaf,
    badge: "Sustainability",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    actor: "Chief Sustainability Officer",
    problem: "Las empresas deben reportar emisiones de toda su cadena de suministro (Scope 3), pero recopilar datos verificables de cientos de proveedores es un proceso manual, propenso a errores, y sin garantía de autenticidad. Los auditores cuestionan la fiabilidad de los datos.",
    solution: "Cada proveedor sube su reporte ESG a PROCUREDATA, que genera un hash criptográfico almacenado en Pontus-X. La empresa puede agregar los datos de múltiples proveedores mientras mantiene la trazabilidad individual. Los auditores verifican la integridad sin ver los datos originales de cada proveedor.",
    mermaidChart: `flowchart LR
    A[Manufacturera] -->|Solicita ESG| B[PROCUREDATA]
    B -->|Notifica| C[Proveedor 1]
    B -->|Notifica| D[Proveedor 2]
    C -->|Sube Reporte| E[Hash en Blockchain]
    D -->|Sube Reporte| E
    E -->|Acceso Controlado| A
    E -->|Auditoría| F[Auditor Externo]`,
    testimonial: {
      quote: "Por fin podemos reportar Scope 3 con datos auditables. Nuestros inversores y reguladores están tranquilos con la trazabilidad blockchain.",
      author: "Hans Müller",
      role: "Chief Sustainability Officer",
      company: "BMW Group"
    },
    industries: ["Automotive", "Energy", "Pharma", "Construction", "Logistics", "AgriFood", "Aerospace"]
  },
  {
    id: "marketplace-euroe",
    title: "Marketplace de Datos",
    shortDesc: "Compraventa segura de activos industriales pagando con EUROe.",
    fullDesc: "Monetiza tus datos industriales de forma segura. Publica datasets en el marketplace de PROCUREDATA, define precio y condiciones de uso, y recibe pagos instantáneos en EUROe (stablecoin respaldada 1:1 por euros). El smart contract garantiza que el pago se libera solo cuando el comprador confirma acceso, eliminando el riesgo de impago.",
    icon: Coins,
    badge: "Commerce",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    actor: "Data Product Manager",
    problem: "Vender datos B2B implica negociaciones largas, contratos legales costosos, y riesgo de impago internacional. Los pagos bancarios transfronterizos tardan días y tienen comisiones elevadas. No existe un estándar para definir condiciones de uso de datos.",
    solution: "PROCUREDATA permite publicar datasets con precio fijo o suscripción en EUROe. El smart contract actúa como escrow: retiene el pago hasta que el comprador confirma acceso. Las políticas ODRL definen exactamente qué puede hacer el comprador con los datos. Todo queda registrado en blockchain.",
    mermaidChart: `sequenceDiagram
    participant V as Vendedor
    participant C as Comprador
    participant SC as Smart Contract
    participant BC as Blockchain
    
    V->>SC: Publica Dataset + Precio
    C->>SC: Pago EUROe
    SC->>BC: Verificar Transferencia
    BC-->>SC: Confirmado ✓
    SC->>C: Access Token Liberado
    C->>V: Descarga Datos`,
    testimonial: {
      quote: "Vendemos datos de tendencias de consumo globalmente. EUROe eliminó la fricción bancaria internacional y recibimos pagos al instante.",
      author: "Sophie Chen",
      role: "CEO",
      company: "DataBroker AG"
    },
    industries: ["Automotive", "Energy", "Pharma", "Retail", "Construction", "Finance", "Logistics", "AgriFood", "Aerospace", "Tech"]
  },
  {
    id: "kill-switch",
    title: "Kill-Switch de Datos",
    shortDesc: "Revocación de accesos en tiempo real ante brechas de seguridad.",
    fullDesc: "Cuando se detecta una brecha de seguridad, cada segundo cuenta. El Kill-Switch de PROCUREDATA permite revocar todos los accesos a datos compartidos con un solo clic. El smart contract invalida instantáneamente todos los tokens de acceso activos, y registra la acción en un log de auditoría inmutable para cumplimiento normativo.",
    icon: LockKeyhole,
    badge: "Security",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    actor: "Chief Information Security Officer",
    problem: "En una brecha de datos, revocar accesos tradicionales puede tardar horas o días: hay que contactar a cada partner, actualizar APIs, invalidar tokens manualmente. Mientras tanto, los datos siguen expuestos.",
    solution: "El RevokeAccessButton de PROCUREDATA ejecuta un smart contract que invalida todos los Access Tokens en una sola transacción blockchain. La revocación es inmediata, global, y queda registrada permanentemente en el audit log para demostrar cumplimiento ante reguladores.",
    mermaidChart: `flowchart TD
    A[Detectar Brecha] -->|Alerta| B[Director Seguridad]
    B -->|Click| C[RevokeAccessButton]
    C -->|Ejecuta| D[Smart Contract]
    D -->|Invalida| E[Todos los Access Tokens]
    D -->|Registra| F[Audit Log Inmutable]
    E -->|Resultado| G[Acceso Bloqueado Instantáneo]`,
    testimonial: {
      quote: "Cuando detectamos la brecha, cortamos el acceso en 3 segundos con un solo clic. Literalmente salvó a la empresa de un desastre regulatorio.",
      author: "Carlos Ruiz",
      role: "CISO",
      company: "Telefónica"
    },
    industries: ["Pharma", "Finance", "Tech", "Aerospace"]
  },
  {
    id: "pasaporte-digital",
    title: "Pasaporte Digital (DPP)",
    shortDesc: "Trazabilidad completa del producto agregando datos de múltiples proveedores.",
    fullDesc: "El Pasaporte Digital de Producto (DPP) es obligatorio en la UE a partir de 2026 para textiles, baterías y electrónicos. PROCUREDATA permite que cada actor de la cadena de suministro agregue su información (origen materiales, procesos, certificaciones) a un registro común. El consumidor final escanea un código QR y ve toda la historia del producto.",
    icon: Package,
    badge: "Compliance",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    actor: "Director de Sostenibilidad",
    problem: "La normativa DPP exige trazabilidad completa del producto, pero los datos están fragmentados entre decenas de proveedores con sistemas incompatibles. Crear un registro unificado manualmente es imposible a escala.",
    solution: "Cada proveedor firma su contribución al DPP con su DID. PROCUREDATA agrega todas las firmas en un registro inmutable. El producto final tiene un código QR que enlaza al DPP completo en blockchain. Cualquiera puede verificar la autenticidad de cada eslabón.",
    mermaidChart: `flowchart LR
    subgraph Proveedores
        P1[🧵 Tela]
        P2[🎨 Tinte]
        P3[✂️ Confección]
        P4[🚚 Transporte]
        P5[🏪 Retail]
    end
    
    P1 -->|Firma DID| DPP[📦 Pasaporte Digital]
    P2 -->|Firma DID| DPP
    P3 -->|Firma DID| DPP
    P4 -->|Firma DID| DPP
    P5 -->|Firma DID| DPP
    
    DPP -->|QR Code| Consumer[👤 Consumidor Final]`,
    testimonial: {
      quote: "Cumplimos la normativa DPP de la UE antes que nadie. Nuestros clientes escanean el QR y ven todo el viaje de la prenda, desde el algodón hasta la tienda.",
      author: "Elena Rossi",
      role: "Directora de Sostenibilidad",
      company: "Gucci"
    },
    industries: ["Automotive", "Pharma", "Retail", "AgriFood", "Aerospace"]
  },
  {
    id: "compute-to-data",
    title: "Compute-to-Data",
    shortDesc: "Entrena IA sobre datos sensibles sin exponerlos fuera del sandbox.",
    fullDesc: "Los datos más valiosos (médicos, financieros, industriales) no pueden compartirse por regulación o competencia. Compute-to-Data invierte el paradigma: en lugar de enviar datos al algoritmo, envías el algoritmo a los datos. Tu modelo de IA se ejecuta en un sandbox seguro junto a los datos, y solo recibes los resultados (estadísticas, modelo entrenado), nunca los datos originales.",
    icon: Cpu,
    badge: "AI Privacy",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    actor: "Chief Technology Officer",
    problem: "Las empresas quieren monetizar datos sensibles o entrenar IA sobre ellos, pero la regulación (GDPR, HIPAA) prohíbe moverlos. Los acuerdos de confidencialidad no son suficiente garantía técnica.",
    solution: "PROCUREDATA provisiona un sandbox aislado donde el proveedor de datos deposita la información y el consumidor deposita su algoritmo. El sandbox ejecuta el código y devuelve solo los resultados. Los datos nunca salen del entorno controlado. Todo queda auditado en blockchain.",
    mermaidChart: `sequenceDiagram
    participant AI as Startup IA
    participant PD as PROCUREDATA
    participant H as Hospital
    participant SB as Sandbox Seguro
    
    AI->>PD: Sube Modelo IA
    PD->>H: Solicita Acceso C2D
    H->>PD: Aprueba (datos NO salen)
    PD->>SB: Provisiona Entorno
    SB->>SB: Ejecuta Modelo sobre Datos
    SB-->>AI: Solo Resultados (sin datos crudos)`,
    testimonial: {
      quote: "Monetizamos datos clínicos de 10 años sin violar GDPR. La IA entrena aquí, los datos nunca salen del hospital. Revolucionario.",
      author: "Dr. James Wilson",
      role: "CTO",
      company: "Roche Pharma"
    },
    industries: ["Pharma", "Finance", "Tech", "Aerospace"]
  },
  {
    id: "gestion-recalls",
    title: "Gestión de Recalls",
    shortDesc: "Rastreo instantáneo de lotes defectuosos en toda la cadena.",
    fullDesc: "Cuando se detecta un componente defectuoso, identificar todos los productos afectados puede tardar semanas con sistemas tradicionales. PROCUREDATA usa el DataLineage para rastrear instantáneamente qué lotes del proveedor se usaron en qué productos finales, y cuáles ya están en manos de clientes. Un recall que tardaba 2 semanas ahora tarda 2 minutos.",
    icon: AlertTriangle,
    badge: "Quality",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    actor: "VP Quality Assurance",
    problem: "Un componente defectuoso puede estar en miles de productos distribuidos globalmente. Identificar los lotes afectados requiere cruzar hojas de cálculo de múltiples sistemas, un proceso de días o semanas mientras los productos defectuosos siguen en el mercado.",
    solution: "PROCUREDATA mantiene un grafo de linaje de datos que conecta cada componente con cada producto final y su ubicación. Una consulta al DataLineage identifica instantáneamente todos los productos afectados por un lote defectuoso, permitiendo recalls quirúrgicos en minutos.",
    mermaidChart: `flowchart TD
    A[⚠️ Detectar Pieza Defectuosa] -->|Query| B[DataLineage]
    B -->|Traza| C[Blockchain History]
    C -->|Identifica| D[Lote Proveedor X]
    D -->|Consulta| E[Vehículos Afectados]
    E -->|Lista| F[1,247 Coches]
    F -->|Inicia| G[✅ Recall Inmediato]`,
    testimonial: {
      quote: "Identificamos 1,247 vehículos afectados por un airbag defectuoso en 47 segundos. Antes tardábamos 2 semanas mínimo.",
      author: "Akiko Tanaka",
      role: "VP Quality",
      company: "Toyota"
    },
    industries: ["Automotive", "Pharma", "AgriFood", "Aerospace"]
  },
  {
    id: "financiacion-defi",
    title: "Financiación DeFi",
    shortDesc: "Historial de entregas verificado en blockchain para acceder a crédito.",
    fullDesc: "Los pequeños proveedores a menudo no pueden acceder a financiación porque carecen de historial crediticio tradicional. PROCUREDATA permite usar el historial de entregas verificado en blockchain como colateral reputacional. Un agricultor que ha entregado puntualmente durante 5 años tiene una puntuación verificable que los bancos o protocolos DeFi pueden usar para ofrecer crédito.",
    icon: Landmark,
    badge: "Finance",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    actor: "CFO / Propietario PYME",
    problem: "Las PYMEs y agricultores tienen dificultades para acceder a crédito porque los bancos tradicionales no reconocen su historial de entregas como garantía. Sin crédito, no pueden crecer.",
    solution: "PROCUREDATA genera una puntuación de reputación basada en el historial de transacciones verificadas en blockchain. Esta puntuación se presenta a entidades financieras (bancos tradicionales o protocolos DeFi) como prueba de fiabilidad, desbloqueando acceso a crédito con mejores condiciones.",
    mermaidChart: `flowchart LR
    A[🌾 Agricultor] -->|Comparte| B[Historial Entregas]
    B -->|Verificado en| C[Blockchain]
    C -->|Score| D[Reputación: 98%]
    D -->|Presenta a| E[🏦 Banco/DeFi]
    E -->|Aprueba| F[💰 Crédito Tasa Reducida]`,
    testimonial: {
      quote: "Mi historial de 8 años de entregas puntuales me abrió las puertas a crédito que los bancos tradicionales siempre negaban. Ahora puedo expandir la finca.",
      author: "Pedro Álvarez",
      role: "Propietario",
      company: "Finca La Esperanza"
    },
    industries: ["Retail", "Construction", "Finance", "AgriFood"]
  },
  {
    id: "cadena-frio",
    title: "Auditoría Cadena Frío",
    shortDesc: "Sensores IoT registran temperatura inmutablemente para resolver disputas.",
    fullDesc: "El transporte de productos perecederos (farmacéuticos, alimentos) requiere mantener la cadena de frío. Cuando hay una disputa sobre quién rompió la cadena, es palabra contra palabra. PROCUREDATA conecta sensores IoT que registran cada lectura de temperatura en blockchain, creando un registro inmutable e indisputable.",
    icon: Thermometer,
    badge: "IoT",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    actor: "Director de Logística",
    problem: "Cuando un cargamento llega dañado por rotura de cadena de frío, nadie quiere asumir la responsabilidad. Los registros de temperatura son manipulables y cada parte presenta los que le convienen. Las disputas tardan meses en resolverse.",
    solution: "Sensores IoT envían lecturas a Edge Functions que verifican umbrales y notarizan cada lectura en blockchain. Si hay una brecha de temperatura, queda registrada con timestamp exacto. Las disputas se resuelven en minutos consultando el registro inmutable.",
    mermaidChart: `sequenceDiagram
    participant S as 🌡️ Sensor IoT
    participant EF as Edge Function
    participant BC as Blockchain
    participant A as Sistema Alertas
    
    loop Cada Hora
        S->>EF: Lectura Temperatura
        EF->>EF: Verificar Umbral
        alt Temperatura OK
            EF->>BC: Notarizar Lectura ✓
        else Temperatura Excedida
            EF->>BC: Notarizar Brecha ⚠️
            EF->>A: Alerta Inmediata
        end
    end`,
    testimonial: {
      quote: "La disputa sobre quién rompió la cadena de frío en un cargamento de vacunas se resolvió en 10 minutos consultando el registro blockchain. Antes tardábamos meses.",
      author: "Lars Johansson",
      role: "Director de Logística",
      company: "Maersk Cold"
    },
    industries: ["Pharma", "AgriFood", "Logistics"]
  },
  {
    id: "licencias-odrl",
    title: "Licencias ODRL",
    shortDesc: "Negociación dinámica de contratos con restricciones temporales.",
    fullDesc: "Los datos no se 'venden' sino que se licencian bajo condiciones específicas. ODRL (Open Digital Rights Language) permite definir restricciones como 'solo para investigación académica', 'solo 30 días', 'solo en territorio UE'. PROCUREDATA traduce estas restricciones en smart contracts que se auto-ejecutan, liberando o revocando acceso automáticamente.",
    icon: FileSignature,
    badge: "Legal",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    actor: "Director de Investigación",
    problem: "Negociar licencias de datos con múltiples proveedores requiere abogados, contratos a medida, y seguimiento manual del cumplimiento. Las restricciones temporales se olvidan y los accesos nunca se revocan.",
    solution: "El NegotiationChat de PROCUREDATA permite definir restricciones visualmente (duración, propósito, territorio). Estas se traducen a políticas ODRL estándar que se despliegan como smart contracts. El acceso se revoca automáticamente al expirar, sin intervención humana.",
    mermaidChart: `flowchart TD
    A[🔬 Investigador] -->|Abre| B[NegotiationChat]
    B -->|Define| C[Restricciones]
    C --> D{⏱️ 30 días}
    C --> E{📚 Solo Académico}
    C --> F{🇪🇺 Solo UE}
    D & E & F -->|Genera| G[📜 Política ODRL]
    G -->|Despliega| H[Smart Contract]
    H -->|Otorga| I[✅ Acceso Limitado]`,
    testimonial: {
      quote: "Negociamos acceso a datos de 6 farmacéuticas con restricciones específicas para cada una. Todo automatizado, los contratos se auto-ejecutan y revocan.",
      author: "Dr. Priya Sharma",
      role: "Directora de Investigación",
      company: "Oxford University"
    },
    industries: ["Pharma", "Finance", "Tech", "Aerospace"]
  }
];

export default function UseCases() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredUseCases = selectedIndustry === "all"
    ? USE_CASES
    : USE_CASES.filter(uc => uc.industries.includes(selectedIndustry));

  const getIndustryName = (id: string) => {
    return INDUSTRIES.find(ind => ind.id === id)?.name || id;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Inicio</span>
          </Link>
          <Link to="/auth">
            <Button variant="default" size="sm">
              Comenzar Ahora
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4">
              10 Soluciones Web3
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Casos de Uso Industriales
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre cómo PROCUREDATA transforma la cadena de suministro. 
              Desde verificación de identidad hasta financiación DeFi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-6 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar por Industria
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {INDUSTRIES.map((industry) => (
              <Button
                key={industry.id}
                variant={selectedIndustry === industry.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedIndustry(industry.id)}
                className="gap-2"
              >
                <industry.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{industry.name}</span>
                <span className="sm:hidden">{industry.name.slice(0, 3)}</span>
              </Button>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Mostrando {filteredUseCases.length} de {USE_CASES.length} casos de uso
            {selectedIndustry !== "all" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedIndustry("all")}
                className="ml-2 h-6 px-2 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Limpiar filtro
              </Button>
            )}
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 sticky top-[65px] z-40 bg-background/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {filteredUseCases.map((useCase) => (
                <motion.a
                  key={useCase.id}
                  href={`#${useCase.id}`}
                  className={`flex flex-col items-center gap-1 p-2 md:p-3 rounded-lg hover:bg-muted/50 transition-colors min-w-[60px] md:min-w-[80px] group`}
                  title={useCase.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout
                >
                  <div className={`p-2 rounded-lg ${useCase.bgColor} group-hover:scale-110 transition-transform`}>
                    <useCase.icon className={`h-4 w-4 md:h-5 md:w-5 ${useCase.color}`} />
                  </div>
                  <span className="text-[10px] md:text-xs text-muted-foreground text-center line-clamp-1">
                    {useCase.title.split(' ')[0]}
                  </span>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Use Cases Sections */}
      <div className="py-8 md:py-16">
        <AnimatePresence mode="wait">
          {filteredUseCases.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground mb-4">
                No hay casos de uso para esta industria.
              </p>
              <Button onClick={() => setSelectedIndustry("all")}>
                Ver Todos los Casos
              </Button>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {filteredUseCases.map((useCase, index) => (
                <motion.section
                  key={useCase.id}
                  id={useCase.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`py-12 md:py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
                >
                  <div className="container max-w-5xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-4 rounded-xl ${useCase.bgColor} shrink-0`}>
                        <useCase.icon className={`h-8 w-8 ${useCase.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="outline" className={useCase.color}>
                            {useCase.badge}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Actor: {useCase.actor}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold">{useCase.title}</h2>
                        {/* Industry Badges */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {useCase.industries.slice(0, 4).map((ind) => (
                            <Badge 
                              key={ind} 
                              variant="secondary" 
                              className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                              onClick={() => setSelectedIndustry(ind)}
                            >
                              {getIndustryName(ind)}
                            </Badge>
                          ))}
                          {useCase.industries.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{useCase.industries.length - 4} más
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

              {/* Full Description */}
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {useCase.fullDesc}
              </p>

              {/* Tabs */}
              <Tabs defaultValue="flow" className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="problem">El Problema</TabsTrigger>
                  <TabsTrigger value="solution">La Solución</TabsTrigger>
                  <TabsTrigger value="flow">Flujo Técnico</TabsTrigger>
                </TabsList>
                <TabsContent value="problem" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {useCase.problem}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="solution" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {useCase.solution}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="flow" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <MermaidDiagram chart={useCase.mermaidChart} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Testimonial */}
              <Card className="bg-gradient-to-br from-muted/50 to-muted/20 border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <blockquote className="text-lg italic mb-6 leading-relaxed">
                    "{useCase.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className={`${useCase.bgColor} ${useCase.color}`}>
                        {getInitials(useCase.testimonial.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{useCase.testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {useCase.testimonial.role}, {useCase.testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
                  </Card>
                </div>
              </motion.section>
            ))}
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* CTA Final */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Comienza tu Transformación Digital
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Únete a las empresas que ya están utilizando PROCUREDATA para 
              revolucionar su cadena de suministro con tecnología Web3.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/auth">
                  Prueba PROCUREDATA Gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/whitepaper">
                  Leer Whitepaper
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
