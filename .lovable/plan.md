

## Correccion de i18n y Contraste en Landing Page

### 1. Claves faltantes: `sectorCompanies.*` y `sectorDescriptions.*` (16 sectores x 7 idiomas)

El componente `Landing.tsx` (lineas 174-302) referencia `t('sectorCompanies.industrial')`, `t('sectorDescriptions.industrial')`, etc. para 16 sectores. Estas claves **no existen** en ningun archivo `landing.json`, lo que causa que se muestren las claves tecnicas en la cuadricula de sectores.

Se anadiran 32 claves nuevas (16 `sectorCompanies` + 16 `sectorDescriptions`) a cada uno de los 7 archivos `landing.json`:

| Sector | sectorCompanies (ES) | sectorDescriptions (ES) |
|---|---|---|
| industrial | GigaFactory North | Homologacion industrial en 24h |
| agro | OliveTrust Coop | Trazabilidad del campo a la mesa |
| mobility | UrbanDeliver BCN | Logistica urbana de ultima milla |
| social | Alianza Social Hub | Inclusion social con datos verificados |
| health | BioMed Hospital | Interoperabilidad de datos clinicos |
| retail | GlobalRetail Prime | Cadena de suministro omnicanal |
| energy | Helios Fields | Certificados de energia renovable |
| aero | Turbine Chain | Trazabilidad de componentes aeronauticos |
| wines | VinosDOE Elite | Denominacion de origen con blockchain |
| pharma | PharmaCold Logistix | Cadena de frio certificada |
| port | PortBCN Smart Trade | Comercio portuario inteligente |
| gov | Ayuntamiento Etico | Contratacion publica transparente |
| mining | PureLithium Sourcing | Abastecimiento responsable de minerales |
| fashion | FastFashion Trace | Trazabilidad textil sostenible |
| finance | GreenFinance ESG | Scoring ESG para financiacion verde |
| grid | GridFlex Demand | Gestion inteligente de la demanda |

Se traduciran a EN, FR, DE, IT, PT y NL.

### 2. Clave faltante: `nav.startRegistration` en DE, IT, PT, NL

Los archivos `landing.json` de aleman, italiano, portugues y neerlandes no tienen `nav.startRegistration`. Se anadira:

| Idioma | Valor |
|---|---|
| DE | Registrierung starten |
| IT | Inizia Registrazione |
| PT | Iniciar Registo |
| NL | Start Registratie |

### 3. Contraste en seccion "Ecosistema de Valor Web3" (modo oscuro)

Linea 446 de `Landing.tsx`: la seccion usa `bg-gradient-to-b from-background to-slate-50`. En modo oscuro, `to-slate-50` genera un fondo claro incoherente.

**Cambio**: Anadir `dark:to-slate-900` para que en modo oscuro el gradiente sea oscuro y el texto tenga contraste adecuado. Tambien cambiar el texto descriptivo (linea 453-454) de `text-muted-foreground` a `text-muted-foreground dark:text-slate-300` para mejorar legibilidad.

### 4. Revision del footer (ya resuelto)

Las 4 claves del footer (`transparencyPortal`, `uneRecommendations`, `glossaryUne`, `rulebook`) ya existen correctamente en los 7 idiomas desde la iteracion anterior. No requieren cambios.

### 5. ARIA - idioma ya integrado

El paso de `i18n.language` al Agente ARIA ya se implemento en la iteracion anterior (tanto en `AIConcierge.tsx` como en `chat-ai/index.ts`). No requiere cambios adicionales.

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/locales/es/landing.json` | Anadir `sectorCompanies` (16) + `sectorDescriptions` (16) |
| `src/locales/en/landing.json` | Idem en ingles |
| `src/locales/fr/landing.json` | Idem en frances |
| `src/locales/de/landing.json` | Idem en aleman + `nav.startRegistration` |
| `src/locales/it/landing.json` | Idem en italiano + `nav.startRegistration` |
| `src/locales/pt/landing.json` | Idem en portugues + `nav.startRegistration` |
| `src/locales/nl/landing.json` | Idem en neerlandes + `nav.startRegistration` |
| `src/pages/Landing.tsx` | Corregir gradiente dark mode en seccion Web3 (linea 446) y mejorar contraste texto (linea 453) |

### Detalles tecnicos

- Las 32 claves nuevas por idioma se anaden como bloques `sectorCompanies` y `sectorDescriptions` al nivel raiz de cada `landing.json`.
- El gradiente se corrige con: `bg-gradient-to-b from-background to-slate-50 dark:to-slate-900`.
- El texto descriptivo se refuerza con: `text-muted-foreground dark:text-slate-300`.
- No se tocan claves existentes ni se modifican otros componentes.

