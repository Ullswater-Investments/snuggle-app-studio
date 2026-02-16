import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface OnboardingStepperProps {
  steps: Step[];
  currentStep: number;
}

export function OnboardingStepper({ steps, currentStep }: OnboardingStepperProps) {
  return (
    <div className="w-full px-2 sm:px-0">
      <div className="flex items-start w-full">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "flex items-start",
              index === 0 ? "flex-shrink-0" : "",
              index === steps.length - 1 ? "flex-shrink-0" : "flex-1"
            )}
          >
            {/* Step Circle and Text */}
            <div className="flex flex-col items-center min-w-[80px] sm:min-w-[120px]">
              <div
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300 shadow-sm",
                  currentStep > step.id
                    ? "bg-primary text-primary-foreground shadow-primary/25"
                    : currentStep === step.id
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-primary/30"
                      : "bg-muted text-muted-foreground border-2 border-muted-foreground/20"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-3 text-center max-w-[100px] sm:max-w-[140px]">
                <p
                  className={cn(
                    "text-xs sm:text-sm font-medium leading-tight",
                    currentStep >= step.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector Line - extends fully between circles */}
            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center h-10 sm:h-12 px-1 sm:px-2">
                <div
                  className={cn(
                    "w-full h-1 rounded-full transition-all duration-500",
                    currentStep > step.id
                      ? "bg-gradient-to-r from-primary to-primary/80"
                      : "bg-muted"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
