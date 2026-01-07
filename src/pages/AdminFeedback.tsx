import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, ThumbsDown, MessageSquare, Calendar, MapPin, Building2, Github, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

interface Feedback {
  id: string;
  user_question: string;
  bot_response: string;
  is_positive: boolean;
  user_correction: string | null;
  current_page: string | null;
  user_sector: string | null;
  created_at: string;
  status: string | null;
}

export default function AdminFeedback() {
  const [activeTab, setActiveTab] = useState<"pending" | "all" | "applied">("pending");
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: feedback, isLoading } = useQuery({
    queryKey: ["ai-feedback", activeTab],
    queryFn: async () => {
      let query = supabase
        .from("ai_feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (activeTab === "pending") {
        query = query.eq("is_positive", false).not("user_correction", "is", null).neq("status", "applied").neq("status", "rejected");
      } else if (activeTab === "applied") {
        query = query.eq("status", "applied");
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      return data as Feedback[];
    },
  });

  const syncMutation = useMutation({
    mutationFn: async (feedbackId: string) => {
      setSyncingId(feedbackId);
      const { data, error } = await supabase.functions.invoke("sync-to-github", {
        body: { feedbackId }
      });
      
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      toast.success("✅ Conocimiento sincronizado con GitHub", {
        description: data.commit_sha ? `Commit: ${data.commit_sha.substring(0, 7)}` : undefined
      });
      queryClient.invalidateQueries({ queryKey: ["ai-feedback"] });
    },
    onError: (error) => {
      toast.error("Error al sincronizar", {
        description: error instanceof Error ? error.message : "Error desconocido"
      });
    },
    onSettled: () => {
      setSyncingId(null);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async (feedbackId: string) => {
      const { error } = await supabase
        .from("ai_feedback")
        .update({ status: "rejected" })
        .eq("id", feedbackId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Feedback descartado");
      queryClient.invalidateQueries({ queryKey: ["ai-feedback"] });
    },
    onError: (error) => {
      toast.error("Error al descartar", {
        description: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  });

  const pendingCount = feedback?.filter((f) => !f.is_positive && f.user_correction && f.status !== "applied" && f.status !== "rejected").length || 0;
  const appliedCount = feedback?.filter((f) => f.status === "applied").length || 0;
  const totalCount = feedback?.length || 0;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">ARIA Learning Hub</h1>
        <p className="text-muted-foreground mt-2">
          Revisa correcciones de usuarios y sincroniza el conocimiento validado con GitHub
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes de Revisar</p>
                <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aplicados a GitHub</p>
                <p className="text-2xl font-bold text-green-600">{appliedCount}</p>
              </div>
              <Github className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Pendientes ({pendingCount})
          </TabsTrigger>
          <TabsTrigger value="applied" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Aplicados
          </TabsTrigger>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Cargando feedback...</div>
          ) : !feedback?.length ? (
            <div className="text-center py-8 text-muted-foreground">
              {activeTab === "pending" 
                ? "🎉 No hay correcciones pendientes de revisar" 
                : "No hay feedback disponible"}
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-4 pr-4">
                {feedback.map((item) => (
                  <Card 
                    key={item.id} 
                    className={
                      item.status === "applied" 
                        ? "border-l-4 border-l-green-500 opacity-75" 
                        : item.status === "rejected"
                        ? "border-l-4 border-l-gray-400 opacity-50"
                        : item.user_correction 
                        ? "border-l-4 border-l-amber-500" 
                        : "border-l-4 border-l-red-500"
                    }
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.status === "applied" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" /> Aplicado
                            </Badge>
                          ) : item.status === "rejected" ? (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              <XCircle className="h-3 w-3 mr-1" /> Descartado
                            </Badge>
                          ) : item.user_correction ? (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              <MessageSquare className="h-3 w-3 mr-1" /> Pendiente
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              <ThumbsDown className="h-3 w-3 mr-1" /> Sin corrección
                            </Badge>
                          )}
                          {item.current_page && (
                            <Badge variant="secondary" className="text-xs">
                              <MapPin className="h-3 w-3 mr-1" /> {item.current_page}
                            </Badge>
                          )}
                          {item.user_sector && (
                            <Badge variant="secondary" className="text-xs">
                              <Building2 className="h-3 w-3 mr-1" /> {item.user_sector}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(item.created_at), "dd MMM yyyy HH:mm", { locale: es })}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Pregunta del usuario:</p>
                        <p className="text-sm bg-muted p-2 rounded">{item.user_question}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Respuesta de ARIA:</p>
                        <p className="text-sm bg-muted p-2 rounded whitespace-pre-wrap line-clamp-4">{item.bot_response}</p>
                      </div>
                      {item.user_correction && (
                        <div>
                          <p className="text-xs font-medium text-amber-600 mb-1">✏️ Corrección sugerida:</p>
                          <p className="text-sm bg-amber-50 dark:bg-amber-950/30 p-2 rounded border border-amber-200 dark:border-amber-800">
                            {item.user_correction}
                          </p>
                        </div>
                      )}
                      
                      {/* Action buttons for pending items */}
                      {item.user_correction && item.status !== "applied" && item.status !== "rejected" && (
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            onClick={() => syncMutation.mutate(item.id)}
                            disabled={syncingId === item.id || syncMutation.isPending}
                            className="gap-2"
                          >
                            {syncingId === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Github className="h-4 w-4" />
                            )}
                            Validar e Inyectar en ARIA
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectMutation.mutate(item.id)}
                            disabled={rejectMutation.isPending}
                            className="gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Descartar
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
