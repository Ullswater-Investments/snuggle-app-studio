import { Link } from "react-router-dom";
import { ArrowRight, Database, Shield, Zap, Globe, Layers, CheckCircle, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";

export default function Landing() {
  const { user } = useAuth();

  const demoLinks = [
    { title: "Innovation Lab", icon: Zap, url: "/innovation", desc: "25+ Líneas de negocio futuras", color: "text-yellow-500" },
    { title: "Catálogo de Datos", icon: Database, url: "/catalog", desc: "Marketplace federado 10x10", color: "text-blue-500" },
    { title: "Hub Sostenibilidad", icon: Globe, url: "/sustainability", desc: "Reportes ESG y Huella de Carbono", color: "text-green-500" },
    { title: "Gestión de Servicios", icon: Layers, url: "/services", desc: "Algoritmos y Compute-to-Data", color: "text-purple-500" },
  ];

  const features = [
    { title: "Gobernanza ODRL 2.0", desc: "Políticas de acceso estandarizadas internacionalmente." },
    { title: "Multi-Tenant", desc: "Aislamiento total de datos entre Consumers, Providers y Holders." },
    { title: "Trazabilidad Total", desc: "Logs inmutables de cada transacción y acceso." },
    { title: "Integración ERP", desc: "Conectores listos para SAP, Oracle y Microsoft Dynamics." },
  ];

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
            <a href="#models" className="hover:text-primary">Modelos de Negocio</a>
            <a href="#cases" className="hover:text-primary">Casos de Uso</a>
            <Link to="/architecture" className="hover:text-primary">Arquitectura Técnica</Link>
            <Link 
              to="/whitepaper" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Tech Whitepaper</span>
            </Link>
          </nav>
          <div className="flex gap-4">
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
        {/* HERO SECTION */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-900/25 dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.5))]" />
          <div className="container relative mx-auto px-4 text-center max-w-4xl">
            <Badge className="mb-4" variant="secondary">Versión 2.0 - Innovation Lab Incluido</Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              El Espacio de Datos <br />
              <span className="procuredata-gradient">Federado y Seguro</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Plataforma transversal para la monetización, gobernanza y compartición de datos industriales. 
              Desde ESG y IoT hasta Finanzas y Legal.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-lg" asChild>
                <Link to="/auth">Probar Demo Interactiva</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
                <Link to="/docs/tecnico">Ver Documentación Técnica</Link>
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

        {/* MODELOS DE NEGOCIO & RETRIBUCIÓN */}
        <section id="models" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Modelos de Retribución Flexibles</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  PROCUREDATA no solo gestiona el acceso, sino que habilita la economía del dato. 
                  Soporta múltiples modelos de monetización nativos.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "Suscripción Recurrente", desc: "Acceso ilimitado a datasets vivos (ej. Clima, Bolsa)." },
                    { title: "Pay-per-API-Call", desc: "Micro-pagos por cada consulta de validación." },
                    { title: "Revenue Share (Smart Contracts)", desc: "Reparto automático de beneficios entre generadores de datos." },
                    { title: "Freemium / Open Data", desc: "Capas gratuitas para fomentar la adopción." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>Caso de Éxito: EcoAuto</span>
                      <Badge>Automoción</Badge>
                    </CardTitle>
                    <CardDescription>Monetización de Datos de Baterías</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">EcoAuto monetiza la telemetría de baterías vendiéndola a aseguradoras (para ajustar primas) y a recicladores (para prever stock), generando <strong>+1.5M€/año</strong> en nuevos ingresos.</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>Caso de Éxito: AgriFood Coop</span>
                      <Badge>Agricultura</Badge>
                    </CardTitle>
                    <CardDescription>Optimización Logística Compartida</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Cooperativas comparten datos de capacidad de carga de camiones. Resultado: reducción del <strong>30% en viajes en vacío</strong> y bajada drástica de huella de carbono.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CASOS DE ÉXITO */}
        <SuccessStoriesSection />

        {/* FUNCIONALIDADES TÉCNICAS */}
        <section id="features" className="py-20 bg-slate-950 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Potencia Industrial bajo el Capó</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {features.map((f, i) => (
                <div key={i} className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Link to="/docs/tecnico" className="text-primary hover:underline underline-offset-4 flex items-center justify-center gap-2">
                Ver Documento Técnico Completo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="procuredata-gradient">PROCUREDATA</span>
            <span className="text-xs text-muted-foreground">© 2024</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/auth" className="hover:text-foreground">Acceso Demo</Link>
            <Link to="/guide" className="hover:text-foreground">Guía del Ecosistema</Link>
            <Link to="/docs/tecnico" className="hover:text-foreground">Documentación Técnica</Link>
            <Link 
              to="/whitepaper" 
              className="hover:text-foreground flex items-center gap-1.5 text-primary font-medium"
            >
              <Sparkles className="h-4 w-4" />
              Cómo funciona (Tech Whitepaper)
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
