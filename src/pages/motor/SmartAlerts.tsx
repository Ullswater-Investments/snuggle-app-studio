import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Shield, Zap, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function SmartAlerts() {
  const alerts = [
    { 
      level: "critical", 
      title: "Riesgo detectado: Caducidad de seguro RC", 
      desc: "Proveedor Crítico Industrial-X en 48h",
      icon: AlertCircle
    },
    { 
      level: "warning", 
      title: "Certificado ISO 14001 próximo a expirar", 
      desc: "TechSupply S.L. - 15 días restantes",
      icon: AlertTriangle
    },
    { 
      level: "info", 
      title: "Actualización de score ESG disponible", 
      desc: "3 proveedores con nuevos datos de sostenibilidad",
      icon: Info
    }
  ];

  const getAlertStyle = (level: string) => {
    switch (level) {
      case "critical": return "border-red-500/30 bg-red-500/10";
      case "warning": return "border-orange-500/30 bg-orange-500/10";
      default: return "border-blue-500/30 bg-blue-500/10";
    }
  };

  const getIconStyle = (level: string) => {
    switch (level) {
      case "critical": return "text-red-400 bg-red-500/20";
      case "warning": return "text-orange-400 bg-orange-500/20";
      default: return "text-blue-400 bg-blue-500/20";
    }
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
          <Badge variant="outline" className="border-blue-500 text-blue-400">Tiempo Real</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Bell className="h-12 w-12 text-orange-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Alerts</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Inteligencia Proactiva de Riesgos mediante motores de reglas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Alerts Dashboard Simulation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Risk Gauges */}
            <Card className="bg-card dark:bg-white/5 border-border dark:border-white/10 overflow-hidden">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted dark:bg-white/5">
                <CardTitle className="text-foreground">Panel de Riesgo de Proveedores</CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-3 gap-4">
                {[
                  { label: "Sector Agro", value: 40, color: "bg-orange-500" },
                  { label: "Industrial", value: 85, color: "bg-green-500" },
                  { label: "Servicios", value: 65, color: "bg-yellow-500" }
                ].map((gauge, i) => (
                  <div key={i} className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="none" className="text-white/10" />
                        <motion.circle 
                          cx="40" cy="40" r="35" 
                          stroke="currentColor" 
                          strokeWidth="6" 
                          fill="none" 
                          className={gauge.value > 70 ? "text-green-500" : gauge.value > 40 ? "text-yellow-500" : "text-orange-500"}
                          strokeDasharray={`${gauge.value * 2.2} 220`}
                          initial={{ strokeDasharray: "0 220" }}
                          animate={{ strokeDasharray: `${gauge.value * 2.2} 220` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">{gauge.value}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{gauge.label}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Active Alerts */}
            <Card className="bg-card dark:bg-white/5 border-border dark:border-white/10 overflow-hidden">
              <CardHeader className="border-b border-border dark:border-white/10 bg-muted dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-400" />
                    Alertas Activas
                  </CardTitle>
                  <Badge variant="destructive">3 Pendientes</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {alerts.map((alert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={`p-4 rounded-lg border ${getAlertStyle(alert.level)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getIconStyle(alert.level)}`}>
                        <alert.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{alert.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.desc}</p>
                      </div>
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
              <h2 className="text-2xl font-bold mb-4">Monitorización Proactiva 24/7</h2>
              <p className="text-muted-foreground leading-relaxed">
                El motor de alertas de ProcureData transforma los datos pasivos en acciones preventivas. 
                El sistema monitoriza constantemente las fechas de caducidad de certificados ISO, las 
                pólizas de Responsabilidad Civil y los scores de riesgo financiero de sus proveedores.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                En lugar de realizar revisiones manuales trimestrales, las Smart Alerts notifican a los 
                responsables de compras en el momento exacto en que un proveedor deja de cumplir con los 
                requisitos mínimos de contratación.
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
                  { label: "Lógica", value: "Motor de reglas basado en Edge Functions de alto rendimiento" },
                  { label: "Canales", value: "Notificaciones in-app, Webhooks hacia ERP y email cifrado" },
                  { label: "Personalización", value: "Umbrales de riesgo configurables por sector y criticidad" }
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
                    <h3 className="font-bold text-foreground mb-2">Mitigación de Riesgos</h3>
                    <p className="text-muted-foreground">
                      Reduzca a <strong className="text-orange-400">cero el riesgo</strong> de trabajar con 
                      proveedores con documentación caducada. Proteja la continuidad de su negocio mediante 
                      una vigilancia automática y permanente.
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
