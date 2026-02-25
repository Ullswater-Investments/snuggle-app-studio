// ODRL 2.2 Compact Policy Generator — W3C Best Practices §3.3.1 / UNE 0087
// Maps user-friendly Spanish labels to official ODRL actions

const ODRL_PERMISSIONS: Record<string, string> = {
  "Uso comercial": "commercialize",
  "Análisis interno": "use",
  "Generar informes derivados": "derive",
  "Integración en sistemas internos": "execute",
  "Uso en investigación": "use",
};

const ODRL_PROHIBITIONS: Record<string, string> = {
  "No redistribución": "distribute",
  "No ingeniería inversa": "reverseEngineer",
  "No reventa a terceros": "sell",
  "No divulgación pública": "display",
};

const ODRL_DUTIES: Record<string, string> = {
  "Atribución requerida": "attribute",
  "Cumplimiento GDPR": "ensureExclusivity",
  "Notificar uso a proveedor": "inform",
  "Renovación de licencia": "use",
};

interface OdrlRule {
  action: string;
  description: string;
}

function mapLabels(
  labels: string[],
  dictionary: Record<string, string>
): OdrlRule[] {
  return labels.map((label) => ({
    action: dictionary[label] ?? "use",
    description: label,
  }));
}

export function generateODRLPolicy(
  permissions: string[],
  prohibitions: string[],
  obligations: string[],
  providerWallet: string,
  assetId: string,
  termsUrl?: string
) {
  const target = `urn:uuid:${assetId}`;
  const assigner = `did:ethr:${providerWallet || "unknown"}`;

  const policy: Record<string, unknown> = {
    "@context": [
      "http://www.w3.org/ns/odrl.jsonld",
      { dcterms: "http://purl.org/dc/terms/" },
    ],
    type: "Offer",
    uid: `urn:uuid:${crypto.randomUUID()}`,
    profile: "http://www.w3.org/ns/odrl/2/",
    assigner,
    target,
    permission: mapLabels(permissions, ODRL_PERMISSIONS),
    prohibition: mapLabels(prohibitions, ODRL_PROHIBITIONS),
    duty: mapLabels(obligations, ODRL_DUTIES),
  };

  if (termsUrl) {
    policy["dcterms:references"] = termsUrl;
  }

  return policy;
}
