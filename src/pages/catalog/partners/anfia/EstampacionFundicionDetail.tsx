import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { facility_id: "STAMP-001", process_type: "Estampación", capacity_t: 5000, lead_time_days: 21, availability: 88 },
  { facility_id: "FUND-002", process_type: "Fundición", capacity_t: 3200, lead_time_days: 28, availability: 92 },
];

const SAMPLE_COLUMNS = [
  { header: "Instalación", accessorKey: "facility_id" },
  { header: "Tipo Proceso", accessorKey: "process_type" },
  { header: "Capacidad (t)", accessorKey: "capacity_t", format: "number" as const },
  { header: "Lead Time (días)", accessorKey: "lead_time_days", format: "number" as const },
  { header: "Disponibilidad %", accessorKey: "availability", format: "percent" as const },
];

export default function EstampacionFundicionDetail() {
  return <PartnerProductDetailBase partnerId="anfia" productKey="OPS-STAMP-03" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
