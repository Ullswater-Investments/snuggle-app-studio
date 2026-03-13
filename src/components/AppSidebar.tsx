import { useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useTranslation } from "react-i18next";
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
  Shield,
  Building2,
  Users,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useIsDataSpaceOwner } from "@/hooks/useIsDataSpaceOwner";
import { usePendingInvitations } from "@/hooks/usePendingInvitations";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarWorkspaceSwitcher } from "@/components/SidebarWorkspaceSwitcher";

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { t } = useTranslation("nav");
  const { activeOrg, availableOrgs, switchOrganization, loading } =
    useOrganizationContext();
  const membersMatch = useMatch("/organizations/:id");
  const [localExpandedId, setLocalExpandedId] = useState<string | null>(null);
  const { data: invitationsData } = usePendingInvitations();
  const pendingInvitationsCount =
    invitationsData?.data?.filter((i) => i.status === "pending").length ?? 0;
  const expandedOrgId = membersMatch?.params?.id ?? localExpandedId;
  const { isOwner } = useIsDataSpaceOwner();

  const isProvider =
    activeOrg?.type === "provider" || activeOrg?.type === "data_holder";

  const menuItems = [
    { title: t("dashboard"), url: "/dashboard", icon: LayoutDashboard },
    { title: t("catalog"), url: "/catalog", icon: Package },
    { title: t("requests"), url: "/requests", icon: ClipboardList },
    { title: t("data"), url: "/data", icon: Database },
    { title: t("sustainability"), url: "/sustainability", icon: Leaf },
    { title: t("services"), url: "/services", icon: Sparkles },
    { title: t("innovationLab"), url: "/innovation", icon: Lightbulb },
    { title: t("successStories"), url: "/success-stories", icon: Award },
    { title: t("opportunities"), url: "/opportunities", icon: Megaphone },
    { title: t("reports"), url: "/reports", icon: BarChart3 },
    { title: t("notifications"), url: "/notifications", icon: Bell },
    { title: t("settings"), url: "/settings", icon: Settings },
  ];

  const providerMenuItems = [
    { title: t("analytics"), url: "/analytics", icon: TrendingUp },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r" data-sidebar="nav">
      {/* Workspace Switcher at the top */}
      <SidebarHeader className="p-2 border-b border-border/50">
        <SidebarWorkspaceSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "opacity-0" : ""}>
            {t("mainNav")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem
                  key={item.url}
                  data-tour={
                    item.url === "/requests"
                      ? "requests-link"
                      : item.url === "/catalog"
                        ? "catalog-link"
                        : item.url === "/data"
                          ? "data-link"
                          : item.url === "/reports"
                            ? "reports-link"
                            : item.url === "/notifications"
                              ? "notifications-link"
                              : undefined
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
              {isProvider &&
                providerMenuItems.map((item) => (
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

        {!loading && availableOrgs.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className={!open ? "opacity-0" : ""}>
              {t("organizations")}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {availableOrgs.map((org) => (
                  <SidebarMenuItem key={org.id}>
                    <Collapsible
                      open={expandedOrgId === org.id}
                      onOpenChange={(isOpen) => {
                        setLocalExpandedId(isOpen ? org.id : null);
                      }}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full">
                          <Building2 className="h-5 w-5 shrink-0" />
                          {open && (
                            <>
                              <span className="truncate">{org.name}</span>
                              <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={
                                location.pathname ===
                                  `/organizations/${org.id}` &&
                                location.search.includes("tab=members")
                              }
                            >
                              <NavLink
                                to={`/organizations/${org.id}?tab=members`}
                                className="flex items-center gap-2"
                              >
                                <Users className="h-4 w-4" />
                                {open && <span>{t("members")}</span>}
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              isActive={
                                location.pathname ===
                                  `/organizations/${org.id}` &&
                                location.search.includes("tab=invitations")
                              }
                            >
                              <NavLink
                                to={`/organizations/${org.id}?tab=invitations`}
                                className="flex items-center gap-2"
                              >
                                <Mail className="h-4 w-4" />
                                {open && <span>{t("invitations")}</span>}
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/invitations"
                    end
                    className="flex items-center gap-3 hover:bg-muted/50 transition-colors"
                    activeClassName="bg-muted text-primary font-medium"
                  >
                    <Mail className="h-5 w-5 shrink-0" />
                    {open && (
                      <>
                        <span>{t("myInvitations")}</span>
                        {pendingInvitationsCount > 0 && (
                          <Badge
                            variant="destructive"
                            className="h-5 min-w-5 rounded-full px-1.5 justify-center text-xs ml-auto"
                          >
                            {pendingInvitationsCount}
                          </Badge>
                        )}
                      </>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupLabel className={!open ? "opacity-0" : ""}>
            {t("quickActions")}
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
                    {open && <span>{t("newRequest")}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {isOwner && (
          <SidebarGroup>
            <SidebarGroupLabel className={!open ? "opacity-0" : ""}>
              Administración
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/admin/dashboard"
                      className="flex items-center gap-3 hover:bg-destructive/10 transition-colors text-destructive"
                      activeClassName="bg-destructive/10 text-destructive font-medium"
                    >
                      <Shield className="h-5 w-5 shrink-0" />
                      {open && <span>Ir al Panel Admin</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* <SidebarGroup>
          <SidebarGroupLabel className={!open ? "opacity-0" : ""}>
            {t("partners")}
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
                    {open && <span>{t("directory")}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
    </Sidebar>
  );
}
