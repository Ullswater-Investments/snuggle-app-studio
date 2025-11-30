import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Database,
  Settings,
  Plus,
  Wallet,
  Sun,
  Moon,
  HelpCircle,
  BookOpen,
  TrendingUp,
  Lightbulb,
  BarChart3,
  Bell,
} from "lucide-react";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Escribe un comando o busca..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        
        <CommandGroup heading="Navegación">
          <CommandItem onSelect={() => runCommand(() => navigate("/dashboard"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/catalog"))}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Catálogo de Datos</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/requests"))}>
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>Solicitudes</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/data"))}>
            <Database className="mr-2 h-4 w-4" />
            <span>Mis Datos</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/sustainability"))}>
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Sostenibilidad</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/services"))}>
            <Lightbulb className="mr-2 h-4 w-4" />
            <span>Servicios</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/innovation"))}>
            <Lightbulb className="mr-2 h-4 w-4" />
            <span>Innovation Lab</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/opportunities"))}>
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Oportunidades</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/analytics"))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/reports"))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Reportes</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/notifications"))}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notificaciones</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Acciones Rápidas">
          <CommandItem onSelect={() => runCommand(() => navigate("/requests/new"))}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Crear Nueva Solicitud</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/catalog"))}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Explorar Marketplace</span>
          </CommandItem>
          <CommandItem 
            onSelect={() => runCommand(() => {
              // Trigger wallet button click
              const walletBtn = document.querySelector('[data-wallet-button]') as HTMLElement;
              if (walletBtn) walletBtn.click();
            })}
          >
            <Wallet className="mr-2 h-4 w-4" />
            <span>Ver Mi Wallet</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>Cambiar a Modo {theme === "dark" ? "Claro" : "Oscuro"}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Ayuda">
          <CommandItem onSelect={() => runCommand(() => navigate("/architecture"))}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Ver Documentación</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => window.open("mailto:soporte@procuredata.app", "_blank"))}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Contactar Soporte</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
