/**
 * Green Procurement Screenshot Service
 * Captures screenshots of GP cases and generates InVideo AI documentation
 */

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { greenProcurementCases, GreenProcurementCase, InterventionType } from '@/data/greenProcurementCases';

export type SceneType = 'HERO' | 'CHALLENGE' | 'STRATEGY' | 'METRICS' | 'PROOF';

export interface CapturedScreenshot {
  caseId: string;
  company: string;
  sceneType: SceneType;
  fileName: string;
  folderName: string;
  dataUrl: string;
}

export interface CaptureProgress {
  currentCase: number;
  totalCases: number;
  currentScene: SceneType;
  caseName: string;
  percentage: number;
}

// Case code mapping for file names
const caseCodeMap: Record<string, { code: string; shortName: string }> = {
  "novo-nordisk-returpen": { code: "GP01", shortName: "NOVO" },
  "maersk-metanol-verde": { code: "GP02", shortName: "MAERSK" },
  "apple-elysis-aluminio": { code: "GP03", shortName: "APPLE" },
  "bmw-acero-verde": { code: "GP04", shortName: "BMW" },
  "basf-biomasa-balance": { code: "GP05", shortName: "BASF" },
  "kering-epl-lujo": { code: "GP06", shortName: "KERING" },
  "airbus-saf-aviacion": { code: "GP07", shortName: "AIRBUS" },
  "google-cfe-247": { code: "GP08", shortName: "GOOGLE" },
  "schneider-zero-carbon": { code: "GP09", shortName: "SCHNEIDER" },
  "unilever-palma-satelital": { code: "GP10", shortName: "UNILEVER" }
};

const sceneTypes: SceneType[] = ['HERO', 'CHALLENGE', 'STRATEGY', 'METRICS', 'PROOF'];

// Get file name for a screenshot
export function getScreenshotFileName(caseId: string, sceneType: SceneType): string {
  const caseInfo = caseCodeMap[caseId] || { code: "GP00", shortName: "UNKNOWN" };
  return `${caseInfo.code}_${caseInfo.shortName}_${sceneType}.png`;
}

// Get folder name for a case
export function getCaseFolderName(caseId: string, index: number): string {
  const caseData = greenProcurementCases.find(c => c.id === caseId);
  const company = caseData?.company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'unknown';
  return `${String(index + 1).padStart(2, '0')}-${company}`;
}

