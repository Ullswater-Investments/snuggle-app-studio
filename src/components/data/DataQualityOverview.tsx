import { useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DataQualityOverviewProps {
  globalScore: number;
  trend: number;
  totalDatasets: number;
  excellentCount: number;
  goodCount: number;
  fairCount: number;
  poorCount: number;
  className?: string;
}

const getQualityLevel = (score: number) => {
  if (score >= 90) return { label: "Excelente", color: "hsl(var(--chart-2))", icon: CheckCircle };
  if (score >= 70) return { label: "Bueno", color: "hsl(var(--chart-4))", icon: Info };
  if (score >= 50) return { label: "Regular", color: "hsl(var(--chart-3))", icon: AlertCircle };
  return { label: "Bajo", color: "hsl(var(--destructive))", icon: XCircle };
};

export function DataQualityOverview({
  globalScore,
  trend,
  totalDatasets,
  excellentCount,
  goodCount,
  fairCount,
  poorCount,
  className
}: DataQualityOverviewProps) {
  const qualityLevel = useMemo(() => getQualityLevel(globalScore), [globalScore]);
  const QualityIcon = qualityLevel.icon;

  const donutData = [
    { name: "Score", value: globalScore },
    { name: "Remaining", value: 100 - globalScore }
  ];

  const distributionData = [
    { label: "Excelente", count: excellentCount, color: "hsl(var(--chart-2))" },
    { label: "Bueno", count: goodCount, color: "hsl(var(--chart-4))" },
    { label: "Regular", count: fairCount, color: "hsl(var(--chart-3))" },
    { label: "Bajo", count: poorCount, color: "hsl(var(--destructive))" }
  ];

  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendColor = trend > 0 ? "text-green-500" : trend < 0 ? "text-red-500" : "text-muted-foreground";

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Donut Chart */}
      <div className="relative w-28 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={qualityLevel.color} />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-2xl font-bold"
          >
            {Math.round(globalScore)}%
          </motion.span>
        </div>
      </div>

      {/* Quality Level Label */}
      <div className="flex items-center gap-2">
        <QualityIcon className="h-4 w-4" style={{ color: qualityLevel.color }} />
        <span className="font-medium" style={{ color: qualityLevel.color }}>
          {qualityLevel.label}
        </span>
      </div>

      {/* Trend Indicator */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span>{trend > 0 ? "+" : ""}{trend.toFixed(1)}%</span>
              <span className="text-muted-foreground text-xs">vs semana anterior</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cambio en calidad promedio respecto a hace 7 días</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Distribution Mini Bars */}
      <div className="w-full space-y-2 pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground text-center mb-2">
          Distribución ({totalDatasets} datasets)
        </p>
        {distributionData.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs">
            <span className="w-16 text-muted-foreground">{item.label}</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: totalDatasets > 0 ? `${(item.count / totalDatasets) * 100}%` : "0%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
            <span className="w-6 text-right font-medium">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
