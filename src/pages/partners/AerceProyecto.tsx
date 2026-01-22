import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HeroSection } from "@/components/partners/aerce/HeroSection";
import { AboutSection } from "@/components/partners/aerce/AboutSection";
import { ServicesSection } from "@/components/partners/aerce/ServicesSection";
import { CTASection } from "@/components/partners/aerce/CTASection";
import { ProblemSection } from "@/components/partners/aerce/proyecto/ProblemSection";
import { SolutionSection } from "@/components/partners/aerce/proyecto/SolutionSection";
import { EcosystemSection } from "@/components/partners/aerce/proyecto/EcosystemSection";
import { CertificationSection } from "@/components/partners/aerce/proyecto/CertificationSection";
import { SuccessCasesSection } from "@/components/partners/aerce/proyecto/SuccessCasesSection";
import { FundingFooter } from "@/components/FundingFooter";
import { GlobalNavigation } from "@/components/GlobalNavigation";

const AerceProyecto = () => {
  const { t } = useTranslation(['aerce', 'common']);

  const handleDownloadPDF = () => {
    toast.info(t('common:downloading'));
    setTimeout(() => {
      toast.success(t('common:downloadComplete'));
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
                {t('common:downloadPDF')}
              </Button>
              
              <div className="h-4 w-px bg-border" />
              
              <Button variant="secondary" size="sm" disabled className="gap-2">
                <FileText className="w-4 h-4" />
                Doc Proyecto
              </Button>
              
              <Button variant="outline" size="sm" asChild>
                <Link to="/partners/aerce/doc-tecnico" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Doc Técnico
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild>
                <Link to="/partners/aerce/whitepaper" className="gap-2">
                  <FileText className="w-4 h-4" />
                  White Paper
                </Link>
              </Button>
            </div>

            {/* Mobile: External link */}
            <div className="flex sm:hidden items-center gap-2">
              <a 
                href="https://www.aerce.org" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              
              <Link to="/partners/aerce/login">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <FileText className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="space-y-0">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <EcosystemSection />
        <ServicesSection />
        <CertificationSection />
        <SuccessCasesSection />
        <AboutSection />
        <CTASection />
      </main>

      {/* Footer */}
      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
};

export default AerceProyecto;
