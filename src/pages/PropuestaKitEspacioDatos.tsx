import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Euro, Shield, Globe, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import logoKitEspacioDatos from "@/assets/logo-kit-espacio-datos.jpg";
import logoGobiernoRedEs from "@/assets/logo-gobierno-red-es.jpg";

export default function PropuestaKitEspacioDatos() {
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
          <div className="flex items-center justify-center gap-6 mb-6">
            <img src={logoKitEspacioDatos} alt="Kit Espacio de Datos" className="h-14 object-contain" />
            <img src={logoGobiernoRedEs} alt="Gobierno de España" className="h-14 object-contain" />
          </div>
          <Badge variant="secondary" className="mb-4">Propuesta Detallada</Badge>
          <h1 className="text-4xl font-black mb-4">Kit Espacio de Datos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Propuesta integral para la digitalización de tu cadena de suministro con subvención de hasta 30.000€ de RED.ES.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <Euro className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-lg">Hasta 30.000€</h3>
              <p className="text-sm text-muted-foreground">Subvención a fondo perdido de RED.ES</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-lg">Tramitación incluida</h3>
              <p className="text-sm text-muted-foreground">Gestión completa por Global Data Care</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Database className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-lg">Tecnología GAIA-X</h3>
              <p className="text-sm text-muted-foreground">Espacio de datos federado soberano</p>
            </CardContent>
          </Card>
        </div>

        {/* What's included */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">¿Qué incluye la propuesta?</h2>
            <div className="space-y-4">
              {[
                "Licencia de uso de la plataforma Global Data Care (Espacio de Datos Federado)",
                "Consultoría técnica para la implementación",
                "Tramitación completa de la ayuda ante RED.ES",
                "Redacción de la memoria técnica del proyecto",
                "Presentación de la solicitud como Representante Voluntario",
                "Justificación completa del proyecto tras la concesión",
                "Soporte técnico y administrativo durante todo el proceso",
                "Acceso a módulos: DPP, Wallet, Trazabilidad, KPIs",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing summary */}
        <Card className="mb-16 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 border-2 border-primary/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Resumen Económico</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Fase 1 — Tu inversión</div>
                <div className="text-4xl font-black">190€<span className="text-lg font-normal text-muted-foreground">/mes</span></div>
                <div className="text-sm text-muted-foreground">6 meses × 190€ = 1.140€ + IVA</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Fase 2 — Subvención RED.ES</div>
                <div className="text-4xl font-black text-emerald-600">30.000€</div>
                <div className="text-sm text-muted-foreground">Máximo a fondo perdido</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal */}
        <Card className="mb-16 border-amber-300 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-6 text-sm">
            <h3 className="font-bold mb-2 text-amber-800 dark:text-amber-200">Datos del Prestador</h3>
            <p className="text-amber-700 dark:text-amber-300"><strong>ACCURO TECHNOLOGY, S.L.</strong> — CIF: B87617981</p>
            <p className="text-amber-700 dark:text-amber-300">C/ Colquide, 6 – Portal 2, 1ª planta, Edificio Prisma, Las Rozas – Madrid</p>
          </CardContent>
        </Card>

        {/* CTAs */}
        <div className="text-center space-y-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white border-0">
            <Link to="/inscripcion-kit-espacio-datos">
              Solicitar Inscripción <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild variant="outline">
              <Link to="/condiciones-kit-espacio-datos">Ver Condiciones</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/contrato-kit-espacio-datos">Ver Contrato Completo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
