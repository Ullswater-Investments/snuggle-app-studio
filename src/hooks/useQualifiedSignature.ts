import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { SignatureResult } from '@/components/contract/DigitalSignatureWidget';

interface SignerData {
  fullName: string;
  position: string;
  organizationName: string;
  taxId: string;
  acceptedTerms: boolean;
  acceptedGdpr: boolean;
}

interface QualifiedSignatureResult {
  success: boolean;
  contractId?: string;
  documentHash?: string;
  signedDocumentUrl?: string;
  error?: string;
}

export const useQualifiedSignature = () => {
  const [isSigning, setIsSigning] = useState(false);
  const [signatureProgress, setSignatureProgress] = useState<string>('');

  // Generate SHA-256 hash of content
  const generateHash = async (content: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Create document content for hashing
  const createDocumentContent = (signerData: SignerData): string => {
    const timestamp = new Date().toISOString();
    return JSON.stringify({
      type: 'CARTA_ADHESION_PROCUREDATA',
      version: '1.0',
      timestamp,
      promoter: {
        name: 'ACCURO TECHNOLOGY S.L.',
        taxId: 'B87617981'
      },
      participant: {
        organizationName: signerData.organizationName,
        taxId: signerData.taxId,
        representative: signerData.fullName,
        position: signerData.position
      },
      acceptance: {
        terms: signerData.acceptedTerms,
        gdpr: signerData.acceptedGdpr
      },
      regulations: [
        'RGPD (UE) 2016/679',
        'DGA (UE) 2022/868',
        'Data Act (UE) 2023/2854',
        'eIDAS (UE) 910/2014',
        'LOPDGDD 3/2018'
      ]
    });
  };

  const signContract = useCallback(async (
    signerData: SignerData,
    signatureResult: SignatureResult
  ): Promise<QualifiedSignatureResult> => {
    setIsSigning(true);
    
    try {
      // Step 1: Generate document hash
      setSignatureProgress('Generando hash del documento...');
      const documentContent = createDocumentContent(signerData);
      const documentHash = await generateHash(documentContent);
      
      // Step 2: Prepare signature data
      setSignatureProgress('Preparando firma...');
      
      const signedAt = new Date().toISOString();
      
      // Step 3: Save to database
      setSignatureProgress('Guardando contrato firmado...');
      
      const { data: contractData, error: insertError } = await supabase
        .from('signed_contracts')
        .insert({
          full_name: signerData.fullName,
          position: signerData.position,
          organization_name: signerData.organizationName,
          tax_id: signerData.taxId,
          signature_data_url: signatureResult.signatureDataUrl || '',
          accepted_terms: signerData.acceptedTerms,
          accepted_gdpr: signerData.acceptedGdpr,
          signed_at: signedAt,
          ip_address: null, // Will be set by edge function
          user_agent: navigator.userAgent,
          signature_type: signatureResult.method,
          document_hash: documentHash,
          eidas_level: signatureResult.eidasLevel,
          certificate_serial: signatureResult.certificateInfo?.serial || null,
          certificate_issuer: signatureResult.certificateInfo?.issuer || null,
          signature_provider: signatureResult.eidasProvider || null
        })
        .select('id')
        .single();

      if (insertError) {
        throw new Error(`Error al guardar el contrato: ${insertError.message}`);
      }

      // Step 4: Send notification email
      setSignatureProgress('Enviando notificación...');
      
      const { error: notifyError } = await supabase.functions.invoke('notify-contract-signed', {
        body: {
          contractId: contractData.id,
          fullName: signerData.fullName,
          position: signerData.position,
          organizationName: signerData.organizationName,
          taxId: signerData.taxId,
          signedAt,
          signatureType: signatureResult.method,
          eidasLevel: signatureResult.eidasLevel,
          documentHash
        }
      });

      if (notifyError) {
        console.error('Error sending notification:', notifyError);
        // Don't fail the whole process for notification error
      }

      setSignatureProgress('¡Contrato firmado correctamente!');
      
      return {
        success: true,
        contractId: contractData.id,
        documentHash,
        signedDocumentUrl: undefined // Would be set if we uploaded to storage
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Signature error:', error);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsSigning(false);
      setSignatureProgress('');
    }
  }, []);

  return {
    signContract,
    isSigning,
    signatureProgress
  };
};
