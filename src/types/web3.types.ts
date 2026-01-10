// src/types/web3.types.ts

export interface DecentralizedIdentifier {
  did: string;           // Formato: did:ethr:0x7ecc:0x...
  address: string;       // Dirección Ethereum 0x...
  chainId: string;       // Chain ID en Hex (ej: 0x7ecc)
  verified: boolean;     // Estado de verificación local
}

export interface WalletState {
  address: string | null;
  chainId: string | null;
  balance: string | null;      // Balance nativo (ej: GX)
  euroeBalance: string | null; // Balance del token EUROe
  did: string | null;
  isConnected: boolean;
}

export interface VerifiableCredential {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: {
    id: string;
    [key: string]: unknown;
  };
  proof?: {
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    proofValue: string;
  };
}

export interface LineageEvent {
  id: string;
  date: string;
  actor: string;
  did: string;
  action: 'READ' | 'EXPORT' | 'PROCESS' | 'MODIFY';
  resource: string;
  hash: string;
  status: 'verified' | 'warning' | 'pending';
}

// === Interfaces DDO (Ocean Protocol / PONTUS-X) ===

export interface DDO {
  "@context": string[];
  id: string;                    // did:op:0x...
  version: string;
  chainId: number;
  nftAddress: string;
  metadata: DDOMetadata;
  services: DDOService[];
  credentials?: DDOCredentials;
}

export interface DDOMetadata {
  created: string;
  updated: string;
  type: 'dataset' | 'algorithm' | 'compute';
  name: string;
  description: string;
  author: string;
  license: string;
  tags: string[];
  additionalInformation?: {
    gaiaXCompliance?: GaiaXCompliance;
    [key: string]: unknown;
  };
}

export interface GaiaXCompliance {
  serviceOfferingSD: string;
  participantSD: string;
  complianceLevel: 'Level 1' | 'Level 2' | 'Level 3';
  dataSovereignty: string;
}

export interface DDOService {
  id: string;
  type: 'access' | 'compute';
  name: string;
  files: string;                 // URL cifrada
  datatokenAddress: string;
  serviceEndpoint: string;
  timeout: number;
}

export interface DDOCredentials {
  allow?: { type: string; values: string[]; }[];
  deny?: { type: string; values: string[]; }[];
}

// === Estados de Transacción Web3 ===

export interface OrderState {
  status: 'idle' | 'approving' | 'ordering' | 'consuming' | 'completed' | 'error';
  txHash: string | null;
  downloadUrl: string | null;
  errorMessage: string | null;
}

export interface PurchaseResult {
  success: boolean;
  orderTxId: string;
  datatokenTxId: string;
  blockNumber: number;
  explorerUrl: string;
}

export interface ConsumeResult {
  success: boolean;
  downloadUrl: string;
  expiresAt: Date;
}

// Extensión del objeto Window para inyección de wallets (MetaMask, Rabby, etc.)
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}
