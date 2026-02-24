// ODRL 2.0 JSON-LD Generator — W3C / UNE 0087
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
};

interface OdrlAction {
  action: string;
  description?: string;
}

function mapLabels(labels: string[], dictionary: Record<string, string>): OdrlAction[] {
  return labels.map((label) => {
    const action = dictionary[label];
    if (action) return { action };
    return { action: "use", description: label };
  });
}

export function generateODRLPolicy(
  permissions: string[],
  prohibitions: string[],
  obligations: string[]
) {
  return {
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "@type": "Offer",
    uid: `urn:uuid:${crypto.randomUUID()}`,
    profile: "http://www.w3.org/ns/odrl/2/",
    permission: mapLabels(permissions, ODRL_PERMISSIONS),
    prohibition: mapLabels(prohibitions, ODRL_PROHIBITIONS),
    duty: mapLabels(obligations, ODRL_DUTIES),
  };
}
