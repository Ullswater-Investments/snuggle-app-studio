import { api } from "./api";

/** Address used in organization (headquarters, legal) */
export interface InvitationAddress {
  city: string;
  street: string;
  postal_code: string;
  country_code: string;
}

/** Organization nested in invitation */
export interface InvitationOrganization {
  uuid: string;
  name: string;
  document_type: string;
  document: string;
  document_country_code: string;
  registration_number: string;
  headquarters_address: InvitationAddress;
  legal_address: InvitationAddress;
  external_id: string;
  created_by_user_uuid: string;
  created_at: string;
  updated_at: string;
}

/** Role nested in invitation */
export interface InvitationRole {
  uuid: string;
  slug: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

/** User profile nested in invitedBy */
export interface InvitationUserProfile {
  uuid: string;
  user_uuid: string;
  first_name: string;
  last_name: string;
  nationality: string | null;
  country: string;
  ip_country: string;
  city: string | null;
  address: string | null;
  id_number: string | null;
  postal_code: string | null;
  phone_number: string | null;
  birthdate: string | null;
  kyc_verified_at: string | null;
  gender: string | null;
  language: string | null;
  created_at: string;
  updated_at: string;
  primary_wallet_address: string | null;
  primary_wallet: unknown | null;
}

/** User who sent the invitation */
export interface InvitationInvitedBy {
  uuid: string;
  email: string;
  profile: InvitationUserProfile;
  wallet_address: string | null;
}

export interface PendingInvitation {
  uuid: string;
  organization_uuid: string;
  invited_by_user_uuid: string;
  invited_user_uuid: string;
  role_uuid: string;
  status: string;
  message: string | null;
  expires_at: string | null;
  responded_at: string | null;
  created_at: string;
  updated_at: string;
  organization: InvitationOrganization;
  role: InvitationRole;
  invitedBy: InvitationInvitedBy;
}

export interface PendingInvitationsResponse {
  data: PendingInvitation[];
}

/** Response from accept invitation endpoint */
export interface AcceptInvitationResponse {
  message: string;
  data: {
    organization: InvitationOrganization;
    role: InvitationRole;
    user_uuid: string;
  };
}

export const invitationsService = {
  getPendingInvitations: (): Promise<PendingInvitationsResponse> =>
    api.get<PendingInvitationsResponse>("/profile/invitations"),

  acceptInvitation: (invitationUuid: string): Promise<AcceptInvitationResponse> =>
    api.post<AcceptInvitationResponse>(
      `/profile/invitations/${invitationUuid}/accept`,
    ),

  declineInvitation: (invitationUuid: string): Promise<unknown> =>
    api.post<unknown>(`/profile/invitations/${invitationUuid}/decline`),
};
