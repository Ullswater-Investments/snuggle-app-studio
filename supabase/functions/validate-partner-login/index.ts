import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { partner_slug, username, password } = await req.json();

    if (!partner_slug || !username || !password) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get partner by slug
    const { data: partner, error } = await supabase
      .from('partner_access')
      .select('id, partner_name, username, password_hash, redirect_path, is_active')
      .eq('partner_slug', partner_slug)
      .eq('is_active', true)
      .single();

    if (error || !partner) {
      return new Response(
        JSON.stringify({ error: 'Partner no encontrado' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate credentials (case-insensitive username comparison)
    const usernameMatch = partner.username.toUpperCase() === username.toUpperCase();
    const passwordMatch = partner.password_hash === password;

    if (!usernameMatch || !passwordMatch) {
      return new Response(
        JSON.stringify({ error: 'Credenciales incorrectas' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate session token (simple implementation)
    const sessionToken = crypto.randomUUID();
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

    return new Response(
      JSON.stringify({
        success: true,
        token: sessionToken,
        expires_at: expiresAt,
        partner_name: partner.partner_name,
        redirect_path: partner.redirect_path
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
