import { cn } from "@/lib/utils";

interface ProcuredataLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
  showText?: boolean;
}

const sizes = {
  sm: { icon: 20, text: 'text-lg' },
  md: { icon: 28, text: 'text-xl' },
  lg: { icon: 36, text: 'text-2xl' },
  xl: { icon: 48, text: 'text-4xl' }
};

export function ProcuredataLogo({ 
  size = 'md', 
  showIcon = true, 
  showText = true,
  className 
}: ProcuredataLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && (
        <svg 
          viewBox="0 0 48 48" 
          width={sizes[size].icon} 
          height={sizes[size].icon}
          className="flex-shrink-0"
        >
          {/* Círculo de fondo azul */}
          <circle cx="24" cy="24" r="22" fill="#0EA5E9"/>
          
          {/* Red de nodos - puntos principales */}
          <circle cx="14" cy="16" r="3.5" fill="white"/>
          <circle cx="34" cy="16" r="3.5" fill="white"/>
          <circle cx="24" cy="32" r="3.5" fill="white"/>
          <circle cx="24" cy="20" r="3" fill="white"/>
          
          {/* Líneas de conexión */}
          <line x1="14" y1="16" x2="34" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="14" y1="16" x2="24" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="34" y1="16" x2="24" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="24" y1="20" x2="14" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="24" y1="20" x2="34" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="24" y1="20" x2="24" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )}
      {showText && (
        <span className={cn("font-bold tracking-tight", sizes[size].text)}>
          <span className="text-sky-500">P</span>
          <span className="text-gray-700 dark:text-gray-200">rocuredata</span>
        </span>
      )}
    </div>
  );
}
