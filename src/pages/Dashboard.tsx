import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ActivityFeed } from "@/components/ActivityFeed";
import { DashboardStats } from "@/components/DashboardStats";
import { Web3StatusWidget } from "@/components/Web3StatusWidget";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";
import { DollarSign, ShoppingCart, Package, TrendingUp, ArrowUpRight, ArrowDownRight, CreditCard, Activity, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { CHART_COLORS, CHART_GRADIENTS, CHART_TOOLTIP_STYLE, CHART_GRID_STYLE } from "@/lib/chartTheme";

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
  } | null;
}

interface MonthlyData {
  name: string;
  revenue: number;
  spend: number;
}

// Process transactions into monthly chart data
const processTransactionsForChart = (
  transactions: TransactionData[] | undefined,
  orgId: string | undefined
): MonthlyData[] => {
  if (!transactions || !orgId) return [];

  const monthlyData: Record<string, { revenue: number; spend: number }> = {};
  
  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    const monthKey = format(date, "MMM", { locale: es });
    monthlyData[monthKey] = { revenue: 0, spend: 0 };
  }

  transactions.forEach((tx) => {
    if (tx.status !== "completed") return;
    
    const txDate = new Date(tx.created_at);
    const monthKey = format(txDate, "MMM", { locale: es });
    
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
  const isProvider = activeOrg?.type === 'provider' || activeOrg?.type === 'data_holder';

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
            currency
          )
        `)
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id}`)
        .gte("created_at", sixMonthsAgo)
        .order("created_at", { ascending: true });
      
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
  const chartData = processTransactionsForChart(transactions, activeOrg?.id);
  const { revenue, spend, prevRevenue, prevSpend } = calculateCurrentMonthMetrics(transactions, activeOrg?.id);
  
  // Calculate percentage changes
  const revenueChange = prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0;
  const spendChange = prevSpend > 0 ? ((spend - prevSpend) / prevSpend) * 100 : 0;
  
  const isLoading = walletLoading || transactionsLoading;

  const formatCurrency = (amount: number, currency: string = "EUR") => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container py-8 space-y-8 fade-in bg-muted/10 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hola, {activeOrg?.name}</h2>
          <p className="text-muted-foreground">
            {isProvider 
              ? "Resumen de rendimiento comercial y activos." 
              : "Resumen de consumo de datos y suscripciones."}
          </p>
        </div>
        <div className="flex gap-2">
          {isProvider ? (
            <Link to="/analytics">
              <Button variant="outline" className="gap-2"><TrendingUp className="h-4 w-4"/> Ver Analytics</Button>
            </Link>
          ) : (
            <Link to="/catalog">
              <Button variant="brand" className="gap-2"><ShoppingCart className="h-4 w-4"/> Ir al Mercado</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Wallet Balance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Balance Wallet
            </CardTitle>
            <Wallet className="h-4 w-4 text-[hsl(32_94%_54%)]" />
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
              {wallet ? "Disponible para transacciones" : "Sin wallet configurada"}
            </p>
          </CardContent>
        </Card>

        {/* Revenue/Spend this month */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isProvider ? "Ingresos del Mes" : "Gastos del Mes"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-[hsl(32_94%_50%)]" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">
                {formatCurrency(isProvider ? revenue : spend)}
              </div>
            )}
            <p className={`text-xs mt-1 flex items-center gap-1 ${
              (isProvider ? revenueChange : spendChange) >= 0 
                ? "text-green-600" 
                : "text-red-600"
            }`}>
              {(isProvider ? revenueChange : spendChange) >= 0 ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {Math.abs(isProvider ? revenueChange : spendChange).toFixed(1)}% vs mes anterior
            </p>
          </CardContent>
        </Card>

        {/* Active Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transacciones Activas
            </CardTitle>
            <Activity className="h-4 w-4 text-[hsl(32_94%_54%)]" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <div className="text-2xl font-bold">{activeTransactionsCount}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Pendientes de acción
            </p>
          </CardContent>
        </Card>

        {/* Completed Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completadas (6 meses)
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-[hsl(32_90%_50%)]" />
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
              Total de operaciones cerradas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards (existing component) */}
      <DashboardStats />

      {/* Financial Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <Card className="lg:col-span-2 shadow-sm border-blue-100 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Evolución Financiera</CardTitle>
            <CardDescription>
              Ingresos y gastos de los últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="w-full h-full" />
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id={CHART_GRADIENTS.primary.id} x1="0" y1="0" x2="0" y2="1">
                      {CHART_GRADIENTS.primary.stops.map((stop, i) => (
                        <stop key={i} offset={stop.offset} stopColor={CHART_GRADIENTS.primary.color} stopOpacity={stop.opacity}/>
                      ))}
                    </linearGradient>
                    <linearGradient id={CHART_GRADIENTS.secondary.id} x1="0" y1="0" x2="0" y2="1">
                      {CHART_GRADIENTS.secondary.stops.map((stop, i) => (
                        <stop key={i} offset={stop.offset} stopColor={CHART_GRADIENTS.secondary.color} stopOpacity={stop.opacity}/>
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
                    name="Ingresos"
                    stroke={CHART_COLORS.primary} 
                    fill={`url(#${CHART_GRADIENTS.primary.id})`} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="spend" 
                    name="Gastos"
                    stroke={CHART_COLORS.secondary} 
                    fill={`url(#${CHART_GRADIENTS.secondary.id})`} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay datos de transacciones aún</p>
                  <p className="text-sm">Completa transacciones para ver la evolución</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Side Widgets */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-[hsl(0_0%_15%)] to-[hsl(32_50%_25%)] text-white border-none shadow-xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-[hsl(32_94%_60%)]" />
                </div>
                <span className="text-xs font-medium bg-[hsl(32_94%_54%/0.3)] px-2 py-1 rounded text-white/90">Este mes</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-300">
                  {isProvider ? "Ventas Netas" : "Total Gastado"}
                </p>
                {isLoading ? (
                  <Skeleton className="h-9 w-28 bg-white/20" />
                ) : (
                  <h3 className="text-3xl font-bold">
                    {formatCurrency(isProvider ? revenue : spend)}
                  </h3>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm">
                {(isProvider ? revenueChange : spendChange) >= 0 ? (
                  <>
                    <ArrowUpRight className="h-4 w-4 text-[hsl(32_94%_70%)]" />
                    <span className="text-[hsl(32_94%_70%)]">
                      +{Math.abs(isProvider ? revenueChange : spendChange).toFixed(1)}% vs mes anterior
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-4 w-4 text-red-300" />
                    <span className="text-red-300">
                      {(isProvider ? revenueChange : spendChange).toFixed(1)}% vs mes anterior
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Web3 Wallet Status */}
          <Web3StatusWidget />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {isProvider ? (
                <>
                  <Link to="/catalog">
                    <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-3">
                      <Package className="h-4 w-4"/> Publicar Nuevo Activo
                    </Button>
                  </Link>
                  <Link to="/settings">
                    <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-3">
                      <CreditCard className="h-4 w-4"/> Configurar Payouts
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/catalog">
                    <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-3">
                      <ShoppingCart className="h-4 w-4"/> Ver Wishlist
                    </Button>
                  </Link>
                  <Link to="/settings">
                    <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-3">
                      <CreditCard className="h-4 w-4"/> Recargar Wallet
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Última Actividad</h3>
        <ActivityFeed />
      </div>
    </div>
  );
}