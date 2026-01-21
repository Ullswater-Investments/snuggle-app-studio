import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { company_id: "AIP-ESG-001", co2_emissions_t: 1250, renewable_energy_pct: 45, waste_recycled_pct: 72, water_efficiency: 85 },
  { company_id: "AIP-ESG-002", co2_emissions_t: 890, renewable_energy_pct: 62, waste_recycled_pct: 81, water_efficiency: 78 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Empresa", accessorKey: "company_id" },
  { header: "Emisiones CO2 (t)", accessorKey: "co2_emissions_t", format: "number" as const },
  { header: "Energía Renov. %", accessorKey: "renewable_energy_pct", format: "percent" as const },
  { header: "Residuos Recicl. %", accessorKey: "waste_recycled_pct", format: "percent" as const },
  { header: "Efic. Agua %", accessorKey: "water_efficiency", format: "percent" as const },
];

export default function SostenibilidadPortugalDetail() {
  return <PartnerProductDetailBase partnerId="aip" productKey="ESG-PORT-02" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
