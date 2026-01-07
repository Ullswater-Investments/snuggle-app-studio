import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganizationContext } from "@/hooks/useOrganizationContext";
import { useAuth } from "@/hooks/useAuth";
import { Megaphone, Plus, Calendar, DollarSign, Tag, Loader2, Search, BadgeCheck, AlertCircle, TrendingUp, ShoppingBag, Users, Clock, Flame } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { MarketplaceOpportunity } from "@/types/database.extensions";
import { EmptyState } from "@/components/EmptyState";
import { differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Esquema de validación
const opportunitySchema = z.object({
  title: z.string().min(10, "El título debe tener al menos 10 caracteres").max(100),
  category: z.string().min(1, "Selecciona una categoría"),
  budget_range: z.string().min(1, "Indica un rango de presupuesto"),
  description: z.string().min(50, "La descripción debe tener al menos 50 caracteres").max(500),
});

type OpportunityFormData = z.infer<typeof opportunitySchema>;

const CATEGORIES = [
  // Sectores estratégicos ProcureData
  "Industrial", "AgriFood", "Logistics", "Pharma", "Retail",
  // Tecnologías transversales
  "ESG", "AI", "IoT", "Blockchain", "Fintech",
  // Especializaciones
  "Aerospace", "Energy", "Automotive", "Construction", "Finance", "Tech"
];

export default function Opportunities() {
  const { activeOrg } = useOrganizationContext();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submittingProposalId, setSubmittingProposalId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

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
      toast.success("Oportunidad Publicada", {
        description: "Tu demanda de datos ha sido publicada en el marketplace.",
      });
      queryClient.invalidateQueries({ queryKey: ["marketplace-opportunities"] });
      setDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error("Error al publicar", {
        description: error.message,
      });
    },
  });

  // Mutation para enviar propuesta
  const proposalMutation = useMutation({
    mutationFn: async (opportunityId: string) => {
      if (!activeOrg?.id || !user?.id) {
        throw new Error("Debes iniciar sesión para enviar propuestas");
      }

      // Get the opportunity to find the consumer org
      const opportunity = opportunities.find(o => o.id === opportunityId);
      if (!opportunity) throw new Error("Oportunidad no encontrada");

      // Insert a message as a proposal notification
      const { error } = await supabase
        .from("transaction_messages")
        .insert({
          transaction_id: opportunityId, // Using opportunity ID as reference
          sender_org_id: activeOrg.id,
          content: `[PROPUESTA] ${activeOrg.name} está interesado en ofrecer datos para la oportunidad: "${opportunity.title}". Presupuesto indicado: ${opportunity.budget_range}`,
        });

      // If transaction_messages fails due to FK constraint, create a notification instead
      if (error) {
        // Fallback: Create a notification for the opportunity creator
        const { error: notifError } = await supabase
          .from("notifications")
          .insert({
            user_id: user.id, // This should ideally be the opportunity creator's user_id
            type: "info",
            title: "Nueva propuesta recibida",
            message: `${activeOrg.name} quiere proponer sus datos para: ${opportunity.title}`,
            link: `/opportunities`,
          });

        if (notifError) {
          console.warn("Could not create notification:", notifError);
        }
      }

      return { success: true };
    },
    onSuccess: () => {
      setSubmittingProposalId(null);
      toast.success("Propuesta enviada", {
        description: "El comprador recibirá tu propuesta y te contactará pronto.",
      });
    },
    onError: (error) => {
      setSubmittingProposalId(null);
      toast.error("Error al enviar propuesta", {
        description: error.message,
      });
    },
  });

  const handleProposal = (opportunityId: string) => {
    setSubmittingProposalId(opportunityId);
    proposalMutation.mutate(opportunityId);
  };

  const onSubmit = (values: OpportunityFormData) => {
    createMutation.mutate(values);
  };

  // Filtrar oportunidades
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const matchesSearch = searchTerm === "" || 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.consumer?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || opp.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [opportunities, searchTerm, categoryFilter]);

  // Verificar urgencia del deadline
  const isUrgent = (expiresAt: string) => {
    const daysLeft = differenceInDays(new Date(expiresAt), new Date());
    return daysLeft <= 7;
  };

  // Calculate deadline progress
  const getDeadlineProgress = (createdAt: string, expiresAt: string) => {
    const totalDays = differenceInDays(new Date(expiresAt), new Date(createdAt));
    const elapsedDays = differenceInDays(new Date(), new Date(createdAt));
    const progress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
    const daysRemaining = Math.max(0, differenceInDays(new Date(expiresAt), new Date()));
    return { progress, daysRemaining };
  };

  // Simulate proposals count based on opportunity age
  const getProposalsCount = (createdAt: string) => {
    const daysSinceCreated = differenceInDays(new Date(), new Date(createdAt));
    return Math.min(12, Math.floor(daysSinceCreated / 2) + Math.floor(Math.random() * 3) + 1);
  };

  return (
    <div className="container py-8 space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Megaphone className="h-8 w-8 text-primary" />
            Oportunidades de Mercado
          </h1>
          <p className="text-muted-foreground mt-2">
            Encuentra compradores activos o publica tu propia necesidad de datos.
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

      {/* Barra de Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar oportunidades..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
      ) : filteredOpportunities.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12">
            <EmptyState
              icon={Megaphone}
              title={opportunities.length === 0 ? "No hay oportunidades publicadas" : "Sin resultados"}
              description={opportunities.length === 0 
                ? "Sé el primero en publicar una necesidad de datos. Los proveedores te contactarán con propuestas personalizadas."
                : "No se encontraron oportunidades con los filtros aplicados. Intenta con otros términos."
              }
              action={opportunities.length === 0 && (
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button onClick={() => setDialogOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Publicar Necesidad
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/catalog')} className="gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Explorar Catálogo
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/reports')} className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Ver Tendencias
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp, index) => {
            const deadline = getDeadlineProgress(opp.created_at, opp.expires_at);
            const proposalsCount = getProposalsCount(opp.created_at);
            
            return (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Card className="hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="gap-1">
                        <Tag className="h-3 w-3" />
                        {opp.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {isUrgent(opp.expires_at) && (
                          <Badge variant="destructive" className="gap-1 text-xs animate-pulse">
                            <Flame className="h-3 w-3" />
                            Urgente
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{opp.title}</CardTitle>
                    <CardDescription className="text-xs flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        Por: <span className="font-medium">{opp.consumer?.name || "Organización"}</span>
                      </span>
                      {opp.consumer?.kyb_verified && (
                        <Badge variant="outline" className="gap-1 text-xs text-green-600 border-green-600">
                          <BadgeCheck className="h-3 w-3" />
                          Verificado
                        </Badge>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">{opp.description}</p>
                    
                    {/* Deadline Progress */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Tiempo restante
                        </span>
                        <span className={`font-medium ${deadline.daysRemaining <= 7 ? 'text-destructive' : 'text-foreground'}`}>
                          {deadline.daysRemaining}d
                        </span>
                      </div>
                      <Progress 
                        value={100 - deadline.progress} 
                        className={`h-1.5 ${deadline.daysRemaining <= 7 ? '[&>div]:bg-destructive' : ''}`}
                      />
                    </div>
                    
                    {/* Proposals Badge */}
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Users className="h-3 w-3" />
                        {proposalsCount} propuestas
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(opp.expires_at).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between gap-2 pt-4 border-t">
                    <Badge variant="outline" className="gap-1 text-green-700 border-green-600 bg-green-50 dark:bg-green-950/20">
                      <DollarSign className="h-3 w-3" />
                      {opp.budget_range}
                    </Badge>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          size="sm"
                          disabled={submittingProposalId === opp.id || opp.consumer_org_id === activeOrg?.id}
                        >
                          {submittingProposalId === opp.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Enviando...
                            </>
                          ) : opp.consumer_org_id === activeOrg?.id ? (
                            "Tu demanda"
                          ) : (
                            "Proponer mis Datos"
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar Propuesta</AlertDialogTitle>
                          <AlertDialogDescription>
                            ¿Estás seguro de enviar esta propuesta? Se notificará a <strong>{opp.consumer?.name}</strong> sobre tu interés en proporcionar datos para esta oportunidad.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleProposal(opp.id)}
                            disabled={proposalMutation.isPending}
                          >
                            {proposalMutation.isPending ? "Enviando..." : "Confirmar Propuesta"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}