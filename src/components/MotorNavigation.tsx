import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Coins, Shield, FileCheck, Activity, Cpu, Network, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOTOR_PAGES = [
  { path: "/motor/pagos-euroe", title: "Marketplace Fee", icon: Coins },
  { path: "/motor/gobernanza-odrl", title: "Soberanía SaaS", icon: Shield },
  { path: "/motor/audit-logs", title: "Auditoría Blockchain", icon: FileCheck },
  { path: "/motor/edge-functions", title: "IoT Data Streams", icon: Activity },
  { path: "/motor/modelo-idsa", title: "Compute-to-Data", icon: Cpu },
  { path: "/motor/conectores-erp", title: "Network Builder", icon: Network },
  { path: "/motor/wallet-web3", title: "Wallet Web3", icon: Wallet },
];

interface MotorNavigationProps {
  currentPath: string;
}

export function MotorNavigation({ currentPath }: MotorNavigationProps) {
  const currentIndex = MOTOR_PAGES.findIndex(p => p.path === currentPath);
  
  if (currentIndex === -1) return null;
  
  const prevPage = MOTOR_PAGES[(currentIndex - 1 + MOTOR_PAGES.length) % MOTOR_PAGES.length];
  const nextPage = MOTOR_PAGES[(currentIndex + 1) % MOTOR_PAGES.length];

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mt-6">
      <Link to={prevPage.path}>
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{prevPage.title}</span>
        </Button>
      </Link>
      
      <Badge variant="outline" className="text-xs font-mono px-3">
        {currentIndex + 1} / {MOTOR_PAGES.length}
      </Badge>
      
      <Link to={nextPage.path}>
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
          <span className="hidden sm:inline">{nextPage.title}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
