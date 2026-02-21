import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const GOVERNANCE_KEYS = [
  "require_email_verification",
  "require_kyc",
  "require_kyb",
  "require_deltadao_onboarding",
  "ecosystem_status",
  "auto_approve_assets",
  "catalog_visibility",
  "ecosystem_fee_percentage",
  "maintenance_mode",
  "log_verbosity",
] as const;

interface GovernanceSettings {
  requireEmail: boolean;
  requireKyc: boolean;
  requireKyb: boolean;
  requireDeltadaoOnboarding: boolean;
  ecosystemStatus: "active" | "maintenance";
  autoApproveAssets: boolean;
  catalogVisibility: "public" | "private";
  ecosystemFeePercentage: number;
  maintenanceMode: boolean;
  logVerbosity: "basic" | "operational" | "debug";
  isLoading: boolean;
}

export function useGovernanceSettings(): GovernanceSettings {
  const { data, isLoading } = useQuery({
    queryKey: ["governance-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("system_settings")
        .select("key, value")
        .in("key", [...GOVERNANCE_KEYS]);

      if (error) throw error;

      const map: Record<string, string> = {};
      for (const row of data ?? []) {
        map[row.key] = row.value;
      }
      return map;
    },
    staleTime: 30_000,
  });

  return {
    requireEmail: data?.require_email_verification === "true",
    requireKyc: data?.require_kyc === "true",
    requireKyb: data?.require_kyb === "true",
    requireDeltadaoOnboarding: data?.require_deltadao_onboarding !== "false",
    ecosystemStatus: (data?.ecosystem_status as "active" | "maintenance") ?? "active",
    autoApproveAssets: data?.auto_approve_assets !== "false",
    catalogVisibility: (data?.catalog_visibility as "public" | "private") ?? "public",
    ecosystemFeePercentage: parseFloat(data?.ecosystem_fee_percentage ?? "2.5"),
    maintenanceMode: data?.maintenance_mode === "true",
    logVerbosity: (data?.log_verbosity as "basic" | "operational" | "debug") ?? "operational",
    isLoading,
  };
}
