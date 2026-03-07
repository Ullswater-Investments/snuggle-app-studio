import { api } from "./api";

export interface KycSessionResponse {
  status: string;
  session: {
    url: string;
    session_id: string;
    session_number: number;
    session_token: string;
    vendor_data: string;
    metadata: string | null;
    callback: string;
    workflow_id: string;
  };
}

export interface SyncKycSessionResponse {
  message: string;
  profile: {
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
    gender: string;
    kyc_verified_at: string;
    uuid: string;
    created_at: string;
    updated_at: string;
    primary_wallet_address: string | null;
    primary_wallet: string | null;
  };
}

export const kycService = {
  createKycSession: (language: string): Promise<KycSessionResponse> =>
    api.post<KycSessionResponse>("/kyc/session", {
      callback: `${window.location.origin}/didit-callback.html`,
      language,
    }),

  refreshKycSession: (sessionId: string): Promise<SyncKycSessionResponse> =>
    api.post<SyncKycSessionResponse>(`/kyc/session/${sessionId}/refresh`),
};
