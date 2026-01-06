import { useMemo } from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectorData {
  name: string;
  averageScore: number;
  datasetCount: number;
}

interface SectorDistributionChartProps {
  sectors: SectorData[];
  maxBars?: number;
  className?: string;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return "hsl(var(--chart-2))";
  if (score >= 70) return "hsl(var(--chart-4))";
  if (score >= 50) return "hsl(var(--chart-3))";
  return "hsl(var(--destructive))";
};

const getScoreLabel = (score: number) => {
  if (score >= 90) return "Excelente";
  if (score >= 70) return "Bueno";
  if (score >= 50) return "Regular";
  return "Bajo";
};

export function SectorDistributionChart({ 
  sectors, 
  maxBars = 6,
  className 
}: SectorDistributionChartProps) {
  const sortedSectors = useMemo(() => {
    return [...sectors]
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, maxBars);
  }, [sectors, maxBars]);

  const maxScore = useMemo(() => {
    return Math.max(...sortedSectors.map(s => s.averageScore), 100);
  }, [sortedSectors]);

  if (sortedSectors.length === 0) {
    return (
      <div className={cn("flex items-center justify-center h-full text-muted-foreground text-sm", className)}>
        Sin datos de sectores
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Calidad por Sector</span>
        <span className="text-xs text-muted-foreground">{sectors.length} sectores</span>
      </div>

      <div className="space-y-3">
        <TooltipProvider>
          {sortedSectors.map((sector, index) => {
            const barWidth = (sector.averageScore / maxScore) * 100;
            const color = getScoreColor(sector.averageScore);

            return (
              <Tooltip key={sector.name}>
                <TooltipTrigger asChild>
                  <div className="group cursor-default">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {sector.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {sector.datasetCount}
                        </Badge>
                        <span className="text-xs font-medium w-10 text-right">
                          {Math.round(sector.averageScore)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full transition-all group-hover:brightness-110"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="space-y-1">
                    <p className="font-medium">{sector.name}</p>
                    <p className="text-xs">
                      Score promedio: <span className="font-semibold">{sector.averageScore.toFixed(1)}%</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {sector.datasetCount} dataset{sector.datasetCount !== 1 ? "s" : ""} • {getScoreLabel(sector.averageScore)}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}
