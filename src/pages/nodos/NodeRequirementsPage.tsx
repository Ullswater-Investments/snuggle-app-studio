import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileSignature, 
  Users, 
  Landmark, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Building2,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { FundingFooter } from '@/components/FundingFooter';
import { toast } from 'sonner';

export const NodeRequirementsPage = () => {
  const [formData, setFormData] = useState({
    entityName: '',
    entityType: '',
    ecosystemStatus: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Solicitud enviada correctamente. Te contactaremos en breve.');
    console.log('Form submitted:', formData);
  };

  // DIAGRAMA IDIOGRÁFICO: EL ECOSISTEMA MÍNIMO
  const EcosystemVisual = () => (
    <div className="relative w-full max-w-4xl mx-auto py-16">
      {/* Promotor Central */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="relative">
          {/* Hexágono */}
          <div className="w-40 h-40 bg-gradient-to-br from-orange-500 to-orange-600 rotate-45 rounded-2xl shadow-xl flex items-center justify-center">
            <div className="-rotate-45 text-center text-white p-4">
              <Landmark className="w-8 h-8 mx-auto mb-2" />
              <span className="font-bold text-sm">PROMOTOR</span>
              <p className="text-xs opacity-90">(Tú)</p>
            </div>
          </div>
          {/* Badge de requisito */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <Badge variant="outline" className="bg-white border-orange-300 text-orange-700 text-xs">
              CIF + Capacidad Facturación
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Conexiones SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
          </marker>
        </defs>
        {/* Líneas de conexión animadas */}
        {[
          { x1: 200, y1: 150, x2: 80, y2: 60 },
          { x1: 200, y1: 150, x2: 320, y2: 60 },
          { x1: 200, y1: 150, x2: 50, y2: 180 },
          { x1: 200, y1: 150, x2: 350, y2: 180 },
          { x1: 200, y1: 150, x2: 200, y2: 260 }
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
            markerEnd="url(#arrowhead)"
          />
        ))}
        {/* Etiqueta central en líneas */}
        <text x="130" y="100" fill="#6b7280" fontSize="8" fontWeight="500">Carta Adhesión</text>
        <text x="250" y="100" fill="#6b7280" fontSize="8" fontWeight="500">Carta Adhesión</text>
      </svg>

      {/* Participantes */}
      <div className="absolute inset-0">
        {[
          { top: '10%', left: '15%' },
          { top: '10%', right: '15%' },
          { top: '50%', left: '5%' },
          { top: '50%', right: '5%' },
          { bottom: '5%', left: '50%', transform: '-translate-x-1/2' }
        ].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
            className="absolute"
            style={pos as React.CSSProperties}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-300 flex items-center justify-center shadow-md">
                <Building2 className="w-6 h-6 text-slate-600" />
              </div>
              <span className="text-xs font-medium text-slate-700 mt-1">Empresa {i + 1}</span>
              <Badge variant="secondary" className="text-[10px] mt-1 bg-green-100 text-green-700">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Adherido
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Base Tecnológica */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0"
      >
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-3 flex items-center justify-center gap-3 mx-4">
          <ShieldCheck className="w-5 h-5 text-orange-400" />
          <span className="text-white text-sm font-medium">
            Infraestructura PROCUREDATA (Homologada SEDIA)
          </span>
        </div>
      </motion.div>
    </div>
  );

  const benefits = [
    {
      title: "Legalidad Gaia-X",
      desc: "El Nodo incluye la licencia de uso de la tecnología PROCUREDATA, garantizando el cumplimiento automático de los estándares Gaia-X e IDSA requeridos por la convocatoria."
    },
    {
      title: "Adhesión Simple",
      desc: "Proporcionamos las plantillas de 'Carta de Interés' y 'MOU' (Memorandum of Understanding) listas para firmar por tus empresas asociadas."
    },
    {
      title: "Soporte Técnico",
      desc: "No necesitas equipo de IT. El despliegue, mantenimiento y seguridad del nodo corre a cargo del equipo de ingeniería de ProcureData."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/nodos-sectoriales" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Volver a Visión General</span>
          </Link>
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Requisitos de Adhesión
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white mb-6 shadow-lg">
            <FileSignature className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Condiciones de Adhesión
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hoja de ruta administrativa, técnica y económica para la constitución de tu Espacio de Datos Soberano bajo normativa Gaia-X.
          </p>
        </motion.div>

        {/* Visual Diagram Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-4">El Ecosistema Mínimo Viable</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
            Para activar un Nodo y acceder a la subvención, es indispensable formalizar un consorcio mínimo de 1 Promotor + 5 Participantes.
          </p>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm min-h-[400px] relative">
            <EcosystemVisual />
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-lg mb-4">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* SECCIÓN FINANCIERA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-4">Mecánica Financiera Detallada</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Desglose transparente de costes y flujo de caja. Todos los importes son 100% subvencionables.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Tarjeta Promotor */}
            <Card className="border-2 border-orange-200 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4">
                <div className="flex items-center gap-3">
                  <Landmark className="w-6 h-6" />
                  <span className="font-bold text-lg">PROMOTOR (Tú)</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Valor de Licencia de Nodo:</p>
                  <p className="text-4xl font-bold text-foreground">30.000 €</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">A la firma (Anticipo)</span>
                        <span className="font-bold text-orange-600">5.000 €</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Generación de instancia y configuración inicial</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">Concesión Ayuda</span>
                        <span className="font-bold text-green-600">25.000 €</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Pago diferido contra resolución favorable</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    Los 30.000€ son <strong>100% subvencionables</strong>. Recuperas el anticipo al cobrar la ayuda.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tarjeta Participante */}
            <Card className="border-2 border-slate-200 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  <span className="font-bold text-lg">PARTICIPANTE (×5)</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Valor de Conexión:</p>
                  <p className="text-4xl font-bold text-foreground">7.000 €</p>
                  <p className="text-xs text-muted-foreground mt-1">por cada empresa participante</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">A la firma (Anticipo)</span>
                        <span className="font-bold text-slate-700">2.000 €</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Alta de identidad y wallet Web3</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">Concesión Ayuda</span>
                        <span className="font-bold text-green-600">5.000 €</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Pago diferido contra resolución favorable</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    Los 7.000€ son <strong>100% subvencionables</strong>. Recuperan el anticipo al cobrar la ayuda.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Callout de garantía */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-green-800 text-lg mb-1">Garantía de Retorno</h4>
                <p className="text-green-700">
                  Los pagos anticipados se consideran gastos ejecutados y son <strong>reembolsados íntegramente</strong> al recibir la ayuda del Kit Espacio de Datos. El riesgo financiero es mínimo.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FORMULARIO DE CUALIFICACIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <Card className="border-2 border-orange-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Validar Elegibilidad</h2>
                <p className="text-orange-100">
                  Comprobemos si tu organización cumple los requisitos para ser Promotor de Nodo.
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="entityName" className="font-medium">Nombre de la Entidad</Label>
                    <Input
                      id="entityName"
                      placeholder="Clúster Industrial de..."
                      value={formData.entityName}
                      onChange={(e) => setFormData({...formData, entityName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entityType" className="font-medium">Tipo de Entidad</Label>
                    <Select
                      value={formData.entityType}
                      onValueChange={(value) => setFormData({...formData, entityType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cluster">Clúster / Asociación</SelectItem>
                        <SelectItem value="empresa">Gran Empresa</SelectItem>
                        <SelectItem value="centro">Centro Tecnológico</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ecosystemStatus" className="font-medium">Estado del Ecosistema</Label>
                  <Select
                    value={formData.ecosystemStatus}
                    onValueChange={(value) => setFormData({...formData, ecosystemStatus: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="¿Tienes 5+ empresas interesadas?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ready">Sí, ya tengo el grupo identificado</SelectItem>
                      <SelectItem value="process">En proceso de captación</SelectItem>
                      <SelectItem value="help">No, necesito ayuda para captarlas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">Email del Responsable</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="responsable@tucluster.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Solicitar Borrador de MOU
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Sin compromiso. Recibirás el modelo de acuerdo y la documentación técnica de SEDIA.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 md:p-12 text-center"
        >
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Tienes dudas sobre tu elegibilidad?
            </h2>
            <p className="text-orange-100 mb-6 max-w-xl mx-auto">
              Agenda una llamada de 15 minutos con nuestro equipo comercial. Te ayudaremos a evaluar tu caso sin compromiso.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50"
            >
              <Link to="/nodos-sectoriales#contacto">
                Agendar Consulta Gratuita
              </Link>
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <FundingFooter variant="dark" />
        </div>
      </footer>
    </div>
  );
};

export default NodeRequirementsPage;
