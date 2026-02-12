/**
 * InVideo Export Service
 * Generates downloadable ZIP package with all success case documentation
 */

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { 
  allExportableCases, 
  getCasesBySuperCategory, 
  superCategoryOrder,
  exportStats,
  type ExportableCaseData 
} from '@/data/successCasesExportData';

// Generate case text document (texto.md)
function generateCaseText(caseData: ExportableCaseData): string {
  return `# ${caseData.title}

## Datos Clave
- **Empresa**: ${caseData.company}
- **Sector**: ${caseData.sector}
- **País**: ${caseData.country}
- **Métrica Principal**: ${caseData.metric} ${caseData.metricLabel}

## El Reto
${caseData.challenge}

## La Solución PROCUREDATA
${caseData.solution}

## Servicios Utilizados
${caseData.services.map(s => `- ${s}`).join('\n')}

## Resultado
${caseData.description}

## Cita Destacada
> "${caseData.ariaQuote}"

## Prueba Blockchain
- **Hash**: ${caseData.blockchainProof}
- **Bloque**: ${caseData.blockNumber}

---
*Generado automáticamente para InVideo AI*
`;
}

// Generate case script (guion.md)
function generateCaseScript(caseData: ExportableCaseData): string {
  const duration = caseData.category === 'green-procurement' ? '60' : '45';
  
  return `# Guión de Narración: ${caseData.title}

**Duración total**: ${duration} segundos
**Tono**: Profesional, inspirador
**Empresa**: ${caseData.company}
**Sector**: ${caseData.sector}

---

## Secuencia Visual

| Tiempo | Imagen | Narración |
|--------|--------|-----------|
| 0-5s | hero.png | "${caseData.company} enfrentaba un reto crítico en el sector ${caseData.sector}..." |
| 5-15s | simulator.png | "${caseData.challenge.slice(0, 100)}..." |
| 15-35s | metrics.png | "Con PROCUREDATA, implementaron: ${caseData.services.slice(0, 2).join(', ')}. ${caseData.solution.slice(0, 80)}..." |
| 35-${parseInt(duration) - 5}s | results.png | "El resultado: ${caseData.metric} ${caseData.metricLabel}. ${caseData.description.slice(0, 60)}..." |
| ${parseInt(duration) - 5}-${duration}s | cta.png | "PROCUREDATA: Transformando datos en decisiones verificables." |

---

## Notas de Producción

### Elementos Visuales Sugeridos
- Logo de ${caseData.company}
- Iconografía del sector ${caseData.sector}
- Animación de métricas: ${caseData.metric} ${caseData.metricLabel}
- Sello blockchain: ${caseData.blockchainProof}

### Música de Fondo
- Estilo: Corporativo inspirador
- Tempo: 100-120 BPM
- Sin letra

### Efectos
- Transiciones suaves (fade/dissolve)
- Zoom sutil en métricas
- Animación de números para ${caseData.metric}

---

## Texto para Voz en Off

**INTRO (0-5s)**
"${caseData.company}, líder en ${caseData.sector}, enfrentaba un desafío crítico."

**PROBLEMA (5-15s)**
"${caseData.challenge}"

**SOLUCIÓN (15-35s)**
"Con PROCUREDATA, implementaron ${caseData.services.slice(0, 3).join(', ')}. ${caseData.solution}"

**RESULTADO (35-${parseInt(duration) - 5}s)**
"El resultado: ${caseData.metric} ${caseData.metricLabel}. ${caseData.ariaQuote}"

**CIERRE (${parseInt(duration) - 5}-${duration}s)**
"PROCUREDATA. Transformando datos en decisiones verificables."

---
*Generado automáticamente para InVideo AI - Bloque ${caseData.blockNumber}*
`;
}

