import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Wallet, 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  Network,
  Globe,
  Coins,
  FileCode,
  Fingerprint,
  Layers,
  Sparkles,
  Target,
  Clock,
  FileText,
  AlertCircle,
  Landmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FundingFooter } from '@/components/FundingFooter';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

const SectoralNodesPage = () => {
  const { t } = useTranslation('nodes');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const promoterBenefits = [
    {
      icon: Layers,
      title: t('benefits.marketplace.title'),
      description: t('benefits.marketplace.description'),
      link: "/nodos/marketplace"
    },
    {
      icon: ShieldCheck,
      title: t('benefits.odrl.title'),
      description: t('benefits.odrl.description'),
      link: "/nodos/odrl"
    },
    {
      icon: Coins,
      title: t('benefits.monetization.title'),
      description: t('benefits.monetization.description'),
      link: "/nodos/monetizacion"
    },
    {
      icon: Sparkles,
      title: t('benefits.whiteLabel.title'),
      description: t('benefits.whiteLabel.description'),
      link: "/nodos/marca-blanca"
    }
  ];

  const inheritedFeatures = [
    { icon: Fingerprint, label: t('inherited.did'), link: "/nodos/identidad-did" },
    { icon: FileCode, label: t('inherited.smartContracts'), link: "/nodos/smart-contracts" },
    { icon: Wallet, label: t('inherited.euroe'), link: "/nodos/pagos-euroe" },
    { icon: Network, label: t('inherited.erp'), link: "/nodos/conectores-erp" },
    { icon: ShieldCheck, label: t('inherited.idsa'), link: "/nodos/gobernanza-idsa" },
    { icon: Server, label: t('inherited.rls'), link: "/nodos/multi-tenant-rls" }
  ];

  const roadmapSteps = [
    {
      step: 1,
      title: t('roadmap.step1.title'),
      description: t('roadmap.step1.description')
    },
    {
      step: 2,
      title: t('roadmap.step2.title'),
      description: t('roadmap.step2.description')
    },
    {
      step: 3,
      title: t('roadmap.step3.title'),
      description: t('roadmap.step3.description')
    }
  ];

  const conceptBenefits = t('concept.benefits', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <ProcuredataLogo className="h-8" />
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/auth">
              <Button variant="outline" size="sm">{t('hero.access')}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-background to-background dark:from-orange-950/20" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800">
              <ShieldCheck className="h-3 w-3 mr-1" />
              {t('hero.badge')}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: `${t('hero.description')} <span class="text-orange-600 dark:text-orange-400">${t('hero.kitLink')}</span>.` }} />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white" asChild>
                <Link to="/nodos/requisitos">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/nodos/tecnologia">
                  <Network className="mr-2 h-4 w-4" />
                  {t('hero.ctaSecondary')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT IS A NODE - Ocean vs Island */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Text Column */}
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-4">{t('concept.badge')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('concept.title')}
              </h2>
              <p className="text-muted-foreground mb-6 text-lg" dangerouslySetInnerHTML={{ __html: t('concept.description') }} />
              <ul className="space-y-3">
                {Array.isArray(conceptBenefits) && conceptBenefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Visual Column */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2 border-orange-200 dark:border-orange-800/50 bg-gradient-to-br from-orange-50/50 to-background dark:from-orange-950/20">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {t('concept.validatedInfra')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-center gap-8 mb-8">
                    {/* Global */}
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 mx-auto">
                        <Globe className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="font-semibold text-sm">{t('concept.globalNode')}</p>
                      <p className="text-xs text-muted-foreground">{t('concept.globalDesc')}</p>
                    </div>

                    {/* Connection Arrow */}
                    <div className="flex flex-col items-center gap-1">
                      <Network className="h-6 w-6 text-orange-500" />
                      <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-orange-500" />
                      <span className="text-xs text-muted-foreground">{t('concept.federated')}</span>
                    </div>

                    {/* Your Node */}
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-3 mx-auto ring-4 ring-orange-500/20">
                        <Server className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="font-semibold text-sm">{t('concept.yourNode')}</p>
                      <p className="text-xs text-muted-foreground">{t('concept.yourNodeDesc')}</p>
                    </div>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    {t('concept.techDescription')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS FOR PROMOTER */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">{t('benefits.badge')}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('benefits.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('benefits.description')}
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {promoterBenefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link to={benefit.link}>
                  <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-orange-200 dark:hover:border-orange-800/50 group cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <benefit.icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {benefit.title}
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* INHERITED FEATURES */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">{t('inherited.badge')}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('inherited.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('inherited.description')}
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {inheritedFeatures.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center gap-2 bg-background border rounded-full px-4 py-2 shadow-sm hover:border-orange-400 hover:shadow-md transition-all cursor-pointer"
                >
                  <feature.icon className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINANCIAL MODEL */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
              {t('financial.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('financial.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t('financial.description') }} />
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Tarjeta Promotor */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2 border-orange-200 dark:border-orange-800/50 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4">
                  <div className="flex items-center gap-3">
                    <Landmark className="w-6 h-6" />
                    <span className="font-bold text-lg">{t('financial.promoter.label')}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-1">{t('financial.promoter.costLabel')}</p>
                    <p className="text-4xl font-bold text-foreground">{t('financial.promoter.totalCost')}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/50">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-foreground">{t('financial.promoter.step1.title')}</span>
                          <span className="font-bold text-orange-600 whitespace-nowrap shrink-0">{t('financial.promoter.step1.amount')}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{t('financial.promoter.step1.description')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-foreground">{t('financial.promoter.step2.title')}</span>
                          <span className="font-bold text-green-600 whitespace-nowrap shrink-0">{t('financial.promoter.step2.amount')}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{t('financial.promoter.step2.description')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/50">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-foreground">{t('financial.promoter.step3.title')}</span>
                          <span className="font-bold text-orange-600 whitespace-nowrap shrink-0">{t('financial.promoter.step3.amount')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/50 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: t('financial.promoter.note') }} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tarjeta Participante */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6" />
                    <span className="font-bold text-lg">{t('financial.participant.label')}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-1">{t('financial.participant.costLabel')}</p>
                    <p className="text-4xl font-bold text-foreground">{t('financial.participant.totalCost')}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t('financial.participant.perCompany')}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/50">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-foreground">{t('financial.participant.step1.title')}</span>
                          <span className="font-bold text-orange-600 whitespace-nowrap shrink-0">{t('financial.participant.step1.amount')}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{t('financial.participant.step1.description')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-foreground">{t('financial.participant.step2.title')}</span>
                          <span className="font-bold text-green-600 whitespace-nowrap shrink-0">{t('financial.participant.step2.amount')}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{t('financial.participant.step2.description')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/50">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-foreground">{t('financial.participant.step3.title')}</span>
                          <span className="font-bold text-orange-600 whitespace-nowrap shrink-0">{t('financial.participant.step3.amount')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/50 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: t('financial.participant.note') }} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-center text-sm text-muted-foreground mt-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('financial.disclaimer')}
          </motion.p>
        </div>
      </section>

      {/* REQUIREMENTS & ROADMAP */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">{t('requirements.badge')}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {t('requirements.title')}
              </h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{t('requirements.promoter.title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('requirements.promoter.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{t('requirements.ecosystem.title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('requirements.ecosystem.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{t('requirements.deadlines.title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('requirements.deadlines.description')}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Roadmap */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">{t('roadmap.badge')}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {t('roadmap.title')}
              </h2>
              <div className="space-y-6">
                {roadmapSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      {index < roadmapSteps.length - 1 && (
                        <div className="w-0.5 h-12 bg-orange-200 dark:bg-orange-800 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-semibold text-lg">{step.title}</h4>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Target className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-orange-100 mb-8 text-lg">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-orange-600">
                {t('cta.button1')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="secondary" className="text-orange-600">
                <FileText className="mr-2 h-4 w-4" />
                {t('cta.button2')}
              </Button>
            </div>
            <p className="text-orange-200 text-sm mt-6">
              {t('cta.note')}
            </p>
          </motion.div>
        </div>
      </section>

      <FundingFooter />
    </div>
  );
};

export default SectoralNodesPage;
