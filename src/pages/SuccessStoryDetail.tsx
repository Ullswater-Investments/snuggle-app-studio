import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Award,
  Factory,
  Wheat,
  Truck,
  Heart,
  Stethoscope,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Clock,
  Target,
  ExternalLink,
  Quote,
  TrendingUp,
  Plane,
  Wine,
  Thermometer,
  Ship,
  Building2,
  Mountain,
  Shirt,
  Receipt,
  Cpu,
  BarChart2,
  Sun,
  Wind,
  Droplets,
  Battery,
  TreePine,
  Gauge,
  Car,
  Recycle,
  CircleDot,
  Scale,
  Gem,
  Trash2,
  FileCheck2,
  Package
} from "lucide-react";
import { ROISimulator } from "@/components/ROISimulator";
import { AgroROISimulator } from "@/components/AgroROISimulator";
import { SocialImpactDashboard } from "@/components/SocialImpactDashboard";
import { MobilityScope3Report } from "@/components/success-stories/MobilityScope3Report";
import { HealthMaintenanceSimulator } from "@/components/success-stories/HealthMaintenanceSimulator";
import { RetailEthicsAudit } from "@/components/success-stories/RetailEthicsAudit";
import { EnergySmartContract } from "@/components/success-stories/EnergySmartContract";
import { SuccessStoryNavigator } from "@/components/success-stories/SuccessStoryNavigator";
import { SuccessVisualRenderer } from "@/components/success-stories/SuccessVisualRenderer";

