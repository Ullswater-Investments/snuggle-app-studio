# 🤖 Entrenamiento IA - ProcureData

Este directorio contiene todos los documentos necesarios para entrenar el asistente virtual ARIA de ProcureData.

> **Última actualización**: 2026-01-13  
> **Versión**: 3.2  
> **Base de datos**: 31 tablas PostgreSQL con RLS  
> **Modelo de IA**: Google Gemini 3 Flash Preview (via Cloud AI Gateway)

---

## 📋 Índice de Documentos (18 archivos)

### Base de Conocimiento Original (Docs 1-5)

| Archivo | Descripción | Documento Base |
|---------|-------------|----------------|
| `01_SYSTEM_INSTRUCTIONS.md` | Instrucciones completas para el System Prompt | Core |
| `02_KNOWLEDGE_BASE.md` | Base de conocimiento consolidada del negocio | Core |
| `03_SERVICES_CATALOG.md` | Catálogo completo de 21+ servicios | Core |
| `04_DATA_ARCHITECTURE.md` | Esquema de datos y contratos | Core |
| `05_INTERACTIVE_WIDGETS.md` | Documentación de widgets gamificados | Core |
| `06_RESPONSE_RULES.md` | Reglas de respuesta y frases sugeridas | Core |
| `07_CONSTANTS_REFERENCE.md` | Constantes oficiales (sectores, precios) | Core |

### Conocimiento Expandido (Docs Explicativos 6-15)

| Archivo | Descripción | Documento Base |
|---------|-------------|----------------|
| `08_USER_INTERFACE_SUPPORT.md` | Navegación UI, roles RBAC, errores comunes, soporte | Doc. Explicativo 6 |
| `09_DATA_GOVERNANCE_ODRL.md` | ODRL 2.0, Data Holder, contratos automáticos | Doc. Explicativo 7 |
| `10_ANALYTICS_BI_SYNTHETIC.md` | BI dashboards, KPIs, datos sintéticos, DataOps | Doc. Explicativo 8 |
| `11_TECHNICAL_INTEGRATION.md` | API REST, Webhooks, SDKs, seguridad DevSecOps | Doc. Explicativo 9 |
| `12_RESILIENCE_GOVERNANCE.md` | Casos extremos, M&A, insolvencia, gobernanza | Doc. Explicativo 10 |
| `13_SECTOR_DEEP_DIVE.md` | 6 sectores en profundidad con casos de uso | Doc. Explicativo 11 |
| `14_DEVELOPER_ARCHITECTURE.md` | Stack tecnológico, PostgreSQL, Edge Functions | Doc. Explicativo 12 |
| `15_NLU_DIALOG_TRAINING.md` | Identidad ARIA, empatía, Intent Mapping | Doc. Explicativo 13 |
| `16_USER_STORIES_LIBRARY.md` | Historias de usuario por perfil profesional | Doc. Explicativo 14 |
| `17_GLOSSARY_DICTIONARY.md` | Diccionario completo de términos técnicos | Doc. Explicativo 15 |

### Casos de Uso Sectoriales (Subdominios)

| Archivo | Descripción | Documento Base |
|---------|-------------|----------------|
| `18_CASO_ETAILERS_CONSTRUCCION.md` | Caso de uso nicho: estandarización de catálogos en construcción | etailers.procuredata.org |

---

## 🚀 Cómo Usar estos Documentos

### Para Google AI Studio

1. Crea un nuevo chat o prompt
2. Copia el contenido completo de `01_SYSTEM_INSTRUCTIONS.md`
3. Pégalo en el campo "System Instructions"
4. Opcionalmente, añade documentos adicionales como contexto

### Para el Chat AI (implementado en Edge Function)

Los contenidos están compilados en la Edge Function:
```
supabase/functions/chat-ai/index.ts
```

Esta función usa la API Key de la plataforma (auto-provisionada) para llamar a `google/gemini-3-flash-preview`.

**Conocimiento integrado en SYSTEM_INSTRUCTIONS v3.2:**
- Identidad y tono de ARIA
- Catálogo de 22 servicios con precios
- Sectores prioritarios y casos de uso
- Widgets interactivos y simuladores
- Reglas de respuesta (19+ reglas)
- Gobernanza ODRL y Data Holders
- Integración técnica (API, Webhooks)
- Registro y onboarding diferenciado
- Edge Functions documentadas
- Glosario de términos clave

