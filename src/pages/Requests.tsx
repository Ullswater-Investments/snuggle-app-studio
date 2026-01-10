import { useState } from "react";
import React from "react";
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
import { NegotiationChat } from "@/components/NegotiationChat";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, CheckCircle, XCircle, ArrowRight, ClipboardList, Plus, Info, Search, AlertCircle, Lock, Rocket, History, LayoutList, LayoutGrid, Calendar, Loader2, Download, BarChart3, Unlock } from "lucide-react";
import { RequestsAnalyticsDashboard } from "@/components/RequestsAnalyticsDashboard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { FadeIn } from "@/components/AnimatedSection";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";
import { EmptyState } from "@/components/EmptyState";

const STATUS_CONFIG: Record<string, { label: string; icon: any; color: string; tooltip: string }> = {
  initiated: { label: "Iniciada", icon: Clock, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", tooltip: "Transacción iniciada en blockchain" },
  pending_subject: { label: "Confirmando Bloque", icon: Clock, color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400", tooltip: "Esperando confirmación de bloque en blockchain" },
  pending_holder: { label: "Validando Acceso", icon: Lock, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400", tooltip: "Ocean Provider validando datatoken" },
  approved: { label: "Aprobada", icon: CheckCircle, color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", tooltip: "Transacción confirmada, lista para acceder" },
  denied_subject: { label: "Rechazada", icon: XCircle, color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", tooltip: "Transacción rechazada por el proveedor" },
  denied_holder: { label: "Acceso Denegado", icon: XCircle, color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", tooltip: "El Provider ha denegado el acceso" },
  completed: { label: "Acceso Activo", icon: Unlock, color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", tooltip: "Puedes descargar el dataset vía Ocean Provider" },
  cancelled: { label: "Cancelada", icon: XCircle, color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400", tooltip: "Transacción cancelada" },
};

const Requests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { sendNotification } = useNotifications();
  const { activeOrg, isDemo } = useOrganizationContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(true);

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

  // Obtener transacciones filtradas por activeOrg
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions", activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) return [];

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
        .or(`consumer_org_id.eq.${activeOrg.id},subject_org_id.eq.${activeOrg.id},holder_org_id.eq.${activeOrg.id}`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!activeOrg,
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
      setProcessingId(null);
      toast.success("Acción realizada exitosamente");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: any) => {
      setProcessingId(null);
      toast.error(error.message || "Error al realizar la acción");
    },
  });

  const handleApprove = (transactionId: string, isSubject: boolean) => {
    setProcessingId(transactionId);
    const action = isSubject ? "pre_approve" : "approve";
    approveMutation.mutate({ transactionId, action });
  };

  const handleDeny = (transactionId: string) => {
    setProcessingId(transactionId);
    approveMutation.mutate({ transactionId, action: "deny", notes: "Solicitud denegada" });
  };

  const getRoleInTransaction = (transaction: any) => {
    if (transaction.consumer_org_id === activeOrg?.id) return "consumer";
    if (transaction.subject_org_id === activeOrg?.id) return "subject";
    if (transaction.holder_org_id === activeOrg?.id) return "holder";
    return null;
  };

  // Filtrar por búsqueda y prioridad
  const applyFilters = (transactionsToFilter: any[]) => {
    return transactionsToFilter.filter((t) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = (
        (t.purpose || "").toLowerCase().includes(searchLower) ||
        (t.asset?.product?.name || "").toLowerCase().includes(searchLower) ||
        (t.consumer_org?.name || "").toLowerCase().includes(searchLower) ||
        (t.subject_org?.name || "").toLowerCase().includes(searchLower)
      );
      
      const matchesPriority = priorityFilter === "all" || 
        ((t.metadata?.priority || "").toLowerCase() === priorityFilter.toLowerCase());
      
      return matchesSearch && matchesPriority;
    });
  };

  const filteredTransactions = transactions || [];

  const pendingForMe = applyFilters(filteredTransactions.filter((t) => {
    const role = getRoleInTransaction(t);
    if (role === "subject" && t.status === "pending_subject") return true;
    if (role === "holder" && t.status === "pending_holder") return true;
    return false;
  }));

  const myRequests = applyFilters(filteredTransactions.filter((t) => 
    t.consumer_org_id === activeOrg?.id
  ));

  const historicalTransactions = applyFilters(filteredTransactions.filter((t) => 
    ["completed", "approved", "denied_subject", "denied_holder", "cancelled"].includes(t.status)
  ));

  const allTransactions = applyFilters(filteredTransactions);

  // --- Función de exportación CSV ---
  const handleExportCSV = () => {
    if (!allTransactions || allTransactions.length === 0) {
      toast.error("No hay datos para exportar");
      return;
    }

    const headers = ["ID", "Fecha", "Producto", "Consumidor", "Proveedor", "Estado", "Propósito"];
    
    const rows = allTransactions.map((t) => [
      t.id,
      format(new Date(t.created_at), "yyyy-MM-dd HH:mm", { locale: es }),
      t.asset?.product?.name || "Sin producto",
      t.consumer_org?.name || "—",
      t.subject_org?.name || "—",
      STATUS_CONFIG[t.status]?.label || t.status,
      `"${(t.purpose || "").replace(/"/g, '""')}"` // Escape quotes
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const fileName = `procuredata-requests-${format(new Date(), "yyyy-MM-dd")}.csv`;
    
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Informe descargado correctamente", {
      description: `${allTransactions.length} transacciones exportadas`,
    });
  };

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
            <div className="flex gap-2">
              <Button
                variant={showAnalytics ? "secondary" : "outline"}
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                {showAnalytics ? "Ocultar" : "Mostrar"} Analytics
              </Button>
              <Button 
                variant="outline"
                onClick={handleExportCSV}
                disabled={allTransactions.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar CSV
              </Button>
              <Button 
                size="lg"
                onClick={() => navigate("/requests/new")}
              >
                <Plus className="mr-2 h-5 w-5" />
                Nueva Solicitud
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>

      {showAnalytics && allTransactions.length > 0 && (
        <FadeIn delay={0.1}>
          <RequestsAnalyticsDashboard 
            transactions={allTransactions} 
            activeOrgId={activeOrg?.id}
          />
        </FadeIn>
      )}

      <FadeIn delay={0.15}>
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
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por propósito, producto u organización..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="crítica">Crítica</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-1 border rounded-md p-1">
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "kanban" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("kanban")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </FadeIn>

      <FadeIn delay={0.3}>
        {viewMode === "list" ? (
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending" className="relative">
              <AlertCircle className="mr-2 h-4 w-4" />
              Requiere Atención
              {pendingForMe.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white hover:bg-red-600" variant="destructive">
                  {pendingForMe.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="my-requests">
              <ClipboardList className="mr-2 h-4 w-4" />
              Mis Solicitudes
              <Badge className="ml-2" variant="secondary">
                {myRequests.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="historical">
              <History className="mr-2 h-4 w-4" />
              Histórico
              <Badge className="ml-2" variant="outline">
                {historicalTransactions.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="all">
              Todas
              <Badge className="ml-2" variant="outline">
                {allTransactions.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingForMe.length === 0 ? (
              <Card>
                <CardContent>
                  <EmptyState
                    icon={Clock}
                    title="Sin solicitudes activas"
                    description="No tienes ninguna solicitud que requiera tu acción en este momento. Cuando recibas nuevas solicitudes, aparecerán aquí."
                    action={
                      <Button onClick={() => navigate("/catalog")}>
                        Explorar Catálogo
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            ) : (
              pendingForMe.map((transaction) => {
                const role = getRoleInTransaction(transaction);
                const isSubject = role === "subject";

                return (
                  <Card key={transaction.id} className={cn(
                    transaction.metadata?.priority === 'Crítica' && "border-l-4 border-destructive"
                  )}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle>{transaction.asset.product.name}</CardTitle>
                            {transaction.metadata?.priority && (
                              <Badge 
                                variant={
                                  transaction.metadata.priority === 'Crítica' ? 'destructive' :
                                  transaction.metadata.priority === 'Alta' ? 'default' :
                                  'outline'
                                }
                                className={cn(
                                  transaction.metadata.priority === 'Crítica' && "animate-pulse",
                                  transaction.metadata.priority === 'Alta' && "bg-orange-500 hover:bg-orange-600"
                                )}
                              >
                                {transaction.metadata.priority === 'Crítica' && <AlertCircle className="w-3 h-3 mr-1" />}
                                {transaction.metadata.priority}
                              </Badge>
                            )}
                          </div>
                          {transaction.metadata?.ticket_id && (
                            <p className="text-xs text-muted-foreground font-mono mb-1">ID: {transaction.metadata.ticket_id}</p>
                          )}
                          <CardDescription>
                            Solicitado por: {transaction.consumer_org.name}
                          </CardDescription>
                          {transaction.metadata?.tags && Array.isArray(transaction.metadata.tags) && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {transaction.metadata.tags.map((tag: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge className={STATUS_CONFIG[transaction.status].color}>
                                  {React.createElement(STATUS_CONFIG[transaction.status].icon, {
                                    className: "mr-1 h-3 w-3"
                                  })}
                                  {STATUS_CONFIG[transaction.status].label}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">{STATUS_CONFIG[transaction.status].tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Precio</p>
                          <p className="text-sm font-bold">
                            {transaction.metadata?.price ? `${transaction.metadata.price} €` : "Gratis"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Estado de Pago</p>
                          <div className="mt-1">
                            {transaction.payment_status === 'paid' && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Pagado
                              </Badge>
                            )}
                            {transaction.payment_status === 'pending' && (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400">
                                <Clock className="h-3 w-3 mr-1" />
                                Pendiente
                              </Badge>
                            )}
                            {(!transaction.payment_status || transaction.payment_status === 'na') && (
                              <Badge variant="secondary" className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                N/A
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Duración</p>
                          <p className="text-sm">{transaction.access_duration_days} días</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Propósito</p>
                        <p className="text-sm">{transaction.purpose}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Justificación</p>
                        <p className="text-sm">{transaction.justification}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(transaction.id, isSubject)}
                          disabled={processingId !== null}
                        >
                          {processingId === transaction.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="mr-2 h-4 w-4" />
                          )}
                          {isSubject ? "Pre-aprobar" : "Aprobar y Compartir"}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeny(transaction.id)}
                          disabled={processingId !== null}
                        >
                          {processingId === transaction.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle className="mr-2 h-4 w-4" />
                          )}
                          Denegar
                        </Button>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => setSelectedTransaction(transaction)}
                            >
                              Ver Detalle
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                            <SheetHeader>
                              <SheetTitle>{transaction.asset.product.name}</SheetTitle>
                              <SheetDescription>
                                Detalle completo de la solicitud de datos
                              </SheetDescription>
                            </SheetHeader>
                            
                            <Tabs defaultValue="details" className="mt-6">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="details">Detalles</TabsTrigger>
                                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                                <TabsTrigger value="messages">Mensajes</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="details" className="mt-4">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-4">
                                    <div className="flex-1 text-center">
                                      <div className="text-sm font-medium">{transaction.consumer_org.name}</div>
                                      <div className="text-xs text-muted-foreground">Solicitante</div>
                                    </div>
                                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                                    <div className="flex-1 text-center">
                                      <div className="text-sm font-medium">{transaction.subject_org.name}</div>
                                      <div className="text-xs text-muted-foreground">Proveedor</div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-semibold mb-2">Propósito</h4>
                                    <p className="text-sm text-muted-foreground">{transaction.purpose}</p>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-semibold mb-2">Justificación</h4>
                                    <p className="text-sm text-muted-foreground">{transaction.justification}</p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-sm font-semibold mb-1">Duración</h4>
                                      <p className="text-sm text-muted-foreground">{transaction.access_duration_days} días</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-semibold mb-1">Estado</h4>
                                      <Badge className={STATUS_CONFIG[transaction.status].color}>
                                        {React.createElement(STATUS_CONFIG[transaction.status].icon, {
                                          className: "mr-1 h-3 w-3"
                                        })}
                                        {STATUS_CONFIG[transaction.status].label}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="timeline" className="mt-4">
                                <TransactionDetailView transaction={transaction} role={role} />
                              </TabsContent>
                              
                              <TabsContent value="messages" className="mt-4">
                                <NegotiationChat transactionId={transaction.id} />
                              </TabsContent>
                            </Tabs>
                          </SheetContent>
                        </Sheet>
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
                <Card key={transaction.id} className={cn(
                  transaction.metadata?.priority === 'Crítica' && "border-l-4 border-destructive"
                )}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{transaction.asset.product.name}</CardTitle>
                          {transaction.metadata?.priority && (
                            <Badge 
                              variant={
                                transaction.metadata.priority === 'Crítica' ? 'destructive' :
                                transaction.metadata.priority === 'Alta' ? 'default' :
                                'outline'
                              }
                              className={cn(
                                transaction.metadata.priority === 'Crítica' && "animate-pulse",
                                transaction.metadata.priority === 'Alta' && "bg-orange-500 hover:bg-orange-600"
                              )}
                            >
                              {transaction.metadata.priority === 'Crítica' && <AlertCircle className="w-3 h-3 mr-1" />}
                              {transaction.metadata.priority}
                            </Badge>
                          )}
                        </div>
                        {transaction.metadata?.ticket_id && (
                          <p className="text-xs text-muted-foreground font-mono mb-1">ID: {transaction.metadata.ticket_id}</p>
                        )}
                        <CardDescription>
                          Proveedor: {transaction.subject_org.name}
                        </CardDescription>
                        {transaction.metadata?.tags && Array.isArray(transaction.metadata.tags) && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {transaction.metadata.tags.map((tag: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                       <div className="flex gap-2 flex-shrink-0">
                         <TooltipProvider>
                           <Tooltip>
                             <TooltipTrigger>
                               <Badge className={STATUS_CONFIG[transaction.status].color}>
                                 {React.createElement(STATUS_CONFIG[transaction.status].icon, {
                                   className: "mr-1 h-3 w-3"
                                 })}
                                 {STATUS_CONFIG[transaction.status].label}
                               </Badge>
                             </TooltipTrigger>
                             <TooltipContent>
                               <p className="text-xs">{STATUS_CONFIG[transaction.status].tooltip}</p>
                             </TooltipContent>
                           </Tooltip>
                         </TooltipProvider>
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

          <TabsContent value="historical" className="space-y-4">
            {historicalTransactions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <History className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No hay transacciones históricas</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Las transacciones completadas, aprobadas o denegadas aparecerán aquí
                  </p>
                </CardContent>
              </Card>
            ) : (
              historicalTransactions.map((transaction) => {
                const role = getRoleInTransaction(transaction);
                
                return (
                  <Card key={transaction.id} className={cn(
                    "opacity-90",
                    transaction.metadata?.priority === 'Crítica' && "border-l-4 border-destructive"
                  )}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-base">{transaction.asset.product.name}</CardTitle>
                            {transaction.metadata?.priority && (
                              <Badge 
                                variant={
                                  transaction.metadata.priority === 'Crítica' ? 'destructive' :
                                  transaction.metadata.priority === 'Alta' ? 'default' :
                                  'outline'
                                }
                                className={cn(
                                  transaction.metadata.priority === 'Crítica' && "animate-pulse",
                                  transaction.metadata.priority === 'Alta' && "bg-orange-500 hover:bg-orange-600"
                                )}
                              >
                                {transaction.metadata.priority === 'Crítica' && <AlertCircle className="w-3 h-3 mr-1" />}
                                {transaction.metadata.priority}
                              </Badge>
                            )}
                          </div>
                          {transaction.metadata?.ticket_id && (
                            <p className="text-xs text-muted-foreground font-mono mb-1">ID: {transaction.metadata.ticket_id}</p>
                          )}
                          <CardDescription>
                            {role === "consumer" && `Proveedor: ${transaction.subject_org.name}`}
                            {role === "subject" && `Solicitado por: ${transaction.consumer_org.name}`}
                            {role === "holder" && `Consumer: ${transaction.consumer_org.name}`}
                          </CardDescription>
                          {transaction.metadata?.tags && Array.isArray(transaction.metadata.tags) && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {transaction.metadata.tags.map((tag: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge className={STATUS_CONFIG[transaction.status].color}>
                                  {React.createElement(STATUS_CONFIG[transaction.status].icon, {
                                    className: "mr-1 h-3 w-3"
                                  })}
                                  {STATUS_CONFIG[transaction.status].label}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">{STATUS_CONFIG[transaction.status].tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true, locale: es })}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/requests/${transaction.id}`)}
                        >
                          Ver Detalle
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {allTransactions.map((transaction) => {
              const role = getRoleInTransaction(transaction);
              
              return (
                <Card key={transaction.id} className={cn(
                  transaction.metadata?.priority === 'Crítica' && "border-l-4 border-destructive"
                )}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{transaction.asset.product.name}</CardTitle>
                          {transaction.metadata?.priority && (
                            <Badge 
                              variant={
                                transaction.metadata.priority === 'Crítica' ? 'destructive' :
                                transaction.metadata.priority === 'Alta' ? 'default' :
                                'outline'
                              }
                              className={cn(
                                transaction.metadata.priority === 'Crítica' && "animate-pulse",
                                transaction.metadata.priority === 'Alta' && "bg-orange-500 hover:bg-orange-600"
                              )}
                            >
                              {transaction.metadata.priority === 'Crítica' && <AlertCircle className="w-3 h-3 mr-1" />}
                              {transaction.metadata.priority}
                            </Badge>
                          )}
                        </div>
                        {transaction.metadata?.ticket_id && (
                          <p className="text-xs text-muted-foreground font-mono mb-1">ID: {transaction.metadata.ticket_id}</p>
                        )}
                        <CardDescription>
                          {role === "consumer" && `Proveedor: ${transaction.subject_org.name}`}
                          {role === "subject" && `Solicitado por: ${transaction.consumer_org.name}`}
                          {role === "holder" && `Consumer: ${transaction.consumer_org.name}, Subject: ${transaction.subject_org.name}`}
                        </CardDescription>
                        {transaction.metadata?.tags && Array.isArray(transaction.metadata.tags) && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {transaction.metadata.tags.map((tag: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                       <div className="flex gap-2 flex-shrink-0">
                         <Badge variant="outline">{role?.toUpperCase()}</Badge>
                         <TooltipProvider>
                           <Tooltip>
                             <TooltipTrigger>
                               <Badge className={STATUS_CONFIG[transaction.status].color}>
                                 {React.createElement(STATUS_CONFIG[transaction.status].icon, {
                                   className: "mr-1 h-3 w-3"
                                 })}
                                 {STATUS_CONFIG[transaction.status].label}
                               </Badge>
                             </TooltipTrigger>
                             <TooltipContent>
                               <p className="text-xs">{STATUS_CONFIG[transaction.status].tooltip}</p>
                             </TooltipContent>
                           </Tooltip>
                         </TooltipProvider>
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
        ) : (
          /* Vista Kanban */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Columna 1: Pendientes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-600" />
                  Pendientes
                  <Badge variant="secondary" className="ml-auto">{allTransactions.filter(t => ['initiated', 'pending_subject'].includes(t.status)).length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {allTransactions.filter(t => ['initiated', 'pending_subject'].includes(t.status)).map((transaction) => (
                  <Card key={transaction.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {(transaction.subject_org?.name || "??").substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{transaction.asset.product.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{transaction.subject_org.name}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {STATUS_CONFIG[transaction.status].label}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleDateString("es-ES", { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Columna 2: En Negociación */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-600" />
                  En Negociación
                  <Badge variant="secondary" className="ml-auto">{allTransactions.filter(t => t.status === 'pending_holder').length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {allTransactions.filter(t => t.status === 'pending_holder').map((transaction) => (
                  <Card key={transaction.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {(transaction.subject_org?.name || "??").substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{transaction.asset.product.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{transaction.subject_org.name}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {STATUS_CONFIG[transaction.status].label}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleDateString("es-ES", { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Columna 3: Aprobados */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Aprobados
                  <Badge variant="secondary" className="ml-auto">{allTransactions.filter(t => t.status === 'approved').length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {allTransactions.filter(t => t.status === 'approved').map((transaction) => (
                  <Card key={transaction.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {(transaction.subject_org?.name || "??").substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{transaction.asset.product.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{transaction.subject_org.name}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        {STATUS_CONFIG[transaction.status].label}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleDateString("es-ES", { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Columna 4: Completados */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-emerald-600" />
                  Completados
                  <Badge variant="secondary" className="ml-auto">{allTransactions.filter(t => t.status === 'completed').length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {allTransactions.filter(t => t.status === 'completed').map((transaction) => (
                  <Card key={transaction.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {(transaction.subject_org?.name || "??").substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{transaction.asset.product.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{transaction.subject_org.name}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                        {STATUS_CONFIG[transaction.status].label}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleDateString("es-ES", { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </FadeIn>
    </div>
  );
};

// Componente auxiliar para mostrar detalles de transacción en Sheet
const TransactionDetailView = ({ transaction, role }: { transaction: any; role: string | null }) => {
  const { data: approvalHistory } = useQuery({
    queryKey: ["approval-history", transaction.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("approval_history")
        .select(`
          *,
          actor_org:organizations!approval_history_actor_org_id_fkey(name)
        `)
        .eq("transaction_id", transaction.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-center">
          <div className="text-sm font-medium">{transaction.consumer_org.name}</div>
          <div className="text-xs text-muted-foreground">Solicitante</div>
        </div>
        <ArrowRight className="h-6 w-6 text-muted-foreground" />
        <div className="flex-1 text-center">
          <div className="text-sm font-medium">{transaction.subject_org.name}</div>
          <div className="text-xs text-muted-foreground">Proveedor</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Propósito</h4>
          <p className="text-sm text-muted-foreground">{transaction.purpose}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Justificación</h4>
          <p className="text-sm text-muted-foreground">{transaction.justification}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold mb-1">Duración de Acceso</h4>
            <p className="text-sm text-muted-foreground">{transaction.access_duration_days} días</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">Estado Actual</h4>
            <Badge className={STATUS_CONFIG[transaction.status].color}>
              {React.createElement(STATUS_CONFIG[transaction.status].icon, {
                className: "mr-1 h-3 w-3"
              })}
              {STATUS_CONFIG[transaction.status].label}
            </Badge>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">Timeline de Aprobaciones</h4>
        {approvalHistory && approvalHistory.length > 0 ? (
          <div className="space-y-4">
            {approvalHistory.map((event, index) => (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`rounded-full p-2 ${
                    event.action === 'approve' ? 'bg-green-100 dark:bg-green-900/30' :
                    event.action === 'deny' ? 'bg-red-100 dark:bg-red-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    {event.action === 'approve' && <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />}
                    {event.action === 'deny' && <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />}
                    {event.action === 'pre_approve' && <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                  </div>
                  {index < approvalHistory.length - 1 && (
                    <div className="w-px h-8 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="text-sm font-medium">{event.actor_org.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{event.action.replace('_', ' ')}</div>
                  {event.notes && (
                    <p className="text-xs text-muted-foreground mt-1 italic">"{event.notes}"</p>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(event.created_at), { addSuffix: true, locale: es })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No hay historial de aprobaciones aún</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
