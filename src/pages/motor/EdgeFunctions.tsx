import { Link } from "react-router-dom";
import { ArrowLeft, Cpu, Shield, Zap, CheckCircle, Globe, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EdgeFunctions() {
  const nodes = [
    { location: "Madrid", latency: "12ms", status: "active" },
    { location: "Frankfurt", latency: "8ms", status: "active" },
    { location: "Paris", latency: "15ms", status: "active" },
    { location: "Amsterdam", latency: "11ms", status: "active" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/#features" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al Motor
          </Link>
          <Badge variant="outline" className="border-orange-500 text-orange-400">Integraciones</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-600/20 border border-orange-500/30 mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cpu className="h-12 w-12 text-orange-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Edge Functions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lógica de Negocio Escalable mediante procesamiento serverless distribuido
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Edge Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Network Diagram */}
            <Card className="bg-card dark:bg-gradient-to-br dark:from-slate-900 dark:to-orange-900/20 border-border dark:border-orange-500/30 overflow-hidden">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted dark:bg-white/5">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Globe className="h-5 w-5 text-orange-400" />
                  Red de Nodos Edge
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Simplified globe visualization */}
                <div className="relative h-48 mb-6">
                  {/* Central User */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center border-2 border-white/30 z-10"
                  >
                    <span className="text-xs font-bold text-white">Usuario</span>
                  </motion.div>

                  {/* Edge Nodes */}
                  {nodes.map((node, i) => {
                    const angle = (i * 90) * (Math.PI / 180);
                    const radius = 80;
                    const x = 50 + Math.cos(angle) * radius / 2;
                    const y = 50 + Math.sin(angle) * radius / 2;
                    
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="absolute w-14 h-14 bg-orange-500/20 rounded-full flex flex-col items-center justify-center border border-orange-500/40"
                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                      >
                        <Cpu className="h-4 w-4 text-orange-400 mb-1" />
                        <span className="text-[8px] text-foreground dark:text-white">{node.location}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Latency Table */}
                <div className="space-y-2">
                  {nodes.map((node, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted dark:bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-foreground">{node.location}</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {node.latency}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Code Example */}
            <Card className="bg-muted dark:bg-black/60 border-border dark:border-orange-500/30">
              <CardHeader className="border-b border-border dark:border-white/10 bg-orange-500/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground text-sm font-mono">Edge Function: Anonimización</CardTitle>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">Deno</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <pre className="text-xs text-orange-400 font-mono overflow-x-auto">
{`// Procesamiento en el borde
export async function handler(req) {
  const data = await req.json();
  
  // Anonimizar datos sensibles
  const anonymized = {
    ...data,
    email: maskEmail(data.email),
    phone: '***-***-' + data.phone.slice(-4)
  };
  
  return new Response(
    JSON.stringify(anonymized),
    { headers: { 'X-Edge-Location': 'eu-west' } }
  );
}`}
                </pre>
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
              <h2 className="text-2xl font-bold mb-4">Inteligencia Distribuida</h2>
              <p className="text-muted-foreground leading-relaxed">
                El cerebro operativo de ProcureData reside en las Edge Functions. En lugar de depender 
                de un servidor centralizado lento, la lógica de negocio —incluyendo la IA de ARIA y el 
                procesamiento de datos— se ejecuta en <strong className="text-foreground">nodos distribuidos 
                geográficamente</strong> cerca del usuario.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Esto permite realizar tareas complejas, como la anonimización de datos en tiempo real 
                o la validación de firmas digitales, en milisegundos. Los datos sensibles se filtran 
                y protegen antes de llegar a cualquier base de datos.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-card dark:bg-gradient-to-br dark:from-orange-900/20 dark:to-slate-900 border-border dark:border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Runtime", value: "Deno (seguro por defecto)" },
                  { label: "Escalabilidad", value: "Auto-escalado instantáneo según demanda de tráfico" },
                  { label: "Seguridad", value: "Ejecución en entornos aislados (Isolates)" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{spec.label}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
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
                    <h3 className="font-bold text-foreground mb-2">Rendimiento Global</h3>
                    <p className="text-muted-foreground">
                      Garantice una experiencia fluida para sus equipos de compras 
                      <strong className="text-orange-400"> en cualquier lugar del mundo</strong>, con la 
                      seguridad de que el procesamiento cumple con las normativas locales.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1 border-border dark:border-white/20 hover:bg-accent dark:hover:bg-white/10">
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
