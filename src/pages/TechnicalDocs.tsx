import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Home, Download, FileText, Menu, X, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { generateTechnicalDocPDF } from '@/utils/generateTechnicalDocPDF';
import docContent from '../../docs/DOCUMENTO_TECNICO.md?raw';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export default function TechnicalDocs() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Parse table of contents from markdown headings
  const tableOfContents = useMemo<TocItem[]>(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(docContent)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      
      // Only include h1, h2, and h3
      if (level <= 3) {
        items.push({ id, title, level });
      }
    }

    return items;
  }, []);

  // Scroll spy effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    );

    // Observe all heading elements
    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  const handleDownload = () => {
    const blob = new Blob([docContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DOCUMENTO_TECNICO_PROCUREDATA_v3.1.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    toast.info("Generando PDF optimizado para impresión...");
    setTimeout(() => {
      generateTechnicalDocPDF();
      toast.success("PDF generado correctamente");
    }, 100);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="procuredata-gradient font-bold text-xl">PROCUREDATA</span>
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-bold hidden sm:inline">| DOCUMENTO TÉCNICO</span>
              <Badge variant="secondary" className="hidden sm:inline-flex">v3.1</Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="default" size="sm" onClick={handleDownloadPDF} className="hidden sm:flex">
              <FileDown className="h-4 w-4 mr-2" />
              Descargar PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="hidden sm:flex">
              <Download className="h-4 w-4 mr-2" />
              Descargar MD
            </Button>
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link to="/auth">Ir al Demo</Link>
            </Button>
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Table of Contents */}
        <aside 
          className={cn(
            "fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-background border-r transition-transform lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <ScrollArea className="h-full py-4">
            <div className="px-4 mb-4">
              <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Índice de Contenidos
              </h2>
            </div>
            <nav className="px-2 space-y-0.5">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-muted",
                    item.level === 1 && "font-semibold",
                    item.level === 2 && "pl-5 text-muted-foreground",
                    item.level === 3 && "pl-8 text-muted-foreground text-xs",
                    activeSection === item.id && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  <span className="line-clamp-2">{item.title}</span>
                </button>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="container max-w-4xl mx-auto px-4 py-8 lg:px-8">
              <MarkdownRenderer content={docContent} />
              
              {/* Footer navigation */}
              <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" asChild>
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Volver al Inicio
                </Link>
              </Button>
                <Button asChild>
                  <Link to="/auth">
                    Probar Demo Interactiva
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
