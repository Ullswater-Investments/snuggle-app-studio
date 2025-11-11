import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
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
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444"];

const Reports = () => {
  const { activeOrg, isDemo } = useOrganizationContext();

  const { data: transactionsByStatus } = useQuery({
    queryKey: ["reports-by-status", activeOrg?.id, isDemo],
    queryFn: async () => {
      if (!activeOrg) return [];

      let query = supabase.from("data_transactions").select("status");

      // En modo demo, mostrar todas las transacciones demo
      if (isDemo) {
        const { data: demoOrgs } = await supabase
          .from("organizations")
          .select("id")
          .eq("is_demo", true);
        const demoOrgIds = demoOrgs?.map((o) => o.id) || [];
        query = query.in("consumer_org_id", demoOrgIds);
      }

      const { data, error } = await query;

      if (error) throw error;

      const statusCounts = data.reduce((acc: any, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
    },
    enabled: !!activeOrg,
  });

  const { data: topProducts } = useQuery({
    queryKey: ["reports-top-products", activeOrg?.id, isDemo],
    queryFn: async () => {
      if (!activeOrg) return [];

      let query = supabase.from("data_transactions").select(`
          asset:data_assets (
            product:data_products (
              name
            )
          )
        `);

      // En modo demo, mostrar todos los productos demo
      if (isDemo) {
        const { data: demoOrgs } = await supabase
          .from("organizations")
          .select("id")
          .eq("is_demo", true);
        const demoOrgIds = demoOrgs?.map((o) => o.id) || [];
        query = query.in("consumer_org_id", demoOrgIds);
      }

      const { data, error } = await query;

      if (error) throw error;

      const productCounts = data.reduce((acc: any, t) => {
        const productName = t.asset?.product?.name || "Desconocido";
        acc[productName] = (acc[productName] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(productCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 5);
    },
    enabled: !!activeOrg,
  });

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500/10 via-background to-background border border-indigo-500/20 p-8">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4">
              <BarChart3 className="mr-1 h-3 w-3" />
              Analytics
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              Reportes y Estadísticas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Analiza el rendimiento del sistema, visualiza tendencias y obtén insights
              sobre las transacciones de datos.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Transacciones por Estado</CardTitle>
              <CardDescription>
                Distribución actual de solicitudes en el sistema
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
                      label={(entry) => entry.name}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {transactionsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No hay datos disponibles
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Productos Más Solicitados</CardTitle>
              <CardDescription>
                Top 5 productos de datos más demandados
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {topProducts && topProducts.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProducts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No hay datos disponibles
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>Métricas Clave</CardTitle>
            <CardDescription>
              Indicadores de rendimiento del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tasa de Aprobación
                  </p>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    +5% vs mes anterior
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tiempo Promedio
                  </p>
                  <p className="text-2xl font-bold">2.4 días</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    De solicitud a aprobación
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Cumplimiento
                  </p>
                  <p className="text-2xl font-bold">99.2%</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Políticas ODRL aplicadas
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