import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPremiumPartnerById } from "@/data/premiumPartnersData";
import {
  PremiumPartnerHero,
  EcosystemSection,
  MarketIntelligenceSection,
  DataProductCatalog,
  PremiumPartnerCTA
} from "@/components/partners/premium";

const PremiumPartnerPage = () => {
  const { partnerId } = useParams<{ partnerId: string }>();
  
  const partner = partnerId ? getPremiumPartnerById(partnerId) : undefined;
  
  if (!partner) {
    return <Navigate to="/partners" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" size="sm">
              <Link to="/partners" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver a Partners
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{partner.country.flag}</span>
              <span className="hidden sm:inline">{partner.name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <PremiumPartnerHero partner={partner} />
        <EcosystemSection 
          ecosystem={partner.ecosystem} 
          partnerName={partner.name} 
        />
        <MarketIntelligenceSection 
          dataAnalysis={partner.dataAnalysis} 
          partnerName={partner.name} 
        />
        <DataProductCatalog 
          useCases={partner.useCases} 
          partnerId={partner.id} 
        />
        <PremiumPartnerCTA partner={partner} />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            {partner.name} es un Premium Partner de ProcureData. 
            Todos los datos son agregados y anonimizados según estándares GAIA-X.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PremiumPartnerPage;
