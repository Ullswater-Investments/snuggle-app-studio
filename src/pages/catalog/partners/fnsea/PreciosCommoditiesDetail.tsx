import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { commodity: "Trigo blando", price_eur_t: 245, trend_30d: 2.3, volume_kt: 1250, origin: "Francia" },
  { commodity: "Maíz", price_eur_t: 198, trend_30d: -1.2, volume_kt: 890, origin: "Francia" },
];

const SAMPLE_COLUMNS = [
  { header: "Commodity", accessorKey: "commodity" },
  { header: "Precio (€/t)", accessorKey: "price_eur_t", format: "currency" as const },
  { header: "Tendencia 30d %", accessorKey: "trend_30d", format: "percent" as const },
  { header: "Volumen (kt)", accessorKey: "volume_kt", format: "number" as const },
  { header: "Origen", accessorKey: "origin" },
];

export default function PreciosCommoditiesDetail() {
  return <PartnerProductDetailBase partnerId="fnsea" productKey="MKT-COMM-04" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