// Generate the visual index markdown document
export function generateVisualIndex(screenshots: CapturedScreenshot[]): string {
  const interventionLabels: Record<InterventionType, string> = {
    "co-inversion": "Co-inversión",
    "trazabilidad-forense": "Trazabilidad Forense",
    "educacion-proveedores": "Educación Proveedores"
  };
  
  const sceneTimings: Record<SceneType, { start: string; end: string; transition: string; sfx: string }> = {
    'HERO': { start: "0:00", end: "0:05", transition: "Fade In + Scale Up (0.5s)", sfx: "Whoosh suave" },
    'CHALLENGE': { start: "0:05", end: "0:15", transition: "Glitch + Red Overlay (0.3s)", sfx: "Distorsión digital" },
    'STRATEGY': { start: "0:15", end: "0:30", transition: "Morph + Blue Glow (0.5s)", sfx: "Transición fluida" },
    'METRICS': { start: "0:30", end: "0:45", transition: "3D Rotate + Counter Animation", sfx: "Números subiendo" },
    'PROOF': { start: "0:45", end: "0:55", transition: "Glassmorphism Card + Blockchain Pulse", sfx: "Confirmación digital" }
  };

  let markdown = `# ÍNDICE VISUAL PARA INVIDEO AI
## Paquete de Screenshots - Green Procurement

---

# INSTRUCCIONES GENERALES

## Cómo Usar Este Documento

1. **Buscar por nombre de archivo**: Cada screenshot tiene un nombre único (ej: \`GP01_NOVO_HERO.png\`)
2. **Timing sincronizado**: Cada imagen indica cuándo usarla en el video
3. **Narración incluida**: Texto listo para voz en off sincronizado
4. **VFX sugeridos**: Transiciones y efectos recomendados

## Especificaciones Técnicas

| Aspecto | Especificación |
|---------|----------------|
| Resolución | 1920x1080 (16:9) |
| Formato | PNG (alta calidad) |
| Duración por caso | ~55 segundos |
| Total de escenas | ${screenshots.length} screenshots |
| Total de casos | ${greenProcurementCases.length} casos |

## Paleta de Colores Principal

| Color | Hex | Uso |
|-------|-----|-----|
| Emerald | #10B981 | ESG, Sostenibilidad |
| Blue | #2563EB | Industria, Tecnología |
| Cyan | #06B6D4 | Marítimo, Logística |
| Violet | #8B5CF6 | Blockchain, Proof |
| Red | #EF4444 | Problema, Reto |

## Música Recomendada

- **BPM**: 100-120
- **Mood**: "Inspiring Technology" / "Corporate Innovation"
- **Estilo**: Electrónico corporativo, sin letra
- **Crescendo**: En escenas de METRICS

---

# CASOS DE GREEN PROCUREMENT

`;

  // Group screenshots by case
  const caseGroups = new Map<string, CapturedScreenshot[]>();
  screenshots.forEach(s => {
    const existing = caseGroups.get(s.caseId) || [];
    existing.push(s);
    caseGroups.set(s.caseId, existing);
  });

  let caseIndex = 0;
  greenProcurementCases.forEach((caseData) => {
    caseIndex++;
    const caseInfo = caseCodeMap[caseData.id];
    const caseScreenshots = caseGroups.get(caseData.id) || [];
    
    markdown += `
---

## CASO ${caseIndex}: ${caseData.company.toUpperCase()}

**Programa**: ${caseData.program}
**Sector**: ${caseData.sector}
**País**: ${caseData.country}
**Tipo de Intervención**: ${interventionLabels[caseData.interventionType]}
**Color Dominante**: ${caseData.color.includes('emerald') ? 'Emerald #10B981' : caseData.color.includes('cyan') ? 'Cyan #06B6D4' : caseData.color.includes('blue') ? 'Blue #2563EB' : 'Ver gradiente'}

### Archivos de este caso:
${caseScreenshots.map(s => `- \`${s.fileName}\``).join('\n')}

`;

    // Add each scene
    sceneTypes.forEach(sceneType => {
      const screenshot = caseScreenshots.find(s => s.sceneType === sceneType);
      if (!screenshot) return;
      
      const timing = sceneTimings[sceneType];
      let narration = "";
      
      switch (sceneType) {
        case 'HERO':
          narration = `"${caseData.company}, líder en ${caseData.sector.toLowerCase()}, enfrentaba un reto único en ${caseData.country}..."`;
          break;
        case 'CHALLENGE':
          narration = `"El problema: ${caseData.challenge.slice(0, 150)}..."`;
          break;
        case 'STRATEGY':
          narration = `"La solución: ${caseData.strategy.slice(0, 150)}..."`;
          break;
        case 'METRICS':
          narration = `"El resultado: ${caseData.metric} ${caseData.metricLabel}. ${caseData.impact.slice(0, 100)}..."`;
          break;
        case 'PROOF':
          narration = `"Verificado en blockchain: ${caseData.blockchainProof}. Datos inmutables y auditables."`;
          break;
      }

      markdown += `
### ${screenshot.fileName}

| Atributo | Valor |
|----------|-------|
| **Timing** | ${timing.start} - ${timing.end} |
| **Transición entrada** | ${timing.transition} |
| **SFX** | ${timing.sfx} |

**Narración:**
> ${narration}

**Música**: 100-120 BPM, "Inspiring Technology"

`;
    });
  });

  markdown += `
---

# SECUENCIA DE CIERRE

## Después del último caso (0:55 - 1:00)

**Imagen**: Logo PROCUREDATA
**Transición**: Fade to Black + Logo Reveal
**Narración**: "PROCUREDATA. Donde la confianza se construye con código, no con promesas."
**Música**: Crescendo final
**SFX**: Confirmación épica

---

# KEYWORDS DE STOCK POR CASO

| Caso | Keywords Principales |
|------|---------------------|
| Novo Nordisk | insulin pen, pharmaceutical recycling, medical device, circular economy |
| Maersk | container ship, green fuel, port terminal, maritime logistics |
| Apple Elysis | aluminum smelting, green factory, technology manufacturing |
| BMW Group | green steel, hydrogen production, automotive factory, electric car |
| BASF | chemical plant, industrial automation, sustainability |
| Kering | luxury fashion, sustainable materials, gold mining, ethical sourcing |
| Airbus | aircraft, sustainable aviation fuel, aerospace manufacturing |
| Google | data center, server room, wind turbines, solar panels |
| Schneider | industrial automation, factory floor, supply chain, training |
| Unilever | palm oil plantation, satellite imagery, tropical forest, GPS tracking |

---

*Generado automáticamente por PROCUREDATA Export Service*
*${new Date().toLocaleDateString('es-ES')} - Optimizado para InVideo AI*
`;

  return markdown;
}

// Capture a single element as screenshot
export async function captureElement(element: HTMLElement): Promise<string> {
  const canvas = await html2canvas(element, {
    scale: 1,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#0f172a', // Slate 900
    logging: false,
    width: 1920,
    height: 1080
  });
  
  return canvas.toDataURL('image/png');
}

// Convert data URL to Blob
function dataURLToBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

// Generate ZIP package with all screenshots
export async function generateScreenshotPackage(
  screenshots: CapturedScreenshot[],
  onProgress?: (progress: number, message: string) => void
): Promise<void> {
  const zip = new JSZip();
  
  onProgress?.(10, 'Generando índice visual...');
  
  // Add visual index
  const visualIndex = generateVisualIndex(screenshots);
  zip.file('INDICE_VISUAL_INVIDEO.md', visualIndex);
  
  onProgress?.(20, 'Organizando screenshots...');
  
  // Group screenshots by folder
  const folderGroups = new Map<string, CapturedScreenshot[]>();
  screenshots.forEach(s => {
    const existing = folderGroups.get(s.folderName) || [];
    existing.push(s);
    folderGroups.set(s.folderName, existing);
  });
  
  // Add screenshots to ZIP
  let processedCount = 0;
  const totalFiles = screenshots.length;
  
  folderGroups.forEach((files, folderName) => {
    files.forEach(screenshot => {
      const blob = dataURLToBlob(screenshot.dataUrl);
      zip.file(`${folderName}/${screenshot.fileName}`, blob);
      processedCount++;
      const progress = 20 + Math.round((processedCount / totalFiles) * 60);
      onProgress?.(progress, `Añadiendo ${screenshot.fileName}...`);
    });
  });
  
  onProgress?.(85, 'Comprimiendo archivos...');
  
  // Generate and download ZIP
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });
  
  onProgress?.(95, 'Preparando descarga...');
  
  const fileName = `green-procurement-screenshots-${new Date().toISOString().split('T')[0]}.zip`;
  saveAs(blob, fileName);
  
  onProgress?.(100, '¡Descarga lista!');
}

// Get all cases for display
export function getGreenProcurementCasesForCapture() {
  return greenProcurementCases.map((caseData, index) => ({
    ...caseData,
    caseNumber: index + 1,
    caseCode: caseCodeMap[caseData.id]?.code || `GP${String(index + 1).padStart(2, '0')}`,
    shortName: caseCodeMap[caseData.id]?.shortName || caseData.company.toUpperCase().slice(0, 8),
    folderName: getCaseFolderName(caseData.id, index)
  }));
}

export { sceneTypes, greenProcurementCases };
