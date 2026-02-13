import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowDown, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const clausulas = [
  { num: 1, title: "Objeto del contrato", content: "El presente contrato tiene por objeto la licencia de uso de la plataforma Global Data Care (Espacio de Datos Federado) y la consultoría de tramitación de las ayudas del programa Kit Espacio de Datos de RED.ES." },
  { num: 2, title: "Duración y condicionalidad", content: "Fase 1 (Irrevocable): 6 meses desde la firma del Acta de Conformidad. Compromiso firme e irrevocable. No admite cancelación anticipada. Fase 2 (Condicional): Prórroga automática de 24 meses, condicionada a la concesión efectiva de la subvención por RED.ES." },
  { num: 3, title: "Precio y condiciones económicas", content: "Fase 1: 1.140€ + IVA (190€/mes × 6 meses). Fase 2: El importe total será equivalente a la subvención concedida por RED.ES (hasta 30.000€)." },
  { num: 4, title: "Forma de pago y financiación", content: "El pago de la Fase 1 se realizará en 6 cuotas mensuales de 190€ + IVA, financiadas a través de HOKODO. La deuda es cierta, líquida y exigible desde la firma del Acta de Conformidad." },
  { num: 5, title: "Acta de conformidad y activación", content: "La firma digital del Acta de Entrega y Conformidad activa la financiación de HOKODO y constituye el inicio formal de la prestación del servicio. El Cliente renuncia a retener pagos por causas ajenas al presente contrato." },
  { num: 6, title: "Obligaciones del cliente (mandato)", content: "El Cliente designa a Global Data Care como Representante Voluntario ante RED.ES para la tramitación de la ayuda. El Cliente se compromete a entregar la documentación requerida en un plazo máximo de 5 días hábiles. Penalización del 15% por incumplimiento." },
  { num: 7, title: "Disputas comerciales", content: "Las reclamaciones técnicas o comerciales del Cliente no afectarán al flujo de pagos establecido. Cualquier incidencia técnica se gestionará por los canales de soporte habilitados." },
  { num: 8, title: "Protección de datos", content: "El tratamiento de datos personales se realizará conforme al RGPD (UE) 2016/679 y la LOPD-GDD. El Prestador actuará como encargado del tratamiento en los términos definidos." },
  { num: 9, title: "Propiedad intelectual", content: "La plataforma Global Data Care, su código fuente, diseño y documentación son propiedad exclusiva de ACCURO TECHNOLOGY, S.L. La licencia concedida es de uso, no exclusiva e intransferible." },
  { num: 10, title: "Jurisdicción y ley aplicable", content: "El presente contrato se rige por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Madrid." },
  { num: 11, title: "Comunicaciones", content: "Todas las comunicaciones entre las partes se realizarán por email a las direcciones facilitadas en el formulario de inscripción." },
  { num: 12, title: "Firma digital", content: "Ambas partes reconocen la plena validez jurídica de la firma digital conforme al Reglamento eIDAS (UE) 910/2014 y la Ley 6/2020, de 11 de noviembre." },
];

const actaPoints = [
  { num: 1, title: "Recepción efectiva del servicio", color: "border-primary" },
  { num: 2, title: "Inicio de la consultoría", color: "border-primary" },
  { num: 3, title: "Conformidad y ausencia de incidencias", color: "border-primary" },
  { num: 4, title: "Activación de la financiación (HOKODO)", color: "border-amber-500", highlight: true },
  { num: 5, title: "Validez de la firma digital", color: "border-primary" },
];

