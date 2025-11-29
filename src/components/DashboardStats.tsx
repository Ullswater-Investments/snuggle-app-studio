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

      // Productos según rol
      let productsQuery = supabase.from("data_assets").select("*", { count: "exact", head: true });
      
      if (activeOrg.type === 'provider') {
        productsQuery = productsQuery.eq('subject_org_id', activeOrg.id);
      } else if (activeOrg.type === 'data_holder') {
        productsQuery = productsQuery.eq('holder_org_id', activeOrg.id);
      }
      // Si es Consumer, ve el total del mercado (sin filtro)
      
      const { count: productsCount } = await productsQuery;

      // Pendientes (solo lo que requiere MI atención)
      let pendingQuery = supabase.from("data_transactions").select("*", { count: "exact", head: true });
      
      if (activeOrg.type === 'provider') {
        // Provider aprueba cuando está en 'pending_subject'
        pendingQuery = pendingQuery.eq('subject_org_id', activeOrg.id).eq('status', 'pending_subject');
      } else if (activeOrg.type === 'data_holder') {
        // Holder aprueba cuando está en 'pending_holder'
        pendingQuery = pendingQuery.eq('holder_org_id', activeOrg.id).eq('status', 'pending_holder');
      } else {
        // Consumer ve lo que está esperando de otros
        pendingQuery = pendingQuery.eq('consumer_org_id', activeOrg.id).in('status', ['pending_subject', 'pending_holder']);
      }

      const { count: pendingCount } = await pendingQuery;

      // Completadas (histórico propio)
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);
      firstDayOfMonth.setHours(0, 0, 0, 0);

      const { count: completedCount } = await supabase
        .from("data_transactions")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed")
        .gte("created_at", firstDayOfMonth.toISOString())
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`);

      // Total organizaciones (solo demo si aplica)
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