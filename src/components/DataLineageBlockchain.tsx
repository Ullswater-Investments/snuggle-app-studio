import { useState } from "react";
import {
  FileCheck,
  FileText,
  Handshake,
  ArrowRightLeft,
  ShieldOff,
  ExternalLink,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Info,
  Building2,
  Cpu,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { PONTUSX_NETWORK_CONFIG } from "@/services/pontusX";

type LineageAction =
  | "ASSET_REGISTRATION"
  | "CONTRACT_OFFER"
  | "CONTRACT_SIGNED"
  | "DATA_TRANSFER"
  | "ACCESS_REVOKED";

type ActorRole = "Provider" | "Consumer" | "System";

interface LineageEvent {
  id: number;
  action: LineageAction;
  actor: string;
  role: ActorRole;
  did: string;
  resource: string;
  detail: string;
  timestamp: string;
  txHash: string;
  blockNumber: number | null;
  status: "verified" | "pending" | "failed";
}

// ProcureData real use case: Global Retail Group accessing Titan Manufacturas Data Passport
const MOCK_EVENTS: LineageEvent[] = [
  {
    id: 1,
    action: "ASSET_REGISTRATION",
    actor: "Titan Manufacturas S.A.",
    role: "Provider",
    did: "did:ethr:pontus-x:0x71C7...a9E3",
    resource: "Certificado_Calidad_ISO9001.json",
    detail: "Hash: 0x8f3e7d2a1b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e",
    timestamp: "2025-10-14 09:30:00 UTC",
    txHash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    blockNumber: 18293,
    status: "verified",
  },
  {
    id: 2,
    action: "CONTRACT_OFFER",
    actor: "Global Retail Group",
    role: "Consumer",
    did: "did:ethr:pontus-x:0x3A9B...7F2D",
    resource: "Solicitud de acceso a Pasaporte Digital",
    detail: "Política: Solo lectura, prohibida reventa",
    timestamp: "2025-10-14 10:15:00 UTC",
    txHash: "0x3A9B5C7D8E9F0A1B2C3D4E5F6789012345678901",
    blockNumber: 18301,
    status: "verified",
  },
  {
    id: 3,
    action: "CONTRACT_SIGNED",
    actor: "Smart Contract EDC",
    role: "System",
    did: "contract:pontus-x:0x71C7...a9E3",
    resource: "DataUsageAgreement #DUA-2025-0842",
    detail: "Vigencia: 12 meses · Límite: 1000 queries/día",
    timestamp: "2025-10-14 10:18:32 UTC",
    txHash: "0x5E6F7A8B9C0D1E2F3A4B5C6D7E8F9012345678AB",
    blockNumber: 18303,
    status: "verified",
  },
  {
    id: 4,
    action: "DATA_TRANSFER",
    actor: "Eclipse Dataspace Connector",
    role: "System",
    did: "edc:pontus-x:transfer-agent",
    resource: "Intercambio de Pasaporte Digital",
    detail: "Canal seguro HTTPS (IDSA Protocol)",
    timestamp: "2025-10-14 10:20:00 UTC",
    txHash: "0x9A8B7C6D5E4F3A2B1C0D9E8F7A6B5C4D3E2F1A0B",
    blockNumber: null,
    status: "pending",
  },
];

const NETWORK_DETAILS = {
  network: "Pontus-X (Gaia-X Ecosystem)",
  standard: "ERC-721 (Data Asset Token)",
  gasFee: "0.0000 GX (Subsidiado)",
  protocol: "Eclipse Dataspace Connector v0.5",
  compliance: "IDSA Reference Architecture",
};

const ACTION_CONFIG: Record<
  LineageAction,
  { icon: typeof FileCheck; label: string; colorClass: string }
> = {
  ASSET_REGISTRATION: {
    icon: FileCheck,
    label: "Registro de Activo",
    colorClass: "text-green-500",
  },
  CONTRACT_OFFER: {
    icon: FileText,
    label: "Oferta de Contrato",
    colorClass: "text-blue-500",
  },
  CONTRACT_SIGNED: {
    icon: Handshake,
    label: "Contrato Firmado",
    colorClass: "text-emerald-500",
  },
  DATA_TRANSFER: {
    icon: ArrowRightLeft,
    label: "Transferencia EDC",
    colorClass: "text-amber-500",
  },
  ACCESS_REVOKED: {
    icon: ShieldOff,
    label: "Acceso Revocado",
    colorClass: "text-destructive",
  },
};

const ROLE_CONFIG: Record<ActorRole, { icon: typeof Building2; label: string }> = {
  Provider: { icon: Building2, label: "Proveedor" },
  Consumer: { icon: Building2, label: "Consumidor" },
  System: { icon: Cpu, label: "Sistema" },
};

const truncateHash = (hash: string) => `${hash.slice(0, 10)}...${hash.slice(-6)}`;

const DataLineageBlockchain = () => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const events = MOCK_EVENTS;

  const verifiedCount = events.filter((e) => e.status === "verified").length;
  const integrityPercentage = Math.round((verifiedCount / events.length) * 100);

  const copyToClipboard = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedHash(hash);
      toast.success("Hash copiado al portapapeles");
      setTimeout(() => setCopiedHash(null), 2000);
    } catch {
      toast.error("Error al copiar");
    }
  };

  const openExplorer = () => {
    window.open(PONTUSX_NETWORK_CONFIG.blockExplorerUrls[0], "_blank");
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Trazabilidad On-Chain
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Pontus-X · Gaia-X Ecosystem
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={integrityPercentage === 100 ? "default" : "secondary"}
              className={
                integrityPercentage === 100
                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                  : "bg-amber-500/10 text-amber-600 border-amber-500/20"
              }
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Integridad: {integrityPercentage}%
            </Badge>
            <Button variant="outline" size="sm" onClick={openExplorer}>
              <ExternalLink className="h-4 w-4 mr-1" />
              Explorer
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Network Details Panel */}
        <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Detalles de Red
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Red:</span>
              <span className="ml-1 font-mono text-foreground">{NETWORK_DETAILS.network}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Estándar:</span>
              <span className="ml-1 font-mono text-foreground">{NETWORK_DETAILS.standard}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Gas:</span>
              <span className="ml-1 font-mono text-green-600">{NETWORK_DETAILS.gasFee}</span>
            </div>
            <div className="col-span-2 md:col-span-3">
              <span className="text-muted-foreground">Protocolo:</span>
              <span className="ml-1 font-mono text-foreground">{NETWORK_DETAILS.protocol}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <ScrollArea className="h-[380px] pr-4">
          <div className="relative">
            {/* Timeline line with gradient */}
            <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-amber-500 opacity-30" />

            {/* Events */}
            <div className="space-y-5">
              {events.map((event, index) => {
                const config = ACTION_CONFIG[event.action];
                const roleConfig = ROLE_CONFIG[event.role];
                const Icon = config.icon;
                const RoleIcon = roleConfig.icon;
                const isLast = index === events.length - 1;
                const isPending = event.status === "pending";

                return (
                  <div key={event.id} className="relative pl-10">
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-0 top-2 w-8 h-8 rounded-full bg-background border-2 flex items-center justify-center transition-all ${
                        isPending
                          ? "border-amber-500/50 animate-pulse"
                          : "border-border"
                      } ${config.colorClass}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Connector line to next event */}
                    {!isLast && (
                      <div className="absolute left-[15px] top-10 bottom-0 w-0.5 bg-border" />
                    )}

                    {/* Event content */}
                    <div className="bg-card border border-border/50 rounded-lg p-4 space-y-3 hover:border-primary/30 transition-colors">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <Badge variant="outline" className={`text-xs ${config.colorClass} border-current/20 bg-current/5`}>
                            {config.label}
                          </Badge>
                          <div className="flex items-center gap-2 mt-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <RoleIcon className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{roleConfig.label}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <span className="font-semibold text-sm">{event.actor}</span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {event.timestamp}
                        </span>
                      </div>

                      {/* DID */}
                      <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                        {event.did}
                      </p>

                      {/* Resource & Detail */}
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{event.resource}</p>
                        <p className="text-xs text-muted-foreground">{event.detail}</p>
                      </div>

                      {/* Footer with hash and status */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 font-mono text-xs bg-muted/50 hover:bg-muted"
                          onClick={() => copyToClipboard(event.txHash)}
                        >
                          {copiedHash === event.txHash ? (
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3 mr-1" />
                          )}
                          Tx: {truncateHash(event.txHash)}
                        </Button>

                        <div className="flex items-center gap-2">
                          {event.blockNumber && (
                            <span className="text-xs text-muted-foreground font-mono">
                              Bloque #{event.blockNumber}
                            </span>
                          )}
                          {event.status === "verified" ? (
                            <Badge
                              variant="outline"
                              className="text-xs bg-green-500/10 text-green-600 border-green-500/20"
                            >
                              <ShieldCheck className="h-3 w-3 mr-1" />
                              Verificado
                            </Badge>
                          ) : event.status === "pending" ? (
                            <Badge
                              variant="outline"
                              className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/20 animate-pulse"
                            >
                              <ArrowRightLeft className="h-3 w-3 mr-1" />
                              En progreso
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="text-xs">
                              Fallido
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>

        {/* Compliance Footer */}
        <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3 w-3" />
          <span>Cumplimiento: {NETWORK_DETAILS.compliance}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataLineageBlockchain;
