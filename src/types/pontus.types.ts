// src/types/pontus.types.ts
// Tipos específicos para PONTUS-X / Ocean Protocol

// === DDO (Decentralized Data Object) ===

export interface DDO {
  "@context": string[];
  id: string;                    // did:op:0x...
  version: string;               // "4.1.0"
  chainId: number;               // 137 para Polygon, 32460 para Pontus-X
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
  categories?: string[];
  links?: DDOLink[];
  additionalInformation?: {
    gaiaXCompliance?: GaiaXCompliance;
    updateFrequency?: string;
    [key: string]: unknown;
  };
}

export interface GaiaXCompliance {
  serviceOfferingSD: string;     // URL al registro Gaia-X
  participantSD: string;         // URL identidad legal
  complianceLevel: 'Level 1' | 'Level 2' | 'Level 3';
  dataSovereignty: 'EU-Only Storage' | 'GDPR Compliant' | 'Unrestricted';
}

export interface DDOLink {
  name: string;
  type: 'sample' | 'documentation' | 'api';
  url: string;
}

export interface DDOService {
  id: string;
  type: 'access' | 'compute';
  name: string;
  description?: string;
  files: string;                 // URL cifrada (hex)
  datatokenAddress: string;
  serviceEndpoint: string;
  timeout: number;
  consumerParameters?: ConsumerParameter[];
  compute?: ComputeConfig;
}

export interface ConsumerParameter {
  name: string;
  type: 'text' | 'number' | 'select';
  label: string;
  required: boolean;
  default: string;
  options?: string[];
}

export interface ComputeConfig {
  allowNetworkAccess: boolean;
  allowRawAlgorithm: boolean;
  publisherTrustedAlgorithmPublishers?: string[];
}

export interface DDOCredentials {
  allow?: CredentialRule[];
  deny?: CredentialRule[];
}

export interface CredentialRule {
  type: string;                  // "GaiaXVerifiableCredential"
  values: string[];              // ["VerifiedPartner"]
}

// === Estados de Transacción ===

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
  fileType?: string;
}

// === Parámetros de Publicación ===

export interface PublishAssetParams {
  name: string;
  description: string;
  author: string;
  license: string;
  tags: string[];
  fileUrl: string;
  serviceType: 'access' | 'compute';
  price: number;
  timeout?: number;
  gaiaXCompliance?: GaiaXCompliance;
  credentials?: DDOCredentials;
}

export interface PublishResult {
  success: boolean;
  did: string;
  nftAddress: string;
  datatokenAddress: string;
  txHash: string;
  explorerUrl: string;
}

export interface PublishState {
  status: 'idle' | 'encrypting' | 'creating-nft' | 'creating-datatoken' | 'publishing' | 'completed' | 'error';
  progress: number;
  txHash: string | null;
  did: string | null;
  errorMessage: string | null;
}

// === Balance y Aprobaciones ===

export interface BalanceCheck {
  sufficient: boolean;
  currentBalance: string;
  requiredAmount: number;
  token: string;
}

export interface ApprovalState {
  isApproved: boolean;
  currentAllowance: string;
  requiredAmount: string;
}
