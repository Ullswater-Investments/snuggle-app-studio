import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { sample_id: "SENS-001", product: "Queso vegano", taste_score: 7.8, texture_score: 8.2, aroma_score: 7.5, overall: 7.8 },
  { sample_id: "SENS-002", product: "Hamburguesa vegetal", taste_score: 8.1, texture_score: 7.9, aroma_score: 8.0, overall: 8.0 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Muestra", accessorKey: "sample_id" },
  { header: "Producto", accessorKey: "product" },
  { header: "Sabor", accessorKey: "taste_score", format: "number" as const },
  { header: "Textura", accessorKey: "texture_score", format: "number" as const },
  { header: "Aroma", accessorKey: "aroma_score", format: "number" as const },
  { header: "General", accessorKey: "overall", format: "number" as const },
];

export default function AnalisisSensorialDetail() {
  return <PartnerProductDetailBase partnerId="food-valley" productKey="RND-SENS-05" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
