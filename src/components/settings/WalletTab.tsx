import { useState, useEffect, useCallback } from "react";
import {
  Wallet,
  Copy,
  Send,
  Trash2,
  RefreshCw,
  Plus,
  KeyRound,
  Loader2,
  AlertCircle,
  Banknote,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  walletService,
  type WalletData,
  type WalletBalance,
  type TokenBalance,
} from "@/services/walletService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function truncateAddress(address: string, chars = 34) {
  if (address.length <= chars) return address;
  return `${address.slice(0, chars)}...`;
}

export function WalletTab() {
  const { t } = useTranslation("settings");
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [balanceModal, setBalanceModal] = useState<{
    open: boolean;
    loading: boolean;
    data: WalletBalance | null;
  }>({ open: false, loading: false, data: null });

  const fetchBalance = useCallback(async () => {
    setLoadingBalance(true);
    try {
      const res = await walletService.getBalance();
      setBalances(res.balance.balances);
    } catch {
      /* balance stays empty */
    } finally {
      setLoadingBalance(false);
    }
  }, []);

  const fetchWallets = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await walletService.getWallets();
      setWallets(res.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallets();
    fetchBalance();
  }, [fetchWallets, fetchBalance]);

  const primaryWallet = wallets.find((w) => w.is_primary) ?? wallets[0];
  const euroeBalance = balances.find((b) => b.symbol === "EUROe");

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success(t("profile.walletTab.copied"));
  };

  const handleRefreshBalance = async () => {
    setRefreshing(true);
    await fetchBalance();
    setRefreshing(false);
  };

  const handleViewBalance = async (wallet: WalletData) => {
    setBalanceModal({ open: true, loading: true, data: null });
    try {
      const data = await walletService.getWalletBalance(wallet.uuid);
      setBalanceModal({ open: true, loading: false, data: data.balance });
    } catch {
      toast.error(t("profile.walletTab.loadError"));
      setBalanceModal({ open: false, loading: false, data: null });
    }
  };

  const handleTransfer = () => {
    toast.info(t("profile.walletTab.comingSoon"));
  };

  const handleCreateWallet = () => {
    toast.info(t("profile.walletTab.comingSoon"));
  };

  const handleImportWallet = () => {
    toast.info(t("profile.walletTab.comingSoon"));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="size-5 text-primary" />
          <CardTitle>{t("profile.walletTab.title")}</CardTitle>
        </div>
        <CardDescription>{t("profile.walletTab.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <p className="text-sm text-muted-foreground">
              {t("profile.walletTab.loadError")}
            </p>
            <Button variant="outline" size="sm" onClick={fetchWallets}>
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              {t("profile.walletTab.retry")}
            </Button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Primary Wallet Card */}
            {primaryWallet && (
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">
                    {t("profile.walletTab.primaryWallet")}
                  </h3>
                  <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white text-xs">
                    {t("profile.walletTab.primaryBadge")}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <code className="text-sm text-muted-foreground font-mono">
                    {truncateAddress(primaryWallet.address)}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleCopy(primaryWallet.address)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("profile.walletTab.balance")}
                    </p>
                    <p className="text-2xl font-bold">
                      {loadingBalance || refreshing
                        ? "..."
                        : `${euroeBalance?.amount ?? "0.0"} EUROe`}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefreshBalance}
                    disabled={refreshing}
                  >
                    <RefreshCw
                      className={`mr-2 h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
                    />
                    {t("profile.walletTab.refresh")}
                  </Button>
                </div>

                <Button variant="outline" size="sm" onClick={handleTransfer}>
                  <Send className="mr-2 h-3.5 w-3.5" />
                  {t("profile.walletTab.transfer")}
                </Button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCreateWallet}
                disabled
              >
                <Plus className="mr-2 h-4 w-4" />
                {t("profile.walletTab.createManaged")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleImportWallet}
                disabled
              >
                <KeyRound className="mr-2 h-4 w-4" />
                {t("profile.walletTab.importKeypair")}
              </Button>
            </div>

            {/* All Wallets List */}
            {wallets.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {t("profile.walletTab.allWallets")}
                </h3>
                <div className="space-y-2">
                  {wallets.map((wallet) => (
                    <div
                      key={wallet.uuid}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <code className="text-xs font-mono text-muted-foreground truncate">
                          {wallet.address}
                        </code>
                        {wallet.wallet_mode === "managed" && (
                          <Badge
                            variant="secondary"
                            className="text-xs shrink-0"
                          >
                            {t("profile.walletTab.managedBadge")}
                          </Badge>
                        )}
                        {wallet.is_primary && (
                          <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white text-xs shrink-0">
                            {t("profile.walletTab.primaryBadge")}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleCopy(wallet.address)}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("profile.walletTab.copy")}
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleViewBalance(wallet)}
                            >
                              <Banknote className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("profile.walletTab.viewBalance")}
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={handleTransfer}
                            >
                              <Send className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("profile.walletTab.transfer")}
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              disabled
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("profile.walletTab.delete")}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      {/* Balance Modal */}
      <Dialog
        open={balanceModal.open}
        onOpenChange={(open) => {
          if (!open)
            setBalanceModal({ open: false, loading: false, data: null });
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("profile.walletTab.balance")}</DialogTitle>
          </DialogHeader>

          {balanceModal.loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!balanceModal.loading && balanceModal.data && (
            <div className="space-y-6 pb-4">
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 mt-3">
                <code className="text-sm font-mono text-muted-foreground flex-1 truncate">
                  {balanceModal.data.address}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => handleCopy(balanceModal.data!.address)}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>

              <p className="text-2xl font-bold">
                {balanceModal.data.balances.find((b) => b.symbol === "EUROe")
                  ?.amount ?? "0.0"}{" "}
                EUROe
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
