import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProfileGuard = () => {
  const { profileComplete } = useAuth();

  if (!profileComplete) {
    return <Navigate to="/complete-profile" replace />;
  }

  return <Outlet />;
};
