import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Shield, Coins, Bot, Globe, Home } from "lucide-react";

export default function Guide() {
  const { t } = useTranslation('guide');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* SIDEBAR DE NAVEGACIÓN */}
      <aside className="w-64 border-r bg-muted/10 hidden md:block p-6">
        <Link to="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
          <Home className="h-5 w-5 text-muted-foreground" />
          <span className="procuredata-gradient font-bold">PROCUREDATA</span>
        </Link>
        <nav className="space-y-2 text-sm">
          <button onClick={() => scrollToSection('vision')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
            {t('sidebar.vision')}
          </button>
          <button onClick={() => scrollToSection('roles')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
            {t('sidebar.roles')}
          </button>
          <button onClick={() => scrollToSection('features')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
            {t('sidebar.features')}
          </button>
          <button onClick={() => scrollToSection('business')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
            {t('sidebar.business')}
          </button>
          <button onClick={() => scrollToSection('tech')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
            {t('sidebar.tech')}
          </button>
          <button onClick={() => scrollToSection('web3')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
            {t('sidebar.web3')}
          </button>
        </nav>
        <div className="mt-8 pt-8 border-t">
          <Link to="/">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" /> {t('sidebar.backToApp')}
            </Button>
          </Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-12 px-8">
          
          {/* HEADER */}
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">{t('header.badge')}</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">{t('header.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('header.subtitle')}
            </p>
          </div>

          <Separator className="my-8" />

          {/* SECCIÓN 1: VISIÓN */}
          <section id="vision" className="space-y-6 mb-16">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {t('sections.vision.title')} <Globe className="h-6 w-6 text-blue-500"/>
            </h2>
            <p className="leading-7 text-lg" dangerouslySetInnerHTML={{ __html: t('sections.vision.description') }} />
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100">
              <CardContent className="p-4 italic text-blue-800 dark:text-blue-200">
                {t('sections.vision.quote')}
              </CardContent>
            </Card>
          </section>

          {/* SECCIÓN 2: ROLES */}
          <section id="roles" className="space-y-6 mb-16">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {t('sections.roles.title')} <Shield className="h-6 w-6 text-green-500"/>
            </h2>
            <p className="leading-7">
              {t('sections.roles.description')}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">{t('sections.roles.provider.title')}</h3>
                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('sections.roles.provider.description') }} />
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">{t('sections.roles.holder.title')}</h3>
                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('sections.roles.holder.description') }} />
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">{t('sections.roles.consumer.title')}</h3>
                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('sections.roles.consumer.description') }} />
              </div>
            </div>
          </section>

          {/* SECCIÓN 3: FUNCIONALIDADES */}
          <section id="features" className="space-y-6 mb-16">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {t('sections.features.title')} <Bot className="h-6 w-6 text-purple-500"/>
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">{t('sections.features.marketplace.title')}</h3>
                <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: t('sections.features.marketplace.description') }} />
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  {(Array.isArray(t('sections.features.marketplace.items', { returnObjects: true })) 
                    ? t('sections.features.marketplace.items', { returnObjects: true }) as string[]
                    : []
                  ).map((item, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2">{t('sections.features.dealRoom.title')}</h3>
                <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: t('sections.features.dealRoom.description') }} />
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2">{t('sections.features.innovationLab.title')}</h3>
                <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: t('sections.features.innovationLab.description') }} />
                <div className="flex gap-2">
                  {(Array.isArray(t('sections.features.innovationLab.items', { returnObjects: true }))
                    ? t('sections.features.innovationLab.items', { returnObjects: true }) as string[]
                    : []
                  ).map((item, idx) => (
                    <Badge key={idx} variant="secondary">{item}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 4: MONETIZACIÓN */}
          <section id="business" className="space-y-6 mb-16">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {t('sections.business.title')} <Coins className="h-6 w-6 text-yellow-500"/>
            </h2>
            <p className="leading-7">
              {t('sections.business.description')}
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Array.isArray(t('sections.business.models', { returnObjects: true }))
                ? t('sections.business.models', { returnObjects: true }) as string[]
                : []
              ).map((model, idx) => (
                <li key={idx} className="bg-muted/30 p-3 rounded" dangerouslySetInnerHTML={{ __html: model }} />
              ))}
            </ul>
          </section>

          {/* SECCIÓN 5: TECNOLOGÍA */}
          <section id="tech" className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold">{t('sections.tech.title')}</h2>
            <p className="leading-7">
              {t('sections.tech.description')}
            </p>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(t('sections.tech.stack', { returnObjects: true }))
                ? t('sections.tech.stack', { returnObjects: true }) as string[]
                : []
              ).map((tech, idx) => (
                <Badge key={idx}>{tech}</Badge>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('sections.tech.note') }} />
          </section>

          {/* SECCIÓN 6: WEB3 */}
          <section id="web3" className="space-y-6 mb-24">
            <h2 className="text-3xl font-bold">{t('sections.web3.title')}</h2>
            <Badge className="bg-primary/10 text-primary border-primary/20">{t('sections.web3.badge')}</Badge>
            <p className="leading-7" dangerouslySetInnerHTML={{ __html: t('sections.web3.description') }} />
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <Card className="p-4 bg-muted/30 border-dashed">
                <h4 className="font-semibold mb-2">{t('sections.web3.pontusX.title')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('sections.web3.pontusX.description')}
                </p>
              </Card>
              <Card className="p-4 bg-muted/30 border-dashed">
                <h4 className="font-semibold mb-2">{t('sections.web3.euroe.title')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('sections.web3.euroe.description')}
                </p>
              </Card>
              <Card className="p-4 bg-muted/30 border-dashed">
                <h4 className="font-semibold mb-2">{t('sections.web3.did.title')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('sections.web3.did.description')}
                </p>
              </Card>
            </div>
            <p className="mt-4 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('sections.web3.note') }} />
          </section>

        </div>
      </main>
    </div>
  );
}
