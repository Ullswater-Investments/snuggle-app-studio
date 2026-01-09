import { Link } from "react-router-dom";
import { Plug, Shield, Zap, CheckCircle, Settings, ArrowRightLeft, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalNavigation } from "@/components/GlobalNavigation";

export default function ConectoresERP() {
  const connectors = [
    { name: "SAP S/4HANA", status: "Certificado", logo: "SAP", color: "bg-blue-500" },
    { name: "Oracle Cloud", status: "Certificado", logo: "ORC", color: "bg-red-500" },
    { name: "Microsoft Dynamics", status: "Certificado", logo: "DYN", color: "bg-green-500" },
    { name: "Sage 200", status: "Disponible", logo: "SGE", color: "bg-purple-500" }
  ];

  const upcoming = [
    { name: "Odoo", status: "Q2 2026" },
    { name: "Holded", status: "Q3 2026" },
    { name: "A3 ERP", status: "Q3 2026" },
  ];

  const fieldMappings = [
    { source: "CIF / VAT ID", target: "TaxIdentifier", synced: true },
    { source: "Razón Social", target: "LegalName", synced: true },
    { source: "Código Proveedor", target: "VendorCode", synced: true },
    { source: "Estado Homologación", target: "ApprovalStatus", synced: true }
  ];

  const kpis = [
    { icon: Clock, value: "<48h", label: "Integración", color: "text-orange-500" },
    { icon: Plug, value: "4+", label: "ERPs", color: "text-blue-500" },
    { icon: Users, value: "5K+", label: "Proveedores", color: "text-green-500" },
  ];

  const integrationSteps = [
    { step: "1", title: "Selección", desc: "Elige tu ERP del marketplace de conectores" },
    { step: "2", title: "Credenciales", desc: "Configura API key o OAuth" },
    { step: "3", title: "Mapeo", desc: "Ajusta el mapeo de campos automático" },
    { step: "4", title: "Sincronización", desc: "Los datos fluyen en tiempo real" },
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
          <Badge variant="outline" className="border-indigo-500 text-indigo-600">Network Builder</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero con KPIs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 mb-6">
            <Plug className="h-10 w-10 text-indigo-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Conectores ERP</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Integración Plug & Play con Sistemas Core mediante API REST y Webhooks
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
          <Card className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border-indigo-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg shrink-0">
                  <Zap className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">¿Por qué importa?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Las empresas ya tienen sistemas de gestión maduros. Nuestra capa de integración actúa como un 
                    <strong className="text-foreground"> "traductor inteligente"</strong> que conecta sistemas Legacy y modernos 
                    con el Espacio de Datos Europeo. El tiempo de integración promedio se reduce de meses a 
                    <strong className="text-indigo-500"> menos de 48 horas</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Conectores y mapeo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Marketplace de conectores */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <Plug className="h-5 w-5 text-indigo-500" />
                  Marketplace de Conectores
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {connectors.map((conn, i) => (
                    <div key={i} className="p-4 bg-muted rounded-xl border border-border">
                      <div className={`w-12 h-12 ${conn.color} rounded-lg flex items-center justify-center mb-3`}>
                        <span className="text-white font-bold text-sm">{conn.logo}</span>
                      </div>
                      <p className="font-medium">{conn.name}</p>
                      <Badge 
                        className={`mt-2 text-xs ${conn.status === 'Certificado' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}
                      >
                        {conn.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Próximamente */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-medium mb-3 text-muted-foreground">Próximamente</p>
                  <div className="flex flex-wrap gap-2">
                    {upcoming.map((item, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {item.name} <span className="text-muted-foreground ml-1">{item.status}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mapeo de campos */}
            <Card className="bg-card border-indigo-500/30">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-indigo-500" />
                  Mapeo de Campos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {fieldMappings.map((field, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-indigo-500 font-mono">{field.source}</p>
                    </div>
                    <ArrowRightLeft className="h-4 w-4 text-muted-foreground/70 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-blue-500 font-mono">{field.target}</p>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Proceso de integración y especificaciones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Proceso de integración */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Proceso de Integración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {integrationSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-indigo-500">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Especificaciones */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-500" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Protocolos", value: "Soporte nativo para REST, SFTP seguro y Webhooks" },
                  { label: "Estandarización", value: "Mapeo automático de campos locales a JSON-LD" },
                  { label: "Sistemas", value: "SAP S/4HANA, Dynamics 365, Oracle Cloud, Sage" }
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