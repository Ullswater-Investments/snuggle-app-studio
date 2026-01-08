import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Database,
  BarChart3,
  Bell,
  Settings,
  Plus,
  Leaf,
  Sparkles,
  Lightbulb,
  Megaphone,
  TrendingUp,
  Award,
  Handshake,
} from "lucide-react";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Catálogo", url: "/catalog", icon: Package },
  { title: "Solicitudes", url: "/requests", icon: ClipboardList },
  { title: "Datos", url: "/data", icon: Database },
  { title: "Sostenibilidad", url: "/sustainability", icon: Leaf },
  { title: "Servicios", url: "/services", icon: Sparkles },
  { title: "Innovation Lab", url: "/innovation", icon: Lightbulb },
  { title: "Casos de Éxito", url: "/success-stories", icon: Award },
  { title: "Oportunidades", url: "/opportunities", icon: Megaphone },
  { title: "Reportes", url: "/reports", icon: BarChart3 },
  { title: "Notificaciones", url: "/notifications", icon: Bell },
  { title: "Configuración", url: "/settings", icon: Settings },
];

const providerMenuItems = [
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { activeOrg } = useOrganizationContext();
  
  const isProvider = activeOrg?.type === 'provider' || activeOrg?.type === 'data_holder';

  const isActive = (path: string) => location.pathname === path;
  const hasActiveChild = menuItems.some((i) => isActive(i.url));

  return (
    <Sidebar collapsible="icon" className="border-r" data-sidebar="nav">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "opacity-0" : ""}>
            Navegación Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem 
                  key={item.title} 
                  data-tour={
                    item.url === "/requests" ? "requests-link" : 
                    item.url === "/catalog" ? "catalog-link" : 
                    item.url === "/data" ? "data-link" :
                    item.url === "/reports" ? "reports-link" :
                    item.url === "/notifications" ? "notifications-link" :
                    undefined
                  }
                >
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
              {isProvider && providerMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
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
            Acciones Rápidas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/requests/new"
                    className="flex items-center gap-3 hover:bg-muted/50 transition-colors"
                    activeClassName="bg-muted text-primary font-medium"
                  >
                    <Plus className="h-5 w-5 shrink-0" />
                    {open && <span>Nueva Solicitud</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "opacity-0" : ""}>
            Partners
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/partners"
                    className="flex items-center gap-3 hover:bg-muted/50 transition-colors"
                    activeClassName="bg-muted text-primary font-medium"
                  >
                    <Handshake className="h-5 w-5 shrink-0" />
                    {open && <span>Directorio</span>}
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