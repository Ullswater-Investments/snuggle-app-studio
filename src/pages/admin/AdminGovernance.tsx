import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Shield, Server, RefreshCw, CheckCircle2, XCircle, Clock, Save, Loader2, Network, Package, Coins, AlertTriangle, Download } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { PONTUSX_NETWORK_CONFIG } from "@/services/pontusX";
import { oceanConfig } from "@/lib/oceanConfig";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";

interface ServiceStatus { name: string; url: string; status: "online" | "offline" | "checking"; }
interface GovernanceLog { id: string; level: string; category: string; message: string; actor_id: string | null; metadata: Record<string, unknown> | null; created_at: string; }

const NETWORK_PRESETS: Record<string, { rpc: string; chainId: string; label: string }> = {
  testnet: { rpc: "https://rpc.test.pontus-x.eu", chainId: "32457", label: "Pontus-X Testnet" },
  devnet: { rpc: "https://rpc.dev.pontus-x.eu", chainId: "32456", label: "Pontus-X Devnet" },
};

const StatusDot = ({ status }: { status: ServiceStatus["status"] }) => {
  if (status === "checking") return <Clock className="h-4 w-4 text-muted-foreground animate-spin" />;
  if (status === "online") return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  return <XCircle className="h-4 w-4 text-destructive" />;
};

async function checkService(url: string, isRpc: boolean): Promise<"online" | "offline"> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    if (isRpc) { const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 }), signal: controller.signal }); const data = await res.json(); return data.result ? "online" : "offline"; }
    else { await fetch(url, { method: "HEAD", signal: controller.signal, mode: "no-cors" }); return "online"; }
  } catch { return "offline"; } finally { clearTimeout(timeout); }
}

