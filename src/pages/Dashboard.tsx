import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActivityFeed } from "@/components/ActivityFeed";
import { DashboardStats } from "@/components/DashboardStats";
import { RecentTransactions } from "@/components/RecentTransactions";
import { EnhancedWalletCard } from "@/components/EnhancedWalletCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";
import { DollarSign, ShoppingCart, Package, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Wallet, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { es, enUS, de, fr, pt, it, nl, Locale } from "date-fns/locale";
import { CHART_COLORS, CHART_GRADIENTS, CHART_TOOLTIP_STYLE, CHART_GRID_STYLE, CHART_ANIMATION_CONFIG } from "@/lib/chartTheme";
import { StaggerContainer, StaggerItem, ChartFadeIn } from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";
import { formatCurrency as formatCurrencyI18n } from "@/lib/i18nFormatters";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { OrganizationCardsGrid } from "@/components/OrganizationCardsGrid";

interface WalletData {
  id: string;
  balance: number;
  currency: string;
}

interface TransactionData {
  id: string;
  created_at: string;
  status: string;
  consumer_org_id: string;
  subject_org_id: string;
  asset: {
    price: number;
    currency: string;
    product?: {
      name: string;
      category: string;
    };
  } | null;
  consumer_org?: { name: string };
  subject_org?: { name: string };
}

interface MonthlyData {
  name: string;
  revenue: number;
  spend: number;
}

const localeMap: Record<string, Locale> = { es, en: enUS, de, fr, pt, it, nl };

// Process transactions into monthly chart data
const processTransactionsForChart = (
  transactions: TransactionData[] | undefined,
  orgId: string | undefined,
  locale: Locale
): MonthlyData[] => {
  if (!transactions || !orgId) return [];

  const monthlyData: Record<string, { revenue: number; spend: number }> = {};

  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    const monthKey = format(date, "MMM", { locale });
    monthlyData[monthKey] = { revenue: 0, spend: 0 };
  }

  transactions.forEach((tx) => {
    if (tx.status !== "completed") return;

    const txDate = new Date(tx.created_at);
    const monthKey = format(txDate, "MMM", { locale });

    if (!monthlyData[monthKey]) return;

    const amount = tx.asset?.price || 0;

    // Revenue: when org is the provider (subject)
    if (tx.subject_org_id === orgId) {
      monthlyData[monthKey].revenue += amount;
    }

    // Spend: when org is the consumer
    if (tx.consumer_org_id === orgId) {
      monthlyData[monthKey].spend += amount;
    }
  });

  return Object.entries(monthlyData).map(([name, data]) => ({
    name,
    revenue: data.revenue,
    spend: data.spend,
  }));
};

// Calculate current month metrics
const calculateCurrentMonthMetrics = (
  transactions: TransactionData[] | undefined,
  orgId: string | undefined
) => {
  if (!transactions || !orgId) return { revenue: 0, spend: 0, prevRevenue: 0, prevSpend: 0 };

  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);
  const prevMonthStart = startOfMonth(subMonths(now, 1));
  const prevMonthEnd = endOfMonth(subMonths(now, 1));

  let revenue = 0, spend = 0, prevRevenue = 0, prevSpend = 0;

  transactions.forEach((tx) => {
    if (tx.status !== "completed") return;

    const txDate = new Date(tx.created_at);
    const amount = tx.asset?.price || 0;

    const isCurrentMonth = txDate >= currentMonthStart && txDate <= currentMonthEnd;
    const isPrevMonth = txDate >= prevMonthStart && txDate <= prevMonthEnd;

    if (tx.subject_org_id === orgId) {
      if (isCurrentMonth) revenue += amount;
      if (isPrevMonth) prevRevenue += amount;
    }

    if (tx.consumer_org_id === orgId) {
      if (isCurrentMonth) spend += amount;
      if (isPrevMonth) prevSpend += amount;
    }
  });

  return { revenue, spend, prevRevenue, prevSpend };
};

