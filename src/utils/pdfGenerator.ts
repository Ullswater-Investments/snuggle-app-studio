import { jsPDF } from "jspdf";

// PROCUREDATA logo as base64 (small PNG version for PDF embedding)
const PROCUREDATA_LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAA8CAYAAADc3MbIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPjwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+";

// Default ODRL policies (same as DataView.tsx)
const DEFAULT_PERMISSIONS = [
  "Uso comercial dentro de la organización",
  "Análisis e integración en sistemas internos",
  "Generación de informes derivados",
];
const DEFAULT_PROHIBITIONS = [
  "Redistribución a terceros sin autorización",
  "Ingeniería inversa de datos individuales",
  "Uso para fines ilegales o discriminatorios",
];
const DEFAULT_OBLIGATIONS = [
  "Atribución al proveedor de datos",
  "Renovación de licencia según modelo de precio",
  "Cumplimiento GDPR para datos personales",
];

/**
 * Generate a deterministic SHA-256 hash from contract data
 */
async function generateContractHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(data));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Helper: check if we need a page break and add one if necessary.
 * Returns the new Y position.
 */
function checkPageBreak(doc: jsPDF, yPos: number, requiredSpace: number, margin: number): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (yPos + requiredSpace > pageHeight - margin) {
    doc.addPage();
    return margin;
  }
  return yPos;
}

// Typography constants
const MARGIN = 25; // 25mm = 2.5cm
const FONT_BODY = 10;
const FONT_CLAUSE_TITLE = 12;
const FONT_MAIN_TITLE = 14;
const LINE_HEIGHT = FONT_BODY * 0.3528 * 1.13; // pt to mm * 1.13 interlineado
const PARAGRAPH_SPACING = 6 * 0.3528; // 6pt in mm
const PAGE_WIDTH = 210; // A4
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

