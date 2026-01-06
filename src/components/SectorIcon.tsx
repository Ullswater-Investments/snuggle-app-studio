import { 
  Factory,
  ShoppingBag, 
  Wheat,
  Truck, 
  Heart,
  Users,
  Car, 
  Zap, 
  Pill, 
  HardHat, 
  TrendingUp, 
  Rocket, 
  Monitor,
  Package,
  LucideIcon
} from "lucide-react";

// Sectores oficiales según Memoria Técnica (orden de prioridad)
// 1. Industrial (51%), 2. Comercio (15%), 3. Agroalimentario (12%)
// 4. Movilidad Sostenible (10%), 5. Salud (7%), 6. Economía Social (5%)

const sectorIconMap: Record<string, LucideIcon> = {
  // Sectores oficiales - Memoria Técnica
  "Industrial": Factory,
  "Comercio": ShoppingBag,
  "Agroalimentario": Wheat,
  "Movilidad Sostenible": Truck,
  "Salud": Heart,
  "Economía Social": Users,
  
  // Aliases y sectores legacy (compatibilidad)
  "Automotive": Car,
  "Energy": Zap,
  "Energía": Zap,
  "Pharma": Pill,
  "Retail": ShoppingBag,
  "Construction": HardHat,
  "Finance": TrendingUp,
  "Finanzas": TrendingUp,
  "Logistics": Truck,
  "Logística": Package,
  "AgriFood": Wheat,
  "Aerospace": Rocket,
  "Tech": Monitor,
  "Tecnología": Monitor,
  "General": Monitor,
};

interface SectorIconProps {
  sector: string;
  className?: string;
}

export const SectorIcon = ({ sector, className = "h-5 w-5" }: SectorIconProps) => {
  const IconComponent = sectorIconMap[sector] || Monitor;
  return <IconComponent className={className} />;
};

export const getSectorColor = (sector: string): string => {
  const colorMap: Record<string, string> = {
    // Sectores oficiales - Memoria Técnica
    "Industrial": "text-amber-600 dark:text-amber-400",
    "Comercio": "text-purple-600 dark:text-purple-400",
    "Agroalimentario": "text-lime-600 dark:text-lime-400",
    "Movilidad Sostenible": "text-cyan-600 dark:text-cyan-400",
    "Salud": "text-rose-600 dark:text-rose-400",
    "Economía Social": "text-emerald-600 dark:text-emerald-400",
    
    // Legacy
    "Automotive": "text-blue-600 dark:text-blue-400",
    "Energy": "text-yellow-600 dark:text-yellow-400",
    "Energía": "text-yellow-600 dark:text-yellow-400",
    "Pharma": "text-green-600 dark:text-green-400",
    "Retail": "text-purple-600 dark:text-purple-400",
    "Construction": "text-orange-600 dark:text-orange-400",
    "Finance": "text-emerald-600 dark:text-emerald-400",
    "Finanzas": "text-emerald-600 dark:text-emerald-400",
    "Logistics": "text-cyan-600 dark:text-cyan-400",
    "Logística": "text-cyan-600 dark:text-cyan-400",
    "AgriFood": "text-lime-600 dark:text-lime-400",
    "Aerospace": "text-indigo-600 dark:text-indigo-400",
    "Tech": "text-pink-600 dark:text-pink-400",
    "Tecnología": "text-pink-600 dark:text-pink-400",
  };
  return colorMap[sector] || "text-muted-foreground";
};

// Lista ordenada de sectores oficiales según Memoria Técnica
export const OFFICIAL_SECTOR_ORDER = [
  "Industrial",
  "Comercio", 
  "Agroalimentario",
  "Movilidad Sostenible",
  "Salud",
  "Economía Social",
] as const;
