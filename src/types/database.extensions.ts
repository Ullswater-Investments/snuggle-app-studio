/**
 * EXTENSIONES DE TIPOS PARA LA BASE DE DATOS
 * 
 * Este archivo define interfaces TypeScript para tablas y tipos
 * que no están incluidos en los tipos auto-generados de Supabase
 * o que necesitan interfaces más específicas para el frontend.
 */

// ============= WALLET SYSTEM =============

export interface Wallet {
  id: string;
  organization_id: string;
  address: string;
  balance: number;
  currency: string;
  is_frozen: boolean;
  created_at: string;
  updated_at: string;
}

export interface WalletTransaction {
  id: string;
  from_wallet_id: string | null;
  to_wallet_id: string | null;
  amount: number;
  currency: string;
  transaction_type: string | null;
  status: string | null;
  reference_id: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
}

// ============= MARKETPLACE =============

export interface MarketplaceOpportunity {
  id: string;
  consumer_org_id: string;
  title: string;
  description: string;
  budget_range: string;
  category: string;
  status: 'open' | 'closed' | 'active';
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceListing {
  asset_id: string;
  product_id: string | null;
  product_name: string | null;
  product_description: string | null;
  category: string | null;
  version: string | null;
  provider_id: string;
  provider_name: string | null;
  seller_category: string | null;
  kyb_verified: boolean;
  pricing_model: 'free' | 'subscription' | 'one_time' | 'usage' | null;
  price: number | null;
  currency: string | null;
  billing_period: string | null;
  has_green_badge: boolean;
  energy_renewable_percent: number | null;
  reputation_score: number;
  review_count: number;
  created_at: string;
}

// ============= MESSAGING & NEGOTIATION =============

export interface TransactionMessage {
  id: string;
  transaction_id: string;
  sender_org_id: string;
  content: string;
  created_at: string;
}

export interface TransactionMessageWithSender extends TransactionMessage {
  sender: {
    name: string;
  };
}

// ============= NOTIFICATIONS =============

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string | null;
  type: 'info' | 'success' | 'warning' | 'error';
  link: string | null;
  is_read: boolean;
  created_at: string;
}

// ============= ESG & SUSTAINABILITY =============

export interface ESGReport {
  id: string;
  organization_id: string;
  report_year: number;
  scope1_total_tons: number | null;
  scope2_total_tons: number | null;
  energy_renewable_percent: number | null;
  certifications: string[];
  created_at: string;
}

// ============= VALUE SERVICES =============

export interface ValueService {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  icon_name: string | null;
  price: number | null;
  price_model: string | null;
  currency: string | null;
  features: any[] | null;
  provider_org_id: string | null;
  created_at: string;
}

// ============= REVIEWS =============

export interface OrganizationReview {
  id: string;
  transaction_id: string;
  reviewer_org_id: string;
  target_org_id: string;
  rating: number;
  comment: string | null;
  metrics: {
    data_quality?: number;
    delivery_speed?: number;
  } | null;
  created_at: string;
}

// ============= ORGANIZATION TYPES =============

export type OrganizationType = 'consumer' | 'provider' | 'data_holder';

export type SellerCategory = 'enterprise' | 'startup' | 'sme';

export interface OrganizationExtended {
  id: string;
  name: string;
  type: OrganizationType;
  tax_id: string;
  kyb_verified: boolean;
  is_demo: boolean;
  sector: string | null;
  seller_category: SellerCategory | null;
  marketplace_description: string | null;
  stripe_connect_id: string | null;
  created_at: string;
  updated_at: string;
}

// ============= DATA PAYLOADS =============

export type DataSchemaType = 
  | 'supplier_data'
  | 'esg_report'
  | 'iot_telemetry'
  | 'financial_records'
  | 'energy_metering'
  | 'supply_chain_trace'
  | 'administrative_list';

export interface DataPayload {
  id: string;
  transaction_id: string;
  schema_type: DataSchemaType;
  data_content: any; // JSONB, varies by schema_type
  created_at: string;
}

// ============= HELPER TYPES =============

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptions {
  search?: string;
  category?: string;
  sector?: string;
  priceMin?: number;
  priceMax?: number;
  verified?: boolean;
  greenBadge?: boolean;
}
