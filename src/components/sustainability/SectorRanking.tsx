import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectorRankingProps {
  position: number;
  totalCompanies: number;
  yourScore: number;
  sectorAverage: number;
  sectorName: string;
  trend?: "up" | "down" | "stable";
  trendDelta?: number;
}

export const SectorRanking = ({
  position,
  totalCompanies,
  yourScore,
  sectorAverage,
  sectorName,
  trend = "stable",
  trendDelta = 0
}: SectorRankingProps) => {
  const percentile = Math.round(((totalCompanies - position + 1) / totalCompanies) * 100);
  const isTopTen = percentile >= 90;
  const isTop25 = percentile >= 75;

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="h-full border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Ranking Sectorial
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {sectorName}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Position Display */}
          <div className="flex items-center gap-6">
            {/* Big Position Number */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className={cn(
                "w-20 h-20 rounded-2xl flex flex-col items-center justify-center",
                isTopTen 
                  ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/50"
                  : isTop25
                    ? "bg-gradient-to-br from-slate-300 to-slate-400 text-white"
                    : "bg-muted"
              )}>
                <span className="text-3xl font-bold">#{position}</span>
                <span className="text-[10px] opacity-80">de {totalCompanies}</span>
              </div>
              {isTopTen && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -top-2 -right-2"
                >
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                </motion.div>
              )}
            </motion.div>

            {/* Trend Indicator */}
            <div className="flex-1 space-y-1">
              <div className={cn("flex items-center gap-1", trendColor)}>
                <TrendIcon className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {trend === "up" && "+"}
                  {trend === "down" && "-"}
                  {Math.abs(trendDelta)} posiciones
                </span>
              </div>
              <p className="text-xs text-muted-foreground">vs. trimestre anterior</p>
            </div>
          </div>

          {/* Score Comparison Bars */}
          <div className="space-y-3">
            {/* Your Score */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">Tu puntuación</span>
                <span className="text-amber-600 font-bold">{yourScore}</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${yourScore}%` }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                />
              </div>
            </div>

            {/* Sector Average */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Media del sector</span>
                <span className="text-muted-foreground">{sectorAverage}</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${sectorAverage}%` }}
                  transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                  className="h-full bg-slate-300 dark:bg-slate-600 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Percentile Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={cn(
              "flex items-center justify-center gap-2 p-2 rounded-lg",
              isTopTen 
                ? "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30" 
                : "bg-muted/50"
            )}
          >
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {isTopTen ? "⭐ " : ""}Estás en el <strong>Top {100 - percentile + 1}%</strong> de tu sector
            </span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
