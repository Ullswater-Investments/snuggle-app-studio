import { Link, useLocation } from "react-router-dom";
import { 
  Factory, Wheat, Truck, Heart, HeartPulse, ShoppingBag, Zap,
  Plane, Wine, Thermometer, Ship, Building2, Mountain, Shirt, Receipt, Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

const cases = [
  // Original 7
  { id: "gigafactory-north", title: "GigaFactory North", shortTitle: "Industrial", icon: Factory, color: "text-orange-500", bg: "bg-orange-500/10", hoverBg: "hover:bg-orange-500/20", borderColor: "border-orange-500/30" },
  { id: "olivetrust-coop", title: "OliveTrust Coop", shortTitle: "Agro", icon: Wheat, color: "text-emerald-500", bg: "bg-emerald-500/10", hoverBg: "hover:bg-emerald-500/20", borderColor: "border-emerald-500/30" },
  { id: "urbandeliver-bcn", title: "UrbanDeliver BCN", shortTitle: "Movilidad", icon: Truck, color: "text-teal-500", bg: "bg-teal-500/10", hoverBg: "hover:bg-teal-500/20", borderColor: "border-teal-500/30" },
  { id: "alianza-social-hub", title: "Alianza Social Hub", shortTitle: "Social", icon: Heart, color: "text-violet-500", bg: "bg-violet-500/10", hoverBg: "hover:bg-violet-500/20", borderColor: "border-violet-500/30" },
  { id: "biomed-hospital", title: "BioMed Hospital", shortTitle: "Salud", icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-500/10", hoverBg: "hover:bg-rose-500/20", borderColor: "border-rose-500/30" },
  { id: "globalretail-prime", title: "GlobalRetail Prime", shortTitle: "Retail", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10", hoverBg: "hover:bg-blue-500/20", borderColor: "border-blue-500/30" },
  { id: "ecovolt-manufacturing", title: "EcoVolt Mfg", shortTitle: "Energía", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10", hoverBg: "hover:bg-yellow-500/20", borderColor: "border-yellow-500/30" },
  // New 10
  { id: "sky-aero-systems", title: "SkyAero Systems", shortTitle: "Aero", icon: Plane, color: "text-blue-600", bg: "bg-blue-600/10", hoverBg: "hover:bg-blue-600/20", borderColor: "border-blue-600/30" },
  { id: "vinosdoe-elite", title: "VinosD.O. Elite", shortTitle: "Vinos", icon: Wine, color: "text-rose-700", bg: "bg-rose-700/10", hoverBg: "hover:bg-rose-700/20", borderColor: "border-rose-700/30" },
  { id: "pharmacold-logistix", title: "PharmaCold", shortTitle: "Pharma", icon: Thermometer, color: "text-red-500", bg: "bg-red-500/10", hoverBg: "hover:bg-red-500/20", borderColor: "border-red-500/30" },
  { id: "portbcn-smart-trade", title: "PortBCN", shortTitle: "Puerto", icon: Ship, color: "text-cyan-600", bg: "bg-cyan-600/10", hoverBg: "hover:bg-cyan-600/20", borderColor: "border-cyan-600/30" },
  { id: "ayuntamiento-etico", title: "Ayto. Ético", shortTitle: "Gov", icon: Building2, color: "text-violet-600", bg: "bg-violet-600/10", hoverBg: "hover:bg-violet-600/20", borderColor: "border-violet-600/30" },
  { id: "purelithium-sourcing", title: "PureLithium", shortTitle: "Minería", icon: Mountain, color: "text-stone-600", bg: "bg-stone-600/10", hoverBg: "hover:bg-stone-600/20", borderColor: "border-stone-600/30" },
  { id: "fastfashion-trace", title: "FastFashion", shortTitle: "Moda", icon: Shirt, color: "text-pink-500", bg: "bg-pink-500/10", hoverBg: "hover:bg-pink-500/20", borderColor: "border-pink-500/30" },
  { id: "invoicetrust-b2b", title: "InvoiceTrust", shortTitle: "Finanzas", icon: Receipt, color: "text-emerald-600", bg: "bg-emerald-600/10", hoverBg: "hover:bg-emerald-600/20", borderColor: "border-emerald-600/30" },
  { id: "gridflow-energy", title: "GridFlow", shortTitle: "Grid", icon: Zap, color: "text-yellow-600", bg: "bg-yellow-600/10", hoverBg: "hover:bg-yellow-600/20", borderColor: "border-yellow-600/30" },
  { id: "ailabs-research", title: "AI-Labs", shortTitle: "IA", icon: Cpu, color: "text-purple-600", bg: "bg-purple-600/10", hoverBg: "hover:bg-purple-600/20", borderColor: "border-purple-600/30" },
];

interface SuccessStoryNavigatorProps {
  compact?: boolean;
}

export function SuccessStoryNavigator({ compact = false }: SuccessStoryNavigatorProps) {
  const location = useLocation();
  const currentId = location.pathname.split("/").pop();

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className={cn(
        "flex gap-2 min-w-max pb-2",
        compact ? "justify-start" : "justify-center flex-wrap"
      )}>
        {cases.map((c) => {
          const Icon = c.icon;
          const isActive = currentId === c.id;
          
          return (
            <Link 
              key={c.id} 
              to={`/success-stories/${c.id}`}
              className={cn(
                "group flex flex-col items-center p-2 md:p-3 rounded-xl border transition-all duration-200",
                "bg-card shadow-sm min-w-[70px]",
                c.hoverBg,
                isActive 
                  ? `${c.bg} border-2 ${c.borderColor} shadow-md` 
                  : "border-border hover:border-primary/30 hover:shadow-md"
              )}
            >
              <div className={cn(
                "p-1.5 md:p-2 rounded-lg transition-transform duration-200",
                c.bg, c.color,
                "group-hover:scale-110",
                isActive && "scale-110"
              )}>
                <Icon className={cn("w-4 h-4 md:w-5 md:h-5", isActive && "animate-pulse")} />
              </div>
              <span className={cn(
                "text-[8px] md:text-[9px] font-bold mt-1.5 text-center uppercase tracking-tighter",
                isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {c.shortTitle}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
