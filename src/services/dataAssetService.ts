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

// --- Meta / Schema ---

export interface SchemaFieldMeta {
  type: string;
  field: string;
  description: string;
}

export interface OdrlPermission {
  action: string;
  "dcterms:title"?: string;
}

export interface OdrlProhibition {
  action: string;
  "dcterms:title"?: string;
}

export interface OdrlObligation {
  action: string;
  "dcterms:title"?: string;
}

export interface OdrlObject {
  "@context": (string | Record<string, string>)[];
  type: string;
  uid?: string;
  profile: string;
  permissions: OdrlPermission[];
  prohibitions: OdrlProhibition[];
  obligations: OdrlObligation[];
  duty?: unknown[];
}

export interface DataAssetMeta {
  schema?: SchemaFieldMeta[];
  odrlObject?: OdrlObject;
  termsAndConditionsUrl?: string;
  category?: string;
  language?: string;
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
  meta?: DataAssetMeta;
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

// --- Detail Response (GET /data-assets/{uuid}) ---

export interface DataAssetDetailDdo {
  id?: string;
  version?: string;
  metadata?: {
    name?: string;
    type?: string;
    author?: string;
    description?: string;
    license?: string;
  };
  [key: string]: unknown;
}

export interface DataAssetDetail {
  uuid: string;
  name: string;
  description?: string | null;
  pricing_type: string;
  price: string;
  status: string;
  publisher_info?: {
    uuid?: string;
    name?: string;
    context?: string;
  };
  ddo?: DataAssetDetailDdo;
  payment_token_symbol?: string;
  [key: string]: unknown;
}

export interface DataAssetDetailResponse {
  data: DataAssetDetail;
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

  list: (organizationUuid: string, page = 1): Promise<ListDataAssetsResponse> =>
    api.get<ListDataAssetsResponse>(
      `/organizations/${organizationUuid}/data-assets?page=${page}`,
    ),

  /** Global catalog: published data assets (no org scope) */
  listCatalog: (
    page = 1,
    status = "published",
    paginate = false,
  ): Promise<ListDataAssetsResponse> =>
    api.get<ListDataAssetsResponse>(
      `/data-assets?page=${page}&status=${status}&paginate=${paginate}`,
    ),

  /** Single asset detail by UUID */
  getById: (uuid: string): Promise<DataAssetDetailResponse> =>
    api.get<DataAssetDetailResponse>(`/data-assets/${uuid}`),
};
