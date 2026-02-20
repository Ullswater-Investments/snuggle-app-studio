
## Ajustes visuales y de terminología en Métricas de Rendimiento

### 1. Estilo condicional para "Sin datos"

**Archivo:** `src/pages/Reports.tsx`

En las tres tarjetas de métricas (líneas 705-706, 720-726, 740-741), el texto "Sin datos" se renderiza dentro de un `<p className="text-2xl font-bold">`. Cuando el valor sea `t("charts.noData")`, se aplicará un estilo más sutil:

- Clase actual: `text-2xl font-bold`
- Clase cuando no hay datos: `text-base text-muted-foreground font-normal`

Se usará una expresión ternaria en el `className` de cada `<p>` para alternar entre ambos estilos según la condición `(!kpis || kpis.total_volume === 0)`.

### 2. Renombrar "Políticas ODRL aplicadas" a "Controles de acceso aplicados"

**Archivos de traducción (7 idiomas):** Actualizar la clave `metrics.odrlPolicies` en cada `src/locales/{lang}/reports.json`:

| Idioma | Valor actual | Nuevo valor |
|--------|-------------|-------------|
| ES | Políticas ODRL aplicadas | Controles de acceso aplicados |
| EN | ODRL policies applied | Access controls applied |
| FR | Politiques ODRL appliquées | Contrôles d'accès appliqués |
| DE | Angewandte ODRL-Richtlinien | Angewandte Zugriffskontrollen |
| IT | Politiche ODRL applicate | Controlli di accesso applicati |
| PT | Políticas ODRL aplicadas | Controles de acesso aplicados |
| NL | Toegepaste ODRL-beleid | Toegepaste toegangscontroles |

### Archivos a modificar (8 total)

1. `src/pages/Reports.tsx` -- className condicional en 3 bloques de métricas
2. `src/locales/es/reports.json` -- odrlPolicies
3. `src/locales/en/reports.json` -- odrlPolicies
4. `src/locales/fr/reports.json` -- odrlPolicies
5. `src/locales/de/reports.json` -- odrlPolicies
6. `src/locales/it/reports.json` -- odrlPolicies
7. `src/locales/pt/reports.json` -- odrlPolicies
8. `src/locales/nl/reports.json` -- odrlPolicies
