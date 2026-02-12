
## Plan: Auditoría y Corrección de Traducciones en Casos de Éxito

El usuario reporta que componentes clave ("Reto", "Solución", "Simulador de Impacto", "Textos Informativos") en las páginas de casos de éxito no se están traduciendo correctamente. La auditoría ha revelado que:

1.  **Datos Hardcoded**: `SuccessStoryDetail.tsx` contiene un objeto masivo `casesData` con 47 casos donde los campos `challenge`, `solution` y `ariaQuote` están hardcoded en español. Aunque hay lógica para usar `t()`, los fallbacks o la estructura de claves podrían estar fallando.
2.  **Simuladores Legacy**: Varios simuladores antiguos (`HealthMaintenanceSimulator`, `EnergySmartContract`) tienen textos hardcoded en español y no usan `useTranslation`.
3.  **Simuladores Nuevos**: Los simuladores más recientes parecen estar mejor estructurados, pero requieren revisión.

### Fase 1: Migración de `casesData` a i18n (Prioridad Alta)
El objeto `casesData` en `SuccessStoryDetail.tsx` debe ser refactorizado. Actualmente, actúa como fuente de verdad con textos en español.
-   **Acción**: Verificar que `src/locales/es/success.json` (y otros idiomas) contenga las claves para **todos** los 47 casos.
-   **Acción**: Refactorizar `SuccessStoryDetail.tsx` para que `caseData` recupere los textos estrictamente desde `t()`, usando el ID del caso como clave dinámica. Eliminar los textos hardcoded del componente para forzar el uso de i18n.

### Fase 2: Internacionalización de Simuladores Legacy
Los siguientes componentes tienen textos hardcoded y necesitan ser actualizados para usar el hook `useTranslation`:
-   `HealthMaintenanceSimulator.tsx` (Crítico: textos de UI y lógica de ahorro hardcoded)
-   `EnergySmartContract.tsx` (Crítico: pasos de animación y textos de comparación hardcoded)
-   `ROISimulator.tsx`
-   `AgroROISimulator.tsx`
-   `SocialImpactDashboard.tsx`
-   `MobilityScope3Report.tsx`

**Pasos por componente:**
1.  Importar `useTranslation` de `react-i18next`.
2.  Extraer todos los strings visibles a `src/locales/es/simulators.json`.
3.  Crear claves equivalentes en `en`, `fr`, `de`, `it`, `pt`, `nl`.
4.  Reemplazar strings por llamadas `t()`.

### Fase 3: Revisión de Simuladores Nuevos (Blueprint 2.0)
Los simuladores importados vía `SuccessVisualRenderer` (ej. `H2PureSimulator`, `BioHeatDistrictSimulator`) parecen estar mejor preparados, pero se realizará un barrido para asegurar que no queden "residuos" de texto en español en etiquetas de gráficos o tooltips.

### Orden de Ejecución Propuesto
1.  **Refactorizar `SuccessStoryDetail.tsx`**: Asegurar que el esqueleto de la página carga los textos dinámicos correctamente.
2.  **Actualizar `HealthMaintenanceSimulator` y `EnergySmartContract`**: Son los más complejos y visibles.
3.  **Actualizar resto de Simuladores Legacy**.
4.  **Validar claves en `success.json`**: Asegurar cobertura 100% de los 47 casos en los 7 idiomas.

Esta intervención asegurará que la experiencia sea nativa en el idioma seleccionado por el usuario en todo el flujo del caso de éxito.
