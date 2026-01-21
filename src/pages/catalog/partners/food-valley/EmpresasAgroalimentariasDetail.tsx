import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { company_id: "FV-001", company_name: "FrieslandCampina", segment: "Lácteos", revenue_mln: 12500, employees: 22000 },
  { company_id: "FV-002", company_name: "Unilever Foods NL", segment: "Alimentos", revenue_mln: 8900, employees: 15000 },
];

const SAMPLE_COLUMNS = [
  { header: "ID Empresa", accessorKey: "company_id" },
  { header: "Nombre", accessorKey: "company_name" },
  { header: "Segmento", accessorKey: "segment" },
  { header: "Ingresos (M€)", accessorKey: "revenue_mln", format: "currency" as const },
  { header: "Empleados", accessorKey: "employees", format: "number" as const },
];

export default function EmpresasAgroalimentariasDetail() {
  return <PartnerProductDetailBase partnerId="food-valley" productKey="SUP-FOOD-01" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
