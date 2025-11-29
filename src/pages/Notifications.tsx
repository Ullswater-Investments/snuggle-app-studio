import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, XCircle, Clock, Mail } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

const Notifications = () => {
  const { activeOrg } = useOrganizationContext();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", activeOrg?.id, filter],
    queryFn: async () => {
      if (!activeOrg) return [];

      // First get transactions involving activeOrg
      const { data: transactions, error: transError } = await supabase
        .from("data_transactions")
        .select("id")
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`);

      if (transError) throw transError;
      
      const transactionIds = transactions?.map(t => t.id) || [];
      
      if (transactionIds.length === 0) return [];

      const { data, error } = await supabase
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
        .in("transaction_id", transactionIds)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data || [];
    },
    enabled: !!activeOrg,
  });

  const getNotificationIcon = (action: string) => {
    switch (action) {
      case "approve":
      case "pre_approve":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "deny":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationText = (action: string) => {
    switch (action) {
      case "pre_approve":
        return "pre-aprobó la solicitud";
      case "approve":
        return "aprobó la solicitud";
      case "deny":
        return "denegó la solicitud";
      default:
        return "realizó una acción en";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/10 via-background to-background border border-blue-500/20 p-8">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4">
              <Bell className="mr-1 h-3 w-3" />
              Notificaciones
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              Centro de Notificaciones
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Mantente al día con todas las actualizaciones y eventos del sistema.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Todas
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
          >
            No leídas
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Historial de eventos y acciones en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando notificaciones...</p>
              </div>
            ) : !notifications || notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay notificaciones</h3>
                <p className="text-sm text-muted-foreground">
                  No tienes notificaciones en este momento
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="mt-1">
                      {getNotificationIcon(notification.action)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">
                          {notification.actor_org.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {getNotificationText(notification.action)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.transaction?.asset?.product?.name || "Solicitud"}
                      </p>
                      {notification.notes && (
                        <p className="text-xs text-muted-foreground italic mb-2">
                          "{notification.notes}"
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.created_at), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default Notifications;