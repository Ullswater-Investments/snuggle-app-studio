-- Añadir campos de documentación al marketplace de servicios
ALTER TABLE public.value_services
ADD COLUMN IF NOT EXISTS documentation_md TEXT,
ADD COLUMN IF NOT EXISTS api_endpoint TEXT,
ADD COLUMN IF NOT EXISTS code_examples JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS integrations JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS version TEXT DEFAULT '1.0';

-- Actualizar Carbon Tracker ISO 14064
UPDATE public.value_services 
SET 
  documentation_md = '## Cómo funciona

Este servicio analiza tus manifiestos logísticos y calcula automáticamente las emisiones de CO2 según el estándar ISO 14064.

### Endpoints API

- `POST /api/calculate` - Envía datos de transporte
- `GET /api/reports/{id}` - Obtiene informe generado

### Autenticación

Usa tu API Key en el header `X-PROCUREDATA-KEY`

### Límites de Uso

- 1000 cálculos/mes en plan básico
- Sin límites en plan Enterprise',
  api_endpoint = '/api/v1/carbon-tracker',
  code_examples = '{
    "curl": "curl -X POST https://api.procuredata.eu/v1/carbon-tracker/calculate \\\n  -H \"Authorization: Bearer YOUR_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d ''{\"shipments\": [{\"origin\": \"Madrid\", \"destination\": \"Barcelona\", \"weight_kg\": 500, \"transport_mode\": \"truck\"}]}''",
    "python": "import requests\n\nresponse = requests.post(\n    \"https://api.procuredata.eu/v1/carbon-tracker/calculate\",\n    headers={\"Authorization\": \"Bearer YOUR_API_KEY\"},\n    json={\n        \"shipments\": [\n            {\"origin\": \"Madrid\", \"destination\": \"Barcelona\", \n             \"weight_kg\": 500, \"transport_mode\": \"truck\"}\n        ]\n    }\n)\nprint(f\"CO2 Emissions: {response.json()[''total_co2_kg'']} kg\")",
    "javascript": "const response = await fetch(\n  \"https://api.procuredata.eu/v1/carbon-tracker/calculate\",\n  {\n    method: \"POST\",\n    headers: {\n      \"Authorization\": \"Bearer YOUR_API_KEY\",\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      shipments: [\n        { origin: \"Madrid\", destination: \"Barcelona\", \n          weight_kg: 500, transport_mode: \"truck\" }\n      ]\n    })\n  }\n);\nconst { total_co2_kg } = await response.json();"
  }'::jsonb,
  integrations = '["Raw Data Normalizer", "Pontus-X Notary Node"]'::jsonb,
  version = '2.1'
WHERE name = 'Carbon Tracker ISO 14064';

-- Actualizar GDPR PII Shield
UPDATE public.value_services 
SET 
  documentation_md = '## Protección de Datos Personales

Detecta automáticamente PII (Información Personal Identificable) en tus datasets.

### Campos Detectados

- Nombres y apellidos
- Emails y teléfonos
- DNI/NIE/Pasaporte
- Direcciones IP
- Números de cuenta bancaria

### Modos de Operación

1. **Ofuscación**: Reemplaza PII con tokens reversibles
2. **Eliminación**: Borra campos sensibles permanentemente
3. **Informe**: Solo detecta sin modificar (modo auditoría)',
  api_endpoint = '/api/v1/gdpr-shield',
  code_examples = '{
    "curl": "curl -X POST https://api.procuredata.eu/v1/gdpr-shield/scan \\\n  -H \"Authorization: Bearer YOUR_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d ''{\"data\": [{\"name\": \"Juan García\", \"email\": \"juan@example.com\"}], \"mode\": \"redact\"}''",
    "python": "import requests\n\nresponse = requests.post(\n    \"https://api.procuredata.eu/v1/gdpr-shield/scan\",\n    headers={\"Authorization\": \"Bearer YOUR_API_KEY\"},\n    json={\n        \"data\": [{\"name\": \"Juan García\", \"email\": \"juan@example.com\"}],\n        \"mode\": \"redact\"\n    }\n)\nprint(response.json())",
    "javascript": "const response = await fetch(\n  \"https://api.procuredata.eu/v1/gdpr-shield/scan\",\n  {\n    method: \"POST\",\n    headers: {\n      \"Authorization\": \"Bearer YOUR_API_KEY\",\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      data: [{ name: \"Juan García\", email: \"juan@example.com\" }],\n      mode: \"redact\"\n    })\n  }\n);"
  }'::jsonb,
  integrations = '["Raw Data Normalizer", "ODRL License Validator"]'::jsonb,
  version = '1.5'
