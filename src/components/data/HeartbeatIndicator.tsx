import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type UpdateFrequency = 'realtime' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'static';

interface HeartbeatIndicatorProps {
  frequency: UpdateFrequency;
  className?: string;
  showLabel?: boolean;
  lastUpdated?: Date;
}

const FREQUENCY_CONFIG: Record<UpdateFrequency, {
  duration: number;
  color: string;
  glowColor: string;
  label: string;
  description: string;
}> = {
  realtime: {
    duration: 0.8,
    color: "stroke-green-500",
    glowColor: "drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]",
    label: "Tiempo Real",
    description: "Actualización cada < 15 min"
  },
  hourly: {
    duration: 1.2,
    color: "stroke-emerald-500",
    glowColor: "drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]",
    label: "Cada Hora",
    description: "Actualización horaria"
  },
  daily: {
    duration: 1.8,
    color: "stroke-blue-500",
    glowColor: "drop-shadow-[0_0_4px_rgba(59,130,246,0.5)]",
    label: "Diario",
    description: "Actualización cada 24h"
  },
  weekly: {
    duration: 2.5,
    color: "stroke-amber-500",
    glowColor: "drop-shadow-[0_0_3px_rgba(245,158,11,0.4)]",
    label: "Semanal",
    description: "Actualización semanal"
  },
  monthly: {
    duration: 3.5,
    color: "stroke-orange-500",
    glowColor: "drop-shadow-[0_0_3px_rgba(249,115,22,0.4)]",
    label: "Mensual",
    description: "Actualización mensual"
  },
  static: {
    duration: 0,
    color: "stroke-muted-foreground/50",
    glowColor: "",
    label: "Estático",
    description: "Sin actualizaciones programadas"
  }
};

export function HeartbeatIndicator({ 
  frequency, 
  className, 
  showLabel = false,
  lastUpdated 
}: HeartbeatIndicatorProps) {
  const config = FREQUENCY_CONFIG[frequency];
  const isAnimated = frequency !== 'static';

  // ECG-style path
  const ecgPath = "M0,25 L15,25 L20,25 L25,10 L30,40 L35,5 L40,35 L45,25 L55,25 L60,25 L65,20 L70,30 L75,25 L100,25";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex flex-col items-center gap-1", className)}>
            <div className="relative w-full h-8 overflow-hidden">
              <svg
                viewBox="0 0 100 50"
                className={cn("w-full h-full", config.glowColor)}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Background line */}
                <path
                  d={ecgPath}
                  fill="none"
                  className="stroke-muted/30"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Animated heartbeat line */}
                {isAnimated ? (
                  <motion.path
                    d={ecgPath}
                    fill="none"
                    className={config.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    animate={{ 
                      pathLength: [0, 1, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: config.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.6, 1]
                    }}
                  />
                ) : (
                  <path
                    d={ecgPath}
                    fill="none"
                    className={config.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.5}
                  />
                )}

                {/* Pulse dot for animated frequencies */}
                {isAnimated && (
                  <motion.circle
                    r="3"
                    className={cn("fill-current", config.color.replace("stroke-", "text-"))}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      cx: [0, 50, 100],
                      cy: [25, 25, 25]
                    }}
                    transition={{
                      duration: config.duration,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}
              </svg>
            </div>

            {showLabel && (
              <div className="flex items-center gap-1.5">
                <motion.div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    frequency === 'realtime' ? "bg-green-500" :
                    frequency === 'hourly' ? "bg-emerald-500" :
                    frequency === 'daily' ? "bg-blue-500" :
                    frequency === 'weekly' ? "bg-amber-500" :
                    frequency === 'monthly' ? "bg-orange-500" :
                    "bg-muted-foreground/50"
                  )}
                  animate={isAnimated ? {
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  } : {}}
                  transition={{
                    duration: config.duration || 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {config.label}
                </span>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          <p className="font-medium">{config.label}</p>
          <p className="text-muted-foreground">{config.description}</p>
          {lastUpdated && (
            <p className="text-muted-foreground mt-1">
              Última: {lastUpdated.toLocaleString('es-ES', { 
                day: '2-digit', 
                month: 'short', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
