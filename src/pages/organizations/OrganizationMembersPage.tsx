import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Building2, Users, Mail, ArrowLeft } from "lucide-react";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrganizationMembersTab from "./OrganizationMembersTab";
import OrganizationInvitationsTab from "./OrganizationInvitationsTab";
import { useTranslation } from "react-i18next";

export default function OrganizationMembersPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeOrg, switchOrganization } = useOrganizationContext();
  const { t } = useTranslation("nav");
  const tab = searchParams.get("tab") || "members";
  const validTab = tab === "invitations" ? "invitations" : "members";

  useEffect(() => {
    if (id && id !== activeOrg?.id) {
      switchOrganization(id);
    }
  }, [id, switchOrganization, activeOrg?.id]);

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="container py-6 space-y-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al listado
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {activeOrg?.name || "Organización"}
          </h1>
        </div>
      </div>

      <Tabs value={validTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t("members")}
          </TabsTrigger>
          <TabsTrigger value="invitations" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {t("invitations")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <OrganizationMembersTab />
        </TabsContent>

        <TabsContent value="invitations" className="mt-6">
          <OrganizationInvitationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
