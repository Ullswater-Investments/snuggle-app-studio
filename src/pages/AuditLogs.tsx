import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Shield, Search, Download, Eye, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FadeIn } from "@/components/AnimatedSection";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import type { AuditLog } from "@/types/database.extensions";

export default function AuditLogs() {
  const { activeOrg } = useOrganizationContext();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: auditLogs = [], isLoading } = useQuery({
    queryKey: ["audit-logs", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return [];

      // const { data, error } = await supabase
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("organization_id", activeOrg.id)
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      return (data || []) as AuditLog[];
    },
    enabled: !!activeOrg,
  });

  const filteredLogs = auditLogs.filter((log) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      log.action.toLowerCase().includes(searchLower) ||
      (log.actor_email || "").toLowerCase().includes(searchLower) ||
      (log.resource || "").toLowerCase().includes(searchLower)
    );
  });

  const handleExportCSV = () => {
    const csvContent = [
      ["Fecha", "Usuario", "Acción", "Recurso", "Detalles"],
      ...filteredLogs.map((log) => [
        new Date(log.created_at).toLocaleString("es-ES"),
        log.actor_email || "Sistema",
        log.action,
        log.resource || "-",
        JSON.stringify(log.details || {})
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `audit_logs_${new Date().toISOString()}.csv`;
    link.click();
    toast.success("Logs exportados exitosamente");
  };

  const getActionBadge = (action: string) => {
    if (action.includes("DELETE") || action.includes("FAIL")) {
      return <Badge variant="destructive">{action}</Badge>;
    }
    if (action.includes("APPROVE") || action.includes("CREATE")) {
      return <Badge className="bg-green-500 hover:bg-green-600">{action}</Badge>;
    }
    return <Badge variant="secondary">{action}</Badge>;
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-red-500/10 via-background to-background border border-red-500/20 p-8">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4">
              <Shield className="mr-1 h-3 w-3" />
              Seguridad
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              Logs de Auditoría
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Registro inmutable de todas las acciones críticas en tu organización para cumplimiento normativo (GDPR/EU Data Act).
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Registro de Eventos</CardTitle>
                <CardDescription>Trazabilidad completa de acciones del sistema</CardDescription>
              </div>
              <Button onClick={handleExportCSV} disabled={filteredLogs.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Descargar CSV
              </Button>
            </div>
            
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por acción, usuario o recurso..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando logs de auditoría...</p>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay logs disponibles</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? "No se encontraron logs que coincidan con tu búsqueda"
                    : "Los eventos de auditoría aparecerán aquí cuando se registren acciones"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {(log.actor_email || "S")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-medium text-sm">{log.actor_email || "Sistema"}</p>
                        {getActionBadge(log.action)}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: es })}
                        </div>
                      </div>
                      
                      {log.resource && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Recurso: <span className="font-mono">{log.resource}</span>
                        </p>
                      )}

                      {log.details && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              <Eye className="mr-1 h-3 w-3" />
                              Ver Detalles JSON
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px]" align="start">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm">Detalles Técnicos</h4>
                              <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-[300px]">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </div>
                          </PopoverContent>
                        </Popover>
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
}
