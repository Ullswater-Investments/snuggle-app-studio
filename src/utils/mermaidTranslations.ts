import { TFunction } from 'i18next';

// Helper type for the translation function
type DiagramTranslator = (t: TFunction) => string;

// KYB Onboarding diagram
export const getKybDiagram: DiagramTranslator = (t) => `sequenceDiagram
    participant P as ${t('diagrams:useCases.kyb-onboarding.participant_provider')}
    participant W as ${t('diagrams:useCases.kyb-onboarding.participant_wallet')}
    participant PD as ${t('diagrams:useCases.kyb-onboarding.participant_procuredata')}
    participant PX as ${t('diagrams:useCases.kyb-onboarding.participant_pontusx')}
    
    P->>W: ${t('diagrams:useCases.kyb-onboarding.action_connect')}
    W->>PD: ${t('diagrams:useCases.kyb-onboarding.action_sign')}
    PD->>PD: ${t('diagrams:useCases.kyb-onboarding.action_generate_did')}
    PD->>PX: ${t('diagrams:useCases.kyb-onboarding.action_verify')}
    PX-->>PD: ${t('diagrams:useCases.kyb-onboarding.result_validated')}
    PD-->>P: ${t('diagrams:useCases.kyb-onboarding.result_created')}`;

// Carbon Footprint diagram
export const getCarbonFootprintDiagram: DiagramTranslator = (t) => `flowchart LR
    A[${t('diagrams:useCases.huella-carbono.manufacturer')}] -->|${t('diagrams:useCases.huella-carbono.requests_esg')}| B[${t('diagrams:useCases.huella-carbono.procuredata')}]
    B -->|${t('diagrams:useCases.huella-carbono.notifies')}| C[${t('diagrams:useCases.huella-carbono.provider1')}]
    B -->|${t('diagrams:useCases.huella-carbono.notifies')}| D[${t('diagrams:useCases.huella-carbono.provider2')}]
    C -->|${t('diagrams:useCases.huella-carbono.uploads_report')}| E[${t('diagrams:useCases.huella-carbono.hash_blockchain')}]
    D -->|${t('diagrams:useCases.huella-carbono.uploads_report')}| E
    E -->|${t('diagrams:useCases.huella-carbono.controlled_access')}| A
    E -->|${t('diagrams:useCases.huella-carbono.audit')}| F[${t('diagrams:useCases.huella-carbono.external_auditor')}]`;

// Marketplace EUROe diagram
export const getMarketplaceDiagram: DiagramTranslator = (t) => `sequenceDiagram
    participant V as ${t('diagrams:useCases.marketplace-euroe.seller')}
    participant C as ${t('diagrams:useCases.marketplace-euroe.buyer')}
    participant SC as ${t('diagrams:useCases.marketplace-euroe.smart_contract')}
    participant BC as ${t('diagrams:useCases.marketplace-euroe.blockchain')}
    
    V->>SC: ${t('diagrams:useCases.marketplace-euroe.publish_dataset')}
    C->>SC: ${t('diagrams:useCases.marketplace-euroe.payment_euroe')}
    SC->>BC: ${t('diagrams:useCases.marketplace-euroe.verify_transfer')}
    BC-->>SC: ${t('diagrams:useCases.marketplace-euroe.confirmed')}
    SC->>C: ${t('diagrams:useCases.marketplace-euroe.access_token_released')}
    C->>V: ${t('diagrams:useCases.marketplace-euroe.download_data')}`;

// Kill Switch diagram
export const getKillSwitchDiagram: DiagramTranslator = (t) => `flowchart TD
    A[${t('diagrams:useCases.kill-switch.detect_breach')}] -->|${t('diagrams:useCases.kill-switch.alert')}| B[${t('diagrams:useCases.kill-switch.security_director')}]
    B -->|${t('diagrams:useCases.kill-switch.click')}| C[${t('diagrams:useCases.kill-switch.revoke_button')}]
    C -->|${t('diagrams:useCases.kill-switch.execute')}| D[${t('diagrams:useCases.kill-switch.smart_contract')}]
    D -->|${t('diagrams:useCases.kill-switch.invalidate')}| E[${t('diagrams:useCases.kill-switch.all_access_tokens')}]
    D -->|${t('diagrams:useCases.kill-switch.register')}| F[${t('diagrams:useCases.kill-switch.audit_log')}]
    E -->|${t('diagrams:useCases.kill-switch.result')}| G[${t('diagrams:useCases.kill-switch.access_blocked')}]`;

