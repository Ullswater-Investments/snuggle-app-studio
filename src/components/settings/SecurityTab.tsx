import { useState } from "react";
import { KeyRound, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ApiError } from "@/services/api";
import { authService, type UpdatePasswordRequest } from "@/services/authService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

const passwordRules = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .regex(/[a-zA-Z]/, "La contraseña debe incluir al menos una letra")
  .regex(/[0-9]/, "La contraseña debe incluir al menos un número")
  .regex(
    /[!@#$%&*_+\-=[\]./]/,
    "La contraseña debe incluir al menos un símbolo (ej: @, #, $, %)",
  )
  .max(72, "Contraseña demasiado larga");

const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Introduce tu contraseña actual"),
    new_password: passwordRules,
    new_password_confirmation: z.string().min(1, "Confirma tu nueva contraseña"),
  })
  .refine((d) => d.new_password === d.new_password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["new_password_confirmation"],
  });

type ChangePasswordData = z.infer<typeof changePasswordSchema>;

export function SecurityTab() {
  const { t } = useTranslation("settings");
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const onSubmit = async (data: ChangePasswordData) => {
    setLoading(true);
    try {
      await authService.updatePassword(data as UpdatePasswordRequest);
      toast.success(t("profile.securityTab.success"));
      form.reset();
      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          toast.error(t("profile.securityTab.errorUnauthorized"));
        } else {
          toast.error(err.message);
        }
      } else {
        toast.error(t("profile.securityTab.errorGeneric"));
      }
    } finally {
      setLoading(false);
    }
  };

  const ToggleButton = ({
    show,
    onToggle,
  }: {
    show: boolean;
    onToggle: () => void;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
      onClick={onToggle}
      tabIndex={-1}
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </Button>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <KeyRound className="size-5 text-primary" />
          <CardTitle>{t("profile.securityTab.title")}</CardTitle>
        </div>
        <CardDescription>
          {t("profile.securityTab.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.securityTab.currentPassword")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showCurrent ? "text" : "password"}
                        placeholder={t("profile.securityTab.currentPasswordPlaceholder")}
                        {...field}
                      />
                      <ToggleButton show={showCurrent} onToggle={() => setShowCurrent(!showCurrent)} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.securityTab.newPassword")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNew ? "text" : "password"}
                        placeholder={t("profile.securityTab.newPasswordPlaceholder")}
                        {...field}
                      />
                      <ToggleButton show={showNew} onToggle={() => setShowNew(!showNew)} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.securityTab.confirmPassword")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder={t("profile.securityTab.confirmPasswordPlaceholder")}
                        {...field}
                      />
                      <ToggleButton show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert variant="default" className="bg-muted/50">
              <ShieldAlert className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {t("profile.securityTab.passwordHint", { count: 8 })}
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              <KeyRound className="mr-2 h-4 w-4" />
              {loading
                ? t("profile.securityTab.updating")
                : t("profile.securityTab.updateButton")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
