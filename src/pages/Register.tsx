import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  RegistrationProgress,
  WelcomeStep,
  RequirementsStep,
  ObligationsStep,
  DataFormStep,
  ConfirmationStep,
  type RegistrationFormData,
} from '@/components/register';
import { RoleSelectionStep } from '@/components/register/RoleSelectionStep';

const STORAGE_KEY = 'procuredata_registration';

const initialFormData: RegistrationFormData = {
  organization: {
    legalName: '',
    taxId: '',
    country: '',
    address: '',
    sector: '',
    size: '',
  },
  representative: {
    fullName: '',
    position: '',
    email: '',
    phone: '',
  },
  intention: {
    role: 'both',
    dataTypes: [],
    hasErp: 'none',
  },
};

export default function Register() {
  const { t } = useTranslation('register');
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'supplier' | null>(null);
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [acceptances, setAcceptances] = useState({
    terms: false,
    gdpr: false,
    conduct: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 6;

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
      } catch (e) {
        console.error('Failed to parse saved registration data');
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (!isSuccess) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, currentStep }));
    }
  }, [formData, currentStep, isSuccess]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0 && !selectedRole) {
      newErrors['role'] = t('validation.selectRole');
    }

    if (step === 5) {
      if (!formData.organization.legalName.trim()) {
        newErrors['organization.legalName'] = t('validation.required');
      }
      if (!formData.organization.taxId.trim()) {
        newErrors['organization.taxId'] = t('validation.required');
      }
      if (!formData.organization.country) {
        newErrors['organization.country'] = t('validation.required');
      }
      if (!formData.organization.address.trim()) {
        newErrors['organization.address'] = t('validation.required');
      }
      if (!formData.organization.sector) {
        newErrors['organization.sector'] = t('validation.required');
      }
      if (!formData.organization.size) {
        newErrors['organization.size'] = t('validation.required');
      }
      if (!formData.representative.fullName.trim()) {
        newErrors['representative.fullName'] = t('validation.required');
      }
      if (!formData.representative.email.trim()) {
        newErrors['representative.email'] = t('validation.required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.representative.email)) {
        newErrors['representative.email'] = t('validation.invalidEmail');
      }
      if (!formData.intention.role) {
        newErrors['intention.role'] = t('validation.required');
      }
    }

    if (step === 6) {
      if (!acceptances.terms || !acceptances.gdpr || !acceptances.conduct) {
        newErrors['acceptances'] = t('validation.acceptTerms');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 0 && !selectedRole) {
      toast({
        title: t('validation.selectRole'),
        variant: 'destructive',
      });
      return;
    }
    if (currentStep < totalSteps) {
      if (currentStep === 5 && !validateStep(5)) {
        toast({
          title: t('validation.required'),
          variant: 'destructive',
        });
        return;
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      toast({
        title: t('validation.acceptTerms'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: t('confirmation.success.title'),
      description: t('confirmation.success.description'),
    });
  };

  const handleAcceptanceChange = (key: 'terms' | 'gdpr' | 'conduct', value: boolean) => {
    setAcceptances((prev) => ({ ...prev, [key]: value }));
    if (errors['acceptances']) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next['acceptances'];
        return next;
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <RoleSelectionStep selectedRole={selectedRole} onRoleSelect={setSelectedRole} />;
      case 1:
        return <WelcomeStep />;
      case 2:
        return <RequirementsStep />;
      case 3:
        return <ObligationsStep />;
      case 4:
        return <ObligationsStep />;
      case 5:
        return (
          <DataFormStep
            formData={formData}
            onFormChange={setFormData}
            errors={errors}
          />
        );
      case 6:
        return (
          <ConfirmationStep
            formData={formData}
            acceptances={acceptances}
            onAcceptanceChange={handleAcceptanceChange}
            errors={errors}
            isSuccess={isSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            {t('subtitle')}
          </p>

          {/* Progress */}
          {!isSuccess && (
            <div className="max-w-3xl mx-auto mt-6">
              <RegistrationProgress currentStep={currentStep} totalSteps={totalSteps} />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {!isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center mt-8 pt-6 border-t"
            >
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('navigation.back')}
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={handleNext} className="gap-2">
                  {t('navigation.next')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      {t('navigation.submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t('navigation.submit')}
                    </>
                  )}
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
