import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, TrendingUp, TrendingDown, Clock, CheckCircle, Download, Calendar, FileSpreadsheet, Zap, Database, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { toast } from "sonner";
import { format, subDays, startOfYear, startOfMonth, endOfMonth, eachMonthOfInterval, isSameMonth } from "date-fns";
import { es, enUS, de, fr, pt, it, nl, Locale } from "date-fns/locale";
import jsPDF from "jspdf";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444", "#6366f1"];

type DateRange = "30days" | "90days" | "ytd";

interface OrgKPIs {
  approval_rate: number;
  avg_time_hours: number;
  compliance_percent: number;
  total_volume: number;
}

interface MonthlyTrend {
  month: string;
  gasto: number;
  ingreso: number;
}

interface TopProvider {
  name: string;
  volume: number;
  transactions: number;
}

const DATE_LOCALE_MAP: Record<string, Locale> = {
  es,
  en: enUS,
  de,
  fr,
  pt,
  it,
  nl,
};

const Reports = () => {
  const { t, i18n } = useTranslation("reports");
  const { activeOrg, isDemo } = useOrganizationContext();
  const [dateRange, setDateRange] = useState<DateRange>("90days");

  const currentLocale = DATE_LOCALE_MAP[i18n.language] || es;

  // Calculate date filter
  const getDateFilter = () => {
    const now = new Date();
    switch (dateRange) {
      case "30days":
        return subDays(now, 30);
      case "90days":
        return subDays(now, 90);
      case "ytd":
        return startOfYear(now);
      default:
        return subDays(now, 30);
    }
  };

  const dateFilter = getDateFilter();

  // Get status label translation
  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, string> = {
      pending_subject: t("status.pending_subject"),
      pending_holder: t("status.pending_holder"),
      approved: t("status.approved"),
      completed: t("status.completed"),
      cancelled: t("status.cancelled"),
      denied_subject: t("status.denied_subject"),
      denied_holder: t("status.denied_holder"),
    };
    return statusMap[status] || t("status.other");
  };

  // Fetch dynamic KPIs using RPC function
  const { data: kpis } = useQuery<OrgKPIs | null>({
    queryKey: ["org-kpis", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return null;
      const { data, error } = await supabase.rpc('get_org_kpis', { 
        target_org_id: activeOrg.id 
      });
      if (error) throw error;
      return data as unknown as OrgKPIs;
    },
    enabled: !!activeOrg,
  });

  // Fetch transactions grouped by status for activeOrg with date filter
  const { data: transactionsByStatus } = useQuery({
    queryKey: ["transactions-by-status", activeOrg?.id, dateRange, i18n.language],
    queryFn: async () => {
      if (!activeOrg) return [];

      const { data, error } = await supabase
        .from("data_transactions")
        .select("status, created_at")
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`)
        .gte("created_at", dateFilter.toISOString());

      if (error) throw error;

      const statusCount = data.reduce((acc, t) => {
        const label = getStatusLabel(t.status);
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(statusCount).map(([name, value]) => ({ name, value }));
    },
    enabled: !!activeOrg,
  });

  // Fetch top products for activeOrg with date filter
  const { data: topProducts } = useQuery({
    queryKey: ["top-products", activeOrg?.id, dateRange],
    queryFn: async () => {
      if (!activeOrg) return [];

      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          asset:data_assets (
            product:data_products (
              name
            ),
            price
          ),
          created_at
        `)
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`)
        .gte("created_at", dateFilter.toISOString());

      if (error) throw error;

      const productCounts = data.reduce((acc: Record<string, { count: number; revenue: number }>, t) => {
        const productName = t.asset?.product?.name || "Unknown";
        const price = t.asset?.price || 0;
        if (!acc[productName]) {
          acc[productName] = { count: 0, revenue: 0 };
        }
        acc[productName].count += 1;
        acc[productName].revenue += price;
        return acc;
      }, {});

      return Object.entries(productCounts)
        .map(([name, data]) => ({ name, count: data.count, revenue: data.revenue }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    },
    enabled: !!activeOrg,
  });

  // Fetch monthly trends for AreaChart
  const { data: monthlyTrends } = useQuery<MonthlyTrend[]>({
    queryKey: ["monthly-trends", activeOrg?.id, dateRange, i18n.language],
    queryFn: async () => {
      if (!activeOrg) return [];

      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          consumer_org_id,
          holder_org_id,
          created_at,
          asset:data_assets (price)
        `)
        .or(`consumer_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`)
        .gte("created_at", dateFilter.toISOString())
        .in("status", ["completed", "approved"]);

      if (error) throw error;

      // Generate months for the period
      const months = eachMonthOfInterval({
        start: dateFilter,
        end: new Date()
      });

      const trends: MonthlyTrend[] = months.map(month => {
        const monthData = data.filter(t => isSameMonth(new Date(t.created_at), month));
        
        const gasto = monthData
          .filter(t => t.consumer_org_id === activeOrg.id)
          .reduce((sum, t) => sum + (t.asset?.price || 0), 0);
        
        const ingreso = monthData
          .filter(t => t.holder_org_id === activeOrg.id)
          .reduce((sum, t) => sum + (t.asset?.price || 0), 0);

        return {
          month: format(month, "MMM", { locale: currentLocale }),
          gasto,
          ingreso
        };
      });

      return trends;
    },
    enabled: !!activeOrg,
  });

  // Fetch top providers/clients
  const { data: topProviders } = useQuery<TopProvider[]>({
    queryKey: ["top-providers", activeOrg?.id, dateRange],
    queryFn: async () => {
      if (!activeOrg) return [];

      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          holder_org_id,
          holder:organizations!data_transactions_holder_org_id_fkey (name),
          asset:data_assets (price)
        `)
        .eq("consumer_org_id", activeOrg.id)
        .gte("created_at", dateFilter.toISOString())
        .in("status", ["completed", "approved"]);

      if (error) throw error;

      const providerMap = data.reduce((acc: Record<string, { name: string; volume: number; transactions: number }>, t) => {
        const id = t.holder_org_id;
        const name = t.holder?.name || "Unknown";
        const price = t.asset?.price || 0;

        if (!acc[id]) {
          acc[id] = { name, volume: 0, transactions: 0 };
        }
        acc[id].volume += price;
        acc[id].transactions += 1;
        return acc;
      }, {});

      return Object.values(providerMap)
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 5);
    },
    enabled: !!activeOrg,
  });

  // Calculate totals from trends
  const totalGasto = monthlyTrends?.reduce((sum, m) => sum + m.gasto, 0) || 0;
  const totalIngreso = monthlyTrends?.reduce((sum, m) => sum + m.ingreso, 0) || 0;
  const datasetsActivos = topProducts?.length || 0;

  // Export PDF function
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    doc.setFontSize(20);
    doc.setTextColor(33, 33, 33);
    doc.text(t("pdf.title"), pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    const dateRangeLabel = t(`dateRange.${dateRange}`);
    doc.text(`${t("pdf.period")}: ${dateRangeLabel}`, pageWidth / 2, 28, { align: "center" });
    doc.text(`${t("pdf.generated")}: ${format(new Date(), "PPP", { locale: currentLocale })}`, pageWidth / 2, 35, { align: "center" });
    doc.text(`${t("pdf.organization")}: ${activeOrg?.name || "—"}`, pageWidth / 2, 42, { align: "center" });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 48, pageWidth - 20, 48);
    
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text(t("pdf.keyMetrics"), 20, 60);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    
    const kpiData = [
      [t("pdf.volumeTotal"), `€ ${totalGasto.toLocaleString(i18n.language)}`],
      [t("pdf.dataRevenue"), `€ ${totalIngreso.toLocaleString(i18n.language)}`],
      [t("kpis.activeDatasets"), `${datasetsActivos}`],
      [t("metrics.approvalRate"), `${kpis?.approval_rate ?? 0}%`],
      [t("pdf.avgTimeLabel"), kpis?.avg_time_hours ? 
        kpis.avg_time_hours >= 24 ? 
          `${(kpis.avg_time_hours / 24).toFixed(1)} ${t("metrics.days")}` : 
          `${kpis.avg_time_hours.toFixed(1)} ${t("metrics.hours")}` : "—"],
    ];
    
    let yPos = 70;
    kpiData.forEach(([label, value]) => {
      doc.text(`• ${label}: ${value}`, 25, yPos);
      yPos += 8;
    });
    
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text(t("pdf.transactionsByStatus"), 20, yPos + 10);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    yPos += 20;
    
    if (transactionsByStatus && transactionsByStatus.length > 0) {
      transactionsByStatus.forEach((item) => {
        doc.text(`• ${item.name}: ${item.value}`, 25, yPos);
        yPos += 8;
      });
    } else {
      doc.text(t("charts.noData"), 25, yPos);
      yPos += 8;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text(t("pdf.topRequestedProducts"), 20, yPos + 10);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    yPos += 20;
    
    if (topProducts && topProducts.length > 0) {
      topProducts.forEach((item: any, index: number) => {
        doc.text(`${index + 1}. ${item.name}: ${item.count} ${t("charts.requests")} (€ ${item.revenue.toLocaleString(i18n.language)})`, 25, yPos);
        yPos += 8;
      });
    } else {
      doc.text(t("charts.noData"), 25, yPos);
    }
    
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(t("pdf.footer"), pageWidth / 2, 280, { align: "center" });
    
    const fileName = `procuredata-report-${format(new Date(), "yyyy-MM-dd")}.pdf`;
    doc.save(fileName);
    
    toast.success(t("pdf.success"), {
      description: fileName,
    });
  };

  // Export CSV function
  const handleExportCSV = () => {
    const rows = [
      [t("csv.headers.type"), t("csv.headers.name"), t("csv.headers.value")],
      ...transactionsByStatus?.map(s => [t("csv.types.status"), s.name, s.value.toString()]) || [],
      ...topProducts?.map((p: any) => [t("csv.types.product"), p.name, p.count.toString()]) || [],
      ...topProviders?.map(p => [t("csv.types.provider"), p.name, p.volume.toString()]) || [],
    ];
    
    const csvContent = rows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `procuredata-data-${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.click();
    
    toast.success(t("csv.success"));
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500/10 via-background to-background border border-indigo-500/20 p-8">
          <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-3">
                {t("hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t("hero.description")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">{t("dateRange.30days")}</SelectItem>
                  <SelectItem value="90days">{t("dateRange.90days")}</SelectItem>
                  <SelectItem value="ytd">{t("dateRange.ytd")}</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExportCSV} variant="outline" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                CSV
              </Button>
              <Button onClick={handleExportPDF} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* KPI Cards Row */}
      <FadeIn delay={0.05}>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("kpis.totalSpend")}</p>
                  <p className="text-3xl font-bold">{totalGasto === 0 && (!monthlyTrends || monthlyTrends.length === 0) ? t("charts.noData") : `€ ${totalGasto.toLocaleString(i18n.language)}`}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200">
                    {t("kpis.consumption")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("kpis.revenue")}</p>
                  <p className="text-3xl font-bold">{totalIngreso === 0 && (!monthlyTrends || monthlyTrends.length === 0) ? t("charts.noData") : `€ ${totalIngreso.toLocaleString(i18n.language)}`}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <ArrowDownRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">
                    {t("kpis.provider")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("kpis.activeDatasets")}</p>
                  <p className="text-3xl font-bold">{datasetsActivos === 0 ? t("charts.noData") : datasetsActivos}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200">
                    {t("kpis.products")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("kpis.efficiency")}</p>
                  <p className="text-3xl font-bold">{(!kpis || kpis.total_volume === 0) ? t("charts.noData") : `${kpis.compliance_percent}%`}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200">
                    {t("kpis.uptime")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Trend Chart */}
      <FadeIn delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle>{t("charts.transactionsTrend")}</CardTitle>
            <CardDescription>
              {t("charts.trendDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {monthlyTrends && monthlyTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                  <defs>
                    <linearGradient id="gastoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="ingresoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `€${v}`} />
                  <Tooltip 
                    formatter={(value: number) => [`€ ${value.toLocaleString(i18n.language)}`, ""]}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="gasto" 
                    stroke="#ef4444" 
                    fill="url(#gastoGradient)" 
                    name={t("charts.spend")}
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ingreso" 
                    stroke="#10b981" 
                    fill="url(#ingresoGradient)" 
                    name={t("charts.income")}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                {t("charts.noTrendData")}
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("charts.byStatus")}</CardTitle>
              <CardDescription>
                {t("charts.statusDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {transactionsByStatus && transactionsByStatus.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={transactionsByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {transactionsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  {t("charts.noData")}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("charts.topProducts")}</CardTitle>
              <CardDescription>
                {t("charts.topProductsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {topProducts && topProducts.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProducts} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={120}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        name === "count" ? `${value} ${t("charts.requests")}` : `€ ${value.toLocaleString(i18n.language)}`,
                        name === "count" ? t("metrics.volume") : t("kpis.revenue")
                      ]}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  {t("charts.noData")}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Top Providers Table */}
      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>{t("charts.topProviders")}</CardTitle>
            <CardDescription>
              {t("charts.topProvidersDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topProviders && topProviders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("kpis.provider")}</TableHead>
                    <TableHead className="text-right">{t("metrics.volume")} (€)</TableHead>
                    <TableHead className="text-right"># {t("metrics.transactions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProviders.map((provider, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{provider.name}</TableCell>
                      <TableCell className="text-right">€ {provider.volume.toLocaleString(i18n.language)}</TableCell>
                      <TableCell className="text-right">{provider.transactions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {t("charts.noProvidersData")}
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      {/* Original KPIs Card */}
      <FadeIn delay={0.25}>
        <Card>
          <CardHeader>
            <CardTitle>{t("metrics.title")}</CardTitle>
            <CardDescription>
              {t("metrics.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("metrics.approvalRate")}
                  </p>
                  <p className={(!kpis || kpis.total_volume === 0) ? "text-base text-muted-foreground font-normal" : "text-2xl font-bold"}>
                    {(!kpis || kpis.total_volume === 0) ? t("charts.noData") : `${kpis.approval_rate}%`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {kpis?.total_volume ?? 0} {t("metrics.totalTransactions")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("metrics.avgTime")}
                  </p>
                  <p className={(!kpis || kpis.total_volume === 0 || !kpis.avg_time_hours) ? "text-base text-muted-foreground font-normal" : "text-2xl font-bold"}>
                    {(!kpis || kpis.total_volume === 0) ? t("charts.noData") : 
                      kpis.avg_time_hours ? 
                        kpis.avg_time_hours >= 24 ? 
                          `${(kpis.avg_time_hours / 24).toFixed(1)} ${t("metrics.days")}` : 
                          `${kpis.avg_time_hours.toFixed(1)} ${t("metrics.hours")}`
                        : t("charts.noData")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("metrics.fromRequestToApproval")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("metrics.compliance")}
                  </p>
                  <p className={(!kpis || kpis.total_volume === 0) ? "text-base text-muted-foreground font-normal" : "text-2xl font-bold"}>
                    {(!kpis || kpis.total_volume === 0) ? t("charts.noData") : `${kpis.compliance_percent}%`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("metrics.odrlPolicies")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default Reports;
