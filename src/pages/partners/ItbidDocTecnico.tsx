import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, ChevronUp, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DocTecnicoHero,
  DocResumenEjecutivo,
  DocPropiedadDatos,
  DocGobernanza,
  DocActualizacion,
  DocParticipantes,
  DocResponsabilidadLegal,
  DocModeloNegocio,
  DocRequisitosTecnicos,
  DocHojaDeRuta,
  DocTiposInformacion,
  DocDiferenciacion,
  DocCTA,
} from "@/components/partners/itbid/doctecnico";

const sections = [
  { id: "hero", label: "Introducción" },
  { id: "resumen", label: "1. Resumen Ejecutivo" },
  { id: "propiedad", label: "2. Propiedad de Datos" },
  { id: "gobernanza", label: "3. Gobernanza ODRL" },
  { id: "actualizacion", label: "4. Actualización" },
  { id: "participantes", label: "5. Participantes" },
  { id: "legal", label: "6. Responsabilidad Legal" },
  { id: "negocio", label: "7. Modelo de Negocio" },
  { id: "tecnico", label: "8. Requisitos Técnicos" },
  { id: "hojaderuta", label: "9. Hoja de Ruta" },
  { id: "informacion", label: "10. Tipos de Información" },
  { id: "diferenciacion", label: "11. Diferenciación" },
  { id: "cta", label: "Próximos Pasos" },
];

const ItbidDocTecnico = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button
      setShowScrollTop(window.scrollY > 500);

      // Update active section based on scroll position
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
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Inicio</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/partners/itbid/proyecto" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Proyecto ITBID</span>
              </Link>
            </Button>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span>Doc Técnico ITBID-X</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav className="sticky top-20 p-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
              Contenido
            </p>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-[hsl(var(--itbid-cyan)/0.1)] text-[hsl(var(--itbid-cyan))] font-medium border-l-2 border-[hsl(var(--itbid-cyan))]"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Sections */}
        <main className="flex-1 min-w-0">
          <div id="hero">
            <DocTecnicoHero />
          </div>
          <div id="resumen">
            <DocResumenEjecutivo />
          </div>
          <div id="propiedad">
            <DocPropiedadDatos />
          </div>
          <div id="gobernanza">
            <DocGobernanza />
          </div>
          <div id="actualizacion">
            <DocActualizacion />
          </div>
          <div id="participantes">
            <DocParticipantes />
          </div>
          <div id="legal">
            <DocResponsabilidadLegal />
          </div>
          <div id="negocio">
            <DocModeloNegocio />
          </div>
          <div id="tecnico">
            <DocRequisitosTecnicos />
          </div>
          <div id="hojaderuta">
            <DocHojaDeRuta />
          </div>
          <div id="informacion">
            <DocTiposInformacion />
          </div>
          <div id="diferenciacion">
            <DocDiferenciacion />
          </div>
          <div id="cta">
            <DocCTA />
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
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[hsl(var(--itbid-cyan))] text-white shadow-lg hover:bg-[hsl(var(--itbid-cyan)/0.9)] transition-colors flex items-center justify-center"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItbidDocTecnico;
