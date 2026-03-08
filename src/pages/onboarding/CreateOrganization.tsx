import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check, Rocket, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { PontusXOnboardingStep } from "@/components/onboarding/PontusXOnboardingStep";
import { WalletImportStep } from "@/components/onboarding/WalletImportStep";
import { OrganizationConfirmationStep } from "@/components/onboarding/OrganizationConfirmationStep";

export default function CreateOrganization() {
  const navigate = useNavigate();
  const { t } = useTranslation("onboarding");
  const [currentStep, setCurrentStep] = useState(1);
  const [walletFile, setWalletFile] = useState<File | null>(null);
  const [walletPassword, setWalletPassword] = useState("");

  const ONBOARDING_STEPS = [
    {
      id: 1,
      title: t("createOrg.steps.onboarding"),
      description: t("createOrg.steps.onboardingDesc"),
      icon: <Rocket className="size-5 sm:size-6" />,
    },
    {
      id: 2,
      title: t("createOrg.steps.wallet"),
      description: t("createOrg.steps.walletDesc"),
      icon: <Wallet className="size-5 sm:size-6" />,
    },
    {
      id: 3,
      title: t("createOrg.steps.confirmation"),
      description: t("createOrg.steps.confirmationDesc"),
      icon: <Check className="size-5 sm:size-6" />,
    },
  ];

  const handleCancel = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Top bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 container px-4 pb-8 sm:pb-10">
        {/* Back button */}
        <div className="py-10">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{t("createOrg.back")}</span>
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {t("createOrg.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            {t("createOrg.subtitle")}
          </p>
        </div>

        {/* Stepper */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
          <OnboardingStepper
            steps={ONBOARDING_STEPS}
            currentStep={currentStep}
          />
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {currentStep === 1 && (
            <PontusXOnboardingStep
              onNext={() => setCurrentStep(2)}
              onCancel={handleCancel}
            />
          )}

          {currentStep === 2 && (
            <WalletImportStep
              walletFile={walletFile}
              onWalletFileChange={setWalletFile}
              walletPassword={walletPassword}
              onPasswordChange={setWalletPassword}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
              onCancel={handleCancel}
            />
          )}

          {currentStep === 3 && walletFile && (
            <OrganizationConfirmationStep
              walletFile={walletFile}
              walletPassword={walletPassword}
              onBack={() => setCurrentStep(2)}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}
