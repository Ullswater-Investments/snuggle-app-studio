import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
  const { t } = useTranslation('premiumPartners');
  
  const scrollToSimulator = () => {
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-muted via-background to-muted dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated background nodes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Central glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Floating nodes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
            style={{
              left: `${15 + (i % 4) * 25}%`,
              top: `${20 + Math.floor(i / 4) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.path
            d="M200,200 Q400,100 600,300 T1000,200"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.path
            d="M100,400 Q300,200 500,400 T900,300"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            {t('hero.badge')}
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {t('hero.title')}{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            {t('hero.titleHighlight')}
          </span>
          <br />
          {t('hero.titleEnd')}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
        />

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={scrollToSimulator}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 text-lg px-8 py-6"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {t('hero.cta')}
          </Button>
          <Link to="/docs/partners">
            <Button
              size="lg"
              variant="outline"
              className="border-border text-muted-foreground hover:bg-muted hover:text-foreground text-lg px-8 py-6"
            >
              <FileText className="mr-2 h-5 w-5" />
              {t('hero.docs')}
            </Button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};