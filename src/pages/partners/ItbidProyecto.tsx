import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { HeroSection } from "@/components/partners/itbid/HeroSection";
import { ProblemSection } from "@/components/partners/itbid/ProblemSection";
import { SolutionSection } from "@/components/partners/itbid/SolutionSection";
import { ArchitectureSection } from "@/components/partners/itbid/ArchitectureSection";
import { UseCasesSection } from "@/components/partners/itbid/UseCasesSection";
import { SuccessCasesSection } from "@/components/partners/itbid/SuccessCasesSection";
import { BenefitsSection } from "@/components/partners/itbid/BenefitsSection";
import { RoadmapSection } from "@/components/partners/itbid/RoadmapSection";
import { CTASection } from "@/components/partners/itbid/CTASection";

const ItbidProyecto = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Back Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/partners" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a Partners
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-0">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ArchitectureSection />
        <UseCasesSection />
        <SuccessCasesSection />
        <BenefitsSection />
        <RoadmapSection />
        <CTASection />
      </div>
    </div>
  );
};

export default ItbidProyecto;
