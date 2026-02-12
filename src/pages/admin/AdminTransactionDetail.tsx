import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, Building2, FileText, Clock, CheckCircle2, XCircle, AlertTriangle, Shield,
} from "lucide-react";
import { AccessHistoryTable } from "@/components/AccessHistoryTable";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
  completed: { label: "Completada", variant: "default", icon: CheckCircle2 },
  approved: { label: "Aprobada", variant: "default", icon: CheckCircle2 },
  initiated: { label: "Iniciada", variant: "outline", icon: Clock },
  pending_subject: { label: "Pendiente Proveedor", variant: "secondary", icon: Clock },
  pending_holder: { label: "Pendiente Custodio", variant: "secondary", icon: Clock },
  denied_subject: { label: "Denegada por Proveedor", variant: "destructive", icon: XCircle },
  denied_holder: { label: "Denegada por Custodio", variant: "destructive", icon: XCircle },
  revoked: { label: "Revocada", variant: "destructive", icon: AlertTriangle },
  cancelled: { label: "Cancelada", variant: "outline", icon: XCircle },
};

const actionLabels: Record<string, string> = {
  pre_approve: "Pre-aprobó",
  approve: "Aprobó",
  deny: "Denegó",
  cancel: "Canceló / Revocó",
};

const AdminTransactionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch transaction
  const { data: tx, isLoading } = useQuery({
    queryKey: ["admin-transaction-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_transactions")
        .select(`
          *,
          data_assets(price, currency, status, data_products(name, description, category))
        `)
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch org names
  const orgIds = tx ? [tx.consumer_org_id, tx.subject_org_id, tx.holder_org_id] : [];
  const { data: orgsMap = {} } = useQuery({
    queryKey: ["admin-tx-orgs", orgIds.join(",")],
    queryFn: async () => {
      const { data } = await supabase
        .from("organizations")
        .select("id, name, type")
        .in("id", orgIds);
      const map: Record<string, { name: string; type: string }> = {};
      (data ?? []).forEach((o: any) => { map[o.id] = { name: o.name, type: o.type }; });
      return map;
    },
    enabled: orgIds.length > 0,
  });

  // Fetch approval history
  const { data: approvals = [] } = useQuery({
    queryKey: ["admin-tx-approvals", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("approval_history")
        .select("*")
        .eq("transaction_id", id!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-6">
        <p className="text-muted-foreground">Cargando transacción...</p>
      </div>
    );
  }

  if (!tx) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-6 space-y-4">
        <p className="text-muted-foreground">Transacción no encontrada</p>
        <Button variant="outline" onClick={() => navigate("/admin/transactions")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
      </div>
    );
  }

  const asset = tx.data_assets as any;
  const product = asset?.data_products;
  const cfg = statusConfig[tx.status] ?? { label: tx.status, variant: "outline" as const, icon: Clock };
  const StatusIcon = cfg.icon;

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/transactions")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product?.name ?? "Transacción"}</h1>
          <p className="text-sm text-muted-foreground font-mono">ID: {tx.id.slice(0, 12)}...</p>
        </div>
        <Badge variant={cfg.variant} className="text-sm px-3 py-1">
          <StatusIcon className="h-4 w-4 mr-1.5" />
          {cfg.label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Transaction Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" /> Detalles de la Solicitud
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoField label="Propósito" value={tx.purpose} />
                <InfoField label="Justificación" value={tx.justification} />
                <InfoField label="Duración de Acceso" value={`${tx.access_duration_days} días (política del proveedor)`} />
                <InfoField
                  label="Fecha de Solicitud"
                  value={format(new Date(tx.created_at), "dd MMM yyyy HH:mm", { locale: es })}
                />
                <InfoField
                  label="Importe"
                  value={asset?.price != null ? `${Number(asset.price).toLocaleString("es-ES")} ${asset.currency ?? "EUR"}` : "Gratis"}
                />
                <InfoField label="Estado de Pago" value={tx.payment_status ?? "N/A"} />
              </div>
              {product?.description && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Descripción del Producto</p>
                    <p className="text-sm">{product.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Approval History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" /> Historial de Aprobaciones ({approvals.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {approvals.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">Sin historial de aprobaciones</p>
              ) : (
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
                  <div className="space-y-4">
                    {approvals.map((entry: any, i: number) => {
                      const isApprove = entry.action === "approve" || entry.action === "pre_approve";
                      const isDeny = entry.action === "deny" || entry.action === "cancel";
                      const orgName = orgsMap[entry.actor_org_id]?.name ?? entry.actor_org_id?.slice(0, 8);
                      return (
                        <div key={entry.id} className="flex gap-4 pl-1">
                          <div className={`relative z-10 h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${
                            isApprove ? "bg-primary/10" : isDeny ? "bg-destructive/10" : "bg-secondary"
                          }`}>
                            {isApprove ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                            ) : isDeny ? (
                              <XCircle className="h-3.5 w-3.5 text-destructive" />
                            ) : (
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                {actionLabels[entry.action] ?? entry.action}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(entry.created_at), "dd/MM/yyyy HH:mm", { locale: es })}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Organización: {orgName}
                            </p>
                            {entry.notes && (
                              <div className="mt-2 bg-muted/50 rounded-md p-2.5">
                                <p className="text-xs italic text-muted-foreground">"{entry.notes}"</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Parties */}
        <div className="space-y-4">
          <PartyCard
            label="Consumidor"
            orgId={tx.consumer_org_id}
            org={orgsMap[tx.consumer_org_id]}
          />
          <PartyCard
            label="Proveedor (Subject)"
            orgId={tx.subject_org_id}
            org={orgsMap[tx.subject_org_id]}
          />
          <PartyCard
            label="Custodio (Holder)"
            orgId={tx.holder_org_id}
            org={orgsMap[tx.holder_org_id]}
          />
        </div>
      </div>

      {/* Access Audit History */}
      <AccessHistoryTable
        transactionId={id}
        title="Historial de Accesos y Auditoría"
        description="Registro de todos los accesos del consumidor a este activo dentro de esta transacción."
        showErrorDetails
      />
    </div>
  );
};

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-medium text-muted-foreground mb-0.5">{label}</p>
    <p className="text-sm">{value || "—"}</p>
  </div>
);

const PartyCard = ({
  label,
  orgId,
  org,
}: {
  label: string;
  orgId: string;
  org?: { name: string; type: string };
}) => {
  const typeLabel = org?.type === "consumer" ? "Consumidor" : org?.type === "data_holder" ? "Custodio" : "Proveedor";
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">{org?.name ?? "—"}</p>
            <p className="text-xs text-muted-foreground">{typeLabel}</p>
          </div>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground mt-2">{orgId}</p>
      </CardContent>
    </Card>
  );
};

export default AdminTransactionDetail;
