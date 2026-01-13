import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationPayload {
  role: "buyer" | "supplier";
  organization: {
    legalName: string;
    taxId: string;
    country: string;
    address: string;
    sector: string;
    size: string;
    productCategory?: string;
    erpType?: string;
  };
  representative: {
    fullName: string;
    position?: string;
    email: string;
    phone?: string;
  };
  intention: {
    dataTypes: string[];
    hasErp?: string;
  };
  acceptances: {
    terms: boolean;
    gdpr: boolean;
    conduct: boolean;
  };
}

function validatePayload(payload: RegistrationPayload): string[] {
  const errors: string[] = [];

  // Validate role
  if (!payload.role || !["buyer", "supplier"].includes(payload.role)) {
    errors.push("Invalid role. Must be 'buyer' or 'supplier'");
  }

  // Validate organization
  if (!payload.organization?.legalName?.trim()) {
    errors.push("Legal name is required");
  }
  if (!payload.organization?.taxId?.trim()) {
    errors.push("Tax ID is required");
  }
  if (!payload.organization?.country?.trim()) {
    errors.push("Country is required");
  }
  if (!payload.organization?.address?.trim()) {
    errors.push("Address is required");
  }
  if (!payload.organization?.sector?.trim()) {
    errors.push("Sector is required");
  }
  if (!payload.organization?.size?.trim()) {
    errors.push("Company size is required");
  }

  // Validate representative
  if (!payload.representative?.fullName?.trim()) {
    errors.push("Representative name is required");
  }
  if (!payload.representative?.email?.trim()) {
    errors.push("Representative email is required");
  } else {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.representative.email)) {
      errors.push("Invalid email format");
    }
  }

  // Validate acceptances
  if (!payload.acceptances?.terms) {
    errors.push("Terms and conditions must be accepted");
  }
  if (!payload.acceptances?.gdpr) {
    errors.push("GDPR policy must be accepted");
  }
  if (!payload.acceptances?.conduct) {
    errors.push("Code of conduct must be accepted");
  }

  return errors;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow POST
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const payload: RegistrationPayload = await req.json();

    // Validate payload
    const validationErrors = validatePayload(payload);
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: validationErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for inserting
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check for existing pending request with same tax_id
    const { data: existingRequest } = await supabase
      .from("registration_requests")
      .select("id, status")
      .eq("tax_id", payload.organization.taxId)
      .in("status", ["pending", "under_review"])
      .single();

    if (existingRequest) {
      return new Response(
        JSON.stringify({
          error: "Duplicate request",
          message: "A registration request with this Tax ID is already being processed",
          requestId: existingRequest.id,
        }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get client info
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Insert registration request
    const { data: request, error: insertError } = await supabase
      .from("registration_requests")
      .insert({
        role: payload.role,
        legal_name: payload.organization.legalName.trim(),
        tax_id: payload.organization.taxId.trim().toUpperCase(),
        country: payload.organization.country,
        address: payload.organization.address.trim(),
        sector: payload.organization.sector,
        size: payload.organization.size,
        product_category: payload.role === "supplier" ? payload.organization.productCategory : null,
        erp_type: payload.role === "buyer" ? payload.organization.erpType : null,
        representative_name: payload.representative.fullName.trim(),
        representative_position: payload.representative.position?.trim() || null,
        representative_email: payload.representative.email.trim().toLowerCase(),
        representative_phone: payload.representative.phone?.trim() || null,
        intention_data_types: payload.intention.dataTypes || [],
        intention_has_erp: payload.intention.hasErp || null,
        accepted_terms: payload.acceptances.terms,
        accepted_gdpr: payload.acceptances.gdpr,
        accepted_conduct: payload.acceptances.conduct,
        status: "pending",
        ip_address: ipAddress,
        user_agent: userAgent,
      })
      .select("id, created_at")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit registration", details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // TODO: Send confirmation email to representative
    // TODO: Create notification for admins

    return new Response(
      JSON.stringify({
        success: true,
        message: "Registration request submitted successfully",
        requestId: request.id,
        submittedAt: request.created_at,
      }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
