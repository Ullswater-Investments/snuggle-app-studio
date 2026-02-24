

## Internacionalizacion de KitDatosCampaignBanner y clave viewUne0087

### Problema

1. **KitDatosCampaignBanner.tsx**: Tiene ~10 cadenas hardcodeadas en espanol que no pasan por `t()`.
2. **viewUne0087**: La clave `t('viewUne0087')` se usa en `Landing.tsx` (linea 468) pero NO existe en ningun archivo de traducciones, por lo que se muestra el texto tecnico en la UI.

### Cadenas a internacionalizar en KitDatosCampaignBanner

| Texto actual | Clave propuesta (namespace `landing`) |
|---|---|
| "AYUDAS KIT ESPACIO DE DATOS" | `campaign.title` |
| "Inscripcion hasta 20 de Marzo del 2026" | `campaign.deadline` |
| "PLAZAS LIMITADAS" | `campaign.limitedSlots` |
| "Digitaliza tu cadena de suministro con hasta" | `campaign.mainMessage` |
| "de Subvencion a fondo perdido de RED.ES" | `campaign.grantSource` |
| "Tramitacion incluida en la cuota mensual" | `campaign.benefit1` |
| "Subvencion 85-90%" | `campaign.benefit2` |
| "Sin letra pequena" | `campaign.benefit3` |
| "SOLICITA LAS AYUDAS KIT ESPACIO DE DATOS" | `campaign.ctaMain` |
| "Solicitar Inscripcion por 190 EUR al mes" | `campaign.ctaEnroll` |
| "Ver Condiciones" | `campaign.ctaConditions` |

### Clave viewUne0087

Anadir a los 7 archivos `landing.json`:

| Idioma | Valor |
|---|---|
| ES | Ver UNE 0087:2025 |
| EN | View UNE 0087:2025 |
| FR | Voir UNE 0087:2025 |
| DE | UNE 0087:2025 ansehen |
| IT | Vedi UNE 0087:2025 |
| PT | Ver UNE 0087:2025 |
| NL | UNE 0087:2025 bekijken |

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/components/home/KitDatosCampaignBanner.tsx` | Importar `useTranslation('landing')`, reemplazar ~11 strings por `t()` |
| `src/locales/es/landing.json` | Anadir bloque `campaign.*` (11 claves) + `viewUne0087` |
| `src/locales/en/landing.json` | Idem en ingles |
| `src/locales/fr/landing.json` | Idem en frances |
| `src/locales/de/landing.json` | Idem en aleman |
| `src/locales/it/landing.json` | Idem en italiano |
| `src/locales/pt/landing.json` | Idem en portugues |
| `src/locales/nl/landing.json` | Idem en neerlandes |

### Traducciones del bloque campaign (resumen)

- **ES**: "AYUDAS KIT ESPACIO DE DATOS" / "Inscripcion hasta 20 de Marzo del 2026" / "PLAZAS LIMITADAS" / "Solicitar Inscripcion por 190 EUR al mes" / "Ver Condiciones"
- **EN**: "DATA SPACE KIT GRANTS" / "Registration until March 20, 2026" / "LIMITED SPOTS" / "Apply for 190 EUR/month" / "View Conditions"
- **FR**: "AIDES KIT ESPACE DE DONNEES" / "Inscription jusqu'au 20 mars 2026" / "PLACES LIMITEES" / "S'inscrire pour 190 EUR/mois" / "Voir les Conditions"
- **DE**: "FORDERPROGRAMM DATENRAUM-KIT" / "Anmeldung bis 20. Marz 2026" / "BEGRENZTE PLATZE" / "Anmeldung fur 190 EUR/Monat" / "Bedingungen ansehen"
- **IT**: "AIUTI KIT SPAZIO DATI" / "Iscrizione entro il 20 marzo 2026" / "POSTI LIMITATI" / "Iscriviti per 190 EUR/mese" / "Vedi Condizioni"
- **PT**: "AJUDAS KIT ESPACO DE DADOS" / "Inscricao ate 20 de Marco de 2026" / "VAGAS LIMITADAS" / "Inscrever-se por 190 EUR/mes" / "Ver Condicoes"
- **NL**: "SUBSIDIES DATARUIMTE-KIT" / "Inschrijving tot 20 maart 2026" / "BEPERKTE PLAATSEN" / "Inschrijven voor 190 EUR/maand" / "Voorwaarden bekijken"

### Detalles tecnicos

- El mensaje principal usa interpolacion para el importe: `t('campaign.mainMessage', { amount: '30.000 €' })` para que el numero pueda formatearse por locale.
- Los benefits se construyen como array: `[t('campaign.benefit1'), t('campaign.benefit2'), t('campaign.benefit3')]`.
- No se traduce "RED.ES" ni "Kit Espacio de Datos" (alt de imagen) ya que son nombres propios institucionales.
