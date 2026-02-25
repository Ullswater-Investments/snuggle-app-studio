import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { generateODRLPolicy } from "@/utils/odrlGenerator";
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
  { id: "COMMERCIAL_USE", label: "COMMERCIAL_USE" },
  { id: "INTERNAL_ANALYSIS", label: "INTERNAL_ANALYSIS" },
  { id: "DERIVATIVE_WORKS", label: "DERIVATIVE_WORKS" },
  { id: "SYSTEM_INTEGRATION", label: "SYSTEM_INTEGRATION" },
  { id: "RESEARCH_USE", label: "RESEARCH_USE" },
];

const QUICK_PROHIBITIONS: PolicyRule[] = [
  { id: "NO_REDISTRIBUTION", label: "NO_REDISTRIBUTION" },
  { id: "NO_REVERSE_ENGINEERING", label: "NO_REVERSE_ENGINEERING" },
  { id: "NO_RESALE", label: "NO_RESALE" },
  { id: "NO_PUBLIC_DISCLOSURE", label: "NO_PUBLIC_DISCLOSURE" },
];

const QUICK_OBLIGATIONS: PolicyRule[] = [
  { id: "ATTRIBUTION_REQUIRED", label: "ATTRIBUTION_REQUIRED" },
  { id: "GDPR_COMPLIANCE", label: "GDPR_COMPLIANCE" },
  { id: "NOTIFY_PROVIDER", label: "NOTIFY_PROVIDER" },
  { id: "LICENSE_RENEWAL", label: "LICENSE_RENEWAL" },
];

const LANGUAGE_OPTIONS = [
  { value: "es", flag: "🇪🇸" },
  { value: "en", flag: "🇬🇧" },
  { value: "de", flag: "🇩🇪" },
  { value: "fr", flag: "🇫🇷" },
  { value: "pt", flag: "🇵🇹" },
  { value: "it", flag: "🇮🇹" },
];

const CATEGORY_OPTIONS = [
  { value: "Compliance", icon: "🛡️" },
  { value: "ESG", icon: "🌿" },
  { value: "Ops", icon: "⚙️" },
  { value: "Market", icon: "📊" },
  { value: "R&D", icon: "🔬" },
  { value: "Logistics", icon: "🚚" },
  { value: "Finance", icon: "💰" },
  { value: "HR", icon: "👥" },
  { value: "IoT", icon: "📡" },
  { value: "Otros", icon: "📦" },
];

const PRICING_MODEL_VALUES = ["free", "subscription", "one_time", "usage"] as const;

const FIELD_TYPES = [
  "Texto",
  "Numero",
  "Fecha",
  "Booleano",
  "UUID",
  "JSON",
  "Array",
  "Timestamp",
  "Decimal",
  "Entero",
];

