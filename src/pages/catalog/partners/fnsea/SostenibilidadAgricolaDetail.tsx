import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { farm_id: "FNS-ESG-001", co2_per_ha: 2.1, water_efficiency: 85, biodiversity_score: 72, renewable_energy: 45 },
  { farm_id: "FNS-ESG-002", co2_per_ha: 1.8, water_efficiency: 91, biodiversity_score: 78, renewable_energy: 62 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Explotación", accessorKey: "farm_id" },
  { header: "CO2/ha (t)", accessorKey: "co2_per_ha", format: "number" as const },
  { header: "Efic. Agua %", accessorKey: "water_efficiency", format: "percent" as const },
  { header: "Biodiversidad", accessorKey: "biodiversity_score", format: "number" as const },
  { header: "Energía Renov. %", accessorKey: "renewable_energy", format: "percent" as const },
];

export default function SostenibilidadAgricolaDetail() {
  return <PartnerProductDetailBase partnerId="fnsea" productKey="ESG-FARM-02" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
