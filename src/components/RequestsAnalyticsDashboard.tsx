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
import { es, enUS, fr, de, it, pt, nl } from "date-fns/locale";
import { TrendingUp, TrendingDown, Clock, Zap, Activity, PieChartIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

const DATE_LOCALES: Record<string, typeof es> = { es, en: enUS, fr, de, it, pt, nl };

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

export function RequestsAnalyticsDashboard({ transactions, activeOrgId }: RequestsAnalyticsDashboardProps) {
  const { t, i18n } = useTranslation('requests');
  const queryClient = useQueryClient();
  const dateLocale = DATE_LOCALES[i18n.language] || es;

  const getStatusLabel = (status: string) => {
    const key = `status.${status}.label`;
    const translated = t(key);
    return translated !== key ? translated : status;
  };

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
        date: format(day, "dd MMM", { locale: dateLocale }),
        fullDate: dayStr,
        [t('realtime.transactions')]: count,
      };
    });
  }, [transactions, dateLocale, t]);

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
        const weekStart = format(startOfWeek(value.created, { locale: dateLocale }), "dd MMM", { locale: dateLocale });
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
  }, [transactions, approvalHistory, dateLocale]);

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
      name: getStatusLabel(status),
      value: count,
      status,
    }));
  }, [transactions, i18n.language]);

  // Weekly trend (area chart)
  const weeklyTrend = useMemo(() => {
    const weeks: Record<string, number> = {};

    transactions.forEach((t) => {
      const weekStart = format(startOfWeek(parseISO(t.created_at), { locale: dateLocale }), "dd MMM", { locale: dateLocale });
      weeks[weekStart] = (weeks[weekStart] || 0) + 1;
    });

    return Object.entries(weeks)
      .slice(-12)
      .map(([semana, count]) => ({
        semana,
        [t('realtime.volume')]: count,
      }));
  }, [transactions, dateLocale, t]);

  // Calculate week-over-week change
  const weeklyChange = useMemo(() => {
    const now = new Date();
    const thisWeekStart = startOfWeek(now, { locale: dateLocale });
    const lastWeekStart = subDays(thisWeekStart, 7);

    const thisWeek = transactions.filter((t) => parseISO(t.created_at) >= thisWeekStart).length;
    const lastWeek = transactions.filter((t) => {
      const date = parseISO(t.created_at);
      return date >= lastWeekStart && date < thisWeekStart;
    }).length;

    if (lastWeek === 0) return thisWeek > 0 ? 100 : 0;
    return Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  }, [transactions, dateLocale]);

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
              {t('realtime.title')}
            </CardTitle>
            <CardDescription>{t('realtime.subtitle')}</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500 animate-pulse inline-block" />
            {t('realtime.live')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Clock className="h-4 w-4" />
              {t('realtime.avgTime')}
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
            <p className="text-xs text-muted-foreground">{t('realtime.untilApproval')}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Zap className="h-4 w-4" />
              {t('realtime.approvalRate')}
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{approvalRate}%</div>
            <p className="text-xs text-muted-foreground">{t('realtime.approvedRequests')}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Activity className="h-4 w-4" />
              {t('realtime.thisWeek')}
            </div>
            <div className="text-2xl font-bold">
              {transactions.filter((t) => parseISO(t.created_at) >= startOfWeek(new Date(), { locale: dateLocale })).length}
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
              <span className="text-muted-foreground">{t('realtime.vsPrevious')}</span>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <PieChartIcon className="h-4 w-4" />
              {t('realtime.pending')}
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {transactions.filter((t) => ["pending_subject", "pending_holder", "initiated"].includes(t.status)).length}
            </div>
            <p className="text-xs text-muted-foreground">{t('realtime.requireAction')}</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Daily Volume Bar Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">{t('realtime.dailyVolume')}</h4>
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
                    dataKey={t('realtime.transactions')}
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
            <h4 className="font-medium text-sm">{t('realtime.approvalSpeed')}</h4>
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
                      formatter={(value: number) => [`${value}h`, t('realtime.average')]}
                    />
                    <ReferenceLine y={4} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" label={{ value: `${t('realtime.goal')} 4h`, fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
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
                  {t('realtime.noApprovalData')}
                </div>
              )}
            </div>
          </div>

          {/* Status Distribution Pie Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">{t('realtime.statusDistribution')}</h4>
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
            <h4 className="font-medium text-sm">{t('realtime.weeklyTrend')}</h4>
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
                    dataKey={t('realtime.volume')}
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
