import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  FileText, 
  Shield, 
  Users, 
  Building2, 
  Database, 
  Handshake,
  Download,
  ArrowRight,
  CheckCircle2,
  Scale,
  Clock,
  FileCheck,
  ExternalLink,
  Package,
  Globe,
  Lock,
  Workflow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FundingFooter } from "@/components/FundingFooter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCartaAdhesionPDF } from "@/hooks/useCartaAdhesionPDF";
import { ContractSignatureSection } from "@/components/contract/ContractSignatureSection";

const ContratoAdhesion = () => {
  const { t } = useTranslation('contract');
  const { generatePDF, downloading } = useCartaAdhesionPDF();

  const marcoNormativo = [
    { name: t('regulations.dga'), regulation: "Reglamento (UE) 2022/868" },
    { name: t('regulations.dataAct'), regulation: "Reglamento (UE) 2023/2854" },
    { name: t('regulations.ehds'), regulation: "European Health Data Space" },
    { name: t('regulations.rgpd'), regulation: "Reglamento (UE) 2016/679" },
    { name: t('regulations.lopdgdd'), regulation: "Ley Orgánica 3/2018" },
  ];

  const roles = [
    {
      icon: Database,
      title: t('roles.provider.title'),
      description: t('roles.provider.description'),
      features: t('roles.provider.features', { returnObjects: true }) as string[]
    },
    {
      icon: Users,
      title: t('roles.consumer.title'),
      description: t('roles.consumer.description'),
      features: t('roles.consumer.features', { returnObjects: true }) as string[]
    },
    {
      icon: Workflow,
      title: t('roles.service.title'),
      description: t('roles.service.description'),
      features: t('roles.service.features', { returnObjects: true }) as string[]
    },
    {
      icon: Handshake,
      title: t('roles.intermediary.title'),
      description: t('roles.intermediary.description'),
      features: t('roles.intermediary.features', { returnObjects: true }) as string[]
    },
    {
      icon: Globe,
      title: t('roles.altruism.title'),
      description: t('roles.altruism.description'),
      features: t('roles.altruism.features', { returnObjects: true }) as string[]
    }
  ];

  const normativaSections = [
    {
      id: "terminos",
      title: t('normative.sections.terms.title'),
      content: t('normative.sections.terms.items', { returnObjects: true }) as string[]
    },
    {
      id: "gobernanza",
      title: t('normative.sections.governance.title'),
      content: t('normative.sections.governance.items', { returnObjects: true }) as string[]
    },
    {
      id: "odrl",
      title: t('normative.sections.odrl.title'),
      content: t('normative.sections.odrl.items', { returnObjects: true }) as string[]
    },
    {
      id: "gaiax",
      title: t('normative.sections.gaiax.title'),
      content: t('normative.sections.gaiax.items', { returnObjects: true }) as string[]
    },
    {
      id: "rgpd",
      title: t('normative.sections.rgpd.title'),
      content: t('normative.sections.rgpd.items', { returnObjects: true }) as string[]
    }
  ];

  const recursos = [
    { nombre: "CRED - Centro Español de Referencia", url: "https://cred.red.gob.es/" },
    { nombre: "IDSA Rulebook", url: "https://internationaldataspaces.org/publications/idsa-rulebook/" },
    { nombre: "GAIA-X Trust Framework", url: "https://gaia-x.eu/trust-framework/" },
    { nombre: "Data Governance Act", url: "https://eur-lex.europa.eu/eli/reg/2022/868/oj" },
    { nombre: "Data Act", url: "https://eur-lex.europa.eu/eli/reg/2023/2854/oj" },
    { nombre: "RGPD", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
    { nombre: "LOPDGDD", url: "https://www.boe.es/eli/es/lo/2018/12/05/3/con" },
    { nombre: "PROCUREDATA", url: "https://www.procuredata.org" },
  ];

  const commitments = t('object.commitments', { returnObjects: true }) as string[];
  const causeItems = t('validity.causes.items', { returnObjects: true }) as string[];
  const effectItems = t('validity.effects.items', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">PROCUREDATA</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild variant="outline">
              <Link to="/auth">Acceder</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1 bg-background/80 backdrop-blur">
              <FileText className="h-4 w-4 mr-2" />
              {t('officialDocument')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {marcoNormativo.map((item) => (
                <Badge key={item.name} variant="secondary" className="text-xs bg-primary/10 hover:bg-primary/20 transition-colors">
                  {item.name}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={generatePDF} disabled={downloading} variant="outline" className="group">
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                {downloading ? t('downloadingPdf') : t('downloadPdf')}
              </Button>
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Link to="/register">
                  {t('startProcess')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promotor Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t('promoter.title')}</CardTitle>
                    <CardDescription>{t('promoter.description')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-muted-foreground">{t('promoter.legalName')}</span>
                      <span className="font-medium">PROCUREDATA</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-muted-foreground">{t('promoter.address')}</span>
                      <span className="font-medium">España</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-muted-foreground">{t('promoter.email')}</span>
                      <span className="font-medium">eduardo@agileprocurement.es</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-muted-foreground">{t('promoter.website')}</span>
                      <a href="https://www.procuredata.org" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline flex items-center gap-1">
                        www.procuredata.org
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-muted-foreground">{t('promoter.legalFramework')}</span>
                      <span className="font-medium">Data Governance Act</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-primary/10">
                      <span className="text-muted-foreground">{t('promoter.ecosystem')}</span>
                      <span className="font-medium">GAIA-X</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Objeto del Contrato */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t('object.title')}</CardTitle>
                    <CardDescription>{t('object.description')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">
                  {t('object.content')}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {commitments.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Aceptación de Normativa - Accordion */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t('normative.title')}</h2>
                <p className="text-muted-foreground">{t('normative.description')}</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {normativaSections.map((section) => (
                <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-4 bg-card hover:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{section.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pt-2">
                      {section.content.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Roles del Participante */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t('roles.title')}</h2>
                <p className="text-muted-foreground">{t('roles.description')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {roles.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group border-primary/10 hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-2 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                        <role.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">{role.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {role.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs bg-primary/5">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vigencia y Extinción */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t('validity.title')}</h2>
                <p className="text-muted-foreground">{t('validity.description')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-primary/20 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{t('validity.duration.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {t('validity.duration.content').replace(t('validity.duration.indefinite'), '')}
                    <span className="font-semibold text-foreground">{t('validity.duration.indefinite')}</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{t('validity.causes.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {causeItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{t('validity.effects.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {effectItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recursos Oficiales */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ExternalLink className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t('resources.title')}</h2>
                <p className="text-muted-foreground">{t('resources.description')}</p>
              </div>
            </div>

            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-3">
                  {recursos.map((recurso) => (
                    <a
                      key={recurso.nombre}
                      href={recurso.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg border border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all group"
                    >
                      <span className="font-medium text-sm">{recurso.nombre}</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Signature Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <ContractSignatureSection />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t('readyToJoin')}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('readyDescription')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={generatePDF} disabled={downloading} variant="outline" className="group">
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                {downloading ? t('downloadingPdf') : t('downloadPdf')}
              </Button>
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-primary/80">
                <Link to="/register">
                  {t('startProcess')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <FundingFooter variant="dark" showTransparency={true} />
    </div>
  );
};

export default ContratoAdhesion;
