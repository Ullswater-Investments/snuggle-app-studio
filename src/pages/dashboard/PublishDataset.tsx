import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  dataAssetService,
  type CreateDataAssetRequest,
  type DataAssetSource,
} from "@/services/dataAssetService";
import type { ApiWallet } from "@/services/organizationService";
import { ApiError } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Info,
  Plus,
  Trash2,
  Lock,
  Link as LinkIcon,
  Settings,
  FileText,
  Globe,
  HardDrive,
  CheckCircle2,
  Wallet,
  X,
  Upload,
  Search,
  Shield,
  Users2,
  CircleX,
  Clock,
  DollarSign,
  Leaf,
  BarChart3,
  FlaskConical,
  Truck,
  Banknote,
  Radio,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

interface KeyValue {
  key: string;
  value: string;
}

interface Step1Data {
  sourceType: "url" | "ipfs";
  url: string;
  method: "GET" | "POST";
  queryParams: KeyValue[];
  headers: KeyValue[];
  cid: string;
}

interface SchemaField {
  field: string;
  type: string;
  description: string;
}

interface Step2Data {
  schemaFields: SchemaField[];
}

interface Step4Metadata {
  name: string;
  license: string;
  description: string;
  category: string;
  language: string;
}

type TimeoutUnit = "minutes" | "hours" | "days" | "weeks" | "months";

const TIMEOUT_UNIT_TO_SECONDS: Record<TimeoutUnit, number> = {
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2592000,
};

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

const TIMEOUT_PRESETS = [
  { label: "1h", value: 1, unit: "hours" as TimeoutUnit },
  { label: "24h", value: 24, unit: "hours" as TimeoutUnit },
  { label: "7d", value: 7, unit: "days" as TimeoutUnit },
  { label: "30d", value: 30, unit: "days" as TimeoutUnit },
  { label: "1 año", value: 365, unit: "days" as TimeoutUnit },
];

export type PricingModel = "free" | "subscription" | "oneTime" | "perUse";

interface Step3Data {
  pricingType: PricingModel;
  price: number;
  permanentAccess: boolean;
  timeoutValue: number;
  timeoutUnit: TimeoutUnit;
  allowedWallets: string[];
  deniedWallets: string[];
  permissions: string[];
  prohibitions: string[];
  obligations: string[];
  termsAndConditionsUrl: string;
}

// ODRL preset options (id, label key)
const ODRL_PERMISSIONS_PRESETS = [
  { id: "commercialUse", key: "step3.odrl.permissions.commercialUse" },
  { id: "internalAnalysis", key: "step3.odrl.permissions.internalAnalysis" },
  { id: "derivedReports", key: "step3.odrl.permissions.derivedReports" },
  {
    id: "internalIntegration",
    key: "step3.odrl.permissions.internalIntegration",
  },
  { id: "researchUse", key: "step3.odrl.permissions.researchUse" },
];

const ODRL_PROHIBITIONS_PRESETS = [
  { id: "noRedistribution", key: "step3.odrl.prohibitions.noRedistribution" },
  {
    id: "noReverseEngineering",
    key: "step3.odrl.prohibitions.noReverseEngineering",
  },
  { id: "noIllegalUse", key: "step3.odrl.prohibitions.noIllegalUse" },
  { id: "noResale", key: "step3.odrl.prohibitions.noResale" },
  {
    id: "noPublicDisclosure",
    key: "step3.odrl.prohibitions.noPublicDisclosure",
  },
];

const ODRL_OBLIGATIONS_PRESETS = [
  {
    id: "attributionRequired",
    key: "step3.odrl.obligations.attributionRequired",
  },
  { id: "gdprCompliance", key: "step3.odrl.obligations.gdprCompliance" },
  { id: "licenseRenewal", key: "step3.odrl.obligations.licenseRenewal" },
  { id: "citeDataSource", key: "step3.odrl.obligations.citeDataSource" },
  { id: "notifyProvider", key: "step3.odrl.obligations.notifyProvider" },
];

interface Step4Data extends Step4Metadata {
  selectedWalletUuid: string;
  acceptTerms: boolean;
  confirmDataRights: boolean;
}

// Categorías con iconos (según diseño: Compliance, ESG, Operaciones, etc.)
const CATEGORY_OPTIONS: {
  id: string;
  key: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}[] = [
  {
    id: "compliance",
    key: "step4.categories.compliance",
    Icon: Shield,
    iconColor: "text-blue-600",
  },
  {
    id: "esg",
    key: "step4.categories.esg",
    Icon: Leaf,
    iconColor: "text-green-600",
  },
  {
    id: "operaciones",
    key: "step4.categories.operaciones",
    Icon: Settings,
    iconColor: "text-violet-600",
  },
  {
    id: "mercadoPrecios",
    key: "step4.categories.mercadoPrecios",
    Icon: BarChart3,
    iconColor: "text-red-600",
  },
  {
    id: "iDyInnovacion",
    key: "step4.categories.iDyInnovacion",
    Icon: FlaskConical,
    iconColor: "text-slate-600",
  },
  {
    id: "logistica",
    key: "step4.categories.logistica",
    Icon: Truck,
    iconColor: "text-amber-600",
  },
  {
    id: "finanzas",
    key: "step4.categories.finanzas",
    Icon: Banknote,
    iconColor: "text-amber-500",
  },
  {
    id: "recursosHumanos",
    key: "step4.categories.recursosHumanos",
    Icon: Users2,
    iconColor: "text-violet-500",
  },
  {
    id: "iotTelemetria",
    key: "step4.categories.iotTelemetria",
    Icon: Radio,
    iconColor: "text-slate-500",
  },
  {
    id: "otros",
    key: "step4.categories.otros",
    Icon: Package,
    iconColor: "text-amber-700",
  },
];

