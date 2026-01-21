import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { company_id: "BWN-ESG-001", green_chemistry_pct: 45, waste_reduction: 32, water_recycled: 68, carbon_neutral_target: 2030 },
  { company_id: "BWN-ESG-002", green_chemistry_pct: 52, waste_reduction: 41, water_recycled: 75, carbon_neutral_target: 2028 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Empresa", accessorKey: "company_id" },
  { header: "Química Verde %", accessorKey: "green_chemistry_pct", format: "percent" as const },
  { header: "Reducción Residuos %", accessorKey: "waste_reduction", format: "percent" as const },
  { header: "Agua Reciclada %", accessorKey: "water_recycled", format: "percent" as const },
  { header: "Objetivo Carbono Neutral", accessorKey: "carbon_neutral_target", format: "number" as const },
];

export default function SostenibilidadFarmaDetail() {
  return <PartnerProductDetailBase partnerId="biowin" productKey="ESG-PHARM-02" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
