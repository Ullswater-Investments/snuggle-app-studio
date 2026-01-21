import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, ArrowUpRight, ArrowDownRight, CreditCard, ExternalLink, Coins } from "lucide-react";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatCurrency as formatCurrencyI18n } from "@/lib/i18nFormatters";

interface CategorySpend {
  category: string;
  amount: number;
  percentage: number;
}

interface EnhancedWalletCardProps {
  totalBalance: number;
  currency?: string;
  change?: number;
  categoryBreakdown: CategorySpend[];
  isLoading?: boolean;
  isProvider?: boolean;
}

const categoryColors: Record<string, string> = {
  ESG: "bg-emerald-500",
  Logística: "bg-blue-500",
  IoT: "bg-purple-500",
  Finanzas: "bg-amber-500",
  Consumo: "bg-pink-500",
  Otros: "bg-slate-400",
};

export function EnhancedWalletCard({
  totalBalance,
  currency = "EUR",
  change = 0,
  categoryBreakdown,
  isLoading,
  isProvider,
}: EnhancedWalletCardProps) {
  const { wallet, hasWeb3, connect, isConnecting } = useWeb3Wallet();
  const { t, i18n } = useTranslation('dashboard');

  const formatCurrency = (amount: number, curr: string = "EUR") => {
    return formatCurrencyI18n(amount, i18n.language, curr);
  };

  return (
    <div className="space-y-4">
      {/* Main Balance Card */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-none shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <CardContent className="p-6 relative">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
              <Wallet className="h-5 w-5 text-amber-400" />
            </div>
            <span className="text-xs font-medium bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              {isProvider ? t('wallet.monthlyIncome') : t('wallet.monthlyExpense')}
            </span>
          </div>
          
          <div className="space-y-1 mb-6">
            <p className="text-sm text-slate-300">
              {t('wallet.title')}
            </p>
            {isLoading ? (
              <Skeleton className="h-10 w-32 bg-white/20" />
            ) : (
              <h3 className="text-4xl font-bold tracking-tight">
                {formatCurrency(totalBalance, currency)}
              </h3>
            )}
          </div>
          
          {change !== 0 && (
            <div className="flex items-center gap-2 text-sm">
              {change >= 0 ? (
                <>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>+{Math.abs(change).toFixed(1)}%</span>
                  </div>
                  <span className="text-slate-400">{t('cards.vsPrevMonth')}</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1 text-red-400">
                    <ArrowDownRight className="h-4 w-4" />
                    <span>{change.toFixed(1)}%</span>
                  </div>
                  <span className="text-slate-400">{t('cards.vsPrevMonth')}</span>
                </>
              )}
            </div>
          )}

          {/* Web3 Wallet Status */}
          {wallet.isConnected && (
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">{t('wallet.euroe')}</p>
                <p className="font-semibold text-lg">
                  {wallet.euroeBalance ? parseFloat(wallet.euroeBalance).toFixed(2) : "0.00"}
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">{t('wallet.gas')} (ETH)</p>
                <p className="font-semibold text-lg">
                  {wallet.balance ? parseFloat(wallet.balance).toFixed(4) : "0.00"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      {categoryBreakdown.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('wallet.breakdown')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{cat.category}</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(cat.amount)} ({cat.percentage}%)
                  </span>
                </div>
                <Progress 
                  value={cat.percentage} 
                  className="h-2" 
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          {wallet.isConnected ? (
            <div className="grid grid-cols-2 gap-2">
              <Link to="/settings">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <CreditCard className="h-4 w-4" />
                  {t('wallet.reload')}
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2"
                onClick={() => window.open(`https://pontus-x.eu/explorer/address/${wallet.address}`, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                {t('wallet.explorer')}
              </Button>
            </div>
          ) : hasWeb3 ? (
            <Button 
              onClick={() => connect()} 
              disabled={isConnecting}
              className="w-full gap-2"
              variant="outline"
            >
              <Wallet className="h-4 w-4" />
              {isConnecting ? t('activity.loading') : t('wallet.connectWallet')}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={() => window.open("https://metamask.io/download/", "_blank")}
            >
              <Coins className="h-4 w-4" />
              {t('wallet.installMetamask')}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
