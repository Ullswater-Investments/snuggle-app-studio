import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Send, FileText, Building2, Info } from "lucide-react";
import { toast } from "sonner";
import { ESGDataView } from "@/components/ESGDataView";
import { IoTDataView } from "@/components/IoTDataView";
import { GenericJSONView } from "@/components/GenericJSONView";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DataView = () => {
  const { id } = useParams<{ id: string }>();
  const { user, signOut } = useAuth();
  const { activeOrg } = useOrganizationContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Obtener transacción y datos
  const { data: transaction, isLoading: loadingTransaction } = useQuery({
    queryKey: ["transaction-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          *,
          asset:data_assets (
            product:data_products (name, description, category)
          ),
          consumer_org:organizations!data_transactions_consumer_org_id_fkey (name),
          subject_org:organizations!data_transactions_subject_org_id_fkey (name),
          holder_org:organizations!data_transactions_holder_org_id_fkey (name)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
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
    if (!supplierData || supplierData.length === 0) {
      toast.error("No hay datos para exportar");
      return;
    }

    // Convertir datos a CSV
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

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `supplier_data_${id}.csv`);
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

    toast.success("Archivo CSV descargado exitosamente");
  };

  const sendToERPMutation = useMutation({
    mutationFn: async (erpConfigId: string) => {
      if (!supplierData || supplierData.length === 0) {
        throw new Error("No hay datos para enviar");
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
      toast.success("Datos enviados a ERP exitosamente");
      queryClient.invalidateQueries({ queryKey: ["export-logs"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al enviar datos a ERP");
    },
  });

  if (loadingTransaction) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Cargando transacción...</p>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Transacción no encontrada</p>
            <Button className="mt-4" onClick={() => navigate("/requests")}>
              Volver a solicitudes
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const canViewData = transaction.status === "completed";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
            <span className="procuredata-gradient">PROCUREDATA</span>
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/requests")}>
              Solicitudes
            </Button>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <Button variant="ghost" onClick={() => navigate("/requests")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a solicitudes
        </Button>

        <div className="mb-6">
          <h2 className="mb-2 text-3xl font-bold">Visualización de Datos</h2>
          <p className="text-muted-foreground">
            Datos recibidos de: {transaction.subject_org.name}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Panel lateral con información */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Producto</p>
                  <p className="font-medium">{transaction.asset.product.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estado</p>
                  <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                    {transaction.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Proveedor (Subject)</p>
                  <p className="font-medium">{transaction.subject_org.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Poseedor (Holder)</p>
                  <p className="font-medium">{transaction.holder_org.name}</p>
                </div>
              </CardContent>
            </Card>

            {canViewData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" onClick={exportToCSV}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar CSV
                  </Button>
                  
                  {erpConfigs && erpConfigs.length > 0 ? (
                    <div className="space-y-2">
                      <Select onValueChange={(value) => sendToERPMutation.mutate(value)}>
                        <SelectTrigger>
                          <Send className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Enviar a ERP" />
                        </SelectTrigger>
                        <SelectContent>
                          {erpConfigs.map((config) => (
                            <SelectItem key={config.id} value={config.id}>
                              {config.config_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/settings/erp-config")}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Configurar ERP
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Área principal de datos */}
          <div className="lg:col-span-3">
            {!canViewData ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">Datos no disponibles</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Los datos solo están disponibles cuando la transacción está completada.
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Estado actual: <Badge variant="secondary">{transaction.status}</Badge>
                  </p>
                </CardContent>
              </Card>
            ) : loadingData || loadingPayload ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Cargando datos...</p>
                </CardContent>
              </Card>
            ) : !supplierData || supplierData.length === 0 && !payloadData ? (
              <div className="space-y-4">
                {activeOrg?.type !== 'consumer' && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      No hay datos completados para <strong>{activeOrg?.name}</strong>. 
                      {activeOrg?.type === 'provider' && ' Los proveedores no reciben datos, solo los envían.'}
                      {activeOrg?.type === 'data_holder' && ' Los holders custodian datos pero no los consumen directamente.'}
                      {' '}Prueba a cambiar a una organización Consumer desde el selector superior.
                    </AlertDescription>
                  </Alert>
                )}
                <Card>
                  <CardContent className="py-12 text-center">
                    <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Sin datos disponibles</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Aún no se han compartido datos para esta transacción.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Tabs defaultValue={payloadData ? "payload" : "supplier"} className="w-full">
                <TabsList>
                  {payloadData && (
                    <TabsTrigger value="payload">
                      {payloadData.schema_type === "esg_report" ? "Datos ESG" : 
                       payloadData.schema_type === "iot_telemetry" ? "Datos IoT" : 
                       "Datos Flexibles"}
                    </TabsTrigger>
                  )}
                  {supplierData && supplierData.length > 0 && (
                    <TabsTrigger value="supplier">Datos de Proveedor</TabsTrigger>
                  )}
                </TabsList>

                {/* Tab de Payload flexible (ESG, IoT, etc.) */}
                {payloadData && (
                  <TabsContent value="payload">
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {payloadData.schema_type === "esg_report" ? "Reporte de Sostenibilidad (ESG)" :
                           payloadData.schema_type === "iot_telemetry" ? "Telemetría IoT" :
                           payloadData.schema_type === "generic_timeseries" ? "Datos Históricos" :
                           "Datos del Payload"}
                        </CardTitle>
                        <CardDescription>
                          Tipo de esquema: <Badge variant="outline">{payloadData.schema_type}</Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {payloadData.schema_type === "esg_report" && (
                          <ESGDataView data={payloadData.data_content as any} />
                        )}
                        {payloadData.schema_type === "iot_telemetry" && (
                          <IoTDataView data={payloadData.data_content as any} />
                        )}
                        {payloadData.schema_type === "generic_timeseries" && (
                          <div className="space-y-6">
                            {/* KPIs */}
                            {(payloadData.data_content as any).current_value !== undefined && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-lg border bg-card">
                                  <p className="text-sm text-muted-foreground mb-1">Valor Actual</p>
                                  <p className="text-2xl font-bold">{(payloadData.data_content as any).current_value}</p>
                                </div>
                                {(payloadData.data_content as any).quality_score !== undefined && (
                                  <div className="p-4 rounded-lg border bg-card">
                                    <p className="text-sm text-muted-foreground mb-1">Calidad</p>
                                    <p className="text-2xl font-bold">{(payloadData.data_content as any).quality_score}%</p>
                                  </div>
                                )}
                                {(payloadData.data_content as any).trend !== undefined && (
                                  <div className="p-4 rounded-lg border bg-card">
                                    <p className="text-sm text-muted-foreground mb-1">Tendencia</p>
                                    <p className="text-2xl font-bold capitalize">{(payloadData.data_content as any).trend}</p>
                                  </div>
                                )}
                                {(payloadData.data_content as any).data_points !== undefined && (
                                  <div className="p-4 rounded-lg border bg-card">
                                    <p className="text-sm text-muted-foreground mb-1">Puntos de Datos</p>
                                    <p className="text-2xl font-bold">{(payloadData.data_content as any).data_points?.toLocaleString()}</p>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Gráfico de Serie Temporal */}
                            {(payloadData.data_content as any).history && Array.isArray((payloadData.data_content as any).history) && (
                              <div className="mt-6">
                                <h4 className="font-semibold mb-4">Evolución Temporal</h4>
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
                                    <Tooltip />
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
                                  Datos sectoriales: <Badge variant="secondary">{(payloadData.data_content as any).sector}</Badge>
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                        {!["esg_report", "iot_telemetry", "generic_timeseries"].includes(payloadData.schema_type) && (
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
                        <CardTitle>Datos del Proveedor</CardTitle>
                        <CardDescription>
                          {supplierData.length} registro(s) encontrado(s)
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Razón Social</TableHead>
                                <TableHead>CIF/NIF</TableHead>
                                <TableHead>Nombre Legal</TableHead>
                                <TableHead>Contacto</TableHead>
                                <TableHead>Email</TableHead>
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
                            <h4 className="font-semibold">Detalles Completos</h4>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Dirección Fiscal</p>
                                <pre className="mt-1 rounded-md bg-muted p-2 text-xs">
                                  {JSON.stringify(supplierData[0].fiscal_address, null, 2)}
                                </pre>
                              </div>
                              {supplierData[0].legal_address && (
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Dirección Legal</p>
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
              </Tabs>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataView;
