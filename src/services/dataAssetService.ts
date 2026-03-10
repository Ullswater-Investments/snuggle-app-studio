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

// --- List Response ---

export interface DataAssetListItem {
  uuid: string;
  name: string;
  did: string | null;
  status: string;
  pricing_type: string;
  price: string;
  description?: string;
  created_at: string;
  updated_at: string;
  onchain_error?: string | null;
  [key: string]: unknown;
}

export interface ListDataAssetsMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  previous_page_url: string | null;
}

export interface ListDataAssetsResponse {
  meta: ListDataAssetsMeta;
  data: DataAssetListItem[];
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

  list: (
    organizationUuid: string,
    page = 1,
  ): Promise<ListDataAssetsResponse> =>
    api.get<ListDataAssetsResponse>(
      `/organizations/${organizationUuid}/data-assets?page=${page}`,
    ),

  /** Global catalog: published data assets (no org scope) */
  listCatalog: (
    page = 1,
    status = "published",
  ): Promise<ListDataAssetsResponse> =>
    api.get<ListDataAssetsResponse>(
      `/data-assets?page=${page}&status=${status}`,
    ),
};
