import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { company_id: "AIP-001", company_name: "Metalúrgica Porto", sector: "Metalurgia", employees: 250, region: "Norte" },
  { company_id: "AIP-002", company_name: "Plásticos Lisboa", sector: "Plásticos", employees: 180, region: "Lisboa" },
];

const SAMPLE_COLUMNS = [
  { header: "ID Empresa", accessorKey: "company_id" },
  { header: "Nombre", accessorKey: "company_name" },
  { header: "Sector", accessorKey: "sector" },
  { header: "Empleados", accessorKey: "employees", format: "number" as const },
  { header: "Región", accessorKey: "region" },
];

export default function DirectorioIndustrialDetail() {
  return <PartnerProductDetailBase partnerId="aip" productKey="SUP-IND-01" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
