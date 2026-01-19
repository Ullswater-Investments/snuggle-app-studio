import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface AgileProcurementProtectedRouteProps {
  children: React.ReactNode;
}

interface Session {
  authenticated: boolean;
  timestamp: number;
  expires_at: number;
}

export const AgileProcurementProtectedRoute = ({ children }: AgileProcurementProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const sessionStr = localStorage.getItem("agile_procurement_session");
        
        if (!sessionStr) {
          setIsAuthenticated(false);
          return;
        }

        const session: Session = JSON.parse(sessionStr);
        
        // Check if session is expired
        if (Date.now() > session.expires_at) {
          localStorage.removeItem("agile_procurement_session");
          setIsAuthenticated(false);
          return;
        }

        // Check if authenticated flag is true
        if (!session.authenticated) {
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error checking auth:", err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

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
    return <Navigate to="/agile-procurement/login" replace />;
  }

  return <>{children}</>;
};

export default AgileProcurementProtectedRoute;
