import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import procuredataLogoLight from "@/assets/procuredata-logo-light.png";
import procuredataLogoDark from "@/assets/procuredata-logo-dark.png";

interface ProcuredataLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showNavigation?: boolean;
  linkToHome?: boolean;
  variant?: "light" | "dark" | "auto" | "text";
}

const sizes = {
  sm: { height: 18, fontSize: "text-md" },
  md: { height: 24, fontSize: "text-xl" },
  lg: { height: 40, fontSize: "text-2xl" },
  xl: { height: 48, fontSize: "text-3xl" },
};

export function ProcuredataLogo({
  size = "md",
  showNavigation = false,
  linkToHome = true,
  variant = "auto",
  className,
}: ProcuredataLogoProps) {
  const navigate = useNavigate();

  const logoSrc =
    variant === "dark" ? procuredataLogoDark : procuredataLogoLight;

  const logoElement =
    variant === "text" ? (
      <span
        className={cn(
          "procuredata-gradient dark:text-white font-bold tracking-tight",
          sizes[size].fontSize,
        )}
      >
        PROCUREDATA
      </span>
    ) : (
      <img
        src={logoSrc}
        alt="PROCUREDATA"
        style={{ height: sizes[size].height }}
        className={cn("object-contain", variant === "auto" && "dark:hidden")}
      />
    );

  const logoDarkElement =
    variant === "auto" ? (
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
        <Link
          to="/"
          className="hover:opacity-80 transition-opacity flex-shrink-0"
        >
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
