import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { part_id: "PART-001", category: "Motor", avg_price_eur: 245, price_trend: 3.2, supplier_count: 12 },
  { part_id: "PART-002", category: "Transmisión", avg_price_eur: 890, price_trend: -1.5, supplier_count: 8 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Pieza", accessorKey: "part_id" },
  { header: "Categoría", accessorKey: "category" },
  { header: "Precio Medio (€)", accessorKey: "avg_price_eur", format: "currency" as const },
  { header: "Tendencia %", accessorKey: "price_trend", format: "percent" as const },
  { header: "Nº Proveedores", accessorKey: "supplier_count", format: "number" as const },
];

export default function PreciosRecambiosDetail() {
  return <PartnerProductDetailBase partnerId="anfia" productKey="MKT-PARTS-04" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
