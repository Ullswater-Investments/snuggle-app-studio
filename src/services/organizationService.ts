import { api } from "./api";

export interface ImportOrganizationResponse {
  message: string;
  organization: OrganizationData;
  wallet: WalletData;
}

export interface OrganizationData {
  name: string;
  document_type: string;
  document: string;
  document_country_code: string;
  registration_number: string;
  headquarters_address: AddressDetails;
  legal_address: AddressDetails;
  external_id: string;
  created_by_user_uuid: string;
  uuid: string;
  created_at: string;
  updated_at: string;
}

export interface AddressDetails {
  country_code: string;
  street: string;
  city: string;
  postal_code: string;
}

export interface WalletData {
  address: string;
  provider: string;
  wallet_node: string;
  public_key: string | null;
  private_key: string | null;
  uuid: string;
  created_at: string;
  updated_at: string;
}

export interface GetOrganizationsResponse {
  meta: PaginationMeta;
  data: ApiOrganization[];
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

export interface ApiOrganization {
  uuid: string;
  name: string;
  document_type: string;
  document: string;
  document_country_code: string;
  registration_number: string;
  headquarters_address: AddressDetails;
  legal_address: AddressDetails;
  external_id: string;
  created_by_user_uuid: string;
  created_at: string;
  updated_at: string;
  primaryWallets: ApiWallet[];
  wallets: ApiWallet[];
  createdByUser: ApiCreatedByUser;
}
export interface ApiWallet {
  uuid: string;
  address: string;
  provider: string;
  wallet_mode: string;
  public_key: string | null;
  kms_key_id: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ApiCreatedByUser {
  uuid: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  wallet_address: string | null;
}

/** Member of an organization (from GET /organizations/:id/members) */
export interface OrgMemberUserProfile {
  first_name: string;
  last_name: string;
}

export interface OrgMemberUser {
  uuid: string;
  email: string;
  profile: OrgMemberUserProfile;
}

export interface OrgMemberRole {
  uuid: string;
  slug: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  uuid: string;
  user_uuid: string;
  role_uuid: string;
  joined_at: string;
  user: OrgMemberUser;
  role: OrgMemberRole;
  roles: OrgMemberRole[];
  extraPermissions: unknown[];
}

export interface GetMembersResponse {
  data: OrganizationMember[];
}

export const organizationService = {
  importOrganization: (
    walletFile: File,
    password: string,
  ): Promise<ImportOrganizationResponse> => {
    const formData = new FormData();
    formData.append("wallet", walletFile);
    formData.append("password", password);
    return api.upload<ImportOrganizationResponse>(
      "/organizations/import",
      formData,
    );
  },

  getOrganizations: (
    page = 1,
    perPage = 15,
  ): Promise<GetOrganizationsResponse> =>
    api.get<GetOrganizationsResponse>(
      `/organizations?page=${page}&per_page=${perPage}`,
    ),

  getMembers: (organizationId: string): Promise<GetMembersResponse> =>
    api.get<GetMembersResponse>(`/organizations/${organizationId}/members`),
};
