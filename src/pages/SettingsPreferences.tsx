import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Bell, Eye, Palette, Shield } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { usePrivacyPreferences } from "@/hooks/usePrivacyPreferences";

const SettingsPreferences = () => {
  const { preferences, loading, updatePreference } = usePrivacyPreferences();

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <div className="rounded-lg border p-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-10 w-64 mb-3" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-10 w-48" />
                  <Skeleton className="h-6 w-12" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-10 w-48" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-500/10 via-background to-background border border-purple-500/20 p-8">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4">
              <User className="mr-1 h-3 w-3" />
              Preferencias
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              Preferencias de Usuario
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Personaliza tu experiencia en <span className="procuredata-gradient">PROCUREDATA</span> según tus necesidades.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid gap-6">
          {/* Privacy & Security Card - Connected to usePrivacyPreferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Privacidad y Seguridad</CardTitle>
              </div>
              <CardDescription>
                Controla quién puede ver tu información y cómo se usa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profile-visible">Perfil Visible</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite que otras organizaciones vean tu perfil público
                  </p>
                </div>
                <Switch
                  id="profile-visible"
                  checked={preferences.profile_visible}
                  onCheckedChange={(value) => updatePreference("profile_visible", value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-access-history">Historial de Acceso</Label>
                  <p className="text-sm text-muted-foreground">
                    Mostrar historial de quién ha accedido a tus datos
                  </p>
                </div>
                <Switch
                  id="show-access-history"
                  checked={preferences.show_access_history}
                  onCheckedChange={(value) => updatePreference("show_access_history", value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="access-alerts">Alertas de Acceso</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones cuando accedan a tus datos
                  </p>
                </div>
                <Switch
                  id="access-alerts"
                  checked={preferences.access_alerts}
                  onCheckedChange={(value) => updatePreference("access_alerts", value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymous-research">Investigación Anónima</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir uso anónimo de datos para investigación
                  </p>
                </div>
                <Switch
                  id="anonymous-research"
                  checked={preferences.anonymous_research}
                  onCheckedChange={(value) => updatePreference("anonymous_research", value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notificaciones</CardTitle>
              </div>
              <CardDescription>
                Configura cómo y cuándo deseas recibir notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe actualizaciones de solicitudes por correo electrónico
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Notificaciones Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Alertas en tiempo real sobre cambios en tus solicitudes
                  </p>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-digest">Resumen Semanal</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe un resumen semanal de actividad
                  </p>
                </div>
                <Switch id="weekly-digest" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <CardTitle>Visualización</CardTitle>
              </div>
              <CardDescription>
                Ajusta cómo se muestra la información en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-view">Vista Compacta</Label>
                  <p className="text-sm text-muted-foreground">
                    Muestra más información en menos espacio
                  </p>
                </div>
                <Switch id="compact-view" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-demo-banner">Mostrar Banner Demo</Label>
                  <p className="text-sm text-muted-foreground">
                    Muestra el banner de modo demostración
                  </p>
                </div>
                <Switch id="show-demo-banner" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <CardTitle>Apariencia</CardTitle>
              </div>
              <CardDescription>
                Personaliza el tema y colores de la interfaz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Modo Oscuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Activa el tema oscuro automáticamente
                  </p>
                </div>
                <Switch id="dark-mode" />
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
};

export default SettingsPreferences;
