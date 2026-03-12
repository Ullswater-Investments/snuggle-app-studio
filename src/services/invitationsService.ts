import { api } from "./api";

export interface PendingInvitation {
  [key: string]: unknown;
}

export interface PendingInvitationsResponse {
  data: PendingInvitation[];
}

export const invitationsService = {
  getPendingInvitations: (): Promise<PendingInvitationsResponse> =>
    api.get<PendingInvitationsResponse>("/profile/invitations"),
};
