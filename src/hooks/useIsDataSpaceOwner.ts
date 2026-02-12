import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const useIsDataSpaceOwner = () => {
  const { user } = useAuth();

  const { data: isOwner = false, isLoading } = useQuery({
    queryKey: ["is-data-space-owner", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc("is_data_space_owner", {
        _user_id: user.id,
      });
      if (error) {
        console.error("Error checking data_space_owner role:", error);
        return false;
      }
      return data === true;
    },
    enabled: !!user,
  });

  return { isOwner, isLoading };
};
