import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, BarChart3 } from "lucide-react";
import { DataQualityOverview } from "./DataQualityOverview";
import { QualityTrendSparkline } from "./QualityTrendSparkline";
import { SectorDistributionChart } from "./SectorDistributionChart";
import { DataQualityAlerts, type QualityAlert } from "./DataQualityAlerts";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  created_at: string;
  updated_at: string;
  subject_org: {
    name: string;
    sector: string;
    pontus_verified: boolean;
  };
  asset: {
    product: {
      name: string;
      category: string;
    };
  };
}

interface DataQualityDashboardProps {
  transactions: Transaction[];
  onAlertClick?: (datasetId: string) => void;
  className?: string;
}

// Calculate quality score for a transaction
const calculateTransactionScore = (transaction: Transaction) => {
  const isVerified = transaction.subject_org?.pontus_verified || false;
  const baseCompleteness = isVerified ? 92 : 75;
  const daysOld = Math.floor(
    (Date.now() - new Date(transaction.updated_at || transaction.created_at).getTime()) / 
    (1000 * 60 * 60 * 24)
  );
  
  const completeness = Math.min(100, baseCompleteness + Math.floor(Math.random() * 8));
  const accuracy = isVerified ? 88 + Math.floor(Math.random() * 10) : 70 + Math.floor(Math.random() * 15);
  const timeliness = Math.max(30, 100 - daysOld * 2);
  
  return {
    completeness,
    accuracy,
    timeliness,
    overall: completeness * 0.4 + accuracy * 0.35 + timeliness * 0.25
  };
};

// Generate simulated trend data
const generateTrendData = (currentScore: number, days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const variance = (Math.random() - 0.5) * 8;
    const score = Math.max(40, Math.min(100, currentScore - (i * 0.3) + variance));
    
    data.push({
      date: date.toISOString().split("T")[0],
      score: Math.round(score)
    });
  }
  
  return data;
};

// Generate alerts based on transaction quality
const generateAlerts = (transactions: Transaction[]): QualityAlert[] => {
  const alerts: QualityAlert[] = [];
  
  transactions.forEach(t => {
    const score = calculateTransactionScore(t);
    const daysOld = Math.floor(
      (Date.now() - new Date(t.updated_at || t.created_at).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    if (score.overall < 50) {
      alerts.push({
        id: `${t.id}-critical`,
        datasetName: t.asset.product.name,
        provider: t.subject_org.name,
        alertType: "critical",
        message: `Calidad general por debajo del 50%. Revisar integridad de datos.`,
        metric: "completeness",
        value: Math.round(score.overall),
        action: "Revisar"
      });
    } else if (score.timeliness < 40) {
      alerts.push({
        id: `${t.id}-stale`,
        datasetName: t.asset.product.name,
        provider: t.subject_org.name,
        alertType: "warning",
        message: `Datos sin actualizar hace ${daysOld} días. Considerar solicitar refresh.`,
        metric: "timeliness",
        value: Math.round(score.timeliness),
        action: "Solicitar update"
      });
    } else if (score.completeness < 70) {
      alerts.push({
        id: `${t.id}-incomplete`,
        datasetName: t.asset.product.name,
        provider: t.subject_org.name,
        alertType: "warning",
        message: `Completitud de datos por debajo del 70%. Algunos campos pueden estar vacíos.`,
        metric: "completeness",
        value: Math.round(score.completeness),
        action: "Ver detalles"
      });
    }
  });
  
  // Sort by severity
  return alerts.sort((a, b) => {
    const order = { critical: 0, warning: 1, info: 2 };
    return order[a.alertType] - order[b.alertType];
  }).slice(0, 10);
};

export function DataQualityDashboard({ 
  transactions, 
  onAlertClick,
  className 
}: DataQualityDashboardProps) {
  const hasCriticalAlerts = useMemo(() => {
    return transactions.some(t => calculateTransactionScore(t).overall < 50);
  }, [transactions]);
  
  const [isOpen, setIsOpen] = useState(hasCriticalAlerts);

  const aggregatedMetrics = useMemo(() => {
    if (transactions.length === 0) {
      return {
        globalScore: 0,
        trend: 0,
        distribution: { excellent: 0, good: 0, fair: 0, poor: 0 },
        sectorScores: [],
        alerts: [],
        trendData: []
      };
    }

    const scores = transactions.map(t => ({
      transaction: t,
      ...calculateTransactionScore(t)
    }));

    const globalScore = scores.reduce((acc, s) => acc + s.overall, 0) / scores.length;

    // Distribution by quality level
    const distribution = {
      excellent: scores.filter(s => s.overall >= 90).length,
      good: scores.filter(s => s.overall >= 70 && s.overall < 90).length,
      fair: scores.filter(s => s.overall >= 50 && s.overall < 70).length,
      poor: scores.filter(s => s.overall < 50).length
    };

    // Group by sector
    const bySector = new Map<string, typeof scores>();
    scores.forEach(s => {
      const sector = s.transaction.subject_org.sector || "Sin sector";
      if (!bySector.has(sector)) {
        bySector.set(sector, []);
      }
      bySector.get(sector)!.push(s);
    });

    const sectorScores = Array.from(bySector.entries()).map(([name, sectorScores]) => ({
      name,
      averageScore: sectorScores.reduce((acc, s) => acc + s.overall, 0) / sectorScores.length,
      datasetCount: sectorScores.length
    }));

    // Generate trend (simulated)
    const trendData = generateTrendData(globalScore, 7);
    const trend = trendData.length >= 2 
      ? trendData[trendData.length - 1].score - trendData[0].score 
      : 0;

    // Generate alerts
    const alerts = generateAlerts(transactions);

    return {
      globalScore,
      trend,
      distribution,
      sectorScores,
      alerts,
      trendData
    };
  }, [transactions]);

  if (transactions.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn("overflow-hidden", className)}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Panel de Calidad de Datos</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Score global: <span className="font-semibold">{Math.round(aggregatedMetrics.globalScore)}%</span>
                    {aggregatedMetrics.alerts.length > 0 && (
                      <span className="ml-2 text-amber-500">
                        • {aggregatedMetrics.alerts.length} alerta{aggregatedMetrics.alerts.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Main Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Global Score */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <DataQualityOverview
                    globalScore={aggregatedMetrics.globalScore}
                    trend={aggregatedMetrics.trend}
                    totalDatasets={transactions.length}
                    excellentCount={aggregatedMetrics.distribution.excellent}
                    goodCount={aggregatedMetrics.distribution.good}
                    fairCount={aggregatedMetrics.distribution.fair}
                    poorCount={aggregatedMetrics.distribution.poor}
                  />
                </div>

                {/* Trend Sparkline */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <QualityTrendSparkline
                    data={aggregatedMetrics.trendData}
                    period="7d"
                    height={100}
                  />
                </div>

                {/* Sector Distribution */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <SectorDistributionChart
                    sectors={aggregatedMetrics.sectorScores}
                    maxBars={5}
                  />
                </div>
              </div>

              {/* Alerts Section */}
              <DataQualityAlerts
                alerts={aggregatedMetrics.alerts}
                maxVisible={3}
                onAction={(id) => {
                  const alertId = id.split("-")[0];
                  onAlertClick?.(alertId);
                }}
              />
            </motion.div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
