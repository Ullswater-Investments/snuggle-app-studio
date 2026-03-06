import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  transactionId: string;
  eventType: "created" | "pre_approved" | "approved" | "denied" | "completed" | "download";
}

// Role-aware notification messages per event type
const ROLE_MESSAGES: Record<string, {
  consumer?: { title: (name: string) => string; message: (name: string) => string };
  provider?: { title: (name: string) => string; message: (name: string) => string };
  shared?: { title: (name: string) => string; message: (name: string) => string };
}> = {
  created: {
    consumer: {
      title: (name) => `${name}: Solicitud enviada`,
      message: (name) => `Tu petición para ${name} está en manos del proveedor`,
    },
    provider: {
      title: (name) => `${name}: Nueva solicitud`,
      message: (name) => `Has recibido una petición de acceso para ${name}`,
    },
  },
  pre_approved: {
    consumer: {
      title: (name) => `${name}: Pre-aprobada`,
      message: (name) => `Tu solicitud para ${name} ha sido pre-aprobada. Pendiente de aprobación final`,
    },
  },
  approved: {
    consumer: {
      title: (name) => `${name}: Acceso concedido`,
      message: (name) => `Ya puedes explorar los datos de ${name}`,
    },
    provider: {
      title: (name) => `${name}: Operación completada`,
      message: (name) => `Has autorizado el acceso a ${name}`,
    },
  },
  denied: {
    consumer: {
      title: (name) => `${name}: Solicitud denegada`,
      message: (name) => `Tu petición para ${name} no ha sido aceptada`,
    },
    provider: {
      title: (name) => `${name}: Solicitud denegada`,
      message: (name) => `Has denegado la solicitud de acceso para ${name}`,
    },
  },
  completed: {
    shared: {
      title: (name) => `${name}: Intercambio completado`,
      message: (name) => `El intercambio de datos de ${name} se ha completado`,
    },
  },
  download: {
    consumer: {
      title: (name) => `Descarga completada: ${name}`,
      message: (name) => `Has obtenido una copia actualizada de ${name}`,
    },
    provider: {
      title: (name) => `Descarga de activo: ${name}`,
      message: (_name) => `La organización {consumerName} ha obtenido una copia actualizada de los datos`,
    },
  },
};

