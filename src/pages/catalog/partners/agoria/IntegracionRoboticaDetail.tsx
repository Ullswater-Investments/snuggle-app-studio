import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { provider_id: "ROB-001", specialty: "Integración ABB", capacity_projects: 12, lead_time_weeks: 8, certified: "Sí" },
  { provider_id: "ROB-002", specialty: "FANUC/KUKA", capacity_projects: 8, lead_time_weeks: 10, certified: "Sí" },
];

const SAMPLE_COLUMNS = [
  { header: "Proveedor", accessorKey: "provider_id" },
  { header: "Especialidad", accessorKey: "specialty" },
  { header: "Capacidad (proyectos)", accessorKey: "capacity_projects", format: "number" as const },
  { header: "Lead Time (sem)", accessorKey: "lead_time_weeks", format: "number" as const },
  { header: "Certificado", accessorKey: "certified" },
];

export default function IntegracionRoboticaDetail() {
  return <PartnerProductDetailBase partnerId="agoria" productKey="OPS-ROB-03" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
