import { Building2, ChevronDown } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

export const OrganizationSwitcher = () => {
  const { activeOrg, availableOrgs, switchOrganization, loading } =
    useOrganizationContext();

  if (loading || availableOrgs.length === 0) {
    return null;
  }

  if (availableOrgs.length === 1) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <span className="hidden lg:inline text-sm font-medium">
          {activeOrg?.name}
        </span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 min-w-0">
          <Building2 className="h-4 w-4" />
          <span className="hidden lg:inline text-sm font-medium truncate max-w-[150px]">
            {activeOrg?.name || "Seleccionar organización"}
          </span>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px]">
        <DropdownMenuLabel>Cambiar organización</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableOrgs.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => switchOrganization(org.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{org.name}</span>
            </div>
            {org.id === activeOrg?.id && (
              <Badge variant="secondary" className="text-xs">
                Activa
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
