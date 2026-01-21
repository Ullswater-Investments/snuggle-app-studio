import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, ArrowUpRight, ArrowDownRight, Clock, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { es, enUS, de, fr, pt, it, nl, Locale } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { formatCurrency as formatCurrencyI18n } from "@/lib/i18nFormatters";

interface Transaction {
  id: string;
  created_at: string;
  status: string;
  consumer_org_id: string;
  subject_org_id: string;
  asset: {
    price: number;
    currency: string;
    product?: {
      name: string;
      category: string;
    };
  } | null;
  consumer_org?: { name: string };
  subject_org?: { name: string };
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  activeOrgId: string | undefined;
  isLoading?: boolean;
  isDemo?: boolean;
}

const localeMap: Record<string, Locale> = { es, en: enUS, de, fr, pt, it, nl };

export function RecentTransactions({ transactions, activeOrgId, isLoading, isDemo }: RecentTransactionsProps) {
  const { t, i18n } = useTranslation('dashboard');
  const currentLocale = localeMap[i18n.language] || es;
  const recentTransactions = transactions.slice(0, 6);

  const formatCurrency = (amount: number, currency: string = "EUR") => {
    return formatCurrencyI18n(amount, i18n.language, currency);
  };

  const getStatusConfig = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" }> = {
      initiated: { variant: "outline" },
      pending_subject: { variant: "secondary" },
      pending_holder: { variant: "secondary" },
      approved: { variant: "default" },
      completed: { variant: "default" },
      denied_subject: { variant: "destructive" },
      denied_holder: { variant: "destructive" },
      cancelled: { variant: "outline" },
    };
    
    return {
      label: t(`transactionStatus.${status}`, status),
      variant: statusMap[status]?.variant || "outline" as const
    };
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('transactions.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recentTransactions.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {t('transactions.title')}
            {isDemo && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                <Info className="h-3 w-3 mr-1" />
                {t('activity.demo')}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Clock className="h-10 w-10 mb-3 opacity-50" />
            <p className="font-medium">{t('transactions.noTransactions')}</p>
            <p className="text-sm">{t('transactions.willAppear')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          {t('transactions.title')}
          {isDemo && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <Info className="h-3 w-3 mr-1" />
              {t('activity.demo')}
            </Badge>
          )}
        </CardTitle>
        <Link to="/requests">
          <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
            {t('transactions.viewAll')} <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('transactions.date')}</TableHead>
              <TableHead>{t('transactions.product')}</TableHead>
              <TableHead>{t('transactions.counterparty')}</TableHead>
              <TableHead>{t('transactions.type')}</TableHead>
              <TableHead>{t('transactions.status')}</TableHead>
              <TableHead className="text-right">{t('transactions.amount')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((tx) => {
              const isConsumer = tx.consumer_org_id === activeOrgId;
              const counterparty = isConsumer ? tx.subject_org?.name : tx.consumer_org?.name;
              const amount = tx.asset?.price || 0;
              const status = getStatusConfig(tx.status);
              
              return (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium text-muted-foreground">
                    {format(new Date(tx.created_at), "dd MMM", { locale: currentLocale })}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {tx.asset?.product?.name || t('transactions.defaultProduct')}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {counterparty || "—"}
                  </TableCell>
                  <TableCell>
                    {isConsumer ? (
                      <Badge variant="outline" className="gap-1 text-red-600 border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900">
                        <ArrowDownRight className="h-3 w-3" />
                        {t('transactions.buy')}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1 text-green-600 border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900">
                        <ArrowUpRight className="h-3 w-3" />
                        {t('transactions.sell')}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${isConsumer ? "text-red-600" : "text-green-600"}`}>
                    {isConsumer ? "-" : "+"}{formatCurrency(amount, tx.asset?.currency)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
