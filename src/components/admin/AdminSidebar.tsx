import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Activity,
  Settings,
  ArrowLeft,
  Users,
  Shield,
  PackageCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const adminMenuItems = [
  { title: "Resumen Global", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Gestión de Organizaciones", url: "/admin/organizations", icon: Building2 },
  { title: "Gestión de Usuarios", url: "/admin/users", icon: Users },
  { title: "Validación de Activos", url: "/admin/publications", icon: PackageCheck },
  { title: "Monitorización de Transacciones", url: "/admin/transactions", icon: Activity },
  { title: "Gobernanza del Ecosistema", url: "/admin/governance", icon: Shield },
];

export function AdminSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r z-40" data-sidebar="nav">
      <SidebarHeader className="p-2 border-b border-border/50">
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
            <Settings className="h-4 w-4 text-destructive" />
          </div>
          {open && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">AGILE Admin</span>
              <span className="text-xs text-muted-foreground">Panel de Control</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "opacity-0" : ""}>
            Administración
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 hover:bg-muted/50 transition-colors"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "opacity-0" : ""}>
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3 hover:bg-muted/50 transition-colors text-muted-foreground"
                    activeClassName=""
                  >
                    <ArrowLeft className="h-5 w-5 shrink-0" />
                    {open && <span>Volver al Portal</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
