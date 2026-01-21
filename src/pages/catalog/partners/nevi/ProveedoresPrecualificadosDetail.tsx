import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { vendor_id: "VND-001", company: "TechSupply BV", category: "IT Services", qualification_score: 92, last_audit: "2024-01" },
  { vendor_id: "VND-002", company: "Industrial Parts NL", category: "MRO", qualification_score: 88, last_audit: "2024-02" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Proveedor", accessorKey: "vendor_id" },
  { header: "Empresa", accessorKey: "company" },
  { header: "Categoría", accessorKey: "category" },
  { header: "Score Cualificación", accessorKey: "qualification_score", format: "percent" as const },
  { header: "Última Auditoría", accessorKey: "last_audit" },
];

export default function ProveedoresPrecualificadosDetail() {
  return <PartnerProductDetailBase partnerId="nevi" productKey="OPS-VENDOR-03" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
