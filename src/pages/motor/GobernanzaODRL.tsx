import { Link } from "react-router-dom";
import { ArrowLeft, FileCode, Shield, Zap, CheckCircle, ToggleRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function GobernanzaODRL() {
  const [permissions, setPermissions] = useState({
    read: true,
    analyze: true,
    download: false,
    redistribute: false,
    expiry30: true
  });

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
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-slate-950/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/#features" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
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
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <FileCode className="h-12 w-12 text-green-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gobernanza ODRL</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Contratos digitales autoejecutables para la soberanía del dato
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive Policy Builder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Policy Builder */}
            <Card className="bg-white/5 border-white/10 overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-white/5">
                <CardTitle className="text-white flex items-center gap-2">
                  <ToggleRight className="h-5 w-5 text-green-400" />
                  Constructor de Políticas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { key: 'read', label: 'Permiso de Lectura', desc: 'El consumidor puede visualizar los datos' },
                  { key: 'analyze', label: 'Análisis con IA', desc: 'Permite procesamiento algorítmico' },
                  { key: 'download', label: 'Exportación PDF', desc: 'Descarga de informes en local' },
                  { key: 'redistribute', label: 'Redistribución', desc: 'Compartir con terceros' },
                  { key: 'expiry30', label: 'Validez 30 días', desc: 'Expiración automática del acceso' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                    <Switch 
                      checked={permissions[item.key as keyof typeof permissions]}
                      onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, [item.key]: checked }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Generated ODRL Code */}
            <Card className="bg-black/60 border-green-500/30 overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-green-500/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-sm font-mono">Política ODRL Generada</CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">JSON-LD</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <pre className="text-xs text-green-400 font-mono overflow-x-auto whitespace-pre">
                  {generateODRL()}
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
              <h2 className="text-2xl font-bold mb-4">Contratos Inteligentes de Uso de Datos</h2>
              <p className="text-gray-400 leading-relaxed">
                En ProcureData, el intercambio de información no se basa en una simple transferencia de 
                archivos, sino en un <strong className="text-white">acuerdo soberano</strong>. Utilizamos 
                el estándar internacional ODRL (Open Digital Rights Language) para codificar reglas de 
                uso directamente en los datos.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                Cada vez que un "Consumer" solicita acceso, el motor de gobernanza evalúa la política 
                definida por el "Provider". El conector EDC actúa como un guardián incansable: si la 
                política dice que el dato solo puede leerse pero no descargarse, el sistema bloquea 
                técnicamente la función de guardado.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-br from-green-900/20 to-slate-900 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Gramática", value: "Estándar W3C ODRL 2.2 (Ontología de Derechos Digitales)" },
                  { label: "Componentes", value: "Permissions, Prohibitions y Duties definibles" },
                  { label: "Contexto", value: "Integración nativa con JSON-LD para interoperabilidad EU" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">{spec.label}</p>
                      <p className="text-sm text-gray-400">{spec.value}</p>
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
                    <h3 className="font-bold text-white mb-2">Blindaje Jurídico-Técnico</h3>
                    <p className="text-gray-300">
                      Elimine la incertidumbre legal. Asegure que su propiedad intelectual se utilice 
                      <strong className="text-orange-400"> únicamente para el fin pactado</strong>, con 
                      la capacidad de revocar el acceso de forma instantánea y global.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1 border-white/20 hover:bg-white/10">
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
