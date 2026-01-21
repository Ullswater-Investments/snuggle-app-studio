// Constantes oficiales según Memoria Técnica PROCUREDATA
// Referencia: Documento oficial del proyecto financiado por NextGenerationEU

// Sectores oficiales según Memoria Técnica - Apartado 1.3 "Sector Estratégico"
export const OFFICIAL_SECTORS = [
  { id: "industrial", label: "Industrial", priority: 1, targetShare: 51, icon: "Factory" },
  { id: "comercio", label: "Comercio", priority: 2, targetShare: 15, icon: "ShoppingBag" },
  { id: "agroalimentario", label: "Agroalimentario", priority: 3, targetShare: 12, icon: "Wheat" },
  { id: "movilidad_sostenible", label: "Movilidad Sostenible", priority: 4, targetShare: 10, icon: "Truck" },
  { id: "salud", label: "Salud", priority: 5, targetShare: 7, icon: "Heart" },
  { id: "economia_social", label: "Economía Social", priority: 6, targetShare: 5, icon: "Users" },
] as const;

// Precios oficiales según Plan de Negocio
export const OFFICIAL_PRICING = {
  transactionFee: 1.00,        // EUROe por alta de proveedor
  annualMembership: 100,       // EUROe/año membresía base
  currency: "EUROe",
} as const;

// Componentes del Data Space Europeo (PONTUS-X / Web3 Stack)
export const EUROPEAN_STACK = [
  {
    name: "Ocean Provider (PONTUS-X)",
    description: "Nodo descentralizado para acceso a datos vía smart contracts",
    status: "activo",
    category: "provider"
  },
  {
    name: "Aquarius Metadata Cache",
    description: "Indexador descentralizado de activos de datos (DDO)",
    status: "activo",
    category: "indexer"
  },
  {
    name: "DIDs + Verifiable Credentials",
    description: "Identidad auto-soberana basada en blockchain",
    status: "activo",
    category: "identity"
  },
  {
    name: "Gaia-X Trust Framework",
    description: "Marco de confianza europeo con smart contracts",
    status: "activo",
    category: "trust"
  },
] as const;

// Textos oficiales según Resumen Ejecutivo
export const OFFICIAL_COPY = {
  title: "PROCUREDATA",
  tagline: "Espacio de Datos para la Función de Compras",
  subtitle: "Solución al problema 'nxm' en el alta de proveedores mediante identidades compartidas",
  useCase: "El caso de uso principal permite el alta automática de un nuevo proveedor en tu ERP a partir de datos ya validados por otros clientes (Industrial, Comercio, Agro), eliminando la burocracia manual.",
  funding: {
    eu: "Financiado por la Unión Europea - NextGenerationEU",
    plan: "Plan de Recuperación, Transformación y Resiliencia",
    ministry: "Ministerio para la Transformación Digital y de la Función Pública",
    full: "Financiado por la Unión Europea - NextGenerationEU. Plan de Recuperación, Transformación y Resiliencia. Ministerio para la Transformación Digital y de la Función Pública."
  }
} as const;

// Links de transparencia
export const TRANSPARENCY_LINKS = [
  { label: "Memoria Técnica", href: "/docs/tecnico" },
  { label: "Modelo de Gobernanza", href: "/architecture" },
  { label: "Especificaciones Técnicas", href: "/whitepaper" },
] as const;
