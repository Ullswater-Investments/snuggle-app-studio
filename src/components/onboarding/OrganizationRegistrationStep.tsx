import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Building2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Loader2,
  ArrowLeft,
  ArrowRight,
  FileText,
  Shield,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useQueryClient } from "@tanstack/react-query";
import { useGovernanceSettings } from "@/hooks/useGovernanceSettings";

const COUNTRIES = [
  "España", "Portugal", "Francia", "Alemania", "Italia", "Reino Unido",
  "Países Bajos", "Bélgica", "Austria", "Suiza", "Polonia", "Suecia",
  "Noruega", "Dinamarca", "Finlandia", "Irlanda", "Grecia", "República Checa",
  "Hungría", "Rumanía", "Bulgaria", "Croacia", "Eslovaquia", "Eslovenia",
  "Lituania", "Letonia", "Estonia", "Luxemburgo", "Malta", "Chipre"
];

const SECTORS = [
  { value: "industrial", label: "Industrial / Manufactura" },
  { value: "comercio", label: "Comercio / Retail" },
  { value: "agroalimentario", label: "Agroalimentario" },
  { value: "tecnologia", label: "Tecnología / Software" },
  { value: "energia", label: "Energía / Utilities" },
  { value: "construccion", label: "Construcción / Inmobiliario" },
  { value: "transporte", label: "Transporte / Logística" },
  { value: "salud", label: "Salud / Farmacéutico" },
  { value: "financiero", label: "Financiero / Seguros" },
  { value: "servicios", label: "Servicios Profesionales" },
  { value: "educacion", label: "Educación / Formación" },
  { value: "turismo", label: "Turismo / Hostelería" },
  { value: "otro", label: "Otro" },
];

const COMPANY_SIZES = [
  { value: "micro", label: "Micro (1-9 empleados)" },
  { value: "small", label: "Pequeña (10-49 empleados)" },
  { value: "medium", label: "Mediana (50-249 empleados)" },
  { value: "large", label: "Grande (250+ empleados)" },
];

// Map country codes to display names
const COUNTRY_CODE_MAP: Record<string, string> = {
  ES: "España", PT: "Portugal", FR: "Francia", DE: "Alemania", IT: "Italia",
  GB: "Reino Unido", NL: "Países Bajos", BE: "Bélgica", AT: "Austria",
  CH: "Suiza", PL: "Polonia", SE: "Suecia", NO: "Noruega", DK: "Dinamarca",
  FI: "Finlandia", IE: "Irlanda", GR: "Grecia", CZ: "República Checa",
  HU: "Hungría", RO: "Rumanía", BG: "Bulgaria", HR: "Croacia",
  SK: "Eslovaquia", SI: "Eslovenia", LT: "Lituania", LV: "Letonia",
  EE: "Estonia", LU: "Luxemburgo", MT: "Malta", CY: "Chipre",
};

