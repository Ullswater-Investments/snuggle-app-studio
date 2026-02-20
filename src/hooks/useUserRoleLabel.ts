import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useIsDataSpaceOwner } from "@/hooks/useIsDataSpaceOwner";

export type UserRoleLabel =
  | "data_space_owner"
  | "data_space_operator"
  | "provider"
  | "consumer"
  | "data_holder"
  | "unknown";

export const useUserRoleLabel = (organizationId: string | undefined) => {
  const { user } = useAuth();
  const { isOwner, isLoading: dsoLoading } = useIsDataSpaceOwner();

  const { data: orgRole, isLoading: roleLoading } = useQuery({
    queryKey: ["user-org-role", user?.id, organizationId],
    queryFn: async () => {
      if (!user || !organizationId) return null;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("organization_id", organizationId)
        .maybeSingle();
      if (error) {
        console.error("Error fetching user role:", error);
        return null;
      }
      return data?.role ?? null;
    },
    enabled: !!user && !!organizationId,
  });

  const getRoleLabel = (): UserRoleLabel => {
    if (isOwner) return "data_space_owner";
    if ((orgRole as string) === "data_space_operator") return "data_space_operator";
    return "unknown"; // fallback — org type takes precedence below
  };

  const roleLabel = getRoleLabel();

  return {
    roleLabel,
    isLoading: dsoLoading || roleLoading,
    orgRole,
  };
};

export function getRoleLabelText(
  roleLabel: UserRoleLabel,
  orgType: string | undefined,
  locale: string = "es"
): string {
  const labels: Record<string, Record<string, string>> = {
    es: {
      data_space_owner: "Administrador del Ecosistema",
      data_space_operator: "Operador del Data Space",
      provider: "Proveedor de Datos",
      consumer: "Consumidor de Datos",
      data_holder: "Poseedor de Datos",
      unknown: "Participante",
    },
    en: {
      data_space_owner: "Ecosystem Administrator",
      data_space_operator: "Data Space Operator",
      provider: "Data Provider",
      consumer: "Data Consumer",
      data_holder: "Data Holder",
      unknown: "Participant",
    },
  };

  const l = labels[locale] || labels.es;

  // DSO / operator override org type
  if (roleLabel === "data_space_owner") return l.data_space_owner;
  if (roleLabel === "data_space_operator") return l.data_space_operator;

  // Fallback to org type
  if (orgType === "consumer") return l.consumer;
  if (orgType === "provider") return l.provider;
  if (orgType === "data_holder") return l.data_holder;

  return l.unknown;
}
