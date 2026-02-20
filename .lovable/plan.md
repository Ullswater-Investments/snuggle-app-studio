

## Cambiar Membresía Anual Pro (100 EUROe) a Membresía Mensual Pro (300 EUROe) en el Whitepaper

### Alcance del Cambio

Actualizar la referencia de precio de la membresía Pro en los **7 archivos de Whitepaper** (uno por idioma). En cada archivo hay **2 menciones** de "100 EUROe" vinculadas a la suscripción que deben cambiar a "300 EUROe" con periodicidad mensual.

### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `docs/WHITEPAPER_PROCUREDATA.md` (ES) | `100 EUROe/año suscripción` → `300 EUROe/mes suscripción` |
| `docs/WHITEPAPER_PROCUREDATA_EN.md` | `100 EUROe/year subscription` → `300 EUROe/month subscription` |
| `docs/WHITEPAPER_PROCUREDATA_FR.md` | `100 EUROe/an abonnement` → `300 EUROe/mois abonnement` |
| `docs/WHITEPAPER_PROCUREDATA_PT.md` | `100 EUROe/ano assinatura` → `300 EUROe/mes assinatura` |
| `docs/WHITEPAPER_PROCUREDATA_DE.md` | `100 EUROe/Jahr Abonnement` → `300 EUROe/Monat Abonnement` |
| `docs/WHITEPAPER_PROCUREDATA_IT.md` | `100 EUROe/anno abbonamento` → `300 EUROe/mese abbonamento` |
| `docs/WHITEPAPER_PROCUREDATA_NL.md` | `100 EUROe/jaar abonnement` → `300 EUROe/maand abonnement` |

Cada archivo tiene 2 ocurrencias de "100 EUROe" en las secciones de Obligaciones/Pagos y Pagos EUROe que seran actualizadas.

### Notas

- Este cambio **solo afecta al Whitepaper**. Los demas archivos del proyecto (constantes, portal de transparencia, documentos de partners, infografias, libro de reglas, etc.) tambien contienen "100 EUROe/ano" pero **no se modificaran** en este alcance, ya que el usuario solo pidio el cambio en el whitepaper.
- Si mas adelante deseas unificar el precio en toda la plataforma, seria necesario actualizar `src/lib/constants.ts`, los locales de `docs.json`, el Libro de Reglas, y demas archivos.

