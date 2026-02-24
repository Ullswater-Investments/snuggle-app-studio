import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Home, Database, Shield, Server, Lock, Code, Layers, Wallet,
  GitBranch, ExternalLink, CheckCircle2, XCircle, Users, FileText,
  CreditCard, Settings, Zap, Globe, Box, Cpu, Link2, BookOpen, UserPlus,
  ArrowRight, ArrowDown, ShieldCheck, Network, Blocks, DatabaseZap,
  FileInput, BarChart3, ServerCog, Tags, Building, UserCheck,
  DownloadCloud, ShieldAlert, CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FundingFooter } from "@/components/FundingFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Architecture() {
  const { t } = useTranslation('architecture');
  const [activeTab, setActiveTab] = useState("overview");

  // Tab definitions - localized (removed "stack" tab)
  const TABS = useMemo(() => [
    { id: "overview", label: t('tabs.overview'), icon: Layers },
    { id: "database", label: t('tabs.sovereignData'), icon: Shield },
    { id: "security", label: t('tabs.security'), icon: Shield },
    { id: "web3", label: t('tabs.web3'), icon: Wallet },
    { id: "flows", label: t('tabs.flows'), icon: GitBranch }
  ], [t]);

  // DB_CATEGORIES removed - replaced by sovereign data conceptual view

  // Security pillars for Defense in Depth
  const SECURITY_PILLARS = useMemo(() => [
    { icon: Wallet, title: t('security.pillar1Title'), desc: t('security.pillar1Desc'), color: "text-amber-500" },
    { icon: Layers, title: t('security.pillar2Title'), desc: t('security.pillar2Desc'), color: "text-blue-500" },
    { icon: Lock, title: t('security.pillar3Title'), desc: t('security.pillar3Desc'), color: "text-emerald-500" },
    { icon: Cpu, title: t('security.pillar4Title'), desc: t('security.pillar4Desc'), color: "text-purple-500" },
    { icon: ShieldCheck, title: t('security.pillar5Title'), desc: t('security.pillar5Desc'), color: "text-red-500" },
    { icon: FileText, title: t('security.pillar6Title'), desc: t('security.pillar6Desc'), color: "text-cyan-500" }
  ], [t]);

  // Governance timeline steps - 5-step lifecycle
  const GOVERNANCE_STEPS = useMemo(() => [
    { step: 1, icon: FileText, title: t('flows.step1Title'), status: t('flows.step1Status'), desc: t('flows.step1Desc'), color: "text-blue-500", bg: "bg-blue-500/10" },
    { step: 2, icon: UserCheck, title: t('flows.step2Title'), status: t('flows.step2Status'), desc: t('flows.step2Desc'), color: "text-amber-500", bg: "bg-amber-500/10" },
    { step: 3, icon: CheckCircle, title: t('flows.step3Title'), status: t('flows.step3Status'), desc: t('flows.step3Desc'), color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { step: 4, icon: DownloadCloud, title: t('flows.step4Title'), status: t('flows.step4Status'), desc: t('flows.step4Desc'), color: "text-blue-600", bg: "bg-blue-600/10" },
    { step: 5, icon: ShieldAlert, title: t('flows.step5Title'), status: t('flows.step5Status'), desc: t('flows.step5Desc'), color: "text-purple-500", bg: "bg-purple-500/10" }
  ], [t]);

  // 4 Pillars of the European Data Space
  const PILLARS = useMemo(() => [
    { icon: ShieldCheck, title: t('overview.pillar1Title'), desc: t('overview.pillar1Desc'), color: "text-amber-500" },
    { icon: Network, title: t('overview.pillar2Title'), desc: t('overview.pillar2Desc'), color: "text-blue-400" },
    { icon: Blocks, title: t('overview.pillar3Title'), desc: t('overview.pillar3Desc'), color: "text-emerald-400" },
    { icon: DatabaseZap, title: t('overview.pillar4Title'), desc: t('overview.pillar4Desc'), color: "text-purple-400" }
  ], [t]);

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ProcuredataLogo size="md" />
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-xl hidden sm:inline">| {t('headerTitle')}</h1>
              <Badge variant="outline" className="hidden sm:flex gap-1">
                <Zap className="h-3 w-3" />
                {t('version')}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden md:flex">
              <Link to="/docs/tecnico"><BookOpen className="h-4 w-4 mr-2" />{t('docs')}</Link>
            </Button>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild><Link to="/auth">{t('tryDemo')}</Link></Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-2">{t('heroTitle')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('heroDescription')}
          </p>
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            <Link to="/use-cases"><Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">{t('viewUseCases')}</Badge></Link>
            <Link to="/models"><Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">{t('businessModels')}</Badge></Link>
            <Link to="/whitepaper"><Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">{t('whitepaper')}</Badge></Link>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto gap-1 bg-muted/50 p-1">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 py-2.5 data-[state=active]:bg-background"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {/* TAB 1: OVERVIEW - Redesigned for Gaia-X alignment */}
            <TabsContent value="overview" className="space-y-8">
              <motion.div {...fadeInUp} key="overview">
                {/* High-Level Architecture: 3-column data flow */}
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      {t('overview.highLevelArch')}
                    </CardTitle>
                    <CardDescription>
                      {t('overview.highLevelDesc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
                      {/* Provider Block */}
                      <Card className="border-primary/30 bg-gradient-to-br from-background to-muted/50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Database className="h-5 w-5 text-blue-500" />
                            <FileInput className="h-5 w-5 text-blue-500" />
                            {t('overview.providerBlock')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-blue-400" />
                            {t('overview.providerLocalSources')}
                          </p>
                          <p className="flex items-center gap-2">
                            <FileInput className="h-4 w-4 text-blue-400" />
                            {t('overview.providerConnector')}
                          </p>
                        </CardContent>
                      </Card>

                      {/* Arrow 1 */}
                      <div className="flex items-center justify-center">
                        <ArrowRight className="h-8 w-8 text-primary animate-pulse hidden md:block" />
                        <ArrowDown className="h-8 w-8 text-primary animate-pulse md:hidden" />
                      </div>

                      {/* Trust Framework Block (Central) */}
                      <Card className="bg-gradient-to-br from-[hsl(213,37%,18%)] to-[hsl(210,32%,20%)] text-white border-primary/40">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2 text-white">
                            <Shield className="h-5 w-5 text-amber-400" />
                            {t('overview.trustFramework')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-slate-200">
                          <p className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-amber-400" />
                            {t('overview.trustIdentity')}
                          </p>
                          <p className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-amber-400" />
                            {t('overview.trustAccess')}
                          </p>
                          <p className="flex items-center gap-2">
                            <Blocks className="h-4 w-4 text-amber-400" />
                            {t('overview.trustLedger')}
                          </p>
                        </CardContent>
                      </Card>

                      {/* Arrow 2 */}
                      <div className="flex items-center justify-center">
                        <ArrowRight className="h-8 w-8 text-primary animate-pulse hidden md:block" />
                        <ArrowDown className="h-8 w-8 text-primary animate-pulse md:hidden" />
                      </div>

                      {/* Consumer Block */}
                      <Card className="border-primary/30 bg-gradient-to-br from-background to-muted/50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Server className="h-5 w-5 text-green-500" />
                            <BarChart3 className="h-5 w-5 text-green-500" />
                            {t('overview.consumerBlock')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <Server className="h-4 w-4 text-green-400" />
                            {t('overview.consumerGateway')}
                          </p>
                          <p className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-green-400" />
                            {t('overview.consumerSystems')}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-4 italic">
                      {t('overview.secureDataFlow')}
                    </p>
                  </CardContent>
                </Card>

                {/* 4 Pillars of the European Data Space */}
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      {t('overview.dataSpaceComponents')}
                    </CardTitle>
                    <CardDescription>
                      {t('overview.dataSpaceDesc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {PILLARS.map((pillar) => (
                        <motion.div
                          key={pillar.title}
                          variants={fadeInUp}
                          className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700"
                        >
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                              <pillar.icon className={`h-6 w-6 ${pillar.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm mb-1">{pillar.title}</h4>
                              <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* TAB 2: SOVEREIGN DATA */}
            <TabsContent value="database" className="space-y-6">
              <motion.div {...fadeInUp} key="database">
                {/* Hero Section */}
                <Card className="overflow-hidden border-0 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <CardContent className="p-8 md:p-10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Shield className="h-7 w-7 text-amber-400" />
                      {t('sovereignData.title')}
                    </h3>
                    <p className="text-slate-200 leading-relaxed text-base max-w-4xl">
                      {t('sovereignData.heroText')}
                    </p>
                  </CardContent>
                </Card>

                {/* 3 Pillars */}
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: ServerCog, title: t('sovereignData.pillar1Title'), desc: t('sovereignData.pillar1Desc'), color: "text-blue-500" },
                    { icon: Network, title: t('sovereignData.pillar2Title'), desc: t('sovereignData.pillar2Desc'), color: "text-emerald-500" },
                    { icon: Tags, title: t('sovereignData.pillar3Title'), desc: t('sovereignData.pillar3Desc'), color: "text-purple-500" }
                  ].map((pillar) => (
                    <motion.div key={pillar.title} variants={fadeInUp}>
                      <Card className="h-full rounded-2xl">
                        <CardHeader>
                          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-2">
                            <pillar.icon className={`h-6 w-6 ${pillar.color}`} />
                          </div>
                          <CardTitle className="text-lg">{pillar.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Conceptual Flow */}
                <Card className="rounded-2xl">
                  <CardContent className="py-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                      {/* Provider */}
                      <Card className="p-5 border-primary/30 bg-gradient-to-br from-background to-muted/50 text-center min-w-[200px]">
                        <Database className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="font-semibold text-sm">{t('sovereignData.providerInfra')}</p>
                      </Card>

                      <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block flex-shrink-0" />
                      <ArrowDown className="h-8 w-8 text-muted-foreground md:hidden flex-shrink-0" />

                      {/* PROCUREDATA Bridge */}
                      <Card className="p-5 bg-slate-100 dark:bg-slate-800 border-dashed border-2 border-muted-foreground/30 text-center min-w-[240px]">
                        <Shield className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                        <p className="font-semibold text-sm">{t('sovereignData.validationBridge')}</p>
                        <p className="text-xs text-muted-foreground mt-2 italic">{t('sovereignData.bridgeNote')}</p>
                      </Card>

                      <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block flex-shrink-0" />
                      <ArrowDown className="h-8 w-8 text-muted-foreground md:hidden flex-shrink-0" />

                      {/* Consumer */}
                      <Card className="p-5 border-primary/30 bg-gradient-to-br from-background to-muted/50 text-center min-w-[200px]">
                        <Server className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="font-semibold text-sm">{t('sovereignData.consumerInfra')}</p>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* TAB 3: SECURITY & PRIVACY - Defense in Depth */}
            <TabsContent value="security" className="space-y-6">
              <motion.div {...fadeInUp} key="security">
                {/* Hero */}
                <Card className="overflow-hidden border-0 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <CardContent className="p-8 md:p-10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Shield className="h-7 w-7 text-amber-400" />
                      {t('security.heroTitle')}
                    </h3>
                    <p className="text-slate-200 leading-relaxed text-base max-w-4xl">
                      {t('security.heroDesc')}
                    </p>
                  </CardContent>
                </Card>

                {/* 6 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {SECURITY_PILLARS.map((pillar) => (
                    <motion.div key={pillar.title} variants={fadeInUp}>
                      <Card className="h-full rounded-2xl border border-border/60 hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-2">
                            <pillar.icon className={`h-6 w-6 ${pillar.color}`} />
                          </div>
                          <CardTitle className="text-base font-bold">{pillar.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* IPFS Section */}
                <Card className="rounded-2xl border-2 border-transparent bg-gradient-to-r from-amber-500/10 to-purple-500/10 relative overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-amber-500/30 to-purple-500/30 pointer-events-none" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', padding: '2px', borderRadius: 'inherit' }} />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Database className="h-6 w-6 text-amber-500" />
                      {t('security.ipfsTitle')}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {t('security.ipfsDesc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-5">
                      {[
                        { num: "1", title: t('security.ipfsStep1Title'), desc: t('security.ipfsStep1Desc'), color: "bg-amber-500" },
                        { num: "2", title: t('security.ipfsStep2Title'), desc: t('security.ipfsStep2Desc'), color: "bg-purple-500" },
                        { num: "3", title: t('security.ipfsStep3Title'), desc: t('security.ipfsStep3Desc'), color: "bg-emerald-500" }
                      ].map((step) => (
                        <div key={step.num} className="flex items-start gap-3">
                          <span className={`${step.color} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                            {step.num}
                          </span>
                          <div>
                            <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* TAB 4: WEB3 & CLEARING HOUSE */}
            <TabsContent value="web3" className="space-y-6">
              <motion.div {...fadeInUp} key="web3">
                {/* Hero */}
                <Card className="overflow-hidden border-0 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <CardContent className="p-8 md:p-10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Wallet className="h-7 w-7 text-purple-400" />
                      {t('web3.heroTitle')}
                    </h3>
                    <p className="text-slate-200 leading-relaxed text-base max-w-4xl">
                      {t('web3.heroDesc')}
                    </p>
                  </CardContent>
                </Card>

                {/* 3 Core Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Wallet, title: t('web3.card1Title'), desc: t('web3.card1Desc'), color: "text-amber-500" },
                    { icon: CreditCard, title: t('web3.card2Title'), desc: t('web3.card2Desc'), color: "text-blue-500" },
                    { icon: ShieldCheck, title: t('web3.card3Title'), desc: t('web3.card3Desc'), color: "text-emerald-500" }
                  ].map((card) => (
                    <motion.div key={card.title} variants={fadeInUp}>
                      <Card className="h-full rounded-2xl border border-border/60 hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-2">
                            <card.icon className={`h-6 w-6 ${card.color}`} />
                          </div>
                          <CardTitle className="text-lg">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Smart Contract Lifecycle Flow */}
                <Card className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Code className="h-6 w-6 text-primary" />
                      {t('web3.flowTitle')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                      {/* Step 1 */}
                      <Card className="p-5 border-primary/30 bg-gradient-to-br from-background to-muted/50 text-center min-w-[200px]">
                        <Wallet className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                        <p className="font-semibold text-sm">{t('web3.flowStep1')}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t('web3.flowStep1Sub')}</p>
                      </Card>

                      <ArrowRight className="h-8 w-8 text-primary animate-pulse hidden md:block flex-shrink-0" />
                      <ArrowDown className="h-8 w-8 text-primary animate-pulse md:hidden flex-shrink-0" />

                      {/* Step 2 - Central highlighted */}
                      <Card className="p-5 bg-gradient-to-br from-[hsl(213,37%,18%)] to-[hsl(210,32%,20%)] text-white border-primary/40 text-center min-w-[240px] shadow-[0_0_20px_hsl(var(--primary)/0.15)]">
                        <Code className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="font-semibold text-sm">{t('web3.flowStep2')}</p>
                        <p className="text-xs text-slate-300 mt-1">{t('web3.flowStep2Sub')}</p>
                      </Card>

                      <ArrowRight className="h-8 w-8 text-primary animate-pulse hidden md:block flex-shrink-0" />
                      <ArrowDown className="h-8 w-8 text-primary animate-pulse md:hidden flex-shrink-0" />

                      {/* Step 3 */}
                      <Card className="p-5 border-primary/30 bg-gradient-to-br from-background to-muted/50 text-center min-w-[200px]">
                        <ShieldCheck className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                        <p className="font-semibold text-sm">{t('web3.flowStep3')}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t('web3.flowStep3Sub')}</p>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* TAB 5: FLOWS - Data Flow & Governance */}
            <TabsContent value="flows" className="space-y-6">
              <motion.div {...fadeInUp} key="flows">
                {/* Hero */}
                <Card className="overflow-hidden border-0 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <CardContent className="p-8 md:p-10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <GitBranch className="h-7 w-7 text-blue-400" />
                      {t('flows.heroTitle')}
                    </h3>
                    <p className="text-slate-200 leading-relaxed text-base max-w-4xl">
                      {t('flows.heroDesc')}
                    </p>
                  </CardContent>
                </Card>

                {/* Conceptual Flow Diagram - 3 Actors */}
                <Card className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Network className="h-6 w-6 text-primary" />
                      {t('flows.diagramTitle')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                      {/* Actor 1: Consumer */}
                      <Card className="p-5 border-primary/30 bg-gradient-to-br from-background to-muted/50 text-center min-w-[200px]">
                        <Building className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="font-semibold text-sm">{t('flows.actor1Title')}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t('flows.actor1Desc')}</p>
                      </Card>

                      <ArrowRight className="h-8 w-8 text-primary animate-pulse hidden md:block flex-shrink-0" />
                      <ArrowDown className="h-8 w-8 text-primary animate-pulse md:hidden flex-shrink-0" />

                      {/* Actor 2: Clearing House (Central highlighted) */}
                      <Card className="p-5 bg-gradient-to-br from-[hsl(213,37%,18%)] to-[hsl(210,32%,20%)] text-white border-primary/40 text-center min-w-[240px] shadow-[0_0_20px_hsl(var(--primary)/0.15)]">
                        <Shield className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                        <p className="font-semibold text-sm">{t('flows.actor2Title')}</p>
                        <p className="text-xs text-slate-300 mt-1">{t('flows.actor2Desc')}</p>
                      </Card>

                      <ArrowRight className="h-8 w-8 text-primary animate-pulse hidden md:block flex-shrink-0" />
                      <ArrowDown className="h-8 w-8 text-primary animate-pulse md:hidden flex-shrink-0" />

                      {/* Actor 3: Provider */}
                      <Card className="p-5 border-primary/30 bg-gradient-to-br from-background to-muted/50 text-center min-w-[200px]">
                        <Database className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                        <p className="font-semibold text-sm">{t('flows.actor3Title')}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t('flows.actor3Desc')}</p>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Governance Timeline - 5-step Stepper */}
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Layers className="h-6 w-6 text-primary" />
                      {t('flows.timelineTitle')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative ml-4 space-y-8 pl-8 py-4">
                      {/* Vertical connector line */}
                      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-purple-500 opacity-30" />

                      {GOVERNANCE_STEPS.map((item) => (
                        <motion.div
                          key={item.step}
                          className="relative flex items-start gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: item.step * 0.1 }}
                        >
                          {/* Icon circle */}
                          <div className={`absolute -left-[40px] ${item.bg} rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 border-2 border-background shadow-sm`}>
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                          </div>

                          <div className="flex-1">
                            <h4 className="font-bold text-base">{item.title}</h4>
                            <Badge variant="outline" className={`my-1.5 font-mono text-xs ${item.color}`}>
                              {item.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>
      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
}
