import { useState } from 'react';
import { HeroSection } from '@/components/premium-partners/HeroSection';
import { ComparisonSlider } from '@/components/premium-partners/ComparisonSlider';
import { PartnerRoiCalculator } from '@/components/premium-partners/PartnerRoiCalculator';
import { GovernanceVisualizer } from '@/components/premium-partners/GovernanceVisualizer';
import { TechStackBento } from '@/components/premium-partners/TechStackBento';
import { OnboardingTimeline } from '@/components/premium-partners/OnboardingTimeline';
import { AdhesionForm } from '@/components/premium-partners/AdhesionForm';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePartnerProgramPDF } from '@/utils/generatePartnerProgramPDF';
import { useTranslation } from 'react-i18next';

const PremiumPartners = () => {
  const { t } = useTranslation('premiumPartners');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Small delay for UX feedback
      await new Promise(resolve => setTimeout(resolve, 300));
      generatePartnerProgramPDF();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/partners" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('navbar.back')}</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#simulator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('navbar.simulator')}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('navbar.governance')}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('navbar.techStack')}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('navbar.roadmap')}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              variant="outline"
              size="sm"
              className="border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isGeneratingPDF ? t('navbar.generating') : t('navbar.downloadPDF')}
            </Button>
            
            <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              {t('navbar.badge')}
            </Badge>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <HeroSection />
      <ComparisonSlider />
      <PartnerRoiCalculator />
      <GovernanceVisualizer />
      <TechStackBento />
      <OnboardingTimeline />
      <AdhesionForm />

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-foreground font-semibold">PROCUREDATA</p>
                <p className="text-muted-foreground text-sm">{t('footer.subtitle')}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/docs/partners" className="hover:text-foreground transition-colors">
                {t('footer.documentation')}
              </Link>
              <Link to="/partners" className="hover:text-foreground transition-colors">
                {t('footer.ecosystem')}
              </Link>
              <a href="mailto:partners@procuredata.eu" className="hover:text-foreground transition-colors">
                {t('footer.contact')}
              </a>
            </div>

            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              🏆 {t('footer.partners')}
            </Badge>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} ProcureData. {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumPartners;