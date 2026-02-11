import { useTokenWallet } from "@/contexts/TokenWalletContext";
import { Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export const TokenWalletBadge = () => {
  const { balance, initialBalance } = useTokenWallet();
  const navigate = useNavigate();
  const pct = (balance / initialBalance) * 100;

  const color =
    pct > 50 ? "text-green-500" : pct > 20 ? "text-yellow-500" : "text-red-500";
  const barColor =
    pct > 50 ? "[&>div]:bg-green-500" : pct > 20 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500";

  return (
    <button
      onClick={() => navigate("/token-wallet")}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card hover:bg-accent transition-colors text-xs"
      title="Ver Token Wallet"
    >
      <Coins className={`w-3.5 h-3.5 ${color}`} />
      <span className="font-medium tabular-nums">{balance.toLocaleString("es-ES")}</span>
      <Progress value={pct} className={`w-12 h-1.5 ${barColor}`} />
    </button>
  );
};
