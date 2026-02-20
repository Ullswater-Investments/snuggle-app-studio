import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ethers } from "ethers";

interface EthWalletBalance {
  walletAddress: string | null;
  balanceEth: number;
  balanceEur: number;
  ethPriceEur: number;
  isConfigured: boolean;
}

const ETH_RPC_URL = "https://eth.llamarpc.com";

async function fetchEthBalance(address: string): Promise<number> {
  const provider = new ethers.JsonRpcProvider(ETH_RPC_URL);
  const balanceWei = await provider.getBalance(address);
  return parseFloat(ethers.formatEther(balanceWei));
}

async function fetchEthPriceEur(): Promise<number> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
  );
  if (!res.ok) throw new Error("Failed to fetch ETH price");
  const data = await res.json();
  return data.ethereum?.eur ?? 0;
}

export function useEthWalletBalance(orgId: string | undefined) {
  return useQuery<EthWalletBalance>({
    queryKey: ["eth-wallet-balance", orgId],
    queryFn: async () => {
      if (!orgId) {
        return { walletAddress: null, balanceEth: 0, balanceEur: 0, ethPriceEur: 0, isConfigured: false };
      }

      // 1. Get wallet_address from organizations table
      const { data: org, error } = await supabase
        .from("organizations")
        .select("wallet_address")
        .eq("id", orgId)
        .maybeSingle();

      if (error) throw error;

      const walletAddress = org?.wallet_address ?? null;

      if (!walletAddress || !ethers.isAddress(walletAddress)) {
        return { walletAddress, balanceEth: 0, balanceEur: 0, ethPriceEur: 0, isConfigured: false };
      }

      // 2. Fetch ETH balance and price in parallel
      const [balanceEth, ethPriceEur] = await Promise.all([
        fetchEthBalance(walletAddress),
        fetchEthPriceEur(),
      ]);

      return {
        walletAddress,
        balanceEth,
        balanceEur: balanceEth * ethPriceEur,
        ethPriceEur,
        isConfigured: true,
      };
    },
    enabled: !!orgId,
    staleTime: 60_000, // 1 min
    refetchOnWindowFocus: false,
  });
}