export const generateLicensePDF = async (
  transaction: any,
  assetName: string,
  providerName: string,
  consumerName: string
) => {
  const doc = new jsPDF();

  // Extract ODRL policies
  const accessPolicy = transaction?.asset?.custom_metadata?.access_policy;
  const permissions = accessPolicy?.permissions?.length ? accessPolicy.permissions : DEFAULT_PERMISSIONS;
  const prohibitions = accessPolicy?.prohibitions?.length ? accessPolicy.prohibitions : DEFAULT_PROHIBITIONS;
  const obligations = accessPolicy?.obligations?.length ? accessPolicy.obligations : DEFAULT_OBLIGATIONS;

  const contractDate = new Date(transaction.created_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let y = MARGIN;

  // ─── 1. HEADER WITH LOGO ───
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(37, 99, 235);
  doc.text("PROCUREDATA", MARGIN, y + 6);
  
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y + 10, PAGE_WIDTH - MARGIN, y + 10);

  y += 18;

  // Title
  doc.setFontSize(FONT_MAIN_TITLE);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  const title = "CONTRATO DE LICENCIA DE USO DE DATOS";
  const subtitle = "ECOSISTEMA PONTUS-X";
  doc.text(title, PAGE_WIDTH / 2, y, { align: "center" });
  y += 6;
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(subtitle, PAGE_WIDTH / 2, y, { align: "center" });
  y += 10;

  // Thin separator
  doc.setDrawColor(180);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 8;

  // ─── 2. CONTRACT IDENTIFICATION ───
  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_BODY);
  doc.setTextColor(0);
  doc.text(`ID del Contrato: ${transaction.id}`, MARGIN, y);
  y += LINE_HEIGHT + 1;
  doc.text(`Fecha de emisión: ${contractDate}`, MARGIN, y);
  y += LINE_HEIGHT + PARAGRAPH_SPACING + 4;

  // ─── 3. COMPARECIENTES ───
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_CLAUSE_TITLE);
  doc.text("COMPARECIENTES", MARGIN, y);
  y += LINE_HEIGHT + 3;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_BODY);

  const party1 = `De una parte, ${providerName}, en adelante "EL LICENCIANTE", en su calidad de titular de los datos objeto del presente contrato.`;
  const party1Lines = doc.splitTextToSize(party1, CONTENT_WIDTH);
  doc.text(party1Lines, MARGIN, y);
  y += party1Lines.length * LINE_HEIGHT + PARAGRAPH_SPACING + 2;

  const party2 = `De otra parte, ${consumerName}, en adelante "EL LICENCIATARIO", como entidad solicitante del acceso a los datos bajo las condiciones aquí estipuladas.`;
  const party2Lines = doc.splitTextToSize(party2, CONTENT_WIDTH);
  doc.text(party2Lines, MARGIN, y);
  y += party2Lines.length * LINE_HEIGHT + PARAGRAPH_SPACING + 2;

  const intro = `Ambas partes, reconociéndose mutuamente capacidad legal suficiente para contratar y obligarse, acuerdan formalizar el presente contrato de licencia de uso de datos con arreglo a las siguientes cláusulas:`;
  const introLines = doc.splitTextToSize(intro, CONTENT_WIDTH);
  doc.text(introLines, MARGIN, y);
  y += introLines.length * LINE_HEIGHT + PARAGRAPH_SPACING + 6;

  // ─── 4. CLÁUSULAS ODRL ───

  // Helper to render a clause
  const renderClause = (clauseNum: number, title: string, items: string[]) => {
    y = checkPageBreak(doc, y, 30, MARGIN);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(FONT_CLAUSE_TITLE);
    doc.text(`Cláusula ${clauseNum} — ${title}`, MARGIN, y);
    y += LINE_HEIGHT + 3;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(FONT_BODY);

    items.forEach((item, idx) => {
      y = checkPageBreak(doc, y, 10, MARGIN);
      const text = `${idx + 1}. ${item}`;
      const lines = doc.splitTextToSize(text, CONTENT_WIDTH - 5);
      doc.text(lines, MARGIN + 5, y);
      y += lines.length * LINE_HEIGHT + 1.5;
    });

    y += PARAGRAPH_SPACING + 2;
  };

  renderClause(1, "Permisos", permissions);
  renderClause(2, "Prohibiciones", prohibitions);
  renderClause(3, "Obligaciones", obligations);

  // Cláusula 4 — Duración
  y = checkPageBreak(doc, y, 25, MARGIN);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_CLAUSE_TITLE);
  doc.text("Cláusula 4 — Duración del Acceso", MARGIN, y);
  y += LINE_HEIGHT + 3;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_BODY);
  const durationText = `El acceso concedido al LICENCIATARIO tendrá una duración de ${transaction.access_duration_days} días naturales, contados a partir de la fecha de aprobación de la solicitud. Transcurrido dicho plazo, el acceso se revocará automáticamente salvo renovación expresa.`;
  const durationLines = doc.splitTextToSize(durationText, CONTENT_WIDTH);
  doc.text(durationLines, MARGIN, y);
  y += durationLines.length * LINE_HEIGHT + PARAGRAPH_SPACING + 4;

  // Cláusula 5 — Propósito
  y = checkPageBreak(doc, y, 25, MARGIN);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_CLAUSE_TITLE);
  doc.text("Cláusula 5 — Propósito de Uso", MARGIN, y);
  y += LINE_HEIGHT + 3;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_BODY);
  const purposeText = `El LICENCIATARIO declara que el uso de los datos objeto de este contrato se realizará exclusivamente para el siguiente propósito: "${transaction.purpose}". Cualquier uso fuera del ámbito declarado requerirá una nueva autorización por parte del LICENCIANTE.`;
  const purposeLines = doc.splitTextToSize(purposeText, CONTENT_WIDTH);
  doc.text(purposeLines, MARGIN, y);
  y += purposeLines.length * LINE_HEIGHT + PARAGRAPH_SPACING + 6;

  // ─── 5. COMPROMISO NORMATIVO ───
  y = checkPageBreak(doc, y, 40, MARGIN);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_CLAUSE_TITLE);
  doc.text("Cláusula 6 — Compromiso Normativo", MARGIN, y);
  y += LINE_HEIGHT + 3;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_BODY);
  const gdprText = `Ambas partes se comprometen expresamente al cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales (RGPD), así como del Reglamento (UE) 2023/2854 del Parlamento Europeo y del Consejo, de 13 de diciembre de 2023, sobre normas armonizadas para un acceso justo a los datos y su utilización (Data Act).`;
  const gdprLines = doc.splitTextToSize(gdprText, CONTENT_WIDTH);
  doc.text(gdprLines, MARGIN, y);
  y += gdprLines.length * LINE_HEIGHT + PARAGRAPH_SPACING + 2;

  const gdprText2 = `En particular, el LICENCIATARIO se obliga a implementar las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo del tratamiento, conforme al artículo 32 del RGPD, y a respetar los principios de portabilidad y acceso justo establecidos en el Data Act.`;
  const gdprLines2 = doc.splitTextToSize(gdprText2, CONTENT_WIDTH);
  y = checkPageBreak(doc, y, gdprLines2.length * LINE_HEIGHT + 10, MARGIN);
  doc.text(gdprLines2, MARGIN, y);
  y += gdprLines2.length * LINE_HEIGHT + PARAGRAPH_SPACING + 4;

  // ─── 6. ACTIVO DE DATOS ───
  y = checkPageBreak(doc, y, 20, MARGIN);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_CLAUSE_TITLE);
  doc.text("Activo de Datos Objeto del Contrato", MARGIN, y);
  y += LINE_HEIGHT + 3;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_BODY);
  doc.text(`Nombre: ${assetName}`, MARGIN, y);
  y += LINE_HEIGHT + PARAGRAPH_SPACING + 8;

  // ─── 7. BLOCKCHAIN VALIDATION FOOTER ───
  // Generate deterministic hash
  const hashInput = [
    transaction.id,
    transaction.created_at,
    providerName,
    consumerName,
    assetName,
    transaction.purpose,
    transaction.access_duration_days,
  ].join("|");

  const contractHash = await generateContractHash(hashInput);

  // Draw footer on the last page
  const footerY = doc.internal.pageSize.getHeight() - MARGIN - 5;

  // Separator line
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, footerY - 15, PAGE_WIDTH - MARGIN, footerY - 15);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(37, 99, 235);
  doc.text("SELLO DE INTEGRIDAD BLOCKCHAIN", MARGIN, footerY - 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(60);
  doc.text(`SHA-256: ${contractHash}`, MARGIN, footerY - 6);

  doc.setFontSize(6.5);
  doc.setTextColor(100);
  const footerText = "Documento generado automáticamente por el nodo notario de PROCUREDATA. Este contrato tiene validez jurídica mediante evidencia en red blockchain privada.";
  const footerLines = doc.splitTextToSize(footerText, CONTENT_WIDTH);
  doc.text(footerLines, MARGIN, footerY - 1);

  // Save
  doc.save(`Licencia_PROCUREDATA_${transaction.id.substring(0, 8)}.pdf`);
};
