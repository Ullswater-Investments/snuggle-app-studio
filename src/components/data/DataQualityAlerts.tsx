import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, XCircle, Info, ChevronDown, ChevronUp, Eye, RefreshCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface QualityAlert {
  id: string;
  datasetName: string;
  provider: string;
  alertType: "critical" | "warning" | "info";
  message: string;
  metric: "completeness" | "accuracy" | "timeliness";
  value: number;
  action: string;
}

interface DataQualityAlertsProps {
  alerts: QualityAlert[];
  maxVisible?: number;
  onDismiss?: (id: string) => void;
  onAction?: (id: string) => void;
  className?: string;
}

const alertConfig = {
  critical: {
    icon: XCircle,
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    iconColor: "text-red-500",
    badgeVariant: "destructive" as const
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    iconColor: "text-amber-500",
    badgeVariant: "secondary" as const
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-500",
    badgeVariant: "outline" as const
  }
};

const metricLabels = {
  completeness: "Completitud",
  accuracy: "Precisión",
  timeliness: "Actualidad"
};

export function DataQualityAlerts({
  alerts,
  maxVisible = 3,
  onDismiss,
  onAction,
  className
}: DataQualityAlertsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const visibleAlerts = alerts.filter(a => !dismissedIds.has(a.id));
  const displayedAlerts = isExpanded ? visibleAlerts : visibleAlerts.slice(0, maxVisible);
  const hasMore = visibleAlerts.length > maxVisible;

  const criticalCount = visibleAlerts.filter(a => a.alertType === "critical").length;
  const warningCount = visibleAlerts.filter(a => a.alertType === "warning").length;

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => new Set([...prev, id]));
    onDismiss?.(id);
  };

  if (visibleAlerts.length === 0) {
    return (
      <div className={cn("flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800", className)}>
        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
          <Eye className="h-4 w-4 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-green-700 dark:text-green-400">Todos los datasets en buen estado</p>
          <p className="text-xs text-green-600 dark:text-green-500">No hay alertas que requieran atención</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Alertas de Atención</span>
          <div className="flex gap-1">
            {criticalCount > 0 && (
              <Badge variant="destructive" className="text-[10px] px-1.5">
                {criticalCount} crítica{criticalCount !== 1 ? "s" : ""}
              </Badge>
            )}
            {warningCount > 0 && (
              <Badge variant="secondary" className="text-[10px] px-1.5 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                {warningCount} aviso{warningCount !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </div>
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs h-7"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Mostrar menos
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Ver todas ({visibleAlerts.length})
              </>
            )}
          </Button>
        )}
      </div>

      {/* Alert List */}
      <div className="space-y-2">
        <AnimatePresence>
          {displayedAlerts.map((alert, index) => {
            const config = alertConfig[alert.alertType];
            const AlertIcon = config.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border",
                  config.bgColor,
                  config.borderColor
                )}
              >
                <AlertIcon className={cn("h-5 w-5 mt-0.5 shrink-0", config.iconColor)} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium truncate">{alert.datasetName}</span>
                    <Badge variant={config.badgeVariant} className="text-[10px] px-1.5 shrink-0">
                      {metricLabels[alert.metric]}: {alert.value}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{alert.message}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 text-xs px-2"
                      onClick={() => onAction?.(alert.id)}
                    >
                      <RefreshCcw className="h-3 w-3 mr-1" />
                      {alert.action}
                    </Button>
                    <span className="text-[10px] text-muted-foreground">{alert.provider}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => handleDismiss(alert.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
