import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NodeEligibilityPayload {
  entityName: string;
  entityType: string;
  ecosystemStatus: string;
  email: string;
}

export interface NodeEligibilityResult {
  success: boolean;
  message: string;
  requestId: string;
  submittedAt: string;
}

export interface NodeEligibilityError {
  error: string;
  message?: string;
}

export function useNodeEligibility() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<NodeEligibilityError | null>(null);

  const submitEligibility = async (payload: NodeEligibilityPayload): Promise<NodeEligibilityResult> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke<NodeEligibilityResult>(
        'submit-node-eligibility',
        { body: payload }
      );

      if (fnError) {
        const errorData: NodeEligibilityError = {
          error: 'Submission failed',
          message: fnError.message,
        };
        setError(errorData);
        throw new Error(fnError.message);
      }

      if (!data?.success) {
        const errorData = data as unknown as NodeEligibilityError;
        setError(errorData);
        throw new Error(errorData.message || errorData.error || 'Error desconocido');
      }

      return data;
    } catch (err) {
      if (!error) {
        const errorData: NodeEligibilityError = {
          error: 'Network error',
          message: err instanceof Error ? err.message : 'Error al enviar la solicitud',
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
    submitEligibility,
    isSubmitting,
    error,
    clearError,
  };
}
