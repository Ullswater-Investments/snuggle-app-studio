import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight, Database, TrendingUp, Building2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { CHART_COLORS } from "@/lib/chartTheme";

const DONUT_COLORS = [
  CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.primaryLight,
  CHART_COLORS.secondaryLight, CHART_COLORS.primaryDark, CHART_COLORS.secondaryDark,
];

const STATUS_KEY_MAP: Record<string, string> = {
  completed: "transactions.statusCompleted",
  approved: "transactions.statusApproved",
  initiated: "transactions.statusInitiated",
  pending_subject: "transactions.statusPendingSubject",
  pending_holder: "transactions.statusPendingHolder",
  denied_subject: "transactions.statusDeniedSubject",
  denied_holder: "transactions.statusDeniedHolder",
  revoked: "transactions.statusRevoked",
  cancelled: "transactions.statusCancelled",
};

const AdminDashboard = () => {
  const { t } = useTranslation("admin");

  const { data: orgCount = 0 } = useQuery({
    queryKey: ["admin-org-count"],
    queryFn: async () => {
      const { count } = await supabase.from("organizations").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: txCount = 0 } = useQuery({
    queryKey: ["admin-tx-count"],
    queryFn: async () => {
      const { count } = await supabase.from("data_transactions").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: assetCount = 0 } = useQuery({
    queryKey: ["admin-asset-count"],
    queryFn: async () => {
      const { count } = await supabase.from("data_assets").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: txByStatus = [] } = useQuery({
    queryKey: ["admin-tx-by-status"],
    queryFn: async () => {
      const { data } = await supabase.from("data_transactions").select("status");
      if (!data) return [];
      const counts: Record<string, number> = {};
      data.forEach((tx) => { counts[tx.status] = (counts[tx.status] || 0) + 1; });
      return Object.entries(counts).map(([status, value]) => ({ status, value }));
    },
  });

  const { data: assetsByCategory = [] } = useQuery({
    queryKey: ["admin-assets-by-category"],
    queryFn: async () => {
      const { data } = await supabase.from("data_assets").select("product_id, data_products(category)");
      if (!data) return [];
      const counts: Record<string, number> = {};
      data.forEach((a: any) => {
        const cat = a.data_products?.category || "__none__";
        counts[cat] = (counts[cat] || 0) + 1;
      });
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    },
  });

  const translatedTxByStatus = txByStatus.map((item) => ({
    name: t(STATUS_KEY_MAP[item.status] || item.status),
    value: item.value,
  }));

  const translatedAssetsByCategory = assetsByCategory.map((item) => ({
    name: item.name === "__none__" ? t("dashboard.noCategory") : item.name,
    value: item.value,
  }));

  const kpiCards = [
    { title: t("dashboard.registeredOrgs"), value: orgCount, icon: Building2, color: "text-primary", bg: "bg-primary/10" },
    { title: t("dashboard.totalTransactions"), value: txCount, icon: ArrowLeftRight, color: "text-chart-2", bg: "bg-chart-2/10" },
    { title: t("dashboard.publishedAssets"), value: assetCount, icon: Database, color: "text-chart-3", bg: "bg-chart-3/10" },
    { title: t("dashboard.activityRate"), value: txCount > 0 && orgCount > 0 ? `${(txCount / orgCount).toFixed(1)} ${t("dashboard.txPerOrg")}` : "—", icon: TrendingUp, color: "text-chart-4", bg: "bg-chart-4/10" },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">{t("dashboard.txByStatus")}</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={translatedTxByStatus}>
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
          <CardHeader><CardTitle className="text-lg">{t("dashboard.assetsByCategory")}</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={translatedAssetsByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {translatedAssetsByCategory.map((_, index) => (
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
