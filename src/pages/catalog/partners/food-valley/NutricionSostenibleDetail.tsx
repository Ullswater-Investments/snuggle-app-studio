import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { product_id: "NUT-001", product_type: "Proteína vegetal", carbon_footprint_kg: 2.1, water_usage_l: 150, nutri_score: "A" },
  { product_id: "NUT-002", product_type: "Lácteo alternativo", carbon_footprint_kg: 1.8, water_usage_l: 120, nutri_score: "B" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Producto", accessorKey: "product_id" },
  { header: "Tipo Producto", accessorKey: "product_type" },
  { header: "Huella CO2 (kg)", accessorKey: "carbon_footprint_kg", format: "number" as const },
  { header: "Uso Agua (L)", accessorKey: "water_usage_l", format: "number" as const },
  { header: "Nutri-Score", accessorKey: "nutri_score" },
];

export default function NutricionSostenibleDetail() {
  return <PartnerProductDetailBase partnerId="food-valley" productKey="ESG-NUTR-02" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
