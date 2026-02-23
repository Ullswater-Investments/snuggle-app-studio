import { jsPDF } from "jspdf";

// Default ODRL policies
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

// Typography constants
const MARGIN = 25; // 25mm = 2.5cm
const FONT_BODY = 10;
const FONT_CLAUSE_TITLE = 12;
const FONT_MAIN_TITLE = 14;
const LINE_HEIGHT = FONT_BODY * 0.3528 * 1.13; // pt to mm * 1.13 interlineado
const PARAGRAPH_SPACING = 6 * 0.3528; // 6pt in mm
const PAGE_WIDTH = 210; // A4
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const HEADER_HEIGHT = 20; // reserved for header
const FOOTER_HEIGHT = 25; // reserved for footer
const CONTENT_TOP = MARGIN + HEADER_HEIGHT;
const CONTENT_BOTTOM = PAGE_HEIGHT - MARGIN - FOOTER_HEIGHT;

interface OrgInfo {
  name: string;
  tax_id?: string;
  sector?: string;
  description?: string;
}

async function generateContractHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(data));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function checkPageBreak(doc: jsPDF, yPos: number, requiredSpace: number): number {
  if (yPos + requiredSpace > CONTENT_BOTTOM) {
    doc.addPage();
    return CONTENT_TOP;
  }
  return yPos;
}

function drawHeadersAndFooters(doc: jsPDF, contractHash: string) {
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // ─── HEADER ───
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text("PROCUREDATA", MARGIN, MARGIN + 6);

    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, MARGIN + 10, PAGE_WIDTH - MARGIN, MARGIN + 10);

    // ─── FOOTER ───
    const footerY = PAGE_HEIGHT - MARGIN;

    // Separator
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, footerY - FOOTER_HEIGHT + 2, PAGE_WIDTH - MARGIN, footerY - FOOTER_HEIGHT + 2);

    // Hash
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(37, 99, 235);
    doc.text("SELLO DE INTEGRIDAD BLOCKCHAIN", MARGIN, footerY - FOOTER_HEIGHT + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(80);
    doc.text(`SHA-256: ${contractHash}`, MARGIN, footerY - FOOTER_HEIGHT + 11);

    // Notary text
    doc.setFontSize(5.5);
    doc.setTextColor(100);
    doc.text(
      "Documento generado automáticamente por el nodo notario de PROCUREDATA.",
      MARGIN,
      footerY - FOOTER_HEIGHT + 15
    );

    // Page counter
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(120);
    const pageText = `Página ${i} | ${totalPages}`;
    const pageTextWidth = doc.getTextWidth(pageText);
    doc.text(pageText, PAGE_WIDTH - MARGIN - pageTextWidth, footerY - FOOTER_HEIGHT + 7);
  }
}

