import { User, Wallet, Palette, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { WalletTab } from "@/components/settings/WalletTab";
import { AppearanceTab } from "@/components/settings/AppearanceTab";
import { SecurityTab } from "@/components/settings/SecurityTab";

export default function SettingsProfile() {
  const { t } = useTranslation("settings");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("profile.pageTitle")}</h1>
        <p className="text-muted-foreground mt-1">
          {t("profile.pageDescription")}
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="w-full">
          <TabsTrigger value="profile" className="flex-1 gap-2">
            <User className="size-4" />
            {t("profile.tabs.profile")}
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex-1 gap-2">
            <Wallet className="size-4" />
            {t("profile.tabs.wallet")}
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex-1 gap-2">
            <Palette className="size-4" />
            {t("profile.tabs.appearance")}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1 gap-2">
            <Lock className="size-4" />
            {t("profile.tabs.security")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="wallet">
          <WalletTab />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
