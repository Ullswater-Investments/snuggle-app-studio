import { useState } from "react";
import {
  Eye,
  Download,
  BrainCircuit,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { PONTUSX_NETWORK_CONFIG } from "@/services/pontusX";

type LineageAction = "CONSENT_GRANT" | "DATA_ACCESS" | "AI_ANALYSIS" | "DATA_EXPORT" | "BLOCKED";

interface LineageEvent {
  id: number;
  action: LineageAction;
  actor: string;
  did: string;
  resource: string;
  timestamp: string;
  txHash: string;
  status: "verified" | "pending" | "failed";
}

// Mock data for demo purposes
const MOCK_EVENTS: LineageEvent[] = [
  {
    id: 1,
    action: "CONSENT_GRANT",
    actor: "Tu Wallet Principal",
    did: "did:ethr:0x7ecc...99a1",
    resource: "Permiso de Acceso General",
    timestamp: "Hace 5 minutos",
    txHash: "0xa1b2c3d4e5f67890abcdef1234567890abcdef12",
    status: "verified",
  },
  {
    id: 2,
    action: "DATA_ACCESS",
    actor: "Hospital General Universitario",
    did: "did:ethr:0x7ecc...33b2",
    resource: "Resultados Analítica Sangre",
    timestamp: "Hoy, 10:30 AM",
    txHash: "0x9876543210fedcba09876543210fedcba09876543",
    status: "verified",
  },
  {
    id: 3,
    action: "AI_ANALYSIS",
    actor: "MediBot AI Diagnostic",
    did: "did:ethr:0x7ecc...ff00",
    resource: "Radiografía Tórax",
    timestamp: "Ayer, 18:45 PM",
    txHash: "0x11223344556677889900aabbccddeeff11223344",
    status: "verified",
  },
  {
    id: 4,
    action: "DATA_EXPORT",
    actor: "Laboratorio Central",
    did: "did:ethr:0x7ecc...aa55",
    resource: "Informe Completo Q4",
    timestamp: "Hace 3 días",
    txHash: "0xaabbccdd11223344556677889900aabbccdd1122",
    status: "verified",
  },
];

const ACTION_CONFIG: Record<
  LineageAction,
  { icon: typeof Eye; label: string; color: string }
> = {
  CONSENT_GRANT: {
    icon: ShieldCheck,
    label: "Consentimiento",
    color: "text-green-500",
  },
  DATA_ACCESS: {
    icon: Eye,
    label: "Acceso",
    color: "text-blue-500",
  },
  AI_ANALYSIS: {
    icon: BrainCircuit,
    label: "Análisis IA",
    color: "text-purple-500",
  },
  DATA_EXPORT: {
    icon: Download,
    label: "Exportación",
    color: "text-amber-500",
  },
  BLOCKED: {
    icon: ShieldAlert,
    label: "Bloqueado",
    color: "text-destructive",
  },
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
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Trazabilidad de Datos (Pontus-X)
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge
              variant={integrityPercentage === 100 ? "default" : "secondary"}
              className={
                integrityPercentage === 100
                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                  : ""
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
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />

            {/* Events */}
            <div className="space-y-6">
              {events.map((event) => {
                const config = ACTION_CONFIG[event.action];
                const Icon = config.icon;

                return (
                  <div key={event.id} className="relative pl-8">
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center ${config.color}`}
                    >
                      <Icon className="h-3 w-3" />
                    </div>

                    {/* Event content */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {config.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {event.timestamp}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium text-sm">{event.actor}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {event.did}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {event.resource}
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 font-mono text-xs bg-muted hover:bg-muted/80"
                          onClick={() => copyToClipboard(event.txHash)}
                        >
                          {copiedHash === event.txHash ? (
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3 mr-1" />
                          )}
                          Tx: {truncateHash(event.txHash)}
                        </Button>
                        {event.status === "verified" && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-green-500/10 text-green-600 border-green-500/20"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DataLineageBlockchain;
