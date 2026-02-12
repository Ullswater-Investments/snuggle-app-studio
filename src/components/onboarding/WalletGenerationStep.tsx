import { useState } from "react";
import { Wallet, ShieldCheck, Download, Copy, ExternalLink, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ethers } from "ethers";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

interface WalletData {
  address: string;
  encryptedJson: string;
}

interface WalletGenerationStepProps {
  onComplete: (walletAddress: string) => void;
}

export function WalletGenerationStep({ onComplete }: WalletGenerationStepProps) {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const generateWallet = async (data: PasswordFormData) => {
    setIsGenerating(true);
    try {
      // Generate random wallet
      const wallet = ethers.Wallet.createRandom();
      
      // Encrypt wallet with password (this is CPU intensive)
      const encryptedJson = await wallet.encrypt(data.password);
      
      setWalletData({
        address: wallet.address,
        encryptedJson,
      });
      
      toast.success("¡Wallet generada exitosamente!");
    } catch (error) {
      console.error("Error generating wallet:", error);
      toast.error("Error al generar la wallet. Por favor, inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyAddress = async () => {
    if (walletData) {
      await navigator.clipboard.writeText(walletData.address);
      toast.success("Dirección copiada al portapapeles");
    }
  };

  const downloadKeystore = () => {
    if (walletData) {
      const blob = new Blob([walletData.encryptedJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `procuredata-wallet-${walletData.address.slice(0, 8)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setHasDownloaded(true);
      toast.success("Archivo de respaldo descargado");
    }
  };

  const handleContinue = async () => {
    if (!walletData || !user) return;
    
    setIsSaving(true);
    try {
      // Check if user already has an organization entry or create a registration request
      // For now, we'll store the wallet address in a temporary way
      // The full organization will be created in step 2
      
      // Store wallet address in localStorage temporarily until org is created
      localStorage.setItem('pending_wallet_address', walletData.address);
      
      toast.success("Wallet guardada. Continuando al registro...");
      onComplete(walletData.address);
    } catch (error) {
      console.error("Error saving wallet:", error);
      toast.error("Error al guardar la wallet. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  if (walletData) {
    return (
      <Card className="border-2 shadow-xl max-w-2xl mx-auto">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-400">
            ¡Wallet Generada Exitosamente!
          </CardTitle>
          <CardDescription>
            Tu identidad soberana ha sido creada. Sigue los pasos a continuación para asegurar tu acceso.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wallet Address */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Dirección Pública de tu Wallet
            </Label>
            <div className="flex gap-2">
              <Input
                value={walletData.address}
                readOnly
                className="font-mono text-sm bg-muted"
              />
              <Button variant="outline" size="icon" onClick={copyAddress}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Esta es tu dirección pública. Puedes compartirla de forma segura.
            </p>
          </div>

          {/* Download Keystore */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 dark:text-amber-300">
                  Descarga tu archivo de respaldo
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Este archivo JSON encriptado es la única forma de recuperar tu wallet. 
                  <strong> Guárdalo en un lugar seguro.</strong>
                </p>
              </div>
            </div>
            <Button 
              onClick={downloadKeystore} 
              className="w-full gap-2"
              variant={hasDownloaded ? "outline" : "brand"}
            >
              <Download className="h-4 w-4" />
              {hasDownloaded ? "Descargar de nuevo" : "Descargar JSON de Respaldo"}
            </Button>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Próximos Pasos</h4>
            
            {/* MetaMask Import */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  1
                </div>
                <h5 className="font-medium">Importa en MetaMask</h5>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                Abre MetaMask → Importar cuenta → Selecciona "Archivo JSON" → 
                Sube tu archivo y usa tu contraseña.
              </p>
            </div>

            {/* DeltaDAO Registration */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  2
                </div>
                <h5 className="font-medium">Regístrate en DeltaDAO</h5>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                Para participar en el espacio de datos, tu wallet debe estar verificada en el portal de DeltaDAO.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-8 gap-2"
                onClick={() => window.open("https://onboarding.delta-dao.com/signup", "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                Ir a DeltaDAO Onboarding
              </Button>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="border-t pt-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="confirm-backup"
                checked={hasConfirmed}
                onCheckedChange={(checked) => setHasConfirmed(checked as boolean)}
                disabled={!hasDownloaded}
              />
              <Label 
                htmlFor="confirm-backup" 
                className={`text-sm cursor-pointer ${!hasDownloaded ? 'text-muted-foreground' : ''}`}
              >
                Confirmo que he descargado y guardado mi archivo de respaldo en un lugar seguro, 
                y que he anotado mi contraseña.
              </Label>
            </div>
            {!hasDownloaded && (
              <p className="text-xs text-muted-foreground mt-2 ml-6">
                Debes descargar el archivo de respaldo antes de continuar.
              </p>
            )}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!hasConfirmed || !hasDownloaded || isSaving}
            className="w-full"
            variant="brand"
            size="lg"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Guardando...
              </>
            ) : (
              "Continuar al Registro de Organización"
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 shadow-xl max-w-xl mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Wallet className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">
          Genera tu Identidad Soberana
        </CardTitle>
        <CardDescription className="text-base">
          Crea una wallet Web3 que servirá como tu identidad digital descentralizada 
          en el espacio de datos de PROCUREDATA.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(generateWallet)} className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
                    Contraseña de Encriptación
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                    Esta contraseña se usará para encriptar tu archivo de respaldo. 
                    <strong> Anótala en un lugar seguro</strong>, ya que no podremos recuperarla.
                  </p>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Repite tu contraseña"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isGenerating}
              className="w-full"
              variant="brand"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Generando y Encriptando Wallet...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Generar Wallet
                </>
              )}
            </Button>

            {isGenerating && (
              <p className="text-xs text-center text-muted-foreground">
                Este proceso puede tardar unos segundos mientras se encripta tu wallet de forma segura.
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
