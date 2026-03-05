import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import {
  authService,
  type RegisterValidationError,
  type LoginUser,
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
}

function toAppUser(apiUser: LoginUser): AppUser {
  return {
    id: apiUser.uuid,
    email: apiUser.email,
    email_verified_at: apiUser.email_verified_at,
    created_at: apiUser.created_at,
    updated_at: apiUser.updated_at,
    wallet_address: apiUser.wallet_address,
  };
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  walletAddress: string | null;
  did: string | null;
  isWeb3Connected: boolean;
  connectWallet: (silent?: boolean) => Promise<void>;
  disconnectWallet: () => void;
  signUp: (email: string, password: string, passwordConfirmation: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { wallet, connect, disconnect } = useWeb3Wallet();

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser) as AppUser);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }

    setLoading(false);
  }, []);

  const persistSession = (token: string, appUser: AppUser) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(appUser));
    setUser(appUser);
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const signUp = async (email: string, password: string, passwordConfirmation: string) => {
    try {
      const { login } = await authService.registerAndLogin({
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      toast.success("¡Cuenta creada éxitosamente!");

      persistSession(login.token.value, toAppUser(login.user));
      navigate("/dashboard");
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
      persistSession(response.token.value, toAppUser(response.user));
      toast.success("Sesión iniciada correctamente");
      navigate("/dashboard");
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
    walletAddress: wallet.address,
    did: wallet.did,
    isWeb3Connected: wallet.isConnected,
    connectWallet: connect,
    disconnectWallet: disconnect,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
