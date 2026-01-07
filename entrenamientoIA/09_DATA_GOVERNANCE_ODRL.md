# 09 - Gobernanza de Datos, ODRL y el Rol de los Data Holders

> Basado en Documento Explicativo 7
> Mecanismos técnicos y legales que garantizan la soberanía del dato.

---

## 1. ODRL 2.0: El Motor de la Soberanía Digital

ODRL (Open Digital Rights Language) es el estándar que permite **contratos digitales ejecutables por máquinas**.

### Componentes de una Política ODRL

| Componente | Descripción | Ejemplo |
|------------|-------------|---------|
| **Permissions** | Acciones autorizadas | "lectura para homologación", "análisis para ESG" |
| **Prohibitions** | Acciones vetadas | "prohibido distribuir a terceros" |
| **Duties** | Obligaciones del comprador | "pagar 1 EUROe", "generar reporte de uso" |
| **Constraints** | Limitaciones temporales o espaciales | "válido 90 días", "solo en territorio UE" |

### Ejemplo de Política ODRL
```json
{
  "@type": "odrl:Agreement",
  "permission": [{
    "action": "read",
    "constraint": { "duration": "P90D" }
  }],
  "prohibition": [{
    "action": "distribute"
  }],
  "duty": [{
    "action": "pay",
    "constraint": { "amount": "1", "unit": "EUROe" }
  }]
}
```

---

## 2. El Rol Crítico del Data Holder

El **Data Holder** es el custodio técnico en el "Triángulo de Confianza".

### Responsabilidades

| Función | Descripción |
|---------|-------------|
| **Neutralidad y Custodia** | Posee el dato verificado pero solo lo libera con instrucción firmada |
| **Seguridad y Entrega** | Actúa como "túnel seguro" cifrando y entregando directamente al comprador |
| **Interoperabilidad IDS** | Opera bajo protocolo International Data Spaces para compatibilidad europea |

### Flujo de Liberación de Datos
1. Consumer solicita acceso al dato
2. Provider aprueba la solicitud
3. Data Holder verifica firmas digitales de ambas partes
4. Solo entonces libera el dato cifrado al Consumer

---

## 3. Negociación Automática de Contratos

El proceso de negociación es completamente automatizado:

### Etapas del Proceso

| Etapa | Descripción |
|-------|-------------|
| **1. Oferta** | El proveedor publica un activo con política ODRL predefinida |
| **2. Petición** | El comprador acepta términos o propone variaciones |
| **3. Acuerdo (Agreement)** | Los conectores EDC comparan reglas y firman digitalmente si coinciden |
| **4. Ejecución** | El sistema bloquea acceso automáticamente al expirar la restricción temporal |

### Conectores EDC (Eclipse Dataspace Connector)
- Comparan políticas ODRL de ambas partes
- Firman digitalmente cuando hay coincidencia
- Ejecutan el contrato de forma automática

---

## 4. Auditoría y Revocación de Acceso

### Mecanismos de Control

| Característica | Descripción |
|----------------|-------------|
| **Revocación de Acceso** | El proveedor puede revocar la política ODRL inmediatamente desde su panel |
| **Trazabilidad Blockchain** | Cada movimiento queda con "sello de tiempo" en Pontus-X |
| **Transparencia Total** | El administrador ve quién tiene acceso a qué activos y bajo qué condiciones |

### Botón de Revocación
- Ubicado en: Panel de Control > Mis Activos > [Activo] > Revocar Acceso
- Efecto inmediato sobre todos los acuerdos activos

---

## 5. El Trust Framework (Marco de Confianza)

Basado en las reglas de **Gaia-X** para garantizar confianza europea.

### Componentes del Trust Framework

| Elemento | Descripción |
|----------|-------------|
| **Self-Description** | Archivo firmado que certifica cumplimiento de seguridad y legalidad |
| **Requisito Obligatorio** | Todo Data Holder y Provider debe emitir Self-Description |
| **Verificación Automática** | La plataforma valida las descripciones antes de permitir operaciones |

---

## 6. Reglas de Respuesta para ARIA

### Triggers de Gobernanza
- "ODRL" / "contrato" → Explicar componentes de políticas
- "data holder" → Describir rol neutral de custodia
- "revocar" / "acceso" → Indicar proceso de revocación
- "Gaia-X" / "trust" → Explicar marco de confianza europeo

### Frases Sugeridas
- "Los contratos ODRL tienen 4 componentes: permisos, prohibiciones, deberes y restricciones."
- "El Data Holder solo libera datos cuando Provider y Consumer han firmado digitalmente."
- "Puedes revocar el acceso a un activo en cualquier momento desde tu panel de control."
