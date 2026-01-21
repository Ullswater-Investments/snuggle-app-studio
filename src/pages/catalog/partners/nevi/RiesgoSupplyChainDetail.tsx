import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { supplier_id: "RISK-001", risk_score: 72, financial_risk: "Medium", geopolitical_risk: "Low", disruption_probability: 15 },
  { supplier_id: "RISK-002", risk_score: 45, financial_risk: "Low", geopolitical_risk: "High", disruption_probability: 28 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Proveedor", accessorKey: "supplier_id" },
  { header: "Score Riesgo", accessorKey: "risk_score", format: "number" as const },
  { header: "Riesgo Financiero", accessorKey: "financial_risk" },
  { header: "Riesgo Geopolítico", accessorKey: "geopolitical_risk" },
  { header: "Prob. Disrupción %", accessorKey: "disruption_probability", format: "percent" as const },
];

export default function RiesgoSupplyChainDetail() {
  return <PartnerProductDetailBase partnerId="nevi" productKey="RND-SRISK-05" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
