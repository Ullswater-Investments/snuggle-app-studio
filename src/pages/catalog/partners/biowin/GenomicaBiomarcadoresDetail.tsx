import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { biomarker_id: "BIO-001", biomarker_name: "BRCA1/2", therapeutic_use: "Oncología", validation_level: "FDA Approved", sample_type: "Sangre" },
  { biomarker_id: "BIO-002", biomarker_name: "PD-L1", therapeutic_use: "Inmuno-oncología", validation_level: "EMA Approved", sample_type: "Tejido" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Biomarcador", accessorKey: "biomarker_id" },
  { header: "Nombre", accessorKey: "biomarker_name" },
  { header: "Uso Terapéutico", accessorKey: "therapeutic_use" },
  { header: "Nivel Validación", accessorKey: "validation_level" },
  { header: "Tipo Muestra", accessorKey: "sample_type" },
];

export default function GenomicaBiomarcadoresDetail() {
  return <PartnerProductDetailBase partnerId="biowin" productKey="RND-GENO-05" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
