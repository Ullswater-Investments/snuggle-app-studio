import type { FlowNode, FlowConnection } from "./CaseFlowDiagram";

interface CaseFlowConfig {
  nodes: FlowNode[];
  connections: FlowConnection[];
  keywordMap: Record<string, string>;
}

const HUB_COLOR = "hsl(262, 52%, 47%)";

export const caseFlowConfigs: Record<string, CaseFlowConfig> = {
  "gigafactory-north": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "factory", label: "GigaFactory", x: 80, y: 80, color: "hsl(32, 94%, 54%)", size: 28 },
      { id: "supplier", label: "Proveedor Tier 2", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "passport", label: "Pasaporte Digital", x: 420, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "odrl", label: "Firma ODRL", x: 80, y: 320, color: "hsl(0, 84%, 60%)", size: 24 },
      { id: "erp", label: "Conector ERP", x: 250, y: 380, color: "hsl(187, 100%, 42%)", size: 24 },
    ],
    connections: [
      { from: "factory", to: "hub" }, { from: "supplier", to: "hub" },
      { from: "hub", to: "passport" }, { from: "hub", to: "odrl" },
      { from: "odrl", to: "erp" }, { from: "passport", to: "supplier" },
      { from: "factory", to: "erp" },
    ],
    keywordMap: {
      gigafactory: "factory", fábrica: "factory", planta: "factory",
      proveedor: "supplier", "tier 2": "supplier", metalúrgico: "supplier",
      pasaporte: "passport", "digital": "passport", certificación: "passport",
      odrl: "odrl", firma: "odrl", contrato: "odrl", política: "odrl",
      erp: "erp", conector: "erp", sap: "erp",
      procuredata: "hub", homologación: "hub",
    },
  },

  "olivetrust-coop": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "coop", label: "OliveTrust", x: 80, y: 80, color: "hsl(142, 71%, 45%)", size: 28 },
      { id: "iot", label: "Sensores IoT", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "blockchain", label: "Blockchain", x: 420, y: 320, color: "hsl(32, 94%, 54%)", size: 26 },
      { id: "passport", label: "Pasaporte Aceite", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "buyer", label: "Distribuidor EU", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "coop", to: "hub" }, { from: "iot", to: "hub" },
      { from: "hub", to: "blockchain" }, { from: "hub", to: "passport" },
      { from: "blockchain", to: "passport" }, { from: "passport", to: "buyer" },
      { from: "coop", to: "iot" },
    ],
    keywordMap: {
      olivetrust: "coop", cooperativa: "coop", aceite: "coop", finca: "coop",
      iot: "iot", sensor: "iot", riego: "iot", "huella hídrica": "iot",
      blockchain: "blockchain", pontus: "blockchain", notarización: "blockchain",
      pasaporte: "passport", trazabilidad: "passport", certificado: "passport",
      distribuidor: "buyer", edeka: "buyer", exportación: "buyer",
      procuredata: "hub", esg: "hub",
    },
  },

  "urbandeliver-bcn": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "fleet", label: "Flota Logística", x: 80, y: 80, color: "hsl(187, 100%, 42%)", size: 28 },
      { id: "erp", label: "Conector ERP", x: 420, y: 80, color: "hsl(32, 94%, 54%)", size: 24 },
      { id: "scope3", label: "Calculadora Scope 3", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "csrd", label: "Informe CSRD", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "bank", label: "Green Finance", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "fleet", to: "hub" }, { from: "erp", to: "hub" },
      { from: "hub", to: "scope3" }, { from: "hub", to: "csrd" },
      { from: "scope3", to: "csrd" }, { from: "csrd", to: "bank" },
      { from: "fleet", to: "erp" },
    ],
    keywordMap: {
      flota: "fleet", logística: "fleet", "obd-ii": "fleet", telemetría: "fleet",
      erp: "erp", conector: "erp",
      "scope 3": "scope3", scope3: "scope3", emisiones: "scope3", carbono: "scope3",
      csrd: "csrd", informe: "csrd", reporte: "csrd",
      banco: "bank", crédito: "bank", financiación: "bank", "green finance": "bank",
      procuredata: "hub", urbandeliver: "fleet",
    },
  },

  "alianza-social-hub": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "cee", label: "Centros Empleo", x: 80, y: 80, color: "hsl(270, 70%, 55%)", size: 28 },
      { id: "sroi", label: "Dashboard SROI", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "did", label: "Verificación DID", x: 420, y: 320, color: "hsl(32, 94%, 54%)", size: 26 },
      { id: "corp", label: "Corporaciones", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "report", label: "Memoria CSRD", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "cee", to: "hub" }, { from: "hub", to: "sroi" },
      { from: "hub", to: "did" }, { from: "corp", to: "hub" },
      { from: "sroi", to: "report" }, { from: "did", to: "corp" },
      { from: "cee", to: "corp" },
    ],
    keywordMap: {
      centro: "cee", empleo: "cee", alianza: "cee", social: "cee",
      sroi: "sroi", impacto: "sroi", retorno: "sroi", dashboard: "sroi",
      did: "did", verificación: "did", "social-washing": "did", pontus: "did",
      corporación: "corp", rsc: "corp", lgd: "corp", cuota: "corp",
      memoria: "report", csrd: "report", sostenibilidad: "report",
      procuredata: "hub",
    },
  },

  "biomed-hospital": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "hospital", label: "Hospital", x: 80, y: 80, color: "hsl(350, 80%, 55%)", size: 28 },
      { id: "gdpr", label: "Anonimizador GDPR", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 24 },
      { id: "ml", label: "Modelo Predictivo", x: 420, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "mro", label: "Proveedor MRO", x: 80, y: 320, color: "hsl(32, 94%, 54%)", size: 26 },
      { id: "ids", label: "Conector IDS", x: 250, y: 380, color: "hsl(187, 100%, 42%)", size: 24 },
    ],
    connections: [
      { from: "hospital", to: "hub" }, { from: "hub", to: "gdpr" },
      { from: "gdpr", to: "ml" }, { from: "ml", to: "mro" },
      { from: "hub", to: "ids" }, { from: "mro", to: "hub" },
      { from: "hospital", to: "ids" },
    ],
    keywordMap: {
      hospital: "hospital", "resonancia magnética": "hospital", rm: "hospital", equipo: "hospital",
      gdpr: "gdpr", anonimizar: "gdpr", paciente: "gdpr", privacidad: "gdpr",
      predictivo: "ml", "machine learning": "ml", ml: "ml", fallo: "ml", "72h": "ml",
      mro: "mro", proveedor: "mro", repuesto: "mro", ecotech: "mro",
      ids: "ids", conector: "ids", "edge function": "ids",
      procuredata: "hub", biomed: "hospital",
    },
  },

  "globalretail-prime": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "retail", label: "GlobalRetail", x: 80, y: 80, color: "hsl(217, 91%, 60%)", size: 28 },
      { id: "supplier", label: "Proveedores Asia", x: 420, y: 80, color: "hsl(32, 94%, 54%)", size: 26 },
      { id: "audit", label: "Auditoría SA8000", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "odrl", label: "ODRL Validator", x: 80, y: 320, color: "hsl(0, 84%, 60%)", size: 24 },
      { id: "blockchain", label: "Blockchain", x: 250, y: 380, color: "hsl(187, 100%, 42%)", size: 24 },
    ],
    connections: [
      { from: "retail", to: "hub" }, { from: "supplier", to: "hub" },
      { from: "hub", to: "audit" }, { from: "hub", to: "odrl" },
      { from: "audit", to: "blockchain" }, { from: "odrl", to: "retail" },
      { from: "supplier", to: "audit" },
    ],
    keywordMap: {
      globalretail: "retail", retail: "retail", multinacional: "retail", ética: "retail",
      proveedor: "supplier", asia: "supplier", textil: "supplier",
      auditoría: "audit", sa8000: "audit", certificadora: "audit",
      odrl: "odrl", "license validator": "odrl", política: "odrl",
      blockchain: "blockchain", pontus: "blockchain", integridad: "blockchain",
      procuredata: "hub",
    },
  },

  "ecovolt-manufacturing": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "plant", label: "Planta Aluminio", x: 80, y: 80, color: "hsl(45, 93%, 47%)", size: 28 },
      { id: "iot", label: "Contador IoT", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "smart", label: "Smart Contract", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "gdo", label: "Certificado GdO", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "euroe", label: "Pago EUROe", x: 250, y: 380, color: "hsl(32, 94%, 54%)", size: 24 },
    ],
    connections: [
      { from: "plant", to: "hub" }, { from: "iot", to: "hub" },
      { from: "hub", to: "smart" }, { from: "smart", to: "gdo" },
      { from: "smart", to: "euroe" }, { from: "gdo", to: "plant" },
      { from: "iot", to: "smart" },
    ],
    keywordMap: {
      ecovolt: "plant", planta: "plant", aluminio: "plant", fábrica: "plant",
      iot: "iot", contador: "iot", consumo: "iot", "tiempo real": "iot",
      "smart contract": "smart", contrato: "smart", automático: "smart",
      "garantía de origen": "gdo", gdo: "gdo", renovable: "gdo", "carbon neutral": "gdo",
      euroe: "euroe", pago: "euroe", "12 segundos": "euroe", conciliación: "euroe",
      procuredata: "hub", wallet: "euroe",
    },
  },
};
