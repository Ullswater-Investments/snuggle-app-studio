import { 
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
  LucideIcon
} from "lucide-react";

const sectorIconMap: Record<string, LucideIcon> = {
  Automotive: Car,
  Energy: Zap,
  Pharma: Pill,
  Retail: ShoppingBag,
  Construction: HardHat,
  Finance: TrendingUp,
  Logistics: Truck,
  AgriFood: Wheat,
  Aerospace: Rocket,
  Tech: Monitor,
  General: Monitor,
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
    Automotive: "text-blue-600 dark:text-blue-400",
    Energy: "text-yellow-600 dark:text-yellow-400",
    Pharma: "text-green-600 dark:text-green-400",
    Retail: "text-purple-600 dark:text-purple-400",
    Construction: "text-orange-600 dark:text-orange-400",
    Finance: "text-emerald-600 dark:text-emerald-400",
    Logistics: "text-cyan-600 dark:text-cyan-400",
    AgriFood: "text-lime-600 dark:text-lime-400",
    Aerospace: "text-indigo-600 dark:text-indigo-400",
    Tech: "text-pink-600 dark:text-pink-400",
  };
  return colorMap[sector] || "text-muted-foreground";
};
