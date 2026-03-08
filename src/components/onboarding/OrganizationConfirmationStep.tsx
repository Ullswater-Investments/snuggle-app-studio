import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  FileJson,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Shield,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { organizationService } from "@/services/organizationService";
import { ApiError } from "@/services/api";

interface OrganizationConfirmationStepProps {
  walletFile: File;
  walletPassword: string;
  onBack: () => void;
  onCancel: () => void;
}

export function OrganizationConfirmationStep({
  walletFile,
  walletPassword,
  onBack,
  onCancel,
}: OrganizationConfirmationStepProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("onboarding");
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCreate = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await organizationService.importOrganization(walletFile, walletPassword);

      await queryClient.invalidateQueries({
        queryKey: ["user-organizations"],
      });

      toast.success(t("confirmation.successTitle"), {
        description: t("confirmation.successDesc"),
      });

      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : t("confirmation.errorDefault");
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <Card className="border-2 shadow-xl max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-20 gap-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Shield className="size-10 text-primary/50" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold">{t("confirmation.creating")}</p>
            <div className="flex items-center justify-center ">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              {t("confirmation.creatingDesc")}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 shadow-xl max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">
              {t("confirmation.title")}
            </CardTitle>
            <CardDescription>
              {t("confirmation.description")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* File summary */}
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/30">
          <span className="text-sm text-muted-foreground">
            {t("confirmation.walletVerified")}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <FileJson className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium truncate max-w-[250px]">
              {walletFile.name}
            </span>
          </div>
        </div>

        {/* Info box */}
        <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            {t("confirmation.infoText")}
          </p>
        </div>

        {/* Error box */}
        {submitError && (
          <div className="flex flex-col items-center">
            <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 flex items-start gap-3 w-full">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              <p className="text-sm text-destructive">{submitError}</p>
            </div>
            <Button variant="outline" className="mt-4" onClick={handleCreate}>
              {t("confirmation.retryButton")}
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <Button variant="outline" className="gap-2" onClick={onBack}>
            <ArrowLeft className="size-4" />
            {t("common.previous")}
          </Button>
          <Button
            variant="ghost"
            className="border border-input"
            onClick={onCancel}
          >
            {t("common.cancel")}
          </Button>
        </div>
        <div className="col-span-3">
          <Button size="lg" className="w-full gap-2" onClick={handleCreate}>
            <Shield className="size-4" />
            {t("confirmation.createButton")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
