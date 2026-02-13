import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle, Activity, Download, Globe, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface AccessHistoryTableProps {
  transactionId?: string;
  assetId?: string;
  consumerOrgId?: string;
  title?: string;
  description?: string;
  showErrorDetails?: boolean;
}

const actionLabels: Record<string, { label: string; icon: typeof Download }> = {
  download_file: { label: "Descarga de activo", icon: Download },
  download: { label: "Descarga de activo", icon: Download },
  gateway_download: { label: "Descarga de activo", icon: Download },
  api_access_attempt: { label: "Acceso vía API", icon: Globe },
  view_details: { label: "Consulta de ficha técnica", icon: Activity },
};

export const AccessHistoryTable = ({
  transactionId,
  assetId,
  consumerOrgId,
  title = "Historial de Accesos",
  description = "Registro de todos los accesos realizados a este activo.",
  showErrorDetails = false,
}: AccessHistoryTableProps) => {
  const { data: logs, isLoading } = useQuery({
    queryKey: ["access-logs", transactionId, assetId, consumerOrgId],
    queryFn: async () => {
      let query = (supabase as any)
        .from("access_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (transactionId) {
        query = query.eq("transaction_id", transactionId);
      }
      if (assetId) {
        query = query.eq("asset_id", assetId);
      }
      if (consumerOrgId) {
        query = query.eq("consumer_org_id", consumerOrgId);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      if (!data) return [] as any[];
      const seen = new Map<string, any>();
      for (const log of data as any[]) {
        const ts = log.created_at.substring(0, 19);
        const key = `${ts}_${log.action}_${log.status}_${log.asset_id}_${log.consumer_org_id}`;
        if (!seen.has(key)) {
          seen.set(key, log);
        }
      }
      return Array.from(seen.values());
    },
    enabled: !!(transactionId || assetId),
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  const actionConfig = (action: string) => {
    return actionLabels[action] || { label: action, icon: Activity };
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!logs || logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mb-2 opacity-40" />
            <p className="text-sm">No se han registrado accesos todavía.</p>
          </div>
        ) : (
          <ScrollArea className="max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>Acción Realizada</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => {
                  const config = actionConfig(log.action);
                  const ActionIcon = config.icon;
                  return (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm whitespace-nowrap">
                        {format(new Date(log.created_at), "dd/MM/yyyy HH:mm:ss", { locale: es })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ActionIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm">{config.label}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {log.status === "success" ? (
                          <Badge variant="outline" className="gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Éxito
                          </Badge>
                        ) : showErrorDetails && log.error_message ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className="gap-1 border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400 cursor-help">
                                  <XCircle className="h-3.5 w-3.5" />
                                  Error
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent side="left" className="max-w-xs">
                                <p className="text-xs font-mono">{log.error_message}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <Badge variant="outline" className="gap-1 border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
                            <XCircle className="h-3.5 w-3.5" />
                            Error
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
