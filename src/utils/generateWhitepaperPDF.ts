import { jsPDF } from "jspdf";

// Whitepaper PDF Generator - ITBID-X
// Optimized for print with grayscale tones and proper margins

const MARGIN_LEFT = 25;
const MARGIN_RIGHT = 25;
const MARGIN_TOP = 30;
const MARGIN_BOTTOM = 25;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

// Grayscale color palette
const COLORS = {
  black: "#000000",
  darkGray: "#333333",
  mediumGray: "#666666",
  lightGray: "#999999",
  veryLightGray: "#CCCCCC",
  background: "#F5F5F5",
};

export const generateWhitepaperPDF = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  let currentY = MARGIN_TOP;

  // Helper functions
  const addPage = () => {
    doc.addPage();
    currentY = MARGIN_TOP;
  };

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > PAGE_HEIGHT - MARGIN_BOTTOM) {
      addPage();
      return true;
    }
    return false;
  };

  const drawSectionTitle = (number: string, title: string) => {
    checkPageBreak(20);
    doc.setFontSize(10);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(`${number} —`, MARGIN_LEFT, currentY);
    currentY += 8;
    doc.setFontSize(18);
    doc.setTextColor(COLORS.darkGray);
    doc.text(title, MARGIN_LEFT, currentY);
    currentY += 12;
  };

  const drawParagraph = (text: string, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(COLORS.mediumGray);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
    lines.forEach((line: string) => {
      checkPageBreak(6);
      doc.text(line, MARGIN_LEFT, currentY);
      currentY += 5;
    });
    currentY += 3;
  };

  const drawSubtitle = (text: string) => {
    checkPageBreak(12);
    doc.setFontSize(12);
    doc.setTextColor(COLORS.darkGray);
    doc.text(text, MARGIN_LEFT, currentY);
    currentY += 8;
  };

  const drawBulletPoint = (text: string) => {
    checkPageBreak(8);
    doc.setFontSize(10);
    doc.setTextColor(COLORS.mediumGray);
    doc.text("•", MARGIN_LEFT, currentY);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - 8);
    lines.forEach((line: string, i: number) => {
      doc.text(line, MARGIN_LEFT + 8, currentY + (i * 5));
    });
    currentY += lines.length * 5 + 2;
  };

  const drawBox = (title: string, content: string[], width: number = CONTENT_WIDTH / 3 - 5) => {
    const boxHeight = 40;
    checkPageBreak(boxHeight + 5);
    
    doc.setFillColor(COLORS.background);
    doc.setDrawColor(COLORS.veryLightGray);
    doc.roundedRect(MARGIN_LEFT, currentY, width, boxHeight, 2, 2, "FD");
    
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(title, MARGIN_LEFT + 5, currentY + 8);
    
    doc.setFontSize(8);
    doc.setTextColor(COLORS.mediumGray);
    content.forEach((line, i) => {
      doc.text(line, MARGIN_LEFT + 5, currentY + 16 + (i * 5));
    });
  };

  const drawFooter = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setTextColor(COLORS.lightGray);
    doc.text(`ITBID-X Whitepaper Técnico v1.0 — Página ${pageNum}`, MARGIN_LEFT, PAGE_HEIGHT - 10);
    doc.text("PROCUREDATA × ITBID", PAGE_WIDTH - MARGIN_RIGHT - 40, PAGE_HEIGHT - 10);
  };

  // ===== COVER PAGE =====
  doc.setFontSize(14);
  doc.setTextColor(COLORS.darkGray);
  doc.text("PROCUREDATA × ITBID", PAGE_WIDTH / 2, 60, { align: "center" });

  doc.setFontSize(32);
  doc.setTextColor(COLORS.black);
  doc.text("ITBID-X", PAGE_WIDTH / 2, 90, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(COLORS.darkGray);
  doc.text("Hacia la Cadena de", PAGE_WIDTH / 2, 105, { align: "center" });
  doc.text("Suministro Soberana", PAGE_WIDTH / 2, 115, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(COLORS.mediumGray);
  const subtitle = "Implementación de un Espacio de Datos Federado Gaia-X para la Interoperabilidad Industrial Europea";
  const subtitleLines = doc.splitTextToSize(subtitle, 140);
  subtitleLines.forEach((line: string, i: number) => {
    doc.text(line, PAGE_WIDTH / 2, 135 + (i * 6), { align: "center" });
  });

  // Trust badges
  doc.setFontSize(9);
  doc.setTextColor(COLORS.mediumGray);
  doc.text("Gaia-X Compliant  |  IDSA Standard  |  Web3 Enabled", PAGE_WIDTH / 2, 165, { align: "center" });

  // Version info
  doc.setFontSize(10);
  doc.setTextColor(COLORS.lightGray);
  doc.text("Whitepaper Técnico v1.0", PAGE_WIDTH / 2, 250, { align: "center" });
  doc.text("Enero 2026", PAGE_WIDTH / 2, 258, { align: "center" });

  // ===== PAGE 2: TABLE OF CONTENTS =====
  addPage();
  doc.setFontSize(20);
  doc.setTextColor(COLORS.darkGray);
  doc.text("Índice de Contenidos", MARGIN_LEFT, currentY);
  currentY += 15;

  const tocItems = [
    { num: "01", title: "Resumen Ejecutivo", page: 3 },
    { num: "02", title: "Contexto Gaia-X", page: 4 },
    { num: "03", title: "Modelo Tripartito IDSA", page: 5 },
    { num: "04", title: "Beneficios por Stakeholder", page: 6 },
    { num: "05", title: "Flujo de Datos Federado", page: 7 },
    { num: "06", title: "Gobernanza ODRL", page: 8 },
    { num: "07", title: "Seguridad Híbrida Web2/Web3", page: 9 },
    { num: "08", title: "Casos de Uso", page: 10 },
    { num: "09", title: "Especificaciones Técnicas", page: 11 },
    { num: "10", title: "Glosario de Términos", page: 12 },
  ];

  doc.setFontSize(11);
  tocItems.forEach((item) => {
    doc.setTextColor(COLORS.mediumGray);
    doc.text(item.num, MARGIN_LEFT, currentY);
    doc.setTextColor(COLORS.darkGray);
    doc.text(item.title, MARGIN_LEFT + 15, currentY);
    doc.setTextColor(COLORS.lightGray);
    doc.text(String(item.page), PAGE_WIDTH - MARGIN_RIGHT - 10, currentY);
    
    // Dotted line
    doc.setDrawColor(COLORS.veryLightGray);
    const titleWidth = doc.getTextWidth(item.title);
    for (let x = MARGIN_LEFT + 20 + titleWidth; x < PAGE_WIDTH - MARGIN_RIGHT - 15; x += 3) {
      doc.circle(x, currentY - 1, 0.3, "F");
    }
    currentY += 8;
  });

  drawFooter(2);

  // ===== PAGE 3: EXECUTIVE SUMMARY =====
  addPage();
  drawSectionTitle("01", "Resumen Ejecutivo");

  drawParagraph("ITBID-X representa la evolución estratégica de ITBID hacia un modelo de contratación pública y privada basado en la soberanía del dato y la interoperabilidad europea.");

  drawSubtitle("De la Digitalización a la Federación");
  drawParagraph("La transformación digital del sector procurement ha alcanzado un punto de inflexión. Ya no basta con digitalizar documentos; es necesario federar la confianza entre organizaciones.");

  drawSubtitle("Propuesta de Valor");
  drawBulletPoint("Cumplimiento normativo: Alineación con Data Act, CSRD y regulación europea");
  drawBulletPoint("Interoperabilidad: Conexión nativa con 250+ espacios de datos Gaia-X");
  drawBulletPoint("Soberanía: Control total sobre los datos con políticas ODRL ejecutables");
  drawBulletPoint("Transparencia: Registro inmutable de todas las transacciones en blockchain");

  drawSubtitle("Métricas Clave");
  currentY += 5;
  
  // Metrics boxes in a row
  const metrics = [
    { value: "250+", label: "Dataspaces Gaia-X" },
    { value: "100%", label: "CSRD Compliant" },
    { value: "<100ms", label: "Latencia API" },
  ];

  const boxWidth = (CONTENT_WIDTH - 10) / 3;
  metrics.forEach((metric, i) => {
    const xPos = MARGIN_LEFT + (i * (boxWidth + 5));
    doc.setFillColor(COLORS.background);
    doc.roundedRect(xPos, currentY, boxWidth, 25, 2, 2, "F");
    doc.setFontSize(16);
    doc.setTextColor(COLORS.darkGray);
    doc.text(metric.value, xPos + boxWidth / 2, currentY + 12, { align: "center" });
    doc.setFontSize(8);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(metric.label, xPos + boxWidth / 2, currentY + 20, { align: "center" });
  });
  currentY += 35;

  drawFooter(3);

  // ===== PAGE 4: GAIA-X CONTEXT =====
  addPage();
  drawSectionTitle("02", "Contexto Gaia-X");

  drawParagraph("Gaia-X es una iniciativa europea para crear una infraestructura de datos federada, segura y soberana, con estándares comunes de interoperabilidad y confianza.");

  drawSubtitle("Pilares Tecnológicos");

  const pillars = [
    { title: "Soberanía", desc: "Control total sobre el dato. Cada organización decide quién accede, cuándo y bajo qué condiciones." },
    { title: "Interoperabilidad", desc: "Conectividad sin fricciones entre espacios de datos europeos mediante protocolos estandarizados." },
    { title: "Confianza", desc: "Verificación descentralizada de identidades y credenciales mediante blockchain y SSI." },
  ];

  pillars.forEach((pillar) => {
    checkPageBreak(25);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 22, 2, 2, "F");
    doc.setFontSize(11);
    doc.setTextColor(COLORS.darkGray);
    doc.text(pillar.title, MARGIN_LEFT + 5, currentY + 8);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    const descLines = doc.splitTextToSize(pillar.desc, CONTENT_WIDTH - 10);
    doc.text(descLines, MARGIN_LEFT + 5, currentY + 15);
    currentY += 28;
  });

  drawSubtitle("Comparativa: Data Lakes vs. Espacios Federados");
  currentY += 5;

  // Comparison table
  const tableData = [
    { aspect: "Control de datos", traditional: "Centralizado", federated: "Distribuido" },
    { aspect: "Gobernanza", traditional: "Propietaria", federated: "ODRL/Gaia-X" },
    { aspect: "Interoperabilidad", traditional: "Limitada", federated: "Nativa" },
    { aspect: "Trazabilidad", traditional: "Logs internos", federated: "Blockchain" },
    { aspect: "Cumplimiento", traditional: "Manual", federated: "Automatizado" },
  ];

  doc.setFontSize(9);
  // Header
  doc.setFillColor(COLORS.darkGray);
  doc.rect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 8, "F");
  doc.setTextColor("#FFFFFF");
  doc.text("Aspecto", MARGIN_LEFT + 5, currentY + 5);
  doc.text("Data Lake Tradicional", MARGIN_LEFT + 55, currentY + 5);
  doc.text("Espacio Federado", MARGIN_LEFT + 115, currentY + 5);
  currentY += 8;

  tableData.forEach((row, i) => {
    const bgColor = i % 2 === 0 ? COLORS.background : "#FFFFFF";
    doc.setFillColor(bgColor);
    doc.rect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 7, "F");
    doc.setTextColor(COLORS.darkGray);
    doc.text(row.aspect, MARGIN_LEFT + 5, currentY + 5);
    doc.setTextColor(COLORS.lightGray);
    doc.text(row.traditional, MARGIN_LEFT + 55, currentY + 5);
    doc.setTextColor(COLORS.darkGray);
    doc.text(row.federated, MARGIN_LEFT + 115, currentY + 5);
    currentY += 7;
  });

  drawFooter(4);

  // ===== PAGE 5: TRIPARTITE MODEL =====
  addPage();
  drawSectionTitle("03", "Modelo Tripartito IDSA");

  drawParagraph("El modelo tripartito de la International Data Spaces Association (IDSA) define tres roles fundamentales que garantizan la separación de responsabilidades en el intercambio de datos.");

  const roles = [
    {
      title: "Data Subject (Propietario)",
      desc: "Entidad que posee los datos originales y tiene autoridad legal sobre su uso.",
      responsibilities: ["Define políticas ODRL", "Autoriza accesos", "Revoca permisos"]
    },
    {
      title: "Data Holder (Custodio)",
      desc: "Entidad neutral que almacena y entrega los datos verificando credenciales.",
      responsibilities: ["Almacena datos cifrados", "Verifica credenciales", "Ejecuta políticas"]
    },
    {
      title: "Data Consumer (Solicitante)",
      desc: "Entidad que solicita acceso a datos para un propósito específico.",
      responsibilities: ["Presenta credenciales", "Acepta términos", "Utiliza datos"]
    },
  ];

  roles.forEach((role) => {
    checkPageBreak(40);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 35, 2, 2, "F");
    
    doc.setFontSize(11);
    doc.setTextColor(COLORS.darkGray);
    doc.text(role.title, MARGIN_LEFT + 5, currentY + 8);
    
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    const descLines = doc.splitTextToSize(role.desc, CONTENT_WIDTH - 10);
    doc.text(descLines, MARGIN_LEFT + 5, currentY + 15);
    
    doc.setFontSize(8);
    role.responsibilities.forEach((resp, i) => {
      doc.text(`• ${resp}`, MARGIN_LEFT + 5, currentY + 25 + (i * 4));
    });
    
    currentY += 40;
  });

  drawFooter(5);

  // ===== PAGE 6: STAKEHOLDER BENEFITS =====
  addPage();
  drawSectionTitle("04", "Beneficios por Stakeholder");

  const stakeholders = [
    {
      title: "Para el Comprador",
      benefits: [
        "Acceso verificado a datos de proveedores pre-cualificados",
        "Reducción del 60% en tiempo de due diligence",
        "Trazabilidad completa de la cadena de suministro",
        "Cumplimiento automático con CSRD y Data Act"
      ]
    },
    {
      title: "Para el Proveedor",
      benefits: [
        "Monetización de datos ESG ya generados",
        "Control granular sobre quién accede a sus datos",
        "Diferenciación competitiva por transparencia",
        "Reducción de solicitudes duplicadas de información"
      ]
    },
    {
      title: "Para ITBID",
      benefits: [
        "Nuevo modelo de ingresos por transacción de datos",
        "Posicionamiento como hub Gaia-X sectorial",
        "Lock-in positivo por efectos de red",
        "Ventaja competitiva tecnológica sostenible"
      ]
    },
  ];

  stakeholders.forEach((stakeholder) => {
    checkPageBreak(45);
    drawSubtitle(stakeholder.title);
    stakeholder.benefits.forEach((benefit) => {
      drawBulletPoint(benefit);
    });
    currentY += 5;
  });

  drawFooter(6);

  // ===== PAGE 7: FEDERATED FLOW =====
  addPage();
  drawSectionTitle("05", "Flujo de Datos Federado");

  drawParagraph("El intercambio de datos en ITBID-X sigue un proceso de 7 pasos que garantiza la verificación, autorización y trazabilidad de cada transacción.");

  const flowSteps = [
    { step: "1", title: "Descubrimiento", desc: "El Consumer busca datos en el catálogo federado" },
    { step: "2", title: "Solicitud", desc: "Envío de petición con propósito y credenciales DID" },
    { step: "3", title: "Pre-autorización", desc: "El Data Subject pre-aprueba la solicitud" },
    { step: "4", title: "Verificación", desc: "El Holder valida credenciales contra Gaia-X Trust Framework" },
    { step: "5", title: "Política ODRL", desc: "Generación automática de contrato ejecutable" },
    { step: "6", title: "Transferencia", desc: "Entrega cifrada de datos al Consumer" },
    { step: "7", title: "Registro", desc: "Hash de transacción en blockchain Pontus-X" },
  ];

  flowSteps.forEach((step) => {
    checkPageBreak(18);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 14, 2, 2, "F");
    
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(step.step, MARGIN_LEFT + 5, currentY + 9);
    doc.text(step.title, MARGIN_LEFT + 15, currentY + 9);
    
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(step.desc, MARGIN_LEFT + 55, currentY + 9);
    
    currentY += 18;
  });

  drawFooter(7);

  // ===== PAGE 8: ODRL GOVERNANCE =====
  addPage();
  drawSectionTitle("06", "Gobernanza ODRL");

  drawParagraph("ODRL (Open Digital Rights Language) es el estándar W3C para expresar políticas de uso de datos de forma que las máquinas puedan interpretarlas y ejecutarlas automáticamente.");

  drawSubtitle("Componentes de una Política ODRL");

  const odrlComponents = [
    { title: "Permissions", desc: "Acciones permitidas sobre el dato (leer, analizar, compartir)" },
    { title: "Prohibitions", desc: "Acciones explícitamente prohibidas (redistribuir, exportar fuera UE)" },
    { title: "Duties", desc: "Obligaciones del consumidor (atribuir origen, notificar uso)" },
    { title: "Constraints", desc: "Condiciones de ejecución (período temporal, ubicación geográfica)" },
  ];

  odrlComponents.forEach((comp) => {
    checkPageBreak(20);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 16, 2, 2, "F");
    
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(comp.title, MARGIN_LEFT + 5, currentY + 7);
    
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(comp.desc, MARGIN_LEFT + 40, currentY + 7);
    
    currentY += 20;
  });

  drawSubtitle("Revocación Instantánea");
  drawParagraph("Cuando un Data Subject revoca un permiso, el sistema propaga la invalidación en tiempo real a todos los puntos de acceso, registrando el evento en blockchain para auditoría.");

  drawFooter(8);

  // ===== PAGE 9: SECURITY FRAMEWORK =====
  addPage();
  drawSectionTitle("07", "Seguridad Híbrida Web2/Web3");

  drawParagraph("ITBID-X implementa una arquitectura de seguridad híbrida que combina las fortalezas de sistemas Web2 tradicionales con la descentralización de Web3.");

  drawSubtitle("Capa Web2 (Infraestructura)");
  drawBulletPoint("PostgreSQL con Row Level Security (RLS) para aislamiento multi-tenant");
  drawBulletPoint("Autenticación JWT con refresh tokens y expiración configurable");
  drawBulletPoint("Cifrado AES-256 en reposo y TLS 1.3 en tránsito");
  drawBulletPoint("Edge Functions para lógica serverless aislada");

  drawSubtitle("Capa Web3 (Confianza)");
  drawBulletPoint("Identidades DID:ethr verificables en blockchain");
  drawBulletPoint("Smart contracts para registro inmutable de transacciones");
  drawBulletPoint("Red Pontus-X compatible con Gaia-X Trust Framework");
  drawBulletPoint("Pagos verificables con EUROe (stablecoin ERC-20)");

  drawSubtitle("Configuración de Red");
  currentY += 5;
  const networkConfig = [
    { key: "Chain ID", value: "0x7ecc (32460)" },
    { key: "Red", value: "Pontus-X Testnet" },
    { key: "RPC URL", value: "rpc.test.pontus-x.eu" },
    { key: "Token Nativo", value: "EUROe (Stablecoin)" },
  ];

  doc.setFillColor(COLORS.background);
  doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 35, 2, 2, "F");
  
  networkConfig.forEach((config, i) => {
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(config.key, MARGIN_LEFT + 5, currentY + 8 + (i * 8));
    doc.setTextColor(COLORS.darkGray);
    doc.text(config.value, MARGIN_LEFT + 50, currentY + 8 + (i * 8));
  });

  drawFooter(9);

  // ===== PAGE 10: USE CASES =====
  addPage();
  drawSectionTitle("08", "Casos de Uso");

  const useCases = [
    {
      title: "Trazabilidad ESG en Cadenas de Suministro",
      desc: "Verificación automática de certificaciones ambientales y sociales de proveedores multinivel.",
      impact: "Reducción 70% tiempo auditoría"
    },
    {
      title: "Due Diligence Automatizada",
      desc: "Acceso verificado a datos financieros, legales y operativos de potenciales proveedores.",
      impact: "De 3 semanas a 48 horas"
    },
    {
      title: "Pasaporte Digital de Producto",
      desc: "Registro inmutable de origen, transformaciones y certificaciones de productos industriales.",
      impact: "100% trazabilidad materiales"
    },
    {
      title: "Marketplace de Datos Sectoriales",
      desc: "Comercialización segura de datasets industriales con contratos ejecutables.",
      impact: "Nueva línea de ingresos"
    },
    {
      title: "Compliance CSRD Automatizado",
      desc: "Agregación automática de datos ESG de proveedores para reporting corporativo.",
      impact: "Cumplimiento garantizado"
    },
  ];

  useCases.forEach((useCase) => {
    checkPageBreak(30);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 25, 2, 2, "F");
    
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(useCase.title, MARGIN_LEFT + 5, currentY + 8);
    
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    const descLines = doc.splitTextToSize(useCase.desc, CONTENT_WIDTH - 60);
    doc.text(descLines, MARGIN_LEFT + 5, currentY + 15);
    
    doc.setFontSize(8);
    doc.setTextColor(COLORS.darkGray);
    doc.text(useCase.impact, PAGE_WIDTH - MARGIN_RIGHT - 50, currentY + 12);
    
    currentY += 30;
  });

  drawFooter(10);

  // ===== PAGE 11: TECHNICAL SPECS =====
  addPage();
  drawSectionTitle("09", "Especificaciones Técnicas");

  drawSubtitle("Stack Frontend");
  const frontend = [
    "React 18.3.1 - Biblioteca de UI con hooks",
    "Vite - Bundler con HMR instantáneo",
    "TypeScript 5.x - Tipado estático",
    "Tailwind CSS 3.x - Sistema de diseño tokenizado",
    "Framer Motion - Animaciones declarativas",
  ];
  frontend.forEach((tech) => drawBulletPoint(tech));

  drawSubtitle("Stack Backend");
  const backend = [
    "PostgreSQL 15.x - Base de datos con RLS (28 tablas)",
    "Autenticación JWT - Refresh tokens seguros",
    "Edge Functions (Deno) - Serverless backend",
    "WebSockets - Suscripciones en tiempo real",
  ];
  backend.forEach((tech) => drawBulletPoint(tech));

  drawSubtitle("Stack Web3");
  const web3 = [
    "Ethers.js 6.16.0 - Interacción blockchain EVM",
    "Pontus-X Testnet - Red blockchain Gaia-X",
    "EUROe Token (ERC-20) - Stablecoin para pagos",
    "DID:ethr (W3C) - Identificadores descentralizados",
  ];
  web3.forEach((tech) => drawBulletPoint(tech));

  drawSubtitle("Endpoints API Principales");
  currentY += 3;
  const endpoints = [
    { method: "GET", path: "/api/v1/organizations", desc: "Buscar organizaciones" },
    { method: "POST", path: "/api/v1/transactions", desc: "Iniciar solicitud" },
    { method: "GET", path: "/api/v1/wallet/balance", desc: "Consultar saldo" },
    { method: "POST", path: "/api/v1/policies", desc: "Crear política ODRL" },
  ];

  doc.setFontSize(8);
  endpoints.forEach((ep) => {
    checkPageBreak(7);
    doc.setTextColor(COLORS.darkGray);
    doc.text(ep.method, MARGIN_LEFT, currentY);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(ep.path, MARGIN_LEFT + 15, currentY);
    doc.text(ep.desc, MARGIN_LEFT + 80, currentY);
    currentY += 6;
  });

  drawFooter(11);

  // ===== PAGE 12: GLOSSARY =====
  addPage();
  drawSectionTitle("10", "Glosario de Términos");

  const glossary = [
    { term: "DID", full: "Decentralized Identifier", desc: "Identificador único descentralizado" },
    { term: "ODRL", full: "Open Digital Rights Language", desc: "Lenguaje estándar W3C para políticas de datos" },
    { term: "EDC", full: "Eclipse Dataspace Connector", desc: "Conector IDS para transferencia segura" },
    { term: "Gaia-X", full: "European Data Infrastructure", desc: "Infraestructura federada europea" },
    { term: "SSI", full: "Self-Sovereign Identity", desc: "Identidad digital auto-soberana" },
    { term: "RLS", full: "Row Level Security", desc: "Seguridad a nivel de fila en BD" },
    { term: "EUROe", full: "Euro Stablecoin", desc: "Token ERC-20 anclado 1:1 al Euro" },
    { term: "IDSA", full: "International Data Spaces Association", desc: "Estándares para espacios de datos" },
    { term: "CSRD", full: "Corporate Sustainability Reporting", desc: "Directiva de reporting ESG" },
    { term: "Pontus-X", full: "Gaia-X Blockchain Network", desc: "Red blockchain del ecosistema Gaia-X" },
  ];

  glossary.forEach((item) => {
    checkPageBreak(15);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 12, 2, 2, "F");
    
    doc.setFontSize(9);
    doc.setTextColor(COLORS.darkGray);
    doc.text(item.term, MARGIN_LEFT + 5, currentY + 8);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(`(${item.full})`, MARGIN_LEFT + 25, currentY + 8);
    doc.text(item.desc, MARGIN_LEFT + 90, currentY + 8);
    
    currentY += 15;
  });

  drawFooter(12);

  // ===== FINAL PAGE: CLOSING =====
  addPage();
  currentY = 100;
  
  doc.setFontSize(24);
  doc.setTextColor(COLORS.darkGray);
  doc.text("ITBID-X", PAGE_WIDTH / 2, currentY, { align: "center" });
  
  currentY += 15;
  doc.setFontSize(12);
  doc.setTextColor(COLORS.mediumGray);
  doc.text("De digitalizar documentos a federar la confianza", PAGE_WIDTH / 2, currentY, { align: "center" });
  
  currentY += 30;
  doc.setFontSize(10);
  doc.text("PROCUREDATA × ITBID", PAGE_WIDTH / 2, currentY, { align: "center" });
  
  currentY += 15;
  doc.setFontSize(9);
  doc.setTextColor(COLORS.lightGray);
  doc.text("© 2026 PROCUREDATA. Todos los derechos reservados.", PAGE_WIDTH / 2, currentY, { align: "center" });
  doc.text("Documento confidencial - Uso interno y partners autorizados", PAGE_WIDTH / 2, currentY + 8, { align: "center" });

  // Save the PDF
  doc.save("ITBID-X_Whitepaper_Tecnico_v1.0.pdf");
  
  return doc;
};
