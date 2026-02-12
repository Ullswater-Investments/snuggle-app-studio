import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChartSkeletonProps {
  type?: "area" | "bar" | "line" | "pie" | "donut";
  height?: number;
  className?: string;
  showLegend?: boolean;
  showAxis?: boolean;
}

// Skeleton for chart axis
const ChartAxisSkeleton = () => (
  <>
    {/* Y-axis */}
    <div className="absolute left-0 top-0 h-full w-px bg-border/50" />
    {/* X-axis */}
    <div className="absolute left-0 bottom-0 w-full h-px bg-border/50" />
    {/* Y-axis labels */}
    <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-6 h-2 rounded bg-muted animate-pulse" />
      ))}
    </div>
    {/* X-axis labels */}
    <div className="absolute left-8 right-4 bottom-0 flex justify-between">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-8 h-2 rounded bg-muted animate-pulse" />
      ))}
    </div>
  </>
);

// Skeleton for chart legend
const ChartLegendSkeleton = ({ items = 2 }: { items?: number }) => (
  <div className="flex items-center justify-center gap-6 mt-4">
    {[...Array(items)].map((_, i) => (
      <div key={i} className="flex items-center gap-2">
        <div 
          className={cn(
            "w-3 h-3 rounded-full animate-pulse",
            i === 0 ? "bg-primary/30" : "bg-muted"
          )} 
        />
        <div className="w-16 h-2 rounded bg-muted animate-pulse" />
      </div>
    ))}
  </div>
);

// Area Chart Skeleton
export const AreaChartSkeleton = ({ 
  height = 300, 
  showAxis = true 
}: { 
  height?: number; 
  showAxis?: boolean;
}) => (
  <div className="relative w-full" style={{ height }}>
    {showAxis && <ChartAxisSkeleton />}
    <svg 
      className="absolute inset-0 w-full h-full pl-8 pb-4" 
      viewBox="0 0 300 150" 
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="skeleton-area-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--muted))" />
          <stop offset="50%" stopColor="hsl(209 100% 65% / 0.25)">
            <animate 
              attributeName="offset" 
              values="0;1;0" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="100%" stopColor="hsl(var(--muted))" />
        </linearGradient>
        <linearGradient id="skeleton-area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(209 100% 65% / 0.15)" />
          <stop offset="100%" stopColor="hsl(209 100% 65% / 0.02)" />
        </linearGradient>
      </defs>
      {/* Area shape */}
      <motion.path
        d="M0,120 Q30,100 60,90 T120,70 T180,85 T240,60 T300,75 L300,150 L0,150 Z"
        fill="url(#skeleton-area-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Line on top */}
      <motion.path
        d="M0,120 Q30,100 60,90 T120,70 T180,85 T240,60 T300,75"
        stroke="url(#skeleton-area-gradient)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  </div>
);

