import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AccessHistoryTable } from "@/components/AccessHistoryTable";
import { 
  ArrowLeft, 
  Building2, 
  Calendar, 
  Clock, 
  Database, 
  CheckCircle, 
  XCircle,
  Loader2,
  FileText,
  CreditCard,
  User,
  Unlock,
  Info
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { getStatusConfig, getStatusLabel, getStatusBadgeClass } from "@/lib/transactionStatusHelper";
import React from "react";

const RequestDetailPage = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { activeOrg } = useOrganizationContext();
  const { sendNotification } = useNotifications();
  const [processingAction, setProcessingAction] = useState<string | null>(null);

  // Fetch transaction details
  const { data: transaction, isLoading, error } = useQuery({
    queryKey: ["transaction-detail", requestId],
    queryFn: async () => {
      if (!requestId) throw new Error("No request ID");
      
      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          *,
          asset:data_assets (
            id,
            price,
            pricing_model,
            currency,
            sample_data,
            custom_metadata,
            product:data_products (
              id,
              name,
              description,
              category
            )
          ),
          consumer_org:organizations!data_transactions_consumer_org_id_fkey (
            id,
            name,
            logo_url
          ),
          subject_org:organizations!data_transactions_subject_org_id_fkey (
            id,
            name,
            logo_url
          ),
          holder_org:organizations!data_transactions_holder_org_id_fkey (
            id,
            name,
            logo_url
          )
        `)
        .eq("id", requestId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!requestId,
  });

  // Fetch approval history
  const { data: approvalHistory } = useQuery({
    queryKey: ["approval-history", requestId],
    queryFn: async () => {
      if (!requestId) return [];
      
      const { data, error } = await supabase
        .from("approval_history")
        .select(`
          *,
          actor_org:organizations!approval_history_actor_org_id_fkey (
            name
          )
        `)
        .eq("transaction_id", requestId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!requestId,
  });

  // Determine user's role in this transaction
  const getUserRole = () => {
    if (!transaction || !activeOrg) return null;
    // For pending_holder status, prioritize holder role so the finalize button appears
    if (transaction.status === "pending_holder" && transaction.holder_org_id === activeOrg.id) return "holder";
    if (transaction.consumer_org_id === activeOrg.id) return "consumer";
    if (transaction.subject_org_id === activeOrg.id) return "subject";
    if (transaction.holder_org_id === activeOrg.id) return "holder";
    return null;
  };

  const userRole = getUserRole();

  // Action mutation
  const actionMutation = useMutation({
    mutationFn: async ({ action }: { action: "pre_approve" | "approve" | "deny" | "complete" }) => {
      if (!transaction || !activeOrg || !user) {
        throw new Error("Missing required data");
      }

      let newStatus = transaction.status;
      let notificationEvent: "pre_approved" | "approved" | "denied" | "completed" | null = null;

      if (action === "pre_approve" && transaction.status === "pending_subject") {
        newStatus = "pending_holder";
        notificationEvent = "pre_approved";
      } else if (action === "approve" && transaction.status === "pending_holder") {
        newStatus = "completed";
        notificationEvent = "completed";
      } else if (action === "complete" && transaction.status === "pending_holder") {
        newStatus = "completed";
        notificationEvent = "completed";
      } else if (action === "deny") {
        newStatus = transaction.status === "pending_subject" ? "denied_subject" : "denied_holder";
        notificationEvent = "denied";
      }

      // Update transaction status
      const { error: updateError } = await supabase
        .from("data_transactions")
        .update({ status: newStatus })
        .eq("id", transaction.id);

      if (updateError) throw updateError;

      // Record in approval history
      const { error: historyError } = await supabase
        .from("approval_history")
        .insert([{
          transaction_id: transaction.id,
          actor_org_id: activeOrg.id,
          actor_user_id: user.id,
          action: action === "complete" ? "approve" : action,
          notes: action === "complete" ? "Transacción finalizada y datos liberados" : undefined,
        }] as any);

      if (historyError) throw historyError;

      // Send notification
      if (notificationEvent) {
        await sendNotification(transaction.id, notificationEvent);
      }

      return { newStatus };
    },
    onSuccess: (data) => {
      setProcessingAction(null);
      toast.success(
        data.newStatus === "completed" 
          ? "¡Datos liberados! El consumidor ya puede acceder al dataset." 
          : "Acción realizada exitosamente"
      );
      queryClient.invalidateQueries({ queryKey: ["transaction-detail", requestId] });
      queryClient.invalidateQueries({ queryKey: ["approval-history", requestId] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: any) => {
      setProcessingAction(null);
      toast.error(error.message || "Error al realizar la acción");
    },
  });

  const handleAction = (action: "pre_approve" | "approve" | "deny" | "complete") => {
    setProcessingAction(action);
    actionMutation.mutate({ action });
  };

  // Check if user can perform actions
  const canPerformActions = () => {
    if (!transaction || !userRole) return false;
    
    if (userRole === "subject" && transaction.status === "pending_subject") {
      return true;
    }
    if (userRole === "holder" && transaction.status === "pending_holder") {
      return true;
    }
    return false;
  };

  const canCompleteTransaction = () => {
    if (!transaction || !userRole) return false;
    return userRole === "holder" && transaction.status === "pending_holder";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !transaction) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <XCircle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">Solicitud no encontrada</h2>
            <p className="text-muted-foreground mb-4">
              No se pudo encontrar la solicitud con ID: {requestId}
            </p>
            <Button onClick={() => navigate("/requests")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Solicitudes
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusConfig = getStatusConfig(transaction.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/requests")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Solicitud</h1>
            <p className="text-sm text-muted-foreground font-mono">ID: {transaction.id}</p>
          </div>
        </div>
        <Badge className={getStatusBadgeClass(transaction.status)}>
          {React.createElement(StatusIcon, { className: "mr-1 h-4 w-4" })}
          {getStatusLabel(transaction.status, true)}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dataset Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>Dataset Solicitado</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {transaction.asset?.product?.name || "Dataset sin nombre"}
                </h3>
                <p className="text-muted-foreground">
                  {transaction.asset?.product?.description || "Sin descripción"}
                </p>
              </div>
              {transaction.asset?.product?.category && (
                <Badge variant="secondary">{transaction.asset.product.category}</Badge>
              )}
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Precio</p>
                  <p className="text-lg font-bold">
                    {transaction.asset?.price 
                      ? `${transaction.asset.price} ${transaction.asset.currency || "EUR"}` 
                      : "Gratis"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Duración de Acceso</p>
                  <p className="text-lg font-bold">{transaction.access_duration_days} días <span className="text-sm font-normal text-muted-foreground">(política del proveedor)</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Request Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Detalles de la Solicitud</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Propósito</p>
                <p>{transaction.purpose}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Justificación</p>
                <p>{transaction.justification}</p>
              </div>
              {(transaction.metadata as any)?.priority && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Prioridad</p>
                  <Badge variant={(transaction.metadata as any).priority === "Crítica" ? "destructive" : "secondary"}>
                    {(transaction.metadata as any).priority}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          {canPerformActions() && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary">Acciones Disponibles</CardTitle>
                <CardDescription>
                  {userRole === "subject" 
                    ? "Como proveedor, puedes pre-aprobar o rechazar esta solicitud."
                    : "Como data holder, puedes finalizar la transacción y liberar los datos."}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {userRole === "subject" && transaction.status === "pending_subject" && (
                  <>
                    <Button
                      onClick={() => handleAction("pre_approve")}
                      disabled={processingAction !== null}
                    >
                      {processingAction === "pre_approve" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      Pre-aprobar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleAction("deny")}
                      disabled={processingAction !== null}
                    >
                      {processingAction === "deny" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                      )}
                      Rechazar
                    </Button>
                  </>
                )}
                {canCompleteTransaction() && (
                  <>
                    <Button
                      size="lg"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleAction("complete")}
                      disabled={processingAction !== null}
                    >
                      {processingAction === "complete" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Unlock className="mr-2 h-4 w-4" />
                      )}
                      ✅ Finalizar Transacción y Liberar Datos
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleAction("deny")}
                      disabled={processingAction !== null}
                    >
                      {processingAction === "deny" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                      )}
                      Denegar Acceso
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Approval History */}
          {approvalHistory && approvalHistory.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle>Historial de Aprobaciones</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {approvalHistory.map((entry: any, idx: number) => (
                    <div key={entry.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className={`p-2 rounded-full ${
                        entry.action === "approve" || entry.action === "pre_approve" 
                          ? "bg-green-100 text-green-600" 
                          : entry.action === "deny" 
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                      }`}>
                        {entry.action === "approve" || entry.action === "pre_approve" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : entry.action === "deny" ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <Info className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {entry.action === "pre_approve" && "Pre-aprobación comercial"}
                          {entry.action === "approve" && "Aprobación final y liberación de datos"}
                          {entry.action === "deny" && "Rechazado"}
                          {entry.action === "cancel" && "Cancelado"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {entry.action === "pre_approve" 
                            ? `por: ${transaction.subject_org?.name || entry.actor_org?.name || "Proveedor"}` 
                            : entry.action === "approve"
                              ? `por: ${transaction.holder_org?.name || entry.actor_org?.name || "Data Holder"}`
                              : `por: ${entry.actor_org?.name || "Organización desconocida"}`}
                        </p>
                        {entry.notes && (
                          <p className="text-sm mt-1 italic">{entry.notes}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(entry.created_at), "dd/MM/yyyy HH:mm", { locale: es })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Parties Involved */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Partes Involucradas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Consumidor</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
                    {transaction.consumer_org?.name?.charAt(0) || "C"}
                  </div>
                  <span className="font-medium">{transaction.consumer_org?.name || "—"}</span>
                  {userRole === "consumer" && (
                    <Badge variant="outline" className="ml-auto text-xs">Tú</Badge>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Proveedor</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm font-bold">
                    {transaction.subject_org?.name?.charAt(0) || "P"}
                  </div>
                  <span className="font-medium">{transaction.subject_org?.name || "—"}</span>
                  {userRole === "subject" && (
                    <Badge variant="outline" className="ml-auto text-xs">Tú</Badge>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Data Holder</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-bold">
                    {transaction.holder_org?.name?.charAt(0) || "H"}
                  </div>
                  <span className="font-medium">{transaction.holder_org?.name || "—"}</span>
                  {userRole === "holder" && (
                    <Badge variant="outline" className="ml-auto text-xs">Tú</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Fechas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fecha de Solicitud</p>
                <p className="font-medium">
                  {format(new Date(transaction.created_at), "dd/MM/yyyy HH:mm", { locale: es })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                <p className="font-medium">
                  {format(new Date(transaction.updated_at), "dd/MM/yyyy HH:mm", { locale: es })}
                </p>
              </div>
              {transaction.subscription_expires_at && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expiración de Acceso</p>
                  <p className="font-medium">
                    {format(new Date(transaction.subscription_expires_at), "dd/MM/yyyy", { locale: es })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Estado de Pago</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Badge className={
                transaction.payment_status === "paid" 
                  ? "bg-green-100 text-green-800" 
                  : transaction.payment_status === "pending"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-gray-100 text-gray-600"
              }>
                {transaction.payment_status === "paid" && "✓ Pagado"}
                {transaction.payment_status === "pending" && "⏳ Pendiente"}
                {(!transaction.payment_status || transaction.payment_status === "na") && "N/A (Gratis)"}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Access History for provider/admin */}
      {transaction.status === "completed" && transaction.asset?.id && (
        <AccessHistoryTable
          transactionId={transaction.id}
          assetId={transaction.asset.id}
          title="Historial de Accesos del Consumidor"
          description="Registro de todos los accesos realizados por el consumidor a este activo."
        />
      )}
    </div>
  );
};

export default RequestDetailPage;
