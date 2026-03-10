import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Building2, User, Copy, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { es, fr, pt, de, it, nl, enUS } from "date-fns/locale";
import type { AddressDetails } from "@/services/organizationService";
import {
  walletService,
  type WalletData,
  type WalletBalance,
} from "@/services/walletService";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const DATE_LOCALES: Record<string, typeof es> = {
  es,
  fr,
  pt,
  de,
  it,
  nl,
  en: enUS,
};

const DATE_FORMAT = "d 'de' MMMM 'de' yyyy";

function formatAddress(addr: AddressDetails | null | undefined): string {
  if (!addr || (!addr.street && !addr.city && !addr.postal_code)) return "";
  const parts = [
    addr.street,
    [addr.postal_code, addr.city].filter(Boolean).join(" "),
    addr.country_code,
  ].filter(Boolean);
  return parts.join(", ");
}

interface InfoRowProps {
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
  onCopy?: () => void;
  refreshable?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  copyTooltip?: string;
  refreshTooltip?: string;
}

const InfoRow = ({
  label,
  value,
  mono = false,
  copyable,
  onCopy,
  refreshable,
  onRefresh,
  refreshing = false,
  copyTooltip,
  refreshTooltip,
}: InfoRowProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b last:border-0">
    <span className="text-sm text-muted-foreground shrink-0 sm:w-40">
      {label}
    </span>
    <span
      className={`text-sm font-medium break-all flex-1 ${mono ? "font-mono" : ""}`}
    >
      {value || "—"}
    </span>
    <div className="flex items-center gap-0">
      {copyable && value && copyTooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={onCopy}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{copyTooltip}</TooltipContent>
        </Tooltip>
      )}
      {refreshable && onRefresh && refreshTooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={onRefresh}
              disabled={refreshing}
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{refreshTooltip}</TooltipContent>
        </Tooltip>
      )}
    </div>
  </div>
);

