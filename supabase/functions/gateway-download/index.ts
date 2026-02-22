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

    // 1. Verify transaction exists and consumer matches
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

    // 2. Try data_payloads first
    const { data: payload } = await supabaseAdmin
      .from("data_payloads")
      .select("data_content, schema_type")
      .eq("transaction_id", transactionId)
      .maybeSingle();

    if (payload?.data_content) {
      return new Response(
        JSON.stringify({
          source: "data_payloads",
          schema_type: payload.schema_type,
          data: payload.data_content,
          downloaded_at: new Date().toISOString(),
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Fallback to supplier_data
    const { data: suppliers } = await supabaseAdmin
      .from("supplier_data")
      .select("*")
      .eq("transaction_id", transactionId);

    if (suppliers && suppliers.length > 0) {
      return new Response(
        JSON.stringify({
          source: "supplier_data",
          schema_type: "supplier",
          data: suppliers,
          downloaded_at: new Date().toISOString(),
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. No data found
    return new Response(
      JSON.stringify({ error: "No se encontraron datos asociados a esta transacción" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("gateway-download error:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
