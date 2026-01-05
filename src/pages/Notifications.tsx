import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, CheckCircle, XCircle, Clock, Mail, MailOpen, CheckCheck, Info, AlertTriangle } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

const Notifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  // Fetch notifications from the notifications table
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications-page", user?.id, filter],
    queryFn: async () => {
      if (!user) return [];

      let query = supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (filter === "unread") {
        query = query.eq("is_read", false);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Realtime subscription for new notifications
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["notifications-page"] });
          toast.info("Nueva notificación recibida", {
            description: (payload.new as any).title,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  // Mark single notification as read/unread
  const markAsReadMutation = useMutation({
    mutationFn: async ({ id, isRead }: { id: string; isRead: boolean }) => {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: isRead })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications-page"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] }); // For NotificationsBell
    },
  });

  // Mark all as read
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No user");

      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications-page"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Todas las notificaciones marcadas como leídas");
    },
    onError: () => {
      toast.error("Error al marcar notificaciones");
    },
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  const unreadCount = notifications?.filter((n) => !n.is_read).length || 0;

  const NotificationSkeleton = () => (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <Skeleton className="h-5 w-5 rounded-full mt-1" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20 p-8">
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
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
          <div className="flex gap-2">
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
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-primary/20">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
          
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllAsReadMutation.mutate()}
              disabled={markAllAsReadMutation.isPending}
              className="gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              Marcar todas como leídas
            </Button>
          )}
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
              <div className="space-y-4">
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
              </div>
            ) : !notifications || notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay notificaciones</h3>
                <p className="text-sm text-muted-foreground">
                  {filter === "unread"
                    ? "No tienes notificaciones sin leer"
                    : "No tienes notificaciones en este momento"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 border rounded-lg transition-colors ${
                      !notification.is_read
                        ? "bg-primary/5 border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold truncate">
                          {notification.title}
                        </span>
                        {!notification.is_read && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                            Nueva
                          </Badge>
                        )}
                      </div>
                      {notification.message && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.created_at || ""), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          markAsReadMutation.mutate({
                            id: notification.id,
                            isRead: !notification.is_read,
                          })
                        }
                        disabled={markAsReadMutation.isPending}
                        title={notification.is_read ? "Marcar como no leída" : "Marcar como leída"}
                      >
                        {notification.is_read ? (
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-primary" />
                        )}
                      </Button>
                      {notification.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (!notification.is_read) {
                              markAsReadMutation.mutate({ id: notification.id, isRead: true });
                            }
                            window.location.href = notification.link!;
                          }}
                        >
                          Ver
                        </Button>
                      )}
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