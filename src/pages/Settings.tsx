import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Server, Building2, User, Webhook, Shield } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";

const Settings = () => {
  const navigate = useNavigate();

  const settingsModules = [
    {
      title: "Configuración ERP",
      description: "Gestiona la conexión con sistemas ERP externos",
      icon: Server,
      path: "/settings/erp-config",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Webhooks",
      description: "Configura notificaciones automáticas a tus sistemas",
      icon: Webhook,
      path: "/settings/webhooks",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Logs de Auditoría",
      description: "Registro inmutable de acciones críticas (GDPR/EU Data Act)",
      icon: Shield,
      path: "/settings/audit",
      color: "text-red-600 dark:text-red-400",
    },
    {
      title: "Perfil de Organización",
      description: "Administra los datos de tu organización",
      icon: Building2,
      path: "/settings/organization",
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Preferencias de Usuario",
      description: "Personaliza tu experiencia en la plataforma",
      icon: User,
      path: "/settings/preferences",
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-500/10 via-background to-background border border-gray-500/20 p-8">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4">
              <SettingsIcon className="mr-1 h-3 w-3" />
              Configuración
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              Configuración del Sistema
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Administra las configuraciones de tu organización, integraciones y preferencias personales.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {settingsModules.map((module) => (
            <Card
              key={module.path}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
              onClick={() => navigate(module.path)}
            >
              <CardHeader>
                <div className="mb-4">
                  <module.icon className={`h-12 w-12 ${module.color}`} />
                </div>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-primary font-medium hover:underline">
                  Configurar →
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};

export default Settings;