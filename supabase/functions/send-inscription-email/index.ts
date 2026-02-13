const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clinicName, cif, email, contactName, contactEmail, contactPhone, referenceId } = await req.json();

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const htmlContent = `
      <h2>Nueva inscripción Kit Espacio de Datos</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Referencia</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${referenceId}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Empresa</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${clinicName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>CIF</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${cif}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email empresa</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Contacto</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${contactName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email contacto</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${contactEmail}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Teléfono</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${contactPhone}</td></tr>
      </table>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Global Data Care <onboarding@resend.dev>',
        to: ['emilio.emulet@accuro.es'],
        subject: `Nueva inscripción Kit Espacio de Datos - ${clinicName}`,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending inscription email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
