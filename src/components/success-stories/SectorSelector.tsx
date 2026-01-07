import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Factory, Wheat, Truck, Heart, ShoppingBag, Zap, 
  Recycle, Sprout, LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SectorConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
}

const sectors: SectorConfig[] = [
  { 
    id: 'industrial', 
    label: 'Industrial', 
    icon: Factory, 
    color: 'text-orange-500',
    glowColor: 'shadow-orange-500/40'
  },
  { 
    id: 'agro', 
    label: 'Agroalimentario', 
    icon: Wheat, 
    color: 'text-emerald-500',
    glowColor: 'shadow-emerald-500/40'
  },
  { 
    id: 'movilidad', 
    label: 'Movilidad', 
    icon: Truck, 
    color: 'text-teal-500',
    glowColor: 'shadow-teal-500/40'
  },
  { 
    id: 'salud', 
    label: 'Salud', 
    icon: Heart, 
    color: 'text-rose-500',
    glowColor: 'shadow-rose-500/40'
  },
  { 
    id: 'comercio', 
    label: 'Comercio', 
    icon: ShoppingBag, 
    color: 'text-blue-500',
    glowColor: 'shadow-blue-500/40'
  },
  { 
    id: 'energia', 
    label: 'Energía', 
    icon: Zap, 
    color: 'text-yellow-500',
    glowColor: 'shadow-yellow-500/40'
  },
  { 
    id: 'circular', 
    label: 'Circular', 
    icon: Recycle, 
    color: 'text-green-500',
    glowColor: 'shadow-green-500/40'
  },
  { 
    id: 'agritech', 
    label: 'Agri-Tech', 
    icon: Sprout, 
    color: 'text-lime-500',
    glowColor: 'shadow-lime-500/40'
  },
];

interface SectorSelectorProps {
  currentSector: string;
  onSectorChange?: (sectorId: string) => void;
  compact?: boolean;
}

export const SectorSelector = ({ 
  currentSector, 
  onSectorChange,
  compact = false 
}: SectorSelectorProps) => {
  // Normalize sector name for matching
  const normalizedSector = currentSector.toLowerCase()
    .replace('agroalimentario', 'agro')
    .replace('movilidad sostenible', 'movilidad')
    .replace('economía social', 'social')
    .replace('energía industrial', 'energia')
    .replace('aeronáutica', 'industrial')
    .replace('economía circular', 'circular');

  const activeSector = sectors.find(s => 
    normalizedSector.includes(s.id) || s.id.includes(normalizedSector.split(' ')[0])
  ) || sectors[0];

  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-2">
      {sectors.map((sector) => {
        const Icon = sector.icon;
        const isActive = sector.id === activeSector.id;
        
        return (
          <Button
            key={sector.id}
            variant="ghost"
            size={compact ? "sm" : "default"}
            onClick={() => onSectorChange?.(sector.id)}
            className={cn(
              "relative flex items-center gap-2 rounded-full transition-all duration-300",
              "border border-transparent",
              isActive && [
                "bg-background/80 dark:bg-slate-800/80",
                "border-current",
                sector.color,
                `shadow-lg ${sector.glowColor}`,
              ],
              !isActive && "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn(
              "w-4 h-4 transition-colors",
              isActive && sector.color
            )} />
            {!compact && (
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {sector.label}
              </span>
            )}
            {isActive && (
              <span className={cn(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                sector.color.replace('text-', 'bg-')
              )} />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default SectorSelector;
