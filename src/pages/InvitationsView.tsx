import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Mail, Loader2, User, Clock, Check, X, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePendingInvitations } from "@/hooks/usePendingInvitations";
import {
  invitationsService,
  type PendingInvitation,
} from "@/services/invitationsService";

function getInviterDisplay(inv: PendingInvitation): {
  name: string;
  email: string;
} {
  const by = inv.invitedBy;
  const profile = by?.profile;
  const name = profile
    ? [profile.first_name, profile.last_name].filter(Boolean).join(" ").trim()
    : "";
  return {
    name: name || by?.email || "",
    email: by?.email || "",
  };
}

function formatInvitationDate(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    return d.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function InvitationsView() {
  const { t } = useTranslation("nav");
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = usePendingInvitations();

  const invitations = Array.isArray(data?.data) ? data.data : [];

  const [acceptingUuid, setAcceptingUuid] = useState<string | null>(null);
  const [decliningUuid, setDecliningUuid] = useState<string | null>(null);
  const [declineConfirmUuid, setDeclineConfirmUuid] = useState<string | null>(
    null,
  );

  const handleAccept = async (inv: PendingInvitation) => {
    setAcceptingUuid(inv.uuid);
    try {
      await invitationsService.acceptInvitation(inv.uuid);
      toast.success(t("invitationAccepted"), {
        description: inv.organization?.name ?? inv.organization_uuid,
      });
      queryClient.invalidateQueries({ queryKey: ["profile-invitations"] });
      queryClient.invalidateQueries({ queryKey: ["user-organizations"] });
    } catch (err) {
      toast.error(t("invitationAcceptError"), {
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setAcceptingUuid(null);
    }
  };

  const handleReject = async (invitationUuid: string) => {
    const inv = invitations.find((i) => i.uuid === invitationUuid);
    if (!inv) return;
    setDeclineConfirmUuid(null);
    setDecliningUuid(invitationUuid);
    try {
      await invitationsService.declineInvitation(invitationUuid);
      toast.success(t("invitationDeclined"), {
        description: inv.organization?.name ?? inv.organization_uuid,
      });
      queryClient.invalidateQueries({ queryKey: ["profile-invitations"] });
    } catch (err) {
      toast.error(t("invitationDeclineError"), {
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setDecliningUuid(null);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
          <p className="text-sm font-medium text-muted-foreground">
            {t("loadingMembers")}
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
              {error instanceof Error ? error.message : t("membersLoadError")}
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

      {invitations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Mail className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium text-foreground">
              {t("noPendingInvitations")}
            </p>
            <p className="text-sm mt-1">{t("noInvitationsDescription")}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500 " />
            <span className="text-md font-medium">{t("pendingSection")}</span>
            <Badge
              variant="destructive"
              className="h-5 min-w-5 rounded-full px-1.5 justify-center text-xs"
            >
              {invitations.filter((i) => i.status === "pending").length}
            </Badge>
          </div>

          <div className="space-y-3">
            {invitations.map((inv) => {
              const { name, email: inviterEmail } = getInviterDisplay(inv);
              const orgName = inv.organization?.name ?? inv.organization_uuid;
              const roleName = inv.role?.name ?? t("roleMember");
              const isPending = inv.status === "pending";
              const statusKey =
                inv.status === "cancelled"
                  ? "statusCancelled"
                  : "statusPending";
              const inviterText = name || inviterEmail || "—";
              const inviterDisplay =
                name && inviterEmail ? `${name}, ${inviterEmail}` : inviterText;

              return (
                <Card
                  key={inv.uuid}
                  className="overflow-hidden transition-colors hover:bg-muted/30"
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/40">
                      <FileText className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="font-medium truncate">{orgName}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("invitedBy")}: {inviterDisplay}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="gap-1">
                          <User className="h-3 w-3" />
                          {roleName}
                        </Badge>
                        <Badge
                          variant={isPending ? "default" : "secondary"}
                          className={
                            isPending
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {t(statusKey)}
                        </Badge>
                        {inv.created_at && (
                          <span className="text-xs text-muted-foreground">
                            {formatInvitationDate(inv.created_at)}
                          </span>
                        )}
                      </div>
                    </div>

                    {isPending && (
                      <div className="flex shrink-0 gap-2">
                        <Button
                          size="sm"
                          className="gap-1.5"
                          onClick={() => handleAccept(inv)}
                          disabled={acceptingUuid === inv.uuid}
                        >
                          {acceptingUuid === inv.uuid ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                          {t("acceptInvitation")}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5"
                          onClick={() => setDeclineConfirmUuid(inv.uuid)}
                          disabled={decliningUuid === inv.uuid}
                        >
                          {decliningUuid === inv.uuid ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                          {t("rejectInvitation")}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <AlertDialog
        open={declineConfirmUuid !== null}
        onOpenChange={(open) => !open && setDeclineConfirmUuid(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("rejectInvitationConfirmTitle")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("rejectInvitationConfirmDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!decliningUuid}>
              {t("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                declineConfirmUuid && handleReject(declineConfirmUuid)
              }
              disabled={!!decliningUuid}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("rejectInvitationConfirmAction")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
