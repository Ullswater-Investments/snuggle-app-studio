import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Activity,
  Shield,
  Server,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Loader2,
  Network,
  Package,
  Coins,
  AlertTriangle,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { PONTUSX_NETWORK_CONFIG } from "@/services/pontusX";
import { oceanConfig } from "@/lib/oceanConfig";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";

// --- Types ---
interface ServiceStatus {
  name: string;
  url: string;
  status: "online" | "offline" | "checking";
}

interface GovernanceLog {
  id: string;
  level: string;
  category: string;
  message: string;
  actor_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// --- Network presets ---
const NETWORK_PRESETS: Record<string, { rpc: string; chainId: string; label: string }> = {
  testnet: { rpc: "https://rpc.test.pontus-x.eu", chainId: "32457", label: "Pontus-X Testnet" },
  devnet: { rpc: "https://rpc.dev.pontus-x.eu", chainId: "32456", label: "Pontus-X Devnet" },
};

// --- Helpers ---
const StatusDot = ({ status }: { status: ServiceStatus["status"] }) => {
  if (status === "checking") return <Clock className="h-4 w-4 text-muted-foreground animate-spin" />;
  if (status === "online") return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  return <XCircle className="h-4 w-4 text-destructive" />;
};



// --- Real health check with timeout ---
async function checkService(url: string, isRpc: boolean): Promise<"online" | "offline"> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    if (isRpc) {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 }),
        signal: controller.signal,
      });
      const data = await res.json();
      return data.result ? "online" : "offline";
    } else {
      const res = await fetch(url, { method: "HEAD", signal: controller.signal, mode: "no-cors" });
      // no-cors returns opaque response (status 0) which still means the server responded
      return "online";
    }
  } catch {
    return "offline";
  } finally {
    clearTimeout(timeout);
  }
}

