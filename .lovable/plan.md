

## Internacionalización de DataLineage y renaming "Contrato Digital de Gobernanza" a "Licencia de Uso"

### 1. Internacionalización de DataLineage.tsx

El componente tiene 8 cadenas hardcodeadas en español que deben internacionalizarse. Se añadirá una sección `lineage` al namespace `dataView` en los 7 idiomas.

**Cadenas a internacionalizar (excluyendo datos de BD):**

| Cadena actual | Clave i18n |
|---|---|
| "Linaje de Datos" | `lineage.title` |
| "Trazabilidad completa desde el origen hasta el destino" | `lineage.subtitle` |
| "Fuente Original" | `lineage.source` |
| "Dataset" (fallback) | `lineage.datasetFallback` |
| "Origen de los datos" | `lineage.sourceDescription` |
| "Proveedor" | `lineage.provider` |
| "Organización Proveedora" (fallback) | `lineage.providerFallback` |
| "Titular de los datos" | `lineage.providerDescription` |
| "Contrato ODRL" | Se reemplaza por `lineage.contract` = "Licencia de Uso" |
| "Licencia Inteligente" | `lineage.smartLicense` |
| "días de acceso" | `lineage.daysAccess` (con interpolación `{{days}}`) |
| "Consumidor" | `lineage.consumer` |
| "Tu Organización" (fallback) | `lineage.consumerFallback` |
| "Receptor autorizado" | `lineage.consumerDescription` |

**Valores de BD que NO se tocan:** `transaction.asset?.product?.name`, `transaction.subject_org?.name`, `transaction.consumer_org?.name`, `transaction.access_duration_days`.

### 2. Renaming "Contrato Digital de Gobernanza" a "Licencia de Uso"

Se actualizarán 3 claves en los 7 archivos `dataView.json` + el nombre del archivo PDF:

| Archivo | Clave | Valor anterior (ES) | Valor nuevo (ES) |
|---|---|---|---|
| `dataView.json` | `data.downloadLicensePDF` | "Descargar Contrato Digital de Gobernanza" | "Descargar Licencia de Uso" |
| `dataView.json` | `toast.licenseSuccess` | "Contrato de Gobernanza descargado" | "Licencia de Uso descargada" |
| `dataView.json` | `toast.licenseError` | "Error al generar el Contrato de Gobernanza" | "Error al generar la Licencia de Uso" |
| `pdfGenerator.ts` | filename | `Contrato_Gobernanza_PROCUREDATA_...` | `Licencia_Uso_PROCUREDATA_...` |

**Traducciones del renaming en cada idioma:**

- **EN**: "Download Data License" / "Data License downloaded" / "Error generating Data License"
- **FR**: "Télécharger la Licence d'Utilisation" / "Licence d'Utilisation téléchargée" / "Erreur lors de la génération de la Licence"
- **DE**: "Datennutzungslizenz herunterladen" / "Nutzungslizenz heruntergeladen" / "Fehler beim Generieren der Nutzungslizenz"
- **IT**: "Scarica Licenza d'Uso" / "Licenza d'Uso scaricata" / "Errore nella generazione della Licenza d'Uso"
- **PT**: "Baixar Licença de Uso" / "Licença de Uso baixada" / "Erro ao gerar a Licença de Uso"
- **NL**: "Gebruikslicentie Downloaden" / "Gebruikslicentie gedownload" / "Fout bij het genereren van de Gebruikslicentie"

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/components/DataLineage.tsx` | Añadir `useTranslation('dataView')`, reemplazar 12 strings por `t()` |
| `src/locales/es/dataView.json` | Añadir sección `lineage`, actualizar 3 claves de renaming |
| `src/locales/en/dataView.json` | Idem |
| `src/locales/fr/dataView.json` | Idem |
| `src/locales/de/dataView.json` | Idem |
| `src/locales/it/dataView.json` | Idem |
| `src/locales/pt/dataView.json` | Idem |
| `src/locales/nl/dataView.json` | Idem |
| `src/utils/pdfGenerator.ts` | Renombrar nombre de archivo de salida |

