import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface UserPreferences {
  profile_visible: boolean;
  show_access_history: boolean;
  access_alerts: boolean;
  anonymous_research: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  profile_visible: true,
  show_access_history: true,
  access_alerts: true,
  anonymous_research: false,
};

export const usePrivacyPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  // Load preferences on mount
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const loadPreferences = async () => {
      try {
        const { data, error } = await supabase
          .from("privacy_preferences")
          .select("profile_visible, show_access_history, access_alerts, anonymous_research")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error loading preferences:", error);
          return;
        }

        if (data) {
          setPreferences({
            profile_visible: data.profile_visible ?? true,
            show_access_history: data.show_access_history ?? true,
            access_alerts: data.access_alerts ?? true,
            anonymous_research: data.anonymous_research ?? false,
          });
        }
      } catch (err) {
        console.error("Failed to load preferences:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [user?.id]);

  // Update a single preference with optimistic UI
  const updatePreference = useCallback(
    async (key: keyof UserPreferences, value: boolean) => {
      if (!user?.id) {
        toast.error("Debes iniciar sesión para guardar preferencias");
        return;
      }

      const previousValue = preferences[key];

      // Optimistic update
      setPreferences((prev) => ({ ...prev, [key]: value }));

      try {
        const { error } = await supabase.from("privacy_preferences").upsert(
          {
            user_id: user.id,
            [key]: value,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          }
        );

        if (error) {
          // Rollback on error
          setPreferences((prev) => ({ ...prev, [key]: previousValue }));
          toast.error("Error al guardar configuración");
          console.error("Preference update error:", error);
          return;
        }

        toast.success("Configuración actualizada");
      } catch (err) {
        // Rollback on error
        setPreferences((prev) => ({ ...prev, [key]: previousValue }));
        toast.error("Error al guardar configuración");
        console.error("Failed to update preference:", err);
      }
    },
    [user?.id, preferences]
  );

  return {
    preferences,
    loading,
    updatePreference,
  };
};
