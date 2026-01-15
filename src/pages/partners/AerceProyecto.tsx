import { Link } from "react-router-dom";
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/partners/aerce/HeroSection";
import { ServicesSection } from "@/components/partners/aerce/ServicesSection";
import { AboutSection } from "@/components/partners/aerce/AboutSection";
import { CTASection } from "@/components/partners/aerce/CTASection";
import { FundingFooter } from "@/components/FundingFooter";

const AerceProyecto = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back button */}
            <Link 
              to="/partners" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Volver a Partners</span>
            </Link>

            {/* Right: Action buttons */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                <Download className="w-4 h-4" />
                Descargar PDF
              </Button>
              
              <a 
                href="https://www.aerce.org" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Web Oficial</span>
                </Button>
              </a>
              
              <Link to="/partners/aerce/login">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Acceso Miembros</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <CTASection />
      </main>

      {/* Footer */}
      <FundingFooter />
    </div>
  );
};

export default AerceProyecto;
