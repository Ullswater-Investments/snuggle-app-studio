import { useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ReferenceLine,
} from "recharts";
import { CHART_COLORS, CHART_TOOLTIP_STYLE, CHART_GRID_STYLE } from "@/lib/chartTheme";
import { subDays, format, differenceInHours, startOfWeek, eachDayOfInterval, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { TrendingUp, TrendingDown, Clock, Zap, Activity, PieChartIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Transaction {
  id: string;
  created_at: string;
  status: string;
  consumer_org_id: string;
  subject_org_id: string;
  holder_org_id: string;
}

interface RequestsAnalyticsDashboardProps {
  transactions: Transaction[];
  activeOrgId?: string;
}

const STATUS_COLORS: Record<string, string> = {
  initiated: "hsl(217, 91%, 60%)",
  pending_subject: "hsl(45, 93%, 47%)",
  pending_holder: "hsl(271, 91%, 65%)",
  approved: "hsl(142, 76%, 36%)",
  completed: "hsl(160, 84%, 39%)",
  denied_subject: "hsl(0, 84%, 60%)",
  denied_holder: "hsl(0, 72%, 51%)",
  cancelled: "hsl(0, 0%, 45%)",
};

const STATUS_LABELS: Record<string, string> = {
  initiated: "Iniciadas",
  pending_subject: "Pend. Proveedor",
  pending_holder: "Pend. Custodio",
  approved: "Aprobadas",
  completed: "Completadas",
  denied_subject: "Denegadas",
  denied_holder: "Denegadas",
  cancelled: "Canceladas",
};

export function RequestsAnalyticsDashboard({ transactions, activeOrgId }: RequestsAnalyticsDashboardProps) {
  const queryClient = useQueryClient();

  // Fetch approval history for speed calculations
  const { data: approvalHistory, isLoading: loadingHistory } = useQuery({
    queryKey: ["approval-history-analytics", activeOrgId],
    queryFn: async () => {
      const transactionIds = transactions.map((t) => t.id);
      if (transactionIds.length === 0) return [];

      const { data, error } = await supabase
        .from("approval_history")
        .select("transaction_id, action, created_at")
        .in("transaction_id", transactionIds)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: transactions.length > 0,
  });

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("requests-analytics-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "data_transactions",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          queryClient.invalidateQueries({ queryKey: ["approval-history-analytics"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Calculate daily volume for last 14 days
  const dailyVolumeData = useMemo(() => {
    const last14Days = eachDayOfInterval({
      start: subDays(new Date(), 13),
      end: new Date(),
    });

    return last14Days.map((day) => {
      const dayStr = format(day, "yyyy-MM-dd");
      const count = transactions.filter((t) => {
        const txDate = format(parseISO(t.created_at), "yyyy-MM-dd");
        return txDate === dayStr;
      }).length;

      return {
        date: format(day, "dd MMM", { locale: es }),
        fullDate: dayStr,
        transacciones: count,
      };
    });
  }, [transactions]);

  // Calculate approval speed trend
  const approvalSpeedData = useMemo(() => {
    if (!approvalHistory || approvalHistory.length === 0) return [];

    const transactionMap = new Map<string, { created: Date; approved?: Date }>();

    transactions.forEach((t) => {
      transactionMap.set(t.id, { created: parseISO(t.created_at) });
    });

    approvalHistory
      .filter((h) => h.action === "approve" || h.action === "pre_approve")
      .forEach((h) => {
        const entry = transactionMap.get(h.transaction_id);
        if (entry && !entry.approved) {
          entry.approved = parseISO(h.created_at);
        }
      });

    // Group by week
    const weeklyData: Record<string, number[]> = {};

    transactionMap.forEach((value) => {
      if (value.approved) {
        const weekStart = format(startOfWeek(value.created, { locale: es }), "dd MMM", { locale: es });
        const hours = differenceInHours(value.approved, value.created);
        if (!weeklyData[weekStart]) weeklyData[weekStart] = [];
        weeklyData[weekStart].push(hours);
      }
    });

    return Object.entries(weeklyData)
      .slice(-8)
      .map(([week, hours]) => ({
        semana: week,
        horasPromedio: Math.round((hours.reduce((a, b) => a + b, 0) / hours.length) * 10) / 10,
      }));
  }, [transactions, approvalHistory]);

  // Calculate average approval time
  const avgApprovalTime = useMemo(() => {
    if (!approvalSpeedData || approvalSpeedData.length === 0) return null;
    const total = approvalSpeedData.reduce((acc, d) => acc + d.horasPromedio, 0);
    return Math.round((total / approvalSpeedData.length) * 10) / 10;
  }, [approvalSpeedData]);

  // Status distribution for pie chart
  const statusDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    transactions.forEach((t) => {
      counts[t.status] = (counts[t.status] || 0) + 1;
    });

    return Object.entries(counts).map(([status, count]) => ({
      name: STATUS_LABELS[status] || status,
      value: count,
      status,
    }));
  }, [transactions]);

  // Weekly trend (area chart)
  const weeklyTrend = useMemo(() => {
    const weeks: Record<string, number> = {};

    transactions.forEach((t) => {
      const weekStart = format(startOfWeek(parseISO(t.created_at), { locale: es }), "dd MMM", { locale: es });
      weeks[weekStart] = (weeks[weekStart] || 0) + 1;
    });

    return Object.entries(weeks)
      .slice(-12)
      .map(([semana, count]) => ({
        semana,
        volumen: count,
      }));
  }, [transactions]);

  // Calculate week-over-week change
  const weeklyChange = useMemo(() => {
    const now = new Date();
    const thisWeekStart = startOfWeek(now, { locale: es });
    const lastWeekStart = subDays(thisWeekStart, 7);

    const thisWeek = transactions.filter((t) => parseISO(t.created_at) >= thisWeekStart).length;
    const lastWeek = transactions.filter((t) => {
      const date = parseISO(t.created_at);
      return date >= lastWeekStart && date < thisWeekStart;
    }).length;

    if (lastWeek === 0) return thisWeek > 0 ? 100 : 0;
    return Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  }, [transactions]);

  // Approval rate
  const approvalRate = useMemo(() => {
    const total = transactions.length;
    if (total === 0) return 0;
    const approved = transactions.filter((t) =>
      ["approved", "completed"].includes(t.status)
    ).length;
    return Math.round((approved / total) * 100);
  }, [transactions]);

  if (transactions.length === 0) {
    return null;
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Analytics en Tiempo Real
            </CardTitle>
            <CardDescription>Métricas de rendimiento de los últimos 30 días</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500 animate-pulse inline-block" />
            En vivo
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Clock className="h-4 w-4" />
              Tiempo Promedio
            </div>
            <div className="text-2xl font-bold">
              {loadingHistory ? (
                <Skeleton className="h-8 w-16" />
              ) : avgApprovalTime !== null ? (
                `${avgApprovalTime}h`
              ) : (
                "—"
              )}
            </div>
            <p className="text-xs text-muted-foreground">hasta aprobación</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Zap className="h-4 w-4" />
              Tasa de Aprobación
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{approvalRate}%</div>
            <p className="text-xs text-muted-foreground">solicitudes aprobadas</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Activity className="h-4 w-4" />
              Esta Semana
            </div>
            <div className="text-2xl font-bold">
              {transactions.filter((t) => parseISO(t.created_at) >= startOfWeek(new Date(), { locale: es })).length}
            </div>
            <div className="flex items-center gap-1 text-xs">
              {weeklyChange >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={weeklyChange >= 0 ? "text-green-600" : "text-red-600"}>
                {weeklyChange >= 0 ? "+" : ""}
                {weeklyChange}%
              </span>
              <span className="text-muted-foreground">vs anterior</span>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <PieChartIcon className="h-4 w-4" />
              Pendientes
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {transactions.filter((t) => ["pending_subject", "pending_holder", "initiated"].includes(t.status)).length}
            </div>
            <p className="text-xs text-muted-foreground">requieren acción</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Daily Volume Bar Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Volumen Diario (últimos 14 días)</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyVolumeData}>
                  <CartesianGrid {...CHART_GRID_STYLE} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE.contentStyle}
                    labelStyle={CHART_TOOLTIP_STYLE.labelStyle}
                  />
                  <Bar
                    dataKey="transacciones"
                    fill={CHART_COLORS.primary}
                    radius={[4, 4, 0, 0]}
                    animationDuration={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Approval Speed Line Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Velocidad de Aprobación (horas)</h4>
            <div className="h-[200px]">
              {loadingHistory ? (
                <div className="flex items-center justify-center h-full">
                  <Skeleton className="h-full w-full" />
                </div>
              ) : approvalSpeedData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={approvalSpeedData}>
                    <CartesianGrid {...CHART_GRID_STYLE} />
                    <XAxis dataKey="semana" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={CHART_TOOLTIP_STYLE.contentStyle}
                      labelStyle={CHART_TOOLTIP_STYLE.labelStyle}
                      formatter={(value: number) => [`${value}h`, "Promedio"]}
                    />
                    <ReferenceLine y={4} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" label={{ value: "Meta 4h", fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <Line
                      type="monotone"
                      dataKey="horasPromedio"
                      stroke={CHART_COLORS.primary}
                      strokeWidth={2}
                      dot={{ fill: CHART_COLORS.primary, r: 4 }}
                      animationDuration={1200}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  Sin datos de aprobación
                </div>
              )}
            </div>
          </div>

          {/* Status Distribution Pie Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Distribución por Estado</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || CHART_COLORS.palette[index % CHART_COLORS.palette.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE.contentStyle}
                    formatter={(value: number, name: string) => [value, name]}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconSize={10}
                    wrapperStyle={{ fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Trend Area Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Tendencia Semanal</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrend}>
                  <defs>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...CHART_GRID_STYLE} />
                  <XAxis dataKey="semana" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_STYLE.contentStyle}
                    labelStyle={CHART_TOOLTIP_STYLE.labelStyle}
                  />
                  <Area
                    type="monotone"
                    dataKey="volumen"
                    stroke={CHART_COLORS.primary}
                    fill="url(#volumeGradient)"
                    animationDuration={1200}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
