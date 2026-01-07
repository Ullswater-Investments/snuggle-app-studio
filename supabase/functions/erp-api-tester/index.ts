import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TestConnectionRequest {
  configId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Obtener usuario autenticado
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { configId }: TestConnectionRequest = await req.json();

    if (!configId) {
      return new Response(
        JSON.stringify({ error: "configId is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Testing ERP connection for config:", configId);

    // Obtener configuración ERP
    const { data: config, error: configError } = await supabaseClient
      .from("erp_configurations")
      .select("*")
      .eq("id", configId)
      .single();

    if (configError || !config) {
      console.error("Config fetch error:", configError);
      return new Response(
        JSON.stringify({ error: "Configuration not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Testing connection to:", config.endpoint_url);

    // Preparar headers según método de autenticación
    const testHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (config.auth_method === "bearer" && config.auth_token_encrypted) {
      testHeaders["Authorization"] = `Bearer ${config.auth_token_encrypted}`;
    } else if (config.auth_method === "api_key" && config.api_key_encrypted) {
      testHeaders["X-API-Key"] = config.api_key_encrypted;
    } else if (config.auth_method === "basic" && config.auth_token_encrypted) {
      testHeaders["Authorization"] = `Basic ${config.auth_token_encrypted}`;
    }

    // Intentar conexión (HEAD request para verificar sin enviar datos)
    const startTime = Date.now();
    let testStatus = "failed";
    let errorMessage = "";

    try {
      const testResponse = await fetch(config.endpoint_url, {
        method: "HEAD",
        headers: testHeaders,
      });

      const responseTime = Date.now() - startTime;
      
      if (testResponse.ok || testResponse.status === 405) {
        // 405 Method Not Allowed es aceptable (significa que el endpoint existe)
        testStatus = "success";
        console.log(`Connection successful (${testResponse.status}) in ${responseTime}ms`);
      } else {
        testStatus = "failed";
        errorMessage = `HTTP ${testResponse.status}: ${testResponse.statusText}`;
        console.log(`Connection failed: ${errorMessage}`);
      }
    } catch (error: any) {
      testStatus = "failed";
      errorMessage = error.message || "Connection timeout or network error";
      console.error("Connection test error:", error);
    }

    // Actualizar registro en BD
    const { error: updateError } = await supabaseClient
      .from("erp_configurations")
      .update({
        last_test_date: new Date().toISOString(),
        last_test_status: testStatus,
      })
      .eq("id", configId);

    if (updateError) {
      console.error("Update error:", updateError);
    }

    return new Response(
      JSON.stringify({
        success: testStatus === "success",
        status: testStatus,
        message: testStatus === "success" 
          ? "Connection successful" 
          : errorMessage,
        tested_url: config.endpoint_url,
        auth_method: config.auth_method,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in erp-api-tester:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Internal server error",
        details: error.toString() 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
