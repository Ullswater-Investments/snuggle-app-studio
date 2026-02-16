import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import procuredataLogo from "@/assets/procuredata-logo.png";
import procuredataLogoDark from "@/assets/procuredata-logo-dark.png";
import procuredataLogoFull from "@/assets/procuredata-logo-full.png";

interface ProcuredataLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showNavigation?: boolean;
  linkToHome?: boolean;
  variant?: 'light' | 'dark' | 'auto' | 'full' | 'text';
}

const sizes = {
  sm: { height: 24, fontSize: 'text-lg' },
  md: { height: 32, fontSize: 'text-xl' },
  lg: { height: 40, fontSize: 'text-2xl' },
  xl: { height: 48, fontSize: 'text-3xl' }
};

export function ProcuredataLogo({
  size = 'md',
  showNavigation = false,
  linkToHome = true,
  variant = 'auto',
  className
}: ProcuredataLogoProps) {
  const navigate = useNavigate();

  let logoSrc = variant === 'dark' ? procuredataLogoDark : procuredataLogo;
  if (variant === 'full') {
    logoSrc = procuredataLogoFull;
  }

  const logoElement = variant === 'text' ? (
    <span className={cn(
      "procuredata-gradient font-bold tracking-tight",
      sizes[size].fontSize
    )}>
      PROCUREDATA
    </span>
  ) : (
    <img
      src={logoSrc}
      alt="PROCUREDATA"
      style={{ height: sizes[size].height }}
      className={cn(
        "object-contain",
        (variant === 'auto' || variant === 'full') && "dark:hidden"
      )}
    />
  );

  const logoDarkElement = (variant === 'auto' || variant === 'full') ? (
    <img
      src={procuredataLogoDark}
      alt="PROCUREDATA"
      style={{ height: sizes[size].height }}
      className="object-contain hidden dark:block"
    />
  ) : null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showNavigation && (
        <>
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
          {logoDarkElement}
        </Link>
      ) : (
        <div className="flex-shrink-0">
          {logoElement}
          {logoDarkElement}
        </div>
      )}
    </div>
  );
}
