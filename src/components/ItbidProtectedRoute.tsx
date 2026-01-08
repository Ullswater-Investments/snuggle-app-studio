import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ItbidProtectedRouteProps {
  children: ReactNode;
}

const ItbidProtectedRoute = ({ children }: ItbidProtectedRouteProps) => {
  const isAuthenticated = sessionStorage.getItem("itbid_authenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/partners/itbid" replace />;
  }

  return <>{children}</>;
};

export default ItbidProtectedRoute;
