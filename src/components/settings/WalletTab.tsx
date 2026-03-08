import { Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WalletTab() {
  const { t } = useTranslation("settings");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="size-5 text-primary" />
          <CardTitle>{t("profile.walletTab.title")}</CardTitle>
        </div>
        <CardDescription>
          {t("profile.walletTab.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{t("profile.walletTab.comingSoon")}</p>
      </CardContent>
    </Card>
  );
}
