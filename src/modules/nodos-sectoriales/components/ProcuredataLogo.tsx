import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
// NOTE: Update this import to point to your actual logo asset location
import procuredataLogo from "@/assets/procuredata-logo.png";

interface ProcuredataLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showNavigation?: boolean;
  linkToHome?: boolean;
}

const sizes = {
  sm: { height: 24 },
  md: { height: 32 },
  lg: { height: 40 },
  xl: { height: 48 }
};

export function ProcuredataLogo({ 
  size = 'md', 
  showNavigation = false,
  linkToHome = true,
  className 
}: ProcuredataLogoProps) {
  const navigate = useNavigate();

  const logoElement = (
    <img 
      src={procuredataLogo} 
      alt="PROCUREDATA" 
      style={{ height: sizes[size].height }}
      className="object-contain"
    />
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showNavigation && (
        <>
          {/* Botón Atrás */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="h-8 w-8 p-0"
                aria-label="Atrás"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Atrás</TooltipContent>
          </Tooltip>

          {/* Botón Adelante */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(1)}
                className="h-8 w-8 p-0"
                aria-label="Adelante"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Adelante</TooltipContent>
          </Tooltip>
        </>
      )}

      {linkToHome ? (
        <Link to="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
          {logoElement}
        </Link>
      ) : (
        <div className="flex-shrink-0">
          {logoElement}
        </div>
      )}
    </div>
  );
}
