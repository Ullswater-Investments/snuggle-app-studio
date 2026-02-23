import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { DollarSign, Eye, ShoppingBag, TrendingUp, Users, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { es, fr, pt, de, it, nl, enUS } from "date-fns/locale";
import { Locale } from "date-fns";
import { CHART_COLORS, CHART_TOOLTIP_STYLE, CHART_GRID_STYLE, CHART_ANIMATION_CONFIG } from "@/lib/chartTheme";
import { StaggerContainer, StaggerItem, ChartFadeIn } from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";

const dateFnsLocales: Record<string, Locale> = { es, fr, pt, de, it, nl, en: enUS };

const intlLocaleMap: Record<string, string> = {
  es: 'es-ES',
  en: 'en-US',
  fr: 'fr-FR',
  pt: 'pt-PT',
  de: 'de-DE',
  it: 'it-IT',
  nl: 'nl-NL',
};

interface TransactionWithDetails {
  id: string;
  created_at: string;
  consumer_org_id: string;
  consumer_org: { name: string } | null;
  asset: {
    id: string;
    price: number | null;
    product: { name: string } | null;
  } | null;
}

interface ProductPerformance {
  name: string;
  revenue: number;
  sales: number;
}

interface TopCustomer {
  name: string;
  volume: number;
  purchases: number;
}

interface MonthlyData {
  month: string;
  revenue: number;
  sales: number;
}

export default function SellerAnalytics() {
  const { activeOrg, isDemo } = useOrganizationContext();
  const { t, i18n } = useTranslation('analytics');

  const lang = i18n.language?.split('-')[0] || 'es';
  const dfLocale = dateFnsLocales[lang] || dateFnsLocales.es;
  const intlLocale = intlLocaleMap[lang] || 'es-ES';

  // Fetch completed transactions where org is the seller (subject_org_id)
  const { data: transactions, isLoading: loadingTransactions } = useQuery({
    queryKey: ['seller-analytics', activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg?.id) return [];
      
      const sixMonthsAgo = subMonths(new Date(), 6).toISOString();
      
      const { data, error } = await supabase
        .from('data_transactions')
        .select(`
          id,
          created_at,
          consumer_org_id,
          consumer_org:organizations!consumer_org_id(name),
          asset:data_assets!asset_id(
            id,
            price,
            product:data_products!product_id(name)
          )
        `)
        .eq('subject_org_id', activeOrg.id)
        .eq('status', 'completed')
        .gte('created_at', sixMonthsAgo)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as TransactionWithDetails[];
    },
    enabled: !!activeOrg?.id && activeOrg.type !== 'consumer',
  });

  // Fetch organization reviews for rating
  const { data: reviews } = useQuery({
    queryKey: ['seller-reviews', activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg?.id) return [];
      
      const { data, error } = await supabase
        .from('organization_reviews')
        .select('rating')
        .eq('target_org_id', activeOrg.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!activeOrg?.id && activeOrg.type !== 'consumer',
  });

  // Process data for charts and KPIs
  const analytics = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        totalRevenue: 0,
        totalSales: 0,
        monthlyData: [] as MonthlyData[],
        productPerformance: [] as ProductPerformance[],
        topCustomers: [] as TopCustomer[],
        currentMonthRevenue: 0,
        previousMonthRevenue: 0,
      };
    }

    // Total revenue and sales
    const totalRevenue = transactions.reduce((sum, t) => sum + (t.asset?.price || 0), 0);
    const totalSales = transactions.length;

    // Monthly data for chart
    const monthlyMap = new Map<string, { revenue: number; sales: number }>();
    const now = new Date();
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const monthKey = format(monthDate, 'MMM', { locale: dfLocale });
      monthlyMap.set(monthKey, { revenue: 0, sales: 0 });
    }

    transactions.forEach(tx => {
      const monthKey = format(new Date(tx.created_at), 'MMM', { locale: dfLocale });
      const existing = monthlyMap.get(monthKey) || { revenue: 0, sales: 0 };
      monthlyMap.set(monthKey, {
        revenue: existing.revenue + (tx.asset?.price || 0),
        sales: existing.sales + 1,
      });
    });

    const monthlyData: MonthlyData[] = Array.from(monthlyMap.entries()).map(([month, data]) => ({
      month,
      revenue: data.revenue,
      sales: data.sales,
    }));

    // Product performance
    const productMap = new Map<string, { revenue: number; sales: number }>();
    transactions.forEach(tx => {
      const productName = tx.asset?.product?.name || t('charts.unknownProduct');
      const existing = productMap.get(productName) || { revenue: 0, sales: 0 };
      productMap.set(productName, {
        revenue: existing.revenue + (tx.asset?.price || 0),
        sales: existing.sales + 1,
      });
    });

    const productPerformance: ProductPerformance[] = Array.from(productMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Top customers
    const customerMap = new Map<string, { volume: number; purchases: number }>();
    transactions.forEach(tx => {
      const customerName = tx.consumer_org?.name || t('customers.unknownCustomer');
      const existing = customerMap.get(customerName) || { volume: 0, purchases: 0 };
      customerMap.set(customerName, {
        volume: existing.volume + (tx.asset?.price || 0),
        purchases: existing.purchases + 1,
      });
    });

    const topCustomers: TopCustomer[] = Array.from(customerMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 5);

    // Current vs previous month
    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);
    const previousMonthStart = startOfMonth(subMonths(now, 1));
    const previousMonthEnd = endOfMonth(subMonths(now, 1));

    const currentMonthRevenue = transactions
      .filter(tx => {
        const date = new Date(tx.created_at);
        return date >= currentMonthStart && date <= currentMonthEnd;
      })
      .reduce((sum, tx) => sum + (tx.asset?.price || 0), 0);

    const previousMonthRevenue = transactions
      .filter(tx => {
        const date = new Date(tx.created_at);
        return date >= previousMonthStart && date <= previousMonthEnd;
      })
      .reduce((sum, tx) => sum + (tx.asset?.price || 0), 0);

    return {
      totalRevenue,
      totalSales,
      monthlyData,
      productPerformance,
      topCustomers,
      currentMonthRevenue,
      previousMonthRevenue,
    };
  }, [transactions, dfLocale, t]);

  // Calculate rating
  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews]);

  const revenueChange = analytics.previousMonthRevenue > 0
    ? ((analytics.currentMonthRevenue - analytics.previousMonthRevenue) / analytics.previousMonthRevenue * 100).toFixed(1)
    : '0';

  // Redirigir o mostrar error si no es provider
  if (activeOrg?.type === 'consumer') {
    return (
      <div className="container py-16 text-center space-y-4">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
        <h2 className="text-2xl font-semibold">{t('restricted.title')}</h2>
        <p className="text-muted-foreground">
          {t('restricted.description')}
        </p>
      </div>
    );
  }

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat(intlLocale, { style: 'currency', currency: 'EUR' }).format(value);

  return (
    <div className="container py-8 space-y-8 fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* KPI Cards */}
      <StaggerContainer className="grid gap-4 md:grid-cols-4">
        <StaggerItem>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('kpis.revenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingTransactions ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{formatCurrency(analytics.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  {Number(revenueChange) >= 0 ? '+' : ''}{revenueChange}% {t('kpis.vsPreviousMonth')}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        </StaggerItem>
        <StaggerItem>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('kpis.completedSales')}</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingTransactions ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{analytics.totalSales}</div>
                <p className="text-xs text-muted-foreground">{t('kpis.last6Months')}</p>
              </>
            )}
          </CardContent>
        </Card>
        </StaggerItem>
        <StaggerItem>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('kpis.uniqueCustomers')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingTransactions ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{analytics.topCustomers.length}</div>
                <p className="text-xs text-muted-foreground">{t('kpis.activeBuyers')}</p>
              </>
            )}
          </CardContent>
        </Card>
        </StaggerItem>
        <StaggerItem>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('kpis.averageRating')}</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingTransactions ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {averageRating > 0 ? `${averageRating.toFixed(1)}/5.0` : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('kpis.basedOnReviews', { count: reviews?.length || 0 })}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Monthly Revenue & Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('charts.monthlyRevenueSales')}</CardTitle>
            <CardDescription>{t('charts.last6MonthsEvolution')}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {loadingTransactions ? (
              <Skeleton className="h-full w-full" />
            ) : analytics.monthlyData.length > 0 ? (
              <ChartFadeIn delay={0.1} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.monthlyData}>
                  <CartesianGrid {...CHART_GRID_STYLE} />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'revenue' ? formatCurrency(value) : value,
                      name === 'revenue' ? t('charts.revenueLabel') : t('charts.sales')
                    ]}
                    {...CHART_TOOLTIP_STYLE}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke={CHART_COLORS.primary} 
                    strokeWidth={2} 
                    name={t('charts.revenueEur')}
                    dot={{ fill: CHART_COLORS.primary }}
                    animationDuration={CHART_ANIMATION_CONFIG.line.animationDuration}
                    animationEasing={CHART_ANIMATION_CONFIG.line.animationEasing}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="sales" 
                    stroke={CHART_COLORS.secondary} 
                    strokeWidth={2} 
                    name={t('charts.sales')}
                    dot={{ fill: CHART_COLORS.secondary }}
                    animationDuration={CHART_ANIMATION_CONFIG.line.animationDuration}
                    animationEasing={CHART_ANIMATION_CONFIG.line.animationEasing}
                  />
                </LineChart>
              </ResponsiveContainer>
              </ChartFadeIn>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                {t('charts.noSalesData')}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('charts.topProducts')}</CardTitle>
            <CardDescription>{t('charts.topProductsDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {loadingTransactions ? (
              <Skeleton className="h-full w-full" />
            ) : analytics.productPerformance.length > 0 ? (
              <ChartFadeIn delay={0.2} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.productPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-muted" />
                  <XAxis type="number" className="text-xs" tickFormatter={(v) => `€${v}`} />
                  <YAxis dataKey="name" type="category" width={120} className="text-xs" />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), t('charts.revenueLabel')]}
                    {...CHART_TOOLTIP_STYLE}
                    cursor={{ fill: 'hsl(var(--muted))' }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill={CHART_COLORS.primary} 
                    radius={[0, 4, 4, 0]} 
                    barSize={30}
                    name={t('charts.revenueLabel')}
                    animationDuration={CHART_ANIMATION_CONFIG.bar.animationDuration}
                    animationBegin={CHART_ANIMATION_CONFIG.bar.animationBegin}
                    animationEasing={CHART_ANIMATION_CONFIG.bar.animationEasing}
                  />
                </BarChart>
              </ResponsiveContainer>
              </ChartFadeIn>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                {t('charts.noProductsSold')}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Customers Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t('customers.top5')}
          </CardTitle>
          <CardDescription>{t('customers.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingTransactions ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
              ))}
            </div>
          ) : analytics.topCustomers.length > 0 ? (
            <div className="space-y-3">
              {analytics.topCustomers.map((customer, index) => (
                <div 
                  key={customer.name} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {customer.purchases} {customer.purchases === 1 ? t('customers.purchase') : t('customers.purchases')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{formatCurrency(customer.volume)}</p>
                    <p className="text-xs text-muted-foreground">{t('customers.totalVolume')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>{t('customers.noCustomers')}</p>
              <p className="text-sm">{t('customers.salesWillAppear')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
