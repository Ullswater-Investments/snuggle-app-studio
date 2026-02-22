import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Search, Building2, ShieldCheck, Clock, Trash2, Ban, Database, ArrowLeftRight, Fingerprint, MapPin, FileText, Copy } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { logGovernanceEvent } from "@/utils/governanceLogger";
import { formatDate } from "@/lib/i18nFormatters";

interface OrgRow {
  id: string; name: string; type: string; tax_id: string; kyb_verified: boolean | null;
  is_demo: boolean | null; is_active: boolean; sector: string | null; wallet_address: string | null;
  did: string | null; verification_source: string | null; description: string | null; created_at: string;
}

const AdminOrganizations = () => {
  const { t, i18n } = useTranslation("admin");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrg, setSelectedOrg] = useState<OrgRow | null>(null);
  const queryClient = useQueryClient();

  const { data: orgs = [], isLoading } = useQuery({
    queryKey: ["admin-all-orgs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("organizations")
        .select("id, name, type, tax_id, kyb_verified, is_demo, sector, wallet_address, did, verification_source, description, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((d: any) => ({ ...d, is_active: d.is_active ?? true })) as OrgRow[];
    },
  });

  const { data: activityMap = {} } = useQuery({
    queryKey: ["admin-org-activity-counts"],
    queryFn: async () => {
      const [{ data: assets }, { data: txs }] = await Promise.all([
        supabase.from("data_assets").select("id, holder_org_id, subject_org_id"),
        supabase.from("data_transactions").select("id, consumer_org_id, holder_org_id, subject_org_id"),
      ]);
      const map: Record<string, { assetCount: number; txCount: number }> = {};
      const ensure = (id: string) => { if (!map[id]) map[id] = { assetCount: 0, txCount: 0 }; };
      (assets ?? []).forEach((a: any) => { ensure(a.holder_org_id); map[a.holder_org_id].assetCount++; if (a.subject_org_id !== a.holder_org_id) { ensure(a.subject_org_id); map[a.subject_org_id].assetCount++; } });
      (txs ?? []).forEach((tx: any) => { [tx.consumer_org_id, tx.holder_org_id, tx.subject_org_id].forEach((id: string) => { ensure(id); map[id].txCount++; }); });
      return map;
    },
  });

  const filtered = orgs.filter((o) => {
    const matchesSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.tax_id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || (statusFilter === "verified" && o.kyb_verified) || (statusFilter === "pending" && !o.kyb_verified);
    return matchesSearch && matchesStatus;
  });

  const handleOrgUpdated = () => { queryClient.invalidateQueries({ queryKey: ["admin-all-orgs"] }); queryClient.invalidateQueries({ queryKey: ["admin-org-activity-counts"] }); setSelectedOrg(null); };

  const getTypeLabel = (type: string) => type === "consumer" ? t("organizations.typeConsumer") : type === "data_holder" ? t("organizations.typeHolder") : t("organizations.typeProvider");

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("organizations.title")}</h1>
        <p className="text-muted-foreground">{t("organizations.subtitle", { count: orgs.length })}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("organizations.searchPlaceholder")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder={t("organizations.filterPlaceholder")} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("organizations.allStatuses")}</SelectItem>
            <SelectItem value="verified">{t("organizations.verified")}</SelectItem>
            <SelectItem value="pending">{t("organizations.pendingFilter")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("organizations.tableName")}</TableHead>
                <TableHead>{t("organizations.tableType")}</TableHead>
                <TableHead className="text-center">{t("organizations.tableActivity")}</TableHead>
                <TableHead>{t("organizations.tableRegistered")}</TableHead>
                <TableHead>{t("organizations.tableStatus")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">{t("organizations.loading")}</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">{t("organizations.noResults")}</TableCell></TableRow>
              ) : (
                filtered.map((org) => {
                  const activity = activityMap[org.id];
                  return (
                    <TableRow key={org.id} className="cursor-pointer" onClick={() => setSelectedOrg(org)}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            {org.name}
                            {!org.is_active && <Badge variant="destructive" className="text-[10px] px-1.5 py-0">{t("organizations.inactive")}</Badge>}
                          </div>
                          {org.wallet_address && (
                            <div className="flex items-center gap-1.5">
                              <code className="text-[11px] font-mono text-muted-foreground">{org.wallet_address}</code>
                              <button type="button" title={t("organizations.copyWallet")} className="text-muted-foreground hover:text-foreground transition-colors" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(org.wallet_address!); toast.success(t("organizations.walletCopied")); }}><Copy className="h-3 w-3" /></button>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{getTypeLabel(org.type)}</Badge></TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Database className="h-3 w-3" />{activity?.assetCount ?? 0}</span>
                          <span className="flex items-center gap-1"><ArrowLeftRight className="h-3 w-3" />{activity?.txCount ?? 0}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(org.created_at, "dd MMM yyyy", i18n.language)}</TableCell>
                      <TableCell>
                        {org.kyb_verified ? (
                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-0"><ShieldCheck className="h-3 w-3 mr-1" />{t("organizations.verifiedBadge")}</Badge>
                        ) : (
                          <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />{t("organizations.pendingBadge")}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!selectedOrg} onOpenChange={(open) => !open && setSelectedOrg(null)}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedOrg && <OrgDetailPanel org={selectedOrg} activity={activityMap[selectedOrg.id]} onClose={() => setSelectedOrg(null)} onOrgUpdated={handleOrgUpdated} t={t} lang={i18n.language} />}
        </SheetContent>
      </Sheet>
    </div>
  );
};

interface OrgDetailPanelProps { org: OrgRow; activity?: { assetCount: number; txCount: number }; onClose: () => void; onOrgUpdated: () => void; t: (key: string, opts?: any) => string; lang: string; }

const OrgDetailPanel = ({ org, activity, onClose, onOrgUpdated, t, lang }: OrgDetailPanelProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteAction, setDeleteAction] = useState<"delete" | "disable">("delete");
  const queryClient = useQueryClient();
  const hasActivity = (activity?.assetCount ?? 0) > 0 || (activity?.txCount ?? 0) > 0;

  const { data: assets = [] } = useQuery({ queryKey: ["admin-org-assets", org.id], queryFn: async () => { const { data } = await supabase.from("data_assets").select("id, status, product_id, data_products(name)").or(`holder_org_id.eq.${org.id},subject_org_id.eq.${org.id}`); return data ?? []; } });
  const { data: team = [] } = useQuery({ queryKey: ["admin-org-team", org.id], queryFn: async () => { const { data } = await supabase.from("user_profiles").select("user_id, full_name").eq("organization_id", org.id); return data ?? []; } });
  const { data: userEmails = [] } = useQuery({ queryKey: ["admin-org-emails", org.id], queryFn: async () => { const { data: roles } = await supabase.from("user_roles").select("user_id, role").eq("organization_id", org.id); if (!roles || roles.length === 0) return []; return roles.map((r) => ({ userId: r.user_id, role: r.role })); } });
  const { data: transactions = [] } = useQuery({ queryKey: ["admin-org-transactions", org.id], queryFn: async () => { const { data } = await supabase.from("data_transactions").select("id, status, purpose, created_at, consumer_org_id, holder_org_id").or(`consumer_org_id.eq.${org.id},holder_org_id.eq.${org.id}`).order("created_at", { ascending: false }).limit(20); return data ?? []; } });

  const disableMutation = useMutation({
    mutationFn: async () => { const { error } = await supabase.from("organizations").update({ is_active: false } as any).eq("id", org.id); if (error) throw error; },
    onSuccess: () => { toast.success(`"${org.name}" ${t("organizations.disableSuccess")}`); logGovernanceEvent({ level: "info", category: "organizations", message: `Organización "${org.name}" deshabilitada por el administrador`, metadata: { organization_id: org.id, organization_name: org.name } }); onOrgUpdated(); },
    onError: () => toast.error(t("organizations.disableError")),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const orgTables = ["user_profiles", "user_roles", "notifications", "audit_logs", "wallets", "webhooks", "esg_reports"];
      for (const table of orgTables) { const { error } = await (supabase.from as any)(table).delete().eq("organization_id", org.id); if (error) console.warn(`Cascade delete warning on ${table}:`, error.message); }
      const { error } = await supabase.from("organizations").delete().eq("id", org.id);
      if (error) { if (error.message?.includes("foreign key") || error.message?.includes("violates") || error.code === "23503") throw new Error("FK_CONSTRAINT"); throw error; }
    },
    onSuccess: () => { toast.success(`"${org.name}" ${t("organizations.deleteSuccess")}`); logGovernanceEvent({ level: "info", category: "organizations", message: `Organización "${org.name}" eliminada permanentemente por el administrador`, metadata: { organization_id: org.id, organization_name: org.name, tax_id: org.tax_id } }); onOrgUpdated(); },
    onError: (err: any) => { if (err.message === "FK_CONSTRAINT") { toast.error(t("organizations.deleteFKError"), { duration: 6000 }); } else { toast.error(`${t("organizations.deleteError")}: ${err.message}`); } },
  });

  const handleDeleteClick = () => { setDeleteAction(hasActivity ? "disable" : "delete"); setShowDeleteDialog(true); };
  const handleConfirm = () => { if (deleteAction === "delete") deleteMutation.mutate(); else disableMutation.mutate(); setShowDeleteDialog(false); };
  const typeLabel = org.type === "consumer" ? t("organizations.typeConsumer") : org.type === "data_holder" ? t("organizations.typeHolder") : t("organizations.typeProvider");

  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" />{org.name}</SheetTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline">{typeLabel}</Badge>
          {org.kyb_verified ? (<Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-0"><ShieldCheck className="h-3 w-3 mr-1" />{t("organizations.verifiedBadge")}</Badge>) : (<Badge variant="secondary">{t("organizations.pendingBadge")}</Badge>)}
          {!org.is_active && <Badge variant="destructive">{t("organizations.inactive")}</Badge>}
          {org.is_demo && <Badge variant="outline" className="text-amber-600 border-amber-300">{t("organizations.demo")}</Badge>}
        </div>
      </SheetHeader>

      <Tabs defaultValue="identity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="identity">{t("organizations.tabIdentity")}</TabsTrigger>
          <TabsTrigger value="assets">{t("organizations.tabAssets")}</TabsTrigger>
          <TabsTrigger value="team">{t("organizations.tabTeam")}</TabsTrigger>
          <TabsTrigger value="finance">{t("organizations.tabFinance")}</TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="space-y-5 mt-4">
          <div>
            <div className="flex items-center gap-2 mb-3"><FileText className="h-4 w-4 text-muted-foreground" /><h4 className="text-sm font-semibold">{t("organizations.legalIdentity")}</h4></div>
            <div className="grid grid-cols-2 gap-3">
              <InfoField label={t("organizations.docType")} value={t("organizations.vatId")} />
              <InfoField label={t("organizations.docNumber")} value={org.tax_id} mono />
              <InfoField label={t("organizations.sector")} value={org.sector || t("organizations.notSpecified")} />
              <InfoField label={t("organizations.deltaDAOReg")} value={org.verification_source ? t("organizations.registered") : t("organizations.notRegistered")} />
            </div>
          </div>
          <Separator />
          <div>
            <div className="flex items-center gap-2 mb-3"><MapPin className="h-4 w-4 text-muted-foreground" /><h4 className="text-sm font-semibold">{t("organizations.hqAddress")}</h4></div>
            <div className="grid grid-cols-2 gap-3">
              <InfoField label={t("organizations.street")} value={org.description ? extractAddress(org.description, "street", t("organizations.notAvailable")) : t("organizations.notAvailable")} />
              <InfoField label={t("organizations.city")} value={org.description ? extractAddress(org.description, "city", t("organizations.notAvailable")) : t("organizations.notAvailable")} />
              <InfoField label={t("organizations.postalCode")} value={org.description ? extractAddress(org.description, "postal", t("organizations.notAvailable")) : t("organizations.notAvailable")} />
              <InfoField label={t("organizations.country")} value={org.description ? extractAddress(org.description, "country", t("organizations.notAvailable")) : t("organizations.notAvailable")} />
            </div>
          </div>
          <Separator />
          <div>
            <div className="flex items-center gap-2 mb-3"><Fingerprint className="h-4 w-4 text-muted-foreground" /><h4 className="text-sm font-semibold">{t("organizations.digitalIdentity")}</h4></div>
            <div className="space-y-3">
              <InfoField label={t("organizations.did")} value={org.did || t("organizations.notAssigned")} mono fullWidth />
              <InfoField label={t("organizations.walletAddress")} value={org.wallet_address || t("organizations.notAssignedF")} mono fullWidth />
              <InfoField label={t("organizations.verificationSource")} value={org.verification_source || t("organizations.notVerified")} fullWidth />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">{t("organizations.datasetsPublished", { count: assets.length })}</p>
          {assets.length === 0 ? (<p className="text-sm text-muted-foreground italic">{t("organizations.noAssets")}</p>) : (
            <div className="space-y-2">{assets.map((a: any) => (<Card key={a.id}><CardContent className="p-3 flex items-center justify-between"><span className="text-sm font-medium">{a.data_products?.name || "Dataset"}</span><Badge variant="outline" className="text-xs">{a.status}</Badge></CardContent></Card>))}</div>
          )}
        </TabsContent>

        <TabsContent value="team" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">{t("organizations.linkedUsers", { count: userEmails.length })}</p>
          {userEmails.length === 0 ? (<p className="text-sm text-muted-foreground italic">{t("organizations.noUsers")}</p>) : (
            <div className="space-y-2">{userEmails.map((u, i) => { const profile = team.find((tp: any) => tp.user_id === u.userId); return (<Card key={i}><CardContent className="p-3 flex items-center justify-between"><div><p className="text-sm font-medium">{(profile as any)?.full_name || t("organizations.noName")}</p><p className="text-xs font-mono text-muted-foreground truncate max-w-[200px]">{u.userId}</p></div><Badge variant="secondary" className="text-xs">{u.role}</Badge></CardContent></Card>); })}</div>
          )}
        </TabsContent>

        <TabsContent value="finance" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">{t("organizations.recentTx", { count: transactions.length })}</p>
          {transactions.length === 0 ? (<p className="text-sm text-muted-foreground italic">{t("organizations.noFinance")}</p>) : (
            <div className="space-y-2">{transactions.map((tx: any) => (<Card key={tx.id}><CardContent className="p-3 space-y-1"><div className="flex items-center justify-between"><span className="text-sm font-medium truncate">{tx.purpose}</span><Badge variant="outline" className="text-xs">{tx.status}</Badge></div><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{tx.consumer_org_id === org.id ? t("organizations.purchase") : t("organizations.sale")}</span><span>{format(new Date(tx.created_at), "dd/MM/yyyy")}</span></div></CardContent></Card>))}</div>
          )}
        </TabsContent>
      </Tabs>

      <Separator />
      <div className="pt-2">
        <Button variant="destructive" className="w-full" onClick={handleDeleteClick} disabled={deleteMutation.isPending || disableMutation.isPending}>
          {hasActivity ? (<><Ban className="h-4 w-4 mr-2" />{t("organizations.disableOrg")}</>) : (<><Trash2 className="h-4 w-4 mr-2" />{t("organizations.deleteOrg")}</>)}
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{deleteAction === "delete" ? t("organizations.deleteTitle") : t("organizations.disableTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteAction === "delete" ? (<>{t("organizations.deleteDesc")} <strong>{t("organizations.deleteIrreversible")}</strong></>) : (<>{t("organizations.disableDesc")}</>)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("organizations.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">{deleteAction === "delete" ? t("organizations.deletePermanently") : t("organizations.disable")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const InfoField = ({ label, value, mono, fullWidth }: { label: string; value: string; mono?: boolean; fullWidth?: boolean }) => (
  <div className={fullWidth ? "col-span-2" : ""}><p className="text-xs text-muted-foreground mb-0.5">{label}</p><p className={`text-sm ${mono ? "font-mono" : ""} break-all`}>{value}</p></div>
);

function extractAddress(desc: string, field: "street" | "city" | "postal" | "country", fallback: string): string {
  try {
    const parsed = JSON.parse(desc);
    switch (field) {
      case "street": return parsed.street || parsed.streetName || parsed.address || fallback;
      case "city": return parsed.city || parsed.locality || fallback;
      case "postal": return parsed.postalCode || parsed.postal_code || parsed.zip || fallback;
      case "country": return parsed.country || fallback;
    }
  } catch {
    if (field === "street") return desc.substring(0, 60) || fallback;
    return fallback;
  }
}

export default AdminOrganizations;
