import { useOrganizationContext } from "@/hooks/useOrganizationContext";

export const useOrgSector = () => {
  const { activeOrg } = useOrganizationContext();
  
  if (!activeOrg) return "General";
  
  const name = activeOrg.name.toLowerCase();
  
  if (name.includes("auto") || name.includes("motor") || name.includes("mobility")) return "Automotive";
  if (name.includes("energy") || name.includes("power") || name.includes("solar") || name.includes("wind")) return "Energy";
  if (name.includes("pharma") || name.includes("bio") || name.includes("health") || name.includes("medi")) return "Pharma";
  if (name.includes("retail") || name.includes("market") || name.includes("fashion") || name.includes("shop")) return "Retail";
  if (name.includes("construct") || name.includes("build") || name.includes("infra")) return "Construction";
  if (name.includes("finance") || name.includes("bank") || name.includes("capital") || name.includes("invest")) return "Finance";
  if (name.includes("logistics") || name.includes("transport") || name.includes("port") || name.includes("cargo")) return "Logistics";
  if (name.includes("tech") || name.includes("data") || name.includes("cyber") || name.includes("cloud")) return "Tech";
  if (name.includes("agri") || name.includes("food") || name.includes("grain") || name.includes("farm")) return "AgriFood";
  if (name.includes("aero") || name.includes("defense") || name.includes("sat")) return "Aerospace";
  
  return "General";
};