WHERE name = 'GDPR PII Shield';

-- Actualizar Supply Chain Risk AI
UPDATE public.value_services 
SET 
  documentation_md = '## Predicción de Riesgos en Cadena de Suministro

Modelo de Machine Learning que analiza múltiples fuentes de datos para predecir disrupciones.

### Fuentes de Datos Analizadas

- Noticias globales y locales
- Datos meteorológicos
- Indicadores económicos
- Histórico de proveedores

### Tipos de Alertas

- **Crítica**: Riesgo inminente de rotura de stock
- **Alta**: Posible retraso significativo
- **Media**: Monitorizar situación
- **Baja**: Información preventiva',
  api_endpoint = '/api/v1/risk-ai',
  code_examples = '{
    "curl": "curl -X POST https://api.procuredata.eu/v1/risk-ai/analyze \\\n  -H \"Authorization: Bearer YOUR_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d ''{\"supplier_ids\": [\"sup-001\", \"sup-002\"], \"horizon_days\": 30}''",
    "python": "import requests\n\nresponse = requests.post(\n    \"https://api.procuredata.eu/v1/risk-ai/analyze\",\n    headers={\"Authorization\": \"Bearer YOUR_API_KEY\"},\n    json={\n        \"supplier_ids\": [\"sup-001\", \"sup-002\"],\n        \"horizon_days\": 30\n    }\n)\nrisks = response.json()[\"risks\"]\nfor risk in risks:\n    print(f\"{risk[''supplier'']}: {risk[''level'']} - {risk[''description'']}\")",
    "javascript": "const response = await fetch(\n  \"https://api.procuredata.eu/v1/risk-ai/analyze\",\n  {\n    method: \"POST\",\n    headers: {\n      \"Authorization\": \"Bearer YOUR_API_KEY\",\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      supplier_ids: [\"sup-001\", \"sup-002\"],\n      horizon_days: 30\n    })\n  }\n);\nconst { risks } = await response.json();"
  }'::jsonb,
  integrations = '["Carbon Tracker ISO 14064", "Pontus-X Notary Node"]'::jsonb,
  version = '3.0'
WHERE name = 'Supply Chain Risk AI';

-- Actualizar ODRL License Validator
UPDATE public.value_services 
SET 
  documentation_md = '## Validación de Licencias ODRL

Servicio gratuito que verifica el cumplimiento de contratos de uso de datos.

### Funcionalidades

- Parseo de políticas ODRL 2.2
- Validación de permisos y prohibiciones
- Verificación de obligaciones cumplidas
- Auditoría de uso histórico

### Integración con Smart Contracts

Compatible con contratos Pontus-X para validación on-chain.',
  api_endpoint = '/api/v1/odrl-validator',
  code_examples = '{
    "curl": "curl -X POST https://api.procuredata.eu/v1/odrl-validator/check \\\n  -H \"Authorization: Bearer YOUR_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d ''{\"policy_id\": \"pol-12345\", \"action\": \"distribute\", \"context\": {\"purpose\": \"analytics\"}}''",
    "python": "import requests\n\nresponse = requests.post(\n    \"https://api.procuredata.eu/v1/odrl-validator/check\",\n    headers={\"Authorization\": \"Bearer YOUR_API_KEY\"},\n    json={\n        \"policy_id\": \"pol-12345\",\n        \"action\": \"distribute\",\n        \"context\": {\"purpose\": \"analytics\"}\n    }\n)\nresult = response.json()\nprint(f\"Allowed: {result[''allowed'']}\")",
    "javascript": "const response = await fetch(\n  \"https://api.procuredata.eu/v1/odrl-validator/check\",\n  {\n    method: \"POST\",\n    headers: {\n      \"Authorization\": \"Bearer YOUR_API_KEY\",\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      policy_id: \"pol-12345\",\n      action: \"distribute\",\n      context: { purpose: \"analytics\" }\n    })\n  }\n);\nconst { allowed, reason } = await response.json();"
  }'::jsonb,
  integrations = '["GDPR PII Shield", "Pontus-X Notary Node"]'::jsonb,
  version = '1.0'
