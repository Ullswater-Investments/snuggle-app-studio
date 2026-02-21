import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { logGovernanceEvent } from "@/utils/governanceLogger";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeft, Building2, FileText, Tag, Globe, Lock, Copy, Check,
  CheckCircle2, XCircle, Clock, DollarSign, Shield, Database, Key,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
  pending_validation: { label: "Pendiente de Validación", variant: "secondary", icon: Clock },
  available: { label: "Pendiente de Validación", variant: "secondary", icon: Clock },
  active: { label: "Publicado en Pontus-X", variant: "default", icon: CheckCircle2 },
  published: { label: "Publicado en Pontus-X", variant: "default", icon: CheckCircle2 },
  rejected: { label: "Rechazado", variant: "destructive", icon: XCircle },
  draft: { label: "Borrador", variant: "outline", icon: Clock },
};

const AdminPublicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rejectionNote, setRejectionNote] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  const { data: asset, isLoading } = useQuery({
    queryKey: ["admin-asset-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("data_assets")
        .select(`
          *,
          data_products(name, description, category, schema_definition, version)
        `)
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: catalogMeta } = useQuery({
    queryKey: ["admin-catalog-meta", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("catalog_metadata")
        .select("*")
        .eq("asset_id", id!)
        .maybeSingle();
      return data;
    },
    enabled: !!id,
  });

  const { data: orgName } = useQuery({
    queryKey: ["admin-pub-org", asset?.subject_org_id],
    queryFn: async () => {
      const { data } = await supabase
        .from("organizations")
        .select("name, type, sector")
        .eq("id", asset!.subject_org_id)
        .single();
      return data;
    },
    enabled: !!asset?.subject_org_id,
  });

  const publishMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("data_assets")
        .update({ status: "active", published_at: new Date().toISOString(), admin_notes: null })
        .eq("id", id!);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Activo marcado como publicado en Pontus-X");
      logGovernanceEvent({
        level: "info",
        category: "publications",
        message: `INFO: Dataset ${id} verificado y publicado por el administrador`,
        metadata: { asset_id: id },
      });
      queryClient.invalidateQueries({ queryKey: ["admin-asset-detail", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-all-assets"] });
      navigate("/admin/publications");
    },
    onError: () => toast.error("Error al publicar el activo"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (notes: string) => {
      const { error } = await supabase
        .from("data_assets")
        .update({ status: "rejected", admin_notes: notes })
        .eq("id", id!);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Activo rechazado. El proveedor será notificado.");
      logGovernanceEvent({
        level: "warn",
        category: "publications",
        message: `WARN: Dataset ${id} rechazado. Motivo: ${rejectionNote}`,
        metadata: { asset_id: id, rejection_note: rejectionNote },
      });
      setShowRejectForm(false);
      setRejectionNote("");
      queryClient.invalidateQueries({ queryKey: ["admin-asset-detail", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-all-assets"] });
      navigate("/admin/publications");
    },
    onError: () => toast.error("Error al rechazar el activo"),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-6">
        <p className="text-muted-foreground">Cargando activo...</p>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-6 space-y-4">
        <p className="text-muted-foreground">Activo no encontrado</p>
        <Button variant="outline" onClick={() => navigate("/admin/publications")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
      </div>
    );
  }

  const product = asset.data_products as any;
  const customMeta = asset.custom_metadata as any;
  const cfg = statusConfig[asset.status] ?? { label: asset.status, variant: "outline" as const, icon: Clock };
  const StatusIcon = cfg.icon;
  const isPending = asset.status === "available" || asset.status === "pending_validation" || asset.status === "pending";

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/publications")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product?.name ?? "Activo"}</h1>
          <p className="text-sm text-muted-foreground font-mono">ID: {asset.id.slice(0, 12)}...</p>
        </div>
        <Badge variant={cfg.variant} className="text-sm px-3 py-1">
          <StatusIcon className="h-4 w-4 mr-1.5" />
          {cfg.label}
        </Badge>
      </div>

      {/* Validation Actions Sidebar Card */}
      {isPending && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" /> Acciones de Validación
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-sm text-muted-foreground mb-4">
              Valida este activo antes de publicarlo en la red Pontus-X.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => publishMutation.mutate()}
                disabled={publishMutation.isPending}
              >
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                Aprobar y Publicar en Pontus-X
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => setShowRejectForm(true)}
              >
                <XCircle className="h-4 w-4 mr-1.5" />
                Rechazar Publicación
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reject Modal Dialog */}
      <Dialog open={showRejectForm} onOpenChange={setShowRejectForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar Publicación</DialogTitle>
            <DialogDescription>
              Introduce el motivo del rechazo. Este será visible para el proveedor del dataset.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Motivo del rechazo o cambios solicitados al proveedor..."
            value={rejectionNote}
            onChange={(e) => setRejectionNote(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowRejectForm(false); setRejectionNote(""); }}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              disabled={!rejectionNote.trim() || rejectMutation.isPending}
              onClick={() => rejectMutation.mutate(rejectionNote.trim())}
            >
              Confirmar Rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Notes (if rejected) */}
      {(asset as any).admin_notes && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-destructive mb-1">Motivo del Rechazo:</p>
            <p className="text-sm">{(asset as any).admin_notes}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Asset Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metadata Block */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" /> Metadatos del Activo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CopyField label="Título" value={product?.name} />
              <CopyField label="Descripción" value={product?.description} />
              <div className="grid grid-cols-2 gap-4">
                <CopyField label="Categoría" value={product?.category} />
                <CopyField label="Versión" value={product?.version} />
              </div>
              {catalogMeta?.tags && catalogMeta.tags.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Etiquetas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {catalogMeta.tags.map((tag: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Technical Access Block */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Database className="h-4 w-4" /> Acceso Técnico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CopyField label="URL de la API / Fuente de Datos" value={customMeta?.api_url || customMeta?.endpoint_url || customMeta?.source_url || "No configurada"} />
              
              {/* Custom Headers */}
              {customMeta?.headers && Object.keys(customMeta.headers).length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Custom Headers</p>
                  <div className="space-y-2 bg-muted/30 rounded-lg p-3">
                    {Object.entries(customMeta.headers).map(([key, value]: [string, any]) => (
                      <CopyField key={key} label={key} value={String(value)} mono />
                    ))}
                  </div>
                </div>
              )}

              {/* Schema Definition */}
              {product?.schema_definition && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Esquema Técnico</p>
                  <div className="bg-muted/30 rounded-lg p-3 max-h-[300px] overflow-auto">
                    <CopyField label="Schema JSON" value={JSON.stringify(product.schema_definition, null, 2)} mono />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Governance Block */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" /> Gobernanza y Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <CopyField label="Modelo de Pricing" value={asset.pricing_model ?? "Gratuito"} />
                <CopyField label="Precio" value={asset.price != null && asset.price > 0 ? `${asset.price} ${asset.currency ?? "EUR"}` : "Gratis"} />
                <CopyField label="Periodo de Facturación" value={asset.billing_period ?? "N/A"} />
                <CopyField label="Marketplace Público" value={asset.is_public_marketplace ? "Sí" : "No"} />
              </div>

              {/* Access Policy from custom_metadata */}
              {customMeta?.access_policy && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Políticas de Uso</p>
                  <div className="bg-muted/30 rounded-lg p-3 max-h-[200px] overflow-auto">
                    <CopyField label="Certificación de Gobernanza" value={JSON.stringify(customMeta.access_policy, null, 2)} mono />
                  </div>

                  {/* Access Control — Pontus-X */}
                  <div className="mt-3 space-y-4">
                    {/* Determine effective mode */}
                    {(() => {
                      const allowed = customMeta.access_policy.allowed_wallets || customMeta.access_policy.access_list || [];
                      const denied = customMeta.access_policy.denied_wallets || [];
                      const mode = allowed.length > 0 ? "PRIVADO (Whitelist activa)" : denied.length > 0 ? "PÚBLICO con Blacklist" : "PÚBLICO Total";
                      return <CopyField label="Modo de Control de Acceso" value={mode} />;
                    })()}

                    {/* Allowed Wallets */}
                    {(() => {
                      const allowed = customMeta.access_policy.allowed_wallets || customMeta.access_policy.access_list || [];
                      if (allowed.length === 0) return null;
                      return (
                        <div>
                          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Organizaciones Permitidas ({allowed.length})
                          </p>
                          <div className="space-y-1">
                            {allowed.map((org: any, i: number) => (
                              <div key={i} className="text-sm flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded">
                                <span className="font-medium">{org.org_name}</span>
                                <div className="flex items-center gap-1.5">
                                  <code className="text-[10px] font-mono text-muted-foreground">{org.wallet_address || "Sin wallet"}</code>
                                  {org.wallet_address && (
                                    <button
                                      type="button"
                                      className="text-muted-foreground hover:text-foreground"
                                      onClick={() => { navigator.clipboard.writeText(org.wallet_address); toast.success("Wallet copiada"); }}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Denied Wallets */}
                    {(() => {
                      const denied = customMeta.access_policy.denied_wallets || [];
                      if (denied.length === 0) return null;
                      return (
                        <div>
                          <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1.5 flex items-center gap-1">
                            <XCircle className="h-3.5 w-3.5" />
                            Organizaciones Denegadas ({denied.length})
                          </p>
                          <div className="space-y-1">
                            {denied.map((org: any, i: number) => (
                              <div key={i} className="text-sm flex items-center justify-between bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded">
                                <span className="font-medium">{org.org_name}</span>
                                <div className="flex items-center gap-1.5">
                                  <code className="text-[10px] font-mono text-muted-foreground">{org.wallet_address || "Sin wallet"}</code>
                                  {org.wallet_address && (
                                    <button
                                      type="button"
                                      className="text-muted-foreground hover:text-foreground"
                                      onClick={() => { navigator.clipboard.writeText(org.wallet_address); toast.success("Wallet copiada"); }}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {customMeta.access_policy.access_timeout_days && (
                      <CopyField label="Timeout de Acceso" value={`${customMeta.access_policy.access_timeout_days} días`} />
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Sidebar Info */}
        <div className="space-y-4">
          {/* Provider */}
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Proveedor</p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{orgName?.name ?? "—"}</p>
                  <p className="text-xs text-muted-foreground">{orgName?.sector ?? "—"}</p>
                </div>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground mt-2">{asset.subject_org_id}</p>
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="text-xs font-medium text-muted-foreground">Fechas</p>
              <div>
                <p className="text-xs text-muted-foreground">Solicitud</p>
                <p className="text-sm">{format(new Date(asset.created_at), "dd MMM yyyy HH:mm", { locale: es })}</p>
              </div>
              {(asset as any).published_at && (
                <div>
                  <p className="text-xs text-muted-foreground">Publicación</p>
                  <p className="text-sm">{format(new Date((asset as any).published_at), "dd MMM yyyy HH:mm", { locale: es })}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Visibility */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Visibilidad</p>
              <div className="flex items-center gap-2">
                {asset.is_public_marketplace ? (
                  <><Globe className="h-4 w-4 text-primary" /><span className="text-sm">Marketplace Público</span></>
                ) : (
                  <><Lock className="h-4 w-4 text-muted-foreground" /><span className="text-sm">Solo Red Privada</span></>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={(asset as any).is_visible ? "default" : "outline"} className="text-xs">
                  {(asset as any).is_visible ? "Visible" : "Oculto"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Asset ID */}
          <Card>
            <CardContent className="p-4">
              <CopyField label="Asset ID" value={asset.id} mono />
              <div className="mt-2">
                <CopyField label="Product ID" value={asset.product_id} mono />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const CopyField = ({ label, value, mono }: { label: string; value?: string | null; mono?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-0.5">{label}</p>
      <div className="flex items-start gap-2 group">
        <p className={`text-sm flex-1 ${mono ? "font-mono text-xs bg-muted/50 p-2 rounded break-all whitespace-pre-wrap" : ""}`}>
          {value || "—"}
        </p>
        {value && value !== "—" && (
          <button
            onClick={handleCopy}
            className="shrink-0 p-1 rounded hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
            title="Copiar al portapapeles"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-primary" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminPublicationDetail;
