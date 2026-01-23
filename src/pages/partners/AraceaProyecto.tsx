import { Link } from "react-router-dom";
import { ArrowLeft, Download, FileText, ExternalLink, Leaf, Scale, Shield, Factory, Users, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FundingFooter } from "@/components/FundingFooter";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const AraceaProyecto = () => {
  const { t } = useTranslation('aracea');

  const handleDownloadPDF = () => {
    toast.info(t('nav.generatingPDF', 'Generando PDF...'));
    setTimeout(() => {
      toast.success(t('nav.pdfReady', 'PDF generado correctamente'));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back button */}
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

            {/* Right: Action buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="default" size="sm" onClick={handleDownloadPDF} className="gap-2">
                <Download className="w-4 h-4" />
                {t('nav.downloadPDF', 'Descargar PDF')}
              </Button>
              
              <div className="h-4 w-px bg-border" />
              
              <Button variant="secondary" size="sm" asChild>
                <Link to="/partners/aracea" className="gap-2">
                  <FileText className="w-4 h-4" />
                  {t('cta.buttons.join')}
                </Link>
              </Button>

              <div className="h-4 w-px bg-border" />
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            {/* Mobile: External link */}
            <div className="flex sm:hidden items-center gap-2">
              <a 
                href="https://www.oficemen.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              
              <Link to="/partners/aracea">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <FileText className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-emerald-950/30 dark:via-background dark:to-green-950/30 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
              <Leaf className="w-3 h-3 mr-1" />
              {t('hero.badges.cement')}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              {t('hero.subtitle')}
            </p>
            
            <p className="text-muted-foreground mb-8">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link to="/partners/aracea">
                  <Shield className="w-5 h-5 mr-2" />
                  {t('cta.buttons.join')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://www.oficemen.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {t('cta.buttons.info')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is ARACEA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('whatIs.badge')}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <Factory className="w-5 h-5" />
                    {t('whatIs.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('whatIs.description')}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <Leaf className="w-5 h-5" />
                    {t('whatIs.features.traceability.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('whatIs.features.traceability.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* For What */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('forWhat.badge')}</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    <Scale className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">{t('forWhat.cases.cbam.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {t('forWhat.cases.cbam.description')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <ClipboardCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{t('forWhat.cases.circular.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {t('forWhat.cases.circular.description')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg">{t('forWhat.cases.supplier.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {t('forWhat.cases.supplier.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who Uses It */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('whoUses.badge')}</h2>
            
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                    <Users className="w-12 h-12 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{t('whoUses.title')}</h3>
                    <p className="text-muted-foreground">{t('whoUses.description')}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="secondary">{t('whoUses.actors.producers.title')}</Badge>
                      <Badge variant="secondary">{t('whoUses.actors.suppliers.title')}</Badge>
                      <Badge variant="secondary">{t('whoUses.actors.logistics.title')}</Badge>
                      <Badge variant="secondary">{t('whoUses.actors.construction.title')}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">{t('cta.description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/partners/aracea">
                <Shield className="w-5 h-5 mr-2" />
                {t('cta.buttons.join')}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <a href="mailto:info@oficemen.com">
                {t('cta.buttons.info')}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
};

export default AraceaProyecto;
