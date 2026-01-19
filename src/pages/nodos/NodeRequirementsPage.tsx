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
  ArrowLeft,
  Loader2
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
import { useNodeEligibility } from '@/hooks/useNodeEligibility';

export const NodeRequirementsPage = () => {
  const [formData, setFormData] = useState({
    entityName: '',
    entityType: '',
    ecosystemStatus: '',
    email: ''
  });

  const { submitEligibility, isSubmitting } = useNodeEligibility();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    if (!formData.entityName || !formData.entityType || !formData.ecosystemStatus || !formData.email) {
      toast.error('Por favor, completa todos los campos obligatorios');
      return;
    }
    
    try {
      const result = await submitEligibility(formData);
      
      toast.success(
        '¡Solicitud enviada correctamente!',
        { description: 'Recibirás el borrador del MOU en 24-48 horas.' }
      );
      
      // Limpiar formulario
      setFormData({ entityName: '', entityType: '', ecosystemStatus: '', email: '' });
      
      console.log('Eligibility request submitted:', result.requestId);
    } catch (err) {
      toast.error(
        'Error al enviar la solicitud',
        { description: 'Por favor, inténtalo de nuevo más tarde.' }
      );
    }
  };

  // DIAGRAMA IDIOGRÁFICO MEJORADO: ARCO JERÁRQUICO HUB & SPOKE
  const EcosystemVisual = () => {
    const empresas = [
      { id: 1, top: 80, left: 50, delay: 0.1 },
      { id: 2, top: 50, left: 180, delay: 0.2 },
      { id: 3, top: 30, left: 'center', delay: 0.3, highlight: true },
      { id: 4, top: 50, right: 180, delay: 0.4 },
      { id: 5, top: 80, right: 50, delay: 0.5 },
    ];

    return (
      <div className="relative w-full max-w-4xl h-[420px] mx-auto hidden md:block">
        {/* 1. LÍNEAS DE CONEXIÓN SVG (CAPA DE FONDO) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 896 420"
          preserveAspectRatio="xMidYMid meet"
          style={{ zIndex: 0 }}
        >
          {/* Líneas curvas desde Promotor hacia satélites */}
          <motion.path 
            d="M448,280 C350,280 150,180 100,100" 
            fill="none" 
            stroke="hsl(var(--muted-foreground) / 0.3)" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.path 
            d="M448,280 C400,230 280,160 230,80" 
            fill="none" 
            stroke="hsl(var(--muted-foreground) / 0.3)" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.path 
            d="M448,280 L448,70" 
            fill="none" 
            stroke="hsl(var(--muted-foreground) / 0.3)" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path 
            d="M448,280 C500,230 620,160 670,80" 
            fill="none" 
            stroke="hsl(var(--muted-foreground) / 0.3)" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.path 
            d="M448,280 C550,280 750,180 800,100" 
            fill="none" 
            stroke="hsl(var(--muted-foreground) / 0.3)" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
          
          {/* Conexión vertical a la base */}
          <motion.line 
            x1="448" y1="340" x2="448" y2="380" 
            stroke="hsl(24 95% 53%)" 
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />
        </svg>

        {/* 2. SATÉLITES (EMPRESAS PARTICIPANTES) */}
        {/* Pos 1: Izquierda Extrema */}
        <motion.div 
          className="absolute flex flex-col items-center"
          style={{ top: '80px', left: '50px' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="w-14 h-14 bg-background rounded-xl border border-border flex items-center justify-center shadow-lg z-10 hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="mt-2 text-xs font-medium text-muted-foreground">Emp. 1</span>
          <div className="mt-1 text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Adherido
          </div>
        </motion.div>

        {/* Pos 2: Izquierda Media */}
        <motion.div 
          className="absolute flex flex-col items-center"
          style={{ top: '50px', left: '180px' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <div className="w-14 h-14 bg-background rounded-xl border border-border flex items-center justify-center shadow-lg z-10 hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="mt-2 text-xs font-medium text-muted-foreground">Emp. 2</span>
          <div className="mt-1 text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Adherido
          </div>
        </motion.div>

        {/* Pos 3: Centro Arriba (Destacada) */}
        <motion.div 
          className="absolute flex flex-col items-center left-1/2 -translate-x-1/2"
          style={{ top: '20px' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <div className="w-16 h-16 bg-background rounded-xl border-2 border-primary/30 flex items-center justify-center shadow-xl z-10 hover:scale-110 transition-transform">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <span className="mt-2 text-xs font-semibold text-foreground">Emp. 3</span>
          <div className="mt-1 text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Adherido
          </div>
        </motion.div>

        {/* Pos 4: Derecha Media */}
        <motion.div 
          className="absolute flex flex-col items-center"
          style={{ top: '50px', right: '180px' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <div className="w-14 h-14 bg-background rounded-xl border border-border flex items-center justify-center shadow-lg z-10 hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="mt-2 text-xs font-medium text-muted-foreground">Emp. 4</span>
          <div className="mt-1 text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Adherido
          </div>
        </motion.div>

        {/* Pos 5: Derecha Extrema */}
        <motion.div 
          className="absolute flex flex-col items-center"
          style={{ top: '80px', right: '50px' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        >
          <div className="w-14 h-14 bg-background rounded-xl border border-border flex items-center justify-center shadow-lg z-10 hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="mt-2 text-xs font-medium text-muted-foreground">Emp. 5</span>
          <div className="mt-1 text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Adherido
          </div>
        </motion.div>

        {/* 3. PROMOTOR (CENTRO HUB) */}
        <motion.div 
          className="absolute bottom-[90px] left-1/2 -translate-x-1/2 z-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap z-30">
              Gestor del Nodo
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-2xl shadow-orange-500/30 w-56 text-center transform hover:scale-105 transition-transform duration-300 border-4 border-white dark:border-slate-800">
              <Landmark className="w-10 h-10 mx-auto mb-2" />
              <h3 className="font-bold text-lg leading-tight">Tu Entidad</h3>
              <p className="text-orange-100 text-xs mt-1">Facturación & Gobernanza</p>
            </div>
          </div>
        </motion.div>

        {/* 4. BASE (INFRAESTRUCTURA) */}
        <motion.div 
          className="absolute bottom-0 w-full z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <div className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg mx-4">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-sm tracking-wide">Infraestructura Tecnológica Homologada (SEDIA + Gaia-X)</span>
          </div>
        </motion.div>
      </div>
    );
  };

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
                  <p className="text-sm text-muted-foreground mb-1">COSTE desarrollo de un NODO PROPIETARIO</p>
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
                        <span className="font-bold text-green-600">30.000 €</span>
                      </div>
                      <p className="text-xs text-muted-foreground">AYUDA KIT ESPACIO DE DATOS</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">El Promotor NO TIENE que pagar hasta que recibe la subvención</span>
                        <span className="font-bold text-orange-600">25.000 €</span>
                      </div>
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
                  <p className="text-sm text-muted-foreground mb-1">COSTE de CONEXIÓN (Anualidad)</p>
                  <p className="text-4xl font-bold text-foreground">3.000 €</p>
                  <p className="text-xs text-muted-foreground mt-1">por cada empresa participante</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">Firma Contrato 1 año</span>
                        <span className="font-bold text-orange-600">250 € al mes</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Alta de identidad y wallet Web3</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">Concesión Ayuda</span>
                        <span className="font-bold text-green-600">15.000 €</span>
                      </div>
                      <p className="text-xs text-muted-foreground">AYUDA KIT ESPACIO DE DATOS</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">Renovación Contrato de Conexión + 1 año contra resolución favorable de la subvención</span>
                        <span className="font-bold text-orange-600">3.000 €</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    El participante dispondrá hasta <strong>9.000€</strong> para pagar los servicios del Cluster ó otros gastos relacionados con el Espacio de Datos
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

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={isSubmitting || !formData.entityName || !formData.entityType || !formData.ecosystemStatus || !formData.email}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando solicitud...
                    </>
                  ) : (
                    <>
                      Solicitar Borrador de MOU
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
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
