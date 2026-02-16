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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LicenseRenewalDialog } from "@/components/LicenseRenewalDialog";
import DataLineageBlockchain from "@/components/DataLineageBlockchain";
import { HeartbeatIndicator, type UpdateFrequency } from "@/components/data/HeartbeatIndicator";
import { DataQualityScore } from "@/components/data/DataQualityScore";
import { FreshnessBar } from "@/components/data/FreshnessBar";
import { DataQualityDashboard } from "@/components/data/DataQualityDashboard";
import {
    Database, Eye, FileText, Activity, DollarSign, Zap, Leaf,
    ShieldCheck, Link2, FileJson, FileSpreadsheet, Map, Clock,
    RefreshCcw, Download, Info
} from "lucide-react";
import { toast } from "sonner";
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

    if (transaction.subscription_expires_at) {
        expiresAt = new Date(transaction.subscription_expires_at);
    } else {
        const created = new Date(transaction.created_at);
        expiresAt = new Date(created);
        expiresAt.setDate(expiresAt.getDate() + (transaction.access_duration_days || 90));
    }

    const daysRemaining = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
        return { status: "expired", label: "Expirado", daysRemaining: 0, className: "bg-muted text-muted-foreground" };
    } else if (daysRemaining <= 14) {
        return { status: "expiring", label: `Expira en ${daysRemaining}d`, daysRemaining, className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" };
    }
    return { status: "active", label: "Activo", daysRemaining, className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" };
};

export const MyLibraryTab = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { activeOrg, isDemo } = useOrganizationContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [sectorFilter, setSectorFilter] = useState<string>("all");
    const [lineageTransactionId, setLineageTransactionId] = useState<string | null>(null);
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
            custom_metadata,
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

    const sectors = useMemo(() => {
        if (!transactions) return [];
        const sectorSet = new Set(transactions.map(t => t.subject_org?.sector).filter(Boolean));
        return Array.from(sectorSet);
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        if (!transactions) return [];

        return transactions.filter(t => {
            const matchesSearch = !searchQuery ||
                t.asset?.product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.subject_org?.name?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesSector = sectorFilter === "all" || t.subject_org?.sector === sectorFilter;

            return matchesSearch && matchesSector;
        });
    }, [transactions, searchQuery, sectorFilter]);

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

    const hasBlockchainVerification = (transaction: any) => {
        return transaction.subject_org?.pontus_verified ||
            transaction.metadata?.blockchain_tx_hash ||
            isDemo;
    };

    // Check if asset has a downloadable data source
    const hasDataSource = (transaction: any): boolean => {
        const meta = transaction.asset?.custom_metadata as any;
        const hasApiUrl = !!(meta?.api_url || meta?.endpoint_url);
        const hasSampleData = !!transaction.asset?.sample_data;
        const hasPayload = !!(transaction.data_payloads && transaction.data_payloads.length > 0);
        return hasApiUrl || hasSampleData || hasPayload;
    };

    // Gateway download - proxies through edge function
    const handleGatewayDownload = async (transaction: any) => {
        try {
            if (!hasDataSource(transaction)) {
                toast.warning("Este activo aún no tiene una fuente de datos configurada. Contacta con el proveedor.");
                return;
            }

            toast.info("Descargando datos a través del Gateway...");

            const { data, error } = await supabase.functions.invoke("gateway-download", {
                body: {
                    transactionId: transaction.id,
                    consumerOrgId: activeOrg?.id,
                    format: "json",
                },
            });

            if (error) {
                // Log the error to access_logs via the edge function (already handled server-side)
                throw new Error(error.message || "Error de conexión con el Gateway");
            }

            // Check for error response from edge function
            if (data?.error) {
                throw new Error(data.error);
            }

            // Create blob and download
            const jsonString = typeof data === "string" ? data : JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const fileName = transaction.asset?.product?.name?.replace(/\s+/g, "_") || "dataset";
            a.download = `${fileName}_data.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast.success("Archivo descargado correctamente");
        } catch (err: any) {
            console.error("Gateway download error:", err);
            const errorMsg = err?.message || "Error desconocido";

            if (errorMsg.includes("Failed to fetch") || errorMsg.includes("NetworkError") || errorMsg.includes("ENOTFOUND")) {
                toast.error("Error de Conexión: El servidor del proveedor no responde. Por favor, contacta con soporte si el problema persiste.");
            } else if (errorMsg.includes("502") || errorMsg.includes("provider API")) {
                toast.error("Error de Conexión: El servidor del proveedor no responde. Por favor, contacta con soporte si el problema persiste.");
            } else {
                toast.error(`Error al descargar: ${errorMsg}`);
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Datasets Activos
                        </CardTitle>
                        <Database className="h-5 w-5 text-primary" />
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
                        <FileText className="h-5 w-5 text-primary" />
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

            {/* Data Quality Dashboard */}
            {filteredTransactions && filteredTransactions.length > 0 && (
                <DataQualityDashboard
                    transactions={filteredTransactions}
                    onAlertClick={(datasetId) => {
                        const element = document.getElementById(`dataset-${datasetId}`);
                        element?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                />
            )}

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

            {/* Content */}
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
                        const category = transaction.asset?.product?.category || "Datos";
                        const formatInfo = FORMAT_MAP[category] || { format: "JSON", icon: FileJson };
                        const FormatIcon = formatInfo.icon;
                        const updateFrequency = getUpdateFrequency(transaction);
                        const qualityMetrics = getDataQualityMetrics(transaction);

                        return (
                            <Card key={transaction.id} id={`dataset-${transaction.id}`} className={`group hover:shadow-lg transition-all duration-300 ${expirationStatus.status === "expired" ? "opacity-75" : "hover:border-primary"}`}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-start gap-3 mb-2">
                                        <Avatar className="h-10 w-10 shrink-0">
                                            <AvatarImage
                                                src={`https://logo.clearbit.com/${transaction.subject_org?.name?.toLowerCase().replace(/\s+/g, '')}.com`}
                                                alt={transaction.subject_org?.name}
                                            />
                                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                                {transaction.subject_org?.name?.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-base mb-0.5 group-hover:text-primary transition-colors truncate">
                                                {transaction.asset?.product?.name}
                                            </CardTitle>
                                            <CardDescription className="text-sm truncate">
                                                {transaction.subject_org?.name}
                                            </CardDescription>
                                            <p className="text-xs text-muted-foreground font-mono mt-0.5">
                                                ID: {transaction.asset_id?.slice(0, 12)}...
                                            </p>
                                        </div>

                                        <HeartbeatIndicator frequency={updateFrequency} />
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        <Badge variant="secondary" className="text-xs">
                                            <BadgeIcon className="h-3 w-3 mr-1" />
                                            {dataTypeBadge.label}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            <FormatIcon className="h-3 w-3 mr-1" />
                                            {formatInfo.format}
                                        </Badge>
                                        <Badge className={`text-xs ${expirationStatus.className}`}>
                                            <Clock className="h-3 w-3 mr-1" />
                                            {expirationStatus.label}
                                        </Badge>
                                        {isBlockchainVerified && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700">
                                                            <Link2 className="h-3 w-3 mr-1" />
                                                            On-Chain
                                                        </Badge>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Datos verificados con trazabilidad blockchain</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Data Quality Score */}
                                    <DataQualityScore
                                        completeness={qualityMetrics.completeness}
                                        accuracy={qualityMetrics.accuracy}
                                        timeliness={qualityMetrics.timeliness}
                                    />

                                    {/* Freshness Bar - only show for non-static frequencies */}
                                    {updateFrequency !== 'static' && (
                                        <FreshnessBar
                                            lastUpdated={new Date(transaction.updated_at || transaction.created_at)}
                                            expectedUpdateFrequency={updateFrequency as 'realtime' | 'hourly' | 'daily' | 'weekly' | 'monthly'}
                                        />
                                    )}

                                    {/* Actions - Gateway model: Download + Details */}
                                    <div className="flex gap-2 pt-2">
                                        {(() => {
                                            const isDownloadable = hasDataSource(transaction);
                                            const isExpired = expirationStatus.status === "expired";
                                            return (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span className="flex-1">
                                                                <Button
                                                                    variant="default"
                                                                    size="sm"
                                                                    className="w-full"
                                                                    onClick={() => handleGatewayDownload(transaction)}
                                                                    disabled={isExpired || !isDownloadable}
                                                                >
                                                                    <Download className="h-4 w-4 mr-1" />
                                                                    Descargar Datos
                                                                </Button>
                                                            </span>
                                                        </TooltipTrigger>
                                                        {!isDownloadable && (
                                                            <TooltipContent>
                                                                <p>Activo sin fuente de datos configurada</p>
                                                            </TooltipContent>
                                                        )}
                                                    </Tooltip>
                                                </TooltipProvider>
                                            );
                                        })()}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => navigate(`/data/view/${transaction.id}`)}
                                            disabled={expirationStatus.status === "expired"}
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            Ver Detalles
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Modals */}

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
