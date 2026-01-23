import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, BookOpen, FileSignature } from "lucide-react";
import { toast } from "sonner";
import { FundingFooter } from "@/components/FundingFooter";
import { HeroSection } from "@/components/partners/telenatura/HeroSection";
import { SolutionSection } from "@/components/partners/telenatura/SolutionSection";
import { DataSpaceSection } from "@/components/partners/telenatura/DataSpaceSection";
import { CTASection } from "@/components/partners/telenatura/CTASection";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const TeleNaturaProyecto = () => {
  const handleDownloadPDF = () => {
    toast.info("Generando PDF del proyecto...");
    setTimeout(() => {
      toast.success("PDF generado correctamente");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Back Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GlobalNavigation />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/partners" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a Partners
              </Link>
            </Button>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
            {/* Primary Download Button */}
            <Button 
              size="sm" 
              onClick={handleDownloadPDF} 
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
            
            {/* Document Navigation Buttons */}
            <Button variant="outline" size="sm" asChild>
              <Link to="/partners/telenatura-ebt/presentacion" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Presentación Corp.
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/partners/telenatura-ebt/catalogo" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Catálogo IoT
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/partners/telenatura-ebt/acuerdo" className="flex items-center gap-2">
                <FileSignature className="h-4 w-4" />
                Acuerdo Marco
              </Link>
            </Button>
            <div className="h-4 w-px bg-border" />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-0">
        <HeroSection />
        <SolutionSection />
        <DataSpaceSection />
        <CTASection />
      </div>
      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
};

export default TeleNaturaProyecto;
