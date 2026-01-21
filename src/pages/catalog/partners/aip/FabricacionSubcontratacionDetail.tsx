import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { facility_id: "MFG-001", capacity_type: "CNC Mecanizado", available_hours: 2400, lead_time_days: 14, utilization: 78 },
  { facility_id: "MFG-002", capacity_type: "Inyección Plástico", available_hours: 3200, lead_time_days: 10, utilization: 85 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Instalación", accessorKey: "facility_id" },
  { header: "Tipo Capacidad", accessorKey: "capacity_type" },
  { header: "Horas Disponibles", accessorKey: "available_hours", format: "number" as const },
  { header: "Lead Time (días)", accessorKey: "lead_time_days", format: "number" as const },
  { header: "Utilización %", accessorKey: "utilization", format: "percent" as const },
];

export default function FabricacionSubcontratacionDetail() {
  return <PartnerProductDetailBase partnerId="aip" productKey="OPS-MFG-03" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
