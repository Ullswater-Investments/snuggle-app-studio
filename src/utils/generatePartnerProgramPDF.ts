import { jsPDF } from "jspdf";

// Grayscale color palette for professional look
const COLORS = {
  black: [0, 0, 0] as [number, number, number],
  darkGray: [40, 40, 40] as [number, number, number],
  mediumGray: [80, 80, 80] as [number, number, number],
  textGray: [50, 50, 50] as [number, number, number],
  lightGray: [150, 150, 150] as [number, number, number],
  veryLightGray: [200, 200, 200] as [number, number, number],
  background: [240, 240, 240] as [number, number, number],
  cardBg: [245, 245, 245] as [number, number, number],
};

export const generatePartnerProgramPDF = (): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = margin;

  // --- HELPER FUNCTIONS ---

  const checkPageBreak = (heightNeeded: number): boolean => {
    if (yPos + heightNeeded > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  const addTitle = (text: string): void => {
    checkPageBreak(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...COLORS.black);
    doc.text(text, margin, yPos);
    yPos += 15;
  };

  const addSubtitle = (text: string): void => {
    checkPageBreak(15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...COLORS.darkGray);
    doc.text(text, margin, yPos);
    yPos += 10;
  };

  const addSectionTitle = (text: string): void => {
    checkPageBreak(15);
    yPos += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...COLORS.darkGray);
    doc.text(text, margin, yPos);
    doc.setDrawColor(...COLORS.veryLightGray);
    doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);
    yPos += 12;
  };

  const addParagraph = (text: string): void => {
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.textGray);

    const lines = doc.splitTextToSize(text, contentWidth);
    const heightNeeded = lines.length * 5;

    checkPageBreak(heightNeeded);
    doc.text(lines, margin, yPos);
    yPos += heightNeeded + 5;
  };

  const addBullet = (text: string): void => {
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.textGray);
    const lines = doc.splitTextToSize(`• ${text}`, contentWidth - 5);
    const heightNeeded = lines.length * 5;
    checkPageBreak(heightNeeded);
    doc.text(lines, margin + 5, yPos);
    yPos += heightNeeded + 2;
  };

  const addKeyValueRow = (label: string, value: string): void => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.darkGray);
    doc.text(label, margin, yPos);
    doc.setFont("times", "normal");
    doc.setTextColor(...COLORS.textGray);
    doc.text(value, margin + 60, yPos);
    yPos += 6;
  };

  // --- DRAWING DIAGRAMS ---

  const drawGovernanceDiagram = (): void => {
    checkPageBreak(75);
    yPos += 5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setDrawColor(...COLORS.mediumGray);

    // Node A: Partner Local
    doc.setFillColor(...COLORS.background);
    doc.rect(margin, yPos, 65, 35, "FD");
    doc.setTextColor(...COLORS.darkGray);
    doc.text("GOBERNANZA LOCAL", margin + 5, yPos + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      ["- Gestión de Asociados", "- Precios Propios", "- Control de Acceso"],
      margin + 5,
      yPos + 18
    );

    // Arrow
    doc.setDrawColor(...COLORS.mediumGray);
    doc.line(margin + 65, yPos + 17, margin + 95, yPos + 17);
    doc.setFontSize(7);
    doc.text("Federación", margin + 70, yPos + 14);
    doc.text("(GAIA-X)", margin + 72, yPos + 20);

    // Arrow head
    doc.line(margin + 95, yPos + 17, margin + 90, yPos + 14);
    doc.line(margin + 95, yPos + 17, margin + 90, yPos + 20);

    // Node B: ProcureData Federal
    doc.setFillColor(...COLORS.cardBg);
    doc.rect(margin + 95, yPos, 70, 35, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("GOBERNANZA FEDERAL", margin + 100, yPos + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      ["- Interoperabilidad UE", "- Seguridad (Pontus-X)", "- Estándares IDSA"],
      margin + 100,
      yPos + 18
    );

    yPos += 50;
  };

  const drawEconomicDiagram = (): void => {
    checkPageBreak(90);
    yPos += 5;

    const boxW = 50;
    const boxH = 22;
    const midPage = pageWidth / 2;

    doc.setDrawColor(...COLORS.mediumGray);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    // 1. Grant Box
    doc.setFillColor(...COLORS.background);
    doc.rect(midPage - boxW / 2, yPos, boxW, boxH, "FD");
    doc.setTextColor(...COLORS.darkGray);
    doc.text("Kit Espacio Datos", midPage, yPos + 9, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.black);
    doc.text("+ 30.000 EUR", midPage, yPos + 17, { align: "center" });

    // Arrow Down
    doc.line(midPage, yPos + boxH, midPage, yPos + boxH + 12);
    doc.line(midPage, yPos + boxH + 12, midPage - 3, yPos + boxH + 9);
    doc.line(midPage, yPos + boxH + 12, midPage + 3, yPos + boxH + 9);

    yPos += boxH + 12;

    // 2. Partner Wallet
    doc.setFillColor(...COLORS.cardBg);
    doc.rect(midPage - boxW / 2, yPos, boxW, boxH, "FD");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.darkGray);
    doc.text("Caja del Partner", midPage, yPos + 13, { align: "center" });

    // Split arrows
    doc.line(midPage - 10, yPos + boxH, midPage - 35, yPos + boxH + 15);
    doc.line(midPage + 10, yPos + boxH, midPage + 35, yPos + boxH + 15);

    yPos += boxH + 15;

    // 3. Cost Box (Left)
    doc.setFillColor(...COLORS.veryLightGray);
    doc.rect(midPage - 70, yPos, boxW, boxH, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.darkGray);
    doc.text("Coste Adhesión", midPage - 45, yPos + 9, { align: "center" });
    doc.setTextColor(...COLORS.mediumGray);
    doc.text("- 5.000 EUR", midPage - 45, yPos + 17, { align: "center" });

    // 4. Profit Box (Right)
    doc.setFillColor(...COLORS.background);
    doc.rect(midPage + 20, yPos, boxW, boxH, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.darkGray);
    doc.text("Beneficio Neto Año 1", midPage + 45, yPos + 9, { align: "center" });
    doc.setTextColor(...COLORS.black);
    doc.setFontSize(10);
    doc.text("+ 25.000 EUR", midPage + 45, yPos + 17, { align: "center" });

    yPos += 35;
  };

  const drawRevenueTable = (): void => {
    checkPageBreak(50);
    yPos += 5;

    const tableX = margin;
    const colWidths = [80, 45, 45];
    const rowHeight = 10;

    doc.setDrawColor(...COLORS.veryLightGray);
    doc.setFillColor(...COLORS.background);

    // Header Row
    doc.rect(tableX, yPos, colWidths[0], rowHeight, "FD");
    doc.rect(tableX + colWidths[0], yPos, colWidths[1], rowHeight, "FD");
    doc.rect(tableX + colWidths[0] + colWidths[1], yPos, colWidths[2], rowHeight, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.darkGray);
    doc.text("Tipo de Transacción", tableX + 3, yPos + 7);
    doc.text("Fee Plataforma", tableX + colWidths[0] + 3, yPos + 7);
    doc.text("% para Partner", tableX + colWidths[0] + colWidths[1] + 3, yPos + 7);

    yPos += rowHeight;

    // Data Rows
    const rows = [
      ["Transacciones P2P", "20%", "50% (10% neto)"],
      ["Datos Agregados (Venta)", "10%", "90%"],
      ["Servicios Valor Añadido", "15%", "70%"],
    ];

    doc.setFont("times", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.textGray);

    rows.forEach((row) => {
      doc.setFillColor(255, 255, 255);
      doc.rect(tableX, yPos, colWidths[0], rowHeight, "FD");
      doc.rect(tableX + colWidths[0], yPos, colWidths[1], rowHeight, "FD");
      doc.rect(tableX + colWidths[0] + colWidths[1], yPos, colWidths[2], rowHeight, "FD");

      doc.text(row[0], tableX + 3, yPos + 7);
      doc.text(row[1], tableX + colWidths[0] + 3, yPos + 7);
      doc.text(row[2], tableX + colWidths[0] + colWidths[1] + 3, yPos + 7);

      yPos += rowHeight;
    });

    yPos += 10;
  };

  // --- DOCUMENT CONTENT GENERATION ---

  // PAGE 1: Cover
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.black);
  doc.text("PROCUREDATA", pageWidth / 2, 70, { align: "center" });

  doc.setFontSize(18);
  doc.setTextColor(...COLORS.darkGray);
  doc.text("Programa de Business Partners", pageWidth / 2, 85, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.mediumGray);
  doc.text("Guía Oficial para Nodos Fundadores", pageWidth / 2, 100, { align: "center" });

  doc.setLineWidth(0.5);
  doc.setDrawColor(...COLORS.veryLightGray);
  doc.line(margin + 30, 115, pageWidth - margin - 30, 115);

  // Key points on cover
  yPos = 135;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.darkGray);
  doc.text("Propuesta de Valor:", margin, yPos);
  yPos += 10;

  doc.setFont("times", "normal");
  doc.setTextColor(...COLORS.textGray);
  const coverPoints = [
    "✓ Soberanía tecnológica sobre los datos de sus asociados",
    "✓ Financiación garantizada: Kit Espacio de Datos (+30.000€)",
    "✓ Modelo 'Cash Positive' desde el primer año (+25.000€ netos)",
    "✓ Ingresos recurrentes por transacciones (50% revenue share)",
  ];
  coverPoints.forEach((point) => {
    doc.text(point, margin, yPos);
    yPos += 7;
  });

  // Footer on cover
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.lightGray);
  doc.text(`Generado: ${new Date().toLocaleDateString("es-ES")}`, pageWidth / 2, 265, {
    align: "center",
  });
  doc.text("Versión 2.1 - Documento Confidencial", pageWidth / 2, 272, { align: "center" });

  // PAGE 2: Executive Summary
  doc.addPage();
  yPos = margin;

  addTitle("1. Resumen Ejecutivo");
  addParagraph(
    "La economía del dato en Europa está experimentando una transformación fundamental: de modelos centralizados controlados por grandes plataformas hacia ecosistemas federados donde cada organización mantiene la soberanía sobre sus datos."
  );
  addParagraph(
    "PROCUREDATA ofrece a Asociaciones Empresariales, Clústeres y Cámaras de Comercio la oportunidad de convertirse en 'Nodos Fundadores' de esta nueva red europea, con financiación pública garantizada y un modelo de negocio probado."
  );

  addSectionTitle("Propuesta de Valor Única");
  addBullet("Soberanía Real: Despliegue su propio nodo en la red Pontus-X con marca blanca.");
  addBullet("Financiación Garantizada: Acceso gestionado al 'Kit Espacio de Datos' (+30.000€).");
  addBullet("Rentabilidad Inmediata: Modelo 'Net Cash Positive' desde el primer año (+25.000€).");
  addBullet("Ingresos Recurrentes: 50% de revenue share en todas las transacciones.");
  addBullet("Sin Riesgo Técnico: ProcureData gestiona toda la infraestructura y compliance.");

  addSectionTitle("¿Para quién es este programa?");
  addBullet("Asociaciones empresariales con +50 miembros activos.");
  addBullet("Clústeres industriales y tecnológicos.");
  addBullet("Cámaras de comercio regionales.");
  addBullet("Federaciones sectoriales (agroalimentario, industrial, servicios).");

  // PAGE 3: Technology
  doc.addPage();
  yPos = margin;

  addTitle("2. Tecnología y Estándares Europeos");
  addParagraph(
    "ProcureData no es una base de datos centralizada ni un SaaS tradicional. Es un orquestador de contratos inteligentes basado en los estándares oficiales de soberanía digital de la Unión Europea."
  );

  addSectionTitle("Arquitectura de Confianza");

  addSubtitle("GAIA-X");
  addParagraph(
    "Marco europeo de identidad soberana (SSI) y credenciales verificables. Permite que cada organización tenga una identidad digital autogestionada reconocida en toda la UE."
  );

  addSubtitle("IDSA (International Data Spaces Association)");
  addParagraph(
    "Protocolo estándar de intercambio seguro de datos entre organizaciones. Los conectores EDC (Eclipse Dataspace Connector) garantizan que los datos solo se comparten según las políticas definidas por el propietario."
  );

  addSubtitle("PONTUS-X (Polygon)");
  addParagraph(
    "Infraestructura blockchain europea sobre Polygon para notarización inmutable de transacciones. Cada intercambio de datos queda registrado de forma transparente e inalterable."
  );

  addSectionTitle("Diferenciación vs. Modelos Tradicionales");
  addBullet(
    "SaaS Centralizado: Sus datos están en servidores de terceros, sin control real."
  );
  addBullet(
    "ProcureData Federado: Los datos permanecen bajo su control hasta el momento exacto del intercambio, regulado por políticas ODRL que usted define."
  );

  // PAGE 4: Governance
  doc.addPage();
  yPos = margin;

  addTitle("3. Modelo de Gobernanza Dual");
  addParagraph(
    "Nuestro modelo se basa en la 'Gobernanza Dual'. Entendemos que una Asociación necesita control político y comercial sobre su ecosistema, mientras se beneficia de una infraestructura tecnológica compartida y segura."
  );

  addSectionTitle("Diagrama de Arquitectura de Poder");
  drawGovernanceDiagram();

  addSectionTitle("Gobernanza Local (Su Territorio)");
  addBullet("Usted decide quién puede unirse a su nodo (validación de miembros).");
  addBullet("Usted define los precios y comisiones para sus asociados.");
  addBullet("Usted controla qué datos son visibles y para quién.");
  addBullet("Su marca, su identidad, su ecosistema.");

  addSectionTitle("Gobernanza Federal (La Red)");
  addBullet("Interoperabilidad técnica con otros nodos europeos.");
  addBullet("Estándares de seguridad GAIA-X aplicados automáticamente.");
  addBullet("Smart Contracts en Polygon para transacciones transparentes.");
  addBullet("Cumplimiento GDPR y regulaciones de espacios de datos.");

  // PAGE 5: Economic Model
  doc.addPage();
  yPos = margin;

  addTitle("4. Modelo Económico");
  addParagraph(
    "Hemos diseñado un modelo financiero sin fricción, aprovechando los fondos NextGenerationEU para subvencionar la entrada de nuevos nodos. El objetivo: que su adhesión sea 'Cash Positive' desde el primer día."
  );

  addSectionTitle("Flujo de Caja - Primer Año");
  drawEconomicDiagram();

  addSectionTitle("Desglose Financiero");
  addKeyValueRow("Subvención (Kit Espacio de Datos):", "+ 30.000 EUR");
  addKeyValueRow("Coste de Adhesión Anual:", "- 5.000 EUR");
  addKeyValueRow("Beneficio Neto Garantizado:", "+ 25.000 EUR");
  yPos += 5;
  addParagraph(
    "Nota: El excedente de 25.000€ puede utilizarse para financiar el despliegue de un nodo propio (Fase 2) sin coste adicional para su organización."
  );

  // PAGE 6: Revenue Share
  doc.addPage();
  yPos = margin;

  addTitle("5. Revenue Share y Comisiones");
  addParagraph(
    "ProcureData aplica un modelo de compartición de ingresos transparente. Como Business Partner, usted recibe un porcentaje significativo de todas las transacciones que ocurren en su nodo."
  );

  addSectionTitle("Estructura de Comisiones");
  drawRevenueTable();

  addSectionTitle("Ejemplo Práctico");
  addParagraph("Supongamos que su asociación tiene:");
  addBullet("100 miembros activos en la plataforma");
  addBullet("Cada miembro realiza 10 transacciones/mes");
  addBullet("Valor medio por transacción: 500€");

  yPos += 5;
  addParagraph("Cálculo de ingresos recurrentes:");
  addKeyValueRow("Volumen mensual:", "100 × 10 × 500€ = 500.000€");
  addKeyValueRow("Fee plataforma (20%):", "100.000€");
  addKeyValueRow("Su comisión (50%):", "50.000€/mes");
  addKeyValueRow("Ingresos anuales:", "600.000€");

  yPos += 5;
  addParagraph(
    "Estos ingresos son adicionales a la subvención inicial y representan una nueva línea de negocio sostenible para su organización."
  );

  // PAGE 7: Roadmap
  doc.addPage();
  yPos = margin;

  addTitle("6. Hoja de Ruta de Activación");
  addParagraph(
    "El proceso de onboarding está diseñado para minimizar la carga operativa de su organización. ProcureData gestiona toda la complejidad técnica y administrativa."
  );

  addSectionTitle("Cronograma de Implementación");

  const timeline = [
    {
      week: "Semana 1-2",
      title: "Firma y Solicitud de Ayuda",
      desc: "Firma del acuerdo de adhesión. ProcureData gestiona íntegramente la solicitud del Kit Espacio de Datos (30.000€).",
    },
    {
      week: "Semana 3-4",
      title: "Despliegue Técnico",
      desc: "Configuración del tenant con su marca. Personalización de la interfaz. Integración con sus sistemas existentes.",
    },
    {
      week: "Semana 5-8",
      title: "Onboarding Piloto",
      desc: "Alta de los primeros 10 asociados piloto. Formación del equipo interno. Pruebas de transacciones.",
    },
    {
      week: "Semana 9-12",
      title: "Lanzamiento Oficial",
      desc: "Apertura del marketplace sectorial. Comunicación a todos los asociados. Primeras transacciones reales.",
    },
  ];

  timeline.forEach((item) => {
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.darkGray);
    doc.text(item.week, margin, yPos);
    doc.text(item.title, margin + 35, yPos);
    yPos += 6;
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.textGray);
    const lines = doc.splitTextToSize(item.desc, contentWidth - 35);
    doc.text(lines, margin + 35, yPos);
    yPos += lines.length * 5 + 8;
  });

  // PAGE 8: CTA
  doc.addPage();
  yPos = margin;

  addTitle("7. Próximos Pasos");
  addParagraph(
    "Para iniciar el proceso de adhesión y reservar su posición como Nodo Fundador del ecosistema ProcureData, siga estos pasos:"
  );

  yPos += 5;
  addBullet("Contacte con el equipo de alianzas estratégicas para una sesión informativa.");
  addBullet("Reciba una propuesta personalizada según el perfil de su organización.");
  addBullet("Firme el acuerdo de adhesión (proceso 100% digital).");
  addBullet("ProcureData gestiona la solicitud de la ayuda de 30.000€.");
  addBullet("En 12 semanas, su marketplace sectorial estará operativo.");

  addSectionTitle("Información de Contacto");
  yPos += 5;
  addKeyValueRow("Email:", "partners@procuredata.eu");
  addKeyValueRow("Web:", "www.procuredata.eu/partners");
  addKeyValueRow("Teléfono:", "+34 900 000 000");

  yPos += 15;

  // Final box
  doc.setFillColor(...COLORS.background);
  doc.setDrawColor(...COLORS.mediumGray);
  doc.rect(margin, yPos, contentWidth, 40, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.darkGray);
  doc.text("¿Listo para liderar la soberanía digital de su sector?", pageWidth / 2, yPos + 15, {
    align: "center",
  });

  doc.setFont("times", "italic");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.textGray);
  doc.text(
    "Únase a los +70 Business Partners que ya están transformando",
    pageWidth / 2,
    yPos + 25,
    { align: "center" }
  );
  doc.text("la economía del dato en Europa.", pageWidth / 2, yPos + 32, { align: "center" });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.lightGray);
  doc.text(
    "© 2025 ProcureData. Documento confidencial. Programa financiado por fondos europeos.",
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );

  // Save
  doc.save("ProcureData_Programa_Partners.pdf");
};
