import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
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
import { formatDate } from "@/lib/i18nFormatters";

const getStatusConfig = (t: (key: string) => string) => ({
  pending_validation: { label: t('status.pendingValidation'), variant: "secondary" as const, icon: Clock },
  available: { label: t('status.pendingValidation'), variant: "secondary" as const, icon: Clock },
  pending: { label: t('status.pendingValidation'), variant: "secondary" as const, icon: Clock },
  active: { label: t('status.published'), variant: "default" as const, icon: CheckCircle2 },
  published: { label: t('status.published'), variant: "default" as const, icon: CheckCircle2 },
  rejected: { label: t('status.rejected'), variant: "destructive" as const, icon: XCircle },
  draft: { label: t('status.draft'), variant: "outline" as const, icon: Clock },
});

const AdminPublicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation('admin');
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
      toast.success(t('assets.publishSuccess'));
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
    onError: () => toast.error(t('assets.publishError')),
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
      toast.success(t('assets.rejectSuccess'));
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
    onError: () => toast.error(t('assets.rejectError')),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-6">
        <p className="text-muted-foreground">{t('assets.loading')}</p>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-6 space-y-4">
        <p className="text-muted-foreground">{t('assets.notFound')}</p>
        <Button variant="outline" onClick={() => navigate("/admin/publications")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> {t('assets.back')}
        </Button>
      </div>
    );
  }

  const product = asset.data_products as any;
  const customMeta = asset.custom_metadata as any;
  const statusCfg = getStatusConfig(t);
  const cfg = statusCfg[asset.status as keyof typeof statusCfg] ?? { label: asset.status, variant: "outline" as const, icon: Clock };
  const StatusIcon = cfg.icon;
  const isPending = asset.status === "available" || asset.status === "pending_validation" || asset.status === "pending";
  const lang = i18n.language;

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/publications")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product?.name ?? t('assets.asset')}</h1>
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
              <Shield className="h-4 w-4" /> {t('assets.validationActions')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-sm text-muted-foreground mb-4">
              {t('assets.validateBeforePublish')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => publishMutation.mutate()}
                disabled={publishMutation.isPending}
              >
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                {t('assets.approveAction')}
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => setShowRejectForm(true)}
              >
                <XCircle className="h-4 w-4 mr-1.5" />
                {t('assets.rejectAction')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reject Modal Dialog */}
      <Dialog open={showRejectForm} onOpenChange={setShowRejectForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('assets.rejectTitle')}</DialogTitle>
            <DialogDescription>
              {t('assets.rejectDescription')}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder={t('assets.rejectPlaceholder')}
            value={rejectionNote}
            onChange={(e) => setRejectionNote(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowRejectForm(false); setRejectionNote(""); }}>
              {t('assets.cancel')}
            </Button>
            <Button
              variant="destructive"
              disabled={!rejectionNote.trim() || rejectMutation.isPending}
              onClick={() => rejectMutation.mutate(rejectionNote.trim())}
            >
              {t('assets.confirmReject')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Notes (if rejected) */}
      {(asset as any).admin_notes && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-destructive mb-1">{t('assets.rejectionReason')}:</p>
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
                <FileText className="h-4 w-4" /> {t('assets.metadata')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CopyField label={t('assets.title')} value={product?.name} copyTitle={t('assets.copyToClipboard')} />
              <CopyField label={t('assets.description')} value={product?.description} copyTitle={t('assets.copyToClipboard')} />
              <div className="grid grid-cols-2 gap-4">
                <CopyField label={t('assets.category')} value={product?.category ? t(`categories.${product.category}`, { defaultValue: product.category }) : undefined} copyTitle={t('assets.copyToClipboard')} />
                <CopyField label={t('assets.version')} value={product?.version} copyTitle={t('assets.copyToClipboard')} />
              </div>
              {catalogMeta?.tags && catalogMeta.tags.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">{t('assets.tags')}</p>
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
                <Database className="h-4 w-4" /> {t('assets.technicalAccess')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CopyField label={t('assets.apiUrl')} value={customMeta?.api_url || customMeta?.endpoint_url || customMeta?.source_url || t('assets.notConfigured')} copyTitle={t('assets.copyToClipboard')} />
              
              {/* Custom Headers */}
              {customMeta?.headers && Object.keys(customMeta.headers).length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">{t('assets.customHeaders')}</p>
                  <div className="space-y-2 bg-muted/30 rounded-lg p-3">
                    {Object.entries(customMeta.headers).map(([key, value]: [string, any]) => (
                      <CopyField key={key} label={key} value={String(value)} mono copyTitle={t('assets.copyToClipboard')} />
                    ))}
                  </div>
                </div>
              )}

              {/* Schema Definition */}
              {product?.schema_definition && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">{t('assets.technicalSchema')}</p>
                  <div className="bg-muted/30 rounded-lg p-3 max-h-[300px] overflow-auto">
                    <CopyField label={t('assets.schemaJson')} value={JSON.stringify(product.schema_definition, null, 2)} mono copyTitle={t('assets.copyToClipboard')} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Governance Block */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" /> {t('assets.governance')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <CopyField label={t('assets.pricingModel')} value={asset.pricing_model ?? t('assets.free')} copyTitle={t('assets.copyToClipboard')} />
                <CopyField label={t('assets.price')} value={asset.price != null && asset.price > 0 ? `${asset.price} ${asset.currency ?? "EUR"}` : t('assets.freePrice')} copyTitle={t('assets.copyToClipboard')} />
                <CopyField label={t('assets.billingPeriod')} value={asset.billing_period ?? "N/A"} copyTitle={t('assets.copyToClipboard')} />
                <CopyField label={t('assets.publicMarketplace')} value={asset.is_public_marketplace ? t('assets.yes') : t('assets.no')} copyTitle={t('assets.copyToClipboard')} />
              </div>

              {/* Access Policy from custom_metadata */}
              {customMeta?.access_policy && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">{t('assets.usagePolicies')}</p>
                  <div className="bg-muted/30 rounded-lg p-3 max-h-[200px] overflow-auto">
                    <CopyField label={t('assets.governanceCert')} value={JSON.stringify(customMeta.access_policy, null, 2)} mono copyTitle={t('assets.copyToClipboard')} />
                  </div>

                  {/* Access Control — Pontus-X */}
                  <div className="mt-3 space-y-4">
                    {(() => {
                      const allowed = customMeta.access_policy.allowed_wallets || customMeta.access_policy.access_list || [];
                      const denied = customMeta.access_policy.denied_wallets || [];
                      const mode = allowed.length > 0 ? t('assets.privateWhitelist') : denied.length > 0 ? t('assets.publicBlacklist') : t('assets.publicTotal');
                      return <CopyField label={t('assets.accessControlMode')} value={mode} copyTitle={t('assets.copyToClipboard')} />;
                    })()}

                    {/* Allowed Wallets */}
                    {(() => {
                      const allowed = customMeta.access_policy.allowed_wallets || customMeta.access_policy.access_list || [];
                      if (allowed.length === 0) return null;
                      return (
                        <div>
                          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {t('assets.allowedOrgs')} ({allowed.length})
                          </p>
                          <div className="space-y-1">
                            {allowed.map((org: any, i: number) => (
                              <div key={i} className="text-sm flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded">
                                <span className="font-medium">{org.org_name}</span>
                                <div className="flex items-center gap-1.5">
                                  <code className="text-[10px] font-mono text-muted-foreground">{org.wallet_address || t('assets.noWallet')}</code>
                                  {org.wallet_address && (
                                    <button
                                      type="button"
                                      className="text-muted-foreground hover:text-foreground"
                                      onClick={() => { navigator.clipboard.writeText(org.wallet_address); toast.success(t('assets.walletCopied')); }}
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
                            {t('assets.deniedOrgs')} ({denied.length})
                          </p>
                          <div className="space-y-1">
                            {denied.map((org: any, i: number) => (
                              <div key={i} className="text-sm flex items-center justify-between bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded">
                                <span className="font-medium">{org.org_name}</span>
                                <div className="flex items-center gap-1.5">
                                  <code className="text-[10px] font-mono text-muted-foreground">{org.wallet_address || t('assets.noWallet')}</code>
                                  {org.wallet_address && (
                                    <button
                                      type="button"
                                      className="text-muted-foreground hover:text-foreground"
                                      onClick={() => { navigator.clipboard.writeText(org.wallet_address); toast.success(t('assets.walletCopied')); }}
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
                      <CopyField label={t('assets.accessTimeout')} value={`${customMeta.access_policy.access_timeout_days} ${t('assets.days')}`} copyTitle={t('assets.copyToClipboard')} />
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
              <p className="text-xs font-medium text-muted-foreground mb-2">{t('assets.provider')}</p>
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
              <p className="text-xs font-medium text-muted-foreground">{t('assets.dates')}</p>
              <div>
                <p className="text-xs text-muted-foreground">{t('assets.requestDate')}</p>
                <p className="text-sm">{formatDate(new Date(asset.created_at), "dd MMM yyyy HH:mm", lang)}</p>
              </div>
              {(asset as any).published_at && (
                <div>
                  <p className="text-xs text-muted-foreground">{t('assets.publishDate')}</p>
                  <p className="text-sm">{formatDate(new Date((asset as any).published_at), "dd MMM yyyy HH:mm", lang)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Visibility */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">{t('assets.visibility')}</p>
              <div className="flex items-center gap-2">
                {asset.is_public_marketplace ? (
                  <><Globe className="h-4 w-4 text-primary" /><span className="text-sm">{t('assets.publicMkt')}</span></>
                ) : (
                  <><Lock className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{t('assets.privateOnly')}</span></>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={(asset as any).is_visible ? "default" : "outline"} className="text-xs">
                  {(asset as any).is_visible ? t('assets.visible') : t('assets.hidden')}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Asset ID */}
          <Card>
            <CardContent className="p-4">
              <CopyField label="Asset ID" value={asset.id} mono copyTitle={t('assets.copyToClipboard')} />
              <div className="mt-2">
                <CopyField label="Product ID" value={asset.product_id} mono copyTitle={t('assets.copyToClipboard')} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const CopyField = ({ label, value, mono, copyTitle }: { label: string; value?: string | null; mono?: boolean; copyTitle?: string }) => {
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
            title={copyTitle}
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
