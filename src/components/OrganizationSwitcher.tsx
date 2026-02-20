import { Building2, ChevronDown, Info, Shield, ShieldCheck } from "lucide-react";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useUserRoleLabel, getRoleLabelText } from "@/hooks/useUserRoleLabel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const OrganizationSwitcher = () => {
  const { activeOrg, availableOrgs, switchOrganization, loading } = useOrganizationContext();
  const { roleLabel, isLoading: roleLoading } = useUserRoleLabel(activeOrg?.id);

  if (loading || availableOrgs.length === 0) {
    return null;
  }

  const displayRole = getRoleLabelText(roleLabel, activeOrg?.type);
  const isDSO = roleLabel === "data_space_owner";
  const isOperator = roleLabel === "data_space_operator";

  const RoleIcon = isDSO ? ShieldCheck : isOperator ? Shield : null;

  // Solo mostrar si hay múltiples organizaciones
  if (availableOrgs.length === 1) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{activeOrg?.name}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            {RoleIcon && <RoleIcon className="h-3 w-3" />}
            {roleLoading ? "..." : displayRole}
          </span>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 min-w-[200px]">
          <Building2 className="h-4 w-4" />
          <div className="flex flex-col items-start flex-1">
            <span className="text-sm font-medium truncate max-w-[150px]">
              {activeOrg?.name || "Seleccionar organización"}
            </span>
            {activeOrg && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {RoleIcon && <RoleIcon className="h-3 w-3" />}
                {roleLoading ? "..." : displayRole}
              </span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px]">
        <DropdownMenuLabel>Cambiar organización</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {['consumer', 'data_holder', 'provider'].map(type => {
          const orgsOfType = availableOrgs.filter(org => org.type === type);
          if (orgsOfType.length === 0) return null;

          return (
            <div key={type}>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                {getRoleLabelText("unknown", type)}
              </DropdownMenuLabel>
              {orgsOfType.map(org => (
                <DropdownMenuItem
                  key={org.id}
                  onClick={() => switchOrganization(org.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{org.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {org.id === activeOrg?.id && (
                      <Badge variant="secondary" className="text-xs">Activa</Badge>
                    )}
                    {org.is_demo && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger onClick={(e) => e.stopPropagation()}>
                            <Badge variant="outline" className="text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700">
                              <Info className="h-3 w-3 mr-1" />
                              Demo
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">
                              Organización sintética para demostración. No representa una entidad real.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
