import { supabase } from "@/integrations/supabase/client";

interface GovernanceLogParams {
  level: "info" | "warn" | "error";
  category: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export async function logGovernanceEvent({ level, category, message, metadata }: GovernanceLogParams) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("governance_logs").insert([{
      level,
      category,
      message,
      metadata: (metadata as any) ?? null,
      actor_id: user?.id ?? null,
    }]);
    if (error) {
      console.warn("[GovernanceLogger] insert failed:", error.message);
    }
  } catch (err) {
    console.warn("[GovernanceLogger] unexpected error:", err);
  }
}