const organizationSchema = z.object({
  legalName: z.string().min(2, "El nombre legal debe tener al menos 2 caracteres"),
  documentType: z.enum(["CIF", "VAT"], { required_error: "Selecciona un tipo de documento" }),
  documentNumber: z.string().min(5, "Introduce un número de documento válido"),
  country: z.string().min(1, "Selecciona un país"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  sector: z.string().min(1, "Selecciona un sector"),
  size: z.string().min(1, "Selecciona el tamaño de la empresa"),
  acceptTerms: z.boolean().refine(val => val === true, "Debes aceptar los términos y condiciones"),
  acceptPrivacy: z.boolean().refine(val => val === true, "Debes aceptar la política de privacidad"),
  acceptDataProcessing: z.boolean().refine(val => val === true, "Debes aceptar el acuerdo de procesamiento de datos"),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

interface VerificationData {
  did: string;
  verificationSource: string;
}

interface OrganizationRegistrationStepProps {
  walletAddress: string | null;
  onBack: () => void;
}

export function OrganizationRegistrationStep({ walletAddress, onBack }: OrganizationRegistrationStepProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { switchOrganization } = useOrganizationContext();
  const queryClient = useQueryClient();
  const { requireDeltadaoOnboarding, isLoading: govLoading } = useGovernanceSettings();
  const [walletInput, setWalletInput] = useState(walletAddress || "");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [lockedFields, setLockedFields] = useState<Set<string>>(new Set());

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      legalName: "",
      documentType: undefined,
      documentNumber: "",
      country: "",
      address: "",
      sector: "",
      size: "",
      acceptTerms: false,
      acceptPrivacy: false,
      acceptDataProcessing: false,
    },
  });

  useEffect(() => {
    if (!walletAddress) {
      const storedWallet = localStorage.getItem('pending_wallet_address');
      if (storedWallet) {
        setWalletInput(storedWallet);
      }
    }
  }, [walletAddress]);

  const handleVerifyWallet = async () => {
    if (!walletInput || !walletInput.startsWith('0x')) {
      setVerificationError("Introduce una dirección de wallet válida (0x...)");
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);
    setVerificationData(null);
    setLockedFields(new Set());

    try {
      const response = await fetch(
        `https://api.procuredata.org/api/wallets/identity/${walletInput}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.verified === true && data.company) {
        setIsVerified(true);

        // Store DID and verification source
        setVerificationData({
          did: data.digital_identity || data.did || "",
          verificationSource: data.verification_source || "DeltaDAO",
        });

        // Auto-fill form fields from API response
        const fieldsToLock = new Set<string>();
        const company = data.company;

        if (company.name) {
          form.setValue("legalName", company.name, { shouldValidate: true });
          fieldsToLock.add("legalName");
        }

        if (company.document) {
          form.setValue("documentNumber", company.document, { shouldValidate: true });
          fieldsToLock.add("documentNumber");
          // Auto-detect document type
          if (company.document_country_code === "ES") {
            form.setValue("documentType", "CIF", { shouldValidate: true });
            fieldsToLock.add("documentType");
          } else {
            form.setValue("documentType", "VAT", { shouldValidate: true });
            fieldsToLock.add("documentType");
          }
        }

        if (company.document_country_code) {
          const countryName = COUNTRY_CODE_MAP[company.document_country_code.toUpperCase()];
          if (countryName) {
            form.setValue("country", countryName, { shouldValidate: true });
            fieldsToLock.add("country");
          }
        }

        if (company.headquarters_address) {
          const addr = company.headquarters_address;
          const parts = [
            addr.street,
            addr.city,
            addr.postal_code,
          ].filter(Boolean);

          if (parts.length > 0) {
            form.setValue("address", parts.join(", "), { shouldValidate: true });
            fieldsToLock.add("address");
          }
        }

        setLockedFields(fieldsToLock);
        toast.success("¡Wallet verificada! Datos de la empresa autocompletados.");
      } else {
        setIsVerified(false);
        setVerificationError(
          "Esta wallet no ha sido verificada todavía. Por favor, vuelve a intentarlo cuando hayas completado satisfactoriamente el Onboarding en DeltaDAO."
        );
      }
    } catch (error) {
      console.error("Wallet verification error:", error);
      setIsVerified(false);
      setVerificationError(
        "Esta wallet no ha sido verificada todavía. Por favor, vuelve a intentarlo cuando hayas completado satisfactoriamente el Onboarding en DeltaDAO."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const onSubmit = async (data: OrganizationFormData) => {
    // Only require wallet verification when DeltaDAO onboarding is active
    if (requireDeltadaoOnboarding && !isVerified) {
      toast.error("Debes verificar tu wallet antes de continuar");
      return;
    }

    if (!user?.id) {
      toast.error("Debes estar autenticado para registrar una organización");
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if organization with this tax_id already exists
      const { data: existingOrgByTaxId } = await supabase
        .from('organizations')
        .select('id, name')
        .eq('tax_id', data.documentNumber)
        .maybeSingle();

      if (existingOrgByTaxId) {
        toast.error("Esta organización ya se encuentra registrada en el ecosistema PROCUREDATA", {
          description: "Si eres un nuevo miembro, por favor solicita una invitación al administrador actual de tu organización.",
          duration: 10000,
          action: {
            label: "Solicitar invitación",
            onClick: () => navigate('/onboarding/request-invite'),
          },
        });
        setIsSubmitting(false);
        return;
      }

      // Check if organization with this wallet_address already exists (only if wallet provided)
      if (walletInput) {
        const { data: existingOrgByWallet } = await supabase
          .from('organizations')
          .select('id, name')
          .eq('wallet_address', walletInput)
          .maybeSingle();

        if (existingOrgByWallet) {
          toast.error("Esta organización ya está registrada en PROCUREDATA", {
            description: "Si eres un nuevo miembro, por favor solicita una invitación al administrador actual de tu organización.",
            duration: 10000,
            action: {
              label: "Solicitar invitación",
              onClick: () => navigate('/onboarding/request-invite'),
            },
          });
          setIsSubmitting(false);
          return;
        }
      }

      const { data: newOrg, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: data.legalName,
          tax_id: data.documentNumber,
          type: 'provider' as const,
          sector: data.sector,
          kyb_verified: requireDeltadaoOnboarding ? true : false,
          wallet_address: walletInput || null,
          description: `${data.address}, ${data.country}`,
          is_demo: false,
          did: verificationData?.did || null,
          verification_source: requireDeltadaoOnboarding ? (verificationData?.verificationSource || "DeltaDAO") : "local",
        })
        .select('id')
        .single();

      if (orgError) throw orgError;

      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          organization_id: newOrg.id,
          role: 'admin' as const,
        });

      if (roleError) throw roleError;

      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          organization_id: newOrg.id,
          full_name: user.email?.split('@')[0] || 'Usuario',
          position: 'Administrador',
        });

      if (profileError) {
        console.warn('Profile creation warning:', profileError);
      }

      const { error: walletError } = await supabase
        .from('wallets')
        .insert({
          organization_id: newOrg.id,
          address: walletInput,
          balance: 0,
          currency: 'EUR',
        });

      if (walletError) {
        console.warn('Wallet creation warning:', walletError);
      }

      localStorage.removeItem('pending_wallet_address');
      localStorage.removeItem('pending_registration_wallet');

      await queryClient.invalidateQueries({ queryKey: ['user-organizations'] });
      await new Promise(resolve => setTimeout(resolve, 500));
      switchOrganization(newOrg.id);

      toast.success("¡Organización registrada y vinculada exitosamente!", {
        description: "Ya puedes operar con tu nueva empresa.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error("Error al registrar la organización", {
        description: error.message || "Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldLocked = (fieldName: string) => lockedFields.has(fieldName);

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">
          Registro de Organización
        </CardTitle>
        <CardDescription className="text-base">
          Completa los datos de tu empresa para unirte a la red PROCUREDATA
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* DeltaDAO Verification Section - only when governance requires it */}
        {requireDeltadaoOnboarding && (
        <div className={`p-5 rounded-xl border-2 transition-all ${isVerified
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            : verificationError
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              : 'bg-muted/50 border-muted'
          }`}>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Verificación DeltaDAO</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Para registrar tu organización, tu wallet debe estar verificada en el ecosistema DeltaDAO.
          </p>

          <div className="flex gap-2">
            <Input
              placeholder="0x..."
              value={walletInput}
              onChange={(e) => {
                setWalletInput(e.target.value);
                setIsVerified(false);
                setVerificationError(null);
                setVerificationData(null);
                setLockedFields(new Set());
                form.reset();
              }}
              className="font-mono text-sm"
              disabled={isVerified}
            />
            <Button
              type="button"
              onClick={handleVerifyWallet}
              disabled={isVerifying || isVerified || !walletInput}
              variant={isVerified ? "outline" : "default"}
              className="shrink-0"
            >
              {isVerifying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isVerified ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                "Verificar Wallet"
              )}
            </Button>
          </div>

          {isVerified && (
            <div className="flex items-center gap-2 mt-3 text-green-700 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">Wallet verificada en DeltaDAO</span>
            </div>
          )}

          {isVerified && verificationData?.did && (
            <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded text-xs font-mono text-green-800 dark:text-green-300 break-all">
              DID: {verificationData.did}
            </div>
          )}

          {verificationError && (
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2 text-red-700 dark:text-red-400">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-sm font-medium">No se encontró un registro válido en DeltaDAO para esta organización</span>
              </div>
              <a
                href="https://onboarding.delta-dao.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Completar onboarding de DeltaDAO
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
        )}

        {/* Organization Form */}
        <div className={`transition-all duration-300 ${(requireDeltadaoOnboarding && !isVerified) ? 'opacity-50 pointer-events-none' : ''}`}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Company Name */}
              <FormField
                control={form.control}
                name="legalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      Nombre legal de la empresa
                      {isFieldLocked("legalName") && <Lock className="h-3 w-3 text-green-600" />}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Acme Industries S.L."
                        {...field}
                        disabled={isFieldLocked("legalName")}
                        className={isFieldLocked("legalName") ? "bg-muted/60" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Document Type and Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5">
                        Tipo de documento
                        {isFieldLocked("documentType") && <Lock className="h-3 w-3 text-green-600" />}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isFieldLocked("documentType")}
                      >
                        <FormControl>
                          <SelectTrigger className={isFieldLocked("documentType") ? "bg-muted/60" : ""}>
                            <SelectValue placeholder="Seleccionar..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CIF">CIF (España)</SelectItem>
                          <SelectItem value="VAT">VAT Number (UE)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="documentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5">
                        Número de documento
                        {isFieldLocked("documentNumber") && <Lock className="h-3 w-3 text-green-600" />}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: B12345678"
                          {...field}
                          disabled={isFieldLocked("documentNumber")}
                          className={isFieldLocked("documentNumber") ? "bg-muted/60" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      País
                      {isFieldLocked("country") && <Lock className="h-3 w-3 text-green-600" />}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isFieldLocked("country")}
                    >
                      <FormControl>
                        <SelectTrigger className={isFieldLocked("country") ? "bg-muted/60" : ""}>
                          <SelectValue placeholder="Seleccionar país..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      Dirección de sede
                      {isFieldLocked("address") && <Lock className="h-3 w-3 text-green-600" />}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Calle Principal 123, 28001 Madrid"
                        {...field}
                        disabled={isFieldLocked("address")}
                        className={isFieldLocked("address") ? "bg-muted/60" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sector and Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sector industrial</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar sector..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SECTORS.map((sector) => (
                            <SelectItem key={sector.value} value={sector.value}>
                              {sector.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamaño de empresa</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tamaño..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COMPANY_SIZES.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Locked fields notice */}
              {lockedFields.size > 0 && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-sm text-green-800 dark:text-green-300">
                  <Lock className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    Los campos marcados con <Lock className="h-3 w-3 inline" /> han sido autocompletados desde la verificación de identidad y no pueden modificarse.
                  </span>
                </div>
              )}

              {/* Legal Consents */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Consentimientos legales
                </h4>

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          Acepto los{" "}
                          <a href="/terms" className="text-primary hover:underline" target="_blank">
                            Términos y Condiciones
                          </a>
                          {" "}de PROCUREDATA
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptPrivacy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          Acepto la{" "}
                          <a href="/privacy" className="text-primary hover:underline" target="_blank">
                            Política de Privacidad
                          </a>
                          {" "}y el tratamiento de mis datos
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptDataProcessing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal cursor-pointer flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Acepto el{" "}
                          <a href="/dpa" className="text-primary hover:underline" target="_blank">
                            Acuerdo de Procesamiento de Datos (DPA)
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={onBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver
                </Button>
                <Button
                  type="submit"
                  variant="brand"
                  className="flex-1 gap-2"
                  disabled={(requireDeltadaoOnboarding && !isVerified) || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Solicitud
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
