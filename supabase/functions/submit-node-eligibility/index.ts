import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EligibilityRequest {
  entityName: string;
  entityType: string;
  ecosystemStatus: string;
  email: string;
  source?: string;
  extraData?: {
    phone?: string | null;
    plantCount?: string;
    message?: string;
  };
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ready':
      return { text: 'LEAD CALIFICADO', color: '#10b981', bgColor: '#d1fae5' };
    case 'process':
      return { text: 'EN PROCESO', color: '#f59e0b', bgColor: '#fef3c7' };
    case 'help':
      return { text: 'NECESITA APOYO', color: '#ef4444', bgColor: '#fee2e2' };
    case 'aracea_participant':
      return { text: 'ARACEA - PARTICIPANTE', color: '#ea580c', bgColor: '#ffedd5' };
    default:
      return { text: 'PENDIENTE', color: '#6b7280', bgColor: '#f3f4f6' };
  }
};

const getEntityTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    cluster: 'Clúster / Asociación',
    empresa: 'Gran Empresa',
    centro: 'Centro Tecnológico',
    otro: 'Otro',
    // ARACEA tipos
    fabrica_cemento: 'Fábrica de cemento',
    planta_hormigon: 'Planta de hormigón',
    gestor_residuos: 'Gestor de residuos / Valorizador',
    proveedor_materias: 'Proveedor de materias primas',
    centro_tecnologico: 'Centro tecnológico / I+D',
    otra: 'Otra empresa del sector',
  };
  return labels[type] || type;
};

const getEcosystemLabel = (status: string) => {
  const labels: Record<string, string> = {
    ready: 'Sí, ya tiene el grupo identificado',
    process: 'En proceso de captación',
    help: 'Necesita ayuda para captarlas',
    aracea_participant: 'Solicitud de adhesión al Nodo ARACEA',
  };
  return labels[status] || status;
};

