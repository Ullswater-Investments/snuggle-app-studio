import { TFunction } from 'i18next';

/**
 * Dynamic Mermaid diagram generators for the Architecture page.
 * These functions use translation keys to generate diagrams in any language.
 */

export const getOverviewDiagram = (t: TFunction): string => `graph TB
    subgraph FE["${t('diagrams.fe.title')}"]
        UI[${t('diagrams.fe.ui')}]
        Query[${t('diagrams.fe.query')}]
        Router[${t('diagrams.fe.router')}]
        Hooks[${t('diagrams.fe.hooks')}]
    end
    
    subgraph BE["${t('diagrams.be.title')}"]
        Auth[${t('diagrams.be.auth')}]
        DB[(${t('diagrams.be.db')})]
        RLS[${t('diagrams.be.rls')}]
        Edge[${t('diagrams.be.edge')}]
        RT[${t('diagrams.be.realtime')}]
    end
    
    subgraph BC["${t('diagrams.bc.title')}"]
        DID[${t('diagrams.bc.did')}]
        Token[${t('diagrams.bc.euroe')}]
        Notary[${t('diagrams.bc.notarization')}]
    end
    
    UI --> Query
    Query --> Auth
    Auth --> DB
    DB --> RLS
    Edge --> DB
    RT --> DB
    Auth --> DID
    Edge --> Token
    Edge --> Notary`;

export const getErDiagram = (t: TFunction): string => `erDiagram
    organizations ||--o{ user_profiles : "${t('diagrams.er.has')}"
    organizations ||--o{ user_roles : "${t('diagrams.er.has')}"
    organizations ||--o{ data_assets : "${t('diagrams.er.owns')}"
    organizations ||--o{ wallets : "${t('diagrams.er.has')}"
    organizations ||--o{ audit_logs : "${t('diagrams.er.logs')}"
    
    data_products ||--o{ data_assets : "${t('diagrams.er.generates')}"
    data_assets ||--o{ catalog_metadata : "${t('diagrams.er.has')}"
    data_assets ||--o{ data_transactions : "${t('diagrams.er.contains')}"
    
    data_transactions ||--o{ approval_history : "${t('diagrams.er.has')}"
    data_transactions ||--o{ data_payloads : "${t('diagrams.er.contains')}"
    data_transactions ||--o{ data_policies : "${t('diagrams.er.generates')}"
    data_transactions ||--o{ transaction_messages : "${t('diagrams.er.has')}"
    
    wallets ||--o{ wallet_transactions : "${t('diagrams.er.pays')}"`;

export const getRlsDiagram = (t: TFunction): string => `sequenceDiagram
    participant C as Client
    participant A as Auth
    participant P as Policy
    participant D as Database

    C->>A: ${t('diagrams.rls.query')}
    A->>A: ${t('diagrams.rls.checkRls')}
    A->>P: ${t('diagrams.rls.getOrgId')}
    P->>D: ${t('diagrams.rls.filterRows')}
    
    alt No permission
        D-->>C: ${t('diagrams.rls.denied')}
    else Has permission
        D-->>P: ${t('diagrams.rls.returnFiltered')}
        P-->>C: ${t('diagrams.rls.result')}
    end`;

export const getWeb3Diagram = (t: TFunction): string => `sequenceDiagram
    participant U as ${t('diagrams.web3.user')}
    participant A as ${t('diagrams.web3.app')}
    participant P as ${t('diagrams.web3.pontusx')}

    U->>A: ${t('diagrams.web3.connectWallet')}
    A->>P: ${t('diagrams.web3.signMessage')}
    P-->>A: ${t('diagrams.web3.getDid')}
    
    U->>A: ${t('diagrams.web3.checkBalance')}
    A->>P: balanceOf(address)
    P-->>A: EUROe balance
    
    U->>A: ${t('diagrams.web3.notarize')}
    A->>P: storeHash(txId, hash)
    P-->>A: ${t('diagrams.web3.txConfirm')}`;

export const getStatesDiagram = (t: TFunction): string => `stateDiagram-v2
    [*] --> ${t('diagrams.states.initiated')}: ${t('diagrams.states.consumerRequests')}
    ${t('diagrams.states.initiated')} --> ${t('diagrams.states.pendingSubject')}: ${t('diagrams.states.send')}
    ${t('diagrams.states.initiated')} --> ${t('diagrams.states.cancelled')}: ${t('diagrams.states.cancel')}
    
    ${t('diagrams.states.pendingSubject')} --> ${t('diagrams.states.pendingHolder')}: ${t('diagrams.states.subjectApproves')}
    ${t('diagrams.states.pendingSubject')} --> ${t('diagrams.states.deniedSubject')}: ${t('diagrams.states.subjectDenies')}
    
    ${t('diagrams.states.pendingHolder')} --> ${t('diagrams.states.approved')}: ${t('diagrams.states.holderReleases')}
    ${t('diagrams.states.pendingHolder')} --> ${t('diagrams.states.deniedHolder')}: ${t('diagrams.states.holderDenies')}
    
    ${t('diagrams.states.approved')} --> ${t('diagrams.states.completed')}: ${t('diagrams.states.payAndDeliver')}
    
    ${t('diagrams.states.deniedSubject')} --> [*]
    ${t('diagrams.states.deniedHolder')} --> [*]
    ${t('diagrams.states.cancelled')} --> [*]
    ${t('diagrams.states.completed')} --> [*]`;

export const getSequenceDiagram = (t: TFunction): string => `sequenceDiagram
    participant C as ${t('diagrams.sequence.consumer')}
    participant S as ${t('diagrams.sequence.subject')}
    participant H as ${t('diagrams.sequence.holder')}
    participant B as ${t('diagrams.sequence.blockchain')}

    C->>S: ${t('diagrams.sequence.requestAccess')}
    S->>S: ${t('diagrams.sequence.validatePurpose')}
    S->>H: ${t('diagrams.sequence.preApprove')}
    H->>H: ${t('diagrams.sequence.releaseData')}
    H->>C: ${t('diagrams.sequence.deliverPayload')}
    C->>B: ${t('diagrams.sequence.processPayment')}
    B->>B: ${t('diagrams.sequence.notarizeHash')}
    B-->>C: ${t('diagrams.sequence.confirmBlock')}`;

export const getRegistrationDiagram = (t: TFunction): string => `sequenceDiagram
    participant E as ${t('diagrams.registration.entity')}
    participant P as ${t('diagrams.registration.platform')}
    participant A as ${t('diagrams.registration.admin')}

    E->>P: ${t('diagrams.registration.submitForm')}
    P->>P: ${t('diagrams.registration.validateTaxId')}
    P->>P: ${t('diagrams.registration.createPending')}
    P->>A: ${t('diagrams.registration.notifyAdmin')}
    A->>A: ${t('diagrams.registration.reviewKyb')}
    A->>P: ${t('diagrams.registration.approveReject')}
    
    alt Approved
        P->>P: ${t('diagrams.registration.createOrg')}
        P->>P: ${t('diagrams.registration.assignRole')}
        P->>E: ${t('diagrams.registration.sendCredentials')}
    end`;

export const getDataLineageDiagram = (t: TFunction): string => `graph LR
    subgraph TX["Transaction #TX-2024-001"]
        A[Consumer: TechCorp] -->|request| B[Asset: ESG Report]
        B -->|validate| C[Subject: GreenEnergy]
        C -->|release| D[Holder: DataVault]
        D -->|deliver| E[Payload: JSON]
        E -->|pay| F[EUROe: 150€]
        F -->|notarize| G[Block #847291]
    end
    
    style G fill:#10b981,color:#fff`;
