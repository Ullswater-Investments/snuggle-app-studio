import { PartnerProductDetailBase } from "@/components/catalog/PartnerProductDetailBase";

const SAMPLE_DATA = [
  { cas_number: "67-64-1", substance: "Acetona", status: "Registrado", tonnage: "1000-10000t", svhc: "No" },
  { cas_number: "7440-02-0", substance: "Níquel", status: "Autorizado", tonnage: "100-1000t", svhc: "Sí" },
  { cas_number: "108-88-3", substance: "Tolueno", status: "Registrado", tonnage: "10000+t", svhc: "No" },
];

const SAMPLE_COLUMNS = [
  { header: "CAS", accessorKey: "cas_number" },
  { header: "Sustancia", accessorKey: "substance" },
  { header: "Estado REACH", accessorKey: "status" },
  { header: "Tonelaje", accessorKey: "tonnage" },
  { header: "SVHC", accessorKey: "svhc" },
];

export default function CumplimientoReachDetail() {
  return <PartnerProductDetailBase partnerId="feique" productKey="SUP-REACH-01" sampleData={SAMPLE_DATA} sampleColumns={SAMPLE_COLUMNS} />;
}
