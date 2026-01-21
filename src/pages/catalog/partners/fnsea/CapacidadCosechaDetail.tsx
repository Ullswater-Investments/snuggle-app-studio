import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { cooperative_id: "COOP-001", machinery_count: 45, harvest_capacity_ha: 1200, availability: 92, region: "Occitanie" },
  { cooperative_id: "COOP-002", machinery_count: 32, harvest_capacity_ha: 850, availability: 88, region: "Bretagne" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Cooperativa", accessorKey: "cooperative_id" },
  { header: "Nº Maquinaria", accessorKey: "machinery_count", format: "number" as const },
  { header: "Capacidad (ha)", accessorKey: "harvest_capacity_ha", format: "number" as const },
  { header: "Disponibilidad %", accessorKey: "availability", format: "percent" as const },
  { header: "Región", accessorKey: "region" },
];

export default function CapacidadCosechaDetail() {
  return <PartnerProductDetailBase partnerId="fnsea" productKey="OPS-HARV-03" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
