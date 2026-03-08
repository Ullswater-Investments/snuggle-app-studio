import { Palette } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AppearanceTab() {
  const { t } = useTranslation("settings");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Palette className="size-5 text-primary" />
          <CardTitle>{t("profile.appearanceTab.title")}</CardTitle>
        </div>
        <CardDescription>
          {t("profile.appearanceTab.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{t("profile.appearanceTab.comingSoon")}</p>
      </CardContent>
    </Card>
  );
}
