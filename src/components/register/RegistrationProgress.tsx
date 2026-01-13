import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegistrationProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const RegistrationProgress = ({ currentStep, totalSteps }: RegistrationProgressProps) => {
  const { t } = useTranslation('register');

  const steps = [
    { key: 'step0', label: t('progress.step0') },
    { key: 'step1', label: t('progress.step1') },
    { key: 'step2', label: t('progress.step2') },
    { key: 'step3', label: t('progress.step3') },
    { key: 'step4', label: t('progress.step4') },
    { key: 'step5', label: t('progress.step5') },
  ];

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm transition-colors duration-300",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    stepNumber + 1
                  )}
                </motion.div>
                <span
                  className={cn(
                    "mt-2 text-[10px] md:text-xs font-medium hidden sm:block text-center max-w-[60px] md:max-w-[80px]",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-1 md:mx-2">
                  <div
                    className={cn(
                      "h-0.5 md:h-1 rounded-full transition-colors duration-300",
                      stepNumber < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