export default function Dashboard() {
  const { activeOrg } = useOrganizationContext();
  const { t, i18n } = useTranslation('dashboard');
  const isProvider = activeOrg?.type === 'provider' || activeOrg?.type === 'data_holder';
  const currentLocale = localeMap[i18n.language] || es;

  // Mock data for when no real data exists - localized
  const MOCK_CHART_DATA: MonthlyData[] = (() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      months.push({
        name: format(date, "MMM", { locale: currentLocale }),
        revenue: [4200, 5100, 3800, 6200, 4800, 5500][5 - i],
        spend: [2800, 3200, 4500, 2900, 3600, 3100][5 - i],
      });
    }
    return months;
  })();

  // Fetch wallet balance
  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ["wallet", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return null;

      const { data, error } = await supabase
        .from("wallets")
        .select("id, balance, currency")
        .eq("organization_id", activeOrg.id)
        .maybeSingle();

      if (error) throw error;
      return data as WalletData | null;
    },
    enabled: !!activeOrg,
  });

  // Fetch transactions for the last 6 months
  const sixMonthsAgo = subMonths(new Date(), 6).toISOString();

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ["dashboard-transactions", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return [];

      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          id,
          created_at,
          status,
          consumer_org_id,
          subject_org_id,
          asset:data_assets (
            price,
            currency,
            product:data_products (
              name,
              category
            )
          ),
          consumer_org:organizations!data_transactions_consumer_org_id_fkey (name),
          subject_org:organizations!data_transactions_subject_org_id_fkey (name)
        `)
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id}`)
        .gte("created_at", sixMonthsAgo)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as TransactionData[];
    },
    enabled: !!activeOrg,
  });

  // Fetch active transactions count (not completed or cancelled)
  const { data: activeTransactionsCount } = useQuery({
    queryKey: ["active-transactions-count", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return 0;

      const { count, error } = await supabase
        .from("data_transactions")
        .select("id", { count: "exact", head: true })
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`)
        .not("status", "in", '("completed","cancelled","denied_subject","denied_holder")');

      if (error) throw error;
      return count || 0;
    },
    enabled: !!activeOrg,
  });

  // Process data
  const realChartData = processTransactionsForChart(transactions, activeOrg?.id, currentLocale);
  const hasRealData = realChartData.some(d => d.revenue > 0 || d.spend > 0);
  const chartData = hasRealData ? realChartData : MOCK_CHART_DATA;

  const { revenue, spend, prevRevenue, prevSpend } = calculateCurrentMonthMetrics(transactions, activeOrg?.id);

  // Calculate percentage changes
  const revenueChange = prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0;
  const spendChange = prevSpend > 0 ? ((spend - prevSpend) / prevSpend) * 100 : 0;

  // For demo: calculate display values
  const displayRevenue = hasRealData ? revenue : 5500;
  const displaySpend = hasRealData ? spend : 3100;
  const displayRevenueChange = hasRealData ? revenueChange : 14.6;
  const displaySpendChange = hasRealData ? spendChange : -13.9;

  // Calculate category breakdown
  const categoryBreakdown = (() => {
    const categoryMap: Record<string, number> = {};

    (transactions || []).forEach((tx) => {
      const isRelevant = isProvider
        ? tx.subject_org_id === activeOrg?.id
        : tx.consumer_org_id === activeOrg?.id;

      if (isRelevant && tx.status === "completed") {
        const category = tx.asset?.product?.category || t('wallet.others');
        const amount = tx.asset?.price || 0;
        categoryMap[category] = (categoryMap[category] || 0) + amount;
      }
    });

    // If no real data, use mock
    if (Object.keys(categoryMap).length === 0) {
      return [
        { category: "ESG", amount: 680, percentage: 42 },
        { category: "Logística", amount: 565, percentage: 35 },
        { category: "IoT", amount: 242, percentage: 15 },
        { category: t('wallet.others'), amount: 129, percentage: 8 },
      ];
    }

    const total = Object.values(categoryMap).reduce((a, b) => a + b, 0);

    return Object.entries(categoryMap)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total > 0 ? Math.round((amount / total) * 100) : 0
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 4);
  })();

  const isLoading = walletLoading || transactionsLoading;

  const formatCurrency = (amount: number, currency: string = "EUR") => {
    return formatCurrencyI18n(amount, i18n.language, currency);
  };

  // Check if user has no organizations - but don't return early before hooks
  // In Emilio, availableOrgs comes from useOrganizationContext presumably
  // We need to verify if availableOrgs exists in the context or if we need to derive it
  const { availableOrgs, loading } = useOrganizationContext();
  const hasNoOrganization = !loading && availableOrgs.length === 0;

  // Show welcome screen if user has no organizations
  if (hasNoOrganization) {
    return <WelcomeScreen />;
  }

  // Show loading state while checking organizations
  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">{t('loading', 'Cargando...')}</p>
        </div>
      </div>
    );
  }

  // Show organization selection if user has orgs but none selected
  if (!activeOrg && availableOrgs.length > 0) {
    return <OrganizationCardsGrid />;
  }

  return (
    <div className="container py-8 space-y-8 fade-in bg-muted/10 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('greeting')} {activeOrg?.name}</h2>
          <p className="text-muted-foreground">
            {isProvider
              ? t('summary.provider')
              : t('summary.consumer')}
          </p>
        </div>
        <div className="flex gap-2">
          {isProvider ? (
            <Link to="/analytics">
              <Button variant="outline" className="gap-2"><TrendingUp className="h-4 w-4" /> {t('buttons.viewAnalytics')}</Button>
            </Link>
          ) : (
            <Link to="/catalog">
              <Button variant="brand" className="gap-2"><ShoppingCart className="h-4 w-4" /> {t('buttons.goToMarket')}</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Financial KPIs */}
      <StaggerContainer className="grid gap-4 md:grid-cols-4">
        {/* Wallet Balance */}
        <StaggerItem>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('cards.walletBalance')}
              </CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">
                  {formatCurrency(wallet?.balance || 0, wallet?.currency || "EUR")}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {wallet ? t('cards.walletAvailable') : t('cards.walletNotConfigured')}
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* Revenue/Spend this month */}
        <StaggerItem>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {isProvider ? t('cards.revenueMonth') : t('cards.spendMonth')}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">
                  {formatCurrency(isProvider ? revenue : spend)}
                </div>
              )}
              <p className={`text-xs mt-1 flex items-center gap-1 ${(isProvider ? revenueChange : spendChange) >= 0
                ? "text-green-600"
                : "text-red-600"
                }`}>
                {(isProvider ? revenueChange : spendChange) >= 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {Math.abs(isProvider ? revenueChange : spendChange).toFixed(1)}% {t('cards.vsPrevMonth')}
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* Active Transactions */}
        <StaggerItem>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('cards.activeTransactions')}
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <div className="text-2xl font-bold">{activeTransactionsCount}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {t('cards.pendingAction')}
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        {/* Completed Transactions */}
        <StaggerItem>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('cards.completed6Months')}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <div className="text-2xl font-bold">
                  {transactions?.filter(t => t.status === "completed").length || 0}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {t('cards.totalClosed')}
              </p>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Stats Cards (existing component) */}
      <DashboardStats />

      {/* Financial Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Chart */}
        <Card className="lg:col-span-2 shadow-sm relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('chart.title')}</CardTitle>
                <CardDescription>
                  {t('chart.description')}
                </CardDescription>
              </div>
              {!hasRealData && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                  <Info className="h-3 w-3 mr-1" />
                  {t('chart.demoData')}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="w-full h-full" />
              </div>
            ) : (
              <ChartFadeIn delay={0.2} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id={CHART_GRADIENTS.primary.id} x1="0" y1="0" x2="0" y2="1">
                        {CHART_GRADIENTS.primary.stops.map((stop, i) => (
                          <stop key={i} offset={stop.offset} stopColor={CHART_GRADIENTS.primary.color} stopOpacity={stop.opacity} />
                        ))}
                      </linearGradient>
                      <linearGradient id={CHART_GRADIENTS.secondary.id} x1="0" y1="0" x2="0" y2="1">
                        {CHART_GRADIENTS.secondary.stops.map((stop, i) => (
                          <stop key={i} offset={stop.offset} stopColor={CHART_GRADIENTS.secondary.color} stopOpacity={stop.opacity} />
                        ))}
                      </linearGradient>
                    </defs>
                    <CartesianGrid {...CHART_GRID_STYLE} />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      {...CHART_TOOLTIP_STYLE}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name={t('chart.revenue')}
                      stroke={CHART_COLORS.primary}
                      fill={`url(#${CHART_GRADIENTS.primary.id})`}
                      animationDuration={CHART_ANIMATION_CONFIG.area.animationDuration}
                      animationEasing={CHART_ANIMATION_CONFIG.area.animationEasing}
                    />
                    <Area
                      type="monotone"
                      dataKey="spend"
                      name={t('chart.expenses')}
                      stroke={CHART_COLORS.secondary}
                      fill={`url(#${CHART_GRADIENTS.secondary.id})`}
                      animationDuration={CHART_ANIMATION_CONFIG.area.animationDuration}
                      animationEasing={CHART_ANIMATION_CONFIG.area.animationEasing}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartFadeIn>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Wallet Card */}
        <EnhancedWalletCard
          totalBalance={isProvider ? displayRevenue : displaySpend}
          change={isProvider ? displayRevenueChange : displaySpendChange}
          categoryBreakdown={categoryBreakdown}
          isLoading={isLoading}
          isProvider={isProvider}
        />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={transactions || []}
        activeOrgId={activeOrg?.id}
        isLoading={isLoading}
        isDemo={!hasRealData}
      />

      {/* Activity Feed */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">{t('activity.title')}</h3>
        <ActivityFeed />
      </div>
    </div>
  );
}
