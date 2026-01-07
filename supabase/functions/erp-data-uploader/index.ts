import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UploadDataRequest {
  transactionId: string;
  erpConfigId: string;
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

    const { transactionId, erpConfigId }: UploadDataRequest = await req.json();

    if (!transactionId || !erpConfigId) {
      return new Response(
        JSON.stringify({ error: "transactionId and erpConfigId are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Uploading data for transaction:", transactionId);

    // Obtener datos del proveedor
    const { data: supplierData, error: dataError } = await supabaseClient
      .from("supplier_data")
      .select("*")
      .eq("transaction_id", transactionId);

    if (dataError || !supplierData || supplierData.length === 0) {
      console.error("Data fetch error:", dataError);
      return new Response(
        JSON.stringify({ error: "No supplier data found for this transaction" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Obtener configuración ERP
    const { data: config, error: configError } = await supabaseClient
      .from("erp_configurations")
      .select("*")
      .eq("id", erpConfigId)
      .single();

    if (configError || !config) {
      console.error("Config fetch error:", configError);
      return new Response(
        JSON.stringify({ error: "ERP configuration not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Obtener organización del usuario
    const { data: profile } = await supabaseClient
      .from("user_profiles")
      .select("organization_id")
      .eq("user_id", user.id)
      .single();

    if (!profile) {
      return new Response(
        JSON.stringify({ error: "User profile not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Sending data to ERP:", config.endpoint_url);

    // Preparar headers según método de autenticación
    const erpHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (config.auth_method === "bearer" && config.auth_token_encrypted) {
      erpHeaders["Authorization"] = `Bearer ${config.auth_token_encrypted}`;
    } else if (config.auth_method === "api_key" && config.api_key_encrypted) {
      erpHeaders["X-API-Key"] = config.api_key_encrypted;
    } else if (config.auth_method === "basic" && config.auth_token_encrypted) {
      erpHeaders["Authorization"] = `Basic ${config.auth_token_encrypted}`;
    }

    // Transformar datos según field_mapping si existe
    let payload = supplierData;
    if (config.field_mapping) {
      console.log("Applying field mapping...");
      // Aquí se podría implementar lógica de mapeo de campos
      // Por ahora enviamos los datos tal cual
    }

    // Enviar datos al ERP
    let uploadStatus = "failed";
    let errorMessage = "";

    try {
      const erpResponse = await fetch(config.endpoint_url, {
        method: "POST",
        headers: erpHeaders,
        body: JSON.stringify(payload),
      });

      const responseText = await erpResponse.text();
      console.log("ERP Response:", erpResponse.status, responseText);

      if (erpResponse.ok) {
        uploadStatus = "success";
        console.log("Data uploaded successfully");
      } else {
        uploadStatus = "failed";
        errorMessage = `HTTP ${erpResponse.status}: ${responseText}`;
        console.error("Upload failed:", errorMessage);
      }
    } catch (error: any) {
      uploadStatus = "failed";
      errorMessage = error.message || "Connection error";
      console.error("Upload error:", error);
    }

    // Registrar log de exportación
    const { error: logError } = await supabaseClient
      .from("export_logs")
      .insert({
        transaction_id: transactionId,
        organization_id: profile.organization_id,
        export_type: "erp",
        export_status: uploadStatus,
        erp_config_id: erpConfigId,
        user_id: user.id,
        error_message: errorMessage || null,
      });

    if (logError) {
      console.error("Log error:", logError);
    }

    return new Response(
      JSON.stringify({
        success: uploadStatus === "success",
        status: uploadStatus,
        message: uploadStatus === "success"
          ? "Data uploaded to ERP successfully"
          : errorMessage,
        records_sent: supplierData.length,
      }),
      {
        status: uploadStatus === "success" ? 200 : 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in erp-data-uploader:", error);
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
