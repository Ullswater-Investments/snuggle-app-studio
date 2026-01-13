import { motion } from "framer-motion";
import { Building2, Package, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface RoleSelectionStepProps {
  selectedRole: 'buyer' | 'supplier' | null;
  onRoleSelect: (role: 'buyer' | 'supplier') => void;
}

export const RoleSelectionStep = ({ selectedRole, onRoleSelect }: RoleSelectionStepProps) => {
  const { t } = useTranslation('register');

  const roles = [
    {
      id: 'buyer' as const,
      icon: Building2,
      title: t('roleSelection.buyer.title'),
      description: t('roleSelection.buyer.description'),
      features: [
        t('roleSelection.buyer.features.search'),
        t('roleSelection.buyer.features.monitor'),
        t('roleSelection.buyer.features.integrate'),
      ],
    },
    {
      id: 'supplier' as const,
      icon: Package,
      title: t('roleSelection.supplier.title'),
      description: t('roleSelection.supplier.description'),
      features: [
        t('roleSelection.supplier.features.visible'),
        t('roleSelection.supplier.features.certify'),
        t('roleSelection.supplier.features.orders'),
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t('roleSelection.title')}
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {t('roleSelection.subtitle')}
        </p>
      </motion.div>

      {/* Role Cards */}
      <motion.div
        variants={itemVariants}
        className="grid md:grid-cols-2 gap-6"
      >
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <motion.button
              key={role.id}
              type="button"
              onClick={() => onRoleSelect(role.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative p-6 rounded-xl border-2 text-left transition-all duration-300",
                "bg-card hover:bg-accent/50",
                isSelected
                  ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </motion.div>
              )}

              {/* Icon */}
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {role.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {role.description}
              </p>

              {/* Features list */}
              <ul className="space-y-2">
                {role.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Helper text */}
      <motion.p
        variants={itemVariants}
        className="text-center text-sm text-muted-foreground"
      >
        {t('roleSelection.helperText')}
      </motion.p>
    </motion.div>
  );
};
