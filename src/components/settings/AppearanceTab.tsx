import { Palette, Sun, Moon, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const THEME_OPTIONS = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
] as const;

type ThemeValue = (typeof THEME_OPTIONS)[number]["value"];

export function AppearanceTab() {
  const { t } = useTranslation("settings");
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Palette className="size-5 text-primary" />
          <CardTitle>{t("profile.appearanceTab.title")}</CardTitle>
        </div>
        <CardDescription>
          {t("profile.appearanceTab.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1">
            {t("profile.appearanceTab.themeLabel")}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {t("profile.appearanceTab.themeDescription")}
          </p>

          <div className="grid grid-cols-3 gap-4">
            {THEME_OPTIONS.map(({ value, icon: Icon }) => {
              const isActive = theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value)}
                  className={cn(
                    "relative flex flex-col items-center gap-2 rounded-xl border-2 p-6 transition-all duration-200 cursor-pointer",
                    "hover:border-primary/50 hover:shadow-sm",
                    isActive
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-6 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    {t(`profile.appearanceTab.themes.${value}`)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t(`profile.appearanceTab.themes.${value}Description`)}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-2 size-2 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
