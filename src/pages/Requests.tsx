import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      if (action === "pre_approve" && transaction.status === "pending_subject") {
        newStatus = "pending_holder";
      } else if (action === "approve" && transaction.status === "pending_holder") {
        newStatus = "completed";
      } else if (action === "deny") {
        newStatus = transaction.status === "pending_subject" ? "denied_subject" : "denied_holder";
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
            PROCUREDATA
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
            <Button variant="ghost" onClick={() => navigate("/catalog")}>
              Catálogo
            </Button>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-3xl font-bold">Gestión de Solicitudes</h2>
          <p className="text-muted-foreground">
            Administra solicitudes de datos según tu rol en cada transacción
          </p>
        </div>

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
                        <Badge variant={STATUS_LABELS[transaction.status].variant}>
                          {STATUS_LABELS[transaction.status].label}
                        </Badge>
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
                      <Badge variant={STATUS_LABELS[transaction.status].variant}>
                        {STATUS_LABELS[transaction.status].label}
                      </Badge>
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
      </main>
    </div>
  );
};

export default Requests;
