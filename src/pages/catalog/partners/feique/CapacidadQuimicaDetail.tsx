import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { facility_id: "CHEM-001", reactor_type: "Batch", capacity_t: 500, availability: 85, lead_time_days: 14 },
  { facility_id: "CHEM-002", reactor_type: "Continuo", capacity_t: 2000, availability: 92, lead_time_days: 7 },
];

const SAMPLE_COLUMNS = [
  { header: "Instalación", accessorKey: "facility_id" },
  { header: "Tipo Reactor", accessorKey: "reactor_type" },
  { header: "Capacidad (t)", accessorKey: "capacity_t", format: "number" as const },
  { header: "Disponibilidad %", accessorKey: "availability", format: "percent" as const },
  { header: "Lead Time (días)", accessorKey: "lead_time_days", format: "number" as const },
];

export default function CapacidadQuimicaDetail() {
  return <PartnerProductDetailBase partnerId="feique" productKey="OPS-PROD-03" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
