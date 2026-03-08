import { useTranslation } from "react-i18next";
import { ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AppUser } from "@/hooks/useAuth";

interface UserMenuProps {
  user: AppUser;
  onSignOut: () => void;
}

function getNameFromUser(user: AppUser): string {
  const firstName = user.profile?.first_name;
  if (typeof firstName === "string" && firstName.trim())
    return firstName.trim();
  return user.email.slice(0, 2).toUpperCase();
}

function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function UserMenu({ user, onSignOut }: UserMenuProps) {
  const { t } = useTranslation("common");

  const fullName = getNameFromUser(user);
  const displayName = fullName.split(" ")[0];
  const initials = getInitials(fullName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden sm:inline">
            {displayName}
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 shadow-lg border-border">
        <div className="px-3 py-2">
          <p className="text-sm font-medium truncate">{fullName}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer py-2" onClick={onSignOut}>
          <LogOut className="mr-2 size-4" />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
