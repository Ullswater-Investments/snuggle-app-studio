import { jsPDF } from 'jspdf';

export function generateTechnicalDocPDF() {
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

  // Colors (grayscale for printing)
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
    doc.text(`PROCUREDATA v3.1 — Documento Técnico`, marginLeft, pageHeight - 12);
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
    
    // Box background
    doc.setFillColor(colors.veryLightGray);
    doc.roundedRect(marginLeft, currentY - 4, contentWidth, boxHeight, 2, 2, 'F');
    
    // Title
    doc.setFontSize(10);
    doc.setTextColor(colors.darkGray);
    doc.setFont('helvetica', 'bold');
    doc.text(title, marginLeft + 4, currentY + 2);
    doc.setFont('helvetica', 'normal');
    
    currentY += 8;
    
    // Content
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
    
    // Header
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
    
    // Rows
    rows.forEach((row, rowIndex) => {
      if (rowIndex % 2 === 0) {
        doc.setFillColor(colors.veryLightGray);
        doc.rect(marginLeft, currentY - 4, contentWidth, rowHeight, 'F');
      }
      
      row.forEach((cell, i) => {
        const truncated = cell.length > 25 ? cell.substring(0, 22) + '...' : cell;
        doc.text(truncated, marginLeft + i * colWidth + 2, currentY);
      });
      
      currentY += rowHeight;
    });
    
    currentY += 6;
  };

  const drawCodeBlock = (code: string[]) => {
    const blockHeight = code.length * 4.5 + 8;
    checkPageBreak(blockHeight);
    
    doc.setFillColor('#F5F5F5');
    doc.roundedRect(marginLeft, currentY - 4, contentWidth, blockHeight, 2, 2, 'F');
    
    doc.setFontSize(8);
    doc.setTextColor(colors.darkGray);
    doc.setFont('courier', 'normal');
    
    currentY += 2;
    for (const line of code) {
      const truncated = line.length > 70 ? line.substring(0, 67) + '...' : line;
      doc.text(truncated, marginLeft + 4, currentY);
      currentY += 4.5;
    }
    
    doc.setFont('helvetica', 'normal');
    currentY += 8;
  };

  // ==================== COVER PAGE ====================
  currentY = 80;
  
  doc.setFontSize(36);
  doc.setTextColor(colors.black);
  doc.setFont('helvetica', 'bold');
  doc.text('PROCUREDATA', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 20;
  doc.setFontSize(16);
  doc.setTextColor(colors.mediumGray);
  doc.text('DOCUMENTO TÉCNICO v3.1', pageWidth / 2, currentY, { align: 'center' });
  
  currentY += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Plataforma de Soberanía de Datos', pageWidth / 2, currentY, { align: 'center' });
  currentY += 6;
  doc.text('para Cadenas de Suministro', pageWidth / 2, currentY, { align: 'center' });
  
  // Divider
  currentY += 20;
  doc.setDrawColor(colors.lightGray);
  doc.setLineWidth(0.5);
  doc.line(60, currentY, 150, currentY);
  
  // Badges
  currentY += 25;
  doc.setFontSize(10);
  doc.setTextColor(colors.darkGray);
  const badges = ['✓ Production-Ready', '✓ Web3 Enabled', '✓ Gaia-X Compliant', '✓ IDSA Aligned'];
  badges.forEach((badge, i) => {
    doc.text(badge, pageWidth / 2, currentY + i * 8, { align: 'center' });
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
    { num: '01', title: 'Changelog v3.0 → v3.1', page: 3 },
    { num: '02', title: 'Visión General del Sistema', page: 4 },
    { num: '03', title: 'Arquitectura de la Plataforma', page: 6 },
    { num: '04', title: 'Componentes del Data Space (Gaia-X)', page: 9 },
    { num: '05', title: 'Catálogo de Componentes Técnicos', page: 12 },
    { num: '06', title: 'Hooks Personalizados', page: 15 },
    { num: '07', title: 'Interfaces y Páginas Principales', page: 18 },
    { num: '08', title: 'Personas de Usuario (Roles Técnicos)', page: 20 },
    { num: '09', title: 'Modelo de Gobernanza Técnica', page: 22 },
    { num: '10', title: 'Seguridad y Auditoría', page: 24 },
    { num: '11', title: 'Casos de Uso Principales', page: 26 },
    { num: '12', title: 'Mejoras de UX v3.1', page: 28 },
    { num: '13', title: 'Edge Functions', page: 29 },
    { num: '14', title: 'Guía de Desarrollo', page: 30 },
    { num: '15', title: 'Estado de Auditoría', page: 31 },
    { num: '16', title: 'Anexos: Esquema de Base de Datos', page: 32 },
    { num: '17', title: 'Historial de Versiones', page: 34 },
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
    
    // Dotted line
    doc.setDrawColor(colors.veryLightGray);
    doc.setLineDashPattern([1, 1], 0);
    const titleWidth = doc.getTextWidth(item.title);
    doc.line(marginLeft + 12 + titleWidth + 2, currentY, pageWidth - marginRight - 10, currentY);
    doc.setLineDashPattern([], 0);
    
    currentY += 8;
  });
  
  drawFooter();

  // ==================== SECTION 1: CHANGELOG ====================
  addPage();
  drawSectionTitle('01', 'Changelog v3.0 → v3.1');
  
  drawSubtitle('Integración Web3 Completa');
  drawBullet('Web3StatusWidget: Widget unificado mostrando estado de conexión, wallet y DID');
  drawBullet('AuthContext híbrido: Soporte simultáneo para Supabase Auth y wallet Web3');
  drawBullet('useWeb3Wallet hook: Gestión de conexión MetaMask con estado persistente');
  drawBullet('pontusXService: Servicio completo para interacción con blockchain Pontus-X');
  currentY += 5;
  
  drawSubtitle('Capacidades Tiempo Real');
  drawBullet('ActivityFeed: Feed de actividad con Supabase Realtime para org actual');
  drawBullet('Notificaciones push en tiempo real vía canal WebSocket');
  currentY += 5;
  
  drawSubtitle('Mejoras de Experiencia de Usuario');
  drawBullet('Estados de carga individuales (processingId) por acción');
  drawBullet('Diálogos de confirmación antes de acciones críticas');
  drawBullet('Skeleton loaders consistentes durante cargas');
  drawBullet('EmptyState component reutilizable');
  currentY += 5;
  
  drawSubtitle('Seguridad y Privacidad');
  drawBullet('usePrivacyPreferences hook con actualización optimista');
  drawBullet('Rollback automático si falla la persistencia');
  
  drawFooter();

  // ==================== SECTION 2: VISION GENERAL ====================
  addPage();
  drawSectionTitle('02', 'Visión General del Sistema');
  
  drawParagraph('PROCUREDATA es una plataforma de soberanía de datos diseñada para cadenas de suministro. A diferencia de los marketplaces de datos tradicionales, PROCUREDATA no almacena datos sino que orquesta acuerdos soberanos entre las partes.');
  
  drawSubtitle('Modelo de Roles Tripartito (IDSA)');
  
  drawBox('Consumer (Consumidor)', [
    'Solicita acceso a datos de proveedores',
    'Especifica propósito y justificación',
    'Recibe datos tras aprobación del flujo completo'
  ]);
  
  drawBox('Provider (Proveedor)', [
    'Posee datos originales del sujeto',
    'Primer aprobador en el flujo de consentimiento',
    'Puede denegar o pre-aprobar solicitudes'
  ]);
  
  drawBox('Data Holder (Custodio)', [
    'Mantiene infraestructura de almacenamiento',
    'Segundo aprobador (tras Provider)',
    'Ejecuta entrega final de datos'
  ]);
  
  drawSubtitle('Arquitectura Híbrida Web2/Web3');
  drawParagraph('La plataforma combina la robustez de Supabase (PostgreSQL, Auth, Edge Functions) con la trazabilidad inmutable de blockchain Pontus-X para crear un sistema que es tanto práctico como verificable.');
  
  drawTable(
    ['Capa', 'Tecnología', 'Propósito'],
    [
      ['Web2', 'Supabase/PostgreSQL', 'Datos operativos, Auth, RLS'],
      ['Web3', 'Pontus-X Testnet', 'Trazabilidad, DIDs, Pagos EUROe'],
      ['Identidad', 'did:ethr', 'Identificadores descentralizados'],
    ]
  );
  
  drawFooter();

  // ==================== SECTION 3: ARQUITECTURA ====================
  addPage();
  drawSectionTitle('03', 'Arquitectura de la Plataforma');
  
  drawSubtitle('Stack Tecnológico Completo');
  
  drawBox('Frontend', [
    'React 18.3.1 con TypeScript',
    'Vite como bundler',
    'Tailwind CSS + Shadcn/UI',
    'TanStack Query para estado servidor',
    'React Hook Form + Zod para formularios'
  ]);
  
  drawBox('Backend (Lovable Cloud)', [
    'PostgreSQL con Row Level Security (RLS)',
    'Supabase Auth (email, magic link)',
    'Edge Functions (Deno runtime)',
    'Supabase Realtime (WebSockets)'
  ]);
  
  drawBox('Web3 Layer', [
    'Ethers.js v6 para interacción blockchain',
    'Pontus-X Testnet (Gaia-X compatible)',
    'EUROe stablecoin para pagos',
    'DIDs con método did:ethr'
  ]);
  
  drawSubtitle('Flujo de Datos Principal');
  drawParagraph('1. Consumer crea solicitud especificando asset, propósito y duración');
  drawParagraph('2. Sistema notifica a Provider (subject_org) de la solicitud pendiente');
  drawParagraph('3. Provider revisa y pre-aprueba o deniega');
  drawParagraph('4. Si pre-aprobado, Data Holder recibe notificación');
  drawParagraph('5. Holder aprueba y ejecuta transferencia de datos');
  drawParagraph('6. Transacción se registra en blockchain para trazabilidad');
  
  drawFooter();
  
  // Page 2 of Architecture
  addPage();
  
  drawSubtitle('Máquina de Estados de Transacción');
  
  drawCodeBlock([
    'Estados posibles:',
    '  initiated        → Solicitud creada por consumer',
    '  pending_subject  → Esperando aprobación de provider',
    '  pending_holder   → Provider aprobó, esperando holder',
    '  approved         → Ambos aprobaron, pendiente entrega',
    '  completed        → Datos entregados exitosamente',
    '  denied_subject   → Provider denegó la solicitud',
    '  denied_holder    → Holder denegó la solicitud',
    '  cancelled        → Consumer canceló la solicitud'
  ]);
  
  drawSubtitle('Estructura de Proyecto');
  
  drawCodeBlock([
    'src/',
    '├── components/     # Componentes React reutilizables',
    '│   ├── ui/         # Shadcn/UI base components',
    '│   └── ...         # Feature components',
    '├── pages/          # Rutas de la aplicación',
    '├── hooks/          # Custom React hooks',
    '├── services/       # Servicios externos (pontusX)',
    '├── types/          # TypeScript definitions',
    '├── lib/            # Utilidades (cn, constants)',
    '└── integrations/   # Supabase client & types',
    '',
    'supabase/',
    '├── functions/      # Edge Functions (Deno)',
    '├── migrations/     # SQL migrations',
    '└── config.toml     # Project config'
  ]);
  
  drawFooter();

  // ==================== SECTION 4: GAIA-X COMPONENTS ====================
  addPage();
  drawSectionTitle('04', 'Componentes del Data Space (Gaia-X)');
  
  drawSubtitle('Self-Sovereign Identity (SSI)');
  drawParagraph('La plataforma implementa identidad auto-soberana mediante DIDs (Decentralized Identifiers) siguiendo el estándar W3C. Cada organización puede generar su DID único vinculado a su wallet Ethereum.');
  
  drawCodeBlock([
    'interface DecentralizedIdentifier {',
    '  did: string;           // "did:ethr:0x1234..."',
    '  controller: string;    // Wallet address',
    '  created: Date;',
    '  publicKey: string;',
    '}'
  ]);
  
  drawSubtitle('Data Connector (PontusXService)');
  drawParagraph('El servicio pontusXService actúa como conector de datos, facilitando la interacción con la blockchain Pontus-X:');
  
  drawTable(
    ['Método', 'Descripción'],
    [
      ['connectWallet()', 'Conecta MetaMask al usuario'],
      ['getBalance()', 'Obtiene saldo en wei'],
      ['getEUROeBalance()', 'Obtiene saldo de stablecoin'],
      ['generateDID()', 'Genera DID desde wallet'],
      ['switchNetwork()', 'Cambia a red Pontus-X'],
    ]
  );
  
  drawSubtitle('Catálogo Federado');
  drawParagraph('La vista marketplace_listings proporciona un catálogo unificado de assets disponibles, combinando información de productos, proveedores y precios.');
  
  drawSubtitle('Políticas de Uso (ODRL)');
  drawParagraph('Cada transacción genera automáticamente una política ODRL que especifica permisos, prohibiciones y obligaciones del acuerdo de datos.');
  
  drawFooter();

  // ==================== SECTION 5: COMPONENT CATALOG ====================
  addPage();
  drawSectionTitle('05', 'Catálogo de Componentes Técnicos');
  
  drawSubtitle('Componentes Core / Web3');
  drawTable(
    ['Componente', 'Ubicación', 'Función'],
    [
      ['Web3StatusWidget', 'components/', 'Estado conexión wallet'],
      ['WalletButton', 'components/', 'Conectar/desconectar wallet'],
      ['EnhancedWalletCard', 'components/', 'Tarjeta detallada wallet'],
      ['PaymentGateway', 'components/', 'Flujo de pago EUROe'],
    ]
  );
  
  drawSubtitle('Componentes de Auditoría');
  drawTable(
    ['Componente', 'Ubicación', 'Función'],
    [
      ['AuditLogs', 'pages/', 'Visualización de logs'],
      ['DataLineage', 'components/', 'Trazabilidad de datos'],
      ['SmartContractViewer', 'components/', 'Ver contratos blockchain'],
    ]
  );
  
  drawSubtitle('Componentes de Comercio');
  drawTable(
    ['Componente', 'Ubicación', 'Función'],
    [
      ['ProductDetail', 'pages/', 'Detalle de producto'],
      ['Catalog', 'pages/', 'Listado marketplace'],
      ['RequestWizard', 'pages/', 'Wizard solicitud datos'],
      ['OrderSummary', 'components/', 'Resumen de orden'],
    ]
  );
  
  drawFooter();
  
  // Page 2 of Components
  addPage();
  
  drawSubtitle('Componentes UX (v3.1)');
  drawTable(
    ['Componente', 'Ubicación', 'Función'],
    [
      ['ActivityFeed', 'components/', 'Feed tiempo real'],
      ['EmptyState', 'components/', 'Estados vacíos'],
      ['PageSkeleton', 'components/', 'Skeleton loading'],
      ['DemoTour', 'components/', 'Tour interactivo'],
    ]
  );
  
  drawSubtitle('Componentes de Layout');
  drawTable(
    ['Componente', 'Ubicación', 'Función'],
    [
      ['AppLayout', 'components/', 'Layout principal'],
      ['AppSidebar', 'components/', 'Navegación lateral'],
      ['ProtectedRoute', 'components/', 'Rutas protegidas'],
      ['ThemeToggle', 'components/', 'Dark/light mode'],
    ]
  );
  
  drawSubtitle('Componentes Shadcn/UI Base');
  drawParagraph('La aplicación utiliza más de 40 componentes de Shadcn/UI, incluyendo: Accordion, Alert, Avatar, Badge, Button, Card, Checkbox, Dialog, Dropdown Menu, Form, Input, Label, Popover, Progress, ScrollArea, Select, Separator, Sheet, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip.');
  
  drawFooter();

  // ==================== SECTION 6: HOOKS ====================
  addPage();
  drawSectionTitle('06', 'Hooks Personalizados');
  
  drawSubtitle('useAuth (Autenticación Híbrida)');
  drawParagraph('Hook central que unifica autenticación Supabase con identidad Web3:');
  
  drawCodeBlock([
    'interface AuthContextType {',
    '  // Supabase Auth',
    '  user: User | null;',
    '  session: Session | null;',
    '  signUp: (email, password) => Promise<void>;',
    '  signIn: (email, password) => Promise<void>;',
    '  signOut: () => Promise<void>;',
    '  ',
    '  // Web3 Identity',
    '  walletAddress: string | null;',
    '  did: string | null;',
    '  isWeb3Connected: boolean;',
    '  connectWallet: () => Promise<void>;',
    '  disconnectWallet: () => void;',
    '}'
  ]);
  
  drawSubtitle('useWeb3Wallet');
  drawParagraph('Gestiona el estado de conexión con MetaMask y la red Pontus-X:');
  
  drawCodeBlock([
    'interface WalletState {',
    '  address: string | null;',
    '  isConnected: boolean;',
    '  chainId: number | null;',
    '  balance: string;',
    '  euroBalance: string;',
    '  isCorrectNetwork: boolean;',
    '}'
  ]);
  
  drawFooter();
  
  // Page 2 of Hooks
  addPage();
  
  drawSubtitle('usePrivacyPreferences');
  drawParagraph('Gestiona preferencias de privacidad con actualización optimista y rollback automático:');
  
  drawCodeBlock([
    'const { preferences, updatePreference, isLoading } = usePrivacyPreferences();',
    '',
    '// Actualización optimista',
    'await updatePreference("email_notifications", false);',
    '// UI se actualiza inmediatamente',
    '// Si falla, rollback automático + toast de error'
  ]);
  
  drawSubtitle('useOrganizationContext');
  drawParagraph('Proporciona información de la organización actual del usuario y permite cambiar entre organizaciones si tiene múltiples roles.');
  
  drawSubtitle('useNotifications');
  drawParagraph('Gestiona notificaciones del usuario con soporte para marcar como leídas y suscripción en tiempo real.');
  
  drawSubtitle('useOrgSector');
  drawParagraph('Determina el sector de la organización actual para personalizar la experiencia (iconos, colores, casos de uso relevantes).');
  
  drawFooter();

  // ==================== SECTION 7: PAGES ====================
  addPage();
  drawSectionTitle('07', 'Interfaces y Páginas Principales');
  
  drawSubtitle('Rutas Públicas');
  drawTable(
    ['Ruta', 'Página', 'Descripción'],
    [
      ['/', 'Landing', 'Página principal pública'],
      ['/auth', 'Auth', 'Login/registro'],
      ['/guide', 'Guide', 'Documentación pública'],
      ['/docs/tecnico', 'TechnicalDocs', 'Este documento'],
    ]
  );
  
  drawSubtitle('Rutas Protegidas (requieren auth)');
  drawTable(
    ['Ruta', 'Página', 'Descripción'],
    [
      ['/dashboard', 'Dashboard', 'Panel principal'],
      ['/catalog', 'Catalog', 'Marketplace de datos'],
      ['/requests', 'Requests', 'Solicitudes de datos'],
      ['/data', 'Data', 'Mis activos de datos'],
      ['/settings', 'Settings', 'Configuración'],
      ['/audit-logs', 'AuditLogs', 'Logs de auditoría'],
    ]
  );
  
  drawSubtitle('Dashboard');
  drawParagraph('Panel principal que muestra KPIs de la organización, transacciones recientes, estado de wallet y feed de actividad en tiempo real.');
  
  drawSubtitle('Architecture (v3.1)');
  drawParagraph('Página interactiva con diagramas Mermaid que explican la arquitectura del sistema, flujos de datos y modelo de roles.');
  
  drawFooter();

  // ==================== SECTION 8: PERSONAS ====================
  addPage();
  drawSectionTitle('08', 'Personas de Usuario (Roles Técnicos)');
  
  drawSubtitle('Sistema de Roles');
  drawParagraph('El control de acceso se gestiona mediante la tabla user_roles combinada con Row Level Security (RLS):');
  
  drawTable(
    ['Rol', 'Permisos'],
    [
      ['admin', 'CRUD completo, gestión de usuarios'],
      ['approver', 'Aprobar/denegar solicitudes'],
      ['viewer', 'Solo lectura de datos'],
      ['api_configurator', 'Gestionar integraciones ERP'],
    ]
  );
  
  drawSubtitle('Flujo Típico: Consumer');
  drawBullet('Busca datos en el catálogo (Catalog)');
  drawBullet('Inicia solicitud con RequestWizard');
  drawBullet('Especifica propósito, justificación y duración');
  drawBullet('Monitorea estado en Requests');
  drawBullet('Recibe datos cuando se completa el flujo');
  
  drawSubtitle('Flujo Típico: Provider');
  drawBullet('Recibe notificación de solicitud pendiente');
  drawBullet('Revisa detalles y justificación');
  drawBullet('Pre-aprueba o deniega con notas');
  drawBullet('Si aprueba, solicitud pasa a Holder');
  
  drawSubtitle('Flujo Típico: Data Holder');
  drawBullet('Recibe solicitudes pre-aprobadas por Provider');
  drawBullet('Verifica capacidad técnica de entrega');
  drawBullet('Aprueba y ejecuta transferencia');
  drawBullet('Registra en blockchain para trazabilidad');
  
  drawFooter();

  // ==================== SECTION 9: GOVERNANCE ====================
  addPage();
  drawSectionTitle('09', 'Modelo de Gobernanza Técnica');
  
  drawSubtitle('Flujo de Aprobación Multi-Etapa');
  drawParagraph('Cada transacción de datos requiere aprobación secuencial de Provider y Holder, garantizando consentimiento explícito de todas las partes.');
  
  drawCodeBlock([
    'Flujo de Aprobación:',
    '',
    '  Consumer        Provider         Holder',
    '     │               │                │',
    '     │──solicita────▶│                │',
    '     │               │──revisa────────│',
    '     │               │──pre-aprueba──▶│',
    '     │               │                │──revisa',
    '     │               │                │──aprueba',
    '     │◀──────────────────────────────│',
    '     │           datos entregados     │'
  ]);
  
  drawSubtitle('Registro de Aprobaciones');
  drawParagraph('La tabla approval_history registra cada acción con timestamp, actor y notas:');
  
  drawCodeBlock([
    'CREATE TABLE approval_history (',
    '  id UUID PRIMARY KEY,',
    '  transaction_id UUID REFERENCES data_transactions,',
    '  action approval_action, -- pre_approve|approve|deny|cancel',
    '  actor_user_id UUID,',
    '  actor_org_id UUID,',
    '  notes TEXT,',
    '  created_at TIMESTAMPTZ',
    ');'
  ]);
  
  drawSubtitle('Revocación de Acceso');
  drawParagraph('El componente RevokeAccessButton permite revocar acceso inmediatamente, cambiando el estado de la transacción a "cancelled" y notificando a todas las partes.');
  
  drawFooter();

  // ==================== SECTION 10: SECURITY ====================
  addPage();
  drawSectionTitle('10', 'Seguridad y Auditoría');
  
  drawSubtitle('Autenticación Dual');
  drawParagraph('La plataforma soporta dos métodos de autenticación que pueden usarse independientemente o en conjunto:');
  
  drawBox('Supabase Auth', [
    'Email + password tradicional',
    'Magic links para acceso sin contraseña',
    'Sesiones JWT con refresh automático',
    'MFA opcional (TOTP)'
  ]);
  
  drawBox('Web3 Signature (SIWE)', [
    'Sign-In With Ethereum',
    'Verificación de propiedad de wallet',
    'Vinculación DID a cuenta',
    'Sin custodia de claves privadas'
  ]);
  
  drawSubtitle('Row Level Security (RLS)');
  drawParagraph('Todas las tablas implementan RLS para garantizar que los usuarios solo pueden acceder a datos de sus organizaciones:');
  
  drawCodeBlock([
    'CREATE POLICY "org_isolation" ON data_transactions',
    '  FOR ALL',
    '  USING (',
    '    auth.uid() IN (',
    '      SELECT user_id FROM user_profiles',
    '      WHERE organization_id IN (',
    '        consumer_org_id, holder_org_id, subject_org_id',
    '      )',
    '    )',
    '  );'
  ]);
  
  drawFooter();
  
  // Page 2 of Security
  addPage();
  
  drawSubtitle('Trazabilidad End-to-End');
  drawParagraph('Cada acción se registra en múltiples niveles:');
  
  drawBullet('audit_logs: Registro de todas las acciones en PostgreSQL');
  drawBullet('approval_history: Historia de aprobaciones por transacción');
  drawBullet('Blockchain: Hash de transacciones críticas en Pontus-X');
  
  drawSubtitle('Tabla audit_logs');
  
  drawCodeBlock([
    'CREATE TABLE audit_logs (',
    '  id UUID PRIMARY KEY,',
    '  organization_id UUID NOT NULL,',
    '  actor_id UUID,',
    '  actor_email TEXT,',
    '  action TEXT NOT NULL,',
    '  resource TEXT,',
    '  details JSONB,',
    '  ip_address TEXT,',
    '  created_at TIMESTAMPTZ',
    ');'
  ]);
  
  drawSubtitle('Políticas de Auditoría');
  drawParagraph('Los logs de auditoría solo son visibles para usuarios de la organización correspondiente, protegidos por RLS.');
  
  drawFooter();

  // ==================== SECTION 11: USE CASES ====================
  addPage();
  drawSectionTitle('11', 'Casos de Uso Principales');
  
  drawSubtitle('1. Onboarding Web3');
  drawParagraph('Usuario conecta wallet MetaMask, genera DID y vincula a su cuenta Supabase existente.');
  
  drawSubtitle('2. Intercambio de Huella de Carbono');
  drawParagraph('Consumer solicita datos de emisiones Scope 1/2 de un proveedor para calcular su Scope 3. Provider aprueba compartir datos ESG agregados.');
  
  drawSubtitle('3. Comercio de Datos con EUROe');
  drawParagraph('Transacción monetizada donde Consumer paga en stablecoin EUROe por acceso temporal a dataset premium.');
  
  drawSubtitle('4. Revocación de Emergencia');
  drawParagraph('Provider detecta uso indebido y revoca acceso inmediatamente, cancelando la transacción y notificando a todas las partes.');
  
  drawSubtitle('5. Pasaporte Digital de Producto');
  drawParagraph('Fabricante comparte trazabilidad completa de materias primas con retailer para cumplimiento normativo.');
  
  drawSubtitle('6. Entrenamiento de IA Privado');
  drawParagraph('Consumer entrena modelo ML sobre datos de múltiples proveedores sin acceso directo a datos raw, usando computación federada.');
  
  drawFooter();

  // ==================== SECTION 12: UX IMPROVEMENTS ====================
  addPage();
  drawSectionTitle('12', 'Mejoras de UX v3.1');
  
  drawSubtitle('Estados de Carga Individuales');
  drawParagraph('Implementación de processingId para mostrar loading solo en el elemento que está siendo procesado:');
  
  drawCodeBlock([
    'const [processingId, setProcessingId] = useState<string | null>(null);',
    '',
    'const handleAction = async (id: string) => {',
    '  setProcessingId(id);',
    '  try { await action(id); }',
    '  finally { setProcessingId(null); }',
    '};',
    '',
    '<Button disabled={processingId === item.id}>',
    '  {processingId === item.id ? <Loader /> : "Acción"}',
    '</Button>'
  ]);
  
  drawSubtitle('Diálogos de Confirmación');
  drawParagraph('AlertDialog para acciones críticas como aprobar, denegar o revocar acceso.');
  
  drawSubtitle('Skeleton Loaders');
  drawParagraph('Componentes PageSkeleton y skeletons específicos para cada tipo de contenido durante la carga inicial.');
  
  drawSubtitle('Validación con Zod');
  drawParagraph('Esquemas Zod para validación de formularios con mensajes de error en español.');
  
  drawFooter();

  // ==================== SECTION 13: EDGE FUNCTIONS ====================
  addPage();
  drawSectionTitle('13', 'Edge Functions');
  
  drawSubtitle('erp-api-tester');
  drawParagraph('Prueba conectividad con endpoints ERP externos configurados por el usuario.');
  
  drawTable(
    ['Método', 'Ruta', 'Descripción'],
    [
      ['POST', '/erp-api-tester', 'Test de conexión ERP'],
    ]
  );
  
  drawSubtitle('erp-data-uploader');
  drawParagraph('Envía datos de transacciones completadas a sistemas ERP conectados.');
  
  drawTable(
    ['Método', 'Ruta', 'Descripción'],
    [
      ['POST', '/erp-data-uploader', 'Upload a ERP'],
    ]
  );
  
  drawSubtitle('notification-handler');
  drawParagraph('Envía emails transaccionales vía Resend para notificaciones de solicitudes, aprobaciones y completados.');
  
  drawTable(
    ['Método', 'Ruta', 'Descripción'],
    [
      ['POST', '/notification-handler', 'Envío de email'],
    ]
  );
  
  drawFooter();

  // ==================== SECTION 14: DEV GUIDE ====================
  addPage();
  drawSectionTitle('14', 'Guía de Desarrollo');
  
  drawSubtitle('Design Tokens');
  drawParagraph('Todos los colores se definen en index.css usando variables CSS HSL y se referencian desde tailwind.config.ts:');
  
  drawCodeBlock([
    ':root {',
    '  --background: 0 0% 100%;',
    '  --foreground: 222.2 84% 4.9%;',
    '  --primary: 222.2 47.4% 11.2%;',
    '  --primary-foreground: 210 40% 98%;',
    '  --muted: 210 40% 96.1%;',
    '  --accent: 210 40% 96.1%;',
    '}'
  ]);
  
  drawSubtitle('Archivos No Editables');
  drawBullet('src/integrations/supabase/types.ts (autogenerado)');
  drawBullet('src/integrations/supabase/client.ts (autogenerado)');
  drawBullet('supabase/config.toml (autogenerado)');
  drawBullet('.env (autogenerado)');
  
  drawSubtitle('Convenciones de Código');
  drawBullet('Componentes: PascalCase (ProductDetail.tsx)');
  drawBullet('Hooks: camelCase con prefijo use (useAuth.tsx)');
  drawBullet('Utilidades: camelCase (utils.ts)');
  drawBullet('Tipos: PascalCase (database.types.ts)');
  
  drawFooter();

  // ==================== SECTION 15: AUDIT STATUS ====================
  addPage();
  drawSectionTitle('15', 'Estado de Auditoría');
  
  drawSubtitle('Tareas Completadas');
  
  drawBox('Prioridad Crítica', [
    'RLS habilitado en todas las tablas',
    'Autenticación obligatoria en rutas protegidas',
    'Validación Zod en formularios',
    'CORS configurado en Edge Functions'
  ]);
  
  drawBox('Prioridad Alta', [
    'Estados de carga implementados',
    'Manejo de errores con toast',
    'Skeleton loaders consistentes',
    'Empty states en todas las listas'
  ]);
  
  drawSubtitle('Pendientes');
  drawBullet('Implementar rate limiting en Edge Functions');
  drawBullet('Añadir tests e2e con Playwright');
  drawBullet('Documentar API REST completa');
  drawBullet('Implementar CSP headers');
  
  drawFooter();

  // ==================== SECTION 16: APPENDIX DB ====================
  addPage();
  drawSectionTitle('16', 'Anexos: Esquema de Base de Datos');
  
  drawSubtitle('Tablas Principales (28 tablas)');
  
  drawTable(
    ['Categoría', 'Tablas'],
    [
      ['Organizaciones', 'organizations, user_profiles, user_roles'],
      ['Catálogo', 'data_products, data_assets, catalog_metadata'],
      ['Transacciones', 'data_transactions, approval_history, data_payloads'],
      ['Finanzas', 'wallets, wallet_transactions'],
      ['Sistema', 'audit_logs, notifications, webhooks'],
      ['ERP', 'erp_configurations, export_logs'],
      ['ESG', 'esg_reports'],
    ]
  );
  
  drawSubtitle('Enums del Sistema');
  
  drawCodeBlock([
    'organization_type: consumer | provider | data_holder',
    '',
    'transaction_status: initiated | pending_subject | pending_holder',
    '                  | approved | denied_subject | denied_holder',
    '                  | completed | cancelled',
    '',
    'app_role: admin | approver | viewer | api_configurator',
    '',
    'approval_action: pre_approve | approve | deny | cancel'
  ]);
  
  drawFooter();

  // ==================== SECTION 17: VERSION HISTORY ====================
  addPage();
  drawSectionTitle('17', 'Historial de Versiones');
  
  drawTable(
    ['Versión', 'Fecha', 'Cambios Principales'],
    [
      ['v3.1', 'Enero 2026', 'Web3 completo, Realtime, UX v3.1'],
      ['v3.0', 'Diciembre 2025', 'Migración a Lovable Cloud'],
      ['v2.5', 'Octubre 2025', 'Marketplace público'],
      ['v2.0', 'Agosto 2025', 'Modelo tripartito IDSA'],
      ['v1.0', 'Mayo 2025', 'MVP inicial'],
    ]
  );
  
  currentY += 20;
  
  drawSubtitle('Referencias');
  drawBullet('Gaia-X Trust Framework: https://gaia-x.eu/');
  drawBullet('IDSA Reference Architecture: https://internationaldataspaces.org/');
  drawBullet('W3C DID Specification: https://www.w3.org/TR/did-core/');
  drawBullet('ODRL Information Model: https://www.w3.org/TR/odrl-model/');
  drawBullet('Pontus-X Network: https://pontus-x.eu/');
  
  currentY += 20;
  
  doc.setFontSize(10);
  doc.setTextColor(colors.mediumGray);
  doc.text('— Fin del Documento —', pageWidth / 2, currentY, { align: 'center' });
  
  drawFooter();

  // Add footers to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    if (i > 1) { // Skip cover page
      doc.setFontSize(9);
      doc.setTextColor(colors.lightGray);
      doc.text(`PROCUREDATA v3.1 — Documento Técnico`, marginLeft, pageHeight - 12);
      doc.text(`Página ${i} de ${totalPages}`, pageWidth - marginRight, pageHeight - 12, { align: 'right' });
    }
  }

  // Save the PDF
  doc.save('PROCUREDATA_Documento_Tecnico_v3.1.pdf');
}
