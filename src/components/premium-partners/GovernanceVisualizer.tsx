import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, Shield, Users, Globe, Network, 
  FileCheck, Coins, Lock, CheckCircle2 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const GovernanceVisualizer = () => {
  const { t } = useTranslation('premiumPartners');
  const [activeTab, setActiveTab] = useState('intra');

  return (
    <section className="py-24 bg-muted dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('governance.title')} <span className="text-violet-500 dark:text-violet-400">{t('governance.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('governance.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-card/50 dark:bg-slate-800/50 p-1 rounded-xl mb-8">
              <TabsTrigger 
                value="intra" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Building2 className="w-4 h-4 mr-2" />
                {t('governance.intraTab')}
              </TabsTrigger>
              <TabsTrigger 
                value="inter"
                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Network className="w-4 h-4 mr-2" />
                {t('governance.interTab')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intra">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-blue-100 dark:from-blue-950/50 to-background dark:to-slate-900 border-blue-500/30 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Visual Circle */}
                      <div className="relative">
                        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center border-2 border-blue-500/30">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600/30 to-blue-700/20 flex items-center justify-center border border-blue-400/30">
                            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                              <Building2 className="w-10 h-10 text-white" />
                            </div>
                          </div>
                        </div>
                        {/* Orbiting elements */}
                        {[0, 60, 120, 180, 240, 300].map((degree, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center"
                            style={{
                              top: `${50 + 45 * Math.sin((degree * Math.PI) / 180)}%`,
                              left: `${50 + 45 * Math.cos((degree * Math.PI) / 180)}%`,
                              transform: 'translate(-50%, -50%)',
                            }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          >
                            <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30">
                            {t('governance.intra.badge')}
                          </Badge>
                          <span className="text-muted-foreground">{t('governance.intra.control')}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground">
                          {t('governance.intra.title')}
                        </h3>

                        <div className="space-y-4">
                          <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 dark:bg-slate-800/50 border border-border">
                            <Coins className="w-6 h-6 text-blue-500 dark:text-blue-400 mt-1" />
                            <div>
                              <p className="text-foreground font-medium">{t('governance.intra.feature1.title')}</p>
                              <p className="text-muted-foreground text-sm">{t('governance.intra.feature1.desc')}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 dark:bg-slate-800/50 border border-border">
                            <CheckCircle2 className="w-6 h-6 text-blue-500 dark:text-blue-400 mt-1" />
                            <div>
                              <p className="text-foreground font-medium">{t('governance.intra.feature2.title')}</p>
                              <p className="text-muted-foreground text-sm">{t('governance.intra.feature2.desc')}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 dark:bg-slate-800/50 border border-border">
                            <Lock className="w-6 h-6 text-blue-500 dark:text-blue-400 mt-1" />
                            <div>
                              <p className="text-foreground font-medium">{t('governance.intra.feature3.title')}</p>
                              <p className="text-muted-foreground text-sm">{t('governance.intra.feature3.desc')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="inter">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-violet-100 dark:from-violet-950/50 to-background dark:to-slate-900 border-violet-500/30 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Visual Network */}
                      <div className="relative w-48 h-48">
                        {/* Central node */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center z-10 shadow-lg shadow-violet-500/30">
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        
                        {/* Connected nodes */}
                        {[
                          { top: '10%', left: '50%', delay: 0 },
                          { top: '30%', left: '15%', delay: 0.2 },
                          { top: '30%', left: '85%', delay: 0.4 },
                          { top: '70%', left: '15%', delay: 0.6 },
                          { top: '70%', left: '85%', delay: 0.8 },
                          { top: '90%', left: '50%', delay: 1 },
                        ].map((pos, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-10 h-10 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center"
                            style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                            animate={{ 
                              boxShadow: ['0 0 0 0 rgba(139, 92, 246, 0.3)', '0 0 0 10px rgba(139, 92, 246, 0)', '0 0 0 0 rgba(139, 92, 246, 0.3)']
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: pos.delay }}
                          >
                            <Network className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                          </motion.div>
                        ))}

                        {/* Connection lines */}
                        <svg className="absolute inset-0 w-full h-full">
                          {[
                            'M96,96 L96,24',
                            'M96,96 L24,48',
                            'M96,96 L168,48',
                            'M96,96 L24,144',
                            'M96,96 L168,144',
                            'M96,96 L96,168',
                          ].map((d, i) => (
                            <motion.path
                              key={i}
                              d={d}
                              stroke="rgba(139, 92, 246, 0.3)"
                              strokeWidth="2"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
                            />
                          ))}
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-violet-500/20 text-violet-600 dark:text-violet-400 border-violet-500/30">
                            {t('governance.inter.badge')}
                          </Badge>
                          <span className="text-muted-foreground">{t('governance.inter.tech')}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground">
                          {t('governance.inter.title')}
                        </h3>

                        <div className="space-y-4">
                          <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 dark:bg-slate-800/50 border border-border">
                            <Globe className="w-6 h-6 text-violet-500 dark:text-violet-400 mt-1" />
                            <div>
                              <p className="text-foreground font-medium">{t('governance.inter.feature1.title')}</p>
                              <p className="text-muted-foreground text-sm">{t('governance.inter.feature1.desc')}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 dark:bg-slate-800/50 border border-border">
                            <FileCheck className="w-6 h-6 text-violet-500 dark:text-violet-400 mt-1" />
                            <div>
                              <p className="text-foreground font-medium">{t('governance.inter.feature2.title')}</p>
                              <p className="text-muted-foreground text-sm">{t('governance.inter.feature2.desc')}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50 dark:bg-slate-800/50 border border-border">
                            <Shield className="w-6 h-6 text-violet-500 dark:text-violet-400 mt-1" />
                            <div>
                              <p className="text-foreground font-medium">{t('governance.inter.feature3.title')}</p>
                              <p className="text-muted-foreground text-sm">{t('governance.inter.feature3.desc')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};