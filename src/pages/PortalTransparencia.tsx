import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Home, BarChart3, Euro, FileText, Users, ClipboardCheck,
  MessageSquare, ExternalLink, Shield, TrendingUp, Building2,
  BookOpen, Scale, Globe, Download
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { FundingFooter } from '@/components/FundingFooter';

import type { Easing } from 'framer-motion';

const easeOut: Easing = [0, 0, 0.2, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: easeOut },
  }),
};

export default function PortalTransparencia() {
  const { t } = useTranslation('transparency');

  const metrics = [
    { icon: Building2, value: '47', label: t('metrics.participants'), color: 'hsl(210, 100%, 20%)' },
    { icon: TrendingUp, value: '1,200+', label: t('metrics.transactions'), color: 'hsl(142, 71%, 35%)' },
    { icon: Globe, value: '6', label: t('metrics.sectors'), color: 'hsl(262, 83%, 45%)' },
    { icon: Shield, value: '99.5%', label: t('metrics.availability'), color: 'hsl(25, 95%, 50%)' },
  ];

  const fees = [
    { concept: t('fees.payPerUse'), price: '1 EUROe', detail: t('fees.payPerUseDetail') },
    { concept: t('fees.proMembership'), price: '300 EUROe/mes', detail: t('fees.proMembershipDetail') },
    { concept: t('fees.registration'), price: t('fees.free'), detail: t('fees.registrationDetail') },
    { concept: t('fees.additionalServices'), price: t('fees.variable'), detail: t('fees.additionalServicesDetail') },
  ];

  const documents = [
    { title: t('docs.rulebook'), desc: t('docs.rulebookDesc'), link: '/libro-de-reglas', icon: BookOpen },
    { title: t('docs.adhesionContract'), desc: t('docs.adhesionContractDesc'), link: '/contrato-adhesion', icon: Scale },
    { title: t('docs.glossary'), desc: t('docs.glossaryDesc'), link: '/glosario-une', icon: FileText },
    { title: t('docs.uneReport'), desc: t('docs.uneReportDesc'), link: '/recomendaciones-une', icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header band */}
      <div className="w-full" style={{ backgroundColor: 'hsl(210, 100%, 20%)' }}>
        <div className="container mx-auto px-4 py-6 md:py-10">
          <div className="flex items-center justify-between mb-4">
            <Badge className="text-white border-white/30" variant="outline">{t('badge')}</Badge>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-serif tracking-tight">
            {t('title')}
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl text-lg">
            {t('subtitle')}
          </p>
          <div className="mt-4 flex gap-3">
            <Button variant="outline" size="sm" asChild className="text-white border-white/40 hover:bg-white/10">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                {t('backToHome')}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/40 hover:bg-white/10"
              onClick={async () => {
                try {
                  const res = await fetch(
                    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/export-dcat-catalog`,
                    { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
                  );
                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'procuredata-dcat-ap-catalog.jsonld';
                  a.click();
                  URL.revokeObjectURL(url);
                  toast.success('Catálogo DCAT-AP exportado');
                } catch {
                  toast.error('Error al exportar catálogo');
                }
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar DCAT-AP
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* Metrics Section */}
        <section className="container mx-auto px-4 py-12">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-2xl font-bold mb-8 font-serif"
            style={{ color: 'hsl(210, 100%, 20%)' }}
          >
            <BarChart3 className="inline h-6 w-6 mr-2 mb-1" />
            {t('sections.metrics')}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i + 1}
              >
                <Card className="text-center bg-background border">
                  <CardContent className="pt-6 pb-4">
                    <m.icon className="h-8 w-8 mx-auto mb-3" style={{ color: m.color }} />
                    <div className="text-3xl md:text-4xl font-black" style={{ color: m.color }}>
                      {m.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">{t('metrics.disclaimer')}</p>
        </section>

        {/* Fees Section */}
        <section className="bg-muted/40 py-12">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={0}
              className="text-2xl font-bold mb-8 font-serif"
              style={{ color: 'hsl(210, 100%, 20%)' }}
            >
              <Euro className="inline h-6 w-6 mr-2 mb-1" />
              {t('sections.fees')}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-4">
              {fees.map((f, i) => (
                <motion.div
                  key={f.concept}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i + 1}
                >
                  <Card className="bg-background border">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{f.concept}</CardTitle>
                        <Badge style={{ backgroundColor: 'hsl(210, 100%, 20%)', color: 'white' }}>
                          {f.price}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{f.detail}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Governance Documents */}
        <section className="container mx-auto px-4 py-12">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-2xl font-bold mb-8 font-serif"
            style={{ color: 'hsl(210, 100%, 20%)' }}
          >
            <FileText className="inline h-6 w-6 mr-2 mb-1" />
            {t('sections.documents')}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc, i) => (
              <motion.div
                key={doc.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i + 1}
              >
                <Link to={doc.link}>
                  <Card className="bg-background border hover:shadow-md transition-shadow cursor-pointer group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <doc.icon className="h-5 w-5 flex-shrink-0" style={{ color: 'hsl(210, 100%, 20%)' }} />
                        <CardTitle className="text-base group-hover:underline">{doc.title}</CardTitle>
                        <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{doc.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Governance Authority */}
        <section className="bg-muted/40 py-12">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={0}
              className="text-2xl font-bold mb-8 font-serif"
              style={{ color: 'hsl(210, 100%, 20%)' }}
            >
              <Users className="inline h-6 w-6 mr-2 mb-1" />
              {t('sections.authority')}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: t('authority.technical'), desc: t('authority.technicalDesc'), icon: Shield },
                { title: t('authority.ethics'), desc: t('authority.ethicsDesc'), icon: Scale },
                { title: t('authority.executive'), desc: t('authority.executiveDesc'), icon: Building2 },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i + 1}
                >
                  <Card className="bg-background border h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" style={{ color: 'hsl(210, 100%, 20%)' }} />
                        <CardTitle className="text-base">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audits & Communication */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <h2 className="text-2xl font-bold mb-4 font-serif" style={{ color: 'hsl(210, 100%, 20%)' }}>
                <ClipboardCheck className="inline h-6 w-6 mr-2 mb-1" />
                {t('sections.audits')}
              </h2>
              <Card className="bg-background border">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">{t('audits.description')}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">2026-Q1</Badge>
                      <span className="text-muted-foreground">{t('audits.upcoming')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <h2 className="text-2xl font-bold mb-4 font-serif" style={{ color: 'hsl(210, 100%, 20%)' }}>
                <MessageSquare className="inline h-6 w-6 mr-2 mb-1" />
                {t('sections.communication')}
              </h2>
              <Card className="bg-background border">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">{t('communication.description')}</p>
                  <Button asChild style={{ backgroundColor: 'hsl(210, 100%, 20%)' }}>
                    <Link to="/registro">
                      {t('communication.cta')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
}
