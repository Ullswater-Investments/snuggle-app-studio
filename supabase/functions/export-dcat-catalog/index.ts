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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch all public catalog metadata
    const { data: entries, error } = await supabase
      .from("catalog_metadata")
      .select("*")
      .eq("visibility", "public");

    if (error) throw error;

    const datasets = (entries ?? []).map((e: Record<string, unknown>) => {
      const dataset: Record<string, unknown> = {
        "@type": "dcat:Dataset",
        "@id": `urn:procuredata:dataset:${e.asset_id}`,
        "dct:title": e.dct_title || `Dataset ${e.asset_id}`,
        "dct:description": e.dct_description || "",
        "dct:issued": e.dct_issued || e.created_at,
        "dct:modified": e.dct_modified || e.updated_at,
        "dct:accessRights": `http://publications.europa.eu/resource/authority/access-right/${(
          (e.dct_access_rights as string) || "PUBLIC"
        ).toUpperCase()}`,
      };

      if (e.dct_publisher) {
        dataset["dct:publisher"] = {
          "@type": "foaf:Agent",
          "foaf:name": e.dct_publisher,
        };
      }

      if (e.dct_language) {
        dataset["dct:language"] = (e.dct_language as string[]).map(
          (l: string) =>
            `http://publications.europa.eu/resource/authority/language/${l.toUpperCase()}`
        );
      }

      if (e.dct_spatial) dataset["dct:spatial"] = e.dct_spatial;

      if (e.dcat_theme) {
        dataset["dcat:theme"] = (e.dcat_theme as string[]).map(
          (t: string) =>
            `http://publications.europa.eu/resource/authority/data-theme/${t}`
        );
      }

      if (e.dct_conforms_to) dataset["dct:conformsTo"] = e.dct_conforms_to;

      if (e.dcat_contact_point) {
        const cp = e.dcat_contact_point as Record<string, string>;
        dataset["dcat:contactPoint"] = {
          "@type": "vcard:Kind",
          "vcard:fn": cp.fn,
          ...(cp.hasEmail && { "vcard:hasEmail": cp.hasEmail }),
        };
      }

      if (e.dcat_distribution) {
        dataset["dcat:distribution"] = (
          e.dcat_distribution as Array<Record<string, unknown>>
        ).map((d) => ({
          "@type": "dcat:Distribution",
          "dcat:accessURL": d.accessURL,
          "dct:format": d.format,
          ...((d as Record<string, unknown>).mediaType ? { "dcat:mediaType": (d as Record<string, unknown>).mediaType } : {}),
        }));
      }

      return dataset;
    });

    const catalog = {
      "@context": {
        dcat: "http://www.w3.org/ns/dcat#",
        dct: "http://purl.org/dc/terms/",
        foaf: "http://xmlns.com/foaf/0.1/",
        vcard: "http://www.w3.org/2006/vcard/ns#",
        xsd: "http://www.w3.org/2001/XMLSchema#",
      },
      "@type": "dcat:Catalog",
      "dct:title": "ProcureData – Catálogo de Datos Soberano",
      "dct:description":
        "Catálogo de activos de datos conforme DCAT-AP 3.0 del espacio de datos ProcureData.",
      "dct:publisher": {
        "@type": "foaf:Agent",
        "foaf:name": "ProcureData",
      },
      "dct:issued": new Date().toISOString(),
      "dct:language":
        "http://publications.europa.eu/resource/authority/language/SPA",
      "dct:conformsTo":
        "https://semiceu.github.io/DCAT-AP/releases/3.0.0/",
      "dcat:dataset": datasets,
    };

    return new Response(JSON.stringify(catalog, null, 2), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/ld+json; charset=utf-8",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
