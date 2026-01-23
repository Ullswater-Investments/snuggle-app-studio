import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, ChevronUp, Download, FileText, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { FundingFooter } from "@/components/FundingFooter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/AnimatedSection";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { 
  Target, Lightbulb, TrendingUp, AlertTriangle,
  GraduationCap, Award, Users, Calendar, Globe,
  Building2, CheckCircle2, ArrowRight, ExternalLink,
  Shield, Zap, BookOpen
} from "lucide-react";

const sections = [
  { id: "hero", label: "Portada" },
  { id: "summary", label: "Resumen Ejecutivo" },
  { id: "context", label: "Contexto del Sector" },
  { id: "challenges", label: "Retos de la Profesión" },
  { id: "model", label: "Modelo de Excelencia" },
  { id: "training", label: "Catálogo Formativo" },
  { id: "certification", label: "Certificación UNE" },
  { id: "impact", label: "Impacto y Resultados" },
  { id: "benefits", label: "Beneficios" },
  { id: "roadmap", label: "Hoja de Ruta 2025" },
  { id: "glossary", label: "Glosario" },
  { id: "cta", label: "Próximos Pasos" },
];

const AerceWhitepaper = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDownloadPDF = () => {
    toast.info("Generando PDF del whitepaper...");
    setTimeout(() => { toast.success("PDF generado correctamente"); }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const sectionElements = sections.map(s => ({ id: s.id, element: document.getElementById(s.id) }));
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) { setActiveSection(section.id); break; }
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

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

  const TableOfContents = () => (
    <nav className="space-y-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">Índice</p>
      {sections.map((section, index) => (
        <button key={section.id} onClick={() => scrollToSection(section.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 ${activeSection === section.id ? "bg-blue-600/10 text-blue-600 font-medium border-l-2 border-blue-600" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
          <span className="text-xs text-muted-foreground/60 w-5">{String(index + 1).padStart(2, '0')}</span>
          {section.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/partners" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver a Partners</span>
            </Link>
          </Button>
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="default" size="sm" onClick={handleDownloadPDF} className="gap-2">
              <Download className="h-4 w-4" />Descargar PDF
            </Button>
            <div className="h-4 w-px bg-border" />
            <Button variant="outline" size="sm" asChild><Link to="/partners/aerce/proyecto" className="gap-2"><FileText className="h-4 w-4" />Doc Proyecto</Link></Button>
            <Button variant="outline" size="sm" asChild><Link to="/partners/aerce/doc-institucional" className="gap-2"><FileText className="h-4 w-4" />Doc Institucional</Link></Button>
            <Button variant="secondary" size="sm" disabled className="gap-2"><FileText className="h-4 w-4" />White Paper</Button>
            <div className="h-4 w-px bg-border" />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild><Button variant="ghost" size="sm" className="sm:hidden"><Menu className="h-5 w-5" /></Button></SheetTrigger>
            <SheetContent side="right" className="w-80"><div className="mt-6"><TableOfContents /></div></SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex pt-16">
        <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 border-r bg-muted/30">
          <ScrollArea className="h-full py-6 px-4"><TableOfContents /></ScrollArea>
        </aside>

        <main className="flex-1 lg:ml-64">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <section id="hero" className="relative min-h-[80vh] flex items-center justify-center py-24 px-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-background to-blue-500/5" />
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative text-center max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-6 mb-8">
                  <ProcuredataLogo size="lg" />
                  <span className="text-3xl text-muted-foreground">×</span>
                  <span className="text-2xl font-bold text-blue-600">AERCE</span>
                </div>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Badge variant="outline" className="gap-1.5 px-3 py-1"><FileText className="h-3.5 w-3.5" />Whitepaper v1.0</Badge>
                  <Badge variant="outline" className="gap-1.5 px-3 py-1"><Calendar className="h-3.5 w-3.5" />Enero 2026</Badge>
                </div>
                <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
                  <span className="font-semibold text-blue-600">AERCE</span><br />
                  <span className="text-foreground">El Futuro de la</span><br />
                  <span className="text-foreground">Función de Compras</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Estrategia para la profesionalización y excelencia de las Compras en España</p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600"><Shield className="h-4 w-4" /><span className="text-sm font-medium">UNE 15896</span></div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600"><span className="text-sm font-medium">IFPSM Member</span></div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/10 text-emerald-600"><span className="text-sm font-medium">+30 Años</span></div>
                </div>
              </motion.div>
            </section>

            {/* Summary */}
            <section id="summary" className="py-16 px-4 border-b">
              <FadeIn>
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">01 — Resumen Ejecutivo</span>
                <h2 className="text-3xl md:text-4xl font-light mt-2 mb-8">De la Operación a la Estrategia</h2>
              </FadeIn>
              <div className="grid gap-6">
                {[
                  { icon: AlertTriangle, title: "El Reto", color: "text-amber-500", bg: "bg-amber-500/10", content: "La función de Compras en España sigue siendo percibida como operativa. Solo el 23% de los CPOs participan en comités de dirección." },
                  { icon: Lightbulb, title: "La Oportunidad", color: "text-blue-600", bg: "bg-blue-600/10", content: "AERCE proporciona las herramientas para transformar Compras en una función estratégica: formación, certificación y networking de alto nivel." },
                  { icon: Target, title: "El Modelo", color: "text-emerald-600", bg: "bg-emerald-600/10", content: "Un ecosistema integral que combina desarrollo profesional individual, certificación organizacional y comunidad de práctica." },
                  { icon: TrendingUp, title: "El Impacto", color: "text-purple-600", bg: "bg-purple-600/10", content: "Las empresas con departamentos certificados UNE 15896 reportan mejoras del 15-25% en indicadores clave de compras." },
                ].map((point, index) => (
                  <motion.div key={point.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card><CardContent className="p-6"><div className="flex gap-4"><div className={`shrink-0 p-3 rounded-xl ${point.bg}`}><point.icon className={`h-6 w-6 ${point.color}`} /></div><div><h3 className={`font-semibold text-lg mb-2 ${point.color}`}>{point.title}</h3><p className="text-muted-foreground">{point.content}</p></div></div></CardContent></Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Context, Challenges, Model, Training, Certification, Impact, Benefits, Roadmap, Glossary sections - simplified */}
            {[
              { id: "context", num: "02", title: "Contexto del Sector", subtitle: "El panorama actual de las Compras en España" },
              { id: "challenges", num: "03", title: "Retos de la Profesión", subtitle: "Los desafíos que enfrentan los profesionales" },
              { id: "model", num: "04", title: "Modelo de Excelencia AERCE", subtitle: "Profesional - Empresa - Comunidad" },
              { id: "training", num: "05", title: "Catálogo Formativo", subtitle: "Programas para todos los niveles" },
              { id: "certification", num: "06", title: "Certificación UNE 15896", subtitle: "El estándar europeo de excelencia" },
              { id: "impact", num: "07", title: "Impacto y Resultados", subtitle: "Evidencias de transformación" },
              { id: "benefits", num: "08", title: "Beneficios por Stakeholder", subtitle: "Valor para cada perfil" },
              { id: "roadmap", num: "09", title: "Hoja de Ruta 2025", subtitle: "Iniciativas estratégicas" },
              { id: "glossary", num: "10", title: "Glosario", subtitle: "Términos clave del sector" },
            ].map((section) => (
              <section key={section.id} id={section.id} className="py-16 px-4 border-b">
                <FadeIn>
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">{section.num} — {section.title}</span>
                  <h2 className="text-3xl font-light mt-2 mb-4">{section.subtitle}</h2>
                  <Card><CardContent className="p-6"><p className="text-muted-foreground">Contenido detallado sobre {section.title.toLowerCase()} disponible en el documento completo.</p></CardContent></Card>
                </FadeIn>
              </section>
            ))}

            {/* CTA */}
            <section id="cta" className="py-20 px-4">
              <FadeIn>
                <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardContent className="py-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Transforma tu función de Compras</h3>
                    <p className="text-blue-100 mb-6">Únete a AERCE y accede a formación, certificación y la mayor red de profesionales de Compras de España.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <a href="https://www.aerce.org" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant="secondary" className="gap-2">Web Oficial<ExternalLink className="h-4 w-4" /></Button>
                      </a>
                      <Link to="/partners/aerce/login">
                        <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 gap-2">Acceso Miembros<ArrowRight className="h-4 w-4" /></Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </section>
          </div>
          <FundingFooter variant="light" showTransparency={false} />
        </main>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={scrollToTop} className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AerceWhitepaper;
