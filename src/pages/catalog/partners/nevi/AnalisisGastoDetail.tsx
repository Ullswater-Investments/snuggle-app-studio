import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { category: "IT & Software", spend_mln: 45.2, supplier_count: 28, savings_potential: 12, maverick_pct: 8 },
  { category: "Logistics", spend_mln: 32.8, supplier_count: 15, savings_potential: 18, maverick_pct: 5 },
];

const SAMPLE_COLUMNS = [
  { header: "Categoría", accessorKey: "category" },
  { header: "Gasto (M€)", accessorKey: "spend_mln", format: "currency" as const },
  { header: "Nº Proveedores", accessorKey: "supplier_count", format: "number" as const },
  { header: "Potencial Ahorro %", accessorKey: "savings_potential", format: "percent" as const },
  { header: "Maverick %", accessorKey: "maverick_pct", format: "percent" as const },
];

export default function AnalisisGastoDetail() {
  return <PartnerProductDetailBase partnerId="nevi" productKey="MKT-SPEND-04" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
