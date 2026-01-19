import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AgileProcurementPrivateArea = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("agile_procurement_session");
    toast.success("Sesión cerrada");
    navigate("/agile-procurement/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header con botón de cerrar sesión */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Agile Procurement Private Area</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </div>

      {/* Contenido - página en blanco */}
      <div className="container mx-auto px-4 py-8">
        {/* Contenido por definir */}
      </div>
    </div>
  );
};

export default AgileProcurementPrivateArea;
