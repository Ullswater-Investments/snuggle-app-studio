import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, ChevronUp, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Whitepaper Sections
import { WhitepaperHero } from "@/components/partners/itbid/whitepaper/WhitepaperHero";
import { ExecutiveSummary } from "@/components/partners/itbid/whitepaper/ExecutiveSummary";
import { GaiaXContext } from "@/components/partners/itbid/whitepaper/GaiaXContext";
import { ArchitectureDiagram } from "@/components/partners/itbid/whitepaper/ArchitectureDiagram";
import { TripartiteModel } from "@/components/partners/itbid/whitepaper/TripartiteModel";
import { DataSovereignty } from "@/components/partners/itbid/whitepaper/DataSovereignty";
import { SecurityFramework } from "@/components/partners/itbid/whitepaper/SecurityFramework";
import { FederatedFlowSteps } from "@/components/partners/itbid/whitepaper/FederatedFlowSteps";
import { UseCasesWhitepaper } from "@/components/partners/itbid/whitepaper/UseCasesWhitepaper";
import { StakeholderBenefits } from "@/components/partners/itbid/whitepaper/StakeholderBenefits";
import { TechnicalSpecs } from "@/components/partners/itbid/whitepaper/TechnicalSpecs";
import { Glossary } from "@/components/partners/itbid/whitepaper/Glossary";
import { WhitepaperCTA } from "@/components/partners/itbid/whitepaper/WhitepaperCTA";

const sections = [
  { id: "hero", label: "Portada" },
  { id: "summary", label: "Resumen Ejecutivo" },
  { id: "gaiax", label: "¿Qué es Gaia-X?" },
  { id: "architecture", label: "Arquitectura ITBID-X" },
  { id: "tripartite", label: "Modelo Tripartito" },
  { id: "sovereignty", label: "Soberanía del Dato" },
  { id: "security", label: "Seguridad y Trust" },
  { id: "flow", label: "Flujo Federado" },
  { id: "use-cases", label: "Casos de Uso" },
  { id: "benefits", label: "Beneficios" },
  { id: "specs", label: "Especificaciones" },
  { id: "glossary", label: "Glosario" },
  { id: "cta", label: "Próximos Pasos" },
];

const ItbidWhitepaper = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Determine active section based on scroll position
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const TableOfContents = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className={isMobile ? "space-y-1" : "space-y-1"}>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
        Índice
      </p>
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 ${
            activeSection === section.id
              ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <span className="text-xs text-muted-foreground/60 w-5">{String(index + 1).padStart(2, '0')}</span>
          {section.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/partners/itbid/proyecto">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <h1 className="text-sm font-semibold hidden sm:block">
              <span className="itbid-gradient">ITBID-X</span> Whitepaper Técnico
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Descargar PDF</span>
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="mt-6">
                  <TableOfContents isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Fixed Sidebar - Desktop */}
        <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 border-r bg-muted/30">
          <ScrollArea className="h-full py-6 px-4">
            <TableOfContents />
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="max-w-4xl mx-auto">
            <section id="hero">
              <WhitepaperHero />
            </section>
            
            <section id="summary">
              <ExecutiveSummary />
            </section>
            
            <section id="gaiax">
              <GaiaXContext />
            </section>
            
            <section id="architecture">
              <ArchitectureDiagram />
            </section>
            
            <section id="tripartite">
              <TripartiteModel />
            </section>
            
            <section id="sovereignty">
              <DataSovereignty />
            </section>
            
            <section id="security">
              <SecurityFramework />
            </section>
            
            <section id="flow">
              <FederatedFlowSteps />
            </section>
            
            <section id="use-cases">
              <UseCasesWhitepaper />
            </section>
            
            <section id="benefits">
              <StakeholderBenefits />
            </section>
            
            <section id="specs">
              <TechnicalSpecs />
            </section>
            
            <section id="glossary">
              <Glossary />
            </section>
            
            <section id="cta">
              <WhitepaperCTA />
            </section>
          </div>
        </main>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItbidWhitepaper;
