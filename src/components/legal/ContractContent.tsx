import { ScrollArea } from "@/components/ui/scroll-area";

interface ContractContentProps {
  clinicName?: string;
}

export default function ContractContent({ clinicName = '[NOMBRE DE LA EMPRESA]' }: ContractContentProps) {
  return (
    <ScrollArea className="h-[350px] rounded-md border p-4 bg-muted/30">
      <div className="space-y-6 text-sm">
        <div className="text-center font-bold text-lg border-b pb-4">
          CONTRATO DE ADHESIÓN<br />
          PROGRAMA KIT ESPACIO DE DATOS
        </div>

        <p className="text-muted-foreground">
          Entre <strong>ACCURO TECHNOLOGY, S.L.</strong> (CIF: B87617981), con domicilio en C/ Colquide, 6 – Portal 2, 1ª planta, Edificio Prisma, Las Rozas – Madrid, en adelante "EL PRESTADOR", y <strong>{clinicName}</strong>, en adelante "EL CLIENTE".
        </p>

        {/* Cláusula 1 */}
        <div>
          <h4 className="font-bold text-foreground">1. OBJETO DEL CONTRATO</h4>
          <p className="text-muted-foreground mt-1">
            El presente contrato tiene por objeto la licencia de uso de la plataforma Global Data Care (Espacio de Datos Federado) y la consultoría de tramitación de las ayudas del programa Kit Espacio de Datos de RED.ES.
          </p>
        </div>

        {/* Cláusula 2 */}
        <div>
          <h4 className="font-bold text-foreground">2. DURACIÓN Y CONDICIONALIDAD</h4>
          <div className="mt-1 space-y-2">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded border-l-4 border-amber-500">
              <strong>FASE 1 (Irrevocable):</strong> 6 meses desde la firma del Acta de Conformidad. Compromiso firme e irrevocable. No admite cancelación anticipada.
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded border-l-4 border-emerald-500">
              <strong>FASE 2 (Condicional):</strong> Prórroga automática de 24 meses, condicionada a la concesión efectiva de la subvención por RED.ES. Si la subvención no es concedida, el contrato finaliza al término de la Fase 1.
            </div>
          </div>
        </div>

        {/* Cláusula 3 */}
        <div>
          <h4 className="font-bold text-foreground">3. PRECIO Y CONDICIONES ECONÓMICAS</h4>
          <div className="mt-1 space-y-2">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded border-l-4 border-blue-500">
              <strong>Fase 1:</strong> 1.140€ + IVA (190€/mes × 6 meses)
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded border-l-4 border-blue-500">
              <strong>Fase 2:</strong> El importe total será equivalente a la subvención concedida por RED.ES (hasta 30.000€).
            </div>
          </div>
        </div>

        {/* Cláusula 4 */}
        <div>
          <h4 className="font-bold text-foreground">4. FORMA DE PAGO Y FINANCIACIÓN</h4>
          <p className="text-muted-foreground mt-1">
            El pago de la Fase 1 se realizará en 6 cuotas mensuales de 190€ + IVA, financiadas a través de HOKODO. La deuda es cierta, líquida y exigible desde la firma del Acta de Conformidad.
          </p>
        </div>

        {/* Cláusula 5 */}
        <div>
          <h4 className="font-bold text-foreground">5. ACTA DE CONFORMIDAD Y ACTIVACIÓN</h4>
          <p className="text-muted-foreground mt-1">
            La firma digital del Acta de Entrega y Conformidad activa la financiación de HOKODO y constituye el inicio formal de la prestación del servicio. El Cliente renuncia a retener pagos por causas ajenas al presente contrato.
          </p>
        </div>

        {/* Cláusula 6 */}
        <div>
          <h4 className="font-bold text-foreground">6. OBLIGACIONES DEL CLIENTE (MANDATO)</h4>
          <p className="text-muted-foreground mt-1">
            El Cliente designa a Global Data Care como Representante Voluntario ante RED.ES para la tramitación de la ayuda. El Cliente se compromete a entregar la documentación requerida en un plazo máximo de 5 días hábiles.
          </p>
          <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded border-l-4 border-red-500 mt-2">
            <strong>Penalización:</strong> El incumplimiento del plazo de entrega de documentación conllevará una penalización del 15% sobre el importe de la subvención solicitada.
          </div>
        </div>

        {/* Cláusula 7 */}
        <div>
          <h4 className="font-bold text-foreground">7. DISPUTAS COMERCIALES</h4>
          <p className="text-muted-foreground mt-1">
            Las reclamaciones técnicas o comerciales del Cliente no afectarán al flujo de pagos establecido. Cualquier incidencia técnica se gestionará por los canales de soporte habilitados.
          </p>
        </div>

        <div className="border-t pt-4 text-center text-xs text-muted-foreground">
          <p><strong>ACCURO TECHNOLOGY, S.L.</strong> — CIF: B87617981</p>
          <p>C/ Colquide, 6 – Portal 2, 1ª planta, Edificio Prisma, Las Rozas – Madrid</p>
          <p>Contacto: emilio.emulet@accuro.es | Tel. 601 398 868</p>
        </div>
      </div>
    </ScrollArea>
  );
}
