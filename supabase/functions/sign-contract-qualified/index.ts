import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SignatureRequest {
  contractId: string;
  signerData: {
    fullName: string;
    position: string;
    organizationName: string;
    taxId: string;
  };
  signatureMethod: 'simple' | 'certificate' | 'eidas';
  eidasProvider?: string;
  certificateData?: {
    serial: string;
    issuer: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body: SignatureRequest = await req.json();
    const { contractId, signerData, signatureMethod, eidasProvider, certificateData } = body;

    // Determine eIDAS level based on signature method
    let eidasLevel: 'simple' | 'advanced' | 'qualified' = 'simple';
    if (signatureMethod === 'certificate') {
      eidasLevel = 'advanced';
    } else if (signatureMethod === 'eidas') {
      eidasLevel = 'qualified';
    }

    // Generate document hash
    const documentContent = JSON.stringify({
      type: 'CARTA_ADHESION_PROCUREDATA',
      version: '1.0',
      timestamp: new Date().toISOString(),
      promoter: {
        name: 'ACCURO TECHNOLOGY S.L.',
        taxId: 'B87617981'
      },
      participant: signerData,
      signatureMethod,
      eidasLevel
    });

    // Create hash using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(documentContent);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const documentHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Update contract with signature details
    const { error: updateError } = await supabase
      .from('signed_contracts')
      .update({
        signature_type: signatureMethod,
        document_hash: documentHash,
        eidas_level: eidasLevel,
        certificate_serial: certificateData?.serial || null,
        certificate_issuer: certificateData?.issuer || null,
        signature_provider: eidasProvider || null
      })
      .eq('id', contractId);

    if (updateError) {
      throw new Error(`Failed to update contract: ${updateError.message}`);
    }

    // For qualified signatures, we would integrate with real eIDAS providers here
    // This is a mock implementation for MVP
    let signatureDetails = {};
    
    if (signatureMethod === 'eidas') {
      // Mock eIDAS provider response
      signatureDetails = {
        provider: eidasProvider,
        signatureId: `SIG-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        timestamp: new Date().toISOString(),
        status: 'completed',
        eidasLevel: 'qualified',
        // In production, this would contain the actual signature from the provider
        mockSignature: true
      };
    } else if (signatureMethod === 'certificate') {
      // Mock certificate signature
      signatureDetails = {
        certificateSerial: certificateData?.serial,
        certificateIssuer: certificateData?.issuer,
        signatureId: `CERT-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        timestamp: new Date().toISOString(),
        status: 'completed',
        eidasLevel: 'advanced',
        mockSignature: true
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        contractId,
        documentHash,
        eidasLevel,
        signatureDetails
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in sign-contract-qualified:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
