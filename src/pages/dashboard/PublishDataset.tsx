import { useState, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useAuth } from "@/hooks/useAuth";
import { useGovernanceSettings } from "@/hooks/useGovernanceSettings";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Globe,
  DollarSign,
  Shield,
  CheckCircle2,
  XCircle,
  Loader2,
  Info,
  Package,
  Plus,
  Trash2,
  Lock,
  Link as LinkIcon,
  Upload,
  FileJson,
  FileSpreadsheet,
  Wand2,
  Clock,
  Users,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ApiHeader {
  key: string;
  value: string;
}

interface SchemaField {
  field: string;
  type: string;
  description: string;
}

interface Step1Data {
  originName: string;
  originDescription: string;
  apiUrl: string;
  headers: ApiHeader[];
}

interface Step2Data {
  schemaFields: SchemaField[];
}

interface PolicyRule {
  id: string;
  label: string;
}

interface AccessListEntry {
  orgId: string;
  orgName: string;
  walletAddress: string;
}

interface Step3Data {
  permissions: PolicyRule[];
  prohibitions: PolicyRule[];
  obligations: PolicyRule[];
  termsUrl: string;
  allowedList: AccessListEntry[];
  deniedList: AccessListEntry[];
  accessTimeout: number;
}

interface Step4Data {
  publicName: string;
  description: string;
  category: string;
  language: string;
  price: number;
  pricingModel: "free" | "subscription" | "one_time" | "usage";
  acceptedTerms: boolean;
  acceptedDataPolicy: boolean;
}

const QUICK_PERMISSIONS: PolicyRule[] = [
  { id: "commercial_use", label: "Uso comercial" },
  { id: "internal_analysis", label: "Análisis interno" },
  { id: "derive_reports", label: "Generar informes derivados" },
  { id: "integrate_systems", label: "Integración en sistemas internos" },
  { id: "research_use", label: "Uso en investigación" },
];

const QUICK_PROHIBITIONS: PolicyRule[] = [
  { id: "no_redistribution", label: "No redistribución" },
  { id: "no_reverse_engineering", label: "No ingeniería inversa" },
  { id: "no_illegal_use", label: "No uso ilegal o discriminatorio" },
  { id: "no_resale", label: "No reventa a terceros" },
  { id: "no_public_disclosure", label: "No divulgación pública" },
];

const QUICK_OBLIGATIONS: PolicyRule[] = [
  { id: "attribution", label: "Atribución requerida" },
  { id: "gdpr_compliance", label: "Cumplimiento GDPR" },
  { id: "license_renewal", label: "Renovación de licencia" },
  { id: "cite_source", label: "Citar fuente de datos" },
  { id: "notify_usage", label: "Notificar uso a proveedor" },
];

const LANGUAGES = [
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "en", label: "Inglés", flag: "🇬🇧" },
  { value: "de", label: "Alemán", flag: "🇩🇪" },
  { value: "fr", label: "Francés", flag: "🇫🇷" },
  { value: "pt", label: "Portugués", flag: "🇵🇹" },
  { value: "it", label: "Italiano", flag: "🇮🇹" },
];

const CATEGORIES = [
  { value: "Compliance", label: "Compliance", icon: "🛡️" },
  { value: "ESG", label: "ESG / Sostenibilidad", icon: "🌿" },
  { value: "Ops", label: "Operaciones", icon: "⚙️" },
  { value: "Market", label: "Mercado / Precios", icon: "📊" },
  { value: "R&D", label: "I+D / Innovación", icon: "🔬" },
  { value: "Logistics", label: "Logística", icon: "🚚" },
  { value: "Finance", label: "Finanzas", icon: "💰" },
  { value: "HR", label: "Recursos Humanos", icon: "👥" },
  { value: "IoT", label: "IoT / Telemetría", icon: "📡" },
  { value: "Otros", label: "Otros", icon: "📦" },
];

const PRICING_MODELS = [
  { value: "free", label: "Gratuito", description: "Sin coste para consumidores" },
  { value: "subscription", label: "Suscripción", description: "Pago mensual recurrente" },
  { value: "one_time", label: "Pago Único", description: "Licencia perpetua" },
  { value: "usage", label: "Por Uso", description: "Basado en consumo de API" },
];

const FIELD_TYPES = [
  "Texto",
  "Número",
  "Fecha",
  "Booleano",
  "UUID",
  "JSON",
  "Array",
  "Timestamp",
  "Decimal",
  "Entero",
];

const STEPS = [
  { id: 1, title: "Fuente de Datos", description: "Conexión API" },
  { id: 2, title: "Esquema", description: "Estructura técnica" },
  { id: 3, title: "Políticas", description: "Pontus-X" },
  { id: 4, title: "Publicación", description: "Marketplace" },
];

