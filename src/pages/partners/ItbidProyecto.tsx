import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { toast } from "sonner";
import { generateItbidProyectoPDF } from "@/utils/generateItbidProyectoPDF";
import { HeroSection } from "@/components/partners/itbid/HeroSection";
import { CoreFeaturesSection } from "@/components/partners/itbid/CoreFeaturesSection";
import { AllianceSection } from "@/components/partners/itbid/AllianceSection";
import { PublicSummarySection } from "@/components/partners/itbid/PublicSummarySection";
import { CTASection } from "@/components/partners/itbid/CTASection";
import { GlobalNavigation } from "@/components/GlobalNavigation";
import { FundingFooter } from "@/components/FundingFooter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const ItbidProyecto = () => {
  const handleDownloadPDF = () => {
    toast.info("Generando PDF del proyecto...");
    setTimeout(() => {
      generateItbidProyectoPDF();
      toast.success("PDF generado correctamente");
    }, 100);
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
            <Button variant="default" size="sm" onClick={handleDownloadPDF} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
            <div className="h-4 w-px bg-border" />
            <Button variant="secondary" size="sm" disabled className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Doc Proyecto
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/partners/itbid/doc-tecnico" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Doc Técnico
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/partners/itbid/whitepaper" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                White Paper
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
        <CoreFeaturesSection />
        <AllianceSection />
        <PublicSummarySection />
        <CTASection />
      </div>
      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
};

export default ItbidProyecto;
