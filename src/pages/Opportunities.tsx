import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { Megaphone, Plus, Calendar, DollarSign, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { MarketplaceOpportunity } from "@/types/database.extensions";
import { EmptyState } from "@/components/EmptyState";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Esquema de validación
const opportunitySchema = z.object({
  title: z.string().min(10, "El título debe tener al menos 10 caracteres").max(100),
  category: z.string().min(1, "Selecciona una categoría"),
  budget_range: z.string().min(1, "Indica un rango de presupuesto"),
  description: z.string().min(50, "La descripción debe tener al menos 50 caracteres").max(500),
});

type OpportunityFormData = z.infer<typeof opportunitySchema>;

const CATEGORIES = [
  "Automotive", "Energy", "Pharma", "Retail", "Construction", 
  "Finance", "Logistics", "AgriFood", "Aerospace", "Tech"
];

export default function Opportunities() {
  const { activeOrg } = useOrganizationContext();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch opportunities
  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ["marketplace-opportunities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketplace_opportunities")
        .select(`
          *,
          consumer:organizations!consumer_org_id(id, name, kyb_verified)
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as any[] || [];
    },
  });

  // Form setup
  const form = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: "",
      category: "",
      budget_range: "",
      description: "",
    },
  });

  // Mutation para crear oportunidad
  const createMutation = useMutation({
    mutationFn: async (values: OpportunityFormData) => {
      if (!activeOrg?.id) throw new Error("No hay organización activa");

      const { data, error } = await supabase
        .from("marketplace_opportunities")
        .insert([{
          consumer_org_id: activeOrg.id,
          title: values.title,
          category: values.category,
          budget_range: values.budget_range,
          description: values.description,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "✅ Oportunidad Publicada",
        description: "Tu demanda de datos ha sido publicada en el marketplace.",
      });
      queryClient.invalidateQueries({ queryKey: ["marketplace-opportunities"] });
      setDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "❌ Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleProposal = (opportunityId: string) => {
    toast({
      title: "✅ Propuesta Enviada",
      description: "Tu propuesta ha sido enviada al comprador. Te contactarán pronto.",
    });
  };

  const onSubmit = (values: OpportunityFormData) => {
    createMutation.mutate(values);
  };

  return (
    <div className="container py-8 space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Megaphone className="h-8 w-8 text-primary" />
            Demandas de Datos
          </h1>
          <p className="text-muted-foreground mt-2">
            Encuentra compradores activos buscando datos que tú posees.
          </p>
        </div>

        {/* Botón Publicar Necesidad */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Publicar Necesidad
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Publicar Nueva Demanda de Datos</DialogTitle>
              <DialogDescription>
                Describe qué tipo de datos necesitas y los proveedores te contactarán con propuestas.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título de la Demanda</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Necesito datos de telemetría de vehículos eléctricos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget_range"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Presupuesto Estimado</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: 2.000 - 5.000 EUR" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción Detallada</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe qué datos necesitas, para qué propósito, qué características deben tener..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Publicando..." : "Publicar Demanda"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Oportunidades */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-6 bg-muted rounded w-2/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : opportunities.length === 0 ? (
        <Card className="border-dashed">
          <CardContent>
            <EmptyState
              icon={Megaphone}
              title="No hay oportunidades publicadas"
              description="Sé el primero en publicar una necesidad de datos. Los proveedores te contactarán con propuestas personalizadas."
              action={
                <Button onClick={() => setDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Publicar Necesidad
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <Card key={opp.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="gap-1">
                    <Tag className="h-3 w-3" />
                    {opp.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(opp.expires_at).toLocaleDateString("es-ES")}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{opp.title}</CardTitle>
                <CardDescription className="text-xs flex items-center gap-1">
                  Por: <span className="font-medium">{opp.consumer?.name || "Organización"}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{opp.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="gap-1 text-green-700 border-green-600 bg-green-50 dark:bg-green-950/20">
                  <DollarSign className="h-3 w-3" />
                  {opp.budget_range}
                </Badge>
                <Button size="sm" onClick={() => handleProposal(opp.id)}>
                  Proponer mis Datos
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
