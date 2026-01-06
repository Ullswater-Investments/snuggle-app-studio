import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  CheckCircle,
  XCircle,
  Mail,
  MailOpen,
  CheckCheck,
  Info,
  AlertTriangle,
  MoreVertical,
  Trash2,
  Coins,
  FileKey,
  Blocks,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { formatDistanceToNow, isToday, isYesterday, isBefore, startOfDay, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string | null;
  link: string | null;
  is_read: boolean | null;
  created_at: string | null;
}

interface NotificationGroup {
  label: string;
  notifications: Notification[];
}

const Notifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "unread" | "priority">("all");

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
      } else if (filter === "priority") {
        query = query.in("type", ["warning", "error"]);
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
            description: (payload.new as Notification).title,
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

  // Delete notification
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications-page"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notificación eliminada");
    },
    onError: () => {
      toast.error("Error al eliminar la notificación");
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

  // Get icon and styling based on notification type and title
  const getNotificationConfig = (type: string, title: string) => {
    // Check title for context-specific icons
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes("pago") || titleLower.includes("euroe") || titleLower.includes("wallet")) {
      return {
        icon: Coins,
        bgColor: "bg-green-100 dark:bg-green-900/30",
        iconColor: "text-green-600 dark:text-green-400",
      };
    }
    if (titleLower.includes("smart contract") || titleLower.includes("blockchain") || titleLower.includes("pontus")) {
      return {
        icon: Blocks,
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
      };
    }
    if (titleLower.includes("solicitud") || titleLower.includes("acceso") || titleLower.includes("propuesta")) {
      return {
        icon: FileKey,
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
        iconColor: "text-orange-600 dark:text-orange-400",
      };
    }
    if (titleLower.includes("nuevo") || titleLower.includes("disponible") || titleLower.includes("servicio")) {
      return {
        icon: Sparkles,
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
      };
    }

    // Fallback to type-based icons
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-100 dark:bg-green-900/30",
          iconColor: "text-green-600 dark:text-green-400",
        };
      case "error":
        return {
          icon: XCircle,
          bgColor: "bg-red-100 dark:bg-red-900/30",
          iconColor: "text-red-600 dark:text-red-400",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          iconColor: "text-yellow-600 dark:text-yellow-400",
        };
      case "info":
      default:
        return {
          icon: Info,
          bgColor: "bg-slate-100 dark:bg-slate-800/50",
          iconColor: "text-slate-600 dark:text-slate-400",
        };
    }
  };

  // Group notifications by date
  const groupedNotifications = useMemo((): NotificationGroup[] => {
    if (!notifications || notifications.length === 0) return [];

    const today: Notification[] = [];
    const yesterday: Notification[] = [];
    const older: Notification[] = [];

    const yesterdayDate = subDays(new Date(), 1);

    notifications.forEach((notification) => {
      const date = new Date(notification.created_at || "");
      if (isToday(date)) {
        today.push(notification);
      } else if (isYesterday(date)) {
        yesterday.push(notification);
      } else {
        older.push(notification);
      }
    });

    const groups: NotificationGroup[] = [];
    if (today.length > 0) groups.push({ label: "Hoy", notifications: today });
    if (yesterday.length > 0) groups.push({ label: "Ayer", notifications: yesterday });
    if (older.length > 0) groups.push({ label: "Anteriores", notifications: older });

    return groups;
  }, [notifications]);

  const unreadCount = notifications?.filter((n) => !n.is_read).length || 0;
  const priorityCount = notifications?.filter((n) => n.type === "warning" || n.type === "error").length || 0;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.is_read) {
      markAsReadMutation.mutate({ id: notification.id, isRead: true });
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const NotificationSkeleton = () => (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <Skeleton className="h-10 w-10 rounded-full" />
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
              Centro de Actividad
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              Notificaciones
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Mantente al día con solicitudes de acceso, pagos Web3, contratos inteligentes y alertas del sistema.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              size="sm"
            >
              Todas
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              size="sm"
            >
              No leídas
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-primary/20">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            <Button
              variant={filter === "priority" ? "default" : "outline"}
              onClick={() => setFilter("priority")}
              size="sm"
              className="gap-1"
            >
              <AlertTriangle className="h-4 w-4" />
              Alta Prioridad
              {priorityCount > 0 && (
                <Badge variant="secondary" className="ml-1 bg-orange-500/20 text-orange-700 dark:text-orange-400">
                  {priorityCount}
                </Badge>
              )}
            </Button>
          </div>
          
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => markAllAsReadMutation.mutate()}
              disabled={markAllAsReadMutation.isPending}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <CheckCheck className="h-4 w-4" />
              Marcar todo como leído
            </Button>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Historial de eventos, transacciones y acciones pendientes
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
                    : filter === "priority"
                    ? "No hay notificaciones de alta prioridad"
                    : "No tienes notificaciones en este momento"}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {groupedNotifications.map((group) => (
                  <div key={group.label}>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                      {group.label}
                    </h3>
                    <div className="space-y-3">
                      {group.notifications.map((notification) => {
                        const config = getNotificationConfig(notification.type, notification.title);
                        const IconComponent = config.icon;
                        const isActionRequired = notification.type === "warning" && notification.link;

                        return (
                          <div
                            key={notification.id}
                            className={`flex items-start gap-4 p-4 border rounded-lg transition-all hover:shadow-sm ${
                              !notification.is_read
                                ? "bg-primary/5 border-primary/20 shadow-sm"
                                : "hover:bg-muted/50"
                            }`}
                          >
                            {/* Icon with colored background */}
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${config.bgColor}`}
                            >
                              <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
                            </div>

                            {/* Content */}
                            <div
                              className="flex-1 min-w-0 cursor-pointer"
                              onClick={() => handleNotificationClick(notification)}
                            >
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-semibold text-foreground">
                                  {notification.title}
                                </span>
                                {!notification.is_read && (
                                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                )}
                              </div>
                              {notification.message && (
                                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
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

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {isActionRequired && (
                                <Button
                                  size="sm"
                                  onClick={() => handleNotificationClick(notification)}
                                  className="gap-1"
                                >
                                  Revisar
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              )}

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-popover">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      markAsReadMutation.mutate({
                                        id: notification.id,
                                        isRead: !notification.is_read,
                                      })
                                    }
                                  >
                                    {notification.is_read ? (
                                      <>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Marcar como no leída
                                      </>
                                    ) : (
                                      <>
                                        <MailOpen className="mr-2 h-4 w-4" />
                                        Marcar como leída
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  {notification.link && (
                                    <DropdownMenuItem
                                      onClick={() => handleNotificationClick(notification)}
                                    >
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      Ver detalles
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    onClick={() => deleteMutation.mutate(notification.id)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Eliminar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        );
                      })}
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