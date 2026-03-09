# 18 - Caso de Uso Nicho: etailers.procuredata.org (Sector Construcción)

> **IMPORTANTE**: Este documento describe un SUBDOMINIO ESPECÍFICO de ProcureData para un caso de uso de nicho.
> NO forma parte de la oferta general de ProcureData. NO mezclar con la base de conocimiento general (docs 01-17).
> Solo referenciar cuando el usuario pregunte específicamente sobre construcción, materiales, fabricantes,
> distribuidores, estandarización de productos, ETIM, GS1, AAS, Digital TER-X, Kit Espacio de Datos,
> o el subdominio etailers.procuredata.org.

> **Subdominio**: https://etailers.procuredata.org/
> **Sector**: Construcción (fabricantes y distribuidores de materiales)
> **Tipo**: Informe estratégico / Caso de uso sectorial
> **Última actualización**: 2026-03-09

---

## 1. Identificación del Caso

### ¿Qué es etailers.procuredata.org?

Es un informe estratégico presentado a un cliente del sector construcción. Describe cómo ProcureData puede aplicar su tecnología de espacios de datos federados al problema específico de la **estandarización inteligente y optimización de compras** en el sector de materiales de construcción.

### Cliente Objetivo

- **Fabricantes** de materiales de construcción
- **Distribuidores** y almacenes de construcción
- **Compradores industriales** del sector construcción
- Empresas que operan con catálogos de productos técnicos (ETIM, GS1)

---

## 2. El Problema: 3 Barreras en Construcción

### Barrera 1: Duplicidades de Codificación
Cada fabricante codifica sus productos con sistemas propios. Un mismo tornillo puede tener 15 códigos diferentes según el fabricante, generando caos en los ERPs de distribuidores.

### Barrera 2: Descriptivos Inconsistentes
Las fichas técnicas de productos varían enormemente entre fabricantes. Materiales idénticos se describen de formas incompatibles, dificultando la comparación y homologación.

### Barrera 3: Fragmentación de Compra
Sin datos estandarizados, los departamentos de compras no pueden consolidar volúmenes ni negociar condiciones óptimas. Se pierden oportunidades de ahorro del 3-8%.

---

## 3. La Solución: 3 Pilares

### Pilar 1: Depuración con IA
Inteligencia Artificial para normalizar y deduplicar catálogos de productos. Mapeo automático entre códigos propietarios y estándares abiertos (ETIM, GS1).

### Pilar 2: Espacio de Datos Común (GXDCH)
Creación de un espacio de datos federado compatible con Gaia-X donde fabricantes comparten catálogos estandarizados manteniendo soberanía sobre sus datos.

### Pilar 3: Optimización Predictiva de Compras
Algoritmos de predicción de demanda y consolidación inteligente de pedidos basados en datos compartidos del ecosistema.

---

## 4. Stack Tecnológico Específico

| Tecnología | Función en este caso |
|------------|---------------------|
| **EDC (Eclipse Dataspace Connector)** | Conector federado para intercambio de catálogos |
| **AAS (Asset Administration Shell)** | Gemelo digital de cada producto/material |
| **Pontus-X CtD (Compute-to-Data)** | Análisis de datos sin moverlos del origen |
| **GXDCH (Gaia-X Digital Clearing House)** | Verificación de compliance Gaia-X |
| **Digital TER-X 2050** | Marco de transformación digital del sector construcción |
| **ETIM** | Estándar europeo de clasificación de productos técnicos |
| **GS1** | Estándar global de identificación de productos |

---

## 5. Caso de Uso: Fabricante como Propietario Soberano del Dato

El fabricante de materiales de construcción es el **dueño soberano** de su catálogo de productos. A través del espacio de datos federado, puede:

### Tipos de Datos Federables

| Tipo de Dato | Descripción | Beneficio |
|--------------|-------------|-----------|
| **Catálogo técnico** | Fichas de producto estandarizadas (ETIM/GS1) | Visibilidad en todo el ecosistema |
| **Precios y condiciones** | Tarifas con políticas ODRL de acceso | Control granular de quién ve qué |
| **Stock y disponibilidad** | Inventario en tiempo real | Reducción de roturas de stock |
| **Certificaciones** | ISO, marcado CE, DoP | Homologación automática |
| **Huella de carbono** | Emisiones por producto (EPD) | Cumplimiento CSRD/CBAM |

### Flujo del Caso de Uso

1. **Fabricante** publica catálogo estandarizado en el espacio de datos
2. **IA** normaliza y mapea contra estándares ETIM/GS1
3. **Distribuidor** solicita acceso vía contrato ODRL
4. **Data Holder** (ProcureData) libera datos con doble autorización
5. **Comprador** consolida y optimiza pedidos con datos federados

---

## 6. Ayudas: Kit Espacio de Datos (Red.es)

### Programa de Subvención

| Aspecto | Detalle |
|---------|---------|
| **Organismo** | Red.es (Ministerio para la Transformación Digital) |
| **Programa** | Kit Espacio de Datos |
| **Cuantía** | Hasta **30.000 EUR** por empresa |
| **Beneficiarios** | PYMEs y grandes empresas del sector construcción |
| **Plazo** | Hasta marzo 2026 |
| **Objetivo** | Financiar la adopción de espacios de datos federados Gaia-X |

### Qué Cubre

- Implementación del conector EDC
- Estandarización de catálogos (ETIM/GS1)
- Integración con el espacio de datos común
- Formación del equipo en soberanía del dato

---

## 7. Próximos Pasos: Agile Procurement (3 Fases)

### Fase 1: Diagnóstico (4-6 semanas)
- Auditoría de catálogos actuales
- Mapeo de duplicidades y gaps de codificación
- Evaluación de madurez digital del ecosistema

### Fase 2: Piloto (8-12 semanas)
- Estandarización de un subconjunto de productos con IA
- Despliegue del conector EDC en modo sandbox
- Prueba de concepto con 3-5 fabricantes y 2-3 distribuidores

### Fase 3: Escalado (12-24 semanas)
- Ampliación a catálogo completo
- Integración con ERPs existentes
- Activación del espacio de datos en producción (GXDCH)
- Onboarding del resto del ecosistema

---

## 8. Métricas Clave

| Métrica | Valor |
|---------|-------|
| **Ahorro estimado en compras** | 3-8% por consolidación inteligente |
| **Subvención disponible** | Hasta 30.000 EUR (Kit Espacio de Datos) |
| **Reducción de duplicidades** | >80% con normalización IA |
| **Tiempo de homologación** | De semanas a horas |
| **Cobertura de estándares** | ETIM + GS1 + AAS |

---

## 9. Relación con ProcureData Core

Este caso de uso **reutiliza** la infraestructura core de ProcureData:

| Componente Core | Aplicación en Construcción |
|-----------------|---------------------------|
| Modelo tripartito (Provider/Consumer/Holder) | Fabricante/Distribuidor/ProcureData |
| Contratos ODRL | Políticas de acceso a catálogos |
| Pontus-X Blockchain | Trazabilidad de transacciones |
| Pasaporte de Proveedor | Pasaporte de Fabricante |
| Wallets EUROe | Pagos por acceso a datos |

Pero **NO es un producto general**: es una aplicación vertical específica para el sector construcción.

---

## 10. Etiquetas para Búsqueda

`construcción` `materiales` `fabricantes` `distribuidores` `ETIM` `GS1` `AAS` `Digital TER-X` `Kit Espacio de Datos` `Red.es` `estandarización` `catálogos` `etailers` `subdominio`