const AdminGovernance = () => {
  const queryClient = useQueryClient();

  // --- Identity / Governance switches ---
  const [govSettings, setGovSettings] = useState({
    require_email_verification: false,
    require_kyc: false,
    require_kyb: false,
    require_deltadao_onboarding: true,
    ecosystem_status: "active" as "active" | "maintenance",
    auto_approve_assets: true,
    catalog_visibility: "public" as "public" | "private",
    maintenance_mode: false,
  });
  // --- Ecosystem fee ---
  const [ecosystemFee, setEcosystemFee] = useState("2.5");
  const [feeSaving, setFeeSaving] = useState(false);
  // --- Log verbosity ---
  const [logVerbosity, setLogVerbosity] = useState<string>("operational");
  const [govLoading, setGovLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("system_settings")
        .select("key, value")
        .in("key", ["require_email_verification", "require_kyc", "require_kyb", "require_deltadao_onboarding", "ecosystem_status", "auto_approve_assets", "catalog_visibility", "ecosystem_fee_percentage", "maintenance_mode", "log_verbosity"]);
      if (data) {
        const map: Record<string, string> = {};
        for (const r of data) map[r.key] = r.value;
        setGovSettings({
          require_email_verification: map.require_email_verification === "true",
          require_kyc: map.require_kyc === "true",
          require_kyb: map.require_kyb === "true",
          require_deltadao_onboarding: map.require_deltadao_onboarding !== "false",
          ecosystem_status: (map.ecosystem_status as "active" | "maintenance") ?? "active",
          auto_approve_assets: map.auto_approve_assets !== "false",
          catalog_visibility: (map.catalog_visibility as "public" | "private") ?? "public",
          maintenance_mode: map.maintenance_mode === "true",
        });
        if (map.ecosystem_fee_percentage) setEcosystemFee(map.ecosystem_fee_percentage);
        if (map.log_verbosity) setLogVerbosity(map.log_verbosity);
      }
      setGovLoading(false);
    };
    load();
  }, []);

  const toggleGovSetting = async (key: string, newValue: boolean | string) => {
    const strValue = typeof newValue === "boolean" ? (newValue ? "true" : "false") : newValue;
    const { error } = await supabase
      .from("system_settings")
      .update({ value: strValue, updated_at: new Date().toISOString() })
      .eq("key", key);

    if (error) {
      toast.error("Error actualizando configuración");
      return;
    }

    // Update local state
    setGovSettings((prev) => ({
      ...prev,
      [key]: typeof newValue === "boolean" ? newValue : newValue,
    }));

    // Log the change
    const labels: Record<string, string> = {
      require_email_verification: "Verificación de Email",
      require_kyc: "KYC (Persona Física)",
      require_kyb: "KYB (Empresa)",
      require_deltadao_onboarding: "Requisito de Onboarding DeltaDAO",
      ecosystem_status: "Estado del Ecosistema",
      auto_approve_assets: "Aprobación Automática de Activos",
      catalog_visibility: "Visibilidad del Catálogo",
      maintenance_mode: "Modo Mantenimiento Global",
    };
    await (supabase as any).from("governance_logs").insert({
      level: "info",
      category: "config_change",
      message: `${labels[key] ?? key} ${typeof newValue === "boolean" ? (newValue ? "activado" : "desactivado") : `cambiado a "${newValue}"`}`,
    });

    // Invalidate governance-settings cache so other pages pick up changes
    queryClient.invalidateQueries({ queryKey: ["governance-settings"] });
    toast.success(`${labels[key]} actualizado`);
    fetchLogs();
  };

  // --- Ecosystem Fee save ---
  const saveEcosystemFee = async () => {
    const numVal = parseFloat(ecosystemFee);
    if (isNaN(numVal) || numVal < 0 || numVal > 100) {
      toast.error("El porcentaje debe estar entre 0 y 100");
      return;
    }
    setFeeSaving(true);
    const { error } = await supabase
      .from("system_settings")
      .update({ value: numVal.toString(), updated_at: new Date().toISOString() })
      .eq("key", "ecosystem_fee_percentage");
    if (error) {
      toast.error("Error guardando comisión");
    } else {
      await (supabase as any).from("governance_logs").insert({
        level: "info",
        category: "config_change",
        message: `Comisión del Ecosistema actualizada a ${numVal}%`,
      });
      queryClient.invalidateQueries({ queryKey: ["governance-settings"] });
      toast.success("Comisión del ecosistema actualizada");
      fetchLogs();
    }
    setFeeSaving(false);
  };

  // --- Log Verbosity save ---
  const saveLogVerbosity = async (newLevel: string) => {
    setLogVerbosity(newLevel);
    const { error } = await supabase
      .from("system_settings")
      .update({ value: newLevel, updated_at: new Date().toISOString() })
      .eq("key", "log_verbosity");
    if (!error) {
      await (supabase as any).from("governance_logs").insert({
        level: "info",
        category: "config_change",
        message: `Nivel de detalle de logs cambiado a "${newLevel}"`,
      });
      queryClient.invalidateQueries({ queryKey: ["governance-settings"] });
      toast.success("Nivel de detalle actualizado");
      fetchLogs();
    } else {
      toast.error("Error guardando nivel de detalle");
    }
  };

  // --- Export logs ---
  const exportLogs = async () => {
    const { data, error } = await (supabase as any)
      .from("governance_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error || !data || data.length === 0) {
      toast.error("No hay registros para exportar");
      return;
    }
    const header = "Fecha,Nivel,Categoría,Mensaje\n";
    const rows = data.map((r: GovernanceLog) => {
      const date = new Date(r.created_at).toLocaleString("es-ES");
      const msg = r.message.replace(/"/g, '""');
      return `"${date}","${r.level.toUpperCase()}","${r.category}","${msg}"`;
    }).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `governance_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Logs exportados correctamente");
  };


  const [rpcUrl, setRpcUrl] = useState("");
  const [chainId, setChainId] = useState("32457");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("testnet");
  const [rpcLoading, setRpcLoading] = useState(true);
  const [rpcSaving, setRpcSaving] = useState(false);
  const [rpcStatus, setRpcStatus] = useState<"online" | "offline" | "checking">("checking");

  // --- Services health ---
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
    const urls = [
      { url: currentRpc, isRpc: true },
      { url: oceanConfig.aquariusUrl, isRpc: false },
      { url: oceanConfig.providerUrl, isRpc: false },
      { url: "https://identity.pontus-x.eu", isRpc: false },
    ];
    const results = await Promise.all(urls.map((u) => checkService(u.url, u.isRpc)));
    setServices((prev) => prev.map((s, i) => ({ ...s, status: results[i] })));
  }, [rpcUrl]);

  useEffect(() => {
    runHealthCheck();
  }, [runHealthCheck]);

  useEffect(() => {
    const loadRpc = async () => {
      const [rpcRes, chainRes] = await Promise.all([
        supabase.from("system_settings").select("value").eq("key", "blockchain_rpc_url").maybeSingle(),
        supabase.from("system_settings").select("value").eq("key", "blockchain_chain_id").maybeSingle(),
      ]);
      const loadedRpc = rpcRes.data?.value || "https://rpc.test.pontus-x.eu";
      const loadedChain = chainRes.data?.value || "32457";
      setRpcUrl(loadedRpc);
      setChainId(loadedChain);
      // Detect which preset matches
      const match = Object.entries(NETWORK_PRESETS).find(([, v]) => v.rpc === loadedRpc);
      setSelectedNetwork(match ? match[0] : "custom");
      setRpcLoading(false);
    };
    loadRpc();
  }, []);

  // Check RPC health when URL changes
  useEffect(() => {
    if (!rpcUrl || rpcLoading) return;
    setRpcStatus("checking");
    const controller = new AbortController();
    fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "eth_blockNumber", params: [], id: 1 }),
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((d) => setRpcStatus(d.result ? "online" : "offline"))
      .catch(() => setRpcStatus("offline"));
    return () => controller.abort();
  }, [rpcUrl, rpcLoading]);

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value);
    const preset = NETWORK_PRESETS[value];
    if (preset) {
      setRpcUrl(preset.rpc);
      setChainId(preset.chainId);
    }
  };

  const saveRpcUrl = async () => {
    setRpcSaving(true);
    const now = new Date().toISOString();

    // Upsert both settings
    const [rpcRes, chainRes] = await Promise.all([
      supabase.from("system_settings").update({ value: rpcUrl, updated_at: now }).eq("key", "blockchain_rpc_url"),
      supabase.from("system_settings").update({ value: chainId, updated_at: now }).eq("key", "blockchain_chain_id"),
    ]);

    // Log the config change
    await (supabase as any).from("governance_logs").insert({
      level: "info",
      category: "config_change",
      message: `URL del RPC actualizada a ${rpcUrl} (Chain ID: ${chainId})`,
    });

    setRpcSaving(false);
    if (rpcRes.error || chainRes.error) {
      toast.error("Error guardando configuración de red");
    } else {
      // Invalidate balance queries so Dashboard picks up new RPC
      queryClient.invalidateQueries({ queryKey: ["pontus-wallet-balance"] });
      queryClient.invalidateQueries({ queryKey: ["blockchain-activity"] });
      toast.success("Configuración de red actualizada correctamente");
      fetchLogs();
    }
  };

  // --- Governance Logs ---
  const [logs, setLogs] = useState<GovernanceLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    setLogsLoading(true);
    const { data, error } = await (supabase as any)
      .from("governance_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (!error && data) {
      setLogs(data);
    }
    setLogsLoading(false);
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  

  return (
    <div className="min-h-screen bg-muted/40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gobernanza del Ecosistema</h1>
        <p className="text-muted-foreground">
          Configuración de identidad, protocolos y servicios de la red PROCUREDATA
        </p>
      </div>

      {/* Emergency Operations Card */}
      <Card className="border-destructive/40">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-base">Operaciones de Emergencia</CardTitle>
          </div>
          <CardDescription>
            Controles críticos que afectan a toda la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {govLoading ? (
            <div className="flex items-center justify-center py-4 text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Cargando…
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sw-maintenance" className="text-sm font-medium">Modo Mantenimiento Global</Label>
                <p className="text-xs text-muted-foreground">
                  Desactiva publicaciones y transacciones. Muestra un banner persistente en toda la aplicación.
                </p>
              </div>
              <Switch
                id="sw-maintenance"
                checked={govSettings.maintenance_mode}
                onCheckedChange={(v) => toggleGovSetting("maintenance_mode", v)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blockchain RPC Config Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Configuración de Red Blockchain</CardTitle>
          </div>
          <CardDescription>
            URL del nodo RPC que utiliza toda la plataforma para conectarse a Pontus-X
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Network selector */}
          <div className="flex items-center gap-3">
            <div className="w-[220px]">
              <Select value={selectedNetwork} onValueChange={handleNetworkChange} disabled={rpcLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar red" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="testnet">Pontus-X Testnet</SelectItem>
                  <SelectItem value="devnet">Pontus-X Devnet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Input
                value={rpcUrl}
                onChange={(e) => {
                  setRpcUrl(e.target.value);
                  setSelectedNetwork("custom");
                }}
                placeholder="https://rpc.test.pontus-x.eu"
                disabled={rpcLoading}
              />
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status={rpcStatus} />
              <Badge
                variant="outline"
                className={
                  rpcStatus === "online"
                    ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                    : rpcStatus === "offline"
                    ? "bg-destructive/10 text-destructive border-destructive/30"
                    : "bg-muted text-muted-foreground"
                }
              >
                {rpcStatus === "online" ? "Conectado" : rpcStatus === "offline" ? "Sin conexión" : "Verificando…"}
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Chain ID: {chainId} · Token: {PONTUSX_NETWORK_CONFIG.nativeCurrency.symbol}
            </p>
            <Button size="sm" onClick={saveRpcUrl} disabled={rpcSaving || rpcLoading}>
              {rpcSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Guardar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Identity Configuration Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Configuración de Identidad</CardTitle>
          </div>
          <CardDescription>
            Controles de verificación exigidos a los participantes del ecosistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {govLoading ? (
            <div className="flex items-center justify-center py-4 text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Cargando configuración…
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sw-email" className="text-sm font-medium">Verificación de Email</Label>
                  <p className="text-xs text-muted-foreground">Exigir correo validado para publicar</p>
                </div>
                <Switch
                  id="sw-email"
                  checked={govSettings.require_email_verification}
                  onCheckedChange={(v) => toggleGovSetting("require_email_verification", v)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sw-kyc" className="text-sm font-medium">KYC (Persona Física)</Label>
                  <p className="text-xs text-muted-foreground">Activar validación de identidad para usuarios</p>
                </div>
                <Switch
                  id="sw-kyc"
                  checked={govSettings.require_kyc}
                  onCheckedChange={(v) => toggleGovSetting("require_kyc", v)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sw-kyb" className="text-sm font-medium">KYB (Empresa)</Label>
                  <p className="text-xs text-muted-foreground">Exigir validación registral de la organización</p>
                </div>
                <Switch
                  id="sw-kyb"
                  checked={govSettings.require_kyb}
                  onCheckedChange={(v) => toggleGovSetting("require_kyb", v)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sw-deltadao" className="text-sm font-medium">Onboarding DeltaDAO</Label>
                  <p className="text-xs text-muted-foreground">Exigir registro verificado en el portal de DeltaDAO para dar de alta la organización</p>
                </div>
                <Switch
                  id="sw-deltadao"
                  checked={govSettings.require_deltadao_onboarding}
                  onCheckedChange={(v) => toggleGovSetting("require_deltadao_onboarding", v)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sw-ecosystem" className="text-sm font-medium">Estado del Ecosistema</Label>
                  <p className="text-xs text-muted-foreground">Modo de operación de la plataforma</p>
                </div>
                <Select
                  value={govSettings.ecosystem_status}
                  onValueChange={(v) => toggleGovSetting("ecosystem_status", v)}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Asset Policies Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Políticas de Activos</CardTitle>
          </div>
          <CardDescription>
            Control de publicación y visibilidad de activos en el marketplace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {govLoading ? (
            <div className="flex items-center justify-center py-4 text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Cargando configuración…
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sw-auto-approve" className="text-sm font-medium">Aprobación Automática</Label>
                  <p className="text-xs text-muted-foreground">Publicar activos instantáneamente sin revisión</p>
                </div>
                <Switch
                  id="sw-auto-approve"
                  checked={govSettings.auto_approve_assets}
                  onCheckedChange={(v) => toggleGovSetting("auto_approve_assets", v)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sel-catalog-vis" className="text-sm font-medium">Visibilidad del Catálogo</Label>
                  <p className="text-xs text-muted-foreground">Quién puede ver los activos del marketplace</p>
                </div>
                <Select
                  value={govSettings.catalog_visibility}
                  onValueChange={(v) => toggleGovSetting("catalog_visibility", v)}
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Público (Visible para todos)</SelectItem>
                    <SelectItem value="private">Privado (Solo registrados)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Gobernanza Económica Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Gobernanza Económica</CardTitle>
          </div>
          <CardDescription>
            Configuración de comisiones y parámetros económicos del ecosistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="ecosystem-fee" className="text-sm font-medium">Comisión del Ecosistema (%)</Label>
              <p className="text-xs text-muted-foreground">
                Porcentaje aplicado a cada transacción del marketplace para el mantenimiento del ecosistema
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="ecosystem-fee"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={ecosystemFee}
                onChange={(e) => setEcosystemFee(e.target.value)}
                className="w-[100px] text-right"
              />
              <span className="text-sm text-muted-foreground">%</span>
              <Button size="sm" onClick={saveEcosystemFee} disabled={feeSaving}>
                {feeSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Guardar
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-3">
            Este valor se aplicará en el cálculo del coste total en el carrito de compra y en las liquidaciones a proveedores.
          </p>
        </CardContent>
      </Card>

      {/* Estado del Ecosistema — full width */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Estado del Ecosistema</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={runHealthCheck}>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Verificar
            </Button>
          </div>
          <CardDescription>Disponibilidad de los servicios federados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((svc) => (
              <div key={svc.name} className="flex items-center justify-between p-2.5 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <StatusDot status={svc.status} />
                  <div>
                    <p className="text-sm font-medium">{svc.name}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">{svc.url}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    svc.status === "online"
                      ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                      : svc.status === "offline"
                      ? "bg-destructive/10 text-destructive border-destructive/30"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {svc.status === "online" ? "Operativo" : svc.status === "offline" ? "Caído" : "Verificando…"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Row 3 — Dynamic Ecosystem Event Log */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Registro de Eventos del Ecosistema</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Select value={logVerbosity} onValueChange={saveLogVerbosity}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue placeholder="Nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Básico</SelectItem>
                  <SelectItem value="operational">Operativo</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={exportLogs}>
                <Download className="h-3.5 w-3.5 mr-1.5" /> Exportar
              </Button>
              <Button variant="outline" size="sm" onClick={fetchLogs} disabled={logsLoading}>
                <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${logsLoading ? "animate-spin" : ""}`} /> Refrescar
              </Button>
            </div>
          </div>
          <CardDescription>
            Últimos eventos de los servicios de red federados
            {logVerbosity === "basic" && " · Solo errores críticos"}
            {logVerbosity === "operational" && " · Errores + Registros"}
            {logVerbosity === "debug" && " · Todo el rastro del sistema"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[260px]">
            {logsLoading && logs.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Cargando registros…
              </div>
            ) : logs.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                No hay registros de eventos
              </div>
            ) : (
              <div className="space-y-1 font-mono text-xs">
                {logs
                  .filter((evt) => {
                    if (logVerbosity === "debug") return true;
                    if (logVerbosity === "operational") return evt.level !== "debug";
                    return evt.level === "error";
                  })
                  .map((evt) => (
                  <div
                    key={evt.id}
                    className={`flex gap-3 px-2 py-1.5 rounded ${
                      evt.level === "error"
                        ? "bg-destructive/10 text-destructive"
                        : evt.level === "warn"
                        ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="shrink-0 tabular-nums">
                      {new Date(evt.created_at).toLocaleString("es-ES", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                    <Badge
                      variant="outline"
                      className="h-5 text-[10px] uppercase shrink-0"
                    >
                      {evt.level}
                    </Badge>
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
