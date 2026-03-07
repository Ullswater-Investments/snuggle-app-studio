import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import {
  authService,
  type RegisterValidationError,
  type MeUser,
  MePermission,
  MeRole,
} from "@/services/authService";
import { ApiError } from "@/services/api";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export interface AppUser {
  id: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  wallet_address: string | null;
  profile: Record<string, unknown> | null;
  roles: MeRole[];
  permissions: MePermission[];
}

function meUserToAppUser(me: MeUser): AppUser {
  return {
    id: me.uuid,
    email: me.email,
    email_verified_at: me.email_verified_at,
    created_at: me.created_at,
    updated_at: me.updated_at,
    wallet_address: me.wallet_address,
    profile: me.profile,
    roles: me.roles,
    permissions: me.permissions,
  };
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  profileComplete: boolean;
  walletAddress: string | null;
  did: string | null;
  isWeb3Connected: boolean;
  connectWallet: (silent?: boolean) => Promise<void>;
  disconnectWallet: () => void;
  signUp: (
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { wallet, connect, disconnect } = useWeb3Wallet();

  const persistUser = (appUser: AppUser) => {
    localStorage.setItem(USER_KEY, JSON.stringify(appUser));
    setUser(appUser);
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const fetchAndPersistMe = async (): Promise<AppUser> => {
    const { user: meUser } = await authService.getMe();
    const appUser = meUserToAppUser(meUser);
    persistUser(appUser);
    return appUser;
  };

  const navigateByProfile = (appUser: AppUser) => {
    if (appUser.profile) {
      navigate("/dashboard");
    } else {
      navigate("/complete-profile");
    }
  };

  useEffect(() => {
    const restore = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        await fetchAndPersistMe();
      } catch {
        clearSession();
      }

      setLoading(false);
    };

    restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signUp = async (
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    try {
      const { login } = await authService.registerAndLogin({
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      localStorage.setItem(TOKEN_KEY, login.token.value);
      toast.success("¡Cuenta creada exitosamente!");

      const appUser = await fetchAndPersistMe();
      navigateByProfile(appUser);
      return { error: null };
    } catch (err) {
      let message = "Error al registrar. Inténtalo de nuevo.";

      if (err instanceof ApiError) {
        const body = err.data as RegisterValidationError | undefined;
        const fieldErrors = body?.errors;

        if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
          message = fieldErrors.map((e) => e.message).join(". ");
        } else {
          message = err.message;
        }
      }

      toast.error(message);
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem(TOKEN_KEY, response.token.value);

      toast.success("Sesión iniciada correctamente");

      const appUser = await fetchAndPersistMe();
      navigateByProfile(appUser);
      return { error: null };
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Error al iniciar sesión. Inténtalo de nuevo.";
      toast.error(message);
      return { error: err };
    }
  };

  const refreshProfile = async () => {
    const appUser = await fetchAndPersistMe();
    navigateByProfile(appUser);
  };

  const signOut = async () => {
    try {
      await authService.logout();
    } catch {
      // Even if the API call fails we still clear the local session
    }

    clearSession();
    toast.success("Sesión cerrada");
    navigate("/");
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    profileComplete: user?.profile !== null && user?.profile !== undefined,
    walletAddress: wallet.address,
    did: wallet.did,
    isWeb3Connected: wallet.isConnected,
    connectWallet: connect,
    disconnectWallet: disconnect,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
