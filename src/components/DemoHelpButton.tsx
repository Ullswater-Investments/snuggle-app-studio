import { useState } from "react";
import { HelpCircle, Play } from "lucide-react";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const DemoHelpButton = () => {
  const { isDemo } = useOrganizationContext();

  const restartTour = () => {
    // Eliminar la marca de tour completado
    localStorage.removeItem('demo-tour-completed');
    // Recargar la página para que el tour se ejecute
    window.location.reload();
  };

  if (!isDemo) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Ayuda Demo</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px]">
        <DropdownMenuLabel>Ayuda del Modo Demo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={restartTour} className="cursor-pointer">
          <Play className="mr-2 h-4 w-4" />
          <div>
            <p className="font-medium">Reiniciar Tour Guiado</p>
            <p className="text-xs text-muted-foreground">Ver de nuevo el tutorial interactivo</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="px-2 py-2 text-xs text-muted-foreground">
          <p className="font-semibold mb-2">Escenarios Rápidos:</p>
          <ul className="space-y-2">
            <li>
              <strong>📋 Aprobar Solicitud:</strong>
              <br />
              Tornillería → Solicitudes → Aprobar
            </li>
            <li>
              <strong>✅ Ver Datos:</strong>
              <br />
              Energías Renovables → Visualización
            </li>
            <li>
              <strong>📝 Nueva Solicitud:</strong>
              <br />
              NovaTech → Catálogo → Solicitar
            </li>
          </ul>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
