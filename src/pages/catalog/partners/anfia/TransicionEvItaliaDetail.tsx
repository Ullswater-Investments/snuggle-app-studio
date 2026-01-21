import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { company_id: "ANF-EV-001", ev_investment_mln: 150, charging_stations: 250, ev_models: 5, transition_score: 78 },
  { company_id: "ANF-EV-002", ev_investment_mln: 280, charging_stations: 420, ev_models: 8, transition_score: 85 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Empresa", accessorKey: "company_id" },
  { header: "Inversión EV (M€)", accessorKey: "ev_investment_mln", format: "currency" as const },
  { header: "Estaciones Carga", accessorKey: "charging_stations", format: "number" as const },
  { header: "Modelos EV", accessorKey: "ev_models", format: "number" as const },
  { header: "Score Transición", accessorKey: "transition_score", format: "percent" as const },
];

export default function TransicionEvItaliaDetail() {
  return <PartnerProductDetailBase partnerId="anfia" productKey="ESG-EV-02" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
