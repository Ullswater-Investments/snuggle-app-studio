import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, AlertTriangle, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PontusXOnboardingStepProps {
  onNext: () => void;
  onCancel: () => void;
}

export function PontusXOnboardingStep({
  onNext,
  onCancel,
}: PontusXOnboardingStepProps) {
  const { t } = useTranslation("onboarding");
  const [hasCompleted, setHasCompleted] = useState(false);

  return (
    <Card className="border-2 shadow-xl max-w-2xl mx-auto space-y-3">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">
              {t("pontusX.title")}
            </CardTitle>
            <CardDescription>
              {t("pontusX.description")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-5 space-y-4 shadow-primary/10 border border-primary/10">
          <h4 className="font-semibold text-sm">{t("pontusX.stepsTitle")}</h4>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                1
              </span>
              <p className="text-sm text-muted-foreground">
                {t("pontusX.step1")}
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                2
              </span>
              <p className="text-sm text-muted-foreground">
                {t("pontusX.step2")}
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                3
              </span>
              <p className="text-sm text-muted-foreground">
                {t("pontusX.step3")}
              </p>
            </li>
          </ol>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() =>
              window.open("https://onboarding.delta-dao.com/signup", "_blank")
            }
          >
            <ExternalLink className="h-4 w-4" />
            {t("pontusX.portalButton")}
          </Button>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            {t("pontusX.warning")}
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="onboarding-complete"
            checked={hasCompleted}
            onCheckedChange={(checked) => setHasCompleted(checked as boolean)}
          />
          <Label
            htmlFor="onboarding-complete"
            className="text-sm cursor-pointer leading-relaxed"
          >
            {t("pontusX.checkbox")}
          </Label>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div />
          <Button
            variant="ghost"
            className="border border-input"
            onClick={onCancel}
          >
            {t("common.cancel")}
          </Button>
          <Button className="gap-2" disabled={!hasCompleted} onClick={onNext}>
            {t("common.next")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
