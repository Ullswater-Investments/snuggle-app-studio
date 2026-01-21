import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { api_name: "Paracetamol", price_eur_kg: 12.50, trend_90d: 3.2, origin: "India", dossier: "CEP" },
  { api_name: "Ibuprofeno", price_eur_kg: 18.80, trend_90d: -1.8, origin: "China", dossier: "ASMF" },
];

const SAMPLE_COLUMNS = [
  { header: "Principio Activo", accessorKey: "api_name" },
  { header: "Precio (€/kg)", accessorKey: "price_eur_kg", format: "currency" as const },
  { header: "Tendencia 90d %", accessorKey: "trend_90d", format: "percent" as const },
  { header: "Origen", accessorKey: "origin" },
  { header: "Dossier", accessorKey: "dossier" },
];

export default function PreciosApiDetail() {
  return <PartnerProductDetailBase partnerId="biowin" productKey="MKT-API-04" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
