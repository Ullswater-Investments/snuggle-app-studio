import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Search, Package, Clock, CheckCircle2, XCircle, ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending_validation: { label: "En Validación", variant: "secondary" },
  pending: { label: "Pendiente de Revisión", variant: "secondary" },
  available: { label: "Pendiente", variant: "secondary" },
  active: { label: "Publicado", variant: "default" },
  published: { label: "Publicado", variant: "default" },
  rejected: { label: "Rechazado", variant: "destructive" },
  draft: { label: "Borrador", variant: "outline" },
};

const AdminPublications = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["admin-all-assets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_assets")
        .select(`
          id, status, price, currency, pricing_model, created_at, published_at, custom_metadata, is_public_marketplace,
          subject_org_id, holder_org_id, product_id,
          data_products(name, description, category, schema_definition)
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: orgsMap = {} } = useQuery({
    queryKey: ["admin-orgs-map-pub"],
    queryFn: async () => {
      const { data } = await supabase.from("organizations").select("id, name");
      const map: Record<string, string> = {};
      (data ?? []).forEach((o: any) => { map[o.id] = o.name; });
      return map;
    },
  });

  const uniqueOrgs = useMemo(() => {
    const ids = new Set<string>();
    assets.forEach((a: any) => { ids.add(a.subject_org_id); });
    return Array.from(ids)
      .map(id => ({ id, name: orgsMap[id] || id.slice(0, 8) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [assets, orgsMap]);

  const filtered = useMemo(() => {
    return assets.filter((a: any) => {
      if (statusFilter !== "all") {
        const normalizedStatus = a.status === "active" ? "active" : a.status;
        if (normalizedStatus !== statusFilter) return false;
      }
      if (orgFilter !== "all" && a.subject_org_id !== orgFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        const name = ((a.data_products as any)?.name ?? "").toLowerCase();
        const orgName = (orgsMap[a.subject_org_id] ?? "").toLowerCase();
        if (!name.includes(s) && !orgName.includes(s)) return false;
      }
      return true;
    });
  }, [assets, statusFilter, orgFilter, search, orgsMap]);

  const pendingCount = assets.filter((a: any) => ["available", "pending_validation", "pending"].includes(a.status)).length;
  const publishedCount = assets.filter((a: any) => ["active", "published"].includes(a.status)).length;
  const rejectedCount = assets.filter((a: any) => a.status === "rejected").length;

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Validación de Activos</h1>
        <p className="text-muted-foreground">
          {assets.length} activos en el espacio de datos
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendientes de Validación</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Publicados en Pontus-X</p>
                <p className="text-2xl font-bold">{publishedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rechazados</p>
                <p className="text-2xl font-bold">{rejectedCount}</p>
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
            placeholder="Buscar por nombre de activo o proveedor..."
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
            <SelectItem value="pending_validation">En Validación</SelectItem>
            <SelectItem value="pending">Pendiente de Revisión</SelectItem>
            <SelectItem value="available">Pendiente</SelectItem>
            <SelectItem value="active">Publicado</SelectItem>
            <SelectItem value="rejected">Rechazado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={orgFilter} onValueChange={setOrgFilter}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Proveedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los proveedores</SelectItem>
            {uniqueOrgs.map((o) => (
              <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activo</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Fecha Solicitud</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Cargando activos...
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No se encontraron activos
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((asset: any) => {
                  const product = asset.data_products as any;
                  const cfg = statusConfig[asset.status] ?? { label: asset.status, variant: "outline" as const };
                  return (
                    <TableRow
                      key={asset.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/admin/publications/${asset.id}`)}
                    >
                      <TableCell className="font-medium text-sm max-w-[250px] truncate">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground shrink-0" />
                          {product?.name ?? "—"}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {orgsMap[asset.subject_org_id] ?? "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {product?.category ?? "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(new Date(asset.created_at), "dd MMM yyyy", { locale: es })}
                      </TableCell>
                      <TableCell className="text-right text-sm font-mono">
                        {asset.price != null && asset.price > 0
                          ? `${Number(asset.price).toLocaleString("es-ES")} €`
                          : "Gratis"}
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

export default AdminPublications;