export default function PublishDataset() {
  const navigate = useNavigate();
  const { activeOrg, activeOrgId } = useOrganizationContext();
  const { user } = useAuth();
  const { autoApproveAssets, maintenanceMode } = useGovernanceSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [productId, setProductId] = useState<string | null>(null);

  const [step1Data, setStep1Data] = useState<Step1Data>({
    originName: "",
    originDescription: "",
    apiUrl: "",
    headers: [{ key: "", value: "" }],
  });

  const [step2Data, setStep2Data] = useState<Step2Data>({
    schemaFields: [{ field: "", type: "Texto", description: "" }],
  });

  const [step3Data, setStep3Data] = useState<Step3Data>({
    permissions: [],
    prohibitions: [],
    obligations: [],
    termsUrl: "",
    allowedList: [],
    deniedList: [],
    accessTimeout: 90,
  });

  const [step4Data, setStep4Data] = useState<Step4Data>({
    publicName: "",
    description: "",
    category: "",
    language: "",
    price: 0,
    pricingModel: "free",
    acceptedTerms: false,
    acceptedDataPolicy: false,
  });

  // Step 3 helpers
  const addRule = (section: "permissions" | "prohibitions" | "obligations", label: string) => {
    const id = label.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    setStep3Data((prev) => {
      if (prev[section].some((r) => r.label === label)) return prev;
      return { ...prev, [section]: [...prev[section], { id, label }] };
    });
  };

  const removeRule = (section: "permissions" | "prohibitions" | "obligations", id: string) => {
    setStep3Data((prev) => ({
      ...prev,
      [section]: prev[section].filter((r) => r.id !== id),
    }));
  };

  const [customRuleInputs, setCustomRuleInputs] = useState({ permissions: "", prohibitions: "", obligations: "" });
  const [allowedSearchQuery, setAllowedSearchQuery] = useState("");
  const [deniedSearchQuery, setDeniedSearchQuery] = useState("");

  const addCustomRule = (section: "permissions" | "prohibitions" | "obligations") => {
    const label = customRuleInputs[section].trim();
    if (!label) return;
    addRule(section, label);
    setCustomRuleInputs((prev) => ({ ...prev, [section]: "" }));
  };

  const isValidUrl = (url: string) => {
    if (!url) return true; // optional
    try { new URL(url); return true; } catch { return false; }
  };

  // Query organizations for allowed list
  const { data: allowedSearchOrgs } = useQuery({
    queryKey: ["org-search-allowed", allowedSearchQuery],
    queryFn: async () => {
      if (!allowedSearchQuery.trim()) return [];
      const { data, error } = await supabase
        .from("organizations")
        .select("id, name, wallet_address")
        .ilike("name", `%${allowedSearchQuery}%`)
        .neq("id", activeOrgId ?? "")
        .limit(10);
      if (error) throw error;
      return data ?? [];
    },
    enabled: allowedSearchQuery.trim().length >= 2,
  });

  // Query organizations for denied list
  const { data: deniedSearchOrgs } = useQuery({
    queryKey: ["org-search-denied", deniedSearchQuery],
    queryFn: async () => {
      if (!deniedSearchQuery.trim()) return [];
      const { data, error } = await supabase
        .from("organizations")
        .select("id, name, wallet_address")
        .ilike("name", `%${deniedSearchQuery}%`)
        .neq("id", activeOrgId ?? "")
        .limit(10);
      if (error) throw error;
      return data ?? [];
    },
    enabled: deniedSearchQuery.trim().length >= 2,
  });

  // Header management
  const addHeader = () => {
    setStep1Data((prev) => ({
      ...prev,
      headers: [...prev.headers, { key: "", value: "" }],
    }));
  };

  const removeHeader = (index: number) => {
    setStep1Data((prev) => ({
      ...prev,
      headers: prev.headers.filter((_, i) => i !== index),
    }));
  };

  const updateHeader = (index: number, field: "key" | "value", val: string) => {
    setStep1Data((prev) => ({
      ...prev,
      headers: prev.headers.map((h, i) => (i === index ? { ...h, [field]: val } : h)),
    }));
  };

  // Schema field management
  const addSchemaField = () => {
    setStep2Data((prev) => ({
      ...prev,
      schemaFields: [...prev.schemaFields, { field: "", type: "Texto", description: "" }],
    }));
  };

  const removeSchemaField = (index: number) => {
    setStep2Data((prev) => ({
      ...prev,
      schemaFields: prev.schemaFields.filter((_, i) => i !== index),
    }));
  };

  const updateSchemaField = (index: number, key: keyof SchemaField, val: string) => {
    setStep2Data((prev) => ({
      ...prev,
      schemaFields: prev.schemaFields.map((f, i) => (i === index ? { ...f, [key]: val } : f)),
    }));
  };

  // Schema Assistant: parse uploaded JSON or CSV
  const handleSchemaFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      let detectedFields: SchemaField[] = [];

      try {
        if (file.name.endsWith(".json")) {
          const parsed = JSON.parse(content);
          // Handle array of objects or single object
          const sample = Array.isArray(parsed) ? parsed[0] : parsed;
          if (sample && typeof sample === "object") {
            detectedFields = Object.entries(sample).map(([key, value]) => ({
              field: key,
              type: inferType(value),
              description: "",
            }));
          }
        } else if (file.name.endsWith(".csv")) {
          // Parse first line of CSV for column names
          const lines = content.split("\n").filter((l) => l.trim());
          if (lines.length > 0) {
            const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
            // Try to infer types from second row if available
            const secondRow = lines.length > 1 ? lines[1].split(",").map((v) => v.trim().replace(/^"|"$/g, "")) : [];
            detectedFields = headers.map((h, i) => ({
              field: h,
              type: secondRow[i] ? inferTypeFromString(secondRow[i]) : "Texto",
              description: "",
            }));
          }
        }
      } catch {
        toast.error("No se pudo procesar el archivo. Verifica el formato.");
        return;
      }

      if (detectedFields.length > 0) {
        setStep2Data({ schemaFields: detectedFields });
        toast.success(`${detectedFields.length} campos detectados automáticamente`);
      } else {
        toast.error("No se detectaron campos en el archivo.");
      }
    };

    reader.readAsText(file);
    // Reset input so same file can be re-uploaded
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const inferType = (value: unknown): string => {
    if (value === null || value === undefined) return "Texto";
    if (typeof value === "number") return Number.isInteger(value) ? "Entero" : "Decimal";
    if (typeof value === "boolean") return "Booleano";
    if (Array.isArray(value)) return "Array";
    if (typeof value === "object") return "JSON";
    if (typeof value === "string") {
      if (/^\d{4}-\d{2}-\d{2}/.test(value)) return "Fecha";
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) return "UUID";
      return "Texto";
    }
    return "Texto";
  };

  const inferTypeFromString = (value: string): string => {
    if (/^\d+$/.test(value)) return "Entero";
    if (/^\d+\.\d+$/.test(value)) return "Decimal";
    if (/^(true|false)$/i.test(value)) return "Booleano";
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) return "Fecha";
    return "Texto";
  };

  // Step 1: Create data_product
  const step1Mutation = useMutation({
    mutationFn: async (data: Step1Data) => {
      if (!activeOrgId) throw new Error("No hay organización activa");

      const { data: product, error } = await supabase
        .from("data_products")
        .insert({
          name: data.originName,
          description: data.originDescription,
          version: "1.0",
        })
        .select("id")
        .single();

      if (error) throw error;
      return product.id;
    },
    onSuccess: (id) => {
      setProductId(id);
      setCurrentStep(2);
      if (!step4Data.publicName) {
        setStep4Data((prev) => ({ ...prev, publicName: step1Data.originName }));
      }
      toast.success("Configuración de origen guardada correctamente");
    },
    onError: (error: Error) => {
      console.error("Error creating product:", error);
      toast.error("Error al guardar el origen", { description: error.message });
    },
  });

  // Final publish: Create data_asset + update product schema
  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!activeOrgId || !user || !productId) {
        throw new Error("Datos incompletos");
      }

      const schemaDefinition = {
        columns: step2Data.schemaFields
          .filter((f) => f.field.trim())
          .map((f) => ({
            field: f.field.trim(),
            type: f.type,
            description: f.description.trim(),
          })),
      };

      await supabase
        .from("data_products")
        .update({
          name: step4Data.publicName,
          description: step4Data.description,
          category: step4Data.category,
          schema_definition: schemaDefinition,
        })
        .eq("id", productId);

      const validHeaders = step1Data.headers.filter((h) => h.key.trim() && h.value.trim());
      const apiConfig = {
        api_url: step1Data.apiUrl.trim(),
        api_headers: validHeaders.reduce(
          (acc, h) => ({ ...acc, [h.key.trim()]: h.value.trim() }),
          {} as Record<string, string>
        ),
      };

      // Build access_policy from step 3 — Pontus-X standard
      const accessPolicy = {
        permissions: step3Data.permissions.map((r) => r.label),
        prohibitions: step3Data.prohibitions.map((r) => r.label),
        obligations: step3Data.obligations.map((r) => r.label),
        terms_url: step3Data.termsUrl.trim() || null,
        allowed_wallets: step3Data.allowedList.map((o) => ({
          org_id: o.orgId,
          org_name: o.orgName,
          wallet_address: o.walletAddress,
        })),
        denied_wallets: step3Data.deniedList.map((o) => ({
          org_id: o.orgId,
          org_name: o.orgName,
          wallet_address: o.walletAddress,
        })),
        access_timeout_days: step3Data.accessTimeout,
      };

      const { data: asset, error } = await supabase
        .from("data_assets")
        .insert({
          product_id: productId,
          subject_org_id: activeOrgId,
          holder_org_id: activeOrgId,
          status: autoApproveAssets ? "active" : "pending",
          pricing_model: step4Data.pricingModel,
          price: step4Data.pricingModel === "free" ? 0 : step4Data.price,
          currency: "EUR",
          is_public_marketplace: true,
          custom_metadata: {
            ...apiConfig,
            quality_metrics: {
              completeness: 99,
              accuracy: 98,
              timeliness: 97,
              consistency: 96,
            },
            published_by: user.id,
            published_at: new Date().toISOString(),
            language: step4Data.language,
            connection_type: "api_gateway",
            access_policy: accessPolicy,
          },
        } as any)
        .select("id")
        .single();

      if (error) throw error;
      return asset.id;
    },
    onSuccess: (assetId) => {
      const msg = autoApproveAssets
        ? "Dataset publicado exitosamente en el catálogo."
        : "Dataset enviado a revisión técnica. Se le notificará cuando esté disponible en el catálogo.";
      toast.success(msg, { duration: 6000 });
      navigate("/data");
    },
    onError: (error: Error) => {
      console.error("Error publishing dataset:", error);
      toast.error("Error al publicar", { description: error.message });
    },
  });

  const handleStep1Submit = () => {
    if (!step1Data.originName.trim()) {
      toast.error("El nombre del origen es obligatorio");
      return;
    }
    if (!step1Data.apiUrl.trim()) {
      toast.error("La URL de la API es obligatoria");
      return;
    }
    step1Mutation.mutate(step1Data);
  };

  const handlePublish = () => {
    if (maintenanceMode) {
      toast.error("Sistema en mantenimiento. La publicación está temporalmente desactivada.");
      return;
    }
    if (!step4Data.publicName.trim()) {
      toast.error("El nombre público es obligatorio");
      return;
    }
    if (!step4Data.category) {
      toast.error("Selecciona una categoría");
      return;
    }
    if (!step4Data.language) {
      toast.error("Selecciona el idioma del dataset");
      return;
    }
    if (!step4Data.acceptedTerms || !step4Data.acceptedDataPolicy) {
      toast.error("Debes aceptar los términos y la política de datos");
      return;
    }
    publishMutation.mutate();
  };

  const isStep1Valid = step1Data.originName.trim().length > 0 && step1Data.apiUrl.trim().length > 0;
  const isStep2Valid = step2Data.schemaFields.some((f) => f.field.trim());
  const isStep4Valid =
    step4Data.publicName.trim() &&
    step4Data.category &&
    step4Data.language &&
    step4Data.acceptedTerms &&
    step4Data.acceptedDataPolicy;

  // Validación interna de seguridad: redirigir si no hay org activa
  if (!activeOrgId) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {maintenanceMode && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription className="flex items-center gap-2">
              <Lock className="h-4 w-4 shrink-0" />
              Sistema en mantenimiento programado. La publicación de datasets está temporalmente desactivada.
            </AlertDescription>
          </Alert>
        )}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/datos")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Mis Datos
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Publicar Dataset</h1>
              <p className="text-muted-foreground">
                Conecta tu API al ecosistema de ProcureData
              </p>
            </div>
          </div>
        </motion.div>

        {/* Organization Context */}
        {activeOrg && (
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Publicando como:{" "}
              <span className="font-semibold">{activeOrg.name}</span>
              <Badge variant="outline" className="ml-2">
                {activeOrg.type === "consumer"
                  ? "Consumidor"
                  : activeOrg.type === "provider"
                  ? "Proveedor"
                  : "Poseedor de Datos"}
              </Badge>
            </AlertDescription>
          </Alert>
        )}

        {/* Security Note */}
        <Alert className="mb-6 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
          <Lock className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800 dark:text-emerald-300">
            ProcureData no almacena sus datos. Solo facilitamos la conexión segura entre su API y el consumidor autorizado.
          </AlertDescription>
        </Alert>

        {/* Stepper */}
        <div className="mb-8">
          <OnboardingStepper steps={STEPS} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* ===== STEP 1: Fuente de Datos (API) ===== */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-primary" />
                    Paso 1: Fuente de Datos (API)
                  </CardTitle>
                  <CardDescription>
                    Define el endpoint y la autenticación de tu fuente de datos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="originName">Nombre del Origen *</Label>
                    <Input
                      id="originName"
                      placeholder="Ej: API ERP - Inventario 2024"
                      value={step1Data.originName}
                      onChange={(e) =>
                        setStep1Data((prev) => ({ ...prev, originName: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Identificador interno para tu referencia
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originDescription">Descripción del Origen</Label>
                    <Textarea
                      id="originDescription"
                      placeholder="Describe brevemente la fuente de estos datos..."
                      rows={3}
                      value={step1Data.originDescription}
                      onChange={(e) =>
                        setStep1Data((prev) => ({
                          ...prev,
                          originDescription: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <Separator />

                  {/* API URL */}
                  <div className="space-y-2">
                    <Label htmlFor="apiUrl">URL de la API *</Label>
                    <Input
                      id="apiUrl"
                      placeholder="https://api.ejemplo.com/v1/datos"
                      value={step1Data.apiUrl}
                      onChange={(e) =>
                        setStep1Data((prev) => ({ ...prev, apiUrl: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Endpoint GET desde el que los consumidores autorizados recibirán los datos
                    </p>
                  </div>

                  {/* Custom Headers */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Headers Personalizados</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addHeader}>
                        <Plus className="h-3 w-3 mr-1" />
                        Añadir Header
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {step1Data.headers.map((header, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder="Key (ej: Authorization)"
                            value={header.key}
                            onChange={(e) => updateHeader(index, "key", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            placeholder="Value (ej: Bearer token...)"
                            value={header.value}
                            onChange={(e) => updateHeader(index, "value", e.target.value)}
                            className="flex-1"
                          />
                          {step1Data.headers.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeHeader(index)}
                              className="shrink-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Los headers se almacenan de forma segura y se envían únicamente en las llamadas autorizadas
                    </p>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={handleStep1Submit}
                      disabled={!isStep1Valid || step1Mutation.isPending}
                    >
                      {step1Mutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          Continuar
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ===== STEP 2: Esquema de Datos Técnico ===== */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Paso 2: Esquema de Datos Técnico
                  </CardTitle>
                  <CardDescription>
                    Define la estructura que verán los consumidores al consultar tu API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Schema Assistant */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4 text-primary" />
                      Asistente de Esquema
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Sube un archivo JSON o CSV de ejemplo y detectaremos los campos automáticamente. También puedes definirlos manualmente.
                    </p>
                    <div className="flex gap-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json,.csv"
                        className="hidden"
                        onChange={handleSchemaFileUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Cargar JSON / CSV
                      </Button>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileJson className="h-3.5 w-3.5" />
                        <span>.json</span>
                        <FileSpreadsheet className="h-3.5 w-3.5 ml-2" />
                        <span>.csv</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Manual Schema Table */}
                  <div className="space-y-3">
                    <Label>Definición de Campos</Label>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campo *</TableHead>
                          <TableHead>Tipo *</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead className="w-[50px]" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {step2Data.schemaFields.map((field, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Input
                                placeholder="nombre_campo"
                                value={field.field}
                                onChange={(e) => updateSchemaField(index, "field", e.target.value)}
                                className="font-mono text-sm"
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                value={field.type}
                                onValueChange={(val) => updateSchemaField(index, "type", val)}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {FIELD_TYPES.map((t) => (
                                    <SelectItem key={t} value={t}>
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input
                                placeholder="Descripción del campo..."
                                value={field.description}
                                onChange={(e) => updateSchemaField(index, "description", e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              {step2Data.schemaFields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeSchemaField(index)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button type="button" variant="outline" size="sm" onClick={addSchemaField}>
                      <Plus className="h-3 w-3 mr-1" />
                      Añadir Campo
                    </Button>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Atrás
                    </Button>
                    <Button
                      onClick={() => {
                        if (!isStep2Valid) {
                          toast.error("Define al menos un campo en el esquema");
                          return;
                        }
                        setCurrentStep(3);
                      }}
                      disabled={!isStep2Valid}
                    >
                      Continuar
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ===== STEP 3: Políticas de Acceso Pontus-X ===== */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Paso 3: Políticas de Acceso Pontus-X
                  </CardTitle>
                  <CardDescription>
                    Define las reglas de gobernanza y condiciones de uso para tu dataset
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">

                  {/* === PERMISSIONS (Green) === */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      Permisos — Lo que el usuario PUEDE hacer
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_PERMISSIONS.map((q) => (
                        <Badge
                          key={q.id}
                          variant="outline"
                          className={`cursor-pointer transition-all ${
                            step3Data.permissions.some((r) => r.label === q.label)
                              ? "bg-green-100 border-green-400 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                              : "hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-950/30"
                          }`}
                          onClick={() => {
                            if (step3Data.permissions.some((r) => r.label === q.label)) {
                              const rule = step3Data.permissions.find((r) => r.label === q.label);
                              if (rule) removeRule("permissions", rule.id);
                            } else {
                              addRule("permissions", q.label);
                            }
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {q.label}
                        </Badge>
                      ))}
                    </div>
                    {step3Data.permissions.length > 0 && (
                      <div className="space-y-1.5 mt-2">
                        {step3Data.permissions.map((rule) => (
                          <div key={rule.id} className="flex items-center justify-between rounded-md border border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20 px-3 py-2">
                            <span className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                              {rule.label}
                            </span>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeRule("permissions", rule.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Añadir permiso personalizado..."
                        value={customRuleInputs.permissions}
                        onChange={(e) => setCustomRuleInputs((p) => ({ ...p, permissions: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomRule("permissions"))}
                        className="text-sm"
                      />
                      <Button variant="outline" size="sm" onClick={() => addCustomRule("permissions")} disabled={!customRuleInputs.permissions.trim()}>
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* === PROHIBITIONS (Red) === */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 font-semibold text-red-700 dark:text-red-400">
                      <XCircle className="h-5 w-5" />
                      Prohibiciones — Lo que el usuario NO PUEDE hacer
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_PROHIBITIONS.map((q) => (
                        <Badge
                          key={q.id}
                          variant="outline"
                          className={`cursor-pointer transition-all ${
                            step3Data.prohibitions.some((r) => r.label === q.label)
                              ? "bg-red-100 border-red-400 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                              : "hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-950/30"
                          }`}
                          onClick={() => {
                            if (step3Data.prohibitions.some((r) => r.label === q.label)) {
                              const rule = step3Data.prohibitions.find((r) => r.label === q.label);
                              if (rule) removeRule("prohibitions", rule.id);
                            } else {
                              addRule("prohibitions", q.label);
                            }
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {q.label}
                        </Badge>
                      ))}
                    </div>
                    {step3Data.prohibitions.length > 0 && (
                      <div className="space-y-1.5 mt-2">
                        {step3Data.prohibitions.map((rule) => (
                          <div key={rule.id} className="flex items-center justify-between rounded-md border border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20 px-3 py-2">
                            <span className="flex items-center gap-2 text-sm">
                              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                              {rule.label}
                            </span>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeRule("prohibitions", rule.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Añadir prohibición personalizada..."
                        value={customRuleInputs.prohibitions}
                        onChange={(e) => setCustomRuleInputs((p) => ({ ...p, prohibitions: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomRule("prohibitions"))}
                        className="text-sm"
                      />
                      <Button variant="outline" size="sm" onClick={() => addCustomRule("prohibitions")} disabled={!customRuleInputs.prohibitions.trim()}>
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* === OBLIGATIONS (Blue) === */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-400">
                      <Shield className="h-5 w-5" />
                      Obligaciones — Compromisos adicionales
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_OBLIGATIONS.map((q) => (
                        <Badge
                          key={q.id}
                          variant="outline"
                          className={`cursor-pointer transition-all ${
                            step3Data.obligations.some((r) => r.label === q.label)
                              ? "bg-blue-100 border-blue-400 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                              : "hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/30"
                          }`}
                          onClick={() => {
                            if (step3Data.obligations.some((r) => r.label === q.label)) {
                              const rule = step3Data.obligations.find((r) => r.label === q.label);
                              if (rule) removeRule("obligations", rule.id);
                            } else {
                              addRule("obligations", q.label);
                            }
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {q.label}
                        </Badge>
                      ))}
                    </div>
                    {step3Data.obligations.length > 0 && (
                      <div className="space-y-1.5 mt-2">
                        {step3Data.obligations.map((rule) => (
                          <div key={rule.id} className="flex items-center justify-between rounded-md border border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20 px-3 py-2">
                            <span className="flex items-center gap-2 text-sm">
                              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              {rule.label}
                            </span>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeRule("obligations", rule.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Añadir obligación personalizada..."
                        value={customRuleInputs.obligations}
                        onChange={(e) => setCustomRuleInputs((p) => ({ ...p, obligations: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomRule("obligations"))}
                        className="text-sm"
                      />
                      <Button variant="outline" size="sm" onClick={() => addCustomRule("obligations")} disabled={!customRuleInputs.obligations.trim()}>
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* === T&C URL === */}
                  <div className="space-y-2">
                    <Label htmlFor="termsUrl" className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      Enlace a Términos y Condiciones (Opcional)
                    </Label>
                    <Input
                      id="termsUrl"
                      placeholder="https://ejemplo.com/terminos"
                      value={step3Data.termsUrl}
                      onChange={(e) => setStep3Data((prev) => ({ ...prev, termsUrl: e.target.value }))}
                    />
                    {step3Data.termsUrl && !isValidUrl(step3Data.termsUrl) && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        Introduce una URL válida (ej: https://ejemplo.com/terminos)
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Introduce una URL resoluble a su documento legal de T&C
                    </p>
                  </div>

                  <Separator />

                  {/* === ACCESS CONTROL — Pontus-X Standard === */}
                  <div className="space-y-6">
                    <h3 className="flex items-center gap-2 font-semibold text-foreground">
                      <Users className="h-5 w-5 text-primary" />
                      Control de Acceso (Pontus-X)
                    </h3>

                    {/* BLOCK 1: Whitelist */}
                    <div className="space-y-3 p-4 border rounded-lg bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">Organizaciones con Acceso Permitido (Whitelist)</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Si añades organizaciones aquí, el activo se vuelve <strong>PRIVADO</strong>. Solo ellas podrán verlo y solicitarlo. La lista de denegados se ignorará automáticamente.
                      </p>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar organización por nombre..."
                          value={allowedSearchQuery}
                          onChange={(e) => setAllowedSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {allowedSearchOrgs && allowedSearchOrgs.length > 0 && allowedSearchQuery.trim().length >= 2 && (
                        <div className="border rounded-lg max-h-[180px] overflow-auto bg-background">
                          {allowedSearchOrgs
                            .filter((org) => !step3Data.allowedList.some((a) => a.orgId === org.id))
                            .map((org) => (
                              <div
                                key={org.id}
                                className="flex items-center justify-between px-3 py-2 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                                onClick={() => {
                                  setStep3Data((prev) => ({
                                    ...prev,
                                    allowedList: [...prev.allowedList, { orgId: org.id, orgName: org.name, walletAddress: org.wallet_address || "" }],
                                  }));
                                  setAllowedSearchQuery("");
                                }}
                              >
                                <span className="text-sm">{org.name}</span>
                                <code className="text-[10px] font-mono text-muted-foreground">{org.wallet_address || "Sin wallet"}</code>
                              </div>
                            ))}
                        </div>
                      )}
                      {step3Data.allowedList.length > 0 && (
                        <div className="space-y-1.5">
                          {step3Data.allowedList.map((org) => (
                            <div key={org.orgId} className="flex items-center justify-between rounded-md border border-emerald-200 dark:border-emerald-800 px-3 py-2 bg-emerald-50/50 dark:bg-emerald-950/20">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-medium">{org.orgName}</span>
                                <code className="text-[10px] font-mono text-muted-foreground">{org.walletAddress || "Sin wallet"}</code>
                              </div>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setStep3Data((prev) => ({ ...prev, allowedList: prev.allowedList.filter((a) => a.orgId !== org.orgId) }))}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      {step3Data.allowedList.length === 0 && (
                        <p className="text-xs text-muted-foreground italic">Sin organizaciones añadidas — el activo no será privado por whitelist.</p>
                      )}
                    </div>

                    <Separator />

                    {/* BLOCK 2: Blacklist */}
                    <div className={`space-y-3 p-4 border rounded-lg ${step3Data.allowedList.length > 0 ? "opacity-50 pointer-events-none" : ""} bg-red-50/30 dark:bg-red-950/10 border-red-200 dark:border-red-800`}>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <h4 className="font-semibold text-red-800 dark:text-red-300">Organizaciones con Acceso Denegado (Blacklist)</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Solo efectivo si la lista de permitidos está vacía. El activo será <strong>PÚBLICO</strong> para todos, excepto para las organizaciones listadas aquí.
                      </p>
                      {step3Data.allowedList.length > 0 && (
                        <Alert className="border-amber-300 bg-amber-50/50 dark:bg-amber-950/20">
                          <Info className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-xs text-amber-800 dark:text-amber-300">
                            La whitelist tiene prioridad. Esta sección se ignora mientras haya organizaciones en la lista de permitidos.
                          </AlertDescription>
                        </Alert>
                      )}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar organización por nombre..."
                          value={deniedSearchQuery}
                          onChange={(e) => setDeniedSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {deniedSearchOrgs && deniedSearchOrgs.length > 0 && deniedSearchQuery.trim().length >= 2 && (
                        <div className="border rounded-lg max-h-[180px] overflow-auto bg-background">
                          {deniedSearchOrgs
                            .filter((org) => !step3Data.deniedList.some((a) => a.orgId === org.id))
                            .map((org) => (
                              <div
                                key={org.id}
                                className="flex items-center justify-between px-3 py-2 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                                onClick={() => {
                                  setStep3Data((prev) => ({
                                    ...prev,
                                    deniedList: [...prev.deniedList, { orgId: org.id, orgName: org.name, walletAddress: org.wallet_address || "" }],
                                  }));
                                  setDeniedSearchQuery("");
                                }}
                              >
                                <span className="text-sm">{org.name}</span>
                                <code className="text-[10px] font-mono text-muted-foreground">{org.wallet_address || "Sin wallet"}</code>
                              </div>
                            ))}
                        </div>
                      )}
                      {step3Data.deniedList.length > 0 && (
                        <div className="space-y-1.5">
                          {step3Data.deniedList.map((org) => (
                            <div key={org.orgId} className="flex items-center justify-between rounded-md border border-red-200 dark:border-red-800 px-3 py-2 bg-red-50/50 dark:bg-red-950/20">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-medium">{org.orgName}</span>
                                <code className="text-[10px] font-mono text-muted-foreground">{org.walletAddress || "Sin wallet"}</code>
                              </div>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setStep3Data((prev) => ({ ...prev, deniedList: prev.deniedList.filter((a) => a.orgId !== org.orgId) }))}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      {step3Data.deniedList.length === 0 && (
                        <p className="text-xs text-muted-foreground italic">Sin organizaciones denegadas — acceso público total.</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* === ACCESS TIMEOUT === */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 font-semibold text-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      Caducidad del Servicio (Timeout)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Define cuánto tiempo podrá el consumidor acceder a los datos antes de que expire su licencia.
                    </p>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min={1}
                        max={3650}
                        value={step3Data.accessTimeout}
                        onChange={(e) =>
                          setStep3Data((prev) => ({
                            ...prev,
                            accessTimeout: parseInt(e.target.value) || 90,
                          }))
                        }
                        className="w-32"
                      />
                      <span className="text-sm text-muted-foreground">días</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Valor por defecto: 90 días. Los consumidores verán este periodo en la licencia de uso.
                    </p>
                  </div>


                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Atrás
                    </Button>
                    <Button
                      onClick={() => {
                        if (step3Data.termsUrl && !isValidUrl(step3Data.termsUrl)) {
                          toast.error("La URL de T&C no es válida");
                          return;
                        }
                        setCurrentStep(4);
                      }}
                    >
                      Continuar
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ===== STEP 4: Publicación en Marketplace ===== */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Basic Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Paso 4: Publicación en Marketplace
                  </CardTitle>
                  <CardDescription>
                    Define cómo aparecerá tu dataset en el catálogo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="publicName">Nombre Comercial *</Label>
                    <Input
                      id="publicName"
                      placeholder="Ej: Índice de Precios Industriales Q1 2024"
                      value={step4Data.publicName}
                      onChange={(e) =>
                        setStep4Data((prev) => ({ ...prev, publicName: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe el contenido, fuentes y utilidad de los datos..."
                      rows={4}
                      value={step4Data.description}
                      onChange={(e) =>
                        setStep4Data((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Select
                      value={step4Data.category}
                      onValueChange={(value) =>
                        setStep4Data((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              <span>{cat.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma del Dataset *</Label>
                    <Select
                      value={step4Data.language}
                      onValueChange={(value) =>
                        setStep4Data((prev) => ({ ...prev, language: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Modelo de Precio
                  </CardTitle>
                  <CardDescription>
                    Define cómo quieres monetizar tus datos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {PRICING_MODELS.map((model) => (
                      <div
                        key={model.value}
                        onClick={() =>
                          setStep4Data((prev) => ({
                            ...prev,
                            pricingModel: model.value as Step4Data["pricingModel"],
                            price: model.value === "free" ? 0 : prev.price,
                          }))
                        }
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          step4Data.pricingModel === model.value
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="font-medium">{model.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {model.description}
                        </div>
                      </div>
                    ))}
                  </div>

                  {step4Data.pricingModel !== "free" && (
                    <div className="space-y-2 pt-4">
                      <Label htmlFor="price">
                        Precio (€)
                        {step4Data.pricingModel === "subscription" && " /mes"}
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        min={0}
                        step={0.01}
                        placeholder="0.00"
                        value={step4Data.price || ""}
                        onChange={(e) =>
                          setStep4Data((prev) => ({
                            ...prev,
                            price: parseFloat(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Terms Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Términos de Uso
                  </CardTitle>
                  <CardDescription>
                    Acepta las condiciones para publicar en el marketplace
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={step4Data.acceptedTerms}
                      onCheckedChange={(checked) =>
                        setStep4Data((prev) => ({
                          ...prev,
                          acceptedTerms: checked === true,
                        }))
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="terms" className="cursor-pointer">
                        Acepto los Términos y Condiciones de ProcureData
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Incluyendo las obligaciones como proveedor de datos y las
                        políticas de uso del marketplace.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataPolicy"
                      checked={step4Data.acceptedDataPolicy}
                      onCheckedChange={(checked) =>
                        setStep4Data((prev) => ({
                          ...prev,
                          acceptedDataPolicy: checked === true,
                        }))
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="dataPolicy" className="cursor-pointer">
                        Confirmo que tengo derecho a compartir estos datos
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Declaro que los datos cumplen con GDPR y no contienen
                        información personal sin consentimiento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Atrás
                </Button>
                <Button
                  onClick={handlePublish}
                  disabled={!isStep4Valid || publishMutation.isPending}
                >
                  {publishMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Enviar para Validación Técnica
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
