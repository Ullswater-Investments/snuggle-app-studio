import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SecurityTab() {
  const { t } = useTranslation("settings");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lock className="size-5 text-primary" />
          <CardTitle>{t("profile.securityTab.title")}</CardTitle>
        </div>
        <CardDescription>
          {t("profile.securityTab.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{t("profile.securityTab.comingSoon")}</p>
      </CardContent>
    </Card>
  );
}
