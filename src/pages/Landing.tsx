import { useState } from "react";
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
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { cn } from "@/lib/utils";
import { FederatedHeroChat } from "@/components/landing/FederatedHeroChat";
import { FederatedNetworkDiagram } from "@/components/landing/FederatedNetworkDiagram";
import { RoadmapPhases } from "@/components/landing/RoadmapPhases";
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
  const { t } = useTranslation('landing');
  const { t: tc } = useTranslation('common');
  const { user } = useAuth();
  const [isAgentProcessing, setIsAgentProcessing] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);

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
    title: "KIT ESPACIO DE DATOS",
    icon: Layers,
    url: "/kit-espacio-datos",
    desc: "Componentes modulares para tu Data Space",
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
    caseId: 'gigafactory-north',
    company: t('sectorCompanies.industrial'),
    description: t('sectorDescriptions.industrial')
  }, {
    label: t('sectors.agro'),
    icon: Wheat,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    caseId: 'olivetrust-coop',
    company: t('sectorCompanies.agro'),
    description: t('sectorDescriptions.agro')
  }, {
    label: t('sectors.mobility'),
    icon: Truck,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50 dark:bg-teal-950/30',
    caseId: 'urbandeliver-bcn',
    company: t('sectorCompanies.mobility'),
    description: t('sectorDescriptions.mobility')
  }, {
    label: t('sectors.social'),
    icon: Heart,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50 dark:bg-violet-950/30',
    caseId: 'alianza-social-hub',
    company: t('sectorCompanies.social'),
    description: t('sectorDescriptions.social')
  }, {
    label: t('sectors.health'),
    icon: HeartPulse,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    caseId: 'biomed-hospital',
    company: t('sectorCompanies.health'),
    description: t('sectorDescriptions.health')
  }, {
    label: t('sectors.retail'),
    icon: ShoppingBag,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    caseId: 'globalretail-prime',
    company: t('sectorCompanies.retail'),
    description: t('sectorDescriptions.retail')
  }, {
    label: t('sectors.energy'),
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    caseId: 'helios-fields',
    company: t('sectorCompanies.energy'),
    description: t('sectorDescriptions.energy')
  }, {
    label: t('sectors.aero'),
    icon: Send,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
    caseId: 'turbine-chain',
    company: t('sectorCompanies.aero'),
    description: t('sectorDescriptions.aero')
  }, {
    label: t('sectors.wines'),
    icon: Wine,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    caseId: 'vinosdoe-elite',
    company: t('sectorCompanies.wines'),
    description: t('sectorDescriptions.wines')
  }, {
    label: t('sectors.pharma'),
    icon: Pill,
    color: 'text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-950/30',
    caseId: 'pharmacold-logistix',
    company: t('sectorCompanies.pharma'),
    description: t('sectorDescriptions.pharma')
  }, {
    label: t('sectors.port'),
    icon: Ship,
    color: 'text-sky-500',
    bgColor: 'bg-sky-50 dark:bg-sky-950/30',
    caseId: 'portbcn-smart-trade',
    company: t('sectorCompanies.port'),
    description: t('sectorDescriptions.port')
  }, {
    label: t('sectors.gov'),
    icon: Landmark,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    caseId: 'ayuntamiento-etico',
    company: t('sectorCompanies.gov'),
    description: t('sectorDescriptions.gov')
  }, {
    label: t('sectors.mining'),
    icon: Mountain,
    color: 'text-slate-500',
    bgColor: 'bg-slate-100 dark:bg-slate-950/30',
    caseId: 'purelithium-sourcing',
    company: t('sectorCompanies.mining'),
    description: t('sectorDescriptions.mining')
  }, {
    label: t('sectors.fashion'),
    icon: Shirt,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    caseId: 'fastfashion-trace',
    company: t('sectorCompanies.fashion'),
    description: t('sectorDescriptions.fashion')
  }, {
    label: t('sectors.finance'),
    icon: DollarSign,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    caseId: 'greenfinance-esg',
    company: t('sectorCompanies.finance'),
    description: t('sectorDescriptions.finance')
  }, {
    label: t('sectors.grid'),
    icon: LayoutGrid,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    caseId: 'gridflex-demand',
    company: t('sectorCompanies.grid'),
    description: t('sectorDescriptions.grid')
  }];
  return <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar Simplificado */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ProcuredataLogo size="lg" showNavigation={true} />
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
        {/* HERO SECTION - Chat-First con Agente IA Federado */}
        <section className="py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/25 dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.5))]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl opacity-[0.05]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-[0.05]" />
          
          <div className="container relative mx-auto px-4">
            {/* Top: Brand + Subtitle + Badges */}
            <div className="text-center mb-8 space-y-3">
              <Badge className="mb-2" variant="secondary">{t('version')}</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {t('brand')} <br />
                <span className="procuredata-gradient">{t('tagline')}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('heroDescription')}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Gaia-X", "ODRL 2.0", "Pontus-X", "IDSA"].map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold border bg-card text-muted-foreground"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Main: Chat + Diagram */}
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
              <Card className="shadow-xl border-2">
                <CardContent className="pt-6 pb-4">
                  <FederatedHeroChat onProcessingChange={setIsAgentProcessing} onHighlightedNodesChange={setHighlightedNodes} />
                </CardContent>
              </Card>

              <div className="hidden lg:block space-y-6">
                <FederatedNetworkDiagram isProcessing={isAgentProcessing} highlightedNodes={highlightedNodes} />
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Button size="lg" className="h-12 px-8" asChild>
                    <Link to="/auth">{tc('tryInteractiveDemo')}</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                    <Link to="/whitepaper">WHITEPAPER</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile: CTA buttons below chat */}
            <div className="lg:hidden flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <Button size="lg" className="h-12 px-8" asChild>
                <Link to="/auth">{tc('tryInteractiveDemo')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                <Link to="/whitepaper">WHITEPAPER</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ROADMAP 10 FASES */}
        <RoadmapPhases />

        {/* CASOS DE ÉXITO - Sector Icons */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-5">{t('successCases')}</h2>
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
              {sectors.map(sector => (
                <motion.div key={sector.caseId} variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } } }}>
                  <Link to={`/success-stories/${sector.caseId}`} className="group block h-full">
                    <div className={cn("flex flex-col items-center p-3 md:p-4 rounded-xl transition-all duration-300 border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 h-full", sector.bgColor)}>
                      <div className="p-3 rounded-lg bg-card shadow-sm mb-2 transition-transform group-hover:scale-110">
                        <sector.icon className={cn("w-6 h-6", sector.color)} />
                      </div>
                      <span className="text-[10px] md:text-xs font-semibold tracking-wide text-muted-foreground group-hover:text-foreground">
                        {sector.label}
                      </span>
                      <span className="text-[9px] md:text-[10px] font-bold text-foreground/80 mt-1 text-center leading-tight">
                        {sector.company}
                      </span>
                      <span className="text-[8px] md:text-[9px] text-muted-foreground text-center leading-tight mt-0.5">
                        {sector.description}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
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
                <li><Link to="/partners" className="hover:text-white transition-colors">{t('footer.partners')}</Link></li>
                <li><Link to="/kit-espacio-datos" className="hover:text-white transition-colors">{t('footer.dataSpaceKit')}</Link></li>
                <li>
                  <Link to="/nodos-sectoriales" className="hover:text-white transition-colors flex items-center gap-1.5">
                    {t('footer.sectoralNode')}
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-orange-500/20 text-orange-300 border-orange-500/30">{t('footer.new')}</Badge>
                  </Link>
                </li>
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