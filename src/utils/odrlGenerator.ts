// ODRL 2.2 Compact Policy Generator — W3C Best Practices §3.3.1 / UNE 0087
// Maps decoupled Keys to official ODRL actions + standard English descriptions

const ODRL_DICTIONARY: Record<string, { action: string; enDesc: string }> = {
  COMMERCIAL_USE:         { action: "commercialize",     enDesc: "Commercial use" },
  INTERNAL_ANALYSIS:      { action: "use",               enDesc: "Internal analysis" },
  DERIVATIVE_WORKS:       { action: "derive",            enDesc: "Generate derivative reports" },
  SYSTEM_INTEGRATION:     { action: "execute",           enDesc: "System integration" },
  RESEARCH_USE:           { action: "use",               enDesc: "Research use" },
  NO_REDISTRIBUTION:      { action: "distribute",        enDesc: "No redistribution" },
  NO_REVERSE_ENGINEERING: { action: "reverseEngineer",   enDesc: "No reverse engineering" },
  NO_RESALE:              { action: "sell",              enDesc: "No resale to third parties" },
  NO_PUBLIC_DISCLOSURE:   { action: "display",           enDesc: "No public disclosure" },
  ATTRIBUTION_REQUIRED:   { action: "attribute",         enDesc: "Attribution required" },
  GDPR_COMPLIANCE:        { action: "ensureExclusivity", enDesc: "GDPR compliance" },
  NOTIFY_PROVIDER:        { action: "inform",            enDesc: "Notify provider of usage" },
  LICENSE_RENEWAL:        { action: "use",               enDesc: "License renewal" },
};

interface OdrlRule {
  target: string;
  assigner: string;
  action: string;
  description: string;
}

function mapLabels(
  items: string[],
  target: string,
  assigner: string
): OdrlRule[] {
  return items.map((item) => {
    const config = ODRL_DICTIONARY[item];
    return {
      target,
      assigner,
      action: config ? config.action : "use",
      description: config ? config.enDesc : item, // custom rules keep original text
    };
  });
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
    permission: mapLabels(permissions, target, assigner),
    prohibition: mapLabels(prohibitions, target, assigner),
    duty: mapLabels(obligations, target, assigner),
  };

  if (termsUrl) {
    policy["dcterms:references"] = termsUrl;
  }

  return policy;
}
