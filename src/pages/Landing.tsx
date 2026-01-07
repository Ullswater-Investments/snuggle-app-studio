import { Link } from "react-router-dom";
import { 
  ArrowRight, Database, Shield, Zap, Globe, Layers, CheckCircle, Sparkles,
  Wallet, ShieldCheck, Coins, Radio, Bell, Users, FileText, Plug, HelpCircle, BookOpen, Triangle
} from "lucide-react";
import { FundingFooter } from "@/components/FundingFooter";
import { AIConcierge } from "@/components/AIConcierge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import UseCasesCarousel from "@/components/UseCasesCarousel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

export default function Landing() {
  const { user } = useAuth();

  const demoLinks = [
    { title: "Innovation Lab", icon: Zap, url: "/innovation", desc: "25+ Líneas de negocio futuras", color: "text-yellow-500" },
    { title: "Catálogo de Datos", icon: Database, url: "/catalog", desc: "Marketplace federado 10x10", color: "text-blue-500" },
    { title: "Hub Sostenibilidad", icon: Globe, url: "/sustainability", desc: "Reportes ESG y Huella de Carbono", color: "text-green-500" },
    { title: "Gestión de Servicios", icon: Layers, url: "/services", desc: "Algoritmos y Compute-to-Data", color: "text-purple-500" },
  ];

  const FEATURES_DATA = {
    web3: [
      { title: "Wallet Web3", desc: "Conexión nativa con MetaMask y visualización de balances.", icon: Wallet, color: "text-purple-400", path: "/motor/wallet-web3" },
      { title: "Identidad SSI", desc: "DIDs (did:ethr) generados automáticamente.", icon: ShieldCheck, color: "text-purple-400", path: "/motor/identidad-ssi" },
      { title: "Pagos EUROe", desc: "Transacciones con stablecoin regulada en Pontus-X.", icon: Coins, color: "text-purple-400", path: "/motor/pagos-euroe" }
    ],
    realtime: [
      { title: "Activity Feed", desc: "Suscripción a eventos de contrato en vivo.", icon: Radio, color: "text-blue-400", path: "/motor/activity-feed" },
      { title: "Smart Alerts", desc: "Notificaciones push críticas instantáneas.", icon: Bell, color: "text-blue-400", path: "/motor/smart-alerts" }
    ],
    security: [
      { title: "Gobernanza ODRL", desc: "Políticas de acceso estandarizadas.", icon: Shield, color: "text-green-400", path: "/motor/gobernanza-odrl" },
      { title: "Multi-Tenant RLS", desc: "Aislamiento total de datos a nivel de fila.", icon: Users, color: "text-green-400", path: "/motor/multi-tenant-rls" },
      { title: "Audit Logs", desc: "Trazabilidad inmutable on-chain.", icon: FileText, color: "text-green-400", path: "/motor/audit-logs" },
      { title: "Modelo IDSA", desc: "Consumer, Subject y Holder diferenciados.", icon: Triangle, color: "text-green-400", path: "/motor/modelo-idsa" }
    ],
    integrations: [
      { title: "Conectores ERP", desc: "SAP, Oracle y Dynamics listos.", icon: Plug, color: "text-orange-400", path: "/motor/conectores-erp" },
      { title: "Edge Functions", desc: "Lógica serverless escalable globalmente.", icon: Zap, color: "text-orange-400", path: "/motor/edge-functions" }
    ],
    ux: [
      { title: "Tour Guiado", desc: "Onboarding interactivo paso a paso.", icon: HelpCircle, color: "text-teal-400", path: "/motor/tour-guiado" },
      { title: "Docs Interactivos", desc: "Diagramas de arquitectura en vivo.", icon: BookOpen, color: "text-teal-400", path: "/motor/docs-interactivos" }
    ]
  };

  const CATEGORY_LABELS: Record<string, string> = {
    web3: "Web3 & Blockchain",
    realtime: "Tiempo Real",
    security: "Seguridad",
    integrations: "Integraciones",
    ux: "Experiencia UX"
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar Simplificado */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="procuredata-gradient">PROCUREDATA</span>
            <Badge variant="outline" className="text-xs">DEMO PORTAL</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="hover:text-primary">Funcionalidades</a>
            <Link to="/models" className="hover:text-primary">Modelos de Negocio</Link>
            <a href="#use-cases" className="hover:text-primary">Casos de Uso</a>
            <Link to="/architecture" className="hover:text-primary">Arquitectura Técnica</Link>
            <Link 
              to="/whitepaper" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Tech Whitepaper</span>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Button asChild>
                <Link to="/dashboard">Ir al Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            ) : (
              <Button asChild variant="hero">
                <Link to="/auth">Acceso Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION - Textos oficiales según Memoria Técnica */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/25 dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.5))]" />
          <div className="container relative mx-auto px-4 text-center max-w-4xl">
            <Badge className="mb-4" variant="secondary">v3.1 Web3 Enabled</Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              PROCUREDATA <br />
              <span className="procuredata-gradient">Espacio de Datos para la Función de Compras</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Solución al problema 'nxm' en el alta de proveedores mediante identidades compartidas.
              Alta automática en tu ERP a partir de datos ya validados por otros clientes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-lg" asChild>
                <Link to="/auth">Probar Demo Interactiva</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
                <Link to="/docs/tecnico">Ver Memoria Técnica</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* DEMO HUB - ACCESO DIRECTO */}
        <section id="cases" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explora el Ecosistema</h2>
              <p className="text-muted-foreground">Acceso directo a los módulos de demostración con datos sintéticos.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {demoLinks.map((link) => (
                <Link key={link.url} to={link.url}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-t-4" style={{ borderTopColor: 'currentColor' }}>
                    <CardHeader>
                      <link.icon className={`h-8 w-8 mb-2 ${link.color}`} />
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm font-medium text-primary flex items-center">
                        Explorar <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* MODELOS DE NEGOCIO TEASER */}
        <section id="models" className="py-20 bg-gradient-to-b from-background to-slate-50">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              6 Modelos de Monetización
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Ecosistema de Valor Web3</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Desde comisiones por transacción hasta sandboxing de IA. 
              Descubre cómo PROCUREDATA habilita la economía del dato industrial.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/models">
                  Explorar Modelos <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/whitepaper">Ver Whitepaper</Link>
              </Button>
            </div>
          </div>
        </section>


        {/* FUNCIONALIDADES TÉCNICAS */}
        <section id="features" className="py-20 bg-slate-950 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">El Motor de ProcureData</h2>
              <p className="text-gray-400">12 capacidades enterprise listas para producción</p>
            </div>
            
            <Tabs defaultValue="web3" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white/5 mb-8 h-auto">
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white py-3"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {Object.entries(FEATURES_DATA).map(([category, items]) => (
                <TabsContent key={category} value={category}>
                  <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={category}
                  >
                    {items.map((feature, i) => (
                      <motion.div key={i} variants={cardVariants}>
                        <Link to={feature.path}>
                          <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
                            <CardHeader>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                                </div>
                                <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-400 mb-3">{feature.desc}</p>
                              <span className="text-xs text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                Ver detalle <ArrowRight className="h-3 w-3" />
                              </span>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="mt-12 text-center space-y-3">
              <Link to="/docs/tecnico" className="text-primary hover:underline underline-offset-4 flex items-center justify-center gap-2">
                Ver Documento Técnico Completo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/capacidades-enterprise" className="text-orange-500 hover:text-orange-400 font-semibold flex items-center justify-center gap-2 transition-colors">
                Documento Capacidades Enterprise → <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CASOS DE USO INDUSTRIALES */}
        <section id="use-cases" className="py-24 bg-slate-50 dark:bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Versatilidad Industrial
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Soluciones Reales para la Cadena de Suministro
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Desde la verificación de identidad hasta la financiación DeFi. 
                Descubre cómo PROCUREDATA transforma cada eslabón.
              </p>
            </div>
            <UseCasesCarousel />
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <span className="procuredata-gradient">PROCUREDATA</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Espacio de Datos para la Función de Compras con tecnología Web3.
              </p>
              <Badge variant="outline" className="text-xs border-gray-700">v3.1 Web3 Enabled</Badge>
            </div>

            {/* Plataforma */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Plataforma</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/catalog" className="hover:text-white transition-colors">Catálogo de Datos</Link></li>
                <li><Link to="/innovation" className="hover:text-white transition-colors">Innovation Lab</Link></li>
                <li><Link to="/sustainability" className="hover:text-white transition-colors">Hub Sostenibilidad</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Servicios</Link></li>
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Recursos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/docs/tecnico" className="hover:text-white transition-colors">Documentación Técnica</Link></li>
                <li><Link to="/architecture" className="hover:text-white transition-colors">Arquitectura</Link></li>
                <li><Link to="/whitepaper" className="hover:text-white transition-colors flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Tech Whitepaper
                </Link></li>
                <li><Link to="/guide" className="hover:text-white transition-colors">Guía del Ecosistema</Link></li>
              </ul>
            </div>

            {/* Transparencia - NUEVO según Memoria Técnica */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Transparencia</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/docs/tecnico" className="hover:text-white transition-colors">Memoria Técnica</Link></li>
                <li><Link to="/architecture" className="hover:text-white transition-colors">Modelo de Gobernanza</Link></li>
                <li><Link to="/user-guide" className="hover:text-white transition-colors">Guía de Usuario</Link></li>
                <li><Link to="/models" className="hover:text-white transition-colors">Plan de Negocio</Link></li>
              </ul>
            </div>

            {/* Acceso */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Acceso</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/auth" className="hover:text-white transition-colors">Iniciar Sesión</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors">Registrarse</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
          </div>


          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 PROCUREDATA. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>Powered by Pontus-X & Gaia-X</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">IDSA Compliant</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FundingFooter - Créditos oficiales según Memoria Técnica */}
      <FundingFooter variant="dark" showTransparency={false} />

      {/* Chatbot ARIA flotante */}
      <AIConcierge />
    </div>
  );
}
