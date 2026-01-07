import { Link } from "react-router-dom";
import { ArrowLeft, Database, Shield, Zap, CheckCircle, Lock, Key } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function MultiTenantRLS() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/#features" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al Motor
          </Link>
          <Badge variant="outline" className="border-green-500 text-green-400">Seguridad</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Database className="h-12 w-12 text-green-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Multi-Tenant RLS</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aislamiento de Datos Nivel Enterprise mediante Row Level Security
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Vault Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card dark:bg-gradient-to-br dark:from-slate-900 dark:to-green-900/20 border-border dark:border-green-500/30 overflow-hidden">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted dark:bg-white/5">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-400" />
                  Cámara Acorazada Digital
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Vault Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { name: "Empresa A", color: "from-blue-500/20 to-blue-600/20 border-blue-500/30", rows: "Filas 1-500" },
                    { name: "Empresa B", color: "from-purple-500/20 to-purple-600/20 border-purple-500/30", rows: "Filas 501-1000" },
                    { name: "Empresa C", color: "from-green-500/20 to-green-600/20 border-green-500/30", rows: "Filas 1001-1500" },
                    { name: "Empresa D", color: "from-orange-500/20 to-orange-600/20 border-orange-500/30", rows: "Filas 1501-2000" }
                  ].map((vault, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className={`p-4 rounded-xl bg-gradient-to-br ${vault.color} border relative`}
                    >
                      <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground text-center">{vault.name}</p>
                      <p className="text-xs text-muted-foreground text-center">{vault.rows}</p>
                      <div className="absolute top-2 right-2">
                        <Key className="h-4 w-4 text-yellow-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Access Attempt Simulation */}
                <div className="bg-muted dark:bg-black/40 rounded-xl p-4 space-y-3">
                  <p className="text-xs text-muted-foreground font-mono">// Intento de acceso</p>
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-400 font-mono">
                      ❌ Empresa A no puede ver la fila 502 de Empresa B
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm text-green-400 font-mono">
                      ✓ Empresa A accede a fila 250 (propia)
                    </p>
                  </div>
                </div>

                {/* JWT Token Display */}
                <div className="mt-4 p-4 bg-muted dark:bg-white/5 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Token JWT de Empresa A</p>
                  <p className="font-mono text-xs text-green-400 break-all">
                    eyJhbGciOiJIUzI1NiIs...org_id:"empresa_a"
                  </p>
                </div>
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
              <h2 className="text-2xl font-bold mb-4">Seguridad por Diseño</h2>
              <p className="text-muted-foreground leading-relaxed">
                ProcureData utiliza una arquitectura de base de datos multitenencia protegida por 
                <strong className="text-foreground"> Row Level Security (RLS)</strong>. Esto significa que, 
                aunque miles de empresas utilicen el mismo motor, las políticas de seguridad están 
                incrustadas en la propia capa de datos de PostgreSQL.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Es el equivalente digital a que cada empresa tenga su propia <strong className="text-foreground">caja fuerte física</strong> dentro 
                de una cámara acorazada común, donde solo su identidad digital (JWT) tiene la llave única de apertura.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-card dark:bg-gradient-to-br dark:from-green-900/20 dark:to-slate-900 border-border dark:border-green-500/20">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Mecanismo", value: "Políticas RLS de PostgreSQL a nivel de motor de BD" },
                  { label: "Identidad", value: "Validación mediante tokens JWT firmados y verificados" },
                  { label: "Auditoría", value: "Logs de acceso individuales por organización" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{spec.label}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SQL Example */}
            <Card className="bg-muted dark:bg-black/60 border-border dark:border-green-500/30">
              <CardHeader className="border-b border-border dark:border-white/10 bg-green-500/10">
                <CardTitle className="text-foreground text-sm font-mono">Política RLS Ejemplo</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <pre className="text-xs text-green-400 font-mono overflow-x-auto">
{`CREATE POLICY "org_isolation" 
ON data_transactions
FOR ALL
USING (
  organization_id = (
    SELECT org_id FROM auth.jwt()
  )
);`}
                </pre>
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
                    <h3 className="font-bold text-foreground mb-2">Confianza Total</h3>
                    <p className="text-muted-foreground">
                      Colabore en un espacio compartido con la <strong className="text-orange-400">absoluta certeza</strong> de 
                      que sus secretos comerciales y datos de precios están blindados frente a cualquier 
                      competidor o tercero no autorizado.
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
