import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Download, Scale, Menu, X, CheckCircle, AlertTriangle, Clock, BookOpen, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { cn } from '@/lib/utils';
import { FundingFooter } from '@/components/FundingFooter';

import docContent from '../../docs/RECOMENDACIONES_UNE_0087.md?raw';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export default function RecomendacionesUne() {
  const { t } = useTranslation('uneRecommendations');
  const [activeSection, setActiveSection] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tableOfContents = useMemo<TocItem[]>(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;
    while ((match = headingRegex.exec(docContent)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      if (level <= 3) {
        items.push({ id, title, level });
      }
    }
    return items;
  }, []);

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
    a.download = 'RECOMENDACIONES_UNE_0087_ProcureData.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      {/* UNE-style header band */}
      <div className="w-full" style={{ backgroundColor: 'hsl(210, 100%, 20%)' }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded flex items-center justify-center font-black text-white text-lg" style={{ backgroundColor: 'hsl(0, 72%, 51%)' }}>
                UNE
              </div>
              <div className="text-white">
                <div className="text-xs font-medium opacity-80">{t('badge')}</div>
                <div className="font-bold text-lg tracking-tight">0087:2025</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block text-white text-right">
            <div className="text-sm font-medium opacity-90">{t('subtitle')}</div>
            <div className="text-xs opacity-70">{t('publisher')} · {t('date')}</div>
          </div>
        </div>
      </div>

      {/* Sticky navigation header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="procuredata-gradient font-bold text-lg">PROCUREDATA</span>
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4" style={{ color: 'hsl(210, 100%, 20%)' }} />
              <span className="font-bold hidden sm:inline text-sm">| {t('title')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload} className="hidden sm:flex">
              <Download className="h-4 w-4 mr-2" />
              {t('downloadMd')}
            </Button>
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link to="/une-0087">{t('viewStandard')}</Link>
            </Button>
            <LanguageSwitcher />
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
            "fixed lg:sticky top-[calc(3.5rem+3.5rem)] lg:top-14 left-0 z-40 h-[calc(100vh-7rem)] lg:h-[calc(100vh-3.5rem)] w-72 bg-background border-r transition-transform lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <ScrollArea className="h-full py-4">
            <div className="px-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: 'hsl(210, 100%, 20%)' }} />
                <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  {t('tableOfContents')}
                </h2>
              </div>
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
                    activeSection === item.id && "text-white font-medium",
                  )}
                  style={activeSection === item.id ? { backgroundColor: 'hsl(210, 100%, 20%)' } : undefined}
                >
                  <span className="line-clamp-2">{item.title}</span>
                </button>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <div className="container max-w-4xl mx-auto px-4 py-8 lg:px-8">
              {/* Compliance Banner */}
              <div className="mb-8 p-6 rounded-xl border-2" style={{ borderColor: 'hsl(210, 100%, 20%)', backgroundColor: 'hsl(210, 100%, 97%)' }}>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl text-white" style={{ backgroundColor: 'hsl(210, 100%, 20%)' }}>
                      {t('complianceBanner.percentage')}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{t('complianceBanner.title')}</h3>
                      <Progress value={90} className="w-48 h-2 mt-1" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 gap-1">
                    <CheckCircle className="h-3 w-3" /> {t('complianceBanner.compliant')}
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 gap-1">
                    <AlertTriangle className="h-3 w-3" /> {t('complianceBanner.partial')}
                  </Badge>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 gap-1">
                    <Clock className="h-3 w-3" /> {t('complianceBanner.pending')}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/libro-de-reglas"><BookOpen className="h-3 w-3 mr-1" />{t('complianceBanner.viewRulebook')}</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/glosario-une"><FileText className="h-3 w-3 mr-1" />{t('complianceBanner.viewGlossary')}</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/transparencia"><Eye className="h-3 w-3 mr-1" />{t('complianceBanner.viewTransparency')}</Link>
                  </Button>
                </div>
              </div>

              {/* Document metadata badge */}
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <Badge style={{ backgroundColor: 'hsl(210, 100%, 20%)', color: 'white' }}>
                  {t('badge')}
                </Badge>
                <Badge variant="outline">v1.0 · 2026</Badge>
                <Badge variant="secondary">{t('publisher')}</Badge>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-serif prose-headings:tracking-tight
                prose-h1:text-3xl prose-h1:border-b-2 prose-h1:pb-3 prose-h1:mb-6
                prose-h2:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:mb-4
                prose-h3:text-xl
                prose-table:border prose-table:border-border
                prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-border
                prose-td:p-3 prose-td:border prose-td:border-border
                prose-strong:font-bold
                prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic
              " style={{
                '--tw-prose-headings': 'hsl(210, 100%, 20%)',
              } as React.CSSProperties}>
                <MarkdownRenderer content={docContent} />
              </div>

              {/* Footer navigation */}
              <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between gap-4">
                <Button variant="outline" asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    {t('backToHome')}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/une-0087">
                    {t('viewStandard')}
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/auth">
                    {t('goToDemo')}
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
      <FundingFooter variant="light" showTransparency={false} />
    </div>
  );
}
