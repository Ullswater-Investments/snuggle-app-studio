import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, XCircle, Clock, ArrowRight, Info } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es, enUS, de, fr, pt, it, nl, Locale } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const localeMap: Record<string, Locale> = { es, en: enUS, de, fr, pt, it, nl };

export const ActivityFeed = () => {
  const { activeOrg, isDemo } = useOrganizationContext();
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation('dashboard');
  const currentLocale = localeMap[i18n.language] || es;

  const ACTION_LABELS: Record<string, { labelKey: string; icon: any; color: string }> = {
    pre_approve: { labelKey: "activityFeed.preApproved", icon: CheckCircle, color: "text-[hsl(209_100%_65%)]" },
    approve: { labelKey: "activityFeed.approved", icon: CheckCircle, color: "text-[hsl(209_100%_50%)]" },
    deny: { labelKey: "activityFeed.denied", icon: XCircle, color: "text-destructive" },
    cancel: { labelKey: "activityFeed.cancelled", icon: XCircle, color: "text-muted-foreground" },
    initiated: { labelKey: "activityFeed.preApproved", icon: ArrowRight, color: "text-[hsl(0_0%_40%)] dark:text-[hsl(0_0%_60%)]" },
  };

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

  // Realtime subscription for new activities
  useEffect(() => {
    if (!activeOrg) return;

    const channel = supabase
      .channel('activity-feed-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'approval_history'
        },
        () => {
          queryClient.invalidateQueries({ 
            queryKey: ["activity-feed", activeOrg.id, isDemo] 
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeOrg, isDemo, queryClient]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('activity.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{t('activity.loading')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('activity.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {!activities || activities.length === 0 ? (
          <div className="text-center py-6">
            <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {t('activity.noActivity')}
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
                    <div className="flex items-center gap-2">
                      <p className="text-sm">
                        <span className="font-medium">{activity.actor_org.name}</span>
                        {" "}{t(actionInfo.labelKey)}{" "}
                        <span className="text-muted-foreground">
                          {activity.transaction?.asset?.product?.name || t('activityFeed.aRequest')}
                        </span>
                      </p>
                      {isDemo && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700 text-[10px] px-1 py-0">
                                <Info className="h-2 w-2 mr-0.5" />
                                {t('activity.demo').toUpperCase()}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">
                                {t('activity.noActivity')}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.created_at), {
                        addSuffix: true,
                        locale: currentLocale,
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