// Idiomas con códigos de país (ES Español, GB Inglés, etc.)
const LANGUAGE_OPTIONS: { id: string; code: string; key: string }[] = [
  { id: "es", code: "ES", key: "step4.languages.es" },
  { id: "en", code: "GB", key: "step4.languages.en" },
  { id: "de", code: "DE", key: "step4.languages.de" },
  { id: "fr", code: "FR", key: "step4.languages.fr" },
  { id: "pt", code: "PT", key: "step4.languages.pt" },
  { id: "it", code: "IT", key: "step4.languages.it" },
  { id: "nl", code: "NL", key: "step4.languages.nl" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PublishDataset() {
  const navigate = useNavigate();
  const { activeOrg, activeOrgId } = useOrganizationContext();
  const { user } = useAuth();
  const { t } = useTranslation("publish");

  // -- Stepper --
  const STEPS = [
    {
      id: 1,
      title: t("stepper.step1.title"),
      description: t("stepper.step1.description"),
      icon: <LinkIcon className="h-5 w-5" />,
    },
    {
      id: 2,
      title: t("stepper.step2.title"),
      description: t("stepper.step2.description"),
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: 3,
      title: t("stepper.step3.title"),
      description: t("stepper.step3.description"),
      icon: <Settings className="h-5 w-5" />,
    },
    {
      id: 4,
      title: t("stepper.step4.title"),
      description: t("stepper.step4.description"),
      icon: <HardDrive className="h-5 w-5" />,
    },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  // -- Step states --
  const [step1Data, setStep1Data] = useState<Step1Data>({
    sourceType: "url",
    url: "",
    method: "GET",
    queryParams: [{ key: "", value: "" }],
    headers: [{ key: "", value: "" }],
    cid: "",
  });

  const [step2Data, setStep2Data] = useState<Step2Data>({
    schemaFields: [{ field: "", type: "Texto", description: "" }],
  });

  const [step3Data, setStep3Data] = useState<Step3Data>({
    pricingType: "free",
    price: 0,
    permanentAccess: false,
    timeoutValue: 90,
    timeoutUnit: "days",
    allowedWallets: [],
    deniedWallets: [],
    permissions: [],
    prohibitions: [],
    obligations: [],
    termsAndConditionsUrl: "",
  });

  const [step4Data, setStep4Data] = useState<Step4Data>({
    name: "",
    license: "GDC-Privacy-Standard-v1",
    description: "",
    category: "",
    language: "",
    selectedWalletUuid: "",
    acceptTerms: false,
    confirmDataRights: false,
  });

  // -- Organization wallets for step 4 (API requires org wallet, not user wallet) --
  const orgWallets: ApiWallet[] = activeOrg
    ? [
        ...(activeOrg.primaryWallets ?? []),
        ...(activeOrg.wallets ?? []).filter(
          (w) =>
            !(activeOrg.primaryWallets ?? []).some((p) => p.uuid === w.uuid),
        ),
      ]
    : [];

  useEffect(() => {
    if (!activeOrg) return;
    const primary = activeOrg.primaryWallets?.[0];
    const allWallets = [
      ...(activeOrg.primaryWallets ?? []),
      ...(activeOrg.wallets ?? []).filter(
        (w) => !(activeOrg.primaryWallets ?? []).some((p) => p.uuid === w.uuid),
      ),
    ];
    if (allWallets.length === 0) return;
    setStep4Data((prev) => {
      const defaultUuid = primary?.uuid ?? allWallets[0].uuid;
      const currentInList = allWallets.some(
        (w) => w.uuid === prev.selectedWalletUuid,
      );
      if (!currentInList) return { ...prev, selectedWalletUuid: defaultUuid };
      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- activeOrg derived from activeOrgId
  }, [activeOrgId]);

  // -- Temporary wallet address inputs --
  const [allowedWalletInput, setAllowedWalletInput] = useState("");
  const [deniedWalletInput, setDeniedWalletInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ---------------------------------------------------------------------------
  // Key-value helpers (query params & headers)
  // ---------------------------------------------------------------------------

  const addKV = (field: "queryParams" | "headers") =>
    setStep1Data((prev) => ({
      ...prev,
      [field]: [...prev[field], { key: "", value: "" }],
    }));

  const removeKV = (field: "queryParams" | "headers", index: number) =>
    setStep1Data((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));

  const updateKV = (
    field: "queryParams" | "headers",
    index: number,
    prop: "key" | "value",
    val: string,
  ) =>
    setStep1Data((prev) => ({
      ...prev,
      [field]: prev[field].map((kv, i) =>
        i === index ? { ...kv, [prop]: val } : kv,
      ),
    }));

  // ---------------------------------------------------------------------------
  // Schema field helpers (step 2)
  // ---------------------------------------------------------------------------

  const addSchemaField = () =>
    setStep2Data((prev) => ({
      ...prev,
      schemaFields: [
        ...prev.schemaFields,
        { field: "", type: "Texto", description: "" },
      ],
    }));

  const removeSchemaField = (index: number) =>
    setStep2Data((prev) => ({
      ...prev,
      schemaFields: prev.schemaFields.filter((_, i) => i !== index),
    }));

  const updateSchemaField = (
    index: number,
    key: keyof SchemaField,
    val: string,
  ) =>
    setStep2Data((prev) => ({
      ...prev,
      schemaFields: prev.schemaFields.map((f, i) =>
        i === index ? { ...f, [key]: val } : f,
      ),
    }));

  const inferType = (value: unknown): string => {
    if (value === null || value === undefined) return "Texto";
    if (typeof value === "number")
      return Number.isInteger(value) ? "Entero" : "Decimal";
    if (typeof value === "boolean") return "Booleano";
    if (Array.isArray(value)) return "Array";
    if (typeof value === "object") return "JSON";
    if (typeof value === "string") {
      if (/^\d{4}-\d{2}-\d{2}/.test(value)) return "Fecha";
      if (
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          value,
        )
      )
        return "UUID";
      if (/^\d{10,}$/.test(value)) return "Timestamp";
    }
    return "Texto";
  };

  const inferTypeFromString = (str: string): string => {
    if (/^\d+$/.test(str)) return "Entero";
    if (/^\d+\.\d+$/.test(str)) return "Decimal";
    if (/^(true|false)$/i.test(str)) return "Booleano";
    if (/^\d{4}-\d{2}-\d{2}/.test(str)) return "Fecha";
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        str,
      )
    )
      return "UUID";
    return "Texto";
  };

  const handleSchemaFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
            const headers = lines[0]
              .split(",")
              .map((h) => h.trim().replace(/^"|"$/g, ""));
            const secondRow =
              lines.length > 1
                ? lines[1].split(",").map((v) => v.trim().replace(/^"|"$/g, ""))
                : [];
            detectedFields = headers.map((h, i) => ({
              field: h,
              type: secondRow[i] ? inferTypeFromString(secondRow[i]) : "Texto",
              description: "",
            }));
          }
        }
      } catch {
        toast.error(t("step2.fileError") || "No se pudo procesar el archivo.");
        return;
      }
      if (detectedFields.length > 0) {
        setStep2Data({ schemaFields: detectedFields });
        toast.success(
          t("step2.fieldsDetected", { count: detectedFields.length }) ||
            `${detectedFields.length} campos detectados automáticamente`,
        );
      } else {
        toast.error(t("step2.noFields") || "No se detectaron campos.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---------------------------------------------------------------------------
  // Manual wallet helpers (step 3)
  // ---------------------------------------------------------------------------

  const addWalletAddress = (
    list: "allowedWallets" | "deniedWallets",
    address: string,
  ) => {
    const trimmed = address.trim();
    if (!trimmed) return;
    setStep3Data((prev) => {
      if (prev[list].includes(trimmed)) return prev;
      return { ...prev, [list]: [...prev[list], trimmed] };
    });
  };

  const removeWalletAddress = (
    list: "allowedWallets" | "deniedWallets",
    index: number,
  ) =>
    setStep3Data((prev) => ({
      ...prev,
      [list]: prev[list].filter((_, i) => i !== index),
    }));

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------

  const isStep1Valid =
    step1Data.sourceType === "url"
      ? step1Data.url.trim().length > 0
      : step1Data.cid.trim().length > 0;

  const isStep2Valid =
    step2Data.schemaFields.length > 0 &&
    step2Data.schemaFields.every((f) => f.field.trim().length > 0);

  // ---------------------------------------------------------------------------
  // Publish mutation
  // ---------------------------------------------------------------------------

  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!activeOrgId) throw new Error("No hay organización activa");

      let source: DataAssetSource;
      if (step1Data.sourceType === "url") {
        const validParams = step1Data.queryParams.filter(
          (p) => p.key.trim() && p.value.trim(),
        );
        const validHeaders = step1Data.headers.filter(
          (h) => h.key.trim() && h.value.trim(),
        );
        source = {
          type: "url",
          url: step1Data.url.trim(),
          method: step1Data.method,
          ...(validParams.length > 0 && {
            query_params: validParams.reduce(
              (acc, p) => ({ ...acc, [p.key.trim()]: p.value.trim() }),
              {} as Record<string, string>,
            ),
          }),
          ...(validHeaders.length > 0 && {
            headers: validHeaders.reduce(
              (acc, h) => ({ ...acc, [h.key.trim()]: h.value.trim() }),
              {} as Record<string, string>,
            ),
          }),
        };
      } else {
        source = { type: "ipfs", cid: step1Data.cid.trim() };
      }

      const schemaMeta = step2Data.schemaFields
        .filter((f) => f.field.trim())
        .map((f) => ({
          type: f.type,
          field: f.field.trim(),
          description: f.description.trim(),
        }));

      const hasOdrl =
        step3Data.permissions.length > 0 ||
        step3Data.prohibitions.length > 0 ||
        step3Data.obligations.length > 0;
      const odrlObject = hasOdrl
        ? {
            "@context": [
              "http://www.w3.org/ns/odrl.jsonld",
              { dcterms: "http://purl.org/dc/terms/" },
            ],
            type: "Offer",
            profile: "http://www.w3.org/ns/odrl/2/",
            permissions: step3Data.permissions.map((action) => ({ action })),
            prohibitions: step3Data.prohibitions.map((action) => ({ action })),
            obligations: step3Data.obligations.map((action) => ({ action })),
            duty: [] as unknown[],
          }
        : undefined;

      const hasMetaLinks =
        (step3Data.termsAndConditionsUrl?.trim() ?? "") !== "";

      const meta =
        schemaMeta.length > 0 ||
        odrlObject ||
        hasMetaLinks ||
        step4Data.category?.trim() ||
        step4Data.language?.trim()
          ? {
              ...(schemaMeta.length > 0 && { schema: schemaMeta }),
              ...(odrlObject && { odrlObject }),
              ...(step3Data.termsAndConditionsUrl?.trim() && {
                termsAndConditionsUrl: step3Data.termsAndConditionsUrl.trim(),
              }),
              category: step4Data.category?.trim() ?? "",
              language: step4Data.language?.trim() ?? "",
            }
          : undefined;

      const payload: CreateDataAssetRequest = {
        source,
        name: step4Data.name.trim(),
        license: step4Data.license.trim(),
        author: activeOrg?.name ?? user?.email ?? "",
        description: step4Data.description.trim(),
        ...(meta && { meta }),
        pricing: {
          type: step3Data.pricingType === "free" ? "free" : "paid",
          price: String(step3Data.pricingType === "free" ? 0 : step3Data.price),
        },
        access_config: {
          allowed_addresses: step3Data.allowedWallets,
          denied_addresses: step3Data.deniedWallets,
          timeout:
            step3Data.timeoutValue === 0
              ? 0
              : step3Data.timeoutValue * TIMEOUT_UNIT_TO_SECONDS["days"],
        },
        consumer_parameters: [],
        usage_terms: "",
        requested_by_wallet_uuid: step4Data.selectedWalletUuid,
      };

      return dataAssetService.create(activeOrgId, payload);
    },
    onSuccess: (response) => {
      toast.success(response.message, { duration: 6000 });
      navigate("/data");
    },
    onError: (error: unknown) => {
      console.error("Error publishing data asset:", error);
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else if (error instanceof Error) {
        toast.error(t("step4.errorPublish"), { description: error.message });
      } else {
        toast.error(t("step4.errorPublish"));
      }
    },
  });

  // ---------------------------------------------------------------------------
  // Guards
  // ---------------------------------------------------------------------------

  if (!activeOrgId) {
    return <Navigate to="/dashboard" replace />;
  }

  // ---------------------------------------------------------------------------
  // Summary helpers for step 4
  // ---------------------------------------------------------------------------

  const sourceLabel =
    step1Data.sourceType === "url"
      ? `URL – ${step1Data.url || "—"}`
      : `IPFS – ${step1Data.cid || "—"}`;

  const pricingLabel =
    step3Data.pricingType === "free"
      ? t("step4.pricingModel.free")
      : step3Data.pricingType === "subscription"
        ? t("step4.pricingModel.subscription")
        : step3Data.pricingType === "oneTime"
          ? t("step4.pricingModel.oneTime")
          : t("step4.pricingModel.perUse");

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/data")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("header.backToData")}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t("header.title")}</h1>
              <p className="text-muted-foreground">{t("header.subtitle")}</p>
            </div>
          </div>
        </motion.div>

        {/* Organization Context */}
        {activeOrg && (
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t("alerts.publishingAs")}{" "}
              <span className="font-semibold">{activeOrg.name}</span>
            </AlertDescription>
          </Alert>
        )}

        {/* Security Note */}
        <Alert className="mb-6 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
          <Lock className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800 dark:text-emerald-300">
            {t("alerts.securityNote")}
          </AlertDescription>
        </Alert>

        {/* Stepper */}
        <div className="mb-8">
          <OnboardingStepper steps={STEPS} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* ===== STEP 1: Fuente ===== */}
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
                  <CardTitle>Paso 1: {t("step1.title")}</CardTitle>
                  <CardDescription>{t("step1.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Source type radio */}
                  <div className="space-y-2">
                    <Label>{t("step1.sourceType.label")}</Label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sourceType"
                          checked={step1Data.sourceType === "url"}
                          onChange={() =>
                            setStep1Data((prev) => ({
                              ...prev,
                              sourceType: "url",
                            }))
                          }
                          className="accent-primary"
                        />
                        <LinkIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">URL</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sourceType"
                          checked={step1Data.sourceType === "ipfs"}
                          onChange={() =>
                            setStep1Data((prev) => ({
                              ...prev,
                              sourceType: "ipfs",
                            }))
                          }
                          className="accent-primary"
                        />
                        <HardDrive className="h-4 w-4" />
                        <span className="text-sm font-medium">IPFS (CID)</span>
                      </label>
                    </div>
                  </div>

                  {step1Data.sourceType === "url" ? (
                    <>
                      {/* URL */}
                      <div className="space-y-2">
                        <Label htmlFor="resourceUrl">
                          {t("step1.url.label")}
                        </Label>
                        <Input
                          id="resourceUrl"
                          placeholder={t("step1.url.placeholder")}
                          value={step1Data.url}
                          onChange={(e) =>
                            setStep1Data((prev) => ({
                              ...prev,
                              url: e.target.value,
                            }))
                          }
                        />
                      </div>

                      {/* HTTP Method */}
                      <div className="space-y-2">
                        <Label>{t("step1.method.label")}</Label>
                        <Select
                          value={step1Data.method}
                          onValueChange={(v) =>
                            setStep1Data((prev) => ({
                              ...prev,
                              method: v as "GET" | "POST",
                            }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Query params */}
                      <div className="space-y-3">
                        <Label>{t("step1.queryParams.label")}</Label>
                        <div className="space-y-2">
                          {step1Data.queryParams.map((kv, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Input
                                placeholder={t(
                                  "step1.queryParams.keyPlaceholder",
                                )}
                                value={kv.key}
                                onChange={(e) =>
                                  updateKV(
                                    "queryParams",
                                    i,
                                    "key",
                                    e.target.value,
                                  )
                                }
                                className="flex-1"
                              />
                              <Input
                                placeholder={t(
                                  "step1.queryParams.valuePlaceholder",
                                )}
                                value={kv.value}
                                onChange={(e) =>
                                  updateKV(
                                    "queryParams",
                                    i,
                                    "value",
                                    e.target.value,
                                  )
                                }
                                className="flex-1"
                              />
                              {step1Data.queryParams.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeKV("queryParams", i)}
                                  className="shrink-0 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addKV("queryParams")}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {t("step1.queryParams.addButton")}
                        </Button>
                      </div>

                      {/* Headers */}
                      <div className="space-y-3">
                        <Label>{t("step1.headers.label")}</Label>
                        <div className="space-y-2">
                          {step1Data.headers.map((kv, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Input
                                placeholder={t("step1.headers.keyPlaceholder")}
                                value={kv.key}
                                onChange={(e) =>
                                  updateKV("headers", i, "key", e.target.value)
                                }
                                className="flex-1"
                              />
                              <Input
                                placeholder={t(
                                  "step1.headers.valuePlaceholder",
                                )}
                                value={kv.value}
                                onChange={(e) =>
                                  updateKV(
                                    "headers",
                                    i,
                                    "value",
                                    e.target.value,
                                  )
                                }
                                className="flex-1"
                              />
                              {step1Data.headers.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeKV("headers", i)}
                                  className="shrink-0 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addKV("headers")}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {t("step1.headers.addButton")}
                        </Button>
                      </div>
                    </>
                  ) : (
                    /* IPFS CID */
                    <div className="space-y-2">
                      <Label htmlFor="ipfsCid">{t("step1.ipfs.label")}</Label>
                      <Input
                        id="ipfsCid"
                        placeholder={t("step1.ipfs.placeholder")}
                        value={step1Data.cid}
                        onChange={(e) =>
                          setStep1Data((prev) => ({
                            ...prev,
                            cid: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => navigate("/data")}>
                      {t("navigation.cancel")}
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(2)}
                      disabled={!isStep1Valid}
                    >
                      {t("navigation.next")}
                      <ArrowRight className="h-4 w-4 ml-2" />
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
            >
              <Card>
                <CardHeader>
                  <CardTitle>Paso 2: {t("step2.schemaTitle")}</CardTitle>
                  <CardDescription>
                    {t("step2.schemaDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Asistente de Esquema - Upload */}
                  <div className="space-y-2">
                    <Label>{t("step2.uploadLabel")}</Label>
                    <div className="flex items-center gap-2">
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
                        {t("step2.uploadButton")}
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {t("step2.uploadHint")}
                      </span>
                    </div>
                  </div>

                  {/* Definición de Campos */}
                  <div className="space-y-3">
                    <Label>{t("step2.fieldsLabel")}</Label>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t("step2.fieldLabel")}</TableHead>
                            <TableHead>{t("step2.typeLabel")}</TableHead>
                            <TableHead>{t("step2.descriptionLabel")}</TableHead>
                            <TableHead className="w-12" />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {step2Data.schemaFields.map((f, i) => (
                            <TableRow key={i}>
                              <TableCell>
                                <Input
                                  placeholder={t("step2.fieldPlaceholder")}
                                  value={f.field}
                                  onChange={(e) =>
                                    updateSchemaField(
                                      i,
                                      "field",
                                      e.target.value,
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={f.type}
                                  onValueChange={(v) =>
                                    updateSchemaField(i, "type", v)
                                  }
                                >
                                  <SelectTrigger className="w-full min-w-[120px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {FIELD_TYPES.map((tipo) => (
                                      <SelectItem key={tipo} value={tipo}>
                                        {tipo}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  placeholder={t("step2.fieldDescPlaceholder")}
                                  value={f.description}
                                  onChange={(e) =>
                                    updateSchemaField(
                                      i,
                                      "description",
                                      e.target.value,
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                {step2Data.schemaFields.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSchemaField(i)}
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
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSchemaField}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {t("step2.addField")}
                    </Button>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t("navigation.back")}
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(3)}
                      disabled={!isStep2Valid}
                    >
                      {t("navigation.next")}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ===== STEP 3: Pricing + Access ===== */}
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
                    Paso 3: {t("step3.title")}
                  </CardTitle>
                  <CardDescription>{t("step3.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* ODRL: Permisos, Prohibiciones, Obligaciones */}
                  <div className="space-y-6">
                    {/* Permisos */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <h4 className="font-semibold text-emerald-700">
                          {t("step3.odrl.permissionsTitle")}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {ODRL_PERMISSIONS_PRESETS.map((p) => {
                          const selected = step3Data.permissions.includes(p.id);
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() =>
                                setStep3Data((prev) => ({
                                  ...prev,
                                  permissions: selected
                                    ? prev.permissions.filter((x) => x !== p.id)
                                    : [...prev.permissions, p.id],
                                }))
                              }
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs cursor-pointer transition-colors border ${
                                selected
                                  ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/60 text-emerald-800 dark:text-emerald-200"
                                  : "bg-transparent border-input hover:bg-muted/50"
                              }`}
                            >
                              <Plus className="h-2.5 w-2.5" />
                              {t(p.key)}
                            </button>
                          );
                        })}
                      </div>
                      {step3Data.permissions.length > 0 && (
                        <div className="flex flex-col gap-2">
                          {step3Data.permissions.map((id) => {
                            const label = ODRL_PERMISSIONS_PRESETS.find(
                              (p) => p.id === id,
                            )
                              ? t(
                                  ODRL_PERMISSIONS_PRESETS.find(
                                    (p) => p.id === id,
                                  )!.key,
                                )
                              : id;
                            return (
                              <div
                                key={id}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40 text-sm"
                              >
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                                <span className="flex-1 min-w-0">{label}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 shrink-0 ml-auto rounded hover:bg-destructive/20"
                                  onClick={() =>
                                    setStep3Data((prev) => ({
                                      ...prev,
                                      permissions: prev.permissions.filter(
                                        (x) => x !== id,
                                      ),
                                    }))
                                  }
                                >
                                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Input
                          placeholder={t(
                            "step3.odrl.permissionCustomPlaceholder",
                          )}
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const input = e.currentTarget;
                              const val = input.value.trim();
                              if (val && !step3Data.permissions.includes(val)) {
                                setStep3Data((prev) => ({
                                  ...prev,
                                  permissions: [...prev.permissions, val],
                                }));
                                input.value = "";
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          onClick={(e) => {
                            const input = (e.currentTarget as HTMLElement)
                              .previousElementSibling as HTMLInputElement;
                            const val = input?.value?.trim();
                            if (val && !step3Data.permissions.includes(val)) {
                              setStep3Data((prev) => ({
                                ...prev,
                                permissions: [...prev.permissions, val],
                              }));
                              if (input) input.value = "";
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Prohibiciones */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CircleX className="h-4 w-4 text-destructive" />
                        <h4 className="font-semibold text-destructive">
                          {t("step3.odrl.prohibitionsTitle")}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {ODRL_PROHIBITIONS_PRESETS.map((p) => {
                          const selected = step3Data.prohibitions.includes(
                            p.id,
                          );
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() =>
                                setStep3Data((prev) => ({
                                  ...prev,
                                  prohibitions: selected
                                    ? prev.prohibitions.filter(
                                        (x) => x !== p.id,
                                      )
                                    : [...prev.prohibitions, p.id],
                                }))
                              }
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs cursor-pointer transition-colors border ${
                                selected
                                  ? "bg-destructive/10 dark:bg-destructive/20 border-destructive/60 text-destructive"
                                  : "bg-transparent border-input hover:bg-muted/50"
                              }`}
                            >
                              <Plus className="h-2.5 w-2.5" />
                              {t(p.key)}
                            </button>
                          );
                        })}
                      </div>
                      {step3Data.prohibitions.length > 0 && (
                        <div className="flex flex-col gap-2">
                          {step3Data.prohibitions.map((id) => {
                            const preset = ODRL_PROHIBITIONS_PRESETS.find(
                              (p) => p.id === id,
                            );
                            const label = preset ? t(preset.key) : id;
                            return (
                              <div
                                key={id}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 bg-destructive/5 dark:bg-destructive/20 border border-destructive/40 text-sm"
                              >
                                <CircleX className="h-4 w-4 text-destructive shrink-0" />
                                <span className="flex-1 min-w-0">{label}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 shrink-0 ml-auto rounded hover:bg-destructive/20"
                                  onClick={() =>
                                    setStep3Data((prev) => ({
                                      ...prev,
                                      prohibitions: prev.prohibitions.filter(
                                        (x) => x !== id,
                                      ),
                                    }))
                                  }
                                >
                                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Input
                          placeholder={t(
                            "step3.odrl.prohibitionCustomPlaceholder",
                          )}
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const input = e.currentTarget;
                              const val = input.value.trim();
                              if (
                                val &&
                                !step3Data.prohibitions.includes(val)
                              ) {
                                setStep3Data((prev) => ({
                                  ...prev,
                                  prohibitions: [...prev.prohibitions, val],
                                }));
                                input.value = "";
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          onClick={(e) => {
                            const input = (e.currentTarget as HTMLElement)
                              .previousElementSibling as HTMLInputElement;
                            const val = input?.value?.trim();
                            if (val && !step3Data.prohibitions.includes(val)) {
                              setStep3Data((prev) => ({
                                ...prev,
                                prohibitions: [...prev.prohibitions, val],
                              }));
                              if (input) input.value = "";
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Obligaciones */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <h4 className="font-semibold text-blue-500">
                          {t("step3.odrl.obligationsTitle")}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {ODRL_OBLIGATIONS_PRESETS.map((p) => {
                          const selected = step3Data.obligations.includes(p.id);
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() =>
                                setStep3Data((prev) => ({
                                  ...prev,
                                  obligations: selected
                                    ? prev.obligations.filter((x) => x !== p.id)
                                    : [...prev.obligations, p.id],
                                }))
                              }
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs cursor-pointer transition-colors border ${
                                selected
                                  ? "bg-blue-50 dark:bg-blue-950/30 border-blue-500/60 text-blue-800 dark:text-blue-200"
                                  : "bg-transparent border-input hover:bg-muted/50"
                              }`}
                            >
                              <Plus className="h-2.5 w-2.5" />
                              {t(p.key)}
                            </button>
                          );
                        })}
                      </div>
                      {step3Data.obligations.length > 0 && (
                        <div className="flex flex-col gap-2">
                          {step3Data.obligations.map((id) => {
                            const preset = ODRL_OBLIGATIONS_PRESETS.find(
                              (p) => p.id === id,
                            );
                            const label = preset ? t(preset.key) : id;
                            return (
                              <div
                                key={id}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-500/40 text-sm"
                              >
                                <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                                <span className="flex-1 min-w-0">{label}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 shrink-0 ml-auto rounded hover:bg-destructive/20"
                                  onClick={() =>
                                    setStep3Data((prev) => ({
                                      ...prev,
                                      obligations: prev.obligations.filter(
                                        (x) => x !== id,
                                      ),
                                    }))
                                  }
                                >
                                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Input
                          placeholder={t(
                            "step3.odrl.obligationCustomPlaceholder",
                          )}
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const input = e.currentTarget;
                              const val = input.value.trim();
                              if (val && !step3Data.obligations.includes(val)) {
                                setStep3Data((prev) => ({
                                  ...prev,
                                  obligations: [...prev.obligations, val],
                                }));
                                input.value = "";
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          onClick={(e) => {
                            const input = (e.currentTarget as HTMLElement)
                              .previousElementSibling as HTMLInputElement;
                            const val = input?.value?.trim();
                            if (val && !step3Data.obligations.includes(val)) {
                              setStep3Data((prev) => ({
                                ...prev,
                                obligations: [...prev.obligations, val],
                              }));
                              if (input) input.value = "";
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Enlace a Términos y Condiciones */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">
                        {t("step3.termsAndConditions.label")}
                      </h4>
                    </div>
                    <Input
                      placeholder={t("step3.termsAndConditions.placeholder")}
                      value={step3Data.termsAndConditionsUrl}
                      onChange={(e) =>
                        setStep3Data((prev) => ({
                          ...prev,
                          termsAndConditionsUrl: e.target.value,
                        }))
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      {t("step3.termsAndConditions.hint")}
                    </p>
                  </div>

                  <Separator />

                  {/* Control de Acceso (Pontus-X) */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Users2 className="h-5 w-5 text-primary" />
                      {t("step3.accessConfig.accessControlTitle")}
                    </h3>

                    {/* Whitelist - Organizaciones con Acceso Permitido */}
                    <div className="rounded-lg border-2 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">
                          {t("step3.accessConfig.whitelistTitle")}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("step3.accessConfig.whitelistDescription")}
                      </p>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={t(
                            "step3.accessConfig.whitelistSearchPlaceholder",
                          )}
                          value={allowedWalletInput}
                          onChange={(e) =>
                            setAllowedWalletInput(e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addWalletAddress(
                                "allowedWallets",
                                allowedWalletInput,
                              );
                              setAllowedWalletInput("");
                            }
                          }}
                          onBlur={() => {
                            if (allowedWalletInput.trim()) {
                              addWalletAddress(
                                "allowedWallets",
                                allowedWalletInput,
                              );
                              setAllowedWalletInput("");
                            }
                          }}
                          className="pl-9"
                        />
                      </div>
                      {step3Data.allowedWallets.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {step3Data.allowedWallets.map((addr, idx) => (
                            <Badge
                              key={`${addr}-${idx}`}
                              variant="secondary"
                              className="flex items-center gap-1 pr-1"
                            >
                              {addr}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 rounded-full hover:bg-destructive/20"
                                onClick={() =>
                                  removeWalletAddress("allowedWallets", idx)
                                }
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground italic">
                          {t("step3.accessConfig.whitelistEmptyStatus")}
                        </p>
                      )}
                    </div>

                    {/* Blacklist - Organizaciones con Acceso Denegado */}
                    <div className="rounded-lg border-2 border-destructive/30 bg-destructive/5 dark:bg-destructive/10 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        {/* <div className="size-4 rounded-full border-2 border-destructive flex items-center justify-center"> */}
                        <CircleX className="size-4 text-destructive" />
                        {/* </div> */}
                        <h4 className="font-semibold text-destructive">
                          {t("step3.accessConfig.blacklistTitle")}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("step3.accessConfig.blacklistDescription")}
                      </p>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={t(
                            "step3.accessConfig.blacklistSearchPlaceholder",
                          )}
                          value={deniedWalletInput}
                          onChange={(e) => setDeniedWalletInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addWalletAddress(
                                "deniedWallets",
                                deniedWalletInput,
                              );
                              setDeniedWalletInput("");
                            }
                          }}
                          onBlur={() => {
                            if (deniedWalletInput.trim()) {
                              addWalletAddress(
                                "deniedWallets",
                                deniedWalletInput,
                              );
                              setDeniedWalletInput("");
                            }
                          }}
                          className="pl-9"
                        />
                      </div>
                      {step3Data.deniedWallets.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {step3Data.deniedWallets.map((addr, idx) => (
                            <Badge
                              key={`${addr}-${idx}`}
                              variant="secondary"
                              className="flex items-center gap-1 pr-1"
                            >
                              {addr}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 rounded-full hover:bg-destructive/20"
                                onClick={() =>
                                  removeWalletAddress("deniedWallets", idx)
                                }
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground italic">
                          {t("step3.accessConfig.blacklistEmptyStatus")}
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Caducidad del Servicio (Timeout) */}
                  <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      {t("step3.accessConfig.serviceExpiryTitle")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("step3.accessConfig.serviceExpiryDescription")}
                    </p>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={0}
                        value={step3Data.timeoutValue}
                        onChange={(e) =>
                          setStep3Data((prev) => ({
                            ...prev,
                            timeoutValue: parseInt(e.target.value) || 0,
                            timeoutUnit: "days",
                          }))
                        }
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">
                        {t("step3.accessConfig.serviceExpiryUnit")}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t("step3.accessConfig.serviceExpiryHint")}
                    </p>
                  </div>

                  {/* Users Allowed (placeholder) */}
                  {/* <div className="space-y-2">
                      <Label>{t("step3.accessConfig.usersAllowed")}</Label>
                      <Select disabled>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              "step3.accessConfig.usersAllowedPlaceholder",
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="_">—</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {t("step3.accessConfig.usersAllowedHint")}
                      </p>
                    </div> */}

                  {/* Users Denied (placeholder) */}
                  {/* <div className="space-y-2">
                      <Label>{t("step3.accessConfig.usersDenied")}</Label>
                      <Select disabled>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              "step3.accessConfig.usersDeniedPlaceholder",
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="_">—</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t("navigation.back")}
                    </Button>
                    <Button onClick={() => setCurrentStep(4)}>
                      {t("navigation.next")}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ===== STEP 4: Summary + Wallet ===== */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Paso 4: {t("step4.title")}</CardTitle>
                  <CardDescription>{t("step4.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Card 1: Metadata (Nombre, Descripción, Categoría, Idioma) */}
                  <Card className="border shadow-sm">
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="step4-assetName">
                          {t("step4.nameLabel")}
                        </Label>
                        <Input
                          id="step4-assetName"
                          placeholder={t("step4.namePlaceholder")}
                          value={step4Data.name}
                          onChange={(e) =>
                            setStep4Data((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="step4-assetDescription">
                          {t("step4.descriptionField.label")}
                        </Label>
                        <Textarea
                          id="step4-assetDescription"
                          placeholder={t("step4.descriptionField.placeholder")}
                          rows={4}
                          className="resize-y"
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
                        <Label htmlFor="step4-category">
                          {t("step4.categoryLabel")}
                        </Label>
                        <Select
                          value={step4Data.category || ""}
                          onValueChange={(v) =>
                            setStep4Data((prev) => ({
                              ...prev,
                              category: v,
                            }))
                          }
                        >
                          <SelectTrigger id="step4-category">
                            {step4Data.category ? (
                              <SelectValue />
                            ) : (
                              <span className="text-muted-foreground">
                                {t("step4.categoryPlaceholder")}
                              </span>
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORY_OPTIONS.map(
                              ({ id, key, Icon, iconColor }) => (
                                <SelectItem key={id} value={id}>
                                  <span className="flex items-center gap-2">
                                    <Icon
                                      className={`h-4 w-4 shrink-0 ${iconColor}`}
                                    />
                                    {t(key)}
                                  </span>
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="step4-language">
                          {t("step4.languageLabel")}
                        </Label>
                        <Select
                          value={step4Data.language || ""}
                          onValueChange={(v) =>
                            setStep4Data((prev) => ({
                              ...prev,
                              language: v,
                            }))
                          }
                        >
                          <SelectTrigger id="step4-language">
                            {step4Data.language ? (
                              <SelectValue />
                            ) : (
                              <span className="text-muted-foreground">
                                {t("step4.languagePlaceholder")}
                              </span>
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGE_OPTIONS.map(({ id, code, key }) => (
                              <SelectItem key={id} value={id}>
                                {code} {t(key)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 2: Modelo de Precio */}
                  <Card className="border shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        {t("step4.pricingModel.title")}
                      </CardTitle>
                      <CardDescription>
                        {t("step4.pricingModel.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {(
                          [
                            {
                              id: "free" as const,
                              titleKey: "step4.pricingModel.free",
                              subtitleKey: "step4.pricingModel.freeSubtitle",
                            },
                            {
                              id: "subscription" as const,
                              titleKey: "step4.pricingModel.subscription",
                              subtitleKey:
                                "step4.pricingModel.subscriptionSubtitle",
                            },
                            {
                              id: "oneTime" as const,
                              titleKey: "step4.pricingModel.oneTime",
                              subtitleKey: "step4.pricingModel.oneTimeSubtitle",
                            },
                            {
                              id: "perUse" as const,
                              titleKey: "step4.pricingModel.perUse",
                              subtitleKey: "step4.pricingModel.perUseSubtitle",
                            },
                          ] as const
                        ).map((opt) => {
                          const isSelected = step3Data.pricingType === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() =>
                                setStep3Data((prev) => ({
                                  ...prev,
                                  pricingType: opt.id,
                                  price: opt.id === "free" ? 0 : prev.price,
                                }))
                              }
                              className={`rounded-lg border-2 p-4 text-left transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5 shadow-sm"
                                  : "border-muted bg-muted/20 hover:border-muted-foreground/30"
                              }`}
                            >
                              <div className="font-semibold text-sm">
                                {t(opt.titleKey)}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {t(opt.subtitleKey)}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {step3Data.pricingType !== "free" && (
                        <div className="space-y-2 pt-2">
                          <Label htmlFor="step4-price">
                            {step3Data.pricingType === "subscription"
                              ? t("step4.pricingModel.pricePerMonth")
                              : t("step4.pricingModel.price")}
                          </Label>
                          <Input
                            id="step4-price"
                            type="number"
                            min={0}
                            step={0.01}
                            placeholder="0.00"
                            value={step3Data.price || ""}
                            onChange={(e) =>
                              setStep3Data((prev) => ({
                                ...prev,
                                price: parseFloat(e.target.value) || 0,
                              }))
                            }
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Card 3: Términos de Uso */}
                  <Card className="border shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        {t("step4.termsOfUse.title")}
                      </CardTitle>
                      <CardDescription>
                        {t("step4.termsOfUse.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="step4-acceptTerms"
                          checked={step4Data.acceptTerms}
                          onCheckedChange={(checked) =>
                            setStep4Data((prev) => ({
                              ...prev,
                              acceptTerms: !!checked,
                            }))
                          }
                        />
                        <div className="space-y-1">
                          <Label
                            htmlFor="step4-acceptTerms"
                            className="font-semibold cursor-pointer"
                          >
                            {t("step4.termsOfUse.checkbox1")}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t("step4.termsOfUse.checkbox1Subtitle")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="step4-confirmDataRights"
                          checked={step4Data.confirmDataRights}
                          onCheckedChange={(checked) =>
                            setStep4Data((prev) => ({
                              ...prev,
                              confirmDataRights: !!checked,
                            }))
                          }
                        />
                        <div className="space-y-1">
                          <Label
                            htmlFor="step4-confirmDataRights"
                            className="font-semibold cursor-pointer"
                          >
                            {t("step4.termsOfUse.checkbox2")}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t("step4.termsOfUse.checkbox2Subtitle")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(3)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t("navigation.back")}
                    </Button>
                    <Button
                      onClick={() => publishMutation.mutate()}
                      disabled={
                        orgWallets.length === 0 ||
                        !step4Data.name.trim() ||
                        !step4Data.description.trim() ||
                        !step4Data.category.trim() ||
                        !step4Data.language.trim() ||
                        !step4Data.acceptTerms ||
                        !step4Data.confirmDataRights ||
                        !step4Data.selectedWalletUuid ||
                        (step3Data.pricingType !== "free" &&
                          step3Data.price <= 0) ||
                        publishMutation.isPending
                      }
                      className="bg-primary hover:bg-primary/90"
                    >
                      {publishMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {t("step4.publishing")}
                        </>
                      ) : (
                        t("step4.publishButton")
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
