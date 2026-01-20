import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { cobot_id: "COB-001", model: "UR10e", operations_count: 125000, uptime_pct: 98.5, cycle_time_s: 12.3 },
  { cobot_id: "COB-002", model: "FANUC CRX", operations_count: 89000, uptime_pct: 97.2, cycle_time_s: 15.1 },
];

const SAMPLE_COLUMNS = [
  { header: "Cobot ID", accessorKey: "cobot_id" },
  { header: "Modelo", accessorKey: "model" },
  { header: "Operaciones", accessorKey: "operations_count", format: "number" as const },
  { header: "Uptime %", accessorKey: "uptime_pct", format: "percent" as const },
  { header: "Ciclo (s)", accessorKey: "cycle_time_s", format: "number" as const },
];

export default function TelemetriaCobotDetail() {
  return <PartnerProductDetailBase partnerId="agoria" productKey="RND-COBOT-05" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
