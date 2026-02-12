import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Download, 
  FileText, 
  FolderArchive, 
  Play, 
  CheckCircle2,
  Loader2,
  Eye,
  Film,
  FileCode,
  Package,
  ChevronRight,
  Camera,
  Video
} from 'lucide-react';
import { 
  allExportableCases, 
  getCasesBySuperCategory, 
  superCategoryOrder,
  exportStats 
} from '@/data/successCasesExportData';
import { 
  generateInVideoExportPackage, 
  previewCaseText, 
  previewCaseScript,
  previewMasterScript,
  downloadGreenProcurementGuide,
  downloadShortsGuide,
  downloadNovoNordiskScript
} from '@/services/InVideoExportService';
import { GreenProcurementScreenshotCapture } from '@/components/admin/GreenProcurementScreenshotCapture';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ExportSuccessCasesPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadingGP, setIsDownloadingGP] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'texto' | 'guion' | 'master'>('master');
  const [isComplete, setIsComplete] = useState(false);
  const [isGPComplete, setIsGPComplete] = useState(false);
  const [isShortsComplete, setIsShortsComplete] = useState(false);
  const [isDownloadingShorts, setIsDownloadingShorts] = useState(false);
  const [isDownloadingNovoScript, setIsDownloadingNovoScript] = useState(false);
  const [isNovoScriptComplete, setIsNovoScriptComplete] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<'docs' | 'screenshots'>('docs');
  
  const casesByCategory = useMemo(() => getCasesBySuperCategory(), []);
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    setIsComplete(false);
    
    try {
      await generateInVideoExportPackage((prog, msg) => {
        setProgress(prog);
        setProgressMessage(msg);
      });
      setIsComplete(true);
    } catch (error) {
      console.error('Error generating package:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownloadGP = async () => {
    setIsDownloadingGP(true);
    setIsGPComplete(false);
    
    try {
      await downloadGreenProcurementGuide();
      setIsGPComplete(true);
    } catch (error) {
      console.error('Error downloading GP guide:', error);
    } finally {
      setIsDownloadingGP(false);
    }
  };
  
  const handleDownloadShorts = async () => {
    setIsDownloadingShorts(true);
    setIsShortsComplete(false);
    
    try {
      await downloadShortsGuide();
      setIsShortsComplete(true);
    } catch (error) {
      console.error('Error downloading Shorts guide:', error);
    } finally {
      setIsDownloadingShorts(false);
    }
  };
  
  const handleDownloadNovoScript = async () => {
    setIsDownloadingNovoScript(true);
    setIsNovoScriptComplete(false);
    
    try {
      await downloadNovoNordiskScript();
      setIsNovoScriptComplete(true);
    } catch (error) {
      console.error('Error downloading Novo Nordisk script:', error);
    } finally {
      setIsDownloadingNovoScript(false);
    }
  };
  
  const previewContent = useMemo(() => {
    if (previewTab === 'master') {
      return previewMasterScript();
    }
    if (!selectedCase) return null;
    
    if (previewTab === 'texto') {
      return previewCaseText(selectedCase);
    }
    return previewCaseScript(selectedCase);
  }, [selectedCase, previewTab]);
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Exportación para InVideo AI</h1>
            <p className="text-muted-foreground mt-2">
              Genera paquetes de documentación y screenshots para producción de videos
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Novo Nordisk Script Button */}
            <Button 
              variant="outline"
              size="lg" 
              onClick={handleDownloadNovoScript}
              disabled={isDownloadingNovoScript}
              className="gap-2 border-cyan-500/50 text-cyan-600 hover:bg-cyan-500/10"
            >
              {isDownloadingNovoScript ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Descargando...
                </>
              ) : isNovoScriptComplete ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  ¡Script GP01!
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  Script GP01 Novo (MD)
                </>
              )}
            </Button>
            
            {/* Shorts Guide Button */}
            <Button 
              variant="outline"
              size="lg" 
              onClick={handleDownloadShorts}
              disabled={isDownloadingShorts}
              className="gap-2 border-pink-500/50 text-pink-600 hover:bg-pink-500/10"
            >
              {isDownloadingShorts ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Descargando...
                </>
              ) : isShortsComplete ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  ¡Shorts Descargados!
                </>
              ) : (
                <>
                  <Video className="h-5 w-5" />
                  Reels/TikTok/Shorts (MD)
                </>
              )}
            </Button>
            
            {/* Green Procurement Guide Button */}
            <Button 
              variant="outline"
              size="lg" 
              onClick={handleDownloadGP}
              disabled={isDownloadingGP}
              className="gap-2 border-emerald-500/50 text-emerald-600 hover:bg-emerald-500/10"
            >
              {isDownloadingGP ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Descargando...
                </>
              ) : isGPComplete ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  ¡Guía GP Descargada!
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  Guía Green Procurement (MD)
                </>
              )}
            </Button>
            
            {/* Full ZIP Button */}
            <Button 
              size="lg" 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generando...
                </>
              ) : isComplete ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  ¡Descargado!
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  Generar Paquete ZIP
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Progress */}
        {isGenerating && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{progressMessage}</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Main Tabs */}
        <Tabs value={activeMainTab} onValueChange={(v) => setActiveMainTab(v as 'docs' | 'screenshots')}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="docs" className="gap-2">
              <FileCode className="h-4 w-4" />
              Documentación
            </TabsTrigger>
            <TabsTrigger value="screenshots" className="gap-2">
              <Camera className="h-4 w-4" />
              Screenshots GP
            </TabsTrigger>
          </TabsList>
          
          {/* Documentation Tab */}
          <TabsContent value="docs" className="space-y-6 mt-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{exportStats.totalCases}</p>
                      <p className="text-sm text-muted-foreground">Casos Totales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Film className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{exportStats.standardCases}</p>
                      <p className="text-sm text-muted-foreground">Casos Estándar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-emerald-500" />
                    <div>
                      <p className="text-2xl font-bold">{exportStats.greenProcurementCases}</p>
                      <p className="text-sm text-muted-foreground">Green Procurement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <FolderArchive className="h-8 w-8 text-amber-500" />
                    <div>
                      <p className="text-2xl font-bold">{exportStats.superCategories}</p>
                      <p className="text-sm text-muted-foreground">Categorías</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Case List */}
              <Card className="lg:row-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCode className="h-5 w-5" />
                    Casos de Éxito por Categoría
                  </CardTitle>
                  <CardDescription>
                    Selecciona un caso para previsualizar su documentación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      {superCategoryOrder.map(category => {
                        const cases = casesByCategory[category] || [];
                        if (cases.length === 0) return null;
                        
                        return (
                          <div key={category}>
                            <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                              {category}
                              <Badge variant="secondary" className="text-xs">
                                {cases.length}
                              </Badge>
                            </h3>
                            <div className="space-y-1">
                              {cases.map(c => (
                                <button
                                  key={c.id}
                                  onClick={() => {
                                    setSelectedCase(c.id);
                                    if (previewTab === 'master') setPreviewTab('texto');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group ${
                                    selectedCase === c.id 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'hover:bg-muted'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-xs opacity-60 font-mono w-6">
                                      {String(c.index).padStart(2, '0')}
                                    </span>
                                    <span className="truncate">{c.company}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      variant={selectedCase === c.id ? "secondary" : "outline"} 
                                      className="text-xs shrink-0"
                                    >
                                      {c.metric}
                                    </Badge>
                                    <ChevronRight className={`h-4 w-4 transition-transform ${
                                      selectedCase === c.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                                    }`} />
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Vista Previa del Contenido
                  </CardTitle>
                  <CardDescription>
                    {selectedCase 
                      ? `Previsualización: ${allExportableCases.find(c => c.id === selectedCase)?.company}`
                      : 'Guión maestro o selecciona un caso'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={previewTab} onValueChange={(v) => setPreviewTab(v as typeof previewTab)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="master">Guión Maestro</TabsTrigger>
                      <TabsTrigger value="texto" disabled={!selectedCase}>Texto.md</TabsTrigger>
                      <TabsTrigger value="guion" disabled={!selectedCase}>Guión.md</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value={previewTab} className="mt-4">
                      <ScrollArea className="h-[400px] rounded-lg border bg-muted/30 p-4">
                        {previewContent ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {previewContent}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p>Selecciona un caso para ver la vista previa</p>
                          </div>
                        )}
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Export Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderArchive className="h-5 w-5" />
                    Estructura del Paquete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto">
{`/procuredata-invideo-export/
├── README.md
├── guion-completo.md
├── casos/
│   ├── 01-gigafactory-north/
│   │   ├── texto.md
│   │   └── guion.md
│   ├── 02-olivetrust-coop/
│   │   └── ...
│   └── ... (${exportStats.standardCases} casos)
└── green-procurement/
    ├── 01-novo-nordisk/
    │   └── ...
    └── ... (${exportStats.greenProcurementCases} casos)`}
                  </pre>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Play className="h-4 w-4" />
                    <span>Compatible con InVideo AI, Descript, y editores de video profesionales</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Screenshots Tab */}
          <TabsContent value="screenshots" className="mt-6">
            <GreenProcurementScreenshotCapture />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
