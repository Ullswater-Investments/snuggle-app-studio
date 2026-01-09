import { Link } from "react-router-dom";
import { History, Shield, Zap, CheckCircle, ExternalLink, Hash, FileCheck, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GlobalNavigation } from "@/components/GlobalNavigation";

export default function AuditLogs() {
  const logs = [
    { timestamp: "2026-01-07 14:32:01", action: "Firma Contrato ODRL", actor: "did:ethr:0x7ecc...a4b2", hash: "0x9f2a...b3c1", verified: true },
    { timestamp: "2026-01-07 14:30:45", action: "Liberación Activo Datos", actor: "did:ethr:0x3df1...c8e9", hash: "0x8e1b...d4f2", verified: true },
    { timestamp: "2026-01-07 14:28:12", action: "Pago 500 EUROe", actor: "did:ethr:0x7ecc...a4b2", hash: "0x7c0a...e5a3", verified: true },
    { timestamp: "2026-01-07 14:25:33", action: "Solicitud Acceso Datos", actor: "did:ethr:0x9ab2...f123", hash: "0x6b9f...f6b4", verified: true },
    { timestamp: "2026-01-07 14:20:18", action: "Actualización Certificado", actor: "did:ethr:0x3df1...c8e9", hash: "0x5a8e...a7c5", verified: true }
  ];

  const kpis = [
    { icon: History, value: "100%", label: "Trazabilidad", color: "text-green-500" },
    { icon: CheckCircle, value: "∞", label: "Inmutabilidad", color: "text-blue-500" },
    { icon: Shield, value: "DID", label: "Identidad", color: "text-purple-500" },
  ];

  const stats = [
    { label: "Transacciones hoy", value: "1,247", change: "+12%" },
    { label: "Verificaciones API", value: "8,932", change: "+23%" },
    { label: "Certificados emitidos", value: "456", change: "+8%" },
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
          <Badge variant="outline" className="border-green-500 text-green-600">Auditoría Blockchain</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero con KPIs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-green-500/15 border border-green-500/30 mb-6">
            <History className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Audit Logs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Registros de Auditoría Inmutables mediante notarización en blockchain
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
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg shrink-0">
                  <FileCheck className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">¿Por qué importa?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Cada entrada del log genera una <strong className="text-foreground">huella criptográfica</strong> que se ancla 
                    automáticamente en la red Pontus-X. Esto proporciona <strong className="text-green-500">evidencia legal irrefutable</strong> ante 
                    disputas, auditorías regulatorias (ISO/GDPR/CSRD) y verificación de cumplimiento por terceros.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Mini-Dashboard de Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {stats.map((stat, i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30">{stat.change}</Badge>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Tabla de Auditoría */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border bg-muted/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5 text-green-500" />
                    Registro de Auditoría
                  </CardTitle>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">En vivo</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-muted-foreground">Timestamp</TableHead>
                        <TableHead className="text-muted-foreground">Acción</TableHead>
                        <TableHead className="text-muted-foreground">Actor (DID)</TableHead>
                        <TableHead className="text-muted-foreground text-right">Blockchain</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log, i) => (
                        <TableRow key={i} className="border-border">
                          <TableCell className="font-mono text-xs text-muted-foreground">{log.timestamp}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell className="font-mono text-xs text-purple-500">{log.actor}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="text-green-500 gap-1">
                              <Hash className="h-3 w-3" />
                              <span className="font-mono text-xs">{log.hash}</span>
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Verificación Blockchain */}
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30 mt-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-500/20 rounded-lg shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">Verificación Blockchain</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Cada registro genera una huella criptográfica anclada en Pontus-X
                    </p>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-mono text-xs text-green-500">
                        Block #42901 | Tx: 0x9f2a...b3c1 | ✓ Verified
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar - Especificaciones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Especificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Persistencia", value: "Layer 1 Blockchain" },
                  { label: "Verificabilidad", value: "Validación de hashes pública" },
                  { label: "Detalle", value: "IP, DID, Timestamp, Acción" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{spec.label}</p>
                      <p className="text-xs text-muted-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg shrink-0">
                    <Zap className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Evidencia Legal</h3>
                    <p className="text-xs text-muted-foreground">
                      Reduzca el coste de auditorías con <strong className="text-orange-500">prueba fehaciente</strong> ante disputas legales.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/auth">Demo</Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link to="/architecture">Arquitectura</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}