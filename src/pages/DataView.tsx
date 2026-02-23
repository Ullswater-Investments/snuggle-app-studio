import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Send, FileText, Building2, Info, Activity, TrendingUp, ShieldCheck, Award, Zap, Copy, Key, ExternalLink, Database, Clock, FileJson, Globe, Star, CheckCircle2, XCircle, AlertCircle, Scale, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ESGDataView } from "@/components/ESGDataView";
import { IoTDataView } from "@/components/IoTDataView";
import { GenericJSONView } from "@/components/GenericJSONView";
import { ArrayDataView } from "@/components/ArrayDataView";
import { DataLineage } from "@/components/DataLineage";
import DataLineageBlockchain from "@/components/DataLineageBlockchain";
import { RevokeAccessButton } from "@/components/RevokeAccessButton";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
import { generateLicensePDF } from "@/utils/pdfGenerator";
import { AccessHistoryTable } from "@/components/AccessHistoryTable";
import { useNotifications } from "@/hooks/useNotifications";
import { useTranslation } from "react-i18next";

// EnvironmentalImpactCard removed – no longer displayed in sidebar

const DataView = () => {
  const { id } = useParams<{ id: string }>();
  const { user, signOut } = useAuth();
  const { activeOrg } = useOrganizationContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("description");
  const [isDownloading, setIsDownloading] = useState(false);
  const { sendNotification } = useNotifications();
  const { t } = useTranslation('dataView');

  const getStatusLabel = (status: string) => {
    const key = `statusLabels.${status}`;
    const translated = t(key);
    return translated !== key ? translated : status;
  };

  // Obtener transacción y datos con verificación de acceso
  const { data: transaction, isLoading: loadingTransaction } = useQuery({
    queryKey: ["transaction-detail", id, activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg) throw new Error("No active organization");

      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          *,
          asset:data_assets (
            id,
            custom_metadata,
            sample_data,
            product:data_products (name, description, category, version, schema_definition)
          ),
          consumer_org:organizations!data_transactions_consumer_org_id_fkey (name, kyb_verified, tax_id, sector, description),
          subject_org:organizations!data_transactions_subject_org_id_fkey (name, kyb_verified, tax_id, sector, description),
          holder_org:organizations!data_transactions_holder_org_id_fkey (name, tax_id, sector, description)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      
      // Security check: verify user has access to this transaction
      const hasAccess = data.consumer_org_id === activeOrg.id || 
                       data.subject_org_id === activeOrg.id || 
                       data.holder_org_id === activeOrg.id;
      
      if (!hasAccess) {
        throw new Error("Access denied: You don't have permission to view this transaction");
      }
      
      return data;
    },
    enabled: !!id && !!activeOrg,
  });

  // Obtener datos flexibles de data_payloads (nuevos datos ESG, IoT, etc.)
  const { data: payloadData, isLoading: loadingPayload } = useQuery({
    queryKey: ["payload-data", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_payloads")
        .select("*")
        .eq("transaction_id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: transaction?.status === "completed",
  });

  const { data: supplierData, isLoading: loadingData } = useQuery({
    queryKey: ["supplier-data", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("supplier_data")
        .select("*")
        .eq("transaction_id", id);

      if (error) throw error;
      return data;
    },
    enabled: transaction?.status === "completed",
  });

  const { data: erpConfigs } = useQuery({
    queryKey: ["erp-configs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("erp_configurations")
        .select("*")
        .eq("config_type", "upload")
        .eq("is_active", true);

      if (error) throw error;
      return data;
    },
  });

  const exportToCSV = () => {
    let csvContent = "";
    let fileName = `data_${id}.csv`;

    // Check if we have array payload data
    if (payloadData && Array.isArray(payloadData.data_content)) {
      const arrayData = payloadData.data_content;
      const headers = Object.keys(arrayData[0]);
      
      csvContent = [
        headers.join(","),
        ...arrayData.map(row => 
          headers.map(h => {
            const val = row[h];
            if (typeof val === 'object') return `"${JSON.stringify(val)}"`;
            return `"${val}"`;
          }).join(",")
        )
      ].join("\n");
      
      fileName = `${payloadData.schema_type}_${id}.csv`;
    } 
    // Fallback to supplier data
    else if (supplierData && supplierData.length > 0) {
      const headers = [
        "Razón Social",
        "CIF/NIF",
        "Nombre Legal",
        "Dirección Fiscal",
        "Dirección Legal",
        "Admin Legal",
        "Persona de Contacto",
        "Teléfono",
        "Email"
      ];

      const rows = supplierData.map(item => [
        item.company_name,
        item.tax_id,
        item.legal_name,
        JSON.stringify(item.fiscal_address),
        JSON.stringify(item.legal_address || {}),
        item.legal_admin_name || "",
        item.contact_person_name || "",
        item.contact_person_phone || "",
        item.contact_person_email || ""
      ]);

      csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
      ].join("\n");
      
      fileName = `supplier_data_${id}.csv`;
    } else {
      toast.error(t('toast.noExportData'));
      return;
    }

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Log de exportación
    supabase.from("export_logs").insert({
      transaction_id: id,
      organization_id: transaction?.consumer_org_id,
      export_type: "csv",
      export_status: "success",
      user_id: user?.id
    });

    toast.success(t('toast.csvSuccess'));
  };

  const sendToERPMutation = useMutation({
    mutationFn: async (erpConfigId: string) => {
      if (!supplierData || supplierData.length === 0) {
        throw new Error(t('toast.erpNoData'));
      }

      const { data, error } = await supabase.functions.invoke("erp-data-uploader", {
        body: {
          transactionId: id,
          erpConfigId,
        },
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.message);

      return data;
    },
    onSuccess: () => {
      toast.success(t('toast.erpSuccess'));
      queryClient.invalidateQueries({ queryKey: ["export-logs"] });
    },
    onError: (error: any) => {
      toast.error(error.message || t('toast.erpError'));
    },
  });

  const handleGatewayDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    try {
      toast.info(t('toast.gatewayDownloading'));
      
      const { data, error } = await supabase.functions.invoke("gateway-download", {
        body: {
          transactionId: id,
          consumerOrgId: activeOrg?.id,
          format: "json",
        },
      });

      if (error) {
        throw new Error(error.message || "Error de conexión con el Access Controller");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const jsonString = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const fileName = transaction?.asset?.product?.name?.replace(/\s+/g, "_") || "dataset";
      a.download = `${fileName}_data.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Log de acceso en access_logs para trazabilidad
      try {
        await supabase.from("access_logs").insert({
          transaction_id: id!,
          consumer_org_id: activeOrg!.id,
          user_id: user?.id,
          asset_id: transaction?.asset_id,
          action: "download_gateway",
          status: "success",
          metadata: {
            format: "json",
            file_name: `${fileName}_data.json`,
            downloaded_at: new Date().toISOString(),
          },
        });
      } catch (logErr) {
        console.error("Error logging access:", logErr);
      }

      // Notificaciones bilaterales
      try {
        await sendNotification(id!, "download");
      } catch (notifErr) {
        console.error("Error sending download notifications:", notifErr);
      }

      toast.success(t('toast.gatewaySuccess'));
      queryClient.invalidateQueries({ queryKey: ["access-logs"] });
    } catch (err: any) {
      console.error("Gateway download error:", err);
      const errorMsg = err?.message || "Error desconocido";
      
      // Log de error en access_logs
      try {
        await supabase.from("access_logs").insert({
          transaction_id: id!,
          consumer_org_id: activeOrg!.id,
          user_id: user?.id,
          asset_id: transaction?.asset_id,
          action: "download_gateway",
          status: "error",
          error_message: errorMsg,
        });
      } catch (logErr) {
        console.error("Error logging failed access:", logErr);
      }

      queryClient.invalidateQueries({ queryKey: ["access-logs"] });
      
      if (errorMsg.includes("Failed to send") || errorMsg.includes("Failed to fetch") || errorMsg.includes("NetworkError") || errorMsg.includes("ENOTFOUND") || errorMsg.includes("502") || errorMsg.includes("504") || errorMsg.includes("provider API")) {
        toast.error(t('toast.gatewayProviderError'));
      } else {
        toast.error(t('toast.gatewayError', { error: errorMsg }));
      }
    } finally {
      setIsDownloading(false);
    }
  };

  if (loadingTransaction) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">{t('loading')}</p>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">{t('notFound')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const canViewData = transaction.status === "completed";

  // Extract schema, sample data, quality metrics for catalog-style display
  const productData = transaction.asset?.product;
  const assetMeta = transaction.asset?.custom_metadata as any;
  const schemaRaw = productData?.schema_definition as { columns?: Array<{ field: string; type: string; description: string }> } | null;
  const schema = schemaRaw?.columns?.length
    ? schemaRaw.columns
    : [
        { field: "id", type: "UUID", description: "Identificador único" },
        { field: "data", type: "JSONB", description: "Datos del registro" },
        { field: "created_at", type: "TIMESTAMP", description: "Fecha de creación" },
      ];
  const sampleData = transaction.asset?.sample_data as any[] | null;
  const qualityMetrics = assetMeta?.quality_metrics || null;
  const providerKybVerified = (transaction.subject_org as any)?.kyb_verified;

  // ODRL permissions from access_policy
  const accessPolicy = assetMeta?.access_policy;
  const odrlPermissions = {
    permitted: accessPolicy?.permissions?.length
      ? accessPolicy.permissions
      : ["Uso comercial dentro de la organización", "Análisis e integración en sistemas internos", "Generación de informes derivados"],
    prohibited: accessPolicy?.prohibitions?.length
      ? accessPolicy.prohibitions
      : ["Redistribución a terceros sin autorización", "Ingeniería inversa de datos individuales", "Uso para fines ilegales o discriminatorios"],
    obligations: accessPolicy?.obligations?.length
      ? accessPolicy.obligations
      : ["Atribución al proveedor de datos", "Renovación de licencia según modelo de precio", "Cumplimiento GDPR para datos personales"],
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-end mb-6">
          {canViewData && activeOrg?.id === transaction.subject_org_id && (
            <RevokeAccessButton 
              transactionId={id || ""} 
              resourceName={transaction.asset?.product?.name}
              actorOrgId={activeOrg.id}
              onRevoked={() => {
                queryClient.invalidateQueries({ queryKey: ["transaction-detail", id] });
              }}
            />
          )}
        </div>

        {/* Data Lineage Visualization */}
        <div className="mb-6">
          <DataLineage transaction={transaction} />
        </div>

        {/* ===== CATALOG-STYLE HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Card className="overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  <Globe className="h-3 w-3 mr-1" />
                  {transaction.subject_org.name}
                </Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {productData?.category || "General"}
                </Badge>
                {providerKybVerified && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        KYB Verified
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>{t('header.kybVerified')}</TooltipContent>
                  </Tooltip>
                )}
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {t('header.accessGranted')}
                </Badge>
              </div>
              <CardTitle className="text-3xl font-bold">{productData?.name}</CardTitle>
              <CardDescription className="text-base mt-2">
                {productData?.description || t('noDescription')}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* ===== SUMMARY METRIC CARDS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                  <Database className="h-8 w-8 mb-2" />
                  <span className="text-lg font-bold">v{productData?.version || "1.0"}</span>
                  <span className="text-sm opacity-80">{t('metrics.version')}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                  <Clock className="h-8 w-8 mb-2" />
                  <span className="text-lg font-bold">{t('metrics.onDemand')}</span>
                  <span className="text-sm opacity-80">{t('metrics.update')}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                  <FileJson className="h-8 w-8 mb-2" />
                  <span className="text-lg font-bold">{schema.length} {t('metrics.fields')}</span>
                  <span className="text-sm opacity-80">{t('metrics.schema')}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-xl">
                  <Globe className="h-8 w-8 mb-2" />
                  <span className="text-lg font-bold">JSON/CSV</span>
                  <span className="text-sm opacity-80">{t('metrics.format')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ===== CATALOG-STYLE DETAIL TABS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
                   <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                     {t('tabs.description')}
                    </TabsTrigger>
                    <TabsTrigger value="schema" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                      {t('tabs.schema')}
                    </TabsTrigger>
                    <TabsTrigger value="sample" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                      {t('tabs.sample')}
                    </TabsTrigger>
                    <TabsTrigger value="policies" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">
                      <Scale className="h-4 w-4 mr-1.5" />
                      {t('tabs.policies')}
                    </TabsTrigger>
                 </TabsList>

                 {/* Description Tab */}
                 <TabsContent value="description" className="p-6 space-y-6">
                   <div>
                      <h3 className="font-semibold text-lg mb-3">{t('description.generalInfo')}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{t('description.category')}</p>
                          <p className="font-medium">{productData?.category || "General"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('description.provider')}</p>
                          <p className="font-medium">{transaction.subject_org.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('description.custodian')}</p>
                          <p className="font-medium">{transaction.holder_org.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('description.status')}</p>
                           <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                             {getStatusLabel(transaction.status)}
                           </Badge>
                        </div>
                      </div>
                   </div>
                   {accessPolicy?.access_timeout_days && (
                     <>
                       <Separator />
                        <div>
                          <h3 className="font-semibold text-lg mb-3">{t('description.accessDurationTitle')}</h3>
                          <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('description.accessDurationText', { days: accessPolicy.access_timeout_days }) }} />
                        </div>
                     </>
                   )}
                </TabsContent>

                {/* Schema Tab */}
                 <TabsContent value="schema" className="p-6">
                   <h3 className="font-semibold text-lg mb-4">{t('schema.title')}</h3>
                   <ScrollArea className="h-[300px]">
                     <Table>
                       <TableHeader>
                         <TableRow>
                           <TableHead>{t('schema.field')}</TableHead>
                           <TableHead>{t('schema.type')}</TableHead>
                           <TableHead>{t('schema.description')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {schema.map((col, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-mono text-sm">{col.field}</TableCell>
                            <TableCell><Badge variant="outline">{col.type}</Badge></TableCell>
                            <TableCell className="text-muted-foreground">{col.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </TabsContent>

                {/* Sample Tab */}
                <TabsContent value="sample" className="p-6">
                  {sampleData && Array.isArray(sampleData) && sampleData.length > 0 ? (
                     <>
                       <div className="flex items-center justify-between mb-4">
                         <h3 className="font-semibold text-lg">{t('sample.title')}</h3>
                         <Badge variant="secondary">{sampleData.length} {t('sample.records')}</Badge>
                      </div>
                      <ScrollArea className="h-[300px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {Object.keys(sampleData[0] || {}).map((key) => (
                                <TableHead key={key}>{key}</TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sampleData.map((row: any, idx: number) => (
                              <TableRow key={idx}>
                                {Object.values(row).map((val: any, cellIdx: number) => (
                                  <TableCell key={cellIdx} className="font-mono text-sm">{String(val)}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted/30">
                        <Eye className="h-10 w-10 text-muted-foreground" />
                      </div>
                       <h3 className="text-lg font-semibold mb-2">{t('sample.notAvailable')}</h3>
                       <p className="text-sm text-muted-foreground max-w-md">
                         {t('sample.notAvailableDesc')}
                       </p>
                    </div>
                  )}
                </TabsContent>

                {/* Policies Tab */}
                 <TabsContent value="policies" className="p-6 space-y-6">
                   <h3 className="font-semibold text-lg mb-4">{t('policies.title')}</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                       <p className="font-semibold text-sm flex items-center gap-2 text-green-600 dark:text-green-400">
                         <CheckCircle2 className="h-4 w-4" /> {t('policies.permitted')}
                       </p>
                       <ul className="space-y-1.5">
                         {odrlPermissions.permitted.map((item: string, idx: number) => (
                           <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                             <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />{item}
                           </li>
                         ))}
                       </ul>
                     </div>
                     <div className="space-y-2">
                       <p className="font-semibold text-sm flex items-center gap-2 text-red-600 dark:text-red-400">
                         <XCircle className="h-4 w-4" /> {t('policies.prohibited')}
                       </p>
                       <ul className="space-y-1.5">
                         {odrlPermissions.prohibited.map((item: string, idx: number) => (
                           <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                             <XCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />{item}
                           </li>
                         ))}
                       </ul>
                     </div>
                     <div className="space-y-2">
                       <p className="font-semibold text-sm flex items-center gap-2 text-blue-600 dark:text-blue-400">
                         <ShieldCheck className="h-4 w-4" /> {t('policies.obligations')}
                       </p>
                      <ul className="space-y-1.5">
                        {odrlPermissions.obligations.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ShieldCheck className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {accessPolicy?.terms_url ? (
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        className="gap-2 border-primary/30 text-primary hover:bg-primary/5"
                        onClick={() => window.open(accessPolicy.terms_url, "_blank")}
                      >
                       <ExternalLink className="h-4 w-4" />
                         {t('policies.viewTerms')}
                       </Button>
                    </div>
                  ) : (
                    <Alert className="border-muted">
                      <Scale className="h-4 w-4" />
                      <AlertDescription className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t('policies.legalNotice') }} />
                    </Alert>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* ===== MAIN DATA AREA (full width) ===== */}
        <div className="space-y-6">
          {!canViewData ? (
             <Card>
               <CardContent className="py-12 text-center">
                 <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                 <h3 className="mt-4 text-lg font-semibold">{t('data.notAvailableTitle')}</h3>
                 <p className="mt-2 text-sm text-muted-foreground">
                   {t('data.notAvailableDesc')}
                 </p>
                 <p className="mt-1 text-sm text-muted-foreground">
                   {t('data.currentStatus')} <Badge variant="secondary">{getStatusLabel(transaction.status)}</Badge>
                 </p>
              </CardContent>
            </Card>
          ) : loadingData || loadingPayload ? (
             <Card>
               <CardContent className="py-12 text-center">
                 <p className="text-muted-foreground">{t('data.loadingData')}</p>
              </CardContent>
            </Card>
          ) : !supplierData || supplierData.length === 0 && !payloadData ? (
            <div className="space-y-4">
              {/* Gateway panel for consumers with API assets */}
              {(() => {
                const meta = transaction.asset?.custom_metadata as any;
                const apiUrl = meta?.api_url || meta?.endpoint_url;
                if (!apiUrl) return null;
                
                const isConsumer = activeOrg?.id === transaction.consumer_org_id;
                
                if (isConsumer) {
                  return (
                     <Card>
                       <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                           <ShieldCheck className="h-5 w-5 text-primary" />
                           {t('data.assetAccess')}
                         </CardTitle>
                        <CardDescription>
                           {t('data.assetAccessDesc')}
                         </CardDescription>
                       </CardHeader>
                       <CardContent className="space-y-4">
                         <p className="text-sm text-muted-foreground">
                           {t('data.downloadExplain')}
                         </p>
                         <Button onClick={handleGatewayDownload} className="w-full" disabled={isDownloading}>
                           {isDownloading ? (
                             <>
                               <Activity className="mr-2 h-4 w-4 animate-spin" />
                               {t('data.downloading')}
                             </>
                           ) : (
                             <>
                               <Download className="mr-2 h-4 w-4" />
                               {t('data.downloadUpdated')}
                            </>
                          )}
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => {
                              const techSheet = {
                                product: productData?.name,
                                version: productData?.version || "1.0",
                                category: productData?.category,
                                provider: transaction.subject_org.name,
                                schema: schema,
                                quality_metrics: qualityMetrics,
                                access_policy: accessPolicy ? {
                                  permissions: accessPolicy.permissions,
                                  prohibitions: accessPolicy.prohibitions,
                                  obligations: accessPolicy.obligations,
                                  access_timeout_days: accessPolicy.access_timeout_days,
                                } : null,
                              };
                              const blob = new Blob([JSON.stringify(techSheet, null, 2)], { type: "application/json" });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = `ficha_tecnica_${productData?.name?.replace(/\s+/g, "_") || "asset"}.json`;
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                              URL.revokeObjectURL(url);
                               toast.success(t('toast.techSheetSuccess'));
                             }}
                           >
                             <FileJson className="mr-2 h-4 w-4" />
                             {t('data.downloadTechSheet')}
                           </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={async () => {
                              try {
                                // Fetch approval date
                                const { data: approvalRecord } = await supabase
                                  .from("approval_history")
                                  .select("created_at")
                                  .eq("transaction_id", transaction.id)
                                  .eq("action", "approve")
                                  .order("created_at", { ascending: false })
                                  .limit(1)
                                  .maybeSingle();

                                await generateLicensePDF(
                                  transaction, 
                                  transaction.asset.product.name,
                                  {
                                    name: transaction.holder_org.name,
                                    tax_id: transaction.holder_org.tax_id,
                                    sector: transaction.holder_org.sector,
                                    description: transaction.holder_org.description,
                                  },
                                  {
                                    name: transaction.consumer_org.name,
                                    tax_id: transaction.consumer_org.tax_id,
                                    sector: transaction.consumer_org.sector,
                                    description: transaction.consumer_org.description,
                                  },
                                  approvalRecord?.created_at || undefined
                                );
                                 toast.success(t('toast.licenseSuccess'));
                               } catch (e) {
                                 console.error("Error generating PDF:", e);
                                 toast.error(t('toast.licenseError'));
                               }
                             }}
                           >
                             <FileText className="mr-2 h-4 w-4" />
                             {t('data.downloadLicensePDF')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
                
                // Provider/Holder: show full API details
                const headers: Record<string, string> = {};
                if (meta?.headers && typeof meta.headers === "object") {
                  Object.entries(meta.headers).forEach(([k, v]: [string, any]) => {
                    if (typeof v === "string" && v.trim()) headers[k] = v;
                  });
                }
                const copyToClipboard = (text: string) => {
                   navigator.clipboard.writeText(text);
                   toast.success(t('toast.copied'));
                };
                
                return (
                  <Card>
                     <CardHeader>
                       <CardTitle className="flex items-center gap-2">
                         <Key className="h-5 w-5 text-primary" />
                         {t('api.title')}
                       </CardTitle>
                       <CardDescription>
                         {t('api.description')}
                       </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border overflow-x-auto">
                        <Table className="table-fixed w-full">
                          <TableHeader>
                             <TableRow>
                               <TableHead className="w-[140px]">{t('api.parameter')}</TableHead>
                               <TableHead>{t('schema.description') === 'schema.description' ? 'Value' : ''}</TableHead>
                              <TableHead className="w-[50px]" />
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium text-sm">URL</TableCell>
                              <TableCell className="font-mono text-sm" style={{ wordBreak: "break-all" }}>{apiUrl}</TableCell>
                              <TableCell>
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(apiUrl)}>
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </TableCell>
                            </TableRow>
                            {Object.entries(headers).map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell className="font-medium text-sm">{key}</TableCell>
                                <TableCell className="font-mono text-sm" style={{ wordBreak: "break-all" }}>{value}</TableCell>
                                <TableCell>
                                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(value)}>
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
              
              {/* Show "no data" only for non-API assets */}
              {(() => {
                const meta = transaction.asset?.custom_metadata as any;
                const isApiAsset = meta?.api_url || meta?.endpoint_url;
                if (isApiAsset) return null;
                
                return (
                  <>
                    {activeOrg?.type !== 'consumer' && (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          <span dangerouslySetInnerHTML={{ __html: t('data.noDataForOrg', { org: activeOrg?.name }) }} />
                           {activeOrg?.type === 'provider' && ` ${t('data.providerNoData')}`}
                           {activeOrg?.type === 'data_holder' && ` ${t('data.holderNoData')}`}
                           {' '}{t('data.switchConsumer')}
                        </AlertDescription>
                      </Alert>
                    )}
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
                         <h3 className="mt-4 text-lg font-semibold">{t('data.noDataAvailable')}</h3>
                         <p className="mt-2 text-sm text-muted-foreground">
                           {t('data.noDataShared')}
                        </p>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}
            </div>
          ) : (
            <Tabs defaultValue={payloadData ? "payload" : "supplier"} className="w-full">
              <TabsList>
                {payloadData && (
                   <TabsTrigger value="payload">
                     {payloadData.schema_type === "esg_report" ? t('payloads.esgData') : 
                      payloadData.schema_type === "iot_telemetry" ? t('payloads.iotData') : 
                      t('payloads.flexibleData')}
                  </TabsTrigger>
                )}
                {supplierData && supplierData.length > 0 && (
                  <TabsTrigger value="supplier">{t('payloads.supplierData')}</TabsTrigger>
                )}
                <TabsTrigger value="blockchain">
                  <ShieldCheck className="h-4 w-4 mr-1" />
                   {t('blockchain.title')}
                </TabsTrigger>
              </TabsList>

              {/* Tab de Payload flexible (ESG, IoT, etc.) */}
              {payloadData && (
                <TabsContent value="payload">
                  <Card>
                    <CardHeader>
                       <CardTitle>
                         {t(`payloads.${payloadData.schema_type}`, { defaultValue: t('payloads.default') })}
                       </CardTitle>
                       <CardDescription>
                         {t('payloads.schemaType')} <Badge variant="outline">{payloadData.schema_type}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Handle array-based payloads (new schema types) */}
                      {Array.isArray(payloadData.data_content) ? (
                        <ArrayDataView data={payloadData.data_content} schemaType={payloadData.schema_type} />
                      ) : payloadData.schema_type === "esg_report" ? (
                        <ESGDataView data={payloadData.data_content as any} />
                      ) : payloadData.schema_type === "iot_telemetry" ? (
                        <IoTDataView data={payloadData.data_content as any} />
                      ) : payloadData.schema_type === "generic_timeseries" ? (
                        <div className="space-y-6">
                          {/* KPIs */}
                          {(payloadData.data_content as any).current_value !== undefined && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="p-4 rounded-lg border bg-card">
                                <p className="text-sm text-muted-foreground mb-1">{t('payloads.currentValue')}</p>
                                <p className="text-2xl font-bold">{(payloadData.data_content as any).current_value}</p>
                              </div>
                              {(payloadData.data_content as any).quality_score !== undefined && (
                                <div className="p-4 rounded-lg border bg-card">
                                  <p className="text-sm text-muted-foreground mb-1">{t('payloads.quality')}</p>
                                  <p className="text-2xl font-bold">{(payloadData.data_content as any).quality_score}%</p>
                                </div>
                              )}
                              {(payloadData.data_content as any).trend !== undefined && (
                                <div className="p-4 rounded-lg border bg-card">
                                  <p className="text-sm text-muted-foreground mb-1">{t('payloads.trend')}</p>
                                  <p className="text-2xl font-bold capitalize">{(payloadData.data_content as any).trend}</p>
                                </div>
                              )}
                              {(payloadData.data_content as any).data_points !== undefined && (
                                <div className="p-4 rounded-lg border bg-card">
                                  <p className="text-sm text-muted-foreground mb-1">{t('payloads.dataPoints')}</p>
                                  <p className="text-2xl font-bold">{(payloadData.data_content as any).data_points?.toLocaleString()}</p>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Gráfico de Serie Temporal */}
                          {(payloadData.data_content as any).history && Array.isArray((payloadData.data_content as any).history) && (
                            <div className="mt-6">
                              <h4 className="font-semibold mb-4">{t('payloads.temporalEvolution')}</h4>
                              <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={(payloadData.data_content as any).history}>
                                  <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis 
                                    dataKey="date" 
                                    tick={{ fontSize: 12 }}
                                  />
                                  <YAxis tick={{ fontSize: 12 }} />
                                  <RechartsTooltip />
                                  <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="hsl(var(--primary))" 
                                    fillOpacity={1}
                                    fill="url(#colorValue)" 
                                    name="Valor"
                                  />
                                  {(payloadData.data_content as any).history[0]?.efficiency !== undefined && (
                                    <Area 
                                      type="monotone" 
                                      dataKey="efficiency" 
                                      stroke="hsl(var(--accent))" 
                                      fill="hsl(var(--accent))" 
                                      fillOpacity={0.3}
                                      name="Eficiencia"
                                    />
                                  )}
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          )}

                          {/* Sector Info */}
                          {(payloadData.data_content as any).sector && (
                            <div className="mt-4 p-4 rounded-lg bg-muted/30">
                               <p className="text-sm text-muted-foreground">
                                 {t('payloads.sectorData')} <Badge variant="secondary">{(payloadData.data_content as any).sector}</Badge>
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <GenericJSONView 
                          data={payloadData.data_content} 
                          schemaType={payloadData.schema_type}
                        />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Tab de Supplier Data (legacy) */}
              {supplierData && supplierData.length > 0 && (
                <TabsContent value="supplier">
                  <Card>
                    <CardHeader>
                       <CardTitle>{t('provider.title')}</CardTitle>
                       <CardDescription>
                         {t('provider.recordsFound', { count: supplierData.length })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                               <TableHead>{t('provider.companyName')}</TableHead>
                               <TableHead>{t('provider.taxId')}</TableHead>
                               <TableHead>{t('provider.legalName')}</TableHead>
                               <TableHead>{t('provider.contact')}</TableHead>
                               <TableHead>{t('provider.email')}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {supplierData.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.company_name}</TableCell>
                                <TableCell>{item.tax_id}</TableCell>
                                <TableCell>{item.legal_name}</TableCell>
                                <TableCell>{item.contact_person_name || "-"}</TableCell>
                                <TableCell>{item.contact_person_email || "-"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Detalles expandidos del primer registro */}
                      {supplierData.length > 0 && (
                        <div className="mt-6 space-y-4">
                          <h4 className="font-semibold">{t('provider.fullDetails')}</h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">{t('provider.fiscalAddress')}</p>
                              <pre className="mt-1 rounded-md bg-muted p-2 text-xs">
                                {JSON.stringify(supplierData[0].fiscal_address, null, 2)}
                              </pre>
                            </div>
                            {supplierData[0].legal_address && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">{t('provider.legalAddress')}</p>
                                <pre className="mt-1 rounded-md bg-muted p-2 text-xs">
                                  {JSON.stringify(supplierData[0].legal_address, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Tab de Auditoría Blockchain */}
              <TabsContent value="blockchain">
                <DataLineageBlockchain />
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* ===== ACCESS HISTORY ===== */}
        {canViewData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AccessHistoryTable
              transactionId={id}
              assetId={transaction.asset?.id}
              consumerOrgId={activeOrg?.id === transaction.consumer_org_id ? activeOrg.id : undefined}
               title={t('accessHistory.title')}
               description={t('accessHistory.description')}
            />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DataView;
