import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { farm_id: "FNS-001", region: "Île-de-France", hectares: 450, crop_type: "Cereales", organic_cert: "Sí" },
  { farm_id: "FNS-002", region: "Nouvelle-Aquitaine", hectares: 680, crop_type: "Viñedo", organic_cert: "No" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Explotación", accessorKey: "farm_id" },
  { header: "Región", accessorKey: "region" },
  { header: "Hectáreas", accessorKey: "hectares", format: "number" as const },
  { header: "Tipo Cultivo", accessorKey: "crop_type" },
  { header: "Cert. Orgánica", accessorKey: "organic_cert" },
];

export default function ExplotacionesAgricolasDetail() {
  return <PartnerProductDetailBase partnerId="fnsea" productKey="SUP-AGRO-01" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
