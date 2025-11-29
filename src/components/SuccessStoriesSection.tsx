import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Quote, TrendingUp } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type SuccessStory = Tables<"success_stories">;

export default function SuccessStoriesSection() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [featuredStories, setFeaturedStories] = useState<SuccessStory[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>("all");

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && !error) {
        setStories(data);
        setFeaturedStories(data.filter((s) => s.is_featured));
      }
    };

    fetchStories();
  }, []);

  const sectors = ["all", ...Array.from(new Set(stories.map((s) => s.sector)))];
  const filteredStories = selectedSector === "all" 
    ? stories 
    : stories.filter((s) => s.sector === selectedSector);

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            25 Empresas, 10 Sectores, <span className="procuredata-gradient">1 Plataforma</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Resultados reales de organizaciones que han transformado su gestión de datos en ventaja competitiva.
          </p>
        </div>

        {/* Marquee Infinito */}
        <div className="relative overflow-hidden mb-16 py-4 bg-background/50 rounded-lg">
          <div className="marquee-container">
            <div className="marquee">
              {stories.slice(0, 10).map((story) => (
                <div key={story.id} className="marquee-item inline-flex items-center gap-2 px-4 py-2 bg-card border rounded-full mx-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">{story.company_name}</span>
                  <Badge variant="outline" className="text-xs">{story.sector}</Badge>
                  <span className="text-xs text-muted-foreground">{story.impact_highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Casos Destacados</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <Card key={story.id} className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{story.company_name}</CardTitle>
                    <Badge>{story.sector}</Badge>
                  </div>
                  <CardDescription className="text-base">
                    <span className="font-semibold text-foreground">Reto:</span> {story.challenge}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-semibold text-sm text-primary">Solución:</span>
                    <p className="text-sm text-muted-foreground mt-1">{story.solution}</p>
                  </div>
                  
                  {/* Métricas en Grid */}
                  <div className="grid grid-cols-2 gap-3 py-3">
                    {story.metrics && typeof story.metrics === 'object' && Object.entries(story.metrics).map(([key, value]) => (
                      <div key={key} className="bg-background/60 rounded-lg p-3 text-center border">
                        <div className="text-2xl font-bold text-primary">{String(value)}</div>
                        <div className="text-xs text-muted-foreground uppercase">{key.replace(/_/g, ' ')}</div>
                      </div>
                    ))}
                  </div>

                  {/* Cita */}
                  {story.quote && (
                    <div className="bg-background/40 rounded-lg p-4 border-l-4 border-primary">
                      <Quote className="h-4 w-4 text-primary/50 mb-2" />
                      <p className="text-sm italic text-muted-foreground mb-2">"{story.quote}"</p>
                      <p className="text-xs font-semibold text-right">— {story.author_role}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Explorador por Sector */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">Explora por Sector</h3>
          <Tabs value={selectedSector} onValueChange={setSelectedSector} className="w-full">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-11 mb-8">
              {sectors.map((sector) => (
                <TabsTrigger key={sector} value={sector} className="text-xs">
                  {sector === "all" ? "Todos" : sector}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStories.slice(0, 9).map((story) => (
                <Card key={story.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{story.company_name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">{story.sector}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-3">
                      {story.challenge}
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">{story.impact_highlight}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      <style>{`
        .marquee-container {
          position: relative;
          width: 100%;
        }
        
        .marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
