import { api } from "./api";

export interface WalletData {
  uuid: string;
  address: string;
  provider: string;
  wallet_mode: string;
  public_key: string;
  kms_key_id: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  is_primary: boolean;
}

export interface PaginationMeta {
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

export interface WalletsResponse {
  meta: PaginationMeta;
  data: WalletData[];
}

export interface TokenBalance {
  type: string;
  symbol: string;
  amount: string;
  decimals: string | number;
  contractAddress: string | null;
}

export interface WalletBalance {
  address: string;
  network: string;
  chainId: string;
  balances: TokenBalance[];
}

export interface WalletBalanceResponse {
  balance: WalletBalance;
}

export const walletService = {
  getWallets: (page = 1): Promise<WalletsResponse> =>
    api.get<WalletsResponse>(`/profile/wallets?page=${page}`),

  getBalance: (): Promise<WalletBalanceResponse> =>
    api.get<WalletBalanceResponse>("/profile/wallets/balance"),

  getWalletBalance: (walletUuid: string): Promise<WalletBalanceResponse> =>
    api.get<WalletBalanceResponse>(
      `/profile/wallets/balance?wallet_uuid=${walletUuid}`,
    ),

  getOrganizationWalletBalance: (
    organizationUuid: string,
  ): Promise<WalletBalanceResponse> =>
    api.get<WalletBalanceResponse>(
      `/organizations/${organizationUuid}/wallets/balance`,
    ),
};
