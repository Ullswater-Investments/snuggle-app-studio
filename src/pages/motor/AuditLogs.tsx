import { Link } from "react-router-dom";
import { ArrowLeft, History, Shield, Zap, CheckCircle, ExternalLink, Hash } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AuditLogs() {
  const logs = [
    { timestamp: "2026-01-07 14:32:01", action: "Firma Contrato ODRL", actor: "did:ethr:0x7ecc...a4b2", hash: "0x9f2a...b3c1", verified: true },
    { timestamp: "2026-01-07 14:30:45", action: "Liberación Activo Datos", actor: "did:ethr:0x3df1...c8e9", hash: "0x8e1b...d4f2", verified: true },
    { timestamp: "2026-01-07 14:28:12", action: "Pago 500 EUROe", actor: "did:ethr:0x7ecc...a4b2", hash: "0x7c0a...e5a3", verified: true },
    { timestamp: "2026-01-07 14:25:33", action: "Solicitud Acceso Datos", actor: "did:ethr:0x9ab2...f123", hash: "0x6b9f...f6b4", verified: true },
    { timestamp: "2026-01-07 14:20:18", action: "Actualización Certificado", actor: "did:ethr:0x3df1...c8e9", hash: "0x5a8e...a7c5", verified: true }
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
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <History className="h-12 w-12 text-green-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Audit Logs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Registros de Auditoría Inmutables mediante notarización en blockchain
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Audit Table - Takes more space */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="bg-card dark:bg-white/5 border-border dark:border-white/10 overflow-hidden">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted/50 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <History className="h-5 w-5 text-green-400" />
                    Registro de Auditoría
                  </CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    En vivo
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border dark:border-white/10 hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Timestamp</TableHead>
                        <TableHead className="text-muted-foreground">Acción</TableHead>
                        <TableHead className="text-muted-foreground">Actor (DID)</TableHead>
                        <TableHead className="text-muted-foreground text-right">Blockchain</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="border-border dark:border-white/5 hover:bg-accent dark:hover:bg-white/5"
                        >
                          <TableCell className="font-mono text-xs text-muted-foreground">{log.timestamp}</TableCell>
                          <TableCell className="text-foreground">{log.action}</TableCell>
                          <TableCell className="font-mono text-xs text-purple-400">{log.actor}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-green-400 hover:text-green-300 hover:bg-green-500/10 gap-1"
                            >
                              <Hash className="h-3 w-3" />
                              <span className="font-mono text-xs">{log.hash}</span>
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Verification Modal Simulation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">Verificación Blockchain</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Cada registro genera una huella criptográfica (hash) anclada en Pontus-X
                      </p>
                      <div className="p-3 bg-muted dark:bg-black/40 rounded-lg">
                        <p className="font-mono text-xs text-green-400">
                          Block #42901 | Tx: 0x9f2a...b3c1 | ✓ Verified
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Content - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Transparencia Inmutable</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                El sistema genera un registro pormenorizado de cada acción crítica. Lo que nos diferencia
                es la integridad: cada entrada del log genera una huella criptográfica que se ancla 
                automáticamente en la red Pontus-X.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-br from-green-900/20 to-muted dark:to-slate-900 border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground text-base flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  Especificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Persistencia", value: "Layer 1 Blockchain" },
                  { label: "Verificabilidad", value: "Validación de hashes" },
                  { label: "Detalle", value: "IP, DID, Timestamp, Acción" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{spec.label}</p>
                      <p className="text-xs text-muted-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Benefit */}
            <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Zap className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-1">Evidencia Legal</h3>
                    <p className="text-xs text-muted-foreground">
                      Reduzca el coste de auditorías con <strong className="text-orange-400">prueba fehaciente</strong> ante 
                      disputas legales (ISO/GDPR/CSRD).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-3">
              <Button asChild variant="outline" size="sm" className="flex-1 border-white/20 hover:bg-white/10">
                <Link to="/auth">Demo</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                <Link to="/architecture">Arquitectura</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
