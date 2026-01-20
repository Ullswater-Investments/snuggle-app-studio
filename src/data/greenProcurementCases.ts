import { 
  Pill, Ship, Cpu, Car, Beaker, Gem, Plane, Cloud, Zap, Package,
  Satellite, BookOpen, Coins, Recycle, Globe
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type InterventionType = "co-inversion" | "trazabilidad-forense" | "educacion-proveedores";

export interface GreenProcurementCase {
  id: string;
  company: string;
  program: string;
  country: string;
  sector: string;
  sectorCategory: "green-procurement";
  sectorIcon: LucideIcon;
  regulatoryContext: string;
  interventionType: InterventionType;
  challenge: string;
  strategy: string;
  impact: string;
  metric: string;
  metricLabel: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  blockchainProof: string;
}

export const greenProcurementCases: GreenProcurementCase[] = [
  {
    id: "novo-nordisk-returpen",
    company: "Novo Nordisk",
    program: "Programa Returpen",
    country: "Dinamarca",
    sector: "Farmacéutico",
    sectorCategory: "green-procurement",
    sectorIcon: Pill,
    regulatoryContext: "GMP, Bio-seguridad, Residuos peligrosos",
    interventionType: "educacion-proveedores",
    challenge: "La industria farmacéutica depende del plástico virgen y el vidrio de alta calidad por razones de esterilidad. Recuperar plumas de insulina usadas es una pesadilla logística y regulatoria (clasificadas como residuos biológicos peligrosos).",
    strategy: "Diseñaron una logística inversa para recuperar millones de plumas usadas. La clave fue la compra de tecnología de reciclaje: se asociaron con una firma especializada para separar el vidrio del plástico y el metal a escala industrial, transformando el plástico recuperado en sillas de diseño y lámparas.",
    impact: "Primer sistema circular a gran escala para dispositivos médicos inyectables, superando la barrera regulatoria de 'residuo peligroso' mediante procesos de descontaminación certificados.",
    metric: "1M+",
    metricLabel: "Plumas Recuperadas",
    description: "Sistema circular pionero para dispositivos médicos inyectables con descontaminación certificada.",
    color: "from-emerald-600 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0x7a1b...novo"
  },
  {
    id: "maersk-metanol-verde",
    company: "Maersk",
    program: "Metanol Verde Maritime",
    country: "Dinamarca",
    sector: "Logística Marítima",
    sectorCategory: "green-procurement",
    sectorIcon: Ship,
    regulatoryContext: "OMI - Organización Marítima Internacional",
    interventionType: "co-inversion",
    challenge: "Maersk encargó buques capaces de funcionar con metanol verde, pero el combustible no existía en el mercado a esa escala. Era el problema del 'huevo y la gallina'.",
    strategy: "Realizaron 'Off-take Agreements' (Acuerdos de compra garantizada) a largo plazo con productores de energía y desarrolladores de proyectos (como European Energy) antes de que las plantas existieran. Financiaron indirectamente la creación de una nueva industria de combustible.",
    impact: "Rompieron el mercado. Inauguraron el primer buque portacontenedores de metanol del mundo en 2023, asegurando el suministro en una cadena de valor que ellos mismos ayudaron a crear.",
    metric: "1º",
    metricLabel: "Buque Metanol Global",
    description: "Creación de una industria de combustible inexistente mediante acuerdos de compra anticipada.",
    color: "from-cyan-600 to-blue-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    blockchainProof: "0x3c2d...maersk"
  },
  {
    id: "apple-elysis-aluminio",
    company: "Apple + Alcoa + Rio Tinto",
    program: "Proyecto Elysis",
    country: "EE.UU./Canadá",
    sector: "Tecnología/Metalurgia",
    sectorCategory: "green-procurement",
    sectorIcon: Cpu,
    regulatoryContext: "Emisiones industriales, Calidad de materiales",
    interventionType: "co-inversion",
    challenge: "El aluminio es esencial para Apple (MacBooks, iPads), pero su fundición libera grandes cantidades de CO2. No había 'aluminio verde' con la pureza necesaria.",
    strategy: "Apple no solo compró el material, compró la I+D. Invirtió capital junto con los gigantes del aluminio (Alcoa y Rio Tinto) y el gobierno de Canadá para desarrollar una tecnología de fundición patentada que libera oxígeno en lugar de dióxido de carbono.",
    impact: "Crearon el primer aluminio de 'pureza comercial' libre de carbono directo. Apple aseguró la exclusiva inicial de este material para sus productos (ej. iPhone SE).",
    metric: "0",
    metricLabel: "CO₂ Directo",
    description: "Inversión en I+D para crear tecnología de fundición de aluminio que libera O₂ en vez de CO₂.",
    color: "from-slate-600 to-zinc-500",
    bgColor: "bg-slate-50 dark:bg-slate-950/30",
    textColor: "text-slate-600 dark:text-slate-400",
    blockchainProof: "0x8e4f...elysis"
  },
  {
    id: "bmw-acero-verde",
    company: "BMW Group",
    program: "Acero Verde e Hidrógeno",
    country: "Alemania",
    sector: "Automoción Premium",
    sectorCategory: "green-procurement",
    sectorIcon: Car,
    regulatoryContext: "Euro 7, Seguridad pasiva, Diligencia debida en cadena de suministro",
    interventionType: "trazabilidad-forense",
    challenge: "El acero representa una gran parte de las emisiones del Alcance 3 de un coche. Los hornos tradicionales usan carbón.",
    strategy: "BMW firmó contratos con la startup sueca H2 Green Steel y con Salzgitter AG. La condición de compra no fue solo 'precio/calidad', sino la trazabilidad energética: el acero debe producirse usando hidrógeno verde y electricidad renovable, no carbón de coque.",
    impact: "Reducción del 95% de las emisiones de CO2 en la producción de acero para sus componentes estructurales, adelantándose a las futuras tasas al carbono fronterizas de la UE (CBAM).",
    metric: "-95%",
    metricLabel: "CO₂ en Acero",
    description: "Trazabilidad energética que exige hidrógeno verde en la producción de acero estructural.",
    color: "from-blue-600 to-indigo-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    blockchainProof: "0x5b7c...bmw"
  },
  {
    id: "basf-biomasa-balance",
    company: "BASF",
    program: "Biomass Balance Approach",
    country: "Alemania",
    sector: "Química Industrial",
    sectorCategory: "green-procurement",
    sectorIcon: Beaker,
    regulatoryContext: "REACH - Registro, evaluación y restricción de sustancias químicas",
    interventionType: "educacion-proveedores",
    challenge: "Cambiar las materias primas fósiles (nafta/gas) por renovables en plantas químicas gigantes es técnicamente casi imposible sin reconstruir la fábrica entera.",
    strategy: "Implementaron el 'Biomass Balance Approach' certificado. Compran biogás o bionafta (de residuos orgánicos) y la inyectan al inicio de su sistema de producción integrado (Verbund). Aunque se mezcla con fósiles, asignan matemáticamente (mediante certificación auditada) la parte renovable a productos específicos.",
    impact: "Permite vender productos químicos complejos (aditivos, plásticos de ingeniería) con huella de carbono reducida o nula sin alterar la formulación química ni la seguridad, cumpliendo REACH.",
    metric: "100%",
    metricLabel: "Trazabilidad Biomasa",
    description: "Balance certificado de biomasa en producción química sin alterar rendimiento ni seguridad.",
    color: "from-purple-600 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    textColor: "text-purple-600 dark:text-purple-400",
    blockchainProof: "0x9d8e...basf"
  },
  {
    id: "kering-epl-lujo",
    company: "Kering (Gucci, Balenciaga)",
    program: "Environmental Profit & Loss",
    country: "Francia",
    sector: "Lujo/Moda",
    sectorCategory: "green-procurement",
    sectorIcon: Gem,
    regulatoryContext: "Propiedad Intelectual, CITES - especies protegidas, Trazabilidad",
    interventionType: "trazabilidad-forense",
    challenge: "La cadena de suministro del lujo es opaca (pieles exóticas, minería de oro, cachemira). Los riesgos reputacionales son inmensos.",
    strategy: "Desarrollaron el EP&L (Cuenta de Pérdidas y Ganancias Ambiental). Asignaron un valor monetario al impacto ambiental. Sus compradores no solo miran el coste en euros de una piel, sino su 'coste natural'. Compran oro certificado Fairmined y han invertido en granjas de pitones propias.",
    impact: "Control total de la cadena. Transformaron el aprovisionamiento de materias primas en un activo de marca, justificando los precios premium mediante ética y sostenibilidad verificable.",
    metric: "EP&L",
    metricLabel: "Coste Natural €",
    description: "Valoración monetaria del impacto ambiental integrada en decisiones de compra de lujo.",
    color: "from-amber-500 to-yellow-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    textColor: "text-amber-600 dark:text-amber-400",
    blockchainProof: "0x2f1a...kering"
  },
  {
    id: "airbus-saf-aviacion",
    company: "Airbus",
    program: "Vuelos con SAF",
    country: "Europa",
    sector: "Aeroespacial",
    sectorCategory: "green-procurement",
    sectorIcon: Plane,
    regulatoryContext: "EASA - Seguridad aérea extrema",
    interventionType: "co-inversion",
    challenge: "La aviación no tiene alternativa eléctrica viable para larga distancia. El SAF es 3-4 veces más caro que el queroseno y la normativa de seguridad de combustible es la más estricta del mundo.",
    strategy: "Airbus utiliza sus propios aviones de transporte (los gigantes Beluga) como banco de pruebas. Compran SAF para sus operaciones internas logísticas y vuelos de entrega a clientes. Están certificando sus aviones para volar con 100% SAF.",
    impact: "Al validar técnicamente el uso del 100% SAF en motores complejos, envían una señal de compra masiva a las refinerías para que aumenten la producción, reduciendo el riesgo para las aerolíneas comerciales.",
    metric: "100%",
    metricLabel: "SAF Certificado",
    description: "Validación técnica de combustible sostenible para aviación al 100% en operaciones propias.",
    color: "from-sky-600 to-blue-500",
    bgColor: "bg-sky-50 dark:bg-sky-950/30",
    textColor: "text-sky-600 dark:text-sky-400",
    blockchainProof: "0x4c3b...airbus"
  },
  {
    id: "google-cfe-247",
    company: "Google",
    program: "Carbon-Free Energy 24/7",
    country: "EE.UU./Global",
    sector: "Data Centers",
    sectorCategory: "green-procurement",
    sectorIcon: Cloud,
    regulatoryContext: "Eficiencia energética, Seguridad de datos",
    interventionType: "co-inversion",
    challenge: "Muchas empresas son 'carbono neutrales' comprando certificados baratos que compensan sus emisiones anuales. Pero cuando no hace sol ni viento, siguen usando energía sucia de la red.",
    strategy: "Google pasó de 'neutralidad anual' a 'Carbon-Free Energy (CFE) 24/7'. Sus contratos de compra de energía (PPA) son extremadamente complejos: combinan eólica, solar, baterías y geotermia en la misma región para asegurar que cada hora de consumo esté emparejada con producción limpia local.",
    impact: "Están forzando la modernización de las redes eléctricas locales y desarrollando tecnologías de almacenamiento que antes no eran rentables.",
    metric: "24/7",
    metricLabel: "Energía Limpia",
    description: "Matching horario de consumo con producción renovable local, no compensación anual.",
    color: "from-green-600 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    textColor: "text-green-600 dark:text-green-400",
    blockchainProof: "0x6e5d...google"
  },
  {
    id: "schneider-zero-carbon",
    company: "Schneider Electric",
    program: "Zero Carbon Project",
    country: "Francia",
    sector: "Automatización",
    sectorCategory: "green-procurement",
    sectorIcon: Zap,
    regulatoryContext: "Múltiples normativas industriales globales",
    interventionType: "educacion-proveedores",
    challenge: "Schneider ya es muy eficiente, pero el 90% de su huella de carbono proviene de sus 50,000 proveedores (emisiones de Alcance 3).",
    strategy: "No solo exigieron, educaron. Lanzaron el 'Zero Carbon Project' para sus 1,000 proveedores principales. Schneider actúa como consultora técnica gratuita para ellos, enseñándoles a medir CO2 y comprar renovables, pero condiciona la renovación de contratos a que reduzcan sus emisiones un 50% para 2025.",
    impact: "Democratización del conocimiento técnico. Han logrado que pymes industriales en Asia y Latinoamérica adopten estándares europeos de sostenibilidad para no perder el contrato.",
    metric: "1,000",
    metricLabel: "Proveedores Formados",
    description: "Consultoría técnica gratuita a proveedores condicionada a reducción del 50% de emisiones.",
    color: "from-lime-600 to-green-500",
    bgColor: "bg-lime-50 dark:bg-lime-950/30",
    textColor: "text-lime-600 dark:text-lime-400",
    blockchainProof: "0x1a2b...schneider"
  },
  {
    id: "unilever-palma-satelital",
    company: "Unilever",
    program: "Aceite de Palma Satelital",
    country: "Global",
    sector: "Gran Consumo (FMCG)",
    sectorCategory: "green-procurement",
    sectorIcon: Satellite,
    regulatoryContext: "EU Deforestation Regulation - EUDR",
    interventionType: "trazabilidad-forense",
    challenge: "Asegurar que el aceite de palma no provenga de zonas deforestadas. La cadena es caótica: miles de pequeños agricultores en Indonesia/Malasia venden a molinos intermedios que mezclan todo.",
    strategy: "Se asociaron con empresas de tecnología espacial (como Orbital Insight) para usar geolocalización GPS y monitoreo satelital de las plantaciones de sus proveedores. Si el satélite detecta pérdida de cubierta forestal en una coordenada vinculada a su cadena, el sistema alerta automáticamente.",
    impact: "Capacidad de cumplir con la nueva regulación anti-deforestación de la UE (EUDR) antes de que entrara en vigor, depurando su cadena de suministro de actores ilegales con precisión quirúrgica.",
    metric: "GPS",
    metricLabel: "Trazabilidad Satelital",
    description: "Monitoreo satelital de plantaciones para detectar deforestación en tiempo real.",
    color: "from-orange-600 to-amber-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    textColor: "text-orange-600 dark:text-orange-400",
    blockchainProof: "0x8f9e...unilever"
  }
];

export const interventionTypes = [
  { 
    id: "all" as const, 
    label: "Todos", 
    icon: Globe,
    description: "Ver todos los casos de Green Procurement"
  },
  { 
    id: "co-inversion" as const, 
    label: "Co-inversión", 
    icon: Coins,
    description: "Crear mercados inexistentes invirtiendo en I+D y capacidad antes de que existan"
  },
  { 
    id: "trazabilidad-forense" as const, 
    label: "Trazabilidad Forense", 
    icon: Satellite,
    description: "Usar satélites, blockchain y química para ver lo invisible en la cadena de suministro"
  },
  { 
    id: "educacion-proveedores" as const, 
    label: "Educación Proveedores", 
    icon: BookOpen,
    description: "Transferencia de conocimiento técnico para transformar toda la cadena"
  }
];
