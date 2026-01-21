import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { mold_id: "MOLD-001", mold_type: "Inyección", material: "Acero P20", complexity: "Alta", lead_time_weeks: 8 },
  { mold_id: "MOLD-002", mold_type: "Soplado", material: "Aluminio 7075", complexity: "Media", lead_time_weeks: 5 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Molde", accessorKey: "mold_id" },
  { header: "Tipo Molde", accessorKey: "mold_type" },
  { header: "Material", accessorKey: "material" },
  { header: "Complejidad", accessorKey: "complexity" },
  { header: "Lead Time (sem)", accessorKey: "lead_time_weeks", format: "number" as const },
];

export default function FabricacionMoldesDetail() {
  return <PartnerProductDetailBase partnerId="aip" productKey="RND-MOLD-05" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
