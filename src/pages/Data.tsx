import { useNavigate } from "react-router-dom";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Plus, Library, Upload } from "lucide-react";
import { FadeIn } from "@/components/AnimatedSection";
import { MyLibraryTab } from "@/components/data/MyLibraryTab";
import { MyPublicationsTab } from "@/components/data/MyPublicationsTab";

const Data = () => {
  const navigate = useNavigate();
  const { activeOrg } = useOrganizationContext();
  const { t } = useTranslation('data');

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20 p-8">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Database className="mr-1 h-3 w-3" />
                {t('hero.badge')}
              </Badge>
              <h1 className="text-4xl font-bold mb-3">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t('hero.description')}
              </p>
            </div>

            {/* Prominent Publish Button */}
            <Button
              size="lg"
              onClick={() => navigate("/datos/publicar")}
              className="shrink-0"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('hero.publishBtn')}
            </Button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Tabs defaultValue="biblioteca" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="biblioteca" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              {t('tabs.library')}
            </TabsTrigger>
            <TabsTrigger value="publicaciones" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              {t('tabs.publications')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="biblioteca" className="mt-6">
            <MyLibraryTab />
          </TabsContent>

          <TabsContent value="publicaciones" className="mt-6">
            <MyPublicationsTab />
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
};

export default Data;
