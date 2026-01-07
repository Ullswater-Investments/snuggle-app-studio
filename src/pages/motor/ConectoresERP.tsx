import { Link } from "react-router-dom";
import { ArrowLeft, Plug, Shield, Zap, CheckCircle, Settings, ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ConectoresERP() {
  const connectors = [
    { name: "SAP S/4HANA", status: "Certificado", logo: "SAP", color: "bg-blue-500" },
    { name: "Oracle Cloud", status: "Certificado", logo: "ORC", color: "bg-red-500" },
    { name: "Microsoft Dynamics", status: "Certificado", logo: "DYN", color: "bg-green-500" },
    { name: "Sage 200", status: "Disponible", logo: "SGE", color: "bg-purple-500" }
  ];

  const fieldMappings = [
    { source: "CIF / VAT ID", target: "TaxIdentifier", synced: true },
    { source: "Razón Social", target: "LegalName", synced: true },
    { source: "Código Proveedor", target: "VendorCode", synced: true },
    { source: "Estado Homologación", target: "ApprovalStatus", synced: true }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-slate-950/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/#features" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al Motor
          </Link>
          <Badge variant="outline" className="border-orange-500 text-orange-400">Integraciones</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Plug className="h-12 w-12 text-orange-400" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Conectores ERP</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Integración Plug & Play con Sistemas Core mediante API REST y Webhooks
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Connectors Marketplace */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Connector Cards */}
            <Card className="bg-white/5 border-white/10 overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-white/5">
                <CardTitle className="text-white flex items-center gap-2">
                  <Plug className="h-5 w-5 text-orange-400" />
                  Marketplace de Conectores
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {connectors.map((conn, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className={`w-12 h-12 ${conn.color} rounded-lg flex items-center justify-center mb-3`}>
                        <span className="text-white font-bold text-sm">{conn.logo}</span>
                      </div>
                      <p className="font-medium text-white">{conn.name}</p>
                      <Badge 
                        className={`mt-2 text-xs ${conn.status === 'Certificado' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}
                      >
                        {conn.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Field Mapping */}
            <Card className="bg-gradient-to-br from-slate-900 to-orange-900/20 border-orange-500/30">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-orange-400" />
                  Mapeo de Campos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {fieldMappings.map((field, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-orange-400 font-mono">{field.source}</p>
                    </div>
                    <ArrowRightLeft className="h-4 w-4 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm text-blue-400 font-mono">{field.target}</p>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </motion.div>
                ))}
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurar Webhook
                </Button>
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
              <h2 className="text-2xl font-bold mb-4">Interoperabilidad sin Fricción</h2>
              <p className="text-gray-400 leading-relaxed">
                El motor de ProcureData está diseñado para no ser intrusivo. Entendemos que las empresas 
                ya tienen sistemas de gestión maduros. Nuestra capa de integración actúa como un 
                <strong className="text-white"> "traductor inteligente"</strong> que conecta sistemas 
                Legacy y modernos con el Espacio de Datos Europeo.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                A través de conectores certificados, la plataforma sincroniza automáticamente las 
                homologaciones de proveedores, las facturas y los certificados ISO directamente en 
                la base de datos de su ERP.
              </p>
            </div>

            {/* Technical Specs */}
            <Card className="bg-gradient-to-br from-orange-900/20 to-slate-900 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-400" />
                  Especificaciones Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Protocolos", value: "Soporte nativo para REST, SFTP seguro y Webhooks" },
                  { label: "Estandarización", value: "Mapeo automático de campos locales a JSON-LD" },
                  { label: "Sistemas", value: "SAP S/4HANA, Dynamics 365, Oracle Cloud, Sage" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
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
                    <h3 className="font-bold text-white mb-2">Eficiencia Operativa</h3>
                    <p className="text-gray-300">
                      Modernice su infraestructura actual sin sustituirla. El tiempo de integración 
                      promedio se reduce de meses a <strong className="text-orange-400">menos de 48 horas</strong> de 
                      configuración técnica.
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
