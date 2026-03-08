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
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
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
  const { user } = useAuth();
  const profile = user?.profile as unknown as UserProfile | null;

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

  const onSubmit = (_data: ProfileFormValues) => {
    toast.info("Función disponible próximamente", {
      description:
        "La actualización de perfil estará habilitada en una próxima versión.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="size-5 text-primary" />
          <CardTitle>Información Personal</CardTitle>
        </div>
        <CardDescription>
          Actualiza tu información personal y datos de contacto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="size-4 text-muted-foreground" />
              Email
            </Label>
            <Input disabled value={user?.email ?? ""} />
            <p className="text-xs text-muted-foreground">
              El email no se puede cambiar. Contacta a soporte si necesitas
              actualizarlo.
            </p>
          </div>

          {/* Identity Document */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CreditCard className="size-4 text-muted-foreground" />
              Documento de Identidad (ID / Pasaporte)
            </Label>
            <Input disabled value={profile?.id_number ?? ""} />
          </div>

          {/* First Name / Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input disabled value={profile?.first_name ?? ""} />
            </div>
            <div className="space-y-2">
              <Label>
                Apellido <span className="text-destructive">*</span>
              </Label>
              <Input disabled value={profile?.last_name ?? ""} />
            </div>
          </div>

          {/* Date of Birth / Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" />
                Fecha de Nacimiento
              </Label>
              <Input disabled value={formatDate(profile?.birthdate)} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground" />
                Teléfono
              </Label>
              <Input
                placeholder="+58 412 1234567"
                {...register("phone_number")}
              />
            </div>
          </div>

          {/* Address & Location Section */}
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              <span className="text-sm font-semibold">
                Dirección y Ubicación
              </span>
            </div>

            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input
                placeholder="Calle, número, piso..."
                {...register("address")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Ciudad / Provincia</Label>
                <Input
                  placeholder="Madrid, Barcelona..."
                  {...register("city")}
                />
              </div>
              <div className="space-y-2">
                <Label>País</Label>
                <Select
                  value={countryValue}
                  onValueChange={(val) => setValue("country", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar país" />
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
                <Label>Código Postal</Label>
                <Input placeholder="28001" {...register("postal_code")} />
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="size-4 text-muted-foreground" />
              Idioma
            </Label>
            <Select
              value={languageValue}
              onValueChange={(val) => setValue("language", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar idioma" />
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
          <Button type="submit" className="gap-2">
            <Save className="size-4" />
            Guardar cambios
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
