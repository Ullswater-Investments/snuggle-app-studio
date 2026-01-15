import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronUp, Menu, X, FileText, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { FundingFooter } from "@/components/FundingFooter";
import {
  DocHero,
  DocQuienesSomos,
  DocHistoria,
  DocMisionValores,
  DocGobernanza,
  DocFormacion,
  DocCertificacion,
  DocEventos,
  DocInternacional,
  DocSocios,
  DocCTA,
} from "@/components/partners/aerce/docinstitucional";

const sections = [
  { id: "hero", label: "Introducción" },
  { id: "quienes", label: "1. Quiénes Somos" },
  { id: "historia", label: "2. Historia" },
  { id: "mision", label: "3. Misión y Valores" },
  { id: "gobernanza", label: "4. Gobernanza" },
  { id: "formacion", label: "5. Formación" },
  { id: "certificacion", label: "6. Certificación" },
  { id: "eventos", label: "7. Eventos" },
  { id: "internacional", label: "8. Internacional" },
  { id: "socios", label: "9. Socios" },
  { id: "cta", label: "Próximos Pasos" },
];

const AerceDocInstitucional = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDownloadPDF = () => {
    toast.info("Generando PDF del documento institucional...");
    setTimeout(() => {
      toast.success("PDF generado correctamente");
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
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
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/partners" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver a Partners</span>
            </Link>
          </Button>
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="default" size="sm" onClick={handleDownloadPDF} className="gap-2">
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
            <div className="h-4 w-px bg-border" />
            <Button variant="outline" size="sm" asChild>
              <Link to="/partners/aerce/proyecto" className="gap-2">
                <FileText className="h-4 w-4" />
                Doc Proyecto
              </Link>
            </Button>
            <Button variant="secondary" size="sm" disabled className="gap-2">
              <FileText className="h-4 w-4" />
              Doc Institucional
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/partners/aerce/whitepaper" className="gap-2">
                <FileText className="h-4 w-4" />
                White Paper
              </Link>
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background border-b overflow-hidden">
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button onClick={() => scrollToSection(section.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === section.id ? "bg-blue-600/10 text-blue-600 font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        <aside className="hidden md:block w-64 shrink-0">
          <nav className="sticky top-20 p-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Contenido</p>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button onClick={() => scrollToSection(section.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === section.id ? "bg-blue-600/10 text-blue-600 font-medium border-l-2 border-blue-600" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <div id="hero"><DocHero /></div>
          <div id="quienes"><DocQuienesSomos /></div>
          <div id="historia"><DocHistoria /></div>
          <div id="mision"><DocMisionValores /></div>
          <div id="gobernanza"><DocGobernanza /></div>
          <div id="formacion"><DocFormacion /></div>
          <div id="certificacion"><DocCertificacion /></div>
          <div id="eventos"><DocEventos /></div>
          <div id="internacional"><DocInternacional /></div>
          <div id="socios"><DocSocios /></div>
          <div id="cta"><DocCTA /></div>
          <FundingFooter variant="light" showTransparency={false} />
        </main>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={scrollToTop} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AerceDocInstitucional;
