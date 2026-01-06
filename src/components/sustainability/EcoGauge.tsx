import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EcoGaugeProps {
  value: number;
  maxValue: number;
  label: string;
  description?: string;
  targetValue?: number;
  color?: "green" | "blue" | "purple" | "primary";
  icon?: LucideIcon;
  unit?: string;
  delay?: number;
}

export const EcoGauge = ({
  value,
  maxValue,
  label,
  description,
  targetValue,
  color = "green",
  icon: Icon,
  unit = "tCO₂e",
  delay = 0
}: EcoGaugeProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    green: {
      stroke: "hsl(142, 76%, 36%)",
      bg: "bg-green-50 dark:bg-green-950/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-600",
      glow: "drop-shadow-[0_0_8px_hsl(142,76%,36%,0.5)]"
    },
    blue: {
      stroke: "hsl(217, 91%, 60%)",
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-600",
      glow: "drop-shadow-[0_0_8px_hsl(217,91%,60%,0.5)]"
    },
    purple: {
      stroke: "hsl(270, 70%, 60%)",
      bg: "bg-purple-50 dark:bg-purple-950/20",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-600",
      glow: "drop-shadow-[0_0_8px_hsl(270,70%,60%,0.5)]"
    },
    primary: {
      stroke: "hsl(var(--primary))",
      bg: "bg-primary/5",
      border: "border-primary",
      text: "text-primary",
      glow: "drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
    }
  };

  const colors = colorMap[color];
  const isUnderTarget = targetValue ? value < targetValue : false;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={cn(
              "relative p-4 rounded-xl border",
              colors.bg,
              colors.border,
              "hover:shadow-lg transition-shadow cursor-pointer"
            )}
          >
            {/* Icon Badge */}
            {Icon && (
              <div className={cn("absolute top-3 right-3", colors.text)}>
                <Icon className="h-5 w-5" />
              </div>
            )}

            {/* Gauge */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <svg width={size} height={size} className="transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth={strokeWidth}
                    className="opacity-30"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={colors.stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
                    className={cn(isUnderTarget && colors.glow)}
                  />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: delay + 0.5, duration: 0.3 }}
                    className={cn("text-xl font-bold", colors.text)}
                  >
                    {value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(1)}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 0.7 }}
                    className="text-[10px] text-muted-foreground"
                  >
                    {unit}
                  </motion.span>
                </div>
              </div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.6 }}
                className="mt-3 text-center"
              >
                <p className="font-semibold text-sm">{label}</p>
                {description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                )}
              </motion.div>

              {/* Target indicator */}
              {targetValue && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: delay + 0.8 }}
                  className={cn(
                    "mt-2 px-2 py-0.5 rounded-full text-xs font-medium",
                    isUnderTarget 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  )}
                >
                  {isUnderTarget ? "✓ " : ""}{Math.round(((value - targetValue) / targetValue) * 100)}% vs objetivo
                </motion.div>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">{value.toLocaleString()} {unit}</p>
          {targetValue && (
            <p className="text-xs mt-1">
              Objetivo: {targetValue.toLocaleString()} {unit}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
