import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CodeIntegrationModal } from "@/components/CodeIntegrationModal";
import { DataPreviewDialog } from "@/components/DataPreviewDialog";
import { LicenseRenewalDialog } from "@/components/LicenseRenewalDialog";
import DataLineageBlockchain from "@/components/DataLineageBlockchain";
import { HeartbeatIndicator, type UpdateFrequency } from "@/components/data/HeartbeatIndicator";
import { DataQualityScore } from "@/components/data/DataQualityScore";
import { FreshnessBar } from "@/components/data/FreshnessBar";
import { DataQualityDashboard } from "@/components/data/DataQualityDashboard";
import { 
  Database, Eye, FileText, Info, Activity, DollarSign, Zap, Leaf, Code2, 
  CheckCircle2, ShieldCheck, Link2, FileJson, FileSpreadsheet, Map, Clock, 
  AlertTriangle, RefreshCcw
} from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { EmptyState } from "@/components/EmptyState";

// Format mapping by category
const FORMAT_MAP: Record<string, { format: string; icon: typeof FileJson }> = {
  "Logística": { format: "JSON", icon: FileJson },
  "IoT": { format: "JSON-LD", icon: FileJson },
  "ESG": { format: "CSV", icon: FileSpreadsheet },
  "Financiero": { format: "CSV", icon: FileSpreadsheet },
  "Medio Ambiente": { format: "GeoJSON", icon: Map },
  "Retail": { format: "JSON", icon: FileJson },
  "Energía": { format: "JSON-LD", icon: FileJson },
  "Agricultura": { format: "GeoJSON", icon: Map },
};

// Update frequency by category  
const UPDATE_FREQ_MAP: Record<string, { label: string; frequency: UpdateFrequency }> = {
  "Logística": { label: "Tiempo Real (15min)", frequency: "hourly" },
  "IoT": { label: "Tiempo Real", frequency: "realtime" },
  "ESG": { label: "Mensual", frequency: "monthly" },
  "Financiero": { label: "Semanal", frequency: "weekly" },
  "Medio Ambiente": { label: "Mensual", frequency: "monthly" },
  "Retail": { label: "Diario", frequency: "daily" },
  "Energía": { label: "Tiempo Real (15min)", frequency: "realtime" },
  "Agricultura": { label: "Semanal", frequency: "weekly" },
};

// Get update frequency for a transaction
const getUpdateFrequency = (transaction: any): UpdateFrequency => {
  const category = transaction.asset?.product?.category;
  return UPDATE_FREQ_MAP[category]?.frequency || "monthly";
};

