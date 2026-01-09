import { Link } from "react-router-dom";
import { FileCode, Shield, Zap, CheckCircle, ToggleRight, Lock, Users, Building } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { GlobalNavigation } from "@/components/GlobalNavigation";

export default function GobernanzaODRL() {
  const [permissions, setPermissions] = useState({
    read: true,
    analyze: true,
    download: false,
    redistribute: false,
    expiry30: true
  });

  const kpis = [
    { icon: Lock, value: "100%", label: "Control", color: "text-green-500" },
    { icon: Zap, value: "<1s", label: "Revocación", color: "text-blue-500" },
    { icon: Shield, value: "W3C", label: "Estándar", color: "text-purple-500" },
  ];

  const benefits = [
    { role: "Proveedor (Subject)", icon: Building, items: ["Control total sobre uso de datos", "Revocación instantánea global", "Auditoría completa de accesos"] },
    { role: "Comprador (Consumer)", icon: Users, items: ["Claridad en derechos de uso", "Cumplimiento normativo automático", "Contratos legalmente válidos"] },
  ];

  const generateODRL = () => {
    const perms = [];
    if (permissions.read) perms.push('"read"');
    if (permissions.analyze) perms.push('"analyze"');
    if (permissions.download) perms.push('"download"');
    
    return `{
  "@context": "http://www.w3.org/ns/odrl.jsonld",
  "@type": "Offer",
  "permission": [{
    "target": "Passport_Supplier_A",
    "action": [${perms.join(', ')}],
    "constraint": [{
      "leftOperand": "dateTime",
      "operator": "lt",
      "rightOperand": "${permissions.expiry30 ? '2026-02-07' : '2027-01-07'}"
    }]
  }],
  "prohibition": [{
    "action": "${permissions.redistribute ? '' : 'redistribute'}"
  }]
}`;
  };

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
          <Badge variant="outline" className="border-blue-500 text-blue-600">Soberanía SaaS</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero con KPIs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-500/15 border border-blue-500/30 mb-6">
            <FileCode className="h-10 w-10 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gobernanza ODRL</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Contratos digitales autoejecutables para la soberanía del dato
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
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg shrink-0">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">¿Por qué importa?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    El intercambio de información no es una simple transferencia de archivos, sino un <strong className="text-foreground">acuerdo soberano</strong>. 
                    Utilizamos el estándar internacional ODRL (Open Digital Rights Language) para codificar reglas de uso directamente en los datos. 
                    Si la política dice que el dato solo puede leerse pero no descargarse, el sistema <strong className="text-blue-500">bloquea técnicamente</strong> la función de guardado.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Constructor de Políticas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <ToggleRight className="h-5 w-5 text-blue-500" />
                  Constructor de Políticas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {[
                  { key: 'read', label: 'Permiso de Lectura', desc: 'El consumidor puede visualizar los datos' },
                  { key: 'analyze', label: 'Análisis con IA', desc: 'Permite procesamiento algorítmico' },
                  { key: 'download', label: 'Exportación PDF', desc: 'Descarga de informes en local' },
                  { key: 'redistribute', label: 'Redistribución', desc: 'Compartir con terceros' },
                  { key: 'expiry30', label: 'Validez 30 días', desc: 'Expiración automática del acceso' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch 
                      checked={permissions[item.key as keyof typeof permissions]}
                      onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, [item.key]: checked }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Código ODRL Generado */}
            <Card className="bg-muted border-blue-500/30">
              <CardHeader className="border-b border-border bg-blue-500/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-mono">Política ODRL Generada</CardTitle>
                  <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 text-xs">JSON-LD</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <pre className="text-xs text-blue-500 font-mono overflow-x-auto whitespace-pre">
                  {generateODRL()}
                </pre>
              </CardContent>
            </Card>
          </motion.div>

          {/* Beneficios y Especificaciones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Beneficios por Rol */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Beneficios por Rol</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <benefit.icon className="h-5 w-5 text-primary" />
                      <p className="font-medium">{benefit.role}</p>
                    </div>
                    <ul className="space-y-2">
                      {benefit.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Especificaciones */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Gramática", value: "Estándar W3C ODRL 2.2 (Ontología de Derechos Digitales)" },
                  { label: "Componentes", value: "Permissions, Prohibitions y Duties definibles" },
                  { label: "Contexto", value: "Integración nativa con JSON-LD para interoperabilidad EU" }
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
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">¿Listo para tomar el control de tus datos?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Experimenta el constructor de políticas ODRL y define tus propias reglas de acceso.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/auth">Probar Demo</Link>
                </Button>
                <Button asChild>
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