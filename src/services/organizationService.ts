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
};
