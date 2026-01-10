// src/components/GovernancePanel.tsx
// Panel de Gobernanza y Compliance para activos PONTUS-X

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ShieldCheck, 
  FileCode, 
  Link2, 
  ExternalLink, 
  Fingerprint,
  Scale,
  Globe,
  Lock,
  Copy
} from 'lucide-react';
import { PONTUSX_NETWORK_CONFIG } from '@/services/pontusX';
import { GaiaXBadge } from './GaiaXBadge';
import { toast } from 'sonner';

interface GovernancePanelProps {
  did: string;
  nftAddress?: string;
  datatokenAddress?: string;
  complianceLevel?: 'Level 1' | 'Level 2' | 'Level 3';
  credentials?: {
    allow?: { type: string; values: string[] }[];
    deny?: { type: string; values: string[] }[];
  };
  serviceOfferingSD?: string;
}

export function GovernancePanel({
  did,
  nftAddress = '0x1234567890abcdef1234567890abcdef12345678',
  datatokenAddress = '0xabcdef1234567890abcdef1234567890abcdef12',
  complianceLevel = 'Level 1',
  credentials,
  serviceOfferingSD
}: GovernancePanelProps) {
  const explorerBase = PONTUSX_NETWORK_CONFIG.blockExplorerUrls?.[0] || 'https://explorer.pontus-x.eu/';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado', { description: `${label} copiado al portapapeles` });
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 10)}...${addr.slice(-8)}`;

  return (
    <div className="space-y-6">
      {/* Header de Compliance */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/20">
                <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Gobernanza del Dato</CardTitle>
                <CardDescription>
                  Conformidad con el marco de confianza GAIA-X / PONTUS-X
                </CardDescription>
              </div>
            </div>
            <GaiaXBadge isVerified={true} complianceLevel={complianceLevel} />
          </div>
        </CardHeader>
      </Card>

      {/* Identificador Descentralizado */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Identificador Descentralizado (DID)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <code className="text-sm font-mono break-all">{did}</code>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 ml-2"
              onClick={() => copyToClipboard(did, 'DID')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Identificador único e inmutable registrado en la blockchain. Garantiza la trazabilidad 
            y autenticidad del activo de datos.
          </p>
        </CardContent>
      </Card>

      {/* Smart Contracts */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Smart Contracts de Control</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* NFT Address */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">NFT (Propiedad del Activo)</span>
              <a
                href={`${explorerBase}address/${nftAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                Ver en Explorer <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted rounded text-xs font-mono">
              <code>{truncateAddress(nftAddress)}</code>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(nftAddress, 'NFT Address')}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Datatoken Address */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Datatoken (Token de Acceso)</span>
              <a
                href={`${explorerBase}address/${datatokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                Ver en Explorer <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted rounded text-xs font-mono">
              <code>{truncateAddress(datatokenAddress)}</code>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(datatokenAddress, 'Datatoken Address')}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground pt-2">
            Los Smart Contracts garantizan que solo los titulares de Datatokens válidos 
            pueden acceder a los datos, con todas las transacciones auditables en la blockchain.
          </p>
        </CardContent>
      </Card>

      {/* Credenciales Requeridas */}
      {credentials && (credentials.allow?.length || credentials.deny?.length) && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Credenciales Verificables Requeridas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {credentials.allow?.map((cred, i) => (
              <div key={i} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">
                  ✓ Permitido
                </Badge>
                <span className="text-sm">{cred.type}: {cred.values.join(', ')}</span>
              </div>
            ))}
            {credentials.deny?.map((cred, i) => (
              <div key={i} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:text-red-400">
                  ✗ Denegado
                </Badge>
                <span className="text-sm">{cred.type}: {cred.values.join(', ')}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Self-Description Gaia-X */}
      {serviceOfferingSD && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Self-Description Gaia-X</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <a
              href={serviceOfferingSD}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <Globe className="h-4 w-4" />
              Ver Service Offering Self-Description
              <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer Legal */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Scale className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Marco de Confianza Europeo</p>
              <p className="text-xs text-muted-foreground">
                Este espacio de datos opera bajo el marco de confianza de <strong>GAIA-X PONTUS-X</strong>. 
                Todas las transacciones son auditables públicamente y la soberanía del dato 
                está garantizada criptográficamente mediante Smart Contracts en blockchain.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
