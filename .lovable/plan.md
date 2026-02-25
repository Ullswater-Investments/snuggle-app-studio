
## DID-based ODRL Assigner + DDO Viewer Button

### Overview

Three changes: (1) use the org's Ethereum wallet as `assigner` in DID format, (2) add a "Ver DDO (Operador)" button in the admin detail view, and (3) open a modal showing an assembled DDO JSON with copy functionality.

---

### 1. `src/utils/odrlGenerator.ts` -- DID-based assigner

**Change the `assigner` format** from `urn:uuid:<orgId>` to `did:ethr:<walletAddress>`.

- Add a new parameter `providerWallet: string` to `generateODRLPolicy` (replacing `providerId`)
- Format: `"assigner": "did:ethr:<walletAddress>"`
- Keep `target` as `urn:uuid:<assetId>` (unchanged)
- If wallet is empty/falsy, fall back to `"did:ethr:unknown"`

Updated signature:
```text
generateODRLPolicy(permissions, prohibitions, obligations, providerWallet, assetId)
```

### 2. `src/pages/dashboard/PublishDataset.tsx` -- Fetch wallet for ODRL

In Phase 2 of the publish mutation (after INSERT), before calling `generateODRLPolicy`:

- Query `organizations` table for the `wallet_address` of `activeOrgId`
- Pass this wallet address (instead of `activeOrgId`) to `generateODRLPolicy`

```text
// After Phase 1 INSERT
const { data: orgData } = await supabase
  .from("organizations")
  .select("wallet_address")
  .eq("id", activeOrgId)
  .single();

const providerWallet = orgData?.wallet_address || "";

const odrlPolicy = generateODRLPolicy(
  ..., providerWallet, asset.id
);
```

### 3. `src/pages/admin/AdminPublicationDetail.tsx` -- DDO Button + Modal

#### 3a. Expand org query to include `wallet_address`

Change the org query (line 74) from:
```text
.select("name, type, sector")
```
to:
```text
.select("name, type, sector, wallet_address")
```

#### 3b. Add state for DDO modal

Add new state variables:
- `showDDOModal: boolean` (default false)
- `ddoCopied: boolean` (default false)

#### 3c. Add "Ver DDO (Operador)" button

Below the Asset ID / Product ID card (after line 503), add a button:

```text
<Button
  variant="outline"
  className="w-full mt-3"
  onClick={() => setShowDDOModal(true)}
>
  <FileJson className="h-4 w-4 mr-2" />
  Ver DDO (Operador)
</Button>
```

#### 3d. Assemble DDO object

When the modal opens (or computed inline), build the DDO from existing data:

```text
{
  "@context": ["https://w3id.org/did/v1"],
  "id": `did:op:${asset.id}`,
  "metadata": {
    "name": product?.name,
    "description": product?.description,
    "author": orgName?.name,
    "type": "dataset",
    "additionalInformation": {
      "odrlPolicy": customMeta?.additionalInformation?.odrlPolicy || customMeta?.odrl_policy || null
    }
  },
  "services": [{
    "type": "access",
    "timeout": (accessTimeoutDays || 90) * 86400  // days to seconds
  }],
  "credentials": {
    "allow": allowedWallets.map(w => ({
      "type": "address", "values": [w.wallet_address]
    })),
    "deny": deniedWallets.map(w => ({
      "type": "address", "values": [w.wallet_address]
    }))
  }
}
```

Where `accessTimeoutDays` and wallet lists are read from `customMeta.access_control` (with fallback to `customMeta.access_policy`).

#### 3e. DDO Modal

Add a Dialog component:
- Title: "DDO Generado para Pontus-X"
- Body: `<pre>` block inside a ScrollArea showing `JSON.stringify(ddo, null, 2)`
- Footer: "Copiar JSON" button that copies to clipboard and shows toast "DDO Copiado correctamente"
- Max width: `max-w-2xl` for readability

---

### Files to modify

| File | Change |
|---|---|
| `src/utils/odrlGenerator.ts` | Change `providerId` to `providerWallet`, format as `did:ethr:<wallet>` |
| `src/pages/dashboard/PublishDataset.tsx` | Fetch org wallet_address before ODRL generation, pass to generator |
| `src/pages/admin/AdminPublicationDetail.tsx` | Add wallet_address to org query, DDO button, DDO modal with copy |
