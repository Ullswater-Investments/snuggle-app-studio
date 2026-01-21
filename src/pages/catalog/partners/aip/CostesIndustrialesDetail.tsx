import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { cost_category: "Mano de obra", avg_cost_eur_h: 18.5, trend_yoy: 4.2, region: "Norte", benchmark_eu: 22.3 },
  { cost_category: "Electricidad industrial", avg_cost_eur_kwh: 0.12, trend_yoy: 8.5, region: "Centro", benchmark_eu: 0.15 },
];

const SAMPLE_COLUMNS = [
  { header: "Categoría Coste", accessorKey: "cost_category" },
  { header: "Coste Medio (€)", accessorKey: "avg_cost_eur_h", format: "currency" as const },
  { header: "Tendencia YoY %", accessorKey: "trend_yoy", format: "percent" as const },
  { header: "Región", accessorKey: "region" },
  { header: "Benchmark UE (€)", accessorKey: "benchmark_eu", format: "currency" as const },
];

export default function CostesIndustrialesDetail() {
  return <PartnerProductDetailBase partnerId="aip" productKey="MKT-COST-04" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
