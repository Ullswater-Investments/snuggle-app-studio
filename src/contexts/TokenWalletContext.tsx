import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface TokenOperation {
  id: string;
  timestamp: string;
  agent: "federated" | "success-story";
  caseLabel: string;
  question: string;
  tokensConsumed: number;
}

interface WalletState {
  balance: number;
  initialBalance: number;
  operations: TokenOperation[];
}

interface TokenWalletContextType {
  balance: number;
  initialBalance: number;
  operations: TokenOperation[];
  totalConsumed: number;
  recordOperation: (op: Omit<TokenOperation, "id" | "timestamp">) => void;
  resetWallet: () => void;
}

const STORAGE_KEY = "tokenWallet";
const INITIAL_BALANCE = 1_000_000;

const defaultState: WalletState = {
  balance: INITIAL_BALANCE,
  initialBalance: INITIAL_BALANCE,
  operations: [],
};

function loadState(): WalletState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as WalletState;
  } catch { /* ignore */ }
  return { ...defaultState };
}

function saveState(state: WalletState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const TokenWalletContext = createContext<TokenWalletContextType | null>(null);

export const TokenWalletProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<WalletState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const recordOperation = useCallback((op: Omit<TokenOperation, "id" | "timestamp">) => {
    setState((prev) => {
      const operation: TokenOperation = {
        ...op,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };
      return {
        ...prev,
        balance: Math.max(0, prev.balance - op.tokensConsumed),
        operations: [operation, ...prev.operations],
      };
    });
  }, []);

  const resetWallet = useCallback(() => {
    setState({ ...defaultState });
  }, []);

  const totalConsumed = state.initialBalance - state.balance;

  return (
    <TokenWalletContext.Provider
      value={{
        balance: state.balance,
        initialBalance: state.initialBalance,
        operations: state.operations,
        totalConsumed,
        recordOperation,
        resetWallet,
      }}
    >
      {children}
    </TokenWalletContext.Provider>
  );
};

export const useTokenWallet = () => {
  const ctx = useContext(TokenWalletContext);
  if (!ctx) throw new Error("useTokenWallet must be used within TokenWalletProvider");
  return ctx;
};
