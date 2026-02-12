import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";

// User metadata for registration
interface UserMetadata {
  nombre: string;
  apellido: string;
  full_name?: string;
  document_type?: string;
  document_number?: string;
  country?: string;
  city?: string;
  address?: string;
  postal_code?: string;
  phone?: string;
  birth_date?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  // Web3 identity fields
  walletAddress: string | null;
  did: string | null;
  isWeb3Connected: boolean;
  connectWallet: (silent?: boolean) => Promise<void>;
  disconnectWallet: () => void;
  // Auth methods
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Integrate Web3 wallet
  const { wallet, connect, disconnect, hasWeb3 } = useWeb3Wallet();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata?: UserMetadata) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata ? {
          nombre: metadata.nombre,
          apellido: metadata.apellido,
          full_name: metadata.full_name,
          document_type: metadata.document_type,
          document_number: metadata.document_number,
          country: metadata.country,
          city: metadata.city,
          address: metadata.address,
          postal_code: metadata.postal_code,
          phone: metadata.phone,
          birth_date: metadata.birth_date,
        } : undefined
      }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Registro exitoso. Inicia sesión para continuar.");
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Sesión iniciada correctamente");
      navigate("/dashboard");
    }

    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Sesión cerrada");
      navigate("/");
    }
  };

  const contextValue: AuthContextType = {
    user,
    session,
    loading,
    // Web3 identity
    walletAddress: wallet.address,
    did: wallet.did,
    isWeb3Connected: wallet.isConnected,
    connectWallet: connect,
    disconnectWallet: disconnect,
    // Auth methods
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
