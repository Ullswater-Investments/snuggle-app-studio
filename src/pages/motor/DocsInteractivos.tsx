import { Link } from "react-router-dom";
import { ArrowLeft, BookOpenCheck, Shield, Zap, CheckCircle, Play, Code } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DocsInteractivos() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunApi = () => {
    setIsLoading(true);
    setTimeout(() => {
      setApiResponse(JSON.stringify({
        success: true,
        data: {
          organization_id: "org_demo_123",
          reputation_score: 87.5,
          verified_attributes: ["ISO_9001", "ISO_14001", "CIF_VALID"],
          created_at: "2026-01-07T14:32:01Z"
        }
      }, null, 2));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/#features" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al Motor
          </Link>
          <Badge variant="outline" className="border-teal-500 text-teal-400">Experiencia UX</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-500/30 mb-6">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <BookOpenCheck className="h-12 w-12 text-teal-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Docs Interactivos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Documentación Viva para equipos de desarrollo de grado enterprise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive API Playground */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* API Request */}
            <Card className="bg-gradient-to-br from-muted dark:from-slate-900 to-teal-900/20 border-teal-500/30 overflow-hidden">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted/50 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Code className="h-5 w-5 text-teal-400" />
                    API Playground
                  </CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">GET</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {/* Endpoint */}
                <div className="p-3 bg-muted dark:bg-black/40 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Endpoint</p>
                  <p className="font-mono text-sm text-teal-400">/api/v1/organizations/{"{org_id}"}</p>
                </div>

                {/* Request Code */}
                <div className="p-3 bg-muted dark:bg-black/40 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Request</p>
                  <pre className="text-xs text-muted-foreground font-mono overflow-x-auto">
{`curl -X GET \\
  https://api.procuredata.eu/v1/organizations/demo \\
  -H "Authorization: Bearer {API_KEY}" \\
  -H "Content-Type: application/json"`}
                  </pre>
                </div>

                {/* Run Button */}
                <Button 
                  onClick={handleRunApi}
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isLoading ? "Ejecutando..." : "Ejecutar Ahora"}
                </Button>

                {/* Response */}
                {apiResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-green-400">Response 200 OK</p>
                      <Badge className="bg-green-500/20 text-green-400 text-xs">12ms</Badge>
                    </div>
                    <pre className="text-xs text-green-300 font-mono overflow-x-auto">
                      {apiResponse}
                    </pre>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Documentation Sections */}
            <Card className="bg-card dark:bg-white/5 border-border dark:border-white/10">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted/50 dark:bg-white/5">
                <CardTitle className="text-foreground text-sm">Secciones de Documentación</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {[
                  { title: "Autenticación", desc: "API Keys, JWT y OAuth 2.0", icon: "🔐" },
                  { title: "Organizaciones", desc: "CRUD y gestión de perfiles", icon: "🏢" },
                  { title: "Transacciones", desc: "Flujo de datos y políticas", icon: "🔄" },
                  { title: "Webhooks", desc: "Eventos y notificaciones", icon: "🪝" },
                  { title: "SDKs", desc: "JavaScript, Python, Java", icon: "📦" }
                ].map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-muted dark:bg-white/5 rounded-lg hover:bg-accent dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span className="text-xl">{section.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{section.title}</p>
                      <p className="text-xs text-muted-foreground/70">{section.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Documentación de Grado Desarrollador</h2>
              <p className="text-muted-foreground leading-relaxed">
                En ProcureData creemos que una tecnología potente debe ser fácil de implementar. 
                Por ello, hemos creado una plataforma de documentación interactiva diseñada para 
                equipos de IT y desarrolladores.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Nuestros Docs Interactivos permiten <strong className="text-foreground">probar cada endpoint 
                de la API</strong>, visualizar diagramas de arquitectura dinámicos y ejecutar fragmentos 
                de código directamente desde el navegador.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-br from-teal-900/20 to-muted dark:to-slate-900 border-teal-500/20">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Estándar", value: "Basado en OpenAPI 3.0" },
                  { label: "Tooling", value: "Playground de API con tokens de prueba" },
                  { label: "Contenido", value: "Guías sincronizadas con código fuente en GitHub" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{spec.label}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* OpenAPI Badge */}
            <Card className="bg-muted dark:bg-black/40 border-border dark:border-white/10">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Code className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">OpenAPI 3.0 Spec</p>
                  <p className="text-xs text-muted-foreground">Descarga la especificación completa</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Descargar
                </Button>
              </CardContent>
            </Card>

            {/* Business Benefit */}
            <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <Zap className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Reducción de Costes de IT</h3>
                    <p className="text-muted-foreground">
                      Minimice el tiempo de desarrollo e integración. Facilite que sus ingenieros 
                      se conviertan en <strong className="text-orange-400">expertos en ProcureData 
                      de forma autónoma</strong> y eficiente.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1 border-white/20 hover:bg-white/10">
                <Link to="/auth">Probar Demo</Link>
              </Button>
              <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                <Link to="/architecture">Ver Arquitectura</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
