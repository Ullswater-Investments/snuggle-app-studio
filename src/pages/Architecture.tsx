import { useState } from "react";
import { 
  Home, Database, Shield, Server, Lock, Code, Layers, Wallet, 
  GitBranch, ExternalLink, CheckCircle2, XCircle, Users, FileText,
  CreditCard, Settings, Zap, Globe, Box, Cpu, Link2, BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import DataLineageBlockchain from "@/components/DataLineageBlockchain";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

// Tab definitions
const TABS = [
  { id: "overview", label: "Visión General", icon: Layers },
  { id: "database", label: "Base de Datos", icon: Database },
  { id: "security", label: "Seguridad & RLS", icon: Shield },
  { id: "web3", label: "Integración Web3", icon: Wallet },
  { id: "flows", label: "Flujos de Datos", icon: GitBranch },
  { id: "stack", label: "Tech Stack", icon: Code }
];

// Database table categories
const DB_CATEGORIES = [
  {
    name: "Organizaciones y Usuarios",
    icon: Users,
    color: "text-blue-500",
    tables: [
      { name: "organizations", description: "Entidades participantes (Consumer/Provider/Holder)", fields: "id, name, type, tax_id, did, wallet_address, kyb_verified" },
      { name: "user_profiles", description: "Perfiles de usuarios vinculados a organizaciones", fields: "user_id, organization_id, full_name, position" },
      { name: "user_roles", description: "Roles por organización (admin, approver, viewer)", fields: "user_id, organization_id, role" },
      { name: "privacy_preferences", description: "Preferencias de privacidad por usuario", fields: "user_id, profile_visible, access_alerts" }
    ]
  },
  {
    name: "Catálogo de Datos",
    icon: Box,
    color: "text-green-500",
    tables: [
      { name: "data_products", description: "Definición de productos de datos", fields: "id, name, category, schema_definition, version" },
      { name: "data_assets", description: "Instancias concretas de productos", fields: "id, product_id, holder_org_id, subject_org_id, price, status" },
      { name: "catalog_metadata", description: "Metadatos para búsqueda en marketplace", fields: "asset_id, tags, categories, visibility" }
    ]
  },
  {
    name: "Transacciones",
    icon: GitBranch,
    color: "text-purple-500",
    tables: [
      { name: "data_transactions", description: "Núcleo del sistema - máquina de estados", fields: "id, consumer_org_id, subject_org_id, holder_org_id, status, purpose" },
      { name: "approval_history", description: "Historial de aprobaciones/rechazos", fields: "transaction_id, actor_org_id, action, notes" },
      { name: "data_payloads", description: "Datos entregados (ESG, IoT, supplier)", fields: "transaction_id, schema_type, data_content (JSONB)" },
      { name: "data_policies", description: "Políticas ODRL generadas", fields: "transaction_id, odrl_policy_json" },
      { name: "transaction_messages", description: "Chat de negociación", fields: "transaction_id, sender_org_id, content" }
    ]
  },
  {
    name: "Finanzas y Pagos",
    icon: CreditCard,
    color: "text-yellow-500",
    tables: [
      { name: "wallets", description: "Billeteras EUROe por organización", fields: "organization_id, address, balance, currency" },
      { name: "wallet_transactions", description: "Movimientos de fondos", fields: "from_wallet_id, to_wallet_id, amount, status" }
    ]
  },
  {
    name: "Sistema y Seguridad",
    icon: Settings,
    color: "text-red-500",
    tables: [
      { name: "audit_logs", description: "Registro de auditoría inmutable", fields: "organization_id, action, actor_id, details, ip_address" },
      { name: "login_attempts", description: "Intentos de login para rate limiting", fields: "email, ip_address, success, attempted_at" },
      { name: "erp_configurations", description: "Configuraciones de integración ERP", fields: "organization_id, endpoint_url, auth_method, field_mapping" },
      { name: "notifications", description: "Sistema de notificaciones", fields: "user_id, title, type, is_read, link" }
    ]
  }
];

// Tech stack categories
const TECH_STACK = [
  {
    category: "Frontend",
    items: [
      { name: "React 18.3", description: "Biblioteca UI con hooks", url: "https://react.dev" },
      { name: "Vite 5.4", description: "Build tool ultrarrápido", url: "https://vitejs.dev" },
      { name: "TypeScript 5.6", description: "Tipado estático", url: "https://www.typescriptlang.org" },
      { name: "React Router 6", description: "Navegación SPA", url: "https://reactrouter.com" }
    ]
  },
  {
    category: "UI/UX",
    items: [
      { name: "Tailwind CSS 3.4", description: "Utility-first CSS", url: "https://tailwindcss.com" },
      { name: "shadcn/ui", description: "49 componentes Radix", url: "https://ui.shadcn.com" },
      { name: "Framer Motion", description: "Animaciones declarativas", url: "https://www.framer.com/motion" },
      { name: "Lucide Icons", description: "Iconos SVG", url: "https://lucide.dev" }
    ]
  },
  {
    category: "Estado y Data",
    items: [
      { name: "TanStack Query 5", description: "Server state management", url: "https://tanstack.com/query" },
      { name: "React Hook Form", description: "Formularios performantes", url: "https://react-hook-form.com" },
      { name: "Zod", description: "Validación de esquemas", url: "https://zod.dev" },
      { name: "Recharts", description: "Gráficos React", url: "https://recharts.org" }
    ]
  },
  {
    category: "Backend (Lovable Cloud)",
    items: [
      { name: "PostgreSQL 15", description: "Base de datos principal", url: "https://www.postgresql.org" },
      { name: "Edge Functions", description: "Lógica serverless Deno", url: "https://deno.land" },
      { name: "Realtime", description: "WebSocket subscriptions", url: "#" },
      { name: "Auth", description: "Autenticación integrada", url: "#" }
    ]
  },
  {
    category: "Web3",
    items: [
      { name: "Ethers.js 6", description: "Interacción blockchain", url: "https://docs.ethers.org" },
      { name: "Pontus-X", description: "Red Gaia-X compatible", url: "https://pontus-x.eu" },
      { name: "EUROe", description: "Stablecoin EUR", url: "https://www.euroe.com" },
      { name: "DID:ethr", description: "Identidad descentralizada", url: "https://github.com/decentralized-identity/ethr-did-resolver" }
    ]
  },
  {
    category: "Utilidades",
    items: [
      { name: "date-fns", description: "Manipulación de fechas", url: "https://date-fns.org" },
      { name: "jsPDF", description: "Generación PDF", url: "https://github.com/parallax/jsPDF" },
      { name: "Mermaid", description: "Diagramas como código", url: "https://mermaid.js.org" },
      { name: "React Markdown", description: "Renderizado MD", url: "https://github.com/remarkjs/react-markdown" }
    ]
  }
];

// RLS Policies
const RLS_POLICIES = [
  { role: "Consumer", access: "Solo sus propias transacciones iniciadas", color: "bg-blue-500" },
  { role: "Provider (Subject)", access: "Solicitudes donde es el dueño del dato", color: "bg-green-500" },
  { role: "Holder", access: "Transacciones pendientes de liberación", color: "bg-purple-500" },
  { role: "Admin", access: "Acceso completo a su organización", color: "bg-red-500" }
];

// Mermaid diagrams
const DIAGRAM_OVERVIEW = `graph TB
    subgraph Frontend["🖥️ Frontend - React + Vite"]
        UI[UI Components<br/>shadcn/ui + Tailwind]
        State[TanStack Query<br/>+ Context API]
        Router[React Router<br/>Protected Routes]
    end
    
    subgraph Backend["☁️ Backend - Lovable Cloud"]
        Auth[Authentication<br/>JWT + Sessions]
        DB[(PostgreSQL<br/>28 Tables + RLS)]
        Edge[Edge Functions<br/>Deno Runtime]
        RT[Realtime<br/>WebSocket]
    end
    
    subgraph Blockchain["⛓️ Blockchain - Pontus-X"]
        DID[DID Registry<br/>did:ethr]
        Token[EUROe Token<br/>ERC-20]
        Explorer[Block Explorer<br/>Auditoría]
    end
    
    UI --> State
    State --> Auth
    Auth --> DB
    Edge --> DB
    RT --> DB
    
    UI -.-> DID
    Edge -.-> Token
    DB -.-> Explorer
    
    style Frontend fill:#1e40af,color:#fff
    style Backend fill:#059669,color:#fff
    style Blockchain fill:#7c3aed,color:#fff`;

const DIAGRAM_ER = `erDiagram
    organizations ||--o{ user_profiles : "tiene"
    organizations ||--o{ user_roles : "asigna"
    organizations ||--o{ data_assets : "posee"
    organizations ||--o{ wallets : "tiene"
    
    data_products ||--o{ data_assets : "instancia"
    data_assets ||--o{ catalog_metadata : "describe"
    data_assets ||--o{ data_transactions : "transacciona"
    
    data_transactions ||--o{ approval_history : "registra"
    data_transactions ||--o{ data_policies : "genera"
    data_transactions ||--o{ data_payloads : "entrega"
    data_transactions ||--o{ transaction_messages : "negocia"
    
    wallets ||--o{ wallet_transactions : "origen"
    wallets ||--o{ wallet_transactions : "destino"
    
    organizations {
        uuid id PK
        string name
        enum type
        string tax_id
        string did
        string wallet_address
        boolean kyb_verified
    }
    
    data_transactions {
        uuid id PK
        uuid consumer_org_id FK
        uuid subject_org_id FK
        uuid holder_org_id FK
        enum status
        string purpose
        string justification
    }`;

const DIAGRAM_STATES = `stateDiagram-v2
    [*] --> initiated: Consumer crea solicitud
    
    initiated --> pending_subject: Enviar a Provider
    initiated --> cancelled: Consumer cancela
    
    pending_subject --> pending_holder: Provider aprueba
    pending_subject --> denied_subject: Provider rechaza
    
    pending_holder --> approved: Holder aprueba
    pending_holder --> denied_holder: Holder rechaza
    
    approved --> completed: Pago + Entrega
    
    completed --> [*]
    denied_subject --> [*]
    denied_holder --> [*]
    cancelled --> [*]
    
    note right of pending_subject: Esperando validación\\ndel dueño del dato
    note right of pending_holder: Esperando liberación\\ndel custodio técnico
    note right of completed: Datos entregados\\nPago procesado`;

const DIAGRAM_SEQUENCE = `sequenceDiagram
    participant C as 🛒 Consumer
    participant S as 📊 Subject (Provider)
    participant H as 🔐 Holder
    participant DB as 💾 Database
    participant BC as ⛓️ Blockchain

    C->>DB: 1. Crear transacción
    Note over DB: status: initiated
    
    DB->>S: 2. Notificar solicitud
    S->>DB: 3. Aprobar propósito
    Note over DB: status: pending_holder
    
    DB->>H: 4. Notificar para liberación
    H->>DB: 5. Liberar datos
    Note over DB: status: completed
    
    H->>BC: 6. Notarizar hash
    BC-->>C: 7. Confirmar en blockchain
    
    DB->>C: 8. Entregar payload`;

const DIAGRAM_RLS = `flowchart TD
    A[📨 Query SQL] --> B{🛡️ RLS Policy Check}
    
    B -->|auth.uid| C[Obtener user_id]
    C --> D[Obtener organization_id]
    D --> E{Verificar rol}
    
    E -->|Consumer| F[WHERE consumer_org_id = org_id]
    E -->|Subject| G[WHERE subject_org_id = org_id]
    E -->|Holder| H[WHERE holder_org_id = org_id]
    E -->|Admin| I[Acceso completo a org]
    
    F --> J[✅ Resultados filtrados]
    G --> J
    H --> J
    I --> J
    
    B -->|Sin auth| K[❌ Acceso denegado]
    
    style B fill:#f59e0b,color:#000
    style J fill:#10b981,color:#fff
    style K fill:#ef4444,color:#fff`;

const DIAGRAM_WEB3 = `flowchart LR
    subgraph User["👤 Usuario"]
        MM[MetaMask]
        DID[DID:ethr]
    end
    
    subgraph App["🖥️ PROCUREDATA"]
        Connect[useWeb3Wallet]
        Balance[Balance EUROe]
        Sign[Firmar TX]
    end
    
    subgraph PontusX["⛓️ Pontus-X Testnet"]
        RPC[RPC Endpoint<br/>rpc.test.pontus-x.eu]
        Explorer[Block Explorer<br/>explorer.pontus-x.eu]
        Contract[Smart Contracts]
    end
    
    MM --> Connect
    Connect --> DID
    Connect --> Balance
    Sign --> RPC
    RPC --> Contract
    Contract --> Explorer
    
    style User fill:#f97316,color:#fff
    style App fill:#3b82f6,color:#fff
    style PontusX fill:#8b5cf6,color:#fff`;

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Architecture() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ProcuredataLogo size="md" />
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-xl hidden sm:inline">| Arquitectura Técnica</h1>
              <Badge variant="outline" className="hidden sm:flex gap-1">
                <Zap className="h-3 w-3" />
                v3.1 Web3
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden md:flex">
              <Link to="/docs/tecnico"><BookOpen className="h-4 w-4 mr-2" />Docs</Link>
            </Button>
            <Button asChild><Link to="/auth">Probar Demo</Link></Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-2">PROCUREDATA v3.1</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Arquitectura híbrida Web2/Web3 para intercambio soberano de datos empresariales.
            PostgreSQL + RLS + Pontus-X Blockchain.
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Link to="/use-cases"><Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Ver Casos de Uso</Badge></Link>
            <Link to="/models"><Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Modelos de Negocio</Badge></Link>
            <Link to="/whitepaper"><Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">Whitepaper</Badge></Link>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto gap-1 bg-muted/50 p-1">
            {TABS.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 py-2.5 data-[state=active]:bg-background"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {/* TAB 1: VISIÓN GENERAL */}
            <TabsContent value="overview" className="space-y-6">
              <motion.div {...fadeInUp} key="overview">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      Arquitectura de Alto Nivel
                    </CardTitle>
                    <CardDescription>
                      Sistema híbrido con tres capas: Frontend React, Backend Lovable Cloud, y Blockchain Pontus-X
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MermaidDiagram chart={DIAGRAM_OVERVIEW} />
                  </CardContent>
                </Card>

                {/* Componentes del Data Space Europeo - Memoria Técnica */}
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Componentes del Data Space Europeo
                    </CardTitle>
                    <CardDescription>
                      Estándares y conectores activos según la Memoria Técnica oficial
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div 
                        variants={fadeInUp}
                        className="flex items-center gap-3 p-4 bg-background rounded-lg border"
                      >
                        <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Link2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">Eclipse Dataspace Connector (EDC)</p>
                          <p className="text-xs text-muted-foreground">Conector oficial del Data Space europeo</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-300 flex-shrink-0">Activo</Badge>
                      </motion.div>

                      <motion.div 
                        variants={fadeInUp}
                        className="flex items-center gap-3 p-4 bg-background rounded-lg border"
                      >
                        <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">IDS Dataspace Protocol</p>
                          <p className="text-xs text-muted-foreground">Protocolo de interoperabilidad IDSA</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-300 flex-shrink-0">Activo</Badge>
                      </motion.div>

                      <motion.div 
                        variants={fadeInUp}
                        className="flex items-center gap-3 p-4 bg-background rounded-lg border"
                      >
                        <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Lock className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">Keycloak (Federated Identity)</p>
                          <p className="text-xs text-muted-foreground">Gestión de identidades federadas</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-300 flex-shrink-0">Activo</Badge>
                      </motion.div>

                      <motion.div 
                        variants={fadeInUp}
                        className="flex items-center gap-3 p-4 bg-background rounded-lg border"
                      >
                        <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">Gaia-X Trust Framework</p>
                          <p className="text-xs text-muted-foreground">Marco de confianza europeo</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-300 flex-shrink-0">Activo</Badge>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                  <motion.div variants={fadeInUp}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                          <Globe className="h-5 w-5 text-blue-500" />
                        </div>
                        <CardTitle className="text-lg">Frontend SPA</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• React 18 + TypeScript</li>
                          <li>• 49 componentes shadcn/ui</li>
                          <li>• Animaciones Framer Motion</li>
                          <li>• PWA ready</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
                          <Server className="h-5 w-5 text-green-500" />
                        </div>
                        <CardTitle className="text-lg">Backend Cloud</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• PostgreSQL 15 + RLS</li>
                          <li>• Edge Functions (Deno)</li>
                          <li>• WebSocket Realtime</li>
                          <li>• Auth integrada</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2">
                          <Link2 className="h-5 w-5 text-purple-500" />
                        </div>
                        <CardTitle className="text-lg">Web3 Layer</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Pontus-X Testnet</li>
                          <li>• DID:ethr Identity</li>
                          <li>• EUROe Payments</li>
                          <li>• Notarización on-chain</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </TabsContent>

            {/* TAB 2: BASE DE DATOS */}
            <TabsContent value="database" className="space-y-6">
              <motion.div {...fadeInUp} key="database">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-500" />
                      Diagrama Entidad-Relación
                    </CardTitle>
                    <CardDescription>
                      28 tablas PostgreSQL con relaciones y Row Level Security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MermaidDiagram chart={DIAGRAM_ER} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tablas por Categoría</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="w-full">
                      {DB_CATEGORIES.map((category) => (
                        <AccordionItem key={category.name} value={category.name}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-3">
                              <category.icon className={`h-5 w-5 ${category.color}`} />
                              <span>{category.name}</span>
                              <Badge variant="secondary" className="ml-2">{category.tables.length}</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 pt-2">
                              {category.tables.map((table) => (
                                <div key={table.name} className="p-3 bg-muted/50 rounded-lg">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <code className="font-mono text-sm font-bold text-primary">{table.name}</code>
                                      <p className="text-sm text-muted-foreground mt-1">{table.description}</p>
                                    </div>
                                  </div>
                                  <code className="text-xs bg-background p-2 rounded block mt-2 overflow-x-auto">
                                    {table.fields}
                                  </code>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* TAB 3: SEGURIDAD */}
            <TabsContent value="security" className="space-y-6">
              <motion.div {...fadeInUp} key="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-500" />
                      Flujo de Row Level Security
                    </CardTitle>
                    <CardDescription>
                      Cada query es interceptada y filtrada según el rol del usuario
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MermaidDiagram chart={DIAGRAM_RLS} />
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Políticas por Rol
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {RLS_POLICIES.map((policy) => (
                        <div key={policy.role} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${policy.color} mt-1`} />
                          <div>
                            <p className="font-medium">{policy.role}</p>
                            <p className="text-sm text-muted-foreground">{policy.access}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Ejemplo de Política
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
{`-- Política para data_transactions
CREATE POLICY "Users view own org transactions"
ON data_transactions FOR SELECT
USING (
  consumer_org_id = get_user_organization(auth.uid())
  OR subject_org_id = get_user_organization(auth.uid())
  OR holder_org_id = get_user_organization(auth.uid())
);`}
                      </pre>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>RLS activo en todas las tablas sensibles</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>Funciones SECURITY DEFINER con search_path</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>Auditoría automática de accesos</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* TAB 4: WEB3 */}
            <TabsContent value="web3" className="space-y-6">
              <motion.div {...fadeInUp} key="web3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-purple-500" />
                      Integración Pontus-X
                    </CardTitle>
                    <CardDescription>
                      Conexión con la red Gaia-X compatible para identidad descentralizada y pagos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MermaidDiagram chart={DIAGRAM_WEB3} />
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Configuración de Red</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="text-muted-foreground">Network</span>
                          <span className="font-mono">Pontus-X Testnet</span>
                        </div>
                        <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="text-muted-foreground">Chain ID</span>
                          <span className="font-mono">32457</span>
                        </div>
                        <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="text-muted-foreground">RPC URL</span>
                          <span className="font-mono text-xs">rpc.test.pontus-x.eu</span>
                        </div>
                        <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="text-muted-foreground">Currency</span>
                          <span className="font-mono">EUROe (ERC-20)</span>
                        </div>
                        <Button variant="outline" className="w-full mt-2" asChild>
                          <a href="https://explorer.pontus-x.eu" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Ver Block Explorer
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Funcionalidades Web3</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">DID:ethr</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Identidad descentralizada derivada de la wallet address. Formato: did:ethr:pontusx:0x...
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">EUROe</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Stablecoin EUR para micropagos. Balance consultable en tiempo real.
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">Notarización</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Hash de transacciones registrado on-chain para auditoría inmutable.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Data Lineage Blockchain</CardTitle>
                    <CardDescription>
                      Ejemplo de trazabilidad on-chain para una transacción de datos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataLineageBlockchain />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* TAB 5: FLUJOS */}
            <TabsContent value="flows" className="space-y-6">
              <motion.div {...fadeInUp} key="flows">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-orange-500" />
                      Máquina de Estados
                    </CardTitle>
                    <CardDescription>
                      Estados posibles de una transacción de datos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MermaidDiagram chart={DIAGRAM_STATES} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-blue-500" />
                      Flujo de Transacción Completo
                    </CardTitle>
                    <CardDescription>
                      Diagrama de secuencia del ciclo de vida del dato
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MermaidDiagram chart={DIAGRAM_SEQUENCE} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Timeline del Flujo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l-2 border-primary/20 ml-4 space-y-8 pl-8 py-4">
                      {[
                        { step: 1, title: "Solicitud (Consumer)", status: "initiated → pending_subject", desc: "El consumidor busca en el catálogo y solicita acceso a un activo de datos.", color: "bg-blue-500" },
                        { step: 2, title: "Validación (Subject/Provider)", status: "pending_subject → pending_holder", desc: "El dueño del dato valida el propósito y la justificación de la solicitud.", color: "bg-green-500" },
                        { step: 3, title: "Liberación (Holder)", status: "pending_holder → approved", desc: "El custodio técnico habilita el acceso y prepara el payload.", color: "bg-purple-500" },
                        { step: 4, title: "Intercambio + Pago", status: "approved → completed", desc: "Se procesa el pago, se entrega el dato y se notariza en blockchain.", color: "bg-primary" }
                      ].map((item) => (
                        <div key={item.step} className="relative">
                          <span className={`absolute -left-[41px] ${item.color} text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold`}>
                            {item.step}
                          </span>
                          <h4 className="font-bold">{item.title}</h4>
                          <Badge variant="outline" className="my-1 font-mono text-xs">{item.status}</Badge>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* TAB 6: TECH STACK */}
            <TabsContent value="stack" className="space-y-6">
              <motion.div {...fadeInUp} key="stack" variants={stagger}>
                {TECH_STACK.map((category) => (
                  <Card key={category.category}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {category.items.map((item) => (
                          <a
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h3 className="font-bold">¿Quieres explorar el código?</h3>
                        <p className="text-sm text-muted-foreground">
                          Revisa la documentación técnica completa o prueba la demo
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" asChild>
                          <Link to="/docs/tecnico">Ver Documentación</Link>
                        </Button>
                        <Button asChild>
                          <Link to="/auth">Probar Demo</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  );
}
