import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Notification } from "@/types/database.extensions";

export function NotificationsBell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  // 1. Fetch inicial
  const { data: notifications } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user?.id ?? "")
        .order("created_at", { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return (data || []) as Notification[];
    },
    enabled: !!user
  });

  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  // 2. Realtime Subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => {
          const newNotification = payload.new as Notification;
          toast(newNotification.title, { description: newNotification.message || undefined });
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, queryClient]);

  // 3. Mark as Read Handler
  const handleRead = async (id: string, link?: string | null) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    if (link) {
      setIsOpen(false);
      navigate(link);
    }
  };

  // 4. Mark All as Read
  const handleMarkAllRead = async () => {
    if (!user) return;
    await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    toast.success("Todas las notificaciones marcadas como leídas");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-600 border-2 border-background animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b bg-muted/20">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm">Notificaciones</h4>
            {unreadCount > 0 && <Badge variant="secondary" className="text-xs">{unreadCount} nuevas</Badge>}
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAllRead();
              }}
            >
              Marcar leídas
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {!notifications || notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-xs">
              No tienes notificaciones
            </div>
          ) : (
            <div className="grid">
              {notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer flex gap-3 ${!n.is_read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                  onClick={() => handleRead(n.id, n.link)}
                >
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${!n.is_read ? 'bg-blue-600' : 'bg-transparent'}`} />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{n.title}</p>
                    {n.message && <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>}
                    <p className="text-[10px] text-muted-foreground/70">
                      {new Date(n.created_at).toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        day: '2-digit',
                        month: 'short'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
