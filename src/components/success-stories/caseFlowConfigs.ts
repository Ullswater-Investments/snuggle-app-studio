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
      { id: "factory", label: "GigaFactory", x: 80, y: 80, color: "hsl(209, 100%, 65%)", size: 28 },
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
      { id: "blockchain", label: "Blockchain", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
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
      { id: "erp", label: "Conector ERP", x: 420, y: 80, color: "hsl(209, 100%, 65%)", size: 24 },
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
      { id: "did", label: "Verificación DID", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
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
      { id: "mro", label: "Proveedor MRO", x: 80, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
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
      { id: "supplier", label: "Proveedores Asia", x: 420, y: 80, color: "hsl(209, 100%, 65%)", size: 26 },
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
      { id: "euroe", label: "Pago EUROe", x: 250, y: 380, color: "hsl(209, 100%, 65%)", size: 24 },
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

  "sky-aero-systems": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "aero", label: "SkyAero", x: 80, y: 80, color: "hsl(217, 91%, 50%)", size: 28 },
      { id: "supplier", label: "Proveedor Tier 1", x: 420, y: 80, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "iso", label: "Auditoría EN9100", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "did", label: "Validador DID", x: 80, y: 320, color: "hsl(0, 84%, 60%)", size: 24 },
      { id: "api", label: "API Certificadora", x: 250, y: 380, color: "hsl(187, 100%, 42%)", size: 24 },
    ],
    connections: [
      { from: "aero", to: "hub" }, { from: "supplier", to: "hub" },
      { from: "hub", to: "iso" }, { from: "hub", to: "did" },
      { from: "iso", to: "api" }, { from: "did", to: "supplier" },
      { from: "aero", to: "api" },
    ],
    keywordMap: {
      skyaero: "aero", aeronáutica: "aero", aeroespacial: "aero", avión: "aero",
      proveedor: "supplier", "tier 1": "supplier", pieza: "supplier",
      en9100: "iso", auditoría: "iso", certificado: "iso", iso: "iso",
      did: "did", validador: "did", identidad: "did",
      certificadora: "api", api: "api", vigencia: "api",
      procuredata: "hub", homologación: "hub",
    },
  },

  "vinosdoe-elite": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "bodega", label: "Bodegas D.O.", x: 80, y: 80, color: "hsl(350, 60%, 45%)", size: 28 },
      { id: "blockchain", label: "Pontus-X", x: 420, y: 80, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "passport", label: "Pasaporte Vino", x: 420, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "qr", label: "QR Dinámico", x: 80, y: 320, color: "hsl(142, 71%, 45%)", size: 24 },
      { id: "market", label: "Mercado Asia", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "bodega", to: "hub" }, { from: "hub", to: "blockchain" },
      { from: "blockchain", to: "passport" }, { from: "hub", to: "qr" },
      { from: "qr", to: "market" }, { from: "passport", to: "market" },
      { from: "bodega", to: "qr" },
    ],
    keywordMap: {
      bodega: "bodega", vino: "bodega", "denominación": "bodega", cosecha: "bodega",
      blockchain: "blockchain", pontus: "blockchain", notarización: "blockchain",
      pasaporte: "passport", trazabilidad: "passport", lote: "passport",
      qr: "qr", dinámico: "qr", etiqueta: "qr",
      asia: "market", mercado: "market", exportación: "market", falsificación: "market",
      procuredata: "hub",
    },
  },

  "pharmacold-logistix": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "pharma", label: "PharmaCold", x: 80, y: 80, color: "hsl(0, 84%, 55%)", size: 28 },
      { id: "iot", label: "Telemetría IoT", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "smart", label: "Smart Contract", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "euroe", label: "Escrow EUROe", x: 80, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "carbon", label: "Carbon Tracker", x: 250, y: 380, color: "hsl(217, 91%, 60%)", size: 24 },
    ],
    connections: [
      { from: "pharma", to: "hub" }, { from: "iot", to: "hub" },
      { from: "hub", to: "smart" }, { from: "smart", to: "euroe" },
      { from: "iot", to: "smart" }, { from: "hub", to: "carbon" },
      { from: "pharma", to: "euroe" },
    ],
    keywordMap: {
      pharmacold: "pharma", vacuna: "pharma", vial: "pharma", cadena: "pharma",
      iot: "iot", telemetría: "iot", temperatura: "iot", sensor: "iot", frío: "iot",
      "smart contract": "smart", contrato: "smart", "8°c": "smart",
      euroe: "euroe", escrow: "euroe", pago: "euroe", liquidación: "euroe",
      carbono: "carbon", "carbon tracker": "carbon",
      procuredata: "hub",
    },
  },

  "portbcn-smart-trade": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "port", label: "Puerto BCN", x: 80, y: 80, color: "hsl(217, 80%, 40%)", size: 28 },
      { id: "passport", label: "Pasaporte Digital", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "webhook", label: "Webhooks IDS", x: 420, y: 320, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "kyb", label: "Validación KYB", x: 80, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "customs", label: "Aduana", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "port", to: "hub" }, { from: "hub", to: "passport" },
      { from: "hub", to: "webhook" }, { from: "webhook", to: "kyb" },
      { from: "kyb", to: "customs" }, { from: "passport", to: "customs" },
      { from: "port", to: "customs" },
    ],
    keywordMap: {
      puerto: "port", portbcn: "port", barco: "port", container: "port",
      pasaporte: "passport", digital: "passport", proveedor: "passport",
      webhook: "webhook", ids: "webhook", interoperabilidad: "webhook",
      kyb: "kyb", validación: "kyb", verificación: "kyb",
      aduana: "customs", despacho: "customs", aduanero: "customs",
      procuredata: "hub",
    },
  },

  "ayuntamiento-etico": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "gov", label: "Ayuntamiento", x: 80, y: 80, color: "hsl(270, 70%, 55%)", size: 28 },
      { id: "sroi", label: "Dashboard SROI", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "lgd", label: "Verificador LGD", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 24 },
      { id: "audit", label: "Auditoría Social", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "report", label: "Memoria ESG", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "gov", to: "hub" }, { from: "hub", to: "sroi" },
      { from: "hub", to: "lgd" }, { from: "lgd", to: "audit" },
      { from: "audit", to: "report" }, { from: "sroi", to: "report" },
      { from: "gov", to: "audit" },
    ],
    keywordMap: {
      ayuntamiento: "gov", contratación: "gov", pública: "gov", licitación: "gov",
      sroi: "sroi", impacto: "sroi", retorno: "sroi", dashboard: "sroi",
      lgd: "lgd", discapacidad: "lgd", cuota: "lgd",
      auditoría: "audit", social: "audit", nómina: "audit",
      memoria: "report", sostenibilidad: "report", transparencia: "report",
      procuredata: "hub",
    },
  },

  "purelithium-sourcing": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "mine", label: "Mina Litio", x: 80, y: 80, color: "hsl(210, 40%, 50%)", size: 28 },
      { id: "odrl", label: "Gobernanza ODRL", x: 420, y: 80, color: "hsl(0, 84%, 60%)", size: 26 },
      { id: "erp", label: "Conector ERP", x: 420, y: 320, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "csrd", label: "Reporte CSRD", x: 80, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "auto", label: "Automotriz", x: 250, y: 380, color: "hsl(209, 100%, 65%)", size: 24 },
    ],
    connections: [
      { from: "mine", to: "hub" }, { from: "hub", to: "odrl" },
      { from: "hub", to: "erp" }, { from: "odrl", to: "csrd" },
      { from: "csrd", to: "auto" }, { from: "erp", to: "auto" },
      { from: "mine", to: "odrl" },
    ],
    keywordMap: {
      litio: "mine", mina: "mine", mineral: "mine", "tier 3": "mine",
      odrl: "odrl", gobernanza: "odrl", ético: "odrl", política: "odrl",
      erp: "erp", conector: "erp",
      csrd: "csrd", reporte: "csrd", "b-corp": "csrd",
      automotriz: "auto", coche: "auto", eléctrico: "auto",
      procuredata: "hub",
    },
  },

  "fastfashion-trace": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "brand", label: "Marca Textil", x: 80, y: 80, color: "hsl(330, 70%, 55%)", size: 28 },
      { id: "erp", label: "Conectores ERP", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "norm", label: "Normalizer", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "cert", label: "Certificación", x: 80, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "green", label: "Anti-Greenwashing", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "brand", to: "hub" }, { from: "erp", to: "hub" },
      { from: "hub", to: "norm" }, { from: "hub", to: "cert" },
      { from: "norm", to: "green" }, { from: "cert", to: "green" },
      { from: "brand", to: "erp" },
    ],
    keywordMap: {
      marca: "brand", textil: "brand", prenda: "brand", moda: "brand",
      erp: "erp", conector: "erp", plm: "erp",
      normalizer: "norm", "raw data": "norm", composición: "norm",
      certificación: "cert", fibra: "cert", reciclada: "cert",
      greenwashing: "green", "anti-greenwashing": "green", circular: "green",
      procuredata: "hub",
    },
  },

  "invoicetrust-b2b": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "pyme", label: "PYME Industrial", x: 80, y: 80, color: "hsl(142, 71%, 45%)", size: 28 },
      { id: "score", label: "Trade Finance Score", x: 420, y: 80, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "factoring", label: "Factoring Connect", x: 420, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "euroe", label: "Wallet EUROe", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "blockchain", label: "Historial Blockchain", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "pyme", to: "hub" }, { from: "hub", to: "score" },
      { from: "score", to: "factoring" }, { from: "hub", to: "euroe" },
      { from: "factoring", to: "blockchain" }, { from: "euroe", to: "blockchain" },
      { from: "pyme", to: "euroe" },
    ],
    keywordMap: {
      pyme: "pyme", industrial: "pyme", factura: "pyme",
      score: "score", scoring: "score", solvencia: "score", crediticio: "score",
      factoring: "factoring", adelanto: "factoring", liquidez: "factoring",
      euroe: "euroe", wallet: "euroe", pago: "euroe",
      blockchain: "blockchain", historial: "blockchain", inmutable: "blockchain",
      procuredata: "hub",
    },
  },

  "gridflow-energy": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "naves", label: "Naves Industriales", x: 80, y: 80, color: "hsl(45, 93%, 47%)", size: 28 },
      { id: "edge", label: "Edge Functions", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "wallet", label: "Wallet Web3", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "liquid", label: "Liquidación Auto", x: 80, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "mapa", label: "Mapa Comunidad", x: 250, y: 380, color: "hsl(217, 91%, 60%)", size: 24 },
    ],
    connections: [
      { from: "naves", to: "hub" }, { from: "edge", to: "hub" },
      { from: "hub", to: "wallet" }, { from: "hub", to: "liquid" },
      { from: "wallet", to: "mapa" }, { from: "liquid", to: "mapa" },
      { from: "naves", to: "edge" },
    ],
    keywordMap: {
      nave: "naves", polígono: "naves", industrial: "naves",
      edge: "edge", "edge function": "edge", iot: "edge", contador: "edge",
      wallet: "wallet", web3: "wallet",
      liquidación: "liquid", "micro-pago": "liquid", excedente: "liquid",
      comunidad: "mapa", energética: "mapa", mapa: "mapa",
      procuredata: "hub",
    },
  },

  "ailabs-research": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "ailab", label: "AI-Labs", x: 80, y: 80, color: "hsl(270, 70%, 55%)", size: 28 },
      { id: "gdpr", label: "Anonimizador GDPR", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 24 },
      { id: "synth", label: "Generador Sintético", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "norm", label: "Raw Data Normalizer", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 26 },
      { id: "privacy", label: "Privacy Protection", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "ailab", to: "hub" }, { from: "hub", to: "gdpr" },
      { from: "gdpr", to: "synth" }, { from: "hub", to: "norm" },
      { from: "norm", to: "synth" }, { from: "synth", to: "privacy" },
      { from: "ailab", to: "norm" },
    ],
    keywordMap: {
      "ai-labs": "ailab", startup: "ailab", modelo: "ailab", training: "ailab",
      gdpr: "gdpr", anonimizar: "gdpr", privacidad: "gdpr",
      sintético: "synth", dataset: "synth", artificial: "synth",
      normalizer: "norm", "raw data": "norm", logística: "norm",
      privacy: "privacy", protección: "privacy",
      procuredata: "hub", ia: "hub",
    },
  },

  "helios-fields": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "solar", label: "Parque Solar", x: 80, y: 80, color: "hsl(45, 93%, 47%)", size: 28 },
      { id: "edge", label: "Edge Functions", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "erp", label: "Conector ERP", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "alertas", label: "Alertas Inteligentes", x: 80, y: 320, color: "hsl(0, 84%, 60%)", size: 26 },
      { id: "passport", label: "Pasaporte Activo", x: 250, y: 380, color: "hsl(142, 71%, 45%)", size: 24 },
    ],
    connections: [
      { from: "solar", to: "hub" }, { from: "edge", to: "hub" },
      { from: "hub", to: "erp" }, { from: "hub", to: "alertas" },
      { from: "alertas", to: "passport" }, { from: "erp", to: "passport" },
      { from: "solar", to: "edge" },
    ],
    keywordMap: {
      solar: "solar", panel: "solar", inversor: "solar", helios: "solar",
      edge: "edge", "edge function": "edge", telemetría: "edge", lectura: "edge",
      erp: "erp", conector: "erp", mantenedor: "erp",
      alerta: "alertas", anomalía: "alertas", térmica: "alertas",
      pasaporte: "passport", activo: "passport",
      procuredata: "hub",
    },
  },

  "aeolus-wind": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "wind", label: "Parque Eólico", x: 80, y: 80, color: "hsl(195, 80%, 50%)", size: 28 },
      { id: "smart", label: "Smart Contract", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "euroe", label: "Wallet EUROe", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 24 },
      { id: "pontus", label: "Pontus-X Notary", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "pool", label: "API Pool Eléctrico", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "wind", to: "hub" }, { from: "hub", to: "smart" },
      { from: "smart", to: "euroe" }, { from: "hub", to: "pontus" },
      { from: "pontus", to: "pool" }, { from: "euroe", to: "pool" },
      { from: "wind", to: "smart" },
    ],
    keywordMap: {
      eólico: "wind", aerogenerador: "wind", viento: "wind", aeolus: "wind",
      "smart contract": "smart", contrato: "smart", ppa: "smart", liquidación: "smart",
      euroe: "euroe", wallet: "euroe", pago: "euroe",
      pontus: "pontus", notary: "pontus", blockchain: "pontus",
      pool: "pool", mercado: "pool", inyección: "pool",
      procuredata: "hub",
    },
  },

  "h2-pure": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "h2", label: "Planta H2", x: 80, y: 80, color: "hsl(142, 71%, 45%)", size: 28 },
      { id: "pontus", label: "Pontus-X Notary", x: 420, y: 80, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "passport", label: "Pasaporte H2", x: 420, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "gdo", label: "Certificado GdO", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "eu", label: "API Subvenciones", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "h2", to: "hub" }, { from: "hub", to: "pontus" },
      { from: "pontus", to: "passport" }, { from: "hub", to: "gdo" },
      { from: "gdo", to: "eu" }, { from: "passport", to: "eu" },
      { from: "h2", to: "gdo" },
    ],
    keywordMap: {
      hidrógeno: "h2", h2: "h2", electrólisis: "h2", verde: "h2",
      pontus: "pontus", notarización: "pontus", blockchain: "pontus",
      pasaporte: "passport", digital: "passport", producto: "passport",
      gdo: "gdo", "garantía de origen": "gdo", renovable: "gdo",
      subvención: "eu", alemania: "eu", exportación: "eu",
      procuredata: "hub",
    },
  },

  "poligono-ecolink": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "poly", label: "Polígono", x: 80, y: 80, color: "hsl(217, 91%, 50%)", size: 28 },
      { id: "odrl", label: "Gobernanza ODRL", x: 420, y: 80, color: "hsl(0, 84%, 60%)", size: 26 },
      { id: "euroe", label: "Wallet EUROe", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 24 },
      { id: "p2p", label: "Smart Contracts P2P", x: 80, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "mapa", label: "Mapa Comunidad", x: 250, y: 380, color: "hsl(187, 100%, 42%)", size: 24 },
    ],
    connections: [
      { from: "poly", to: "hub" }, { from: "hub", to: "odrl" },
      { from: "hub", to: "euroe" }, { from: "odrl", to: "p2p" },
      { from: "p2p", to: "mapa" }, { from: "euroe", to: "mapa" },
      { from: "poly", to: "p2p" },
    ],
    keywordMap: {
      polígono: "poly", empresa: "poly", vecino: "poly", nave: "poly",
      odrl: "odrl", gobernanza: "odrl", precio: "odrl",
      euroe: "euroe", wallet: "euroe", pago: "euroe",
      p2p: "p2p", "smart contract": "p2p", intercambio: "p2p",
      comunidad: "mapa", energética: "mapa", marketplace: "mapa",
      procuredata: "hub",
    },
  },

  "gridflex-demand": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "grid", label: "Smart Grid", x: 80, y: 80, color: "hsl(270, 60%, 55%)", size: 28 },
      { id: "alerts", label: "Smart Alerts", x: 420, y: 80, color: "hsl(0, 84%, 60%)", size: 24 },
      { id: "euroe", label: "Wallet EUROe", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "api", label: "API Operador Red", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 26 },
      { id: "dash", label: "Dashboard Flex", x: 250, y: 380, color: "hsl(142, 71%, 45%)", size: 24 },
    ],
    connections: [
      { from: "grid", to: "hub" }, { from: "hub", to: "alerts" },
      { from: "hub", to: "euroe" }, { from: "alerts", to: "api" },
      { from: "api", to: "dash" }, { from: "euroe", to: "dash" },
      { from: "grid", to: "api" },
    ],
    keywordMap: {
      grid: "grid", "smart grid": "grid", transformador: "grid", sobrecarga: "grid",
      alerta: "alerts", "smart alert": "alerts", flexibilidad: "alerts",
      euroe: "euroe", wallet: "euroe", incentivo: "euroe",
      operador: "api", red: "api", api: "api",
      dashboard: "dash", certificado: "dash", apagón: "dash",
      procuredata: "hub",
    },
  },

  "bateria-hub": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "battery", label: "Batería-Hub", x: 80, y: 80, color: "hsl(240, 60%, 55%)", size: 28 },
      { id: "ia", label: "IA Analytics", x: 420, y: 80, color: "hsl(270, 70%, 55%)", size: 26 },
      { id: "euroe", label: "Wallet EUROe", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 24 },
      { id: "pool", label: "API Pool Eléctrico", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 26 },
      { id: "trading", label: "Dashboard Trading", x: 250, y: 380, color: "hsl(142, 71%, 45%)", size: 24 },
    ],
    connections: [
      { from: "battery", to: "hub" }, { from: "hub", to: "ia" },
      { from: "ia", to: "euroe" }, { from: "hub", to: "pool" },
      { from: "pool", to: "trading" }, { from: "euroe", to: "trading" },
      { from: "battery", to: "pool" },
    ],
    keywordMap: {
      batería: "battery", almacenamiento: "battery", roi: "battery",
      ia: "ia", analytics: "ia", predicción: "ia", algoritmo: "ia",
      euroe: "euroe", wallet: "euroe", compra: "euroe",
      pool: "pool", mercado: "pool", precio: "pool",
      trading: "trading", dashboard: "trading", arbitraje: "trading",
      procuredata: "hub",
    },
  },

  "bioheat-district": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "bioheat", label: "BioHeat", x: 80, y: 80, color: "hsl(30, 70%, 45%)", size: 28 },
      { id: "passport", label: "Pasaporte Digital", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "did", label: "Validador DID", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 24 },
      { id: "geo", label: "Geolocalización IoT", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 26 },
      { id: "red", label: "Certificación RED", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "bioheat", to: "hub" }, { from: "hub", to: "passport" },
      { from: "hub", to: "did" }, { from: "did", to: "geo" },
      { from: "geo", to: "red" }, { from: "passport", to: "red" },
      { from: "bioheat", to: "geo" },
    ],
    keywordMap: {
      bioheat: "bioheat", biomasa: "bioheat", madera: "bioheat", caldera: "bioheat",
      pasaporte: "passport", digital: "passport", proveedor: "passport",
      did: "did", validador: "did", identidad: "did",
      geolocalización: "geo", iot: "geo", tala: "geo", forestal: "geo",
      red: "red", "red iii": "red", directiva: "red",
      procuredata: "hub",
    },
  },

  "turbine-chain": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "turbine", label: "Fabricante", x: 80, y: 80, color: "hsl(20, 90%, 50%)", size: 28 },
      { id: "scope3", label: "Calculadora Scope 3", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "erp", label: "Conector ERP", x: 420, y: 320, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "csrd", label: "Auditoría CSRD", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "report", label: "Reporte Consolidado", x: 250, y: 380, color: "hsl(209, 100%, 65%)", size: 24 },
    ],
    connections: [
      { from: "turbine", to: "hub" }, { from: "hub", to: "scope3" },
      { from: "hub", to: "erp" }, { from: "scope3", to: "csrd" },
      { from: "erp", to: "report" }, { from: "csrd", to: "report" },
      { from: "turbine", to: "erp" },
    ],
    keywordMap: {
      turbine: "turbine", fabricante: "turbine", aerogenerador: "turbine", acero: "turbine",
      "scope 3": "scope3", scope3: "scope3", emisiones: "scope3", carbono: "scope3",
      erp: "erp", conector: "erp", proveedor: "erp",
      csrd: "csrd", auditoría: "csrd", licitación: "csrd",
      reporte: "report", consolidado: "report", "50m": "report",
      procuredata: "hub",
    },
  },

  "aquapower-nexus": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "aqua", label: "AquaPower", x: 80, y: 80, color: "hsl(210, 80%, 40%)", size: 28 },
      { id: "odrl", label: "Gobernanza ODRL", x: 420, y: 80, color: "hsl(0, 84%, 60%)", size: 26 },
      { id: "iot", label: "Sensores IoT Nivel", x: 420, y: 320, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "api", label: "API Confederación", x: 80, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "dash", label: "Dashboard Nexo", x: 250, y: 380, color: "hsl(209, 100%, 65%)", size: 24 },
    ],
    connections: [
      { from: "aqua", to: "hub" }, { from: "hub", to: "odrl" },
      { from: "hub", to: "iot" }, { from: "odrl", to: "api" },
      { from: "iot", to: "dash" }, { from: "api", to: "dash" },
      { from: "aqua", to: "iot" },
    ],
    keywordMap: {
      aqua: "aqua", agua: "aqua", hidráulica: "aqua", embalse: "aqua",
      odrl: "odrl", gobernanza: "odrl", política: "odrl",
      iot: "iot", sensor: "iot", nivel: "iot", caudal: "iot",
      confederación: "api", api: "api", hidrográfica: "api",
      nexo: "dash", dashboard: "dash", riego: "dash",
      procuredata: "hub",
    },
  },

  "smartcharge-ev": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "ev", label: "Smart-Charge", x: 80, y: 80, color: "hsl(85, 65%, 45%)", size: 28 },
      { id: "notary", label: "API Nodo Notario", x: 420, y: 80, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "passport", label: "Pasaporte Energía", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "widget", label: "Widget Mobile", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 24 },
      { id: "co2", label: "Certificación CO2", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "ev", to: "hub" }, { from: "hub", to: "notary" },
      { from: "notary", to: "passport" }, { from: "hub", to: "widget" },
      { from: "passport", to: "co2" }, { from: "widget", to: "co2" },
      { from: "ev", to: "widget" },
    ],
    keywordMap: {
      carga: "ev", eléctrico: "ev", "smart-charge": "ev", vehículo: "ev",
      notario: "notary", nodo: "notary", api: "notary",
      pasaporte: "passport", energía: "passport", origen: "passport",
      widget: "widget", mobile: "widget", app: "widget", móvil: "widget",
      co2: "co2", certificación: "co2", renovable: "co2",
      procuredata: "hub",
    },
  },

  "fiber-loop": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "fiber", label: "Fiber-Loop", x: 80, y: 80, color: "hsl(160, 60%, 45%)", size: 28 },
      { id: "passport", label: "Pasaporte Producto", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "pontus", label: "Pontus-X Notary", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "rap", label: "Certificación RAP", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 24 },
      { id: "green", label: "Anti-Greenwashing", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "fiber", to: "hub" }, { from: "hub", to: "passport" },
      { from: "hub", to: "pontus" }, { from: "pontus", to: "rap" },
      { from: "passport", to: "green" }, { from: "rap", to: "green" },
      { from: "fiber", to: "passport" },
    ],
    keywordMap: {
      fibra: "fiber", "fiber-loop": "fiber", textil: "fiber", reciclado: "fiber",
      pasaporte: "passport", producto: "passport", trazabilidad: "passport",
      pontus: "pontus", notarización: "pontus", blockchain: "pontus",
      rap: "rap", certificación: "rap", residuo: "rap",
      greenwashing: "green", "anti-greenwashing": "green",
      procuredata: "hub",
    },
  },

  "rare-earth-recover": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "plant", label: "Planta Reciclaje", x: 80, y: 80, color: "hsl(270, 70%, 55%)", size: 28 },
      { id: "edge", label: "Edge Functions", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "ia", label: "IA Analytics", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "marketplace", label: "Marketplace Datos", x: 80, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "passport", label: "Pasaporte Residuo", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "plant", to: "hub" }, { from: "edge", to: "hub" },
      { from: "hub", to: "ia" }, { from: "hub", to: "marketplace" },
      { from: "ia", to: "passport" }, { from: "marketplace", to: "passport" },
      { from: "plant", to: "edge" },
    ],
    keywordMap: {
      planta: "plant", reciclaje: "plant", electrónica: "plant", raee: "plant",
      edge: "edge", "edge function": "edge", espectrometría: "edge",
      ia: "ia", analytics: "ia", neodimio: "ia", disprosio: "ia",
      marketplace: "marketplace", datos: "marketplace", oferta: "marketplace",
      pasaporte: "passport", residuo: "passport",
      procuredata: "hub",
    },
  },

  "alu-cycle": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "alu", label: "Alu-Cycle", x: 80, y: 80, color: "hsl(195, 40%, 50%)", size: 28 },
      { id: "erp", label: "Conectores ERP", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "smart", label: "Smart Contracts", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "carbon", label: "Carbon Tracker", x: 80, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "cae", label: "Certificados CAE", x: 250, y: 380, color: "hsl(217, 91%, 60%)", size: 24 },
    ],
    connections: [
      { from: "alu", to: "hub" }, { from: "erp", to: "hub" },
      { from: "hub", to: "smart" }, { from: "hub", to: "carbon" },
      { from: "smart", to: "cae" }, { from: "carbon", to: "cae" },
      { from: "alu", to: "erp" },
    ],
    keywordMap: {
      aluminio: "alu", lata: "alu", "alu-cycle": "alu", chatarra: "alu",
      erp: "erp", conector: "erp", certificado: "erp",
      "smart contract": "smart", contrato: "smart", co2: "smart",
      carbon: "carbon", "carbon tracker": "carbon", "iso 14064": "carbon",
      cae: "cae", ahorro: "cae", energético: "cae", bono: "cae",
      procuredata: "hub",
    },
  },

  "producer-trust": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "producer", label: "Producer-Trust", x: 80, y: 80, color: "hsl(230, 60%, 55%)", size: 28 },
      { id: "dash", label: "Dashboard RAP", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "ssi", label: "Identidad SSI", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 24 },
      { id: "webhook", label: "Webhooks IDS", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 26 },
      { id: "audit", label: "Auditoría Digital", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "producer", to: "hub" }, { from: "hub", to: "dash" },
      { from: "hub", to: "ssi" }, { from: "ssi", to: "webhook" },
      { from: "webhook", to: "audit" }, { from: "dash", to: "audit" },
      { from: "producer", to: "webhook" },
    ],
    keywordMap: {
      productor: "producer", "producer-trust": "producer", rap: "producer",
      dashboard: "dash", cumplimiento: "dash", reporte: "dash",
      ssi: "ssi", identidad: "ssi", did: "ssi", firma: "ssi",
      webhook: "webhook", ids: "webhook", gestor: "webhook",
      auditoría: "audit", digital: "audit", automática: "audit",
      procuredata: "hub",
    },
  },

  "eco-orchestrator": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "scrap", label: "SCRAP", x: 80, y: 80, color: "hsl(30, 80%, 50%)", size: 28 },
      { id: "odrl", label: "Gobernanza ODRL", x: 420, y: 80, color: "hsl(0, 84%, 60%)", size: 26 },
      { id: "rls", label: "Multi-Tenant RLS", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 24 },
      { id: "dash", label: "Dashboard Eco", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "api", label: "API SCRAP", x: 250, y: 380, color: "hsl(187, 100%, 42%)", size: 24 },
    ],
    connections: [
      { from: "scrap", to: "hub" }, { from: "hub", to: "odrl" },
      { from: "odrl", to: "rls" }, { from: "hub", to: "dash" },
      { from: "rls", to: "api" }, { from: "dash", to: "api" },
      { from: "scrap", to: "dash" },
    ],
    keywordMap: {
      scrap: "scrap", "eco-orchestrator": "scrap", asociado: "scrap",
      odrl: "odrl", gobernanza: "odrl", secreto: "odrl",
      rls: "rls", "multi-tenant": "rls", cuota: "rls",
      dashboard: "dash", ecomodulación: "dash", bonificación: "dash",
      api: "api", ecotasa: "api",
      procuredata: "hub",
    },
  },

  "raw-market": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "raw", label: "Raw-Market", x: 80, y: 80, color: "hsl(142, 65%, 42%)", size: 28 },
      { id: "marketplace", label: "Marketplace Circular", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "odrl", label: "Gobernanza ODRL", x: 420, y: 320, color: "hsl(0, 84%, 60%)", size: 24 },
      { id: "cert", label: "Certificación Pureza", x: 80, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "euroe", label: "Wallet EUROe", x: 250, y: 380, color: "hsl(217, 91%, 60%)", size: 24 },
    ],
    connections: [
      { from: "raw", to: "hub" }, { from: "hub", to: "marketplace" },
      { from: "hub", to: "odrl" }, { from: "marketplace", to: "cert" },
      { from: "odrl", to: "euroe" }, { from: "cert", to: "euroe" },
      { from: "raw", to: "cert" },
    ],
    keywordMap: {
      "raw-market": "raw", excedente: "raw", merma: "raw", residuo: "raw",
      marketplace: "marketplace", circular: "marketplace", oportunidad: "marketplace",
      odrl: "odrl", gobernanza: "odrl", reciclaje: "odrl",
      pureza: "cert", certificación: "cert", especificación: "cert",
      euroe: "euroe", wallet: "euroe", pago: "euroe",
      procuredata: "hub",
    },
  },

  "battery-life": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "battery", label: "Battery-Life", x: 80, y: 80, color: "hsl(195, 80%, 45%)", size: 28 },
      { id: "audit", label: "Audit Logs", x: 420, y: 80, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "passport", label: "Pasaporte Batería", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "soh", label: "API SoH", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "market", label: "Marketplace 2ª Vida", x: 250, y: 380, color: "hsl(217, 91%, 60%)", size: 24 },
    ],
    connections: [
      { from: "battery", to: "hub" }, { from: "hub", to: "audit" },
      { from: "audit", to: "passport" }, { from: "hub", to: "soh" },
      { from: "soh", to: "market" }, { from: "passport", to: "market" },
      { from: "battery", to: "soh" },
    ],
    keywordMap: {
      batería: "battery", "battery-life": "battery", litio: "battery",
      audit: "audit", log: "audit", historial: "audit", inmutable: "audit",
      pasaporte: "passport", digital: "passport",
      soh: "soh", salud: "soh", "estado de salud": "soh", carga: "soh",
      "segunda vida": "market", marketplace: "market", almacenamiento: "market",
      procuredata: "hub",
    },
  },

  "urban-mining": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "mining", label: "Urban Mining", x: 80, y: 80, color: "hsl(45, 93%, 47%)", size: 28 },
      { id: "pontus", label: "Pontus-X Notary", x: 420, y: 80, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "cert", label: "Certificación Oro", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "trace", label: "Trazabilidad Refino", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "ocde", label: "Sello OCDE", x: 250, y: 380, color: "hsl(217, 91%, 60%)", size: 24 },
    ],
    connections: [
      { from: "mining", to: "hub" }, { from: "hub", to: "pontus" },
      { from: "pontus", to: "cert" }, { from: "hub", to: "trace" },
      { from: "trace", to: "ocde" }, { from: "cert", to: "ocde" },
      { from: "mining", to: "trace" },
    ],
    keywordMap: {
      "urban mining": "mining", oro: "mining", plata: "mining", joyería: "mining",
      pontus: "pontus", notarización: "pontus", blockchain: "pontus",
      certificación: "cert", ético: "cert", reciclado: "cert",
      refino: "trace", trazabilidad: "trace", lingote: "trace",
      ocde: "ocde", sello: "ocde", normativa: "ocde",
      procuredata: "hub",
    },
  },

  "waste-to-value": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "waste", label: "Waste-to-Value", x: 80, y: 80, color: "hsl(170, 60%, 42%)", size: 28 },
      { id: "webhook", label: "Webhooks IDS", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "erp", label: "Conectores ERP", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "dash", label: "Dashboard Zero", x: 80, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "iso", label: "Certificación ISO", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "waste", to: "hub" }, { from: "hub", to: "webhook" },
      { from: "webhook", to: "erp" }, { from: "hub", to: "dash" },
      { from: "erp", to: "iso" }, { from: "dash", to: "iso" },
      { from: "waste", to: "dash" },
    ],
    keywordMap: {
      "waste-to-value": "waste", residuo: "waste", vertido: "waste", fábrica: "waste",
      webhook: "webhook", ids: "webhook", báscula: "webhook",
      erp: "erp", conector: "erp", conciliación: "erp",
      dashboard: "dash", "vertido cero": "dash", zero: "dash",
      iso: "iso", "iso 14001": "iso", auditoría: "iso",
      procuredata: "hub",
    },
  },

  "green-gov-circular": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "gov", label: "Ayuntamiento", x: 80, y: 80, color: "hsl(152, 60%, 40%)", size: 28 },
      { id: "did", label: "Validador DID", x: 420, y: 80, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "passport", label: "Pasaporte Materia", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "sroi", label: "Dashboard SROI", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 24 },
      { id: "local", label: "Certificación Local", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "gov", to: "hub" }, { from: "hub", to: "did" },
      { from: "did", to: "passport" }, { from: "hub", to: "sroi" },
      { from: "passport", to: "local" }, { from: "sroi", to: "local" },
      { from: "gov", to: "sroi" },
    ],
    keywordMap: {
      ayuntamiento: "gov", licitación: "gov", pública: "gov", mobiliario: "gov",
      did: "did", validador: "did", web3: "did",
      pasaporte: "passport", materia: "passport", plástico: "passport",
      sroi: "sroi", dashboard: "sroi", retorno: "sroi",
      local: "local", certificación: "local", reciclaje: "local",
      procuredata: "hub",
    },
  },

  "avocado-trust": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "farm", label: "Avocado-Trust", x: 80, y: 80, color: "hsl(85, 65%, 45%)", size: 28 },
      { id: "edge", label: "Edge Functions IoT", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "passport", label: "Pasaporte Fito", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "pontus", label: "Pontus-X Notary", x: 80, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "usda", label: "API USDA-Aphis", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "farm", to: "hub" }, { from: "edge", to: "hub" },
      { from: "hub", to: "passport" }, { from: "hub", to: "pontus" },
      { from: "passport", to: "usda" }, { from: "pontus", to: "usda" },
      { from: "farm", to: "edge" },
    ],
    keywordMap: {
      aguacate: "farm", "avocado-trust": "farm", finca: "farm",
      edge: "edge", iot: "edge", sensor: "edge", trampa: "edge",
      pasaporte: "passport", fitosanitario: "passport", "pest-free": "passport",
      pontus: "pontus", notarización: "pontus", blockchain: "pontus",
      usda: "usda", aphis: "usda", aduana: "usda", inspección: "usda",
      procuredata: "hub",
    },
  },

  "olive-origin": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "olive", label: "Olive-Origin", x: 80, y: 80, color: "hsl(85, 50%, 35%)", size: 28 },
      { id: "passport", label: "Pasaporte Producto", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "did", label: "Validador DID", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 24 },
      { id: "gps", label: "GPS Traceability", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 26 },
      { id: "odrl", label: "Gobernanza ODRL", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "olive", to: "hub" }, { from: "hub", to: "passport" },
      { from: "hub", to: "did" }, { from: "did", to: "gps" },
      { from: "gps", to: "odrl" }, { from: "passport", to: "odrl" },
      { from: "olive", to: "gps" },
    ],
    keywordMap: {
      "olive-origin": "olive", aceite: "olive", aove: "olive", almazara: "olive",
      pasaporte: "passport", producto: "passport", lote: "passport",
      did: "did", catastro: "did", validador: "did",
      gps: "gps", coordenada: "gps", recolección: "gps", geolocalización: "gps",
      odrl: "odrl", gobernanza: "odrl", "denominación": "odrl",
      procuredata: "hub",
    },
  },

  "zero-chem-wine": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "wine", label: "Zero-Chem Wine", x: 80, y: 80, color: "hsl(280, 60%, 50%)", size: 28 },
      { id: "iot", label: "Sensores IoT Suelo", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "lab", label: "API Laboratorio", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "cert", label: "Certificación Orgánica", x: 80, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "passport", label: "Pasaporte Vino", x: 250, y: 380, color: "hsl(217, 91%, 60%)", size: 24 },
    ],
    connections: [
      { from: "wine", to: "hub" }, { from: "iot", to: "hub" },
      { from: "hub", to: "lab" }, { from: "hub", to: "cert" },
      { from: "lab", to: "passport" }, { from: "cert", to: "passport" },
      { from: "wine", to: "iot" },
    ],
    keywordMap: {
      "zero-chem": "wine", vino: "wine", orgánico: "wine", viñedo: "wine",
      iot: "iot", sensor: "iot", nitrato: "iot", suelo: "iot",
      laboratorio: "lab", espectrometría: "lab", análisis: "lab",
      certificación: "cert", orgánica: "cert", "zero residue": "cert",
      pasaporte: "passport", digital: "passport",
      procuredata: "hub",
    },
  },

  "citrus-check": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "citrus", label: "Citrus-Check", x: 80, y: 80, color: "hsl(30, 90%, 50%)", size: 28 },
      { id: "lab", label: "API Laboratorio LMR", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "calc", label: "Calculadora Carencia", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "cert", label: "Certificación Multi-País", x: 80, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "market", label: "Marketplace Alimentario", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "citrus", to: "hub" }, { from: "hub", to: "lab" },
      { from: "lab", to: "calc" }, { from: "hub", to: "cert" },
      { from: "calc", to: "market" }, { from: "cert", to: "market" },
      { from: "citrus", to: "lab" },
    ],
    keywordMap: {
      cítrico: "citrus", "citrus-check": "citrus", naranja: "citrus", limón: "citrus",
      laboratorio: "lab", lmr: "lab", residuo: "lab",
      carencia: "calc", calculadora: "calc", fitosanitario: "calc",
      certificación: "cert", "multi-país": "cert", país: "cert",
      marketplace: "market", alimentario: "market", supermercado: "market",
      procuredata: "hub",
    },
  },

  "berry-water": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "berry", label: "Berry-Water", x: 80, y: 80, color: "hsl(217, 80%, 50%)", size: 28 },
      { id: "iot", label: "Sensores Humedad", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "caudal", label: "Caudalímetro Digital", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "gap", label: "GlobalG.A.P.", x: 80, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "pontus", label: "Pontus-X Notary", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "berry", to: "hub" }, { from: "iot", to: "hub" },
      { from: "hub", to: "caudal" }, { from: "hub", to: "gap" },
      { from: "caudal", to: "pontus" }, { from: "gap", to: "pontus" },
      { from: "berry", to: "iot" },
    ],
    keywordMap: {
      berry: "berry", "berry-water": "berry", fresa: "berry", huelva: "berry",
      humedad: "iot", sensor: "iot", sonda: "iot",
      caudalímetro: "caudal", caudal: "caudal", riego: "caudal",
      "globalg.a.p": "gap", "global gap": "gap", certificación: "gap",
      pontus: "pontus", notarización: "pontus", ahorro: "pontus",
      procuredata: "hub",
    },
  },

  "rice-satellite": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "rice", label: "Rice-Satellite", x: 80, y: 80, color: "hsl(230, 60%, 55%)", size: 28 },
      { id: "ndvi", label: "API Satelital NDVI", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "blockchain", label: "Blockchain Hash", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 24 },
      { id: "do", label: "Verificador D.O.", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 26 },
      { id: "anti", label: "Anti-Fraude Origen", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "rice", to: "hub" }, { from: "hub", to: "ndvi" },
      { from: "ndvi", to: "blockchain" }, { from: "hub", to: "do" },
      { from: "blockchain", to: "anti" }, { from: "do", to: "anti" },
      { from: "rice", to: "ndvi" },
    ],
    keywordMap: {
      arroz: "rice", "rice-satellite": "rice", parcela: "rice",
      ndvi: "ndvi", satelital: "ndvi", "firma espectral": "ndvi", imagen: "ndvi",
      blockchain: "blockchain", hash: "blockchain", lote: "blockchain",
      "denominación": "do", "d.o.": "do", verificador: "do",
      fraude: "anti", "anti-fraude": "anti", importación: "anti",
      procuredata: "hub",
    },
  },

  "bio-cotton-trace": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "cotton", label: "Bio-Cotton", x: 80, y: 80, color: "hsl(330, 60%, 55%)", size: 28 },
      { id: "passport", label: "Pasaporte Producto", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "gots", label: "Certificación GOTS", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "custody", label: "Cadena Custodia", x: 80, y: 320, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "audit", label: "Auditoría One-Click", x: 250, y: 380, color: "hsl(217, 91%, 60%)", size: 24 },
    ],
    connections: [
      { from: "cotton", to: "hub" }, { from: "hub", to: "passport" },
      { from: "hub", to: "gots" }, { from: "passport", to: "custody" },
      { from: "gots", to: "audit" }, { from: "custody", to: "audit" },
      { from: "cotton", to: "custody" },
    ],
    keywordMap: {
      algodón: "cotton", "bio-cotton": "cotton", semilla: "cotton", bala: "cotton",
      pasaporte: "passport", producto: "passport", id: "passport",
      gots: "gots", grs: "gots", certificación: "gots", orgánico: "gots",
      custodia: "custody", cadena: "custody", desmotadora: "custody",
      auditoría: "audit", "one-click": "audit",
      procuredata: "hub",
    },
  },

  "greenhouse-ai": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "green", label: "Greenhouse-AI", x: 80, y: 80, color: "hsl(142, 60%, 42%)", size: 28 },
      { id: "edge", label: "Edge Functions IoT", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "ia", label: "IA Predictiva Clima", x: 420, y: 320, color: "hsl(270, 70%, 55%)", size: 26 },
      { id: "bio", label: "Control Biológico", x: 80, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "score", label: "Score Fitosanitario", x: 250, y: 380, color: "hsl(209, 100%, 65%)", size: 24 },
    ],
    connections: [
      { from: "green", to: "hub" }, { from: "edge", to: "hub" },
      { from: "hub", to: "ia" }, { from: "hub", to: "bio" },
      { from: "ia", to: "score" }, { from: "bio", to: "score" },
      { from: "green", to: "edge" },
    ],
    keywordMap: {
      invernadero: "green", "greenhouse-ai": "green", microclima: "green",
      edge: "edge", iot: "edge", sensor: "edge", ventilación: "edge",
      ia: "ia", predictiva: "ia", clima: "ia", brote: "ia",
      biológico: "bio", control: "bio", fungicida: "bio",
      score: "score", fitosanitario: "score", mildiu: "score",
      procuredata: "hub",
    },
  },

  "tropical-flash": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "tropical", label: "Tropical-Flash", x: 80, y: 80, color: "hsl(30, 85%, 50%)", size: 28 },
      { id: "erp", label: "Conector ERP", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "pre", label: "Pre-Validación", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "webhook", label: "Webhooks IDS", x: 80, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "fito", label: "Cert. Fitosanitaria", x: 250, y: 380, color: "hsl(0, 84%, 60%)", size: 24 },
    ],
    connections: [
      { from: "tropical", to: "hub" }, { from: "erp", to: "hub" },
      { from: "hub", to: "pre" }, { from: "hub", to: "webhook" },
      { from: "pre", to: "fito" }, { from: "webhook", to: "fito" },
      { from: "tropical", to: "erp" },
    ],
    keywordMap: {
      tropical: "tropical", fruta: "tropical", perecedero: "tropical",
      erp: "erp", conector: "erp",
      "pre-validación": "pre", dossier: "pre", "48h": "pre",
      webhook: "webhook", ids: "webhook", portuario: "webhook",
      fitosanitaria: "fito", aduana: "fito", inspección: "fito",
      procuredata: "hub",
    },
  },

  "urban-hydro": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "hydro", label: "Urban-Hydro", x: 80, y: 80, color: "hsl(170, 60%, 42%)", size: 28 },
      { id: "iot", label: "Sensores Hidropónicos", x: 420, y: 80, color: "hsl(187, 100%, 42%)", size: 24 },
      { id: "km0", label: "Certificación Km 0", x: 420, y: 320, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "energy", label: "Energía Verificada", x: 80, y: 320, color: "hsl(45, 93%, 47%)", size: 26 },
      { id: "passport", label: "Pasaporte Local", x: 250, y: 380, color: "hsl(209, 100%, 65%)", size: 24 },
    ],
    connections: [
      { from: "hydro", to: "hub" }, { from: "iot", to: "hub" },
      { from: "hub", to: "km0" }, { from: "hub", to: "energy" },
      { from: "km0", to: "passport" }, { from: "energy", to: "passport" },
      { from: "hydro", to: "iot" },
    ],
    keywordMap: {
      "urban-hydro": "hydro", granja: "hydro", vertical: "hydro", hidropónico: "hydro",
      sensor: "iot", nutriente: "iot", led: "iot",
      "km 0": "km0", km0: "km0", certificación: "km0", urbana: "km0",
      energía: "energy", renovable: "energy", verde: "energy",
      pasaporte: "passport", digital: "passport", local: "passport",
      procuredata: "hub",
    },
  },

  "greenfinance-esg": {
    nodes: [
      { id: "hub", label: "ProcureData", x: 250, y: 200, color: HUB_COLOR, size: 36 },
      { id: "bank", label: "GreenFinance", x: 80, y: 80, color: "hsl(142, 60%, 42%)", size: 28 },
      { id: "esg", label: "ESG Verification", x: 420, y: 80, color: "hsl(142, 71%, 45%)", size: 26 },
      { id: "bond", label: "Green Bond", x: 420, y: 320, color: "hsl(209, 100%, 65%)", size: 26 },
      { id: "score", label: "Trade Finance Score", x: 80, y: 320, color: "hsl(217, 91%, 60%)", size: 24 },
      { id: "blockchain", label: "Blockchain Proof", x: 250, y: 380, color: "hsl(187, 100%, 42%)", size: 24 },
    ],
    connections: [
      { from: "bank", to: "hub" }, { from: "hub", to: "esg" },
      { from: "esg", to: "bond" }, { from: "hub", to: "score" },
      { from: "score", to: "blockchain" }, { from: "bond", to: "blockchain" },
      { from: "bank", to: "score" },
    ],
    keywordMap: {
      greenfinance: "bank", banco: "bank", financiera: "bank", préstamo: "bank",
      esg: "esg", verificación: "esg", sostenibilidad: "esg",
      "green bond": "bond", bono: "bond", elegibilidad: "bond",
      score: "score", scoring: "score", "trade finance": "score",
      blockchain: "blockchain", proof: "blockchain", spread: "blockchain",
      procuredata: "hub",
    },
  },
};
