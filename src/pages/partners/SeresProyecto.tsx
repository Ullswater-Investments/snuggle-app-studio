import { motion } from "framer-motion";
import { ArrowLeft, FileText, Zap, Shield, Globe, TrendingUp, Users, Building2, CheckCircle, ExternalLink, Receipt, RefreshCw, PackageCheck, Scale, Landmark, Factory, Plane, Radio, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function SeresProyecto() {
  const { t } = useTranslation('seres');

  const solutions = [
    {
      icon: Receipt,
      title: t('solutions.items.eInvoice.title'),
      description: t('solutions.items.eInvoice.description'),
      tags: t('solutions.items.eInvoice.tags', { returnObjects: true }) as string[]
    },
    {
      icon: RefreshCw,
      title: t('solutions.items.edi.title'),
      description: t('solutions.items.edi.description'),
      tags: t('solutions.items.edi.tags', { returnObjects: true }) as string[]
    },
    {
      icon: PackageCheck,
      title: t('solutions.items.s2p.title'),
      description: t('solutions.items.s2p.description'),
      tags: t('solutions.items.s2p.tags', { returnObjects: true }) as string[]
    },
    {
      icon: TrendingUp,
      title: t('solutions.items.o2c.title'),
      description: t('solutions.items.o2c.description'),
      tags: t('solutions.items.o2c.tags', { returnObjects: true }) as string[]
    },
    {
      icon: Scale,
      title: t('solutions.items.fiscal.title'),
      description: t('solutions.items.fiscal.description'),
      tags: t('solutions.items.fiscal.tags', { returnObjects: true }) as string[]
    },
    {
      icon: Building2,
      title: t('solutions.items.erp.title'),
      description: t('solutions.items.erp.description'),
      tags: t('solutions.items.erp.tags', { returnObjects: true }) as string[]
    }
  ];

  const valueProps = [
    {
      icon: TrendingUp,
      title: t('valueProposition.items.costs.title'),
      description: t('valueProposition.items.costs.description')
    },
    {
      icon: Zap,
      title: t('valueProposition.items.collection.title'),
      description: t('valueProposition.items.collection.description')
    },
    {
      icon: Shield,
      title: t('valueProposition.items.compliance.title'),
      description: t('valueProposition.items.compliance.description')
    }
  ];

  const integrationFeatures = [
    { icon: Shield, label: t('integration.features.gdpr') },
    { icon: FileText, label: t('integration.features.smartContracts') },
    { icon: Users, label: t('integration.features.did') },
    { icon: Globe, label: t('integration.features.interoperability') }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <Link to="/partners">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('nav.backToPartners')}
            </Button>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {t('hero.badges.group')}
            </Badge>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 backdrop-blur-sm">
              {t('hero.badges.gaiaX')}
            </Badge>
            <Badge className="bg-blue-400/20 text-blue-200 border-blue-300/30 backdrop-blur-sm">
              {t('hero.badges.experience')}
            </Badge>
          </div>

          <motion.div {...fadeIn} className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-blue-200/80 max-w-3xl">
              {t('hero.description')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-8 mt-12 max-w-2xl"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{t('stats.experience.value')}</div>
              <div className="text-sm text-blue-200/70">{t('stats.experience.label')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{t('stats.countries.value')}</div>
              <div className="text-sm text-blue-200/70">{t('stats.countries.label')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{t('stats.compliance.value')}</div>
              <div className="text-sm text-blue-200/70">{t('stats.compliance.label')}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Corporate Profile */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <Card className="border-2 border-blue-100 dark:border-blue-900/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t('profile.title')}</CardTitle>
                    <p className="text-muted-foreground text-sm">{t('profile.subtitle')}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>{t('profile.paragraph1')}</p>
                <p>{t('profile.paragraph2')}</p>
                <p>{t('profile.paragraph3')}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-12">
            <Badge className="mb-4">{t('solutions.badge')}</Badge>
            <h2 className="text-3xl font-bold mb-4">{t('solutions.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('solutions.description')}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {solutions.map((solution, idx) => (
              <motion.div key={idx} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 shrink-0">
                        <solution.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{solution.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{solution.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {solution.tags.map((tag, tagIdx) => (
                        <Badge key={tagIdx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-12">
            <Badge className="mb-4">{t('valueProposition.badge')}</Badge>
            <h2 className="text-3xl font-bold mb-4">{t('valueProposition.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('valueProposition.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {valueProps.map((prop, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <CardContent className="pt-8">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-4">
                      <prop.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{prop.title}</h3>
                    <p className="text-muted-foreground text-sm">{prop.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCUREDATA Integration */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                {t('integration.badges.strategic')}
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                {t('integration.badges.gaiaX')}
              </Badge>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('integration.title')}
            </h2>

            <div className="space-y-6 text-blue-100">
              <p>{t('integration.paragraph1')}</p>
              <p>{t('integration.paragraph2')}</p>

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {integrationFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-lg p-4">
                    <feature.icon className="h-5 w-5 text-emerald-400" />
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2" asChild>
                <a href="https://www.seres.es" target="_blank" rel="noopener noreferrer">
                  {t('cta.buttons.contact')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2" asChild>
                <Link to="/partners/seres/login">
                  {t('cta.buttons.members')}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
