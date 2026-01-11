import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Building2, Mail, MessageSquare, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const AdhesionForm = () => {
  const { t } = useTranslation('premiumPartners');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organization: '',
    email: '',
    motivation: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.organization || !formData.email) {
      toast.error(t('form.errorRequired'));
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success(t('form.successMessage'));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('form.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('form.title')} <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">{t('form.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('form.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
            <CardContent className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Organization */}
                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-slate-300 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      {t('form.organizationLabel')} *
                    </Label>
                    <Input
                      id="organization"
                      placeholder={t('form.organizationPlaceholder')}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-400" />
                      {t('form.emailLabel')} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('form.emailPlaceholder')}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  {/* Motivation */}
                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-slate-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      {t('form.motivationLabel')}
                    </Label>
                    <Textarea
                      id="motivation"
                      placeholder={t('form.motivationPlaceholder')}
                      rows={4}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 resize-none"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 h-12 text-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        {t('form.submitting')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        {t('form.submitButton')}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>

                  {/* Privacy note */}
                  <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    {t('form.privacyNote')}
                  </p>
                </form>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t('form.successTitle')}</h3>
                  <p className="text-slate-400 mb-6">
                    {t('form.successDescription')}
                  </p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    Ref: PP-{Date.now().toString(36).toUpperCase()}
                  </Badge>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            t('form.trust1'),
            t('form.trust2'),
            t('form.trust3'),
            t('form.trust4'),
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
