import { AlertTriangle } from "lucide-react";
import { useGovernanceSettings } from "@/hooks/useGovernanceSettings";

export const MaintenanceBanner = () => {
  const { maintenanceMode, isLoading } = useGovernanceSettings();

  if (isLoading || !maintenanceMode) return null;

  return (
    <div className="w-full bg-destructive/10 border-b border-destructive/30 px-4 py-2.5 flex items-center justify-center gap-2 text-sm text-destructive font-medium">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>
        Sistema en mantenimiento programado. Las funciones de publicación y transacciones están temporalmente desactivadas.
      </span>
    </div>
  );
};
