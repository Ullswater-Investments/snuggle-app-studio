import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { OnboardingStepper } from "@/components/onboarding/OnboardingStepper";
import { WalletGenerationStep } from "@/components/onboarding/WalletGenerationStep";
import { OrganizationRegistrationStep } from "@/components/onboarding/OrganizationRegistrationStep";

const ONBOARDING_STEPS = [
  { id: 1, title: "Generar Wallet", description: "Identidad soberana" },
  { id: 2, title: "Registrar Organización", description: "Datos de empresa" },
];

export default function CreateOrganization() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const [currentStep, setCurrentStep] = useState(1);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Check for existing wallet address in localStorage on mount
  useEffect(() => {
    const storedWallet = localStorage.getItem('pending_wallet_address');
    if (storedWallet) {
      setWalletAddress(storedWallet);
    }
  }, []);

  const handleWalletComplete = (address: string) => {
    setWalletAddress(address);
    setCurrentStep(2);
  };

  const handleBackToWallet = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Button 
            variant="ghost" 
            className="gap-2"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{t('onboarding.back', 'Volver')}</span>
          </Button>
          <ProcuredataLogo size="sm" showNavigation={false} />
        </div>

        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {t('onboarding.createOrg.title', 'Registrar Nueva Organización')}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            {t('onboarding.createOrg.description', 'Complete el proceso de verificación para dar de alta su empresa en la red PROCUREDATA.')}
          </p>
        </div>

        {/* Stepper - Full width container */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
          <OnboardingStepper steps={ONBOARDING_STEPS} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {currentStep === 1 && (
            <WalletGenerationStep onComplete={handleWalletComplete} />
          )}

          {currentStep === 2 && (
            <OrganizationRegistrationStep 
              walletAddress={walletAddress} 
              onBack={handleBackToWallet}
            />
          )}
        </div>
      </div>
    </div>
  );
}
