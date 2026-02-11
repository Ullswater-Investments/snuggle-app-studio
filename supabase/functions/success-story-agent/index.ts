import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BASE_CONTEXT = `Eres el Agente IA de ProcureData especializado en un caso de éxito concreto.

CONTEXTO GENERAL DE PROCUREDATA:
ProcureData es un Espacio de Datos para la Función de Compras basado en arquitectura Gaia-X/IDSA. Resuelve el problema "nxm" en el alta de proveedores mediante identidades compartidas y Pasaportes Digitales verificados en la red Pontus-X.

ARQUITECTURA:
- Modelo IDSA con 3 actores: Consumer, Subject (proveedor), Holder (custodia datos)
- Políticas ODRL 2.0 para contratos digitales automáticos
- Identidades descentralizadas (DIDs did:ethr) y pagos EUROe en Pontus-X
- Integración con Gaia-X Trust Framework y Eclipse Dataspace Components
- Conectores ERP bidireccionales (SAP, Oracle, Dynamics)
- Wallet Web3 con MetaMask y stablecoin EUROe`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, caseContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    if (!caseContext) {
      return new Response(JSON.stringify({ error: "caseContext is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `${BASE_CONTEXT}

CASO DE ÉXITO ESPECÍFICO:
- Empresa: ${caseContext.company}
- Sector: ${caseContext.sector}
- Título: ${caseContext.title}
- Métrica principal: ${caseContext.metric} (${caseContext.metricLabel})

RETO:
${caseContext.challenge}

SOLUCIÓN IMPLEMENTADA:
${caseContext.solution}

SERVICIOS UTILIZADOS:
${(caseContext.services || []).map((s: string) => `- ${s}`).join("\n")}

CITA DEL ANÁLISIS:
"${caseContext.ariaQuote}"

INSTRUCCIONES:
- Responde en el mismo idioma que el usuario
- Sé un experto en este caso concreto, conoces todos los detalles
- Si preguntan por detalles técnicos, explica cómo la arquitectura Gaia-X/IDSA se aplicó en este caso
- Si preguntan cómo se aplica a su sector, haz analogías con los servicios usados en este caso
- Usa formato markdown cuando sea apropiado
- Máximo 400 palabras por respuesta
- Si preguntan algo totalmente fuera de contexto, redirige amablemente al caso de éxito`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
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
    console.error("success-story-agent error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
