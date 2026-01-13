import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, BadgeCheck, Globe, Link, Database, Users, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  BadgeCheck,
  Globe,
  Link,
};

export const WelcomeStep = () => {
  const { t } = useTranslation('register');

  const benefitsRaw = t('welcome.benefits.items', { returnObjects: true });
  const benefits = Array.isArray(benefitsRaw) ? benefitsRaw as Array<{
    icon: string;
    title: string;
    description: string;
  }> : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">
          {t('welcome.title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('welcome.subtitle')}
        </p>
      </motion.div>

      {/* Trust Triangle */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{t('welcome.trustTriangle.title')}</CardTitle>
            <CardDescription className="text-base">
              {t('welcome.trustTriangle.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Provider */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center p-6 rounded-xl bg-blue-500/10 border border-blue-500/20"
              >
                <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Database className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('welcome.trustTriangle.provider.title')}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t('welcome.trustTriangle.provider.description')}
                </p>
              </motion.div>

              {/* Consumer */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center p-6 rounded-xl bg-green-500/10 border border-green-500/20"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('welcome.trustTriangle.consumer.title')}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t('welcome.trustTriangle.consumer.description')}
                </p>
              </motion.div>

              {/* Holder */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center p-6 rounded-xl bg-amber-500/10 border border-amber-500/20"
              >
                <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                  <Building2 className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('welcome.trustTriangle.holder.title')}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t('welcome.trustTriangle.holder.description')}
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Benefits */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
          {t('welcome.benefits.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Shield;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full hover:border-primary/40 transition-colors">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};
