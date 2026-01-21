import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { facility_id: "PROC-001", process_type: "Pasteurización", capacity_t_day: 500, availability: 95, certifications: "BRC, IFS" },
  { facility_id: "PROC-002", process_type: "Liofilización", capacity_t_day: 50, availability: 88, certifications: "FSSC 22000" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Instalación", accessorKey: "facility_id" },
  { header: "Tipo Proceso", accessorKey: "process_type" },
  { header: "Capacidad (t/día)", accessorKey: "capacity_t_day", format: "number" as const },
  { header: "Disponibilidad %", accessorKey: "availability", format: "percent" as const },
  { header: "Certificaciones", accessorKey: "certifications" },
];

export default function ProcesamientoAlimentarioDetail() {
  return <PartnerProductDetailBase partnerId="food-valley" productKey="OPS-PROC-03" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