WHERE name = 'ODRL License Validator';

-- Actualizar Raw Data Normalizer
UPDATE public.value_services 
SET 
  documentation_md = '## Normalización de Datos ETL

Transforma datos desestructurados de proveedores al estándar JSON-LD de Gaia-X.

### Formatos Soportados

- CSV (cualquier delimitador)
- Excel (.xlsx, .xls)
- XML
- JSON legacy

### Schemas de Salida

- Gaia-X Self-Description
- PROCUREDATA Supplier Schema
- Custom (configurable)',
  api_endpoint = '/api/v1/normalizer',
  code_examples = '{
    "curl": "curl -X POST https://api.procuredata.eu/v1/normalizer/transform \\\n  -H \"Authorization: Bearer YOUR_API_KEY\" \\\n  -F \"file=@suppliers.csv\" \\\n  -F \"output_schema=gaia-x\"",
    "python": "import requests\n\nwith open(\"suppliers.csv\", \"rb\") as f:\n    response = requests.post(\n        \"https://api.procuredata.eu/v1/normalizer/transform\",\n        headers={\"Authorization\": \"Bearer YOUR_API_KEY\"},\n        files={\"file\": f},\n        data={\"output_schema\": \"gaia-x\"}\n    )\nprint(response.json())",
    "javascript": "const formData = new FormData();\nformData.append(\"file\", fileInput.files[0]);\nformData.append(\"output_schema\", \"gaia-x\");\n\nconst response = await fetch(\n  \"https://api.procuredata.eu/v1/normalizer/transform\",\n  {\n    method: \"POST\",\n    headers: { \"Authorization\": \"Bearer YOUR_API_KEY\" },\n    body: formData\n  }\n);"
  }'::jsonb,
  integrations = '["GDPR PII Shield", "Carbon Tracker ISO 14064"]'::jsonb,
  version = '2.0'
WHERE name = 'Raw Data Normalizer';

-- Actualizar Pontus-X Notary Node
UPDATE public.value_services 
SET 
  documentation_md = '## Anclaje Blockchain Gestionado

Registra hashes de trazabilidad en la red Pontus-X sin gestionar gas ni wallets.

### Características

- Anclaje automático cada 15 minutos
- Prueba de existencia inmutable
- Sin necesidad de wallet propia
- Certificados verificables

### Redes Soportadas

- Pontus-X (Gaia-X)
- Polygon (backup)',
  api_endpoint = '/api/v1/notary',
  code_examples = '{
    "curl": "curl -X POST https://api.procuredata.eu/v1/notary/anchor \\\n  -H \"Authorization: Bearer YOUR_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d ''{\"document_hash\": \"0x1234abcd...\", \"metadata\": {\"type\": \"invoice\", \"id\": \"INV-001\"}}''",
    "python": "import requests\nimport hashlib\n\n# Calcular hash del documento\nwith open(\"invoice.pdf\", \"rb\") as f:\n    doc_hash = hashlib.sha256(f.read()).hexdigest()\n\nresponse = requests.post(\n    \"https://api.procuredata.eu/v1/notary/anchor\",\n    headers={\"Authorization\": \"Bearer YOUR_API_KEY\"},\n    json={\n        \"document_hash\": f\"0x{doc_hash}\",\n        \"metadata\": {\"type\": \"invoice\", \"id\": \"INV-001\"}\n    }\n)\nprint(f\"TX: {response.json()[''tx_hash'']}\")",
    "javascript": "// Calcular hash del documento\nconst buffer = await file.arrayBuffer();\nconst hashBuffer = await crypto.subtle.digest(\"SHA-256\", buffer);\nconst docHash = \"0x\" + Array.from(new Uint8Array(hashBuffer))\n  .map(b => b.toString(16).padStart(2, \"0\")).join(\"\");\n\nconst response = await fetch(\n  \"https://api.procuredata.eu/v1/notary/anchor\",\n  {\n    method: \"POST\",\n    headers: {\n      \"Authorization\": \"Bearer YOUR_API_KEY\",\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      document_hash: docHash,\n      metadata: { type: \"invoice\", id: \"INV-001\" }\n    })\n  }\n);"
  }'::jsonb,
  integrations = '["Carbon Tracker ISO 14064", "Supply Chain Risk AI", "ODRL License Validator"]'::jsonb,
  version = '1.2'
WHERE name = 'Pontus-X Notary Node';