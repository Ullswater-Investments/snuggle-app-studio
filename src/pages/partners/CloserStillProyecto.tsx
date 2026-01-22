import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Zap,
  Users,
  Shield,
  CheckCircle2,
  ExternalLink,
  Globe,
  Sparkles,
  Network,
  FileCheck,
  Handshake,
  Award
} from "lucide-react";
import { useTranslation } from "react-i18next";

const CloserStillProyecto = () => {
  const { t } = useTranslation('closerstill-proyecto');

  const ecosystems = [
    {
      name: t('ecosystems.madrid.name'),
      location: t('ecosystems.madrid.location'),
      description: t('ecosystems.madrid.description'),
      subEvents: t('ecosystems.madrid.subEvents', { returnObjects: true }) as string[]
    },
    {
      name: t('ecosystems.barcelona.name'),
      location: t('ecosystems.barcelona.location'),
      description: t('ecosystems.barcelona.description'),
      subEvents: t('ecosystems.barcelona.subEvents', { returnObjects: true }) as string[]
    },
    {
      name: t('ecosystems.health.name'),
      location: t('ecosystems.health.location'),
      description: t('ecosystems.health.description'),
      subEvents: t('ecosystems.health.subEvents', { returnObjects: true }) as string[]
    }
  ];

  const valuePropositions = [
    {
      icon: Zap,
      title: t('valueProposition.items.fastTrack.title'),
      description: t('valueProposition.items.fastTrack.description')
    },
    {
      icon: Network,
      title: t('valueProposition.items.dataSpace.title'),
      description: t('valueProposition.items.dataSpace.description')
    },
    {
      icon: Handshake,
      title: t('valueProposition.items.matchmaking.title'),
      description: t('valueProposition.items.matchmaking.description')
    }
  ];

  const integratedServices = [
    {
      icon: FileCheck,
      title: t('services.items.onboarding.title'),
      description: t('services.items.onboarding.description')
    },
    {
      icon: Shield,
      title: t('services.items.leads.title'),
      description: t('services.items.leads.description')
    },
    {
      icon: Award,
      title: t('services.items.certification.title'),
      description: t('services.items.certification.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/partners">
                <ArrowLeft className="h-4 w-4" />
                {t('nav.backToPartners')}
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-600 text-white">{t('hero.badges.strategic')}</Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-600">
                {t('hero.badges.kitReady')}
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-blue-400" />
              <span className="text-blue-200 font-medium">{t('hero.badges.ecosystem')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }} />

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Globe className="h-4 w-4 text-blue-400" />
                <span>{t('stats.countries.value')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Users className="h-4 w-4 text-blue-400" />
                <span>{t('stats.visitors.value')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span>{t('stats.exhibitors.value')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="text-2xl">{t('profile.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>{t('profile.paragraph1')}</p>
                <p>{t('profile.paragraph2')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ecosystems Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">{t('ecosystems.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('ecosystems.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ecosystems.map((ecosystem, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      {ecosystem.location}
                    </div>
                    <CardTitle className="text-lg">{ecosystem.name}</CardTitle>
                    <CardDescription>{ecosystem.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {ecosystem.subEvents.map((event, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* eForums Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <Badge className="w-fit bg-blue-600">{t('eforums.badge')}</Badge>
                <CardTitle className="text-xl mt-2">{t('eforums.title')}</CardTitle>
                <CardDescription>{t('eforums.description')}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-blue-500 text-blue-600">
                {t('valueProposition.badge')}
              </Badge>
              <h2 className="text-3xl font-bold">{t('valueProposition.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t('valueProposition.description') }} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {valuePropositions.map((prop, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <prop.icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{prop.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{prop.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Services */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">{t('services.title')}</h2>
              <p className="text-blue-200">{t('services.description')}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {integratedServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-blue-200">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
              <CardContent className="p-8 text-center space-y-6">
                <h3 className="text-2xl font-bold">{t('cta.title')}</h3>
                <p className="text-blue-100">{t('cta.description')}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                    {t('cta.buttons.opportunities')}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-700 hover:bg-blue-50"
                    asChild
                  >
                    <Link to="/kit-espacio-datos">
                      {t('cta.buttons.kit')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloserStillProyecto;
