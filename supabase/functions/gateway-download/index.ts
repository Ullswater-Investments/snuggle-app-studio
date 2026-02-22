import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transactionId, consumerOrgId } = await req.json();

    if (!transactionId || !consumerOrgId) {
      return new Response(
        JSON.stringify({ error: "transactionId y consumerOrgId son obligatorios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1. Verify transaction exists, is completed, and consumer matches
    const { data: tx, error: txErr } = await supabaseAdmin
      .from("data_transactions")
      .select("id, status, consumer_org_id, asset_id")
      .eq("id", transactionId)
      .single();

    if (txErr || !tx) {
      return new Response(
        JSON.stringify({ error: "Transacción no encontrada" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (tx.consumer_org_id !== consumerOrgId) {
      return new Response(
        JSON.stringify({ error: "No tienes permiso para acceder a esta transacción" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (tx.status !== "completed") {
      return new Response(
        JSON.stringify({ error: `La transacción no está completada (estado actual: ${tx.status})` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Get api_url from asset's custom_metadata
    const { data: asset, error: assetErr } = await supabaseAdmin
      .from("data_assets")
      .select("custom_metadata")
      .eq("id", tx.asset_id)
      .single();

    if (assetErr || !asset) {
      return new Response(
        JSON.stringify({ error: "Activo no encontrado" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const metadata = asset.custom_metadata as Record<string, any> | null;
    const apiUrl = metadata?.api_url;

    if (!apiUrl) {
      return new Response(
        JSON.stringify({ error: "Este activo no tiene una fuente de datos (api_url) configurada" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Fetch data from external API
    const apiHeaders = (metadata?.api_headers as Record<string, string>) || {};

    console.log(`Fetching data from external API: ${apiUrl}`);

    let externalRes: Response;
    try {
      externalRes = await fetch(apiUrl, {
        method: "GET",
        headers: apiHeaders,
      });
    } catch (fetchErr) {
      console.error("External API fetch failed:", fetchErr);
      return new Response(
        JSON.stringify({ error: `No se pudo conectar con la API del proveedor: ${(fetchErr as Error).message}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!externalRes.ok) {
      const errorBody = await externalRes.text().catch(() => "");
      console.error(`External API returned ${externalRes.status}: ${errorBody}`);
      return new Response(
        JSON.stringify({ error: `La API del proveedor respondió con error ${externalRes.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Return the external content to the frontend
    const content = await externalRes.text();
    const contentType = externalRes.headers.get("content-type") || "application/json";

    return new Response(content, {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": contentType },
    });
  } catch (err) {
    console.error("gateway-download error:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
