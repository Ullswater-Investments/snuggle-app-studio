import { useState, useEffect, useCallback } from "react";
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

interface Step2Data {
  name: string;
  license: string;
  description: string;
}

type TimeoutUnit = "minutes" | "hours" | "days" | "weeks" | "months";

const TIMEOUT_UNIT_TO_SECONDS: Record<TimeoutUnit, number> = {
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2592000,
};

const TIMEOUT_PRESETS = [
  { label: "1h", value: 1, unit: "hours" as TimeoutUnit },
  { label: "24h", value: 24, unit: "hours" as TimeoutUnit },
  { label: "7d", value: 7, unit: "days" as TimeoutUnit },
  { label: "30d", value: 30, unit: "days" as TimeoutUnit },
  { label: "1 año", value: 365, unit: "days" as TimeoutUnit },
];

interface Step3Data {
  pricingType: "free" | "paid";
  price: number;
  permanentAccess: boolean;
  timeoutValue: number;
  timeoutUnit: TimeoutUnit;
  allowedWallets: string[];
  deniedWallets: string[];
}

interface Step4Data {
  selectedWalletUuid: string;
}

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
      icon: <LinkIcon className="h-5 w-5" />,
    },
    {
      id: 2,
      title: t("stepper.step2.title"),
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: 3,
      title: t("stepper.step3.title"),
      icon: <Settings className="h-5 w-5" />,
    },
    {
      id: 4,
      title: t("stepper.step4.title"),
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
    name: "",
    license: "GDC-Privacy-Standard-v1",
    description: "",
  });

  const [step3Data, setStep3Data] = useState<Step3Data>({
    pricingType: "free",
    price: 0,
    permanentAccess: true,
    timeoutValue: 1,
    timeoutUnit: "minutes",
    allowedWallets: [],
    deniedWallets: [],
  });

  const [step4Data, setStep4Data] = useState<Step4Data>({
    selectedWalletUuid: "",
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

      const payload: CreateDataAssetRequest = {
        source,
        name: step2Data.name.trim(),
        license: step2Data.license.trim(),
        author: activeOrg?.name ?? user?.email ?? "",
        description: step2Data.description.trim(),
        pricing: {
          type: step3Data.pricingType,
          price: String(step3Data.pricingType === "free" ? 0 : step3Data.price),
        },
        access_config: {
          allowed_addresses: step3Data.allowedWallets,
          denied_addresses: step3Data.deniedWallets,
          timeout: step3Data.permanentAccess
            ? 0
            : step3Data.timeoutValue *
              TIMEOUT_UNIT_TO_SECONDS[step3Data.timeoutUnit],
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
      ? t("step3.pricing.free")
      : `${t("step3.pricing.paid")} (${step3Data.price} tokens)`;

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
                  <CardTitle>{t("step1.title")}</CardTitle>
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

          {/* ===== STEP 2: Metadata ===== */}
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
                  <CardTitle>{t("step2.title")}</CardTitle>
                  <CardDescription>{t("step2.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="assetName">{t("step2.name.label")}</Label>
                    <Input
                      id="assetName"
                      placeholder={t("step2.name.placeholder")}
                      value={step2Data.name}
                      onChange={(e) =>
                        setStep2Data((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assetLicense">
                      {t("step2.license.label")}
                    </Label>
                    <Input
                      id="assetLicense"
                      placeholder={t("step2.license.placeholder")}
                      value={step2Data.license}
                      onChange={(e) =>
                        setStep2Data((prev) => ({
                          ...prev,
                          license: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assetDescription">
                      {t("step2.descriptionField.label")}
                    </Label>
                    <Textarea
                      id="assetDescription"
                      placeholder={t("step2.descriptionField.placeholder")}
                      rows={4}
                      value={step2Data.description}
                      onChange={(e) =>
                        setStep2Data((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t("navigation.back")}
                    </Button>
                    <Button onClick={() => setCurrentStep(3)}>
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
                  <CardTitle>{t("step3.title")}</CardTitle>
                  <CardDescription>{t("step3.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pricing radio */}
                  <div className="space-y-3">
                    <Label>{t("step3.pricing.label")}</Label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="pricingType"
                          checked={step3Data.pricingType === "free"}
                          onChange={() =>
                            setStep3Data((prev) => ({
                              ...prev,
                              pricingType: "free",
                              price: 0,
                            }))
                          }
                          className="accent-primary"
                        />
                        <span className="text-sm font-medium">
                          {t("step3.pricing.free")}
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="pricingType"
                          checked={step3Data.pricingType === "paid"}
                          onChange={() =>
                            setStep3Data((prev) => ({
                              ...prev,
                              pricingType: "paid",
                            }))
                          }
                          className="accent-primary"
                        />
                        <span className="text-sm font-medium">
                          {t("step3.pricing.paid")}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Price input (only if paid) */}
                  {step3Data.pricingType === "paid" && (
                    <div className="space-y-2">
                      <Label htmlFor="priceTokens">
                        {t("step3.pricing.priceLabel")}
                      </Label>
                      <Input
                        id="priceTokens"
                        type="number"
                        min={0}
                        step={0.01}
                        placeholder="0"
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

                  {/* Access config card */}
                  <div className="space-y-5 p-4 border rounded-lg bg-muted/30">
                    <h3 className="font-semibold">
                      {t("step3.accessConfig.title")}
                    </h3>

                    {/* Access timeout */}
                    <div className="space-y-3">
                      <Label>{t("step3.accessConfig.timeoutLabel")}</Label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accessTime"
                          checked={step3Data.permanentAccess}
                          onChange={() =>
                            setStep3Data((prev) => ({
                              ...prev,
                              permanentAccess: true,
                            }))
                          }
                          className="accent-primary"
                        />
                        <span className="text-sm flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {t("step3.accessConfig.permanentLabel")}
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accessTime"
                          checked={!step3Data.permanentAccess}
                          onChange={() =>
                            setStep3Data((prev) => ({
                              ...prev,
                              permanentAccess: false,
                            }))
                          }
                          className="accent-primary"
                        />
                        <span className="text-sm">
                          {t("step3.accessConfig.customLabel")}
                        </span>
                      </label>

                      {!step3Data.permanentAccess && (
                        <div className="space-y-3 ml-6">
                          <div className="flex items-center gap-3">
                            <Input
                              type="number"
                              min={1}
                              value={step3Data.timeoutValue}
                              onChange={(e) =>
                                setStep3Data((prev) => ({
                                  ...prev,
                                  timeoutValue: parseInt(e.target.value) || 1,
                                }))
                              }
                              className="w-24"
                            />
                            <Select
                              value={step3Data.timeoutUnit}
                              onValueChange={(v) =>
                                setStep3Data((prev) => ({
                                  ...prev,
                                  timeoutUnit: v as TimeoutUnit,
                                }))
                              }
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="minutes">
                                  {t("step3.accessConfig.units.minutes")}
                                </SelectItem>
                                <SelectItem value="hours">
                                  {t("step3.accessConfig.units.hours")}
                                </SelectItem>
                                <SelectItem value="days">
                                  {t("step3.accessConfig.units.days")}
                                </SelectItem>
                                <SelectItem value="weeks">
                                  {t("step3.accessConfig.units.weeks")}
                                </SelectItem>
                                <SelectItem value="months">
                                  {t("step3.accessConfig.units.months")}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Presets */}
                          <div className="flex flex-wrap gap-2">
                            {TIMEOUT_PRESETS.map((preset) => {
                              const isActive =
                                step3Data.timeoutValue === preset.value &&
                                step3Data.timeoutUnit === preset.unit;
                              return (
                                <Badge
                                  key={preset.label}
                                  variant={isActive ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() =>
                                    setStep3Data((prev) => ({
                                      ...prev,
                                      permanentAccess: false,
                                      timeoutValue: preset.value,
                                      timeoutUnit: preset.unit,
                                    }))
                                  }
                                >
                                  {preset.label}
                                </Badge>
                              );
                            })}
                          </div>

                          {/* Total duration in seconds */}
                          <p className="text-xs text-primary">
                            {t("step3.accessConfig.totalDuration", {
                              seconds: (
                                step3Data.timeoutValue *
                                TIMEOUT_UNIT_TO_SECONDS[step3Data.timeoutUnit]
                              ).toLocaleString(),
                            })}
                          </p>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Users Allowed (placeholder) */}
                    <div className="space-y-2">
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
                    </div>

                    {/* Users Denied (placeholder) */}
                    <div className="space-y-2">
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
                    </div>

                    {/* Orgs Allowed (placeholder) */}
                    <div className="space-y-2">
                      <Label>{t("step3.accessConfig.orgsAllowed")}</Label>
                      <Select disabled>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              "step3.accessConfig.orgsAllowedPlaceholder",
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="_">—</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Orgs Denied (placeholder) */}
                    <div className="space-y-2">
                      <Label>{t("step3.accessConfig.orgsDenied")}</Label>
                      <Select disabled>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              "step3.accessConfig.orgsDeniedPlaceholder",
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="_">—</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* Wallets allowed (manual) */}
                    <div className="space-y-3">
                      <Label className="font-semibold text-primary">
                        {t("step3.accessConfig.walletsAllowed")}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="0x..."
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
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            addWalletAddress(
                              "allowedWallets",
                              allowedWalletInput,
                            );
                            setAllowedWalletInput("");
                          }}
                          disabled={!allowedWalletInput.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t("step3.accessConfig.walletsAllowedHint")}
                      </p>
                      {step3Data.allowedWallets.length > 0 && (
                        <div className="space-y-1.5">
                          {step3Data.allowedWallets.map((addr, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between rounded-md border px-3 py-2 bg-background"
                            >
                              <code className="text-xs font-mono text-muted-foreground truncate">
                                {addr}
                              </code>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0 text-destructive hover:text-destructive"
                                onClick={() =>
                                  removeWalletAddress("allowedWallets", i)
                                }
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Wallets denied (manual) */}
                    <div className="space-y-3">
                      <Label className="font-semibold text-primary">
                        {t("step3.accessConfig.walletsDenied")}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="0x..."
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
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            addWalletAddress(
                              "deniedWallets",
                              deniedWalletInput,
                            );
                            setDeniedWalletInput("");
                          }}
                          disabled={!deniedWalletInput.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t("step3.accessConfig.walletsDeniedHint")}
                      </p>
                      {step3Data.deniedWallets.length > 0 && (
                        <div className="space-y-1.5">
                          {step3Data.deniedWallets.map((addr, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between rounded-md border px-3 py-2 bg-background"
                            >
                              <code className="text-xs font-mono text-muted-foreground truncate">
                                {addr}
                              </code>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0 text-destructive hover:text-destructive"
                                onClick={() =>
                                  removeWalletAddress("deniedWallets", i)
                                }
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

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
                  <CardTitle>{t("step4.title")}</CardTitle>
                  <CardDescription>{t("step4.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    {t("step4.instruction")}
                  </p>

                  {/* Summary */}
                  <div className="rounded-lg border p-4 space-y-2 bg-muted/30">
                    <h3 className="font-semibold text-sm">
                      {t("step4.summary.title")}
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-muted-foreground">
                          {t("step4.summary.sourceType")}:
                        </span>{" "}
                        <span className="font-medium">{sourceLabel}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">
                          {t("step4.summary.name")}:
                        </span>{" "}
                        <span className="font-medium">
                          {step2Data.name || "—"}
                        </span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">
                          {t("step4.summary.pricing")}:
                        </span>{" "}
                        <span className="font-medium">{pricingLabel}</span>
                      </p>
                    </div>
                  </div>

                  {/* Wallet selector (organization wallets only) */}
                  <div className="space-y-2">
                    <Label>{t("step4.wallet.label")}</Label>
                    {orgWallets.length === 0 ? (
                      <p className="text-sm text-destructive">
                        {t("step4.wallet.noOrgWallets")}
                      </p>
                    ) : (
                      <Select
                        value={step4Data.selectedWalletUuid}
                        onValueChange={(v) =>
                          setStep4Data((prev) => ({
                            ...prev,
                            selectedWalletUuid: v,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("step4.wallet.placeholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {orgWallets.map((w) => {
                            const isPrimary = activeOrg?.primaryWallets?.some(
                              (p) => p.uuid === w.uuid,
                            );
                            return (
                              <SelectItem key={w.uuid} value={w.uuid}>
                                <div className="flex flex-col">
                                  <span className="text-sm">
                                    {isPrimary
                                      ? t("step4.wallet.primary")
                                      : t("step4.wallet.managed")}
                                  </span>
                                  <span className="text-xs font-mono text-muted-foreground">
                                    {w.address}
                                    {isPrimary
                                      ? ` (${t("step4.wallet.primaryBadge")})`
                                      : ""}
                                  </span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

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
                        !step4Data.selectedWalletUuid ||
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
