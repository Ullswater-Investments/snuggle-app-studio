import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { professional_id: "NEV-001", company: "Philips NV", role: "CPO", experience_years: 15, certifications: "CIPS, CSCP" },
  { professional_id: "NEV-002", company: "ASML", role: "Procurement Manager", experience_years: 10, certifications: "CPSM" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Profesional", accessorKey: "professional_id" },
  { header: "Empresa", accessorKey: "company" },
  { header: "Rol", accessorKey: "role" },
  { header: "Experiencia (años)", accessorKey: "experience_years", format: "number" as const },
  { header: "Certificaciones", accessorKey: "certifications" },
];

export default function ProfesionalesComprasDetail() {
  return <PartnerProductDetailBase partnerId="nevi" productKey="SUP-PROC-01" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
