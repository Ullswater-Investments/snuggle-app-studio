import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Users, User, Search, Star, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import {
  organizationService,
  type OrganizationMember,
} from "@/services/organizationService";

function getMemberDisplayName(member: OrganizationMember): string {
  const profile = member.user?.profile;
  if (profile) {
    const parts = [profile.first_name, profile.last_name].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : member.user.email;
  }
  return member.user?.email ?? "—";
}

export default function OrganizationMembersTab() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("nav");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["organization-members", id],
    queryFn: () => organizationService.getMembers(id!),
    enabled: !!id,
  });

  const { members, filteredMembers } = useMemo(() => {
    const list = Array.isArray(data?.data) ? data.data : [];
    if (!searchQuery.trim()) return { members: list, filteredMembers: list };
    const q = searchQuery.toLowerCase().trim();
    const filtered = list.filter((m) => {
      const name = getMemberDisplayName(m).toLowerCase();
      const email = (m.user?.email ?? "").toLowerCase();
      const role = (m.role?.name ?? "").toLowerCase();
      return name.includes(q) || email.includes(q) || role.includes(q);
    });
    return { members: list, filteredMembers: filtered };
  }, [data?.data, searchQuery]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            {t("loadingMembers")}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          <p className="text-sm">{t("membersLoadError")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl">{t("members")}</CardTitle>
            <Badge variant="secondary" className="rounded-full">
              {filteredMembers.length}
            </Badge>
          </div>
          <CardDescription>{t("manageMembers")}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchMembersPlaceholder")}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground rounded-lg border border-dashed p-6">
              <Users className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-sm font-medium">{t("noMembersFound")}</p>
            </div>
          ) : (
            filteredMembers.map((member) => (
              <div
                key={member.uuid}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {getMemberDisplayName(member)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.user?.email ?? "—"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="gap-1 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-500"
                >
                  <Star className="h-3.5 w-3.5" />
                  {member.role?.name ?? "—"}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
