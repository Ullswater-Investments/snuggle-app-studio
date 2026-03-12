import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Mail, UserPlus, Search, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import {
  organizationService,
  type InvitationSearchUser,
} from "@/services/organizationService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEBOUNCE_MS = 500;

const ROLES = [
  { value: "admin", labelKey: "roleAdmin" },
  { value: "member", labelKey: "roleMember" },
] as const;

export default function OrganizationInvitationsTab() {
  const { id: orgId } = useParams<{ id: string }>();
  const { t } = useTranslation("nav");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<InvitationSearchUser[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("member");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const isValidEmail = EMAIL_REGEX.test(email.trim());

  const performSearch = useCallback(async () => {
    if (!orgId || !email.trim() || !isValidEmail) return;
    setIsSearching(true);
    setSearchError(null);
    try {
      const res = await organizationService.searchUserForInvitation(
        orgId,
        email.trim(),
      );
      if (res.data) {
        const alreadyAdded = selectedUsers.some(
          (u) => u.uuid === res.data!.uuid || u.email === res.data!.email
        );
        if (alreadyAdded) {
          setSearchError(t("userAlreadyAdded"));
        } else {
          setSelectedUsers((prev) => [...prev, res.data!]);
          setEmail("");
          setSearchError(null);
        }
      } else {
        setSearchError(res.message ?? t("userNotFound"));
      }
    } catch {
      setSearchError(t("userNotFound"));
    } finally {
      setIsSearching(false);
    }
  }, [orgId, email, isValidEmail, t, selectedUsers]);

  useEffect(() => {
    if (!isValidEmail) {
      setSearchError(null);
      return;
    }
    const timer = setTimeout(performSearch, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [email, isValidEmail, performSearch]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setEmail("");
      setSelectedUsers([]);
      setSearchError(null);
      setSelectedRole("member");
      setMessage("");
    }
  };

  const handleRemoveUser = (userUuid: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u.uuid !== userUuid));
    setSearchError(null);
  };

  const handleSendInvitations = async () => {
    if (!orgId || selectedUsers.length === 0) return;
    setIsSending(true);
    const msg = message.trim() || undefined;
    const roleSlug = selectedRole;
    let successCount = 0;
    let lastError: string | null = null;
    for (const user of selectedUsers) {
      try {
        await organizationService.createInvitation(orgId, {
          invited_user_uuid: user.uuid,
          role_slug: roleSlug,
          message: msg,
        });
        successCount += 1;
      } catch (err) {
        lastError =
          err instanceof Error ? err.message : t("invitationSendError");
        toast.error(t("invitationSendError"), {
          description: lastError,
        });
        break;
      }
    }
    setIsSending(false);
    if (successCount > 0) {
      const key =
        successCount === 1 ? "invitationSent" : "invitationsSent";
      toast.success(t(key), {
        description:
          successCount === 1
            ? undefined
            : t("invitationsSentDescription", { count: successCount }),
      });
      handleOpenChange(false);
    }
  };

  const canSend = selectedUsers.length > 0 && !isSending;
  const hasSearched = isValidEmail && !isSearching;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl">{t("invitations")}</CardTitle>
          </div>
          <CardDescription>{t("manageInvitations")}</CardDescription>
        </div>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              {t("inviteMember")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg w-[calc(100vw-2rem)] max-w-[min(32rem,calc(100vw-2rem))]">
            <DialogHeader>
              <DialogTitle>{t("inviteUser")}</DialogTitle>
              <DialogDescription>
                {t("inviteUserDescription")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex gap-2 items-center min-w-0">
                <Input
                  id="invite-email"
                  type="email"
                  placeholder={t("inviteEmailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={performSearch}
                  disabled={!isValidEmail || isSearching}
                  className="shrink-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {isSearching && (
                <p className="text-sm text-muted-foreground">
                  {t("searchingUser")}
                </p>
              )}

              {searchError && hasSearched && !isSearching && (
                <p className="text-sm text-destructive">{searchError}</p>
              )}

              {selectedUsers.length > 0 && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    {selectedUsers.map((user) => (
                      <div
                        key={user.uuid}
                        className="flex items-center justify-between gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 text-emerald-800 dark:text-emerald-200 min-w-0"
                      >
                        <span className="text-sm truncate min-w-0 flex-1">
                          {user.name ? `${user.name} • ` : ""}{user.email}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveUser(user.uuid)}
                          className="shrink-0 rounded-full p-1 hover:bg-emerald-200/50 dark:hover:bg-emerald-800/50"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("role")}</Label>
                    <Select
                      value={selectedRole}
                      onValueChange={setSelectedRole}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectRole")} />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {t(r.labelKey)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>{t("messageOptional")}</Label>
                    <Textarea
                      placeholder={t("inviteMessagePlaceholder")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                {t("cancel")}
              </Button>
              <Button
                disabled={!canSend}
                onClick={handleSendInvitations}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("sendingInvitations")}
                  </>
                ) : selectedUsers.length === 1 ? (
                  t("sendInvitation")
                ) : (
                  t("sendInvitations")
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <Mail className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-sm font-medium">{t("noInvitations")}</p>
        </div>
      </CardContent>
    </Card>
  );
}