// Generate master script (guion-completo.md)
function generateMasterScript(): string {
  const casesByCategory = getCasesBySuperCategory();
  
  let script = `# PROCUREDATA: Transformando la Cadena de Suministro
## Guión Maestro para Video Corporativo

**Duración total estimada**: 25-30 minutos
**Formato**: Video corporativo / Documental empresarial
**Tono**: Profesional, inspirador, innovador

---

## ACTO 1: El Problema (2 minutos)

**[0:00 - 0:30] APERTURA**
*Música épica. Tomas de fábricas, puertos, granjas, hospitales.*

"Las empresas europeas enfrentan una crisis de confianza en sus datos. Cada día, millones de euros se pierden en verificaciones redundantes, auditorías repetitivas y fraudes documentales."

**[0:30 - 1:00] EL RETO**
*Gráficos animados mostrando flujos de datos fragmentados.*

"La cadena de suministro global es una torre de Babel digital. Cada empresa habla su propio idioma de datos, imposibilitando la colaboración y la verificación."

**[1:00 - 2:00] LA OPORTUNIDAD**
*Transición a visualización de red conectada.*

"Pero hay una solución. Un nuevo paradigma europeo que devuelve la soberanía del dato a quien lo genera: los espacios de datos soberanos."

---

## ACTO 2: La Solución (3 minutos)

**[2:00 - 3:00] PROCUREDATA**
*Logo PROCUREDATA. Diagrama de arquitectura.*

"PROCUREDATA es el primer espacio de datos soberano de España para el procurement sostenible. Conectado a la red europea Pontus-X, permite que las empresas intercambien datos con garantías legales, técnicas y de privacidad."

**[3:00 - 4:00] TECNOLOGÍA**
*Animación de blockchain, smart contracts, ODRL.*

"Blockchain para la inmutabilidad. Smart Contracts para la automatización. Políticas ODRL para el control. Una infraestructura que hace que los datos trabajen para ti."

**[4:00 - 5:00] BENEFICIOS**
*Métricas animadas.*

"Homologación en 24 horas. Auditorías en 1 hora. Liquidez instantánea. Fraude cero. Estos no son objetivos. Son resultados reales de ${exportStats.totalCases} casos de éxito."

---

## ACTO 3: Casos de Éxito por Sector (15 minutos)

`;

  // Add cases by super-category
  superCategoryOrder.forEach(category => {
    const cases = casesByCategory[category] || [];
    if (cases.length === 0) return;
    
    script += `\n### ${category.toUpperCase()} (${cases.length} casos)\n\n`;
    
    cases.slice(0, 5).forEach(c => {
      script += `**${c.company}**: ${c.metric} ${c.metricLabel}
> ${c.description}

`;
    });
    
    if (cases.length > 5) {
      script += `*...y ${cases.length - 5} casos más en esta categoría.*\n\n`;
    }
  });

  script += `
---

## ACTO 4: Green Procurement (5 minutos)

**[20:00 - 21:00] INTRODUCCIÓN**
"Las grandes corporaciones están redefiniendo las reglas del juego. No se limitan a comprar sostenible: están creando los mercados sostenibles del futuro."

**[21:00 - 25:00] CASOS DESTACADOS**

`;

  const gpCases = casesByCategory['Green Procurement'] || [];
  gpCases.forEach(c => {
    script += `**${c.company} - ${c.title}**
- Métrica: ${c.metric} ${c.metricLabel}
- ${c.description}

`;
  });

  script += `
---

## ACTO 5: Cierre (1 minuto)

**[25:00 - 26:00] LLAMADA A LA ACCIÓN**
*Logo PROCUREDATA. Datos de contacto.*

"Únete al ecosistema de datos verificables. PROCUREDATA. Donde la confianza se construye con código, no con promesas."

**[26:00] CRÉDITOS**
*Logos de partners: Pontus-X, Gaia-X, deltaDAO.*

---

## ESTADÍSTICAS DEL CONTENIDO

| Métrica | Valor |
|---------|-------|
| Total Casos de Éxito | ${exportStats.totalCases} |
| Casos Estándar | ${exportStats.standardCases} |
| Casos Green Procurement | ${exportStats.greenProcurementCases} |
| Súper-Categorías | ${exportStats.superCategories} |

---
*Generado automáticamente por PROCUREDATA Export Service*
*Optimizado para InVideo AI*
`;

  return script;
}

// Generate README
function generateReadme(): string {
  return `# Paquete de Exportación para InVideo AI

## Contenido del Paquete

Este paquete contiene toda la documentación necesaria para generar videos con InVideo AI sobre los casos de éxito de PROCUREDATA.

### Estructura de Carpetas

\`\`\`
/invideo-export/
├── README.md                     # Este archivo
├── guion-completo.md            # Argumentario narrativo completo (25-30 min)
├── casos/
│   ├── 01-gigafactory-north/
│   │   ├── texto.md             # Descripción detallada del caso
│   │   └── guion.md             # Guión para narración (45s)
│   ├── 02-olivetrust-coop/
│   │   └── ...
│   └── ...
└── green-procurement/
    ├── 01-novo-nordisk/
    │   └── ...
    └── ...
\`\`\`

### Estadísticas

- **Total de casos**: ${exportStats.totalCases}
- **Casos estándar**: ${exportStats.standardCases}
- **Casos Green Procurement**: ${exportStats.greenProcurementCases}
- **Categorías**: ${exportStats.superCategories}

### Cómo Usar con InVideo AI

1. **Video Largo (25-30 min)**
   - Usa \`guion-completo.md\` como base
   - Ideal para presentaciones corporativas

2. **Videos por Caso (45s cada uno)**
   - Usa el \`guion.md\` de cada carpeta de caso
   - Perfecto para redes sociales y LinkedIn

3. **Videos por Sector (3-5 min)**
   - Combina los guiones de casos del mismo sector
   - Agrupa por súper-categoría

### Notas de Producción

- **Resolución recomendada**: 1920x1080 (16:9)
- **Formato vertical**: 1080x1920 (9:16) para Reels/TikTok
- **Música**: Corporativa inspiradora, 100-120 BPM
- **Voz**: Profesional, neutral, español europeo

### Contacto

Para más información sobre PROCUREDATA:
- Web: https://procuredata.eu
- Email: info@procuredata.eu

---
*Generado automáticamente el ${new Date().toLocaleDateString('es-ES')}*
`;
}