const AdminGovernance = () => {
  const { t, i18n } = useTranslation("admin");
  const queryClient = useQueryClient();

  const [govSettings, setGovSettings] = useState({ require_email_verification: false, require_kyc: false, require_kyb: false, require_deltadao_onboarding: true, ecosystem_status: "active" as "active" | "maintenance", auto_approve_assets: true, catalog_visibility: "public" as "public" | "private", maintenance_mode: false });
  const [ecosystemFee, setEcosystemFee] = useState("2.5");
  const [feeSaving, setFeeSaving] = useState(false);
  const [logVerbosity, setLogVerbosity] = useState<string>("operational");
  const [govLoading, setGovLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("system_settings").select("key, value").in("key", ["require_email_verification", "require_kyc", "require_kyb", "require_deltadao_onboarding", "ecosystem_status", "auto_approve_assets", "catalog_visibility", "ecosystem_fee_percentage", "maintenance_mode", "log_verbosity"]);
      if (data) {
        const map: Record<string, string> = {};
        for (const r of data) map[r.key] = r.value;
        setGovSettings({ require_email_verification: map.require_email_verification === "true", require_kyc: map.require_kyc === "true", require_kyb: map.require_kyb === "true", require_deltadao_onboarding: map.require_deltadao_onboarding !== "false", ecosystem_status: (map.ecosystem_status as "active" | "maintenance") ?? "active", auto_approve_assets: map.auto_approve_assets !== "false", catalog_visibility: (map.catalog_visibility as "public" | "private") ?? "public", maintenance_mode: map.maintenance_mode === "true" });
        if (map.ecosystem_fee_percentage) setEcosystemFee(map.ecosystem_fee_percentage);
        if (map.log_verbosity) setLogVerbosity(map.log_verbosity);
      }
      setGovLoading(false);
    };
    load();
  }, []);

  const toggleGovSetting = async (key: string, newValue: boolean | string) => {
    const strValue = typeof newValue === "boolean" ? (newValue ? "true" : "false") : newValue;
    const { error } = await supabase.from("system_settings").update({ value: strValue, updated_at: new Date().toISOString() }).eq("key", key);
    if (error) { toast.error(t("governance.configError")); return; }
    setGovSettings((prev) => ({ ...prev, [key]: newValue }));

    const labels: Record<string, string> = {
      require_email_verification: t("governance.emailVerification"), require_kyc: t("governance.kycLabel"), require_kyb: t("governance.kybLabel"),
      require_deltadao_onboarding: t("governance.deltaDAOLabel"), ecosystem_status: t("governance.ecosystemStatus"), auto_approve_assets: t("governance.autoApproval"),
      catalog_visibility: t("governance.catalogVisibility"), maintenance_mode: t("governance.maintenanceMode"),
    };
    await (supabase as any).from("governance_logs").insert({ level: "info", category: "config_change", message: `${labels[key] ?? key} ${typeof newValue === "boolean" ? (newValue ? "activado" : "desactivado") : `cambiado a "${newValue}"`}` });
    queryClient.invalidateQueries({ queryKey: ["governance-settings"] });
    toast.success(`${labels[key]} ${t("governance.configUpdated")}`);
    fetchLogs();
  };

  const saveEcosystemFee = async () => {
    const numVal = parseFloat(ecosystemFee);
    if (isNaN(numVal) || numVal < 0 || numVal > 100) { toast.error(t("governance.feeError")); return; }
    setFeeSaving(true);
    const { error } = await supabase.from("system_settings").update({ value: numVal.toString(), updated_at: new Date().toISOString() }).eq("key", "ecosystem_fee_percentage");
    if (error) { toast.error(t("governance.feeUpdateError")); }
    else { await (supabase as any).from("governance_logs").insert({ level: "info", category: "config_change", message: `Comisión del Ecosistema actualizada a ${numVal}%` }); queryClient.invalidateQueries({ queryKey: ["governance-settings"] }); toast.success(t("governance.feeUpdateSuccess")); fetchLogs(); }
    setFeeSaving(false);
  };

  const saveLogVerbosity = async (newLevel: string) => {
    setLogVerbosity(newLevel);
    const { error } = await supabase.from("system_settings").update({ value: newLevel, updated_at: new Date().toISOString() }).eq("key", "log_verbosity");
    if (!error) { await (supabase as any).from("governance_logs").insert({ level: "info", category: "config_change", message: `Nivel de detalle de logs cambiado a "${newLevel}"` }); queryClient.invalidateQueries({ queryKey: ["governance-settings"] }); toast.success(t("governance.verbosityUpdateSuccess")); fetchLogs(); }
    else { toast.error(t("governance.verbosityUpdateError")); }
  };

  const exportLogs = async () => {
    const { data, error } = await (supabase as any).from("governance_logs").select("*").order("created_at", { ascending: false }).limit(1000);
    if (error || !data || data.length === 0) { toast.error(t("governance.exportError")); return; }
    const header = "Fecha,Nivel,Categoría,Mensaje\n";
    const rows = data.map((r: GovernanceLog) => { const date = new Date(r.created_at).toLocaleString(i18n.language); const msg = r.message.replace(/"/g, '""'); return `"${date}","${r.level.toUpperCase()}","${r.category}","${msg}"`; }).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `governance_logs_${new Date().toISOString().slice(0, 10)}.csv`; a.click(); URL.revokeObjectURL(url);
    toast.success(t("governance.exportSuccess"));
  };

  const [rpcUrl, setRpcUrl] = useState("");
  const [chainId, setChainId] = useState("32457");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("testnet");
  const [rpcLoading, setRpcLoading] = useState(true);
  const [rpcSaving, setRpcSaving] = useState(false);
  const [rpcStatus, setRpcStatus] = useState<"online" | "offline" | "checking">("checking");

  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "Blockchain (Pontus-X)", url: oceanConfig.nodeUri, status: "checking" },
    { name: "API Gateway (Aquarius)", url: oceanConfig.aquariusUrl, status: "checking" },
    { name: "Provider de Datos", url: oceanConfig.providerUrl, status: "checking" },
    { name: "Identity Provider", url: "https://identity.pontus-x.eu", status: "checking" },
  ]);

  const runHealthCheck = useCallback(async () => {
    const currentRpc = rpcUrl || oceanConfig.nodeUri;
    setServices([
      { name: "Blockchain (Pontus-X)", url: currentRpc, status: "checking" },
      { name: "API Gateway (Aquarius)", url: oceanConfig.aquariusUrl, status: "checking" },
      { name: "Provider de Datos", url: oceanConfig.providerUrl, status: "checking" },
      { name: "Identity Provider", url: "https://identity.pontus-x.eu", status: "checking" },
    ]);
    const urls = [{ url: currentRpc, isRpc: true }, { url: oceanConfig.aquariusUrl, isRpc: false }, { url: oceanConfig.providerUrl, isRpc: false }, { url: "https://identity.pontus-x.eu", isRpc: false }];
    const results = await Promise.all(urls.map((u) => checkService(u.url, u.isRpc)));
    setServices((prev) => prev.map((s, i) => ({ ...s, status: results[i] })));
  }, [rpcUrl]);

  useEffect(() => { runHealthCheck(); }, [runHealthCheck]);

  useEffect(() => {
    const loadRpc = async () => {
      const [rpcRes, chainRes] = await Promise.all([supabase.from("system_settings").select("value").eq("key", "blockchain_rpc_url").maybeSingle(), supabase.from("system_settings").select("value").eq("key", "blockchain_chain_id").maybeSingle()]);
      const loadedRpc = rpcRes.data?.value || "https://rpc.test.pontus-x.eu";
      const loadedChain = chainRes.data?.value || "32457";
      setRpcUrl(loadedRpc); setChainId(loadedChain);
      const match = Object.entries(NETWORK_PRESETS).find(([, v]) => v.rpc === loadedRpc);
      setSelectedNetwork(match ? match[0] : "custom"); setRpcLoading(false);
    };
    loadRpc();
  }, []);

  useEffect(() => {
    if (!rpcUrl || rpcLoading) return;
    setRpcStatus("checking");
    const controller = new AbortController();
    fetch(rpcUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 }), signal: controller.signal })
      .then((r) => r.json()).then((d) => setRpcStatus(d.result ? "online" : "offline")).catch(() => setRpcStatus("offline"));
    return () => controller.abort();
  }, [rpcUrl, rpcLoading]);

  const handleNetworkChange = (value: string) => { setSelectedNetwork(value); const preset = NETWORK_PRESETS[value]; if (preset) { setRpcUrl(preset.rpc); setChainId(preset.chainId); } };

  const saveRpcUrl = async () => {
    setRpcSaving(true);
    const now = new Date().toISOString();
    const [rpcRes, chainRes] = await Promise.all([supabase.from("system_settings").update({ value: rpcUrl, updated_at: now }).eq("key", "blockchain_rpc_url"), supabase.from("system_settings").update({ value: chainId, updated_at: now }).eq("key", "blockchain_chain_id")]);
    await (supabase as any).from("governance_logs").insert({ level: "info", category: "config_change", message: `URL del RPC actualizada a ${rpcUrl} (Chain ID: ${chainId})` });
    setRpcSaving(false);
    if (rpcRes.error || chainRes.error) { toast.error(t("governance.rpcSaveError")); }
    else { queryClient.invalidateQueries({ queryKey: ["pontus-wallet-balance"] }); queryClient.invalidateQueries({ queryKey: ["blockchain-activity"] }); toast.success(t("governance.rpcSaveSuccess")); fetchLogs(); }
  };

  const [logs, setLogs] = useState<GovernanceLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    setLogsLoading(true);
    const { data, error } = await (supabase as any).from("governance_logs").select("*").order("created_at", { ascending: false }).limit(50);
    if (!error && data) setLogs(data);
    setLogsLoading(false);
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const getServiceStatusLabel = (status: ServiceStatus["status"]) => {
    if (status === "online") return t("governance.operational");
    if (status === "offline") return t("governance.down");
    return t("governance.checking");
  };

  const getRpcStatusLabel = () => {
    if (rpcStatus === "online") return t("governance.connected");
    if (rpcStatus === "offline") return t("governance.noConnection");
    return t("governance.checking");
  };

  return (
    <div className="min-h-screen bg-muted/40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("governance.title")}</h1>
        <p className="text-muted-foreground">{t("governance.subtitle")}</p>
      </div>

      {/* Emergency Operations */}
      <Card className="border-destructive/40">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" /><CardTitle className="text-base">{t("governance.emergencyOps")}</CardTitle></div>
          <CardDescription>{t("governance.emergencyDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          {govLoading ? (<div className="flex items-center justify-center py-4 text-muted-foreground text-sm"><Loader2 className="h-4 w-4 animate-spin mr-2" /> {t("governance.loading")}</div>) : (
            <div className="flex items-center justify-between">
              <div className="space-y-0.5"><Label htmlFor="sw-maintenance" className="text-sm font-medium">{t("governance.maintenanceMode")}</Label><p className="text-xs text-muted-foreground">{t("governance.maintenanceDesc")}</p></div>
              <Switch id="sw-maintenance" checked={govSettings.maintenance_mode} onCheckedChange={(v) => toggleGovSetting("maintenance_mode", v)} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blockchain RPC */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2"><Network className="h-5 w-5 text-primary" /><CardTitle className="text-base">{t("governance.blockchainConfig")}</CardTitle></div>
          <CardDescription>{t("governance.blockchainDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-[220px]">
              <Select value={selectedNetwork} onValueChange={handleNetworkChange} disabled={rpcLoading}>
                <SelectTrigger><SelectValue placeholder={t("governance.selectNetwork")} /></SelectTrigger>
                <SelectContent><SelectItem value="testnet">Pontus-X Testnet</SelectItem><SelectItem value="devnet">Pontus-X Devnet</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="flex-1"><Input value={rpcUrl} onChange={(e) => { setRpcUrl(e.target.value); setSelectedNetwork("custom"); }} placeholder="https://rpc.test.pontus-x.eu" disabled={rpcLoading} /></div>
            <div className="flex items-center gap-2">
              <StatusDot status={rpcStatus} />
              <Badge variant="outline" className={rpcStatus === "online" ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30" : rpcStatus === "offline" ? "bg-destructive/10 text-destructive border-destructive/30" : "bg-muted text-muted-foreground"}>{getRpcStatusLabel()}</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Chain ID: {chainId} · Token: {PONTUSX_NETWORK_CONFIG.nativeCurrency.symbol}</p>
            <Button size="sm" onClick={saveRpcUrl} disabled={rpcSaving || rpcLoading}>{rpcSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}{t("governance.save")}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Identity Configuration */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /><CardTitle className="text-base">{t("governance.identityConfig")}</CardTitle></div>
          <CardDescription>{t("governance.identityDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {govLoading ? (<div className="flex items-center justify-center py-4 text-muted-foreground text-sm"><Loader2 className="h-4 w-4 animate-spin mr-2" /> {t("governance.loadingConfig")}</div>) : (<>
            <div className="flex items-center justify-between"><div className="space-y-0.5"><Label htmlFor="sw-email" className="text-sm font-medium">{t("governance.emailVerification")}</Label><p className="text-xs text-muted-foreground">{t("governance.emailVerificationDesc")}</p></div><Switch id="sw-email" checked={govSettings.require_email_verification} onCheckedChange={(v) => toggleGovSetting("require_email_verification", v)} /></div>
            <Separator />
            <div className="flex items-center justify-between"><div className="space-y-0.5"><Label htmlFor="sw-kyc" className="text-sm font-medium">{t("governance.kycLabel")}</Label><p className="text-xs text-muted-foreground">{t("governance.kycDesc")}</p></div><Switch id="sw-kyc" checked={govSettings.require_kyc} onCheckedChange={(v) => toggleGovSetting("require_kyc", v)} /></div>
            <Separator />
            <div className="flex items-center justify-between"><div className="space-y-0.5"><Label htmlFor="sw-kyb" className="text-sm font-medium">{t("governance.kybLabel")}</Label><p className="text-xs text-muted-foreground">{t("governance.kybDesc")}</p></div><Switch id="sw-kyb" checked={govSettings.require_kyb} onCheckedChange={(v) => toggleGovSetting("require_kyb", v)} /></div>
            <Separator />
            <div className="flex items-center justify-between"><div className="space-y-0.5"><Label htmlFor="sw-deltadao" className="text-sm font-medium">{t("governance.deltaDAOLabel")}</Label><p className="text-xs text-muted-foreground">{t("governance.deltaDAODesc")}</p></div><Switch id="sw-deltadao" checked={govSettings.require_deltadao_onboarding} onCheckedChange={(v) => toggleGovSetting("require_deltadao_onboarding", v)} /></div>
            <Separator />
            <div className="flex items-center justify-between"><div className="space-y-0.5"><Label htmlFor="sw-ecosystem" className="text-sm font-medium">{t("governance.ecosystemStatus")}</Label><p className="text-xs text-muted-foreground">{t("governance.ecosystemStatusDesc")}</p></div>
              <Select value={govSettings.ecosystem_status} onValueChange={(v) => toggleGovSetting("ecosystem_status", v)}><SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">{t("governance.statusActive")}</SelectItem><SelectItem value="maintenance">{t("governance.statusMaintenance")}</SelectItem></SelectContent></Select>
            </div>
          </>)}
        </CardContent>
      </Card>

      {/* Asset Policies */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2"><Package className="h-5 w-5 text-primary" /><CardTitle className="text-base">{t("governance.assetPolicies")}</CardTitle></div>
          <CardDescription>{t("governance.assetPoliciesDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {govLoading ? (<div className="flex items-center justify-center py-4 text-muted-foreground text-sm"><Loader2 className="h-4 w-4 animate-spin mr-2" /> {t("governance.loadingConfig")}</div>) : (<>
            <div className="flex items-center justify-between"><div className="space-y-0.5"><Label htmlFor="sw-auto-approve" className="text-sm font-medium">{t("governance.autoApproval")}</Label><p className="text-xs text-muted-foreground">{t("governance.autoApprovalDesc")}</p></div><Switch id="sw-auto-approve" checked={govSettings.auto_approve_assets} onCheckedChange={(v) => toggleGovSetting("auto_approve_assets", v)} /></div>
            <Separator />
            <div className="flex items-center justify-between"><div className="space-y-0.5"><Label htmlFor="sel-catalog-vis" className="text-sm font-medium">{t("governance.catalogVisibility")}</Label><p className="text-xs text-muted-foreground">{t("governance.catalogVisibilityDesc")}</p></div>
              <Select value={govSettings.catalog_visibility} onValueChange={(v) => toggleGovSetting("catalog_visibility", v)}><SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="public">{t("governance.publicAll")}</SelectItem><SelectItem value="private">{t("governance.privateOnly")}</SelectItem></SelectContent></Select>
            </div>
          </>)}
        </CardContent>
      </Card>

      {/* Economic Governance */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2"><Coins className="h-5 w-5 text-primary" /><CardTitle className="text-base">{t("governance.economicGov")}</CardTitle></div>
          <CardDescription>{t("governance.economicGovDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 flex-1"><Label htmlFor="ecosystem-fee" className="text-sm font-medium">{t("governance.ecosystemFee")}</Label><p className="text-xs text-muted-foreground">{t("governance.ecosystemFeeDesc")}</p></div>
            <div className="flex items-center gap-2">
              <Input id="ecosystem-fee" type="number" min="0" max="100" step="0.1" value={ecosystemFee} onChange={(e) => setEcosystemFee(e.target.value)} className="w-[100px] text-right" />
              <span className="text-sm text-muted-foreground">%</span>
              <Button size="sm" onClick={saveEcosystemFee} disabled={feeSaving}>{feeSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}{t("governance.save")}</Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-3">{t("governance.ecosystemFeeNote")}</p>
        </CardContent>
      </Card>

      {/* Ecosystem Status */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /><CardTitle className="text-base">{t("governance.ecosystemState")}</CardTitle></div>
            <Button variant="outline" size="sm" onClick={runHealthCheck}><RefreshCw className="h-3.5 w-3.5 mr-1.5" /> {t("governance.verify")}</Button>
          </div>
          <CardDescription>{t("governance.serviceAvailability")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((svc) => (
              <div key={svc.name} className="flex items-center justify-between p-2.5 rounded-lg border bg-card">
                <div className="flex items-center gap-3"><StatusDot status={svc.status} /><div><p className="text-sm font-medium">{svc.name}</p><p className="text-xs text-muted-foreground truncate max-w-[200px]">{svc.url}</p></div></div>
                <Badge variant="outline" className={svc.status === "online" ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30" : svc.status === "offline" ? "bg-destructive/10 text-destructive border-destructive/30" : "bg-muted text-muted-foreground"}>{getServiceStatusLabel(svc.status)}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Log */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Server className="h-5 w-5 text-primary" /><CardTitle className="text-base">{t("governance.eventLog")}</CardTitle></div>
            <div className="flex items-center gap-2">
              <Select value={logVerbosity} onValueChange={saveLogVerbosity}>
                <SelectTrigger className="w-[140px] h-8 text-xs"><SelectValue placeholder="Nivel" /></SelectTrigger>
                <SelectContent><SelectItem value="basic">{t("governance.logBasic")}</SelectItem><SelectItem value="operational">{t("governance.logOperational")}</SelectItem><SelectItem value="debug">{t("governance.logDebug")}</SelectItem></SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={exportLogs}><Download className="h-3.5 w-3.5 mr-1.5" /> {t("governance.export")}</Button>
              <Button variant="outline" size="sm" onClick={fetchLogs} disabled={logsLoading}><RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${logsLoading ? "animate-spin" : ""}`} /> {t("governance.refresh")}</Button>
            </div>
          </div>
          <CardDescription>
            {t("governance.eventLogDesc")}
            {logVerbosity === "basic" && ` · ${t("governance.logBasicDesc")}`}
            {logVerbosity === "operational" && ` · ${t("governance.logOperationalDesc")}`}
            {logVerbosity === "debug" && ` · ${t("governance.logDebugDesc")}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[260px]">
            {logsLoading && logs.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm"><Loader2 className="h-4 w-4 animate-spin mr-2" /> {t("governance.loadingLogs")}</div>
            ) : logs.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">{t("governance.noLogs")}</div>
            ) : (
              <div className="space-y-1 font-mono text-xs">
                {logs.filter((evt) => { if (logVerbosity === "debug") return true; if (logVerbosity === "operational") return evt.level !== "debug"; return evt.level === "error"; }).map((evt) => (
                  <div key={evt.id} className={`flex gap-3 px-2 py-1.5 rounded ${evt.level === "error" ? "bg-destructive/10 text-destructive" : evt.level === "warn" ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" : "text-muted-foreground"}`}>
                    <span className="shrink-0 tabular-nums">{new Date(evt.created_at).toLocaleString(i18n.language, { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                    <Badge variant="outline" className="h-5 text-[10px] uppercase shrink-0">{evt.level}</Badge>
                    <span className="break-all">{evt.message}</span>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default AdminGovernance;
