import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Sparkles, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AboutSection = () => {
  const { t } = useTranslation('aerce');

  const highlights = [
    {
      icon: Building2,
      title: t('about.pillars.training.title'),
      description: t('about.pillars.training.description'),
    },
    {
      icon: Target,
      title: t('about.pillars.networking.title'),
      description: t('about.pillars.networking.description'),
    },
    {
      icon: Sparkles,
      title: t('about.pillars.advocacy.title'),
      description: t('about.pillars.advocacy.description'),
    },
    {
      icon: Globe,
      title: t('about.pillars.innovation.title'),
      description: t('about.pillars.innovation.description'),
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('about.title')}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t('about.description')}
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                #Compras
              </span>
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                #Procurement
              </span>
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                #SupplyChain
              </span>
              <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                #ForoCPO
              </span>
            </div>
          </motion.div>

          {/* Right Content - Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-0 shadow-sm bg-gradient-to-br from-white to-blue-50/50">
                  <CardContent className="p-5">
                    <item.icon className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
