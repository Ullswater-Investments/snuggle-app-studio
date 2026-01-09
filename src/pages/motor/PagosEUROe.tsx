import { Link } from "react-router-dom";
import { Coins, Shield, Zap, CheckCircle, Clock, ArrowRightLeft, TrendingUp, BadgeCheck, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalNavigation } from "@/components/GlobalNavigation";

export default function PagosEUROe() {
  const kpis = [
    { icon: Clock, value: "2s", label: "Liquidación", color: "text-green-500" },
    { icon: TrendingUp, value: "0%", label: "Impagos", color: "text-blue-500" },
    { icon: BadgeCheck, value: "MiCA", label: "Regulado", color: "text-purple-500" },
  ];

  const steps = [
    { step: "1", title: "Solicitud", desc: "El comprador solicita acceso al dataset" },
    { step: "2", title: "Contrato", desc: "Se genera automáticamente contrato ODRL + precio" },
    { step: "3", title: "Escrow", desc: "El pago se bloquea en Smart Contract" },
    { step: "4", title: "Liberación", desc: "Al verificar recepción, el pago se libera al proveedor" },
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
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">Marketplace Fee</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero con KPIs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-yellow-500/15 border border-yellow-500/30 mb-6">
            <Coins className="h-10 w-10 text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pagos EUROe</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Liquidación Instantánea en moneda regulada bajo normativa MiCA
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
          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg shrink-0">
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">¿Por qué importa?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Las transferencias bancarias tradicionales tardan de <strong className="text-foreground">24 a 72 horas</strong> y 
                    generan fricción administrativa. Con EUROe, cada transacción se liquida en segundos vía Smart Contract, 
                    eliminando impagos y la necesidad de perseguir facturas. El modelo de <strong className="text-yellow-500">Escrow (Garantía)</strong> protege 
                    a ambas partes: el pago se libera automáticamente al verificar la recepción de datos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Cómo funciona - Pasos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-yellow-500" />
                  Cómo Funciona
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-yellow-600">{step.step}</span>
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="font-medium">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                      {i < steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Panel de Comparativa y Especificaciones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Comparativa */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                  Comparativa de Tiempos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Transferencia Tradicional</span>
                    <span className="text-destructive font-medium">3-5 días</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-destructive/60 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Pago EUROe</span>
                    <span className="text-green-500 font-medium">2 segundos</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[2%] bg-green-500 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Especificaciones */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-yellow-500" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Tipo de Activo", value: "Token ERC-20 regulado por MiCA" },
                  { label: "Red", value: "Pontus-X (Ecosistema Gaia-X)" },
                  { label: "Tarifa Base", value: "1.00 EUROe por transacción (Tier Gratuito)" }
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
          </motion.div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30 inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">¿Listo para eliminar la fricción financiera?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Prueba el sistema de pagos EUROe y experimenta la liquidación instantánea.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/auth">Probar Demo</Link>
                </Button>
                <Button asChild className="bg-yellow-600 hover:bg-yellow-700 text-black">
                  <Link to="/architecture">Ver Arquitectura</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}