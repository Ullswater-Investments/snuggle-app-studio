import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { sample_id: "LAB-001", compound: "Paracetamol API", purity_pct: 99.8, stability_months: 36, test_type: "HPLC" },
  { sample_id: "LAB-002", compound: "Ibuprofeno", purity_pct: 99.5, stability_months: 24, test_type: "GC-MS" },
];

const SAMPLE_COLUMNS = [
  { header: "Muestra", accessorKey: "sample_id" },
  { header: "Compuesto", accessorKey: "compound" },
  { header: "Pureza %", accessorKey: "purity_pct", format: "percent" as const },
  { header: "Estabilidad (meses)", accessorKey: "stability_months", format: "number" as const },
  { header: "Tipo Test", accessorKey: "test_type" },
];

export default function AnalisisLaboratorioDetail() {
  return <PartnerProductDetailBase partnerId="feique" productKey="RND-LAB-05" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
