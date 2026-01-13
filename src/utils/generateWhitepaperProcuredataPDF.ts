import { jsPDF } from 'jspdf';

export function generateWhitepaperProcuredataPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginLeft = 25;
  const marginRight = 25;
  const marginTop = 30;
  const marginBottom = 25;
  const contentWidth = pageWidth - marginLeft - marginRight;
  
  let currentY = marginTop;
  let pageNumber = 1;

  // Colors (grayscale for professional printing)
  const colors = {
    black: '#000000',
    darkGray: '#333333',
    mediumGray: '#666666',
    lightGray: '#999999',
    veryLightGray: '#E5E5E5',
    white: '#FFFFFF',
  };

  // Helper functions
  const addPage = () => {
    doc.addPage();
    pageNumber++;
    currentY = marginTop;
  };

  const checkPageBreak = (requiredHeight: number) => {
    if (currentY + requiredHeight > pageHeight - marginBottom) {
      addPage();
      return true;
    }
    return false;
  };

  const drawFooter = () => {
    doc.setFontSize(9);
    doc.setTextColor(colors.lightGray);
    doc.text(`PROCUREDATA Whitepaper v1.0`, marginLeft, pageHeight - 12);
    doc.text(`Página ${pageNumber}`, pageWidth - marginRight, pageHeight - 12, { align: 'right' });
  };

  const drawSectionTitle = (num: string, title: string) => {
    checkPageBreak(25);
    
    doc.setFontSize(11);
    doc.setTextColor(colors.mediumGray);
    doc.text(`${num} —`, marginLeft, currentY);
    
    currentY += 8;
    doc.setFontSize(18);
    doc.setTextColor(colors.black);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), marginLeft, currentY);
    
    currentY += 3;
    doc.setDrawColor(colors.black);
    doc.setLineWidth(0.5);
    doc.line(marginLeft, currentY, marginLeft + 60, currentY);
    
    currentY += 12;
    doc.setFont('helvetica', 'normal');
  };

  const drawSubtitle = (text: string) => {
    checkPageBreak(15);
    doc.setFontSize(12);
    doc.setTextColor(colors.darkGray);
    doc.setFont('helvetica', 'bold');
    doc.text(text, marginLeft, currentY);
    currentY += 8;
    doc.setFont('helvetica', 'normal');
  };

  const drawParagraph = (text: string, indent = 0) => {
    doc.setFontSize(10);
    doc.setTextColor(colors.darkGray);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    
    for (const line of lines) {
      checkPageBreak(6);
      doc.text(line, marginLeft + indent, currentY);
      currentY += 5;
    }
    currentY += 3;
  };

  const drawBullet = (text: string, level = 0) => {
    const indent = level * 8;
    const bullet = level === 0 ? '•' : '◦';
    
    doc.setFontSize(10);
    doc.setTextColor(colors.darkGray);
    doc.text(bullet, marginLeft + indent, currentY);
    
    const lines = doc.splitTextToSize(text, contentWidth - indent - 6);
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) checkPageBreak(5);
      doc.text(lines[i], marginLeft + indent + 6, currentY);
      currentY += 5;
    }
  };

  const drawBox = (title: string, content: string[]) => {
    const boxHeight = 8 + content.length * 5 + 6;
    checkPageBreak(boxHeight);
    
    doc.setFillColor(colors.veryLightGray);
    doc.roundedRect(marginLeft, currentY - 4, contentWidth, boxHeight, 2, 2, 'F');
    
    doc.setFontSize(10);
    doc.setTextColor(colors.darkGray);
    doc.setFont('helvetica', 'bold');
    doc.text(title, marginLeft + 4, currentY + 2);
    doc.setFont('helvetica', 'normal');
    
    currentY += 8;
    
    doc.setFontSize(9);
    for (const line of content) {
      doc.text(`• ${line}`, marginLeft + 6, currentY);
      currentY += 5;
    }
    
    currentY += 8;
  };

  const drawTable = (headers: string[], rows: string[][]) => {
    const colWidth = contentWidth / headers.length;
    const rowHeight = 7;
    
    checkPageBreak(rowHeight * (rows.length + 1) + 10);
    
    doc.setFillColor(colors.darkGray);
    doc.rect(marginLeft, currentY - 4, contentWidth, rowHeight, 'F');
    doc.setTextColor(colors.white);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    
    headers.forEach((header, i) => {
      doc.text(header, marginLeft + i * colWidth + 2, currentY);
    });
    
    currentY += rowHeight;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.darkGray);
    
    rows.forEach((row, rowIndex) => {
      if (rowIndex % 2 === 0) {
        doc.setFillColor(colors.veryLightGray);
        doc.rect(marginLeft, currentY - 4, contentWidth, rowHeight, 'F');
      }
      
      row.forEach((cell, i) => {
        const truncated = cell.length > 30 ? cell.substring(0, 27) + '...' : cell;
        doc.text(truncated, marginLeft + i * colWidth + 2, currentY);
      });
      
      currentY += rowHeight;
    });
    
    currentY += 6;
  };

  const drawQuote = (text: string) => {
    checkPageBreak(15);
    
    doc.setDrawColor(colors.mediumGray);
    doc.setLineWidth(1);
    doc.line(marginLeft, currentY - 2, marginLeft, currentY + 10);
    
    doc.setFontSize(11);
    doc.setTextColor(colors.mediumGray);
    doc.setFont('helvetica', 'italic');
    doc.text(text, marginLeft + 6, currentY + 4);
    doc.setFont('helvetica', 'normal');
    
    currentY += 18;
  };

  // ==================== COVER PAGE ====================
  currentY = 70;
  
  doc.setFontSize(42);
  doc.setTextColor(colors.black);
  doc.setFont('helvetica', 'bold');
  doc.text('PROCUREDATA', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 15;
  doc.setFontSize(14);
  doc.setTextColor(colors.mediumGray);
  doc.setFont('helvetica', 'normal');
  doc.text('Orquestación de Datos para la', pageWidth / 2, currentY, { align: 'center' });
  currentY += 7;
  doc.text('Economía Descentralizada', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 25;
  doc.setFontSize(18);
  doc.setTextColor(colors.darkGray);
  doc.text('WHITEPAPER TÉCNICO & ECONÓMICO', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 10;
  doc.setFontSize(14);
  doc.setTextColor(colors.mediumGray);
  doc.text('v1.0', pageWidth / 2, currentY, { align: 'center' });
  
  // Divider
  currentY += 20;
  doc.setDrawColor(colors.lightGray);
  doc.setLineWidth(0.5);
  doc.line(60, currentY, 150, currentY);
  
  // Ecosystem badges
  currentY += 20;
  doc.setFontSize(10);
  doc.setTextColor(colors.darkGray);
  const ecosystems = ['Gaia-X', 'Pontus-X', 'IDSA'];
  ecosystems.forEach((eco, i) => {
    const x = 60 + i * 35;
    doc.setFillColor(colors.veryLightGray);
    doc.roundedRect(x, currentY - 5, 30, 10, 2, 2, 'F');
    doc.text(eco, x + 15, currentY + 1, { align: 'center' });
  });
  
  // Date
  currentY = 240;
  doc.setFontSize(11);
  doc.setTextColor(colors.lightGray);
  doc.text('Enero 2026', pageWidth / 2, currentY, { align: 'center' });
  
  // ==================== TABLE OF CONTENTS ====================
  addPage();
  currentY = marginTop;
  
  doc.setFontSize(20);
  doc.setTextColor(colors.black);
  doc.setFont('helvetica', 'bold');
  doc.text('ÍNDICE DE CONTENIDOS', marginLeft, currentY);
  currentY += 15;
  
  const tocItems = [
    { num: '01', title: 'El Problema: La Trampa de la Redundancia', page: 3 },
    { num: '02', title: 'La Solución: Un Espacio de Datos Soberano', page: 4 },
    { num: '03', title: 'Arquitectura Técnica', page: 5 },
    { num: '04', title: 'Economía del Dato y Tokenomics', page: 7 },
    { num: '05', title: 'Casos de Uso Reales', page: 8 },
    { num: '06', title: 'Roadmap y Futuro', page: 9 },
    { num: '07', title: 'Conclusión', page: 10 },
    { num: '08', title: 'Glosario', page: 10 },
  ];
  
  doc.setFont('helvetica', 'normal');
  tocItems.forEach((item) => {
    doc.setFontSize(10);
    doc.setTextColor(colors.mediumGray);
    doc.text(item.num, marginLeft, currentY);
    
    doc.setTextColor(colors.darkGray);
    doc.text(item.title, marginLeft + 12, currentY);
    
    doc.setTextColor(colors.lightGray);
    doc.text(String(item.page), pageWidth - marginRight, currentY, { align: 'right' });
    
    doc.setDrawColor(colors.veryLightGray);
    doc.setLineDashPattern([1, 1], 0);
    const titleWidth = doc.getTextWidth(item.title);
    doc.line(marginLeft + 12 + titleWidth + 2, currentY, pageWidth - marginRight - 10, currentY);
    doc.setLineDashPattern([], 0);
    
    currentY += 10;
  });
  
  // Abstract
  currentY += 15;
  doc.setFontSize(12);
  doc.setTextColor(colors.black);
  doc.setFont('helvetica', 'bold');
  doc.text('ABSTRACT', marginLeft, currentY);
  currentY += 10;
  doc.setFont('helvetica', 'normal');
  
  drawParagraph('ProcureData es la primera infraestructura de Espacios de Datos diseñada específicamente para la función de Compras y Cadena de Suministro. Elimina la redundancia operativa en la validación de proveedores mediante identidades soberanas (DID) y contratos inteligentes de uso de datos (ODRL), transformando centros de coste burocráticos en mercados de datos líquidos y seguros.');
  
  drawFooter();

  // ==================== SECTION 1: EL PROBLEMA ====================
  addPage();
  drawSectionTitle('01', 'El Problema: La Trampa de la Redundancia');
  
  drawParagraph('En la economía actual, la confianza es manual, lenta y costosa.');
  
  drawSubtitle('1.1 Silos de Información');
  drawParagraph('La cadena de suministro global opera en silos. Un proveedor (Data Subject) debe enviar la misma documentación (certificados ISO, datos fiscales, reportes ESG) a cada uno de sus clientes (Data Consumers) individualmente.');
  
  drawSubtitle('1.2 El Coste de la Verificación');
  drawParagraph('Si 100 empresas compran a los mismos 500 proveedores, se realizan 50,000 procesos de validación y mantenimiento redundantes. Esto genera:');
  
  drawBullet('Fricción Operativa: Meses para homologar un proveedor crítico.');
  drawBullet('Riesgo de Datos Estáticos: La información en el ERP del comprador caduca el día después de ser validada.');
  drawBullet('Fraude y Greenwashing: La falta de trazabilidad inmutable permite la falsificación de credenciales de sostenibilidad.');
  
  drawFooter();

  // ==================== SECTION 2: LA SOLUCIÓN ====================
  addPage();
  drawSectionTitle('02', 'La Solución: Un Espacio de Datos Soberano');
  
  drawParagraph('ProcureData no es un "lago de datos" donde todos vuelcan su información. Es un sistema de tuberías inteligentes y seguras donde el dato viaja directamente del Propietario al Consumidor, bajo reglas estrictas.');
  
  drawSubtitle('2.1 El Triángulo de Confianza (IDSA Model)');
  drawParagraph('Adoptamos el modelo de arquitectura de referencia de la International Data Spaces Association:');
  
  drawBox('El Proveedor (Data Provider/Subject)', [
    'Mantiene la soberanía absoluta sobre sus datos',
    'El dato nunca sale de su control sin un contrato firmado',
    'Puede revocar acceso en cualquier momento'
  ]);
  
  drawBox('El Comprador (Data Consumer)', [
    'Accede al dato verificado en tiempo real',
    'Procesos de compras, riesgo y ESG automatizados',
    'Paga solo por el acceso que necesita'
  ]);
  
  drawBox('El Custodio (Data Holder)', [
    'Infraestructura neutral de intercambio',
    'No "ve" el contenido comercial sensible',
    'Garantiza la integridad técnica'
  ]);
  
  drawSubtitle('2.2 Pasaporte Digital de Proveedor');
  drawParagraph('En lugar de enviar PDFs por email, cada proveedor en ProcureData tiene una Identidad Auto-Soberana (SSI) basada en DIDs (did:ethr). Sus credenciales (ISO, Solvencia, ESG) están ancladas a esta identidad, permitiendo una verificación instantánea y reutilizable.');
  
  drawQuote('"Verificar una vez, usar en todas partes"');
  
  drawFooter();

  // ==================== SECTION 3: ARQUITECTURA ====================
  addPage();
  drawSectionTitle('03', 'Arquitectura Técnica');
  
  drawParagraph('Nuestra pila tecnológica es híbrida, combinando la usabilidad de Web2 con la confianza inmutable de Web3.');
  
  drawSubtitle('3.1 Layer de Confianza (Blockchain)');
  drawParagraph('Utilizamos la red Pontus-X (ecosistema Gaia-X) para la notarización de transacciones:');
  
  drawTable(
    ['Característica', 'Descripción'],
    [
      ['Inmutabilidad', 'Hash único por acuerdo registrado en cadena'],
      ['Identidad', 'DIDs W3C sin contraseñas corporativas'],
      ['Smart Contracts', 'Ejecución automática de pagos y revocaciones'],
    ]
  );
  
  drawSubtitle('3.2 Layer de Gobernanza (ODRL)');
  drawParagraph('El corazón de ProcureData es el motor de políticas ODRL (Open Digital Rights Language). A diferencia de una API tradicional, aquí el acceso al dato lleva adjunto un "contrato digital" que estipula:');
  
  drawBullet('Permisos: ¿Quién puede ver esto? (Ej. "Solo empresas del sector automoción")');
  drawBullet('Restricciones: ¿Por cuánto tiempo? (Ej. "Acceso revocado el 31/12/2026")');
  drawBullet('Obligaciones: ¿Qué debe ocurrir? (Ej. "Pago de 50 EUROe por consulta")');
  
  currentY += 5;
  
  drawSubtitle('3.3 Layer de Interoperabilidad (EDC)');
  drawParagraph('Implementamos conectores compatibles con Eclipse Dataspace Components, asegurando que ProcureData pueda "hablar" con otros espacios de datos europeos (Catena-X, Manufacturing-X) sin integraciones costosas.');
  
  drawFooter();

  // ==================== SECTION 4: ECONOMÍA ====================
  addPage();
  drawSectionTitle('04', 'Economía del Dato y Tokenomics');
  
  drawParagraph('A diferencia de proyectos especulativos, ProcureData utiliza una economía basada en utilidad real y estabilidad financiera.');
  
  drawSubtitle('4.1 Moneda Estable: EUROe');
  drawParagraph('Para las transacciones comerciales (compra de datasets, pago por servicios de validación), utilizamos EUROe, el primer dinero electrónico regulado (EMI) en blockchain compatible con MiCA.');
  
  drawTable(
    ['Ventaja', 'Descripción'],
    [
      ['Sin Volatilidad', '1 EUROe siempre es igual a 1 EUR'],
      ['Programable', 'Smart Settlement: pago al entregar dato validado'],
      ['Legal', 'Facturable y compatible con contabilidad EU'],
    ]
  );
  
  drawSubtitle('4.2 Monetización de Activos');
  drawParagraph('Los proveedores pueden transformar "residuos de datos" en activos:');
  
  drawBox('Compute-to-Data', [
    'Permite ejecutar algoritmos de IA sobre datos privados',
    'Los datos brutos nunca se revelan',
    'El proveedor cobra por el uso del cómputo',
    'Ideal para predicción de riesgo y análisis ESG'
  ]);
  
  drawFooter();

  // ==================== SECTION 5: CASOS DE USO ====================
  addPage();
  drawSectionTitle('05', 'Casos de Uso Reales');
  
  drawSubtitle('5.1 Industrial: Homologación Flash');
  drawTable(
    ['Aspecto', 'Detalle'],
    [
      ['Problema', 'GigaFactory North: 22 días para homologar'],
      ['Solución', 'Pasaporte Digital + verificación blockchain'],
      ['Resultado', 'Reducido a 48 horas'],
    ]
  );
  
  drawSubtitle('5.2 Agroalimentario: Trazabilidad Anti-Fraude');
  drawTable(
    ['Aspecto', 'Detalle'],
    [
      ['Problema', 'Falsificación de Denominaciones de Origen'],
      ['Solución', 'Etiquetas NFC vinculadas a DIDs únicos'],
      ['Resultado', '100% trazabilidad viñedo → consumidor'],
    ]
  );
  
  drawSubtitle('5.3 ESG: Auditoría de Alcance 3');
  drawTable(
    ['Aspecto', 'Detalle'],
    [
      ['Problema', 'Emisiones carbono Tier-2/Tier-3 opacas'],
      ['Solución', 'Solicitud automatizada + firma criptográfica'],
      ['Resultado', 'Reportes CSRD auditables, anti-greenwashing'],
    ]
  );
  
  drawFooter();

  // ==================== SECTION 6: ROADMAP ====================
  addPage();
  drawSectionTitle('06', 'Roadmap y Futuro');
  
  drawTable(
    ['Fase', 'Periodo', 'Objetivos'],
    [
      ['Fase 1', 'Actual - v3.1', 'Plataforma productiva, Pontus-X, EUROe, KYB'],
      ['Fase 2', 'Q3 2026', 'Federación Catena-X, IA Soberana predictiva'],
      ['Fase 3', '2027', 'Nodos descentralizados, logística marítima'],
    ]
  );
  
  currentY += 10;
  
  drawSubtitle('Fase 1: Fundación (Actual)');
  drawBullet('Plataforma productiva con todas las funcionalidades core');
  drawBullet('Integración completa con red Pontus-X');
  drawBullet('Pagos programables en EUROe');
  drawBullet('Proceso de onboarding KYB automatizado');
  
  currentY += 5;
  
  drawSubtitle('Fase 2: Expansión (Q3 2026)');
  drawBullet('Federación completa con el ecosistema Catena-X');
  drawBullet('Módulo de IA Soberana para análisis predictivo');
  drawBullet('Integración con Manufacturing-X');
  
  currentY += 5;
  
  drawSubtitle('Fase 3: Descentralización (2027)');
  drawBullet('Descentralización de nodos validadores');
  drawBullet('Expansión a logística marítima');
  drawBullet('Gobernanza distribuida del protocolo');
  
  drawFooter();

  // ==================== SECTION 7: CONCLUSIÓN + GLOSARIO ====================
  addPage();
  drawSectionTitle('07', 'Conclusión');
  
  drawParagraph('ProcureData no es solo software; es una nueva infraestructura de mercado. Al reemplazar intermediarios burocráticos con código criptográfico y estándares europeos, devolvemos el control del dato a quien lo genera y la velocidad a quien lo necesita.');
  
  drawQuote('"Únete a la economía de datos soberana."');
  
  currentY += 10;
  
  drawSectionTitle('08', 'Glosario');
  
  drawTable(
    ['Término', 'Definición'],
    [
      ['DID', 'Decentralized Identifier (W3C)'],
      ['ODRL', 'Open Digital Rights Language'],
      ['SSI', 'Self-Sovereign Identity'],
      ['Gaia-X', 'Iniciativa europea de espacios de datos'],
      ['Pontus-X', 'Red blockchain compatible Gaia-X'],
      ['EUROe', 'Stablecoin regulada 1:1 EUR'],
      ['IDSA', 'International Data Spaces Association'],
      ['EDC', 'Eclipse Dataspace Components'],
      ['MiCA', 'Markets in Crypto-Assets Regulation'],
      ['CSRD', 'Corporate Sustainability Reporting Directive'],
    ]
  );
  
  drawFooter();

  // ==================== BACK COVER ====================
  addPage();
  currentY = 100;
  
  doc.setFontSize(24);
  doc.setTextColor(colors.black);
  doc.setFont('helvetica', 'bold');
  doc.text('PROCUREDATA', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 15;
  doc.setFontSize(12);
  doc.setTextColor(colors.mediumGray);
  doc.setFont('helvetica', 'normal');
  doc.text('La infraestructura de datos soberana', pageWidth / 2, currentY, { align: 'center' });
  currentY += 6;
  doc.text('para la cadena de suministro del futuro', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 30;
  doc.setDrawColor(colors.lightGray);
  doc.setLineWidth(0.5);
  doc.line(70, currentY, 140, currentY);
  
  currentY += 20;
  doc.setFontSize(10);
  doc.setTextColor(colors.lightGray);
  doc.text('Ecosistema Gaia-X | Pontus-X | IDSA', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 30;
  doc.setFontSize(11);
  doc.setTextColor(colors.mediumGray);
  doc.text('procuredata.io', pageWidth / 2, currentY, { align: 'center' });
  
  currentY = 260;
  doc.setFontSize(9);
  doc.setTextColor(colors.lightGray);
  doc.text('© 2026 ProcureData. Todos los derechos reservados.', pageWidth / 2, currentY, { align: 'center' });

  // Save the PDF
  doc.save('WHITEPAPER_PROCUREDATA_v1.0.pdf');
}
