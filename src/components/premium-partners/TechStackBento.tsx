import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Network, Link2, Database, Key, FileCheck, Cpu, Server } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TechStackBento = () => {
  const { t } = useTranslation('premiumPartners');

  const techCards = [
    {
      id: 'gaiax',
      title: 'GAIA-X',
      subtitle: t('techStack.gaiax.subtitle'),
      description: t('techStack.gaiax.description'),
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      bgGlow: 'bg-blue-500/20',
      features: ['DIDs', 'Verifiable Credentials', 'Data Sovereignty'],
      size: 'large',
    },
    {
      id: 'idsa',
      title: 'IDSA',
      subtitle: t('techStack.idsa.subtitle'),
      description: t('techStack.idsa.description'),
      icon: Link2,
      color: 'from-emerald-500 to-teal-500',
      bgGlow: 'bg-emerald-500/20',
      features: ['Policy Enforcement', 'Contract Negotiation'],
      size: 'medium',
    },
    {
      id: 'pontusx',
      title: 'Pontus-X',
      subtitle: t('techStack.pontusx.subtitle'),
      description: t('techStack.pontusx.description'),
      icon: Network,
      color: 'from-violet-500 to-purple-500',
      bgGlow: 'bg-violet-500/20',
      features: ['Smart Contracts', 'Token Payments'],
      size: 'medium',
    },
    {
      id: 'erp',
      title: t('techStack.erp.title'),
      subtitle: t('techStack.erp.subtitle'),
      description: t('techStack.erp.description'),
      icon: Database,
      color: 'from-amber-500 to-orange-500',
      bgGlow: 'bg-amber-500/20',
      features: ['SAP S/4HANA', 'Oracle Cloud', 'Dynamics 365'],
      size: 'large',
    },
  ];

  const infoItems = [
    { icon: Key, label: t('techStack.info.encryption'), value: 'AES-256' },
    { icon: FileCheck, label: t('techStack.info.certification'), value: 'ISO 27001' },
    { icon: Server, label: t('techStack.info.hosting'), value: 'EU-only' },
    { icon: Shield, label: t('techStack.info.compliance'), value: 'GDPR' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-slate-700/50 text-slate-300 border-slate-600">
            <Cpu className="w-4 h-4 mr-2" />
            Trust Framework
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('techStack.title')} <span className="text-cyan-400">{t('techStack.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('techStack.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {techCards.map((card, index) => {
            const Icon = card.icon;
            const isLarge = card.size === 'large';
            
            return (
              <motion.div
                key={card.id}
                className={isLarge ? 'lg:col-span-2' : 'lg:col-span-1'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-6 relative">
                    {/* Background glow */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${card.bgGlow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                      <p className={`text-sm bg-gradient-to-r ${card.color} bg-clip-text text-transparent font-medium mb-3`}>
                        {card.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-slate-400 text-sm mb-4">
                        {card.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {card.features.map((feature) => (
                          <Badge 
                            key={feature}
                            variant="outline" 
                            className="bg-slate-700/50 border-slate-600 text-slate-300 text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info Row */}
        <motion.div
          className="max-w-5xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {infoItems.map((item, i) => (
            <div 
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50"
            >
              <item.icon className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="text-sm font-medium text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
