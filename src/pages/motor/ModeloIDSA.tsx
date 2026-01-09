import { Link } from "react-router-dom";
import { Network, Shield, Zap, CheckCircle, Globe, Users, Building, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalNavigation } from "@/components/GlobalNavigation";

export default function ModeloIDSA() {
  const roles = [
    { 
      name: "Consumer", 
      desc: "Quien solicita acceso a los datos", 
      icon: Users, 
      color: "bg-blue-500/15 border-blue-500/30",
      textColor: "text-blue-500"
    },
    { 
      name: "Subject", 
      desc: "Propietario legal del dato", 
      icon: Building, 
      color: "bg-purple-500/15 border-purple-500/30",
      textColor: "text-purple-500"
    },
    { 
      name: "Data Holder", 
      desc: "Custodio técnico neutral", 
      icon: Shield, 
      color: "bg-green-500/15 border-green-500/30",
      textColor: "text-green-500"
    }
  ];

  const kpis = [
    { icon: Globe, value: "Gaia-X", label: "Certificado", color: "text-blue-500" },
    { icon: Network, value: "IDSA", label: "Estándar", color: "text-purple-500" },
    { icon: Shield, value: "100%", label: "Interoperable", color: "text-green-500" },
  ];

  const dataSpaces = [
    { name: "Catena-X", desc: "Automoción" },
    { name: "GAIA-X", desc: "Infraestructura EU" },
    { name: "DSBA", desc: "Data Spaces Business Alliance" },
    { name: "Mobility DS", desc: "Movilidad" },
  ];

  const flowSteps = [
    { from: "Consumer", action: "Solicita datos", to: "Data Holder" },
    { from: "Data Holder", action: "Pide consentimiento", to: "Subject" },
    { from: "Subject", action: "Aprueba/Rechaza", to: "Data Holder" },
    { from: "Data Holder", action: "Libera datos (si aprobado)", to: "Consumer" },
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
          <Badge variant="outline" className="border-red-500 text-red-600">Compute-to-Data</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero con KPIs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/15 border border-red-500/30 mb-6">
            <Network className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Modelo IDSA</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Arquitectura Basada en el Estándar de la International Data Spaces Association
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
          <Card className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg shrink-0">
                  <Globe className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">¿Por qué importa?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ProcureData no es una isla tecnológica. Nuestra arquitectura sigue fielmente el modelo de referencia de la 
                    <strong className="text-foreground"> IDSA</strong>, el estándar de facto para el intercambio de datos en Europa. 
                    Esto garantiza <strong className="text-red-500">interoperabilidad futura</strong> con el ecosistema de datos europeo 
                    (Gaia-X, Catena-X, Mobility Data Space) sin quedarse atrapado en soluciones propietarias.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Roles Tripartitos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-12"
        >
          <h3 className="text-lg font-bold mb-4 text-center">Modelo Tripartito de Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((role, i) => (
              <Card key={i} className={`${role.color} border`}>
                <CardContent className="p-6 text-center">
                  <role.icon className={`h-10 w-10 mx-auto mb-3 ${role.textColor}`} />
                  <p className="font-bold text-lg">{role.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{role.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Flujo de datos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-primary" />
                  Flujo de Datos IDSA
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {flowSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>
                      <div className="flex-1 p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="text-xs">{step.from}</Badge>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{step.action}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <Badge variant="outline" className="text-xs">{step.to}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Spaces conectados y especificaciones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Data Spaces */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Network className="h-5 w-5 text-blue-500" />
                  Data Spaces Conectados
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {dataSpaces.map((ds, i) => (
                  <div key={i} className="p-3 bg-muted rounded-lg text-center">
                    <p className="font-medium text-sm">{ds.name}</p>
                    <p className="text-xs text-muted-foreground">{ds.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Especificaciones */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Arquitectura", value: "Basada en IDS Reference Architecture Model (IDS-RAM)" },
                  { label: "Roles", value: "Separación clara de responsabilidades técnicas y legales" },
                  { label: "Certificación", value: "Alineado con esquemas de confianza de Gaia-X" }
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