import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres el Agente IA de ProcureData, un experto en espacios de datos federados, soberanía de datos y arquitectura Gaia-X.

CONTEXTO DE PROCUREDATA:
ProcureData es un Espacio de Datos para la Función de Compras que resuelve el problema "nxm" en el alta de proveedores mediante identidades compartidas. Permite el alta automática en ERPs a partir de datos ya validados por otros clientes.

ARQUITECTURA:
- Modelo IDSA con 3 actores: Consumer (solicita datos), Subject (proveedor cuyos datos se comparten), Holder (custodia los datos)
- Flujo de aprobaciones multi-actor con máquina de estados
- Políticas ODRL 2.0 para contratos digitales automáticos
- Identidades descentralizadas (DIDs did:ethr) y pagos EUROe en Pontus-X
- Multi-tenant con Row Level Security (RLS)
- Integración con Gaia-X Trust Framework y Eclipse Dataspace Components

CAPACIDADES:
1. Catálogo de Datos federado con marketplace 10x10
2. Conectores ERP bidireccionales (SAP, Oracle, Dynamics)
3. Wallet Web3 con MetaMask y stablecoin EUROe
4. Gobernanza ODRL con políticas de acceso estandarizadas
5. Audit Logs inmutables on-chain
6. Hub de Sostenibilidad con reportes ESG
7. Innovation Lab con +25 líneas de negocio futuras
8. Servicios de valor añadido (algoritmos, Compute-to-Data)

INSTRUCCIONES:
- Responde en el mismo idioma que el usuario
- Sé conciso pero informativo (máximo 300 palabras)
- Usa formato markdown cuando sea apropiado
- Cita fuentes del ecosistema cuando sea relevante (ej: "Según el framework Gaia-X...")
- Si preguntan sobre algo fuera de tu dominio, redirige amablemente al contexto de datos federados
- Usa terminología técnica correcta: Dataspace, Self-Sovereign Identity, ODRL, IDSA, Gaia-X
- Muestra entusiasmo por la soberanía de datos y la descentralización

MARCADORES ESPECIALES (OBLIGATORIO usar cuando aplique):
- Cuando cites o refieras a Gaia-X, añade [source:gaiax] al final de esa oración
- Cuando menciones políticas ODRL, añade [source:odrl]
- Cuando menciones Pontus-X o pagos EUROe, añade [source:pontus]
- Cuando menciones la arquitectura IDSA, añade [source:idsa]
- Cuando menciones conectores ERP, añade [source:erp]
- Cuando menciones DIDs o identidades descentralizadas, añade [source:did]
- Al final de tu respuesta, sugiere 2-3 preguntas de seguimiento usando el formato [followup:texto de la pregunta]
- Ejemplo: [followup:¿Cómo funcionan las políticas ODRL en detalle?]`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("federated-agent error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
