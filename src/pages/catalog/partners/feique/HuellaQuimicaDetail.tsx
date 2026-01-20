import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { plant_id: "FEIQ-001", emissions_co2: 12500, water_m3: 45000, energy_mwh: 8900, pef_score: 78 },
  { plant_id: "FEIQ-002", emissions_co2: 8900, water_m3: 32000, energy_mwh: 6200, pef_score: 82 },
];

const SAMPLE_COLUMNS = [
  { header: "Planta", accessorKey: "plant_id" },
  { header: "CO2 (t)", accessorKey: "emissions_co2", format: "number" as const },
  { header: "Agua (m³)", accessorKey: "water_m3", format: "number" as const },
  { header: "Energía (MWh)", accessorKey: "energy_mwh", format: "number" as const },
  { header: "Score PEF", accessorKey: "pef_score", format: "number" as const },
];

export default function HuellaQuimicaDetail() {
  return <PartnerProductDetailBase partnerId="feique" productKey="ESG-CHEM-02" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
