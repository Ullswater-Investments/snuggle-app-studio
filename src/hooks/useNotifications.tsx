import { supabase } from "@/integrations/supabase/client";

type NotificationEvent = "created" | "pre_approved" | "approved" | "denied" | "completed";

export const useNotifications = () => {
  const sendNotification = async (transactionId: string, eventType: NotificationEvent) => {
    try {
      const { data, error } = await supabase.functions.invoke("notification-handler", {
        body: {
          transactionId,
          eventType,
        },
      });

      if (error) {
        console.error("Notification error:", error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Failed to send notification:", error);
      return { success: false, error };
    }
  };

  return { sendNotification };
};
