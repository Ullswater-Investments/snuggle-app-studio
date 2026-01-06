import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendDataPoint {
  date: string;
  score: number;
}

interface QualityTrendSparklineProps {
  data: TrendDataPoint[];
  period?: "7d" | "14d" | "30d";
  height?: number;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    const formattedDate = date.toLocaleDateString("es-ES", { 
      day: "numeric", 
      month: "short" 
    });
    
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
        <p className="text-sm font-semibold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export function QualityTrendSparkline({ 
  data, 
  period = "7d",
  height = 80,
  className 
}: QualityTrendSparklineProps) {
  const trendInfo = useMemo(() => {
    if (data.length < 2) return { direction: "neutral", change: 0 };
    
    const firstScore = data[0].score;
    const lastScore = data[data.length - 1].score;
    const change = lastScore - firstScore;
    
    return {
      direction: change > 0 ? "up" : change < 0 ? "down" : "neutral",
      change: Math.abs(change)
    };
  }, [data]);

  const averageScore = useMemo(() => {
    if (data.length === 0) return 0;
    return data.reduce((acc, d) => acc + d.score, 0) / data.length;
  }, [data]);

  const gradientId = `quality-gradient-${period}`;
  const isPositive = trendInfo.direction === "up";
  const strokeColor = isPositive ? "hsl(var(--chart-2))" : trendInfo.direction === "down" ? "hsl(var(--destructive))" : "hsl(var(--muted-foreground))";

  const periodLabels = {
    "7d": "Últimos 7 días",
    "14d": "Últimos 14 días",
    "30d": "Últimos 30 días"
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{periodLabels[period]}</span>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium",
          isPositive ? "text-green-500" : trendInfo.direction === "down" ? "text-red-500" : "text-muted-foreground"
        )}>
          {trendInfo.direction === "up" ? (
            <TrendingUp className="h-3 w-3" />
          ) : trendInfo.direction === "down" ? (
            <TrendingDown className="h-3 w-3" />
          ) : null}
          <span>{isPositive ? "+" : trendInfo.direction === "down" ? "-" : ""}{trendInfo.change.toFixed(1)}%</span>
        </div>
      </div>

      {/* Sparkline Chart */}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis domain={[40, 100]} hide />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={averageScore} 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="3 3" 
              strokeOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke={strokeColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ 
                r: 4, 
                fill: strokeColor,
                stroke: "hsl(var(--background))",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Current Score */}
      <div className="text-center">
        <span className="text-2xl font-bold">{data[data.length - 1]?.score || 0}%</span>
        <span className="text-xs text-muted-foreground ml-1">actual</span>
      </div>
    </div>
  );
}
