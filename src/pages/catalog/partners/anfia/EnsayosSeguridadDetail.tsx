import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { test_id: "CRASH-001", test_type: "Frontal", vehicle_model: "Sedan A", ncap_stars: 5, date: "2024-01" },
  { test_id: "CRASH-002", test_type: "Lateral", vehicle_model: "SUV B", ncap_stars: 4, date: "2024-02" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Test", accessorKey: "test_id" },
  { header: "Tipo Ensayo", accessorKey: "test_type" },
  { header: "Modelo Vehículo", accessorKey: "vehicle_model" },
  { header: "Estrellas NCAP", accessorKey: "ncap_stars", format: "number" as const },
  { header: "Fecha", accessorKey: "date" },
];

export default function EnsayosSeguridadDetail() {
  return <PartnerProductDetailBase partnerId="anfia" productKey="RND-CRASH-05" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
