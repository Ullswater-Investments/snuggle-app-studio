import { TFunction } from 'i18next';

/**
 * Dynamic Mermaid diagram generators for the Architecture page.
 * These functions use translation keys to generate diagrams in any language.
 */

// getOverviewDiagram removed - replaced by visual Card layout in Architecture.tsx

// getErDiagram removed - replaced by sovereign data conceptual view in Architecture.tsx

// getRlsDiagram removed - replaced by Defense in Depth visual layout in Architecture.tsx

// getWeb3Diagram removed - replaced by visual Card layout in Architecture.tsx

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
