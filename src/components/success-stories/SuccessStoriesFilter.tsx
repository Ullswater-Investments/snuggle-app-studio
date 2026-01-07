import React from 'react';
import { 
  Factory, ShoppingBag, Wheat, Truck, 
  HeartPulse, Users, Zap, LayoutGrid, 
  Plane, Receipt, Mountain, Wine, Cpu, Recycle
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const sectors = [
  { id: 'all', label: 'Todos', icon: LayoutGrid, color: 'text-slate-500', bg: 'bg-slate-500/10', activeBg: 'bg-primary' },
  { id: 'industrial', label: 'Industrial', icon: Factory, color: 'text-orange-500', bg: 'bg-orange-500/10', activeBg: 'bg-orange-500' },
  { id: 'comercio', label: 'Comercio', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10', activeBg: 'bg-blue-500' },
  { id: 'agroalimentario', label: 'Agro', icon: Wheat, color: 'text-emerald-500', bg: 'bg-emerald-500/10', activeBg: 'bg-emerald-500' },
  { id: 'movilidad', label: 'Movilidad', icon: Truck, color: 'text-teal-500', bg: 'bg-teal-500/10', activeBg: 'bg-teal-500' },
  { id: 'salud', label: 'Salud', icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-500/10', activeBg: 'bg-rose-500' },
  { id: 'social', label: 'Social', icon: Users, color: 'text-violet-500', bg: 'bg-violet-500/10', activeBg: 'bg-violet-500' },
  { id: 'energia', label: 'Energía', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10', activeBg: 'bg-yellow-500' },
  { id: 'finanzas', label: 'Finanzas', icon: Receipt, color: 'text-green-500', bg: 'bg-green-500/10', activeBg: 'bg-green-500' },
  { id: 'tecnologia', label: 'Tech', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-500/10', activeBg: 'bg-purple-500' },
  { id: 'circular', label: 'Circular', icon: Recycle, color: 'text-emerald-600', bg: 'bg-emerald-600/10', activeBg: 'bg-emerald-600' },
];

interface SuccessStoriesFilterProps {
  activeSector: string;
  onSectorChange: (sector: string) => void;
  sectorCounts: Record<string, number>;
}

export function SuccessStoriesFilter({ activeSector, onSectorChange, sectorCounts }: SuccessStoriesFilterProps) {
  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b py-4 mb-8">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max px-1">
          {sectors.map((sector) => {
            const isActive = activeSector === sector.id;
            const Icon = sector.icon;
            const count = sector.id === 'all' 
              ? Object.values(sectorCounts).reduce((a, b) => a + b, 0)
              : sectorCounts[sector.id] || 0;
            
            return (
              <motion.button
                key={sector.id}
                onClick={() => onSectorChange(sector.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                  isActive 
                    ? cn(sector.activeBg, "text-white shadow-lg scale-105") 
                    : cn("text-muted-foreground hover:text-foreground", sector.bg, "hover:shadow-md")
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{sector.label}</span>
                {count > 0 && (
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
