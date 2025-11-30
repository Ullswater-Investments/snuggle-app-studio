import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Shield, Coins, Bot, Globe } from "lucide-react";

export default function Guide() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* SIDEBAR DE NAVEGACIÓN */}
      <aside className="w-64 border-r bg-muted/10 hidden md:block p-6">
        <div className="flex items-center gap-2 mb-8 text-blue-600 font-bold">
          <BookOpen className="h-6 w-6" />
          <span>PROCUREDATA DOCS</span>
        </div>
        <nav className="space-y-2 text-sm">
          <button onClick={() => scrollToSection('vision')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">1. Visión General</button>
          <button onClick={() => scrollToSection('roles')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">2. El Triángulo de Confianza</button>
          <button onClick={() => scrollToSection('features')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">3. Funcionalidades Core</button>
          <button onClick={() => scrollToSection('business')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">4. Modelo de Negocio</button>
          <button onClick={() => scrollToSection('tech')} className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">5. Arquitectura Técnica</button>
        </nav>
        <div className="mt-8 pt-8 border-t">
          <Link to="/">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" /> Volver a la App
            </Button>
          </Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-12 px-8">
          
          {/* HEADER */}
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">White Paper v2.5</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Guía del Ecosistema ProcureData</h1>
            <p className="text-xl text-muted-foreground">
              Manual técnico y comercial para usuarios, partners e integradores de la plataforma de datos soberanos.
            </p>
          </div>

          <Separator className="my-8" />

          {/* SECCIÓN 1: VISIÓN */}
          <section id="vision" className="space-y-6 mb-16">
            <h2 className="text-3xl font-bold flex items-center gap-2">1. Visión General <Globe className="h-6 w-6 text-blue-500"/></h2>
            <p className="leading-7 text-lg">
              <strong>PROCUREDATA</strong> es la infraestructura definitiva para la economía del dato. Transformamos el intercambio de información B2B (lento, inseguro y manual) en un <strong>Marketplace Transaccional</strong> instantáneo.
            </p>
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100">
              <CardContent className="p-4 italic text-blue-800 dark:text-blue-200">
                "No vendemos datos. Vendemos la certeza legal, técnica y financiera de que el dato puede ser utilizado."
              </CardContent>
            </Card>
          </section>

          {/* SECCIÓN 2: ROLES */}
          <section id="roles" className="space-y-6 mb-16">
            <h2 className="text-3xl font-bold flex items-center gap-2">2. Lógica de Negocio: El Triángulo de Confianza <Shield className="h-6 w-6 text-green-500"/></h2>
            <p className="leading-7">
              La plataforma orquesta tres actores fundamentales en cada transacción:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Proveedor (Provider)</h3>
                <p className="text-sm text-muted-foreground">Dueño intelectual. Define el precio y las reglas ODRL. Ej: <strong>Iberdrola Data Hub</strong>.</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Custodio (Holder)</h3>
                <p className="text-sm text-muted-foreground">Infraestructura técnica. Almacena y sirve los bits vía API. Ej: <strong>AWS S3</strong>.</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Consumidor (Consumer)</h3>
                <p className="text-sm text-muted-foreground">Adquirente. Paga y firma la licencia de uso. Ej: <strong>NovaTech Solutions</strong>.</p>
              </div>
            </div>
          </section>

          {/* SECCIÓN 3: FUNCIONALIDADES */}
          <section id="features" className="space-y-6 mb-16">
            <h2 className="text-3xl font-bold flex items-center gap-2">3. Funcionalidades Core <Bot className="h-6 w-6 text-purple-500"/></h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">A. Marketplace & Storefront</h3>
                <p className="text-muted-foreground mb-2">
                  Un catálogo visual (<code>/catalog</code>) con filtros avanzados. Permite descubrir activos "Green Data" (Sostenibles) y verificados (KYB).
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Data Sandbox:</strong> Previsualización real de 5-10 filas de datos antes de comprar.</li>
                  <li><strong>Bundles:</strong> Compra de paquetes de datos multisectoriales.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2">B. Sala de Negociación</h3>
                <p className="text-muted-foreground mb-2">
                  Los contratos B2B requieren diálogo. La <strong>Deal Room</strong> permite chatear, enviar contraofertas y modificar el Smart Contract en tiempo real antes de la firma.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2">C. Innovation Lab</h3>
                <p className="text-muted-foreground mb-2">
                  Módulo de inteligencia artificial (<code>/innovation</code>) que incluye:
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">AI Auditor</Badge>
                  <Badge variant="secondary">Predictive Simulator</Badge>
                  <Badge variant="secondary">Market Insights</Badge>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 4: MONETIZACIÓN */}
          <section id="business" className="space-y-6 mb-16">
            <h2 className="text-3xl font-bold flex items-center gap-2">4. Monetización <Coins className="h-6 w-6 text-yellow-500"/></h2>
            <p className="leading-7">
              El sistema soporta múltiples modelos económicos configurables por el vendedor:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="bg-muted/30 p-3 rounded"><strong>Pago Único:</strong> Compra perpetua del dataset.</li>
              <li className="bg-muted/30 p-3 rounded"><strong>Suscripción:</strong> Acceso recurrente (Mensual/Anual) a streams de datos vivos.</li>
              <li className="bg-muted/30 p-3 rounded"><strong>Fee de Plataforma:</strong> ProcureData retiene un % de cada transacción.</li>
              <li className="bg-muted/30 p-3 rounded"><strong>Freemium:</strong> Datos básicos gratuitos con opciones premium de pago.</li>
            </ul>
          </section>

          {/* SECCIÓN 5: TECNOLOGÍA */}
          <section id="tech" className="space-y-6 mb-24">
            <h2 className="text-3xl font-bold">5. Arquitectura Técnica</h2>
            <p className="leading-7">
              Construido sobre un stack moderno y escalable:
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>React + Vite</Badge>
              <Badge>Supabase (PostgreSQL)</Badge>
              <Badge>Tailwind CSS</Badge>
              <Badge>Recharts</Badge>
              <Badge>Edge Functions</Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Integraciones preparadas para <strong>Gaia-X</strong> mediante conectores EDC y soporte para <strong>Webhooks</strong> empresariales.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
