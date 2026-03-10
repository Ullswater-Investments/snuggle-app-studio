import { Outlet } from "react-router-dom";
import { UnifiedHeader } from "@/components/layout/UnifiedHeader";

export const PublicAppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <UnifiedHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
