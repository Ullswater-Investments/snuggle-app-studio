import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Users, BookOpen, Trophy, Network } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ServicesSection = () => {
  const { t } = useTranslation('aerce');

  const services = [
    {
      icon: GraduationCap,
      title: t('services.items.certification.title'),
      description: t('services.items.certification.description'),
      features: ["CPP Certified", "IFPSM Network", "EU Recognition"],
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      icon: Award,
      title: t('services.items.observatory.title'),
      description: t('services.items.observatory.description'),
      features: ["Market Studies", "Benchmarks", "Trends"],
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      icon: Users,
      title: t('services.items.legal.title'),
      description: t('services.items.legal.description'),
      features: ["Contracts", "Compliance", "Advisory"],
      color: "bg-green-50 text-green-600 border-green-100",
    },
    {
      icon: BookOpen,
      title: t('project.features.benchmark.title'),
      description: t('project.features.benchmark.description'),
      features: ["Price Index", "Conditions", "Analytics"],
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      icon: Trophy,
      title: t('project.features.suppliers.title'),
      description: t('project.features.suppliers.description'),
      features: ["Scoring", "ESG", "Performance"],
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
    {
      icon: Network,
      title: t('services.items.events.title'),
      description: t('services.items.events.description'),
      features: ["Annual Congress", "Networking", "Awards"],
      color: "bg-cyan-50 text-cyan-600 border-cyan-100",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('project.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${service.color}`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
