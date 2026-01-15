import { Navigate } from "react-router-dom";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";

interface PartnerProtectedRouteProps {
  children: React.ReactNode;
  partnerSlug: string;
}

export const PartnerProtectedRoute = ({ children, partnerSlug }: PartnerProtectedRouteProps) => {
  const { isAuthenticated } = usePartnerAuth(partnerSlug);

  // Still checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Verificando acceso...</div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to={`/partners/${partnerSlug}`} replace />;
  }

  return <>{children}</>;
};

export default PartnerProtectedRoute;
