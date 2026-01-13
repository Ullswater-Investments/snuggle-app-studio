import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface RegistrationPayload {
  role: 'buyer' | 'supplier';
  organization: {
    legalName: string;
    taxId: string;
    country: string;
    address: string;
    sector: string;
    size: string;
    productCategory?: string;
    erpType?: string;
  };
  representative: {
    fullName: string;
    position?: string;
    email: string;
    phone?: string;
  };
  intention: {
    dataTypes: string[];
    hasErp?: string;
  };
  acceptances: {
    terms: boolean;
    gdpr: boolean;
    conduct: boolean;
  };
}

export interface RegistrationResult {
  success: boolean;
  message: string;
  requestId: string;
  submittedAt: string;
}

export interface RegistrationError {
  error: string;
  message?: string;
  details?: string[];
  requestId?: string;
}

export function useRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<RegistrationError | null>(null);

  const submitRegistration = async (payload: RegistrationPayload): Promise<RegistrationResult> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke<RegistrationResult>(
        'submit-registration',
        { body: payload }
      );

      if (fnError) {
        const errorData: RegistrationError = {
          error: 'Submission failed',
          message: fnError.message,
        };
        setError(errorData);
        throw new Error(fnError.message);
      }

      if (!data?.success) {
        const errorData = data as unknown as RegistrationError;
        setError(errorData);
        throw new Error(errorData.message || errorData.error || 'Unknown error');
      }

      return data;
    } catch (err) {
      if (!error) {
        const errorData: RegistrationError = {
          error: 'Network error',
          message: err instanceof Error ? err.message : 'Failed to submit registration',
        };
        setError(errorData);
      }
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => setError(null);

  return {
    submitRegistration,
    isSubmitting,
    error,
    clearError,
  };
}
