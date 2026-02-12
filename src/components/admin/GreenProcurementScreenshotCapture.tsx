import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Camera, 
  Download, 
  Loader2, 
  CheckCircle2, 
  Image as ImageIcon,
  FolderArchive,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { 
  GPHeroScene, 
  GPChallengeScene, 
  GPStrategyScene, 
  GPMetricsScene, 
  GPProofScene 
} from './screenshot-scenes';
import {
  getGreenProcurementCasesForCapture,
  getScreenshotFileName,
  generateScreenshotPackage,
  captureElement,
  sceneTypes,
  type SceneType,
  type CapturedScreenshot
} from '@/services/GreenProcurementScreenshotService';

type CaptureState = 'idle' | 'capturing' | 'complete' | 'error';

export function GreenProcurementScreenshotCapture() {
  const [captureState, setCaptureState] = useState<CaptureState>('idle');
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [currentSceneType, setCurrentSceneType] = useState<SceneType>('HERO');
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [capturedScreenshots, setCapturedScreenshots] = useState<CapturedScreenshot[]>([]);
  const [selectedCases, setSelectedCases] = useState<Set<string>>(new Set());
  
  const captureContainerRef = useRef<HTMLDivElement>(null);
  const cases = getGreenProcurementCasesForCapture();
  
  // Initialize with all cases selected
  const initializeSelection = useCallback(() => {
    setSelectedCases(new Set(cases.map(c => c.id)));
  }, [cases]);
  
  // Toggle case selection
  const toggleCase = (caseId: string) => {
    const newSelection = new Set(selectedCases);
    if (newSelection.has(caseId)) {
      newSelection.delete(caseId);
    } else {
      newSelection.add(caseId);
    }
    setSelectedCases(newSelection);
  };
  
  // Select/deselect all
  const toggleAll = () => {
    if (selectedCases.size === cases.length) {
      setSelectedCases(new Set());
    } else {
      setSelectedCases(new Set(cases.map(c => c.id)));
    }
  };
  
  // Capture all screenshots
  const startCapture = async () => {
    if (selectedCases.size === 0) return;
    
    setCaptureState('capturing');
    setCapturedScreenshots([]);
    setProgress(0);
    
    const selectedCasesList = cases.filter(c => selectedCases.has(c.id));
    const totalScreenshots = selectedCasesList.length * sceneTypes.length;
    let capturedCount = 0;
    const screenshots: CapturedScreenshot[] = [];
    
    try {
      for (let caseIdx = 0; caseIdx < selectedCasesList.length; caseIdx++) {
        const caseData = selectedCasesList[caseIdx];
        setCurrentCaseIndex(caseIdx);
        
        for (const sceneType of sceneTypes) {
          setCurrentSceneType(sceneType);
          setProgressMessage(`Capturando ${caseData.company} - ${sceneType}...`);
          
          // Wait for render
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Capture the scene
          const container = captureContainerRef.current;
          if (container) {
            const sceneElement = container.querySelector(`[data-scene="${sceneType}"]`) as HTMLElement;
            if (sceneElement) {
              const dataUrl = await captureElement(sceneElement);
              
              screenshots.push({
                caseId: caseData.id,
                company: caseData.company,
                sceneType,
                fileName: getScreenshotFileName(caseData.id, sceneType),
                folderName: caseData.folderName,
                dataUrl
              });
            }
          }
          
          capturedCount++;
          setProgress(Math.round((capturedCount / totalScreenshots) * 100));
        }
      }
      
      setCapturedScreenshots(screenshots);
      setCaptureState('complete');
      setProgressMessage(`¡${screenshots.length} screenshots capturados!`);
    } catch (error) {
      console.error('Error capturing screenshots:', error);
      setCaptureState('error');
      setProgressMessage('Error durante la captura');
    }
  };
  
  // Download package
  const downloadPackage = async () => {
    if (capturedScreenshots.length === 0) return;
    
    setProgressMessage('Generando paquete ZIP...');
    
    await generateScreenshotPackage(capturedScreenshots, (prog, msg) => {
      setProgress(prog);
      setProgressMessage(msg);
    });
  };
  
  // Reset
  const reset = () => {
    setCaptureState('idle');
    setCurrentCaseIndex(0);
    setCurrentSceneType('HERO');
    setProgress(0);
    setProgressMessage('');
    setCapturedScreenshots([]);
  };
  
  // Get current case for rendering
  const currentCase = cases.filter(c => selectedCases.has(c.id))[currentCaseIndex];
  
  // Initialize selection on mount
  useState(() => {
    initializeSelection();
  });
  
  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Captura de Screenshots Green Procurement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Case Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Seleccionar Casos ({selectedCases.size}/{cases.length})</span>
              <Button variant="outline" size="sm" onClick={toggleAll}>
                {selectedCases.size === cases.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
              </Button>
            </div>
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {cases.map((caseData) => (
                  <button
                    key={caseData.id}
                    onClick={() => toggleCase(caseData.id)}
                    disabled={captureState === 'capturing'}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedCases.has(caseData.id)
                        ? 'bg-emerald-500/20 border-2 border-emerald-500'
                        : 'bg-muted/50 border-2 border-transparent hover:bg-muted'
                    } ${captureState === 'capturing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {caseData.caseCode}
                      </Badge>
                      {selectedCases.has(caseData.id) && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-sm font-medium mt-1 truncate">{caseData.company}</p>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Progress */}
          {(captureState === 'capturing' || captureState === 'complete') && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{progressMessage}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {captureState === 'idle' && (
              <Button 
                onClick={startCapture} 
                disabled={selectedCases.size === 0}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Iniciar Captura ({selectedCases.size * 5} screenshots)
              </Button>
            )}
            
            {captureState === 'capturing' && (
              <Button disabled className="gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Capturando...
              </Button>
            )}
            
            {captureState === 'complete' && (
              <>
                <Button onClick={downloadPackage} className="gap-2">
                  <Download className="h-4 w-4" />
                  Descargar Paquete ZIP
                </Button>
                <Button variant="outline" onClick={reset} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reiniciar
                </Button>
              </>
            )}
            
            {captureState === 'error' && (
              <Button variant="destructive" onClick={reset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reintentar
              </Button>
            )}
          </div>
          
          {/* Stats */}
          {captureState === 'complete' && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-500">{capturedScreenshots.length}</p>
                <p className="text-sm text-muted-foreground">Screenshots</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{selectedCases.size}</p>
                <p className="text-sm text-muted-foreground">Casos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{sceneTypes.length}</p>
                <p className="text-sm text-muted-foreground">Escenas/Caso</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Preview Thumbnails */}
      {capturedScreenshots.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Screenshots Capturados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {capturedScreenshots.map((screenshot, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-900">
                      <img 
                        src={screenshot.dataUrl} 
                        alt={screenshot.fileName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-mono truncate text-muted-foreground">
                      {screenshot.fileName}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      
      {/* Hidden Capture Container */}
      <div 
        ref={captureContainerRef}
        className="fixed -left-[9999px] top-0 overflow-hidden"
        style={{ width: '1920px', height: '5400px' }} // 1080 * 5 scenes
      >
        {currentCase && (
          <>
            <div data-scene="HERO">
              <GPHeroScene caseData={currentCase} caseNumber={currentCaseIndex + 1} />
            </div>
            <div data-scene="CHALLENGE">
              <GPChallengeScene caseData={currentCase} caseNumber={currentCaseIndex + 1} />
            </div>
            <div data-scene="STRATEGY">
              <GPStrategyScene caseData={currentCase} caseNumber={currentCaseIndex + 1} />
            </div>
            <div data-scene="METRICS">
              <GPMetricsScene caseData={currentCase} caseNumber={currentCaseIndex + 1} />
            </div>
            <div data-scene="PROOF">
              <GPProofScene caseData={currentCase} caseNumber={currentCaseIndex + 1} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
