import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Euro, Users, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PremiumPartnersBanner = () => {
  const { t } = useTranslation('premiumPartners');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 shadow-xl shadow-amber-500/10"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/15 rounded-full blur-[80px]" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-400/40"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30 px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1.5" />
                {t('banner.badge')}
              </Badge>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {t('banner.title').split(' ').slice(0, 3).join(' ')}{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                {t('banner.title').split(' ').slice(3).join(' ')}
              </span>
            </h2>

            <p className="text-slate-300 text-base max-w-xl">
              {t('banner.subtitle')}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Euro className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">{t('banner.stats.funding')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">{t('banner.stats.partners')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">{t('banner.stats.weeks')}</span>
              </div>
            </div>
          </div>

          {/* Right CTA */}
          <div className="flex-shrink-0">
            <Link to="/partners/premium">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {t('banner.cta')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
