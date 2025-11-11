import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const ACTION_LABELS: Record<string, { label: string; icon: any; color: string }> = {
  pre_approve: { label: "Pre-aprobó", icon: CheckCircle, color: "text-green-600" },
  approve: { label: "Aprobó", icon: CheckCircle, color: "text-green-600" },
  deny: { label: "Denegó", icon: XCircle, color: "text-red-600" },
  initiated: { label: "Inició", icon: ArrowRight, color: "text-blue-600" },
};

export const ActivityFeed = () => {
  const { activeOrg, isDemo } = useOrganizationContext();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activity-feed", activeOrg?.id, isDemo],
    queryFn: async () => {
      if (!activeOrg) return [];

      let query = supabase
        .from("approval_history")
        .select(`
          *,
          transaction:data_transactions (
            id,
            consumer_org_id,
            subject_org_id,
            holder_org_id,
            asset:data_assets (
              product:data_products (
                name
              )
            )
          ),
          actor_org:organizations!approval_history_actor_org_id_fkey (
            name
          )
        `)
        .order("created_at", { ascending: false });

      // En modo demo, mostrar todas las actividades de orgs demo
      if (isDemo) {
        const { data: demoOrgs } = await supabase
          .from("organizations")
          .select("id")
          .eq("is_demo", true);
        const demoOrgIds = demoOrgs?.map((o) => o.id) || [];
        query = query.in("actor_org_id", demoOrgIds);
      }

      query = query.limit(10);

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
    enabled: !!activeOrg,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Cargando...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        {!activities || activities.length === 0 ? (
          <div className="text-center py-6">
            <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No hay actividad reciente
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const actionInfo = ACTION_LABELS[activity.action] || ACTION_LABELS.initiated;
              const Icon = actionInfo.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                >
                  <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${actionInfo.color}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.actor_org.name}</span>
                      {" "}{actionInfo.label}{" "}
                      <span className="text-muted-foreground">
                        {activity.transaction?.asset?.product?.name || "una solicitud"}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.created_at), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </p>
                    {activity.notes && (
                      <p className="text-xs text-muted-foreground italic">
                        {activity.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};