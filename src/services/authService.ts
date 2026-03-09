import { api } from "./api";

// --- Request ---
interface RegisterRequest {
  email: string;
  password: string;
  password_confirmation: string;
}

// --- Response (201) ---
export interface RegisteredUser {
  email: string;
  uuid: string;
  created_at: string;
  updated_at: string;
  wallet_address: string | null;
}

export interface RegisterResponse {
  message: string;
  user: RegisteredUser;
}

// --- Error (422) ---
export interface ValidationErrorDetail {
  message: string;
  rule: string;
  field: string;
}

export interface RegisterValidationError {
  message: string;
  statusCode: number;
  errors: ValidationErrorDetail[];
  exception: string;
}

// --- Login ---
interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  uuid: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  wallet_address: string | null;
}

export interface LoginToken {
  type: string;
  value: string;
  expiresAt: string | null;
}

export interface LoginResponse {
  message: string;
  user: LoginUser;
  token: LoginToken;
}

// --- Login Error (401) ---
export interface LoginErrorDetail {
  message: string;
}

export interface LoginError {
  message: string;
  statusCode: number;
  errors: LoginErrorDetail[];
}

// --- Logout ---
export interface LogoutResponse {
  message: string;
}

// --- Me (current user + profile) ---
export interface MeResponse {
  user: MeUser;
}
export interface MeUser {
  uuid: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  wallet_address: string | null;
  roles: MeRole[];
  permissions: MePermission[];
  profile: Record<string, unknown> | null;
}

export interface MeRole {
  id: string;
  slug: string;
  title: string | null;
  entity_type: string;
  entity_id: string | null;
  scope: string;
  allowed: boolean;
  created_at: string;
  updated_at: string;
}

export interface MePermission {
  id: string;
  slug: string;
  title: string | null;
  entity_type: string;
  entity_id: string | null;
  scope: string;
  allowed: boolean;
  created_at: string;
  updated_at: string;
}

// --- Update Password ---
export interface UpdatePasswordRequest {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

// --- Compound ---
export interface RegisterAndLoginResult {
  register: RegisterResponse;
  login: LoginResponse;
}

// --- Service ---
const AUTH_GUARD = "users";

export const authService = {
  register: (data: RegisterRequest): Promise<RegisterResponse> =>
    api.post<RegisterResponse>(`/auth/register/${AUTH_GUARD}`, data),

  login: (data: LoginRequest): Promise<LoginResponse> =>
    api.post<LoginResponse>(`/auth/login/${AUTH_GUARD}`, data),

  logout: (): Promise<LogoutResponse> =>
    api.post<LogoutResponse>(`/auth/logout/${AUTH_GUARD}`),

  getMe: (): Promise<MeResponse> =>
    api.get<MeResponse>(`/auth/me/${AUTH_GUARD}`),

  updatePassword: (data: UpdatePasswordRequest): Promise<UpdatePasswordResponse> =>
    api.post<UpdatePasswordResponse>(`/auth/password/update/${AUTH_GUARD}`, data),

  registerAndLogin: async (
    data: RegisterRequest,
  ): Promise<RegisterAndLoginResult> => {
    const { email, password } = data;
    const register = await authService.register(data);
    const login = await authService.login({ email, password });
    return { register, login };
  },
};
