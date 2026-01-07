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
  Cpu,
  Recycle,
  CircleDot,
  Scale,
  Battery,
  Gem,
  Trash2,
  FileCheck2,
  Package
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
  // First 10 new cases
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
  },
  // ===== 10 NEW ENERGY & RENEWABLES CASES =====
  {
    id: "helios-fields",
    title: "Mantenimiento Predictivo Solar",
    company: "Helios Fields",
    sector: "Energía Solar",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "-25%",
    metricLabel: "Costes Reparación",
    description: "Telemetría IoT de 1M de lecturas diarias para detectar anomalías térmicas en inversores.",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    blockchainProof: "0x7a8b...solar"
  },
  {
    id: "aeolus-wind",
    title: "PPAs Programables con Smart Contracts",
    company: "Aeolus Wind",
    sector: "Energía Eólica",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "2s",
    metricLabel: "Conciliación PPA",
    description: "Liquidación instantánea de contratos PPA mediante Smart Contracts y EUROe.",
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    blockchainProof: "0x1c2d...wind"
  },
  {
    id: "h2-pure",
    title: "Certificación de Hidrógeno Verde",
    company: "H2-Pure",
    sector: "Hidrógeno Verde",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "+20%",
    metricLabel: "Valor de Venta",
    description: "GdO digital inmutable que certifica el vínculo parque eólico-electrolizador.",
    color: "from-emerald-400 to-green-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0x5f6g...h2pure"
  },
  {
    id: "poligono-ecolink",
    title: "Marketplace de Comunidad Energética",
    company: "Polígono Eco-Link",
    sector: "Autoconsumo Industrial",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "-15%",
    metricLabel: "Factura Eléctrica",
    description: "Gobernanza ODRL para intercambio de excedentes solares en tiempo real entre naves.",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    blockchainProof: "0x9h8i...peer"
  },
  {
    id: "gridflex-demand",
    title: "Certificados de Flexibilidad Smart Grid",
    company: "GridFlex",
    sector: "Smart Grid",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "0",
    metricLabel: "Apagones/Año",
    description: "Smart Alerts que activan protocolos de desconexión selectiva por incentivos en EUROe.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    textColor: "text-purple-600 dark:text-purple-400",
    blockchainProof: "0x3j2k...flex"
  },
  {
    id: "bateria-hub",
    title: "Arbitraje Energético con IA",
    company: "Batería-Hub",
    sector: "Almacenamiento",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "-3 años",
    metricLabel: "ROI Batería",
    description: "Algoritmos de IA predicen precios del pool para automatizar compra/venta de energía.",
    color: "from-indigo-500 to-violet-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    textColor: "text-indigo-600 dark:text-indigo-400",
    blockchainProof: "0x1l2m...storage"
  },
  {
    id: "bioheat-district",
    title: "Trazabilidad de Biomasa RED III",
    company: "BioHeat District",
    sector: "Biomasa",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "99%",
    metricLabel: "Cumplimiento RED",
    description: "DID por lote con geolocalización de tala para certificar limpieza forestal sostenible.",
    color: "from-amber-700 to-green-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    textColor: "text-amber-700 dark:text-amber-400",
    blockchainProof: "0x4n5o...biomass"
  },
  {
    id: "turbine-chain",
    title: "Acero Verde para Aerogeneradores",
    company: "Turbine-Chain",
    sector: "Cadena de Suministro",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "50M€",
    metricLabel: "Contrato Ganado",
    description: "Consolidación de emisiones Scope 3 de 15 proveedores de acero para reporte CSRD.",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    textColor: "text-orange-600 dark:text-orange-400",
    blockchainProof: "0x8p9q...scope3"
  },
  {
    id: "aquapower-nexus",
    title: "Gestión del Nexo Agua-Energía",
    company: "AquaPower",
    sector: "Hidráulica",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "+12%",
    metricLabel: "Eficiencia Hídrica",
    description: "Políticas ODRL regulan el uso de agua entre riego y generación eléctrica en tiempo real.",
    color: "from-blue-900 to-cyan-600",
    bgColor: "bg-slate-50 dark:bg-slate-950/30",
    textColor: "text-slate-700 dark:text-slate-400",
    blockchainProof: "0x2r3s...hydro"
  },
  {
    id: "smartcharge-ev",
    title: "Garantía de Origen para Usuarios EV",
    company: "Smart-Charge",
    sector: "Movilidad Eléctrica",
    sectorCategory: "energia",
    sectorIcon: Zap,
    metric: "+40%",
    metricLabel: "Fidelización EV",
    description: "API consulta al Nodo Notario para mostrar origen solar/eólico en la App de carga.",
    color: "from-lime-500 to-green-600",
    bgColor: "bg-lime-50 dark:bg-lime-950/30",
    textColor: "text-lime-600 dark:text-lime-400",
    blockchainProof: "0x6t7u...evcharge"
  },
  // ===== 10 NEW CIRCULAR ECONOMY CASES =====
  {
    id: "fiber-loop",
    title: "Trazabilidad de Fibra Post-Consumo",
    company: "Fiber-Loop",
    sector: "Reciclaje Textil",
    sectorCategory: "circular",
    sectorIcon: Recycle,
    metric: "100%",
    metricLabel: "Cumplimiento RAP",
    description: "Notarización blockchain del peso y calidad de fibra en cada transformación para evitar multas de greenwashing.",
    color: "from-emerald-600 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0xf1b3...fiber"
  },
  {
    id: "rare-earth-recover",
    title: "Minería Urbana de Tierras Raras",
    company: "Rare-Earth Recover",
    sector: "RAEE / E-Waste",
    sectorCategory: "circular",
    sectorIcon: Cpu,
    metric: "+45%",
    metricLabel: "Margen Venta",
    description: "Datasets de composición química con IA para vender a fundiciones especializadas vs gestores genéricos.",
    color: "from-violet-600 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-600 dark:text-violet-400",
    blockchainProof: "0xe8d7...raee"
  },
  {
    id: "alu-cycle",
    title: "Ahorro Energético del Aluminio Infinito",
    company: "Alu-Cycle",
    sector: "Aluminio Secundario",
    sectorCategory: "circular",
    sectorIcon: CircleDot,
    metric: "-95%",
    metricLabel: "Energía vs Virgen",
    description: "Smart Contract calcula CO2 ahorrado para emitir Certificados de Ahorro Energético (CAEs).",
    color: "from-slate-500 to-cyan-500",
    bgColor: "bg-slate-50 dark:bg-slate-950/30",
    textColor: "text-slate-600 dark:text-slate-400",
    blockchainProof: "0xa5c9...alu"
  },
  {
    id: "producer-trust",
    title: "Auditoría RAP Automática",
    company: "Producer-Trust",
    sector: "Certificación RAP",
    sectorCategory: "circular",
    sectorIcon: FileCheck2,
    metric: "1h",
    metricLabel: "Auditoría Anual",
    description: "Dashboard de cumplimiento RAP que agrega datos de múltiples Data Holders con firmas DID inmutables.",
    color: "from-indigo-600 to-blue-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    textColor: "text-indigo-600 dark:text-indigo-400",
    blockchainProof: "0xb2d4...rap"
  },
  {
    id: "eco-orchestrator",
    title: "Coordinación de SCRAPS",
    company: "Eco-Orchestrator",
    sector: "Gestión SCRAPS",
    sectorCategory: "circular",
    sectorIcon: Scale,
    metric: "-15%",
    metricLabel: "Ecotasa",
    description: "Multi-Tenant RLS asegura que cada socio solo ve su cuota mientras el SCRAP ve el agregado.",
    color: "from-amber-600 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    textColor: "text-amber-600 dark:text-amber-400",
    blockchainProof: "0xc3e5...scrap"
  },
  {
    id: "raw-market",
    title: "Marketplace de Materias Primas Secundarias",
    company: "Raw-Market",
    sector: "Revalorización",
    sectorCategory: "circular",
    sectorIcon: Package,
    metric: "+30%",
    metricLabel: "Ingresos vs Gestión",
    description: "Políticas ODRL aseguran que el comprador usa el residuo para reciclaje y no para vertedero.",
    color: "from-green-600 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    textColor: "text-green-600 dark:text-green-400",
    blockchainProof: "0xd4f6...raw"
  },
  {
    id: "battery-life",
    title: "Segunda Vida de Baterías EV",
    company: "Battery-Life",
    sector: "Baterías Litio",
    sectorCategory: "circular",
    sectorIcon: Battery,
    metric: "+5 años",
    metricLabel: "Vida Útil Extra",
    description: "Audit Logs inmutables certifican historial de uso para decidir reciclaje vs almacenamiento estacionario.",
    color: "from-cyan-600 to-blue-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    blockchainProof: "0xe5g7...battery"
  },
  {
    id: "urban-mining",
    title: "Certificación de Oro Ético Reciclado",
    company: "Urban Mining",
    sector: "Metales Preciosos",
    sectorCategory: "circular",
    sectorIcon: Gem,
    metric: "+10%",
    metricLabel: "Sobreprecio Ético",
    description: "Prueba de integridad blockchain que vincula lote de entrada (basura) con salida (lingote).",
    color: "from-yellow-500 to-amber-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    blockchainProof: "0xf6h8...gold"
  },
  {
    id: "waste-to-value",
    title: "Auditoría de Vertido Cero",
    company: "Waste-to-Value",
    sector: "Zero Waste",
    sectorCategory: "circular",
    sectorIcon: Trash2,
    metric: "99.9%",
    metricLabel: "Desviación Vertedero",
    description: "Conciliación automática entre el dato de salida de fábrica y entrada del reciclador via Webhooks.",
    color: "from-teal-600 to-green-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
    textColor: "text-teal-600 dark:text-teal-400",
    blockchainProof: "0xg7i9...zero"
  },
  {
    id: "green-gov-circular",
    title: "Licitación Pública de Plástico Local",
    company: "Green-Gov Circular",
    sector: "Compra Pública Verde",
    sectorCategory: "circular",
    sectorIcon: Building2,
    metric: "1:2.4",
    metricLabel: "SROI Local",
    description: "Validador DID Web3 confirma que el plástico proviene de la planta de reciclaje local.",
    color: "from-emerald-700 to-green-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-700 dark:text-emerald-400",
    blockchainProof: "0xh8j0...gov"
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
              37 Casos de Éxito Verificados
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 max-w-md mx-auto"
          >
            {/* ARIA Avatar */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full animate-pulse opacity-20" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ARIA
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                <TrendingUp className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2">
              Todavía estamos escribiendo historias en este sector
            </h3>
            <p className="text-muted-foreground mb-6">
              ¿Quieres ser la primera empresa en transformar tu industria con ProcureData?
            </p>
            <Link 
              to="/servicios" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Empieza tu historia
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;
