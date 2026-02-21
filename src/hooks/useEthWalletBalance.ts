import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ethers } from "ethers";

const DEFAULT_RPC_URL = "https://rpc.test.pontus-x.eu";

// EUROe contract address on Pontus-X Testnet (placeholder – replace with real address)
const EUROE_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const ERC20_BALANCE_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

interface PontusXWalletBalance {
  walletAddress: string | null;
  balanceNative: number;  // EURAU
  balanceEur: number;     // = balanceNative (1 EURAU ≈ 1 EUR)
  euroeBalance: number;   // EUROe ERC-20 token
  isConfigured: boolean;
}

async function fetchRpcUrl(): Promise<string> {
  try {
    const { data } = await supabase
      .from("system_settings")
      .select("value")
      .eq("key", "blockchain_rpc_url")
      .maybeSingle();
    return data?.value || DEFAULT_RPC_URL;
  } catch {
    return DEFAULT_RPC_URL;
  }
}

async function fetchNativeBalance(provider: ethers.JsonRpcProvider, address: string): Promise<number> {
  const balanceWei = await provider.getBalance(address);
  return parseFloat(ethers.formatEther(balanceWei));
}

async function fetchEuroeBalance(provider: ethers.JsonRpcProvider, address: string): Promise<number> {
  try {
    const contract = new ethers.Contract(EUROE_CONTRACT_ADDRESS, ERC20_BALANCE_ABI, provider);
    const [balance, decimals] = await Promise.all([
      contract.balanceOf(address),
      contract.decimals(),
    ]);
    return parseFloat(ethers.formatUnits(balance, decimals));
  } catch {
    return 0;
  }
}

export function useEthWalletBalance(orgId: string | undefined) {
  return useQuery<PontusXWalletBalance>({
    queryKey: ["pontus-wallet-balance", orgId],
    queryFn: async () => {
      if (!orgId) {
        return { walletAddress: null, balanceNative: 0, balanceEur: 0, euroeBalance: 0, isConfigured: false };
      }

      const { data: org, error } = await supabase
        .from("organizations")
        .select("wallet_address")
        .eq("id", orgId)
        .maybeSingle();

      if (error) throw error;

      const walletAddress = org?.wallet_address ?? null;

      if (!walletAddress || !ethers.isAddress(walletAddress)) {
        return { walletAddress, balanceNative: 0, balanceEur: 0, euroeBalance: 0, isConfigured: false };
      }

      const rpcUrl = await fetchRpcUrl();
      const provider = new ethers.JsonRpcProvider(rpcUrl);

      const [balanceNative, euroeBalance] = await Promise.all([
        fetchNativeBalance(provider, walletAddress),
        fetchEuroeBalance(provider, walletAddress),
      ]);

      return {
        walletAddress,
        balanceNative,
        balanceEur: balanceNative, // 1 EURAU ≈ 1 EUR
        euroeBalance,
        isConfigured: true,
      };
    },
    enabled: !!orgId,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
