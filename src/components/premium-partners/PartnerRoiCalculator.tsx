import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Euro, Users, Activity, TrendingUp, Sparkles, Info, CheckCircle2 } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from 'react-i18next';

const GRANT_INCOME = 30000;
const COST_YEAR1 = 5000;
const PLATFORM_FEE = 0.20;
const PARTNER_SHARE = 0.50;

export const PartnerRoiCalculator = () => {
  const { t } = useTranslation('premiumPartners');
  const [numAsociados, setNumAsociados] = useState(100);
  const [transaccionesMes, setTransaccionesMes] = useState(10);
  const [valorMedio, setValorMedio] = useState(1000);
  
  const [displayNetCash, setDisplayNetCash] = useState(0);
  const [displayAnnualRevenue, setDisplayAnnualRevenue] = useState(0);

  // Calculations
  const netCashYear1 = GRANT_INCOME - COST_YEAR1;
  const monthlyVolume = numAsociados * transaccionesMes * valorMedio;
  const partnerCommission = monthlyVolume * PLATFORM_FEE * PARTNER_SHARE;
  const annualRecurrentRevenue = partnerCommission * 12;
  const totalYear1 = netCashYear1 + annualRecurrentRevenue;

  // 3-year projection
  const projectionData = [
    { year: t('calculator.year') + ' 1', value: totalYear1, fill: 'url(#barGradient1)' },
    { year: t('calculator.year') + ' 2', value: annualRecurrentRevenue * 1.3, fill: 'url(#barGradient2)' },
    { year: t('calculator.year') + ' 3', value: annualRecurrentRevenue * 1.6, fill: 'url(#barGradient3)' },
  ];

  // Animated counters
  useEffect(() => {
    const duration = 500;
    const steps = 20;
    
    const netIncrement = (netCashYear1 - displayNetCash) / steps;
    const revenueIncrement = (annualRecurrentRevenue - displayAnnualRevenue) / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setDisplayNetCash(prev => Math.round(prev + netIncrement));
      setDisplayAnnualRevenue(prev => Math.round(prev + revenueIncrement));
      if (step >= steps) {
        clearInterval(timer);
        setDisplayNetCash(netCashYear1);
        setDisplayAnnualRevenue(annualRecurrentRevenue);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [netCashYear1, annualRecurrentRevenue]);

  const isHighSaver = totalYear1 > 50000;

  return (
    <section id="simulator" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('calculator.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('calculator.title')} <span className="text-emerald-400">{t('calculator.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('calculator.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8 space-y-8">
                <h3 className="text-xl font-semibold text-white mb-6">{t('calculator.configure')}</h3>
                
                {/* Slider 1: Asociados */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-400" />
                      <span className="text-slate-300">{t('calculator.associates')}</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{numAsociados.toLocaleString('es-ES')}</span>
                  </div>
                  <Slider
                    value={[numAsociados]}
                    onValueChange={(v) => setNumAsociados(v[0])}
                    min={10}
                    max={5000}
                    step={10}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>10</span>
                    <span>5.000</span>
                  </div>
                </div>

                {/* Slider 2: Transacciones */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-orange-400" />
                      <span className="text-slate-300">{t('calculator.transactions')}</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{transaccionesMes}</span>
                  </div>
                  <Slider
                    value={[transaccionesMes]}
                    onValueChange={(v) => setTransaccionesMes(v[0])}
                    min={1}
                    max={50}
                    step={1}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Slider 3: Valor Medio */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-emerald-400" />
                      <span className="text-slate-300">{t('calculator.avgValue')}</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{valorMedio.toLocaleString('es-ES')}€</span>
                  </div>
                  <Slider
                    value={[valorMedio]}
                    onValueChange={(v) => setValorMedio(v[0])}
                    min={100}
                    max={10000}
                    step={100}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>100€</span>
                    <span>10.000€</span>
                  </div>
                </div>

                {/* Info tooltip */}
                <div className="pt-4 border-t border-slate-700">
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 text-slate-400 cursor-help">
                        <Info className="w-4 h-4" />
                        <span className="text-sm">{t('calculator.howCalculated')}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm bg-slate-800 border-slate-700">
                      <p className="text-sm">{t('calculator.howCalculatedTooltip')}</p>
                    </TooltipContent>
                  </UITooltip>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Immediate Impact Card */}
            <Card className="bg-gradient-to-br from-emerald-950/50 to-slate-900 border-emerald-500/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent" />
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400">{t('calculator.netBenefit')}</span>
                  <UITooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-slate-500" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm bg-slate-800 border-slate-700">
                      <p className="text-sm">{t('calculator.netBenefitTooltip')}</p>
                    </TooltipContent>
                  </UITooltip>
                </div>
                <motion.div
                  className="flex items-center gap-3"
                  key={displayNetCash}
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <span className="text-4xl md:text-5xl font-bold text-emerald-400">
                    +{displayNetCash.toLocaleString('es-ES')}€
                  </span>
                </motion.div>
                <p className="text-emerald-400/70 mt-2 text-sm">✓ {t('calculator.cashPositive')}</p>
              </CardContent>
            </Card>

            {/* Recurrent Revenue Card */}
            <Card className="bg-gradient-to-br from-amber-950/30 to-slate-900 border-amber-500/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent" />
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400">{t('calculator.recurrentRevenue')}</span>
                  <AnimatePresence>
                    {isHighSaver && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {t('calculator.highRevenue')}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <motion.div
                  className="flex items-center gap-3"
                  key={displayAnnualRevenue}
                >
                  <Euro className="w-8 h-8 text-amber-400" />
                  <span className="text-4xl md:text-5xl font-bold text-amber-400">
                    +{displayAnnualRevenue.toLocaleString('es-ES')}€
                  </span>
                </motion.div>
                <p className="text-amber-400/70 mt-2 text-sm">
                  {t('calculator.monthlyVolume')}: {monthlyVolume.toLocaleString('es-ES')}€ × 10%
                </p>
              </CardContent>
            </Card>

            {/* 3-Year Projection Chart */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-white mb-4">{t('calculator.projection')}</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectionData} barSize={50}>
                      <defs>
                        <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                        <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                        <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#ea580c" />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        formatter={(value: number) => [`${value.toLocaleString('es-ES')}€`, t('calculator.revenue')]}
                        contentStyle={{
                          backgroundColor: 'hsl(222.2 47.4% 11.2%)',
                          border: '1px solid hsl(217.2 32.6% 17.5%)',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'white' }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {projectionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Dynamic Message */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-slate-300">
            {t('calculator.result', { amount: totalYear1.toLocaleString('es-ES') })}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
