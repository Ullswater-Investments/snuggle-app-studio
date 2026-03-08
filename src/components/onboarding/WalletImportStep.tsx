import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyRound,
  Upload,
  FileJson,
  X,
  Eye,
  EyeOff,
  Info,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WalletImportStepProps {
  walletFile: File | null;
  onWalletFileChange: (file: File | null) => void;
  walletPassword: string;
  onPasswordChange: (password: string) => void;
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
}

export function WalletImportStep({
  walletFile,
  onWalletFileChange,
  walletPassword,
  onPasswordChange,
  onNext,
  onBack,
  onCancel,
}: WalletImportStepProps) {
  const { t } = useTranslation("onboarding");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const canProceed = walletFile !== null && walletPassword.length > 0;

  const handleFileSelect = (file: File | null) => {
    if (file && !file.name.endsWith(".json")) {
      return;
    }
    onWalletFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file ?? null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <Card className="border-2 shadow-xl max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <KeyRound className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">
              {t("walletImport.title")}
            </CardTitle>
            <CardDescription>
              {t("walletImport.description")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* File upload area */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("walletImport.fileLabel")}</Label>

          {walletFile ? (
            <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-primary/30 bg-primary/5">
              <FileJson className="h-8 w-8 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {walletFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(walletFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={() => onWalletFileChange(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center gap-3 p-8 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center">
                {t("walletImport.selectFile")}
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <Label htmlFor="keypair-password" className="text-sm font-medium">
            {t("walletImport.passwordLabel")}
          </Label>
          <div className="relative">
            <Input
              id="keypair-password"
              type={showPassword ? "text" : "password"}
              placeholder={t("walletImport.passwordPlaceholder")}
              value={walletPassword}
              onChange={(e) => onPasswordChange(e.target.value)}
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
        </div>

        {/* Info box */}
        <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            {t("walletImport.infoText")}
          </p>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <Button variant="outline" className="gap-2" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            {t("common.previous")}
          </Button>
          <Button
            variant="ghost"
            className="border border-input"
            onClick={onCancel}
          >
            {t("common.cancel")}
          </Button>
          <Button
            className="gap-2"
            disabled={!canProceed}
            onClick={onNext}
          >
            {t("common.next")}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
