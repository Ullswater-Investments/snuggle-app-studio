import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Euro, Shield, Users, FileText, FileCheck, Building2, Headphones, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logoKitEspacioDatos from "@/assets/logo-kit-espacio-datos.jpg";
import logoGobiernoRedEs from "@/assets/logo-gobierno-red-es.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const serviciosIncluidos = [
  { icon: Shield, label: "Acceso al Espacio de Datos Federado" },
  { icon: Users, label: "Consultoría técnica y administrativa" },
  { icon: FileText, label: "Tramitación de la ayuda" },
  { icon: FileCheck, label: "Redacción de memoria técnica" },
  { icon: Building2, label: "Presentación de solicitud" },
  { icon: CheckCircle2, label: "Justificación completa del proyecto" },
  { icon: Headphones, label: "Soporte durante el proceso" },
];

const faqItems = [
  { q: "¿Puedo cancelar en los 6 primeros meses?", a: "No. La Fase 1 es un compromiso irrevocable de 6 meses. No se admite cancelación anticipada una vez firmada el Acta de Conformidad." },
  { q: "¿Qué ocurre si me conceden la subvención?", a: "Se activa automáticamente la Fase 2 (prórroga de 24 meses). El importe de la Fase 2 será equivalente a la subvención concedida." },
  { q: "¿Qué es el Acta de Conformidad?", a: "Es el documento que certifica la recepción del servicio y activa la financiación de HOKODO. Su firma es digital y tiene plena validez jurídica." },
  { q: "¿Quién tramita la ayuda?", a: "Global Data Care actúa como Representante Voluntario ante RED.ES, gestionando toda la tramitación administrativa." },
  { q: "¿Las incidencias técnicas afectan a los pagos?", a: "No. Las reclamaciones técnicas o comerciales se gestionan por canales de soporte separados y no afectan al flujo de pagos." },
  { q: "¿Qué pasa si no me conceden la subvención?", a: "El contrato finaliza al término de la Fase 1 (6 meses). No se genera ninguna obligación adicional." },
  { q: "¿Qué es la financiación HOKODO?", a: "HOKODO es una entidad financiera externa que facilita el pago fraccionado de la Fase 1 en 6 cuotas mensuales." },
];

export default function CondicionesKitEspacioDatos() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header sticky */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
          <Button asChild size="sm">
            <Link to="/inscripcion-kit-espacio-datos">Solicitar Inscripción</Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <Badge className="bg-amber-500 text-white hover:bg-amber-500 mb-4 text-sm px-4 py-1.5">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              Inscripción hasta 20 de Marzo del 2026
            </Badge>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">Condiciones Transparentes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Todo lo que necesitas saber antes de inscribirte. Sin letra pequeña.
          </p>
          <div className="flex items-center justify-center gap-6">
            <img src={logoKitEspacioDatos} alt="Kit Espacio de Datos" className="h-12 object-contain" />
            <img src={logoGobiernoRedEs} alt="Gobierno de España - Red.es" className="h-12 object-contain" />
          </div>
        </motion.div>

        {/* Pricing Card */}
        <motion.div {...fadeInUp} className="mb-12">
          <Card className="border-2 border-primary/50 bg-primary/5">
            <CardContent className="p-8">
              <h3 className="text-center text-xl font-bold mb-6">Rango de Subvención</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-black text-emerald-600">15.000€</div>
                  <div className="text-sm text-muted-foreground">Subvención mínima</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-black text-blue-600">30.000€</div>
                  <div className="text-sm text-muted-foreground">Subvención máxima</div>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200">
                <strong>Nota:</strong> El importe exacto dependerá de la evaluación de RED.ES. La consultoría incluye un análisis previo para maximizar el importe solicitado.
              </div>
              <div className="mt-6 space-y-2">
                {serviciosIncluidos.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <div className="text-sm text-muted-foreground">Precio anticipado (Fase 1)</div>
                <div className="text-2xl font-bold text-foreground">1.140€ + IVA</div>
                <div className="text-sm text-muted-foreground">190€/mes × 6 meses</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { value: "190€/mes", label: "Cuota fija + IVA", sub: "6 meses iniciales" },
            { value: "6 meses", label: "Fase inicial", sub: "Compromiso irrevocable" },
            { value: "30.000€", label: "Subvención máxima", sub: "A fondo perdido de RED.ES" },
          ].map((card, i) => (
            <motion.div key={card.value} {...fadeInUp} transition={{ delay: i * 0.1 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-black text-primary">{card.value}</div>
                  <div className="font-semibold text-foreground">{card.label}</div>
                  <div className="text-sm text-muted-foreground">{card.sub}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-12 space-y-4">
          <h3 className="text-xl font-bold text-center mb-6">Fases del Contrato</h3>
          <Card className="border-l-4 border-amber-500">
            <CardContent className="p-6">
              <Badge className="bg-amber-500 text-white hover:bg-amber-500 mb-2">FASE 1</Badge>
              <h4 className="font-bold text-foreground">6 meses — Compromiso irrevocable</h4>
              <p className="text-muted-foreground mt-1">Inversión: 1.140€ + IVA. Financiación a través de HOKODO. Sin cancelación anticipada.</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-emerald-500">
            <CardContent className="p-6">
              <Badge className="bg-emerald-500 text-white hover:bg-emerald-500 mb-2">FASE 2</Badge>
              <h4 className="font-bold text-foreground">Renovación automática — 24 meses</h4>
              <p className="text-muted-foreground mt-1">Condicional a la concesión de la subvención. El importe será equivalente a la subvención concedida.</p>
            </CardContent>
          </Card>
        </div>

        {/* ROI Calculator */}
        <motion.div {...fadeInUp} className="mb-12">
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-center mb-6">Calculadora ROI</h3>
              <div className="grid grid-cols-3 gap-4 items-center text-center">
                <div>
                  <div className="text-sm text-muted-foreground">TU INVERSIÓN</div>
                  <div className="text-2xl font-black text-foreground">1.140€</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">ROI</div>
                  <div className="text-3xl font-black text-primary">26x</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">SUBVENCIÓN</div>
                  <div className="text-2xl font-black text-emerald-600">30.000€</div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">Financiación cubierta al 85-90%</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly installments */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-center mb-6">Cuotas Mensuales</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-muted-foreground">Mes {i + 1}</div>
                    <div className="text-xl font-bold text-foreground">190€</div>
                    <div className="text-xs text-muted-foreground">+ IVA</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-3">Financiación por HOKODO</p>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-center mb-6">Preguntas Frecuentes</h3>
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Legal Notice */}
        <Card className="mb-12 border-amber-300 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-6 text-sm text-amber-800 dark:text-amber-200">
            <h4 className="font-bold mb-2">Aviso Legal</h4>
            <p><strong>ACCURO TECHNOLOGY, S.L.</strong></p>
            <p>CIF: B87617981</p>
            <p>Domicilio: C/ Colquide, 6 – Portal 2, 1ª planta, Edificio Prisma de Las Rozas – Madrid</p>
            <p className="mt-2">Firma digital con validez conforme al Reglamento eIDAS (UE) 910/2014</p>
          </CardContent>
        </Card>

        {/* CTAs */}
        <div className="text-center space-y-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/inscripcion-kit-espacio-datos">
              Solicitar Inscripción por 190€/mes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild variant="outline">
              <Link to="/guia-kit-espacio-datos">Ver Propuesta Completa</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/contrato-kit-espacio-datos">Ver Contrato Completo y Condiciones</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