export default function PublishDataset() {
  const navigate = useNavigate();
  const { activeOrg, activeOrgId, isDemo } = useOrganizationContext();
  const { user } = useAuth();
  const { autoApproveAssets, maintenanceMode } = useGovernanceSettings();
  const { t } = useTranslation('publish');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const STEPS = [
    { id: 1, title: t('stepper.step1.title'), description: t('stepper.step1.description') },
    { id: 2, title: t('stepper.step2.title'), description: t('stepper.step2.description') },
    { id: 3, title: t('stepper.step3.title'), description: t('stepper.step3.description') },
    { id: 4, title: t('stepper.step4.title'), description: t('stepper.step4.description') },
  ];

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
          const sample = Array.isArray(parsed) ? parsed[0] : parsed;
          if (sample && typeof sample === "object") {
            detectedFields = Object.entries(sample).map(([key, value]) => ({
              field: key,
              type: inferType(value),
              description: "",
            }));
          }
        } else if (file.name.endsWith(".csv")) {
          const lines = content.split("\n").filter((l) => l.trim());
          if (lines.length > 0) {
            const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
            const secondRow = lines.length > 1 ? lines[1].split(",").map((v) => v.trim().replace(/^"|"$/g, "")) : [];
            detectedFields = headers.map((h, i) => ({
              field: h,
              type: secondRow[i] ? inferTypeFromString(secondRow[i]) : "Texto",
              description: "",
            }));
          }
        }
      } catch {
        toast.error(t('step2.fileErrors.parseError'));
        return;
      }

      if (detectedFields.length > 0) {
        setStep2Data({ schemaFields: detectedFields });
        toast.success(t('step2.fieldsDetected', { count: detectedFields.length }));
      } else {
        toast.error(t('step2.fileErrors.noFields'));
      }
    };

    reader.readAsText(file);
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
      toast.success(t('step1.success'));
    },
    onError: (error: Error) => {
      console.error("Error creating product:", error);
      toast.error(t('step1.error'), { description: error.message });
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

      // Build access_policy from step 3 — UI labels only
      const accessPolicy = {
        permissions: step3Data.permissions.map((r) => r.label),
        prohibitions: step3Data.prohibitions.map((r) => r.label),
        obligations: step3Data.obligations.map((r) => r.label),
        terms_url: step3Data.termsUrl.trim() || null,
      };

      // Build access_control — Smart Contract / Pontus-X
      const accessControl = {
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

      // --- Fase 1: INSERT sin ODRL ---
      const initialMetadata = {
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
        access_control: accessControl,
        additionalInformation: {},
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
          custom_metadata: initialMetadata,
        } as any)
        .select("id, custom_metadata")
        .single();

      if (error) throw error;

      // --- Fase 2: Generar ODRL con ID real + wallet DID ---
      const { data: orgData } = await supabase
        .from("organizations")
        .select("wallet_address")
        .eq("id", activeOrgId)
        .single();

      const providerWallet = orgData?.wallet_address || "";

      const odrlPolicy = generateODRLPolicy(
        step3Data.permissions.map((r) => r.label),
        step3Data.prohibitions.map((r) => r.label),
        step3Data.obligations.map((r) => r.label),
        providerWallet,
        asset.id,
        step3Data.termsUrl?.trim() || undefined
      );

      // --- Fase 3: UPDATE con ODRL ---
      const currentMeta = (asset.custom_metadata as Record<string, any>) || {};
      const { error: updateError } = await supabase
        .from("data_assets")
        .update({
          custom_metadata: {
            ...currentMeta,
            additionalInformation: { odrlPolicy },
          },
        } as any)
        .eq("id", asset.id);

      if (updateError) throw updateError;

      return asset.id;
    },
    onSuccess: (assetId) => {
      const msg = autoApproveAssets
        ? t('step4.successAutoApprove')
        : t('step4.successReview');
      toast.success(msg, { duration: 6000 });
      navigate("/data");
    },
    onError: (error: Error) => {
      console.error("Error publishing dataset:", error);
      toast.error(t('step4.errorPublish'), { description: error.message });
    },
  });

  const handleStep1Submit = () => {
    if (!step1Data.originName.trim()) {
      toast.error(t('step1.validation.nameRequired'));
      return;
    }
    if (!step1Data.apiUrl.trim()) {
      toast.error(t('step1.validation.urlRequired'));
      return;
    }
    step1Mutation.mutate(step1Data);
  };

  const handlePublish = () => {
    if (maintenanceMode) {
      toast.error(t('step4.validation.maintenanceMode'));
      return;
    }
    if (!step4Data.publicName.trim()) {
      toast.error(t('step4.validation.nameRequired'));
      return;
    }
    if (!step4Data.category) {
      toast.error(t('step4.validation.categoryRequired'));
      return;
    }
    if (!step4Data.language) {
      toast.error(t('step4.validation.languageRequired'));
      return;
    }
    if (!step4Data.acceptedTerms || !step4Data.acceptedDataPolicy) {
      toast.error(t('step4.validation.termsRequired'));
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

  // Demo mode: show blocking message
  if (isDemo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <CardTitle>{t('demo.title')}</CardTitle>
            <CardDescription>
              {t('demo.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => navigate("/dashboard")}>
              {t('demo.backButton')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {maintenanceMode && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription className="flex items-center gap-2">
              <Lock className="h-4 w-4 shrink-0" />
              {t('alerts.maintenance')}
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
            {t('header.backToData')}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t('header.title')}</h1>
              <p className="text-muted-foreground">
                {t('header.subtitle')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Organization Context */}
        {activeOrg && (
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t('alerts.publishingAs')}{" "}
              <span className="font-semibold">{activeOrg.name}</span>
              <Badge variant="outline" className="ml-2">
                {t(`alerts.orgTypes.${activeOrg.type === "data_holder" ? "holder" : activeOrg.type}`)}
              </Badge>
            </AlertDescription>
          </Alert>
        )}

        {/* Security Note */}
        <Alert className="mb-6 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
          <Lock className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800 dark:text-emerald-300">
            {t('alerts.securityNote')}
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
                    {t('step1.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('step1.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="originName">{t('step1.originName.label')}</Label>
                    <Input
                      id="originName"
                      placeholder={t('step1.originName.placeholder')}
                      value={step1Data.originName}
                      onChange={(e) =>
                        setStep1Data((prev) => ({ ...prev, originName: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {t('step1.originName.hint')}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originDescription">{t('step1.originDescription.label')}</Label>
                    <Textarea
                      id="originDescription"
                      placeholder={t('step1.originDescription.placeholder')}
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
                    <Label htmlFor="apiUrl">{t('step1.apiUrl.label')}</Label>
                    <Input
                      id="apiUrl"
                      placeholder={t('step1.apiUrl.placeholder')}
                      value={step1Data.apiUrl}
                      onChange={(e) =>
                        setStep1Data((prev) => ({ ...prev, apiUrl: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {t('step1.apiUrl.hint')}
                    </p>
                  </div>

                  {/* Custom Headers */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{t('step1.headers.label')}</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addHeader}>
                        <Plus className="h-3 w-3 mr-1" />
                        {t('step1.headers.addButton')}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {step1Data.headers.map((header, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder={t('step1.headers.keyPlaceholder')}
                            value={header.key}
                            onChange={(e) => updateHeader(index, "key", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            placeholder={t('step1.headers.valuePlaceholder')}
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
                      {t('step1.headers.hint')}
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
                          {t('step1.saving')}
                        </>
                      ) : (
                        <>
                          {t('step1.continue')}
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
                    {t('step2.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('step2.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Schema Assistant */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4 text-primary" />
                      {t('step2.assistant.label')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('step2.assistant.description')}
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
                        {t('step2.assistant.uploadButton')}
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
                    <Label>{t('step2.fields.label')}</Label>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('step2.fields.fieldHeader')}</TableHead>
                          <TableHead>{t('step2.fields.typeHeader')}</TableHead>
                          <TableHead>{t('step2.fields.descHeader')}</TableHead>
                          <TableHead className="w-[50px]" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {step2Data.schemaFields.map((field, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Input
                                placeholder={t('step2.fields.fieldPlaceholder')}
                                value={field.field}
                                onChange={(e) => updateSchemaField(index, "field", e.target.value)}
                                className="font-mono text-sm"
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                value={field.type}
                                onValueChange={(value) => updateSchemaField(index, "type", value)}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {FIELD_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {t(`step2.fieldTypes.${type}`, type)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input
                                placeholder={t('step2.fields.descPlaceholder')}
                                value={field.description}
                                onChange={(e) => updateSchemaField(index, "description", e.target.value)}
                                className="text-sm"
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
                      {t('step2.fields.addButton')}
                    </Button>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t('navigation.back')}
                    </Button>
                    <Button
                      onClick={() => {
                        if (!isStep2Valid) {
                          toast.error(t('step2.validation.minOneField'));
                          return;
                        }
                        setCurrentStep(3);
                      }}
                      disabled={!isStep2Valid}
                    >
                      {t('navigation.continue')}
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
                    {t('step3.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('step3.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">

                  {/* === PERMISSIONS (Green) === */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      {t('step3.permissions.heading')}
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
                          {t(`step3.permissions.${q.label}`, q.label)}
                        </Badge>
                      ))}
                    </div>
                    {step3Data.permissions.length > 0 && (
                      <div className="space-y-1.5 mt-2">
                        {step3Data.permissions.map((rule) => (
                          <div key={rule.id} className="flex items-center justify-between rounded-md border border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20 px-3 py-2">
                            <span className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                              {t(`step3.permissions.${rule.label}`, rule.label)}
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
                        placeholder={t('step3.permissions.addCustom')}
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
                      {t('step3.prohibitions.heading')}
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
                          {t(`step3.prohibitions.${q.label}`, q.label)}
                        </Badge>
                      ))}
                    </div>
                    {step3Data.prohibitions.length > 0 && (
                      <div className="space-y-1.5 mt-2">
                        {step3Data.prohibitions.map((rule) => (
                          <div key={rule.id} className="flex items-center justify-between rounded-md border border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20 px-3 py-2">
                            <span className="flex items-center gap-2 text-sm">
                              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                              {t(`step3.prohibitions.${rule.label}`, rule.label)}
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
                        placeholder={t('step3.prohibitions.addCustom')}
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
                      {t('step3.obligations.heading')}
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
                          {t(`step3.obligations.${q.label}`, q.label)}
                        </Badge>
                      ))}
                    </div>
                    {step3Data.obligations.length > 0 && (
                      <div className="space-y-1.5 mt-2">
                        {step3Data.obligations.map((rule) => (
                          <div key={rule.id} className="flex items-center justify-between rounded-md border border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20 px-3 py-2">
                            <span className="flex items-center gap-2 text-sm">
                              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              {t(`step3.obligations.${rule.label}`, rule.label)}
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
                        placeholder={t('step3.obligations.addCustom')}
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
                      {t('step3.termsUrl.label')}
                    </Label>
                    <Input
                      id="termsUrl"
                      placeholder={t('step3.termsUrl.placeholder')}
                      value={step3Data.termsUrl}
                      onChange={(e) => setStep3Data((prev) => ({ ...prev, termsUrl: e.target.value }))}
                    />
                    {step3Data.termsUrl && !isValidUrl(step3Data.termsUrl) && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        {t('step3.termsUrl.invalidUrl')}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {t('step3.termsUrl.hint')}
                    </p>
                  </div>

                  <Separator />

                  {/* === ACCESS CONTROL — Pontus-X Standard === */}
                  <div className="space-y-6">
                    <h3 className="flex items-center gap-2 font-semibold text-foreground">
                      <Users className="h-5 w-5 text-primary" />
                      {t('step3.accessControl.heading')}
                    </h3>

                    {/* BLOCK 1: Whitelist */}
                    <div className="space-y-3 p-4 border rounded-lg bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">{t('step3.accessControl.whitelist')}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t('accessControl.whitelistHintLong')}
                      </p>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={t('step3.accessControl.searchPlaceholder')}
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
                                <code className="text-[10px] font-mono text-muted-foreground">{org.wallet_address || t('accessControl.noWallet')}</code>
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
                                <code className="text-[10px] font-mono text-muted-foreground">{org.walletAddress || t('accessControl.noWallet')}</code>
                              </div>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setStep3Data((prev) => ({ ...prev, allowedList: prev.allowedList.filter((a) => a.orgId !== org.orgId) }))}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      {step3Data.allowedList.length === 0 && (
                        <p className="text-xs text-muted-foreground italic">{t('accessControl.emptyWhitelist')}</p>
                      )}
                    </div>

                    <Separator />

                    {/* BLOCK 2: Blacklist */}
                    <div className={`space-y-3 p-4 border rounded-lg ${step3Data.allowedList.length > 0 ? "opacity-50 pointer-events-none" : ""} bg-red-50/30 dark:bg-red-950/10 border-red-200 dark:border-red-800`}>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <h4 className="font-semibold text-red-800 dark:text-red-300">{t('step3.accessControl.blacklist')}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t('accessControl.blacklistHintLong')}
                      </p>
                      {step3Data.allowedList.length > 0 && (
                        <Alert className="border-amber-300 bg-amber-50/50 dark:bg-amber-950/20">
                          <Info className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-xs text-amber-800 dark:text-amber-300">
                            {t('accessControl.blacklistDisabledWarning')}
                          </AlertDescription>
                        </Alert>
                      )}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={t('step3.accessControl.searchPlaceholder')}
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
                                <code className="text-[10px] font-mono text-muted-foreground">{org.wallet_address || t('accessControl.noWallet')}</code>
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
                                <code className="text-[10px] font-mono text-muted-foreground">{org.walletAddress || t('accessControl.noWallet')}</code>
                              </div>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setStep3Data((prev) => ({ ...prev, deniedList: prev.deniedList.filter((a) => a.orgId !== org.orgId) }))}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      {step3Data.deniedList.length === 0 && (
                        <p className="text-xs text-muted-foreground italic">{t('accessControl.emptyBlacklist')}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* === ACCESS TIMEOUT === */}
                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 font-semibold text-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      {t('accessTimeout.title')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('accessTimeout.description')}
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
                      <span className="text-sm text-muted-foreground">{t('accessTimeout.unit')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t('accessTimeout.defaultHint')}
                    </p>
                  </div>


                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t('navigation.back')}
                    </Button>
                    <Button
                      onClick={() => {
                        if (step3Data.termsUrl && !isValidUrl(step3Data.termsUrl)) {
                          toast.error(t('accessControl.termsUrlError'));
                          return;
                        }
                        setCurrentStep(4);
                      }}
                    >
                      {t('navigation.continue')}
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
                    {t('step4.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('step4.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="publicName">{t('step4.publicName.label')}</Label>
                    <Input
                      id="publicName"
                      placeholder={t('step4.publicName.placeholder')}
                      value={step4Data.publicName}
                      onChange={(e) =>
                        setStep4Data((prev) => ({ ...prev, publicName: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t('step4.descriptionField.label')}</Label>
                    <Textarea
                      id="description"
                      placeholder={t('step4.descriptionField.placeholder')}
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
                    <Label htmlFor="category">{t('step4.category.label')}</Label>
                    <Select
                      value={step4Data.category}
                      onValueChange={(value) =>
                        setStep4Data((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('step4.category.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              <span>{t(`step4.categories.${cat.value}`, cat.value)}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">{t('step4.language.label')}</Label>
                    <Select
                      value={step4Data.language}
                      onValueChange={(value) =>
                        setStep4Data((prev) => ({ ...prev, language: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('step4.language.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGE_OPTIONS.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{t(`step4.languages.${lang.value}`, lang.value)}</span>
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
                    {t('step4.pricing.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('step4.pricing.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {PRICING_MODEL_VALUES.map((modelValue) => (
                      <div
                        key={modelValue}
                        onClick={() =>
                          setStep4Data((prev) => ({
                            ...prev,
                            pricingModel: modelValue,
                            price: modelValue === "free" ? 0 : prev.price,
                          }))
                        }
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          step4Data.pricingModel === modelValue
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="font-medium">{t(`step4.pricing.models.${modelValue}.label`)}</div>
                        <div className="text-xs text-muted-foreground">
                          {t(`step4.pricing.models.${modelValue}.description`)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {step4Data.pricingModel !== "free" && (
                    <div className="space-y-2 pt-4">
                      <Label htmlFor="price">
                        {t('step4.pricing.priceLabel')}
                        {step4Data.pricingModel === "subscription" && ` ${t('step4.pricing.perMonth')}`}
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
                    {t('step4.terms.title')}
                  </CardTitle>
                  <CardDescription>
                    {t('step4.terms.description')}
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
                        {t('step4.terms.acceptTerms')}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {t('step4.terms.acceptTermsDesc')}
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
                        {t('step4.terms.acceptDataPolicy')}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {t('step4.terms.acceptDataPolicyDesc')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('navigation.back')}
                </Button>
                <Button
                  onClick={handlePublish}
                  disabled={!isStep4Valid || publishMutation.isPending}
                >
                  {publishMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t('step4.submitting')}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      {t('step4.submit')}
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