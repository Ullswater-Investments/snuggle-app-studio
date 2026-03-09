import { useTheme } from "next-themes";
import logoEdcLight from "@/assets/logo-EDC-light.svg";
import logoEdcDark from "@/assets/logo-EDC-dark.png";
import logoKitEspacioDatos from "@/assets/logo-kit-espacio-de-datos.svg";
import logoGobiernoEspana from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type Size = "sm" | "md";
type ShowFrom = "always" | "sm" | "lg";

interface InstitutionalLogosProps {
  size?: Size;
  showFrom?: ShowFrom;
  className?: string;
}

const sizeMap: Record<
  Size,
  { logo: string; gobierno: string; separator: string }
> = {
  sm: { logo: "h-6", gobierno: "h-6", separator: "h-6" },
  md: { logo: "h-8", gobierno: "h-10", separator: "h-6 sm:h-8" },
};

const visibilityMap: Record<ShowFrom, { first: string; last: string }> = {
  always: { first: "", last: "" },
  sm: { first: "hidden sm:block", last: "hidden md:block" },
  lg: { first: "hidden lg:block", last: "hidden xl:block" },
};

export function InstitutionalLogos({
  size = "md",
  showFrom = "sm",
  className,
}: InstitutionalLogosProps) {
  const { resolvedTheme } = useTheme();
  const s = sizeMap[size];
  const v = visibilityMap[showFrom];

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <div
        className={cn(
          "border-l border-muted-foreground/30",
          s.separator,
          v.first,
        )}
      />
      <img
        src={resolvedTheme === "dark" ? logoEdcDark : logoEdcLight}
        alt="Espacio de datos de confianza"
        className={cn("object-contain", s.logo, v.first)}
        draggable={false}
      />
      <img
        src={logoKitEspacioDatos}
        alt="Kit Espacios de Datos"
        className={cn("object-contain dark:invert", s.logo, v.first)}
        draggable={false}
      />
      <img
        src={logoGobiernoEspana}
        alt="Gobierno de España – Ministerio para la Transformación Digital y de la Función Pública"
        className={cn("object-contain", s.gobierno, v.last)}
        draggable={false}
      />
    </div>
  );
}
