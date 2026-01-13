import { Link } from "react-router-dom";
import { Coins, Shield, Zap, CheckCircle, Clock, ArrowRightLeft, TrendingUp, BadgeCheck, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotorNavigation } from "@/components/MotorNavigation";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { FundingFooter } from "@/components/FundingFooter";
import { useTranslation } from "react-i18next";

export default function PagosEUROe() {
  const { t } = useTranslation('motor');

  const kpis = [
    { icon: Clock, value: "2s", label: t('euroe.kpis.settlement'), color: "text-green-500" },
    { icon: TrendingUp, value: "0%", label: t('euroe.kpis.defaults'), color: "text-blue-500" },
    { icon: BadgeCheck, value: "MiCA", label: t('euroe.kpis.regulated'), color: "text-purple-500" },
  ];

  const steps = [
    { step: "1", title: t('euroe.steps.request.title'), desc: t('euroe.steps.request.desc') },
    { step: "2", title: t('euroe.steps.contract.title'), desc: t('euroe.steps.contract.desc') },
    { step: "3", title: t('euroe.steps.escrow.title'), desc: t('euroe.steps.escrow.desc') },
    { step: "4", title: t('euroe.steps.release.title'), desc: t('euroe.steps.release.desc') },
  ];

  const specs = [
    { label: t('euroe.specs.assetType.label'), value: t('euroe.specs.assetType.value') },
    { label: t('euroe.specs.network.label'), value: t('euroe.specs.network.value') },
    { label: t('euroe.specs.baseFee.label'), value: t('euroe.specs.baseFee.value') }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <ProcuredataLogo size="md" showNavigation={true} />
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">{t('euroe.badge')}</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero con KPIs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-yellow-500/15 border border-yellow-500/30 mb-6">
            <Coins className="h-10 w-10 text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('euroe.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('euroe.subtitle')}
          </p>
          <MotorNavigation currentPath="/motor/pagos-euroe" />
          
          {/* KPIs */}
          <div className="flex justify-center gap-6 flex-wrap">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl"
              >
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                <div className="text-left">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección: Por qué importa */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg shrink-0">
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{t('common.whyItMatters')}</h2>
                  <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t('euroe.whyDescription') }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Cómo funciona - Pasos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-yellow-500" />
                  {t('common.howItWorks')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-yellow-600">{step.step}</span>
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="font-medium">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                      {i < steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Panel de Comparativa y Especificaciones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Comparativa */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                  {t('euroe.comparison.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">{t('euroe.comparison.traditional')}</span>
                    <span className="text-destructive font-medium">{t('euroe.comparison.days')}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-destructive/60 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">{t('euroe.comparison.euroe')}</span>
                    <span className="text-green-500 font-medium">{t('euroe.comparison.seconds')}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[2%] bg-green-500 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Especificaciones */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-yellow-500" />
                  {t('common.technicalSpecs')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">{spec.label}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30 inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">{t('euroe.cta.title')}</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {t('euroe.cta.description')}
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/auth">{t('common.tryDemo')}</Link>
                </Button>
                <Button asChild className="bg-yellow-600 hover:bg-yellow-700 text-black">
                  <Link to="/architecture">{t('common.viewArchitecture')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
}
