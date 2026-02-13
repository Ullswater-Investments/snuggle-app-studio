import { ScrollArea } from "@/components/ui/scroll-area";

interface AcceptanceActContentProps {
  clinicName?: string;
  contactName?: string;
}

export default function AcceptanceActContent({
  clinicName = '[NOMBRE DE LA EMPRESA]',
  contactName = '[NOMBRE DEL REPRESENTANTE]',
}: AcceptanceActContentProps) {
  const today = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const points = [
    {
      num: 1,
      title: "Recepción efectiva del servicio",
      content: "Certifico haber recibido acceso efectivo al Espacio de Datos Federado de Global Data Care y a las herramientas de consultoría asociadas.",
      color: "border-emerald-500",
    },
    {
      num: 2,
      title: "Inicio de la consultoría",
      content: "Confirmo que se ha iniciado el proceso de consultoría para la tramitación de las ayudas del Kit Espacio de Datos ante RED.ES.",
      color: "border-blue-500",
    },
    {
      num: 3,
      title: "Conformidad y ausencia de incidencias",
      content: "Declaro mi conformidad con el servicio recibido y la ausencia de incidencias técnicas o funcionales en el momento de la entrega.",
      color: "border-purple-500",
    },
    {
      num: 4,
      title: "Activación de la financiación (HOKODO)",
      content: "AUTORIZO IRREVOCABLEMENTE la activación de la financiación a través de HOKODO por importe de 1.140€ + IVA, pagaderos en 6 cuotas mensuales de 190€ + IVA.",
      color: "border-amber-500",
      highlight: true,
    },
    {
      num: 5,
      title: "Validez de la firma digital",
      content: "Reconozco la plena validez jurídica de la firma digital conforme al Reglamento eIDAS (UE) 910/2014 y la Ley 6/2020.",
      color: "border-gray-500",
    },
  ];

  return (
    <ScrollArea className="h-[300px] rounded-md border p-4 bg-muted/30">
      <div className="space-y-6 text-sm">
        <div className="text-center font-bold text-lg border-b pb-4">
          ACTA DE ENTREGA Y CONFORMIDAD
        </div>

        <p className="text-muted-foreground">
          En Madrid, a {today}, el representante de <strong>{clinicName}</strong>, D./Dña. <strong>{contactName}</strong>, certifica:
        </p>

        <div className="space-y-4">
          {points.map((point) => (
            <div
              key={point.num}
              className={`border-l-4 ${point.color} p-3 rounded ${point.highlight ? 'bg-amber-50 dark:bg-amber-950/30' : ''}`}
            >
              <h5 className="font-bold text-foreground">
                {point.num}. {point.title}
              </h5>
              <p className={`mt-1 ${point.highlight ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                {point.content}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 text-center text-xs text-muted-foreground">
          <p>Fecha: {today}</p>
          <p>Firmante: {contactName} — en representación de {clinicName}</p>
        </div>
      </div>
    </ScrollArea>
  );
}
