import { PartnerProtectedRoute } from "@/components/partners/PartnerProtectedRoute";
import { ReactNode } from "react";

interface ItbidProtectedRouteProps {
  children: ReactNode;
}

const ItbidProtectedRoute = ({ children }: ItbidProtectedRouteProps) => {
  return (
    <PartnerProtectedRoute partnerSlug="itbid">
      {children}
    </PartnerProtectedRoute>
  );
};

export default ItbidProtectedRoute;