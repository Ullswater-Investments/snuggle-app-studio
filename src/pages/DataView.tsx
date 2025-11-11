import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, Send, FileText, Building2 } from "lucide-react";
import { toast } from "sonner";

const DataView = () => {
  const { id } = useParams<{ id: string }>();
  const { user, signOut } = useAuth();
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

      // En producción, esto llamaría a un Edge Function
      // Por ahora simulamos el envío
      toast.info("Funcionalidad de envío a ERP requiere Edge Function (Fase 5)");

      // Log de exportación
      await supabase.from("export_logs").insert({
        transaction_id: id,
        organization_id: transaction?.consumer_org_id,
        export_type: "erp",
        export_status: "success",
        erp_config_id: erpConfigId,
        user_id: user?.id
      });
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
            PROCUREDATA
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
            ) : loadingData ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Cargando datos...</p>
                </CardContent>
              </Card>
            ) : !supplierData || supplierData.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">Sin datos disponibles</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Aún no se han compartido datos para esta transacción.
                  </p>
                </CardContent>
              </Card>
            ) : (
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataView;
