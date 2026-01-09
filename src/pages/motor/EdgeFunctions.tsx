import { Link } from "react-router-dom";
import { Cpu, Shield, Zap, CheckCircle, Globe, Activity, Clock, Server } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalNavigation } from "@/components/GlobalNavigation";

export default function EdgeFunctions() {
  const nodes = [
    { location: "Madrid", latency: "12ms", status: "active" },
    { location: "Frankfurt", latency: "8ms", status: "active" },
    { location: "Paris", latency: "15ms", status: "active" },
    { location: "Amsterdam", latency: "11ms", status: "active" }
  ];

  const kpis = [
    { icon: Clock, value: "<15ms", label: "Latencia", color: "text-orange-500" },
    { icon: Activity, value: "€0.01", label: "Por 1K lecturas", color: "text-green-500" },
    { icon: Server, value: "4", label: "Nodos EU", color: "text-blue-500" },
  ];

  const functions = [
    { name: "Anonimización", desc: "Enmascara datos sensibles en tiempo real", status: "Activa" },
    { name: "Validación DID", desc: "Verifica firmas digitales de identidad", status: "Activa" },
    { name: "Agregación IoT", desc: "Consolida streams de sensores", status: "Activa" },
    { name: "Notarización", desc: "Genera hashes para blockchain", status: "Activa" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GlobalNavigation />
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <span className="procuredata-gradient font-bold text-xl">PROCUREDATA</span>
            </Link>
          </div>
          <Badge variant="outline" className="border-purple-500 text-purple-600">IoT Data Streams</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero con KPIs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-purple-500/15 border border-purple-500/30 mb-6">
            <Cpu className="h-10 w-10 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Edge Functions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Lógica de Negocio Escalable mediante procesamiento serverless distribuido
          </p>
          
          {/* KPIs */}
          <div className="flex justify-center gap-6 flex-wrap">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl"
              >
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                <div className="text-left">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sección: Por qué importa */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg shrink-0">
                  <Zap className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">¿Por qué importa?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    El cerebro operativo de ProcureData reside en las Edge Functions. En lugar de depender de un servidor centralizado lento, 
                    la lógica de negocio se ejecuta en <strong className="text-foreground">nodos distribuidos geográficamente</strong> cerca del usuario. 
                    Esto permite realizar tareas complejas como <strong className="text-purple-500">anonimización de datos en tiempo real</strong> o 
                    validación de firmas digitales en milisegundos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Red de Nodos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-500" />
                  Red de Nodos Edge
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Visualización de red simplificada */}
                <div className="relative h-48 mb-6 bg-muted/50 rounded-xl border border-border overflow-hidden">
                  {/* Nodo central */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center border-2 border-primary-foreground/30 z-10">
                    <span className="text-xs font-bold text-primary-foreground">Usuario</span>
                  </div>

                  {/* Nodos Edge */}
                  {nodes.map((node, i) => {
                    const angle = (i * 90) * (Math.PI / 180);
                    const radius = 80;
                    const x = 50 + Math.cos(angle) * radius / 2;
                    const y = 50 + Math.sin(angle) * radius / 2;
                    
                    return (
                      <div
                        key={i}
                        className="absolute w-14 h-14 bg-purple-500/20 rounded-full flex flex-col items-center justify-center border border-purple-500/40"
                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                      >
                        <Cpu className="h-4 w-4 text-purple-500 mb-1" />
                        <span className="text-[8px] font-medium">{node.location}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Tabla de latencia */}
                <div className="space-y-2">
                  {nodes.map((node, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm">{node.location}</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                        {node.latency}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ejemplo de código */}
            <Card className="bg-muted border-purple-500/30">
              <CardHeader className="border-b border-border bg-purple-500/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-mono">Edge Function: Anonimización</CardTitle>
                  <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30 text-xs">Deno</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <pre className="text-xs text-purple-500 font-mono overflow-x-auto">
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

          {/* Funciones disponibles y especificaciones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Funciones Edge disponibles */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Funciones Edge Disponibles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {functions.map((func, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{func.name}</p>
                      <p className="text-xs text-muted-foreground">{func.desc}</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">
                      {func.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Especificaciones */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Runtime", value: "Deno (seguro por defecto)" },
                  { label: "Escalabilidad", value: "Auto-escalado instantáneo según demanda" },
                  { label: "Seguridad", value: "Ejecución en entornos aislados (Isolates)" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">{spec.label}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/auth">Probar Demo</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/architecture">Ver Arquitectura</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}