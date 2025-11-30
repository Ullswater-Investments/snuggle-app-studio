import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Package } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { OrderSummary } from "@/components/OrderSummary";
import { PaymentGateway } from "@/components/PaymentGateway";

const requestSchema = z.object({
  purpose: z.string().min(10, "El propósito debe tener al menos 10 caracteres").max(500),
  accessDuration: z.number().min(1).max(365),
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [formData, setFormData] = useState({
    purpose: "",
    accessDuration: 90,
    justification: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const createTransactionMutation = useMutation({
    mutationFn: async () => {
      if (!asset || !userProfile) throw new Error("Missing data");

      // Crear transacción
      const { data: transaction, error: transactionError } = await supabase
        .from("data_transactions")
        .insert({
          asset_id: asset.id,
          consumer_org_id: userProfile.organization_id,
          subject_org_id: asset.subject_org.id,
          holder_org_id: asset.holder_org.id,
          purpose: formData.purpose,
          access_duration_days: formData.accessDuration,
          justification: formData.justification,
          requested_by: user?.id,
          status: "pending_subject",
        })
        .select()
        .single();

      if (transactionError) throw transactionError;

      // Generar política ODRL básica
      const odrlPolicy = {
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
            rightOperand: `P${formData.accessDuration}D`
          }]
        }]
      };

      // Guardar política
      const { error: policyError } = await supabase
        .from("data_policies")
        .insert({
          transaction_id: transaction.id,
          odrl_policy_json: odrlPolicy,
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

    if (step === 3 && formData.accessDuration < 1) {
      newErrors.accessDuration = "La duración debe ser al menos 1 día";
    }

    if (step === 4) {
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

  if (!asset || !assetId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Activo no encontrado</p>
            <Button className="mt-4" onClick={() => navigate("/catalog")}>
              Volver al catálogo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
            <span className="procuredata-gradient">PROCUREDATA</span>
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/requests")}>
              Mis Solicitudes
            </Button>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

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
                  <h3 className="font-semibold">{asset.product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {asset.product.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Proveedor (Subject):</span>
                  <span className="text-sm">{asset.subject_org.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Poseedor de datos (Holder):</span>
                  <span className="text-sm">{asset.holder_org.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Categoría:</span>
                  <span className="text-sm">{asset.product.category}</span>
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

        {/* Paso 3: Duración del acceso */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>3. Duración del Acceso</CardTitle>
              <CardDescription>¿Por cuánto tiempo necesitas acceder a los datos?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duración en días *</Label>
                <Select
                  value={formData.accessDuration.toString()}
                  onValueChange={(value) => setFormData({ ...formData, accessDuration: parseInt(value) })}
                >
                  <SelectTrigger id="duration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 días (1 mes)</SelectItem>
                    <SelectItem value="90">90 días (3 meses)</SelectItem>
                    <SelectItem value="180">180 días (6 meses)</SelectItem>
                    <SelectItem value="365">365 días (1 año)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.accessDuration && (
                  <p className="text-sm text-destructive">{errors.accessDuration}</p>
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

        {/* Paso 4: Justificación */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>4. Justificación</CardTitle>
              <CardDescription>Explica por qué necesitas estos datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <p className="text-sm font-medium text-muted-foreground">Duración</p>
                  <p className="text-base">{formData.accessDuration} días</p>
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

      <PaymentGateway 
        open={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onConfirm={handlePaymentConfirm}
        asset={asset}
      />
    </div>
  );
};

export default RequestWizard;
