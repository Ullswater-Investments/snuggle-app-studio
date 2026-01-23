import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FileSignature, 
  Users, 
  Landmark, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Building2,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { FundingFooter } from '@/components/FundingFooter';
import { toast } from 'sonner';
import { useNodeEligibility } from '@/hooks/useNodeEligibility';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';

export const NodeRequirementsPage = () => {
  const { t } = useTranslation(['nodes']);
  const [formData, setFormData] = useState({
    entityName: '',
    entityType: '',
    ecosystemStatus: '',
    email: ''
  });

  const { submitEligibility, isSubmitting } = useNodeEligibility();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.entityName || !formData.entityType || !formData.ecosystemStatus || !formData.email) {
      toast.error(t('pages.requirements.form.validationError'));
      return;
    }
    
    try {
      const result = await submitEligibility(formData);
      
      toast.success(
        t('pages.requirements.form.successTitle'),
        { description: t('pages.requirements.form.successDesc') }
      );
      
      setFormData({ entityName: '', entityType: '', ecosystemStatus: '', email: '' });
      
      console.log('Eligibility request submitted:', result.requestId);
    } catch (err) {
      toast.error(
        t('pages.requirements.form.errorTitle'),
        { description: t('pages.requirements.form.errorDesc') }
      );
    }
  };

  // DIAGRAMA IDIOGRÁFICO MEJORADO: ARCO JERÁRQUICO HUB & SPOKE
  const EcosystemVisual = () => {
    return (
      <div className="relative w-full max-w-4xl h-[420px] mx-auto hidden md:block">
        {/* 1. LÍNEAS DE CONEXIÓN SVG (CAPA DE FONDO) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 896 420"
          preserveAspectRatio="xMidYMid meet"
          style={{ zIndex: 0 }}
        >
          {/* Líneas curvas desde Promotor hacia satélites */}
          <motion.path 
            d="M448,280 C350,280 150,180 100,100" 
            fill="none" 
            stroke="hsl(var(--muted-foreground) / 0.3)" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.path 
            d="M448,280 C400,230 280,160 230,80" 
            fill="none" 
            stroke="hsl(var(--muted-foreground) / 0.3)" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.path 
            d="M448,280 L448,70" 
            fill="none" 
            stroke="hsl(var(--muted-foreground) / 0.3)" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path 
            d="M448,280 C500,230 620,160 670,80" 
            fill="none" 
            stroke="hsl(var(--muted-foreground) / 0.3)" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.path 
            d="M448,280 C550,280 750,180 800,100" 
            fill="none" 
            stroke="hsl(var(--muted-foreground) / 0.3)" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
          
          {/* Conexión vertical a la base */}
          <motion.line 
            x1="448" y1="340" x2="448" y2="380" 
            stroke="hsl(24 95% 53%)" 
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />
        </svg>

        {/* 2. SATÉLITES (EMPRESAS PARTICIPANTES) */}
        {[
          { num: 1, top: '80px', left: '50px', delay: 0.6 },
          { num: 2, top: '50px', left: '180px', delay: 0.7 },
          { num: 3, top: '20px', left: '50%', delay: 0.8, center: true, highlight: true },
          { num: 4, top: '50px', right: '180px', delay: 0.9 },
          { num: 5, top: '80px', right: '50px', delay: 1 },
        ].map((emp) => (
          <motion.div 
            key={emp.num}
            className={`absolute flex flex-col items-center ${emp.center ? 'left-1/2 -translate-x-1/2' : ''}`}
            style={{ 
              top: emp.top, 
              left: emp.left && !emp.center ? emp.left : undefined,
              right: emp.right
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: emp.delay }}
          >
            <div className={`${emp.highlight ? 'w-16 h-16 border-2 border-primary/30' : 'w-14 h-14 border border-border'} bg-background rounded-xl flex items-center justify-center shadow-lg z-10 hover:scale-110 transition-transform`}>
              <Building2 className={`${emp.highlight ? 'w-6 h-6 text-primary' : 'w-5 h-5 text-muted-foreground'}`} />
            </div>
            <span className={`mt-2 text-xs ${emp.highlight ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`}>
              {t('pages.requirements.ecosystem.company')} {emp.num}
            </span>
            <div className="mt-1 text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" />
              {t('pages.requirements.ecosystem.adhered')}
            </div>
          </motion.div>
        ))}

        {/* 3. PROMOTOR (CENTRO HUB) */}
        <motion.div 
          className="absolute bottom-[90px] left-1/2 -translate-x-1/2 z-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap z-30">
              {t('pages.requirements.ecosystem.nodeManager')}
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-2xl shadow-orange-500/30 w-56 text-center transform hover:scale-105 transition-transform duration-300 border-4 border-white dark:border-slate-800">
              <Landmark className="w-10 h-10 mx-auto mb-2" />
              <h3 className="font-bold text-lg leading-tight">{t('pages.requirements.ecosystem.yourEntity')}</h3>
              <p className="text-orange-100 text-xs mt-1">{t('pages.requirements.ecosystem.billingGovernance')}</p>
            </div>
          </div>
        </motion.div>

        {/* 4. BASE (INFRAESTRUCTURA) */}
        <motion.div 
          className="absolute bottom-0 w-full z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <div className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg mx-4">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-sm tracking-wide">{t('pages.requirements.ecosystem.infrastructure')}</span>
          </div>
        </motion.div>
      </div>
    );
  };

  const benefits = t('pages.requirements.benefits', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/nodos-sectoriales" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">{t('pages.requirements.backToOverview')}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 hidden sm:inline-flex">
              {t('pages.requirements.badge')}
            </Badge>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white mb-6 shadow-lg">
            <FileSignature className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('pages.requirements.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('pages.requirements.subtitle')}
          </p>
        </motion.div>

        {/* Visual Diagram Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-4">{t('pages.requirements.ecosystem.title')}</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
            {t('pages.requirements.ecosystem.description')}
          </p>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm min-h-[400px] relative">
            <EcosystemVisual />
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {Array.isArray(benefits) && benefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-lg mb-4">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* SECCIÓN FINANCIERA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-4">{t('pages.requirements.financial.title')}</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('pages.requirements.financial.description')}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Tarjeta Promotor */}
            <Card className="border-2 border-orange-200 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4">
                <div className="flex items-center gap-3">
                  <Landmark className="w-6 h-6" />
                  <span className="font-bold text-lg">{t('pages.requirements.financial.promoter.label')}</span>
                </div>
              </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-1">{t('pages.requirements.financial.promoter.costLabel')}</p>
                  <p className="text-4xl font-bold text-foreground">{t('pages.requirements.financial.promoter.totalCost')}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/50">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">{t('pages.requirements.financial.promoter.step1Title')}</span>
                        <span className="font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap shrink-0">{t('pages.requirements.financial.promoter.step1Amount')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('pages.requirements.financial.promoter.step1Desc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">{t('pages.requirements.financial.promoter.step2Title')}</span>
                        <span className="font-bold text-green-600 dark:text-green-400 whitespace-nowrap shrink-0">{t('pages.requirements.financial.promoter.step2Amount')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('pages.requirements.financial.promoter.step2Desc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/50">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">{t('pages.requirements.financial.promoter.step3Title')}</span>
                        <span className="font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap shrink-0">{t('pages.requirements.financial.promoter.step3Amount')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800" dangerouslySetInnerHTML={{ __html: t('pages.requirements.financial.promoter.note') }} />
                </div>
              </CardContent>
            </Card>

            {/* Tarjeta Participante */}
            <Card className="border-2 border-slate-200 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  <span className="font-bold text-lg">{t('pages.requirements.financial.participant.label')}</span>
                </div>
              </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-1">{t('pages.requirements.financial.participant.costLabel')}</p>
                  <p className="text-4xl font-bold text-foreground">{t('pages.requirements.financial.participant.totalCost')}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t('pages.requirements.financial.participant.perCompany')}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/50">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">{t('pages.requirements.financial.participant.step1Title')}</span>
                        <span className="font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap shrink-0">{t('pages.requirements.financial.participant.step1Amount')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('pages.requirements.financial.participant.step1Desc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">{t('pages.requirements.financial.participant.step2Title')}</span>
                        <span className="font-bold text-green-600 dark:text-green-400 whitespace-nowrap shrink-0">{t('pages.requirements.financial.participant.step2Amount')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('pages.requirements.financial.participant.step2Desc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">{t('pages.requirements.financial.participant.step3Title')}</span>
                        <span className="font-bold text-orange-600 whitespace-nowrap shrink-0">{t('pages.requirements.financial.participant.step3Amount')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800" dangerouslySetInnerHTML={{ __html: t('pages.requirements.financial.participant.note') }} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Callout de garantía */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-green-800 text-lg mb-1">{t('pages.requirements.financial.guarantee.title')}</h4>
                <p className="text-green-700" dangerouslySetInnerHTML={{ __html: t('pages.requirements.financial.guarantee.description') }} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FORMULARIO DE CUALIFICACIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <Card className="border-2 border-orange-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{t('pages.requirements.form.title')}</h2>
                <p className="text-orange-100">
                  {t('pages.requirements.form.description')}
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="entityName" className="font-medium">{t('pages.requirements.form.entityName')}</Label>
                    <Input
                      id="entityName"
                      placeholder={t('pages.requirements.form.entityNamePlaceholder')}
                      value={formData.entityName}
                      onChange={(e) => setFormData({...formData, entityName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entityType" className="font-medium">{t('pages.requirements.form.entityType')}</Label>
                    <Select
                      value={formData.entityType}
                      onValueChange={(value) => setFormData({...formData, entityType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('pages.requirements.form.entityTypePlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cluster">{t('pages.requirements.form.entityTypes.cluster')}</SelectItem>
                        <SelectItem value="empresa">{t('pages.requirements.form.entityTypes.empresa')}</SelectItem>
                        <SelectItem value="centro">{t('pages.requirements.form.entityTypes.centro')}</SelectItem>
                        <SelectItem value="otro">{t('pages.requirements.form.entityTypes.otro')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ecosystemStatus" className="font-medium">{t('pages.requirements.form.ecosystemStatus')}</Label>
                  <Select
                    value={formData.ecosystemStatus}
                    onValueChange={(value) => setFormData({...formData, ecosystemStatus: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('pages.requirements.form.ecosystemStatusPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ready">{t('pages.requirements.form.ecosystemOptions.ready')}</SelectItem>
                      <SelectItem value="process">{t('pages.requirements.form.ecosystemOptions.process')}</SelectItem>
                      <SelectItem value="help">{t('pages.requirements.form.ecosystemOptions.help')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">{t('pages.requirements.form.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('pages.requirements.form.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={isSubmitting || !formData.entityName || !formData.entityType || !formData.ecosystemStatus || !formData.email}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t('pages.requirements.form.submitting')}
                    </>
                  ) : (
                    <>
                      {t('pages.requirements.form.submit')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {t('pages.requirements.form.disclaimer')}
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 md:p-12 text-center"
        >
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t('pages.requirements.cta.title')}
            </h2>
            <p className="text-orange-100 mb-6 max-w-xl mx-auto">
              {t('pages.requirements.cta.description')}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50"
            >
              <Link to="/nodos-sectoriales#contacto">
                {t('pages.requirements.cta.button')}
              </Link>
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <FundingFooter variant="dark" />
        </div>
      </footer>
    </div>
  );
};

export default NodeRequirementsPage;
