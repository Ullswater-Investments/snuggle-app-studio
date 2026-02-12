
## Plan: Pagina "Catalogo de Datos" con Infografia Dinamica y Chat IA Especializado

Replica exacta del patron establecido en la pagina "Fundamentos", adaptado al dominio de Registro y Descubrimiento de Activos de datos.

---

### 1. Enlazar la tarjeta en el Roadmap

**Archivo: `src/components/landing/RoadmapPhases.tsx`**
- Anadir `slug: "catalogo-datos"` a la fase 2 (Catalogo de Datos) en el array `phases`
- El sistema de Link ya existe y detecta automaticamente el slug para envolver la tarjeta

### 2. Crear la pagina principal

**Archivo nuevo: `src/pages/CatalogoDatos.tsx`**

Estructura identica a Fundamentos.tsx:
- **Hero**: Badge "Fase 2", titulo "Catalogo de Datos de ProcureData", subtitulo sobre registro y descubrimiento de activos
- **Infografia dinamica**: Componente `CatalogoDatosInfographic`
- **Metricas animadas**: 3 contadores (20 Categorias de Activos, 47 Casos Conectados, 5 Formatos Soportados)
- **Chat IA**: Componente `CatalogoDatosChatAgent`

### 3. Crear la infografia interactiva

**Archivo nuevo: `src/components/catalogo-datos/CatalogoDatosInfographic.tsx`**

Diagrama animado con 3 capas interactivas (mismo patron visual que FundamentosInfographic):

```text
+-----------------------------------------------+
|  CAPA 1: REGISTRO DE ACTIVOS                  |
|  [Proveedor] --> [Metadatos] --> [Catalogo]    |
|  Publicacion de datasets con esquema DCAT-AP   |
+-----------------------------------------------+
           |
           v
+-----------------------------------------------+
|  CAPA 2: DESCUBRIMIENTO Y BUSQUEDA            |
|  [Busqueda] [Filtros] [Recomendaciones]        |
|  Motor de busqueda federado con facetas        |
+-----------------------------------------------+
           |
           v
+-----------------------------------------------+
|  CAPA 3: GOBERNANZA Y CALIDAD                 |
|  [Validacion] [Scoring] [Linaje]              |
|  Puntuacion de calidad y trazabilidad          |
+-----------------------------------------------+
```

Cada capa expandible al hacer clic con detalles tecnicos:
- **Registro**: DCAT-AP, esquemas JSON-LD, publicacion automatica via ERP Connector, versionado de activos
- **Descubrimiento**: Busqueda full-text, filtros por sector/formato/licencia, recomendaciones basadas en perfil organizativo
- **Gobernanza**: Scoring de calidad (completitud, frescura, documentacion), linaje de datos, politicas ODRL de acceso

### 4. Crear el Chat IA especializado

**Archivo nuevo: `src/components/catalogo-datos/CatalogoDatosChatAgent.tsx`**

Replica del FundamentosChatAgent con:
- Conexion a nueva edge function `catalogo-datos-agent`
- Preguntas sugeridas contextuales:
  - "Como se registra un activo de datos en ProcureData?"
  - "Que es DCAT-AP y como se aplica al catalogo?"
  - "Como funciona el descubrimiento federado de datos?"
  - "Como se aplica el catalogo en el caso GigaFactory?"
- Integracion con chatGuard y TokenWallet

### 5. Edge Function del Agente

**Archivo nuevo: `supabase/functions/catalogo-datos-agent/index.ts`**

- Modelo: `google/gemini-3-flash-preview`
- System prompt especializado que cubre:
  - Registro de activos (DCAT-AP, metadatos, esquemas, formatos)
  - Descubrimiento federado (busqueda, filtros, recomendaciones)
  - Gobernanza de datos (calidad, scoring, linaje, politicas ODRL)
  - Como cada uno de los 47 casos de exito utiliza el catalogo de datos
  - Reglas de seguridad anti-sabotaje (SECURITY_RULES)
  - LANGUAGE_BRIDGE para respuesta multilingue
- Streaming SSE, manejo de 429/402

### 6. Traducciones i18n (7 idiomas)

**Archivos nuevos: `src/locales/*/catalogoDatos.json`** (es, en, fr, de, it, pt, nl)

Claves:
- `backToHome`, `badge`, `title`, `subtitle`
- `layers.registro.label/title`, `layers.descubrimiento.label/title`, `layers.gobernanza.label/title`
- `metrics.categories/cases/formats`
- `chat.badge/description/placeholder/sectionTitle/sectionSubtitle/q1/q2/q3/q4`

### 7. Registro de ruta y configuracion

**Archivo: `src/App.tsx`**
- Importar `CatalogoDatos` y anadir ruta: `<Route path="/catalogo-datos" element={<CatalogoDatos />} />`

**Archivo: `src/i18n.ts`**
- Importar los 7 archivos `catalogoDatos.json` y registrar el namespace `catalogoDatos` en cada idioma

**Archivo: `supabase/config.toml`**
- Anadir `[functions.catalogo-datos-agent]` con `verify_jwt = false`

---

### Resumen de archivos

| Archivo | Accion |
|---------|--------|
| `src/pages/CatalogoDatos.tsx` | CREAR |
| `src/components/catalogo-datos/CatalogoDatosInfographic.tsx` | CREAR |
| `src/components/catalogo-datos/CatalogoDatosChatAgent.tsx` | CREAR |
| `supabase/functions/catalogo-datos-agent/index.ts` | CREAR |
| `src/locales/es/catalogoDatos.json` | CREAR |
| `src/locales/en/catalogoDatos.json` | CREAR |
| `src/locales/fr/catalogoDatos.json` | CREAR |
| `src/locales/de/catalogoDatos.json` | CREAR |
| `src/locales/it/catalogoDatos.json` | CREAR |
| `src/locales/pt/catalogoDatos.json` | CREAR |
| `src/locales/nl/catalogoDatos.json` | CREAR |
| `src/components/landing/RoadmapPhases.tsx` | MODIFICAR - Anadir slug |
| `src/App.tsx` | MODIFICAR - Anadir ruta |
| `src/i18n.ts` | MODIFICAR - Registrar namespace |
| `supabase/config.toml` | MODIFICAR - Anadir funcion |
