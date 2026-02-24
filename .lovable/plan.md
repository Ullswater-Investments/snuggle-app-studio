
## Correccion Integral de i18n en Landing Page y Agente ARIA

### Problema diagnosticado

Se han identificado tres categorias de fallos de internacionalizacion:

**1. Footer con claves huerfanas (4 claves sin traduccion)**
En `src/pages/Landing.tsx` (lineas 594-600), el footer de "Transparencia" usa estas claves que NO existen en ningun `landing.json`:
- `footer.transparencyPortal`
- `footer.uneRecommendations`
- `footer.glossaryUne`
- `footer.rulebook`

Esto causa que se muestre la clave tecnica en la UI en lugar de texto legible.

**2. Textos hardcodeados en Landing.tsx**
Se han detectado cadenas en espanol sin pasar por `t()`:
- Linea 76: `"KIT ESPACIO DE DATOS"` (titulo demo link)
- Linea 79: `"Componentes modulares para tu Data Space"` (descripcion demo link)
- Linea 313: `"Partners"` (badge en navbar)
- Linea 330: `"Ir al Dashboard"` (boton autenticado)
- Linea 378: `"UNE 0087:2025 · 90%"` (badge compliance)

**3. Agente ARIA (AIConcierge) no pasa el idioma a la API**
El componente `AIConcierge.tsx` llama a la Edge Function `chat-ai` pero NO envia `i18n.language` en el body del request. La IA depende unicamente de detectar el idioma del mensaje del usuario, lo cual es fragil (mensajes cortos, mixtos, etc.). Ademas, las etiquetas de los widgets (lineas 45-330) estan hardcodeadas en espanol (ej: "Abrir Calculadora ROI", "Ver Gauge ESG", etc.).

---

### Cambios a realizar

#### 1. Anadir las 4 claves faltantes en `landing.json` (7 idiomas)

Anadir a la seccion `footer` de cada `landing.json`:

| Clave | ES | EN | FR | DE | IT | PT | NL |
|---|---|---|---|---|---|---|---|
| `transparencyPortal` | Portal de Transparencia | Transparency Portal | Portail de Transparence | Transparenzportal | Portale di Trasparenza | Portal de Transparencia | Transparantieportaal |
| `uneRecommendations` | Recomendaciones UNE | UNE Recommendations | Recommandations UNE | UNE-Empfehlungen | Raccomandazioni UNE | Recomendacoes UNE | UNE-Aanbevelingen |
| `glossaryUne` | Glosario UNE | UNE Glossary | Glossaire UNE | UNE-Glossar | Glossario UNE | Glossario UNE | UNE-Woordenlijst |
| `rulebook` | Libro de Reglas | Rulebook | Livre de Regles | Regelwerk | Libro delle Regole | Livro de Regras | Regelboek |

#### 2. Internacionalizar textos hardcodeados en Landing.tsx

Anadir claves nuevas a `landing.json`:

| Clave | ES | EN |
|---|---|---|
| `demoLinks.dataSpaceKitTitle` | KIT ESPACIO DE DATOS | DATA SPACE KIT |
| `demoLinks.dataSpaceKitDesc` | Componentes modulares para tu Data Space | Modular components for your Data Space |
| `nav.partners` | Partners | Partners |
| `nav.goToDashboard` | Ir al Dashboard | Go to Dashboard |
| `complianceBadge` | UNE 0087:2025 · 90% | UNE 0087:2025 · 90% |

Y reemplazar las cadenas hardcodeadas en `Landing.tsx` por llamadas a `t()`.

#### 3. Pasar idioma al Agente ARIA

En `src/components/AIConcierge.tsx`:
- Importar `useTranslation` (ya importado) y obtener `i18n`.
- Enviar `language: i18n.language` en el body del fetch a `chat-ai`.
- Anadir claves de widgets al namespace `chat` para internacionalizar las etiquetas de acciones (~20 labels como "Abrir Calculadora ROI", "Ver Caso BioMed Hospital", etc.).

En `supabase/functions/chat-ai/index.ts`:
- Recibir el parametro `language` del body.
- Inyectar el idioma en el system prompt para reforzar la deteccion: `"El idioma del portal del usuario es: ${language}. RESPONDE OBLIGATORIAMENTE en ese idioma."`.

#### 4. Internacionalizar etiquetas de widgets del concierge

Anadir al namespace `chat` en los 7 idiomas nuevas claves bajo `concierge.widgets`:

```text
concierge.widgets.openRoiCalc -> "Abrir Calculadora ROI" / "Open ROI Calculator" / ...
concierge.widgets.viewEsgGauge -> "Ver Gauge ESG" / "View ESG Gauge" / ...
concierge.widgets.viewMaturityRadar -> "Ver Radar Madurez" / ...
concierge.widgets.simulateContract -> "Simular Contrato" / ...
concierge.widgets.goToServices -> "Ir a Servicios" / ...
concierge.widgets.goToInnovation -> "Ir a Innovation Lab" / ...
concierge.widgets.viewSustainability -> "Ver Sostenibilidad" / ...
concierge.widgets.viewCase -> "Ver {{company}}" (con interpolacion)
```

Y actualizar la funcion `detectWidgets` para recibir `t` como parametro y usar estas claves.

---

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/locales/es/landing.json` | Anadir 4 claves footer + 5 claves hardcoded |
| `src/locales/en/landing.json` | Idem en ingles |
| `src/locales/fr/landing.json` | Idem en frances |
| `src/locales/de/landing.json` | Idem en aleman |
| `src/locales/it/landing.json` | Idem en italiano |
| `src/locales/pt/landing.json` | Idem en portugues |
| `src/locales/nl/landing.json` | Idem en neerlandes |
| `src/pages/Landing.tsx` | Reemplazar ~5 strings hardcodeados por `t()` |
| `src/locales/{7 idiomas}/chat.json` | Anadir ~10 claves `concierge.widgets.*` |
| `src/components/AIConcierge.tsx` | Pasar `i18n.language` al API + internacionalizar labels de widgets |
| `supabase/functions/chat-ai/index.ts` | Recibir `language` y reforzar el system prompt |

---

### Detalles tecnicos

- Todas las claves nuevas se anaden a los archivos JSON existentes sin modificar claves previas.
- La funcion `detectWidgets` pasa de ser una funcion pura a recibir `t` como parametro: `detectWidgets(content: string, t: TFunction)`.
- El `LANGUAGE_BRIDGE` en `chat-ai` ya tiene logica multilingue; se refuerza con el idioma explicito del portal para evitar ambiguedad en mensajes cortos o mixtos.
- Los badges tecnicos (Gaia-X, ODRL 2.0, Pontus-X, IDSA) se mantienen sin traducir ya que son nombres propios de estandares.
