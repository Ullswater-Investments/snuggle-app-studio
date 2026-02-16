import { useNavigate } from "react-router-dom";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
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

  return (
    <div className="container mx-auto p-6 space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20 p-8">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Database className="mr-1 h-3 w-3" />
                Centro de Datos
              </Badge>
              <h1 className="text-4xl font-bold mb-3">
                Gestión de Datos
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Accede a tu biblioteca de datasets adquiridos y gestiona tus publicaciones en el marketplace.
              </p>
            </div>

            {/* Prominent Publish Button */}
            <Button
              size="lg"
              onClick={() => navigate("/datos/publicar")}
              className="shrink-0"
            >
              <Plus className="h-5 w-5 mr-2" />
              Publicar Nuevo Dataset
            </Button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Tabs defaultValue="biblioteca" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="biblioteca" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              Mi Biblioteca
            </TabsTrigger>
            <TabsTrigger value="publicaciones" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Mis Publicaciones
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
