import { Link } from "react-router-dom";
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { HeroSection } from "@/components/partners/aerce/HeroSection";
import { ServicesSection } from "@/components/partners/aerce/ServicesSection";
import { AboutSection } from "@/components/partners/aerce/AboutSection";
import { CTASection } from "@/components/partners/aerce/CTASection";
import { 
  ProblemSection, 
  SolutionSection, 
  EcosystemSection, 
  CertificationSection, 
  SuccessCasesSection 
} from "@/components/partners/aerce/proyecto";
import { FundingFooter } from "@/components/FundingFooter";
import { GlobalNavigation } from "@/components/GlobalNavigation";

const AerceProyecto = () => {
  const handleDownloadPDF = () => {
    toast.info("Generando PDF del proyecto AERCE...");
    setTimeout(() => {
      toast.success("PDF generado correctamente");
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
                <span className="hidden sm:inline">Volver a Partners</span>
              </Link>
            </div>

            {/* Right: Action buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="default" size="sm" onClick={handleDownloadPDF} className="gap-2">
                <Download className="w-4 h-4" />
                Descargar PDF
              </Button>
              
              <div className="h-4 w-px bg-border" />
              
              <Button variant="secondary" size="sm" disabled className="gap-2">
                <FileText className="w-4 h-4" />
                Doc Proyecto
              </Button>
              
              <Button variant="outline" size="sm" asChild>
                <Link to="/partners/aerce/doc-institucional" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Doc Institucional
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
