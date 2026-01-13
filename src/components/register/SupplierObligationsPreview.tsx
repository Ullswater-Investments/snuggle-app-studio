import { motion } from "framer-motion";
import { Lock, FileCheck, Building, Package } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export const SupplierObligationsPreview = () => {
  const { t } = useTranslation('register');

  const steps = [
    {
      icon: FileCheck,
      title: t('supplierObligations.step1.title'),
      description: t('supplierObligations.step1.description'),
    },
    {
      icon: Building,
      title: t('supplierObligations.step2.title'),
      description: t('supplierObligations.step2.description'),
    },
    {
      icon: Package,
      title: t('supplierObligations.step3.title'),
      description: t('supplierObligations.step3.description'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-6 p-4 rounded-xl bg-muted/50 border border-border"
    >
      <div className="flex items-center gap-2 mb-4">
        <Lock className="h-4 w-4 text-muted-foreground" />
        <h4 className="font-medium text-sm text-foreground">
          {t('supplierObligations.title')}
        </h4>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg",
                "bg-background/50 border border-dashed border-border/60"
              )}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {step.title}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {t('supplierObligations.locked')}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        {t('supplierObligations.helperText')}
      </p>
    </motion.div>
  );
};
