import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Server, Building2, User, Webhook, Shield, BellRing, Coins } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";

const Settings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('settings');

  const settingsModules = [
    {
      title: t('main.modules.erp.title'),
      description: t('main.modules.erp.description'),
      icon: Server,
      path: "/settings/erp-config",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: t('main.modules.webhooks.title'),
      description: t('main.modules.webhooks.description'),
      icon: Webhook,
      path: "/settings/webhooks",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      title: t('main.modules.audit.title'),
      description: t('main.modules.audit.description'),
      icon: Shield,
      path: "/settings/audit",
      color: "text-red-600 dark:text-red-400",
    },
    {
      title: t('main.modules.organization.title'),
      description: t('main.modules.organization.description'),
      icon: Building2,
      path: "/settings/organization",
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: t('main.modules.preferences.title'),
      description: t('main.modules.preferences.description'),
      icon: User,
      path: "/settings/preferences",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: t('main.modules.notifications.title'),
      description: t('main.modules.notifications.description'),
      icon: BellRing,
      path: "/settings/notifications",
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Token Wallet IA",
      description: "Consulta el consumo de tokens y saldo de tu wallet virtual",
      icon: Coins,
      path: "/token-wallet",
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-500/10 via-background to-background border border-gray-500/20 p-8">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4">
              <SettingsIcon className="mr-1 h-3 w-3" />
              {t('main.badge')}
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              {t('main.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t('main.description')}
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
                  {t('main.configure')}
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
