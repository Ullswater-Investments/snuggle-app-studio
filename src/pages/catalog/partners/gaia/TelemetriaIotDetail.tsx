import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { sensor_id: "SCADA-001", device_type: "PLC", location: "Linea 1", value: 24.5, unit: "°C", timestamp: "2024-01-15" },
  { sensor_id: "SCADA-002", device_type: "Sensor IoT", location: "Almacén", value: 65.2, unit: "%HR", timestamp: "2024-01-15" },
  { sensor_id: "SCADA-003", device_type: "Motor", location: "Prensa", value: 1450, unit: "RPM", timestamp: "2024-01-15" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Sensor", accessorKey: "sensor_id" },
  { header: "Tipo", accessorKey: "device_type" },
  { header: "Ubicación", accessorKey: "location" },
  { header: "Valor", accessorKey: "value", format: "number" as const },
  { header: "Unidad", accessorKey: "unit" },
  { header: "Fecha", accessorKey: "timestamp", format: "date" as const },
];

export default function TelemetriaIotDetail() {
  return <PartnerProductDetailBase partnerId="gaia-cluster" productKey="RND-IOT-05" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
