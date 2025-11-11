import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, ArrowRight, ClipboardList, Plus, Info } from "lucide-react";
import { toast } from "sonner";
import { FadeIn } from "@/components/AnimatedSection";

const STATUS_LABELS: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  initiated: { label: "Iniciada", variant: "secondary" },
  pending_subject: { label: "Pendiente Subject", variant: "default" },
  pending_holder: { label: "Pendiente Holder", variant: "default" },
  approved: { label: "Aprobada", variant: "default" },
  denied_subject: { label: "Denegada por Subject", variant: "destructive" },
  denied_holder: { label: "Denegada por Holder", variant: "destructive" },
  completed: { label: "Completada", variant: "outline" },
  cancelled: { label: "Cancelada", variant: "destructive" },
};

const Requests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { sendNotification } = useNotifications();
  const { activeOrg, isDemo } = useOrganizationContext();

  // Obtener organización del usuario
  const { data: userProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("organization_id, organizations(id, name, type)")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Obtener transacciones
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          *,
          asset:data_assets (
            id,
            product:data_products (
              name,
              category
            )
          ),
          consumer_org:organizations!data_transactions_consumer_org_id_fkey (
            name
          ),
          subject_org:organizations!data_transactions_subject_org_id_fkey (
            name
          ),
          holder_org:organizations!data_transactions_holder_org_id_fkey (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async ({ transactionId, action, notes }: { transactionId: string; action: string; notes?: string }) => {
      if (!userProfile) throw new Error("No user profile");

      const transaction = transactions?.find(t => t.id === transactionId);
      if (!transaction) throw new Error("Transaction not found");

      // Determinar nuevo estado basado en el rol y acción
      let newStatus = transaction.status;
      let notificationEvent: "pre_approved" | "approved" | "denied" | "completed" | null = null;
      
      if (action === "pre_approve" && transaction.status === "pending_subject") {
        newStatus = "pending_holder";
        notificationEvent = "pre_approved";
      } else if (action === "approve" && transaction.status === "pending_holder") {
        newStatus = "completed";
        notificationEvent = "completed";
      } else if (action === "deny") {
        newStatus = transaction.status === "pending_subject" ? "denied_subject" : "denied_holder";
        notificationEvent = "denied";
      }

      // Actualizar estado de transacción
      const { error: updateError } = await supabase
        .from("data_transactions")
        .update({ status: newStatus })
        .eq("id", transactionId);

      if (updateError) throw updateError;

      // Registrar en historial
      const { error: historyError } = await supabase
        .from("approval_history")
        .insert([{
          transaction_id: transactionId,
          actor_org_id: userProfile.organization_id,
          action: action as any,
          actor_user_id: user?.id,
          notes: notes,
        }] as any);

      if (historyError) throw historyError;

      // Enviar notificación
      if (notificationEvent) {
        await sendNotification(transactionId, notificationEvent);
      }
    },
    onSuccess: () => {
      toast.success("Acción realizada exitosamente");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al realizar la acción");
    },
  });

  const handleApprove = (transactionId: string, isSubject: boolean) => {
    const action = isSubject ? "pre_approve" : "approve";
    approveMutation.mutate({ transactionId, action });
  };

  const handleDeny = (transactionId: string) => {
    approveMutation.mutate({ transactionId, action: "deny", notes: "Solicitud denegada" });
  };

  const getRoleInTransaction = (transaction: any) => {
    if (transaction.consumer_org_id === userProfile?.organization_id) return "consumer";
    if (transaction.subject_org_id === userProfile?.organization_id) return "subject";
    if (transaction.holder_org_id === userProfile?.organization_id) return "holder";
    return null;
  };

  const pendingForMe = transactions?.filter((t) => {
    const role = getRoleInTransaction(t);
    if (role === "subject" && t.status === "pending_subject") return true;
    if (role === "holder" && t.status === "pending_holder") return true;
    return false;
  }) || [];

  const myRequests = transactions?.filter((t) => 
    t.consumer_org_id === userProfile?.organization_id
  ) || [];

  const allTransactions = transactions || [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Cargando solicitudes...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-500/10 via-background to-background border border-amber-500/20 p-8">
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-4">
                <ClipboardList className="mr-1 h-3 w-3" />
                Solicitudes
              </Badge>
              <h1 className="text-4xl font-bold mb-3">
                Gestiona tus Solicitudes de Datos
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Administra solicitudes de datos según tu rol en cada transacción
              </p>
            </div>
            <Button 
              size="lg"
              onClick={() => navigate("/requests/new")}
              className="ml-4"
            >
              <Plus className="mr-2 h-5 w-5" />
              Nueva Solicitud
            </Button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pendientes de Acción
              </CardTitle>
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingForMe.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mis Solicitudes
              </CardTitle>
              <ClipboardList className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{myRequests.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Transacciones
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allTransactions.length}</div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pendientes de Acción ({pendingForMe.length})
            </TabsTrigger>
            <TabsTrigger value="my-requests">
              Mis Solicitudes ({myRequests.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              Todas ({allTransactions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingForMe.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No hay solicitudes pendientes</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No tienes ninguna solicitud que requiera tu acción en este momento
                  </p>
                </CardContent>
              </Card>
            ) : (
              pendingForMe.map((transaction) => {
                const role = getRoleInTransaction(transaction);
                const isSubject = role === "subject";

                return (
                  <Card key={transaction.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{transaction.asset.product.name}</CardTitle>
                          <CardDescription>
                            Solicitado por: {transaction.consumer_org.name}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={STATUS_LABELS[transaction.status].variant}>
                            {STATUS_LABELS[transaction.status].label}
                          </Badge>
                          {isDemo && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700">
                                    <Info className="h-3 w-3 mr-1" />
                                    DEMO
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs max-w-xs">
                                    Transacción sintética de demostración. En producción, verás tus solicitudes reales.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Propósito</p>
                          <p className="text-sm">{transaction.purpose}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Duración</p>
                          <p className="text-sm">{transaction.access_duration_days} días</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Justificación</p>
                        <p className="text-sm">{transaction.justification}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(transaction.id, isSubject)}
                          disabled={approveMutation.isPending}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {isSubject ? "Pre-aprobar" : "Aprobar y Compartir"}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeny(transaction.id)}
                          disabled={approveMutation.isPending}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Denegar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/requests/${transaction.id}`)}
                        >
                          Ver Detalle
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="my-requests" className="space-y-4">
            {myRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No has realizado ninguna solicitud</p>
                  <Button className="mt-4" onClick={() => navigate("/catalog")}>
                    Explorar Catálogo
                  </Button>
                </CardContent>
              </Card>
            ) : (
              myRequests.map((transaction) => (
                <Card key={transaction.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{transaction.asset.product.name}</CardTitle>
                        <CardDescription>
                          Proveedor: {transaction.subject_org.name}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={STATUS_LABELS[transaction.status].variant}>
                          {STATUS_LABELS[transaction.status].label}
                        </Badge>
                        {isDemo && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700">
                                  <Info className="h-3 w-3 mr-1" />
                                  DEMO
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs max-w-xs">
                                  Transacción sintética de demostración. En producción, verás tus solicitudes reales.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Propósito: {transaction.purpose}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Creada: {new Date(transaction.created_at).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/data/view/${transaction.id}`)}
                      >
                        Ver Datos Recibidos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {allTransactions.map((transaction) => {
              const role = getRoleInTransaction(transaction);
              
              return (
                <Card key={transaction.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{transaction.asset.product.name}</CardTitle>
                        <CardDescription>
                          {role === "consumer" && `Proveedor: ${transaction.subject_org.name}`}
                          {role === "subject" && `Solicitado por: ${transaction.consumer_org.name}`}
                          {role === "holder" && `Consumer: ${transaction.consumer_org.name}, Subject: ${transaction.subject_org.name}`}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{role?.toUpperCase()}</Badge>
                        <Badge variant={STATUS_LABELS[transaction.status].variant}>
                          {STATUS_LABELS[transaction.status].label}
                        </Badge>
                        {isDemo && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700">
                                  <Info className="h-3 w-3 mr-1" />
                                  DEMO
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs max-w-xs">
                                  Transacción sintética de demostración. En producción, verás tus solicitudes reales.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Creada: {new Date(transaction.created_at).toLocaleDateString("es-ES")}
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/requests/${transaction.id}`)}
                      >
                        Ver Detalle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
};

export default Requests;
