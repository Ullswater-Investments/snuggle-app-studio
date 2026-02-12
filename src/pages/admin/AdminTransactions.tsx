import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Search, TrendingUp, Clock, AlertTriangle, ArrowRight,
} from "lucide-react";
import { format, subDays, isAfter, isBefore, startOfDay, endOfDay } from "date-fns";
import { es } from "date-fns/locale";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  completed: { label: "Completada", variant: "default" },
  approved: { label: "Aprobada", variant: "default" },
  initiated: { label: "Iniciada", variant: "outline" },
  pending_subject: { label: "Pend. Proveedor", variant: "secondary" },
  pending_holder: { label: "Pend. Custodio", variant: "secondary" },
  denied_subject: { label: "Denegada (Prov.)", variant: "destructive" },
  denied_holder: { label: "Denegada (Cust.)", variant: "destructive" },
  revoked: { label: "Revocada", variant: "destructive" },
  cancelled: { label: "Cancelada", variant: "outline" },
};

const AdminTransactions = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  // Fetch all transactions with joined names
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["admin-all-transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          id, status, purpose, created_at, payment_status,
          consumer_org_id, subject_org_id, holder_org_id,
          asset_id,
          data_assets!inner(price, currency, data_products(name))
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  // Fetch all org names for display
  const { data: orgsMap = {} } = useQuery({
    queryKey: ["admin-orgs-map"],
    queryFn: async () => {
      const { data } = await supabase.from("organizations").select("id, name");
      const map: Record<string, string> = {};
      (data ?? []).forEach((o: any) => { map[o.id] = o.name; });
      return map;
    },
  });

  // Unique orgs for filter dropdown
  const uniqueOrgs = useMemo(() => {
    const ids = new Set<string>();
    transactions.forEach((t: any) => {
      ids.add(t.consumer_org_id);
      ids.add(t.subject_org_id);
    });
    return Array.from(ids).map(id => ({ id, name: orgsMap[id] || id.slice(0, 8) })).sort((a, b) => a.name.localeCompare(b.name));
  }, [transactions, orgsMap]);

  // Filter logic
  const filtered = useMemo(() => {
    const now = new Date();
    return transactions.filter((t: any) => {
      // Status
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      // Org
      if (orgFilter !== "all" && t.consumer_org_id !== orgFilter && t.subject_org_id !== orgFilter && t.holder_org_id !== orgFilter) return false;
      // Date range
      if (dateRange !== "all") {
        const txDate = new Date(t.created_at);
        const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
        if (isBefore(txDate, startOfDay(subDays(now, days)))) return false;
      }
      // Search
      if (search) {
        const s = search.toLowerCase();
        const assetName = ((t.data_assets as any)?.data_products?.name ?? "").toLowerCase();
        const consumerName = (orgsMap[t.consumer_org_id] ?? "").toLowerCase();
        const subjectName = (orgsMap[t.subject_org_id] ?? "").toLowerCase();
        if (!assetName.includes(s) && !consumerName.includes(s) && !subjectName.includes(s) && !t.purpose.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [transactions, statusFilter, orgFilter, dateRange, search, orgsMap]);

  // Summary cards
  const totalVolume = useMemo(() => {
    return transactions
      .filter((t: any) => t.status === "completed")
      .reduce((sum: number, t: any) => sum + ((t.data_assets as any)?.price ?? 0), 0);
  }, [transactions]);

  const activeRequests = useMemo(() => {
    return transactions.filter((t: any) =>
      ["initiated", "pending_subject", "pending_holder"].includes(t.status)
    ).length;
  }, [transactions]);

  const revokedCount = useMemo(() => {
    return transactions.filter((t: any) => t.status === "revoked").length;
  }, [transactions]);

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Monitorización de Transacciones</h1>
        <p className="text-muted-foreground">
          {transactions.length} transacciones en el espacio de datos
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Volumen Total</p>
                <p className="text-2xl font-bold">{totalVolume.toLocaleString("es-ES")} €</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Solicitudes Activas</p>
                <p className="text-2xl font-bold">{activeRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alertas de Revocación</p>
                <p className="text-2xl font-bold">{revokedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por activo, organización o propósito..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            {Object.entries(statusConfig).map(([key, cfg]) => (
              <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={orgFilter} onValueChange={setOrgFilter}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Organización" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las organizaciones</SelectItem>
            {uniqueOrgs.map((o) => (
              <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todo el periodo</SelectItem>
            <SelectItem value="7d">Última semana</SelectItem>
            <SelectItem value="30d">Último mes</SelectItem>
            <SelectItem value="90d">Últimos 3 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Activo</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Consumidor</TableHead>
                <TableHead className="text-right">Importe</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Cargando transacciones...
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No se encontraron transacciones
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((tx: any) => {
                  const asset = tx.data_assets as any;
                  const cfg = statusConfig[tx.status] ?? { label: tx.status, variant: "outline" as const };
                  return (
                    <TableRow
                      key={tx.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/admin/transactions/${tx.id}`)}
                    >
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(new Date(tx.created_at), "dd MMM yyyy", { locale: es })}
                      </TableCell>
                      <TableCell className="font-medium text-sm max-w-[200px] truncate">
                        {asset?.data_products?.name ?? "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {orgsMap[tx.subject_org_id] ?? "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {orgsMap[tx.consumer_org_id] ?? "—"}
                      </TableCell>
                      <TableCell className="text-right text-sm font-mono">
                        {asset?.price != null ? `${Number(asset.price).toLocaleString("es-ES")} €` : "Gratis"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={cfg.variant} className="text-xs whitespace-nowrap">
                          {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTransactions;
