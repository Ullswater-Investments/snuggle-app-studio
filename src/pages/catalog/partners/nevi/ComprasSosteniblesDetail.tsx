import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { company_id: "NEV-SUST-001", sustainable_spend_pct: 42, supplier_diversity: 28, circular_contracts: 15, carbon_savings_t: 1250 },
  { company_id: "NEV-SUST-002", sustainable_spend_pct: 55, supplier_diversity: 35, circular_contracts: 22, carbon_savings_t: 2100 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Empresa", accessorKey: "company_id" },
  { header: "Gasto Sostenible %", accessorKey: "sustainable_spend_pct", format: "percent" as const },
  { header: "Diversidad Proveed. %", accessorKey: "supplier_diversity", format: "percent" as const },
  { header: "Contratos Circulares", accessorKey: "circular_contracts", format: "number" as const },
  { header: "Ahorro CO2 (t)", accessorKey: "carbon_savings_t", format: "number" as const },
];

export default function ComprasSosteniblesDetail() {
  return <PartnerProductDetailBase partnerId="nevi" productKey="ESG-SUST-02" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