export default function ContratoKitEspacioDatos() {
  const navigate = useNavigate();
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [actAccepted, setActAccepted] = useState(false);
  const [acceptanceTimestamp, setAcceptanceTimestamp] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= documentHeight - 300 && !hasScrolledToEnd) {
        setHasScrolledToEnd(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledToEnd]);

  useEffect(() => {
    if (contractAccepted && actAccepted && !acceptanceTimestamp) {
      const timestamp = new Date().toISOString();
      setAcceptanceTimestamp(timestamp);
      localStorage.setItem('contract_acceptance', JSON.stringify({ contractAccepted: true, actAccepted: true, timestamp }));
    }
  }, [contractAccepted, actAccepted, acceptanceTimestamp]);

  const handleContinue = () => {
    if (contractAccepted && actAccepted && acceptanceTimestamp) {
      navigate(`/inscripcion-kit-espacio-datos?contrato_leido=true&acta_leida=true&timestamp=${encodeURIComponent(acceptanceTimestamp)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/condiciones-kit-espacio-datos" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Volver a Condiciones
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      {!hasScrolledToEnd && (
        <div className="sticky top-14 z-40 bg-amber-100 dark:bg-amber-950 border-b border-amber-300 py-2 text-center text-sm text-amber-800 dark:text-amber-200">
          <ArrowDown className="inline h-4 w-4 mr-1 animate-bounce" />
          Desplázate hasta el final del documento para poder aceptar las condiciones
        </div>
      )}
      {hasScrolledToEnd && !contractAccepted && (
        <div className="sticky top-14 z-40 bg-emerald-100 dark:bg-emerald-950 border-b border-emerald-300 py-2 text-center text-sm text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 className="inline h-4 w-4 mr-1" />
          Has llegado al final. Ahora puedes marcar las casillas de aceptación.
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-black text-center mb-2">Contrato de Adhesión</h1>
        <p className="text-center text-muted-foreground mb-10">Programa Kit Espacio de Datos — ACCURO TECHNOLOGY, S.L.</p>

        {/* Contract clauses */}
        <div className="space-y-4 mb-16">
          <h2 className="text-xl font-bold mb-4">Sección 1: Contrato de Adhesión</h2>
          {clausulas.map((c) => (
            <Card key={c.num}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {c.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{c.title}</h4>
                    <p className="text-muted-foreground mt-1 text-sm">{c.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Acta */}
        <div className="space-y-4 mb-16">
          <h2 className="text-xl font-bold mb-4">Sección 2: Acta de Entrega y Conformidad</h2>
          {actaPoints.map((p) => (
            <Card key={p.num} className={`border-l-4 ${p.color}`}>
              <CardContent className={`p-6 ${p.highlight ? 'bg-amber-50 dark:bg-amber-950/20' : ''}`}>
                <h4 className="font-bold text-foreground">{p.num}. {p.title}</h4>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Acceptance */}
        <Card className="border-2 border-primary/50">
          <CardContent className="p-8 space-y-6">
            <h3 className="text-xl font-bold text-center">Aceptación Digital</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="contract"
                  checked={contractAccepted}
                  onCheckedChange={(v) => setContractAccepted(v === true)}
                  disabled={!hasScrolledToEnd}
                />
                <label htmlFor="contract" className={`text-sm ${!hasScrolledToEnd ? 'text-muted-foreground' : 'text-foreground'}`}>
                  He leído y acepto el <strong>Contrato de Adhesión</strong> (12 cláusulas)
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="acta"
                  checked={actAccepted}
                  onCheckedChange={(v) => setActAccepted(v === true)}
                  disabled={!hasScrolledToEnd}
                />
                <label htmlFor="acta" className={`text-sm ${!hasScrolledToEnd ? 'text-muted-foreground' : 'text-foreground'}`}>
                  He leído y acepto el <strong>Acta de Entrega y Conformidad</strong> (5 puntos)
                </label>
              </div>
            </div>

            {acceptanceTimestamp && (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3 text-sm text-emerald-800 dark:text-emerald-200 text-center">
                <CheckCircle2 className="inline h-4 w-4 mr-1" />
                Aceptado el {new Date(acceptanceTimestamp).toLocaleString('es-ES')}
              </div>
            )}

            <Button
              onClick={handleContinue}
              disabled={!contractAccepted || !actAccepted}
              className="w-full"
              size="lg"
            >
              Continuar con la Inscripción <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
