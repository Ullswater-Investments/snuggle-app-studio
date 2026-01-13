import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Database, Shield, Zap, Globe, Layers, CheckCircle, Sparkles, Wallet, ShieldCheck, Coins, Radio, Bell, Users, FileText, Plug, HelpCircle, BookOpen, Triangle, BarChart3, Wheat, Truck, Heart, HeartPulse, ShoppingBag, Send, Wine, Pill, Ship, Landmark, Mountain, Shirt, DollarSign, LayoutGrid, Brain } from "lucide-react";
import { FundingFooter } from "@/components/FundingFooter";
import { AIConcierge } from "@/components/AIConcierge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import UseCasesCarousel from "@/components/UseCasesCarousel";
import { cn } from "@/lib/utils";
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};
export default function Landing() {
  const {
    t
  } = useTranslation('landing');
  const {
    t: tc
  } = useTranslation('common');
  const {
    user
  } = useAuth();

  // Arrays DENTRO del componente para que se actualicen al cambiar idioma
  const demoLinks = [{
    title: t('demoLinks.innovationLab'),
    icon: Zap,
    url: "/innovation",
    desc: t('demoLinks.innovationLabDesc'),
    color: "text-yellow-500"
  }, {
    title: t('demoLinks.catalog'),
    icon: Database,
    url: "/catalog",
    desc: t('demoLinks.catalogDesc'),
    color: "text-blue-500"
  }, {
    title: t('demoLinks.sustainability'),
    icon: Globe,
    url: "/sustainability",
    desc: t('demoLinks.sustainabilityDesc'),
    color: "text-green-500"
  }, {
    title: t('demoLinks.services'),
    icon: Layers,
    url: "/services",
    desc: t('demoLinks.servicesDesc'),
    color: "text-purple-500"
  }];
  const FEATURES_DATA = {
    web3: [{
      title: t('features.walletWeb3'),
      desc: t('features.walletWeb3Desc'),
      icon: Wallet,
      color: "text-purple-400",
      path: "/motor/wallet-web3"
    }, {
      title: t('features.identitySSI'),
      desc: t('features.identitySSIDesc'),
      icon: ShieldCheck,
      color: "text-purple-400",
      path: "/motor/identidad-ssi"
    }, {
      title: t('features.paymentsEUROe'),
      desc: t('features.paymentsEUROeDesc'),
      icon: Coins,
      color: "text-purple-400",
      path: "/motor/pagos-euroe"
    }],
    realtime: [{
      title: t('features.activityFeed'),
      desc: t('features.activityFeedDesc'),
      icon: Radio,
      color: "text-blue-400",
      path: "/motor/activity-feed"
    }, {
      title: t('features.smartAlerts'),
      desc: t('features.smartAlertsDesc'),
      icon: Bell,
      color: "text-blue-400",
      path: "/motor/smart-alerts"
    }],
    security: [{
      title: t('features.governanceODRL'),
      desc: t('features.governanceODRLDesc'),
      icon: Shield,
      color: "text-green-400",
      path: "/motor/gobernanza-odrl"
    }, {
      title: t('features.multiTenantRLS'),
      desc: t('features.multiTenantRLSDesc'),
      icon: Users,
      color: "text-green-400",
      path: "/motor/multi-tenant-rls"
    }, {
      title: t('features.auditLogs'),
      desc: t('features.auditLogsDesc'),
      icon: FileText,
      color: "text-green-400",
      path: "/motor/audit-logs"
    }, {
      title: t('features.modelIDSA'),
      desc: t('features.modelIDSADesc'),
      icon: Triangle,
      color: "text-green-400",
      path: "/motor/modelo-idsa"
    }],
    integrations: [{
      title: t('features.erpConnectors'),
      desc: t('features.erpConnectorsDesc'),
      icon: Plug,
      color: "text-orange-400",
      path: "/motor/conectores-erp"
    }, {
      title: t('features.edgeFunctions'),
      desc: t('features.edgeFunctionsDesc'),
      icon: Zap,
      color: "text-orange-400",
      path: "/motor/edge-functions"
    }],
    ux: [{
      title: t('features.guidedTour'),
      desc: t('features.guidedTourDesc'),
      icon: HelpCircle,
      color: "text-teal-400",
      path: "/motor/tour-guiado"
    }, {
      title: t('features.interactiveDocs'),
      desc: t('features.interactiveDocsDesc'),
      icon: BookOpen,
      color: "text-teal-400",
      path: "/motor/docs-interactivos"
    }]
  };
  const CATEGORY_LABELS: Record<string, string> = {
    web3: t('categories.web3'),
    realtime: t('categories.realtime'),
    security: t('categories.security'),
    integrations: t('categories.integrations'),
    ux: t('categories.ux')
  };
  const sectors = [{
    label: t('sectors.industrial'),
    icon: BarChart3,
    color: 'text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    caseId: 'gigafactory-north'
  }, {
    label: t('sectors.agro'),
    icon: Wheat,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    caseId: 'olivetrust-coop'
  }, {
    label: t('sectors.mobility'),
    icon: Truck,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50 dark:bg-teal-950/30',
    caseId: 'urbandeliver-bcn'
  }, {
    label: t('sectors.social'),
    icon: Heart,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50 dark:bg-violet-950/30',
    caseId: 'alianza-social-hub'
  }, {
    label: t('sectors.health'),
    icon: HeartPulse,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    caseId: 'biomed-hospital'
  }, {
    label: t('sectors.retail'),
    icon: ShoppingBag,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    caseId: 'globalretail-prime'
  }, {
    label: t('sectors.energy'),
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    caseId: 'helios-fields'
  }, {
    label: t('sectors.aero'),
    icon: Send,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
    caseId: 'turbine-chain'
  }, {
    label: t('sectors.wines'),
    icon: Wine,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    caseId: 'vinosdoe-elite'
  }, {
    label: t('sectors.pharma'),
    icon: Pill,
    color: 'text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-950/30',
    caseId: 'pharmacold-logistix'
  }, {
    label: t('sectors.port'),
    icon: Ship,
    color: 'text-sky-500',
    bgColor: 'bg-sky-50 dark:bg-sky-950/30',
    caseId: 'portbcn-smart-trade'
  }, {
    label: t('sectors.gov'),
    icon: Landmark,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    caseId: 'ayuntamiento-etico'
  }, {
    label: t('sectors.mining'),
    icon: Mountain,
    color: 'text-slate-500',
    bgColor: 'bg-slate-100 dark:bg-slate-950/30',
    caseId: 'purelithium-sourcing'
  }, {
    label: t('sectors.fashion'),
    icon: Shirt,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    caseId: 'fastfashion-trace'
  }, {
    label: t('sectors.finance'),
    icon: DollarSign,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    caseId: 'greenfinance-esg'
  }, {
    label: t('sectors.grid'),
    icon: LayoutGrid,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    caseId: 'gridflex-demand'
  }];
  return <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar Simplificado */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="procuredata-gradient">{t('brand')}</span>
            <Link to="/partners">
              <Badge variant="outline" className="text-xs hover:bg-primary/10 cursor-pointer transition-colors">Partners</Badge>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="hover:text-primary">{t('nav.features')}</a>
            <Link to="/models" className="hover:text-primary">{t('nav.businessModels')}</Link>
            <a href="#use-cases" className="hover:text-primary">{t('nav.useCases')}</a>
            <Link to="/architecture" className="hover:text-primary">{t('nav.architecture')}</Link>
            <Link to="/success-stories" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <Sparkles className="h-4 w-4" />
              <span>{t('successCases')}</span>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
{user ? <Button asChild>
                <Link to="/register">{t('nav.startRegistration')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button> : <Button asChild variant="hero">
                <Link to="/auth">{tc('demoAccess')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION - Textos oficiales según Memoria Técnica */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/25 dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.5))]" />
          <div className="container relative mx-auto px-4 text-center max-w-4xl">
            <Badge className="mb-4" variant="secondary">{t('version')}</Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              {t('brand')} <br />
              <span className="procuredata-gradient">{t('tagline')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-lg" asChild>
                <Link to="/auth">{tc('tryInteractiveDemo')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
                <Link to="/docs/tecnico">{tc('viewTechnicalDoc')}</Link>
              </Button>
            </div>

            {/* CASOS DE ÉXITO - Menú de iconos por sector */}
            <div className="mt-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-5">{t('successCases')}</h2>
              
              <motion.div className="flex flex-wrap justify-center gap-3 md:gap-4" initial="hidden" whileInView="visible" viewport={{
              once: true,
              margin: "-50px"
            }} variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}>
                {sectors.map(sector => <motion.div key={sector.caseId} variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                  scale: 0.9
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }
              }}>
                    <Link to={`/success-stories/${sector.caseId}`} className="group block">
                      <div className={cn("flex flex-col items-center p-3 md:p-4 rounded-xl transition-all duration-300", "border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1", sector.bgColor)}>
                        <div className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm mb-2 transition-transform group-hover:scale-110">
                          <sector.icon className={cn("w-6 h-6", sector.color)} />
                        </div>
                        <span className="text-[10px] md:text-xs font-semibold tracking-wide text-muted-foreground group-hover:text-foreground">
                          {sector.label}
                        </span>
                      </div>
                    </Link>
                  </motion.div>)}
              </motion.div>
            </div>
          </div>
        </section>

        {/* DEMO HUB - ACCESO DIRECTO */}
        <section id="cases" className="py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('exploreEcosystem')}</h2>
              <p className="text-muted-foreground">{t('exploreEcosystemDesc')}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {demoLinks.map(link => <Link key={link.url} to={link.url}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-t-4" style={{
                borderTopColor: 'currentColor'
              }}>
                    <CardHeader>
                      <link.icon className={`h-8 w-8 mb-2 ${link.color}`} />
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm font-medium text-primary flex items-center">
                        {tc('explore')} <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>)}
            </div>
          </div>
        </section>

        {/* MODELOS DE NEGOCIO TEASER */}
        <section id="models" className="py-20 bg-gradient-to-b from-background to-slate-50">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              {t('monetizationModels')}
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{t('web3Ecosystem')}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('web3EcosystemDesc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/models">
                  {t('exploreModels')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/whitepaper">{t('viewWhitepaper')}</Link>
              </Button>
            </div>
          </div>
        </section>


        {/* FUNCIONALIDADES TÉCNICAS */}
        <section id="features" className="py-20 bg-muted dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">{t('theEngine')}</h2>
              <p className="text-muted-foreground">{t('engineDesc')}</p>
            </div>
            
            <Tabs defaultValue="web3" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-background/50 dark:bg-white/5 mb-8 h-auto">
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => <TabsTrigger key={key} value={key} className="data-[state=active]:bg-primary/10 data-[state=active]:text-foreground dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-white py-3">
                    {label}
                  </TabsTrigger>)}
              </TabsList>
              
              {Object.entries(FEATURES_DATA).map(([category, items]) => <TabsContent key={category} value={category}>
                  <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate="visible" key={category}>
                    {items.map((feature, i) => <motion.div key={i} variants={cardVariants}>
                        <Link to={feature.path}>
                          <Card className="h-full bg-card dark:bg-white/5 border-border dark:border-white/10 hover:bg-accent dark:hover:bg-white/10 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
                            <CardHeader>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-muted dark:bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                                </div>
                                <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-3">{feature.desc}</p>
                              <span className="text-xs text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {tc('viewDetails')} <ArrowRight className="h-3 w-3" />
                              </span>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>)}
                  </motion.div>
                </TabsContent>)}
            </Tabs>
            
            <div className="mt-12 text-center space-y-3">
              
              <Link to="/capacidades-enterprise" className="text-primary hover:text-primary/80 font-semibold flex items-center justify-center gap-2 transition-colors underline-offset-4 hover:underline">
                {t('footer.enterpriseCapabilities')} → <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CASOS DE USO INDUSTRIALES */}
        <section id="use-cases" className="py-24 bg-slate-50 dark:bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                {t('useCasesSection.badge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('useCasesSection.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('useCasesSection.description')}
              </p>
            </div>
            <UseCasesCarousel />
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <span className="procuredata-gradient">{t('brand')}</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {t('footer.tagline')}
              </p>
              <Badge variant="outline" className="text-xs border-gray-700">{t('version')}</Badge>
            </div>

            {/* Plataforma */}
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('footer.platform')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/catalog" className="hover:text-white transition-colors">{t('footer.catalog')}</Link></li>
                <li><Link to="/success-stories" className="hover:text-white transition-colors">{t('successCases')}</Link></li>
                <li><Link to="/partners" className="hover:text-white transition-colors">PARTNERS</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">{t('footer.services')}</Link></li>
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('footer.resources')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                
                <li><Link to="/architecture" className="hover:text-white transition-colors">{t('footer.architecture')}</Link></li>
                <li><Link to="/whitepaper" className="hover:text-white transition-colors flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> {t('footer.techWhitepaper')}
                </Link></li>
                <li><Link to="/guide" className="hover:text-white transition-colors">{t('footer.ecosystemGuide')}</Link></li>
              </ul>
            </div>

            {/* Transparencia - NUEVO según Memoria Técnica */}
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('footer.transparency')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                
                <li><Link to="/architecture" className="hover:text-white transition-colors">{t('footer.governanceModel')}</Link></li>
                <li><Link to="/user-guide" className="hover:text-white transition-colors">{t('footer.userGuide')}</Link></li>
                <li><Link to="/models" className="hover:text-white transition-colors">{t('footer.businessPlan')}</Link></li>
              </ul>
            </div>

            {/* Acceso */}
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('footer.access')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/auth" className="hover:text-white transition-colors">{t('footer.login')}</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors">{t('footer.register')}</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">{t('footer.dashboard')}</Link></li>
              </ul>
            </div>
          </div>


          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>{t('footer.poweredBy')}</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">{t('footer.idsaCompliant')}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FundingFooter - Créditos oficiales según Memoria Técnica */}
      <FundingFooter variant="dark" showTransparency={false} />

      {/* Chatbot ARIA flotante */}
      <AIConcierge />
    </div>;
}