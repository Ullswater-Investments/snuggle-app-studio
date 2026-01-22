import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Database, 
  Shield, 
  Wallet, 
  Target, 
  TrendingUp,
  Brain,
  ArrowRight,
  ExternalLink,
  Sparkles,
  BarChart3,
  Cpu,
  Factory,
  Building2,
  LineChart,
  Coins
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { FundingFooter } from "@/components/FundingFooter";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import { useTranslation } from "react-i18next";

const ValerdataProyecto = () => {
  const { t } = useTranslation('valerdata');

  const features = [
    {
      icon: Database,
      title: t('features.items.ingestion.title'),
      description: t('features.items.ingestion.description'),
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Brain,
      title: t('features.items.ai.title'),
      description: t('features.items.ai.description'),
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Shield,
      title: t('features.items.sovereignty.title'),
      description: t('features.items.sovereignty.description'),
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Wallet,
      title: t('features.items.payments.title'),
      description: t('features.items.payments.description'),
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  ];

  const problems = [
    {
      icon: Factory,
      title: t('problem.items.fragmented.title'),
      description: t('problem.items.fragmented.description')
    },
    {
      icon: LineChart,
      title: t('problem.items.predictions.title'),
      description: t('problem.items.predictions.description')
    },
    {
      icon: Building2,
      title: t('problem.items.blind.title'),
      description: t('problem.items.blind.description')
    }
  ];

  const benefits = [
    { metric: t('stats.accuracy.value'), label: t('stats.accuracy.label') },
    { metric: t('stats.datasets.value'), label: t('stats.datasets.label') },
    { metric: t('stats.traceability.value'), label: t('stats.traceability.label') },
    { metric: t('stats.funding.value'), label: t('stats.funding.label') }
  ];

  const ecosystemRoles = [
    { role: "Consumer", org: "VALERDATA S.L.", description: t('ecosystem.consumer') },
    { role: "Provider", org: "DataHub Industrial", description: t('ecosystem.provider1') },
    { role: "Provider", org: "Commodity Exchange", description: t('ecosystem.provider2') },
    { role: "Provider", org: "Industry Analytics", description: t('ecosystem.provider3') }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <GlobalNavigation />
              <Link 
                to="/partners" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t('nav.backToPartners')}</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="default" size="sm" asChild>
                <Link to="/partners/valerdata/login" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  {t('nav.membersArea')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNCAyNGgydjJoLTJ2LTJ6TTI0IDI0aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-white/10 text-white border-white/20 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('hero.badges.kit')}
            </Badge>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <span className="text-white font-bold text-3xl">V</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {t('hero.title')}
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2">
                <Target className="w-5 h-5" />
                {t('hero.cta.project')}
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2" asChild>
                <Link to="/partners/valerdata/login">
                  {t('hero.cta.members')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Benefits Bar */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{benefit.metric}</div>
                <div className="text-sm text-muted-foreground">{benefit.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 text-red-600 border-red-200">{t('problem.badge')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('problem.title')}</h2>
              <p className="text-lg text-muted-foreground">{t('problem.description')}</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <StaggerItem key={problem.title}>
                <Card className="h-full border-red-100 bg-red-50/30 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <problem.icon className="h-10 w-10 text-red-500 mb-2" />
                    <CardTitle className="text-xl">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{problem.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-200">{t('solution.badge')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('solution.title')}</h2>
              <p className="text-lg text-muted-foreground">{t('solution.description')}</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card className="h-full hover:shadow-lg transition-all group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" className="mb-4 text-purple-600 border-purple-200">{t('ecosystem.badge')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ecosystem.title')}</h2>
              <p className="text-lg text-muted-foreground">{t('ecosystem.description')}</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ecosystemRoles.map((item, index) => (
              <motion.div
                key={item.org}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${item.role === 'Consumer' ? 'border-blue-200 bg-blue-50/50' : 'border-emerald-200 bg-emerald-50/50'}`}>
                  <CardContent className="pt-6">
                    <Badge className={item.role === 'Consumer' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}>
                      {item.role}
                    </Badge>
                    <h3 className="font-bold mt-3 mb-2">{item.org}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4 bg-white/10 text-white border-white/20">{t('techStack.badge')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('techStack.title')}</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-bold text-xl mb-2">{t('techStack.items.gaiax.title')}</h3>
              <p className="text-slate-400">{t('techStack.items.gaiax.description')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="font-bold text-xl mb-2">{t('techStack.items.ml.title')}</h3>
              <p className="text-slate-400">{t('techStack.items.ml.description')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Coins className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="font-bold text-xl mb-2">{t('techStack.items.euroe.title')}</h3>
              <p className="text-slate-400">{t('techStack.items.euroe.description')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t('cta.description')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2" asChild>
                <Link to="/partners/valerdata/login">
                  {t('cta.buttons.members')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2" asChild>
                <Link to="/catalog">
                  {t('cta.buttons.catalog')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
};

export default ValerdataProyecto;
