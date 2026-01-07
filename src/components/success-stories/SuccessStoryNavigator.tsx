import { Link, useLocation } from "react-router-dom";
import { 
  Factory, 
  Wheat, 
  Truck, 
  Heart, 
  HeartPulse, 
  ShoppingBag, 
  Zap 
} from "lucide-react";
import { cn } from "@/lib/utils";

const cases = [
  { 
    id: "gigafactory-north", 
    title: "GigaFactory North", 
    shortTitle: "Industrial",
    icon: Factory, 
    color: "text-orange-500", 
    bg: "bg-orange-500/10",
    hoverBg: "hover:bg-orange-500/20",
    borderColor: "border-orange-500/30"
  },
  { 
    id: "olivetrust-coop", 
    title: "OliveTrust Coop", 
    shortTitle: "Agro",
    icon: Wheat, 
    color: "text-emerald-500", 
    bg: "bg-emerald-500/10",
    hoverBg: "hover:bg-emerald-500/20",
    borderColor: "border-emerald-500/30"
  },
  { 
    id: "urbandeliver-bcn", 
    title: "UrbanDeliver BCN", 
    shortTitle: "Movilidad",
    icon: Truck, 
    color: "text-teal-500", 
    bg: "bg-teal-500/10",
    hoverBg: "hover:bg-teal-500/20",
    borderColor: "border-teal-500/30"
  },
  { 
    id: "alianza-social-hub", 
    title: "Alianza Social Hub", 
    shortTitle: "Social",
    icon: Heart, 
    color: "text-violet-500", 
    bg: "bg-violet-500/10",
    hoverBg: "hover:bg-violet-500/20",
    borderColor: "border-violet-500/30"
  },
  { 
    id: "biomed-hospital", 
    title: "BioMed Hospital", 
    shortTitle: "Salud",
    icon: HeartPulse, 
    color: "text-rose-500", 
    bg: "bg-rose-500/10",
    hoverBg: "hover:bg-rose-500/20",
    borderColor: "border-rose-500/30"
  },
  { 
    id: "globalretail-prime", 
    title: "GlobalRetail Prime", 
    shortTitle: "Retail",
    icon: ShoppingBag, 
    color: "text-blue-500", 
    bg: "bg-blue-500/10",
    hoverBg: "hover:bg-blue-500/20",
    borderColor: "border-blue-500/30"
  },
  { 
    id: "ecovolt-manufacturing", 
    title: "EcoVolt Mfg", 
    shortTitle: "Energía",
    icon: Zap, 
    color: "text-yellow-500", 
    bg: "bg-yellow-500/10",
    hoverBg: "hover:bg-yellow-500/20",
    borderColor: "border-yellow-500/30"
  }
];

interface SuccessStoryNavigatorProps {
  compact?: boolean;
}

export function SuccessStoryNavigator({ compact = false }: SuccessStoryNavigatorProps) {
  const location = useLocation();
  const currentId = location.pathname.split("/").pop();

  return (
    <div className={cn(
      "grid gap-3",
      compact 
        ? "grid-cols-4 md:grid-cols-7" 
        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
    )}>
      {cases.map((c) => {
        const Icon = c.icon;
        const isActive = currentId === c.id;
        
        return (
          <Link 
            key={c.id} 
            to={`/success-stories/${c.id}`}
            className={cn(
              "group flex flex-col items-center p-3 md:p-4 rounded-xl border transition-all duration-200",
              "bg-card shadow-sm",
              c.hoverBg,
              isActive 
                ? `${c.bg} border-2 ${c.borderColor} shadow-md` 
                : "border-border hover:border-primary/30 hover:shadow-md"
            )}
          >
            <div className={cn(
              "p-2 md:p-3 rounded-xl transition-transform duration-200",
              c.bg,
              c.color,
              "group-hover:scale-110",
              isActive && "scale-110"
            )}>
              <Icon className={cn("w-5 h-5 md:w-6 md:h-6", isActive && "animate-pulse")} />
            </div>
            <span className={cn(
              "text-[9px] md:text-[10px] font-bold mt-2 text-center uppercase tracking-tighter",
              isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
            )}>
              {compact ? c.shortTitle : c.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
