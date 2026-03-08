import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

interface DocumentLayoutProps {
  children: React.ReactNode;
  backLink?: string;
  backLabel?: string;
}

export function DocumentLayout({
  children,
  backLink = "/user-guide",
  backLabel = "Volver a Guía",
}: DocumentLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header with Language Switcher */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={backLink}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" /> {backLabel}
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      {children}
    </div>
  );
}
