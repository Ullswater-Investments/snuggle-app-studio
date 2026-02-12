import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight, Database, TrendingUp, Building2 } from "lucide-react";
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
  Legend,
} from "recharts";
import { getStatusLabel } from "@/lib/transactionStatusHelper";
import { CHART_COLORS } from "@/lib/chartTheme";

const DONUT_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.primaryLight,
  CHART_COLORS.secondaryLight,
  CHART_COLORS.primaryDark,
  CHART_COLORS.secondaryDark,
];

const AdminDashboard = () => {
  // Total organizations
  const { data: orgCount = 0 } = useQuery({
    queryKey: ["admin-org-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("organizations")
        .select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  // Total transactions
  const { data: txCount = 0 } = useQuery({
    queryKey: ["admin-tx-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("data_transactions")
        .select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  // Total data assets
  const { data: assetCount = 0 } = useQuery({
    queryKey: ["admin-asset-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("data_assets")
        .select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  // Transaction status distribution
  const { data: txByStatus = [] } = useQuery({
    queryKey: ["admin-tx-by-status"],
    queryFn: async () => {
      const { data } = await supabase
        .from("data_transactions")
        .select("status");
      if (!data) return [];
      const counts: Record<string, number> = {};
      data.forEach((tx) => {
        const label = getStatusLabel(tx.status);
        counts[label] = (counts[label] || 0) + 1;
      });
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    },
  });

  // Assets by category distribution
  const { data: assetsByCategory = [] } = useQuery({
    queryKey: ["admin-assets-by-category"],
    queryFn: async () => {
      const { data } = await supabase
        .from("data_assets")
        .select("product_id, data_products(category)");
      if (!data) return [];
      const counts: Record<string, number> = {};
      data.forEach((a: any) => {
        const cat = a.data_products?.category || "Sin categoría";
        counts[cat] = (counts[cat] || 0) + 1;
      });
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    },
  });

  const kpiCards = [
    {
      title: "Organizaciones Registradas",
      value: orgCount,
      icon: Building2,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Transacciones Totales",
      value: txCount,
      icon: ArrowLeftRight,
      color: "text-chart-2",
      bg: "bg-chart-2/10",
    },
    {
      title: "Data Assets Publicados",
      value: assetCount,
      icon: Database,
      color: "text-chart-3",
      bg: "bg-chart-3/10",
    },
    {
      title: "Tasa de Actividad",
      value: txCount > 0 && orgCount > 0 ? `${(txCount / orgCount).toFixed(1)} tx/org` : "—",
      icon: TrendingUp,
      color: "text-chart-4",
      bg: "bg-chart-4/10",
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Espacio de Datos PROCUREDATA</h1>
        <p className="text-muted-foreground">
          Panel de Control Maestro — Administrado por AGILE Procurement S.L.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${kpi.bg}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribución por Estado de Transacción</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={txByStatus}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribución de Activos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetsByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {assetsByCategory.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
