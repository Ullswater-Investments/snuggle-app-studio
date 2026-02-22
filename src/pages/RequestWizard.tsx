import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation, Navigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Package, Info, Shield, Ban, AlertTriangle, ExternalLink, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { z } from "zod";
import { OrderSummary } from "@/components/OrderSummary";
import { ConfirmRequestModal } from "@/components/ConfirmRequestModal";

const requestSchema = z.object({
  purpose: z.string().min(10, "El propósito debe tener al menos 10 caracteres").max(500),
  justification: z.string().min(20, "La justificación debe tener al menos 20 caracteres").max(1000),
});

const PURPOSES = [
  "Evaluación de proveedores",
  "Due diligence comercial",
  "Análisis de riesgo",
  "Cumplimiento normativo",
  "Negociación contractual",
  "Auditoría interna",
  "Otro (especificar en justificación)"
];

const RequestWizard = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const assetId = searchParams.get("asset") || (location.state as any)?.preselectedAssetId;
  const { user, signOut } = useAuth();
  const { activeOrgId, loading: orgLoading, isDemo } = useOrganizationContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [formData, setFormData] = useState({
    purpose: "",
    justification: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [governanceReviewed, setGovernanceReviewed] = useState(false);
  const { sendNotification } = useNotifications();

  const STORAGE_KEY = "procuredata_wizard_draft";

  // Auto-save: Guardar en localStorage cuando cambie formData o step
  useEffect(() => {
    if (formData.purpose || formData.justification) {
      const draft = {
        formData,
        step,
        assetId,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    }
  }, [formData, step, assetId]);

  // Cargar draft al montar el componente
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        // Solo restaurar si es para el mismo asset
        if (draft.assetId === assetId) {
          toast(
            "Borrador encontrado",
            {
              description: "Hemos recuperado tu solicitud pendiente. ¿Deseas continuarla?",
              action: {
                label: "Restaurar",
                onClick: () => {
                  setFormData(draft.formData);
                  setStep(draft.step);
                  toast.success("Borrador restaurado exitosamente");
                },
              },
            }
          );
        }
      } catch (error) {
        console.error("Error al cargar el borrador:", error);
      }
    }
  }, [assetId]);

  // Obtener información del activo
  const { data: asset, isLoading } = useQuery({
    queryKey: ["asset-detail", assetId],
    queryFn: async () => {
      if (!assetId) throw new Error("Asset ID is required");
      
      const { data, error } = await supabase
        .from("data_assets")
        .select(`
          id,
          price,
          currency,
          pricing_model,
          billing_period,
          status,
          custom_metadata,
          subject_org:organizations!data_assets_subject_org_id_fkey (
            id, name, tax_id, type
          ),
          holder_org:organizations!data_assets_holder_org_id_fkey (
            id, name, tax_id, type
          ),
          product:data_products (
            id, name, description, category
          )
        `)
        .eq("id", assetId)
        .single();

      if (error) throw error;
      
      // Mapear para compatibilidad con OrderSummary
      return {
        ...data,
        name: data.product?.name || "Dataset",
        org: data.subject_org,
        asset_name: data.product?.name
      };
    },
    enabled: !!assetId,
  });

  // Get the access timeout from the asset's governance policy
  const accessTimeoutDays = (asset?.custom_metadata as any)?.access_policy?.access_timeout_days || 90;

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

  // Check for existing active transaction for this asset
  const { data: existingTransaction } = useQuery({
    queryKey: ["existing-transaction", assetId, userProfile?.organization_id],
    queryFn: async () => {
      if (!assetId || !userProfile?.organization_id) return null;
      const { data } = await supabase
        .from("data_transactions")
        .select("id, status")
        .eq("asset_id", assetId)
        .eq("consumer_org_id", userProfile.organization_id)
        .in("status", ["initiated", "pending_subject", "pending_holder", "approved", "completed"])
        .limit(1)
        .maybeSingle();
      return data;
    },
    enabled: !!assetId && !!userProfile?.organization_id,
  });

  // Redirect to existing transaction if found
  useEffect(() => {
    if (existingTransaction) {
      if (existingTransaction.status === "completed") {
        toast.info("Ya tienes acceso a este activo. Redirigiendo...");
        navigate(`/data/view/${assetId}`);
      } else {
        toast.info("Ya tienes una solicitud activa para este activo. Redirigiendo...");
        navigate(`/requests/${existingTransaction.id}`);
      }
    }
  }, [existingTransaction, assetId, navigate]);



  const createTransactionMutation = useMutation({
    mutationFn: async () => {
      if (!asset || !userProfile || !asset.subject_org || !asset.holder_org) {
        throw new Error("Missing data");
      }

      // Crear transacción con registro de aceptación de políticas
      const { data: transaction, error: transactionError } = await supabase
        .from("data_transactions")
        .insert({
          asset_id: asset.id,
          consumer_org_id: userProfile.organization_id,
          subject_org_id: asset.subject_org.id,
          holder_org_id: asset.holder_org.id,
          purpose: formData.purpose,
          access_duration_days: accessTimeoutDays,
          justification: formData.justification,
          requested_by: user?.id,
          status: "pending_subject",
          metadata: {
            governance_accepted: true,
            governance_accepted_at: new Date().toISOString(),
            access_timeout_days: accessTimeoutDays,
          },
        })
        .select()
        .single();

      if (transactionError) throw transactionError;

      // Generar política de uso básica
      const usagePolicy = {
        "@context": "http://www.w3.org/ns/odrl.jsonld",
        "@type": "Offer",
        uid: transaction.id,
        profile: "http://example.com/odrl:profile:01",
        permission: [{
          target: asset.id,
          action: "use",
          assigner: asset.holder_org.id,
          assignee: userProfile.organization_id,
          constraint: [{
            leftOperand: "purpose",
            operator: "eq",
            rightOperand: formData.purpose
          }, {
            leftOperand: "elapsedTime",
            operator: "lteq",
            rightOperand: `P${accessTimeoutDays}D`
          }]
        }]
      };

      // Guardar política
      const { error: policyError } = await supabase
        .from("data_policies")
        .insert({
          transaction_id: transaction.id,
          odrl_policy_json: usagePolicy,
        });

      if (policyError) throw policyError;

      // Enviar notificación al Subject
      await sendNotification(transaction.id, "created");

      return transaction;
    },
    onSuccess: () => {
      toast.success("Solicitud creada exitosamente");
      // Limpiar el draft guardado después del envío exitoso
      localStorage.removeItem(STORAGE_KEY);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      navigate("/requests");
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al crear la solicitud");
    },
  });

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 2 && !formData.purpose) {
      newErrors.purpose = "Debes seleccionar un propósito";
    }




    if (step === 3) {
      try {
        requestSchema.parse(formData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            if (err.path[0]) {
              newErrors[err.path[0] as string] = err.message;
            }
          });
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentConfirm = () => {
    setIsPaymentOpen(false);
    createTransactionMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!asset || !assetId || !asset.product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Activo no encontrado o datos incompletos</p>
            <Button className="mt-4 w-full" onClick={() => navigate("/catalog")}>
              Volver al catálogo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Extract governance policies from asset metadata
  const accessPolicy = (asset?.custom_metadata as any)?.access_policy;
  const permissions = accessPolicy?.permissions || [];
  const prohibitions = accessPolicy?.prohibitions || [];
  const obligations = accessPolicy?.obligations || [];
  const externalTermsUrl = accessPolicy?.terms_url || accessPolicy?.external_policy_url;

  const progress = (step / 5) * 100;

  // Validación interna de seguridad: redirigir si no hay org activa
  if (!orgLoading && !activeOrgId) {
    return <Navigate to="/dashboard" replace />;
  }

  // Demo mode: show blocking message
  if (isDemo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center mx-auto mb-4">
              <Ban className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <CardTitle>Función no disponible</CardTitle>
            <CardDescription>
              Las solicitudes de datos no están disponibles en modo demostración.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => navigate("/catalog")}>
              Volver al Catálogo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto p-6">
        {/* Layout de 2 Columnas: Formulario + Resumen */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda: Wizard Form (2/3) */}
          <div className="lg:col-span-2">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancelar solicitud
            </Button>

            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold">Solicitud de Datos</h2>
              <p className="text-muted-foreground">
                Completa el wizard para solicitar acceso a datos
              </p>
            </div>

            <div className="mb-8">
              <Progress value={progress} className="h-2" />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>Paso {step} de 5</span>
                <span>{progress.toFixed(0)}% completado</span>
              </div>
            </div>

        {/* Paso 1: Información del activo */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>1. Información del Activo</CardTitle>
              <CardDescription>Revisa los datos que vas a solicitar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <Package className="h-12 w-12 text-primary" />
                <div className="flex-1">
                  <h3 className="font-semibold">{asset.product?.name || "Dataset"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {asset.product?.description || "Sin descripción"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Proveedor (Subject):</span>
                  <span className="text-sm">{asset.subject_org?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Poseedor de datos (Holder):</span>
                  <span className="text-sm">{asset.holder_org?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Categoría:</span>
                  <span className="text-sm">{asset.product?.category || "General"}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext}>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Paso 2: Propósito */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>2. Propósito de Uso</CardTitle>
              <CardDescription>Selecciona el propósito para el que necesitas los datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purpose">Propósito *</Label>
                <Select
                  value={formData.purpose}
                  onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                >
                  <SelectTrigger id="purpose">
                    <SelectValue placeholder="Selecciona un propósito" />
                  </SelectTrigger>
                  <SelectContent>
                    {PURPOSES.map((purpose) => (
                      <SelectItem key={purpose} value={purpose}>
                        {purpose}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.purpose && (
                  <p className="text-sm text-destructive">{errors.purpose}</p>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Atrás
                </Button>
                <Button onClick={handleNext}>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Paso 3: Justificación (was step 4) */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>3. Justificación</CardTitle>
              <CardDescription>Explica por qué necesitas estos datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Informative block about access conditions */}
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">Condiciones de acceso</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Este activo se concede por un periodo de <strong>{accessTimeoutDays} días</strong>, según la política del proveedor.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="justification">Justificación detallada *</Label>
                <Textarea
                  id="justification"
                  placeholder="Describe el contexto y la necesidad de acceso a estos datos..."
                  value={formData.justification}
                  onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                  rows={6}
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.justification.length}/1000 caracteres
                </p>
                {errors.justification && (
                  <p className="text-sm text-destructive">{errors.justification}</p>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Atrás
                </Button>
                <Button onClick={handleNext}>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Paso 4: Revisión de Gobernanza */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>4. Revisión de Gobernanza</CardTitle>
              <CardDescription>Revisa las políticas de uso del activo antes de confirmar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Permisos */}
              <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-800 dark:text-green-300">Permisos</h4>
                </div>
                {permissions.length > 0 ? (
                  <ul className="space-y-1.5">
                    {permissions.map((p: any, i: number) => (
                      <li key={i} className="text-sm text-green-700 dark:text-green-400 flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{typeof p === 'string' ? p : p.description || p.action || JSON.stringify(p)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-600 dark:text-green-400">Uso estándar según términos de la plataforma.</p>
                )}
              </div>

              {/* Prohibiciones */}
              <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Ban className="h-5 w-5 text-red-600" />
                  <h4 className="font-semibold text-red-800 dark:text-red-300">Prohibiciones</h4>
                </div>
                {prohibitions.length > 0 ? (
                  <ul className="space-y-1.5">
                    {prohibitions.map((p: any, i: number) => (
                      <li key={i} className="text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
                        <Ban className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{typeof p === 'string' ? p : p.description || p.action || JSON.stringify(p)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-red-600 dark:text-red-400">No se han definido prohibiciones específicas.</p>
                )}
              </div>

              {/* Obligaciones */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300">Obligaciones</h4>
                </div>
                {obligations.length > 0 ? (
                  <ul className="space-y-1.5">
                    {obligations.map((p: any, i: number) => (
                      <li key={i} className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{typeof p === 'string' ? p : p.description || p.action || JSON.stringify(p)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-amber-600 dark:text-amber-400">No se han definido obligaciones específicas.</p>
                )}
              </div>

              {/* External Terms URL */}
              {externalTermsUrl && (
                <a 
                  href={externalTermsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-4 rounded-lg border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <ExternalLink className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold text-primary">Consultar Términos y Condiciones Completos</p>
                    <p className="text-xs text-muted-foreground truncate">{externalTermsUrl}</p>
                  </div>
                </a>
              )}

              {/* Timeout */}
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Duración del acceso</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>{accessTimeoutDays} días</strong> desde la aprobación, según la política del proveedor.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Atrás
                </Button>
                <Button onClick={() => { setGovernanceReviewed(true); handleNext(); }}>
                  He revisado las políticas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Paso 5: Confirmación */}
        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>5. Confirmación</CardTitle>
              <CardDescription>Revisa tu solicitud antes de enviarla</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Producto</p>
                  <p className="text-base">{asset.product.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Propósito</p>
                  <p className="text-base">{formData.purpose}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Duración de Acceso</p>
                  <p className="text-base">{accessTimeoutDays} días (definido por el proveedor)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Justificación</p>
                  <p className="text-base">{formData.justification}</p>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">
                  <CheckCircle className="mr-2 inline h-4 w-4 text-green-600" />
                  Al enviar esta solicitud, se notificará al proveedor (Subject) y al poseedor de datos (Holder) para su aprobación.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Atrás
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={createTransactionMutation.isPending}
                >
                  {createTransactionMutation.isPending ? "Enviando..." : "Enviar Solicitud"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
          </div>

          {/* Columna Derecha: Resumen de Pedido Sticky (1/3) */}
          <div className="lg:col-span-1">
            <OrderSummary asset={asset} step={step} />
          </div>
        </div>
      </main>

      <ConfirmRequestModal
        open={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onConfirm={handlePaymentConfirm}
        asset={asset}
        isPending={createTransactionMutation.isPending}
      />
    </div>
  );
};

export default RequestWizard;
