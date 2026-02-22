import { Rocket } from "lucide-react";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const DemoBanner = () => {
  const { isDemo } = useOrganizationContext();

  if (!isDemo) return null;

  return (
    <Alert className="rounded-none border-x-0 border-t-0 bg-amber-50 dark:bg-amber-950/20 border-amber-500 demo-banner">
      <Rocket className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="text-amber-900 dark:text-amber-100 font-medium">
        🚀 Estás en Modo Demostración. Algunas funciones de registro y publicación están limitadas.
      </AlertDescription>
    </Alert>
  );
};
