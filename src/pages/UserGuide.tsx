import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";

export default function UserGuide() {
  const { t } = useTranslation('userGuide');

  const documentIds = Array.from({ length: 15 }, (_, i) => i + 1);

  const routes: Record<number, string> = {
    1: '/documento-explicativo-1',
    2: '/documento-explicativo-2',
    3: '/documento-explicativo-3',
    4: '/documento-explicativo-4',
    5: '/documento-explicativo-5',
    6: '/documento-explicativo-6',
    7: '/documento-explicativo-7',
    8: '/documento-explicativo-8',
    9: '/documento-explicativo-9',
    10: '/documento-explicativo-10',
    11: '/documento-explicativo-11',
    12: '/documento-explicativo-12',
    13: '/documento-explicativo-13',
    14: '/documento-explicativo-14',
    15: '/documento-explicativo-15'
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ProcuredataLogo size="md" />
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground mb-12">
          {t('subtitle')}
        </p>

        {/* Grid de 15 documentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {documentIds.map((id) => {
            const docTitle = t(`documents.${id}.title`);
            const docSubtitle = t(`documents.${id}.subtitle`);
            
            const cardContent = (
              <Card className="cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-200 h-[200px]">
                <CardContent className="h-full flex flex-col items-center justify-center gap-2 p-4">
                  <FileText className="h-8 w-8 text-primary/60" />
                  <span className="text-sm font-bold text-center">{docTitle}</span>
                  <span className="text-xs text-muted-foreground text-center leading-tight">{docSubtitle}</span>
                </CardContent>
              </Card>
            );
            
            if (routes[id]) {
              return <Link key={id} to={routes[id]}>{cardContent}</Link>;
            }
            return <div key={id}>{cardContent}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
