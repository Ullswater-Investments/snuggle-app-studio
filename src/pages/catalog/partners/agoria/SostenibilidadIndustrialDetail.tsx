import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { company_id: "AGO-001", sector: "Robótica", carbon_footprint_t: 450, recycled_materials_pct: 35, energy_efficiency: 88 },
  { company_id: "AGO-002", sector: "Automatización", carbon_footprint_t: 320, recycled_materials_pct: 42, energy_efficiency: 92 },
];

const SAMPLE_COLUMNS = [
  { header: "Empresa", accessorKey: "company_id" },
  { header: "Sector", accessorKey: "sector" },
  { header: "Huella CO2 (t)", accessorKey: "carbon_footprint_t", format: "number" as const },
  { header: "Mat. Reciclados %", accessorKey: "recycled_materials_pct", format: "percent" as const },
  { header: "Eficiencia Energ.", accessorKey: "energy_efficiency", format: "number" as const },
];

export default function SostenibilidadIndustrialDetail() {
  return <PartnerProductDetailBase partnerId="agoria" productKey="ESG-IND-02" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
