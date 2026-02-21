import { useState, useMemo } from "react";
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
import { Clock, CheckCircle, XCircle, ArrowRight, ClipboardList, Plus, Info, Search, AlertCircle, Lock, Rocket, History, LayoutList, LayoutGrid, Calendar, Loader2, Download, BarChart3, Unlock, ShieldAlert } from "lucide-react";
import { RevokeAccessButton } from "@/components/RevokeAccessButton";
import { RequestsAnalyticsDashboard } from "@/components/RequestsAnalyticsDashboard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { FadeIn } from "@/components/AnimatedSection";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow, format } from "date-fns";
import { es, enUS, fr, de, it, pt, nl } from "date-fns/locale";
import { EmptyState } from "@/components/EmptyState";
import { useTranslation } from "react-i18next";

const DATE_LOCALES: Record<string, typeof es> = { es, en: enUS, fr, de, it, pt, nl };

const getStatusConfig = (t: (key: string) => string) => ({
  initiated: { label: t('status.initiated.label'), icon: Clock, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", tooltip: t('status.initiated.tooltip') },
  pending_subject: { label: t('status.pending_subject.label'), icon: Clock, color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400", tooltip: t('status.pending_subject.tooltip') },
  pending_holder: { label: t('status.pending_holder.label'), icon: Lock, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400", tooltip: t('status.pending_holder.tooltip') },
  approved: { label: t('status.approved.label'), icon: CheckCircle, color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", tooltip: t('status.approved.tooltip') },
  denied_subject: { label: t('status.denied_subject.label'), icon: XCircle, color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", tooltip: t('status.denied_subject.tooltip') },
  denied_holder: { label: t('status.denied_holder.label'), icon: XCircle, color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", tooltip: t('status.denied_holder.tooltip') },
  completed: { label: t('status.completed.label'), icon: Unlock, color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", tooltip: t('status.completed.tooltip') },
  cancelled: { label: t('status.cancelled.label'), icon: XCircle, color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400", tooltip: t('status.cancelled.tooltip') },
  revoked: { label: t('status.revoked.label'), icon: ShieldAlert, color: "bg-red-200 text-red-900 dark:bg-red-900/40 dark:text-red-300", tooltip: t('status.revoked.tooltip') },
});

const Requests = () => {
  const { t, i18n } = useTranslation('requests');
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

  const dateLocale = DATE_LOCALES[i18n.language] || DATE_LOCALES.en;
  const STATUS_CONFIG = useMemo(() => getStatusConfig(t), [t]);

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

      const { error: updateError } = await supabase
        .from("data_transactions")
        .update({ status: newStatus })
        .eq("id", transactionId);

      if (updateError) throw updateError;

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

      if (notificationEvent) {
        await sendNotification(transactionId, notificationEvent);
      }
    },
    onSuccess: () => {
      setProcessingId(null);
      toast.success(t('toast.success'));
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: any) => {
      setProcessingId(null);
      toast.error(error.message || t('toast.error'));
    },
  });

  const handleApprove = (transactionId: string, isSubject: boolean) => {
    setProcessingId(transactionId);
    const action = isSubject ? "pre_approve" : "approve";
    approveMutation.mutate({ transactionId, action });
  };

  const handleDeny = (transactionId: string) => {
    setProcessingId(transactionId);
    approveMutation.mutate({ transactionId, action: "deny", notes: t('toast.denied') });
  };

  const getRoleInTransaction = (transaction: any) => {
    if (transaction.consumer_org_id === activeOrg?.id) return "consumer";
    if (transaction.subject_org_id === activeOrg?.id) return "subject";
    if (transaction.holder_org_id === activeOrg?.id) return "holder";
    return null;
  };

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
    ["completed", "approved", "denied_subject", "denied_holder", "cancelled", "revoked"].includes(t.status)
  ));

  const allTransactions = applyFilters(filteredTransactions);

  const handleExportCSV = () => {
    if (!allTransactions || allTransactions.length === 0) {
      toast.error(t('toast.noData'));
      return;
    }

    const headers = ["ID", t('table.columns.date'), t('table.columns.product'), t('table.columns.consumer'), t('table.columns.subject'), t('table.columns.status'), t('table.columns.purpose')];
    
    const rows = allTransactions.map((tx) => [
      tx.id,
      format(new Date(tx.created_at), "yyyy-MM-dd HH:mm", { locale: dateLocale }),
      tx.asset?.product?.name || t('csv.noProduct'),
      tx.consumer_org?.name || "—",
      tx.subject_org?.name || "—",
      STATUS_CONFIG[tx.status as keyof typeof STATUS_CONFIG]?.label || tx.status,
      `"${(tx.purpose || "").replace(/"/g, '""')}"`
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

    toast.success(t('toast.exported'), {
      description: t('toast.exportedDesc', { count: allTransactions.length }),
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">{t('loading')}</p>
      </div>
    );
  }

  const formatLocalDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(i18n.language === 'en' ? 'en-GB' : `${i18n.language}-${i18n.language.toUpperCase()}`, { day: 'numeric', month: 'short' });
  };

  const DemoTooltip = () => isDemo ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700">
            <Info className="h-3 w-3 mr-1" />
            DEMO
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs max-w-xs">{t('demo.tooltip')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-500/10 via-background to-background border border-amber-500/20 p-8">
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-4">
                <ClipboardList className="mr-1 h-3 w-3" />
                {t('badge')}
              </Badge>
              <h1 className="text-4xl font-bold mb-3">
                {t('title')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t('subtitle')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={showAnalytics ? "secondary" : "outline"}
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                {showAnalytics ? t('buttons.hideAnalytics') : t('buttons.showAnalytics')}
              </Button>
              <Button 
                variant="outline"
                onClick={handleExportCSV}
                disabled={allTransactions.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                {t('buttons.exportCSV')}
              </Button>
              <Button 
                size="lg"
                onClick={() => navigate("/requests/new")}
              >
                <Plus className="mr-2 h-5 w-5" />
                {t('buttons.newRequest')}
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
                {t('stats.pendingAction')}
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
                {t('stats.myRequests')}
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
                {t('stats.totalTransactions')}
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
                  placeholder={t('filters.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t('filters.priority')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  <SelectItem value="crítica">{t('filters.critical')}</SelectItem>
                  <SelectItem value="alta">{t('filters.high')}</SelectItem>
                  <SelectItem value="media">{t('filters.medium')}</SelectItem>
                  <SelectItem value="baja">{t('filters.low')}</SelectItem>
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
              {t('tabs.requiresAttention')}
              {pendingForMe.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white hover:bg-red-600" variant="destructive">
                  {pendingForMe.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="my-requests">
              <ClipboardList className="mr-2 h-4 w-4" />
              {t('tabs.myRequests')}
              <Badge className="ml-2" variant="secondary">
                {myRequests.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="historical">
              <History className="mr-2 h-4 w-4" />
              {t('tabs.historical')}
              <Badge className="ml-2" variant="outline">
                {historicalTransactions.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="all">
              {t('tabs.all')}
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
                    title={t('empty.title')}
                    description={t('empty.description')}
                    action={
                      <Button onClick={() => navigate("/catalog")}>
                        {t('empty.exploreCatalog')}
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
                            {t('fields.requestedBy')}: {transaction.consumer_org.name}
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
                                <Badge className={STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.color}>
                                  {React.createElement(STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.icon, {
                                    className: "mr-1 h-3 w-3"
                                  })}
                                  {STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.label}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">{STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <DemoTooltip />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t('fields.price')}</p>
                          <p className="text-sm font-bold">
                            {transaction.metadata?.price ? `${transaction.metadata.price} €` : t('fields.free')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t('fields.paymentStatus')}</p>
                          <div className="mt-1">
                            {transaction.payment_status === 'paid' && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {t('fields.paid')}
                              </Badge>
                            )}
                            {transaction.payment_status === 'pending' && (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400">
                                <Clock className="h-3 w-3 mr-1" />
                                {t('fields.pending')}
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
                          <p className="text-sm font-medium text-muted-foreground">{t('fields.duration')}</p>
                          <p className="text-sm">{transaction.access_duration_days} {t('fields.days')}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t('fields.purpose')}</p>
                        <p className="text-sm">{transaction.purpose}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t('fields.justification')}</p>
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
                          {isSubject ? t('actions.preApprove') : t('actions.approveAndShare')}
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
                          {t('actions.deny')}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/requests/${transaction.id}`)}
                        >
                          {t('actions.viewDetails')}
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
                  <p className="text-muted-foreground">{t('empty.noRequests')}</p>
                  <Button className="mt-4" onClick={() => navigate("/catalog")}>
                    {t('empty.exploreCatalog')}
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
                          {t('fields.subject')}: {transaction.subject_org.name}
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
                               <Badge className={STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.color}>
                                 {React.createElement(STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.icon, {
                                   className: "mr-1 h-3 w-3"
                                 })}
                                 {STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.label}
                               </Badge>
                             </TooltipTrigger>
                             <TooltipContent>
                               <p className="text-xs">{STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.tooltip}</p>
                             </TooltipContent>
                           </Tooltip>
                         </TooltipProvider>
                        <DemoTooltip />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {t('fields.purpose')}: {transaction.purpose}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t('fields.created')}: {formatLocalDate(transaction.created_at)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {transaction.status === "completed" &&
                          (transaction.subject_org_id === activeOrg?.id || transaction.holder_org_id === activeOrg?.id) && (
                          <RevokeAccessButton
                            transactionId={transaction.id}
                            resourceName={transaction.asset?.product?.name}
                            actorOrgId={activeOrg!.id}
                            onRevoked={() => queryClient.invalidateQueries({ queryKey: ["transactions"] })}
                          />
                        )}
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/requests/${transaction.id}`)}
                        >
                          {t('actions.viewDetails')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
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
                  <h3 className="mt-4 text-lg font-semibold">{t('empty.noHistory')}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('empty.noHistoryDesc')}
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
                            {role === "consumer" && `${t('fields.subject')}: ${transaction.subject_org.name}`}
                            {role === "subject" && `${t('fields.requestedBy')}: ${transaction.consumer_org.name}`}
                            {role === "holder" && `${t('fields.consumer')}: ${transaction.consumer_org.name}`}
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
                                <Badge className={STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.color}>
                                  {React.createElement(STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.icon, {
                                    className: "mr-1 h-3 w-3"
                                  })}
                                  {STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.label}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">{STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true, locale: dateLocale })}
                        </p>
                        <div className="flex gap-2">
                          {transaction.status === "completed" && (role === "subject" || role === "holder") && (
                            <RevokeAccessButton
                              transactionId={transaction.id}
                              resourceName={transaction.asset?.product?.name}
                              actorOrgId={activeOrg!.id}
                              onRevoked={() => queryClient.invalidateQueries({ queryKey: ["transactions"] })}
                            />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/requests/${transaction.id}`)}
                          >
                            {t('actions.viewDetails')}
                          </Button>
                        </div>
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
                          {role === "consumer" && `${t('fields.subject')}: ${transaction.subject_org.name}`}
                          {role === "subject" && `${t('fields.requestedBy')}: ${transaction.consumer_org.name}`}
                          {role === "holder" && `${t('fields.consumer')}: ${transaction.consumer_org.name}, ${t('fields.subject')}: ${transaction.subject_org.name}`}
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
                               <Badge className={STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.color}>
                                 {React.createElement(STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.icon, {
                                   className: "mr-1 h-3 w-3"
                                 })}
                                 {STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.label}
                               </Badge>
                             </TooltipTrigger>
                             <TooltipContent>
                               <p className="text-xs">{STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.tooltip}</p>
                             </TooltipContent>
                           </Tooltip>
                         </TooltipProvider>
                        <DemoTooltip />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {t('fields.created')}: {formatLocalDate(transaction.created_at)}
                      </p>
                      <div className="flex gap-2">
                        {transaction.status === "completed" && (role === "subject" || role === "holder") && (
                          <RevokeAccessButton
                            transactionId={transaction.id}
                            resourceName={transaction.asset?.product?.name}
                            actorOrgId={activeOrg!.id}
                            onRevoked={() => queryClient.invalidateQueries({ queryKey: ["transactions"] })}
                          />
                        )}
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/requests/${transaction.id}`)}
                        >
                          {t('actions.viewDetails')}
                        </Button>
                      </div>
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
                  {t('kanban.pending')}
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
                        {STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.label}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatLocalDate(transaction.created_at)}
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
                  {t('kanban.negotiation')}
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
                        {STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.label}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatLocalDate(transaction.created_at)}
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
                  {t('kanban.approved')}
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
                        {STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.label}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatLocalDate(transaction.created_at)}
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
                  {t('kanban.completed')}
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
                        {STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.label}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatLocalDate(transaction.created_at)}
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
  const { t, i18n } = useTranslation('requests');
  const dateLocale = DATE_LOCALES[i18n.language] || DATE_LOCALES.en;
  const STATUS_CONFIG = useMemo(() => getStatusConfig(t), [t]);

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
          <div className="text-xs text-muted-foreground">{t('detail.requester')}</div>
        </div>
        <ArrowRight className="h-6 w-6 text-muted-foreground" />
        <div className="flex-1 text-center">
          <div className="text-sm font-medium">{transaction.subject_org.name}</div>
          <div className="text-xs text-muted-foreground">{t('detail.provider')}</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">{t('fields.purpose')}</h4>
          <p className="text-sm text-muted-foreground">{transaction.purpose}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">{t('fields.justification')}</h4>
          <p className="text-sm text-muted-foreground">{transaction.justification}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold mb-1">{t('fields.accessDuration')}</h4>
            <p className="text-sm text-muted-foreground">{transaction.access_duration_days} {t('fields.days')} ({t('detail.policyProvider')})</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">{t('detail.currentStatus')}</h4>
            <Badge className={STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.color}>
              {React.createElement(STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.icon, {
                className: "mr-1 h-3 w-3"
              })}
              {STATUS_CONFIG[transaction.status as keyof typeof STATUS_CONFIG]?.label}
            </Badge>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">{t('detail.timeline')}</h4>
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
                    {formatDistanceToNow(new Date(event.created_at), { addSuffix: true, locale: dateLocale })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t('detail.noHistory')}</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