const getPlantCountLabel = (count: string) => {
  const labels: Record<string, string> = {
    '1': '1 planta',
    '2-5': '2-5 plantas',
    '6-10': '6-10 plantas',
    '10+': 'Más de 10 plantas',
  };
  return labels[count] || count;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: EligibilityRequest = await req.json();
    
    if (!payload.entityName || !payload.entityType || !payload.ecosystemStatus || !payload.email) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Validation failed',
          message: 'Todos los campos son obligatorios' 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Validation failed',
          message: 'El formato del email no es válido' 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Construir notes con datos extra si vienen de ARACEA
    let notes: string | null = null;
    if (payload.source === "aracea" && payload.extraData) {
      notes = JSON.stringify({
        source: "aracea",
        phone: payload.extraData.phone,
        plantCount: payload.extraData.plantCount,
        message: payload.extraData.message,
      });
    }

    const { data: insertedData, error: insertError } = await supabase
      .from("node_eligibility_requests")
      .insert({
        entity_name: payload.entityName,
        entity_type: payload.entityType,
        ecosystem_status: payload.ecosystemStatus,
        email: payload.email,
        ip_address: ipAddress,
        user_agent: userAgent,
        status: 'pending',
        notes: notes,
      })
      .select('id, created_at')
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Database error',
          message: 'Error al guardar la solicitud' 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Eligibility request saved:", insertedData.id);

    const badge = getStatusBadge(payload.ecosystemStatus);
    const isAracea = payload.source === "aracea";
    
    // Email HTML personalizado según origen
    const emailHtml = isAracea ? `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #ea580c, #c2410c); color: white; padding: 24px; }
          .content { background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 16px; padding: 12px; background: #f9fafb; border-radius: 8px; }
          .label { font-weight: bold; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { font-size: 16px; color: #111827; margin-top: 4px; }
          .footer { background: #1f2937; color: white; padding: 16px; text-align: center; font-size: 12px; }
          .badge { display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          .priority-banner { padding: 12px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
          .aracea-logo { display: flex; align-items: center; gap: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="aracea-logo">
              <span style="font-size: 28px;">🏭</span>
              <div>
                <h1 style="margin: 0; font-size: 22px;">Nueva Solicitud Nodo ARACEA</h1>
                <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 14px;">OFICEMEN - Sector Cemento</p>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="priority-banner" style="background: ${badge.bgColor};">
              <span class="badge" style="background: ${badge.color}; color: white;">${badge.text}</span>
            </div>
            
            <div class="field">
              <div class="label">Empresa Solicitante</div>
              <div class="value">${payload.entityName}</div>
            </div>
            
            <div class="field">
              <div class="label">Tipo de Organización</div>
              <div class="value">${getEntityTypeLabel(payload.entityType)}</div>
            </div>
            
            <div class="field">
              <div class="label">Número de Plantas</div>
              <div class="value">${payload.extraData?.plantCount ? getPlantCountLabel(payload.extraData.plantCount) : 'No especificado'}</div>
            </div>
            
            <div class="field">
              <div class="label">Email de Contacto</div>
              <div class="value"><a href="mailto:${payload.email}" style="color: #ea580c;">${payload.email}</a></div>
            </div>
            
            ${payload.extraData?.phone ? `
            <div class="field">
              <div class="label">Teléfono</div>
              <div class="value">${payload.extraData.phone}</div>
            </div>
            ` : ''}
            
            ${payload.extraData?.message ? `
            <div class="field">
              <div class="label">Mensaje / Comentarios</div>
              <div class="value">${payload.extraData.message}</div>
            </div>
            ` : ''}
            
            <div class="field" style="background: #fef3c7; border: 1px solid #fcd34d;">
              <div class="label" style="color: #92400e;">Acción Requerida</div>
              <div class="value" style="color: #92400e;">Contactar para iniciar proceso adhesión al Nodo ARACEA</div>
            </div>
            
            <p style="font-size: 12px; color: #6b7280; margin-top: 20px;">
              <strong>ID de Solicitud:</strong> ${insertedData.id}<br>
              <strong>Fecha:</strong> ${new Date(insertedData.created_at).toLocaleString('es-ES', { 
                dateStyle: 'full', 
                timeStyle: 'medium',
                timeZone: 'Europe/Madrid'
              })}
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0;">PROCUREDATA - Nodo ARACEA/OFICEMEN</p>
            <p style="margin: 4px 0 0 0; opacity: 0.7;">Espacio de Datos del Sector Cemento</p>
          </div>
        </div>
      </body>
      </html>
    ` : `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #ea580c, #f97316); color: white; padding: 24px; }
          .content { background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 16px; padding: 12px; background: #f9fafb; border-radius: 8px; }
          .label { font-weight: bold; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { font-size: 16px; color: #111827; margin-top: 4px; }
          .footer { background: #1f2937; color: white; padding: 16px; text-align: center; font-size: 12px; }
          .badge { display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          .priority-banner { padding: 12px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 22px;">🏢 Nueva Solicitud de Nodo Sectorial</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Formulario de Elegibilidad Completado</p>
          </div>
          <div class="content">
            <div class="priority-banner" style="background: ${badge.bgColor};">
              <span class="badge" style="background: ${badge.color}; color: white;">${badge.text}</span>
            </div>
            
            <div class="field">
              <div class="label">Entidad Promotora</div>
              <div class="value">${payload.entityName}</div>
            </div>
            
            <div class="field">
              <div class="label">Tipo de Entidad</div>
              <div class="value">${getEntityTypeLabel(payload.entityType)}</div>
            </div>
            
            <div class="field">
              <div class="label">Estado del Ecosistema (¿5+ empresas?)</div>
              <div class="value">${getEcosystemLabel(payload.ecosystemStatus)}</div>
            </div>
            
            <div class="field">
              <div class="label">Email de Contacto</div>
              <div class="value"><a href="mailto:${payload.email}" style="color: #ea580c;">${payload.email}</a></div>
            </div>
            
            <div class="field" style="background: #fef3c7; border: 1px solid #fcd34d;">
              <div class="label" style="color: #92400e;">Acción Requerida</div>
              <div class="value" style="color: #92400e;">Enviar borrador de MOU y documentación SEDIA en 24-48h</div>
            </div>
            
            <p style="font-size: 12px; color: #6b7280; margin-top: 20px;">
              <strong>ID de Solicitud:</strong> ${insertedData.id}<br>
              <strong>Fecha:</strong> ${new Date(insertedData.created_at).toLocaleString('es-ES', { 
                dateStyle: 'full', 
                timeStyle: 'medium',
                timeZone: 'Europe/Madrid'
              })}
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0;">PROCUREDATA - Nodos Sectoriales Gaia-X</p>
            <p style="margin: 4px 0 0 0; opacity: 0.7;">Este es un correo automático del sistema de captación.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailSubject = isAracea 
      ? `🏭 Adhesión ARACEA - ${payload.entityName}` 
      : `🏢 Nueva Solicitud de Nodo - ${payload.entityName}`;

    const emailResponse = await resend.emails.send({
      from: isAracea ? "ARACEA Nodo <onboarding@resend.dev>" : "PROCUREDATA Nodos <onboarding@resend.dev>",
      to: ["eduardo@agileprocurement.es"],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email notification sent:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Solicitud registrada correctamente',
        requestId: insertedData.id,
        submittedAt: insertedData.created_at
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error in submit-node-eligibility:", error);
    const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Server error',
        message: errorMessage
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
