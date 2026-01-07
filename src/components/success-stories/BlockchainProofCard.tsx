import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Copy, ExternalLink, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface BlockchainProofCardProps {
  hash: string;
  blockNumber: string;
  network?: string;
  verified?: boolean;
}

export const BlockchainProofCard = ({ 
  hash, 
  blockNumber, 
  network = "Pontus-X",
  verified = true 
}: BlockchainProofCardProps) => {
  const [copied, setCopied] = useState(false);
  
  const truncatedHash = `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    toast.success("Hash copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const explorerUrl = `https://explorer.pontus-x.eu/tx/${hash}`;

  return (
    <Card className="bg-slate-900/80 dark:bg-slate-950/90 border-emerald-500/20 backdrop-blur-sm p-4 min-w-[280px]">
      <div className="space-y-3">
        {/* Header with verification badge */}
        <div className="flex items-center justify-between">
          <Badge 
            variant="outline" 
            className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs font-semibold"
          >
            <ShieldCheck className="w-3 h-3 mr-1" />
            Verificado en {network}
          </Badge>
          {verified && (
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </div>

        {/* Hash display */}
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
            Transaction Hash
          </p>
          <div className="flex items-center gap-2">
            <code className="font-mono text-xs text-slate-300 bg-slate-800/50 px-2 py-1 rounded flex-1">
              {truncatedHash}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"
              onClick={handleCopy}
            >
              {copied ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>

        {/* Block number */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Bloque</span>
          <span className="font-mono text-emerald-400 font-medium">{blockNumber}</span>
        </div>

        {/* Explorer link */}
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs bg-transparent border-slate-700 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30"
          onClick={() => window.open(explorerUrl, '_blank')}
        >
          <ExternalLink className="w-3 h-3 mr-2" />
          Ver en Explorer
        </Button>
      </div>
    </Card>
  );
};

export default BlockchainProofCard;
