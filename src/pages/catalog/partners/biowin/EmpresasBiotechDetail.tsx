import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { company_id: "BWN-001", company_name: "UCB Pharma", segment: "Neurología", pipeline_drugs: 12, rd_investment_mln: 1800 },
  { company_id: "BWN-002", company_name: "Galapagos NV", segment: "Inmunología", pipeline_drugs: 8, rd_investment_mln: 950 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Empresa", accessorKey: "company_id" },
  { header: "Nombre", accessorKey: "company_name" },
  { header: "Segmento", accessorKey: "segment" },
  { header: "Fármacos Pipeline", accessorKey: "pipeline_drugs", format: "number" as const },
  { header: "Inversión I+D (M€)", accessorKey: "rd_investment_mln", format: "currency" as const },
];

export default function EmpresasBiotechDetail() {
  return <PartnerProductDetailBase partnerId="biowin" productKey="SUP-BIO-01" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
