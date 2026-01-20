import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { product_id: "CHEM-P001", name: "Ácido sulfúrico", category: "Commodity", price_eur_t: 120, change_pct: 2.5 },
  { product_id: "CHEM-P002", name: "Etileno", category: "Petroquímico", price_eur_t: 950, change_pct: -1.2 },
];

const SAMPLE_COLUMNS = [
  { header: "Código", accessorKey: "product_id" },
  { header: "Producto", accessorKey: "name" },
  { header: "Categoría", accessorKey: "category" },
  { header: "Precio €/t", accessorKey: "price_eur_t", format: "currency" as const },
  { header: "Var. %", accessorKey: "change_pct", format: "percent" as const },
];

export default function PreciosQuimicosDetail() {
  return <PartnerProductDetailBase partnerId="feique" productKey="MKT-CHEM-04" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
