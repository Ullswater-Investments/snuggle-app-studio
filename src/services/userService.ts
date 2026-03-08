import { api } from "./api";

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  country: string;
  city: string;
  address: string;
  id_number: string;
  postal_code: string;
  phone_number: string;
  birthdate: string;
  gender: string;
  language: string;
}

export interface UpdateProfileResponse {
  message: string;
  profile: UpdateProfileResponseUser;
}

export interface UpdateProfileResponseUser {
  uuid: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  profile: UserProfileData;
  wallet_address: string | null;
}

export interface UserProfileData {
  uuid: string;
  user_uuid: string;
  first_name: string;
  last_name: string;
  nationality: string | null;
  country: string;
  ip_country: string | null;
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

export const userService = {
  updateProfile: (data: UpdateProfilePayload): Promise<UpdateProfileResponse> =>
    api.put<UpdateProfileResponse>("/users/profile", data),
};