export const generateLicensePDF = async (
  transaction: any,
  assetName: string,
  providerOrg: OrgInfo,
  consumerOrg: OrgInfo,
  approvalDate?: string
) => {
  const doc = new jsPDF();

  // Extract ODRL policies
  const accessPolicy = transaction?.asset?.custom_metadata?.access_policy;
  const permissions = accessPolicy?.permissions?.length ? accessPolicy.permissions : DEFAULT_PERMISSIONS;
  const prohibitions = accessPolicy?.prohibitions?.length ? accessPolicy.prohibitions : DEFAULT_PROHIBITIONS;
  const obligations = accessPolicy?.obligations?.length ? accessPolicy.obligations : DEFAULT_OBLIGATIONS;

  // Terms and conditions
  const customMeta = transaction?.asset?.custom_metadata;
  const termsAndConditions = customMeta?.terms_and_conditions || customMeta?.termsAndConditions || customMeta?.access_policy?.terms_url || customMeta?.terms_url || null;

  // Date: use approval date, fallback to updated_at, then created_at
  const dateStr = approvalDate || transaction.updated_at || transaction.created_at;
  const contractDate = new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Product info
  const productData = transaction?.asset?.product;
  const version = productData?.version || "1.0";
  const category = productData?.category || "General";

  let y = CONTENT_TOP;

  // ─── TITLE ───
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_MAIN_TITLE);
  doc.setTextColor(0, 0, 0);
  doc.text("CONTRATO DE LICENCIA DE USO DE DATOS", PAGE_WIDTH / 2, y, { align: "center" });
  y += 8;

  // Thin separator
  doc.setDrawColor(180);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 8;

  // ─── CONTRACT IDENTIFICATION ───
  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_BODY);
  doc.setTextColor(0);
  doc.text(`ID del Contrato: ${transaction.id}`, MARGIN, y);
  y += LINE_HEIGHT + 1;
  doc.text(`Fecha de emisión: ${contractDate}`, MARGIN, y);
  y += LINE_HEIGHT + PARAGRAPH_SPACING + 4;

  // ─── COMPARECIENTES ───
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_CLAUSE_TITLE);
  doc.text("COMPARECIENTES", MARGIN, y);
  y += LINE_HEIGHT + 3;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_BODY);

  // Helper to render a party block
  const renderParty = (label: string, org: OrgInfo) => {
    y = checkPageBreak(doc, y, 25);
    const mainText = `${label}, ${org.name}, en adelante "${label === "EL LICENCIANTE" ? "EL LICENCIANTE" : "EL LICENCIATARIO"}".`;
    const mainLines = doc.splitTextToSize(mainText, CONTENT_WIDTH);
    doc.setFont("helvetica", "normal");
    doc.text(mainLines, MARGIN, y);
    y += mainLines.length * LINE_HEIGHT + 1;

    // Details
    doc.setFontSize(9);
    doc.setTextColor(60);
    if (org.tax_id) {
      doc.text(`CIF/VAT: ${org.tax_id}`, MARGIN + 5, y);
      y += LINE_HEIGHT;
    }
    const country = org.sector ? extractCountry(org.sector) : "España";
    doc.text(`País: ${country}`, MARGIN + 5, y);
    y += LINE_HEIGHT;
    if (org.description) {
      const addrLines = doc.splitTextToSize(`Domicilio social: ${org.description}`, CONTENT_WIDTH - 10);
      doc.text(addrLines, MARGIN + 5, y);
      y += addrLines.length * LINE_HEIGHT;
    }
    doc.setFontSize(FONT_BODY);
    doc.setTextColor(0);
    y += PARAGRAPH_SPACING + 2;
  };

  renderParty("EL LICENCIANTE", providerOrg);
  renderParty("EL LICENCIATARIO", consumerOrg);

  // Intro text
  y = checkPageBreak(doc, y, 15);
  const intro = `Ambas partes, reconociéndose mutuamente capacidad legal suficiente para contratar y obligarse, acuerdan formalizar el presente contrato de licencia de uso de datos con arreglo a las siguientes cláusulas:`;
  const introLines = doc.splitTextToSize(intro, CONTENT_WIDTH);
  doc.text(introLines, MARGIN, y);
  y += introLines.length * LINE_HEIGHT + PARAGRAPH_SPACING + 6;

  // ─── ASSET IDENTIFICATION ───
  y = checkPageBreak(doc, y, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_CLAUSE_TITLE);
  doc.text("IDENTIFICACIÓN DEL ACTIVO DE DATOS", MARGIN, y);
  y += LINE_HEIGHT + 3;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_BODY);
  const assetDetails = [
    `Nombre: ${assetName}`,
    `Versión: ${version}`,
    `Categoría: ${category}`,
    `UUID de Transacción: ${transaction.id}`,
  ];
  assetDetails.forEach((line) => {
    doc.text(line, MARGIN, y);
    y += LINE_HEIGHT + 1;
  });
  y += PARAGRAPH_SPACING + 4;

  // ─── CLAUSES ───

  // Helper to render a clause with narrative intro
  const renderClause = (clauseNum: number, title: string, narrativeIntro: string, items: string[]) => {
    y = checkPageBreak(doc, y, 35);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(FONT_CLAUSE_TITLE);
    doc.text(`Cláusula ${clauseNum} — ${title}`, MARGIN, y);
    y += LINE_HEIGHT + 3;

    // Narrative intro
    doc.setFont("helvetica", "italic");
    doc.setFontSize(FONT_BODY);
    const introLines = doc.splitTextToSize(narrativeIntro, CONTENT_WIDTH);
    doc.text(introLines, MARGIN, y);
    y += introLines.length * LINE_HEIGHT + PARAGRAPH_SPACING;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(FONT_BODY);

    items.forEach((item, idx) => {
      y = checkPageBreak(doc, y, 10);
      const text = `${idx + 1}. ${item}`;
      const lines = doc.splitTextToSize(text, CONTENT_WIDTH - 5);
      doc.text(lines, MARGIN + 5, y);
      y += lines.length * LINE_HEIGHT + 1.5;
    });

    y += PARAGRAPH_SPACING + 2;
  };

  renderClause(
    1,
    "Permisos",
    "Define las acciones y derechos de explotación técnica autorizados sobre el activo.",
    permissions
  );

  renderClause(
    2,
    "Prohibiciones",
    "Establece las limitaciones de uso para salvaguardar la propiedad industrial y confidencialidad.",
    prohibitions
  );

  renderClause(
    3,
    "Obligaciones",
    "Determina los requisitos imperativos que el LICENCIATARIO debe cumplir para mantener la vigencia de esta licencia.",
    obligations
  );

  // Cláusula 4 — Duración
  y = checkPageBreak(doc, y, 25);
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
  y = checkPageBreak(doc, y, 25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_CLAUSE_TITLE);
  doc.text("Cláusula 5 — Propósito de Uso", MARGIN, y);
  y += LINE_HEIGHT + 3;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_BODY);
  const purposeText = `El LICENCIATARIO declara que el uso de los datos objeto de este contrato se realizará exclusivamente para el siguiente propósito: "${transaction.purpose}". Cualquier uso fuera del ámbito declarado requerirá una nueva autorización por parte del LICENCIANTE.`;
  const purposeLines = doc.splitTextToSize(purposeText, CONTENT_WIDTH);
  doc.text(purposeLines, MARGIN, y);
  y += purposeLines.length * LINE_HEIGHT + PARAGRAPH_SPACING + 4;

  // Cláusula 6 — Compromiso Normativo
  y = checkPageBreak(doc, y, 40);
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
  y = checkPageBreak(doc, y, gdprLines2.length * LINE_HEIGHT + 10);
  doc.text(gdprLines2, MARGIN, y);
  y += gdprLines2.length * LINE_HEIGHT + PARAGRAPH_SPACING + 4;

  // Cláusula 7 — Términos y Condiciones Particulares (conditional)
  if (termsAndConditions) {
    y = checkPageBreak(doc, y, 35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(FONT_CLAUSE_TITLE);
    doc.text("Cláusula 7 — Términos y Condiciones Particulares", MARGIN, y);
    y += LINE_HEIGHT + 3;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(FONT_BODY);
    const tcText = `El LICENCIATARIO declara conocer y se compromete a cumplir íntegramente los Términos y Condiciones Particulares proporcionados por el LICENCIANTE para el activo de datos objeto de este contrato. El incumplimiento de dichos términos constituirá causa suficiente para la resolución inmediata de la presente licencia, sin perjuicio de las acciones legales que pudieran corresponder.`;
    const tcLines = doc.splitTextToSize(tcText, CONTENT_WIDTH);
    doc.text(tcLines, MARGIN, y);
    y += tcLines.length * LINE_HEIGHT + PARAGRAPH_SPACING + 2;

    // If terms_and_conditions is a string, include a summary
    if (typeof termsAndConditions === "string" && termsAndConditions.length > 0) {
      y = checkPageBreak(doc, y, 15);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(60);
      const tcSummary = doc.splitTextToSize(`Referencia: ${termsAndConditions}`, CONTENT_WIDTH - 10);
      doc.text(tcSummary, MARGIN + 5, y);
      y += tcSummary.length * LINE_HEIGHT + PARAGRAPH_SPACING;
      doc.setTextColor(0);
      doc.setFontSize(FONT_BODY);
    }
  }

  // ─── GENERATE HASH AND DRAW HEADERS/FOOTERS ───
  const hashInput = [
    transaction.id,
    transaction.created_at,
    providerOrg.name,
    consumerOrg.name,
    assetName,
    transaction.purpose,
    transaction.access_duration_days,
  ].join("|");

  const contractHash = await generateContractHash(hashInput);

  // Draw header and footer on ALL pages
  drawHeadersAndFooters(doc, contractHash);

  // Save
  doc.save(`Contrato_Gobernanza_PROCUREDATA_${transaction.id.substring(0, 8)}.pdf`);
};

/** Extract country hint from sector string, default to España */
function extractCountry(sector: string): string {
  const s = sector.toLowerCase();
  if (s.includes("uk") || s.includes("united kingdom")) return "Reino Unido";
  if (s.includes("france") || s.includes("francia")) return "Francia";
  if (s.includes("germany") || s.includes("alemania")) return "Alemania";
  if (s.includes("portugal")) return "Portugal";
  if (s.includes("italy") || s.includes("italia")) return "Italia";
  return "España";
}
