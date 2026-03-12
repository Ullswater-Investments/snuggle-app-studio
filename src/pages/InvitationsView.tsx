import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Mail, Loader2 } from "lucide-react";
import { invitationsService } from "@/services/invitationsService";
import { Card, CardContent } from "@/components/ui/card";

export default function InvitationsView() {
  const { t } = useTranslation("nav");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile-invitations"],
    queryFn: () => invitationsService.getPendingInvitations(),
  });

  const invitations = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
          <p className="text-sm font-medium text-muted-foreground">
            Cargando invitaciones...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-6">
        <Card className="border-destructive/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-sm font-medium text-destructive">
              {error instanceof Error
                ? error.message
                : "Error al cargar invitaciones"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t("myInvitations")}
        </h1>
        <p className="text-muted-foreground mt-1">{t("invitationsSubtitle")}</p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground ">
          {invitations.length === 0 ? (
            <>
              <Mail className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium text-foreground">
                {t("noPendingInvitations")}
              </p>
              <p className="text-sm mt-1">{t("noInvitationsDescription")}</p>
            </>
          ) : (
            <div className="space-y-3">
              {invitations.map((inv, index) => (
                <div
                  key={String(inv.id ?? inv.organization_id ?? index)}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <pre className="text-xs overflow-auto max-w-full">
                    {JSON.stringify(inv, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
