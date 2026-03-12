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

/** User found by email for invitation (GET /organizations/:id/invitations/search-user) */
export interface InvitationSearchUserProfile {
  uuid: string;
  user_uuid: string;
  first_name: string;
  last_name: string;
  nationality: string | null;
  country: string;
  ip_country: string;
  city: string | null;
  address: string | null;
  id_number: string;
  postal_code: string | null;
  phone_number: string | null;
  birthdate: string;
  kyc_verified_at: string | null;
  gender: string;
  language: string | null;
  created_at: string;
  updated_at: string;
  primary_wallet_address: string | null;
  primary_wallet: string | null;
}

export interface InvitationSearchUser {
  uuid: string;
  email: string;
  name: string;
  profile: InvitationSearchUserProfile;
}

export interface SearchUserForInvitationResponse {
  data: InvitationSearchUser | null;
  message?: string;
}

/** Payload for POST /organizations/:id/invitations */
export interface CreateInvitationPayload {
  invited_user_uuid: string;
  role_slug: string;
  message?: string;
}

export interface CreateInvitationResponse {
  message: string;
  data: {
    uuid: string;
    organization_uuid: string;
    invited_by_user_uuid: string;
    invited_user_uuid: string;
    role_uuid: string;
    status: string;
    message: string | null;
    created_at: string;
    updated_at: string;
  };
}

/** Invitation from GET /organizations/:id/invitations */
export interface OrgInvitationProfile {
  uuid: string;
  user_uuid: string;
  first_name: string;
  last_name: string;
  nationality: string | null;
  country: string;
  ip_country: string;
  city: string | null;
  address: string | null;
  id_number: string;
  postal_code: string | null;
  phone_number: string | null;
  birthdate: string;
  kyc_verified_at: string | null;
  gender: string;
  language: string | null;
  created_at: string;
  updated_at: string;
  primary_wallet_address: string | null;
  primary_wallet: string | null;
}

export interface OrgInvitationInvitedUser {
  uuid: string;
  email: string;
  profile: OrgInvitationProfile | null;
  wallet_address: string | null;
}

export interface OrgInvitationRole {
  uuid: string;
  slug: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationInvitation {
  uuid: string;
  organization_uuid: string;
  invited_by_user_uuid: string;
  invited_user_uuid: string;
  role_uuid: string;
  status: "pending" | "cancelled" | "accepted" | "rejected";
  message: string | null;
  expires_at: string | null;
  responded_at: string | null;
  created_at: string;
  updated_at: string;
  role: OrgInvitationRole;
  invitedUser: OrgInvitationInvitedUser;
  invitedBy: { uuid: string; email: string; profile: OrgInvitationProfile | null; wallet_address: string | null };
}

export interface GetInvitationsResponse {
  data: OrganizationInvitation[];
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

  searchUserForInvitation: (
    organizationId: string,
    email: string,
  ): Promise<SearchUserForInvitationResponse> =>
    api.get<SearchUserForInvitationResponse>(
      `/organizations/${organizationId}/invitations/search-user?email=${encodeURIComponent(email)}`,
    ),

  createInvitation: (
    organizationId: string,
    payload: CreateInvitationPayload,
  ): Promise<CreateInvitationResponse> =>
    api.post<CreateInvitationResponse>(
      `/organizations/${organizationId}/invitations`,
      payload,
    ),

  getInvitations: (organizationId: string): Promise<GetInvitationsResponse> =>
    api.get<GetInvitationsResponse>(
      `/organizations/${organizationId}/invitations`,
    ),
};
