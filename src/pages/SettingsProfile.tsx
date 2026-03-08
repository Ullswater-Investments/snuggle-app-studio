import { User, Wallet, Palette, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { WalletTab } from "@/components/settings/WalletTab";
import { AppearanceTab } from "@/components/settings/AppearanceTab";
import { SecurityTab } from "@/components/settings/SecurityTab";

export default function SettingsProfile() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground mt-1">
          Administra tu perfil, preferencias y seguridad de tu cuenta.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="w-full">
          <TabsTrigger value="profile" className="flex-1 gap-2">
            <User className="size-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex-1 gap-2">
            <Wallet className="size-4" />
            Wallet
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex-1 gap-2">
            <Palette className="size-4" />
            Apariencia
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1 gap-2">
            <Lock className="size-4" />
            Seguridad
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