// Slugify function for folder names
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Main export function
export async function generateInVideoExportPackage(
  onProgress?: (progress: number, message: string) => void
): Promise<void> {
  const zip = new JSZip();
  const total = allExportableCases.length + 2; // cases + master script + readme
  let current = 0;
  
  const updateProgress = (message: string) => {
    current++;
    onProgress?.(Math.round((current / total) * 100), message);
  };
  
  // Add README
  zip.file('README.md', generateReadme());
  updateProgress('Generando README...');
  
  // Add master script
  zip.file('guion-completo.md', generateMasterScript());
  updateProgress('Generando guión maestro...');
  
  // Add cases
  const standardCases = allExportableCases.filter(c => c.category === 'standard');
  const gpCases = allExportableCases.filter(c => c.category === 'green-procurement');
  
  // Standard cases
  standardCases.forEach((caseData, index) => {
    const folderName = `casos/${String(index + 1).padStart(2, '0')}-${slugify(caseData.company)}`;
    
    zip.file(`${folderName}/texto.md`, generateCaseText(caseData));
    zip.file(`${folderName}/guion.md`, generateCaseScript(caseData));
    
    updateProgress(`Procesando: ${caseData.company}`);
  });
  
  // Green Procurement cases
  gpCases.forEach((caseData, index) => {
    const folderName = `green-procurement/${String(index + 1).padStart(2, '0')}-${slugify(caseData.company)}`;
    
    zip.file(`${folderName}/texto.md`, generateCaseText(caseData));
    zip.file(`${folderName}/guion.md`, generateCaseScript(caseData));
    
    updateProgress(`Procesando GP: ${caseData.company}`);
  });
  
  // Generate and download ZIP
  onProgress?.(95, 'Comprimiendo archivos...');
  
  const blob = await zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });
  
  onProgress?.(100, '¡Descarga lista!');
  
  const fileName = `procuredata-invideo-export-${new Date().toISOString().split('T')[0]}.zip`;
  saveAs(blob, fileName);
}

// Preview functions
export function previewCaseText(caseId: string): string | null {
  const caseData = allExportableCases.find(c => c.id === caseId);
  if (!caseData) return null;
  return generateCaseText(caseData);
}

export function previewCaseScript(caseId: string): string | null {
  const caseData = allExportableCases.find(c => c.id === caseId);
  if (!caseData) return null;
  return generateCaseScript(caseData);
}

export function previewMasterScript(): string {
  return generateMasterScript();
}

// Download Green Procurement guide as standalone markdown
export async function downloadGreenProcurementGuide(): Promise<void> {
  try {
    const response = await fetch('/docs/GUION_GREEN_PROCUREMENT_INVIDEO.md');
    const content = await response.text();
    
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const fileName = `GUION_GREEN_PROCUREMENT_INVIDEO_${new Date().toISOString().split('T')[0]}.md`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error downloading Green Procurement guide:', error);
    throw error;
  }
}

// Download Short-form video scripts for Reels/TikTok/Shorts
export async function downloadShortsGuide(): Promise<void> {
  try {
    const response = await fetch('/docs/GUIONES_SHORTS_GREEN_PROCUREMENT.md');
    const content = await response.text();
    
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const fileName = `GUIONES_SHORTS_GP_${new Date().toISOString().split('T')[0]}.md`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error downloading Shorts guide:', error);
    throw error;
  }
}

// Download Novo Nordisk GP01 detailed production script
export async function downloadNovoNordiskScript(): Promise<void> {
  try {
    const response = await fetch('/docs/SCRIPT_GP01_NOVO_NORDISK.md');
    const content = await response.text();
    
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const fileName = `SCRIPT_GP01_NOVO_NORDISK_${new Date().toISOString().split('T')[0]}.md`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error downloading Novo Nordisk script:', error);
    throw error;
  }
}