### Para Claude o ChatGPT

1. Copia `01_SYSTEM_INSTRUCTIONS.md` como mensaje inicial
2. Usa los demás documentos como referencia cuando sea necesario

---

## 📂 Estructura de Contenido

```
entrenamientoIA/
├── README.md                      ← Este archivo (índice v3.2)
│
├── 📚 BASE ORIGINAL
├── 01_SYSTEM_INSTRUCTIONS.md      ← System Prompt completo para ARIA
├── 02_KNOWLEDGE_BASE.md           ← Contexto de negocio (problema nxm)
├── 03_SERVICES_CATALOG.md         ← 21 servicios con precios
├── 04_DATA_ARCHITECTURE.md        ← Esquema de tablas Supabase
├── 05_INTERACTIVE_WIDGETS.md      ← Widgets gamificados y simuladores
├── 06_RESPONSE_RULES.md           ← 10 reglas de comportamiento
├── 07_CONSTANTS_REFERENCE.md      ← Sectores, precios, stack europeo
│
├── 📖 CONOCIMIENTO EXPANDIDO (Docs Explicativos 6-15)
├── 08_USER_INTERFACE_SUPPORT.md   ← UI, roles, errores, soporte
├── 09_DATA_GOVERNANCE_ODRL.md     ← ODRL, Data Holder, contratos
├── 10_ANALYTICS_BI_SYNTHETIC.md   ← BI, KPIs, datos sintéticos
├── 11_TECHNICAL_INTEGRATION.md    ← APIs, Webhooks, SDKs
├── 12_RESILIENCE_GOVERNANCE.md    ← Casos extremos, gobernanza
├── 13_SECTOR_DEEP_DIVE.md         ← 6 sectores en profundidad
├── 14_DEVELOPER_ARCHITECTURE.md   ← Stack técnico, PostgreSQL
├── 15_NLU_DIALOG_TRAINING.md      ← Entrenamiento NLU de ARIA
├── 16_USER_STORIES_LIBRARY.md     ← Historias de usuario
└── 17_GLOSSARY_DICTIONARY.md      ← Glosario completo
```

---

## 🔄 Mantenimiento

Cuando se añadan nuevas funcionalidades a la aplicación:

1. Actualizar el documento correspondiente en esta carpeta
2. Sincronizar con `supabase/functions/chat-ai/index.ts` si afecta al chatbot
3. Verificar que `docs/ai_training_context.md` refleje los cambios

---

## 📊 Cobertura de Conocimiento

| Área | Archivos | Cobertura |
|------|----------|-----------|
| Negocio y Producto | 01, 02, 03 | ✅ Completo |
| Arquitectura Técnica | 04, 14 | ✅ Completo |
| Interactividad | 05 | ✅ Completo |
| Respuestas y Comportamiento | 06, 15 | ✅ Completo |
| Constantes | 07 | ✅ Completo |
| Interfaz de Usuario | 08 | ✅ Completo |
| Gobernanza de Datos | 09 | ✅ Completo |
| Analítica y BI | 10 | ✅ Completo |
| Integración Técnica | 11 | ✅ Completo |
| Resiliencia | 12 | ✅ Completo |
| Sectores | 13 | ✅ Completo |
| Historias de Usuario | 16 | ✅ Completo |
| Glosario | 17 | ✅ Completo |

---

## 📌 Fuentes Originales

Estos documentos se extraen y consolidan de:

- `docs/ai_training_context.md` - Training context principal
- `docs/synthetic_data.md` - Arquitectura de datos sintéticos
- `docs/ContextDocument.md` - Documento de contexto maestro
- `docs/DOCUMENTO_TECNICO.md` - Especificación técnica v3.2
- `docs/WHITEPAPER_PROCUREDATA.md` - Whitepaper técnico-económico v1.0
- `src/lib/constants.ts` - Constantes oficiales del código
- `src/pages/DocumentoExplicativo1-15.tsx` - Documentos explicativos de la app

---

## 🏷️ Etiquetas para Búsqueda

`ARIA` `chatbot` `IA` `training` `ProcureData` `Gaia-X` `IDSA` `proveedores` `sostenibilidad` `blockchain` `ODRL` `EDC` `Pontus-X` `EUROe` `CSRD` `ESG` `API` `Webhooks`