// Digital Passport diagram
export const getDigitalPassportDiagram: DiagramTranslator = (t) => `flowchart LR
    subgraph ${t('diagrams:useCases.pasaporte-digital.providers')}
        P1[${t('diagrams:useCases.pasaporte-digital.fabric')}]
        P2[${t('diagrams:useCases.pasaporte-digital.dye')}]
        P3[${t('diagrams:useCases.pasaporte-digital.confection')}]
        P4[${t('diagrams:useCases.pasaporte-digital.transport')}]
        P5[${t('diagrams:useCases.pasaporte-digital.retail')}]
    end
    
    P1 -->|${t('diagrams:useCases.pasaporte-digital.sign_did')}| DPP[${t('diagrams:useCases.pasaporte-digital.digital_passport')}]
    P2 -->|${t('diagrams:useCases.pasaporte-digital.sign_did')}| DPP
    P3 -->|${t('diagrams:useCases.pasaporte-digital.sign_did')}| DPP
    P4 -->|${t('diagrams:useCases.pasaporte-digital.sign_did')}| DPP
    P5 -->|${t('diagrams:useCases.pasaporte-digital.sign_did')}| DPP
    
    DPP -->|${t('diagrams:useCases.pasaporte-digital.qr_code')}| Consumer[${t('diagrams:useCases.pasaporte-digital.consumer')}]`;

// Compute to Data diagram
export const getComputeToDataDiagram: DiagramTranslator = (t) => `sequenceDiagram
    participant AI as ${t('diagrams:useCases.compute-to-data.ai_startup')}
    participant PD as ${t('diagrams:useCases.compute-to-data.procuredata')}
    participant H as ${t('diagrams:useCases.compute-to-data.hospital')}
    participant SB as ${t('diagrams:useCases.compute-to-data.sandbox')}
    
    AI->>PD: ${t('diagrams:useCases.compute-to-data.upload_model')}
    PD->>H: ${t('diagrams:useCases.compute-to-data.request_c2d')}
    H->>PD: ${t('diagrams:useCases.compute-to-data.approve')}
    PD->>SB: ${t('diagrams:useCases.compute-to-data.provision_env')}
    SB->>SB: ${t('diagrams:useCases.compute-to-data.execute_model')}
    SB-->>AI: ${t('diagrams:useCases.compute-to-data.only_results')}`;

// Recall Management diagram
export const getRecallsDiagram: DiagramTranslator = (t) => `flowchart TD
    A[${t('diagrams:useCases.gestion-recalls.detect_defect')}] -->|${t('diagrams:useCases.gestion-recalls.query')}| B[${t('diagrams:useCases.gestion-recalls.data_lineage')}]
    B -->|${t('diagrams:useCases.gestion-recalls.trace')}| C[${t('diagrams:useCases.gestion-recalls.blockchain_history')}]
    C -->|${t('diagrams:useCases.gestion-recalls.identify')}| D[${t('diagrams:useCases.gestion-recalls.lot_provider')}]
    D -->|${t('diagrams:useCases.gestion-recalls.consult')}| E[${t('diagrams:useCases.gestion-recalls.affected_vehicles')}]
    E -->|${t('diagrams:useCases.gestion-recalls.list')}| F[${t('diagrams:useCases.gestion-recalls.cars_count')}]
    F -->|${t('diagrams:useCases.gestion-recalls.initiate')}| G[${t('diagrams:useCases.gestion-recalls.immediate_recall')}]`;

