import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

type Frequency = 'realtime' | 'hourly' | 'daily' | 'weekly' | 'monthly';

interface FreshnessBarProps {
  lastUpdated: Date;
  expectedUpdateFrequency: Frequency;
  maxStaleness?: number;     // Days max before "dead"
  showTimestamp?: boolean;
  className?: string;
}

const FRESHNESS_THRESHOLDS: Record<Frequency, { green: number; yellow: number; red: number }> = {
  realtime: { green: 0.25, yellow: 1, red: 4 },       // hours
  hourly: { green: 1, yellow: 4, red: 24 },
  daily: { green: 24, yellow: 48, red: 168 },
  weekly: { green: 168, yellow: 336, red: 720 },
  monthly: { green: 720, yellow: 1440, red: 2160 }
};

const calculateFreshness = (lastUpdated: Date, frequency: Frequency) => {
  const now = new Date();
  const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
  const thresholds = FRESHNESS_THRESHOLDS[frequency];

  if (hoursSinceUpdate <= thresholds.green) {
    return { 
      percent: 100, 
      status: 'fresh' as const,
      color: "bg-green-500",
      gradientColor: "from-green-500 to-emerald-400",
      icon: CheckCircle,
      label: "Fresco"
    };
  }
  if (hoursSinceUpdate <= thresholds.yellow) {
    const progress = 100 - ((hoursSinceUpdate - thresholds.green) / (thresholds.yellow - thresholds.green)) * 30;
    return { 
      percent: Math.max(70, progress), 
      status: 'good' as const,
      color: "bg-emerald-500",
      gradientColor: "from-emerald-500 to-yellow-400",
      icon: CheckCircle,
      label: "Actualizado"
    };
  }
  if (hoursSinceUpdate <= thresholds.red) {
    const progress = 70 - ((hoursSinceUpdate - thresholds.yellow) / (thresholds.red - thresholds.yellow)) * 30;
    return { 
      percent: Math.max(40, progress), 
      status: 'stale' as const,
      color: "bg-amber-500",
      gradientColor: "from-amber-500 to-orange-500",
      icon: AlertTriangle,
      label: "Envejeciendo"
    };
  }
  
  const staleDays = (hoursSinceUpdate - thresholds.red) / 24;
  const decay = Math.max(10, 40 - staleDays * 5);
  return { 
    percent: decay, 
    status: 'old' as const,
    color: "bg-red-500",
    gradientColor: "from-orange-500 to-red-500",
    icon: XCircle,
    label: "Obsoleto"
  };
};

export function FreshnessBar({
  lastUpdated,
  expectedUpdateFrequency,
  showTimestamp = false,
  className
}: FreshnessBarProps) {
  const freshness = useMemo(
    () => calculateFreshness(lastUpdated, expectedUpdateFrequency),
    [lastUpdated, expectedUpdateFrequency]
  );

  const FreshnessIcon = freshness.icon;
  const timeAgo = formatDistanceToNow(lastUpdated, { addSuffix: true, locale: es });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("w-full space-y-1.5", className)}>
            {showTimestamp && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Frescura
                </span>
                <span className={cn(
                  "font-medium flex items-center gap-1",
                  freshness.status === 'fresh' ? "text-green-500" :
                  freshness.status === 'good' ? "text-emerald-500" :
                  freshness.status === 'stale' ? "text-amber-500" :
                  "text-red-500"
                )}>
                  <FreshnessIcon className="h-3 w-3" />
                  {freshness.percent.toFixed(0)}%
                </span>
              </div>
            )}
            
            <div className="relative h-2 w-full bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
                  freshness.gradientColor
                )}
                initial={{ width: 0 }}
                animate={{ width: `${freshness.percent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              
              {/* Subtle pulse for fresh data */}
              {freshness.status === 'fresh' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
            </div>

            {showTimestamp && (
              <p className="text-[10px] text-muted-foreground">
                Actualizado {timeAgo}
              </p>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FreshnessIcon className={cn(
                "h-4 w-4",
                freshness.status === 'fresh' ? "text-green-500" :
                freshness.status === 'good' ? "text-emerald-500" :
                freshness.status === 'stale' ? "text-amber-500" :
                "text-red-500"
              )} />
              <span className="font-semibold">{freshness.label}</span>
            </div>
            <p className="text-muted-foreground">
              Actualizado {timeAgo}
            </p>
            <p className="text-muted-foreground">
              {lastUpdated.toLocaleString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
