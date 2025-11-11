import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ClipboardList, Database, TrendingUp } from "lucide-react";

export const DashboardStats = () => {
  const { activeOrg, isDemo } = useOrganizationContext();

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats", activeOrg?.id, isDemo],
    queryFn: async () => {
      if (!activeOrg) return null;

      // Total productos en catálogo
      const { count: productsCount } = await supabase
        .from("data_products")
        .select("*", { count: "exact", head: true });

      // En modo demo, obtener IDs de organizaciones demo
      let demoOrgIds: string[] = [];
      if (isDemo) {
        const { data: demoOrgs } = await supabase
          .from("organizations")
          .select("id")
          .eq("is_demo", true);
        demoOrgIds = demoOrgs?.map((o) => o.id) || [];
      }

      // Solicitudes pendientes
      let pendingQuery = supabase
        .from("data_transactions")
        .select("*", { count: "exact", head: true })
        .in("status", ["pending_subject", "pending_holder"]);

      if (isDemo) {
        pendingQuery = pendingQuery.in("consumer_org_id", demoOrgIds);
      } else {
        pendingQuery = pendingQuery.or(
          `subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`
        );
      }

      const { count: pendingCount } = await pendingQuery;

      // Transacciones completadas este mes
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);
      firstDayOfMonth.setHours(0, 0, 0, 0);

      let completedQuery = supabase
        .from("data_transactions")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed")
        .gte("created_at", firstDayOfMonth.toISOString());

      if (isDemo) {
        completedQuery = completedQuery.in("consumer_org_id", demoOrgIds);
      }

      const { count: completedCount } = await completedQuery;

      // Total organizaciones
      let orgsQuery = supabase
        .from("organizations")
        .select("*", { count: "exact", head: true });

      if (isDemo) {
        orgsQuery = orgsQuery.eq("is_demo", true);
      }

      const { count: orgsCount } = await orgsQuery;

      return {
        products: productsCount || 0,
        pending: pendingCount || 0,
        completed: completedCount || 0,
        organizations: orgsCount || 0,
      };
    },
    enabled: !!activeOrg,
  });

  if (!stats) return null;

  const statsCards = [
    {
      title: "Productos en Catálogo",
      value: stats.products,
      icon: Package,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Solicitudes Pendientes",
      value: stats.pending,
      icon: ClipboardList,
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Completadas Este Mes",
      value: stats.completed,
      icon: Database,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Organizaciones Activas",
      value: stats.organizations,
      icon: TrendingUp,
      color: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};