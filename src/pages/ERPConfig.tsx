import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, CheckCircle, XCircle, Settings } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const erpConfigSchema = z.object({
  config_name: z.string().min(1, "El nombre es requerido").max(100),
  endpoint_url: z.string().url("Debe ser una URL válida"),
  auth_method: z.enum(["bearer", "api_key", "oauth", "basic"]),
  api_key_encrypted: z.string().optional(),
  auth_token_encrypted: z.string().optional(),
});

const ERPConfig = () => {
  const { user, signOut } = useAuth();
  const { activeOrg, isDemo } = useOrganizationContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<{
    config_name: string;
    endpoint_url: string;
    auth_method: "bearer" | "api_key" | "oauth" | "basic";
    api_key_encrypted: string;
    auth_token_encrypted: string;
  }>({
    config_name: "",
    endpoint_url: "",
    auth_method: "api_key",
    api_key_encrypted: "",
    auth_token_encrypted: "",
  });

  const [activeTab, setActiveTab] = useState<"upload" | "download">("upload");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill demo data based on active organization
  useEffect(() => {
    if (isDemo && activeOrg) {
      const orgName = activeOrg.name.toLowerCase();
      let demoEndpoint = "https://api.example.com/v1/webhook";
      
      if (orgName.includes("rapid")) {
        demoEndpoint = "https://api.rapid-auto.com/v1/suppliers";
      } else if (orgName.includes("solid")) {
        demoEndpoint = "https://api.solid-energy.com/v1/data";
      } else if (orgName.includes("future")) {
        demoEndpoint = "https://api.future-pharma.com/v1/clinical";
      } else if (orgName.includes("smart")) {
        demoEndpoint = "https://api.smart-retail.com/v1/inventory";
      }

      setFormData(prev => ({
        ...prev,
        config_name: `ERP ${activeOrg.name}`,
        endpoint_url: demoEndpoint,
      }));
    }
  }, [isDemo, activeOrg]);

  const { data: userProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("organization_id")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: configs, isLoading } = useQuery({
    queryKey: ["erp-configs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("erp_configurations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createConfigMutation = useMutation({
    mutationFn: async () => {
      if (!userProfile) throw new Error("No user profile");

      // Validar datos
      const validation = erpConfigSchema.safeParse(formData);
      if (!validation.success) {
        const newErrors: Record<string, string> = {};
        validation.error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        throw new Error("Validación fallida");
      }

      setErrors({});

      const { error } = await supabase.from("erp_configurations").insert({
        organization_id: userProfile.organization_id,
        config_type: activeTab,
        config_name: formData.config_name,
        endpoint_url: formData.endpoint_url,
        auth_method: formData.auth_method,
        api_key_encrypted: formData.api_key_encrypted || null,
        auth_token_encrypted: formData.auth_token_encrypted || null,
        is_active: true,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Configuración creada exitosamente");
      queryClient.invalidateQueries({ queryKey: ["erp-configs"] });
      setFormData({
        config_name: "",
        endpoint_url: "",
        auth_method: "api_key",
        api_key_encrypted: "",
        auth_token_encrypted: "",
      });
    },
    onError: (error: any) => {
      if (error.message !== "Validación fallida") {
        toast.error(error.message || "Error al crear configuración");
      }
    },
  });

  const deleteConfigMutation = useMutation({
    mutationFn: async (configId: string) => {
      const { error } = await supabase
        .from("erp_configurations")
        .delete()
        .eq("id", configId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Configuración eliminada");
      queryClient.invalidateQueries({ queryKey: ["erp-configs"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al eliminar configuración");
    },
  });

  const testConnectionMutation = useMutation({
    mutationFn: async (configId: string) => {
      const { data, error } = await supabase.functions.invoke("erp-api-tester", {
        body: { configId },
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.message);
      
      return data;
    },
    onSuccess: () => {
      toast.success("Conexión probada exitosamente");
      queryClient.invalidateQueries({ queryKey: ["erp-configs"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al probar la conexión");
    },
  });

  const uploadConfigs = configs?.filter((c) => c.config_type === "upload") || [];
  const downloadConfigs = configs?.filter((c) => c.config_type === "download") || [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
            <span className="procuredata-gradient">PROCUREDATA</span>
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl p-6">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al dashboard
        </Button>

        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">Configuración de ERP</h2>
          <p className="text-muted-foreground">
            Configura las integraciones con tus sistemas ERP externos
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "upload" | "download")}>
          <TabsList className="mb-6">
            <TabsTrigger value="upload">API de Carga (Upload)</TabsTrigger>
            <TabsTrigger value="download">API de Descarga (Download)</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Configuración de Carga</CardTitle>
                <CardDescription>
                  Configura un endpoint para enviar datos a tu ERP
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="config_name">Nombre de la Configuración *</Label>
                  <Input
                    id="config_name"
                    placeholder="Mi ERP Producción"
                    value={formData.config_name}
                    onChange={(e) => setFormData({ ...formData, config_name: e.target.value })}
                  />
                  {errors.config_name && (
                    <p className="text-sm text-destructive">{errors.config_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint_url">URL del Endpoint *</Label>
                  <Input
                    id="endpoint_url"
                    placeholder="https://api.mierp.com/v1/suppliers"
                    value={formData.endpoint_url}
                    onChange={(e) => setFormData({ ...formData, endpoint_url: e.target.value })}
                  />
                  {errors.endpoint_url && (
                    <p className="text-sm text-destructive">{errors.endpoint_url}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auth_method">Método de Autenticación *</Label>
                  <Select
                    value={formData.auth_method}
                    onValueChange={(value: any) => setFormData({ ...formData, auth_method: value })}
                  >
                    <SelectTrigger id="auth_method">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api_key">API Key</SelectItem>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="oauth">OAuth 2.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.auth_method === "api_key" && (
                  <div className="space-y-2">
                    <Label htmlFor="api_key">API Key</Label>
                    <Input
                      id="api_key"
                      type="password"
                      placeholder="sk_live_..."
                      value={formData.api_key_encrypted}
                      onChange={(e) => setFormData({ ...formData, api_key_encrypted: e.target.value })}
                    />
                  </div>
                )}

                {formData.auth_method === "bearer" && (
                  <div className="space-y-2">
                    <Label htmlFor="token">Bearer Token</Label>
                    <Input
                      id="token"
                      type="password"
                      placeholder="eyJ..."
                      value={formData.auth_token_encrypted}
                      onChange={(e) => setFormData({ ...formData, auth_token_encrypted: e.target.value })}
                    />
                  </div>
                )}

                <Button
                  onClick={() => createConfigMutation.mutate()}
                  disabled={createConfigMutation.isPending}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Configuración
                </Button>
              </CardContent>
            </Card>

            {/* Lista de configuraciones existentes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Configuraciones de Carga</h3>
                {isDemo && (
                  <Badge variant="secondary">DEMO MODE - Datos Simulados</Badge>
                )}
              </div>
              {isLoading ? (
                <Card>
                  <CardContent className="py-6 text-center text-muted-foreground">
                    Cargando configuraciones...
                  </CardContent>
                </Card>
              ) : uploadConfigs.length === 0 ? (
                <Card>
                  <CardContent className="py-6 text-center text-muted-foreground">
                    No hay configuraciones de carga
                  </CardContent>
                </Card>
              ) : (
                uploadConfigs.map((config) => (
                  <Card key={config.id}>
                    <CardContent className="flex items-center justify-between pt-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-semibold">{config.config_name}</h4>
                          <Badge variant={config.is_active ? "default" : "secondary"}>
                            {config.is_active ? "Activa" : "Inactiva"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{config.endpoint_url}</p>
                        <p className="text-xs text-muted-foreground">
                          Método: {config.auth_method}
                        </p>
                        {config.last_test_date && (
                          <p className="text-xs text-muted-foreground">
                            Último test: {new Date(config.last_test_date).toLocaleString("es-ES")}
                            {config.last_test_status === "success" ? (
                              <CheckCircle className="ml-1 inline h-3 w-3 text-green-600" />
                            ) : (
                              <XCircle className="ml-1 inline h-3 w-3 text-destructive" />
                            )}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => testConnectionMutation.mutate(config.id)}
                          disabled={testConnectionMutation.isPending}
                        >
                          Probar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteConfigMutation.mutate(config.id)}
                          disabled={deleteConfigMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="download" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Descarga</CardTitle>
                <CardDescription>
                  Próximamente: Configura endpoints para descargar datos desde tu ERP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Esta funcionalidad estará disponible en una próxima fase
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ERPConfig;
