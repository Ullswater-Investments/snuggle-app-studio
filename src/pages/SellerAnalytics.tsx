import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { DollarSign, Eye, ShoppingBag, TrendingUp, Users, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CHART_COLORS, CHART_TOOLTIP_STYLE, CHART_GRID_STYLE } from "@/lib/chartTheme";

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
      const monthKey = format(monthDate, 'MMM', { locale: es });
      monthlyMap.set(monthKey, { revenue: 0, sales: 0 });
    }

    transactions.forEach(t => {
      const monthKey = format(new Date(t.created_at), 'MMM', { locale: es });
      const existing = monthlyMap.get(monthKey) || { revenue: 0, sales: 0 };
      monthlyMap.set(monthKey, {
        revenue: existing.revenue + (t.asset?.price || 0),
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
    transactions.forEach(t => {
      const productName = t.asset?.product?.name || 'Producto Desconocido';
      const existing = productMap.get(productName) || { revenue: 0, sales: 0 };
      productMap.set(productName, {
        revenue: existing.revenue + (t.asset?.price || 0),
        sales: existing.sales + 1,
      });
    });

    const productPerformance: ProductPerformance[] = Array.from(productMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Top customers
    const customerMap = new Map<string, { volume: number; purchases: number }>();
    transactions.forEach(t => {
      const customerName = t.consumer_org?.name || 'Cliente Desconocido';
      const existing = customerMap.get(customerName) || { volume: 0, purchases: 0 };
      customerMap.set(customerName, {
        volume: existing.volume + (t.asset?.price || 0),
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
      .filter(t => {
        const date = new Date(t.created_at);
        return date >= currentMonthStart && date <= currentMonthEnd;
      })
      .reduce((sum, t) => sum + (t.asset?.price || 0), 0);

    const previousMonthRevenue = transactions
      .filter(t => {
        const date = new Date(t.created_at);
        return date >= previousMonthStart && date <= previousMonthEnd;
      })
      .reduce((sum, t) => sum + (t.asset?.price || 0), 0);

    return {
      totalRevenue,
      totalSales,
      monthlyData,
      productPerformance,
      topCustomers,
      currentMonthRevenue,
      previousMonthRevenue,
    };
  }, [transactions]);

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
        <h2 className="text-2xl font-semibold">Acceso Restringido</h2>
        <p className="text-muted-foreground">
          Esta sección está reservada para Vendedores de Datos y Data Holders.
        </p>
      </div>
    );
  }

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);

  return (
    <div className="container py-8 space-y-8 fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Seller Studio</h2>
        <p className="text-muted-foreground">Analítica de rendimiento de tus activos de datos.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingTransactions ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{formatCurrency(analytics.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  {Number(revenueChange) >= 0 ? '+' : ''}{revenueChange}% vs mes anterior
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Completadas</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingTransactions ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{analytics.totalSales}</div>
                <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingTransactions ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{analytics.topCustomers.length}</div>
                <p className="text-xs text-muted-foreground">Compradores activos</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating Promedio</CardTitle>
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
                  Basado en {reviews?.length || 0} reseñas
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Monthly Revenue & Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ingresos y Ventas Mensuales</CardTitle>
            <CardDescription>Evolución de los últimos 6 meses.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {loadingTransactions ? (
              <Skeleton className="h-full w-full" />
            ) : analytics.monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.monthlyData}>
                  <CartesianGrid {...CHART_GRID_STYLE} />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'revenue' ? formatCurrency(value) : value,
                      name === 'revenue' ? 'Ingresos' : 'Ventas'
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
                    name="Ingresos (€)" 
                    dot={{ fill: CHART_COLORS.primary }}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="sales" 
                    stroke={CHART_COLORS.secondary} 
                    strokeWidth={2} 
                    name="Ventas" 
                    dot={{ fill: CHART_COLORS.secondary }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Sin datos de ventas aún
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Productos por Ingresos</CardTitle>
            <CardDescription>Rendimiento de tus activos más vendidos.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {loadingTransactions ? (
              <Skeleton className="h-full w-full" />
            ) : analytics.productPerformance.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.productPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-muted" />
                  <XAxis type="number" className="text-xs" tickFormatter={(v) => `€${v}`} />
                  <YAxis dataKey="name" type="category" width={120} className="text-xs" />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Ingresos']}
                    {...CHART_TOOLTIP_STYLE}
                    cursor={{ fill: 'hsl(var(--muted))' }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill={CHART_COLORS.primary} 
                    radius={[0, 4, 4, 0]} 
                    barSize={30}
                    name="Ingresos"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Sin productos vendidos aún
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
            Top 5 Clientes
          </CardTitle>
          <CardDescription>Tus mejores compradores por volumen de transacciones.</CardDescription>
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
                        {customer.purchases} {customer.purchases === 1 ? 'compra' : 'compras'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{formatCurrency(customer.volume)}</p>
                    <p className="text-xs text-muted-foreground">Volumen total</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Aún no tienes clientes registrados.</p>
              <p className="text-sm">Las ventas completadas aparecerán aquí.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
