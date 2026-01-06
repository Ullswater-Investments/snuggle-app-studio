import { useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface DataQualityScoreProps {
  completeness: number;      // 0-100
  accuracy?: number;         // 0-100
  timeliness?: number;       // 0-100
  size?: 'sm' | 'md' | 'lg';
  showBreakdown?: boolean;
  className?: string;
}

const SIZE_CONFIG = {
  sm: { outer: 40, inner: 28, stroke: 6, fontSize: "text-xs" },
  md: { outer: 56, inner: 40, stroke: 8, fontSize: "text-sm" },
  lg: { outer: 72, inner: 52, stroke: 10, fontSize: "text-base" }
};

const getQualityLevel = (score: number) => {
  if (score >= 90) return { label: "Excelente", color: "text-green-500", bgColor: "bg-green-500", icon: CheckCircle2 };
  if (score >= 70) return { label: "Bueno", color: "text-emerald-500", bgColor: "bg-emerald-500", icon: CheckCircle2 };
  if (score >= 50) return { label: "Regular", color: "text-amber-500", bgColor: "bg-amber-500", icon: AlertCircle };
  return { label: "Bajo", color: "text-red-500", bgColor: "bg-red-500", icon: XCircle };
};

export function DataQualityScore({
  completeness,
  accuracy = 85,
  timeliness = 80,
  size = 'sm',
  showBreakdown = false,
  className
}: DataQualityScoreProps) {
  const sizeConfig = SIZE_CONFIG[size];
  
  // Calculate overall score (weighted average)
  const overallScore = useMemo(() => {
    return Math.round(completeness * 0.4 + accuracy * 0.35 + timeliness * 0.25);
  }, [completeness, accuracy, timeliness]);

  const qualityLevel = getQualityLevel(overallScore);
  const QualityIcon = qualityLevel.icon;

  // Data for donut chart
  const chartData = [
    { name: "Score", value: overallScore },
    { name: "Remaining", value: 100 - overallScore }
  ];

  const COLORS = [
    overallScore >= 90 ? "hsl(var(--chart-2))" :
    overallScore >= 70 ? "hsl(142, 71%, 45%)" :
    overallScore >= 50 ? "hsl(45, 93%, 47%)" :
    "hsl(0, 84%, 60%)",
    "hsl(var(--muted))"
  ];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex flex-col items-center gap-1", className)}>
            <div className="relative" style={{ width: sizeConfig.outer, height: sizeConfig.outer }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={sizeConfig.inner / 2}
                    outerRadius={sizeConfig.outer / 2}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={0}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center score */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <span className={cn("font-bold", sizeConfig.fontSize, qualityLevel.color)}>
                  {overallScore}%
                </span>
              </motion.div>
            </div>

            {showBreakdown && (
              <div className="flex items-center gap-1">
                <QualityIcon className={cn("h-3 w-3", qualityLevel.color)} />
                <span className={cn("text-xs font-medium", qualityLevel.color)}>
                  {qualityLevel.label}
                </span>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs space-y-2">
          <div className="flex items-center gap-2">
            <QualityIcon className={cn("h-4 w-4", qualityLevel.color)} />
            <span className="font-semibold">Calidad: {qualityLevel.label}</span>
          </div>
          <div className="space-y-1 pt-1 border-t border-border">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Completitud:</span>
              <span className="font-medium">{completeness}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Precisión:</span>
              <span className="font-medium">{accuracy}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Actualidad:</span>
              <span className="font-medium">{timeliness}%</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
