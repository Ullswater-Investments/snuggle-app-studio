import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Users, FileText, Database, BarChart3, Globe, FileCheck, Building2, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const servicios = [
  { icon: Database, title: "Espacio de Datos Federado", desc: "Infraestructura GAIA-X para compartir datos de forma soberana." },
  { icon: Globe, title: "Wallet Digital", desc: "Identidad digital verificable para todos los participantes." },
  { icon: FileText, title: "Pasaporte Digital de Producto (DPP)", desc: "Trazabilidad completa de productos a lo largo de la cadena." },
  { icon: Shield, title: "Trazabilidad Supply Chain", desc: "Visibilidad end-to-end de la cadena de suministro." },
  { icon: BarChart3, title: "Central de Compras Inteligente", desc: "Optimización de abastecimiento con datos compartidos." },
  { icon: Users, title: "Dashboard KPIs", desc: "Métricas en tiempo real para la toma de decisiones." },
];

const beneficios = [
  "Subvención de hasta 30.000€ a fondo perdido",
  "Tramitación completa incluida",
  "Consultoría técnica especializada",
  "Sin inversión inicial significativa (190€/mes)",
  "Acceso a tecnología de vanguardia",
  "Soporte durante todo el proceso",
];

const pasos = [
  { num: 1, title: "Adhesión", desc: "Firma del contrato y Acta de Conformidad. Inicio de la Fase 1 (6 meses)." },
  { num: 2, title: "Solicitud", desc: "Global Data Care tramita la solicitud ante RED.ES como Representante Voluntario." },
  { num: 3, title: "Concesión", desc: "RED.ES evalúa y concede la subvención. Se activa la Fase 2 (24 meses)." },
  { num: 4, title: "Justificación", desc: "Justificación completa del proyecto ante RED.ES. Servicio incluido." },
];

const faqItems = [
  { q: "¿Qué es el Kit Espacio de Datos?", a: "Es un programa de ayudas del Gobierno de España, gestionado por RED.ES, que subvenciona la digitalización de la cadena de suministro mediante espacios de datos federados." },
  { q: "¿Quién puede solicitarlo?", a: "Empresas y organizaciones españolas que deseen digitalizar su cadena de suministro con tecnología de espacios de datos." },
  { q: "¿Cuánto cuesta?", a: "La Fase 1 tiene un coste de 190€/mes durante 6 meses (1.140€ + IVA). Si se concede la subvención, esta cubre hasta el 85-90% del proyecto." },
  { q: "¿Qué hace Global Data Care?", a: "Global Data Care, operada por ACCURO TECHNOLOGY S.L., proporciona la plataforma tecnológica y gestiona toda la tramitación administrativa de la ayuda." },
  { q: "¿Cuánto tarda el proceso?", a: "La Fase 1 dura 6 meses. La resolución de RED.ES puede tardar entre 3 y 6 meses adicionales." },
  { q: "¿Es compatible con otras ayudas?", a: "Consulta las bases de la convocatoria para verificar la compatibilidad con otras subvenciones." },
  { q: "¿Qué pasa si no me conceden la subvención?", a: "El contrato finaliza al término de la Fase 1 sin obligaciones adicionales." },
];

export default function GuiaKitEspacioDatos() {
  return (
    <div className="min-h-screen bg-background">
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
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Programa Gobierno de España</Badge>
          <h1 className="text-4xl font-black mb-4">Kit Espacio de Datos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Digitaliza tu cadena de suministro con tecnología de espacios de datos federados y obtén hasta 30.000€ de subvención.
          </p>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Servicios Incluidos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicios.map((s) => (
              <Card key={s.title}>
                <CardContent className="p-6">
                  <s.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Beneficios</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {beneficios.map((b) => (
              <div key={b} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <Card className="mb-16 border-2 border-primary/50 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Inversión</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-muted-foreground">Tu inversión (Fase 1)</div>
                <div className="text-3xl font-black">1.140€ <span className="text-base font-normal">+ IVA</span></div>
                <div className="text-sm text-muted-foreground">190€/mes × 6 meses</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Subvención (hasta)</div>
                <div className="text-3xl font-black text-emerald-600">30.000€</div>
                <div className="text-sm text-muted-foreground">A fondo perdido de RED.ES</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Proceso</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pasos.map((p) => (
              <Card key={p.num}>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                    {p.num}
                  </div>
                  <div>
                    <h4 className="font-bold">{p.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button asChild size="lg">
            <Link to="/inscripcion-kit-espacio-datos">
              Solicitar Inscripción <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Button asChild variant="outline">
              <Link to="/condiciones-kit-espacio-datos">Ver Condiciones Detalladas</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
