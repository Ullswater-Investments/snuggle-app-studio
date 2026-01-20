import { 
  Factory, 
  HeartPulse, 
  ShoppingBag, 
  Zap, 
  Users, 
  Wheat,
  LayoutGrid,
  Leaf,
  Recycle,
  LucideIcon
} from "lucide-react";

export interface SuperCategory {
  id: string;
  labelKey: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  activeBg: string;
  sectors: string[]; // Original sector categories that map to this super-category
}

export interface TransversalTag {
  id: string;
  labelKey: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  activeBg: string;
  isHighlighted: boolean;
}

// 6 Super-Categories that consolidate the original 13 sectors
export const superCategories: SuperCategory[] = [
  {
    id: "all",
    labelKey: "superCategories.all",
    icon: LayoutGrid,
    color: "text-slate-500",
    bgColor: "bg-slate-500/10",
    activeBg: "bg-primary",
    sectors: []
  },
  {
    id: "industria-infraestructura",
    labelKey: "superCategories.industriaInfraestructura",
    icon: Factory,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    activeBg: "bg-orange-500",
    sectors: ["industrial", "aeroespacial", "mineria", "puertos"]
  },
  {
    id: "salud-pharma",
    labelKey: "superCategories.saludPharma",
    icon: HeartPulse,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    activeBg: "bg-rose-500",
    sectors: ["salud", "farmaceutico"]
  },
  {
    id: "retail-consumo",
    labelKey: "superCategories.retailConsumo",
    icon: ShoppingBag,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    activeBg: "bg-blue-500",
    sectors: ["comercio", "moda", "lujo", "finanzas"]
  },
  {
    id: "movilidad-energia",
    labelKey: "superCategories.movilidadEnergia",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    activeBg: "bg-yellow-500",
    sectors: ["movilidad", "energia", "tecnologia"]
  },
  {
    id: "sector-publico",
    labelKey: "superCategories.sectorPublico",
    icon: Users,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    activeBg: "bg-violet-500",
    sectors: ["social", "gobierno"]
  },
  {
    id: "agroalimentario",
    labelKey: "superCategories.agroalimentario",
    icon: Wheat,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    activeBg: "bg-emerald-500",
    sectors: ["agroalimentario", "agritech"]
  }
];

// Transversal tags that cross all sectors
export const transversalTags: TransversalTag[] = [
  {
    id: "green-procurement",
    labelKey: "transversalTags.greenProcurement",
    icon: Leaf,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    activeBg: "bg-emerald-600",
    isHighlighted: true
  },
  {
    id: "circular",
    labelKey: "transversalTags.circular",
    icon: Recycle,
    color: "text-teal-600",
    bgColor: "bg-teal-600/10",
    activeBg: "bg-teal-600",
    isHighlighted: false
  }
];

// Helper function to get super-category from original sector
export function getSuperCategoryFromSector(sectorCategory: string): string {
  for (const superCat of superCategories) {
    if (superCat.sectors.includes(sectorCategory)) {
      return superCat.id;
    }
  }
  // If it's green-procurement, it should still show in its sector context
  if (sectorCategory === "green-procurement") {
    return "all"; // Green procurement cases appear when filtered by tag
  }
  return "all";
}

// Helper function to determine if a case should have green-procurement tag
export function shouldHaveGreenTag(caseItem: {
  sectorCategory: string;
  description?: string;
  title?: string;
}): boolean {
  // All cases in green-procurement category have the tag
  if (caseItem.sectorCategory === "green-procurement") {
    return true;
  }
  
  // All cases in circular category have the tag
  if (caseItem.sectorCategory === "circular") {
    return true;
  }
  
  // Check for green-related keywords in description or title
  const greenKeywords = [
    "sostenib", "renovable", "verde", "green", "esg", "co2", "carbono", 
    "emisiones", "reciclaje", "circular", "huella", "scope", "csrd",
    "energía limpia", "certificación", "gdo", "biomasa", "hidrógeno"
  ];
  
  const text = `${caseItem.title || ""} ${caseItem.description || ""}`.toLowerCase();
  return greenKeywords.some(keyword => text.includes(keyword));
}
