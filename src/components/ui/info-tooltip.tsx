import * as React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface InfoTooltipProps {
  tooltip: string;
  modalTitle: string;
  modalContent: string;
  className?: string;
}

export const InfoTooltip = ({
  tooltip,
  modalTitle,
  modalContent,
  className,
}: InfoTooltipProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                  className
                )}
                aria-label="Más información"
              >
                <Info className="h-4 w-4" />
              </button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>

        <DialogContent className="sm:max-w-md backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-foreground">
              {modalTitle}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed pt-2">
              {modalContent}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
