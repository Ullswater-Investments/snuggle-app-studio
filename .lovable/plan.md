

## Problem Analysis

There are **two categories** of issues to resolve:

### 1. Outdated pricing (190€/mes → 1.500€ adhesión + 250€/mes)

Per the memory context, the updated commercial terms are: **1.500€ prepaid adhesion** + **250€/mes with 2-year commitment**. The old "190€/mes × 6 meses = 1.140€" model with HOKODO financing is obsolete. Found in **5 files**:

| File | What's wrong |
|------|-------------|
| `src/pages/GuiaKitEspacioDatos.tsx` (line 22) | "Sin inversión inicial significativa (190€/mes)" |
| `src/pages/PropuestaKitEspacioDatos.tsx` (lines 92-93) | "190€/mes" hero pricing + "6 meses × 190€ = 1.140€" |
| `src/pages/ContratoKitEspacioDatos.tsx` (lines 13-14) | Clauses 3 & 4 reference 190€/mes and HOKODO |
| `src/components/legal/ContractContent.tsx` (lines 46, 58) | Same clauses 3 & 4 with old pricing |
| `src/components/legal/AcceptanceActContent.tsx` (line 40) | HOKODO authorization with 190€ amounts |

**Updated text will reflect:**
- Fase 1: 1.500€ + IVA (pago único de adhesión)
- Fase 2: 250€/mes × 24 meses (condicionado a subvención)
- Remove HOKODO financing references (replaced by prepaid model)

### 2. Security findings (4 issues)

| Finding | Level | Action |
|---------|-------|--------|
| **Security Definer View** | Error | Needs investigation — identify which view and assess if it's intentional |
| **ERP Credentials Exposure** | Error | Restrict SELECT on `erp_configurations` to admins/configurators only (remove the general org-level SELECT policy) |
| **Kit Inscriptions Data Exposure** | Error | Restrict SELECT on `kit_inscriptions` to admins only (currently any authenticated user can read all inscriptions) |
| **RLS Policy Always True** | Warn | Audit INSERT policies using `true` (e.g., `signed_contracts`, `registration_requests`, `node_eligibility_requests`) — these are intentional for public submission forms, will document/acknowledge |
| **Leaked Password Protection** | Warn | Enable via auth configuration |
| **Extension in Public** | Warn | Low priority, acknowledge |

## Implementation Plan

### Step 1: Update all pricing from 190€ to new model

**`src/pages/GuiaKitEspacioDatos.tsx`** — Change benefit text from "190€/mes" to "1.500€ adhesión + 250€/mes"

**`src/pages/PropuestaKitEspacioDatos.tsx`** — Replace the pricing summary section: Fase 1 shows "1.500€" (pago único), Fase 2 shows "250€/mes × 24 meses"

**`src/pages/ContratoKitEspacioDatos.tsx`** — Update clauses 3 and 4 to reflect new pricing model without HOKODO

**`src/components/legal/ContractContent.tsx`** — Same clause updates as above

**`src/components/legal/AcceptanceActContent.tsx`** — Update point 4 to remove HOKODO/190€ references, replace with new adhesion model

### Step 2: Fix security — ERP credentials policy

Database migration to replace the broad SELECT policy on `erp_configurations` with one restricted to admins and API configurators only (drop the "Usuarios pueden ver configuraciones de su organización" policy).

### Step 3: Fix security — Kit inscriptions policy

Database migration to replace the "Authenticated users can read kit inscriptions" policy with one restricted to admins only.

### Step 4: Enable leaked password protection

Use auth configuration tool to enable leaked password protection.

