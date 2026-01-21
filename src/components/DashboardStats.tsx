import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Wallet, TrendingDown, ClipboardList, Building2 } from "lucide-react";
import { SparklineCard } from "@/components/dashboard/SparklineCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { MiniPieChart } from "@/components/dashboard/MiniPieChart";
import { HealthScoreGauge } from "@/components/dashboard/HealthScoreGauge";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const DashboardStats = () => {
  const { activeOrg, isDemo } = useOrganizationContext();
  const { t, i18n } = useTranslation('dashboard');

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats", activeOrg?.id, isDemo],
    queryFn: async () => {
      if (!activeOrg) return null;

      // Productos según rol
      let productsQuery = supabase.from("data_assets").select("*", { count: "exact", head: true });
      
      if (activeOrg.type === 'provider') {
        productsQuery = productsQuery.eq('subject_org_id', activeOrg.id);
      } else if (activeOrg.type === 'data_holder') {
        productsQuery = productsQuery.eq('holder_org_id', activeOrg.id);
      }
      
      const { count: productsCount } = await productsQuery;

      // Pendientes (solo lo que requiere MI atención)
      let pendingQuery = supabase.from("data_transactions").select("*", { count: "exact", head: true });
      
      if (activeOrg.type === 'provider') {
        pendingQuery = pendingQuery.eq('subject_org_id', activeOrg.id).eq('status', 'pending_subject');
      } else if (activeOrg.type === 'data_holder') {
        pendingQuery = pendingQuery.eq('holder_org_id', activeOrg.id).eq('status', 'pending_holder');
      } else {
        pendingQuery = pendingQuery.eq('consumer_org_id', activeOrg.id).in('status', ['pending_subject', 'pending_holder']);
      }

      const { count: pendingCount } = await pendingQuery;

      // Completadas este mes
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);
      firstDayOfMonth.setHours(0, 0, 0, 0);

      const { count: completedCount } = await supabase
        .from("data_transactions")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed")
        .gte("created_at", firstDayOfMonth.toISOString())
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`);

      // Get transaction status breakdown
      const { data: statusBreakdown } = await supabase
        .from("data_transactions")
        .select("status")
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`);

      const statusCounts = statusBreakdown?.reduce((acc, tx) => {
        acc[tx.status] = (acc[tx.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      // Total organizaciones
      let orgsQuery = supabase
        .from("organizations")
        .select("*", { count: "exact", head: true });

      if (isDemo) {
        orgsQuery = orgsQuery.eq("is_demo", true);
      }

      const { count: orgsCount } = await orgsQuery;

      // Get wallet balance
      const { data: wallet } = await supabase
        .from("wallets")
        .select("balance")
        .eq("organization_id", activeOrg.id)
        .single();

      // Get ESG data for health score
      const { data: esgData } = await supabase
        .from("esg_reports")
        .select("energy_renewable_percent")
        .eq("organization_id", activeOrg.id)
        .order("report_year", { ascending: false })
        .limit(1)
        .single();

      return {
        products: productsCount || 0,
        pending: pendingCount || 0,
        completed: completedCount || 0,
        organizations: orgsCount || 0,
        walletBalance: wallet?.balance || 0,
        statusCounts,
        esgScore: esgData?.energy_renewable_percent || 65
      };
    },
    enabled: !!activeOrg,
  });

  // Generate mock sparkline data for wallet trend
  const walletTrendData = useMemo(() => {
    const baseValue = stats?.walletBalance || 10000;
    return Array.from({ length: 7 }, (_, i) => ({
      value: baseValue * (0.85 + Math.random() * 0.3),
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(i18n.language === 'en' ? 'en-US' : `${i18n.language}-${i18n.language.toUpperCase()}`, { weekday: 'short' })
    }));
  }, [stats?.walletBalance, i18n.language]);

  // Transaction status pie chart data
  const transactionPieData = useMemo(() => {
    if (!stats?.statusCounts) return [];
    return [
      { name: t('stats.completed'), value: stats.statusCounts.completed || 0, color: "hsl(var(--chart-2))" },
      { name: t('stats.pending'), value: (stats.statusCounts.pending_subject || 0) + (stats.statusCounts.pending_holder || 0), color: "hsl(var(--chart-4))" },
      { name: t('stats.inProgress'), value: stats.statusCounts.approved || 0, color: "hsl(var(--chart-1))" }
    ].filter(item => item.value > 0);
  }, [stats?.statusCounts, t]);

  // Calculate health scores
  const healthScores = useMemo(() => {
    const dataQuality = Math.min(95, 60 + (stats?.products || 0) * 5);
    const sustainability = stats?.esgScore || 65;
    const activity = Math.min(95, 50 + (stats?.completed || 0) * 3 + (stats?.pending || 0) * 2);
    return { dataQuality, sustainability, activity };
  }, [stats]);

  if (!stats) return null;

  const totalTransactions = Object.values(stats.statusCounts || {}).reduce((a, b) => a + b, 0);
  const budgetProgress = Math.min(95, Math.round((stats.completed / Math.max(stats.products, 1)) * 100));

  return (
    <div className="space-y-4">
      {/* Main KPI Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SparklineCard
          title={t('stats.walletBalance')}
          value={stats.walletBalance}
          data={walletTrendData}
          trend={12.5}
          icon={Wallet}
          iconColor="text-[hsl(32_94%_54%)]"
          currency
          positive
        />

        <ProgressCard
          title={t('stats.monthlySpend')}
          value={Math.round(stats.walletBalance * 0.15)}
          progress={budgetProgress}
          progressLabel={t('stats.ofBudget')}
          trend={-5.2}
          icon={TrendingDown}
          iconColor="text-[hsl(32_94%_44%)]"
          currency
        />

        <MiniPieChart
          title={t('stats.transactions')}
          total={totalTransactions}
          data={transactionPieData.length > 0 ? transactionPieData : [
            { name: t('stats.noData'), value: 1, color: "hsl(var(--muted))" }
          ]}
          icon={ClipboardList}
          iconColor="text-[hsl(0_0%_35%)] dark:text-[hsl(0_0%_65%)]"
        />

        <HealthScoreGauge
          dataQuality={healthScores.dataQuality}
          sustainability={healthScores.sustainability}
          activity={healthScores.activity}
        />
      </div>
    </div>
  );
};
