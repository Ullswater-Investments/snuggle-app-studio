import { Building2, ChevronDown, Plus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useSidebar } from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// getRoleLabel eliminado - ya no mostramos roles en el selector

export function SidebarWorkspaceSwitcher() {
    const navigate = useNavigate();
    const { t } = useTranslation('common');
    const { open } = useSidebar();
    const { activeOrg, availableOrgs, switchOrganization, loading } = useOrganizationContext();

    if (loading) {
        return null; // Or a skeleton loader
    }

    // Collapsed state - show only icon
    if (!open) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        {activeOrg?.logo_url ? (
                            <img
                                src={activeOrg.logo_url}
                                alt={activeOrg.name}
                                className="w-8 h-8 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Building2 className="h-4 w-4 text-primary" />
                            </div>
                        )}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="w-[280px]">
                    <DropdownMenuLabel>{t('workspace.switch', 'Cambiar espacio')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {availableOrgs.map((org) => (
                        <DropdownMenuItem
                            key={org.id}
                            onClick={() => switchOrganization(org.id)}
                            className="flex items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                <span className="font-medium">{org.name}</span>
                            </div>
                            {org.id === activeOrg?.id && (
                                <Check className="h-4 w-4 text-primary" />
                            )}
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/onboarding/create-organization')} className="cursor-pointer">
                        <Plus className="h-4 w-4 mr-2" />
                        {t('workspace.newOrg', 'Nueva Organización')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // Expanded state - full dropdown
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg",
                    "hover:bg-muted/50 transition-colors",
                    "border border-border/50 bg-card/50"
                )}>
                    {/* Logo / Icon */}
                    {activeOrg?.logo_url ? (
                        <img
                            src={activeOrg.logo_url}
                            alt={activeOrg.name}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="h-5 w-5 text-primary" />
                        </div>
                    )}

                    {/* Text - Solo nombre, sin rol */}
                    <div className="flex-1 text-left overflow-hidden">
                        <p className="text-sm font-semibold truncate">
                            {activeOrg?.name || t('workspace.selectOrg', 'Seleccionar')}
                        </p>
                    </div>

                    {/* Chevron */}
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="bottom" align="start" className="w-[--radix-dropdown-menu-trigger-width] min-w-[220px]">
                <DropdownMenuLabel>{t('workspace.switch', 'Cambiar espacio')}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {availableOrgs.map((org) => (
                    <DropdownMenuItem
                        key={org.id}
                        onClick={() => switchOrganization(org.id)}
                        className="flex items-center justify-between cursor-pointer py-2"
                    >
                        <div className="flex items-center gap-3">
                            {org.logo_url ? (
                                <img
                                    src={org.logo_url}
                                    alt={org.name}
                                    className="w-8 h-8 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                    <Building2 className="h-4 w-4" />
                                </div>
                            )}
                            <div className="flex flex-col justify-center">
                                <span className="font-medium text-sm">{org.name}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {org.is_demo && (
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700">
                                    Demo
                                </Badge>
                            )}
                            {org.id === activeOrg?.id && (
                                <Check className="h-4 w-4 text-primary" />
                            )}
                        </div>
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate('/onboarding/create-organization')} className="cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('workspace.newOrg', 'Nueva Organización')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