export function EcosystemInfoTab() {
  const { t, i18n } = useTranslation("settings");
  const { user } = useAuth();
  const { activeOrg } = useOrganizationContext();
  const dateLocale = DATE_LOCALES[i18n.language] || DATE_LOCALES.en;

  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [loadingWallets, setLoadingWallets] = useState(true);
  const [userBalance, setUserBalance] = useState<WalletBalance | null>(null);
  const [loadingUserBalance, setLoadingUserBalance] = useState(false);
  const [orgBalance, setOrgBalance] = useState<WalletBalance | null>(null);
  const [loadingOrgBalance, setLoadingOrgBalance] = useState(false);

  const fetchWallets = useCallback(async () => {
    setLoadingWallets(true);
    try {
      const res = await walletService.getWallets();
      setWallets(res.data);
    } catch {
      setWallets([]);
    } finally {
      setLoadingWallets(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchWallets();
  }, [user, fetchWallets]);

  const orgId = activeOrg?.id;
  const fetchOrgBalance = useCallback(async () => {
    if (!orgId) return;
    setLoadingOrgBalance(true);
    try {
      const res = await walletService.getOrganizationWalletBalance(orgId);
      setOrgBalance(res.balance);
    } catch {
      setOrgBalance(null);
    } finally {
      setLoadingOrgBalance(false);
    }
  }, [orgId]);

  useEffect(() => {
    if (orgId) fetchOrgBalance();
    else setOrgBalance(null);
  }, [orgId, fetchOrgBalance]);

  const primaryWallet = wallets.find((w) => w.is_primary) ?? wallets[0];
  const userWalletUuid = primaryWallet?.uuid;
  const fetchUserBalance = useCallback(async () => {
    if (!userWalletUuid) return;
    setLoadingUserBalance(true);
    try {
      const res = await walletService.getWalletBalance(userWalletUuid);
      setUserBalance(res.balance);
    } catch {
      setUserBalance(null);
    } finally {
      setLoadingUserBalance(false);
    }
  }, [userWalletUuid]);

  useEffect(() => {
    if (userWalletUuid) fetchUserBalance();
    else setUserBalance(null);
  }, [userWalletUuid, fetchUserBalance]);
  const userWalletAddr = loadingWallets
    ? ""
    : (primaryWallet?.address ?? user?.wallet_address ?? "");
  const orgAddress = activeOrg
    ? formatAddress(activeOrg.headquarters_address)
    : "";
  const orgWalletAddr =
    activeOrg?.wallet_address ?? activeOrg?.primaryWallets?.[0]?.address ?? "";

  const formatBalance = (
    balance: WalletBalance | null,
    loading: boolean,
  ): string => {
    if (loading) return "...";
    if (!balance?.balances?.length) return "...";
    const euroe = balance.balances.find((b) => b.symbol === "EUROe");
    if (euroe) {
      const amount = parseFloat(euroe.amount);
      return `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${euroe.symbol}`;
    }
    const first = balance.balances[0];
    const amount = parseFloat(first.amount);
    return `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${first.symbol}`;
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(t("profile.walletTab.copied"));
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("profile.ecosystemTab.title")}</CardTitle>
          <CardDescription>
            {t("profile.ecosystemTab.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t("profile.ecosystemTab.notSignedIn")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {/* User info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5" />
              {t("profile.ecosystemTab.userSection")}
            </CardTitle>
            <CardDescription>
              {t("profile.ecosystemTab.userSectionDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InfoRow
              label={t("profile.ecosystemTab.userId")}
              value={user.id}
              mono
            />
            <InfoRow
              label={t("profile.ecosystemTab.email")}
              value={user.email}
            />
            <InfoRow
              label={t("profile.ecosystemTab.registrationDate")}
              value={
                user.created_at
                  ? format(new Date(user.created_at), DATE_FORMAT, {
                      locale: dateLocale,
                    })
                  : ""
              }
            />
            <InfoRow
              label={t("profile.ecosystemTab.walletLabel")}
              value={loadingWallets ? "..." : userWalletAddr}
              mono
              copyable
              onCopy={() => handleCopy(userWalletAddr)}
              copyTooltip={t("profile.ecosystemTab.copyTooltip")}
            />
            <InfoRow
              label={t("profile.ecosystemTab.orgBalance")}
              value={formatBalance(userBalance, loadingUserBalance)}
              mono
              refreshable
              onRefresh={fetchUserBalance}
              refreshing={loadingUserBalance}
              refreshTooltip={t("profile.ecosystemTab.refreshTooltip")}
            />
          </CardContent>
        </Card>

        {/* Organization info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="size-5" />
              {t("profile.ecosystemTab.orgSection")}
            </CardTitle>
            <CardDescription>
              {t("profile.ecosystemTab.orgSectionDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeOrg ? (
              <>
                <InfoRow
                  label={t("profile.ecosystemTab.orgId")}
                  value={activeOrg.id}
                  mono
                />
                <InfoRow
                  label={t("profile.ecosystemTab.companyName")}
                  value={activeOrg.name}
                />
                <InfoRow
                  label={t("profile.ecosystemTab.address")}
                  value={orgAddress}
                  copyable
                  onCopy={() => handleCopy(orgAddress)}
                  copyTooltip={t("profile.ecosystemTab.copyTooltip")}
                />
                <InfoRow
                  label={t("profile.ecosystemTab.orgWallet")}
                  value={orgWalletAddr}
                  mono
                  copyable
                  onCopy={() => handleCopy(orgWalletAddr)}
                  copyTooltip={t("profile.ecosystemTab.copyTooltip")}
                />
                <InfoRow
                  label={t("profile.ecosystemTab.orgBalance")}
                  value={formatBalance(orgBalance, loadingOrgBalance)}
                  mono={!loadingWallets && !!userWalletAddr}
                  refreshable
                  onRefresh={fetchOrgBalance}
                  refreshing={loadingOrgBalance}
                  refreshTooltip={t("profile.ecosystemTab.refreshTooltip")}
                />
                <InfoRow
                  label={t("profile.ecosystemTab.cif")}
                  value={activeOrg.document}
                  mono
                />
                <InfoRow
                  label={t("profile.ecosystemTab.documentType")}
                  value={activeOrg.document_type}
                />
                <InfoRow
                  label={t("profile.ecosystemTab.registrationDate")}
                  value={
                    activeOrg.created_at
                      ? format(new Date(activeOrg.created_at), DATE_FORMAT, {
                          locale: dateLocale,
                        })
                      : ""
                  }
                />
              </>
            ) : (
              <p className="text-muted-foreground py-4">
                {t("profile.ecosystemTab.noOrgSelected")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