const EMAIL_TEMPLATES = {
  created: {
    subject: "Nueva Solicitud de Datos - PROCUREDATA",
    getBody: (data: any) => `
      <h1>Nueva Solicitud de Datos</h1>
      <p>Se ha creado una nueva solicitud de datos que requiere tu atención.</p>
      <h2>Detalles:</h2>
      <ul>
        <li><strong>Producto:</strong> ${data.product_name}</li>
        <li><strong>Solicitante:</strong> ${data.consumer_name}</li>
        <li><strong>Propósito:</strong> ${data.purpose}</li>
        <li><strong>Duración:</strong> ${data.access_duration_days} días</li>
      </ul>
      <p><strong>Justificación:</strong></p>
      <p>${data.justification}</p>
      <p>Por favor, revisa y pre-aprueba esta solicitud en tu dashboard de PROCUREDATA.</p>
    `,
  },
  pre_approved: {
    subject: "Solicitud Pre-aprobada - Acción Requerida - PROCUREDATA",
    getBody: (data: any) => `
      <h1>Solicitud Pre-aprobada</h1>
      <p>El proveedor (Subject) ha pre-aprobado la solicitud de datos. Ahora requiere tu aprobación final.</p>
      <h2>Detalles:</h2>
      <ul>
        <li><strong>Producto:</strong> ${data.product_name}</li>
        <li><strong>Solicitante:</strong> ${data.consumer_name}</li>
        <li><strong>Proveedor (Subject):</strong> ${data.subject_name}</li>
        <li><strong>Propósito:</strong> ${data.purpose}</li>
      </ul>
      <p>Como poseedor de estos datos (Holder), debes aprobar o denegar el acceso.</p>
    `,
  },
  approved: {
    subject: "Solicitud Aprobada - Datos Disponibles - PROCUREDATA",
    getBody: (data: any) => `
      <h1>¡Solicitud Aprobada!</h1>
      <p>Tu solicitud de datos ha sido aprobada por todas las partes.</p>
      <h2>Detalles:</h2>
      <ul>
        <li><strong>Producto:</strong> ${data.product_name}</li>
        <li><strong>Proveedor:</strong> ${data.subject_name}</li>
        <li><strong>Estado:</strong> Completada</li>
      </ul>
      <p>Los datos ya están disponibles para su visualización y exportación en tu dashboard.</p>
    `,
  },
  denied: {
    subject: "Solicitud Denegada - PROCUREDATA",
    getBody: (data: any) => `
      <h1>Solicitud Denegada</h1>
      <p>Lamentablemente, tu solicitud de datos ha sido denegada.</p>
      <h2>Detalles:</h2>
      <ul>
        <li><strong>Producto:</strong> ${data.product_name}</li>
        <li><strong>Proveedor:</strong> ${data.subject_name}</li>
      </ul>
      <p>Puedes revisar los detalles en tu dashboard o contactar con el proveedor para más información.</p>
    `,
  },
  completed: {
    subject: "Transacción Completada - PROCUREDATA",
    getBody: (data: any) => `
      <h1>Transacción Completada</h1>
      <p>La transacción de datos ha sido completada exitosamente.</p>
      <h2>Detalles:</h2>
      <ul>
        <li><strong>Producto:</strong> ${data.product_name}</li>
        <li><strong>Consumidor:</strong> ${data.consumer_name}</li>
        <li><strong>Fecha:</strong> ${new Date().toLocaleDateString("es-ES")}</li>
      </ul>
      <p>Todos los datos han sido transferidos según la política acordada.</p>
    `,
  },
  download: {
    subject: "Descarga de datos disponible - ProcureData",
    html: `
      <h1>Descarga disponible</h1>
      <p>Los datos solicitados están listos para su descarga.</p>
      <p>Acceda a la plataforma para descargar los datos.</p>
    `,
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { transactionId, eventType }: NotificationRequest = await req.json();

    if (!transactionId || !eventType) {
      return new Response(
        JSON.stringify({ error: "transactionId and eventType are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing ${eventType} notification for transaction:`, transactionId);

    // Fetch full transaction data
    const { data: transaction, error: txError } = await supabaseClient
      .from("data_transactions")
      .select(`
        *,
        asset:data_assets (
          product:data_products (name, description)
        ),
        consumer_org:organizations!data_transactions_consumer_org_id_fkey (name),
        subject_org:organizations!data_transactions_subject_org_id_fkey (name),
        holder_org:organizations!data_transactions_holder_org_id_fkey (name)
      `)
      .eq("id", transactionId)
      .single();

    if (txError || !transaction) {
      console.error("Transaction fetch error:", txError);
      return new Response(
        JSON.stringify({ error: "Transaction not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const productName = transaction.asset?.product?.name || "Dataset";
    const assetId = transaction.asset_id;
    // For approved events, link directly to the data view; otherwise to the request detail
    const link = eventType === "approved" ? `/data/view/${assetId}` 
      : eventType === "download" ? `/data/view/${transactionId}`
      : `/requests/${transactionId}`;

    // ──────────────────────────────────────────────
    // 1. Persist in-app notifications to DB
    // ──────────────────────────────────────────────
    const roleMessages = ROLE_MESSAGES[eventType];
    if (roleMessages) {
      const notifRows: any[] = [];

      // Helper to fetch user IDs for an org
      const getUsersForOrg = async (orgId: string) => {
        const { data } = await supabaseClient
          .from("user_profiles")
          .select("user_id")
          .eq("organization_id", orgId);
        return (data || []).map((p: any) => p.user_id);
      };

      // Consumer notifications
      if (roleMessages.consumer) {
        const userIds = await getUsersForOrg(transaction.consumer_org_id);
        for (const uid of userIds) {
          notifRows.push({
            user_id: uid,
            organization_id: transaction.consumer_org_id,
            title: roleMessages.consumer.title(productName),
            message: roleMessages.consumer.message(productName),
            type: eventType === "approved" ? "success" : eventType === "denied" ? "warning" : "info",
            link,
          });
        }
      }

      // Provider (subject) notifications
      if (roleMessages.provider) {
        const userIds = await getUsersForOrg(transaction.subject_org_id);
        const consumerName = transaction.consumer_org?.name || "Un consumidor";
        for (const uid of userIds) {
          // For download events, enrich provider message with consumer org name
          const providerMessage = eventType === "download"
            ? `La organización ${consumerName} ha obtenido una copia actualizada de los datos`
            : roleMessages.provider.message(productName);
          notifRows.push({
            user_id: uid,
            organization_id: transaction.subject_org_id,
            title: roleMessages.provider.title(productName),
            message: providerMessage,
            type: eventType === "approved" ? "success" : eventType === "denied" ? "warning" : "info",
            link,
          });
        }
      }

      // Shared notifications (e.g. completed → both consumer and provider)
      if (roleMessages.shared) {
        const consumerUsers = await getUsersForOrg(transaction.consumer_org_id);
        const providerUsers = await getUsersForOrg(transaction.subject_org_id);
        const allUsers = [...new Set([...consumerUsers, ...providerUsers])];
        for (const uid of allUsers) {
          notifRows.push({
            user_id: uid,
            organization_id: null,
            title: roleMessages.shared.title(productName),
            message: roleMessages.shared.message(productName),
            type: "success",
            link,
          });
        }
      }

      if (notifRows.length > 0) {
        const { error: insertErr } = await supabaseClient
          .from("notifications")
          .insert(notifRows);

        if (insertErr) {
          console.error("Error persisting in-app notifications:", insertErr);
        } else {
          console.log(`Persisted ${notifRows.length} role-based notifications`);
        }
      }
    }

    // ──────────────────────────────────────────────
    // 2. Send emails via Resend
    // ──────────────────────────────────────────────
    const { data: requesterData } = await supabaseClient.auth.admin.getUserById(
      transaction.requested_by
    );
    const requesterEmail = requesterData?.user?.email;

    const recipients: string[] = [];

    if (eventType === "created") {
      const { data: subjectProfiles } = await supabaseClient
        .from("user_profiles")
        .select("user_id")
        .eq("organization_id", transaction.subject_org_id);

      if (subjectProfiles) {
        for (const profile of subjectProfiles) {
          const { data: userData } = await supabaseClient.auth.admin.getUserById(profile.user_id);
          if (userData?.user?.email) recipients.push(userData.user.email);
        }
      }
    } else if (eventType === "pre_approved") {
      const { data: holderProfiles } = await supabaseClient
        .from("user_profiles")
        .select("user_id")
        .eq("organization_id", transaction.holder_org_id);

      if (holderProfiles) {
        for (const profile of holderProfiles) {
          const { data: userData } = await supabaseClient.auth.admin.getUserById(profile.user_id);
          if (userData?.user?.email) recipients.push(userData.user.email);
        }
      }
    } else if (requesterEmail) {
      recipients.push(requesterEmail);
    }

    if (recipients.length === 0) {
      console.warn("No email recipients found");
      return new Response(
        JSON.stringify({ success: true, message: "Notifications persisted, no email recipients" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const templateData = {
      product_name: productName,
      consumer_name: transaction.consumer_org?.name || "N/A",
      subject_name: transaction.subject_org?.name || "N/A",
      holder_name: transaction.holder_org?.name || "N/A",
      purpose: transaction.purpose,
      access_duration_days: transaction.access_duration_days,
      justification: transaction.justification,
      status: transaction.status,
    };

    const template = EMAIL_TEMPLATES[eventType];

    const emailPromises = recipients.map((email) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "PROCUREDATA <onboarding@resend.dev>",
          to: [email],
          subject: template.subject,
          html: template.getBody(templateData),
        }),
      }).then((res) => res.json())
    );

    const results = await Promise.allSettled(emailPromises);
    const successCount = results.filter((r) => r.status === "fulfilled").length;
    const failedCount = results.filter((r) => r.status === "rejected").length;

    console.log(`Email results: ${successCount} sent, ${failedCount} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        event: eventType,
        recipients: recipients.length,
        sent: successCount,
        failed: failedCount,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in notification-handler:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
