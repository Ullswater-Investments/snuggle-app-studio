import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { product_id: "AUTO-001", category: "Robot Industrial", brand: "ABB", price_eur: 45000, change_pct: -3.2 },
  { product_id: "AUTO-002", category: "PLC", brand: "Siemens", price_eur: 2500, change_pct: 1.5 },
];

const SAMPLE_COLUMNS = [
  { header: "Código", accessorKey: "product_id" },
  { header: "Categoría", accessorKey: "category" },
  { header: "Marca", accessorKey: "brand" },
  { header: "Precio €", accessorKey: "price_eur", format: "currency" as const },
  { header: "Var. %", accessorKey: "change_pct", format: "percent" as const },
];

export default function PreciosAutomatizacionDetail() {
  return <PartnerProductDetailBase partnerId="agoria" productKey="MKT-AUTO-04" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
