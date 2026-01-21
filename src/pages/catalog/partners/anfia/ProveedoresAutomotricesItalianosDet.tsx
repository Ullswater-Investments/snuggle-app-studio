import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { supplier_id: "ANF-001", company_name: "Brembo SpA", tier: 1, certifications: "IATF 16949, ISO 14001", region: "Lombardia", specialty: "Frenos" },
  { supplier_id: "ANF-002", company_name: "Magneti Marelli", tier: 1, certifications: "IATF 16949, ISO 45001", region: "Emilia-Romagna", specialty: "Electrónica" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Proveedor", accessorKey: "supplier_id" },
  { header: "Empresa", accessorKey: "company_name" },
  { header: "Tier", accessorKey: "tier", format: "number" as const },
  { header: "Certificaciones", accessorKey: "certifications" },
  { header: "Región", accessorKey: "region" },
  { header: "Especialidad", accessorKey: "specialty" },
];

export default function ProveedoresAutomotricesItalianosDet() {
  return <PartnerProductDetailBase partnerId="anfia" productKey="SUP-AUTO-01" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
