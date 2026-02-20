import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ethers } from "ethers";

const DEFAULT_RPC_URL = "https://rpc.test.pontus-x.eu";

const EUROE_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const ERC20_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function decimals() view returns (uint8)",
];

interface BlockchainActivity {
  transactionCount: number;
  cumulativeEurauReceived: number;
  cumulativeEuroeReceived: number;
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

async function fetchCumulativeEurauReceived(
  provider: ethers.JsonRpcProvider,
  address: string
): Promise<number> {
  try {
    // Get internal transaction value received by looking at recent blocks
    // For a more accurate approach, we scan the last ~50000 blocks for value transfers
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 50000);

    // Use eth_getLogs to find transactions where address received native currency
    // Unfortunately, native transfers don't emit logs. We'll estimate using balance history.
    // For now, return 0 and rely on the wallet balance as the primary metric.
    return 0;
  } catch {
    return 0;
  }
}

async function fetchCumulativeEuroeReceived(
  provider: ethers.JsonRpcProvider,
  address: string
): Promise<number> {
  try {
    const contract = new ethers.Contract(EUROE_CONTRACT_ADDRESS, ERC20_ABI, provider);
    const decimals = await contract.decimals();

    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 50000);

    const filter = contract.filters.Transfer(null, address);
    const events = await contract.queryFilter(filter, fromBlock, currentBlock);

    let total = 0n;
    for (const event of events) {
      if ('args' in event && event.args) {
        total += event.args[2] as bigint;
      }
    }

    return parseFloat(ethers.formatUnits(total, decimals));
  } catch {
    return 0;
  }
}

export function useBlockchainActivity(orgId: string | undefined) {
  return useQuery<BlockchainActivity>({
    queryKey: ["blockchain-activity", orgId],
    queryFn: async () => {
      if (!orgId) {
        return { transactionCount: 0, cumulativeEurauReceived: 0, cumulativeEuroeReceived: 0, isConfigured: false };
      }

      const { data: org } = await supabase
        .from("organizations")
        .select("wallet_address")
        .eq("id", orgId)
        .maybeSingle();

      const walletAddress = org?.wallet_address ?? null;

      if (!walletAddress || !ethers.isAddress(walletAddress)) {
        return { transactionCount: 0, cumulativeEurauReceived: 0, cumulativeEuroeReceived: 0, isConfigured: false };
      }

      const rpcUrl = await fetchRpcUrl();
      const provider = new ethers.JsonRpcProvider(rpcUrl);

      const [transactionCount, cumulativeEuroeReceived] = await Promise.all([
        provider.getTransactionCount(walletAddress),
        fetchCumulativeEuroeReceived(provider, walletAddress),
      ]);

      return {
        transactionCount,
        cumulativeEurauReceived: 0, // Native transfers can't be queried via logs
        cumulativeEuroeReceived,
        isConfigured: true,
      };
    },
    enabled: !!orgId,
    staleTime: 120_000,
    refetchOnWindowFocus: false,
  });
}
