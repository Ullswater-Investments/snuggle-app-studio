import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { trial_id: "CT-001", phase: "Phase III", therapeutic_area: "Oncología", sites_available: 12, patient_capacity: 500 },
  { trial_id: "CT-002", phase: "Phase II", therapeutic_area: "Cardiovascular", sites_available: 8, patient_capacity: 250 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Ensayo", accessorKey: "trial_id" },
  { header: "Fase", accessorKey: "phase" },
  { header: "Área Terapéutica", accessorKey: "therapeutic_area" },
  { header: "Sitios Disponibles", accessorKey: "sites_available", format: "number" as const },
  { header: "Capacidad Pacientes", accessorKey: "patient_capacity", format: "number" as const },
];

export default function EnsayosClinicosDetail() {
  return <PartnerProductDetailBase partnerId="biowin" productKey="OPS-TRIAL-03" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