// Bar Chart Skeleton
export const BarChartSkeleton = ({ 
  height = 300, 
  showAxis = true,
  barCount = 6 
}: { 
  height?: number; 
  showAxis?: boolean;
  barCount?: number;
}) => {
  const barHeights = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.55, 0.75].slice(0, barCount);
  
  return (
    <div className="relative w-full" style={{ height }}>
      {showAxis && <ChartAxisSkeleton />}
      <div className="absolute inset-0 pl-10 pb-6 pt-2 pr-4 flex items-end gap-3">
        {barHeights.map((heightPercent, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/25 to-muted/50"
            style={{ transformOrigin: "bottom" }}
            initial={{ scaleY: 0, opacity: 0.3 }}
            animate={{ 
              scaleY: heightPercent,
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              scaleY: {
                duration: 0.8,
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5,
              },
              opacity: {
                duration: 1.5,
                repeat: Infinity,
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Line Chart Skeleton
export const LineChartSkeleton = ({ 
  height = 300, 
  showAxis = true 
}: { 
  height?: number; 
  showAxis?: boolean;
}) => (
  <div className="relative w-full" style={{ height }}>
    {showAxis && <ChartAxisSkeleton />}
    <svg 
      className="absolute inset-0 w-full h-full pl-8 pb-4" 
      viewBox="0 0 300 150" 
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="skeleton-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--muted))" />
          <stop offset="50%" stopColor="hsl(209 100% 65% / 0.6)">
            <animate 
              attributeName="offset" 
              values="0;1;0" 
              dur="2.5s" 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="100%" stopColor="hsl(var(--muted))" />
        </linearGradient>
      </defs>
      {/* Main line */}
      <motion.path
        d="M10,100 Q50,80 90,85 T170,50 T250,70 T290,40"
        stroke="url(#skeleton-line-gradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ 
          pathLength: { duration: 2, repeat: Infinity },
          opacity: { duration: 0.5 }
        }}
      />
      {/* Secondary line (dashed) */}
      <motion.path
        d="M10,110 Q50,95 90,100 T170,75 T250,90 T290,65"
        stroke="hsl(0 0% 40% / 0.3)"
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, delay: 0.3, repeat: Infinity }}
      />
    </svg>
  </div>
);

// Pie/Donut Chart Skeleton
export const PieChartSkeleton = ({ 
  height = 300,
  isDonut = false 
}: { 
  height?: number;
  isDonut?: boolean;
}) => {
  const size = Math.min(height - 40, 200);
  const strokeWidth = isDonut ? size * 0.2 : 0;
  const radius = (size - strokeWidth) / 2;
  
  return (
    <div 
      className="relative w-full flex items-center justify-center" 
      style={{ height }}
    >
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          <defs>
            <linearGradient id="skeleton-pie-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(209 100% 65% / 0.4)" />
              <stop offset="50%" stopColor="hsl(0 0% 40% / 0.3)" />
              <stop offset="100%" stopColor="hsl(var(--muted))" />
            </linearGradient>
          </defs>
          {isDonut ? (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#skeleton-pie-gradient)"
              strokeWidth={strokeWidth}
              className="opacity-60"
            />
          ) : (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="url(#skeleton-pie-gradient)"
              className="opacity-60"
            />
          )}
          {/* Segment lines */}
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = size / 2 + radius * Math.cos(rad);
            const y2 = size / 2 + radius * Math.sin(rad);
            return (
              <motion.line
                key={i}
                x1={size / 2}
                y1={size / 2}
                x2={x2}
                y2={y2}
                stroke="hsl(var(--background))"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
};

// Main ChartSkeleton component
export function ChartSkeleton({
  type = "area",
  height = 300,
  className,
  showLegend = true,
  showAxis = true,
}: ChartSkeletonProps) {
  const renderSkeleton = () => {
    switch (type) {
      case "bar":
        return <BarChartSkeleton height={height} showAxis={showAxis} />;
      case "line":
        return <LineChartSkeleton height={height} showAxis={showAxis} />;
      case "pie":
        return <PieChartSkeleton height={height} isDonut={false} />;
      case "donut":
        return <PieChartSkeleton height={height} isDonut={true} />;
      case "area":
      default:
        return <AreaChartSkeleton height={height} showAxis={showAxis} />;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {renderSkeleton()}
      {showLegend && type !== "pie" && type !== "donut" && (
        <ChartLegendSkeleton items={type === "bar" ? 1 : 2} />
      )}
    </div>
  );
}

// KPI Card Skeleton
export function KPICardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      "rounded-lg border bg-card p-6 space-y-3",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
        <div className="h-8 w-8 rounded-full bg-primary/20 animate-pulse" />
      </div>
      <div className="space-y-2">
        <motion.div 
          className="h-8 w-32 rounded bg-gradient-to-r from-muted via-primary/20 to-muted"
          style={{ backgroundSize: "200% 100%" }}
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="h-3 w-20 rounded bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export default ChartSkeleton;
