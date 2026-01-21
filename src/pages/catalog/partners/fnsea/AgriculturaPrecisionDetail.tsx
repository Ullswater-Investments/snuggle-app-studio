import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { field_id: "PREC-001", ndvi_avg: 0.72, moisture_pct: 28, yield_prediction_t: 8.5, satellite_date: "2024-03-15" },
  { field_id: "PREC-002", ndvi_avg: 0.68, moisture_pct: 32, yield_prediction_t: 7.2, satellite_date: "2024-03-15" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Parcela", accessorKey: "field_id" },
  { header: "NDVI Medio", accessorKey: "ndvi_avg", format: "number" as const },
  { header: "Humedad %", accessorKey: "moisture_pct", format: "percent" as const },
  { header: "Predicción Rend. (t)", accessorKey: "yield_prediction_t", format: "number" as const },
  { header: "Fecha Satélite", accessorKey: "satellite_date" },
];

export default function AgriculturaPrecisionDetail() {
  return <PartnerProductDetailBase partnerId="fnsea" productKey="RND-PRECIS-05" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
