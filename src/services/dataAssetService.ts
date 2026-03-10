import { api } from "./api";

// --- Source ---

export interface UrlSource {
  type: "url";
  url: string;
  method: string;
  query_params?: Record<string, string>;
  headers?: Record<string, string>;
}

export interface IpfsSource {
  type: "ipfs";
  cid: string;
}

export type DataAssetSource = UrlSource | IpfsSource;

// --- Pricing ---

export type PricingType = "free" | "paid";

export interface DataAssetPricing {
  type: PricingType;
  price: string;
  token_address?: string;
}

// --- Access Config ---

export interface DataAssetAccessConfig {
  allowed_addresses?: string[];
  denied_addresses?: string[];
  timeout?: number;
}

// --- Consumer Parameters ---

export type ConsumerParameterType = "text" | "number" | "boolean" | "select";

export interface ConsumerParameter {
  name: string;
  type: ConsumerParameterType;
  label: string;
  description: string;
  required: boolean;
  default?: string;
  options?: string[];
}

// --- Request Body ---

export interface CreateDataAssetRequest {
  source: DataAssetSource;
  name: string;
  license: string;
  author: string;
  description: string;
  pricing: DataAssetPricing;
  access_config: DataAssetAccessConfig;
  consumer_parameters: ConsumerParameter[];
  usage_terms: string;
  requested_by_wallet_uuid: string;
}

// --- Response ---

export interface DataAssetCreated {
  uuid: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface CreateDataAssetResponse {
  message: string;
  data: DataAssetCreated;
}

// --- Service ---

export const dataAssetService = {
  create: (
    organizationUuid: string,
    data: CreateDataAssetRequest,
  ): Promise<CreateDataAssetResponse> =>
    api.post<CreateDataAssetResponse>(
      `/organizations/${organizationUuid}/data-assets`,
      data,
    ),
};