// DeFi Financing diagram
export const getDefiFinancingDiagram: DiagramTranslator = (t) => `flowchart LR
    A[${t('diagrams:useCases.financiacion-defi.farmer')}] -->|${t('diagrams:useCases.financiacion-defi.shares')}| B[${t('diagrams:useCases.financiacion-defi.delivery_history')}]
    B -->|${t('diagrams:useCases.financiacion-defi.verified_in')}| C[${t('diagrams:useCases.financiacion-defi.blockchain')}]
    C -->|${t('diagrams:useCases.financiacion-defi.score')}| D[${t('diagrams:useCases.financiacion-defi.reputation')}]
    D -->|${t('diagrams:useCases.financiacion-defi.presents_to')}| E[${t('diagrams:useCases.financiacion-defi.bank_defi')}]
    E -->|${t('diagrams:useCases.financiacion-defi.approves')}| F[${t('diagrams:useCases.financiacion-defi.credit_reduced')}]`;

// Cold Chain diagram
export const getColdChainDiagram: DiagramTranslator = (t) => `sequenceDiagram
    participant S as ${t('diagrams:useCases.cadena-frio.sensor')}
    participant EF as ${t('diagrams:useCases.cadena-frio.edge_function')}
    participant BC as ${t('diagrams:useCases.cadena-frio.blockchain')}
    participant A as ${t('diagrams:useCases.cadena-frio.alert_system')}
    
    loop ${t('diagrams:useCases.cadena-frio.loop_hourly')}
        S->>EF: ${t('diagrams:useCases.cadena-frio.temperature_reading')}
        EF->>EF: ${t('diagrams:useCases.cadena-frio.verify_threshold')}
        alt ${t('diagrams:useCases.cadena-frio.temp_ok')}
            EF->>BC: ${t('diagrams:useCases.cadena-frio.notarize_reading')}
        else ${t('diagrams:useCases.cadena-frio.temp_exceeded')}
            EF->>BC: ${t('diagrams:useCases.cadena-frio.notarize_breach')}
            EF->>A: ${t('diagrams:useCases.cadena-frio.immediate_alert')}
        end
    end`;

// ODRL Licenses diagram
export const getOdrlLicensesDiagram: DiagramTranslator = (t) => `flowchart TD
    A[${t('diagrams:useCases.licencias-odrl.researcher')}] -->|${t('diagrams:useCases.licencias-odrl.opens')}| B[${t('diagrams:useCases.licencias-odrl.negotiation_chat')}]
    B -->|${t('diagrams:useCases.licencias-odrl.defines')}| C[${t('diagrams:useCases.licencias-odrl.restrictions')}]
    C --> D{${t('diagrams:useCases.licencias-odrl.days_30')}}
    C --> E{${t('diagrams:useCases.licencias-odrl.academic_only')}}
    C --> F{${t('diagrams:useCases.licencias-odrl.eu_only')}}
    D & E & F -->|${t('diagrams:useCases.licencias-odrl.generates')}| G[${t('diagrams:useCases.licencias-odrl.odrl_policy')}]
    G -->|${t('diagrams:useCases.licencias-odrl.deploys')}| H[${t('diagrams:useCases.licencias-odrl.smart_contract')}]
    H -->|${t('diagrams:useCases.licencias-odrl.grants')}| I[${t('diagrams:useCases.licencias-odrl.limited_access')}]`;

// Map of use case IDs to their diagram generators
export const useCaseDiagrams: Record<string, DiagramTranslator> = {
  'kyb-onboarding': getKybDiagram,
  'huella-carbono': getCarbonFootprintDiagram,
  'marketplace-euroe': getMarketplaceDiagram,
  'kill-switch': getKillSwitchDiagram,
  'pasaporte-digital': getDigitalPassportDiagram,
  'compute-to-data': getComputeToDataDiagram,
  'gestion-recalls': getRecallsDiagram,
  'financiacion-defi': getDefiFinancingDiagram,
  'cadena-frio': getColdChainDiagram,
  'licencias-odrl': getOdrlLicensesDiagram,
};

// Helper to get a translated diagram by use case ID
export const getUseCaseDiagram = (useCaseId: string, t: TFunction): string => {
  const generator = useCaseDiagrams[useCaseId];
  if (!generator) {
    console.warn(`No diagram generator found for use case: ${useCaseId}`);
    return '';
  }
  return generator(t);
};
