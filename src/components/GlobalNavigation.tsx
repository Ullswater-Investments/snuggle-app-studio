import { Link, useNavigate } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GlobalNavigation() {
  const navigate = useNavigate();
  const { t } = useTranslation('nav');

  return (
    <div className="flex items-center gap-1">
      {/* Botón Atrás */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="h-8 w-8 p-0"
            aria-label={t('back')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('back')}</TooltipContent>
      </Tooltip>

      {/* Botón Home */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
            <Link to="/" aria-label={t('home')}>
              <Home className="h-4 w-4" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('home')}</TooltipContent>
      </Tooltip>

      {/* Botón Adelante */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(1)}
            className="h-8 w-8 p-0"
            aria-label={t('forward')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('forward')}</TooltipContent>
      </Tooltip>
    </div>
  );
}
