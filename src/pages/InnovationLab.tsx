import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InnovationChart } from "@/components/InnovationChart";
import { Lightbulb, TrendingUp, Info } from "lucide-react";
import { toast } from "sonner";

interface InnovationConcept {
  id: string;
  title: string;
  category: string;
  short_description: string;
  full_analysis: string;
  business_impact: string;
  maturity_level: number;
  chart_type: "bar" | "line" | "pie" | "area";
  chart_data: any[];
  chart_config: any;
  created_at: string;
}

const categories = ["Todos", "Finance", "ESG", "Supply Chain", "Legal", "Product", "Operations"];

const categoryColors: Record<string, string> = {
  Finance: "bg-blue-500/10 text-blue-600 border-blue-200",
  ESG: "bg-green-500/10 text-green-600 border-green-200",
  "Supply Chain": "bg-purple-500/10 text-purple-600 border-purple-200",
  Legal: "bg-orange-500/10 text-orange-600 border-orange-200",
  Product: "bg-pink-500/10 text-pink-600 border-pink-200",
  Operations: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
};

export default function InnovationLab() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedConcept, setSelectedConcept] = useState<InnovationConcept | null>(null);

  const { data: concepts, isLoading } = useQuery({
    queryKey: ["innovation-concepts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("innovation_lab_concepts")
        .select("*")
        .order("maturity_level", { ascending: false });

      if (error) {
        toast.error("Error al cargar conceptos de innovación");
        throw error;
      }

      return data as InnovationConcept[];
    },
  });

  const filteredConcepts = concepts?.filter(
    (concept) => selectedCategory === "Todos" || concept.category === selectedCategory
  );

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Lightbulb className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Innovation Lab</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          El Futuro de tus Datos: Explora 20+ nuevas líneas de negocio habilitadas por el Espacio de Datos Federados
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Concepts Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts?.map((concept) => (
            <Card
              key={concept.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2"
              onClick={() => setSelectedConcept(concept)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-lg leading-tight flex-1">{concept.title}</CardTitle>
                  <Badge variant="outline" className={categoryColors[concept.category]}>
                    {concept.category}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">{concept.short_description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{concept.business_impact}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Nivel de Madurez</span>
                    <span className="font-medium">{concept.maturity_level}/5</span>
                  </div>
                  <Progress value={concept.maturity_level * 20} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Sheet */}
      <Sheet open={!!selectedConcept} onOpenChange={(open) => !open && setSelectedConcept(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedConcept && (
            <>
              <SheetHeader className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <SheetTitle className="text-2xl mb-2">{selectedConcept.title}</SheetTitle>
                    <Badge variant="outline" className={categoryColors[selectedConcept.category]}>
                      {selectedConcept.category}
                    </Badge>
                  </div>
                </div>
                <SheetDescription className="text-base">{selectedConcept.short_description}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Business Impact */}
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Impacto de Negocio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-primary">{selectedConcept.business_impact}</p>
                  </CardContent>
                </Card>

                {/* Full Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Análisis Completo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{selectedConcept.full_analysis}</p>
                  </CardContent>
                </Card>

                {/* Maturity Level */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Nivel de Madurez</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Estado actual</span>
                      <span className="font-semibold">{selectedConcept.maturity_level}/5</span>
                    </div>
                    <Progress value={selectedConcept.maturity_level * 20} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {selectedConcept.maturity_level === 1 && "Concepto inicial"}
                      {selectedConcept.maturity_level === 2 && "Prototipo en desarrollo"}
                      {selectedConcept.maturity_level === 3 && "Piloto funcional"}
                      {selectedConcept.maturity_level === 4 && "Pre-producción"}
                      {selectedConcept.maturity_level === 5 && "Listo para mercado"}
                    </p>
                  </CardContent>
                </Card>

                {/* Chart Visualization */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Visualización de Datos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InnovationChart
                      type={selectedConcept.chart_type}
                      data={selectedConcept.chart_data}
                      config={selectedConcept.chart_config}
                    />
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
