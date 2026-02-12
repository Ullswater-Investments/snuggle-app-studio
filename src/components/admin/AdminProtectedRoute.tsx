import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsDataSpaceOwner } from "@/hooks/useIsDataSpaceOwner";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isOwner, isLoading: roleLoading } = useIsDataSpaceOwner();

  if (authLoading || roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Verificando permisos de administrador...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isOwner) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
