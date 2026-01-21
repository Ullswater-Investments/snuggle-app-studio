import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { ingredient: "Proteína de guisante", price_eur_kg: 4.50, trend_30d: 2.8, origin: "Francia", grade: "Food" },
  { ingredient: "Aceite de coco", price_eur_kg: 2.80, trend_30d: -1.5, origin: "Filipinas", grade: "Organic" },
];

const SAMPLE_COLUMNS = [
  { header: "Ingrediente", accessorKey: "ingredient" },
  { header: "Precio (€/kg)", accessorKey: "price_eur_kg", format: "currency" as const },
  { header: "Tendencia 30d %", accessorKey: "trend_30d", format: "percent" as const },
  { header: "Origen", accessorKey: "origin" },
  { header: "Grado", accessorKey: "grade" },
];

export default function PreciosIngredientesDetail() {
  return <PartnerProductDetailBase partnerId="food-valley" productKey="MKT-INGR-04" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