// Calculate data quality metrics
const getDataQualityMetrics = (transaction: any) => {
  const isVerified = transaction.subject_org?.pontus_verified || false;
  const baseCompleteness = isVerified ? 92 : 75;
  const daysOld = Math.floor((Date.now() - new Date(transaction.updated_at || transaction.created_at).getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    completeness: Math.min(100, baseCompleteness + Math.floor(Math.random() * 8)),
    accuracy: isVerified ? 88 + Math.floor(Math.random() * 10) : 70 + Math.floor(Math.random() * 15),
    timeliness: Math.max(30, 100 - daysOld * 2)
  };
};

// Get expiration status - prioritizes subscription_expires_at if available
const getExpirationStatus = (transaction: any) => {
  const now = new Date();
  let expiresAt: Date;
  
  // If subscription_expires_at exists, use it (from renewal)
  if (transaction.subscription_expires_at) {
    expiresAt = new Date(transaction.subscription_expires_at);
  } else {
    // Fallback: calculate from created_at + access_duration_days
    const created = new Date(transaction.created_at);
    expiresAt = new Date(created);
    expiresAt.setDate(expiresAt.getDate() + (transaction.access_duration_days || 90));
  }
  
  const daysRemaining = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysRemaining < 0) {
    return { status: "expired", label: "Expirado", daysRemaining: 0, className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" };
  } else if (daysRemaining <= 14) {
    return { status: "expiring", label: `Expira en ${daysRemaining}d`, daysRemaining, className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" };
  }
  return { status: "active", label: "Activo", daysRemaining, className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" };
};

const Data = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeOrg, isDemo } = useOrganizationContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [showAPIDialog, setShowAPIDialog] = useState(false);
  const [lineageTransactionId, setLineageTransactionId] = useState<string | null>(null);
  const [previewTransaction, setPreviewTransaction] = useState<any>(null);
  const [renewalTransaction, setRenewalTransaction] = useState<any>(null);
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["completed-transactions", activeOrg?.id, isDemo],
    queryFn: async () => {
      if (!activeOrg) return [];

      let query = supabase
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
            name,
            sector,
            pontus_verified
          ),
          supplier_data (
            company_name,
            tax_id,
            contact_person_name,
            contact_person_email
          ),
          data_payloads (
            schema_type
          )
        `)
        .eq("status", "completed")
        .order("created_at", { ascending: false });

      // En modo demo, mostrar todas las transacciones completadas demo
      if (isDemo) {
        const { data: demoOrgs } = await supabase
          .from("organizations")
          .select("id")
          .eq("is_demo", true);
        const demoOrgIds = demoOrgs?.map((o) => o.id) || [];
        query = query.in("consumer_org_id", demoOrgIds);
      } else {
        query = query.eq("consumer_org_id", activeOrg.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
    enabled: !!activeOrg,
  });

  // Get unique sectors for filter
  const sectors = useMemo(() => {
    if (!transactions) return [];
    const sectorSet = new Set(transactions.map(t => t.subject_org.sector).filter(Boolean));
    return Array.from(sectorSet);
  }, [transactions]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    
    return transactions.filter(t => {
      const matchesSearch = !searchQuery || 
        t.asset.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject_org.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSector = sectorFilter === "all" || t.subject_org.sector === sectorFilter;
      
      return matchesSearch && matchesSector;
    });
  }, [transactions, searchQuery, sectorFilter]);

  // Get badge info based on schema type
  const getDataTypeBadge = (transaction: any) => {
    const schemaType = transaction.data_payloads?.[0]?.schema_type;
    
    if (!schemaType) return { label: "Administrativo", icon: FileText, color: "default" as const };
    
    switch (schemaType) {
      case "iot_telemetry":
        return { label: "IoT", icon: Activity, color: "default" as const };
      case "financial_records":
        return { label: "Financiero", icon: DollarSign, color: "default" as const };
      case "energy_metering":
        return { label: "Energía", icon: Zap, color: "default" as const };
      case "esg_report":
      case "supply_chain_trace":
        return { label: "ESG", icon: Leaf, color: "default" as const };
      default:
        return { label: "Datos", icon: Database, color: "default" as const };
    }
  };

  // Check if transaction has blockchain verification
  const hasBlockchainVerification = (transaction: any) => {
    // A transaction is considered blockchain verified if:
    // 1. The subject organization is pontus_verified OR
    // 2. The transaction has metadata with blockchain info (simulated for demo)
    return transaction.subject_org?.pontus_verified || 
           transaction.metadata?.blockchain_tx_hash ||
           isDemo; // In demo mode, simulate all as verified
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-500/10 via-background to-background border border-purple-500/20 p-8">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4">
              <Database className="mr-1 h-3 w-3" />
              Biblioteca de Datos
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              Tu Centro de Desarrollo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Accede, visualiza e integra todos los datasets que has adquirido. 
              Obtén snippets de código listos para usar.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Datasets Activos
              </CardTitle>
              <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{filteredTransactions?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Proveedores
              </CardTitle>
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {new Set(filteredTransactions?.map(t => t.subject_org_id)).size || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Verificados Blockchain
              </CardTitle>
              <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {filteredTransactions?.filter(t => hasBlockchainVerification(t)).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Data Quality Dashboard */}
      {filteredTransactions && filteredTransactions.length > 0 && (
        <FadeIn delay={0.15}>
          <DataQualityDashboard 
            transactions={filteredTransactions}
            onAlertClick={(datasetId) => {
              const element = document.getElementById(`dataset-${datasetId}`);
              element?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          />
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por producto o proveedor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filtrar por sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los sectores</SelectItem>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
        </Card>
      </FadeIn>

      <FadeIn delay={0.3}>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando datos...</p>
          </div>
        ) : !transactions || transactions.length === 0 ? (
          <EmptyState
            icon={Database}
            title="Tu biblioteca está vacía"
            description="Cuando completes una transacción, los datos aparecerán aquí. Explora el catálogo para encontrar datasets que necesites."
            action={
              <Button onClick={() => navigate("/catalog")}>
                Explorar Marketplace
              </Button>
            }
          />
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Prueba ajustando los filtros de búsqueda
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSectorFilter("all"); }}>
              Limpiar Filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTransactions.map((transaction) => {
              const dataTypeBadge = getDataTypeBadge(transaction);
              const BadgeIcon = dataTypeBadge.icon;
              const isBlockchainVerified = hasBlockchainVerification(transaction);
              const expirationStatus = getExpirationStatus(transaction);
              const category = transaction.asset.product.category || "Datos";
              const formatInfo = FORMAT_MAP[category] || { format: "JSON", icon: FileJson };
              const FormatIcon = formatInfo.icon;
              const updateFreqInfo = UPDATE_FREQ_MAP[category] || { label: "Mensual", frequency: "monthly" as UpdateFrequency };
              const updateFrequency = getUpdateFrequency(transaction);
              const qualityMetrics = getDataQualityMetrics(transaction);
              // Simulate API usage percentage (disabled for expired)
              const apiUsage = expirationStatus.status === "expired" ? 0 : Math.floor(Math.random() * 40) + 30;
              
              return (
                <Card key={transaction.id} className={`group hover:shadow-lg transition-all duration-300 ${expirationStatus.status === "expired" ? "opacity-75" : "hover:border-purple-400"}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3 mb-2">
                      {/* Provider Avatar */}
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage 
                          src={`https://logo.clearbit.com/${transaction.subject_org.name.toLowerCase().replace(/\s+/g, '')}.com`} 
                          alt={transaction.subject_org.name}
                        />
                        <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs font-semibold">
                          {transaction.subject_org.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base mb-0.5 group-hover:text-purple-600 transition-colors truncate">
                          {transaction.asset.product.name}
                        </CardTitle>
                        <CardDescription className="text-sm truncate">
                          {transaction.subject_org.name}
                        </CardDescription>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                          ID: {transaction.asset_id.slice(0, 12)}...
                        </p>
                      </div>
                      
                      {/* Status Badge */}
                      <Badge 
                        variant="secondary" 
                        className={`shrink-0 flex items-center gap-1 ${expirationStatus.className}`}
                      >
                        {expirationStatus.status === "expired" ? (
                          <AlertTriangle className="h-3 w-3" />
                        ) : expirationStatus.status === "expiring" ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                        {expirationStatus.label}
                      </Badge>
                    </div>
                    
                    {/* Format & Update Frequency */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <FormatIcon className="h-3.5 w-3.5" />
                        {formatInfo.format}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {updateFreqInfo.label}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {category}
                      </Badge>
                      <Badge variant={dataTypeBadge.color} className="flex items-center gap-1">
                        <BadgeIcon className="h-3 w-3" />
                        {dataTypeBadge.label}
                      </Badge>
                      
                      {/* Blockchain Verification Badge */}
                      {isBlockchainVerified && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge 
                                variant="outline" 
                                className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 cursor-pointer"
                                onClick={() => setLineageTransactionId(transaction.id)}
                              >
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                Pontus-X
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">
                                Trazabilidad verificada en Pontus-X Blockchain. Haz clic para ver auditoría.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      
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
                                Datos sintéticos de demostración
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Expiring Soon Alert */}
                    {expirationStatus.status === "expiring" && (
                      <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 py-2">
                        <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <AlertDescription className="text-amber-700 dark:text-amber-300 text-xs">
                          Tu licencia expira en {expirationStatus.daysRemaining} días.{" "}
                          <button 
                            className="underline font-medium hover:text-amber-800 dark:hover:text-amber-200"
                            onClick={() => setRenewalTransaction(transaction)}
                          >
                            Renovar ahora
                          </button>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {/* Data Quality Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Heartbeat Indicator */}
                      <div className="bg-muted/30 rounded-lg p-2.5 flex flex-col items-center justify-center">
                        <HeartbeatIndicator 
                          frequency={updateFrequency}
                          showLabel
                          lastUpdated={new Date(transaction.updated_at || transaction.created_at)}
                        />
                      </div>
                      
                      {/* Data Quality Score */}
                      <div className="bg-muted/30 rounded-lg p-2.5 flex flex-col items-center justify-center">
                        <DataQualityScore 
                          completeness={qualityMetrics.completeness}
                          accuracy={qualityMetrics.accuracy}
                          timeliness={qualityMetrics.timeliness}
                          size="sm"
                          showBreakdown
                        />
                      </div>
                    </div>
                    
                    {/* Freshness Bar */}
                    <FreshnessBar 
                      lastUpdated={new Date(transaction.updated_at || transaction.created_at)}
                      expectedUpdateFrequency={updateFrequency === 'static' ? 'monthly' : updateFrequency}
                      showTimestamp
                    />
                    
                    {/* API Usage */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Uso de API este mes</span>
                        <span className="font-medium">
                          {expirationStatus.status === "expired" ? "--" : `${apiUsage}%`}
                        </span>
                      </div>
                      <Progress 
                        value={apiUsage} 
                        className={`h-2 ${expirationStatus.status === "expired" ? "opacity-50" : ""}`} 
                      />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {expirationStatus.status === "expired" ? (
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() => setRenewalTransaction(transaction)}
                        >
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          Renovar
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() => navigate(`/data/view/${transaction.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Datos
                        </Button>
                      )}
                      
                      {/* Preview Button */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPreviewTransaction(transaction)}
                              disabled={expirationStatus.status === "expired"}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Ver Muestra</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      {/* Integration Button */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAsset(transaction);
                                setShowAPIDialog(true);
                              }}
                            >
                              <Code2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Integrar API</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      {/* Blockchain Link */}
                      {isBlockchainVerified && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setLineageTransactionId(transaction.id)}
                              >
                                <Link2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Ver Blockchain</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Adquirida: {new Date(transaction.created_at).toLocaleDateString("es-ES")}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </FadeIn>

      {/* API Integration Dialog */}
      {selectedAsset && (
        <CodeIntegrationModal
          open={showAPIDialog}
          onOpenChange={setShowAPIDialog}
          assetId={selectedAsset.asset_id}
          productName={selectedAsset.asset.product.name}
        />
      )}

      {/* Data Preview Dialog */}
      {previewTransaction && (
        <DataPreviewDialog
          open={!!previewTransaction}
          onOpenChange={(open) => !open && setPreviewTransaction(null)}
          transactionId={previewTransaction.id}
          productName={previewTransaction.asset.product.name}
          schemaType={previewTransaction.data_payloads?.[0]?.schema_type}
        />
      )}

      {/* License Renewal Dialog */}
      {renewalTransaction && (
        <LicenseRenewalDialog
          open={!!renewalTransaction}
          onOpenChange={(open) => !open && setRenewalTransaction(null)}
          transaction={renewalTransaction}
          onRenewalComplete={() => {
            setRenewalTransaction(null);
            queryClient.invalidateQueries({ queryKey: ["completed-transactions"] });
          }}
        />
      )}

      {/* Blockchain Lineage Dialog */}
      <Dialog open={!!lineageTransactionId} onOpenChange={(open) => !open && setLineageTransactionId(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Auditoría de Trazabilidad Blockchain
            </DialogTitle>
          </DialogHeader>
          {lineageTransactionId && (
            <DataLineageBlockchain />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Data;
