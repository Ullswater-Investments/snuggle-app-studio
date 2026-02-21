import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { toast } from "sonner";

interface OrganizationGuardProps {
  children: React.ReactNode;
}

export const OrganizationGuard = ({ children }: OrganizationGuardProps) => {
  const { activeOrgId, loading } = useOrganizationContext();

  useEffect(() => {
    if (!loading && !activeOrgId) {
      toast.warning("Para publicar o solicitar datos, primero debes registrar o unirte a una organización.");
    }
  }, [loading, activeOrgId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!activeOrgId) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
