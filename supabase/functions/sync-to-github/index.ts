import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { feedbackId } = await req.json();

    if (!feedbackId) {
      throw new Error("feedbackId es requerido");
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the approved feedback
    const { data: feedback, error: dbError } = await supabase
      .from('ai_feedback')
      .select('*')
      .eq('id', feedbackId)
      .single();

    if (dbError || !feedback) {
      throw new Error(`Feedback no encontrado: ${dbError?.message || 'ID inválido'}`);
    }

    if (!feedback.user_correction) {
      throw new Error("Este feedback no tiene corrección del usuario");
    }

    // GitHub credentials
    const GITHUB_PAT = Deno.env.get('GITHUB_PAT');
    const OWNER = Deno.env.get('GITHUB_REPO_OWNER');
    const REPO = Deno.env.get('GITHUB_REPO_NAME');
    
    if (!GITHUB_PAT || !OWNER || !REPO) {
      throw new Error("Configuración de GitHub incompleta. Verifica GITHUB_PAT, GITHUB_REPO_OWNER y GITHUB_REPO_NAME");
    }

    const PATH = "training-data/ARIA_MASTER_KB.md";
    const GITHUB_API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

    console.log(`📂 Intentando acceder a: ${GITHUB_API_URL}`);

    // Get current file from GitHub
    const getFileRes = await fetch(GITHUB_API_URL, {
      headers: { 
        "Authorization": `Bearer ${GITHUB_PAT}`,
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "ProcureData-ARIA"
      }
    });

    let currentContent = "";
    let fileSha = "";

    if (getFileRes.ok) {
      // File exists, get its content
      const fileData = await getFileRes.json();
      fileSha = fileData.sha;
      
      // Decode Base64 content
      try {
        currentContent = decodeURIComponent(escape(atob(fileData.content.replace(/\n/g, ''))));
      } catch {
        currentContent = atob(fileData.content.replace(/\n/g, ''));
      }
      console.log("✅ Archivo existente encontrado, longitud:", currentContent.length);
    } else if (getFileRes.status === 404) {
      // File doesn't exist, create it
      console.log("📝 Archivo no existe, se creará nuevo");
      currentContent = `# ARIA Master Knowledge Base\n\nBase de conocimiento generada desde feedback de usuarios.\n\n---\n`;
    } else {
      const errorText = await getFileRes.text();
      throw new Error(`Error al leer GitHub: ${getFileRes.status} - ${errorText}`);
    }

    // Create new Q&A entry
    const timestamp = new Date().toISOString();
    const sector = feedback.user_sector || 'General';
    const page = feedback.current_page || '/';
    
    const newEntry = `

---

## Actualización via Feedback
**Fecha:** ${timestamp}  
**Sector:** ${sector}  
**Página:** ${page}

### Pregunta del Usuario
> ${feedback.user_question}

### Respuesta Original (Incorrecta)
${feedback.bot_response}

### ✅ Respuesta Correcta (Validada)
${feedback.user_correction}

---
`;

    const updatedContent = currentContent + newEntry;

    // Encode content to Base64 (UTF-8 safe)
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(updatedContent);
    const base64Content = btoa(String.fromCharCode(...utf8Bytes));

    // Push update to GitHub
    const updatePayload: Record<string, string> = {
      message: `🧠 ARIA Learning: Corrección validada - ID ${feedbackId.substring(0, 8)}`,
      content: base64Content,
    };

    if (fileSha) {
      updatePayload.sha = fileSha;
    }

    const updateRes = await fetch(GITHUB_API_URL, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${GITHUB_PAT}`,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "ProcureData-ARIA"
      },
      body: JSON.stringify(updatePayload)
    });

    if (!updateRes.ok) {
      const errorData = await updateRes.text();
      throw new Error(`Error al escribir en GitHub: ${updateRes.status} - ${errorData}`);
    }

    const commitData = await updateRes.json();
    console.log("✅ Commit exitoso:", commitData.commit?.sha);

    // Mark feedback as 'applied' in database
    const { error: updateError } = await supabase
      .from('ai_feedback')
      .update({ status: 'applied' })
      .eq('id', feedbackId);

    if (updateError) {
      console.error("⚠️ Warning: No se pudo actualizar estado en DB:", updateError.message);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Conocimiento sincronizado con GitHub",
      commit_sha: commitData.commit?.sha,
      commit_url: commitData.commit?.html_url
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Error en sync-to-github:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Error desconocido" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