const casesData: Record<string, {
  id: string;
  title: string;
  company: string;
  sector: string;
  sectorIcon: React.ElementType;
  metric: string;
  metricLabel: string;
  color: string;
  bgColor: string;
  textColor: string;
  blockchainProof: string;
  blockNumber: string;
  challenge: string;
  solution: string;
  services: string[];
  ariaQuote: string;
  simulator: "industrial" | "agro" | "social" | "mobility" | "health" | "retail" | "energy" | "aero" | "wine" | "pharma" | "customs" | "gov" | "mining" | "fashion" | "finance" | "grid" | "ai" | "solar" | "wind" | "hydrogen" | "community" | "smartgrid" | "storage" | "biomass" | "scope3" | "hydro" | "evcharge" | "fiber" | "ewaste" | "aluminum" | "rap" | "scrap" | "rawmarket" | "batterylife" | "urbanmining" | "zerowaste" | "govgreen";
}> = {
  "gigafactory-north": {
    id: "gigafactory-north",
    title: "Automatización de Homologación Industrial",
    company: "GigaFactory North",
    sector: "Industrial",
    sectorIcon: Factory,
    metric: "-85%",
    metricLabel: "Tiempo de Alta",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    textColor: "text-orange-600 dark:text-orange-400",
    blockchainProof: "0x8f3c7a2e1b9d4f6c8a0e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7",
    blockNumber: "#18,234,567",
    challenge: "El proceso de alta de proveedores metalúrgicos Tier 2 tardaba 22 días de media. Cada nuevo proveedor requería validaciones manuales de ISO 9001, IATF 16949 y certificaciones de seguridad laboral. El equipo de compras dedicaba más del 40% de su tiempo a tareas administrativas repetitivas.",
    solution: "Implementación del servicio 'Homologación Flash 24h' combinado con Pasaportes Digitales verificados en la red Pontus-X. Los proveedores suben sus certificaciones una sola vez y GigaFactory accede al Pasaporte Verificado en tiempo real, eliminando las validaciones duplicadas.",
    services: ["Homologación Flash 24h", "Wallet Web3 Empresarial", "Firma ODRL Automática", "Conector ERP Universal"],
    ariaQuote: "La automatización mediante políticas ODRL permitió que los contratos se firmaran automáticamente al cumplir los requisitos de seguridad. El equipo de compras ahora dedica su tiempo a negociación estratégica, no a perseguir documentos.",
    simulator: "industrial"
  },
  "olivetrust-coop": {
    id: "olivetrust-coop",
    title: "Trazabilidad ESG para Exportación de Aceite",
    company: "OliveTrust Coop",
    sector: "Agroalimentario",
    sectorIcon: Wheat,
    metric: "+12%",
    metricLabel: "Valor Exportación",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0x3a1b9c7e5d3f1a9b7c5e3d1f9a7b5c3e1d9f7a5b3c1e9d7f5a3b1c9e7d5f3a1b9",
    blockNumber: "#18,189,432",
    challenge: "OliveTrust necesitaba demostrar la huella hídrica real de sus explotaciones en Jaén para cumplir con el pliego de condiciones del distribuidor alemán Edeka. Cada certificación tradicional costaba 3.500€ y tardaba 45 días en obtenerse.",
    solution: "Captura automatizada de datos IoT de riego desde los sensores de campo y notarización de certificados de origen en blockchain. El Pasaporte Digital del Aceite incluye trazabilidad desde la finca hasta el punto de venta.",
    services: ["Certificación ESG Instantánea", "Notarización Blockchain", "Pasaporte Digital de Producto", "API de Trazabilidad"],
    ariaQuote: "El Pasaporte Digital de Proveedor eliminó la necesidad de 5 auditorías físicas redundantes. Ahora cada comprador europeo accede a los mismos datos verificados sin coste adicional para la cooperativa.",
    simulator: "agro"
  },
  "urbandeliver-bcn": {
    id: "urbandeliver-bcn",
    title: "Reporting Scope 3 para Financiación Sostenible",
    company: "UrbanDeliver BCN",
    sector: "Movilidad Sostenible",
    sectorIcon: Truck,
    metric: "1h",
    metricLabel: "Auditoría CSRD",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
    textColor: "text-teal-600 dark:text-teal-400",
    blockchainProof: "0x5d417c9a3b1e7f5d3a9c1b7e5f3a1d9c7b5e3a1f9d7c5b3a1e9f7d5c3b1a9e7f5",
    blockNumber: "#18,201,789",
    challenge: "UrbanDeliver necesitaba auditar las emisiones reales de su flota logística para acceder a un crédito verde de 2M€ del Green Finance Bank. Los informes manuales tardaban semanas y no eran aceptados por la entidad financiera.",
    solution: "Integración del Conector ERP Universal para extraer telemetría de consumo real de la flota (OBD-II) y generación automática de informe CSRD con emisiones Scope 1, 2 y 3 certificadas.",
    services: ["Conector ERP Universal", "Calculadora Scope 3", "Informe CSRD Automático", "Certificación Verde"],
    ariaQuote: "Gracias a la telemetría directa integrada con ProcureData, el Green Finance Bank aprobó el crédito verde en tiempo récord. La transparencia de datos eliminó las 12 semanas habituales de due diligence.",
    simulator: "mobility"
  },
  "alianza-social-hub": {
    id: "alianza-social-hub",
    title: "Medición de Impacto Social Verificable",
    company: "Alianza Social Hub",
    sector: "Economía Social",
    sectorIcon: Heart,
    metric: "1:3.8",
    metricLabel: "Ratio SROI",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-600 dark:text-violet-400",
    blockchainProof: "0x7e2fa3c81d9b5f7a3e1c9d5b7f3a1e9c7d5b3a1f9e7c5d3b1a9f7e5c3d1b9a7f5",
    blockNumber: "#18,156,321",
    challenge: `Alianza Social Hub agrupa a 15 centros especiales de empleo. El problema principal: Las grandes corporaciones con cuotas de reserva (LGD) necesitaban demostrar el impacto real de cada euro invertido en proveedores éticos. Los departamentos de RSC solo podían reportar gastos, no valor social generado.`,
    solution: `Implementación del Dashboard de Métricas SROI con tres pilares: 1) Monetización del Impacto con cálculo de ahorro en subsidios públicos. 2) Garantía Anti-Social-Washing con DID verificado en Pontus-X. 3) Reporte CSRD Automático para Memorias de Sostenibilidad.`,
    services: ["Dashboard SROI", "Auditoría Social Digital", "Pasaporte de Proveedor Ético", "Memoria de Sostenibilidad Automática", "Verificación DID Anti-Social-Washing"],
    ariaQuote: "Hemos verificado que el 100% de los proveedores cumplen con la LGD. Por cada euro invertido, se generan 3.8€ de valor social. El 78% de la inversión se reinvierte en economía local.",
    simulator: "social"
  },
  "biomed-hospital": {
    id: "biomed-hospital",
    title: "Disponibilidad Crítica de Equipos RM",
    company: "BioMed Hospital",
    sector: "Salud",
    sectorIcon: Stethoscope,
    metric: "-30%",
    metricLabel: "Fallos Críticos",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    textColor: "text-rose-600 dark:text-rose-400",
    blockchainProof: "0x9b4dc1e73a5f9b7d1e3c5a7f9b1d3e5c7a9f1b3d5e7c9a1f3b5d7e9c1a3f5b7d9",
    blockNumber: "#18,178,654",
    challenge: `El hospital sufría paradas imprevistas en sus equipos de Resonancia Magnética (RM), costando 15.000€ por día de inactividad y retrasando cirugías críticas. Sin visibilidad del estado real de los equipos ni posibilidad de compartir logs sin exponer datos de pacientes (GDPR).`,
    solution: `Implementación de Edge Functions para anonimizar datos de pacientes mientras se envían logs de error del imán en tiempo real al proveedor EcoTech Industrial. Modelo predictivo ML detecta fallos 72h antes. Alertas automáticas al proveedor de repuestos homologado.`,
    services: ["Conector IDS Seguro", "Anonimizador GDPR", "API Mantenimiento Predictivo", "Alertas Inteligentes", "Homologación Proveedores MRO"],
    ariaQuote: "Gracias al conector IDS, el hospital compartió los logs técnicos sin exponer ningún dato personal de pacientes. El modelo predictivo detecta fallos 72h antes, evitando paradas imprevistas.",
    simulator: "health"
  },
  "globalretail-prime": {
    id: "globalretail-prime",
    title: "Auditoría Ética de Cadena de Suministro",
    company: "GlobalRetail Prime",
    sector: "Comercio",
    sectorIcon: ShoppingBag,
    metric: "0",
    metricLabel: "Incidencias Éticas",
    color: "from-blue-500 to-sky-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    blockchainProof: "0x4a2c8e7f3b1d9a5c7e3f1b9d7a5c3e1f9b7d5a3c1e9f7b5d3a1c9e7f5b3d1a9c7",
    blockNumber: "#18,267,891",
    challenge: `Una multinacional de retail necesitaba asegurar que sus 200 proveedores textiles en Asia cumplían con la normativa SA8000 para evitar riesgos reputacionales. Auditorías presenciales costosas, documentos falsificables y ninguna garantía de continuidad entre inspecciones.`,
    solution: `Implementación del Pasaporte Digital de Proveedor con auditorías firmadas digitalmente por certificadoras externas. Políticas ODRL permiten que solo el comité de ética acceda a detalles sensibles. Trazabilidad blockchain garantiza integridad de certificados.`,
    services: ["Pasaporte Digital de Proveedor", "Auditoría Digital ISO", "ODRL License Validator", "Validador DID Web3", "Monitor Riesgo Proveedor"],
    ariaQuote: "La trazabilidad blockchain en Pontus-X garantiza que el certificado SA8000 no ha sido manipulado desde su emisión en origen. Cero incidencias éticas en la auditoría anual y +25% confianza del consumidor.",
    simulator: "retail"
  },
  "ecovolt-manufacturing": {
    id: "ecovolt-manufacturing",
    title: "Compra de Energía Renovable Automatizada",
    company: "EcoVolt Manufacturing",
    sector: "Energía Industrial",
    sectorIcon: Zap,
    metric: "100%",
    metricLabel: "Energía Renovable",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    blockchainProof: "0x6b3d9a1c5e7f3b1d9a5c7e3f1b9d7a5c3e1f9b7d5a3c1e9f7b5d3a1c9e7f5b3d1",
    blockNumber: "#18,289,456",
    challenge: `Una planta de aluminio necesitaba certificar que el 100% de su consumo era renovable para obtener beneficios fiscales. La conciliación de facturas y certificados de Garantía de Origen (GdO) tardaba meses, perdiendo incentivos fiscales.`,
    solution: `Automatización mediante Smart Contracts y EUROe. Contador IoT reporta consumo en tiempo real. Smart Contract compra automáticamente certificados GdO y paga en el mismo bloque. Conciliación contable instantánea y sello Carbon Neutral automático.`,
    services: ["Wallet Web3 Empresarial", "Pontus-X Notary Node", "Conector Universal ERP", "Carbon Tracker ISO 14064", "Certificación Green Partner"],
    ariaQuote: "El pago en EUROe permite que la transferencia de valor y el certificado de energía ocurran en el mismo bloque de blockchain. Conciliación contable instantánea, de meses a 12 segundos.",
    simulator: "energy"
  },
  "sky-aero-systems": {
    id: "sky-aero-systems",
    title: "Validación EN9100 en Tiempo Real",
    company: "SkyAero Systems",
    sector: "Aeronáutica",
    sectorIcon: Plane,
    metric: "-90%",
    metricLabel: "Tiempo Verificación",
    color: "from-blue-600 to-slate-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    blockchainProof: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3",
    blockNumber: "#18,301,234",
    challenge: "Validar certificados EN9100 de 120 proveedores globales de piezas críticas, un proceso que bloqueaba las licitaciones por meses debido a verificaciones manuales y documentación dispersa.",
    solution: "Auditoría Digital ISO vinculada a identidad DID del proveedor. Validación automática de vigencia contra el nodo de la entidad certificadora con actualización en tiempo real.",
    services: ["Auditoría Digital ISO", "Validador DID Web3", "Homologación Flash 24h", "API Certificadora"],
    ariaQuote: "En el sector aeroespacial, un papel caducado detiene un avión. Con ProcureData, el certificado se autogestiona y valida instantáneamente contra la fuente oficial.",
    simulator: "aero"
  },
  "vinosdoe-elite": {
    id: "vinosdoe-elite",
    title: "Trazabilidad de D.O. para Exportación",
    company: "VinosD.O. Elite",
    sector: "Agroalimentario",
    sectorIcon: Wine,
    metric: "+35%",
    metricLabel: "Confianza Mercado",
    color: "from-rose-700 to-amber-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    textColor: "text-rose-700 dark:text-rose-400",
    blockchainProof: "0xf4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2",
    blockNumber: "#18,342,901",
    challenge: "Falsificación de etiquetas de origen en el mercado asiático que dañaba la marca de una agrupación de bodegas con Denominación de Origen protegida.",
    solution: "Notarización de lotes y Denominaciones de Origen mediante Pontus-X. QR dinámico en botella vinculado a DID que prueba geolocalización de cosecha y embotellado.",
    services: ["Pontus-X Notary Node", "Pasaporte Digital de Producto", "Certificación D.O.", "API Trazabilidad"],
    ariaQuote: "La trazabilidad ya no es una promesa, es una prueba matemática grabada en el bloque #42901. Cada botella cuenta su historia verificable.",
    simulator: "wine"
  },
  "pharmacold-logistix": {
    id: "pharmacold-logistix",
    title: "Cadena de Frío con Smart Contracts",
    company: "PharmaCold Logistix",
    sector: "Salud",
    sectorIcon: Thermometer,
    metric: "0%",
    metricLabel: "Pérdida Viales",
    color: "from-red-500 to-white",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    textColor: "text-red-600 dark:text-red-400",
    blockchainProof: "0x9c8b7a6d5e4f3c2b1a0d9e8f7c6b5a4d3e2f1c0b9a8d7e6f5c4b3a2d1e0f9c8b7",
    blockNumber: "#18,378,567",
    challenge: "Pérdida del 5% de vacunas por roturas de cadena de frío no detectadas a tiempo durante el transporte internacional.",
    solution: "Telemetría IoT con liquidación de pagos condicionada via Smart Contracts. El pago en EUROe se bloquea si temperatura supera 8°C por más de 10 minutos.",
    services: ["Wallet EUROe", "Smart Contracts IoT", "Carbon Tracker", "Escrow Automático"],
    ariaQuote: "El contrato inteligente actúa como guardián de la salud pública, liberando el pago solo ante la calidad total verificada por sensores.",
    simulator: "pharma"
  },
  "portbcn-smart-trade": {
    id: "portbcn-smart-trade",
    title: "Despacho Aduanero Acelerado",
    company: "PortBCN Smart-Trade",
    sector: "Movilidad",
    sectorIcon: Ship,
    metric: "450€",
    metricLabel: "Ahorro/Container",
    color: "from-blue-800 to-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    blockchainProof: "0x5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3",
    blockNumber: "#18,401,234",
    challenge: "Despacho de aduanas lento (72h media) por falta de documentos de origen verificados de los proveedores internacionales.",
    solution: "Pasaporte Digital de Proveedor interoperable con sistemas portuarios. Conexión via Webhooks para validación KYB instantánea antes de llegada.",
    services: ["Pasaporte Digital de Proveedor", "Webhooks IDS", "Validación KYB", "Conector Portuario"],
    ariaQuote: "Los datos viajan más rápido que los barcos. La interoperabilidad IDS elimina las colas en la aduana de 72h a solo 4h.",
    simulator: "customs"
  },
  "ayuntamiento-etico": {
    id: "ayuntamiento-etico",
    title: "Contratación Pública Transparente",
    company: "Ayuntamiento Ético",
    sector: "Economía Social",
    sectorIcon: Building2,
    metric: "99%",
    metricLabel: "Transparencia",
    color: "from-violet-600 to-white",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-600 dark:text-violet-400",
    blockchainProof: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4",
    blockNumber: "#18,423,890",
    challenge: "Dificultad para verificar en tiempo real si las empresas licitadoras cumplen con la cuota de discapacidad (LGD).",
    solution: "Dashboard de Métricas SROI integrado en portal de contratación. Cálculo automático basado en nóminas verificadas y anonimizadas (GDPR).",
    services: ["Dashboard SROI", "Auditoría Social Digital", "Verificador LGD", "Memoria Sostenibilidad"],
    ariaQuote: "El impacto social es ahora una métrica financiera auditable, no una declaración de intenciones. Cada euro público maximiza su retorno social.",
    simulator: "gov"
  },
  "purelithium-sourcing": {
    id: "purelithium-sourcing",
    title: "Trazabilidad Ética de Minerales",
    company: "PureLithium Sourcing",
    sector: "Industrial",
    sectorIcon: Mountain,
    metric: "B-Corp",
    metricLabel: "Certificación",
    color: "from-slate-600 to-green-500",
    bgColor: "bg-slate-50 dark:bg-slate-950/30",
    textColor: "text-slate-600 dark:text-slate-400",
    blockchainProof: "0x8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0",
    blockNumber: "#18,456,123",
    challenge: "Demostrar que el litio no provenía de zonas con explotación infantil para el reporte CSRD de clientes automotrices.",
    solution: "Trazabilidad de proveedores Tier 3 mediante Gobernanza ODRL. Firma de políticas de 'Uso Ético' en cada eslabón de la cadena de suministro.",
    services: ["Gobernanza ODRL", "Conector ERP", "Reporte CSRD", "Certificación B-Corp"],
    ariaQuote: "La soberanía del dato permite rastrear la ética desde la mina hasta el coche eléctrico. Cada gramo de litio tiene historia verificable.",
    simulator: "mining"
  },
  "fastfashion-trace": {
    id: "fastfashion-trace",
    title: "Etiquetado Circular Verificado",
    company: "FastFashion Trace",
    sector: "Comercio",
    sectorIcon: Shirt,
    metric: "100%",
    metricLabel: "Etiquetado Verificado",
    color: "from-pink-400 to-green-600",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
    textColor: "text-pink-600 dark:text-pink-400",
    blockchainProof: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5",
    blockNumber: "#18,478,901",
    challenge: "Validar porcentaje de fibra reciclada en 1M de prendas para evitar acusaciones de Greenwashing y cumplir nueva regulación textil UE.",
    solution: "Intercambio de certificados de composición textil via Conectores ERP. Sincronización automática entre PLM y certificados en ProcureData.",
    services: ["Conectores ERP", "Raw Data Normalizer", "Certificación Textil", "Anti-Greenwashing"],
    ariaQuote: "Si el dato es sintético, la confianza es real. Validamos la circularidad hilo por hilo y eliminamos el riesgo de greenwashing.",
    simulator: "fashion"
  },
  "invoicetrust-b2b": {
    id: "invoicetrust-b2b",
    title: "Factoring Instantáneo con Score Verificado",
    company: "InvoiceTrust",
    sector: "Finanzas B2B",
    sectorIcon: Receipt,
    metric: "2M€",
    metricLabel: "Liquidez Liberada",
    color: "from-emerald-500 to-slate-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0xc1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
    blockNumber: "#18,501,567",
    challenge: "Pymes industriales sin adelantos de facturas por falta de historial crediticio verificado y scoring tradicional insuficiente.",
    solution: "Trade Finance Scoring basado en transacciones completadas. Score de solvencia inmutable basado en cumplimiento histórico de contratos ODRL.",
    services: ["Trade Finance Scoring", "Factoring Connect", "Wallet EUROe", "Historial Blockchain"],
    ariaQuote: "Tu comportamiento en el espacio de datos es tu mejor garantía financiera. El EUROe habilita el crédito instantáneo basado en confianza verificable.",
    simulator: "finance"
  },
  "gridflow-energy": {
    id: "gridflow-energy",
    title: "Comunidades Energéticas Industriales",
    company: "GridFlow",
    sector: "Energía",
    sectorIcon: Zap,
    metric: "50",
    metricLabel: "Naves Conectadas",
    color: "from-yellow-500 to-black",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    blockchainProof: "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6",
    blockNumber: "#18,534,890",
    challenge: "Comunidades energéticas industriales sin forma ágil de liquidar venta de excedentes entre naves vecinas del polígono.",
    solution: "Liquidación de micro-pagos mediante EUROe. Edge Functions disparan transacciones al leer datos de contadores IoT cada 15 minutos.",
    services: ["Edge Functions IoT", "Wallet Web3", "Liquidación Automática", "Mapa Comunidad Energética"],
    ariaQuote: "La energía y el dinero fluyen en el mismo cable digital gracias a la programabilidad Web3. Micro-pagos instantáneos entre vecinos industriales.",
    simulator: "grid"
  },
  "ailabs-research": {
    id: "ailabs-research",
    title: "Datasets Sintéticos para IA",
    company: "AI-Labs Research",
    sector: "Tecnología",
    sectorIcon: Cpu,
    metric: "-40%",
    metricLabel: "Tiempo Training",
    color: "from-purple-600 to-orange-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    textColor: "text-purple-600 dark:text-purple-400",
    blockchainProof: "0xf7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9",
    blockNumber: "#18,567,234",
    challenge: "Startup de IA necesitaba datasets reales de logística para entrenar modelos, pero las empresas temían fugas de datos competitivos.",
    solution: "Datasets Sintéticos con alta fidelidad estadística. Datos artificiales que mantienen patrones sin revelar proveedores reales ni datos sensibles.",
    services: ["Anonimizador GDPR", "Raw Data Normalizer", "Generador Sintético", "Privacy Protection"],
    ariaQuote: "Innovación sin exposición. Los datos sintéticos son la llave para la IA colaborativa en Europa con 100% de protección de privacidad.",
    simulator: "ai"
  },
  // ===== 10 NEW ENERGY & RENEWABLES CASES =====
  "helios-fields": {
    id: "helios-fields",
    title: "Mantenimiento Predictivo Solar con IoT",
    company: "Helios Fields",
    sector: "Energía Solar",
    sectorIcon: Sun,
    metric: "-25%",
    metricLabel: "Costes Reparación",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    blockchainProof: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    blockNumber: "#18,601,234",
    challenge: "Un operador de parques solares perdía un 8% de eficiencia anual por fallos en inversores no detectados a tiempo, generando pérdidas millonarias.",
    solution: "Intercambio de telemetría de paneles en tiempo real con proveedores de servicios técnicos vía ProcureData. Edge Functions procesan 1M de lecturas diarias detectando anomalías térmicas.",
    services: ["Edge Functions IoT", "Conector ERP Universal", "Alertas Inteligentes", "Pasaporte Digital de Activo"],
    ariaQuote: "Los datos de radiación y temperatura ahora disparan órdenes de trabajo automáticas en el ERP del mantenedor. El sol no espera a nadie.",
    simulator: "solar"
  },
  "aeolus-wind": {
    id: "aeolus-wind",
    title: "PPAs Programables con Liquidación Instantánea",
    company: "Aeolus Wind",
    sector: "Energía Eólica",
    sectorIcon: Wind,
    metric: "2s",
    metricLabel: "Conciliación PPA",
    color: "from-cyan-400 to-blue-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    blockchainProof: "0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    blockNumber: "#18,634,567",
    challenge: "Los contratos de compra de energía (PPA) tardaban 45 días en liquidarse debido a la conciliación manual de producción vs. precio de mercado.",
    solution: "Liquidación instantánea de PPAs mediante Smart Contracts y EUROe. El contrato lee el sensor del aerogenerador y ejecuta el pago al detectar la inyección en red.",
    services: ["Smart Contracts IoT", "Wallet EUROe", "Pontus-X Notary Node", "API Pool Eléctrico"],
    ariaQuote: "Hemos convertido el viento en liquidez inmediata. El flujo de caja del parque eólico ahora es síncrono a la generación en 2 segundos.",
    simulator: "wind"
  },
  "h2-pure": {
    id: "h2-pure",
    title: "Certificación de Origen Hidrógeno Verde",
    company: "H2-Pure",
    sector: "Hidrógeno Verde",
    sectorIcon: Droplets,
    metric: "+20%",
    metricLabel: "Valor de Venta",
    color: "from-emerald-400 to-green-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0x5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k",
    blockNumber: "#18,667,890",
    challenge: "Demostrar que el hidrógeno producido era 100% verde para acceder a subvenciones gubernamentales y exportación premium a Alemania.",
    solution: "Notarización en blockchain del vínculo entre el parque eólico de origen y la planta de electrólisis. Certificado de Origen (GdO) digital inmutable anclado en Pontus-X.",
    services: ["Pontus-X Notary Node", "Pasaporte Digital de Producto", "Certificación GdO", "API Subvenciones UE"],
    ariaQuote: "No solo vendes moléculas de hidrógeno, vendes la prueba matemática de que son sostenibles. El bloque #42901 lo certifica.",
    simulator: "hydrogen"
  },
  "poligono-ecolink": {
    id: "poligono-ecolink",
    title: "Marketplace de Comunidad Energética Industrial",
    company: "Polígono Eco-Link",
    sector: "Autoconsumo Industrial",
    sectorIcon: Factory,
    metric: "-15%",
    metricLabel: "Factura Eléctrica",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    blockchainProof: "0x9h8i7j6k5l4m3n2o1p0q9r8s7t6u5v4w3x2y1z0a9b8c7d6e5f4g3h2i1j0k9l8m",
    blockNumber: "#18,701,234",
    challenge: "Empresas de un mismo polígono no podían intercambiar excedentes de energía solar de forma ágil y legal, dependiendo de la red general.",
    solution: "Marketplace local de energía operado sobre el modelo IDSA. Gobernanza ODRL define precios de intercambio entre vecinos en tiempo real.",
    services: ["Gobernanza ODRL", "Wallet EUROe", "Smart Contracts P2P", "Mapa Comunidad Energética"],
    ariaQuote: "La soberanía energética se logra cuando los datos de consumo de un vecino se convierten en la oportunidad de ahorro de otro.",
    simulator: "community"
  },
  "gridflex-demand": {
    id: "gridflex-demand",
    title: "Certificados de Flexibilidad Smart Grid",
    company: "GridFlex",
    sector: "Smart Grid",
    sectorIcon: Gauge,
    metric: "0",
    metricLabel: "Apagones/12 meses",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    textColor: "text-purple-600 dark:text-purple-400",
    blockchainProof: "0x3j2k1l0m9n8o7p6q5r4s3t2u1v0w9x8y7z6a5b4c3d2e1f0g9h8i7j6k5l4m3n2o",
    blockNumber: "#18,734,567",
    challenge: "Sobrecarga en transformadores por el aumento de cargadores de vehículos eléctricos en zonas industriales, riesgo de apagones.",
    solution: "Emisión de Certificados de Flexibilidad. Las empresas reducen carga a petición de la red a cambio de incentivos en EUROe.",
    services: ["Smart Alerts", "Wallet EUROe", "API Operador Red", "Dashboard Flexibilidad"],
    ariaQuote: "La flexibilidad es la nueva moneda de la Smart Grid, y ProcureData es su banco central. Cero apagones en 12 meses.",
    simulator: "smartgrid"
  },
  "bateria-hub": {
    id: "bateria-hub",
    title: "Arbitraje Energético con IA Predictiva",
    company: "Batería-Hub",
    sector: "Almacenamiento",
    sectorIcon: Battery,
    metric: "-3 años",
    metricLabel: "ROI Batería",
    color: "from-indigo-500 to-violet-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    textColor: "text-indigo-600 dark:text-indigo-400",
    blockchainProof: "0x1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q",
    blockNumber: "#18,767,890",
    challenge: "Rentabilizar grandes sistemas de baterías almacenando energía barata y vendiéndola en picos de precio, ROI de 8 años.",
    solution: "Algoritmos de IA Analytics integrados con la Wallet de la empresa. Automatización de la compra/venta en el mercado diario basada en predicciones.",
    services: ["IA Analytics", "Wallet EUROe", "API Pool Eléctrico", "Dashboard Trading"],
    ariaQuote: "ARIA ahora predice el precio del pool y decide cuándo es el momento óptimo para cargar o descargar tu activo. ROI reducido de 8 a 5 años.",
    simulator: "storage"
  },
  "bioheat-district": {
    id: "bioheat-district",
    title: "Trazabilidad de Biomasa Directiva RED III",
    company: "BioHeat District",
    sector: "Biomasa",
    sectorIcon: TreePine,
    metric: "99%",
    metricLabel: "Cumplimiento RED",
    color: "from-amber-700 to-green-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    textColor: "text-amber-700 dark:text-amber-400",
    blockchainProof: "0x4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s",
    blockNumber: "#18,801,234",
    challenge: "Probar que el 100% de la madera provenía de limpiezas forestales sostenibles según la Directiva RED II/III para inspecciones medioambientales.",
    solution: "Trazabilidad de camiones y origen mediante Pasaporte Digital de Proveedor. Cada lote tiene un DID vinculado a la geolocalización de la tala.",
    services: ["Pasaporte Digital de Proveedor", "Validador DID Web3", "Geolocalización IoT", "Certificación RED III"],
    ariaQuote: "Rastreamos el dato desde el bosque hasta la caldera, garantizando que el calor generado es verdaderamente neutro.",
    simulator: "biomass"
  },
  "turbine-chain": {
    id: "turbine-chain",
    title: "Acero Verde para Aerogeneradores CSRD",
    company: "Turbine-Chain",
    sector: "Cadena de Suministro",
    sectorIcon: Factory,
    metric: "50M€",
    metricLabel: "Contrato Ganado",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    textColor: "text-orange-600 dark:text-orange-400",
    blockchainProof: "0x8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u",
    blockNumber: "#18,834,567",
    challenge: "Un fabricante de aerogeneradores necesitaba reportar la huella de carbono de fabricación (Scope 3) de 15 proveedores de acero para una licitación de 50M€.",
    solution: "Recopilación de datos de emisiones de proveedores Tier 3 vía ProcureData. Consolidación automática de informes CSRD agregando datos soberanos.",
    services: ["Calculadora Scope 3", "Auditoría CSRD Automática", "Conector ERP Universal", "Reporte Consolidado"],
    ariaQuote: "Ganar licitaciones hoy depende de cuántos datos verificados de tus proveedores eres capaz de mostrar. 50M€ adjudicados.",
    simulator: "scope3"
  },
  "aquapower-nexus": {
    id: "aquapower-nexus",
    title: "Gestión del Nexo Agua-Energía",
    company: "AquaPower",
    sector: "Hidráulica",
    sectorIcon: Droplets,
    metric: "+12%",
    metricLabel: "Eficiencia Hídrica",
    color: "from-blue-900 to-cyan-600",
    bgColor: "bg-slate-50 dark:bg-slate-950/30",
    textColor: "text-slate-700 dark:text-slate-400",
    blockchainProof: "0x2r3s4t5u6v7w8x9y0z1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w",
    blockNumber: "#18,867,890",
    challenge: "Coordinar el flujo de agua para riego agrícola y generación eléctrica sin conflictos de intereses entre Confederación Hidrográfica y Eléctrica.",
    solution: "Plataforma de datos compartidos con políticas ODRL que regulan el uso del agua basándose en sensores de nivel de embalse en tiempo real.",
    services: ["Gobernanza ODRL", "Sensores IoT Nivel", "API Confederación", "Dashboard Nexo"],
    ariaQuote: "La paz hídrica se construye con datos transparentes y compartidos entre sectores. Optimización del 12% en el uso del recurso.",
    simulator: "hydro"
  },
  "smartcharge-ev": {
    id: "smartcharge-ev",
    title: "Garantía de Origen para Usuarios EV",
    company: "Smart-Charge",
    sector: "Movilidad Eléctrica",
    sectorIcon: Car,
    metric: "+40%",
    metricLabel: "Fidelización EV",
    color: "from-lime-500 to-green-600",
    bgColor: "bg-lime-50 dark:bg-lime-950/30",
    textColor: "text-lime-600 dark:text-lime-400",
    blockchainProof: "0x6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y",
    blockNumber: "#18,901,234",
    challenge: "Los usuarios de vehículos eléctricos no confiaban en que la energía de los puntos de carga fuera realmente renovable, afectando la fidelización.",
    solution: "Visualización del origen de la energía en la App de carga mediante ProcureData. API de consulta instantánea al Nodo Notario de la red de transporte.",
    services: ["API Nodo Notario", "Pasaporte Digital de Energía", "Widget Mobile", "Certificación CO2"],
    ariaQuote: "El usuario final ahora puede ver en su móvil el hash de blockchain que certifica que su coche corre con sol o viento.",
    simulator: "evcharge"
  },
  // ===== 10 CIRCULAR ECONOMY CASES =====
  "fiber-loop": {
    id: "fiber-loop",
    title: "Trazabilidad de Fibra Post-Consumo",
    company: "Fiber-Loop",
    sector: "Reciclaje Textil",
    sectorIcon: Recycle,
    metric: "100%",
    metricLabel: "Cumplimiento RAP",
    color: "from-emerald-600 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0xf1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5",
    blockNumber: "#18,934,567",
    challenge: "Una marca de moda debía certificar que su nueva colección contenía un 40% de poliéster reciclado real para evitar multas de la Ley de Residuos y acusaciones de greenwashing.",
    solution: "Trazabilidad desde el recolector de ropa usada hasta la hilatura mediante Pasaporte Digital de Producto. Notarización blockchain del peso y calidad de la fibra en cada transformación.",
    services: ["Pasaporte Digital de Producto", "Pontus-X Notary Node", "Certificación RAP", "Anti-Greenwashing Validator"],
    ariaQuote: "He validado la trazabilidad desde el recolector social hasta tu hilatura. Tu certificación de 40% fibra reciclada es ahora un activo líquido para tu reporte CSRD.",
    simulator: "fiber"
  },
  "rare-earth-recover": {
    id: "rare-earth-recover",
    title: "Minería Urbana de Tierras Raras",
    company: "Rare-Earth Recover",
    sector: "RAEE / E-Waste",
    sectorIcon: Cpu,
    metric: "+45%",
    metricLabel: "Margen Venta",
    color: "from-violet-600 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-600 dark:text-violet-400",
    blockchainProof: "0xe8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6",
    blockNumber: "#18,967,890",
    challenge: "Planta de reciclaje de electrónica no lograba dar salida a sus placas de circuito debido a la falta de datos sobre la concentración de Tierras Raras (Neodimio, Disprosio).",
    solution: "Publicación de Datasets de Composición Química analizados por IA en el Marketplace. Edge Functions integran datos de espectrometría de masas directamente al activo de datos.",
    services: ["Edge Functions IoT", "Marketplace de Datos", "IA Analytics", "Pasaporte Digital de Residuo"],
    ariaQuote: "La IA ha detectado una concentración de Neodimio superior a la media. He publicado la oferta en el Marketplace con un 25% de margen extra.",
    simulator: "ewaste"
  },
  "alu-cycle": {
    id: "alu-cycle",
    title: "Ahorro Energético del Aluminio Infinito",
    company: "Alu-Cycle",
    sector: "Aluminio Secundario",
    sectorIcon: CircleDot,
    metric: "-95%",
    metricLabel: "Energía vs Virgen",
    color: "from-slate-500 to-cyan-500",
    bgColor: "bg-slate-50 dark:bg-slate-950/30",
    textColor: "text-slate-600 dark:text-slate-400",
    blockchainProof: "0xa5c9d3e7f1b5c9d3e7f1a5c9d3e7f1b5c9d3e7f1a5c9d3e7f1b5c9d3e7f1a5c9d3",
    blockNumber: "#19,001,234",
    challenge: "Un fabricante de latas de aluminio necesitaba demostrar el ahorro del 95% de energía (aluminio secundario vs primario) para obtener bonos de carbono.",
    solution: "Intercambio de certificados de origen de chatarra pre-consumo vía Conectores ERP. Smart Contract calcula automáticamente el ahorro de CO2 basándose en el peso del material reciclado.",
    services: ["Conectores ERP", "Smart Contracts", "Carbon Tracker ISO 14064", "Certificados CAE"],
    ariaQuote: "Al usar un 90% de material reciclado, tu factura energética ha bajado drásticamente. He notarizado el ahorro para que puedas emitir Certificados de Ahorro Energético.",
    simulator: "aluminum"
  },
  "producer-trust": {
    id: "producer-trust",
    title: "Auditoría RAP Automática",
    company: "Producer-Trust",
    sector: "Certificación RAP",
    sectorIcon: FileCheck2,
    metric: "1h",
    metricLabel: "Auditoría Anual",
    color: "from-indigo-600 to-blue-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    textColor: "text-indigo-600 dark:text-indigo-400",
    blockchainProof: "0xb2d4f6a8c0e2d4f6a8b0c2d4f6a8e0b2d4f6a8c0e2d4f6a8b0c2d4f6a8e0b2d4f6",
    blockNumber: "#19,034,567",
    challenge: "Productores sujetos a la Responsabilidad Ampliada del Productor perdían meses recopilando certificados de gestores de residuos dispersos para la auditoría anual.",
    solution: "Dashboard de cumplimiento RAP automático que agrega datos de múltiples Data Holders (gestores). Identidad SSI (DID) para que cada gestor firme la Hoja de Seguimiento de forma inmutable.",
    services: ["Dashboard RAP", "Identidad SSI", "Webhooks IDS", "Auditoría Digital Automática"],
    ariaQuote: "Tu reporte anual de puesta en mercado está listo. He conciliado los datos de tus 12 gestores mediante Webhooks. El sello de Cumplimiento RAP ya está anclado.",
    simulator: "rap"
  },
  "eco-orchestrator": {
    id: "eco-orchestrator",
    title: "Coordinación de SCRAPS - Eficiencia Colectiva",
    company: "Eco-Orchestrator",
    sector: "Gestión SCRAPS",
    sectorIcon: Scale,
    metric: "-15%",
    metricLabel: "Ecotasa",
    color: "from-amber-600 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    textColor: "text-amber-600 dark:text-amber-400",
    blockchainProof: "0xc3e5g7i9k1m3o5q7s9u1w3y5a7c9e1g3i5k7m9o1q3s5u7w9y1a3c5e7g9i1k3m5o7",
    blockNumber: "#19,067,890",
    challenge: "Un SCRAP con 500 empresas asociadas tenía dificultades para repartir costes y beneficios de forma justa sin revelar secretos comerciales entre competidores.",
    solution: "Modelo IDSA para compartir datos de puesta en mercado y reciclaje final. Multi-Tenant RLS asegura que cada socio solo ve su cuota mientras el SCRAP ve el agregado.",
    services: ["Gobernanza ODRL", "Multi-Tenant RLS", "Dashboard Ecomodulación", "API SCRAP"],
    ariaQuote: "Gracias a tu diseño circular con monomateriales, el SCRAP te ha aplicado una bonificación del 15% en la ecotasa de este trimestre.",
    simulator: "scrap"
  },
  "raw-market": {
    id: "raw-market",
    title: "Marketplace de Materias Primas Secundarias",
    company: "Raw-Market",
    sector: "Revalorización",
    sectorIcon: Package,
    metric: "+30%",
    metricLabel: "Ingresos vs Gestión",
    color: "from-green-600 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    textColor: "text-green-600 dark:text-green-400",
    blockchainProof: "0xd4f6h8j0l2n4p6r8t0v2x4z6b8d0f2h4j6l8n0p2r4t6v8x0z2b4d6f8h0j2l4n6p8",
    blockNumber: "#19,101,234",
    challenge: "Empresas con excedentes industriales (mermas de aluminio, plástico) no encontraban compradores que pagaran el valor real del material.",
    solution: "Marketplace de Oportunidades de Revalorización con especificaciones técnicas certificadas. Gobernanza ODRL asegura que el comprador usa el residuo para reciclaje.",
    services: ["Marketplace Circular", "Gobernanza ODRL", "Certificación Pureza", "Wallet EUROe"],
    ariaQuote: "No lo llames residuo, llámalo recurso. Al certificar la pureza de tu merma al 99% con ProcureData, encontraste comprador que paga el doble.",
    simulator: "rawmarket"
  },
  "battery-life": {
    id: "battery-life",
    title: "Segunda Vida de Baterías EV",
    company: "Battery-Life",
    sector: "Baterías Litio",
    sectorIcon: Battery,
    metric: "+5 años",
    metricLabel: "Vida Útil Extra",
    color: "from-cyan-600 to-blue-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    blockchainProof: "0xe5g7i9k1m3o5q7s9u1w3y5a7c9e1g3i5k7m9o1q3s5u7w9y1a3c5e7g9i1k3m5o7q9",
    blockNumber: "#19,134,567",
    challenge: "Determinar el estado de salud (SoH) de baterías usadas para decidir si van a reciclaje de materiales o a una segunda vida en almacenamiento estacionario.",
    solution: "Compartición soberana de los logs de carga/descarga desde el fabricante del coche al reciclador. Audit Logs Inmutables en Pontus-X certifican el historial de uso.",
    services: ["Audit Logs Inmutables", "Pasaporte Digital de Batería", "API SoH", "Marketplace Segunda Vida"],
    ariaQuote: "Tu batería tiene un SoH del 82%. Según el mercado de Segunda Vida, es apta para almacenamiento solar doméstico. He generado el Pasaporte Digital.",
    simulator: "batterylife"
  },
  "urban-mining": {
    id: "urban-mining",
    title: "Certificación de Oro Ético Reciclado",
    company: "Urban Mining",
    sector: "Metales Preciosos",
    sectorIcon: Gem,
    metric: "+10%",
    metricLabel: "Sobreprecio Ético",
    color: "from-yellow-500 to-amber-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    blockchainProof: "0xf6h8j0l2n4p6r8t0v2x4z6b8d0f2h4j6l8n0p2r4t6v8x0z2b4d6f8h0j2l4n6p8r0",
    blockNumber: "#19,167,890",
    challenge: "Joyerías y empresas de tecnología necesitaban certificar que su oro/plata era 100% Reciclado para cumplir con estándares éticos y la normativa OCDE.",
    solution: "Notarización del proceso de refino desde el residuo electrónico hasta el lingote secundario. Prueba de integridad blockchain vincula lote de entrada con salida.",
    services: ["Pontus-X Notary Node", "Certificación Oro Ético", "Trazabilidad Refino", "Sello OCDE"],
    ariaQuote: "Certificación de Oro Ético completada. Hemos vinculado cada gramo de este lote a una transacción de reciclaje nacional cumpliendo estándares OCDE.",
    simulator: "urbanmining"
  },
  "waste-to-value": {
    id: "waste-to-value",
    title: "Auditoría de Vertido Cero",
    company: "Waste-to-Value",
    sector: "Zero Waste",
    sectorIcon: Trash2,
    metric: "99.9%",
    metricLabel: "Desviación Vertedero",
    color: "from-teal-600 to-green-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
    textColor: "text-teal-600 dark:text-teal-400",
    blockchainProof: "0xg7i9k1m3o5q7s9u1w3y5a7c9e1g3i5k7m9o1q3s5u7w9y1a3c5e7g9i1k3m5o7q9s1",
    blockNumber: "#19,201,234",
    challenge: "Corporaciones con objetivos de Vertido Cero no podían demostrar fehacientemente qué pasaba con sus residuos una vez salían de la fábrica.",
    solution: "Rastreo del flujo de residuos mediante Webhooks conectados a las básculas de los gestores finales. Conciliación automática entre dato de salida y entrada.",
    services: ["Webhooks IDS", "Conectores ERP", "Dashboard Vertido Cero", "Certificación ISO 14001"],
    ariaQuote: "99.8% de Vertido Cero alcanzado. He verificado que el rechazo de tu planta se usa como combustible derivado de residuos. Tu auditoría ISO 14001 será impecable.",
    simulator: "zerowaste"
  },
  "green-gov-circular": {
    id: "green-gov-circular",
    title: "Licitación Pública de Plástico Local",
    company: "Green-Gov Circular",
    sector: "Compra Pública Verde",
    sectorIcon: Building2,
    metric: "1:2.4",
    metricLabel: "SROI Local",
    color: "from-emerald-700 to-green-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-700 dark:text-emerald-400",
    blockchainProof: "0xh8j0l2n4p6r8t0v2x4z6b8d0f2h4j6l8n0p2r4t6v8x0z2b4d6f8h0j2l4n6p8r0t2",
    blockNumber: "#19,234,567",
    challenge: "Un ayuntamiento quería comprar mobiliario urbano hecho con plástico reciclado local, pero no sabía cómo validar el origen del plástico.",
    solution: "Exigencia de Pasaporte de Materia Prima Secundaria de ProcureData en los pliegos. Validador DID Web3 confirma que el plástico proviene de la planta de reciclaje local.",
    services: ["Validador DID Web3", "Pasaporte Materia Prima", "Dashboard SROI", "Certificación Local"],
    ariaQuote: "El ayuntamiento ha verificado el origen del plástico mediante el Validador DID. Estás comprando circularidad real, no promesas. El SROI es de 1:2.4.",
    simulator: "govgreen"
  }
};

const SuccessStoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const caseData = id ? casesData[id] : null;

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Caso no encontrado</h2>
          <Link to="/success-stories">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Casos de Éxito
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const SectorIcon = caseData.sectorIcon;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${caseData.bgColor} border-b`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-8 md:py-16 relative">
          <Link to="/success-stories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver a Casos de Éxito
          </Link>
          
          {/* Navigator */}
          <div className="mb-8">
            <SuccessStoryNavigator compact />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`${caseData.bgColor} ${caseData.textColor} border-0`}>
                  <SectorIcon className="w-3 h-3 mr-1" />
                  {caseData.sector}
                </Badge>
                <Badge variant="outline" className="font-mono text-xs">
                  <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
                  Verificado en Pontus-X
                </Badge>
              </div>

              <div>
                <p className="text-lg text-muted-foreground font-medium">{caseData.company}</p>
                <h1 className="text-3xl md:text-4xl font-bold mt-2">{caseData.title}</h1>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    {caseData.metricLabel}
                  </p>
                  <p className={`text-4xl font-bold bg-gradient-to-r ${caseData.color} bg-clip-text text-transparent`}>
                    {caseData.metric}
                  </p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Bloque
                  </p>
                  <p className="text-lg font-mono font-semibold">{caseData.blockNumber}</p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-background/80 backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${caseData.color} flex items-center justify-center`}>
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold">Prueba Blockchain</p>
                  <p className="text-xs text-muted-foreground">Transacción inmutable</p>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg font-mono text-xs break-all">
                {caseData.blockchainProof}
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <ExternalLink className="w-3 h-3 mr-2" />
                Ver en Pontus-X Explorer
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" />
                El Reto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{caseData.challenge}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                La Solución
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{caseData.solution}</p>
            </CardContent>
          </Card>
        </div>

        {/* Services Used */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Servicios ProcureData Utilizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {caseData.services.map((service, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm py-1.5 px-3">
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ARIA Quote */}
        <Card className={`${caseData.bgColor} border-0`}>
          <CardContent className="p-8">
            <div className="flex gap-4">
              <Quote className={`w-8 h-8 ${caseData.textColor} shrink-0`} />
              <div>
                <p className="text-lg italic leading-relaxed mb-4">"{caseData.ariaQuote}"</p>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${caseData.color}`} />
                  <div>
                    <p className="font-bold text-sm">ARIA</p>
                    <p className="text-xs text-muted-foreground">Asistente de ProcureData</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sector-Specific Visualization for new cases */}
        {["aero", "wine", "pharma", "customs", "gov", "mining", "fashion", "finance", "grid", "ai", "solar", "wind", "hydrogen", "community", "smartgrid", "storage", "biomass", "scope3", "hydro", "evcharge", "fiber", "ewaste", "aluminum", "rap", "scrap", "rawmarket", "batterylife", "urbanmining", "zerowaste", "govgreen"].includes(caseData.simulator) && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Panel de Impacto Sectorial</h2>
            </div>
            <SuccessVisualRenderer caseId={caseData.id} />
          </div>
        )}

        {/* Impact Simulator for original cases */}
        {["industrial", "agro", "social", "mobility", "health", "retail", "energy"].includes(caseData.simulator) && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Simulador de Impacto</h2>
            </div>
            
            {caseData.simulator === "industrial" && <ROISimulator />}
            {caseData.simulator === "agro" && <AgroROISimulator />}
            {caseData.simulator === "social" && <SocialImpactDashboard spend={150000} />}
            {caseData.simulator === "mobility" && <MobilityScope3Report fleetSize={45} electricPercentage={35} />}
            {caseData.simulator === "health" && <HealthMaintenanceSimulator />}
            {caseData.simulator === "retail" && <RetailEthicsAudit />}
            {caseData.simulator === "energy" && <EnergySmartContract />}
          </div>
        )}

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Quieres lograr resultados similares?</h3>
            <p className="mb-6 opacity-90">
              Descubre cómo ProcureData puede transformar tus procesos de compras y demostrar tu impacto ESG.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/catalog">
                <Button variant="secondary" size="lg">
                  Explorar Catálogo
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Ver Servicios
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessStoryDetail;
