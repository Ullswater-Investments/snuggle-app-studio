import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  User,
  MapPin,
  Globe,
  Save,
  Mail,
  CreditCard,
  CalendarDays,
  Phone,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/userService";
import { ApiError } from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserProfile {
  user_uuid: string;
  first_name: string;
  last_name: string;
  nationality: string | null;
  country: string;
  ip_country: string;
  city: string | null;
  address: string | null;
  id_number: string;
  postal_code: string | null;
  phone_number: string | null;
  birthdate: string;
  gender: string;
  kyc_verified_at: string;
  uuid: string;
  created_at: string;
  updated_at: string;
  primary_wallet_address: string | null;
  primary_wallet: string | null;
  language?: string | null;
}

const COUNTRIES = [
  { code: "AR", name: "Argentina" },
  { code: "BO", name: "Bolivia" },
  { code: "BR", name: "Brasil" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "CU", name: "Cuba" },
  { code: "DE", name: "Alemania" },
  { code: "DO", name: "República Dominicana" },
  { code: "EC", name: "Ecuador" },
  { code: "ES", name: "España" },
  { code: "FR", name: "Francia" },
  { code: "GT", name: "Guatemala" },
  { code: "HN", name: "Honduras" },
  { code: "IT", name: "Italia" },
  { code: "MX", name: "México" },
  { code: "NI", name: "Nicaragua" },
  { code: "NL", name: "Países Bajos" },
  { code: "PA", name: "Panamá" },
  { code: "PE", name: "Perú" },
  { code: "PT", name: "Portugal" },
  { code: "PY", name: "Paraguay" },
  { code: "SV", name: "El Salvador" },
  { code: "US", name: "Estados Unidos" },
  { code: "UY", name: "Uruguay" },
  { code: "VE", name: "Venezuela" },
];

const LANGUAGES = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "pt", name: "Português" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "nl", name: "Nederlands" },
];

const profileSchema = z.object({
  phone_number: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postal_code: z.string().optional(),
  language: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function ProfileTab() {
  const { t } = useTranslation("settings");
  const { user, reloadUser } = useAuth();
  const profile = user?.profile as unknown as UserProfile | null;
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, setValue, watch } =
    useForm<ProfileFormValues>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        phone_number: profile?.phone_number ?? "",
        address: profile?.address ?? "",
        city: profile?.city ?? "",
        country: profile?.country ?? "",
        postal_code: profile?.postal_code ?? "",
        language: profile?.language ?? "es",
      },
    });

  const countryValue = watch("country");
  const languageValue = watch("language");

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    try {
      await userService.updateProfile({
        first_name: profile?.first_name ?? "",
        last_name: profile?.last_name ?? "",
        id_number: profile?.id_number ?? "",
        birthdate: profile?.birthdate ?? "",
        gender: profile?.gender ?? "",
        phone_number: data.phone_number ?? "",
        address: data.address ?? "",
        city: data.city ?? "",
        country: data.country ?? "",
        postal_code: data.postal_code ?? "",
        language: data.language ?? "",
      });
      toast.success(t("profile.saveSuccess"));
      await reloadUser();
    } catch (err) {
      const message =
        err instanceof ApiError
          ? String((err.data as { message?: string })?.message ?? err.message)
          : t("profile.unknownError");
      toast.error(t("profile.saveError"), { description: message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="size-5 text-primary" />
          <CardTitle>{t("profile.personalInfo.title")}</CardTitle>
        </div>
        <CardDescription>
          {t("profile.personalInfo.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="size-4 text-muted-foreground" />
              {t("profile.personalInfo.email")}
            </Label>
            <Input disabled value={user?.email ?? ""} />
            <p className="text-xs text-muted-foreground">
              {t("profile.personalInfo.emailHint")}
            </p>
          </div>

          {/* Identity Document */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CreditCard className="size-4 text-muted-foreground" />
              {t("profile.personalInfo.identityDocument")}
            </Label>
            <Input disabled value={profile?.id_number ?? ""} />
          </div>

          {/* First Name / Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                {t("profile.personalInfo.firstName")} <span className="text-destructive">*</span>
              </Label>
              <Input disabled value={profile?.first_name ?? ""} />
            </div>
            <div className="space-y-2">
              <Label>
                {t("profile.personalInfo.lastName")} <span className="text-destructive">*</span>
              </Label>
              <Input disabled value={profile?.last_name ?? ""} />
            </div>
          </div>

          {/* Date of Birth / Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" />
                {t("profile.personalInfo.dateOfBirth")}
              </Label>
              <Input disabled value={formatDate(profile?.birthdate)} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground" />
                {t("profile.personalInfo.phone")}
              </Label>
              <Input
                placeholder={t("profile.personalInfo.phonePlaceholder")}
                {...register("phone_number")}
              />
            </div>
          </div>

          {/* Address & Location Section */}
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              <span className="text-sm font-semibold">
                {t("profile.addressLocation.title")}
              </span>
            </div>

            <div className="space-y-2">
              <Label>{t("profile.addressLocation.address")}</Label>
              <Input
                placeholder={t("profile.addressLocation.addressPlaceholder")}
                {...register("address")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t("profile.addressLocation.city")}</Label>
                <Input
                  placeholder={t("profile.addressLocation.cityPlaceholder")}
                  {...register("city")}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("profile.addressLocation.country")}</Label>
                <Select
                  value={countryValue}
                  onValueChange={(val) => setValue("country", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("profile.addressLocation.countryPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("profile.addressLocation.postalCode")}</Label>
                <Input placeholder={t("profile.addressLocation.postalCodePlaceholder")} {...register("postal_code")} />
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="size-4 text-muted-foreground" />
              {t("profile.language")}
            </Label>
            <Select
              value={languageValue}
              onValueChange={(val) => setValue("language", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("profile.languagePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.code} value={l.code}>
                    {l.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Save Button */}
          <Button type="submit" className="gap-2" disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {isSaving ? t("profile.saving") : t("profile.saveChanges")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
