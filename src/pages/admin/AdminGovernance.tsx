import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Fingerprint,
  Globe,
  Database,
  Activity,
  Copy,
  ExternalLink,
  Shield,
  Server,
  Link2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { PONTUSX_NETWORK_CONFIG } from "@/services/pontusX";
import { oceanConfig, oceanContracts } from "@/lib/oceanConfig";

// --- Types ---
interface ServiceStatus {
  name: string;
  url: string;
  status: "online" | "offline" | "checking";
}

// --- Helpers ---
const truncate = (s: string) => `${s.slice(0, 14)}…${s.slice(-10)}`;
const copy = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copiado", { description: `${label} copiado al portapapeles` });
};

const StatusDot = ({ status }: { status: ServiceStatus["status"] }) => {
  if (status === "checking") return <Clock className="h-4 w-4 text-muted-foreground animate-spin" />;
  if (status === "online") return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  return <XCircle className="h-4 w-4 text-destructive" />;
};

// --- Mock ecosystem event log ---
const ecosystemEvents = [
  { ts: "2026-02-09 21:30:12", level: "info", message: "Blockchain heartbeat OK — bloque #4.812.331" },
  { ts: "2026-02-09 21:28:45", level: "info", message: "API Gateway respondió en 42 ms" },
  { ts: "2026-02-09 21:25:00", level: "warn", message: "Identity Provider: latencia elevada (320 ms)" },
  { ts: "2026-02-09 21:20:10", level: "info", message: "Provider endpoint healthy" },
  { ts: "2026-02-09 21:15:33", level: "info", message: "Aquarius metadata index sync completado" },
  { ts: "2026-02-09 21:10:01", level: "error", message: "Dispenser contract sin fondos — recargar" },
  { ts: "2026-02-09 21:05:22", level: "info", message: "Smart contract FixedRateExchange operativo" },
];

const DID = "did:web:procuredata.eu";

const AdminGovernance = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "Blockchain (Pontus-X)", url: oceanConfig.nodeUri, status: "checking" },
    { name: "API Gateway (Aquarius)", url: oceanConfig.aquariusUrl, status: "checking" },
    { name: "Provider de Datos", url: oceanConfig.providerUrl, status: "checking" },
    { name: "Identity Provider", url: "https://identity.pontus-x.eu", status: "checking" },
  ]);

  const runHealthCheck = () => {
    setServices((prev) => prev.map((s) => ({ ...s, status: "checking" as const })));
    // Simulate async health check
    setTimeout(() => {
      setServices((prev) =>
        prev.map((s) => ({
          ...s,
          status: Math.random() > 0.15 ? ("online" as const) : ("offline" as const),
        }))
      );
    }, 1200);
  };

  useEffect(() => {
    runHealthCheck();
  }, []);

  const explorerBase = PONTUSX_NETWORK_CONFIG.blockExplorerUrls?.[0] || "https://explorer.pontus-x.eu/";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gobernanza del Ecosistema</h1>
        <p className="text-muted-foreground">
          Configuración de identidad, protocolos y servicios de la red PROCUREDATA
        </p>
      </div>

      {/* Row 1 — Identity + Protocol */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Block 1: Identidad del Espacio */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Identidad del Espacio (DID)</CardTitle>
            </div>
            <CardDescription>
              Identificador Descentralizado que representa a PROCUREDATA ante la red federada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <code className="text-sm font-mono break-all">{DID}</code>
              <Button variant="ghost" size="icon" className="shrink-0 ml-2" onClick={() => copy(DID, "DID")}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30">
                <Shield className="h-3 w-3 mr-1" /> Verificado GAIA-X
              </Badge>
              <Badge variant="outline">Nivel 2</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              La identidad está registrada en el Trust Framework de GAIA-X y es verificable públicamente por cualquier participante del ecosistema Pontus-X.
            </p>
          </CardContent>
        </Card>

        {/* Block 2: Protocolo Pontus-X */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Protocolo Pontus-X</CardTitle>
            </div>
            <CardDescription>Red blockchain, RPC y contratos de gobernanza</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Red</span>
                <span className="font-medium">{PONTUSX_NETWORK_CONFIG.chainName}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Chain ID</span>
                <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{oceanConfig.chainId}</code>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">RPC</span>
                <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded truncate max-w-[200px]">{oceanConfig.nodeUri}</code>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Token nativo</span>
                <span>{PONTUSX_NETWORK_CONFIG.nativeCurrency.symbol}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Contratos de Gobernanza</p>
              {[
                { label: "NFT Factory", addr: oceanContracts.nftFactory },
                { label: "Fixed Rate Exchange", addr: oceanContracts.fixedRateExchange },
                { label: "Dispenser", addr: oceanContracts.dispenser },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between text-xs">
                  <span>{c.label}</span>
                  <div className="flex items-center gap-1">
                    <code className="font-mono bg-muted px-1.5 py-0.5 rounded">{truncate(c.addr)}</code>
                    <a
                      href={`${explorerBase}address/${c.addr}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 — Data Services + Health */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Block 3: Servicios de Datos */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Servicios de Datos</CardTitle>
            </div>
            <CardDescription>Provider, indexador y almacenamiento del ecosistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Provider (Ocean)", url: oceanConfig.providerUrl, desc: "Componente que sirve los datos bajo control de acceso tokenizado." },
              { label: "Aquarius (Indexador)", url: oceanConfig.aquariusUrl, desc: "Indexa metadatos DDO de todos los activos publicados." },
              { label: "Explorer", url: oceanConfig.explorerUrl, desc: "Explorador de bloques para verificación de transacciones on-chain." },
            ].map((svc) => (
              <div key={svc.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{svc.label}</span>
                  <a
                    href={svc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    {svc.url.replace(/https?:\/\//, "").slice(0, 30)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">{svc.desc}</p>
                {svc.label !== "Explorer" && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Block 4: Health Check */}
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
            <div className="space-y-3">
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
      </div>

      {/* Row 3 — Ecosystem Event Log */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Registro de Eventos del Ecosistema</CardTitle>
          </div>
          <CardDescription>Últimos eventos de los servicios de red federados</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[260px]">
            <div className="space-y-1 font-mono text-xs">
              {ecosystemEvents.map((evt, i) => (
                <div
                  key={i}
                  className={`flex gap-3 px-2 py-1.5 rounded ${
                    evt.level === "error"
                      ? "bg-destructive/10 text-destructive"
                      : evt.level === "warn"
                      ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="shrink-0 tabular-nums">{evt.ts}</span>
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
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGovernance;
